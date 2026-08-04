# Atlas : le site du dossier

Mini-site statique qui présente le bilan des deux quinquennats d'Emmanuel
Macron, arrêté au 30/07/2026. Généré depuis `../base/` et `../jugement/`, en
**lecture seule stricte** : le pipeline n'écrit jamais dans le corpus, et ne
lit jamais `../atelier/`.

En ligne : https://macronisme-le-bilan.netlify.app

## Construire

```bash
bun install                                                       # une fois
bun run build.ts                                                  # données -> dist/data.js
bun build ./src/app.ts --outdir ./dist --minify --target browser  # front -> dist/app.js
open dist/index.html                                              # file:// suffit
```

Les deux étapes sont distinctes : une modification dans `src/` n'atteint le
rendu que si la seconde ligne est rejouée. Oubli classique.

`build-report.md` doit dire **534/534** et « Verdict du build : OK ». Tout lien
cassé ou champ manquant y est listé, et le build sort en erreur (exit 1) sur
les erreurs bloquantes.

Attention à ce que « OK » ne couvre pas : les wikilinks morts sont listés sans
faire échouer le build. Après tout renommage de fiche, lire la section
« Wikilinks morts » — le vert ne la voit pas. En revanche la table des quinze
verdicts de la synthèse est bloquante depuis le 04/08/2026, `date_verdict`
comprise, et les compteurs publics le sont depuis le même jour.

## Les compteurs publics

`REGLES_COMPTEURS`, dans `build.ts`, confronte au corpus chaque chiffre que
`README.md`, `METHODE.md` et `src/index.html` annoncent sur lui : total de
fiches, URL distinctes, effectif et part de chaque grade, fiches par domaine,
occurrences par source. Un écart est bloquant et nomme le document, le chiffre
écrit et le chiffre réel.

Deux réflexes, dans cet ordre. **Un compteur que le code peut calculer ne
s'écrit pas en dur** : les trois compteurs affichés par le front (chronologie,
recherche) lisent `A.fiches` et ne peuvent plus retarder. **Sinon, ajouter une
règle plutôt que corriger le chiffre** : une correction manuelle ne protège que
du décalage d'aujourd'hui. Restent nécessairement en dur les deux `meta` de
`index.html`, que le build ne réécrit pas, et les chiffres rédigés en toutes
lettres dans les documents.

## Structure

- **`build.ts`** : pipeline complet. Parseur de frontmatter tolérant,
  normalisation des gouvernements et ministres, extraction des rôles
  (charges / décharges / écartés / fils), calcul des backlinks, layout
  ForceAtlas2 pré-calculé, copie des assets.
- **`src/`** : front TypeScript vanilla, sans framework, dark only. Neuf vues :
  synthèse (accueil), domaines, parcours, graphe, chronologie, acteurs, fiche,
  recherche, méthode.
- **`dist/`** : intégralement généré, autonome, zéro réseau et zéro CDN.
  Régénérable à tout moment, donc jamais commité.

## L'audit de publiabilité

`build.ts` porte lui-même la garantie que rien d'interne ne fuit dans le rendu.
Deux tables, en fin de fichier :

- **`REFORMULATIONS`** réécrit au rendu les renvois internes que le corpus
  contient légitimement (renvois à des fichiers de travail, noms d'outillage).
- **`INTERDITS`** scanne le `data.js` final contre des motifs proscrits
  (chemins locaux, arborescence de travail, renvois aux fichiers non publiés).
  Toute survivance est bloquante et listée dans le rapport.

**Ajouter un motif à `INTERDITS` plutôt que de corriger à la main.** Le corpus
source n'est jamais modifié pour des raisons de publication : le nettoyage vit
au rendu. C'est ce qui permet de garder les fiches dans leur forme de travail
tout en publiant sans risque.

## Polices

Le build embarque JetBrains Mono dans `dist/fonts/` s'il la trouve dans
`$HOME/Library/Fonts` (chemin macOS). Sinon il retombe silencieusement sur les
polices système et le rapport l'indique (« Fonts embarquées : aucune »). Le
site reste parfaitement lisible dans ce cas ; seule la typographie monospace
change. Pour l'embarquer sur une autre plateforme, adapter `FONTS_SYS` dans
`build.ts`.

## Déployer

`dist/` est un site statique autonome : n'importe quel hébergeur statique
convient. L'instance publique tourne sur Netlify, poussée par CLI depuis le
seul `dist/`, jamais depuis le dépôt.

```bash
netlify deploy --prod --dir=dist
```

Cette commande suppose un site Netlify déjà lié (`.netlify/state.json`, non
versionné). Un repreneur utilisera son propre hébergeur.

Avant toute mise en ligne : `build-report.md` doit dire 534/534 et « Verdict du
build : OK ». L'audit de publiabilité étant tenu par le build, un rapport vert
vaut feu vert.
