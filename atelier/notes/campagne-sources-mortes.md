# Campagne des sources mortes

## Reprise immédiate, si la séance repart à froid

1. Lire ce fichier en entier, puis la liste de travail :
   [`../sources-mortes-orphelines.md`](../sources-mortes-orphelines.md),
   **cent fiches**, triées, avec leurs URL mortes et la voie probable.
2. La règle qui prime sur tout, et qui a failli coûter dix-huit fiches :
   **une URL qui rend 200 n'est pas une source tant qu'on n'a pas vérifié
   qu'elle porte l'élément de contenu que la fiche affirme.**
3. Prendre les fiches dans l'ordre du tableau. Commit par lot, fiche d'abord,
   pièce de jugement ensuite et séparément si la correction en atteint une.
4. Régénérer la liste après chaque lot, elle se recalcule en deux commandes.

Rien d'autre n'est nécessaire : tout ce qui a été appris est ici ou dans
[`../gotchas.md`](../gotchas.md).

> Note de chantier ouverte le 03/08/2026, après la clôture de la campagne
> d'intégrité ([`campagne-integrite-sources.md`](campagne-integrite-sources.md))
> et la révision des seize pièces de jugement
> ([`revision-jugements-post-integrite.md`](revision-jugements-post-integrite.md)).
> Elle existe parce que ce lot s'est révélé être autre chose que ce que son nom
> annonçait.

## Ce que le lot était censé être

Le contrat de la campagne d'intégrité le décrivait en une ligne : « le document
existe, c'est l'adresse qui a pourri, la gravité n'est pas la même ». C'est sur
ce fondement qu'il a été repoussé après la révision des jugements.

C'était faux sur deux points.

## Ce qu'il est

### 1. Un identifiant fabriqué se cache derrière un 404

C'est la découverte qui commande tout le reste.

| Portail | Identifiant fabriqué | Classement |
|---|---|---|
| Légifrance | 200 + « Pas de contenu disponible » | **PIEGE** |
| senat.fr, assemblee-nationale.fr, ministères | **404** | **MORTE** |

La campagne d'intégrité a soldé les 95 pièges parce qu'un piège se signale : il
répond 200 en affichant une page d'erreur, et la table `MARQUEURS_ERREUR` le
attrape. Un identifiant Sénat inventé, lui, répond 404 comme n'importe quel
document déplacé. **Il était structurellement invisible à la campagne
précédente**, et il est indiscernable, dans la liste des mortes, d'une adresse
qui a simplement bougé.

Deux cas prouvés le 03/08/2026 :

```
corpus   senat.fr/rap/a22-117-31/a22-117-31.html                404
réel     senat.fr/rap/a22-120-31/a22-120-31_mono.html           200   ← avis n° 120, pas 117
corpus   senat.fr/compte-rendu-commissions/20190114/lois_enq.html  404
réel     senat.fr/rap/r18-324-2/r18-324-2.html                  200   ← le suffixe « _enq » n'a jamais existé
```

> Rectification du 04/08/2026, et elle porte une leçon. Cette table donnait
> d'abord `a22-117-3` comme document réel, « un 1 de trop ». C'était faux :
> `a22-117-3` répond bien 200, mais c'est l'avis budgétaire sur l'action
> extérieure de l'État. Le bon document est l'avis n° 120, sur un tout autre
> numéro. **Le premier exemple de la campagne était lui-même une réparation par
> tâtonnement**, et il a tenu une journée entière parce que le 200 rassurait.

Conséquence : **le lot des mortes se traite à la recette de la campagne
d'intégrité**, pas à la réparation d'adresse. Lire la fiche pour savoir quel
document l'URL est censée désigner, chercher ce document, l'ouvrir, vérifier un
élément de contenu.

### 2. Cent quatre fiches n'ont plus aucune source vivante

Le décompte de 263 URL mortes masquait l'essentiel. L'unité qui compte n'est pas
l'URL, c'est l'exposition de la fiche : une fiche à trois sources dont une meurt
tient encore, une fiche à source unique qui meurt n'établit plus rien.

```bash
bun run atelier/audit-sources.ts > /tmp/sondage.txt      # environ 5 minutes
bun run atelier/audit-orphelines.ts /tmp/sondage.txt     # instantané
```

Mesure du 03/08/2026, sur 895 sources distinctes :

