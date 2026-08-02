import { A } from "./types";
import type { Role } from "./types";

export type Child = Node | string | number | null | undefined | false | Child[];

export function h(tag: string, attrs: Record<string, unknown> = {}, ...children: Child[]): HTMLElement {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = String(v);
    else if (k === "html") el.innerHTML = String(v);
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v as EventListener);
    else el.setAttribute(k, String(v));
  }
  const flat = (children as unknown[]).flat(Infinity as 1) as unknown[];
  for (const c of flat) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

/** conversion OKLCH -> hex sRGB (spec OKLab, Björn Ottosson) : sigma/WebGL ne parse pas oklch() */
function oklchToHex(L: number, C: number, Hdeg: number): string {
  const hr = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const toByte = (x: number) => {
    const v = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(0, x), 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, v)) * 255);
  };
  return "#" + lin.map((x) => toByte(x).toString(16).padStart(2, "0")).join("");
}

const domHexCache = new Map<string, string>();

/** 15 teintes stables : hue par index dans l'ordre de la grille v0, servies en hex (CSS, SVG et sigma) */
export function domColor(slug: string): string {
  let hex = domHexCache.get(slug);
  if (!hex) {
    const i = Math.max(0, A.ordreDomaines.indexOf(slug));
    hex = oklchToHex(0.78, 0.115, (i * 137.5) % 360);
    domHexCache.set(slug, hex);
  }
  return hex;
}

export const VERDICT_LABELS: Record<string, string> = {
  "tres-favorable": "Très favorable",
  favorable: "Favorable",
  mitige: "Mitigé",
  defavorable: "Défavorable",
  "gravement-defavorable": "Gravement défavorable",
};

export const TYPE_LABELS: Record<string, string> = {
  mesure: "Mesure", affaire: "Affaire", promesse: "Promesse", declaration: "Déclaration",
};

export const STATUT_LABELS: Record<string, string> = {
  tenue: "Promesse tenue", partielle: "Partiellement tenue", abandonnee: "Abandonnée",
};

export function badgeVerdict(v: string, lg = false): HTMLElement {
  return h("span", { class: `badge b-verdict-${v}${lg ? " lg" : ""}` }, VERDICT_LABELS[v] ?? v);
}
export function badgeGrade(g: string): HTMLElement {
  return h("span", { class: `badge b-grade b-grade-${g}`, title: GRADE_TITLES[g] ?? "" }, g);
}
export const GRADE_TITLES: Record<string, string> = {
  A: "Grade A : établi par jugement définitif ou document officiel",
  B: "Grade B : documenté par plusieurs sources de presse indépendantes",
  C: "Grade C : allégation à source unique, jamais déterminante dans un verdict",
};
export function badgeType(ty: string): HTMLElement {
  return h("span", { class: "badge b-type" }, TYPE_LABELS[ty] ?? ty);
}
export function chipDomaine(slug: string, count?: number): HTMLElement {
  return h("a", { class: "chip-domaine", href: `#/domaine/${slug}`, style: `--dc:${domColor(slug)}` },
    h("span", { class: "dot" }),
    A.domaineNoms[slug] ?? slug,
    count != null ? ` · ${count}` : null,
  );
}

export function pieceLabel(piece: string): string {
  return piece === "synthese" ? "Synthèse" : (A.domaineNoms[piece] ?? piece);
}

export function roleBadge(r: Role): HTMLElement {
  const map: Record<string, [string, string]> = {
    charge: ["b-role-charge", `charge n°${r.n}`],
    decharge: ["b-role-decharge", `décharge n°${r.n}`],
    ecartee: ["b-role-ecartee", "écartée"],
    "fil-charge": ["b-role-fil", `fil à charge n°${r.n}`],
    "fil-decharge": ["b-role-fil", `fil à décharge n°${r.n}`],
    perimetre: ["b-role-ecartee", "périmètre"],
    verdict: ["b-role-fil", "verdict"],
  };
  const [cls, label] = map[r.kind] ?? ["b-role-ecartee", r.kind];
  return h("span", { class: `badge ${cls}` }, label);
}

/** ligne de liste standard pour une fiche */
export function frow(slug: string): HTMLElement {
  const f = A.fiches[slug];
  if (!f) return h("div", { class: "frow" }, h("span", { class: "fd mono" }, slug));
  return h("a", { class: "frow", href: `#/fiche/${slug}` },
    h("span", { class: "fd" }, f.dt),
    h("span", { class: "ft" }, f.t),
    h("span", { class: "fb" }, badgeGrade(f.g), badgeType(f.ty)),
  );
}

export function sectionHeader(text: string): HTMLElement {
  return h("div", { class: "section-header" }, text);
}

export function backtop(href: string, label: string): HTMLElement {
  return h("div", { class: "backtop" }, h("a", { href }, `← ${label}`));
}

export function footer(): HTMLElement {
  return h("div", { class: "footer" },
    h("span", {}, "Romain, avec l'aide de Claude (Anthropic), Antigravity (Google) et Grok (SpaceXAI)."),
    h("span", { class: "mono" }, `dossier arrêté au ${A.buildDate}`),
  );
}

/** panneau latéral d'aperçu de fiche (graphe + chrono) */
export function sidePanel(slug: string, onClose: () => void): HTMLElement {
  const f = A.fiches[slug];
  const p = h("div", { class: "side-panel" },
    h("button", { class: "sp-close", onclick: onClose }, "✕"),
    h("div", { class: "fiche-date" }, f.dt + (f.df ? ` → ${f.df}` : "")),
    h("div", { style: "font-size:16px;font-weight:600;line-height:1.35;margin:6px 0 10px" }, f.t),
    h("div", { class: "fiche-meta" }, badgeGrade(f.g), badgeType(f.ty), ...f.d.map((d) => chipDomaine(d))),
    h("p", { style: "font-size:13px;color:var(--muted-foreground);line-height:1.6;margin:12px 0" },
      f.txt.length > 240 ? f.txt.slice(0, 240) + "…" : f.txt),
    f.roles.length
      ? h("div", { style: "display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px" },
          ...f.roles.slice(0, 4).map((r) => roleBadge(r)))
      : null,
    h("a", { class: "badge b-role-fil lg", href: `#/fiche/${slug}` }, "Ouvrir la fiche →"),
  );
  return p;
}

export function setTitle(t: string | null): void {
  document.title = t ? `${t} · Macronisme 2017-2026` : "Macronisme 2017-2026 · le bilan";
}
