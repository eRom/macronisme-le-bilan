/**
 * Atlas - pipeline de données.
 * Lecture SEULE sur ../base et ../jugement, à une exception nommée près
 * (PROMESSES_REL ci-dessous) : le site rend le dossier, pas la matière première
 * qui a servi à le construire.
 * Sorties : dist/data.js (window.ATLAS) + build-report.md.
 * Contrat : 534/534 fiches parsées ou échec du build ; tout lien cassé listé.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, cpSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { Marked } from "marked";
import Graph from "graphology";
import { circular } from "graphology-layout";
import forceAtlas2 from "graphology-layout-forceatlas2";

const ATLAS = import.meta.dir;
const POL = resolve(ATLAS, "..");
const BASE = join(POL, "base");
const JUG = join(POL, "jugement");
const DIST = join(ATLAS, "dist");

const marked = new Marked({ gfm: true, breaks: false });

// ---------------------------------------------------------------- utilitaires

const VERDICTS = ["tres-favorable", "favorable", "mitige", "defavorable", "gravement-defavorable"] as const;

const DOMAINE_NOMS: Record<string, string> = {
  "finances-publiques": "Finances publiques",
  promesses: "Promesses",
  "justice-affaires": "Justice et affaires",
  "libertes-publiques": "Libertés publiques",
  sante: "Santé",
  "retraites-social": "Retraites et social",
  economie: "Économie",
  "securite-immigration": "Sécurité et immigration",
  "ecologie-energie": "Écologie et énergie",
  "education-recherche": "Éducation et recherche",
  international: "International",
  institutions: "Institutions",
  europe: "Europe",
  industrie: "Industrie",
  "securite-civile": "Sécurité civile",
};

const GOUVERNEMENTS = [
  "Philippe I", "Philippe II", "Castex", "Borne", "Attal", "Barnier", "Bayrou", "Lecornu I", "Lecornu II",
] as const;

function normalizeAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** défavorable -> defavorable, Très favorable -> tres-favorable */
function normalizeVerdict(s: string): string {
  return normalizeAccents(s.trim().toLowerCase()).replace(/\s+/g, "-");
}

/** split "a, b (c, d), e" au niveau 0 des parenthèses */
function splitTopLevel(s: string): string[] {
  const out: string[] = [];
  let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter(Boolean);
}

function stripQuotes(s: string): string {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
  return t;
}

function htmlToText(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------- rapport

type Issue = { where: string; what: string };
const report = {
  fichesTotal: 0, fichesParsees: 0,
  erreursParse: [] as Issue[],
  champsManquants: [] as Issue[],
  liensMortsBase: [] as Issue[],
  liensMortsJugement: [] as Issue[],
  sectionsManquantes: [] as Issue[],
  gouvernementsNonMappes: new Map<string, number>(),
  ministresSuspects: [] as Issue[],
  verdictsMismatch: [] as Issue[],
  compteursMismatch: [] as Issue[],
  datesInvalides: [] as Issue[],
  fuitesInternes: [] as Issue[],
  briefs: [] as Issue[],
  briefsEmis: [] as string[],
  citationsJugements: 0,
  aretes: 0,
  entreesMinistresBrutes: 0,
  fichesAvecMinistres: 0,
};

// ---------------------------------------------------------------- frontmatter

type Ministre = { n: string; pf: string | null };
type Fiche = {
  slug: string; t: string; ty: string; d: string[]; dt: string; df: string | null;
  g: string; st: string | null; src: string[];
  act: { p: string | null; m: Ministre[]; gb: string | null; gv: string[] };
  body: string; html?: string; txt?: string;
  out: string[]; in: string[];
  roles: Role[];
};
type Role = { piece: string; kind: string; n: number | null; label: string };

function parseFrontmatter(raw: string, _file: string): { fm: Record<string, unknown>; body: string } | null {
  const lines = raw.split("\n");
  if (lines[0]?.trim() !== "---") return null;
  let end = -1;
  for (let i = 1; i < lines.length; i++) if (lines[i].trim() === "---") { end = i; break; }
  if (end === -1) return null;

  const fm: Record<string, unknown> = {};
  let i = 1;
  while (i < end) {
    const line = lines[i];
    const top = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!top) { i++; continue; }
    const [, key, rawVal] = top;
    const val = rawVal.trim();

    if (key === "acteurs") {
      const act: Record<string, unknown> = {};
      i++;
      while (i < end && /^\s+\S/.test(lines[i])) {
        const sub = lines[i].match(/^\s+([a-zA-Z_]+):\s*(.*)$/);
        if (sub) {
          const [, sk, svRaw] = sub;
          const sv = svRaw.trim();
          if (sk === "ministres") {
            if (sv.startsWith("[")) {
              const inner = sv.replace(/^\[/, "").replace(/\]$/, "").trim();
              act.ministres = inner ? splitTopLevel(inner) : [];
              i++;
            } else if (sv === "") {
              const items: string[] = [];
              i++;
              while (i < end && /^\s+-\s/.test(lines[i])) { items.push(lines[i].replace(/^\s+-\s*/, "").trim()); i++; }
              act.ministres = items;
            } else { act.ministres = [sv]; i++; }
          } else { act[sk] = sv === "" ? null : sv; i++; }
        } else i++;
      }
      fm.acteurs = act;
      continue;
    }

    if (key === "sources") {
      const items: string[] = [];
      if (val.startsWith("[")) {
        const inner = val.replace(/^\[/, "").replace(/\]$/, "").trim();
        if (inner) items.push(...splitTopLevel(inner));
        i++;
      } else {
        i++;
        while (i < end && /^\s+-\s/.test(lines[i])) { items.push(lines[i].replace(/^\s+-\s*/, "").trim()); i++; }
      }
      fm.sources = items;
      continue;
    }

    if (key === "domaines") {
      const inner = val.replace(/^\[/, "").replace(/\]$/, "").trim();
      fm.domaines = inner ? inner.split(",").map((s) => s.trim()).filter(Boolean) : [];
      i++;
      continue;
    }

    // scalaires : titre (deux-points non quotés possibles -> tout prendre), type, date, grade...
    fm[key] = val === "null" || val === "" ? null : stripQuotes(val);
    i++;
  }
  return { fm, body: lines.slice(end + 1).join("\n").trim() };
}

/** valeurs assumées hors mapping : organes de contrôle, transverses, pré-mandat */
const GOUV_TRANSVERSE = /insee|cour des comptes|drees|dares|france strategie|institut des politiques|ipp|ofce|\bcor\b|conseil constitutionnel|cazeneuve|successifs|deux quinquennats|comite d'?evaluation/;

function mapGouvernement(raw: string | null): string[] {
  if (!raw) return [];
  const s = normalizeAccents(raw.toLowerCase());
  const found: string[] = [];
  const has = (re: RegExp) => re.test(s);
  // ordre : les formes II avant I
  if (has(/philippe\s*(ii|2)\b/)) found.push("Philippe II");
  if (has(/philippe\s*(i|1)\b(?!i)/)) found.push("Philippe I");
  if (has(/philippe/) && !found.some((g) => g.startsWith("Philippe"))) found.push("Philippe I", "Philippe II");
  if (has(/castex/)) found.push("Castex");
  if (has(/borne/)) found.push("Borne");
  if (has(/attal/)) found.push("Attal");
  if (has(/barnier/)) found.push("Barnier");
  if (has(/bayrou/)) found.push("Bayrou");
  if (has(/lecornu\s*(ii|2)\b/)) found.push("Lecornu II");
  if (has(/lecornu\s*(i|1)\b(?!i)/)) found.push("Lecornu I");
  if (has(/lecornu/) && !found.some((g) => g.startsWith("Lecornu"))) found.push("Lecornu I", "Lecornu II");
  if (found.length === 0 && !GOUV_TRANSVERSE.test(s)) {
    report.gouvernementsNonMappes.set(raw, (report.gouvernementsNonMappes.get(raw) ?? 0) + 1);
  }
  return [...new Set(found)];
}

