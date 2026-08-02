import { A } from "../types";
import { h, chipDomaine, sectionHeader, footer, setTitle, backtop } from "../ui";

export function viewParcours(): HTMLElement {
  setTitle("Parcours");
  const fils = A.synthese.fils;
  const card = (f: (typeof fils)[number]) =>
    h("a", { class: "card click fil-card", href: `#/parcours/${f.kind}-${f.n}` },
      h("div", { class: "fc-head" },
        h("span", { class: `badge ${f.kind === "charge" ? "b-role-charge" : "b-role-decharge"}` },
          f.kind === "charge" ? `fil à charge n°${f.n}` : `fil à décharge n°${f.n}`),
        h("span", { class: "fc-n" }, `${f.fiches.length} pièces d'appui`),
      ),
      h("div", { class: "fc-label" }, f.label),
      h("div", { class: "fc-foot" }, ...f.pieces.map((p) => chipDomaine(p))),
    );

  return h("div", { class: "view" },
    h("div", { class: "page-title" }, "Les parcours"),
    h("p", { class: "page-sub" },
      "Les fils transverses de la synthèse, racontés avec leurs pièces d'appui dans l'ordre de la démonstration. ",
      "Un fil doit traverser au moins deux domaines et s'appuyer sur des fiches distinctes."),
    sectionHeader("À charge"),
    h("div", { class: "grid c2" }, ...fils.filter((f) => f.kind === "charge").map(card)),
    sectionHeader("À décharge"),
    h("div", { class: "grid c2" }, ...fils.filter((f) => f.kind === "decharge").map(card)),
    footer(),
  );
}

export function viewFil(id: string): HTMLElement {
  const m = id.match(/^(charge|decharge)-(\d+)$/);
  const fil = m ? A.synthese.fils.find((f) => f.kind === m[1] && f.n === Number(m[2])) : undefined;
  if (!fil) return h("div", { class: "view" }, h("div", { class: "empty" }, "Fil inconnu."));
  setTitle(`Fil ${fil.kind === "charge" ? "à charge" : "à décharge"} n°${fil.n}`);

  return h("div", { class: "view narrow" },
    backtop("#/parcours", "Tous les parcours"),
    h("div", { class: "fiche-head" },
      h("span", { class: `badge lg ${fil.kind === "charge" ? "b-role-charge" : "b-role-decharge"}` },
        fil.kind === "charge" ? `fil à charge n°${fil.n}` : `fil à décharge n°${fil.n}`),
      h("h1", { class: "page-title", style: "margin-top:10px" }, fil.label),
      h("div", { class: "fiche-meta" }, ...fil.pieces.map((p) => chipDomaine(p))),
    ),
    h("div", { class: "prose", html: fil.html }),
    sectionHeader(`Les ${fil.fiches.length} maillons, dans l'ordre de la démonstration`),
    h("div", {},
      ...fil.fiches.map((slug, i) => {
        const f = A.fiches[slug];
        return h("a", { class: "maillon", href: `#/fiche/${slug}` },
          h("span", { class: "mn" }, String(i + 1)),
          h("span", { class: "fd mono", style: "font-size:11px;color:var(--muted-foreground);flex-shrink:0" }, f?.dt ?? ""),
          h("span", { style: "flex:1;font-size:14px" }, f?.t ?? slug),
        );
      }),
    ),
    footer(),
  );
}
