import { A } from "../types";
import { h, badgeVerdict, domColor, sectionHeader, footer, fmtDate, frow, setTitle, backtop } from "../ui";

export function viewDomaines(): HTMLElement {
  setTitle("Domaines");
  return h("div", { class: "view" },
    h("div", { class: "page-title" }, "Les quinze domaines"),
    h("p", { class: "page-sub" },
      "Un jugement contradictoire par domaine : les charges qui tiennent, les décharges qui tiennent, ce qui est écarté, le verdict motivé. ",
      "Chaque pièce citée est cliquable."),
    h("div", { class: "grid c2", style: "margin-top:18px" },
      ...A.ordreDomaines.map((slug) => {
        const d = A.domaines[slug];
        return h("a", { class: "card click", href: `#/domaine/${slug}`, style: `--dc:${domColor(slug)}` },
          h("div", { style: "display:flex;align-items:center;gap:10px;margin-bottom:8px" },
            h("span", { class: "dot", style: `width:8px;height:8px;border-radius:999px;background:${domColor(slug)}` }),
            h("span", { style: "font-size:15px;font-weight:600;flex:1" }, d.nom),
            badgeVerdict(d.verdict),
          ),
          h("div", { style: "font-size:12px;color:var(--muted-foreground)" },
            `${d.fiches.length} fiches · ${d.charges.length} charges · ${d.decharges.length} décharges · ${d.ecartes.length} écartées`),
        );
      }),
    ),
    footer(),
  );
}

function jsection(title: string, html: string | undefined, count: number | null, open = false): HTMLElement | null {
  if (!html) return null;
  return h("details", { class: "jsection", ...(open ? { open: "" } : {}) },
    h("summary", {},
      h("span", { class: "chev" }, "▶"),
      title,
      count != null ? h("span", { class: "jcount" }, String(count)) : null,
    ),
    h("div", { class: "jbody prose", html }),
  );
}

export function viewDomaine(slug: string): HTMLElement {
  if (slug === "synthese") return viewSynthesePiece();
  const d = A.domaines[slug];
  if (!d) return h("div", { class: "view" }, h("div", { class: "empty" }, "Domaine inconnu."));
  setTitle(d.nom);

  const fichesTriees = [...d.fiches].sort();
  return h("div", { class: "view narrow" },
    backtop("#/domaines", "Tous les domaines"),
    h("div", { class: "fiche-head" },
      h("div", { style: "display:flex;align-items:center;gap:10px;flex-wrap:wrap" },
        h("span", { style: `width:10px;height:10px;border-radius:999px;background:${domColor(slug)}` }),
        h("h1", { class: "page-title" }, d.nom),
        badgeVerdict(d.verdict, true),
      ),
      h("p", { class: "page-sub" }, `Jugement rendu le ${fmtDate(d.dateVerdict)} · ${d.fiches.length} fiches au domaine`),
    ),
    jsection("Verdict", d.sections["Verdict"], null, true),
    jsection("Les charges qui tiennent", d.sections["Les charges qui tiennent"], d.charges.length),
    jsection("Les décharges qui tiennent", d.sections["Les décharges qui tiennent"], d.decharges.length),
    jsection("Ce qui est écarté", d.sections["Ce qui est écarté"], d.ecartes.length),
    jsection("Périmètre", d.sections["Périmètre"], null),
    sectionHeader(`Les ${d.fiches.length} fiches du domaine`),
    h("div", {}, ...fichesTriees.map((s) => frow(s))),
    footer(),
  );
}

function viewSynthesePiece(): HTMLElement {
  setTitle("Synthèse");
  const s = A.synthese;
  return h("div", { class: "view narrow" },
    backtop("#/", "Retour à l'accueil"),
    h("div", { class: "fiche-head" },
      h("div", { style: "display:flex;align-items:center;gap:10px;flex-wrap:wrap" },
        h("h1", { class: "page-title" }, "La synthèse faîtière"),
        badgeVerdict(s.verdict, true),
      ),
      h("p", { class: "page-sub" }, `Verdict d'ensemble rendu le ${fmtDate(s.dateVerdict)} · les fils transverses ont leur propre page dans « Parcours »`),
    ),
    jsection("Verdict d'ensemble", s.verdictHtml, null, true),
    h("details", { class: "jsection" },
      h("summary", {}, h("span", { class: "chev" }, "▶"), "Les fils transverses", h("span", { class: "jcount" }, String(s.fils.length))),
      h("div", { class: "jbody" },
        ...s.fils.map((f) =>
          h("a", { class: "maillon", href: `#/parcours/${f.kind}-${f.n}` },
            h("span", { class: "mn" }, `${f.kind === "charge" ? "C" : "D"}${f.n}`),
            h("span", { style: "font-size:14px" }, f.label),
          )),
      ),
    ),
    jsection("Ce qui est écarté", s.ecartesHtml, null),
    jsection("Périmètre et limites", s.perimetreHtml, null),
    footer(),
  );
}