/** découpe hors parenthèses sur un séparateur mot (" puis ", " et ") */
function splitOutsideParens(s: string, sep: RegExp): string[] {
  const out: string[] = [];
  let depth = 0, cur = "";
  const tokens = s.split(/(\(|\))/);
  for (const tok of tokens) {
    if (tok === "(") depth++;
    if (tok === ")") depth = Math.max(0, depth - 1);
    if (depth === 0 && tok !== "(" && tok !== ")") {
      const parts = tok.split(sep);
      cur += parts[0];
      for (let i = 1; i < parts.length; i++) { out.push(cur); cur = parts[i]; }
    } else cur += tok;
  }
  out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}

/** "A puis B (P)" -> [{A,P},{B,P}] ; "A (P1) puis B (P2)" -> chacun le sien ; "intérim" écarté */
function parseMinistres(entry: string, file: string): Ministre[] {
  const segments = splitOutsideParens(entry, /\s+(?:puis|et)\s+/);
  if (segments.length > 1) report.ministresSuspects.push({ where: file, what: `« ${entry} » séparée en ${segments.length} entrées` });
  const parsed = segments
    .filter((s) => !/^int[ée]rim$/i.test(s.trim()))
    .map((seg) => {
      const m = seg.match(/^(.*?)\s*\((.*)\)\s*$/);
      return m ? { n: m[1].trim(), pf: m[2].trim() } : { n: seg.trim(), pf: null };
    })
    .filter((m) => m.n.length > 1);
  const dernier = [...parsed].reverse().find((m) => m.pf);
  if (dernier) for (const m of parsed) if (!m.pf) m.pf = dernier.pf;
  return parsed;
}

// ---------------------------------------------------------------- lecture des fiches

const ficheFiles = readdirSync(BASE).filter((f) => f.endsWith(".md")).sort();
report.fichesTotal = ficheFiles.length;
const fiches = new Map<string, Fiche>();

for (const file of ficheFiles) {
  const slug = basename(file, ".md");
  const raw = readFileSync(join(BASE, file), "utf-8");
  const parsed = parseFrontmatter(raw, file);
  if (!parsed) { report.erreursParse.push({ where: file, what: "frontmatter introuvable" }); continue; }
  const { fm, body } = parsed;

  for (const req of ["titre", "type", "date", "grade"]) {
    if (!fm[req]) report.champsManquants.push({ where: file, what: `champ ${req} manquant` });
  }
  if (!Array.isArray(fm.domaines) || fm.domaines.length === 0) {
    report.champsManquants.push({ where: file, what: "domaines vide" });
  }
  const dt = String(fm.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dt)) report.datesInvalides.push({ where: file, what: `date "${dt}"` });
  const df = fm.date_fin ? String(fm.date_fin) : null;
  if (df && !/^\d{4}-\d{2}-\d{2}$/.test(df)) report.datesInvalides.push({ where: file, what: `date_fin "${df}"` });

  const acteurs = (fm.acteurs ?? {}) as Record<string, unknown>;
  const gb = (acteurs.gouvernement as string) ?? null;
  const entreesBrutes = (acteurs.ministres as string[]) ?? [];
  report.entreesMinistresBrutes += entreesBrutes.length;
  if (entreesBrutes.length > 0) report.fichesAvecMinistres++;
  const ministres = entreesBrutes.flatMap((e) => parseMinistres(e, file));

  const dom = (fm.domaines as string[]) ?? [];
  for (const d of dom) if (!DOMAINE_NOMS[d]) report.champsManquants.push({ where: file, what: `domaine inconnu "${d}"` });

  fiches.set(slug, {
    slug,
    t: String(fm.titre ?? slug),
    ty: String(fm.type ?? "?"),
    d: dom,
    dt,
    df,
    g: String(fm.grade ?? "?"),
    st: (fm.statut as string) ?? null,
    src: (fm.sources as string[]) ?? [],
    act: { p: (acteurs.president as string) ?? null, m: ministres, gb, gv: mapGouvernement(gb) },
    body,
    out: [],
    in: [],
    roles: [],
  });
}
report.fichesParsees = fiches.size;

// ---------------------------------------------------------------- wikilinks + rendu markdown

const WIKILINK = /\[\[([^\]]+)\]\]/g;

function collectSlugs(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(WIKILINK)) out.push(m[1].trim());
  return out;
}

function renderWikilinks(text: string, source: string, deadList: Issue[]): string {
  return text.replace(WIKILINK, (_, s) => {
    const slug = String(s).trim();
    const target = fiches.get(slug);
    if (!target) { deadList.push({ where: source, what: slug }); return `<span class="wl-dead">${slug}</span>`; }
    return `<a class="wl" href="#/fiche/${slug}"><span class="wl-d">${target.dt}</span>${escapeHtml(target.t)}</a>`;
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** liens [x](x.md) des jugements -> routes internes #/domaine/x ; si le texte du lien est le slug, on affiche le nom */
function renderDomainLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([a-z-]+)\.md\)/g, (m, label, s) => {
    if (!DOMAINE_NOMS[s] && s !== "synthese") return m;
    const display = label === s ? (DOMAINE_NOMS[s] ?? "synthèse") : label;
    return `[${display}](#/domaine/${s})`;
  });
}

// ---------------------------------------------------------------- publiabilité
//
// Doctrine amendée le 02/08/2026, à l'ouverture du dépôt public.
//
// Avant : seul le site était publié, le corpus restait privé. Une table
// REFORMULATIONS réparait au RENDU les renvois du corpus vers les fichiers de
// travail (`chronologie.md`, noms d'outillage). Le corpus n'était jamais touché.
//
// Depuis : le corpus markdown est publié tel quel. Il n'y a plus de rendu entre
// lui et le lecteur, donc réparer au rendu ne protégeait plus rien : la version
// brute partait sur GitHub. Les renvois ont donc été réécrits DANS le corpus, et
// REFORMULATIONS a été retirée avec eux.
//
// Règle qui en découle : le corpus doit être autonome à la source. INTERDITS
// est le garde-fou, et il est désormais le seul. Toute survivance est bloquante.
// Ajouter un motif ici plutôt que de rattraper à la main. La table contient
// nécessairement les mots qu'elle proscrit : c'est attendu, pas une fuite.

