import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  CARTE_H,
  CARTE_W,
  COLS,
  FOCUS_FIN,
  FOCUS_GLYPHO,
  INDEX_GLYPHO,
  MUR,
  position,
  type Carte,
} from '../data';
import {Tampon} from '../Tampon';
import {
  CARTE as CARTE_FOND,
  CARMIN,
  COULEUR_STATUT,
  ENCRE,
  FILET,
  GRIS,
  LIBELLE_STATUT,
  MARINE,
  MONO,
  SERIF,
} from '../tokens';

/** Bornes de la caméra : plein cadre sur la fiche, puis mur entier. */
const ZOOM_DEBUT = 215;
const ZOOM_FIN = 460;
const ECHELLE_PROCHE = 8.4;
const ECHELLE_LOIN = 0.36;

const EASING_ZOOM = Easing.bezier(0.72, 0, 0.24, 1);

/** Ligne 1 et 2 de la citation tapée à la machine (fiche glyphosate). */
const CITATION_L1 = '… au plus tard';
const CITATION_L2 = 'dans 3 ans';
const CHARS_TOTAL = CITATION_L1.length + CITATION_L2.length;
const FRAPPE_DEBUT = 16;
const FRAPPE_CADENCE = 2.4;

const chevRing = (index: number) => {
  const dc = Math.abs((index % COLS) - (INDEX_GLYPHO % COLS));
  const dr = Math.abs(Math.floor(index / COLS) - Math.floor(INDEX_GLYPHO / COLS));
  return Math.max(dc, dr);
};

const FicheGlyphosate: React.FC = () => {
  const frame = useCurrentFrame();
  const tapes = Math.min(
    CHARS_TOTAL,
    Math.max(0, Math.floor((frame - FRAPPE_DEBUT) / FRAPPE_CADENCE)),
  );
  const l1 = CITATION_L1.slice(0, Math.min(tapes, CITATION_L1.length));
  const l2 = CITATION_L2.slice(0, Math.max(0, tapes - CITATION_L1.length));
  const curseurVisible = frame < 130 && frame % 16 < 9;
  const curseurSurL2 = tapes >= CITATION_L1.length;

  const apparait = (depuis: number, duree = 10) =>
    interpolate(frame, [depuis, depuis + duree], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const curseur = (
    <span
      style={{
        display: 'inline-block',
        width: 4.6,
        height: 8.2,
        background: ENCRE,
        opacity: curseurVisible ? 1 : 0,
        verticalAlign: 'baseline',
        marginLeft: 0.8,
      }}
    />
  );

  return (
    <div style={{position: 'absolute', inset: 0, padding: '11px 9px'}}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 3.4,
          letterSpacing: '0.08em',
          color: GRIS,
          opacity: apparait(4),
          borderBottom: `0.4px solid ${FILET}`,
          paddingBottom: 2.4,
        }}
      >
        FICHE · PROMESSE · GRADE A
      </div>

      <div
        style={{
          marginTop: 10,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 8.5,
          lineHeight: 1.3,
          color: ENCRE,
          minHeight: 23,
        }}
      >
        <div>
          {l1}
          {!curseurSurL2 && curseur}
        </div>
        <div>
          {l2}
          {curseurSurL2 && curseur}
        </div>
      </div>

      <div
        style={{
          marginTop: 7,
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 5,
          letterSpacing: '0.12em',
          color: ENCRE,
          opacity: apparait(84),
          translate: `0 ${interpolate(frame, [84, 94], [2, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
          })}px`,
        }}
      >
        INTERDICTION DU GLYPHOSATE
      </div>
      <div
        style={{
          marginTop: 2,
          fontFamily: SERIF,
          fontSize: 4.4,
          color: GRIS,
          opacity: apparait(92),
        }}
      >
        Engagement présidentiel · 27 novembre 2017
      </div>

      <div style={{marginTop: 9, marginLeft: 6}}>
        <Tampon
          texte="ABANDONNÉE"
          couleur={CARMIN}
          taille={6.5}
          bordure={0.7}
          padding="2.2px 4.5px"
          rotation={-7}
          from={125}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 4.4,
          lineHeight: 1.4,
          color: ENCRE,
          opacity: apparait(150),
        }}
      >
        « un échec collectif », reconnu
        <br />
        le 4 décembre 2020.
      </div>
      <div
        style={{
          marginTop: 3,
          fontFamily: MONO,
          fontSize: 3.6,
          color: GRIS,
          opacity: apparait(162),
        }}
      >
        compte rendu de l’Élysée · elysee.fr
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 9,
          right: 9,
          borderTop: `0.4px solid ${FILET}`,
          paddingTop: 2.6,
          fontFamily: MONO,
          fontSize: 3.4,
          color: GRIS,
          opacity: apparait(8),
        }}
      >
        promesses · ecologie-energie
      </div>
    </div>
  );
};

