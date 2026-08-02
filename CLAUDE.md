# Contrat du dépôt

Bilan documenté et sourcé des deux quinquennats Macron (2017-2027), en vue de la
présidentielle de mai 2027. Ce fichier dit comment travailler dans ce dépôt.
`METHODE.md` dit pourquoi la méthode est celle-là ; le lire avant toute séance
de fond.

## Structure

```
base/         531 fiches factuelles, AAAA-MM-JJ-slug.md      <- la matière
jugement/     15 pièces de domaine + synthese.md             <- les verdicts
atlas/        générateur + front du site (TypeScript, Bun)
METHODE.md    méthode publique, destinée au lecteur
atelier/      matière première et suivi interne, JAMAIS commité (.gitignore)
```

## Les six invariants

À ne casser sous aucun prétexte. Chacun a été payé par une leçon.

1. **Sens unique.** Le jugement lit les fiches et ne les modifie jamais. Si
   l'écriture d'une pièce révèle une erreur de fiche : corriger la fiche
   d'abord, dans un commit séparé, puis juger sur la fiche corrigée.
2. **Jamais de jugement dans une fiche.** Une fiche est factuelle, datée,
   neutre. L'appréciation vit dans `jugement/`, exclusivement.
3. **Le grade commande la force de l'affirmation.** A et B autorisent
   l'affirmation pleine ; C impose le conditionnel et ne peut jamais être
   déterminant dans un verdict ; D n'entre ni dans une fiche ni dans un
   jugement.
4. **Tout identifiant non sondé est présumé faux.** Les moteurs de recherche
   inventent des numéros de loi, des URL Légifrance et des références de
   décision qui ont l'air justes. Avant de figer une référence dans une fiche,
   l'ouvrir. Sans exception.
5. **En cas de doute sur un grade, prendre le grade inférieur.** Le grade
   proposé par une recherche n'est qu'une proposition.
6. **Une pièce transverse reste une seule fiche**, avec plusieurs slugs dans
   `domaines`. Jamais de doublon dans `base/`.

## Ajouter une fiche

Nommage `AAAA-MM-JJ-slug.md` dans `base/`, frontmatter complet :

```markdown
---
titre: <titre court et factuel>
type: affaire | mesure | promesse | declaration
domaines: [slug, slug]          # slugs de la grille, voir METHODE.md §4
date: AAAA-MM-JJ                # date du fait, ou de début si étalé
date_fin: AAAA-MM-JJ            # optionnel
acteurs:
  president: Emmanuel Macron
  ministres: [Nom (Portefeuille)]
  gouvernement: Philippe I | Philippe II | Castex | Borne | Attal | Barnier | Bayrou | Lecornu
grade: A | B | C
statut: tenue | partielle | abandonnee    # type: promesse uniquement
sources:
  - https://...
---

Corps factuel, daté, acteurs nommés. Les éléments à décharge ou contestés y
figurent quand ils existent. Renvois vers d'autres fiches en [[slug]].
```

Contrôles avant de committer : chaque URL ouverte au moins une fois, chaque
`[[slug]]` pointant vers un fichier existant de `base/`, le grade cohérent avec
ce que la source établit réellement.

## Les deux régimes de recherche

Ne jamais les confondre. La distinction a été établie à l'usage et elle est
coûteuse à réapprendre.