const INTERDITS: [RegExp, string][] = [
  [/chronologie\.md/g, "renvoi au suivi interne"],
  [/(?<![\w-])atelier\//g, "renvoi à l'atelier, hors du périmètre rendu par le site"],
  [/(?<![\w-])agy(?![\w-])/gi, "nom d'outillage brut"],
  [/erom-research:/g, "nom d'outillage interne"],
  [/methode-(recherche|jugement|synthese)/g, "fichier de méthode interne"],
  [/\/Users\/[a-z]/g, "chemin local"],
  [/\.claude\b/g, "arborescence d'outillage"],
  [/Ecarnot/g, "nom de famille (absent du site par choix du 01/08)"],
];

function md(text: string, source: string, deadList: Issue[]): string {
  const pre = renderDomainLinks(renderWikilinks(text, source, deadList));
  return marked.parse(pre) as string;
}

// backlinks + rendu des corps
for (const f of fiches.values()) {
  const outs = collectSlugs(f.body);
  f.out = [...new Set(outs)].filter((s) => s !== f.slug);
}
for (const f of fiches.values()) {
  for (const o of f.out) {
    const t = fiches.get(o);
    if (t && !t.in.includes(f.slug)) t.in.push(f.slug);
  }
}
for (const f of fiches.values()) {
  f.html = md(f.body, `base/${f.slug}.md`, report.liensMortsBase);
  f.txt = htmlToText(f.html);
}

// ---------------------------------------------------------------- jugements

type Bloc = { n: number; label: string; slugs: string[] };
type Piece = {
  slug: string; nom: string; verdict: string; dateVerdict: string | null;
  sections: Record<string, string>; charges: Bloc[]; decharges: Bloc[];
  ecartes: { label: string; slugs: string[] }[]; fiches: string[];
};

function splitSections(body: string): Map<string, string> {
  const out = new Map<string, string>();
  const parts = body.split(/^## +/m);
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    const title = part.slice(0, nl).trim();
    out.set(title, part.slice(nl + 1).trim());
  }
  return out;
}

/** blocs numérotés "**N. label...** corps" ; le label gras peut courir sur plusieurs lignes */
function splitBlocs(section: string): Bloc[] {
  const starts: { idx: number; n: number }[] = [];
  for (const m of section.matchAll(/^\*\*(\d+)\.\s/gm)) starts.push({ idx: m.index!, n: Number(m[1]) });
  return starts.map((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const bloc = section.slice(s.idx, end).trim();
    const lm = bloc.match(/^\*\*\d+\.\s([\s\S]*?)\*\*/);
    const label = lm ? lm[1].replace(/\s+/g, " ").trim() : bloc.slice(0, 120);
    return { n: s.n, label, slugs: [...new Set(collectSlugs(bloc))] };
  });
}

function splitEcartes(section: string): { label: string; slugs: string[] }[] {
  const items: string[] = [];
  let cur: string[] = [];
  for (const line of section.split("\n")) {
    if (/^- /.test(line)) { if (cur.length) items.push(cur.join("\n")); cur = [line]; }
    else if (cur.length) cur.push(line);
  }
  if (cur.length) items.push(cur.join("\n"));
  return items.map((it) => {
    const q = it.match(/«([\s\S]*?)»/);
    const label = q ? q[1].replace(/\s+/g, " ").trim() : it.replace(/^- /, "").slice(0, 100);
    return { label, slugs: [...new Set(collectSlugs(it))] };
  });
}

const SECTION_CHARGES = "Les charges qui tiennent";
const SECTION_DECHARGES = "Les décharges qui tiennent";
const SECTION_ECARTE = "Ce qui est écarté";

const pieceFiles = readdirSync(JUG).filter((f) => f.endsWith(".md") && !["plan.md", "synthese.md"].includes(f)).sort();
const pieces = new Map<string, Piece>();

function addRole(slug: string, role: Role) {
  const f = fiches.get(slug);
  report.citationsJugements++;
  // les liens morts sont comptés au rendu (chaque texte passe une fois par md())
  if (!f) return;
  f.roles.push(role);
}

for (const file of pieceFiles) {
  const slug = basename(file, ".md");
  const raw = readFileSync(join(JUG, file), "utf-8");
  const parsed = parseFrontmatter(raw, file);
  if (!parsed) { report.erreursParse.push({ where: `jugement/${file}`, what: "frontmatter introuvable" }); continue; }
  const { fm, body } = parsed;
  const sections = splitSections(body);

  for (const s of ["Périmètre", SECTION_CHARGES, SECTION_DECHARGES, SECTION_ECARTE, "Verdict"]) {
    if (!sections.has(s)) report.sectionsManquantes.push({ where: `jugement/${file}`, what: s });
  }

  const src = `jugement/${file}`;
  const charges = splitBlocs(sections.get(SECTION_CHARGES) ?? "");
  const decharges = splitBlocs(sections.get(SECTION_DECHARGES) ?? "");
  const ecartes = splitEcartes(sections.get(SECTION_ECARTE) ?? "");

  for (const b of charges) for (const s of b.slugs) addRole(s, { piece: slug, kind: "charge", n: b.n, label: b.label });
  for (const b of decharges) for (const s of b.slugs) addRole(s, { piece: slug, kind: "decharge", n: b.n, label: b.label });
  for (const e of ecartes) for (const s of e.slugs) addRole(s, { piece: slug, kind: "ecartee", n: null, label: e.label });
  for (const s of new Set(collectSlugs(sections.get("Périmètre") ?? ""))) addRole(s, { piece: slug, kind: "perimetre", n: null, label: "" });
  for (const s of new Set(collectSlugs(sections.get("Verdict") ?? ""))) addRole(s, { piece: slug, kind: "verdict", n: null, label: "" });

  const rendered: Record<string, string> = {};
  for (const [name, text] of sections) rendered[name] = md(text, src, report.liensMortsJugement);

  const domFiches = [...fiches.values()].filter((f) => f.d.includes(slug)).sort((a, b) => a.dt.localeCompare(b.dt)).map((f) => f.slug);

  const verdict = normalizeVerdict(String(fm.verdict ?? ""));
  if (!(VERDICTS as readonly string[]).includes(verdict)) {
    report.verdictsMismatch.push({ where: slug, what: `verdict hors échelle « ${verdict} »` });
  }
  pieces.set(slug, {
    slug,
    nom: DOMAINE_NOMS[slug] ?? slug,
    verdict,
    dateVerdict: (fm.date_verdict as string) ?? null,
    sections: rendered,
    charges, decharges, ecartes,
    fiches: domFiches,
  });
}

// ---------------------------------------------------------------- synthèse

const synRaw = readFileSync(join(JUG, "synthese.md"), "utf-8");
const synParsed = parseFrontmatter(synRaw, "synthese.md") ?? { fm: {} as Record<string, unknown>, body: synRaw };
const synSections = splitSections(synParsed.body);
const SRC_SYN = "jugement/synthese.md";

// table des 15 verdicts = source de vérité de l'ordre
const tableSection = synSections.get("La table des quinze verdicts") ?? "";
const ordreDomaines: string[] = [];
for (const row of tableSection.matchAll(/^\|\s*\d+\s*\|\s*([a-z-]+)\s*\|\s*\[([^\]]+)\]\([^)]*\)\s*\|\s*([0-9-]*)\s*\|/gm)) {
  const [, slug, verdictTxt, dateTxt] = row;
  ordreDomaines.push(slug);
  const piece = pieces.get(slug);
  if (!piece) { report.verdictsMismatch.push({ where: "table synthèse", what: `pièce absente : ${slug}` }); continue; }
  if (piece.verdict !== normalizeVerdict(verdictTxt)) {
    report.verdictsMismatch.push({ where: slug, what: `table "${normalizeVerdict(verdictTxt)}" vs frontmatter "${piece.verdict}"` });
  }
  // La date de la table dit au lecteur de quand date chaque appréciation. Une pièce
  // révisée sans que la table suive donne une synthèse qui périme en silence : c'est
  // arrivé le 04/08/2026 sur huit des quinze lignes, invisible au build d'alors.
  if (dateTxt.trim() !== (piece.dateVerdict ?? "")) {
    report.verdictsMismatch.push({ where: slug, what: `date_verdict table "${dateTxt.trim()}" vs frontmatter "${piece.dateVerdict ?? "(absente)"}"` });
  }
}

type Fil = { kind: "charge" | "decharge"; n: number; label: string; html: string; fiches: string[]; pieces: string[] };
const fils: Fil[] = [];

