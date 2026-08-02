import Graph from "graphology";
import Sigma from "sigma";
import { A } from "../types";
import { h, domColor, sidePanel, setTitle, TYPE_LABELS } from "../ui";
import { GOUV_PERIODES } from "../data-gouv";

let current: Sigma | null = null;
export function destroyGraphe(): void {
  if (current) { current.kill(); current = null; }
}

type FiltreState = { domaines: Set<string>; types: Set<string>; grades: Set<string>; gouvs: Set<string>; yFrom: number; yTo: number };

function makeState(): FiltreState {
  return { domaines: new Set(), types: new Set(), grades: new Set(), gouvs: new Set(), yFrom: 2015, yTo: 2026 };
}

function visible(slug: string, st: FiltreState): boolean {
  const f = A.fiches[slug];
  if (!f) return false;
  if (st.domaines.size && !f.d.some((d) => st.domaines.has(d))) return false;
  if (st.types.size && !st.types.has(f.ty)) return false;
  if (st.grades.size && !st.grades.has(f.g)) return false;
  if (st.gouvs.size && !f.act.gv.some((g) => st.gouvs.has(g))) return false;
  const y = Number(f.dt.slice(0, 4));
  if (Number.isFinite(y) && (y < st.yFrom || y > st.yTo)) return false;
  return true;
}

/** pilule sombre au survol : le renderer par défaut de sigma dessine un fond blanc, illisible en dark */
function drawNodeHover(
  ctx: CanvasRenderingContext2D,
  data: { x: number; y: number; size: number; label?: string | null; color?: string },
  settings: { labelSize: number; labelFont: string; labelWeight: string },
): void {
  const label = data.label;
  if (!label) return;
  ctx.font = `${settings.labelWeight} ${settings.labelSize}px ${settings.labelFont}`;
  const r = data.size + 3;
  const padX = 9;
  const hgt = settings.labelSize + 12;
  const bx = data.x + r + 5;
  const by = data.y - hgt / 2;
  const bw = ctx.measureText(label).width + padX * 2;
  ctx.beginPath();
  ctx.fillStyle = "rgba(24,23,22,0.94)";
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  if (typeof ctx.roundRect === "function") ctx.roundRect(bx, by, bw, hgt, hgt / 2);
  else ctx.rect(bx, by, bw, hgt);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ece9e4";
  ctx.textBaseline = "middle";
  ctx.fillText(label, bx + padX, data.y);
  ctx.beginPath();
  ctx.arc(data.x, data.y, r, 0, Math.PI * 2);
  ctx.strokeStyle = data.color ?? "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function viewGraphe(): HTMLElement {
  setTitle("Graphe");
  destroyGraphe();
  const st = makeState();

  const container = h("div", { id: "sigma" });
  const wrap = h("div", { class: "graph-wrap" }, container);
  const view = h("div", { class: "view full" }, wrap);

  const closePanel = () => { wrap.querySelector(".side-panel")?.remove(); };
  const openPanel = (slug: string) => { closePanel(); wrap.append(sidePanel(slug, closePanel)); };

  // -- graphe graphology depuis les positions pré-calculées au build
  const graph = new Graph({ type: "undirected" });
  for (const n of A.graphe.nodes) {
    const f = A.fiches[n.id];
    graph.addNode(n.id, {
      x: n.x, y: n.y,
      size: 2.5 + Math.sqrt(n.s) * 1.7,
      color: domColor(n.dom),
      label: f ? (f.t.length > 70 ? f.t.slice(0, 70) + "…" : f.t) : n.id,
    });
  }
  for (const [a, b] of A.graphe.edges) {
    if (!graph.hasEdge(a, b)) graph.addEdge(a, b, { size: 0.6, color: "rgba(255,255,255,0.07)" });
  }

  let refresh = () => {};

  // -- panneau de filtres
  const toggle = (label: string, on: () => boolean, flip: () => void, color?: string): HTMLElement => {
    const btn = h("button", {
      class: "gp-toggle", style: color ? `--dc:${color}` : "",
      onclick: () => { flip(); btn.classList.toggle("on", on()); refresh(); },
    },
      color ? h("span", { style: `display:inline-block;width:6px;height:6px;border-radius:999px;background:${color};margin-right:5px;vertical-align:1px` }) : null,
      label);
    return btn;
  };
  const flipSet = (set: Set<string>, v: string) => () => { set.has(v) ? set.delete(v) : set.add(v); };

  const yearSel = (get: () => number, set: (v: number) => void): HTMLElement =>
    h("select", {
      class: "gp-toggle",
      onchange: (e: Event) => { set(Number((e.target as HTMLSelectElement).value)); refresh(); },
    }, ...Array.from({ length: 12 }, (_, i) => 2015 + i).map((y) =>
      h("option", { value: y, ...(y === get() ? { selected: "" } : {}) }, String(y))));

  const panel = h("div", { class: "graph-panel" },
    h("div", { class: "gp-title" }, "Domaines"),
    h("div", { class: "gp-row" },
      ...A.ordreDomaines.map((d) =>
        toggle(A.domaineNoms[d] ?? d, () => st.domaines.has(d), flipSet(st.domaines, d), domColor(d)))),
    h("div", { class: "gp-title" }, "Type"),
    h("div", { class: "gp-row" },
      ...Object.entries(TYPE_LABELS).map(([ty, label]) => toggle(label, () => st.types.has(ty), flipSet(st.types, ty)))),
    h("div", { class: "gp-title" }, "Grade"),
    h("div", { class: "gp-row" },
      ...["A", "B", "C"].map((g) => toggle(g, () => st.grades.has(g), flipSet(st.grades, g)))),
    h("div", { class: "gp-title" }, "Gouvernement"),
    h("div", { class: "gp-row" },
      ...GOUV_PERIODES.map((g) => toggle(g.nom, () => st.gouvs.has(g.nom), flipSet(st.gouvs, g.nom)))),
    h("div", { class: "gp-title" }, "Années"),
    h("div", { class: "gp-row" },
      yearSel(() => st.yFrom, (v) => { st.yFrom = v; }),
      h("span", { style: "color:var(--muted-foreground);font-size:11px;align-self:center" }, "→"),
      yearSel(() => st.yTo, (v) => { st.yTo = v; })),
    h("div", { style: "margin-top:10px;font-size:11px;color:var(--muted-foreground)" },
      "Nœud = une fiche · taille = connexions · couleur = domaine principal · les liens sont les renvois entre fiches"),
  );
  wrap.append(panel);

  // sigma a besoin d'un container mesurable : instanciation après insertion dans le DOM
  setTimeout(() => {
    current = new Sigma(graph, container, {
      allowInvalidContainer: true,
      renderLabels: true,
      labelRenderedSizeThreshold: 7,
      labelSize: 11,
      labelColor: { color: "#d8d4cf" },
      labelWeight: "500",
      minCameraRatio: 0.03,
      maxCameraRatio: 2.5,
      defaultDrawNodeHover: drawNodeHover,
      nodeReducer: (node, data) => (visible(node, st) ? data : { ...data, hidden: true }),
      edgeReducer: (edge, data) => {
        const [a, b] = graph.extremities(edge);
        return visible(a, st) && visible(b, st) ? data : { ...data, hidden: true };
      },
    });
    refresh = () => current?.refresh();
    current.on("clickNode", ({ node }) => openPanel(node));
    current.on("clickStage", closePanel);
  }, 0);

  return view;
}
