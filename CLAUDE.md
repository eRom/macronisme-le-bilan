# Contrat du dépôt

Bilan documenté et sourcé des deux quinquennats Macron (2017-2027), en vue de la
présidentielle de mai 2027. Ce fichier dit comment travailler dans ce dépôt.
`METHODE.md` dit pourquoi la méthode est celle-là ; le lire avant toute séance
de fond.

## Structure

```
base/         534 fiches factuelles, AAAA-MM-JJ-slug.md      <- ce qui fait foi
jugement/     15 pièces de domaine + synthese.md             <- les verdicts
atlas/        générateur + front du site (TypeScript, Bun)
METHODE.md    méthode publique, destinée au lecteur
atelier/      matière première : rapports bruts, chronologie de travail,
              méthodes d'origine, notes de session, prompts de run
```

Tout est publié, atelier compris. Mais la frontière entre `base/` et `atelier/`
est la colonne vertébrale du dossier : `base/` contient ce qui a survécu à la
vérification, `atelier/` ce qui a servi à y arriver. Ne jamais promouvoir une
affirmation de l'atelier vers une fiche sans repasser par le sondage des
sources et l'attribution d'un grade.

**Avant une séance de fond, lire [`atelier/gotchas.md`](atelier/gotchas.md)** : les
pièges déjà rencontrés et ce qui a marché (récupération de sources bloquées,
identifiants Légifrance fabriqués par les moteurs, pièges du build et de l'audit).
Chacun a coûté du temps une première fois.

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

3. Déposer le rapport brut dans `atelier/research/<slug>.md`, tel quel. Ne
   jamais le corriger après coup : c'est une archive de ce que la recherche a
   réellement produit, y compris ses erreurs.
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
6. **Avancer `date_verdict` dès que la pièce est modifiée**, même si le
   verdict ne bouge pas. La date dit quand l'appréciation a été portée, pas
   quand elle a changé : une pièce relue et amendée est une appréciation
   reportée à cette date. Règle tranchée le 03/08/2026, à la révision qui a
   suivi la campagne d'intégrité des sources, pour éviter qu'un lecteur
   croie lire un jugement de juillet quand la pièce a été reprise en août.
7. Commit dédié : `jugement <domaine> (<verdict>)`.

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
période jusqu'à mai 2027, trois régimes possibles :

- **Veille par événement** (recommandé) : chaque événement majeur passe par le
  contrat de réouverture ci-dessus. Coût faible, dossier toujours cohérent.
- **Campagne de couverture** : densifier des domaines existants sans événement
  déclencheur — trous structurels, décharges absentes, périodes creuses.
  Procédé complet, du diagnostic aux critères d'arrêt :
  `atelier/methodes/methode-exhaustivite.md` ; matrices par domaine dans
  `atelier/couverture/`. C'est la seule voie d'ajout de matière hors événement.
- **Campagne de rattrapage** : un run par domaine sur la seule période
  2026-2027, puis révision des quinze pièces et de la synthèse. À ne lancer que
  si la veille a décroché.

Dans tous les cas, l'invariant de datation tient : `date_verdict` dit de quand
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

`build-report.md` doit dire **534/534** et « Verdict du build : OK ». Le build
sort en erreur sur une fiche non parsée, un champ manquant bloquant, une fuite
de vocabulaire interne, une ligne de la table des quinze verdicts en désaccord
avec le frontmatter de sa pièce — verdict comme `date_verdict` — ou un compteur
public en désaccord avec le corpus. C'est tout ce que `hardFail` couvre.

Le contrôle des compteurs a été rendu bloquant le 04/08/2026, après que
`README.md` et `METHODE.md` ont annoncé pendant plusieurs jours 531 fiches et
879 URL quand `base/` en portait 534 et 915, avec grades et répartition par
domaine faux d'autant. Il confronte au corpus les chiffres écrits dans
`README.md`, `METHODE.md` et `atlas/src/index.html` : total de fiches, URL
distinctes, effectif et part de chaque grade, fiches par domaine, occurrences
par source. **Ajouter une règle à `REGLES_COMPTEURS` plutôt que de corriger un
chiffre à la main**, et préférer un compteur calculé quand le code peut le
lire lui-même, comme les trois compteurs affichés par le front.

Le contrôle sur `date_verdict` a été rendu bloquant le 04/08/2026, après que
huit des quinze lignes de la table se sont retrouvées datées de la veille alors
que les pièces avaient été révisées le jour même. Une synthèse dont la table
retarde ment au lecteur sur la date de chaque appréciation, ce qui est
exactement ce que la règle de `date_verdict` existe pour empêcher.

**Le verdict ne couvre pas les liens morts.** Un renvoi `[[slug]]` qui ne pointe
vers aucune fiche est listé dans le rapport, sous « Wikilinks morts », et laisse
le verdict à OK. Après tout renommage de fiche, lire cette section : le vert ne
la voit pas.

`build.ts` porte aussi l'audit de publiabilité : la table `INTERDITS` scanne le
`data.js` final et fait échouer le build sur toute survivance de vocabulaire
interne. **Ajouter un motif à `INTERDITS` plutôt que de corriger à la main.**

Détail du pipeline dans `atlas/CLAUDE.md`.

## Le corpus doit être autonome

Règle posée le 02/08/2026, qui remplace la précédente.

Une fiche est lue dans deux contextes qui n'offrent pas la même chose : le
dépôt, où tout est présent, et le site, qui ne rend que `base/` et `jugement/`.
Une fiche qui s'appuie sur son environnement de travail pour être comprise est
donc bancale dans l'un des deux, et l'ancienne parade (réparer au rendu) ne
protégeait que le site. Elle a été retirée de `build.ts` avec la table qui la
portait.

En conséquence :

- **Jamais de renvoi vers `atelier/` depuis une fiche ou une pièce.** Ces
  fichiers existent dans le dépôt mais pas sur le site : le renvoi y serait
  mort. Une fiche se tient seule, avec ses sources.
- **Jamais de nom d'outillage dans le corpus.** Écrire « la recherche du
  30/07/2026 », pas le nom du moteur employé. Ces mentions ont leur place dans
  `METHODE.md` et dans `atelier/`, où elles sont assumées et expliquées, pas au
  détour d'une fiche.
- **Jamais de source pointant vers un fichier local.** Une source est une URL
  publique, ou elle n'est pas citée. Les copies d'archive vivent dans
  `atelier/research/annexes/` et ne s'écrivent pas dans un frontmatter.
- **Renvois à la méthode en clair**, pas par numéro de section : écrire
  « METHODE.md, « le grade commande la force » » plutôt que « méthode §5 ». Les
  numéros pourrissent à la première réorganisation.

Le sens de la règle : `atelier/` peut renvoyer à `base/`, jamais l'inverse.

## Ce qui ne sort jamais

Le dépôt est intégralement public. Trois choses n'y entrent pas :

- **`_memory_/`** : mémoire de session, propre à la machine. Gitignoré.
- **Les artefacts de build** (`atlas/dist/`, `node_modules/`, `build-report.md`) :
  régénérables en deux commandes.
- **Tout chemin machine, identifiant de compte ou copie intégrale d'un contenu
  sous droit d'auteur.** Une source est une URL publique, ou elle n'est pas
  citée. Si une copie d'archive est nécessaire pour vérifier un verbatim, elle
  se réduit aux passages effectivement cités (voir
  `atelier/research/annexes/` pour le précédent).

Pour le reste, la règle est inverse de la prudence habituelle : les documents
de travail sont publiés, y compris les échecs. Un rapport dont la couverture a
échoué, une note qui documente une impasse, un run dont le quota a sauté en
cours de route ont plus de valeur publiés que cachés. Ne jamais nettoyer une
archive de ses erreurs : `atelier/README.md` explique pourquoi, et son statut
de mise en garde est ce qui rend cette transparence tenable.

### Vérifier avant de committer

```bash
bun run atelier/audit-publiabilite.ts
```

Sort en erreur sur toute fuite technique (chemin machine, arborescence de
travail) et sur tout vocabulaire de chantier qui se serait glissé dans `base/`
ou `jugement/`. Complète l'audit du build sans le doubler : `atlas/build.ts`
scanne le rendu du site, celui-ci scanne les sources markdown, c'est-à-dire ce
que GitHub publie tel quel. Seul le second voit les fichiers que le site ne rend
pas.

Ajouter un motif à ses tables plutôt que de corriger une occurrence à la main :
une correction manuelle ne protège que du cas d'aujourd'hui.
