import { A } from "../types";
import { h, badgeGrade, badgeType, footer, setTitle } from "../ui";

type Doc = { slug: string; tn: string; xn: string };
let corpus: Doc[] | null = null;

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function buildCorpus(): Doc[] {
  if (!corpus) {
    corpus = Object.entries(A.fiches).map(([slug, f]) => ({
      slug, tn: normalize(f.t), xn: normalize(f.txt),
    }));
  }
  return corpus;
}

function occurrences(haystack: string, needle: string): number {
  let n = 0, i = haystack.indexOf(needle);
  while (i !== -1) { n++; i = haystack.indexOf(needle, i + needle.length); }
  return n;
}

function search(q: string): { slug: string; score: number }[] {
  const tokens = normalize(q).split(/[^\p{L}\p{N}]+/u).filter((t) => t.length >= 2);
  if (!tokens.length) return [];
  const hits: { slug: string; score: number }[] = [];
  for (const doc of buildCorpus()) {
    let score = 0, ok = true;
    for (const tok of tokens) {
      const inT = occurrences(doc.tn, tok);
      const inX = occurrences(doc.xn, tok);
      if (inT + inX === 0) { ok = false; break; }
      score += inT * 6 + inX;
    }
    if (ok) hits.push({ slug: doc.slug, score });
  }
  return hits.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug)).slice(0, 60);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** extrait autour de la première occurrence, avec surlignage sûr (DOM, pas d'injection) */
function excerpt(slug: string, tokens: string[]): HTMLElement {
  const txt = A.fiches[slug].txt;
  const nTxt = normalize(txt);
  let pos = -1;
  for (const t of tokens) { pos = nTxt.indexOf(t); if (pos !== -1) break; }
  const start = Math.max(0, pos === -1 ? 0 : pos - 70);
  const raw = (start > 0 ? "…" : "") + txt.slice(start, start + 220) + (start + 220 < txt.length ? "…" : "");
  const container = h("div", { class: "sh-ex" });
  const re = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  let last = 0;
  const rawN = normalize(raw);
  for (const m of rawN.matchAll(re)) {
    const i = m.index!;
    container.append(raw.slice(last, i), h("mark", {}, raw.slice(i, i + m[0].length)));
    last = i + m[0].length;
  }
  container.append(raw.slice(last));
  return container;
}

export function viewRecherche(initial: string): HTMLElement {
  setTitle("Recherche");
  const results = h("div", { style: "margin-top:16px" });

  const run = (q: string) => {
    const tokens = normalize(q).split(/[^\p{L}\p{N}]+/u).filter((t) => t.length >= 2);
    if (!tokens.length) { results.replaceChildren(h("div", { class: "empty" }, "Tapez au moins deux caractères : un nom, une loi, une date, un chiffre.")); return; }
    const hits = search(q);
    if (!hits.length) { results.replaceChildren(h("div", { class: "empty" }, "Aucune pièce ne contient tous ces termes.")); return; }
    results.replaceChildren(
      h("div", { style: "font-size:12px;color:var(--muted-foreground);margin-bottom:10px" }, `${hits.length} pièce${hits.length > 1 ? "s" : ""}`),
      ...hits.map(({ slug }) => {
        const f = A.fiches[slug];
        return h("a", { class: "search-hit", href: `#/fiche/${slug}` },
          h("div", { style: "display:flex;gap:10px;align-items:baseline;flex-wrap:wrap" },
            h("span", { class: "mono", style: "font-size:11px;color:var(--muted-foreground)" }, f.dt),
            h("span", { style: "font-weight:600;flex:1;min-width:200px" }, f.t),
            badgeGrade(f.g), badgeType(f.ty),
          ),
          excerpt(slug, tokens),
        );
      }),
    );
  };

  let timer = 0;
  const input = h("input", {
    class: "search-input", type: "search", placeholder: "Rechercher dans les 531 pièces : 49.3, Canadair, Ségur, McKinsey, ISF…",
    value: initial,
    oninput: (e: Event) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => run((e.target as HTMLInputElement).value), 140);
    },
  }) as HTMLInputElement;

  const view = h("div", { class: "view narrow" },
    h("div", { class: "page-title" }, "Recherche"),
    h("p", { class: "page-sub" }, "Plein texte sur les titres et les corps des 531 fiches, accents ignorés."),
    h("div", { style: "margin-top:14px" }, input),
    results,
    footer(),
  );
  requestAnimationFrame(() => { input.focus(); if (initial) run(initial); else run(""); });
  return view;
}
