#!/usr/bin/env bun
/**
 * Sondage des sources (campagne intégrité).
 *
 *   bun run atelier/audit-sources.ts             tout le corpus
 *   bun run atelier/audit-sources.ts <slug>      un domaine
 *
 * Sans argument, le corpus entier est sondé et les URL sont dédoublonnées :
 * les fiches sont transverses, une même source peut être citée par dix
 * d'entre elles et n'a pas à être ouverte dix fois.
 *
 * Ouvre réellement chaque URL citée en source par les fiches du domaine et
 * classe le résultat. C'est le seul contrôle qui tranche : l'audit
 * d'identifiants trie des candidats par vraisemblance, celui-ci constate.
 *
 * Le classement compte plus que le code HTTP, parce que le mode de défaillance
 * le plus dangereux du dossier ne se voit pas dans le code :
 *
 *   RACINE    l'URL n'a pas de chemin : c'est la page d'accueil d'un site, pas
 *             un document. Elle répond 200, elle n'établit rien, et elle ne
 *             mourra jamais — donc aucun sondage ne l'attrapait avant le
 *             04/08/2026. Trois cas trouvés à l'ajout de ce motif. Même
 *             famille que PIEGE : une source d'apparence parfaite qui ne
 *             porte pas ce que la fiche affirme. Vérifié sans appel réseau.
 *   PIEGE     200, mais la page dit « Pas de contenu disponible ». C'est la
 *             signature d'un identifiant Légifrance fabriqué. Trois cas
 *             confirmés sur ce dossier, dont deux sur des fiches citées par
 *             une pièce de jugement. Une URL d'apparence parfaite.
 *   MORTE     404, 410, ou l'hôte ne répond pas. Réparable ou à remplacer.
 *   BLOQUEE   403 ou 429 : le serveur refuse l'automate, la page peut être
 *             vivante. À vérifier à la main, jamais à conclure d'ici.
 *             Connus sur ce dossier : theguardian.com, web.archive.org,
 *             curia.europa.eu, interieur.gouv.fr.
 *   DEPLACEE  200 après redirection vers un autre hôte : la source vit
 *             ailleurs, l'URL du corpus est périmée.
 *   VIVANTE   200 sur l'hôte attendu.
 *
 * Un rendu JavaScript peut répondre 200 avec un corps vide (vie-publique.fr) :
 * le script le signale en VIVANTE, ce n'est pas une garantie de contenu.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const BASE = join(ROOT, "base");

const slug = process.argv[2];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Marqueurs de page d'erreur servie en 200. À enrichir dès qu'un portail
// nouveau se révèle : c'est la table qui protège, pas la correction manuelle.
const MARQUEURS_ERREUR = [
  "pas de contenu disponible",
  "page introuvable",
  "cette page n'existe pas",
];

// Interstitiels anti-robot servis en 200. Sans cette table, un défi Cloudflare
// serait compté VIVANTE : le pire des faux négatifs, puisqu'il déclare vérifiée
// une source que personne n'a vue.
const MARQUEURS_DEFI = [
  "just a moment",
  "enable javascript and cookies to continue",
  "vérification que vous êtes bien un humain",
  // courdecassation.fr sert cette coquille de 255 octets pour TOUTE adresse,
  // y compris /decision/zzzz. Sans ce motif, un identifiant de décision
  // fabriqué est compté VIVANTE : le pire des faux négatifs, et le corpus en
  // cite deux qu'aucun automate ne peut départager (constat du 04/08/2026).
  "this website requires js enabled and cookies",
];

type Source = { fiches: string[]; url: string; grades: string[] };
const parUrl = new Map<string, Source>();

for (const nom of readdirSync(BASE).filter((f) => f.endsWith(".md")).sort()) {
  const texte = readFileSync(join(BASE, nom), "utf8");
  const fin = texte.indexOf("\n---", 3);
  const fm = fin === -1 ? texte : texte.slice(0, fin);
  if (slug && !new RegExp(`^domaines:.*\\b${slug}\\b`, "m").test(fm)) continue;
  const grade = fm.match(/^grade:\s*(\w)/m)?.[1] ?? "?";
  for (const m of fm.matchAll(/^\s*-\s*(https?:\/\/\S+)\s*$/gm)) {
    const url = m[1];
    const s = parUrl.get(url) ?? { fiches: [], url, grades: [] };
    s.fiches.push(nom);
    s.grades.push(grade);
    parUrl.set(url, s);
  }
}
const sources = [...parUrl.values()];

type Verdict =
  | "RACINE"
  | "PIEGE"
  | "MORTE"
  | "BLOQUEE"
  | "DEPLACEE"
  | "VIVANTE";
type Resultat = Source & { verdict: Verdict; detail: string };

const hote = (u: string) => {
  try {
    return new URL(u).host.replace(/^www\./, "");
  } catch {
    return "?";
  }
};

/**
 * Une source sans chemin ne désigne aucun document. Pas de requête : le défaut
 * est dans l'adresse, pas dans la réponse du serveur. Une chaîne de requête ou
 * un fragment suffit à désigner une page (`?docid=`, `#/fiche/…`), la racine
 * nue non.
 */
