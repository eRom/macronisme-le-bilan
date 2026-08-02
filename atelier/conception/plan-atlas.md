# Plan de l'Atlas : la conception du site

> **Archive de conception.** Ce document fusionne les trois pièces qui ont
> produit le site, dans leur ordre d'apparition : le brief initial, le plan
> d'exécution proposé par Kimi le 01/08/2026, et les amendements apportés par
> Fable le même jour après contre-expertise du corpus.
>
> Il est daté. Les chiffres et décisions qu'il contient sont ceux du moment de
> l'étude, pas ceux du site tel qu'il tourne : la section 6 récapitule les
> écarts. Rien n'a été réécrit après coup pour donner raison au plan.

## 1. Le point de départ

Le brief initial, tel qu'il a été posé à l'agent chargé de l'étude.

> Tu es dans un dossier qui comprend le bilan d'Emmanuel Macron de 2017 à 2026,
> issu d'une multitude de recherches approfondies menées avec des agents.
>
> **Règle absolue : ne jamais modifier, supprimer, ni committer les fichiers.**
>
> | Dossier | Rôle |
> |---|---|
> | `methodes/` | les méthodes et plans de création |
> | `base/` | les fiches individuelles (frontmatter + markdown) |
> | `research/` | les recherches par domaine |
> | `jugement/` | les jugements par domaine |
>
> **Objectif** : chercher un moyen de rendre ce paquet brut de quatre dossiers
> plus lisible, relationnel et exploitable. Carte blanche sur le type de
> représentation. Proposer une sélection de trois représentations, à valider
> avant d'aller plus loin.

Trois représentations ont été proposées : un **Atlas** relationnel, une **frise
chronologique**, un **tableau de bord**. L'Atlas a été retenu. La frise a
finalement été intégrée comme vue (amendement 2), et le tableau de bord écarté.

## 2. Le gisement (vérifié le 01/08/2026)

| Ressource | Volume mesuré | Exploitation |
|---|---|---|
| Fiches `base/` | 531 fichiers, ~800 Ko, ~1,5 Ko/fiche | Nœuds et pages |
| Liens fiche vers fiche | 720 arêtes, 0 cassé, 70 % des fiches connectées | Le graphe principal |
| Liens jugement vers fiche | 1135 occurrences contextualisées | Rôles des fiches dans la démonstration |
| Fils transverses | 2 sections (à charge / à décharge), 81 liens ordonnés | Les parcours narratifs |
| Verdicts | 15 domaines (13 défavorables, 2 mitigés) + verdict d'ensemble | Couleur et entrée |
| Acteurs | ~160 ministres, 9 gouvernements | Filtres et facettes |
| Types | 260 mesures, 193 affaires, 48 promesses, 30 déclarations | Facettes |
| Grades | 76 % A, 22 % B, 3 % C, 0 D | Facettes et hiérarchie visuelle |

**La valeur unique de l'Atlas** : le croisement fiches × rôles dans les
jugements. Ouvrir une fiche et voir « charge n°1 du fil transverse 1 de la
synthèse, pièce du jugement institutions, du jugement retraites-social ».
Aucun outil standard ne le fait, il faut le construire.

Défauts du corpus identifiés, à traiter au build :

- **232 fiches (44 %) ont un `titre:` YAML-invalide** (deux-points non quoté).
  Impose un parseur tolérant ligne à ligne, jamais une lib YAML naïve.
- **Champ `gouvernement` non normalisé** : 100 valeurs brutes (transitions,
  annotations) à mapper vers 9 valeurs canoniques, le reste en « indéterminé ».
- **Ministres** : 160 noms distincts une fois le portefeuille retiré.
- **Les 1135 liens des jugements n'ont jamais été audités**, contrairement aux
  720 de la base. Le build doit les vérifier et lister tout lien cassé.

## 3. L'architecture