function parseFils(sectionName: string, kind: Fil["kind"]) {
  const section = synSections.get(sectionName) ?? "";
  if (!section) { report.sectionsManquantes.push({ where: SRC_SYN, what: sectionName }); return; }
  const starts: { idx: number; n: number }[] = [];
  for (const m of section.matchAll(/^\*\*(\d+)\.\s/gm)) starts.push({ idx: m.index!, n: Number(m[1]) });
  starts.forEach((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const bloc = section.slice(s.idx, end).trim();
    const lm = bloc.match(/^\*\*\d+\.\s([\s\S]*?)\*\*/);
    const label = lm ? lm[1].replace(/\s+/g, " ").trim() : bloc.slice(0, 120);
    const slugsOrdered: string[] = [];
    for (const mm of bloc.matchAll(WIKILINK)) { const sl = mm[1].trim(); if (!slugsOrdered.includes(sl)) slugsOrdered.push(sl); }
    const piecesCited: string[] = [];
    for (const mm of bloc.matchAll(/\]\(([a-z-]+)\.md\)/g)) { const p = mm[1]; if (DOMAINE_NOMS[p] && !piecesCited.includes(p)) piecesCited.push(p); }
    for (const sl of slugsOrdered) addRole(sl, { piece: "synthese", kind: `fil-${kind}`, n: s.n, label });
    fils.push({ kind, n: s.n, label, html: md(bloc, SRC_SYN, report.liensMortsJugement), fiches: slugsOrdered, pieces: piecesCited });
  });
}
parseFils("Les fils transverses à charge", "charge");
parseFils("Les fils transverses à décharge", "decharge");

// rôles des sections écartés / verdict d'ensemble de la synthèse
const synEcartes = synSections.get("Ce qui est écarté") ?? "";
for (const e of splitEcartes(synEcartes)) for (const s of e.slugs) addRole(s, { piece: "synthese", kind: "ecartee", n: null, label: e.label });
for (const s of new Set(collectSlugs(synSections.get("Verdict d'ensemble") ?? ""))) addRole(s, { piece: "synthese", kind: "verdict", n: null, label: "" });

const synthese = {
  verdict: normalizeVerdict(String(synParsed.fm.verdict ?? "defavorable")),
  dateVerdict: (synParsed.fm.date_verdict as string) ?? null,
  perimetreHtml: md(synSections.get("Périmètre et limites") ?? "", SRC_SYN, report.liensMortsJugement),
  ecartesHtml: md(synEcartes, SRC_SYN, report.liensMortsJugement),
  verdictHtml: md(synSections.get("Verdict d'ensemble") ?? "", SRC_SYN, report.liensMortsJugement),
  fils,
};

// ---------------------------------------------------------------- acteurs

type ActeurAgg = { nom: string; fiches: string[]; portefeuilles: string[]; gouvs: string[] };
const ministres = new Map<string, ActeurAgg>();
const gouvernements = new Map<string, string[]>();
for (const g of GOUVERNEMENTS) gouvernements.set(g, []);

for (const f of fiches.values()) {
  for (const m of f.act.m) {
    const key = m.n;
    if (!key) continue;
    const agg = ministres.get(key) ?? { nom: key, fiches: [], portefeuilles: [], gouvs: [] };
    agg.fiches.push(f.slug);
    if (m.pf && !agg.portefeuilles.includes(m.pf)) agg.portefeuilles.push(m.pf);
    for (const g of f.act.gv) if (!agg.gouvs.includes(g)) agg.gouvs.push(g);
    ministres.set(key, agg);
  }
  for (const g of f.act.gv) gouvernements.get(g)?.push(f.slug);
}
for (const agg of ministres.values()) {
  agg.fiches.sort((a, b) => (fiches.get(a)!.dt).localeCompare(fiches.get(b)!.dt));
  agg.gouvs.sort((a, b) => (GOUVERNEMENTS as readonly string[]).indexOf(a) - (GOUVERNEMENTS as readonly string[]).indexOf(b));
}
for (const [g, list] of gouvernements) gouvernements.set(g, [...new Set(list)].sort((a, b) => (fiches.get(a)!.dt).localeCompare(fiches.get(b)!.dt)));

// ---------------------------------------------------------------- graphe

const graph = new Graph({ type: "undirected", multi: false });
for (const f of fiches.values()) graph.addNode(f.slug);
for (const f of fiches.values()) {
  for (const o of f.out) {
    if (fiches.has(o) && !graph.hasEdge(f.slug, o)) graph.addEdge(f.slug, o);
  }
}
report.aretes = graph.size;
circular.assign(graph, { scale: 100 });
const settings = forceAtlas2.inferSettings(graph);
forceAtlas2.assign(graph, { iterations: 600, settings });

const nodes = [...fiches.values()].map((f) => {
  const attrs = graph.getNodeAttributes(f.slug) as { x: number; y: number };
  const deg = graph.degree(f.slug);
  return { id: f.slug, x: Math.round(attrs.x * 10) / 10, y: Math.round(attrs.y * 10) / 10, s: deg, dom: f.d[0] ?? "?" };
});
const edges = graph.edges().map((e) => [graph.source(e), graph.target(e)]);

// ---------------------------------------------------------------- promesses
//
// Exception nommée et unique à la règle « le pipeline ne lit jamais l'atelier ».
// Les 221 engagements des deux programmes de campagne ne sont pas des pièces du
// socle : ils ne sont ni datés ni gradés, et leurs verdicts n'ont pas été sondés
// source par source. Ils n'ont donc pas leur place dans base/, et la vue qui les
// rend le dit en toutes lettres au lecteur.
//
// La table est lue à sa source plutôt que recopiée dans src/ : un doublon aurait
// dérivé en silence dès la première révision d'un verdict. Le prix de cette
// exception est le contrôle ci-dessous, bloquant : effectif attendu, verdicts
// dans le vocabulaire admis, et décompte du document confronté aux lignes lues.

const PROMESSES_REL = "atelier/programmes-officiels/promesses-electorales-verdicts.md";
const PROMESSES_ATTENDUES = 221;

type Promesse = { id: string; an: string; txt: string; v: "TENUE" | "NON" };

const promesses: Promesse[] = [];
const promessesPath = join(POL, PROMESSES_REL);
if (!existsSync(promessesPath)) {
  report.compteursMismatch.push({ where: PROMESSES_REL, what: "document des verdicts de promesses introuvable" });
} else {
  const raw = readFileSync(promessesPath, "utf-8");
  for (const m of raw.matchAll(/^\| (P(20\d{2})-\d{3}) \| (.+?) \| (TENUE|NON) \|$/gm)) {
    promesses.push({ id: m[1], an: m[2], txt: m[3].trim(), v: m[4] as "TENUE" | "NON" });
  }
  if (promesses.length !== PROMESSES_ATTENDUES) {
    report.compteursMismatch.push({
      where: PROMESSES_REL,
      what: `${promesses.length} promesses lues, ${PROMESSES_ATTENDUES} attendues : le tableau des verdicts a changé de forme`,
    });
  }
}

const promessesTenues = promesses.filter((p) => p.v === "TENUE").length;

// ---------------------------------------------------------------- sortie data.js

mkdirSync(DIST, { recursive: true });

