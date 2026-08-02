import { h } from "./ui";
import { viewSynthese } from "./views/synthese";
import { viewDomaines, viewDomaine } from "./views/domaines";
import { viewParcours, viewFil } from "./views/parcours";
import { viewFiche } from "./views/fiche";
import { viewActeurs, viewActeur } from "./views/acteurs";
import { viewRecherche } from "./views/recherche";
import { viewMethode } from "./views/methode";
import { viewGraphe, destroyGraphe } from "./views/graphe";
import { viewChrono } from "./views/chrono";

const NAV: [string, string][] = [
  ["#/", "Synthèse"],
  ["#/domaines", "Domaines"],
  ["#/parcours", "Parcours"],
  ["#/graphe", "Graphe"],
  ["#/chrono", "Chronologie"],
  ["#/acteurs", "Acteurs"],
  ["#/methode", "Méthode"],
];

const app = document.getElementById("app")!;
let main: HTMLElement;

/** Mark GitHub officielle, inlinée : le site est autonome, zéro requête réseau. */
const GH_MARK = `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`;

function shell(): void {
  const nav = h("nav", { class: "nav" }, ...NAV.map(([href, label]) => h("a", { href, "data-nav": href }, label)));
  const topbar = h("header", { class: "topbar" },
    h("a", { class: "brand", href: "#/" },
      h("span", { class: "brand-title" }, "Macronisme"),
      h("span", { class: "brand-dates" }, "2017-2026"),
    ),
    nav,
    h("div", { class: "topbar-spacer" }),
    h("div", { class: "topbar-actions" },
      h("a", { class: "search-btn", href: "#/recherche" }, "⌕", h("span", { class: "sb-label" }, "Rechercher"), h("kbd", {}, "/")),
      h("a", {
        class: "gh-link",
        href: "https://github.com/eRom/macronisme-le-bilan",
        target: "_blank",
        rel: "noopener noreferrer",
        title: "Le dossier sur GitHub : corpus, jugements et matière première",
        "aria-label": "Le dossier sur GitHub",
        html: GH_MARK,
      }),
    ),
  );
  main = h("main", {});
  app.replaceChildren(topbar, main);

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      location.hash = "#/recherche";
    }
  });
}

function setActive(hash: string): void {
  const top = "#/" + (hash.split("/")[1] ?? "");
  const alias: Record<string, string> = { "#/fiche": "", "#/domaine": "#/domaines", "#/acteur": "#/acteurs", "#/recherche": "" };
  const target = alias[top] ?? top;
  document.querySelectorAll<HTMLAnchorElement>(".nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === (target || "∅") || (target === "#/" && a.dataset.nav === "#/"));
  });
}

function route(): void {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\//, "").split("/").filter(Boolean).map(decodeURIComponent);
  const [head, ...rest] = parts;
  setActive(hash);
  window.scrollTo(0, 0);
  if (head !== "graphe") destroyGraphe();

  let view: HTMLElement;
  switch (head) {
    case undefined: view = viewSynthese(); break;
    case "domaines": view = viewDomaines(); break;
    case "domaine": view = viewDomaine(rest[0] ?? ""); break;
    case "parcours": view = rest[0] ? viewFil(rest[0]) : viewParcours(); break;
    case "fiche": view = viewFiche(rest[0] ?? ""); break;
    case "acteurs": view = viewActeurs(); break;
    case "acteur": view = viewActeur(rest[0] ?? "", rest[1] ?? ""); break;
    case "recherche": view = viewRecherche(rest.join("/")); break;
    case "methode": view = viewMethode(); break;
    case "graphe": view = viewGraphe(); break;
    case "chrono": view = viewChrono(); break;
    default: view = viewSynthese();
  }
  main.replaceChildren(view);
}

shell();
window.addEventListener("hashchange", route);
route();
