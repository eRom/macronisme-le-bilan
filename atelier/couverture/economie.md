# Couverture : economie

Matrice construite le 2026-08-03 (audit D1 + D2). 47 fiches, 37 A, 9 B, 1 C.
Run convergé (11 angles, aucun échec), confiance déclarée haute.

## Périmètre (condensé du jugement)

La fiscalité des ménages et du capital, le droit du travail et les règles
d'indemnisation vus comme instruments de politique de l'emploi, la trajectoire
de l'emploi et du chômage, le revenu et le pouvoir d'achat, la pauvreté et les
inégalités, la compétitivité extérieure, la gestion économique des deux chocs
de la période. Sept fiches du domaine ne sont pas pesées ici, leur angle
déterminant appartenant à un domaine voisin déjà jugé.

Limite d'entrée décisive, énoncée par le jugement lui-même : **le dossier ne
contient aucun contrefactuel et aucune comparaison européenne** du chômage, du
pouvoir d'achat ou de la pauvreté. Toute affirmation en « grâce à » ou « à
cause de » la politique menée, dans un sens comme dans l'autre, est
inconstructible en l'état. Le jugement nomme en outre sept pans entiers sans
aucune fiche.

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Fiscalité des ménages et du capital | saturé | OK | OK | saturé | les réformes de 2017 et leur évaluation officielle |
| Droit du travail | OK | OK | — | OK | ordonnances, barème d'indemnités, comité social et économique |
| Assurance chômage (angle emploi) | OK | OK | OK | saturé | quatre vagues et l'évaluation du résultat |
| Emploi et chômage : trajectoire | OK | OK | OK | OK | du creux de 2023 à la remontée, avec ses garde-fous d'interprétation |
| Revenu et pouvoir d'achat | OK | OK | OK | OK | prime, indemnité inflation, revalorisations, dents de scie du revenu |
| Pauvreté et inégalités | — | OK | OK | OK | record de 2024, redistribution mesurée |
| Compétitivité extérieure | — | OK | OK | OK | du record de déficit de 2022 au redressement partiel |
| Gestion des deux chocs | OK | OK | — | OK | quoi qu'il en coûte, boucliers, sinistralité mesurée |
| Croissance et productivité | TROU | TROU | TROU | TROU | EC-01 ; nommé par le jugement, aucun pan plus central |
| Investissement des entreprises et CICE | TROU | TROU | TROU | TROU | EC-02 ; la plus grosse dépense fiscale de la période n'a pas de fiche |
| Logement | TROU | TROU | TROU | TROU | EC-03 ; nommé, y compris la baisse des aides personnelles de 2017 |
| Inflation alimentaire | — | TROU | TROU | TROU | EC-04 ; nommé |
| Contrefactuels et comparaisons européennes | TROU | TROU | TROU | TROU | EC-05 ; limite structurelle qui plafonne tout le domaine |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| EC-05 | T3 | Aucun contrefactuel ni comparaison européenne du chômage, du pouvoir d'achat ou de la pauvreté | P1 | Nommé par le jugement comme rendant inconstructible toute affirmation causale, à charge comme à décharge. Ce n'est pas un trou de pièce mais un trou de méthode : il plafonne ce que le domaine pourra jamais dire | ouvert |
| EC-01 | T1 | Croissance, croissance potentielle, productivité | P1 | Nommé ; le domaine juge l'économie sans aucune pièce de croissance | ouvert |
| EC-02 | T1 | CICE et sa transformation en baisse pérenne de cotisations (2019) | P1 | Nommé. Croise le trou du crédit d'impôt recherche en `industrie` (IND-01) : les deux plus grosses dépenses fiscales de la période sont absentes du dossier | ouvert |
| EC-03 | T1 | Logement : crise de la construction, encadrement des loyers, baisse des aides personnelles de 2017 | P2 | Nommé ; la baisse de 5 € des aides au logement est l'une des mesures les plus commentées du début de mandat | ouvert |
| EC-06 | T5 | URL France Stratégie mortes : les deux rapports du comité d'évaluation de la fiscalité du capital renvoient une erreur après migration de domaine | P2 | Point ouvert. Mode de défaillance distinct de l'identifiant fabriqué : ici l'URL était bonne et le serveur a bougé. Détectable mécaniquement par sondage, pas par vraisemblance | ouvert |
| EC-04 | T1 | Inflation alimentaire 2022-2023 et dispositifs de modération | P2 | Nommé | ouvert |
| EC-07 | T4 | Verbatim officiel de l'abandon de l'objectif de plein emploi | P2 | Point ouvert ; l'aveu ministériel repose sur une source de presse audiovisuelle unique, seul le chiffre qui l'accompagne est en A | ouvert |
| EC-08 | T2 | Effet de substitution entre prime et salaire, jamais chiffré | P3 | Lacune du run ; le gain net de pouvoir d'achat pourrait être surestimé, dans les deux sens | ouvert |
| EC-09 | T2 | Investissement des entreprises | P3 | Nommé | ouvert |

Notes de clôture hors file :

- Deux séries de dividendes coexistent dans le dossier (14 à 23 Md€ d'un côté,
  29,8 à 37,1 de l'autre) : périmètres de mesure différents, elles ne se
  fusionnent pas. Ce n'est pas une contradiction à résoudre mais une
  précaution à maintenir.
- La statistique de valeur ajoutée manufacturière comparée est interdite de
  citation, sa série n'ayant pas été identifiée. Garde-fou acquis.
- La CVAE n'a volontairement pas de fiche : le trou est tenu en `promesses`
  (PR-01), où le statut de l'engagement en dépend.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1, et c'est le domaine dont les trous sont les plus
structurants :

1. Matrice : cinq lignes en TROU, aucune en partiel — le domaine est soit
   bien couvert, soit pas couvert du tout, sans zone grise.
2. Aucun P0 ouvert.
3. Trois P1. EC-05 est d'une nature particulière : aucune recherche ne le
   comble en versant des pièces, il faut construire des comparaisons. Tant
   qu'il est ouvert, le domaine ne peut décrire que des trajectoires, jamais
   les imputer.
