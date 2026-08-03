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

Second piège, déjà connu mais aggravé ici : Légifrance répond **403** à `curl` et
**404** à la récupération de page. Une URL Légifrance classée MORTE doit être
re-sondée par l'autre mécanisme avant d'être déclarée morte.

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

## Ordre de travail

1. **Les orphelines citées et de grade A** (73). Ce sont les seules dont la
   défaillance atteint un verdict : une affirmation pleine dans une pièce de
   jugement, adossée à une fiche que le lecteur ne peut plus vérifier.
2. Les orphelines citées de grade B (25) et C (5).
3. Les 98 fiches partiellement touchées : il leur reste une source vivante, la
   perte est une perte de corroboration, pas d'établissement.
4. Les 15 déplacées, les moins graves : `curl -sIL -w '%{url_effective}'` donne
   la cible, il reste à vérifier que c'est le bon document.

Fait au 03/08/2026, trois fiches, commits `2a250b2` et `9a42fc5` (auditions
Benalla, fiche puis pièce) et `f6765d0` (LBD, contrôles aux frontières). **Reste
101 orphelines.**

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
