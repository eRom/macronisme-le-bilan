import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {META} from '../data';
import {FILET, GRIS, MARINE, MONO, SERIF} from '../tokens';

const LIGNES = [
  {valeur: META.fiches, legende: 'fiches datées et sourcées', depuis: 8},
  {valeur: META.urls, legende: 'sources publiques', depuis: 34},
  {valeur: META.jugements, legende: 'jugements motivés', depuis: 60},
];

export const Compteurs: React.FC = () => {
  const frame = useCurrentFrame();
  const sortie = interpolate(frame, [132, 148], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{justifyContent: 'center', opacity: sortie}}>
      <div
        style={{
          background: 'rgba(250, 248, 245, 0.96)',
          borderTop: `1px solid ${FILET}`,
          borderBottom: `1px solid ${FILET}`,
          padding: '46px 110px 40px',
        }}
      >
        {LIGNES.map(({valeur, legende, depuis}) => {
          const entree = interpolate(frame, [depuis, depuis + 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const compte = Math.round(
            interpolate(frame, [depuis, depuis + 22], [0, valeur], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            }),
          );
          return (
            <div
              key={legende}
              style={{
                opacity: entree,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 78,
                  lineHeight: 1,
                  color: MARINE,
                  letterSpacing: '0.04em',
                  width: 250,
                  textAlign: 'right',
                }}
              >
                {compte}
              </div>
              <div
                style={{
                  marginLeft: 38,
                  fontFamily: SERIF,
                  fontSize: 33,
                  color: GRIS,
                }}
              >
                {legende}
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 34,
            paddingTop: 24,
            borderTop: `1px solid ${FILET}`,
            fontFamily: MONO,
            fontSize: 26,
            color: GRIS,
            opacity: interpolate(frame, [88, 100], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {META.partGradeA} % de grade A (loi, justice, Cour des comptes)
        </div>
      </div>
    </AbsoluteFill>
  );
};