function sansChemin(u: string): boolean {
  try {
    const { pathname, search, hash } = new URL(u);
    return pathname.replace(/\/+$/, "") === "" && !search && !hash;
  } catch {
    return false;
  }
}

async function sonder(s: Source): Promise<Resultat> {
  if (sansChemin(s.url))
    return { ...s, verdict: "RACINE", detail: "page d'accueil, pas un document" };

  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), 20_000);
  try {
    const r = await fetch(s.url, {
      headers: { "User-Agent": UA, "Accept-Language": "fr-FR,fr;q=0.9" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    if (r.status === 403 || r.status === 429)
      return { ...s, verdict: "BLOQUEE", detail: `HTTP ${r.status}` };
    if (!r.ok) return { ...s, verdict: "MORTE", detail: `HTTP ${r.status}` };

    const corps = (await r.text()).slice(0, 200_000).toLowerCase();
    const defi = MARQUEURS_DEFI.find((m) => corps.includes(m));
    if (defi)
      return { ...s, verdict: "BLOQUEE", detail: `200 mais défi anti-robot` };
    const marqueur = MARQUEURS_ERREUR.find((m) => corps.includes(m));
    if (marqueur)
      return { ...s, verdict: "PIEGE", detail: `200 mais « ${marqueur} »` };

    if (hote(r.url) !== hote(s.url))
      return { ...s, verdict: "DEPLACEE", detail: `→ ${hote(r.url)}` };

    return { ...s, verdict: "VIVANTE", detail: `200 (${corps.length} car.)` };
  } catch (e) {
    const msg = e instanceof Error ? e.name : String(e);
    return { ...s, verdict: "MORTE", detail: `injoignable (${msg})` };
  } finally {
    clearTimeout(minuteur);
  }
}

// Concurrence bornée : on sonde des services publics, pas une cible de charge.
const PARALLELE = 6;
const resultats: Resultat[] = [];
for (let i = 0; i < sources.length; i += PARALLELE) {
  resultats.push(
    ...(await Promise.all(sources.slice(i, i + PARALLELE).map(sonder))),
  );
  process.stderr.write(
    `\r  sondé ${Math.min(i + PARALLELE, sources.length)}/${sources.length}`,
  );
}
process.stderr.write("\n\n");

const ordre: Verdict[] = [
  "RACINE",
  "PIEGE",
  "MORTE",
  "DEPLACEE",
  "BLOQUEE",
  "VIVANTE",
];
console.log(
  `${slug ? `Domaine ${slug}` : "Corpus entier"} : ${sources.length} sources distinctes sondées\n`,
);

for (const v of ordre) {
  const lot = resultats.filter((r) => r.verdict === v);
  console.log(`${v} : ${lot.length}`);
  if (v === "VIVANTE") continue;
  for (const r of lot) {
    const gradeMax = r.grades.sort()[0];
    const ou =
      r.fiches.length === 1
        ? r.fiches[0]
        : `${r.fiches[0]} (+${r.fiches.length - 1} autres)`;
    console.log(`  ${ou} [${gradeMax}]\n    ${r.url}\n    ${r.detail}`);
  }
  if (lot.length) console.log();
}

console.log(
  "\nBLOQUEE n'est pas MORTE : le serveur refuse l'automate, la page peut vivre.",
);
console.log(
  "PIEGE est le cas grave : l'URL a l'air valide et ne mène à rien.",
);
console.log(
  "RACINE aussi, et il est pire : la page vit, donc rien ne le signalait.",
);