| | |
|---|---|
| PIEGE | **0** (deuxième mesure consécutive, la campagne d'intégrité tient) |
| MORTE | 263, dont 250 HTTP 404, 4 HTTP 410, 1 HTTP 500, 8 injoignables |
| DEPLACEE | 15 |
| BLOQUEE | 10 |
| VIVANTE | 607 |

| Fiches | |
|---|---|
| touchées | 202 sur 534 |
| **orphelines** (aucune source vivante) | **104** |
| dont citées par une pièce de jugement | 102 |
| dont grade A | 73 |
| réparties en | 56 à source unique, 38 à deux sources, 11 à trois |

Les 404 ne sont pas un artefact du sondeur : contre-épreuve `curl` passée le
03/08 sur `publicsenat.fr`, `senat.fr` et `assemblee-nationale.fr`, les trois
répondent bien 404.

## Pas de raccourci

Testé et écarté : il n'existe pas de règle de réécriture d'URL. La queue des
hôtes touchés est longue et plate (senat.fr 24, assemblee-nationale.fr 18,
conseil-etat.fr 12, puis une traîne d'une trentaine de portails à moins de dix).
Les variantes d'URL essayées sur l'Assemblée et le Sénat échouent toutes. C'est
de la réparation à l'unité.

## Le piège de ce lot, et il a failli se refermer

Sur la fiche des auditions Benalla, une URL Sénat plausible répondait 200 **et**
mentionnait une audition de Patrick Strzoda le 16 janvier 2019, la bonne date.
C'était une autre instance : une mission d'information sur l'association de
personnels de sécurité aux forces de l'ordre, sans un mot sur les passeports ni
sur les faux. Citée sur le code HTTP et le nom, elle aurait produit une URL
valide pointant vers le mauvais document, c'est-à-dire exactement le défaut que
la campagne précédente a passé une journée à éradiquer.

> **Un 200 et un nom ne font pas une source.** Il faut l'élément de contenu que
> la fiche affirme.

Second piège, écrit ici le 03/08/2026 puis **démenti le jour même**, et le
démenti vaut plus que le piège. La note disait : Légifrance répond 403 à `curl`
et 404 à la récupération de page, donc une URL Légifrance classée MORTE doit
être re-sondée avant d'être déclarée morte. C'était une excuse, pas un
diagnostic.

La contre-épreuve : les dix URL de forme `legifrance.gouv.fr/codes/article_lc/`
du corpus ont été sondées ensemble. **Une répond 200 avec son contenu**
(`LEGIARTI000021544350`, article R\*1122-1 du code de la défense), les neuf
autres répondent 404. La forme d'URL fonctionne donc, et un 404 sur cette forme
est un signal, pas un artefact : l'identifiant ne résout pas.

> Avant de mettre une défaillance sur le compte de l'outil, sonder une adresse
> du même hôte et de la même forme dont on sait qu'elle est bonne. Sans ce
> témoin, « le site bloque les automates » couvre indifféremment un blocage et
> neuf identifiants fabriqués.

Les 403 de `curl`, eux, sont réels : Légifrance refuse `curl` quel que soit
l'en-tête. C'est `fetch` qui passe, avec le même agent utilisateur. Deux
mécanismes, deux résultats, et c'est le désaccord entre eux qui a masqué le
problème pendant une journée.

## Ce que coûte une fiche

La première a demandé douze appels d'outil, et elle a produit une correction de
fond : la fiche attribuait à Strzoda l'expression « un faux caractérisé », qui
ne figure pas au procès-verbal. La qualification d'« usage de faux » est celle
du rapporteur Sueur, à qui Strzoda répond « l'enquête le dira » ; ce que Strzoda
affirme est que Benalla est « un monsieur qui a régulièrement utilisé des faux
pour obtenir des titres officiels ». La pièce `justice-affaires` reprenait la
citation fautive, dans la charge que son verdict nomme parmi celles qui pèsent
le plus.

À ce standard, les 104 orphelines sont une campagne de plusieurs séances, du
même ordre que la campagne d'intégrité. Ne pas la sous-estimer, et ne pas la
faire à moitié : une source remplacée sans vérification de contenu est pire que
l'adresse morte qu'elle remplace, parce qu'elle a l'air réparée.

### Le taux d'erreur, mesuré sur la première séance

Ce n'est pas une campagne de réparation d'adresses. C'est une campagne de
re-vérification, et le chiffre du 03/08/2026 le dit sans ambiguïté : **sur les
dix-huit fiches rouvertes, onze portaient une erreur de fond**, et quatre pièces
de jugement ont dû être reprises, dont la synthèse.

| Fiche | Ce que la relecture du document a montré |
|---|---|
| loi APER | une phrase entre guillemets absente du texte |
| secret des affaires | l'exception de presse donnée pour générale, alors qu'elle ne joue qu'en défense au procès |
| drones | motif du juge inexact, deux décisions traitées comme identiques alors que la formation, la procédure et le standard diffèrent |
| Grande-Synthe I | le Conseil d'État ne somme personne, il ordonne un supplément d'instruction |
| Sainte-Soline | deux éléments retenus à charge ne figurent pas dans la décision |
| Wuambushu | numéro de décision désignant un autre document, à deux ans d'écart |
| abrogation des ZFE | mauvais vote, mauvaise date, mauvais chiffres, mauvaise imputation |
| européennes 2019 | pourcentages du soir du scrutin au lieu de ceux proclamés |
| Cour des comptes industrie | date de publication fausse de neuf jours, chiffre central attribué à une source qui n'est pas citée |
| Whirlpool Amiens | le rapport parlementaire d'où venaient date, effectif et montants n'existe pas |
| Initiative européenne d'intervention | la nature du dispositif attribuée à une page du ministère qui n'a jamais été ouverte |

Aucune de ces erreurs n'était visible depuis le dépôt. Toutes le sont devenues
au moment précis où quelqu'un a rouvert la source. C'est la vraie raison de
faire cette campagne, et elle est plus forte que celle qui l'a ouverte : une
adresse morte est une gêne pour le lecteur, une affirmation fausse est une
faute.

## Le lot Légifrance, ou ce qu'on trouve en tirant sur le fil

Les deux orphelines Légifrance de la liste ont ouvert un défaut plus large que
lui-même. Neuf fiches, dont sept qui n'étaient pas orphelines et n'apparaissaient
donc sur aucune liste, citaient un identifiant d'article qui ne résout pas.

La réparation ne consiste pas à retrouver l'article : elle consiste à **citer la
loi qui le crée**. Le texte de la loi contient l'article mot pour mot, il porte
un identifiant stable, et sa forme ELI
(`legifrance.gouv.fr/eli/loi/AAAA/M/J/NUMERO/jo/texte`) se construit à partir du
numéro et de la date de la loi, deux informations que la fiche possède déjà.
Sondée sur les six lois concernées, elle a répondu 200 six fois. C'est la forme
à préférer désormais pour tout renvoi à un texte législatif.

Ce que la vérification a rapporté au passage, et qui est le vrai gain :

- **Une citation fabriquée.** La fiche des zones d'accélération attribuait à la
  loi APER une phrase entre guillemets, « n'emporte pas délivrance des
  autorisations administratives nécessaires », absente du texte. Le fond
  tenait, la forme non. Réécrite sur ce que la loi dit réellement, la fiche est
  plus dure qu'avant : le seul effet propre au classement en zone
  d'accélération est un délai d'enquête publique de quinze jours.
- **Une portée juridique élargie.** L'exception de presse du secret des
  affaires ne joue qu'« à l'occasion d'une instance », en défense devant le
  juge. Une fiche qui la présente comme une immunité générale surestime la
  décharge.
- **Trois affirmations confirmées au mot près** qui ne l'étaient pas : le « oui
  si » de la loi ORE (« subordonnée à l'acceptation, par ce dernier »), la durée
  des chaires de professeur junior (« ne peut être inférieure à trois ans et ne
  peut être supérieure à six ans »), le taux de 20 % de la contribution
  différentielle sur les hauts revenus.

> Une source morte n'est pas seulement une adresse à réparer. C'est le seul
> moment où quelqu'un rouvre le document, et donc le seul moment où l'écart
> entre ce que la fiche affirme et ce que la source établit redevient visible.

## Les trois voies de récupération, et laquelle marche quand

Testées le 03/08/2026 sur les premières orphelines. Le choix se fait au vu de
**ce que la fiche cite**, pas au vu du portail mort.

### 1. Le document porte un identifiant (décision, arrêt, rapport numéroté)

**Moteur de recherche assisté, très efficace.** Une décision de justice, un avis
numéroté ou un rapport parlementaire sont indexés partout et se retrouvent par
leur numéro, même quand l'URL d'origine a disparu. Deux documents retrouvés en
un seul appel sur la fiche LBD : la décision 2019-029 du Défenseur des droits et
l'ordonnance n° 427386 du Conseil d'État.

> **Piège propre à ce mode.** La prose du moteur mélange ses propres citations :
> sur ce cas, elle donnait la source `[7]` comme origine de l'ordonnance du
> Conseil d'État alors que `[7]` était la page du Défenseur des droits. **Lire la
> liste de citations, pas la rédaction.** La liste contient des URL réellement
> crawlées, la rédaction en fabrique.

### 2. Le document est une page de portail qui a bougé

**Le moteur échoue, la variante d'arborescence marche.** Essayé sur la page
Schengen de la Commission et sur un communiqué de Bercy : dans les deux cas le
moteur rend des conseils de navigation et aucune URL. En revanche l'arborescence
se devine : la Commission est passée de
`/policies/schengen-area/schengen-governance/` à
`/policies/schengen-borders-and-visa/schengen-area/`.

> **Piège propre à ce mode.** Sur ce portail, **trois variantes d'URL
> répondaient 200**, dont deux qui n'étaient pas la bonne page. Un 200 ne
> tranche rien ici : il faut demander l'élément de contenu.

### 3. Le document est un communiqué de presse ou une brève

**Le plus dur, et parfois insoluble.** Ni identifiant ni arborescence
prévisible. Le communiqué Bercy du 05/09/2017 sur la cession Engie n'a été
retrouvé par aucune des deux voies. Pour ces cas, deux issues honnêtes :
remplacer par un document primaire qui établit le même fait (rapport de l'Agence
des participations de l'État, document budgétaire), ou rétrograder la fiche et
le dire. **Ne jamais laisser une URL morte en place en espérant qu'elle
revienne.**

## Ce que la répartition annonce, et qu'il faut savoir avant de commencer

Classées par la forme de leur URL morte, les cent orphelines se répartissent
ainsi : **51 en voie 3**, la plus coûteuse, 12 en voie 2, 18 en voie 1 ou 1?,
le reste en combinaisons. **La majorité du lot est donc dans le cas le plus
dur.**

Conséquence à assumer d'entrée : une vingtaine de fiches se réparera vite, le
reste demandera de trouver un document primaire qui établit le même fait, et
certaines finiront **rétrogradées**. C'est une issue honnête si elle est écrite
dans la fiche ; ce qui ne l'est pas, c'est de laisser une URL morte en place, ou
pire, de la remplacer par une adresse valide qui pointe ailleurs.

## Paralléliser, et ce qui ne se parallélise pas

Un sous-agent de recherche par fiche fait tomber le coût de la **découverte** :
les requêtes partent ensemble au lieu d'une par tour. Ce qui ne se parallélise
pas, et qui est le vrai coût, c'est la **validation** : ouvrir le document et y
retrouver l'élément que la fiche affirme. Un agent qui rapporte une URL rapporte
un candidat, pas une source.

Consigne à donner à un tel agent, en clair : rendre **la liste de citations**,
pas une rédaction ; ne jamais affirmer qu'une URL est la bonne ; signaler quand
il n'a rien trouvé plutôt que de proposer une adresse vraisemblable. Les trois
échecs du 03/08 (rapports de l'Assemblée, communiqué Bercy, page Schengen) sont
venus d'un moteur qui préférait inventer une réponse plausible au silence.

Essayé le 03/08 sur six fiches, et le résultat mérite d'être raconté en entier,
parce que la première conclusion qu'on en tire est fausse.

**Ce qui a été observé sur le moment.** Rien. Aucun des six n'avait répondu au
bout d'une heure de travail, ni après deux relances avec consigne de réponse
immédiate. Pendant ce temps, la voie directe traitait huit fiches. Le constat
écrit ici était : « la parallélisation n'a pas été payante ».

**Ce qui s'est passé ensuite.** Quatre des six ont rendu, entre soixante et
quatre-vingt-dix minutes après leur lancement, une fois le travail à la main
déjà fait. Et leur rendu est bon : consignes respectées, liste de citations,
échecs déclarés comme tels, pièges de moteur repérés et nommés. Deux d'entre eux
ont trouvé ce que la voie directe n'avait pas cherché.

> La leçon n'est donc pas « les sous-agents ne servent à rien ». Elle est que
> **leur latence n'est pas celle de la boucle principale**, et qu'un lot lancé
> puis attendu dans le fil produit le pire des deux mondes : on attend, puis on
> refait à la main, puis les réponses arrivent. Il faut soit les lancer et
> passer à autre chose de non lié, soit ne pas les lancer.

Ce qu'ils ont rapporté, et qu'un rapport d'étape trop rapide aurait perdu :

- **Whirlpool.** Le « rapport d'information AN n° 1386 » sur lequel reposait la
  fiche n'existe pas : absent des listes de la législature, absent de la Wayback
  Machine. L'agent a en outre réfuté par lui-même le candidat de remplacement que
  son moteur lui proposait, en cherchant « Whirlpool » et « Amiens » dans les
  7,3 Mo du rapport n° 4923 : zéro occurrence. C'est de la réfutation, pas de la
  suggestion.
- **Initiative européenne d'intervention.** Le moteur a fabriqué des citations
  entre guillemets attribuées à une page d'un domaine qui **ne résout même
  plus** (`NXDOMAIN` vérifié au `dig`), et proposé comme lettre d'intention un
  PDF qui est un numéro de revue universitaire sans rapport. L'agent a
  téléchargé, lu, et écarté les deux.
- **Européennes 2019.** Confirmation indépendante, sur la page vivante du
  ministère, des chiffres que la voie directe avait recalculés depuis le Journal
  officiel. Deux chemins, un seul résultat : 23,34 % et 22,42 %.
- **Guides DGESCO.** Les trois guides retrouvés en PDF sur éduscol, avec leurs
  mentions d'édition, qui datent la collection au mot près.

**Ce qui ne se parallélise toujours pas** : la validation. Chacun de ces
candidats a été re-sondé et relu ici avant d'entrer dans une fiche, et c'est ce
qui a pris le temps. Un agent qui rapporte une URL rapporte un candidat, pas une
source, même quand il travaille bien.

Ce qui a effectivement marché, dans l'ordre de rendement :

| Outil | Emploi |
|---|---|
| ArianeWeb du Conseil d'État | `conseil-etat.fr/fr/arianeweb/CE/decision/AAAA-MM-JJ/NUMERO`, 404 franc sur un numéro qui n'existe pas |
| Légifrance, forme ELI | `legifrance.gouv.fr/eli/loi/AAAA/M/J/NUMERO/jo/texte`, se construit de tête |
| Catalogue du Défenseur des droits | notices `juridique.defenseurdesdroits.fr`, retrouvées par recherche sémantique, jamais devinables |
| Comptes rendus de séance | l'Assemblée publie le détail des scrutins, c'est là que se voient les confusions de vote |
| `curl` + `pdftotext -layout` | seule voie sur les rapports du CGLPL |

## Ordre de travail

1. **Les orphelines citées et de grade A** (73). Ce sont les seules dont la
   défaillance atteint un verdict : une affirmation pleine dans une pièce de
   jugement, adossée à une fiche que le lecteur ne peut plus vérifier.
2. Les orphelines citées de grade B (25) et C (5).
3. Les 98 fiches partiellement touchées : il leur reste une source vivante, la
   perte est une perte de corroboration, pas d'établissement.
4. Les 15 déplacées, les moins graves : `curl -sIL -w '%{url_effective}'` donne
   la cible, il reste à vérifier que c'est le bon document.

Fait au 03/08/2026, en trois passes :

| Commits | Objet |
|---|---|
| `2a250b2`, `9a42fc5` | auditions Benalla, fiche puis pièce `justice-affaires` |
| `f6765d0` | LBD, contrôles aux frontières intérieures |
| `a4f6929`, `f343449` | lot Légifrance : neuf fiches, puis pièce `libertes-publiques` |
| `7032cf6`, `62cca91` | drones, Grande-Synthe I, Sainte-Soline, puis `libertes-publiques` |
| `fdc51c5`, `0592e2f` | Wuambushu, puis `securite-immigration` et la synthèse |
| `5b6c0c2` | abrogation des ZFE, fiche renommée à la date du vote |
| `8ed5b5f` | européennes 2019 |
| `7845bb9`, `f6a34e8` | Cour des comptes industrie et Pisani-Ferry, puis `industrie` |

Re-sondage complet en fin de séance : **90 orphelines**, contre 104 à
l'ouverture. Les URL mortes ou déplacées passent de 278 à 252, les orphelines de
grade A de 73 à 59, et les pièges restent à zéro pour la troisième mesure
consécutive.

Sept des fiches corrigées n'étaient pas orphelines et ne figuraient sur aucune
liste : leur défaut a été trouvé en tirant sur le fil des deux qui l'étaient.

**La voie 1 est vidée.** Toutes les décisions de justice et tous les avis
numérotés du lot ont été retrouvés. C'était la catégorie la plus rentable, elle
est close, et ce qui reste est plus dur qu'au départ : la voie 3 est passée de
la moitié du lot à près des trois quarts. Prévoir un rendement décroissant, et
accepter que la sortie de certaines fiches soit la rétrogradation plutôt que la
réparation.

En attente, non résolues par aucune des trois voies : le communiqué Bercy du
05/09/2017 sur la cession Engie (`2017-09-05-cession-engie`, source unique) et
le communiqué du tribunal administratif de Cergy-Pontoise sur Indymedia
(`2019-02-04-blocage-indymedia-annule`, les deux sources mortes).

## Ce que cette campagne apprend sur la précédente

La campagne d'intégrité s'est close sur une mesure : 895 sources re-sondées,
**zéro piège**. Le chiffre est exact et il ne ment pas. Mais il ne dit que ce
qu'il mesure : zéro identifiant fabriqué **de la famille que le sondeur sait
reconnaître**. Les identifiants fabriqués qui répondent 404 étaient dans le lot
suivant, comptés comme des adresses périmées.

> Une mesure de clôture borne ce qu'elle a cherché, pas ce qui reste. La bonne
> question à poser à un indicateur vert n'est pas « est-il juste ? » mais
> « qu'est-ce qu'il ne peut pas voir ? »

## Les lots rendus par des agents externes, et ce qu'il a fallu en refaire

Séance du 03/08/2026 au soir. Le tableau des 246 lignes restantes a été découpé
en treize lots de vingt, chacun formulé comme un prompt autoportant : contexte,
garde-fous, pièges par hôte, format de sortie. Deux lots sont revenus.

**Le re-sondage n'est pas une formalité, et il ne se délègue pas.** Méthode
retenue ici, plus dure que la lecture : extraction du texte de la page (HTML
détagué, PDF via `pdftotext -layout`) puis **recherche déterministe** de la
citation littérale annoncée. Aucun modèle dans la boucle de validation. Soit la
chaîne est dans la page, soit elle n'y est pas.

| | Lot 01 | Lot 02 |
|---|---|---|
| lignes | 20 | 20 |
| tiennent | 17 | 15 |
| échecs déclarés, et justes | 2 | 2 |
| mauvais document | 1 | 0 |
| citation exacte sur adresse morte | 0 | 2 |
| invérifiable (403 dur) | 0 | 1 |

Les deux défauts sont de familles différentes, et les deux étaient invisibles
au code HTTP seul.

- **Lot 01, ligne 3.** Adresse valide, bon nom d'entreprise, bon syndicat, bon
  contentieux, mais jugement du 8 avril 2026 quand la fiche porte sur avril
  2025 : ni « 608 postes » ni « plan Réact » dans la page. L'agent avait écrit
  la réserve **et coté OUI quand même**. La réserve avait raison.
- **Lot 02, lignes 25 et 29.** Citation exacte, document réel, adresse
  reconstruite depuis le titre au lieu d'être recopiée. Détail dans
  [`../gotchas.md`](../gotchas.md).

**Ce que le re-sondage a rapporté et qui n'était sur aucune copie** : le miroir
`skribi` du Conseil de l'UE, qui lève l'ambiguïté du 403 ; le communiqué du TA
de Cergy-Pontoise sur Indymedia, jusque-là « non résolu par aucune des trois
voies » ; le rapport d'enquête AN n° 1824 en source primaire de Sainte-Soline à
la place d'un article sous péage ; les communiqués ANSES, disparus en français
et vivants en anglais ; le vrai rapport de la commission d'enquête sur les
dépendances numériques (n° 3054, le corpus citait un n° 123 inexistant) ; le vrai
communiqué Destatis (PE26_042_51, le corpus citait un PE26_046_51 qui ne résout
pas).

**Le taux d'erreur de fond se confirme.** Sur les vingt-sept fiches rouvertes,
sept portaient une affirmation que leur source n'établit pas : motif de jugement
attribué aux bénéfices d'un groupe, grenades lacrymogènes données pour
« lacrymogènes et explosives », verbatim présidentiel absent de la page citée,
dénominateur implicite sur les places de prison, deux identifiants de rapport
inexistants, une date de publication laissée « à préciser ». Deux pièces de
jugement ont dû être reprises pour le seul verbatim glyphosate.

Une correction proposée par la recherche a été **écartée** après vérification :
la date du 22/11/2023 de la fiche décarbonation n'est pas fausse, c'est celle
de la signature des contrats. Un agent qui signale une erreur se vérifie comme
un agent qui propose une source.

### Les six lignes ouvertes, et comment elles se sont soldées

Reprises dans la foulée. Quatre trouvent une source, deux sont bornées dans la
fiche. Trois enseignements, dont un à mes dépens.

**Une erreur de ma part, à consigner comme les autres.** J'avais écarté la page
du TA de Montreuil comme « mauvais document » parce qu'elle porte un jugement du
8 avril 2026 quand la fiche est datée d'avril 2025. La fiche porte
`date_fin: 2026-04-08` : la page est exactement la source de son dernier maillon,
« recours CGT rejeté », qui figure dans son titre. Le lot 01 avait raison de la
coter OUI. Le défaut réel était plus petit et différent : le communiqué
n'établit ni les 608 postes ni la validation administrative, qui demandaient une
seconde source.

> Vérifier une source contre ce que la fiche affirme suppose de lire la fiche en
> entier, `date_fin` comprise. Une fiche qui couvre une séquence a plusieurs
> maillons, et une source qui n'en établit qu'un n'est pas pour autant la
> mauvaise source.

**Le résumé d'un moteur attribue des chiffres à des pages qui ne les portent
pas.** Cherchant le bilan Anah 2025, la recherche a rendu deux communiqués de
l'Agence en affirmant qu'ils contenaient « 307 731 rénovations énergétiques,
120 306 rénovations d'ampleur ». Les deux pages ont été ouvertes : l'une, du
16/12/2025, porte sur le budget 2026 ; l'autre, du 10/03/2026, sur la lutte
contre la fraude. Aucune ne contient ces chiffres. C'est la même leçon que sur
les citations du moteur, à un cran de plus : la rédaction ne fabrique pas
seulement des URL, elle fabrique aussi l'appariement entre un chiffre et une
page réelle.

**Une fiche qu'on ne peut pas sourcer se borne, elle ne se vide pas.** Deux cas.
Le « -82,5 Md€ hors énergie » du commerce extérieur 2022, dont la source INSEE
répond 404, n'a été retrouvé nulle part ; la présentation officielle du
07/02/2023 donne -164 Md€ de solde des biens et -74 Md€ hors énergie et hors
matériel militaire. La fiche et les deux pièces qui le reprenaient disent
désormais cela : la charge est intacte, sa mesure change. Les 307 731 logements
MaPrimeRénov' n'ont pas d'équivalent publié ; la fiche est réécrite sur les
chiffres clés de l'Agence et **nomme dans son corps** ce qui n'est plus adossé,
plutôt que de garder un chiffre orphelin ou de le supprimer en silence.

| Fiche | Sortie |
|---|---|
| `2025-04-23-arcelormittal-pse-react` | réparée : communiqué du TA pour le jugement, presse régionale pour les 608 postes et la validation |
| `2021-02-28-convention-citoyenne-note-gouvernement` | réparée : compte rendu de session, les deux questions au mot près, 3,3/10 et 2,5/10 |
| `2023-02-07-deficit-commercial-record-2022` | réparée et corrigée : -164 Md€ à la publication, -74 Md€ hors énergie ; la révision à -162,7 est distinguée |
| `2025-12-17-cloud-confiance-s3ns-bleu` | réparée et corrigée : rapport n° 3054, 1,5 Md€/an, 79 % du top 50 UGAP et non « ~80 % des dépenses » |
| `2026-02-12-bilan-anah-maprimerenov` | bornée : réécrite sur les chiffres clés, la décomposition MaPrimeRénov' est déclarée non adossée |
| `2024-11-01-minima-sociaux-effet-pauvrete-drees` | bornée : les effectifs 2024 ne sont pas dans le panorama cité, la réserve est écrite |

Répercussions : `economie`, `industrie` et `ecologie-energie` reprises sur les
chiffres re-sondés, note de méthode de la synthèse corrigée. Aucun verdict
déplacé.

### État initial de ces six lignes, au moment où elles ont été mises de côté

- `2025-04-23-arcelormittal-pse-react` : orpheline, et elle le reste. Le seul
  document trouvé est un autre jugement.
- `2026-02-12-bilan-anah-maprimerenov` : **les deux** sources sont mortes, la
  seconde ne figurait sur aucune liste. La page ANAH vivante donne 379 428
  logements quand la fiche en porte 307 731 : périmètres à trancher avant tout
  remplacement.
- `2021-02-28-convention-citoyenne-note-gouvernement` : la note de 3,3/10 n'a
  d'autre trace trouvée qu'un article RFI qui répond 403 à toute pile. Non
  vérifiable en l'état.
- `2023-02-07-deficit-commercial-record-2022` : la source INSEE du « -82,5 Md€
  hors énergie » répond 404 et ne figurait sur aucune liste.
- `2024-11-01-minima-sociaux-effet-pauvrete-drees` : les effectifs 2024 (RSA,
  AAH, ASS) ne sont pas dans le panorama cité, qui s'arrête aux données 2022-2023.
- `2025-12-17-cloud-confiance-s3ns-bleu` : le rapport n° 3054 est en place, mais
  les « 1,5 Md€/an » et les « ~80 % UGAP » n'y ont pas été retrouvés sous cette
  forme. À relire dans le tome 2.

Ces six lignes ont un point commun : elles ont été trouvées **en tirant sur le
fil** des lignes du lot, pas en lisant la liste des orphelines. Le rendement de
la campagne tient autant à ce qu'elle révèle qu'à ce qu'elle répare.

## Lots 03 et 04, et le premier renversement de gotcha

Traités le 03/08/2026 au soir, à la même recette. Les deux lots sont sérieux :
ils déclarent leurs échecs, signalent leurs réserves, et le lot 04 va jusqu'à
refuser deux lignes en expliquant pourquoi la notice elle-même paraît fautive.

| | Lot 03 | Lot 04 |
|---|---|---|
| lignes | 20 | 20 |
| annoncées OUI | 20 | 15 |
| NON déclarés | 0 | 5 |
| confirmées au contenu ici | 10 | 6 |
| non testables (hôte anti-automate) | 10 | 9 |

**La moitié des lignes n'est pas testable, et ce n'est pas la faute des lots.**
Dix hôtes opposent un 403 à toute pile : `interieur.gouv.fr`,
`education.gouv.fr`, `enseignementsup-recherche.gouv.fr`, `info.gouv.fr`,
`economie.gouv.fr`, `lesechos.fr`, `france24.com`, `ouest-france.fr`,
`legifrance.gouv.fr`, `politique.pappers.fr`. Sur ces hôtes, ni le sondeur ni
moi ne savons distinguer une page morte d'une page gardée. C'est la limite dure
de la campagne, et elle est plus large qu'on ne le croyait.

**Quatre erreurs de fond, dont deux que les lots ont trouvées seuls.**

- Le lot 03 a rapporté sur Whirlpool une dépêche qui **contredit la fiche** :
  Ageco Agencement n'a pas été liquidée le 31/03/2021, elle a été reprise par
  Mobidecor, 36 salariés sur 81 conservés, activité déménagée. C'est WN qui
  avait été liquidée, en 2019. La pièce `industrie` en tirait « zéro emploi
  industriel au terme », formulation qui tombe.
- Le lot 04 a refusé la ligne 78 en remarquant que la fiche glyphosate adossait
  une réitération de l'aveu à un article du *Parisien* consacré aux
  non-vaccinés. Les deux faits n'ont aucun rapport. L'affirmation est retirée.
- Le lot 04 a signalé que le cosignataire d'une déclaration du 25/06/2025 ne
  peut pas être Nancy Faeser, partie de l'Intérieur allemand le 06/05/2025.
  Vérifié : Dobrindt lui a succédé. Ou la date est juste et le nom est faux, ou
  l'inverse ; le communiqué refuse les automates, la contradiction est écrite
  dans la fiche sans être tranchée.
- Le lot 04 a refusé la ligne 68 pour la même raison que moi une heure plus tôt,
  par un chemin indépendant : le « -82,5 Md€ hors énergie » n'existe dans aucune
  source vérifiable. Deux méthodes, une conclusion.

**Le premier gotcha qui se périme dans la même journée.** Le matin, la contre-
épreuve établissait que Légifrance refuse `curl` mais se laisse lire par `fetch`.
Le soir, quatre formes d'URL, dont un témoin de janvier 2017 connu bon,
répondent 403 à `fetch`. Le contournement est mort en quelques heures, ce qui
oblige à traiter les gotchas de contournement comme périssables et à les
re-tester avant de s'y fier. Détail dans [`../gotchas.md`](../gotchas.md).

**Ce que ces deux lots ferment.** Le communiqué de Bercy du 05/09/2017
sur la cession Engie, porté « non résolu par aucune des trois voies » depuis
l'ouverture de la campagne, ne sera pas retrouvé : il a disparu et le site le
refuse aux automates. Le rapport du Sénat prend sa place pour ce qu'il établit,
et l'écart de calendrier qu'il révèle est consigné dans la fiche plutôt que
gommé.

## Lots 05 et 06, et l'outil qu'on n'avait pas cherché

Traités le 04/08/2026 au matin, à la même recette. Le lot 06 est le meilleur
rendu de la campagne à ce jour : il refuse quatre lignes en démontrant que la
référence elle-même est fausse, et les quatre démonstrations tiennent.

| | Lot 05 | Lot 06 |
|---|---|---|
| lignes | 20 | 20 |
| annoncées OUI | 18 | 16 |
| NON déclarés, et fondés | 2 | 4 |
| confirmées au contenu ici | 16 | 14 |
| non testables (hôte anti-automate) | 2 | 2 |
| adresses fausses | 0 | 0 |

Trente lignes sur trente-quatre testables se confirment. Quarante-six adresses
retirées, quarante-sept écrites, sur trente-huit fiches. Les quatre lignes non
testables (`lesechos.fr`, `rfi.fr`, `euractiv.com`, `fidh.org`) n'ont pas été
retenues sur la foi du lot : chacune des quatre fiches a reçu une autre source,
ouverte et citée.

### Sept erreurs de fond

- **Eaux résiduaires urbaines**, quatre erreurs dans une fiche de cinq lignes :
  date, numéro d'affaire, nombre d'agglomérations, articles de la directive.
  L'arrêt est du 4 octobre 2024, affaire C-268/23, 78 agglomérations, articles 4,
  5, 10 et 15. Le C-601/22 de la fiche désigne un renvoi préjudiciel autrichien
  sur la protection du loup. La fiche portait elle-même l'avertissement « ne pas
  citer le numéro d'affaire sans vérification préalable ».
- **Correction PAC en Haute-Corse** : l'arrêt C-404/19 P est du 17 décembre 2020
  et non du 3 septembre, et il n'a pas « ramené la correction à 25 % » — ce taux
  n'apparaît pas une fois dans le texte. La Cour annule les corrections
  forfaitaires à 100 % sans y substituer aucun taux. Deux pièces de jugement
  reprenaient la formulation inverse.
- **Étrangers et délinquance** : le taux national de 17 % opposé aux « 48 % des
  interpellés à Paris » n'existe dans aucune publication du SSMSI. Le n° 53
  invoqué porte sur les violences conjugales. Le bilan statistique donne des
  parts par infraction, 14 % et 22 %, contre 8 % dans la population.
- **Classement des plaintes covid par la CJR** : annonce du 24 et non du 28
  janvier 2022 ; attribution nominative à François Molins et fenêtre de réception
  des plaintes retirées faute de source.
- **Audition de l'IGPN** : tenue le 14 octobre 2020, rapportée le 15. Les « 115
  dossiers restant à l'examen » et le taux de classement « de 70 à 76 % » ne sont
  dans aucune source ; le second servait de décharge dans `justice-affaires`.
- **Éolien terrestre** : l'objectif de la PPE 2 est de 24,1 GW, valeur unique, et
  non d'une fourchette « 24,1 à 24,6 ». Le SDES donne 22,0 GW installés fin 2023
  quand les 21,8 GW de la fiche sont le chiffre de RTE, qui ne compte que le
  raccordé. Deux mesures officielles, deux périmètres, un seul était cité.
- **Pacte migration** : le rapport sénatorial support n'existe pas. Le fait est
  établi par une réponse ministérielle au JO, ce qui retire à la pièce ce que la
  fiche en tirait, une source parlementaire indépendante de l'exécutif.

### Un numéro d'affaire CJUE était vérifiable en une commande depuis le début

C'est l'enseignement d'outillage de la séance, et il est désagréable. EUR-Lex
répond 202 avec un corps vide aux automates, curia rend son texte en JavaScript :
les deux lots en ont conclu, chacun de son côté, que la référence était
invérifiable, et la campagne l'avait admis avant eux. L'interface de contenu de
l'Office des publications sert le même corpus en XML, XHTML et PDF, sans
protection, et le CELEX se construit de tête. Recettes dans
[`../gotchas.md`](../gotchas.md).

> Quand deux outils différents échouent sur le même hôte, la conclusion n'est pas
> « ce document est invérifiable » mais « je n'ai pas trouvé la bonne porte ».
> Deux fiches ont porté des références fausses pendant un an pour cette raison.

### Une page d'accueil est une source morte que le sondeur voit vivante

Trois sources du corpus pointaient vers une page d'accueil : deux fois celle du
tribunal de Paris, une fois celle d'Euractiv. Elle répond 200, elle n'établit
rien, et elle ne mourra jamais. C'est un défaut de la même famille que
l'identifiant fabriqué, et aucun audit ne le voit.

> À faire : un motif dans `audit-sources.ts` qui signale toute source dont l'URL
> n'a pas de chemin. Suspecte par construction.

Défaut voisin, resté ouvert : la fiche Kohler cite `leclubdesjuristes.com` sans
chemin. Le motif l'attraperait.

### Une citation vérifiée ne dit rien de la publication qui la porte

Le lot 05 a proposé un blog personnel pour l'état des lieux McKinsey et un site
de conseil en marketing pour la liquidation de Carbon. Les deux citations étaient
exactes, le re-sondage les a confirmées, et aucune des deux publications ne tient
le standard du dossier. Remplacées par Consultor et France 3 Provence-Alpes-Côte
d'Azur.

> Le sondeur mesure si la page répond et si elle porte le texte annoncé. Il ne
> mesure pas ce que la page vaut, et cette lecture-là ne se délègue pas non plus.

### Contrôle final

Les 64 sources des trente-huit fiches touchées ont été re-sondées : **aucune
adresse écrite ce matin n'est morte**. Deux sources pré-existantes sont tombées au
passage — une page de Public Sénat, et le domaine `reporters-sans-frontieres.org`,
entièrement éteint au profit de `rsf.org`, dont les chemins ne se transposent pas.

Répercussions sur les pièces : `europe`, `finances-publiques`,
`securite-immigration`, `justice-affaires`, `sante` et `ecologie-energie`
reprises, `date_verdict` avancée. Aucun verdict déplacé. La synthèse ne cite
aucune des fiches corrigées : rien à re-motiver.

## Le motif RACINE, et ce qu'il a trouvé au premier passage

Ajouté à `audit-sources.ts` le 04/08/2026, à la suite des lots 05 et 06 : toute
source dont l'URL n'a pas de chemin est classée **RACINE**, sans appel réseau.
Le défaut est dans l'adresse, pas dans la réponse du serveur.

Contre-épreuve passée : le motif n'attrape ni une page de rapport du Sénat, ni
une URL à chaîne de requête comme celles de curia. Une chaîne de requête ou un
fragment suffisent à désigner un document, la racine nue non.

Premier passage sur le corpus : **36 sources sans chemin, sur 29 fiches**, dont
10 de grade A. Et le chiffre qui compte :

> **Quinze fiches n'ont aucune source portant un chemin.** Elles sont
> orphelines au sens fort — aucune de leurs sources n'établit quoi que ce soit —
> et aucun sondage ne les voyait, puisque leurs URL répondent 200.

Dont quatre de grade A : relaxe Dupond-Moretti devant la CJR, non-lieu covid
devant la CJR, omnibus de détricotage du Green Deal, record de raccordement
solaire. Les hôtes qui reviennent : `courdecassation.fr` et
`leclubdesjuristes.com`, trois fois chacun.

C'est un lot de campagne à part entière, du même ordre que celui des mortes, et
il ne recoupe pas la liste des orphelines : ces fiches en étaient absentes par
construction. À traiter à la même recette — lire la fiche, chercher le document
qu'elle désigne, l'ouvrir, vérifier un élément de contenu.

## Lots 07 et 08, et une citation exacte dans le mauvais document

Traités le 04/08/2026 en fin de matinée. Ce sont les deux meilleurs rendus de la
campagne : aucune adresse fabriquée, équivalents signalés comme tels, et le lot 08
démontre pourquoi la référence qu'il refuse ne peut pas exister.

| | Lot 07 | Lot 08 |
|---|---|---|
| lignes | 20 | 20 |
| annoncées OUI | 19 | 19 |
| confirmées au contenu ici | 15 | 17 |
| non testables (hôte anti-automate) | 4 | 2 |
| candidat écarté après vérification | 1 | 0 |
| NON infondé | 1 | 0 |

### Le défaut qui survit à un contrôle par citation

Pour les premières condamnations de policiers, le lot 07 proposait un article
d'Amnesty International consacré à la valeur probante de l'image en justice. La
citation qu'il en tire est exacte au mot près, je l'ai retrouvée dans la page. Elle
porte sur une convocation annoncée le 7 novembre, pas sur les jugements de décembre
2019. Et la page contient bien « huit mois de prison avec sursis », le chiffre même
que portait la fiche — pour une affaire de 2016 devant le lycée Bergson, sans
rapport.

> Une citation littérale, vérifiable, exacte, et le mauvais document. Le contrôle
> par citation ne suffit pas : il faut demander à la page **ce que la fiche
> affirme**, pas seulement retrouver ce que l'agent en cite. C'est la même leçon
> que sur les auditions Benalla, à un cran de raffinement de plus, et il a fallu
> deux campagnes pour la formuler ainsi.

Bénéfice collatéral : les peines de décembre 2019 ne sont pas « 8 mois et 2 mois
avec sursis » mais deux mois pour le policier qui avait jeté un pavé et quatre mois
pour celui qui avait giflé un manifestant.

### Cinq erreurs de fond

- **Plan 10 000 policiers** : l'avis du Sénat n° 119 n'existe pas, mais les
  chiffres sont exacts et le rapport de la commission des finances sur le PLF 2023
  les porte — 8 446 policiers et 2 083 gendarmes entre 2017 et 2022. Le lot avait
  proposé un autre avis, réel et sans ces chiffres : bonne intuition, mauvais
  document, deuxième fois dans la même séance.
- **Procès Benalla** : une source sans rapport avec l'affaire, un numéro de rapport
  qui désigne une proposition de loi sur les frais de transport hospitaliers. La
  commission des lois n'a jamais publié de rapport sur Benalla ; seul le Sénat l'a
  fait.
- **Achats de vaccins** : la France est l'un des quatre fondateurs de l'alliance
  inclusive, pas établie comme étant « à l'origine » de la centralisation. Titre de
  fiche corrigé, pièce `europe` ajustée.
- **Numerus apertus** : la projection « 292 000 médecins en 2050 » ne figure pas
  sous cette forme dans le communiqué DREES qui porte le scénario.
- **Détricotage du Green Deal** : trois pages d'accueil pour seules sources sur une
  fiche de grade A. La lecture de la directive CSDDD corrige au passage la
  formulation : 5 000 salariés et 1,5 Md€ sont les seuils de la première vague
  d'application inscrite dans le texte adopté, pas ceux d'un compromis de mars 2024,
  le régime général étant de 1 000 salariés et 450 M€.

### Deux constats d'outillage

**Une erreur de certificat n'est pas une défaillance du site.** Le lot 07 a déclaré
la base des incendies de forêt inaccessible pour blocage anti-robot : elle répond
200 avec `curl`. Deuxième occurrence en deux jours, après `france-renov.gouv.fr`.

**Curia sert ses communiqués de presse aux automates**, seuls ses arrêts sont en
JavaScript. Une fiche gardait ainsi une source parfaitement lisible qu'on croyait
bloquée. Recettes dans [`../gotchas.md`](../gotchas.md).

### Contrôle final

Les 71 sources des trente fiches touchées ont été re-sondées : aucune adresse
écrite ce matin n'est morte. Le contrôle a trouvé quatre mortes de plus hors des
quarante lignes, sur des fiches touchées pour une autre raison ; deux sont réparées,
deux restent ouvertes, une page de l'INSEE sur le dialogue social et un dossier de
textes européens du Sénat.

Répercussions sur les pièces : `europe`, `securite-immigration`, `promesses` et
`economie` ajustées, `date_verdict` avancée. Aucun verdict déplacé.

### État de la campagne au soir du 04/08/2026

Huit lots sur treize sont soldés, soit 160 lignes des 246. Restent les lots 09 à 13,
c'est-à-dire les pertes de simple corroboration, moins graves que les orphelines des
premiers lots. S'y ajoute désormais le lot RACINE, quinze fiches dont aucune source
ne porte de chemin, qui n'a jamais figuré sur aucune liste.

## Le lot RACINE soldé, et un hôte qui répond 200 à tout

Traité le 04/08/2026 dans la foulée. Vingt-six fiches, trente-six sources sans
chemin, dont quatorze fiches qui n'avaient que cela. Il ne reste **aucune source
sans chemin dans le corpus**.

Quatorze fiches ont reçu le document qu'elles désignaient, vérifié au contenu.
Douze n'avaient une page d'accueil qu'en appoint : sept ont reçu le document réel,
cinq l'ont perdue sans remplacement, chaque fois avec la réserve écrite dans la
fiche. Retirer un renvoi qui n'établissait rien ne retire rien à la fiche ; ce que
ça change, c'est que la fiche le dit.

### Trois corrections de fond

- **Rodrigues** : le renvoi du policier devant une cour criminelle n'était plus « à
  confirmer ». Deux sources concordantes portent les « charges suffisantes » retenues
  par la cour d'appel et la perte définitive de l'usage de l'œil droit. Grade C relevé
  en B, et deux pièces de jugement reprises : elles l'écartaient au motif d'une source
  unique invérifiable, ce motif tombe, reste celui qui tient — un renvoi n'est pas une
  condamnation.
- **Zacharopoulou** : classement fin mars 2023, annoncé le 4 avril. Retirée faute de
  source, la motivation d'« absence d'intention sexuelle et de contrainte pénalement
  caractérisée ».
- **Deux incertitudes de date levées** : les réquisitions du non-lieu covid sont du
  21 mai 2025, et la LFSS 2026 est la loi n° 2025-1403 du 30 décembre 2025.

### `courdecassation.fr` répond 200 à n'importe quelle adresse

C'est la découverte de méthode du lot, et elle est mauvaise. Le site sert, pour
**toute** URL — `/decision/zzzz` compris — une coquille de 255 octets qui demande
JavaScript. Aucune référence qui y pointe n'est vérifiable par une sonde, un
identifiant de décision fabriqué y est indiscernable d'un vrai, et le sondeur
classait tout cela VIVANTE.

> Un hôte qui répond 200 à tout est pire qu'un hôte mort : il valide n'importe
> quelle référence. Le motif est ajouté à `MARQUEURS_DEFI`, ces sources sortent
> désormais en BLOQUEE.

Le corpus cite deux identifiants `courdecassation.fr/decision/<id>` qu'aucun automate
ne peut départager. Ils restent au dossier, faute de mieux, mais ils ne prouvent
rien : à traiter comme des candidats, pas comme des sources.

### Contrôle final

Les 40 sources des fiches touchées ont été re-sondées. Trois mortes de plus ont été
trouvées, dont deux qui auraient laissé leur fiche orpheline — le communiqué de
Microsoft sur les 4 Md€ et le bilan 2025 de Trendeo. Toutes remplacées. Ne restent
que des 403 d'hôtes connus et des 202 d'EUR-Lex, dont le contenu est lu par l'autre
voie.

### Ce que la campagne a produit au 04/08/2026

Huit lots de mortes sur treize, plus le lot RACINE en entier. Le motif RACINE, écrit
en dix lignes, a trouvé en un passage un défaut que trois campagnes successives
n'avaient pas vu, sur quatorze fiches dont quatre de grade A.

> La bonne question à poser à un audit vert n'est pas « est-il juste ? » mais
> « qu'est-ce qu'il ne peut pas voir ? ». Posée trois fois, elle a rapporté trois
> fois : les identifiants fabriqués derrière un 404, les pages d'accueil derrière un
> 200, et maintenant les hôtes qui répondent 200 à tout.

## Lots 09 et 10, et le premier lot sans défaut

Traités le 04/08/2026 en fin de matinée.

| | Lot 09 | Lot 10 |
|---|---|---|
| lignes | 20 | 20 |
| annoncées OUI | 20 | 18 |
| confirmées au contenu ici | 15 | 16 |
| non testables (hôte anti-automate) | 5 | 4 |
| adresses fausses | 0 | 0 |
| erreurs de fond | 0 | 0 |

**Le lot 09 est le premier sans le moindre défaut de la campagne** : aucune adresse
fabriquée, aucun équivalent abusif, aucune affirmation que le document ne porte pas.
Les deux échecs déclarés par le lot 10 se résolvent tous les deux.

### `conseil-etat.fr` est le contre-exemple de `courdecassation.fr`

Le lot 09 porte surtout des décisions du Conseil d'État, retrouvées à leur adresse
ArianeWeb, qui se construit et qui tient :
`conseil-etat.fr/fr/arianeweb/CE/decision/AAAA-MM-JJ/NUMERO`. L'identifiant résout,
la page rend son texte, un numéro faux donne un 404 franc. C'est l'exact contraire de
la Cour de cassation, traitée une heure plus tôt, qui répond 200 à tout. Deux
juridictions suprêmes, deux régimes de vérifiabilité opposés.

### Trois défauts trouvés en tirant sur le fil

- **Un identifiant du Sénat à un chiffre près** sur la fiche du dédoublement des
  CP-CE1 : `a22-117-31` au lieu de `a22-117-3`. C'est le cas d'école de l'ouverture
  de la campagne, retrouvé par hasard parce que le contrôle final sonde toutes les
  sources des fiches touchées, pas seulement les lignes du lot.
- **Une ligne du lot 08 restée non appliquée** : la statistique des PGE de la Banque
  de France. Rattrapée par le même contrôle.
- **Trois sources mortes de plus**, dont deux séries de l'INSEE qui portaient le taux
  d'emploi et le solde d'emplois salariés privés. Sans équivalent : ces deux chiffres
  sont déclarés à re-sourcer dans la fiche, dans `economie` et dans la synthèse.

> Le contrôle final n'est pas une formalité de clôture : sur ces deux lots, il a
> rapporté plus que les lignes elles-mêmes.

### Le re-sondage a failli rejeter un bon lot, pour une raison qui lui est propre

Au premier passage, quinze des vingt lignes du lot 10 ressortaient à zéro citation
retrouvée — de quoi conclure à la fabrication en série. La cause était dans l'outil :
le lot met ses citations en italique markdown et abrège avec `[…]`, si bien que la
chaîne cherchée contenait des astérisques et des crochets absents de la page. Une
fois ces artefacts retirés, toutes les citations se retrouvent au mot près.

> Le contrôle par citation littérale est le bon outil, mais il est littéral jusque
> dans ses défauts. Normaliser la mise en forme du rapport avant de chercher —
> retirer `*`, `_` et `[…]` — sinon l'outil accuse le lot de sa propre rigidité.

### État de la campagne au 04/08/2026

Dix lots sur treize soldés, 200 lignes sur 246, plus le lot RACINE en entier. Restent
les lots 11, 12 et 13, soit 46 lignes, les moins graves du classement d'origine.

## Hors lots : deux pages rendues à la main (04/08/2026)

Deux articles de presse avaient été déclarés inaccessibles la veille et laissés de
côté. Rouverts avec `curl` et un en-tête de navigateur, ils répondent 200 et se
lisent en entier. **L'échec venait du chemin de lecture, pas de l'hôte** : ni
`franceinfo.fr` ni `humanite.fr` ne refusent les automates, et ils n'entrent donc
pas dans la liste des sites anti-automates que la campagne tient à jour. Chaque
chiffre repris a été retrouvé littéralement sur la page, par la même sonde que les
lots.

Le rendement est hors de proportion avec l'effort. Ces deux pages ont :

- donné à la fiche Zineb Redouane sa seconde source, et surtout révélé qu'elle
  était **fausse sur un point et muette sur quatre autres**. Le tireur y était
  « brigadier de CRS » : aucune source citée ne porte ce grade, il venait de la page
  d'Amnesty fabriquée que la campagne avait retirée sans que personne relise la
  phrase autour. Entrent au dossier le dépaysement de l'instruction à Lyon en 2019
  pour soupçons de collusion entre le parquet de Marseille et les policiers mis en
  cause, les deux expertises contradictoires sur la nature du tir, la préconisation
  de l'IGPN de renvoyer le tireur et son superviseur en conseil de discipline, et le
  refus du directeur général de la police nationale de la suivre ;
- donné aux fiches sur les condamnations de policiers et sur le rapport IGPN 2019
  l'ordre de grandeur qui leur manquait, et un fait qui vaut mieux que les chiffres :
  **il n'existe pas de statistique nationale des condamnations de policiers pour
  violences**, ni à l'Intérieur ni à la Justice. Une absence de donnée est un fait du
  dossier, pas un trou de la recherche.

> Une source qu'on n'a pas réussi à lire n'est pas une source morte, et le retirer
> du dossier sans relire la phrase qu'elle portait laisse derrière elle des
> affirmations orphelines. Le « brigadier » a survécu à la mort de sa propre source.

### Ce que la vérification de ces deux pages a fait tomber par ricochet

Le contrôle de cohérence de la synthèse, exécuté par réflexe après les corrections :
la table des quinze verdicts datait huit appréciations de la veille, alors que les
pièces avaient été révisées le jour même. Le contrôle du build qui devait le voir ne
comparait que le verdict, jamais la date, et n'échouait sur rien. Il compare
désormais les deux et il est bloquant. `ecologie-energie`, révisée le matin sans que
sa `date_verdict` suive, est repassée au 04/08.

## Lots 11 et 13 (04/08/2026)

| | Lot 11 | Lot 13 |
|---|---|---|
| lignes | 20 | 6 |
| OUI déclarés | 20 | 3 |
| NON déclarés | 0 | 3 |
| **références inexistantes démasquées** | **7** | 3 |
| adresses fausses proposées | **0** | **0** |

Dix-sept fiches touchées. Le lot 11 est le plus difficile de la campagne, et le
plus utile : la moitié de ses lignes ne pointaient pas vers une adresse périmée
mais vers un identifiant qui n'a jamais existé, et il les a toutes démasquées, en
donnant chaque fois le bon document.

**Les sept fabrications du Sénat.** `r22-831` était cité comme le rapport Fonds
Marianne : c'est le rapport TikTok, le bon est le n° 829, déposé le 4 juillet et
non le 6. `r22-540` était cité comme relayant les constats du comité sur la
fiscalité du capital, avec la mention « (vérifié) » dans la fiche : il n'existe
pas, et l'affirmation de vérification était donc fausse elle aussi. `r20-008`,
`a24-144-324`, `l24-111-325`, `l24-166-1`, `a22-117-31` : aucun n'existe.

**La fabrication qui avait franchi la frontière.** `r22-540` ne figurait pas que
dans la fiche : la pièce `economie` la citait aussi, mot pour mot. Une référence
inventée avait quitté le socle pour entrer dans un verdict, ce que le sens unique
base → jugement est censé rendre impossible. Il l'empêche pour les faits ; il ne
l'empêche pas pour les identifiants, qui voyagent avec la phrase qui les porte.

**La ligne qui m'accuse.** Au contrôle final des lots 09 et 10, le même matin,
j'avais « corrigé » `a22-117-31` en `a22-117-3` : un chiffre en moins, un 200
franc, une page lisible. C'était l'avis budgétaire sur l'action extérieure de
l'État, sans rapport avec le dédoublement des CP/CE1. Le bon document est l'avis
n° 120. En tirant ce fil, la seconde source sénatoriale de la même fiche tombe
aussi : `a23-131-3`, vivante elle aussi, est l'avis sur les régimes sociaux et de
retraite. Deux sources à 200, aucune sur le sujet, sur une fiche de grade A.

> C'est la démonstration la plus nette de la campagne : le 200 ne prouve rien, et
> réparer un identifiant par tâtonnement produit exactement le défaut que la
> campagne existe pour corriger. Le lot avait raison contre moi.

**Ce que le lot 13 apporte malgré ses trois échecs.** Ses trois NON étaient
fondés : les trois documents sont introuvables. Mais deux d'entre eux ont trouvé
mieux qu'un équivalent. La page morte de fondation politique qui portait les
chiffres des cahiers de doléances est remplacée par la direction interministérielle
de la transformation publique, qui donne d'autres chiffres — plus de 200 000
citoyens dans plus de 17 000 communes — et surtout annonce la mise en ligne du
corpus, ce qui ferme une question que la fiche laissait ouverte depuis
l'ingestion. Le communiqué HATVP retrouvé contredit la décharge que la fiche
Lecornu en tirait : elle disait « sans signalement d'irrégularité », il dit que la
Haute Autorité a « parfois sollicité le dépôt de déclarations modificatives afin
de corriger des erreurs ou des inexactitudes ».

### État de la campagne au 04/08/2026, fin de journée

Douze lots sur treize soldés, 226 lignes sur 246, plus le lot RACINE. Reste le
lot 12, en cours de traitement à l'extérieur. Une seule source morte connue est
laissée en place, le communiqué Vivendi sur le rapprochement Lagardère : c'est la
ligne 224, elle appartient à ce lot 12.

## Lot 12 (04/08/2026) : la campagne est soldée

| | Lot 12 |
|---|---|
| lignes | 20 |
| OUI déclarés | 20 |
| NON déclarés | 0 |
| adresses fausses proposées | **0** |
| références inexistantes démasquées | 2 |

Quinze fiches. Les vingt propositions se chargent et portent ce qu'elles
annoncent. C'est, avec le lot 09, le second lot sans défaut de la campagne.

**Il a failli être condamné en bloc, pour la deuxième fois du même genre.** Au
premier passage, seize des trente et une adresses proposées ressortaient en 404 ou
400. La cause n'était pas dans le lot : il écrit ses URL en liens automatiques
markdown, `<https://…>`, et l'extracteur capturait le chevron fermant. Après
correction, les mêmes adresses répondent toutes 200. Le lot 10 avait déjà produit
ce faux verdict avec l'italique markdown et les crochets d'abrègement.

> Deux occurrences, même signal : un taux d'échec anormalement élevé **et
> homogène**. Devant un lot qui échoue en bloc, suspecter l'extracteur avant le
> rédacteur. C'est écrit dans les gotchas avec la classe de caractères à exclure.

**Les deux références fabriquées.** `l16b1891-t1_rapport-fond` était cité sur la
fiche de la mobilisation contre la réforme des retraites comme un rapport de la
commission des lois : le n° 1891 de la seizième législature est une proposition de
loi sur une vignette « collection » pour véhicules d'époque. `EUR-E20857`, sur la
fiche de l'accord de Turnberry, ne mène à aucun texte.

**La correction la plus utile n'est ni l'une ni l'autre.** La fiche du GNL russe
titre un rebond de 81 % : c'est un chiffre **français**, et la même source donne
12 % pour l'Europe et 18 % pour l'Union. Le lot l'a vu et l'a écrit. Sans cette
précision, le chiffre se lisait comme une duplicité européenne — c'est justement
l'usage que la pièce `europe` aurait pu en faire, et l'écartement qu'elle avait
déjà prononcé gagne là une raison de fond.

**Trois adresses fausses, de mon fait.** En appliquant les substitutions, j'ai
transcrit trois URL de mémoire au lieu de les recopier du rapport. Le contrôle
final les a rattrapées avant commit. La leçon rejoint celle du matin sur les
identifiants sénatoriaux : dans cette campagne, la main qui répare est une source
d'erreurs au même titre que la recherche qui propose.

### Campagne close au 04/08/2026, et la mesure qui la dément à moitié

Treize lots sur treize, **246 lignes sur 246**, plus le lot RACINE en entier.

Cette section a d'abord conclu par « aucune source morte connue ne subsiste dans
le corpus ». C'était écrit avant la mesure, et la mesure l'a démentie. Elle est
conservée ici corrigée plutôt que réécrite, parce que l'erreur est celle contre
laquelle toute cette note met en garde : **une campagne se solde par une mesure,
pas par un décompte de ses propres commits.**

#### Ce que le sondage complet a d'abord dit, et pourquoi il se trompait

Premier passage sur les 913 sources distinctes : **37 MORTE**. Re-sondées une à
une avec `curl`, elles se répartissaient ainsi :

| | |
|---|---|
| 200 à `curl` (erreur de chaîne de certificats côté `fetch`) | 3 |
| 403 à `curl` : hôte anti-automate, donc BLOQUEE et non MORTE | 19 |
| réellement mortes | 15 |

**Vingt-deux faux morts sur trente-sept.** L'outil ne faisait qu'un tir, avec
`fetch`, et déclarait MORTE tout ce qui n'aboutissait pas. C'est très exactement
le défaut consigné le matin même à propos de deux articles de presse : *un échec
de lecture n'est pas un blocage d'hôte, et encore moins une mort*. Le gotcha
était écrit, l'outil ne l'appliquait pas.

`audit-sources.ts` fait désormais un **second tir à `curl`** avant tout verdict
d'échec, et c'est `curl` qui tranche : 403 donne BLOQUEE, 200 donne VIVANTE, un
code d'erreur donne MORTE.

#### La mesure de clôture, avec l'outil corrigé

Corpus entier, 913 sources distinctes :

| | |
|---|---|
| RACINE | **0** |
| PIEGE | **0** (quatrième mesure consécutive) |
| MORTE | **16** |
| DEPLACEE | 6 |
| BLOQUEE | 81 |
| VIVANTE | 810 |

Dix-huit fiches touchées sur 534, dont **huit orphelines** — cinq de grade A,
sept citées par une pièce de jugement.

Les seize mortes ne sont pas un reliquat des 246 lignes : aucune n'était sur la
liste de la campagne. Ce sont des adresses tombées depuis le sondage du 03/08, ou
des sources introduites pendant la campagne, ou des lignes que le sondeur d'alors
classait autrement. Les hôtes : INSEE trois fois, l'Assemblée et EDF deux fois
chacun, puis une traîne d'un cas par portail.

> Le corpus est passé de 263 sources mortes à 16 en deux jours, et de 104 fiches
> orphelines à 8. Ce sont les vrais chiffres de la campagne. Le zéro n'existe pas
> et n'existera jamais : des pages meurent tous les jours, et la seule chose
> qu'on puisse tenir, c'est la fréquence du sondage.

#### Ce qui reste à faire, nommé

Un lot de seize adresses sur douze fiches, dont huit orphelines. Il est petit et
il est du même genre que ce qui vient d'être fait : lire la fiche, chercher le
document qu'elle désigne, l'ouvrir, vérifier un élément de contenu. Le sondage
complet se rejoue en deux commandes, il donne la liste à jour.

## Le lot des seize, ou ce que la mesure de clôture avait fait apparaître

Traité le 04/08/2026 dans la foulée de la mesure. Onze fiches touchées, seize
adresses, dont huit fiches sans plus aucune source vivante. Aucune de ces lignes
n'était sur la liste des 246 : ce sont des pages tombées depuis le sondage du
03/08 ou des sources introduites pendant la campagne elle-même.

### Trois chiffres perdent leur support et changent

- **Police de sécurité du quotidien.** La fiche donnait « 1 154 postes créés fin
  2022 sur les 1 300 annoncés », adossés au seul avis du Sénat `a22-119-3`. Cet
  avis n'existe pas — c'est la même référence fabriquée que celle démasquée sur
  le plan 10 000 policiers, sur une autre fiche. Le rapport de la Cour des comptes
  du 26/04/2023 donne **1 089 postes pour 62 quartiers en juin 2022**, contre
  1 300 prévus pour 60. La pièce `securite-immigration` reprenait le 1 154.
- **Pouvoir d'achat par unité de consommation.** Les deux séries INSEE citées sont
  mortes. Sur la série courante en base 2020, **les valeurs 2021 à 2024 ont toutes
  été révisées d'un dixième de point**, et l'année 2025 entre au dossier à
  **-0,7 %**. C'est un troisième recul, et le premier hors crise : la décharge
  d'`economie` et le fil de la synthèse, qui disaient « ne recule que les deux
  années de crise », sont bornés à 2017-2024. Les valeurs 2017 à 2019 ne sont sur
  aucune page citée et sont déclarées à re-sourcer.
- **GE Belfort.** Ni `l15b0842` ni `l15b4528` ne mènent à un document. Le rapport
  de la commission d'enquête sur la politique industrielle est le **n° 897**, pas
  le n° 842. La pénalité de 50 M€ et le solde du plan social passent à la presse
  régionale, qui les établit, et le solde entre au dossier : plan achevé en
  octobre 2020, Belfort et Bourogne passant de 1 760 à 1 275 salariés.

### Deux recettes de récupération qui ressortent

- **Les décisions du Conseil d'État se retrouvent à leur forme ArianeWeb**, une
  fois de plus. La page `conseil-etat.fr/actualites/` qui les annonçait a disparu,
  la décision est là, à son numéro.
- **Les communiqués d'EDF ont survécu en anglais** quand leur version française a
  disparu : `edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/`.
  Les deux communiqués Flamanville, couplage et pleine puissance, s'y lisent avec
  leur heure et leur puissance au mégawatt près.

### Corrections de date et de portée

Le bilan de l'OFPRA est du **27 janvier 2026**, pas du 13. La mise en examen de
Kohler est établie par sa source au mois — « depuis septembre 2022 » — le jour du
23 relevant de la presse, ce qui est désormais écrit dans la fiche. Le
communiqué du ministère des armées sur le char franco-allemand, que le sondage
donnait mort en 503, répondait 200 une heure plus tard : **un 503 est transitoire
par définition, il ne prouve rien.**

### Contrôle final

Les 25 sources des onze fiches touchées : aucune morte. Les quatre non-200 sont
Légifrance et `interieur.gouv.fr`, tous deux connus pour refuser les automates.

## Mesure de clôture réelle, 04/08/2026 en fin de journée

Sondage complet, outil corrigé (second tir à `curl`), 915 sources distinctes :

| | 03/08 au matin | 04/08 au soir |
|---|---|---|
| RACINE | 36 (non mesuré alors) | **0** |
| PIEGE | 0 | **0** |
| MORTE | 263 | **0** |
| DEPLACEE | 15 | **0** |
| BLOQUEE | 10 | 80 |
| VIVANTE | 607 | **829** |
| fiches orphelines | 104 | **0** |

Les six dernières DEPLACEE ont été réécrites à leur adresse d'arrivée : une
redirection marche jusqu'au jour où elle s'arrête, et deux d'entre elles
changeaient de chemin en plus de changer d'hôte.

### Ce que ce zéro ne dit pas, et qu'il faut lire avec lui

Les 80 BLOQUEE sont des hôtes qui refusent les automates : Légifrance,
`interieur.gouv.fr`, `education.gouv.fr`, `economie.gouv.fr`, `info.gouv.fr`,
`consilium.europa.eu`, EUR-Lex, quelques titres de presse derrière Cloudflare.
**Sur ces adresses, ni l'outil ni personne ici ne sait distinguer une page morte
d'une page gardée.** Le zéro porte sur les 835 adresses qu'on peut lire, pas sur
les 915.

Le nombre de BLOQUEE a d'ailleurs été multiplié par huit dans la journée, et
c'est une bonne nouvelle : ce sont, pour l'essentiel, les dix-neuf adresses que
l'outil déclarait mortes à tort avant le second tir, plus celles que la campagne
a introduites en remplaçant des pages disparues par des documents officiels sur
des portails gardés.

> Un audit qui affiche zéro doit toujours être lu avec la taille de son angle
> mort. Ici, 80 sur 915, soit près d'une source sur onze, sont hors de portée de
> la mesure. C'est la limite dure de cette campagne, et elle n'a pas bougé.
