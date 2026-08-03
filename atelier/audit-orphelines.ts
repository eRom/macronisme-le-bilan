#!/usr/bin/env bun
/**
 * Tri des sources mortes : ce n'est pas la liste des URL qui commande, c'est
 * l'exposition des fiches. Une fiche dont TOUTES les sources sont mortes
 * n'établit plus rien ; une fiche à trois sources dont une est morte tient
 * encore. Et une fiche citée par une pièce de jugement pèse plus qu'une autre.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const SONDAGE = process.argv[2];

// 1. Verdict par URL, lu sur la sortie du sondage.
const txt = readFileSync(SONDAGE, "utf8").split("\n");
const verdictUrl = new Map<string, string>();
let section = "";
for (let i = 0; i < txt.length; i++) {
  const h = txt[i].match(/^(PIEGE|MORTE|DEPLACEE|BLOQUEE|VIVANTE) : \d+/);
  if (h) { section = h[1]; continue; }
  const u = txt[i].match(/^\s{4}(https?:\/\/\S+)$/);
  if (u && section) verdictUrl.set(u[1], section);
}

// 2. Fiche -> sources, et fiche -> grade.
type F = { grade: string; sources: string[] };
const fiches = new Map<string, F>();
for (const nom of readdirSync(join(ROOT, "base")).filter((f) => f.endsWith(".md"))) {
  const t = readFileSync(join(ROOT, "base", nom), "utf8");
  const fin = t.indexOf("\n---", 3);
  const fm = fin === -1 ? t : t.slice(0, fin);
  const grade = fm.match(/^grade:\s*(\w)/m)?.[1] ?? "?";
  const sources = [...fm.matchAll(/^\s*-\s*(https?:\/\/\S+)\s*$/gm)].map((m) => m[1]);
  fiches.set(nom.replace(/\.md$/, ""), { grade, sources });
}

// 3. Fiches citées par une pièce de jugement.
const citees = new Set<string>();
for (const nom of readdirSync(join(ROOT, "jugement")).filter((f) => f.endsWith(".md"))) {
  const t = readFileSync(join(ROOT, "jugement", nom), "utf8");
  for (const m of t.matchAll(/\[\[([^\]]+)\]\]/g)) citees.add(m[1]);
}

// 4. Exposition par fiche.
type Ligne = { slug: string; grade: string; mortes: number; total: number; citee: boolean; urls: string[] };
const lignes: Ligne[] = [];
for (const [slug, f] of fiches) {
  const mortes = f.sources.filter((u) => {
    const v = verdictUrl.get(u);
    return v === "MORTE" || v === "DEPLACEE";
  });
  if (!mortes.length) continue;
  lignes.push({ slug, grade: f.grade, mortes: mortes.length, total: f.sources.length, citee: citees.has(slug), urls: mortes });
}

const orphelines = lignes.filter((l) => l.mortes === l.total);
const partielles = lignes.filter((l) => l.mortes < l.total);

const compte = (v: string) => [...verdictUrl.values()].filter((x) => x === v).length;
console.log(`URL sondées : ${verdictUrl.size} non vivantes listées`);
for (const v of ["PIEGE", "MORTE", "DEPLACEE", "BLOQUEE"]) console.log(`  ${v} : ${compte(v)}`);

console.log(`\nFiches touchées : ${lignes.length} sur ${fiches.size}`);
console.log(`  ORPHELINES (toutes sources mortes ou déplacées) : ${orphelines.length}`);
console.log(`    dont citées par un jugement : ${orphelines.filter((l) => l.citee).length}`);
console.log(`    dont grade A : ${orphelines.filter((l) => l.grade === "A").length}`);
console.log(`  partiellement touchées : ${partielles.length}`);

console.log(`\n=== ORPHELINES, triées : citées d'abord, puis grade ===`);
for (const l of orphelines.sort((a, b) => Number(b.citee) - Number(a.citee) || a.grade.localeCompare(b.grade) || a.slug.localeCompare(b.slug))) {
  console.log(`\n${l.citee ? "[CITÉE] " : "        "}${l.slug} [${l.grade}] ${l.mortes}/${l.total}`);
  for (const u of l.urls) console.log(`    ${verdictUrl.get(u)}  ${u}`);
}

console.log(`\n=== hôtes les plus touchés ===`);
const parHote = new Map<string, number>();
for (const [u, v] of verdictUrl) {
  if (v !== "MORTE" && v !== "DEPLACEE") continue;
  let h = "?";
  try { h = new URL(u).host.replace(/^www\./, ""); } catch {}
  parHote.set(h, (parHote.get(h) ?? 0) + 1);
}
for (const [h, n] of [...parHote].sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(`  ${String(n).padStart(3)}  ${h}`);
