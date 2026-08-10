import {AbsoluteFill, Sequence} from 'remotion';
import {BandeSon} from './BandeSon';
import {Compteurs} from './scenes/Compteurs';
import {Final} from './scenes/Final';
import {Methode} from './scenes/Methode';
import {Verdict} from './scenes/Verdict';
import {WallScene} from './scenes/WallScene';
import {PAPIER} from './tokens';

/**
 * « La première pièce » : 840 frames à 30 fps.
 *   0-215   la fiche glyphosate (frappe, tampon, aveu)
 * 215-460   dézoom continu vers le mur des 534
 * 330-480   compteurs par-dessus le mur
 * 480-630   les trois lignes de méthode sur voile papier
 * 630-750   synthèse d'ensemble : DÉFAVORABLE
 * 750-840   carton final, fondu vers papier nu (boucle)
 */
export const Teaser: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: PAPIER}}>
      <Sequence from={0} durationInFrames={630} name="Mur">
        <WallScene />
      </Sequence>
      <Sequence from={330} durationInFrames={150} name="Compteurs">
        <Compteurs />
      </Sequence>
      <Sequence from={480} durationInFrames={150} name="Méthode">
        <Methode />
      </Sequence>
      <Sequence from={630} durationInFrames={120} name="Verdict">
        <Verdict />
      </Sequence>
      <Sequence from={750} durationInFrames={90} name="Final">
        <Final />
      </Sequence>
      <BandeSon />
    </AbsoluteFill>
  );
};