Single-page app statique, routing par hash, **toutes les données embarquées
dans un `data.js` généré** (pas de `fetch()` JSON, bloqué en `file://`). Zéro
serveur, zéro réseau, zéro CDN. À l'époque de l'étude, le site devait rester
strictement local : la contrainte était donc structurelle, le site ne pouvant
physiquement rien envoyer nulle part.

- **Graphe** : sigma.js v3 (WebGL, 531 nœuds est trivial) avec **layout
  ForceAtlas2 pré-calculé au build** (graphology côté bun). Pas de simulation
  live : positions figées, rendu instantané, et surtout carte **stable entre
  les sessions**, ce qui autorise la mémorisation spatiale.
- **Recherche** : FlexSearch, index pré-construit au build et embarqué.
- **Front** : TypeScript vanilla bundlé par `bun build`, un seul `app.js`. Pas
  de React ni de framework, ~700 lignes suffisent.
- **UI** : design system eRom (dark-first, OKLCH, bordures plutôt qu'ombres,
  Inter + JetBrains Mono embarquées localement si récupérables, fallback
  système sinon).

### Le pipeline de données, cœur du projet

Script `build.ts` (bun), lecture seule sur `base/` et `jugement/`, régénération
complète à chaque run :

1. **Parseur frontmatter tolérant**, ligne à ligne.
2. **Normalisation** : gouvernements (mapping regex), ministres (retrait du
   portefeuille), slugs de domaines.
3. **Extraction des rôles** : parsing des sections « Les charges qui tiennent »,
   « Les décharges qui tiennent », « Ce qui est écarté » des 15 jugements, et
   des fils de `synthese.md`. Produit pour chaque fiche la liste de ses rôles
   numérotés avec le titre de la charge ou du fil.
4. **Calculs** : backlinks, layout ForceAtlas2, index FlexSearch, conversion
   markdown vers HTML.
5. **Rapport de build impitoyable** : 531/531 fiches parsées exigées, tout lien
   `[[...]]` vers un slug inexistant listé, base et jugements compris.

## 4. Les vues

Le plan initial en prévoyait cinq, la home étant le graphe. Les amendements de
la section 5 ont déplacé la home et ajouté deux vues.

1. **`#/graphe`** : la carte. Nœuds colorés par domaine (15 teintes OKLCH
   distinctes), taille par degré de connexion, labels progressifs au zoom.
   Filtres combinables (domaines, type, grade, gouvernement, plage de dates),
   panneau latéral fiche au clic.
2. **`#/fiche/<slug>`** : métadonnées structurées, corps, sources cliquables,
   backlinks, **rôles dans les jugements**, ego-graphe local.
3. **`#/domaines`** : grille des 15 domaines avec badge verdict ; chaque
   domaine ouvre le jugement complet rendu en HTML, avec ses fiches triables.
4. **`#/parcours`** : les fils transverses de la synthèse comme récits
   navigables. Texte du fil en fil d'Ariane, fiches maillons enchaînées,
   précédent/suivant.
5. **`#/recherche`** : plein texte plus facettes combinées.

Explicitement **hors v1** : dashboard promesses, annotation personnelle,
export, veille continue, et tout ce qui écrirait ailleurs que dans `dist/`.

## 5. Les amendements (Fable, 01/08/2026)

Validés après contre-expertise du corpus par sondage : les 720 liens fiche vers
fiche sont exacts et aucun n'est cassé, les ~230 titres YAML invalides sont
confirmés, les sections des pièces de jugement sont parfaitement régulières.

### Amendement 1 : la home est le poste de commandement, pas le graphe

`#/` devient une vue synthèse : verdict d'ensemble, fils transverses cliquables
vers `#/parcours`, grille des 15 domaines avec badge verdict, accès direct à la
recherche. Le graphe reste une vue majeure, inchangée par ailleurs.

**Raison** : l'usage quotidien est de retrouver, relire, vérifier. Un graphe de
531 nœuds en écran d'accueil est spectaculaire le premier jour, pénible le
trentième.

