import { A } from "../types";
import { h, domColor, sidePanel, setTitle, TYPE_LABELS } from "../ui";
import { GOUV_PERIODES } from "../data-gouv";

const NS = "http://www.w3.org/2000/svg";
function s(tag: string, attrs: Record<string, string | number> = {}): SVGElement {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

const GUTTER = 142, TOP = 36, LANE_H = 34, AXIS = 26, PAD_R = 14;
const T_MIN = Date.parse("2015-01-01"), T_MAX = Date.parse("2027-01-01");

let activeRender: (() => void) | null = null;

export function viewChrono(): HTMLElement {
  setTitle("Chronologie");
  const st = { grades: new Set<string>(), types: new Set<string>(), t0: T_MIN, t1: T_MAX };
  const lanes = A.ordreDomaines;
  const H = TOP + lanes.length * LANE_H + AXIS;

  const svg = s("svg", { class: "chrono-svg", height: H }) as SVGSVGElement;
  svg.classList.add("chrono-svg");

  const wrap = h("div", { class: "chrono-wrap", style: "position:relative" });
  const closePanel = () => { wrap.querySelector(".side-panel")?.remove(); };
  const openPanel = (slug: string) => { closePanel(); wrap.append(sidePanel(slug, closePanel)); };

  const fiches = Object.entries(A.fiches)
    .map(([slug, f]) => ({ slug, f, t: Date.parse(f.dt), tf: f.df ? Date.parse(f.df) : null }))
    .filter((x) => Number.isFinite(x.t))
    .sort((a, b) => a.t - b.t);

  function render(): void {
    const W = Math.max(640, svg.clientWidth || wrap.clientWidth || 960);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.replaceChildren();
    const plotW = W - GUTTER - PAD_R;
    const x = (t: number) => GUTTER + ((t - st.t0) / (st.t1 - st.t0)) * plotW;

    // bandes gouvernements
    GOUV_PERIODES.forEach((g, i) => {
      const x1 = Math.max(GUTTER, x(Date.parse(g.debut)));
      const x2 = Math.min(W - PAD_R, x(Date.parse(g.fin)));
      if (x2 <= GUTTER || x1 >= W - PAD_R || x2 - x1 <= 0) return;
      const rect = s("rect", { x: x1, y: 0, width: x2 - x1, height: H - AXIS, fill: i % 2 ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.015)" });
      svg.append(rect);
      if (x2 - x1 > 52) {
        const label = s("text", { x: (x1 + x2) / 2, y: 15, "text-anchor": "middle", fill: "rgba(255,255,255,0.55)", "font-size": 10, "font-family": "JetBrains Mono, monospace" });
        label.textContent = g.nom;
        svg.append(label);
      }
    });

    // grilles annuelles
    for (let y = 2015; y <= 2027; y++) {
      const t = Date.parse(`${y}-01-01`);
      const xx = x(t);
      if (xx < GUTTER || xx > W - PAD_R) continue;
      svg.append(s("line", { x1: xx, y1: TOP - 12, x2: xx, y2: H - AXIS, stroke: "rgba(255,255,255,0.06)" }));
      const lbl = s("text", { x: xx + 3, y: H - 9, fill: "rgba(255,255,255,0.45)", "font-size": 10, "font-family": "JetBrains Mono, monospace" });
      lbl.textContent = String(y);
      svg.append(lbl);
    }

    // lanes domaines
    lanes.forEach((d, i) => {
      const y = TOP + i * LANE_H;
      svg.append(s("line", { x1: GUTTER, y1: y + LANE_H, x2: W - PAD_R, y2: y + LANE_H, stroke: "rgba(255,255,255,0.045)" }));
      const lbl = s("text", { x: 10, y: y + LANE_H / 2 + 4, fill: domColor(d), "font-size": 11, "font-weight": 500 });
      const nom = A.domaineNoms[d] ?? d;
      lbl.textContent = nom.length > 19 ? nom.slice(0, 18) + "…" : nom;
      svg.append(lbl);
    });

    // fiches
    const lastX: number[] = lanes.map(() => -1e12);
    const lastLvl: number[] = lanes.map(() => 0);
    for (const { slug, f, t, tf } of fiches) {
      if (st.grades.size && !st.grades.has(f.g)) continue;
      if (st.types.size && !st.types.has(f.ty)) continue;
      const lane = lanes.indexOf(f.d[0]);
      if (lane === -1) continue;
      const cx = x(t);
      if (cx < GUTTER - 4 || cx > W - PAD_R + 4) continue;
      if (cx - lastX[lane] < 8) lastLvl[lane] = (lastLvl[lane] + 1) % 3;
      else lastLvl[lane] = 0;
      lastX[lane] = cx;
      const cy = TOP + lane * LANE_H + LANE_H / 2 + (lastLvl[lane] - 1) * 8;
      const color = domColor(f.d[0]);

      if (tf && Number.isFinite(tf)) {
        const x2 = Math.min(W - PAD_R, x(tf));
        if (x2 > cx) svg.append(s("line", { x1: cx, y1: cy, x2, y2: cy, stroke: color, "stroke-width": 3, "stroke-linecap": "round", opacity: 0.3 }));
      }
      const dot = s("circle", { cx, cy, r: 3.6, fill: color, class: "pt", "data-slug": slug, style: "cursor:pointer" });
      const title = s("title");
      title.textContent = `${f.dt} · ${f.t}`;
      dot.append(title);
      svg.append(dot);
    }
  }

  // zoom molette autour du curseur
  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const plotW = rect.width - GUTTER - PAD_R;
    const tAt = st.t0 + ((px - GUTTER) / plotW) * (st.t1 - st.t0);
    const factor = e.deltaY < 0 ? 0.78 : 1.28;
    let t0 = tAt - (tAt - st.t0) * factor;
    let t1 = tAt + (st.t1 - tAt) * factor;
    const MIN_SPAN = 1000 * 3600 * 24 * 60;
    if (t1 - t0 < MIN_SPAN) return;
    st.t0 = Math.max(T_MIN, t0);
    st.t1 = Math.min(T_MAX, t1);
    render();
  }, { passive: false });

  // pan au drag ; le clic sur un point est géré au pointerup (seuil 5 px) car
  // setPointerCapture détourne l'événement click natif vers le svg
  let dragging: { px: number; py: number; t0: number; t1: number; target: EventTarget | null; moved: boolean } | null = null;
  svg.addEventListener("pointerdown", (e) => {
    dragging = { px: e.clientX, py: e.clientY, t0: st.t0, t1: st.t1, target: e.target, moved: false };
    svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    if (Math.abs(e.clientX - dragging.px) + Math.abs(e.clientY - dragging.py) > 5) dragging.moved = true;
    if (!dragging.moved) return;
    const rect = svg.getBoundingClientRect();
    const plotW = rect.width - GUTTER - PAD_R;
    const dt = ((e.clientX - dragging.px) / plotW) * (dragging.t1 - dragging.t0);
    const span = dragging.t1 - dragging.t0;
    let t0 = dragging.t0 - dt;
    t0 = Math.max(T_MIN, Math.min(t0, T_MAX - span));
    st.t0 = t0; st.t1 = t0 + span;
    render();
  });
  svg.addEventListener("pointerup", () => {
    if (dragging && !dragging.moved) {
      const el = dragging.target as Element | null;
      const slug = el && el instanceof Element ? el.getAttribute("data-slug") : null;
      if (slug) openPanel(slug);
    }
    dragging = null;
  });

  const toggle = (label: string, on: () => boolean, flip: () => void): HTMLElement => {
    const btn = h("button", { class: "gp-toggle", onclick: () => { flip(); btn.classList.toggle("on", on()); render(); } }, label);
    return btn;
  };
  const flipSet = (set: Set<string>, v: string) => () => { set.has(v) ? set.delete(v) : set.add(v); };

  const controls = h("div", { class: "chrono-controls" },
    h("span", { style: "font-size:11px;color:var(--muted-foreground);text-transform:uppercase;letter-spacing:0.5px;font-weight:600" }, "Grade"),
    ...["A", "B", "C"].map((g) => toggle(g, () => st.grades.has(g), flipSet(st.grades, g))),
    h("span", { style: "font-size:11px;color:var(--muted-foreground);text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-left:10px" }, "Type"),
    ...Object.entries(TYPE_LABELS).map(([ty, l]) => toggle(l, () => st.types.has(ty), flipSet(st.types, ty))),
    h("button", { class: "gp-toggle", style: "margin-left:auto", onclick: () => { st.t0 = T_MIN; st.t1 = T_MAX; render(); } }, "Réinitialiser le zoom"),
    h("span", { style: "font-size:11px;color:var(--muted-foreground)" }, "molette = zoom · glisser = déplacer · point = fiche"),
  );

  wrap.append(controls, svg);
  const view = h("div", { class: "view", style: "max-width:1400px" },
    h("div", { class: "page-title", style: "padding:0 16px" }, "La chronologie"),
    h("p", { class: "page-sub", style: "padding:0 16px" },
      `Les ${Object.keys(A.fiches).length} pièces sur onze ans, une ligne par domaine, les bandes verticales suivent les neuf gouvernements. `,
      "Les segments matérialisent les pièces qui s'étalent dans le temps."),
    wrap,
  );

  if (activeRender) window.removeEventListener("resize", activeRender);
  activeRender = render;
  window.addEventListener("resize", render);
  requestAnimationFrame(() => render());
  return view;
}
