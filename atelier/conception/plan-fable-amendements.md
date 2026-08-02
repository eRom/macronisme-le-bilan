# Amendements Fable au plan Atlas (validés le 2026-08-01)

> Complète `plan-kimi.md`, qui reste la base d'exécution. Trois amendements
> validés par Romain le 2026-08-01 en session Fable, après contre-expertise
> du corpus : chiffres du plan Kimi recoupés par sondage (720 liens
> fiche->fiche exacts, 0 cassé, ~230 titres YAML invalides, sections des
> pièces de jugement parfaitement régulières).
>
> Verrous inchangés : lecture seule stricte sur `base/`, `jugement/`,
> `research/`, `methodes/`, `chronologie.md` ; 100 % local, zéro réseau ;
> jamais de commit sans demande explicite.

## Amendement 1 : la home est le poste de commandement, pas le graphe

- `#/` devient une vue synthèse : verdict d'ensemble, les fils transverses
  (5 à charge, 4 à décharge, 7 récits écartés) cliquables vers `#/parcours`,
  grille des 15 domaines avec badge verdict (13 défavorables, 2 mitigés),
  accès direct à la recherche.
- Le graphe reste une vue majeure (`#/graphe`), inchangée par ailleurs
  (sigma.js, layout ForceAtlas2 pré-calculé).
- Raison : l'usage quotidien est retrouver / relire / vérifier. Un graphe de
  531 nœuds en écran d'accueil est spectaculaire le premier jour, pénible le
  trentième.

## Amendement 2 : vue `#/chrono` (frise intégrée)

- Frise horizontale zoomable 2015-2026 : fiches en points (`date`) ou en
  segments (`date` -> `date_fin`, 131 cas), bandes des 9 gouvernements
  canoniques en arrière-plan, couleur par domaine.
- Mêmes filtres combinables que le graphe (domaines, type, grade,
  gouvernement) et même panneau latéral fiche au clic : composants partagés.
- Implémentation privilégiée : rendu maison SVG ou canvas (531 éléments, pas
  besoin d'une lib de timeline) ; décision finale au build. Agrégation par
  mois aux niveaux de zoom larges pour éviter la bouillie visuelle.

## Amendement 3 : vue `#/acteurs`

- Une page par ministre (101 personnes distinctes après séparation des
  entrées « X puis Y » et retrait du portefeuille ; 631 entrées brutes sur
  430 fiches, vérifié au build du 01/08 ; le « ~160 » du plan Kimi comptait
  les libellés composites non fusionnés) et par gouvernement (canon : Philippe I, Philippe II,
  Castex, Borne, Attal, Barnier, Bayrou, Lecornu I, Lecornu II) : fiches où
  l'acteur apparaît, triées par date, ventilées par domaine, avec grade et
  rôles dans les jugements.
- Index `#/acteurs` : ministres triés par nombre de fiches, chips des 9
  gouvernements en tête.
- Le pipeline ajoute une table acteurs normalisée : nom canonique, variantes
  rencontrées, portefeuilles tels que trouvés dans le frontmatter. Règle
  absolue : rien n'est inventé, tout vient des fiches ; les noms non
  normalisables sont listés dans le rapport de build.
- Raison : « le bilan par ministre » est un angle 2027 trop puissant pour
  rester une simple facette de filtre.

## Impacts sur le plan d'exécution de plan-kimi.md

- **Étape 1 (pipeline)** : + normalisation acteurs et table gouvernements
  (le mapping regex prévu par Kimi sert aussi à `#/chrono` et `#/acteurs`).
- **Étape 3 (coquille)** : la home devient la vue synthèse ; le routing
  passe à 8 routes : `#/` (synthèse), `#/graphe`, `#/chrono`, `#/acteurs`,
  `#/domaines`, `#/parcours`, `#/fiche/<slug>`, `#/recherche`.
- **Étape 5** : + chrono et acteurs. Vérifications : bandes de gouvernements
  conformes à la table canonique, aucune fiche orpheline d'acteur non listée
  au rapport de build.
- **Étape 6** : inchangée (passe erom-design + erom-taste-gate avant toute
  présentation à Romain).

## À prouver au build, pas sur parole

- sigma.js / WebGL fonctionne réellement en `file://`.
- Fonts Inter + JetBrains Mono récupérables et embarquées localement,
  fallback système sinon.
- Lisibilité de la frise à 531 éléments (agrégation au zoom).

## Hors périmètre v1 (inchangé)

Dashboard promesses, annotation personnelle, export, veille continue, tout
ce qui écrit en dehors de `atlas/dist/`.

## Pivot publication (01/08/2026, décision Romain en session)

Romain veut publier l'Atlas. Hébergeur : **Netlify** (décision du 01/08 au
soir, remplace Vercel : sujet politiquement sensible, Romain préfère ne pas
y engager son compte Vercel). Domaine envisagé
`macronisme-le-bilan.<domain>.<ext>`, décision en suspens. La finalité « strictement
personnel, aucune publication » (methode-recherche §1) est levée par Romain
pour le produit Atlas uniquement ; le verrou de sortie du HQ reste en place
pour tout le reste (corpus source, research/, methodes/, chronologie.md).

