import { A } from "../types";
import { h, badgeVerdict, chipDomaine, domColor, sectionHeader, footer, fmtDate, setTitle, VERDICT_LABELS } from "../ui";

export function viewSynthese(): HTMLElement {
  setTitle(null);
  const fiches = Object.values(A.fiches);
  const nbA = fiches.filter((f) => f.g === "A").length;
  const pctA = Math.round((nbA / fiches.length) * 100);
  const filsCharge = A.synthese.fils.filter((f) => f.kind === "charge");
  const filsDecharge = A.synthese.fils.filter((f) => f.kind === "decharge");

  const filCard = (f: (typeof filsCharge)[number]) =>
    h("a", { class: "card click fil-card", href: `#/parcours/${f.kind}-${f.n}` },
      h("div", { class: "fc-head" },
        h("span", { class: `badge ${f.kind === "charge" ? "b-role-charge" : "b-role-decharge"}` },
          f.kind === "charge" ? `fil à charge n°${f.n}` : `fil à décharge n°${f.n}`),
        h("span", { class: "fc-n" }, `${f.fiches.length} pièces`),
      ),
      h("div", { class: "fc-label" }, f.label),
      h("div", { class: "fc-foot" }, ...f.pieces.slice(0, 4).map((p) => chipDomaine(p)), f.pieces.length > 4 ? h("span", { class: "fc-n" }, `+${f.pieces.length - 4}`) : null),
    );

  return h("div", { class: "view" },
    h("div", { class: "hero" },
      h("div", { class: "hero-kicker" }, "Le dossier · deux quinquennats · 2017-2026"),
      h("h1", {}, "Les années Macron, pièces à l'appui."),
      h("p", { class: "hero-sub" },
        "Bilan documenté et contradictoire : chaque affirmation s'appuie sur des pièces datées, sourcées et gradées ; ",
        "les décharges sont instruites au même titre que les charges ; la méthode est publique et les récits qui ne tiennent pas sont écartés nommément."),
    ),
    h("div", { class: "kpis" },
      h("div", { class: "kpi" }, h("div", { class: "n" }, String(fiches.length)), h("div", { class: "l" }, "pièces datées et sourcées")),
      h("div", { class: "kpi" }, h("div", { class: "n" }, `${pctA} %`), h("div", { class: "l" }, "de grade A (officiel ou définitif)")),
      h("div", { class: "kpi" }, h("div", { class: "n" }, "15"), h("div", { class: "l" }, "domaines jugés")),
      h("div", { class: "kpi" }, h("div", { class: "n" }, "9"), h("div", { class: "l" }, "fils transverses")),
    ),
    h("div", { class: "verdict-banner" },
      badgeVerdict(A.synthese.verdict, true),
      h("span", { class: "vb-label" },
        `Verdict d'ensemble rendu le ${fmtDate(A.synthese.dateVerdict)} sur l'échelle commune à cinq niveaux (${Object.values(VERDICT_LABELS).join(" · ").toLowerCase()}).`),
      h("a", { href: "#/domaine/synthese" }, "Lire la synthèse →"),
    ),
    sectionHeader("Les cinq fils à charge"),
    h("div", { class: "grid c2" }, ...filsCharge.map(filCard)),
    sectionHeader("Les quatre fils à décharge"),
    h("div", { class: "grid c2" }, ...filsDecharge.map(filCard)),
    sectionHeader("Les quinze domaines"),
    h("div", { class: "grid c3" },
      ...A.ordreDomaines.map((slug) => {
        const d = A.domaines[slug];
        return h("a", { class: "card click dom-card", href: `#/domaine/${slug}`, style: `--dc:${domColor(slug)}` },
          h("span", { class: "dot" }),
          h("span", { class: "dn" }, d.nom),
          h("span", { class: "dc-count" }, String(d.fiches.length)),
          badgeVerdict(d.verdict),
        );
      }),
    ),
    sectionHeader("La méthode"),
    h("a", { class: "card click", href: "#/methode" },
      h("div", { style: "font-size:14px;font-weight:600;margin-bottom:6px" }, "Comment ce dossier est construit"),
      h("div", { style: "font-size:13px;color:var(--muted-foreground);line-height:1.6" },
        "Grades de preuve A/B/C/D, standard contradiction, jugements par domaine, fils transverses, récits écartés et retournements de charge assumés. ",
        "Le dossier dit aussi ce qui le ferait changer d'avis."),
    ),
    footer(),
  );
}
