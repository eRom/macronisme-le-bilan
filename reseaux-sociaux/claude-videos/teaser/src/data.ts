import cardsJson from './data/cards.json';
import metaJson from './data/meta.json';

export type Carte = {
  slug: string;
  titre: string;
  date: string;
  type: string;
  grade: string;
  statut: string | null;
};

export const META = metaJson as {
  fiches: number;
  urls: number;
  jugements: number;
  partGradeA: string;
};

/** Géométrie du mur, en espace mur (px). */
export const COLS = 23;
export const CARTE_W = 120;
export const CARTE_H = 160;
export const ECART = 12;
export const PAS_X = CARTE_W + ECART;
export const PAS_Y = CARTE_H + ECART;

export const SLUG_GLYPHOSATE = '2020-12-04-glyphosate-echec-reconnu';

/** Les 8 vedettes du beat 3, placées en couronne autour du glyphosate. */
const VEDETTES = [
  '2021-06-03-abandon-retraite-par-points',
  '2022-10-28-promesse-16-canadair',
  '2019-08-29-abandon-proportionnelle-reduction-parlementaires',
  '2017-12-30-suppression-taxe-habitation',
  '2022-08-16-aah-deconjugalisee',
  '2018-07-13-defense-2-pourcent-pib',
  '2023-04-14-retraite-64-ans-au-lieu-de-65',
  '2023-07-19-enseignants-hausse-partielle',
];

function construireMur(): {mur: Carte[]; indexGlypho: number} {
  const mur = [...(cardsJson as Carte[])];
  const indexGlypho = mur.findIndex((c) => c.slug === SLUG_GLYPHOSATE);
  if (indexGlypho < 0) {
    throw new Error('Fiche glyphosate introuvable dans cards.json');
  }
  // Couronne : les 8 cellules voisines dans une grille de 23 colonnes.
  const couronne = [
    indexGlypho - COLS - 1, indexGlypho - COLS, indexGlypho - COLS + 1,
    indexGlypho - 1, indexGlypho + 1,
    indexGlypho + COLS - 1, indexGlypho + COLS, indexGlypho + COLS + 1,
  ];
  VEDETTES.forEach((slug, i) => {
    const de = mur.findIndex((c) => c.slug === slug);
    const vers = couronne[i];
    if (de < 0) {
      throw new Error(`Vedette introuvable : ${slug}`);
    }
    [mur[de], mur[vers]] = [mur[vers], mur[de]];
  });
  return {mur, indexGlypho};
}

export const {mur: MUR, indexGlypho: INDEX_GLYPHO} = construireMur();

export const position = (index: number) => ({
  x: (index % COLS) * PAS_X,
  y: Math.floor(index / COLS) * PAS_Y,
});

export const MUR_W = COLS * PAS_X - ECART;
export const MUR_H = Math.ceil(MUR.length / COLS) * PAS_Y - ECART;

const centreGlypho = position(INDEX_GLYPHO);
/** Centre de la fiche glyphosate, espace mur. */
export const FOCUS_GLYPHO = {
  x: centreGlypho.x + CARTE_W / 2,
  y: centreGlypho.y + CARTE_H / 2,
};
/**
 * Cadrage final du dézoom : centré sur les 23 rangées pleines, si bien que
 * la 24e rangée, partielle (534 = 23 × 23 + 5), sort du cadre au lieu d'y
 * laisser un trou.
 */
export const FOCUS_FIN = {x: MUR_W / 2, y: (23 * PAS_Y - ECART) / 2};
