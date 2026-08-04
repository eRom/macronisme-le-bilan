import { A } from "../types";
import type { Promesse } from "../types";
import { h, sectionHeader, footer, setTitle } from "../ui";

const NS = "http://www.w3.org/2000/svg";
function s(tag: string, attrs: Record<string, string | number> = {}): SVGElement {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

const DOC_URL =
  "https://github.com/eRom/macronisme-le-bilan/blob/main/atelier/programmes-officiels/promesses-electorales-verdicts.md";

const pct1 = (n: number, d: number) => (d === 0 ? "0" : ((n / d) * 100).toFixed(1).replace(".", ","));

/** Anneau de proportion : arc plein = tenues, piste = non tenues. */
function donut(tenues: number, total: number): HTMLElement {
  const R = 46, CIRC = 2 * Math.PI * R;
  const part = total === 0 ? 0 : (tenues / total) * CIRC;

  // Arc tracé statiquement, à sa valeur exacte. Deux tentatives d'animation ont
  // été retirées : par requestAnimationFrame puis par keyframes, toutes deux
  // laissaient l'anneau bloqué sur son état de départ quand la frame ne venait
  // pas (onglet en arrière-plan). Le cercle annonçait alors 0 % sous un libellé
  // qui en affichait 30,8. Aucune valeur montrée ne doit dépendre d'une frame.
  const arc = s("circle", {
    class: "pd-arc", cx: 60, cy: 60, r: R, fill: "none",
    stroke: "var(--p-tenue)", "stroke-width": 13, "stroke-linecap": "round",
    transform: "rotate(-90 60 60)",
    "stroke-dasharray": CIRC, "stroke-dashoffset": CIRC - part,
  });

  const svg = s("svg", { class: "pd-svg", viewBox: "0 0 120 120", role: "presentation" });
  svg.append(
    s("circle", { cx: 60, cy: 60, r: R, fill: "none", stroke: "var(--p-non)", "stroke-width": 13 }),
    arc,
  );

  return h("div", { class: "pd-wrap" },
    svg,
    h("div", { class: "pd-center" },
      h("div", { class: "pd-pct mono" }, `${pct1(tenues, total)} %`),
      h("div", { class: "pd-cap" }, "tenues"),
    ),
  );
}

function carteProgramme(an: string, lot: Promesse[]): HTMLElement {
  const tenues = lot.filter((p) => p.v === "TENUE").length;
  const ligne = (cls: string, label: string, n: number) =>
    h("div", { class: "pl-row" },
      h("span", { class: `pl-dot ${cls}` }),
      h("span", { class: "pl-label" }, label),
      h("span", { class: "pl-n mono" }, String(n)),
    );

  return h("div", { class: "card prog-card" },
    h("div", { class: "pc-head" },
      h("span", { class: "pc-an mono" }, an),
      h("span", { class: "pc-n" }, `${lot.length} engagements`),
    ),
    donut(tenues, lot.length),
    h("div", { class: "pc-legend" },
      ligne("t", "Tenues", tenues),
      ligne("n", "Non tenues", lot.length - tenues),
    ),
  );
}

export function viewProgrammes(): HTMLElement {
  setTitle("Programmes");
  const toutes = A.promesses ?? [];
  const p2017 = toutes.filter((p) => p.an === "2017");
  const p2022 = toutes.filter((p) => p.an === "2022");
  const tenues = toutes.filter((p) => p.v === "TENUE").length;

  // ------------------------------------------------------------ filtres
  const st = { an: "", v: "", q: "" };

  const tbody = h("tbody", {});
  const compteur = h("div", { class: "pf-count mono" });

  function rendreTable(): void {
    const q = st.q.trim().toLowerCase();
    const lot = toutes.filter((p) =>
      (!st.an || p.an === st.an) && (!st.v || p.v === st.v) &&
      (!q || p.txt.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)),
    );
    compteur.textContent = lot.length === toutes.length
      ? `${toutes.length} engagements`
      : `${lot.length} sur ${toutes.length}`;
    tbody.replaceChildren(
      ...(lot.length === 0
        ? [h("tr", {}, h("td", { colspan: 3, class: "empty" }, "Aucun engagement ne correspond."))]
        : lot.map((p) =>
            h("tr", {},
              h("td", { class: "tn pp-id" }, p.id),
              h("td", { class: "pp-txt" }, p.txt),
              h("td", { class: "pp-v" },
                h("span", { class: `badge ${p.v === "TENUE" ? "b-tenue" : "b-nontenue"}` },
                  p.v === "TENUE" ? "Tenue" : "Non tenue"),
              ),
            ),
          )),
    );
  }

  function groupe(cle: "an" | "v", options: [string, string][]): HTMLElement {
    const grp = h("div", { class: "pf-group" });
    const boutons = options.map(([val, label]) => {
      const b = h("button", { class: "gp-toggle" + (st[cle] === val ? " on" : ""), type: "button" }, label);
      b.addEventListener("click", () => {
        st[cle] = val;
        grp.querySelectorAll(".gp-toggle").forEach((x, i) => x.classList.toggle("on", options[i][0] === val));
        rendreTable();
      });
      return b;
    });
    grp.append(...boutons);
    return grp;
  }

  const recherche = h("input", {
    class: "search-input pf-search", type: "search", placeholder: "Filtrer les engagements…",
    "aria-label": "Filtrer les engagements",
  }) as HTMLInputElement;
  recherche.addEventListener("input", () => { st.q = recherche.value; rendreTable(); });

  rendreTable();

  return h("div", { class: "view" },
    h("div", { class: "page-title" }, "Les programmes au réel"),
    h("p", { class: "page-sub" },
      "Les 221 engagements concrets des deux programmes de campagne, confrontés à ce qui a été fait."),

    h("div", { class: "prose", style: "margin-top:18px" },
      h("p", { html:
        "Un programme de campagne est le seul document où un candidat écrit lui-même ce sur quoi il accepte d'être jugé. " +
        "Les <strong>221 engagements</strong> ci-dessous sont extraits des deux fascicules officiels, celui de 2017 et " +
        "celui de 2022, à l'exclusion des discours et des annonces faites en cours de mandat. Chacun reçoit un verdict " +
        "unique, <strong>tenue</strong> ou <strong>non tenue</strong>, sans mention intermédiaire." }),
    ),

    sectionHeader("Ce que chaque programme a tenu"),
    h("div", { class: "grid c2" }, carteProgramme("2017", p2017), carteProgramme("2022", p2022)),
    h("p", { class: "prog-total" },
      "Sur les deux programmes réunis, ",
      h("strong", {}, `${tenues} engagements tenus sur ${toutes.length}`),
      `, soit ${pct1(tenues, toutes.length)} %. La chute entre les deux mandats se lit avec deux réserves : sept engagements de 2022 portent une échéance qui n'est pas encore échue, et la dissolution de juin 2024 a emporté les véhicules législatifs du second quinquennat.`),

    sectionHeader("La méthode, en bref"),
    h("div", { class: "card note-methode" },
      h("p", {},
        "Le verdict est binaire et strict : ",
        h("strong", {}, "tenue"),
        " suppose que l'acte promis a été accompli dans les termes écrits, périmètre, montant et échéance compris. ",
        "Tout le reste est ", h("strong", {}, "non tenue"), " : fait à moitié, fait hors délai, fait puis défait, ou ",
        "formulé de telle sorte qu'aucune vérification ne peut donner un oui certain."),
      h("p", {},
        "Les 221 engagements ont été jugés séparément par quatre agents sous la même règle. ",
        "79 verdicts font l'unanimité ; les 142 autres ont été tranchés dans le sens du seul agent ayant lu le corpus du dossier. ",
        "Cette pièce n'appartient pas au socle factuel : ses verdicts ne sont pas gradés et n'ont pas été sondés source par source ",
        "comme les 534 fiches. Elle est publiée avec ses limites plutôt que présentée comme leur égale."),
      h("a", { class: "nm-link", href: DOC_URL, target: "_blank", rel: "noopener noreferrer" },
        "Lire la méthode complète et les 221 verdicts motivés →"),
    ),

    sectionHeader("Les engagements, un par un"),
    h("div", { class: "pf-bar" },
      groupe("an", [["", "Les deux"], ["2017", "2017"], ["2022", "2022"]]),
      groupe("v", [["", "Tous"], ["TENUE", "Tenues"], ["NON", "Non tenues"]]),
      recherche,
      compteur,
    ),
    h("div", { class: "prog-table-wrap" },
      h("table", { class: "table prog-table" },
        h("thead", {}, h("tr", {},
          h("th", {}, "Réf."), h("th", {}, "Engagement"), h("th", {}, "Verdict"))),
        tbody,
      ),
    ),
    footer(),
  );
}
