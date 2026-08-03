#!/usr/bin/env bun
/**
 * Audit mécanique de couverture (étape D2 de la méthode exhaustivité).
 *
 *   bun run atelier/audit-couverture.ts [slug-domaine]
 *
 * Lecture seule sur `base/`. Sans argument : vue globale et tableau par
 * domaine. Avec un slug : détail du domaine (histogramme par année,
 * répartition par type, grades C restants, fiches multi-domaines).
 *
 * Un trou d'histogramme n'est pas un trou de couverture : il ne le devient
 * (T3) que s'il croise un sous-thème de la matrice du domaine. Ce script
 * fournit les chiffres, jamais le diagnostic.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const BASE = join(ROOT, "base");

type Fiche = {
  fichier: string;
  titre: string;
  type: string;
  domaines: string[];
  date: string;
  grade: string;
};

const fiches: Fiche[] = [];
for (const nom of readdirSync(BASE).filter((f) => f.endsWith(".md")).sort()) {
  const texte = readFileSync(join(BASE, nom), "utf8");
  const fin = texte.indexOf("\n---", 3);
  const fm = fin === -1 ? texte : texte.slice(0, fin);
  const champ = (c: string) =>
    fm.match(new RegExp(`^${c}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
  // Le frontmatter peut envelopper une liste longue : capture multi-lignes.
  const domaines = (fm.match(/^domaines:\s*\[([\s\S]*?)\]/m)?.[1] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  fiches.push({
    fichier: nom,
    titre: champ("titre"),
    type: champ("type"),
    domaines,
    date: champ("date") || nom.slice(0, 10),
    grade: champ("grade"),
  });
}

const compte = (valeurs: string[]) => {
  const c = new Map<string, number>();
  for (const v of valeurs) c.set(v, (c.get(v) ?? 0) + 1);
  return [...c.entries()].sort();
};

const histogramme = (liste: Fiche[]) =>
  compte(liste.map((f) => f.date.slice(0, 4)))
    .map(([an, n]) => `  ${an}  ${String(n).padStart(3)}  ${"█".repeat(n)}`)
    .join("\n");

const slug = process.argv[2];

if (!slug) {
  console.log(`Fiches dans base/ : ${fiches.length}\n`);
  console.log("Par domaine :");
  const parDomaine = compte(fiches.flatMap((f) => f.domaines));
  for (const [d, n] of parDomaine.sort((a, b) => b[1] - a[1]))
    console.log(`  ${d.padEnd(22)} ${String(n).padStart(3)}`);
  console.log("\nPar année (date du fait) :");
  console.log(histogramme(fiches));
  console.log("\nPar type :");
  for (const [t, n] of compte(fiches.map((f) => f.type)))
    console.log(`  ${t.padEnd(12)} ${String(n).padStart(3)}`);
  console.log("\nPar grade :");
  for (const [g, n] of compte(fiches.map((f) => f.grade)))
    console.log(`  ${g.padEnd(3)} ${String(n).padStart(3)}`);
  const sansDomaine = fiches.filter((f) => f.domaines.length === 0);
  if (sansDomaine.length)
    console.log(
      `\nATTENTION — sans domaine parsé : ${sansDomaine
        .map((f) => f.fichier)
        .join(", ")}`,
    );
  process.exit(0);
}

const du = fiches.filter((f) => f.domaines.includes(slug));
if (!du.length) {
  console.error(`Aucune fiche pour le domaine « ${slug} ».`);
  process.exit(1);
}

console.log(`Domaine ${slug} : ${du.length} fiches\n`);
console.log("Par année (date du fait) :");
console.log(histogramme(du));
console.log("\nPar type :");
for (const [t, n] of compte(du.map((f) => f.type)))
  console.log(`  ${t.padEnd(12)} ${String(n).padStart(3)}`);
console.log("\nPar grade :");
for (const [g, n] of compte(du.map((f) => f.grade)))
  console.log(`  ${g.padEnd(3)} ${String(n).padStart(3)}`);

const enC = du.filter((f) => f.grade === "C");
console.log(`\nGrades C (candidats T5) : ${enC.length}`);
for (const f of enC) console.log(`  ${f.fichier}  ${f.titre}`);

const multi = du.filter((f) => f.domaines.length > 1);
console.log(`\nMulti-domaines : ${multi.length}`);
for (const f of multi)
  console.log(
    `  ${f.fichier}  [${f.domaines.filter((d) => d !== slug).join(", ")}]`,
  );
