import {Audio} from '@remotion/media';
import {Sequence, interpolate, staticFile} from 'remotion';

/**
 * Bande-son v2, registre documentaire : souffle de salle d'archives en lit
 * continu, frappes de machine sous la citation, un coup de tampon par
 * verdict, un souffle de papier au départ du dézoom. Aucune musique.
 * SFX générés le 10/08/2026 (ElevenLabs sound-generation), public/sfx/.
 */
export const BandeSon: React.FC = () => {
  return (
    <>
      <Audio
        src={staticFile('sfx/room.mp3')}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) =>
          interpolate(f, [0, 15, 810, 838], [0, 0.6, 0.6, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />
      {/* Frappe de la citation (la frappe visuelle court de 16 à 78). */}
      <Sequence from={14}>
        <Audio
          src={staticFile('sfx/typing.mp3')}
          volume={(f) =>
            interpolate(f, [0, 6, 58, 72], [0, 0.7, 0.7, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      </Sequence>
      {/* Tampon ABANDONNÉE (coup visuel à la frame 125). */}
      <Sequence from={123}>
        <Audio src={staticFile('sfx/stamp.mp3')} volume={0.85} />
      </Sequence>
      {/* Départ du dézoom vers le mur. */}
      <Sequence from={214}>
        <Audio src={staticFile('sfx/whoosh.mp3')} volume={0.55} />
      </Sequence>
      {/* Tampon DÉFAVORABLE (Verdict démarre à 630, coup à +26), plus grave. */}
      <Sequence from={654}>
        <Audio src={staticFile('sfx/stamp.mp3')} volume={1} toneFrequency={0.85} />
      </Sequence>
    </>
  );
};
