#!/usr/bin/env bun
/**
 * Audit de publiabilité du dépôt.
 *
 *   bun run atelier/audit-publiabilite.ts
 *
 * À jouer avant tout commit. Complète l'audit du build sans le doubler :
 * `atlas/build.ts` scanne le RENDU du site (`dist/data.js`), celui-ci scanne
 * les SOURCES markdown, c'est-à-dire ce que GitHub publie tel quel. Un dépôt
 * public expose les deux, et seul le second voit les fichiers que le site ne
 * rend pas.
 *
 * Deux niveaux d'exigence, volontairement distincts :
 *
 *   FUITES TECHNIQUES, interdites PARTOUT.
 *     Chemins machine, arborescence de travail, outillage d'infrastructure
 *     personnel. Aucune valeur pour un lecteur, et elles exposent un
 *     environnement. Zéro tolérance.
 *
 *   VOCABULAIRE DE CHANTIER, interdit dans le CORPUS seulement.
 *     Noms d'outillage, formulations nominatives, renvois aux fichiers de
 *     travail. Une fiche de `base/` ou une pièce de `jugement/` doit se tenir
 *     seule : elle est aussi lue sur le site, qui ne rend pas `atelier/`. En
 *     revanche `atelier/` et les documents signés assument ce vocabulaire,
 *     c'est même leur objet.
 *
 * Ajouter un motif ici plutôt que de rattraper une occurrence à la main : une
 * correction manuelle ne protège que du cas d'aujourd'hui.
 */

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Racine dérivée de l'emplacement du script : aucun chemin machine en dur, ce
// qui rend le script portable et lui permet de passer son propre audit.
const ROOT = resolve(import.meta.dir, "..");

type Motif = [RegExp, string];

const FUITES_TECHNIQUES: Motif[] = [
  [/\/Users\/[a-z]/g, "chemin machine"],
  [/\/home\/[a-z]/g, "chemin machine"],
  [/EROM-HQ/g, "arborescence de travail antérieure"],
  [/(?<!\w)\.claude(?!\w)/g, "arborescence d'outillage"],
  [/\bpolitique\/(research|base|jugement|methodes|atlas)/g, "ancien chemin du poste"],
  [/\bSentinelle\b/g, "outillage d'infrastructure"],
  [/\bwiki-vault\b/g, "outillage d'infrastructure"],
  [/docs\/agy\//g, "arborescence de travail"],
];

const VOCABULAIRE_CHANTIER: Motif[] = [
  [/\bchronologie\.md\b/g, "renvoi au suivi de travail"],
  [/\batelier\//g, "renvoi à l'atelier, que le site ne rend pas"],
  [/(?<![-\w])agy(?![-\w])/gi, "nom d'outillage"],
  [/erom-research:/g, "nom d'outillage"],
  [/\bmethode-(recherche|jugement|synthese|exhaustivite)\b/g, "renvoi à une méthode d'origine"],
  [/\bLinear\b|\bSlack\b/g, "outillage tiers hors sujet"],
  [/\bRomain\b/g, "formulation nominative"],
];

/** Ne doit jamais figurer dans un commit, quel qu'en soit le contenu. */
const JAMAIS_COMMITE = ["_memory_/", "atlas/dist/", "atlas/node_modules/"];

/**
 * Exemptions des FUITES TECHNIQUES. Trois fichiers contiennent nécessairement
 * les motifs qu'ils proscrivent ou excluent : les deux tables d'audit, et les
 * `.gitignore` dont c'est la fonction même de nommer ce qu'ils écartent.
 */
const EXEMPTS = new Set([
  "atelier/audit-publiabilite.ts",
  "atlas/build.ts",
  ".gitignore",
  "atlas/.gitignore",
]);

/** Le corpus : ce qui est rendu par le site et doit donc se tenir seul. */
const dansCorpus = (f: string) => f.startsWith("base/") || f.startsWith("jugement/");

const LISIBLES = new Set([".md", ".ts", ".json", ".html", ".css", ".txt", ".sh", ".sujet"]);

function fichiersCommites(): string[] {
  const r = Bun.spawnSync({
    cmd: ["git", "ls-files", "--cached", "--others", "--exclude-standard"],
    cwd: ROOT,
  });
  if (r.exitCode !== 0) {
    console.error("git ls-files a échoué : ce script doit tourner dans le dépôt.");
    process.exit(2);
  }
  return new TextDecoder().decode(r.stdout).split("\n").filter(Boolean);
}

function scanner(fichiers: string[], motifs: Motif[], filtre: (f: string) => boolean, titre: string): number {
  console.log(`\n### ${titre}`);
  let total = 0;
  for (const [re, quoi] of motifs) {
    const hits: string[] = [];
    for (const f of fichiers) {
      if (EXEMPTS.has(f) || !filtre(f)) continue;
      const ext = f.includes(".") ? f.slice(f.lastIndexOf(".")) : "";
      if (!LISIBLES.has(ext)) continue;
      const p = join(ROOT, f);
      if (!existsSync(p)) continue;
      const texte = readFileSync(p, "utf8");
      for (const m of texte.matchAll(re)) {
        const i = m.index ?? 0;
        const ligne = texte.slice(0, i).split("\n").length;
        const extrait = texte.slice(Math.max(0, i - 55), i + m[0].length + 55).replace(/\s+/g, " ");
        hits.push(`   ${f}:${ligne}  ...${extrait}...`);
      }
    }
    if (hits.length) {
      total += hits.length;
      console.log(`\n-- ${quoi}  (${re.source}) : ${hits.length}`);
      console.log(hits.slice(0, 5).join("\n"));
      if (hits.length > 5) console.log(`   ... et ${hits.length - 5} autre(s)`);
    }
  }
  if (total === 0) console.log("  aucun");
  return total;
}

const fichiers = fichiersCommites();
console.log(`Fichiers qui partiraient au commit : ${fichiers.length}`);

const fuitesChemin = fichiers.filter((f) => JAMAIS_COMMITE.some((p) => f.startsWith(p)));
if (fuitesChemin.length) {
  console.log("\n!! CHEMINS INTERDITS DANS LE COMMIT :");
  for (const f of fuitesChemin) console.log(`   ${f}`);
} else {
  console.log("OK  ni _memory_/, ni dist/, ni node_modules/");
}

const n1 = scanner(fichiers, FUITES_TECHNIQUES, () => true, "Fuites techniques (interdites partout)");
const n2 = scanner(fichiers, VOCABULAIRE_CHANTIER, dansCorpus, "Vocabulaire de chantier dans le corpus (base/ et jugement/)");

console.log("\n" + "=".repeat(70));
if (n1 + n2 === 0 && fuitesChemin.length === 0) {
  console.log("VERDICT : OK. Rien d'interne ne part, le corpus se tient seul.");
  process.exit(0);
}
console.log(
  `VERDICT : ${n1} fuite(s) technique(s), ${n2} dans le corpus, ` +
    `${fuitesChemin.length} chemin(s) interdit(s).`,
);
process.exit(1);
