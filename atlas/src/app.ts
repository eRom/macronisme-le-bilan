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

function shell(): void {
  const nav = h("nav", { class: "nav" }, ...NAV.map(([href, label]) => h("a", { href, "data-nav": href }, label)));
  const topbar = h("header", { class: "topbar" },
    h("a", { class: "brand", href: "#/" },
      h("span", { class: "brand-title" }, "Macronisme"),
      h("span", { class: "brand-dates" }, "2017-2026"),
    ),
    nav,
    h("div", { class: "topbar-spacer" }),
    h("a", { class: "search-btn", href: "#/recherche" }, "⌕", h("span", { class: "sb-label" }, "Rechercher"), h("kbd", {}, "/")),
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
