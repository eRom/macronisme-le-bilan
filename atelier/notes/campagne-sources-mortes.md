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
réel     senat.fr/rap/a22-117-3/a22-117-3.html                  200   ← un « 1 » de trop
corpus   senat.fr/compte-rendu-commissions/20190114/lois_enq.html  404
réel     senat.fr/rap/r18-324-2/r18-324-2.html                  200   ← le suffixe « _enq » n'a jamais existé
```

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
quinze fiches rouvertes, neuf portaient une erreur de fond**, et quatre pièces
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

**Essayé le 03/08, et le résultat est net : six sous-agents lancés en parallèle
sur six fiches n'ont rien rendu du tout**, ni candidat ni échec déclaré, y
compris après relance avec une consigne de réponse immédiate. Pendant le même
intervalle, la voie directe (chercher, ouvrir, vérifier, écrire) a traité huit
fiches. La conclusion à retenir n'est pas que la parallélisation est mauvaise en
soi, c'est qu'elle n'a pas été payante ici et que **le travail a avancé quand il
est resté dans la boucle principale**. Ne pas relancer une flottille avant
d'avoir compris pourquoi celle-là s'est tue.

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