**Exploration d'un domaine entier** : recherche assistée multi-rounds, via le
plugin [`erom-research`](https://github.com/eRom/erom-research).

```
/plugin marketplace add eRom/erom-marketplace
/plugin install erom-research@erom-marketplace
```

Trois moteurs disponibles : `erom-research:agy` (multi-rounds piloté, matrice
de preuves, passe adversariale ; c'est celui qui a produit quatorze domaines
sur quinze), `erom-research:grok` (moteur indépendant asynchrone ; a produit
`international`), `erom-research:nlm` (référentiel persistant réinterrogeable).

Un run approfondi est coûteux : le workflow ouvre un sous-agent par angle et
par affirmation à vérifier. Vérifier les quotas avant de lancer, et ne lancer
qu'un domaine à la fois.

**Rattrapage ciblé d'un document précis** : recherche web classique, puis
ouverture de la page pour confirmer. Pour un PDF lourd ou illisible
directement : `curl` puis `pdftotext -layout`.

> La leçon, démontrée deux fois : **une recherche multi-rounds est le mauvais
> outil pour retrouver un document nommé.** Sur `securite-civile`, quatre des
> cinq lacunes qu'un run approfondi avait déclarées introuvables ont été
> comblées à la main en une heure, par recherche ciblée sur legifrance.gouv.fr
> et les portails officiels. Dès qu'on connaît le titre, l'auteur ou le numéro
> d'un document, chercher directement.

## Ouvrir un nouveau domaine

1. Choisir le slug et la liste des sous-thèmes à couvrir impérativement.
2. Lancer `/erom-research:agy` avec ce gabarit :

```
Dossier documentaire factuel sur l'action de l'exécutif français sous Emmanuel
Macron, période mai 2017 à aujourd'hui, domaine : {DOMAINE}.

Sous-thèmes à couvrir impérativement : {SOUS_THEMES}.

Exigences :
- Chaque élément rapporté = une « pièce » datée précisément (jour, sinon mois),
  avec acteurs nommés : ministre(s) en poste à la date des faits avec leur
  portefeuille, gouvernement, président.
- Distinguer strictement pour chaque pièce : fait établi par jugement ou
  document officiel / fait documenté par plusieurs sources de presse
  indépendantes / allégation à source unique / rumeur.
- Sources primaires en priorité : Légifrance, rapports de la Cour des comptes,
  INSEE, DREES/DARES, décisions de justice, Journal officiel, comptes rendus
  parlementaires ; ensuite presse d'investigation et généraliste. URL pour
  chaque source.
- Inclure les éléments à décharge ou contestés quand ils existent (relaxe,
  chiffres contradictoires, démentis étayés) : ils font partie du dossier.
- Couvrir les DEUX quinquennats ; ne pas s'arrêter à 2022.

Format de sortie : liste de pièces, chacune structurée ainsi :
### [AAAA-MM-JJ] Titre court
- type : affaire | mesure | promesse | déclaration
- acteurs : président / ministre(s) + portefeuille / gouvernement
- grade suggéré : A | B | C | D
- faits : 3 à 8 lignes, neutres, datées
- sources : URLs
```

Pour un domaine de type `promesses`, ajouter : « pour chaque promesse, indiquer
le statut final (tenue / partielle / abandonnée) avec la preuve du statut ».

3. Déposer le rapport brut dans `atelier/research/<slug>.md`. **Il n'est jamais
   publié.**
4. Ingérer à la main : découper en fiches, revérifier chaque grade, sonder
   chaque URL, écrire dans `base/`.
5. Écrire la pièce de jugement du domaine (section suivante).
6. Mettre à jour `atelier/chronologie.md` et `atelier/plan-jugement.md`.

## Écrire ou réviser une pièce de jugement

Lire `METHODE.md` §6 et §7 en entier avant de commencer. Puis :

1. Relire **toutes** les fiches du domaine. Le juge lit les pièces, jamais des
   résumés de pièces. Un sous-agent peut préparer la logistique (liste des
   fiches, frontmatters), jamais le fond.
2. Dresser les candidates, charges et décharges.
3. Passer chaque candidate au test de contradiction (quatre attaques,
   `METHODE.md` §7). Celles qui échouent vont en section « ce qui est écarté »
   avec leur raison, elles ne disparaissent pas.
4. Vérifier que les retournements de charge applicables au domaine sont
   intégrés (`METHODE.md` §7).
5. Rédiger selon les cinq sections fixes, frontmatter `domaine` / `verdict` /
   `date_verdict`.
6. Commit dédié : `jugement <domaine> (<verdict>)`.

## Contrat de réouverture

Le dossier est clos par défaut. Rien ne rouvre automatiquement.

Un événement majeur (censure, dissolution, décision de justice, élection)
déclenche une mise à jour ciblée, dans cet ordre strict :

1. Quelques fiches dans le domaine concerné, en régime de rattrapage ciblé
   (pas de run complet : le socle est clos à l'ajout de matière, pas à la
   correction).
2. Révision de la seule pièce de jugement de ce domaine, `verdict` et
   `date_verdict` compris.
3. **Recheck obligatoire de la synthèse** : les fils transverses citant le
   domaine révisé sont re-testés, le verdict d'ensemble re-motivé si besoin.
   La synthèse est la seule pièce qui dépend des quinze autres.

Le grain par domaine rend l'opération chirurgicale. Ne jamais rouvrir plus
large que l'événement ne l'exige.

## Prolonger jusqu'en 2027

Le socle s'arrête au 30/07/2026, les verdicts au 31/07/2026. Pour couvrir la
période jusqu'à mai 2027, deux régimes possibles :

- **Veille par événement** (recommandé) : chaque événement majeur passe par le
  contrat de réouverture ci-dessus. Coût faible, dossier toujours cohérent.
- **Campagne de rattrapage** : un run par domaine sur la seule période
  2026-2027, puis révision des quinze pièces et de la synthèse. À ne lancer que
  si la veille a décroché.

Dans les deux cas, l'invariant de datation tient : `date_verdict` dit de quand
date l'appréciation, et la synthèse doit être re-motivée dès qu'une pièce
bouge.

## Rejouer le site

Deux étapes distinctes. Une modification dans `atlas/src/` n'atteint le rendu
que si la seconde est rejouée.

```bash
cd atlas
bun install                                                       # une fois
bun run build.ts                                                  # base/ + jugement/ -> dist/data.js
bun build ./src/app.ts --outdir ./dist --minify --target browser  # src/ -> dist/app.js
open dist/index.html                                              # file:// suffit, zéro réseau
```

`build-report.md` doit dire **531/531** et « Verdict du build : OK ». Le build
sort en erreur sur tout lien mort ou champ manquant bloquant.

`build.ts` porte aussi l'audit de publiabilité : la table `INTERDITS` scanne le
`data.js` final et fait échouer le build sur toute survivance de vocabulaire
interne. **Ajouter un motif à `INTERDITS` plutôt que de corriger à la main.**

Détail du pipeline dans `atlas/CLAUDE.md`.

## Le corpus doit être autonome

Règle posée le 02/08/2026, à l'ouverture du dépôt public, et qui remplace la
précédente.

Le corpus markdown est publié **tel quel**. Il n'y a plus de rendu entre lui et
le lecteur : une fiche qui renvoie à un fichier de travail non publié produit
une référence dans le vide sur GitHub, même si le site l'affiche correctement.

En conséquence :

- **Jamais de renvoi vers `atelier/` dans une fiche ou une pièce.** Ni vers un
  rapport de recherche, ni vers la chronologie, ni vers une note de session.
- **Jamais de nom d'outillage dans le corpus.** Écrire « la recherche du
  30/07/2026 », pas le nom du moteur employé. Ces mentions ont leur place dans
  `METHODE.md`, où elles sont assumées et expliquées, pas au détour d'une
  fiche.
- **Jamais de source pointant vers un fichier local.** Une source est une URL
  publique, ou elle n'est pas citée. Les copies d'archive locales vivent dans
  `atelier/` et ne s'écrivent pas dans le frontmatter.
- **Renvois à la méthode en clair**, pas par numéro de section : écrire
  « METHODE.md, « le grade commande la force » » plutôt que « méthode §5 ». Les
  numéros pourrissent à la première réorganisation.

L'ancienne doctrine (réparer au rendu, ne jamais toucher au corpus) valait tant
que seul le site était publié. Elle a été retirée de `build.ts` avec la table
qui la portait.

## Ce qui ne sort jamais

`atelier/` est gitignoré et le reste : rapports de recherche bruts, chronologie
de travail, méthodes d'origine, notes de session, prompts de run. Ce sont des
sorties avant tri, contenant des angles échoués et des pistes abandonnées.

Avant tout commit, vérifier que `git status` ne propose aucun fichier de
`atelier/`. Si un fichier de travail doit être créé, il va dans `atelier/`.
