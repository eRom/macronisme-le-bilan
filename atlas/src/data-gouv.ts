/**
 * Périodes des neuf gouvernements, ancrées sur la fiche de cadrage
 * base/2017-05-15-suite-gouvernements-2017-2026.md (décrets JO sondés un par un
 * le 30/07/2026). Bornes = nomination du PM (composition pour Philippe II),
 * fin = nomination du successeur ; Lecornu II ouvert à la date d'arrêt du dossier.
 */
export type GouvPeriode = { nom: string; debut: string; fin: string };

export const GOUV_PERIODES: GouvPeriode[] = [
  { nom: "Philippe I", debut: "2017-05-15", fin: "2017-06-21" },
  { nom: "Philippe II", debut: "2017-06-21", fin: "2020-07-03" },
  { nom: "Castex", debut: "2020-07-03", fin: "2022-05-16" },
  { nom: "Borne", debut: "2022-05-16", fin: "2024-01-09" },
  { nom: "Attal", debut: "2024-01-09", fin: "2024-09-05" },
  { nom: "Barnier", debut: "2024-09-05", fin: "2024-12-13" },
  { nom: "Bayrou", debut: "2024-12-13", fin: "2025-09-09" },
  { nom: "Lecornu I", debut: "2025-09-09", fin: "2025-10-10" },
  { nom: "Lecornu II", debut: "2025-10-10", fin: "2026-07-30" },
];
