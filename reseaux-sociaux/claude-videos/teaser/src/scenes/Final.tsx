import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ENCRE, FILET, GRIS, MARINE, MONO, PAPIER, SERIF} from '../tokens';

export const Final: React.FC = () => {
  const frame = useCurrentFrame();
  const apparait = (depuis: number, duree = 12) =>
    interpolate(frame, [depuis, depuis + duree], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const filet = interpolate(frame, [16, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // Fondu final vers le papier nu : la boucle se referme sur le beat 1.
  const sortie = interpolate(frame, [68, 88], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: PAPIER}}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 420, opacity: sortie}}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 27,
            letterSpacing: '0.2em',
            color: GRIS,
            opacity: apparait(0),
          }}
        >
          2017-2026 · DEUX QUINQUENNATS
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: SERIF,
            fontWeight: 600,
            fontSize: 106,
            lineHeight: 1.12,
            color: ENCRE,
            opacity: apparait(6),
          }}
        >
          Macronisme&nbsp;:
          <br />
          le bilan
        </div>
        <div
          style={{
            marginTop: 42,
            height: 1,
            background: FILET,
            scale: `${filet} 1`,
            transformOrigin: '0 50%',
          }}
        />
        <div
          style={{
            marginTop: 40,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 46,
            color: ENCRE,
            opacity: apparait(22),
          }}
        >
          Jugez sur pièces.
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 40,
            color: MARINE,
            opacity: apparait(30),
          }}
        >
          macronisme-le-bilan.netlify.app
        </div>
      </div>
    </AbsoluteFill>
  );
};