const data = {
  fiches: Object.fromEntries(
    [...fiches.values()].map((f) => [f.slug, {
      t: f.t, ty: f.ty, d: f.d, dt: f.dt, df: f.df, g: f.g, st: f.st,
      // publiabilité : une source non-URL (archive locale) est réduite à son nom de fichier
      src: f.src.map((s) => (/^https?:\/\//.test(s) ? s : (s.includes("/") ? s.split("/").pop() ?? s : s))),
      act: f.act, html: f.html, txt: f.txt, out: f.out, in: f.in, roles: f.roles,
    }]),
  ),
  domaines: Object.fromEntries(
    [...pieces.values()].map((p) => [p.slug, {
      nom: p.nom, verdict: p.verdict, dateVerdict: p.dateVerdict, sections: p.sections,
      charges: p.charges, decharges: p.decharges, ecartes: p.ecartes, fiches: p.fiches,
    }]),
  ),
  ordreDomaines,
  domaineNoms: DOMAINE_NOMS,
  gouvernements: Object.fromEntries(gouvernements),
  ordreGouvernements: GOUVERNEMENTS,
  ministres: Object.fromEntries([...ministres.entries()].sort((a, b) => b[1].fiches.length - a[1].fiches.length)),
  synthese,
  graphe: { nodes, edges },
  promesses,
  buildDate: new Date().toISOString().slice(0, 10),
};

const json = JSON.stringify(data).replace(/<\//g, "<\\/");

// Garde de publiabilité : dernier filet avant écriture, sur le payload complet
// (corps rendus, index de recherche, frontmatter, sources). Toute survivance
// est bloquante : le corpus a bougé, une tournure n'est pas couverte.
for (const [re, quoi] of INTERDITS) {
  for (const m of json.matchAll(re)) {
    const i = m.index ?? 0;
    const extrait = json.slice(Math.max(0, i - 70), i + 70).replace(/\s+/g, " ");
    report.fuitesInternes.push({ where: `dist/data.js @${i}`, what: `${quoi} — « ...${extrait}... »` });
  }
}

writeFileSync(join(DIST, "data.js"), `window.ATLAS=${json};\n`);

// ---------------------------------------------------------------- assets front

const SRC = join(ATLAS, "src");
// og.png : carte de partage servie aux scrapers sociaux, source dans reseaux-sociaux/og-card.html.
for (const f of ["index.html", "style.css", "og.png"]) {
  const p = join(SRC, f);
  if (existsSync(p)) copyFileSync(p, join(DIST, f));
}
const fontsEmbarquees: string[] = [];
const FONTS_SYS = join(process.env.HOME ?? "", "Library", "Fonts");
mkdirSync(join(DIST, "fonts"), { recursive: true });
for (const f of ["JetBrainsMono-Regular.ttf", "JetBrainsMono-Medium.ttf", "JetBrainsMono-SemiBold.ttf"]) {
  const p = join(FONTS_SYS, f);
  if (existsSync(p)) { copyFileSync(p, join(DIST, "fonts", f)); fontsEmbarquees.push(f); }
}

// ---------------------------------------------------------- briefs de domaine
//
// Une page autonome par domaine jugé, sous dist/briefs/<slug>/, en design
// system institut. Spec : docs/2026-08-07-briefs-domaines.md.
//
// Le partage des rôles est la clé et il ne se négocie pas : TOUT ce qui porte
// un chiffre, un verdict ou une date est calculé ici et écrit en HTML statique ;
// la page source n'arrange que des blocs. Une pièce révisée met donc le brief à
// jour au prochain build, sans qu'on y touche. C'est la leçon de PROMESSES_REL,
// appliquée avant d'avoir eu à la repayer.
//
// Corollaire pour le référencement : le registre, les chiffres et les intitulés
// du jugement existent dans le fichier servi, sans exécution de JavaScript. Le
// script de la page ne fait qu'ajouter le survol et les filtres.

const SITE = "https://macronisme-le-bilan.netlify.app";
const DEPOT = "https://github.com/eRom/macronisme-le-bilan";
const BRIEFS_SRC = join(ATLAS, "briefs");
const BRIEFS_DIST = join(DIST, "briefs");

const VERDICT_LABELS: Record<string, string> = {
  "tres-favorable": "Très favorable", favorable: "Favorable", mitige: "Mitigé",
  defavorable: "Défavorable", "gravement-defavorable": "Gravement défavorable",
};
const TYPE_LABELS: Record<string, string> = {
  mesure: "Mesure", affaire: "Affaire", promesse: "Promesse", declaration: "Déclaration",
};
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const frDate = (d: string): string => {
  const [y, m, j] = d.split("-");
  return `${Number(j)}${Number(j) === 1 ? "er" : ""} ${MOIS[Number(m) - 1]} ${y}`;
};
const frNombre = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const frPct = (n: number, d: number): string => ((n / d) * 100).toFixed(1).replace(".", ",") + " %";

/** Largeur et hauteur d'un PNG, lues dans le bloc IHDR. Évite une dépendance pour un contrôle de format. */
function tailleePng(p: string): { w: number; h: number } | null {
  const buf = readFileSync(p);
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

type BriefConf = {
  titre_seo?: string; description?: string;
  chiffre_signature?: { valeur: string; legende: string; fiche: string };
  og_genere_le?: string; og_verdict?: string; og_date_verdict?: string;
  og_compteurs?: { fiches?: number; citees?: number };
};

const briefDirs = existsSync(BRIEFS_SRC)
  ? readdirSync(BRIEFS_SRC, { withFileTypes: true }).filter((e) => e.isDirectory() && e.name !== "_socle").map((e) => e.name).sort()
  : [];

if (briefDirs.length > 0) {
  mkdirSync(BRIEFS_DIST, { recursive: true });
  // Socle commun aux quinze : feuille du design system, fontes auto-hébergées,
  // socle structurel des briefs. Copié une fois, pas quinze.
  cpSync(join(BRIEFS_SRC, "_socle"), join(BRIEFS_DIST, "_socle"), { recursive: true });
}

for (const slug of briefDirs) {
  const dir = join(BRIEFS_SRC, slug);
  const ou = `atlas/briefs/${slug}`;
  const piece = pieces.get(slug);
  if (!piece) {
    report.briefs.push({ where: ou, what: `aucune pièce de jugement « ${slug}.md » dans jugement/` });
    continue;
  }
  const pageSrc = join(dir, "index.html");
  if (!existsSync(pageSrc)) { report.briefs.push({ where: ou, what: "index.html introuvable" }); continue; }

  let conf: BriefConf = {};
  const confPath = join(dir, "brief.json");
  if (!existsSync(confPath)) report.briefs.push({ where: ou, what: "brief.json introuvable" });
  else {
    try { conf = JSON.parse(readFileSync(confPath, "utf-8")) as BriefConf; }
    catch (e) { report.briefs.push({ where: `${ou}/brief.json`, what: `JSON illisible : ${(e as Error).message}` }); }
  }

  // --- mesures du domaine, toutes prises sur le corpus, aucune saisie à la main
  const domFiches = [...fiches.values()].filter((f) => f.d.includes(slug)).sort((a, b) => a.dt.localeCompare(b.dt));
  // « citée » = invoquée par une charge ou une décharge. Le périmètre, le verdict
  // et la section des écartés ne comptent pas : on marque ce qui PORTE le jugement.
  const citees = new Set([...piece.charges, ...piece.decharges].flatMap((b) => b.slugs));
  const urlsDom = new Set<string>();
  for (const f of domFiches) for (const u of f.src) if (/^https?:\/\//.test(u.trim())) urlsDom.add(u.trim());
  const gradesDom = new Map<string, number>();
  for (const f of domFiches) gradesDom.set(f.g, (gradesDom.get(f.g) ?? 0) + 1);

  const compteurs = {
    fiches: domFiches.length,
    citees: domFiches.filter((f) => citees.has(f.slug)).length,
    urls: urlsDom.size,
    charges: piece.charges.length,
    decharges: piece.decharges.length,
    gradeA: gradesDom.get("A") ?? 0,
  };
  const verdictLibelle = VERDICT_LABELS[piece.verdict] ?? piece.verdict;
  const dv = piece.dateVerdict;
  if (!dv) report.briefs.push({ where: ou, what: "la pièce de jugement n'a pas de date_verdict" });

  // --- contrôle : aucun chiffre, verdict ni date figé dans la page source.
  // Confronté aux valeurs réelles plutôt qu'à des motifs génériques : le contrôle
  // suit le corpus au lieu de deviner ce qui ressemble à un chiffre.
  const pageBrut = readFileSync(pageSrc, "utf-8");
  const nu = pageBrut.replace(/<!--[\s\S]*?-->/g, "");
  const interdits: [string, string][] = [
    [verdictLibelle, "le verdict"],
    ...(dv ? ([[dv, "la date d'appréciation (ISO)"], [frDate(dv), "la date d'appréciation (en clair)"]] as [string, string][]) : []),
    // Seuls les compteurs à deux chiffres ou plus sont cherchés tels quels : un
    // « 4 » isolé se rencontre légitimement dans du code (indices, découpages),
    // et un contrôle qui crie au loup finit désarmé. Les petits compteurs sont
    // couverts par le motif rédigé ci-dessous.
    ...Object.entries(compteurs).filter(([, v]) => v >= 10).map(([k, v]) => [String(v), `le compteur « ${k} »`] as [string, string]),
  ];
  for (const [valeur, quoi] of interdits) {
    const re = new RegExp(`(?<![\\w-])${valeur.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`);
    if (re.test(nu)) {
      report.briefs.push({ where: `${ou}/index.html`, what: `${quoi} est écrit en dur (« ${valeur} ») : la page doit le recevoir du build` });
    }
  }
  const rediges = nu.match(/\d+\s*(?:charges?|décharges?|pièces?|URL|sources? distinctes?)\b/gi) ?? [];
  for (const r of new Set(rediges)) {
    report.briefs.push({ where: `${ou}/index.html`, what: `compteur rédigé en dur (« ${r.trim()} ») : la page doit le recevoir du build` });
  }

  // --- contrôle : le chiffre de signature renvoie à une fiche qui existe
  const sig = conf.chiffre_signature;
  if (!sig) report.briefs.push({ where: `${ou}/brief.json`, what: "chiffre_signature absent" });
  else if (!fiches.has(sig.fiche)) {
    report.briefs.push({ where: `${ou}/brief.json`, what: `chiffre_signature.fiche « ${sig.fiche} » n'existe pas dans base/` });
  }

  // --- contrôle : la carte de partage et ce contre quoi elle a été produite.
  // Ses pixels sont illisibles au build ; on contrôle donc sa métadonnée. Une
  // carte qui annonce un verdict périmé ment au lecteur avant même le clic.
  const ogPath = join(dir, "og.png");
  if (!existsSync(ogPath)) report.briefs.push({ where: ou, what: "og.png introuvable" });
  else {
    const t = tailleePng(ogPath);
    if (!t) report.briefs.push({ where: `${ou}/og.png`, what: "PNG illisible" });
    else if (t.w !== 1200 || t.h !== 630) {
      report.briefs.push({ where: `${ou}/og.png`, what: `format ${t.w}×${t.h}, attendu 1200×630` });
    }
    const ecarts: string[] = [];
    if (conf.og_verdict !== piece.verdict) ecarts.push(`verdict « ${conf.og_verdict ?? "(absent)"} » vs « ${piece.verdict} »`);
    if (conf.og_date_verdict !== dv) ecarts.push(`date_verdict « ${conf.og_date_verdict ?? "(absente)"} » vs « ${dv ?? "(absente)"} »`);
    if (conf.og_compteurs?.fiches !== compteurs.fiches) ecarts.push(`fiches ${conf.og_compteurs?.fiches ?? "(absent)"} vs ${compteurs.fiches}`);
    if (conf.og_compteurs?.citees !== compteurs.citees) ecarts.push(`citées ${conf.og_compteurs?.citees ?? "(absent)"} vs ${compteurs.citees}`);
    if (ecarts.length) {
      report.briefs.push({
        where: `${ou}/og.png`,
        what: `la carte a été produite contre un état périmé (${ecarts.join(" ; ")}). Régénérer l'image, puis mettre brief.json à jour.`,
      });
    }
  }

  // --- fragments statiques
  const lienFiche = (s: string) => `${SITE}/#/fiche/${s}`;
  const lienPiece = `${SITE}/#/domaine/${slug}`;

  const bandeau =
    `<p class="b-marque">Macronisme 2017-2026 · le bilan</p>` +
    `<h1 class="b-domaine">${escapeHtml(piece.nom)}</h1>` +
    `<p class="b-verdict">Verdict&nbsp;: <b>${escapeHtml(verdictLibelle)}</b>` +
    `<span class="b-quand">appréciation portée le <time datetime="${dv ?? ""}">${dv ? frDate(dv) : "date inconnue"}</time></span></p>`;

  const chiffre = (v: string, l: string) => `<li><b>${v}</b><span>${l}</span></li>`;
  const chiffres =
    `<ul class="b-chiffres">` +
    chiffre(frNombre(compteurs.fiches), "pièces datées et sourcées") +
    chiffre(frNombre(compteurs.citees), "portent le jugement") +
    chiffre(frNombre(compteurs.urls), "URL sources distinctes") +
    chiffre(frPct(compteurs.gradeA, compteurs.fiches), "de grade A") +
    chiffre(frNombre(compteurs.charges), compteurs.charges > 1 ? "charges qui tiennent" : "charge qui tient") +
    chiffre(frNombre(compteurs.decharges), compteurs.decharges > 1 ? "décharges qui tiennent" : "décharge qui tient") +
    `</ul>` +
    (sig
      ? `<figure class="b-signature"><b>${escapeHtml(sig.valeur)}</b>` +
        `<figcaption>${escapeHtml(sig.legende)} — <a href="${lienFiche(sig.fiche)}">la pièce qui l'établit</a></figcaption></figure>`
      : "");

  const annees: string[] = [];
  if (domFiches.length) {
    const a0 = Number(domFiches[0].dt.slice(0, 4)), a1 = Number(domFiches[domFiches.length - 1].dt.slice(0, 4));
    for (let a = a0; a <= a1; a++) annees.push(String(a));
  }

  const frise =
    `<div class="b-frise">` +
    annees.map((an) => {
      const l = domFiches.filter((f) => f.dt.startsWith(an));
      const tuiles = l.map((f) =>
        `<button type="button" class="b-tuile${citees.has(f.slug) ? " est-citee" : ""}" data-slug="${f.slug}"` +
        ` data-type="${escapeHtml(f.ty)}" aria-label="${escapeHtml(`${frDate(f.dt)} · ${f.t}`)}"></button>`
      ).join("");
      return `<div class="b-col"><div class="b-pile">${tuiles}</div>` +
        `<div class="b-an">${an}</div><div class="b-eff">${l.length}</div></div>`;
    }).join("") +
    `</div>`;

  const blocs = (items: Bloc[], titre: string, cls: string) =>
    `<section class="b-bloc ${cls}"><h3 class="b-bloc-titre">${titre}</h3><ol>` +
    items.map((b) => `<li>${escapeHtml(b.label)}</li>`).join("") +
    `</ol></section>`;
  const jugement =
    blocs(piece.charges, "Les charges qui tiennent", "b-charges") +
    blocs(piece.decharges, "Les décharges qui tiennent", "b-decharges") +
    `<p class="b-vers-piece"><a href="${lienPiece}">Lire le jugement complet, ses attendus et ce qu'il écarte</a></p>`;

  const registre =
    annees.map((an) => {
      const l = domFiches.filter((f) => f.dt.startsWith(an));
      if (!l.length) return "";
      return `<section class="b-reg-an"><h3>${an}<span>${l.length} pièce${l.length > 1 ? "s" : ""}</span></h3><ol>` +
        l.map((f) =>
          `<li class="b-reg-ligne${citees.has(f.slug) ? " est-citee" : ""}" data-type="${escapeHtml(f.ty)}">` +
          `<time class="b-reg-date" datetime="${f.dt}">${frDate(f.dt)}</time>` +
          `<a class="b-reg-titre" href="${lienFiche(f.slug)}">${escapeHtml(f.t)}</a>` +
          `<span class="b-reg-meta"><span class="b-reg-type">${TYPE_LABELS[f.ty] ?? escapeHtml(f.ty)}</span>` +
          `<span class="b-reg-grade" title="grade ${escapeHtml(f.g)}">${escapeHtml(f.g)}</span></span></li>`
        ).join("") + `</ol></section>`;
    }).join("");

  const url = `${SITE}/briefs/${slug}/`;
  const titreSeo = conf.titre_seo ?? `${piece.nom} : le bilan Macron 2017-2026 en ${compteurs.fiches} pièces datées`;
  const description = conf.description
    ?? `${compteurs.fiches} pièces datées et sourcées sur ${piece.nom.toLowerCase()} sous Emmanuel Macron, ${compteurs.urls} URL distinctes. Verdict ${verdictLibelle.toLowerCase()}, ${compteurs.charges} charges et ${compteurs.decharges} décharges. Les faits sont séparés des jugements.`;
  const alt = `${piece.nom} · le bilan Macron 2017-2026 : verdict ${verdictLibelle.toLowerCase()}, ${compteurs.fiches} pièces datées et sourcées.`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org", "@type": "Report",
    name: `${piece.nom} — bilan des deux quinquennats Macron`,
    about: piece.nom, inLanguage: "fr-FR", url,
    datePublished: dv ?? undefined, dateModified: dv ?? undefined,
    author: { "@type": "Person", name: "eRom" },
    isPartOf: { "@type": "Dataset", name: "Macronisme 2017-2026 · le bilan", url: `${SITE}/` },
    citation: `${compteurs.urls} sources primaires et de presse distinctes`,
  }).replace(/</g, "\\u003c");

  const meta = [
    `<title>${escapeHtml(titreSeo)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    // URL absolue obligatoire : les scrapers sociaux ne résolvent pas le relatif.
    `<meta property="og:title" content="${escapeHtml(titreSeo)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="Macronisme · le bilan" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${url}og.png" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(titreSeo)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${url}og.png" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(alt)}" />`,
    `<script type="application/ld+json">${jsonld}</script>`,
  ].join("\n  ");

  const donnees = `<script>window.BRIEF=${JSON.stringify({
    domaine: slug, nom: piece.nom, verdict: piece.verdict, verdict_libelle: verdictLibelle,
    date_verdict: dv, compteurs,
    // tyk = le type tel qu'il est écrit dans le frontmatter, seule clé commune
    // avec le data-type des lignes du registre ; ty = son libellé affichable.
    fiches: Object.fromEntries(domFiches.map((f) => [f.slug, {
      d: frDate(f.dt), t: f.t, tyk: f.ty, ty: TYPE_LABELS[f.ty] ?? f.ty, g: f.g, c: citees.has(f.slug),
    }])),
    liens: { piece: lienPiece, fiche: `${SITE}/#/fiche/`, site: `${SITE}/`, depot: DEPOT },
  }).replace(/<\//g, "<\\/")};</script>`;

  const REMPLACEMENTS: Record<string, string> = {
    TETE: meta, BANDEAU: bandeau, CHIFFRES: chiffres, FRISE: frise,
    JUGEMENT: jugement, REGISTRE: registre, DONNEES: donnees,
  };
  let page = pageBrut;
  for (const [cle, valeur] of Object.entries(REMPLACEMENTS)) {
    const marqueur = `<!--BRIEF:${cle}-->`;
    if (!page.includes(marqueur)) { report.briefs.push({ where: `${ou}/index.html`, what: `marqueur ${marqueur} absent` }); continue; }
    page = page.replaceAll(marqueur, valeur);
  }
  const restants = [...page.matchAll(/<!--BRIEF:([A-Z]+)-->/g)].map((m) => m[1]);
  for (const r of new Set(restants)) report.briefs.push({ where: `${ou}/index.html`, what: `marqueur <!--BRIEF:${r}--> inconnu de l'émetteur` });

  // La page source est abondamment commentée pour qui la reprend ; le lecteur du
  // site, lui, n'a que faire de l'architecture du build. Les commentaires sont
  // retirés du rendu, jamais de la source.
  page = page.replace(/<!--[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n");

  const dest = join(BRIEFS_DIST, slug);
  mkdirSync(dest, { recursive: true });
  writeFileSync(join(dest, "index.html"), page);
  if (existsSync(ogPath)) copyFileSync(ogPath, join(dest, "og.png"));
  for (const extra of readdirSync(dir)) {
    if (["index.html", "brief.json", "og.png"].includes(extra)) continue;
    copyFileSync(join(dir, extra), join(dest, extra));
  }
  report.briefsEmis.push(`${slug} — ${compteurs.fiches} pièces, ${compteurs.citees} citées, verdict ${piece.verdict}`);
}

// ---------------------------------------------------------------- rapport

const grades = new Map<string, number>();
const types = new Map<string, number>();
for (const f of fiches.values()) {
  grades.set(f.g, (grades.get(f.g) ?? 0) + 1);
  types.set(f.ty, (types.get(f.ty) ?? 0) + 1);
}

// ------------------------------------------- compteurs publics (bloquant)
//
// Les documents publics annoncent des chiffres sur le corpus, et rien ne les
// tenait : le 04/08/2026, README.md et METHODE.md affichaient encore 531 fiches
// et 879 URL quand base/ en portait 534 et 915, avec des grades et une
// répartition par domaine faux d'autant. Chaque règle ci-dessous confronte un
// chiffre écrit à la mesure faite sur le corpus. Un écart est bloquant.
//
// Ajouter une règle plutôt que de corriger un chiffre à la main : une
// correction manuelle ne protège que du décalage d'aujourd'hui.

const urlDistinctes = new Set<string>();
const occurrencesSource = new Map<string, number>();
const tagsDomaines = new Map<string, number>();
for (const f of fiches.values()) {
  for (const u of f.src) {
    const t = u.trim();
    if (!/^https?:\/\//.test(t)) continue;
    urlDistinctes.add(t);
    const host = /^https?:\/\/(?:www\.)?([^/]+)/.exec(t)?.[1];
    if (host) occurrencesSource.set(host, (occurrencesSource.get(host) ?? 0) + 1);
  }
  for (const d of f.d) tagsDomaines.set(d, (tagsDomaines.get(d) ?? 0) + 1);
}

const part = (n: number) => ((n / fiches.size) * 100).toFixed(1).replace(".", ",");

type Regle = {
  fichier: string;
  motif: RegExp;
  lu: (m: RegExpExecArray) => string;
  attendu: (m: RegExpExecArray) => string | null;
  quoi: (m: RegExpExecArray) => string;
};

const nb = (n: number | undefined) => (n === undefined ? null : String(n));

const REGLES_COMPTEURS: Regle[] = [
  // Total de fiches, sous toutes ses formes rédigées.
  { fichier: "README.md", motif: /(\d{3}) fiches/g, lu: (m) => m[1], attendu: () => String(fiches.size), quoi: () => "fiches du corpus" },
  { fichier: "README.md", motif: /\| Fiches \| (\d+) \|/g, lu: (m) => m[1], attendu: () => String(fiches.size), quoi: () => "fiches du corpus" },
  { fichier: "METHODE.md", motif: /(\d{3}) fiches/g, lu: (m) => m[1], attendu: () => String(fiches.size), quoi: () => "fiches du corpus" },
  { fichier: "METHODE.md", motif: /dépasse\s+(\d{3}) au total/g, lu: (m) => m[1], attendu: () => String(fiches.size), quoi: () => "fiches du corpus" },
  { fichier: "atlas/src/index.html", motif: /(\d{3}) pièces/g, lu: (m) => m[1], attendu: () => String(fiches.size), quoi: () => "fiches du corpus" },

  // URL distinctes citées en frontmatter.
  { fichier: "README.md", motif: /(\d{3}) URL distinctes/g, lu: (m) => m[1], attendu: () => String(urlDistinctes.size), quoi: () => "URL distinctes" },
  { fichier: "README.md", motif: /\| URL sources distinctes \| (\d+) \|/g, lu: (m) => m[1], attendu: () => String(urlDistinctes.size), quoi: () => "URL distinctes" },
  { fichier: "METHODE.md", motif: /(\d{3}) URL distinctes/g, lu: (m) => m[1], attendu: () => String(urlDistinctes.size), quoi: () => "URL distinctes" },
  { fichier: "atlas/src/index.html", motif: /(\d{3}) URL sources distinctes/g, lu: (m) => m[1], attendu: () => String(urlDistinctes.size), quoi: () => "URL distinctes" },

  // Répartition des grades, effectif et part.
  { fichier: "README.md", motif: /\| Grade ([ABCD]) \([^|]*\) \| (\d+) \((\d+,\d) %\) \|/g, lu: (m) => `${m[2]} (${m[3]} %)`, attendu: (m) => `${grades.get(m[1]) ?? 0} (${part(grades.get(m[1]) ?? 0)} %)`, quoi: (m) => `grade ${m[1]}` },
  { fichier: "README.md", motif: /\| Grade D \([^|]*\) \| (\d+) \|/g, lu: (m) => m[1], attendu: () => String(grades.get("D") ?? 0), quoi: () => "grade D" },
  { fichier: "METHODE.md", motif: /^\| ([ABCD]) \| (\d+) \| (\d+(?:,\d)?) % \|/gm, lu: (m) => `${m[2]} (${m[3]} %)`, attendu: (m) => { const n = grades.get(m[1]) ?? 0; return `${n} (${n === 0 ? "0" : part(n)} %)`; }, quoi: (m) => `grade ${m[1]}` },

  // Fiches par domaine (multi-tagging) et occurrences par source.
  { fichier: "METHODE.md", motif: /^\| `([a-z-]+)` \| (\d+) \|/gm, lu: (m) => m[2], attendu: (m) => nb(tagsDomaines.get(m[1])), quoi: (m) => `fiches du domaine ${m[1]}` },
  { fichier: "METHODE.md", motif: /^\| ([a-z0-9-]+(?:\.[a-z0-9-]+)+) \| (\d+) \|/gm, lu: (m) => m[2], attendu: (m) => nb(occurrencesSource.get(m[1])), quoi: (m) => `occurrences de ${m[1]}` },

  // Verdicts des promesses : le décompte rédigé dans le document confronté aux
  // lignes que le build en a réellement lues. Le front, lui, ne compte rien en
  // dur, il recompte A.promesses à l'affichage.
  {
    fichier: PROMESSES_REL,
    motif: /^\| (2017|2022) \| (\d+) \| (\d+) \| (\d+) \|/gm,
    lu: (m) => `${m[2]} tenues, ${m[3]} non tenues, ${m[4]} au total`,
    attendu: (m) => {
      const lot = promesses.filter((p) => p.an === m[1]);
      if (lot.length === 0) return null;
      const t = lot.filter((p) => p.v === "TENUE").length;
      return `${t} tenues, ${lot.length - t} non tenues, ${lot.length} au total`;
    },
    quoi: (m) => `verdicts du programme ${m[1]}`,
  },
];

for (const r of REGLES_COMPTEURS) {
  const chemin = join(POL, r.fichier);
  if (!existsSync(chemin)) { report.compteursMismatch.push({ where: r.fichier, what: "fichier introuvable, contrôle des compteurs impossible" }); continue; }
  const texte = readFileSync(chemin, "utf-8");
  r.motif.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = r.motif.exec(texte)) !== null) {
    const attendu = r.attendu(m);
    if (attendu === null) { report.compteursMismatch.push({ where: r.fichier, what: `« ${m[0].trim()} » porte sur une clé absente du corpus` }); continue; }
    if (r.lu(m) !== attendu) report.compteursMismatch.push({ where: r.fichier, what: `${r.quoi(m)} : le document dit ${r.lu(m)}, le corpus dit ${attendu}` });
  }
}

const fmtIssues = (list: Issue[]) => (list.length === 0 ? "aucun\n" : list.map((i) => `- ${i.where} : ${i.what}`).join("\n") + "\n");

const hardFail = report.fichesParsees !== report.fichesTotal || report.erreursParse.length > 0 || report.champsManquants.length > 0 || report.fuitesInternes.length > 0 || report.verdictsMismatch.length > 0 || report.compteursMismatch.length > 0 || report.briefs.length > 0;

const lines = `# Rapport de build Atlas - ${data.buildDate}

## Contrat
- Fiches parsées : **${report.fichesParsees}/${report.fichesTotal}** ${report.fichesParsees === report.fichesTotal ? "OK" : "ÉCHEC"}
- Pièces de jugement : **${pieces.size}/15** + synthèse
- Fils transverses : ${fils.filter((f) => f.kind === "charge").length} à charge, ${fils.filter((f) => f.kind === "decharge").length} à décharge
- Arêtes fiche->fiche (dédupliquées) : ${report.aretes}
- Citations de fiches dans les jugements (occurrences de rôles) : ${report.citationsJugements}
- Entrées ministres brutes : ${report.entreesMinistresBrutes} sur ${report.fichesAvecMinistres} fiches (référence indépendante du 01/08 : 631/430)
- Ministres distincts après séparation puis/et : ${ministres.size} ; gouvernements canoniques : ${GOUVERNEMENTS.length}
- Promesses des programmes : **${promesses.length}/${PROMESSES_ATTENDUES}** ${promesses.length === PROMESSES_ATTENDUES ? "OK" : "ÉCHEC"} — ${promessesTenues} tenues, ${promesses.length - promessesTenues} non tenues
- Fonts embarquées : ${fontsEmbarquees.length ? fontsEmbarquees.join(", ") : "aucune (fallback système)"}
- Briefs de domaine émis : ${report.briefsEmis.length ? "\n" + report.briefsEmis.map((b) => `  - ${b}`).join("\n") : "aucun"}

## Distributions (à recouper avec l'étude du 01/08)
- Grades : ${[...grades.entries()].sort().map(([g, n]) => `${g}=${n}`).join(", ")}
- Types : ${[...types.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}=${n}`).join(", ")}

## Problèmes
### Erreurs de parse (bloquant)
${fmtIssues(report.erreursParse)}
### Champs manquants (bloquant)
${fmtIssues(report.champsManquants)}
### Fuites de vocabulaire interne dans dist/ (bloquant)
${fmtIssues(report.fuitesInternes)}
### Dates invalides
${fmtIssues(report.datesInvalides)}
### Wikilinks morts dans base/ (attendu : 0)
${fmtIssues(report.liensMortsBase)}
### Wikilinks morts dans jugement/ (jamais audités avant ce build)
${fmtIssues(report.liensMortsJugement)}
### Sections manquantes dans les pièces
${fmtIssues(report.sectionsManquantes)}
### Verdicts table vs frontmatter (bloquant)
${fmtIssues(report.verdictsMismatch)}
### Compteurs publics vs corpus (bloquant)
${fmtIssues(report.compteursMismatch)}
### Briefs de domaine (bloquant)
${fmtIssues(report.briefs)}
### Gouvernements non mappés (valeur brute -> occurrences)
${report.gouvernementsNonMappes.size === 0 ? "aucun\n" : [...report.gouvernementsNonMappes.entries()].sort((a, b) => b[1] - a[1]).map(([v, n]) => `- ${n} × « ${v} »`).join("\n") + "\n"}
### Entrées ministres suspectes (contiennent « puis »)
${fmtIssues(report.ministresSuspects)}

## Verdict du build : ${hardFail ? "ÉCHEC" : "OK"}
`;

writeFileSync(join(ATLAS, "build-report.md"), lines);
console.log(lines);
if (hardFail) process.exit(1);
