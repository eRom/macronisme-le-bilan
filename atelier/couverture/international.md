# Couverture : international

Matrice construite le 2026-08-03 (audit D1 + D2). 27 fiches, 20 A, 7 B, 0 C.
Le plus petit corpus du dossier, et le seul instruit par un autre moteur de
recherche, après réouverture du domaine le 31/07/2026.

## Périmètre (condensé du jugement)

La politique étrangère et de défense de la France, assumée dans le périmètre
de la grille v0. Transverses jugés ailleurs : le contenu budgétaire de la loi
de programmation militaire et de l'aide à l'Ukraine (`finances-publiques`),
l'angle parlementaire (`institutions`), le volet pénal des révélations sur le
lobbying (`justice-affaires`), la doctrine européenne d'autonomie stratégique
(`europe`).

Trois limites de périmètre, dites d'entrée et jamais tues : les relations
bilatérales hors Ukraine et Sahel ne sont pas couvertes (le domaine n'est pas
un bilan exhaustif de la diplomatie) ; les paquets de sanctions européens un
par un relèvent du niveau européen ; le total consolidé de l'aide à l'Ukraine
ne se raccorde pas aux agrégats internationaux, divergence documentée et non
tranchée.

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Russie : dialogue puis rupture | saturé | OK | — | OK | de la réception de 2017 à la médiation de la dernière chance |
| Ukraine : aide, accord, coalition | — | OK | OK | OK | IT-05 ; le total consolidé de l'aide reste non raccordé |
| Sahel : opération et retraits | OK | saturé | — | saturé | du renforcement de 2020 aux départs successifs |
| Exportations d'armement et contrôle | OK | OK | partiel | partiel | IT-03 et IT-04 ; contentieux non fiché, volumes récents non couverts |
| Ingérences étrangères | — | — | OK | OK | avec le garde-fou : l'effet sur le vote n'est jamais quantifié |
| Défense : programmation et effort | OK | OK | OK | OK | 2 % du PIB atteints, loi de programmation |
| OTAN et autonomie stratégique | OK | — | OK | partiel | la formule de 2019 et ses traductions récentes |
| Aide publique au développement | TROU | TROU | TROU | TROU | IT-02 ; la loi de 2021 et la trajectoire des 0,7 % n'ont aucune fiche |
| Relations bilatérales hors Ukraine et Sahel | hors-périmètre | hors-périmètre | hors-périmètre | à trancher | IT-01 ; Chine, Proche-Orient, AUKUS, Algérie-Maroc, Arménie |
| Diplomatie climatique et environnementale | TROU | TROU | TROU | TROU | IT-09 ; aucun sommet ni accord fiché sous ce domaine |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `à trancher` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| IT-01 | T1 | Relations bilatérales hors Ukraine et Sahel : Chine, Proche-Orient, AUKUS, Algérie et Maroc, Arménie | P1 | Déclaré hors périmètre de la grille v0 par le jugement lui-même. Ce n'est pas un oubli mais une décision à assumer : soit le périmètre s'élargit et c'est une campagne lourde, soit `METHODE.md` dit clairement que le domaine ne prétend pas au bilan diplomatique | à trancher |
| IT-02 | T1 | Aide publique au développement : loi de programmation de 2021, trajectoire des 0,7 % du revenu national | P2 | Audit D1 ; pan de la politique étrangère sans aucune fiche | ouvert |
| IT-03 | T2 | Décision du Conseil d'État du 27/01/2023 sur les exportations vers l'Arabie saoudite et les Émirats, et contentieux associés | P2 | Point ouvert ; URL testée en erreur par le run, jamais reprise | ouvert |
| IT-04 | T2 | Volumes d'exportations d'armement 2025-2026 | P2 | Aucun rapport au Parlement ne les couvre encore : limite du réel plus que de la couverture | ouvert |
| IT-05 | T2 | Total consolidé de l'aide française à l'Ukraine, et raccordement aux agrégats internationaux | P2 | Divergence documentée et non tranchée ; elle borne une charge | ouvert |
| IT-09 | T1 | Diplomatie climatique et environnementale : sommets et initiatives | P3 | Audit D1 ; l'angle est peut-être porté par `ecologie-energie`, à vérifier avant toute recherche | ouvert |
| IT-06 | T2 | Date au jour près de la fin du désengagement du Niger | P3 | Point ouvert ; seul l'état au 11/12/2023 est sourcé | ouvert |
| IT-07 | T2 | Bilan d'exécution des engagements du sommet de 2019 en format Normandie | P3 | Aucun document primaire unique ne le consolide | ouvert |
| IT-08 | T2 | Arrêtés individuels de gel des avoirs visant des personnes liées à la Russie | P3 | Mécanisme confirmé, contenu des arrêtés non ouvert (blocage du portail) | ouvert |

Notes de clôture hors file, à préserver :

- Ce domaine est le seul instruit par un moteur de recherche différent, et le
  contraste est documenté sur pièces : sourcing quasi exclusivement primaire,
  refus de citer les identifiants non ouverts, **zéro référence fabriquée
  détectée au re-sondage intégral des deux rapports**. Contrepartie assumée :
  un corpus deux à trois fois plus mince. Ce constat vaut plus que le domaine
  lui-même, il documente ce qu'un moteur fait de ses sources.
- Deux sources sont archivées localement parce que leur récupération
  automatique est bloquée : ne pas retenter le fetch, vérifier sur les copies.
- Deux garde-fous d'interprétation à ne jamais lâcher : les révélations sur le
  lobbying d'une entreprise privée ne sont pas une ingérence d'État, et
  l'impact électoral des opérations d'influence n'est pas quantifié — le
  service de l'État qui les documente le dit lui-même.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1 :

1. Matrice : deux lignes en TROU, deux en partiel, une explicitement à
   trancher au périmètre.
2. Aucun P0 ouvert. Aucune fiche C.
3. Un P1, qui n'est pas une recherche mais une décision : ce domaine
   dit-il « la politique étrangère de la France » ou « la politique étrangère
   de la France sur l'Ukraine et le Sahel » ? Tant que la réponse n'est pas
   écrite dans la méthode publique, le titre du domaine promet plus que son
   contenu.
