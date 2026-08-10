import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {MONO} from './tokens';

/**
 * Tampon administratif : capitales mono espacées, bordure nette, angles 0,
 * légère rotation. `from` déclenche le coup de tampon (échelle 1.9 -> 1,
 * sec) ; sans `from`, le tampon est déjà posé.
 */
export const Tampon: React.FC<{
  texte: string;
  couleur: string;
  taille: number;
  bordure: number;
  padding: string;
  rotation: number;
  from?: number;
  double?: boolean;
}> = ({texte, couleur, taille, bordure, padding, rotation, from, double}) => {
  const frame = useCurrentFrame();
  const anime = from !== undefined;
  const echelle = anime
    ? interpolate(frame, [from, from + 5], [1.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.in(Easing.cubic),
      })
    : 1;
  const opacite = anime
    ? interpolate(frame, [from, from + 3], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const interieur = (
    <div
      style={{
        border: `${bordure}px solid ${couleur}`,
        padding,
        color: couleur,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: taille,
        letterSpacing: '0.16em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {texte}
    </div>
  );

  return (
    <div
      style={{
        display: 'inline-block',
        rotate: `${rotation}deg`,
        scale: String(echelle),
        opacity: opacite,
      }}
    >
      {double ? (
        <div style={{border: `${bordure}px solid ${couleur}`, padding: bordure * 1.6}}>
          {interieur}
        </div>
      ) : (
        interieur
      )}
    </div>
  );
};
