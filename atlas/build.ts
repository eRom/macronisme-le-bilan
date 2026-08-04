/**
 * Atlas - pipeline de données.
 * Lecture SEULE sur ../base et ../jugement. Jamais ../atelier : le site rend le
 * dossier, pas la matière première qui a servi à le construire.
 * Sorties : dist/data.js (window.ATLAS) + build-report.md.
 * Contrat : 531/531 fiches parsées ou échec du build ; tout lien cassé listé.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
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
  datesInvalides: [] as Issue[],
  fuitesInternes: [] as Issue[],
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
for (const f of ["index.html", "style.css"]) {
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

// ---------------------------------------------------------------- rapport

const grades = new Map<string, number>();
const types = new Map<string, number>();
for (const f of fiches.values()) {
  grades.set(f.g, (grades.get(f.g) ?? 0) + 1);
  types.set(f.ty, (types.get(f.ty) ?? 0) + 1);
}

const fmtIssues = (list: Issue[]) => (list.length === 0 ? "aucun\n" : list.map((i) => `- ${i.where} : ${i.what}`).join("\n") + "\n");

const hardFail = report.fichesParsees !== report.fichesTotal || report.erreursParse.length > 0 || report.champsManquants.length > 0 || report.fuitesInternes.length > 0 || report.verdictsMismatch.length > 0;

const lines = `# Rapport de build Atlas - ${data.buildDate}

## Contrat
- Fiches parsées : **${report.fichesParsees}/${report.fichesTotal}** ${report.fichesParsees === report.fichesTotal ? "OK" : "ÉCHEC"}
- Pièces de jugement : **${pieces.size}/15** + synthèse
- Fils transverses : ${fils.filter((f) => f.kind === "charge").length} à charge, ${fils.filter((f) => f.kind === "decharge").length} à décharge
- Arêtes fiche->fiche (dédupliquées) : ${report.aretes}
- Citations de fiches dans les jugements (occurrences de rôles) : ${report.citationsJugements}
- Entrées ministres brutes : ${report.entreesMinistresBrutes} sur ${report.fichesAvecMinistres} fiches (référence indépendante du 01/08 : 631/430)
- Ministres distincts après séparation puis/et : ${ministres.size} ; gouvernements canoniques : ${GOUVERNEMENTS.length}
- Fonts embarquées : ${fontsEmbarquees.length ? fontsEmbarquees.join(", ") : "aucune (fallback système)"}

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
### Verdicts table vs frontmatter
${fmtIssues(report.verdictsMismatch)}
### Gouvernements non mappés (valeur brute -> occurrences)
${report.gouvernementsNonMappes.size === 0 ? "aucun\n" : [...report.gouvernementsNonMappes.entries()].sort((a, b) => b[1] - a[1]).map(([v, n]) => `- ${n} × « ${v} »`).join("\n") + "\n"}
### Entrées ministres suspectes (contiennent « puis »)
${fmtIssues(report.ministresSuspects)}

## Verdict du build : ${hardFail ? "ÉCHEC" : "OK"}
`;

writeFileSync(join(ATLAS, "build-report.md"), lines);
console.log(lines);
if (hardFail) process.exit(1);
