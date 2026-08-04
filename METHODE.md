# Méthode

Ce document explique comment ce dossier est construit et ce que vaut chaque
affirmation qu'il contient. Il est écrit pour permettre la contradiction, pas
pour la prévenir.

## 1. Le principe : un dossier bâti sur pièces gradées

Le dossier n'est pas un récit illustré par des exemples. C'est un ensemble de
pièces datées, chacune sourcée et affectée d'un grade de preuve, sur lequel un
jugement est rendu ensuite et séparément.

La conséquence pratique est une règle stricte : **c'est le grade qui fait la
solidité**. Une allégation mal sourcée posée au milieu de faits établis ne
renforce pas le dossier, elle le fragilise. Le tri est donc fait à l'entrée, et
il est visible.

Deux couches, jamais mélangées :

- `base/` contient les **faits**. Une fiche est factuelle, datée, sourcée,
  neutre. Aucun jugement n'y figure, jamais.
- `jugement/` contient les **appréciations**. Une pièce par domaine, plus une
  synthèse. Le jugement lit les fiches et ne les modifie jamais.

Ce sens unique est la garantie principale du dossier : on peut rejeter
l'intégralité des jugements et garder l'intégralité des faits.

## 2. L'unité de base : la fiche

Une fiche = une pièce du dossier. Nommage `AAAA-MM-JJ-slug.md`, ce qui rend la
base chronologique par construction.

```markdown
---
titre: Déconjugalisation de l'AAH (promesse 2022 tenue)
type: promesse            # affaire | mesure | promesse | declaration
domaines: [promesses, retraites-social]
date: 2022-08-16          # date du fait, ou date de début si étalé
date_fin: 2023-10-01      # optionnel
acteurs:
  president: Emmanuel Macron
  ministres: [Jean-Christophe Combe (Solidarités)]
  gouvernement: Borne
grade: A
statut: tenue             # promesses uniquement : tenue | partielle | abandonnee
sources:
  - https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000046186638
---

Résumé factuel, daté, acteurs nommés. Les éléments à décharge ou contestés
sont mentionnés quand ils existent : ils font partie de la pièce.
```

Une pièce transverse à plusieurs domaines reste **une seule fiche** portant
plusieurs slugs dans `domaines`. Il n'y a pas de doublon dans la base, et une
fiche citée par trois domaines reste un seul appui (voir §8).

Les renvois entre fiches utilisent la syntaxe `[[slug]]`. Ces liens ne sont pas
cliquables sur GitHub ; ils le sont sur le site.

## 3. L'échelle des grades

| Grade | Ce qui l'établit |
|---|---|
| **A** | jugement définitif ou document officiel : loi, décision de justice, rapport de la Cour des comptes, Journal officiel |
| **B** | plusieurs sources de presse indépendantes |
| **C** | allégation à source unique |
| **D** | rumeur |

État réel du corpus au 2026-08-04, sur **534 fiches** :

| Grade | Fiches | Part |
|---|---|---|
| A | 409 | 76,6 % |
| B | 112 | 21,0 % |
| C | 13 | 2,4 % |
| D | 0 | 0 % |

Deux règles encadrent l'échelle :

- **Le grade proposé par la recherche n'est qu'une proposition.** À
  l'ingestion, il est revérifié et, en cas de doute, le grade inférieur est
  retenu.
- **Le grade D n'entre pas dans la base**, sauf notabilité particulière. Aucune
  fiche n'a passé ce filtre.

Les 534 fiches citent **915 URL distinctes**. Leur répartition dit la nature du
sourcing mieux qu'une déclaration d'intention :

| Source | Occurrences |
|---|---|
| legifrance.gouv.fr | 203 |
| senat.fr | 74 |
| vie-publique.fr | 59 |
| assemblee-nationale.fr | 50 |
| ccomptes.fr | 46 |
| elysee.fr | 32 |
| conseil-constitutionnel.fr | 32 |
| insee.fr | 20 |
| conseil-etat.fr | 20 |

Les neuf sources les plus citées sont toutes institutionnelles. La première
source de presse généraliste, franceinfo, vient ensuite avec 18 occurrences.

## 4. La grille des domaines

Quinze domaines, instruits un par un. Le volume de fiches par domaine dépasse
534 au total : le multi-tagging du §2 fait qu'une fiche compte dans chacun de
ses domaines.

