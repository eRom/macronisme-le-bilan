import { A } from "../types";
import { h, sectionHeader, footer, frow, setTitle, backtop, fmtDate } from "../ui";
import { GOUV_PERIODES } from "../data-gouv";

export function viewActeurs(): HTMLElement {
  setTitle("Acteurs");
  const ministres = Object.entries(A.ministres);

  return h("div", { class: "view" },
    h("div", { class: "page-title" }, "Les acteurs"),
    h("p", { class: "page-sub" },
      "Le bilan par gouvernement et par ministre : chaque page rassemble les fiches où l'acteur apparaît. ",
      "Les attributions viennent du frontmatter des fiches, rien n'est inféré."),
    sectionHeader("Les neuf gouvernements"),
    h("div", { style: "display:flex;gap:6px;flex-wrap:wrap" },
      ...GOUV_PERIODES.map((g) => {
        const count = (A.gouvernements[g.nom] ?? []).length;
        return h("a", { class: "card click", href: `#/acteur/g/${encodeURIComponent(g.nom)}`, style: "padding:10px 14px" },
          h("div", { style: "font-size:14px;font-weight:600" }, g.nom),
          h("div", { class: "mono", style: "font-size:11px;color:var(--muted-foreground);margin-top:2px" },
            `${g.debut} → ${g.fin} · ${count} fiches`),
        );
      }),
    ),
    sectionHeader(`Les ${Object.keys(A.ministres).length} ministres cités`),
    h("table", { class: "table" },
      h("thead", {}, h("tr", {},
        h("th", {}, "Nom"), h("th", {}, "Portefeuilles cités"), h("th", {}, "Gouvernements"), h("th", { style: "text-align:right" }, "Fiches"))),
      h("tbody", {},
        ...ministres.map(([key, m]) =>
          h("tr", { style: "cursor:pointer", onclick: () => { location.hash = `#/acteur/m/${encodeURIComponent(key)}`; } },
            h("td", {}, h("a", { href: `#/acteur/m/${encodeURIComponent(key)}`, style: "font-weight:500" }, m.nom)),
            h("td", { style: "color:var(--muted-foreground)" },
              m.portefeuilles.slice(0, 3).join(", ") + (m.portefeuilles.length > 3 ? "…" : "")),
            h("td", { style: "color:var(--muted-foreground)" }, m.gouvs.join(", ")),
            h("td", { class: "tn", style: "text-align:right" }, String(m.fiches.length)),
          )),
      ),
    ),
    footer(),
  );
}

export function viewActeur(kind: string, key: string): HTMLElement {
  if (kind === "g") {
    const fiches = A.gouvernements[key];
    const periode = GOUV_PERIODES.find((g) => g.nom === key);
    if (!fiches) return h("div", { class: "view" }, h("div", { class: "empty" }, "Gouvernement inconnu."));
    setTitle(`Gouvernement ${key}`);
    return h("div", { class: "view narrow" },
      backtop("#/acteurs", "Tous les acteurs"),
      h("h1", { class: "page-title" }, `Gouvernement ${key}`),
      periode ? h("p", { class: "page-sub" }, `${fmtDate(periode.debut)} → ${fmtDate(periode.fin)} · ${fiches.length} fiches`) : null,
      sectionHeader("Les fiches"),
      h("div", {}, ...fiches.map((s) => frow(s))),
      footer(),
    );
  }

  const m = A.ministres[key];
  if (!m) return h("div", { class: "view" }, h("div", { class: "empty" }, "Acteur inconnu."));
  setTitle(m.nom);

  const parDomaine = new Map<string, number>();
  for (const s of m.fiches) for (const d of A.fiches[s]?.d ?? []) parDomaine.set(d, (parDomaine.get(d) ?? 0) + 1);

  return h("div", { class: "view narrow" },
    backtop("#/acteurs", "Tous les acteurs"),
    h("h1", { class: "page-title" }, m.nom),
    h("p", { class: "page-sub" },
      m.portefeuilles.length ? `Portefeuilles cités : ${m.portefeuilles.join(" · ")}` : "Portefeuille non renseigné dans les fiches"),
    m.gouvs.length
      ? h("div", { class: "meta-line", style: "margin-top:4px" },
          h("span", { class: "k" }, "Gouvernements"),
          h("span", { class: "v" }, m.gouvs.join(", ")))
      : null,
    sectionHeader("Répartition par domaine"),
    h("div", { style: "display:flex;gap:6px;flex-wrap:wrap" },
      ...[...parDomaine.entries()].sort((a, b) => b[1] - a[1]).map(([d, n]) =>
        h("a", { class: "chip-domaine", href: `#/domaine/${d}`, style: `--dc:var(--muted-foreground)` },
          `${A.domaineNoms[d] ?? d} · ${n}`)),
    ),
    sectionHeader(`Les ${m.fiches.length} fiches`),
    h("div", {}, ...m.fiches.map((s) => frow(s))),
    footer(),
  );
}
