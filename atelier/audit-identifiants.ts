#!/usr/bin/env bun
/**
 * Audit de vraisemblance des identifiants Légifrance (extension de l'étape D2).
 *
 *   bun run atelier/audit-identifiants.ts [seuil-en-jours]
 *
 * Lecture seule, aucun accès réseau. Les identifiants JORFTEXT sont attribués
 * dans l'ordre de publication au Journal officiel : leur valeur numérique est
 * donc une horloge. Le script interpole la date de publication qu'implique
 * chaque identifiant du corpus, la compare à la date de la fiche qui le cite,
 * et signale les écarts.
 *
 * Pourquoi ça vaut le coup : le mode de défaillance observé trois fois sur ce
 * dossier est toujours le même, un identifiant de plage 2024 servi pour un
 * texte de 2026. Il produit une URL d'apparence valide qui renvoie « Pas de
 * contenu disponible ». Un identifiant faux se voit donc au numéro, sans
 * ouvrir la page.
 *
 * Ce que le script NE dit PAS : un écart n'est pas une preuve. Une fiche peut
 * légitimement citer un texte bien postérieur ou antérieur au fait qu'elle
 * relate (un rapport de 2026 sur une mesure de 2019). Le script trie les
 * candidats au sondage, il ne tranche pas. Seule l'ouverture de l'URL tranche
 * (« tout identifiant non sondé est présumé faux »).
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const BASE = join(ROOT, "base");

// Ancres : identifiants dont la date de publication est établie par sondage
// direct. Toute nouvelle ancre vérifiée a sa place ici, la précision de
// l'interpolation en dépend.
const ANCRES: [number, string][] = [
  [38829065, "2019-07-26"], // loi école de la confiance
  [47561974, "2023-05-19"], // loi JO 2024
  [47715784, "2023-06-22"], // loi accélération du nucléaire
  [49180270, "2024-02-21"], // décret d'annulation de crédits
  [49689651, "2024-06-09"], // décret de dissolution
  [50000932, "2024-07-16"], // décret de cessation de fonctions Attal
  [52075814, "2025-08-12"], // loi Duplomb
  [53508155, "2026-02-19"], // loi de finances pour 2026
  [53707088, "2026-03-20"], // loi JO 2030
];

const jour = 86_400_000;
const enJours = (d: string) => new Date(d + "T00:00:00Z").getTime() / jour;

const ancres = ANCRES.map(([id, d]) => [id, enJours(d)] as const).sort(
  (a, b) => a[0] - b[0],
);

/** Date de publication qu'implique un identifiant, par interpolation linéaire. */
function dateImpliquee(id: number): string {
  let i = ancres.findIndex(([a]) => a >= id);
  if (i === -1) i = ancres.length - 1;
  if (i === 0) i = 1;
  const [x0, y0] = ancres[i - 1];
  const [x1, y1] = ancres[i];
  const t = y0 + ((id - x0) * (y1 - y0)) / (x1 - x0);
  return new Date(t * jour).toISOString().slice(0, 10);
}

const SEUIL = Number(process.argv[2] ?? 200);

// L'interpolation n'a de sens que là où les ancres sont denses. Avant cette
// borne, le calcul est une extrapolation : le contrôle s'abstient.
const PLANCHER = enJours("2022-01-01");

type Suspect = {
  fichier: string;
  texte: string;
  dateTexte: string;
  id: string;
  implique: string;
  ecart: number;
};

const suspects: Suspect[] = [];
const horsPortee: string[] = [];
let total = 0;
let apparies = 0;
const autresFormats = new Map<string, number>();

for (const nom of readdirSync(BASE).filter((f) => f.endsWith(".md")).sort()) {
  const contenu = readFileSync(join(BASE, nom), "utf8");
  const ids = [...contenu.matchAll(/JORFTEXT(\d{12})/g)].map((m) => m[1]);
  total += ids.length;

  for (const m of contenu.matchAll(/(LEGIARTI|CETATEXT|JORFARTI|CNILTEXT)\d+/g))
    autresFormats.set(m[1], (autresFormats.get(m[1]) ?? 0) + 1);

  // Le contrôle n'est fiable que sur un appariement sans ambiguïté : la fiche
  // nomme UN texte daté et cite UN identifiant. C'est le cas de la fiche qui
  // porte sur le texte qu'elle source, celui où un faux identifiant est le
  // plus dommageable.
  const refs = [
    ...contenu.matchAll(
      /(?:loi|décret|ordonnance|arrêté)[^.\n]{0,60}?n°\s*(\d{4})-\d+\s+du\s+(\d{1,2})[/\s]([\wéû]+\.?)?[/\s]?(\d{4})?/gi,
    ),
  ];
  const datees = [
    ...contenu.matchAll(
      /n°\s*\d{4}-\d+\s+du\s+(\d{2})\/(\d{2})\/(\d{4})/g,
    ),
  ].map((m) => `${m[3]}-${m[2]}-${m[1]}`);

  if (ids.length !== 1 || datees.length !== 1) continue;
  apparies++;

  const dateTexte = datees[0];
  if (enJours(dateTexte) < PLANCHER) {
    horsPortee.push(`${nom} (texte du ${dateTexte})`);
    continue;
  }

  const implique = dateImpliquee(Number(ids[0]));
  const ecart = Math.round(enJours(implique) - enJours(dateTexte));
  if (Math.abs(ecart) > SEUIL)
    suspects.push({
      fichier: nom,
      texte: refs.length ? "texte nommé" : "référence",
      dateTexte,
      id: ids[0],
      implique,
      ecart,
    });
}

console.log(`Identifiants JORFTEXT dans base/ : ${total}`);
console.log(
  `Fiches où un identifiant unique s'apparie à un texte daté unique : ${apparies}`,
);
console.log(
  `dont hors portée du contrôle (texte antérieur à 2022, ancres trop rares) : ${horsPortee.length}`,
);
console.log(
  `\nIncohérences de plus de ${SEUIL} jours entre la date du texte cité et celle qu'implique son identifiant : ${suspects.length}\n`,
);

for (const s of suspects.sort((a, b) => Math.abs(b.ecart) - Math.abs(a.ecart))) {
  const sens = s.ecart > 0 ? "postérieure" : "antérieure";
  console.log(
    `  ${s.fichier}\n    texte daté du ${s.dateTexte} · identifiant ...${s.id.slice(-8)} · publication impliquée ~${s.implique}\n    (${sens} de ${Math.abs(s.ecart)} jours à la date du texte)`,
  );
}

if (autresFormats.size) {
  console.log("\nAutres identifiants présents (hors périmètre de ce contrôle) :");
  for (const [f, n] of [...autresFormats].sort())
    console.log(`  ${f} : ${n}`);
}

console.log(
  "\nUn écart n'est pas une preuve : il trie les candidats au sondage.\nSeule l'ouverture de l'URL tranche.",
);