| Domaine | Fiches | Périmètre |
|---|---|---|
| `ecologie-energie` | 96 | engagements climat, condamnations de l'État, nucléaire, EPR, glyphosate |
| `institutions` | 84 | dissolution 2024, gouvernements et remaniements, conseils de défense, rapport au Parlement |
| `finances-publiques` | 82 | dette, déficits, budgets successifs, alertes de la Cour des comptes, dépenses de conseil |
| `europe` | 79 | souveraineté, rapport au Parlement européen, compétitivité, dépendance énergétique |
| `industrie` | 70 | privatisations, désindustrialisation, fermetures, emploi, balance commerciale |
| `sante` | 63 | gestion du Covid, hôpital public, déserts médicaux, Ségur |
| `libertes-publiques` | 62 | lois sécuritaires, usages du 49.3, maintien de l'ordre, surveillance, liberté de la presse |
| `promesses` | 57 | programmes 2017 et 2022, sort de chaque engagement majeur |
| `justice-affaires` | 54 | affaires touchant l'exécutif et les ministres, mises en examen, condamnations, classements |
| `economie` | 47 | chômage, pouvoir d'achat, fiscalité |
| `securite-civile` | 42 | flotte aérienne anti-incendie, SDIS, pompiers, moyens de crise |
| `retraites-social` | 35 | réformes des retraites 2019 et 2023, assurance chômage, minima sociaux |
| `securite-immigration` | 33 | lois immigration et sécurité, chiffres officiels, écarts discours/résultats |
| `international` | 27 | diplomatie (Russie, Sahel, Ukraine), Uber Files, ingérences, ventes d'armes |
| `education-recherche` | 25 | réformes scolaires, Parcoursup, recrutement enseignant, université |

Les sujets sensibles ne forment pas de domaine à part : ils tombent dans
`justice-affaires` ou `libertes-publiques`, et le grade dit ce que chaque pièce
vaut.

## 5. Comment les fiches ont été produites

La recherche documentaire a été menée avec assistance d'IA, la vérification et
l'arbitrage restant humains. Le dispositif est public et reproductible :

