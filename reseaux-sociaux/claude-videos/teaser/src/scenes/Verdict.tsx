import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Tampon} from '../Tampon';
import {CARMIN, ENCRE, PAPIER, SERIF} from '../tokens';

export const Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const fond = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titre = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const monteeTitre = interpolate(frame, [6, 18], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const sousLigne = interpolate(frame, [66, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: PAPIER, opacity: fond}}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 470}}>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: 62,
            color: ENCRE,
            opacity: titre,
            translate: `0 ${monteeTitre}px`,
          }}
        >
          Synthèse d’ensemble&nbsp;:
        </div>
        <div style={{marginTop: 56, marginLeft: 8}}>
          <Tampon
            texte="DÉFAVORABLE"
            couleur={CARMIN}
            taille={76}
            bordure={4}
            padding="30px 46px"
            rotation={-4}
            from={26}
            double
          />
        </div>
        <div
          style={{
            marginTop: 64,
            fontFamily: SERIF,
            fontSize: 36,
            color: ENCRE,
            opacity: sousLigne,
          }}
        >
          Treize domaines défavorables, deux mitigés.
        </div>
      </div>
    </AbsoluteFill>
  );
};
