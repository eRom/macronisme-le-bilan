# Plan - L'Atlas (mini-site statique relationnel)

> Étude validée par Romain le 2026-08-01. Représentation choisie parmi trois
> (Atlas / Frise chronologique / Tableau de bord) pour rendre le paquet
> le corpus plus lisible, relationnel et exploitable.
>
> Verrous hérités du poste :
> - **Lecture seule sur les sources** : jamais de modification de `base/`,
>   `jugement/`, `research/`, `methodes/`, `chronologie.md`.
> - **100 % local** : zéro réseau, zéro CDN, zéro service externe (verrou de
>   sortie du poste, contenu strictement personnel).
> - **Jamais de commit** sans demande explicite de Romain.
> - Stack : bun + TypeScript (règle outillage du HQ).

## 1. Le gisement (vérifié le 2026-08-01)

| Ressource | Volume | Exploitation dans l'Atlas |
|---|---|---|
| Fiches `base/` | 531 fichiers, ~800 Ko de texte, ~1,5 Ko/fiche | Nœuds et pages |
| Liens fiche -> fiche | 720 arêtes, 0 cassé, 70 % des fiches connectées | Le graphe principal |
| Liens jugement -> fiche | 1135 occurrences contextualisées (charges/décharges numérotées) | Rôles des fiches dans la démonstration |
| Fils transverses de la synthèse | 2 sections (à charge / à décharge), 81 liens ordonnés | Les parcours narratifs |
| Verdicts | 15 domaines (13 défavorables, 2 mitigés) + verdict d'ensemble | Couche de couleur et d'entrée |
| Acteurs | 160 ministres distincts, 9 gouvernements | Filtres et facettes |
| Types | 260 mesures, 193 affaires, 48 promesses, 30 déclarations | Facettes |
| Grades | 76 % A, 22 % B, 3 % C, 0 D | Facettes et hiérarchie visuelle |

La valeur unique de l'Atlas : le **croisement fiches × rôles dans les
jugements**. Ouvrir une fiche et voir « charge n°1 du fil transverse 1 de la
synthèse, pièce du jugement institutions, du jugement retraites-social... ».
Aucun outil standard ne le fait, il faut le construire.

Défauts connus du corpus, à traiter au build :

- **232 fiches (44 %) ont un `titre:` YAML-invalide** (deux-points non quoté) :
  parseur tolérant ligne à ligne, jamais de lib YAML naïve.
- **Champ `gouvernement` non normalisé** : 100 valeurs brutes (transitions,
  annotations, valeurs hors champ) -> mapping vers 9 valeurs canoniques
  (Philippe I, Philippe II, Castex, Borne, Attal, Barnier, Bayrou, Lecornu I,
  Lecornu II), le reste rangé en « indéterminé ».
- **Ministres** : 160 noms distincts une fois le portefeuille entre parenthèses
  retiré.
- Les 1135 liens des jugements n'ont jamais été audités (contrairement aux 720
  de la base) : le build les vérifie et liste tout lien cassé.

## 2. Architecture : une SPA autonome, ouvrable en double-clic

Single-page app statique, routing par hash (`#/fiche/...`), **toutes les
données embarquées dans un `data.js` généré** (pas de `fetch()` JSON, bloqué
en `file://`). Zéro serveur, zéro réseau, zéro CDN. Le verrou est respecté
par construction : le site ne peut physiquement rien envoyer nulle part.

- **Graphe** : sigma.js v3 (WebGL ; 531 nœuds = trivial) + **layout
  ForceAtlas2 pré-calculé au build** (graphology côté bun). Pas de simulation
  live : positions figées, rendu instantané, carte **stable entre les
  sessions** (mémorisation spatiale).
- **Recherche** : FlexSearch, index pré-construit au build et embarqué.
  Instantané à cette échelle.
- **Front** : TypeScript vanilla bundlé par `bun build` (un seul `app.js`).
  Pas de React ni de framework : ~700 lignes suffisent.
- **UI** : erom-design (dark-first, OKLCH, borders > shadows, Inter +
  JetBrains Mono embarquées localement si récupérables, fallback système
  sinon). Passe erom-taste-gate avant présentation.

## 3. Le pipeline de données (le cœur du projet)

