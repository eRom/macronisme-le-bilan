# Couverture : europe

Matrice construite le 2026-08-03 (audit D1 + D2). 79 fiches, 67 A, 12 B, 0 C.

## Périmètre (condensé du jugement)

La doctrine européenne proclamée (les deux discours de la Sorbonne) et son
sort, l'influence de la France dans les institutions de l'Union, le rapport de
l'exécutif à la norme et au juge européens, la présidence française de 2022,
la politique commerciale commune, la position budgétaire de la France vue de
Bruxelles et l'usage des fonds européens. Le domaine honore trois mandats de
renvoi reçus d'`institutions`, `securite-immigration` et `industrie`.

Limites d'entrée : le run n'a pas convergé (11 angles sur 31 ont échoué, dont
des angles primaires — le corpus est amputé sur des sujets entiers, pas
seulement fragile sur ses références). Le jugement énonce qu'il ne juge pas la
politique européenne complète mais son versant intérieur et institutionnel.
Particularité du domaine : la couverture du premier mandat est ici
substantielle, le déséquilibre est thématique et non temporel.

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Doctrine de la Sorbonne et son sort | saturé | OK | OK | saturé | chaque annonce de 2017 est suivie pièce par pièce |
| Influence dans les institutions | OK | OK | OK | partiel | EU-03 ; Frontex après la démission de son directeur français n'est pas suivi |
| Rapport à la norme et au juge européens | OK | OK | OK | partiel | EU-02 ; le dossier nitrates a été écarté, ses références s'étant révélées fausses |
| Présidence française de 2022 | — | OK | — | partiel | EU-05 ; seul le volet coût est documenté, aucun bilan critique |
| Politique commerciale commune | OK | OK | OK | saturé | CETA, Mercosur, Turnberry |
| Position budgétaire vue de Bruxelles | partiel | OK | saturé | OK | procédure pour déficit excessif, trajectoire contraignante, budget 2026 conforme |
| Fonds européens et PNRR | OK | OK | OK | partiel | EU-04 ; cinquième tranche et clôture de la facilité non documentées |
| Défense européenne | partiel | partiel | OK | OK | SAFE, EDIP, MGCS, dissuasion élargie |
| Green Deal et votes au Conseil | — | — | partiel | partiel | EU-01 ; les votes nominatifs de la France ne sont pas documentés |
| Démocratie européenne | OK | OK | OK | saturé | consultations citoyennes, article 88-4, aucun référendum en deux mandats |
| Compétitivité et suites Draghi | — | — | partiel | partiel | EU-06 ; le diagnostic est fiché, les suites concrètes non |
| Années 2020-2021 | TROU | — | — | TROU | trois fiches pour deux ans, creux de la période Covid |
| Sanctions russes et Ukraine | hors-périmètre | hors-périmètre | hors-périmètre | hors-périmètre | soldé le 31/07/2026 par la réouverture d'`international` ; les paquets de sanctions un par un restent assumés hors dossier |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| EU-01 | T2 | Votes nominatifs de la France au Conseil : paquet omnibus, CSDDD révisée, report d'ETS2 | P1 | Écarté du jugement faute de documentation, et écarté aussi par `ecologie-energie` (EE-09). Le documenter tranche dans un sens ou dans l'autre une affirmation que deux domaines s'interdisent | ouvert |
| EU-02 | T2 | Contentieux nitrates à reconstruire depuis les sources juridictionnelles, et confirmation formelle de l'absence de sanction pécuniaire au titre de l'article 260 | P1 | Le run donnait une référence d'affaire fausse (une procédure autrichienne servie pour une condamnation française) ; le dossier a été écarté à l'ingestion et n'a jamais été refait | ouvert |
| EU-03 | T2 | Frontex après la démission de son directeur français : gouvernance, rapport d'enquête resté non publié | P2 | Lacune nommée ; angle échoué | ouvert |
| EU-04 | T2 | Cinquième tranche du PNRR et clôture de la facilité en 2026 | P2 | Lacune nommée ; la décharge principale du domaine s'arrête à la quatrième tranche | ouvert |
| EU-05 | T4 | Bilan critique de la présidence française de 2022 par la Cour des comptes ou les commissions des affaires européennes | P2 | Lacune nommée ; la décharge repose sur une seule source parlementaire | ouvert |
| EU-06 | T2 | Suites concrètes du rapport Draghi : boussole pour la compétitivité du 28/01/2025 | P2 | Lacune nommée | ouvert |
| EU-07 | T3 | Années 2020-2021 : trois fiches | P2 | Audit D2 | ouvert |
| EU-08 | T2 | Données Eurostat sur la part du gaz russe et le règlement d'interdiction du GNL | P3 | Angle échoué ; les chiffres actuels viennent de sources de niveau domaine, d'où deux fiches en B | ouvert |

Notes de clôture hors file, à ne pas rouvrir :

- Deux pièges d'interprétation sont tenus par des fiches de garde-fou et ne
  doivent jamais être présentés autrement : l'arrêt du Tribunal de l'Union sur
  les contrats vaccins porte sur l'accès aux documents et non sur leur
  légalité ; les 40 M€ d'astreintes sur la qualité de l'air ont été prononcés
  par le juge administratif français, pas par la Cour de justice.
- Le run avait servi un identifiant de plage 2024 pour la loi de finances
  2026 : corrigé à l'ingestion. C'est la deuxième occurrence documentée du
  mode de défaillance qui a produit le P0 du 03/08/2026 sur une autre fiche.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1 :

1. Matrice : une ligne en TROU, six en partiel, une explicitement hors
   périmètre et assumée comme telle.
2. Aucun P0 ouvert.
3. Deux P1, tous deux de même nature : des affirmations que le jugement
   s'interdit faute de documentation, et qui basculeraient en charge ou en
   décharge si elles étaient documentées. C'est le domaine où combler un trou
   a le plus de chances de changer quelque chose au verdict.
