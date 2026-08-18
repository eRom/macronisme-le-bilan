# Méthode v0 — Bilan des deux quinquennats Macron (2017-2026)

> Design validé le 2026-07-20. Périmètre v0 : constitution du socle factuel.
> Hors périmètre v0 : veille continue, vues générées par script, couche jugement/analyse.

## 1. Cadrage

- **Finalité** : dossier strictement personnel (éclairer le vote 2027, base vivante, terrain d'analyse). Aucune publication, aucun partage.
- **Posture** : factuel d'abord, jugement ensuite. Le socle de fiches reste neutre et daté ; l'analyse viendra plus tard, dans des documents séparés, jamais dans les fiches.
- **Nature** : dossier bâti sur pièces gradées. C'est le grade de preuve qui fait la solidité : une allégation mal sourcée au milieu de faits établis fragilise tout le dossier.
- **Moteur de recherche** : Google (Perplexity écarté, crédits insuffisants).

## 2. Structure du poste

```
politique/
├── CLAUDE.md          # contrat du poste : objectif, schéma de fiche, workflow
├── methodes/methode-recherche.md      # ce document
├── base/              # les fiches, une par pièce, nommées AAAA-MM-JJ-slug.md
├── research/          # rapports erom-research:deep-gemini bruts, un par domaine (sas d'entrée)
└── chronologie.md     # index chronologique des fiches, tenu à la main à l'ingestion
```

Le nommage `AAAA-MM-JJ-slug.md` rend la base chronologique par construction.

## 3. Schéma de fiche

Une fiche = une pièce du dossier. Frontmatter normalisé :

```markdown
---
titre: Affaire Benalla
type: affaire            # affaire | mesure | promesse | declaration
domaines: [justice-affaires, libertes-publiques]
date: 2018-05-01         # date du fait ; date de début si étalé
date_fin: 2021-11-05     # optionnel
acteurs:
  president: Emmanuel Macron
  ministres: []          # ministres impliqués, avec portefeuille
  gouvernement: Philippe II
grade: A                 # A · B · C · D (échelle ci-dessous)
statut: null             # promesses uniquement : tenue | partielle | abandonnee
sources:
  - https://...
---

Résumé factuel en quelques paragraphes : daté, neutre, acteurs nommés.
Éléments à décharge ou contestés mentionnés quand ils existent.
Jamais de jugement dans une fiche.
```

**Échelle des grades** :
- **A** — établi par jugement définitif ou document officiel (loi, décision de justice, rapport Cour des comptes, JO)
- **B** — documenté par plusieurs sources de presse indépendantes
- **C** — allégation à source unique
- **D** — rumeur

## 4. Grille des domaines

Un run erom-research:deep-gemini par domaine, instancié depuis le gabarit (§5) avec ces valeurs :

| # | Domaine (slug) | Sous-thèmes à couvrir |
|---|---|---|
| 1 | `finances-publiques` | dette, déficits, budgets successifs, alertes Cour des comptes, dépenses de conseil, budget guerre ukraine |
| 2 | `promesses` | programmes officiels 2017 et 2022, sort de chaque engagement majeur (tenue / partielle / abandonnée) |
| 3 | `justice-affaires` | affaires judiciaires touchant l'exécutif et les ministres (Benalla, McKinsey, Ferrand, Dussopt, Kohler...), mises en examen, condamnations, classements, démissions |
| 4 | `libertes-publiques` | lois sécuritaires, usages du 49.3, gestion des manifestations, violences policières, surveillance, liberté de la presse, liberté d'expression réseaux sociaux |
| 5 | `sante` | gestion Covid, hôpital public, déserts médicaux, Ségur |
| 6 | `retraites-social` | réformes retraites 2019 et 2023, assurance chômage, minima sociaux, AAH |
| 7 | `economie` | chômage, pouvoir d'achat, fiscalité (ISF/flat tax) |
| 8 | `securite-immigration` | lois immigration et sécurité, chiffres officiels, écarts discours/résultats |
| 9 | `ecologie-energie` | engagements climat, condamnations de l'État (Affaire du siècle, Grande-Synthe), nucléaire, EPR, glyphosate |
| 10 | `education-recherche` | réformes scolaires, Parcoursup, crise du recrutement enseignant, université |
| 11 | `international` | **ANNULÉ le 29/07/2026 puis RÉOUVERT le 31/07/2026 sur décision de Romain** (motivation : complétude du bilan, et le domaine le plus susceptible de produire des décharges). Recherche faite au moteur **Grok** (`erom-research:deep-grok`, hors quota Google). Périmètre : diplomatie (Russie, Sahel, Ukraine), Uber Files, ingérences et influences étrangères, ventes d'armes, budget Ukraine. |
| 12 | `institutions` | dissolution 2024, gouvernements successifs et remaniements, conseils de défense, verticalité du pouvoir, rapport au Parlement |
| 13 | `europe` | tutelle, souveraineté, rapport au Parlement européen, ingérence Ursula von der Leyen, désaccords entre États membres, perte de compétitivité, dépendance énergétique |
| 14 | `industrie` | privatisations, désindustrialisation, fermetures d'entreprises, suppressions d'emplois, balance commerciale, retard du numérique |
| 15 | `securite-civile` | **ajouté le 29/07/2026** : flotte aérienne de lutte contre les feux (Canadair, promesse des 16 appareils), SDIS et leur financement, pompiers volontaires et professionnels, ForMiSC, budget du programme sécurité civile et arbitrages, saison des feux et hectares brûlés, moyens de crise (inondations, tempêtes) |

Les sujets sensibles (drogues, dérives autoritaires...) ne font pas de domaine à part : ils tombent dans `justice-affaires` ou `libertes-publiques`, et le grade dit ce que chaque pièce vaut.

## 5. Gabarit de prompt erom-research:deep-gemini

Instancier `{DOMAINE}` et `{SOUS_THEMES}` depuis la grille du §4 :

```
Dossier documentaire factuel sur l'action de l'exécutif français sous Emmanuel
Macron, période mai 2017 → aujourd'hui, domaine : {DOMAINE}.

Sous-thèmes à couvrir impérativement : {SOUS_THEMES}.

Exigences :
- Chaque élément rapporté = une « pièce » datée précisément (jour, sinon mois),
  avec acteurs nommés : ministre(s) en poste à la date des faits avec leur
  portefeuille, gouvernement (Philippe I/II, Castex, Borne, Attal, Barnier,
  Bayrou, suivants), président.
- Distinguer strictement pour chaque pièce : fait établi par jugement ou
  document officiel / fait documenté par plusieurs sources de presse
  indépendantes / allégation à source unique / rumeur.
- Sources primaires en priorité : Légifrance, rapports Cour des comptes, INSEE,
  DREES/DARES, décisions de justice, Journal officiel, comptes rendus
  parlementaires ; ensuite presse d'investigation et généraliste. URL pour
  chaque source.
- Inclure les éléments à décharge ou contestés quand ils existent (relaxe,
  chiffres contradictoires, démentis étayés) : ils font partie du dossier.
- Couvrir les DEUX quinquennats ; ne pas s'arrêter à 2022.

Format de sortie : liste de pièces, chacune structurée ainsi :
### [AAAA-MM-JJ] Titre court
- type : affaire | mesure | promesse | déclaration
- acteurs : président / ministre(s) + portefeuille / gouvernement
- grade suggéré : A | B | C | D (selon la distinction ci-dessus)
- faits : 3 à 8 lignes, neutres, datées
- sources : URLs
```

Pour le domaine `promesses`, ajouter au prompt : « pour chaque promesse, indiquer
le statut final : tenue / partielle / abandonnée, avec la preuve du statut ».

## 6. Workflow du sprint

Cadence (décision du 2026-07-20) : un domaine à la fois, tous les runs en
**depth H** (qualité constante plutôt que vitesse), et **GO explicite de Romain
avant chaque lancement**. Pas de batch ni de programmation nocturne.

Pour chaque domaine, dans l'ordre choisi par Romain :

1. **Lancer** `/erom-research:deep-gemini` avec le prompt instancié. Rapport sauvé puis déposé dans `research/<slug>.md`.
2. **Ingérer** en session : découpage du rapport en fiches dans `base/`, grade vérifié et éventuellement dégradé (le grade suggéré par la recherche n'est qu'une proposition ; en cas de doute, prendre le grade inférieur), mise à jour de `chronologie.md`.
3. **Marquer** le domaine comme ingéré (table de suivi dans `chronologie.md`).

Règles d'ingestion :
- Une pièce transverse à plusieurs domaines = UNE fiche, plusieurs slugs dans `domaines` (pas de doublon).
- Une pièce grade D n'entre dans `base/` que si elle est notable ; sinon elle reste dans le rapport brut.
- L'ingestion vérifie les sources douteuses par sondage : au moindre lien mort ou source fantôme, la pièce est dégradée ou écartée.

Outils d'appoint à l'ingestion (clés dans `~/.zshenv`, faire `source ~/.zshenv` si absentes de l'env de session) :
- **Firecrawl** (`FIRECRAWL_API_KEY`) : récupérer le contenu d'une source que WebFetch n'arrive pas à lire (pages JS-heavy), pour la vérification par sondage.
- **API X** (`X_BEARER_TOKEN`) : retrouver une déclaration précise (tweet) par son URL, comme source primaire d'une fiche `declaration`. Les limites du tier d'accès (recherche d'archives notamment) restent à vérifier au premier usage.

## 7. Hors périmètre v0 (décisions explicites)

- Pas de veille continue ni de routine automatisee.
- Pas de script de génération de vues (wikictl-like) ; `chronologie.md` tenu à la main.
- Pas de couche jugement/analyse : elle viendra après le socle, dans des documents séparés.
- Pas de Perplexity.
- Verrou de sortie : le contenu de le corpus ne part jamais vers un service externe (Slack, Linear, artifact, indexation) sans demande explicite.
