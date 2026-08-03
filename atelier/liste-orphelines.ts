#!/usr/bin/env bun
/** Génère la liste de travail des orphelines, classée par voie de récupération. */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const txt = readFileSync(process.argv[2], "utf8").split("\n");

const verdictUrl = new Map<string, string>();
let section = "";
for (const l of txt) {
  const h = l.match(/^(PIEGE|MORTE|DEPLACEE|BLOQUEE|VIVANTE) : \d+/);
  if (h) { section = h[1]; continue; }
  const u = l.match(/^\s{4}(https?:\/\/\S+)$/);
  if (u && section) verdictUrl.set(u[1], section);
}

type F = { grade: string; titre: string; domaines: string; sources: string[] };
const fiches = new Map<string, F>();
for (const nom of readdirSync(join(ROOT, "base")).filter((f) => f.endsWith(".md"))) {
  const t = readFileSync(join(ROOT, "base", nom), "utf8");
  const fin = t.indexOf("\n---", 3);
  const fm = fin === -1 ? t : t.slice(0, fin);
  fiches.set(nom.replace(/\.md$/, ""), {
    grade: fm.match(/^grade:\s*(\w)/m)?.[1] ?? "?",
    titre: (fm.match(/^titre:\s*(.+)$/m)?.[1] ?? "").trim(),
    domaines: (fm.match(/^domaines:\s*\[(.+)\]/m)?.[1] ?? "").trim(),
    sources: [...fm.matchAll(/^\s*-\s*(https?:\/\/\S+)\s*$/gm)].map((m) => m[1]),
  });
}

const citees = new Set<string>();
for (const nom of readdirSync(join(ROOT, "jugement")).filter((f) => f.endsWith(".md")))
  for (const m of readFileSync(join(ROOT, "jugement", nom), "utf8").matchAll(/\[\[([^\]]+)\]\]/g))
    citees.add(m[1]);

// Voie probable, d'après la forme de l'URL. Indication, jamais une conclusion.
const voie = (u: string): string => {
  const h = (() => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return "?"; } })();
  if (/curia\.europa\.eu/.test(h)) return "1-CELEX";
  if (/legifrance|conseil-etat|courdecassation|conseil-constitutionnel|defenseurdesdroits|juricaf/.test(h)) return "1";
  if (/senat\.fr|assemblee-nationale\.fr|ccomptes\.fr|hatvp\.fr/.test(h)) return "1?";
  if (/\/presse\/|\/actualite|communique|\/actualites\//.test(u)) return "3";
  if (/gouv\.fr|europa\.eu/.test(h)) return "2";
  return "3";
};

type L = { slug: string } & F & { citee: boolean; mortes: string[] };
const orph: L[] = [];
for (const [slug, f] of fiches) {
  const mortes = f.sources.filter((u) => ["MORTE", "DEPLACEE"].includes(verdictUrl.get(u) ?? ""));
  if (mortes.length && mortes.length === f.sources.length)
    orph.push({ slug, ...f, citee: citees.has(slug), mortes });
}

const rang = (l: L) => (l.citee ? 0 : 1) * 10 + "ABC?".indexOf(l.grade);
orph.sort((a, b) => rang(a) - rang(b) || a.slug.localeCompare(b.slug));

console.log(`| # | Fiche | G | Cit. | Voie | URL mortes |`);
console.log(`|---|---|---|---|---|---|`);
orph.forEach((l, i) => {
  const voies = [...new Set(l.mortes.map(voie))].join(" ");
  const urls = l.mortes.map((u) => `\`${u}\``).join("<br>");
  console.log(`| ${i + 1} | [\`${l.slug}\`](../base/${l.slug}.md) | ${l.grade} | ${l.citee ? "oui" : "—"} | ${voies} | ${urls} |`);
});
console.error(`${orph.length} orphelines`);