const CarteMur: React.FC<{carte: Carte}> = ({carte}) => {
  return (
    <div style={{position: 'absolute', inset: 0, padding: '6px 7px'}}>
      <div style={{fontFamily: MONO, fontSize: 4.2, color: GRIS}}>{carte.date}</div>
      <div
        style={{
          marginTop: 3.5,
          fontFamily: SERIF,
          fontWeight: 500,
          fontSize: 7,
          lineHeight: 1.32,
          color: ENCRE,
          display: '-webkit-box',
          WebkitLineClamp: 7,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {carte.titre}
      </div>
      {carte.statut && LIBELLE_STATUT[carte.statut] ? (
        <div style={{position: 'absolute', bottom: 26, left: 10}}>
          <Tampon
            texte={LIBELLE_STATUT[carte.statut]}
            couleur={COULEUR_STATUT[carte.statut]}
            taille={5}
            bordure={0.5}
            padding="1.6px 3px"
            rotation={-6}
          />
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          bottom: 6,
          left: 7,
          fontFamily: MONO,
          fontSize: 4,
          color: GRIS,
        }}
      >
        {carte.type} · {carte.grade}
      </div>
    </div>
  );
};

export const WallScene: React.FC = () => {
  const frame = useCurrentFrame();

  const echelle = Math.exp(
    interpolate(
      frame,
      [ZOOM_DEBUT, ZOOM_FIN],
      [Math.log(ECHELLE_PROCHE), Math.log(ECHELLE_LOIN)],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASING_ZOOM},
    ),
  );
  const focusX = interpolate(frame, [ZOOM_DEBUT, ZOOM_FIN], [FOCUS_GLYPHO.x, FOCUS_FIN.x], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASING_ZOOM,
  });
  const focusY = interpolate(frame, [ZOOM_DEBUT, ZOOM_FIN], [FOCUS_GLYPHO.y, FOCUS_FIN.y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASING_ZOOM,
  });
  const tx = 540 - focusX * echelle;
  const ty = 675 - focusY * echelle;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          transformOrigin: '0 0',
          translate: `${tx}px ${ty}px`,
          scale: String(echelle),
        }}
      >
        {MUR.map((carte, i) => {
          const {x, y} = position(i);
          const ecranX = tx + x * echelle;
          const ecranY = ty + y * echelle;
          if (
            ecranX + CARTE_W * echelle < -80 ||
            ecranX > 1160 ||
            ecranY + CARTE_H * echelle < -80 ||
            ecranY > 1430
          ) {
            return null;
          }
          const estGlypho = i === INDEX_GLYPHO;
          const anneau = chevRing(i);
          const revelation = estGlypho
            ? 1
            : interpolate(
                frame,
                [ZOOM_DEBUT + Math.min((anneau - 1) * 7, 42), ZOOM_DEBUT + Math.min((anneau - 1) * 7, 42) + 10],
                [0, 1],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
              );
          return (
            <div
              key={carte.slug}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: CARTE_W,
                height: CARTE_H,
                background: CARTE_FOND,
                border: `0.5px solid ${FILET}`,
                opacity: revelation,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: estGlypho ? 1.8 : 1.2,
                  background: MARINE,
                }}
              />
              {estGlypho ? <FicheGlyphosate /> : <CarteMur carte={carte} />}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