Conséquences d'architecture, à intégrer dès la première ligne de code :

- L'architecture validée (site statique, données embarquées) se déploie
  telle quelle sur n'importe quel hébergeur statique ; la contrainte
  `file://` tombe. Deviennent
  possibles et souhaitables : routing propre, balises meta et OG par vue,
  sitemap, page d'accueil indexable. Détail (hash routing conservé ou
  History API) tranché au build.
- Séparation stricte : le depot de travail n'est JAMAIS connecté à
  l'hébergeur. On déploie le seul contenu généré (CLI Netlify depuis
  `dist/`, ou repo public dédié ne contenant que le site). Le corpus source
  reste privé.
- Étape nouvelle en fin de pipeline : **audit de publiabilité**. Grille :
  rien d'autre que base/ + jugement/ ne part ; zéro mention d'outillage
  interne, de chemins locaux, de données personnelles ; les sources restent
  des liens sortants vers les documents publics.

Périmètre de publication (tranché par Romain le 01/08) :

- **Intégralité du corpus publiée, aucune exclusion** : les 531 fiches (les
  14 fiches C comprises), les 15 pièces de jugement, la synthèse. Décision
  de principe : « on a fait un travail factuel », le dossier ne cache
  aucune de ses pièces. Le grade fait le travail : chaque fiche C porte un
  badge explicite rappelant la règle de méthode « allégation à source
  unique, jamais déterminante dans un verdict » ; la présence des C devient
  ainsi une preuve de rigueur, pas une faille.
- **Page Méthode : VALIDÉE, pièce maîtresse du site.** Rédigée pour le
  public à partir des trois méthodes (recherche / jugement / synthèse),
  elle dé-risque le procès en « anti-macronisme » en montrant la machine :
  - l'échelle A/B/C/D avec définitions exactes et distribution réelle
    (402 A / 115 B / 14 C / 0 D) ;
  - la séparation structurelle fiches factuelles / jugements (jamais de
    jugement dans une fiche) ;
  - le standard contradiction : chaque affirmation survit à un
    contradicteur hostile, décharges instruites dans chaque domaine, deux
    verdicts finissent mitigés ;
  - les 7 récits à charge écartés nommément par la synthèse (« dérive
    autoritaire », « président des riches », « rien n'a été fait »...) :
    montrer ce que le dossier a REFUSÉ de dire ;
  - les 5 retournements de charge publiés (Rocard, ordonnances depuis
    2007, conseils de défense depuis 2016, feux 2024, cavalier ≠ censure
    de fond) : le dossier fournit lui-même les armes de sa contradiction ;
  - les bascules nommées du verdict d'ensemble : ce qui ferait changer le
    dossier d'avis.
- **Ne partent toujours pas** : research/ (rapports bruts de travail), les
  fichiers de méthode internes tels quels (gabarits de prompts,
  outillage), chronologie.md. La page Méthode est une rédaction publique,
  pas une copie de la cuisine.
- **Signature : TRANCHÉE par Romain le 01/08, amendée par lui le 01/08 au
  soir (prénom seul, nom de famille retiré du site).** L'à-propos est signé, la
  formule fait foi : « Romain, avec l'aide de Claude (Anthropic),
  Antigravity (Google) et Grok (SpaceXAI) ». (SpaceXAI est le nom porté
  par l'ex-xAI depuis le rebranding du 06/07/2026, @xAI devenu @SpaceXAI ;
  fait apporté par Romain, postérieur au cutoff du modèle.) La signature créditant les trois moteurs règle la
  question de la transparence outillage : la page Méthode peut développer
  sereinement le pipeline (recherche browsée par agents, vérification
  humaine des sources primaires, identifiants corrigés à la main,
  red-team), les IA sont déjà affichées en signature.

Décision en suspens, à trancher avant le PREMIER déploiement (rien de
bloquant pour le build) :

1. Le domaine : `macronisme-le-bilan.<domain>.<ext>` ou autre. Romain a acté le
   point exposition/emploi le 01/08, décision reportée. Note : la
   signature nominative étant tranchée, un domaine neutre ne protégerait
   plus l'identité ; la question restante est surtout de branding.

Jour J, sur GO explicite : amender le CLAUDE.md du poste et le verrou du
CLAUDE.md racine (règle vérité de la doc) ; DNS : CNAME Cloudflare vers
Netlify, valeurs exactes et mode proxy (orange cloud) à vérifier au moment
du setup, pas de mémoire.