- **Recherche** : plugin [`erom-research`](https://github.com/eRom/erom-research),
  installable depuis la marketplace
  [`erom-marketplace`](https://github.com/eRom/erom-marketplace). Deux moteurs
  ont servi : `agy` (recherche multi-rounds avec matrice de preuves et passe
  adversariale) pour quatorze domaines, `grok` (moteur indépendant) pour
  `international`.
- **Ingestion** : chaque rapport a été découpé à la main en fiches, grade par
  grade, avec revérification des sources.
- **Sondage** : tout identifiant ou URL non vérifié est présumé faux. Au
  moindre lien mort ou source fantôme, la pièce est dégradée ou écartée.

Une leçon de méthode mérite d'être dite, parce qu'elle a changé le dispositif
en cours de route : **une recherche multi-rounds est le mauvais outil pour
retrouver un document nommé**. Sur le domaine `securite-civile`, quatre des
cinq lacunes qu'un run approfondi avait déclarées introuvables ont été comblées
à la main en une heure, par recherche ciblée sur les portails officiels. Depuis,
deux régimes coexistent : exploration d'un domaine par run assisté,
rattrapage ciblé à la main.

Le rôle de l'IA s'arrête à la production de matière et à la rédaction sous
contrainte. Aucun grade, aucun verdict, aucune décision de périmètre n'a été
délégué.

## 6. La couche jugement

Une pièce par domaine, cinq sections fixes dans cet ordre :

1. **Périmètre** : ce que le domaine couvre, ses limites héritées de la
   recherche, dites d'entrée.
2. **Les charges qui tiennent** : chaque charge est une affirmation + les
   pièces citées avec leurs grades + ce qui la limite. La limite fait partie de
   la charge.
3. **Les décharges qui tiennent** : traitement strictement symétrique à la
   section 2. Cette symétrie est ce qui rend le verdict crédible.
4. **Ce qui est écarté** : les charges séduisantes qui ne survivent pas au test
   de contradiction, chacune avec sa raison.
5. **Verdict** : niveau sur l'échelle commune + motifs pesant explicitement les
   sections 2 et 3.

### L'échelle des verdicts

Cinq niveaux symétriques, registre d'audit, communs aux quinze domaines.

| Niveau | Critère |
|---|---|
| très favorable | les décharges A/B dominent nettement ; charges résiduelles mineures |
| favorable | la balance penche à décharge ; des charges réelles subsistent mais secondaires |
| mitigé | charges et décharges de poids comparable ; les motifs disent ce qui ferait basculer |
| défavorable | une ou plusieurs charges déterminantes (A/B) tiennent après contradiction, sans compensation |
| gravement défavorable | charges déterminantes multiples et convergentes ; décharges marginales |

Point important : **l'origine du dossier ne crée aucun droit à un verdict.** Ce
dossier a été ouvert dans une intention critique, ce qui est déclaré ici plutôt
que dissimulé. Un domaine instruit à charge peut finir favorable, et l'échelle
est symétrique pour que ce soit possible.

### Le grade commande la force de l'affirmation

C'est le pont entre les deux couches. Une affirmation du jugement hérite du
grade de ses pièces.

| Grade des pièces | Ce que l'affirmation a le droit de dire |
|---|---|
| A | affirmation pleine, opposable |
| B | affirmation pleine, présentée comme sourcée presse |
| C | conditionnel obligatoire, signalée comme allégation |
| D | n'entre jamais dans un jugement |

Corollaires : pas de charge ni de décharge sans renvoi vers ses pièces ; une
affirmation portée uniquement par du C ne peut jamais être déterminante dans un
verdict.

## 7. Le test de contradiction

Toute candidate, charge comme décharge, subit quatre attaques avant d'entrer
dans une pièce. Elle n'entre que si elle survit ; sinon elle va en section
« ce qui est écarté », avec sa raison.

1. **Comparaison historique** : le fait est-il propre à la période, ou continu
   voire antérieur ?
2. **Biais de période ou de mesure** : un pic isolé pris pour une tendance, un
   biais de recul, deux bornes de mesure prises pour une contradiction.
3. **Nature juridique exacte** : cavalier législatif contre censure de fond,
   secret des délibérations contre secret de la défense nationale, régime
   d'exception contre circonstances exceptionnelles.
4. **Solidité des pièces** : grades réels, sources encore vivantes,
   identifiants sondés.

### Les cinq retournements de charge

Ce sont les comparaisons historiques qui jouent **contre** la thèse d'une
rupture propre à la période. Toute pièce touchant l'un de ces sujets doit
intégrer son retournement, sans exception. Elles sont listées ici parce
qu'elles constituent la meilleure défense disponible et qu'un dossier honnête
la fournit lui-même.

| Sujet | Retournement |
|---|---|
| 49.3 | le record individuel appartient à Michel Rocard (28 recours sur 13 textes, contre 23 sur 6 pour Élisabeth Borne) ; le cadre a été restreint en 2008 |
| Volumes d'ordonnances | hausse continue depuis 2007, avec l'accélération maximale sous François Hollande (+78,3 %) |
| Conseils de défense | le rythme hebdomadaire est institué en juillet 2016, sous la présidence précédente ; l'année 2022 (38 réunions) se situe en dessous |
| Feux de forêt | 2022 est un pic isolé (5,7 fois la moyenne) ; 2024 est la campagne la plus calme (0,27 fois) |
| Censures constitutionnelles | les 32 articles censurés sur la loi immigration et les 7 du budget 2026 sont des cavaliers législatifs, pas des censures de fond |

Symétriquement, trois charges ont survécu à ce test et sont portées partout où
elles s'appliquent : l'effondrement du taux de ratification des ordonnances
(79,6 % puis 61,3 % puis 20,3 %, rupture datée de 2017 qui résiste à la
correction du biais de recul) ; la procédure accélérée quasi systématique sans
gain d'application, constat du Sénat lui-même ; la transmission de PLFSS au
Sénat sans vote de l'Assemblée, trois fois en trois ans.

## 8. La synthèse faîtière

`jugement/synthese.md` se rend sur les quinze pièces, jamais sur les 534
fiches. Aucune charge nouvelle ne peut y naître : si la lecture croisée en fait
émerger une, elle passe d'abord par la révision de la pièce de domaine.

Elle est organisée autour de **fils transverses** : une affirmation qui
n'appartient en propre à aucun domaine et que plusieurs pièces établissent
ensemble. Un fil doit satisfaire trois conditions cumulatives :

1. **Deux domaines minimum**, et il ne s'appuie que sur des charges ou
   décharges ayant déjà survécu au test de contradiction dans leur pièce.
2. **Fiches d'appui distinctes.** Une même fiche citée par trois pièces est un
   appui, pas trois. Un fil dont la convergence repose sur la même fiche vue
   sous plusieurs angles n'est pas transverse.
3. **Le grade commande la force.** Un fil déterminant repose sur du A/B.

Quatre attaques supplémentaires s'appliquent à ce niveau : double comptage,
instruction nouvelle, comparaison historique au carré (un fil affirmant une
rupture cite une série comparative datée, sinon il se formule en descriptif
borné et jamais en « du jamais vu »), et confrontation au meilleur
contre-récit disponible.

Trois interdits de forme, tenus jusqu'au bout : **pas d'arithmétique des
verdicts** (treize défavorables sur quinze n'impliquent par eux-mêmes aucun
niveau d'ensemble), **pas de note chiffrée ni de moyenne**, **pas de consigne
de vote ni de pronostic**. La synthèse se clôt sur les questions que le bilan
permet de poser, sans nommer personne.

## 9. Les limites, dites en clair

Elles sont énoncées dans la synthèse elle-même et répétées ici.

- **Déséquilibre de couverture temporelle.** La période 2024-2026 est plus
  densément documentée que 2017-2022. Ce biais traverse tous les domaines et
  gonfle mécaniquement la fin de période.
- **Corpus international mince.** 27 fiches, deux runs au statut partiel. Les
  relations bilatérales hors Ukraine et Sahel ne sont pas couvertes.
- **Instruments sans série comparative.** Pour plusieurs instruments (44.3,
  47-1, procédure accélérée, référendums par présidence), aucune série
  historique exploitable n'a été trouvée. Les affirmations les concernant
  restent descriptives et bornées.
- **Origine à charge.** Le dossier a été ouvert dans une intention critique.
  L'instruction l'a corrigée domaine par domaine, par la symétrie imposée des
  sections 2 et 3 et par le test de contradiction. Le lecteur reste juge de
  savoir si la correction a suffi.
- **Arrêt au 2026-08-02.** Le socle factuel est clos au 30/07/2026, les
  verdicts sont datés du 31/07/2026.

## 10. L'atelier, et pourquoi rien n'y fait foi

Tout est publié, y compris la matière première. `atelier/` contient les 15
rapports de recherche bruts, la chronologie de travail, les méthodes d'origine,
les notes de session et les prompts de run exacts qui ont servi.

Cette transparence a une contrepartie qu'il vaut mieux énoncer soi-même. Un
rapport brut est une sortie **avant tri**. Il contient :

- des affirmations qui n'ont pas survécu à la vérification et ne figurent dans
  aucune fiche ;
- des identifiants de loi, des numéros de décision et des URL inventés par les
  moteurs de recherche, dont l'apparence est parfaitement plausible (c'est
  l'origine de la règle du §5 : tout identifiant non sondé est présumé faux) ;
- des angles d'investigation qui ont échoué, parfois sur des sujets entiers ;
- des inférences étiquetées comme telles.

**Neuf des quinze rapports déclarent `converged: false`**, c'est-à-dire une
couverture non exhaustive. Sur `securite-civile`, 18 angles sur 27 ont échoué.
Ce chiffre est donné ici plutôt que laissé à découvrir : il est la raison
d'être du tri manuel, et il explique les limites de couverture énoncées au §9.

Le tri est justement ce qui sépare l'atelier du dossier. Ce qui fait foi est
dans `base/`, fiche par fiche, avec sa source et son grade. L'atelier dit
comment le travail a été fait, pas ce qu'il conclut.

`atelier/README.md` détaille le contenu, le statut d'archive de ces documents
(plusieurs énoncent des règles qui ne valent plus, notamment un verrou de
non-publication levé depuis, laissées telles quelles plutôt que réécrites) et
la liste complète des retouches faites avant publication.

## 11. Mise à jour

Le dossier est clos par défaut : rien ne rouvre automatiquement. Un événement
majeur (censure, dissolution, décision de justice) déclenche une mise à jour
ciblée : quelques fiches dans le domaine concerné, puis révision de la seule
pièce de jugement de ce domaine, verdict et date de verdict compris. Le grain
par domaine rend l'opération chirurgicale.

Toute révision d'une pièce déclenche une revérification de la synthèse : les
fils citant le domaine révisé sont re-testés et le verdict d'ensemble
re-motivé si besoin.

La procédure complète, y compris pour ouvrir un nouveau domaine ou prolonger le
dossier jusqu'en 2027, est décrite dans `CLAUDE.md`.
