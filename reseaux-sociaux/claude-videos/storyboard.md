# Teaser « La première pièce » : storyboard figé

Concept B validé le 10/08/2026 : une promesse célèbre, son tampon, puis le
vertige du mur des 534. Ouverture glyphosate. Ce document est la référence
d'exécution de la composition Remotion (`teaser/`).

## Specs

- 1080 × 1350 (4:5, fil mobile X), 30 fps, 840 frames (28 s), H.264, muet (v1).
- Esthétique : DS institut, la même série visuelle que les cartes OG des
  briefs. Papier `#FAF8F5`, encre `#1C1A19`, marine `#122B78`, carmin
  `#8A1622`, gris chaud `#78716C`, filets `#D9D4CC`. Spectral (titres, prose)
  et Courier Prime (chiffres, dates, tampons, URL), chargées depuis les woff2
  du dépôt.
- Mouvements secs et documentaires : coupes, fondus courts, translations
  discrètes, tampons à impact. Zéro bounce, zéro particule, zéro photo,
  zéro image générée.
- Toute donnée affichée provient de `base/` via `public/cards.json`
  (régénéré par `scripts/build-cards.ts`) : les compteurs sont calculés,
  jamais écrits en dur.

## Conformité au brief éditorial (`../brief-editorial.md`)

- Énonciation : le dossier parle, jamais « je ».
- Capitales : réservées aux tampons (objets graphiques) et au verdict isolé
  « Synthèse d'ensemble : DÉFAVORABLE ».
- Vocabulaire de post : « fiches datées et sourcées », « jugements motivés »,
  « les objections sont sur la même page » (jamais le jargon interne
  « décharges »).
- Période : 2017-2026, jamais 2027.
- Aucun taux global de promesses tenues, aucune arithmétique de verdicts :
  « Treize domaines défavorables, deux mitigés » est un donné, cité tel quel.
- Zéro emoji dans la vidéo (les posts X en portent, eux).
- Verbatims : uniquement ceux de la fiche, l'aveu reste au style indirect.

## Les 7 beats

| # | Frames | Temps | Écran |
|---|---|---|---|
| 1 | 0-120 | 0-4 s | Papier nu. Une ligne se tape en Courier Prime, curseur bloc : « … au plus tard dans 3 ans ». Puis dessous, en petites capitales espacées : INTERDICTION DU GLYPHOSATE, et en gris : Engagement présidentiel · 27 novembre 2017. |
| 2 | 120-215 | 4-7,2 s | Coup de tampon carmin, incliné : ABANDONNÉE. Dessous : « un échec collectif », reconnu le 4 décembre 2020. En petit gris mono : compte rendu de l'Élysée · elysee.fr. |
| 3 | 215-330 | 7,2-11 s | La feuille recule et devient une carte de fiche. Huit cartes vedettes claquent en place autour, titres lisibles, tampons variés : TENUE (vert) visibles d'emblée, PARTIELLE (marine), ABANDONNÉE (carmin). |
| 4 | 330-480 | 11-16 s | Le dézoom s'emballe : mur complet des 534 cartes réelles. Par-dessus, compteurs Courier Prime marine, un battement chacun : 534 fiches datées et sourcées · 915 sources publiques · 15 domaines, 15 jugements motivés. Ligne de pied grise : 76,6 % de grade A : loi, justice, Cour des comptes. |
| 5 | 480-630 | 16-21 s | Le mur se fige en fond estompé. Trois lignes Spectral, une par battement : Chaque fiche est datée. / Chaque source est publique. / Les objections sont sur la même page. La troisième s'appuie (graisse, soulignement fin bleu). |
| 6 | 630-750 | 21-25 s | Papier. « Synthèse d'ensemble : » puis tampon carmin DÉFAVORABLE. Dessous, petit : Treize domaines défavorables, deux mitigés. |
| 7 | 750-840 | 25-28 s | Carton final : petites capitales 2017-2026 · DEUX QUINQUENNATS, puis Macronisme : le bilan en Spectral 600, filet, « Jugez sur pièces. » en italique, URL en mono : macronisme-le-bilan.netlify.app. Fondu final vers papier nu : boucle propre sur le beat 1. |

## Sources des verbatims (beats 1-2)

Fiche `base/2020-12-04-glyphosate-echec-reconnu.md`, grade A, statut
abandonnée, source elysee.fr :

- Engagement du 27/11/2017 : « dès que des alternatives auront été trouvées,
  et au plus tard dans 3 ans ». Le beat 1 en tape la fin, ellipse marquée.
- Aveu du 04/12/2020, au style indirect dans le compte rendu de l'Élysée :
  « un échec collectif ». La vidéo cite ces trois mots entre guillemets et
  attribue au compte rendu, jamais à une phrase prononcée reconstituée.

## Les 8 cartes vedettes du beat 3

Toutes réelles, équilibre volontaire des statuts (3 tenues, 2 partielles,
3 abandonnées) :

| Fiche | Tampon |
|---|---|
| 2021-06-03-abandon-retraite-par-points | ABANDONNÉE |
| 2022-10-28-promesse-16-canadair | ABANDONNÉE |
| 2019-08-29-abandon-proportionnelle-reduction-parlementaires | ABANDONNÉE |
| 2017-12-30-suppression-taxe-habitation | TENUE |
| 2022-08-16-aah-deconjugalisee | TENUE |
| 2018-07-13-defense-2-pourcent-pib | TENUE |
| 2023-04-14-retraite-64-ans-au-lieu-de-65 | PARTIELLE |
| 2023-07-19-enseignants-hausse-partielle | PARTIELLE |

Libellés à l'écran : le titre réel de la fiche, tronqué à la largeur de
carte ; jamais réécrit.

## Couleurs des tampons

- ABANDONNÉE : carmin `#8A1622` (le rouge verdict de la série OG).
- PARTIELLE : marine `#122B78`.
- TENUE : vert officiel du DS institut (validation et acquis, usage conforme).
- DÉFAVORABLE (beat 6) : carmin, corps plus grand, double filet.

## Ce que la v1 ne fait pas

- Pas de son (muet-natif ; frappes et coups de tampon possibles en v2).
- Pas de déclinaison carrée ni 16:9 (le moule les permet, hors périmètre v1).
- Pas de vidéos de domaine (la composition est paramétrable, chantier suivant).