### Amendement 2 : vue `#/chrono`, la frise intégrée

Frise horizontale zoomable 2015-2026. Fiches en points (`date`) ou en segments
(`date` vers `date_fin`, 131 cas), bandes des 9 gouvernements canoniques en
arrière-plan, couleur par domaine. Mêmes filtres combinables et même panneau
latéral que le graphe : composants partagés.

Implémentation privilégiée : rendu maison SVG ou canvas. 531 éléments ne
justifient pas une lib de timeline. Agrégation par mois aux zooms larges pour
éviter la bouillie visuelle.

### Amendement 3 : vue `#/acteurs`

Une page par ministre et par gouvernement : fiches où l'acteur apparaît, triées
par date, ventilées par domaine, avec grade et rôles dans les jugements. Index
trié par nombre de fiches, chips des 9 gouvernements en tête.

**Correction de chiffre au passage** : 101 personnes distinctes, et non ~160.
Le compte du plan initial additionnait les libellés composites non fusionnés
(entrées « X puis Y »). Mesure réelle : 631 entrées brutes sur 430 fiches.

Le pipeline ajoute une table acteurs normalisée (nom canonique, variantes
rencontrées, portefeuilles tels que trouvés). **Règle absolue : rien n'est
inventé, tout vient des fiches.** Les noms non normalisables sont listés au
rapport de build.

**Raison** : « le bilan par ministre » est un angle trop puissant pour rester
une simple facette de filtre.

### Ce qu'il fallait prouver au build, pas sur parole

- sigma.js et WebGL fonctionnent réellement en `file://`.
- Fonts Inter et JetBrains Mono récupérables et embarquées, fallback sinon.
- Lisibilité de la frise à 531 éléments, agrégation au zoom.

## 6. Le pivot publication (01/08/2026)

Décision de publier l'Atlas, prise en cours d'étude. Hébergeur **Netlify**,
retenu le 01/08 au soir contre Vercel, sur un motif explicite : le sujet est
politiquement sensible et l'auteur préférait ne pas y engager son compte
Vercel. La finalité « strictement personnel, aucune publication » énoncée par
la méthode de recherche est levée pour le produit Atlas.

Conséquences d'architecture, intégrées dès la première ligne de code :

- L'architecture validée (site statique, données embarquées) se déploie telle
  quelle sur n'importe quel hébergeur statique. La contrainte `file://` tombe,
  ce qui rend possibles les balises meta et OG par vue, un sitemap, une page
  d'accueil indexable.
- **Séparation stricte** : le dépôt de travail n'est jamais connecté à
  l'hébergeur. On déploie le seul contenu généré, par CLI depuis `dist/`.
- **Étape nouvelle en fin de pipeline : l'audit de publiabilité.** Rien d'autre
  que `base/` et `jugement/` ne part ; zéro mention d'outillage interne, de
  chemin local ou de donnée personnelle ; les sources restent des liens
  sortants vers des documents publics.

### Périmètre de publication, tranché le 01/08

**Intégralité du corpus publiée, aucune exclusion.** Les 531 fiches, les 14
fiches de grade C comprises, les 15 pièces de jugement, la synthèse. Principe :
le dossier ne cache aucune de ses pièces. Le grade fait le travail, chaque
fiche C portant un badge qui rappelle la règle « allégation à source unique,
jamais déterminante dans un verdict ». La présence des C devient ainsi une
preuve de rigueur, pas une faille.

**Page Méthode : validée, pièce maîtresse du site.** Rédigée pour le public à
partir des trois méthodes, elle désamorce le procès en anti-macronisme en
montrant la machine :

- l'échelle A/B/C/D avec ses définitions exactes et sa distribution réelle
  (402 A, 115 B, 14 C, 0 D) ;
