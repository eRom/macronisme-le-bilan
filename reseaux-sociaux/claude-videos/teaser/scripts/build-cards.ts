/**
 * Extrait les frontmatters de base/*.md vers src/data/cards.json.
 * Contrôle d'intégrité : le compte de fiches et d'URL distinctes doit
 * correspondre aux compteurs publics du dépôt (534 / 915). Un écart signifie
 * que ce parseur est faux, pas le corpus.
 */
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const BASE = join(ici, '../../../../base');
const SORTIE = join(ici, '../src/data/cards.json');

const ATTENDU_FICHES = 534;
const ATTENDU_URLS = 915;

type Carte = {
  slug: string;
  titre: string;
  date: string;
  type: string;
  grade: string;
  statut: string | null;
};

const fichiers = readdirSync(BASE).filter((f) => f.endsWith('.md')).sort();
const cartes: Carte[] = [];
const urls = new Set<string>();

for (const f of fichiers) {
  const texte = readFileSync(join(BASE, f), 'utf8');
  const m = texte.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    throw new Error(`Frontmatter introuvable : ${f}`);
  }
  const fm = m[1];
  const champ = (nom: string): string | null => {
    const r = fm.match(new RegExp(`^${nom}:\\s*(.+)$`, 'm'));
    return r ? r[1].trim() : null;
  };
  const titre = champ('titre');
  const date = champ('date');
  const type = champ('type');
  const grade = champ('grade');
  if (!titre || !date || !type || !grade) {
    throw new Error(`Champ manquant dans ${f}`);
  }
  for (const u of fm.matchAll(/^\s*-\s+(https?:\/\/\S+)\s*$/gm)) {
    urls.add(u[1]);
  }
  cartes.push({
    slug: f.replace(/\.md$/, ''),
    titre,
    date,
    type,
    grade,
    statut: champ('statut'),
  });
}

cartes.sort((a, b) => a.date.localeCompare(b.date));

if (cartes.length !== ATTENDU_FICHES) {
  throw new Error(`${cartes.length} fiches parsées, ${ATTENDU_FICHES} attendues`);
}
if (urls.size !== ATTENDU_URLS) {
  throw new Error(`${urls.size} URL distinctes, ${ATTENDU_URLS} attendues`);
}

const gradeA = cartes.filter((c) => c.grade === 'A').length;
const partA = ((gradeA / cartes.length) * 100).toFixed(1).replace('.', ',');
if (partA !== '76,6') {
  throw new Error(`Part de grade A calculée ${partA} %, 76,6 % attendus (METHODE.md)`);
}

const JUGEMENT = join(ici, '../../../../jugement');
const jugements = readdirSync(JUGEMENT).filter(
  (f) => f.endsWith('.md') && f !== 'synthese.md',
).length;
if (jugements !== 15) {
  throw new Error(`${jugements} pièces de jugement, 15 attendues`);
}

writeFileSync(SORTIE, JSON.stringify(cartes));
writeFileSync(
  join(ici, '../src/data/meta.json'),
  JSON.stringify({
    fiches: cartes.length,
    urls: urls.size,
    jugements,
    partGradeA: partA,
  }),
);
console.log(
  `OK : ${cartes.length} fiches, ${urls.size} URL distinctes, ${partA} % de grade A, ${jugements} jugements -> src/data/`,
);
