import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ENCRE, MARINE, PAPIER, SERIF} from '../tokens';

const LIGNES: Array<{texte: string; depuis: number; forte?: boolean}> = [
  {texte: 'Chaque fiche est datée.', depuis: 14},
  {texte: 'Chaque source est publique.', depuis: 54},
  {texte: 'Les objections sont sur la même page.', depuis: 94, forte: true},
];

export const Methode: React.FC = () => {
  const frame = useCurrentFrame();
  const voile = interpolate(frame, [0, 18], [0, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: PAPIER, opacity: voile}} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 470}}>
        {LIGNES.map(({texte, depuis, forte}) => {
          const opacite = interpolate(frame, [depuis, depuis + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const montee = interpolate(frame, [depuis, depuis + 12], [10, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
          });
          return (
            <div
              key={texte}
              style={{
                marginBottom: 44,
                opacity: opacite,
                translate: `0 ${montee}px`,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontWeight: forte ? 600 : 500,
                  fontSize: 58,
                  lineHeight: 1.5,
                  color: ENCRE,
                  ...(forte
                    ? {
                        textDecorationLine: 'underline',
                        textDecorationColor: MARINE,
                        textDecorationThickness: 3,
                        textUnderlineOffset: 14,
                      }
                    : null),
                }}
              >
                {texte}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