- la séparation structurelle entre fiches factuelles et jugements ;
- le standard de contradiction : chaque affirmation doit survivre à un
  contradicteur hostile, les décharges sont instruites dans chaque domaine, et
  deux verdicts finissent mitigés ;
- **les 7 récits à charge écartés nommément** par la synthèse (« dérive
  autoritaire », « président des riches », « rien n'a été fait »), c'est-à-dire
  ce que le dossier a refusé de dire ;
- **les 5 retournements de charge publiés** (le record de 49.3 appartient à
  Rocard, les ordonnances montent depuis 2007, les conseils de défense
  hebdomadaires datent de 2016, les feux 2024, cavalier législatif n'est pas
  censure de fond) : le dossier fournit lui-même les armes de sa contradiction ;
- les bascules nommées du verdict d'ensemble, c'est-à-dire ce qui ferait
  changer le dossier d'avis.

**Signature**, tranchée le 01/08 puis amendée le soir même pour retirer le nom
de famille : « Romain, avec l'aide de Claude (Anthropic), Antigravity (Google)
et Grok (SpaceXAI) ». SpaceXAI est le nom porté par l'ex-xAI depuis le
rebranding du 06/07/2026. Créditer les trois moteurs en signature règle la
question de la transparence sur l'outillage : la page Méthode peut alors
développer sereinement le pipeline (recherche browsée par agents, vérification
humaine des sources primaires, identifiants corrigés à la main, passes
adversariales), puisque les IA sont déjà affichées.

**Ne partaient pas, à cette date** : `research/` (rapports bruts), les fichiers
de méthode internes tels quels, `chronologie.md`. La page Méthode est une
rédaction publique, pas une copie de la cuisine.

## 7. Ce qui a changé depuis

Écarts entre ce plan et le site tel qu'il tourne. Le plan n'a pas été retouché
pour les masquer.

**Chiffres corrigés à la mesure.** Le plan estimait 720 arêtes fiche vers
fiche ; le build en compte **510** après déduplication. Il annonçait 1135 liens
jugement vers fiche, le build en mesure **1119**. Les ~160 ministres sont
**101** après fusion des libellés composites (corrigé dès l'amendement 3). Les
grades arrondis (76 / 22 / 3 %) valent exactement **402 A, 115 B, 14 C, 0 D**
sur 531 fiches.

**Neuf vues, pas cinq ni huit.** Aux cinq du plan initial et aux deux
amendements se sont ajoutées la vue synthèse (devenue la home) et la page
Méthode : synthèse, domaines, parcours, graphe, chronologie, acteurs, fiche,
recherche, méthode.

**Domaine tranché.** La décision en suspens sur un domaine personnalisé n'a pas
été prise : le site vit sur `macronisme-le-bilan.netlify.app`, mis en ligne le
01/08/2026 à 18h42.

**L'audit de publiabilité est devenu du code.** Prévu comme une étape de
vérification, il est tenu par `build.ts` lui-même : une table `INTERDITS` scanne
le `data.js` final et fait échouer le build sur toute survivance de vocabulaire
interne. La consigne qui en découle est d'ajouter un motif à la table plutôt
que de corriger à la main.

**Le périmètre de publication a été étendu le 02/08/2026.** L'atelier est
publié à son tour : rapports de recherche bruts, chronologie de travail,
méthodes d'origine, notes de session et prompts de run, dont ce document. La
règle « ne partent pas » ci-dessus est donc caduque. Ce qui l'a rendue tenable
est `atelier/README.md`, qui pose que rien de l'atelier ne fait foi et donne
d'emblée le chiffre gênant : neuf des quinze rapports déclarent une couverture
non convergée.

**La signature est repassée au nom complet le 02/08/2026.** Le dépôt public
porte « Romain Ecarnot » dans son copyright et sa licence, qui a besoin d'un
nom identifiable pour être opposable. Le site disait autre chose que le dossier
qu'il présente : le pied de page et la vue Méthode ont été alignés.
