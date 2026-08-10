/**
 * Tokens du DS institut, valeurs de la série OG des briefs
 * (atlas/briefs/securite-civile/brief.json, og_prompt) + vert officiel du
 * repo erom-design-system-institutionnel (tokens.css).
 */
export const PAPIER = '#FAF8F5';
export const CARTE = '#FFFDFB';
export const ENCRE = '#1C1A19';
export const GRIS = '#78716C';
export const FILET = '#D9D4CC';
export const MARINE = '#122B78';
export const CARMIN = '#8A1622';
export const VERT = '#1E6E45';

export const SERIF = 'Spectral, Georgia, serif';
export const MONO = '"Courier Prime", "Courier New", monospace';

export const LARGEUR = 1080;
export const HAUTEUR = 1350;
export const FPS = 30;
export const DUREE = 840;

/** Couleur de tampon par statut de promesse. */
export const COULEUR_STATUT: Record<string, string> = {
  abandonnee: CARMIN,
  partielle: MARINE,
  tenue: VERT,
};

export const LIBELLE_STATUT: Record<string, string> = {
  abandonnee: 'ABANDONNÉE',
  partielle: 'PARTIELLE',
  tenue: 'TENUE',
};