Script `build.ts` (bun), lecture seule sur `base/` et `jugement/`,
régénération complète à chaque run :

1. **Parseur frontmatter tolérant** (ligne à ligne, pas de lib YAML).
2. **Normalisation** : gouvernements (mapping regex), ministres (retrait du
   portefeuille), slugs de domaines.
3. **Extraction des rôles** : parsing des sections `## Les charges qui
   tiennent` / `## Les décharges qui tiennent` / `## Ce qui est écarté` des
   15 jugements + des fils de `synthese.md` -> pour chaque fiche, la liste
   de ses rôles numérotés avec le titre de la charge ou du fil.
4. **Calculs** : backlinks, layout ForceAtlas2, index FlexSearch, conversion
   markdown -> HTML des corps de fiches.
5. **Rapport de build impitoyable** : 531/531 fiches parsées exigées, tout
   lien `[[...]]` vers un slug inexistant listé (base ET jugements).

Sortie : `data.js` (~1,5 Mo) + `index.html` + `app.js` + `style.css` dans
`atlas/dist/`.

## 4. Les cinq vues

1. **`#/graphe`** (home) - la carte : nœuds colorés par domaine (15 teintes
   OKLCH distinctes), taille par degré de connexion, labels progressifs au
   zoom. Filtres combinables : domaines, type, grade, gouvernement, plage de
   dates. Panneau latéral fiche au clic.
2. **`#/fiche/<slug>`** - métadonnées structurées, corps, sources cliquables,
   backlinks, **rôles dans les jugements**, ego-graphe local.
3. **`#/domaines`** - grille des 15 domaines avec badge verdict ; chaque
   domaine ouvre le jugement complet rendu en HTML + ses fiches triables.
4. **`#/parcours`** - les fils transverses de la synthèse comme récits
   navigables : texte du fil en fil d'Ariane, fiches maillons enchaînées,
   précédent/suivant.
5. **`#/recherche`** - plein texte + facettes combinées.

Explicitement **hors v1** (YAGNI) : vue promesses/dashboard (projet séparé
éventuel), annotation perso, export, tout ce qui écrit quelque part.

## 5. Structure du projet

```
atlas/
├── plan-kimi.md      # ce document
├── build.ts          # pipeline (bun run atlas/build.ts)
├── src/              # front TS (router, graphe, vues, recherche)
└── dist/             # 100 % généré, double-clic sur index.html et ça marche
```

## 6. Plan d'exécution (6 étapes vérifiables)

1. **Pipeline de données** (`build.ts`) -> vérif : 531/531 fiches parsées,
   0 échec, liens cassés listés (base + jugements), stats recoupées avec
   l'étude du 2026-08-01.
2. **Layout ForceAtlas2 pré-calculé** -> vérif : `data.js` contient x/y pour
   les 531 nœuds.
3. **Coquille app** : router hash + vue fiche + recherche -> vérif :
   navigation complète en `file://`.
4. **Graphe sigma + filtres + panneau latéral** -> vérif : rendu, clic,
   filtres combinés.
5. **Vues domaines + parcours** -> vérif : 15 domaines, fils de la synthèse
   navigables, rôles affichés dans les fiches.
6. **Passe erom-design + erom-taste-gate** (screenshot) avant de montrer le
   rendu à Romain.

Estimation honnête : quelques sessions. Le pipeline de données représente la
moitié de la valeur et un tiers de l'effort.

## 7. Risques identifiés (et parés)

- **Liens des jugements non audités** : le build les liste, visibilité
  immédiate sur les cassés éventuels.
- **Densité du graphe (531 nœuds)** : hiérarchie visuelle obligatoire
  (taille par degré, labels au zoom, possibilité d'un filtre par défaut sur
  les nœuds structurants).
- **Fonts** : Inter/JetBrains Mono embarquées si récupérables localement,
  fallback système propre sinon ; jamais de réseau.
- **file:// et WebGL** : sigma.js fonctionne en `file://` ; tout est bundlé,
  aucune ressource distante.

## 8. Points tranchés (sauf objection de Romain)

- La home est le **graphe** (c'est l'Atlas).
- L'emplacement est `atlas/` (nouveau dossier, rien d'existant
  n'est touché).
- Rien n'est commit sans demande explicite.
