import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// loadFont retarde le rendu jusqu'au chargement (delayRender interne) :
// pas d'await top-level, la cible de bundle ne le permet pas.
void Promise.all([
  loadFont({family: 'Spectral', url: staticFile('fonts/spectral-v15-latin-regular.woff2'), weight: '400'}),
  loadFont({family: 'Spectral', url: staticFile('fonts/spectral-v15-latin-italic.woff2'), weight: '400', style: 'italic'}),
  loadFont({family: 'Spectral', url: staticFile('fonts/spectral-v15-latin-500.woff2'), weight: '500'}),
  loadFont({family: 'Spectral', url: staticFile('fonts/spectral-v15-latin-500italic.woff2'), weight: '500', style: 'italic'}),
  loadFont({family: 'Spectral', url: staticFile('fonts/spectral-v15-latin-600.woff2'), weight: '600'}),
  loadFont({family: 'Courier Prime', url: staticFile('fonts/courier-prime-v11-latin-regular.woff2'), weight: '400'}),
  loadFont({family: 'Courier Prime', url: staticFile('fonts/courier-prime-v11-latin-700.woff2'), weight: '700'}),
]);
