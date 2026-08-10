import './fonts';
import {Composition} from 'remotion';
import {Teaser} from './Teaser';
import {DUREE, FPS, HAUTEUR, LARGEUR} from './tokens';

export const RemotionRoot = () => {
  return (
    <Composition
      id="Teaser"
      component={Teaser}
      width={LARGEUR}
      height={HAUTEUR}
      fps={FPS}
      durationInFrames={DUREE}
    />
  );
};
