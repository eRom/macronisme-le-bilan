import { A } from "../types";
import type { Role } from "../types";
import { h, badgeGrade, badgeType, chipDomaine, sectionHeader, footer, fmtDate, frow, roleBadge, pieceLabel, setTitle, backtop, STATUT_LABELS } from "../ui";

function host(url: string): string {
  try { return new URL(url).host.replace(/^www\./, ""); } catch { return ""; }
}

function statutBadge(st: string): HTMLElement {
  const cls: Record<string, string> = { tenue: "b-role-decharge", partielle: "b-verdict-mitige", abandonnee: "b-verdict-defavorable" };
  return h("span", { class: `badge ${cls[st] ?? "b-type"}` }, STATUT_LABELS[st] ?? st);
}

export function viewFiche(slug: string): HTMLElement {
  const f = A.fiches[slug];
  if (!f) return h("div", { class: "view" }, h("div", { class: "empty" }, "Fiche introuvable."));
  setTitle(f.t);

  const parPiece = new Map<string, Role[]>();
  for (const r of f.roles) {
    const list = parPiece.get(r.piece) ?? [];
    list.push(r);
    parPiece.set(r.piece, list);
  }

  const ministres = f.act.m.map((m) => m.pf ? `${m.n} (${m.pf})` : m.n).join(", ");

  return h("div", { class: "view narrow" },
    backtop(`#/domaine/${f.d[0]}`, A.domaineNoms[f.d[0]] ?? "Domaine"),
    h("div", { class: "fiche-head" },
      h("div", { class: "fiche-date" }, fmtDate(f.dt) + (f.df ? ` → ${fmtDate(f.df)}` : "")),
      h("h1", { class: "page-title", style: "margin-top:6px" }, f.t),
      h("div", { class: "fiche-meta" },
        badgeGrade(f.g), badgeType(f.ty),
        f.st ? statutBadge(f.st) : null,
        ...f.d.map((d) => chipDomaine(d)),
      ),
      f.act.p || ministres || f.act.gb
        ? h("div", { style: "margin-top:12px" },
            f.act.p ? h("div", { class: "meta-line" }, h("span", { class: "k" }, "Président"), h("span", { class: "v" }, f.act.p)) : null,
            ministres ? h("div", { class: "meta-line" }, h("span", { class: "k" }, "Ministres"), h("span", { class: "v" }, ministres)) : null,
            f.act.gb ? h("div", { class: "meta-line" }, h("span", { class: "k" }, "Gouvernement"), h("span", { class: "v" }, f.act.gb)) : null,
          )
        : null,
      f.g === "C"
        ? h("div", { class: "note-c" },
            "Grade C : allégation à source unique. Par méthode, une pièce de grade C n'est jamais déterminante dans un verdict.")
        : null,
    ),
    h("div", { class: "prose", html: f.html }),
    parPiece.size
      ? [sectionHeader("Rôles dans les jugements"),
         h("div", {},
           ...[...parPiece.entries()].map(([piece, roles]) =>
             h("div", { class: "role-item" },
               piece === "synthese"
                 ? h("span", { style: "font-size:13px;font-weight:600;flex-shrink:0" }, "Synthèse")
                 : h("a", { href: `#/domaine/${piece}`, style: "font-size:13px;font-weight:600;flex-shrink:0" }, pieceLabel(piece)),
               h("span", { style: "display:flex;gap:4px;flex-wrap:wrap;align-items:baseline" },
                 ...roles.map((r) => [
                   roleBadge(r),
                   r.label ? h("span", { class: "rl", title: r.label }, r.label.length > 110 ? r.label.slice(0, 110) + "…" : r.label) : null,
                 ]),
               ),
             )),
         )]
      : null,
    f.in.length
      ? [sectionHeader(`Citée par ${f.in.length} fiche${f.in.length > 1 ? "s" : ""}`),
         h("div", {}, ...f.in.map((s) => frow(s)))]
      : null,
    f.out.length
      ? [sectionHeader("Cette fiche renvoie vers"),
         h("div", {}, ...f.out.map((s) => frow(s)))]
      : null,
    sectionHeader(`Sources (${f.src.length})`),
    h("div", {},
      ...f.src.map((s) => {
        if (/^https?:\/\//.test(s)) {
          return h("div", { class: "src-item" },
            h("span", { class: "host" }, host(s)),
            h("a", { href: s, target: "_blank", rel: "noopener noreferrer" }, s),
          );
        }
        const isArchive = /\.md$/.test(s) || s.includes("/");
        return h("div", { class: "src-item" },
          h("span", { class: "host" }, isArchive ? "archive" : "note"),
          h("span", { style: "color:var(--muted-foreground)" },
            isArchive ? `${s.split("/").pop()} (archive interne du dossier, non publiée en ligne)` : s),
        );
      }),
    ),
    footer(),
  );
}
