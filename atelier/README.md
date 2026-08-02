# L'atelier

La matière première du dossier, et les documents de travail qui ont servi à le
construire. Publiés par choix, en août 2026, pour que la méthode soit
vérifiable jusqu'à sa source.

## Rien ici ne fait foi

C'est la seule chose importante à retenir avant de lire quoi que ce soit dans
ce dossier.

Ce qui fait foi est dans [`base/`](../base), fiche par fiche, avec sa source et
son grade de preuve. Ces 531 fiches sont le résultat d'un tri : chaque fait y a
été revérifié à la main, chaque identifiant sondé, chaque grade éventuellement
dégradé. **Ce qui n'a pas passé ce tri est resté ici, et y est resté pour une
raison.**

Un rapport de recherche brut contient donc, par construction :

- des affirmations qui n'ont pas survécu à la vérification et ne sont dans
  aucune fiche ;
- des identifiants de loi, des numéros de décision et des URL **inventés par
  les moteurs de recherche**, qui ont l'air justes et ne le sont pas ;
- des angles d'investigation qui ont échoué, parfois sur des sujets entiers ;
- des inférences explicitement étiquetées comme telles, à ne pas lire comme des
  faits établis.

Citer un de ces documents comme s'il s'agissait du dossier serait une erreur de
lecture. Ils disent comment le travail a été fait, pas ce qu'il conclut.

## Le chiffre qu'il faut connaître

**Neuf des quinze rapports de recherche déclarent `converged: false`** dans leur
en-tête.

Cela ne signifie pas que leurs faits sont faux. Cela signifie que le processus
de recherche multi-rounds n'a pas atteint l'état où un round supplémentaire
n'apporte plus rien : la **couverture** n'est pas exhaustive. Sur le domaine
`securite-civile`, par exemple, 18 angles sur 27 ont échoué, dont des angles
primaires.

C'est précisément pour cette raison que rien n'entre dans `base/` sans
revérification manuelle, et que les limites de couverture sont dites d'entrée
dans chaque pièce de jugement et dans la synthèse. Le chiffre est donné ici
plutôt que laissé à découvrir.

## Ce qu'il y a dedans

| | | |
|---|---|---|
| `research/` | 1,3 Mo | 15 rapports de recherche bruts, un par domaine, plus deux annexes de vérification |
| `chronologie.md` | 172 Ko | index chronologique des 531 fiches, avancement par domaine, et les points restés à vérifier |
| `methodes/` | 40 Ko | les trois méthodes d'origine (recherche, jugement, synthèse). `METHODE.md` à la racine en est la version publique et à jour |
| `notes/` | 44 Ko | notes de session : le raisonnement en cours de route, y compris les impasses |
| `conception/` | 16 Ko | la conception du site en un document : brief initial, plan d'exécution, amendements, pivot publication |
| `runs/` | 16 Ko | le script de lancement d'un run et deux sujets de recherche complets |
| `gotchas.md` | 8 Ko | les pièges rencontrés en construisant le dossier, et ce qui a marché |
| `plan-jugement.md` | 8 Ko | tableau de bord du chantier jugement, avec les prompts de séance |
| `CLAUDE-poste-origine.md` | 8 Ko | le contrat d'origine du dossier, tel qu'il était quand il était privé |

## Ces documents sont datés, pas mis à jour

Ce sont des archives. Plusieurs énoncent des règles qui ne valent plus, et
elles ont été laissées telles quelles plutôt que réécrites.

La plus visible : la méthode de recherche du 20/07/2026 dit « dossier
strictement personnel », « aucune publication, aucun partage », et les méthodes
de jugement et de synthèse parlent d'un verrou de sortie absolu. C'était vrai à
la date où elles ont été écrites. Le dossier a été publié le 01/08/2026 sous
forme de site, puis intégralement en dépôt public en août 2026.

Réécrire ces phrases aurait produit des documents plus lisses et une archive
falsifiée. Un dossier qui prétend à la rigueur documentaire ne retouche pas ses
propres pièces pour se donner raison après coup.

## Ce qui a été modifié avant publication

Par honnêteté, la liste complète. Aucune de ces retouches ne porte sur le fond.

- **Chemins machine et arborescence de travail** : les chemins absolus, le nom
  du dépôt privé d'origine et les renvois à son organisation interne ont été
  remplacés par des chemins relatifs à ce dépôt. Ils n'avaient aucune valeur
  pour un lecteur et exposaient un environnement personnel.
- **Noms d'outillage d'infrastructure** : deux ou trois références à des outils
  de supervision personnels, incompréhensibles hors contexte, ont été
  reformulées en termes neutres.
- **`runs/run-domaine.sh`** : paramétré pour être portable (variables
  d'environnement au lieu de chemins en dur). Sa structure et son prompt sont
  ceux qui ont réellement servi.
- **`research/annexes/2022-07-12-guardian-macron-proud-uber.md`** : une copie
  intégrale de l'article du Guardian avait été conservée en local pendant
  l'instruction. Elle a été réduite aux seuls verbatims cités par la fiche
  correspondante. L'article est protégé par le droit d'auteur : le republier
  entier sous la licence de ce dépôt aurait affirmé une réutilisabilité qui
  n'existe pas.

Rien d'autre. En particulier, aucun contenu factuel, aucune conclusion, aucune
limite reconnue et aucun échec de couverture n'ont été retirés.
