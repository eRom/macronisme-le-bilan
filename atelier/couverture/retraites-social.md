# Couverture : retraites-social

Matrice construite le 2026-08-03 (audit D1 + D2). 35 fiches, 31 A, 4 B, 0 C.
Le domaine le mieux gradé du dossier, et l'un des rares dont le run a convergé
(13 angles, aucun échec).

## Périmètre (condensé du jugement)

Les retraites (architecture, réforme de 2023, suspension), l'assurance chômage
(règles d'indemnisation, gouvernance paritaire, évaluation), les minima
sociaux et le handicap (RSA, AAH, prime d'activité), le grand âge. Transverses
jugés ailleurs : la mécanique parlementaire (`institutions`), le maintien de
l'ordre (`libertes-publiques`), l'affaire du haut-commissaire
(`justice-affaires`), le marché du travail et le pouvoir d'achat (`economie`,
cinq fiches d'assurance chômage portent le double slug), la dette sociale et
la ponction sur le régime paritaire (`finances-publiques`), le volet sanitaire
des EHPAD (`sante`).

Limites d'entrée nommées par le jugement : le congé paternité doublé, décharge
réelle du champ social, n'est fiché nulle part ; aucune pièce ne couvre le
non-recours aux prestations ni les radiations effectives du RSA rénové ; les
suites judiciaires du signalement sur le groupe d'EHPAD n'ont pas été
retrouvées.

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Retraites : architecture et réformes | OK | saturé | OK | saturé | du système à points abandonné à la suspension de 2025 |
| Retraites : effets et niveau de vie | — | OK | OK | OK | emploi des seniors, âge de départ, niveau de vie, erreurs de liquidation |
| Assurance chômage : règles | saturé | OK | OK | saturé | quatre vagues de durcissement, évaluation officielle |
| Assurance chômage : gouvernance paritaire | — | — | OK | partiel | la ponction de l'État est fichée, la gouvernance elle-même peu |
| Minima sociaux (RSA, prime d'activité) | OK | OK | OK | OK | RS-04 ; les radiations effectives manquent |
| Handicap (AAH) | OK | OK | — | partiel | RS-09 ; l'AAH est bien couverte, le reste du champ handicap non |
| Grand âge et dépendance | OK | OK | — | partiel | RS-05 ; loi abandonnée et scandale fichés, suites judiciaires absentes |
| Famille et petite enfance | TROU | TROU | TROU | TROU | RS-01 et RS-02 ; ni congé paternité, ni service public de la petite enfance |
| Non-recours aux prestations | TROU | TROU | TROU | TROU | RS-03 ; nommé par le jugement |
| Année 2017 | TROU | — | — | TROU | aucune fiche du domaine |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| RS-01 | T4 | Congé paternité doublé à 25 jours (LFSS 2021) | P1 | Nommé par le jugement comme décharge réelle du champ social, non fichée faute de source dans le run d'origine. Le même trou est ouvert en `promesses` (PR-03) : une seule fiche, deux slugs, le combler ferme les deux | ouvert |
| RS-02 | T1 | Famille et petite enfance : service public de la petite enfance créé par la loi de 2023, politique familiale | P1 | Sous-thème du champ social sans aucune fiche, alors que le domaine juge « les minima sociaux et le handicap » et le « grand âge » | ouvert |
| RS-03 | T2 | Non-recours aux prestations sociales | P2 | Nommé par le jugement ; l'angle mort classique de toute évaluation de politique sociale | ouvert |
| RS-04 | T2 | Radiations effectives du RSA rénové | P2 | Nommé ; la charge « machine à radier » est écartée faute de pièce, dans un sens comme dans l'autre | ouvert |
| RS-05 | T2 | Suites judiciaires du signalement sur le groupe d'EHPAD | P2 | Nommé ; le même trou est ouvert en `sante` (SA-07) | ouvert |
| RS-06 | T5 | LFSS 2026 : numéro et date exacte à trancher sur Légifrance (le run dit 30/12/2025, la presse relaie une promulgation au 31/12) | P2 | Point ouvert ; l'incertitude tient une fiche de `sante` en grade B | ouvert |
| RS-07 | T5 | Bilan de la déconjugalisation de l'AAH : les 52 600 gagnants viennent d'une lecture associative de données de la caisse, non d'une publication autonome | P2 | Point ouvert ; le chiffre borne une décharge | ouvert |
| RS-08 | T3 | Année 2017 sans fiche | P2 | Audit D2 | ouvert |
| RS-09 | T1 | Handicap hors AAH : accessibilité, conférence nationale du handicap | P3 | Audit D1 ; sous-thème nommé au périmètre, couvert par une seule prestation | ouvert |

Notes de clôture hors file :

- La réserve sur l'évaluation du RSA rénové (URL derrière un portail à
  vérification humaine) a été levée le 31/07/2026 : la page est vivante et le
  rapport accessible en source primaire. Rien à rouvrir.
- Deux causalités sont explicitement interdites par les garde-fous : imputer
  la progression de l'emploi des seniors à la réforme de 2023, et chiffrer le
  report des fins de droit vers les minima. Ce sont des limites de preuve,
  pas des trous à combler.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1, mais c'est le domaine le plus sain du dossier :

1. Matrice : trois lignes en TROU, quatre en partiel.
2. Aucun P0 ouvert. Aucune fiche C, quatre fiches B seulement.
3. Deux P1, dont RS-01 qui est une décharge absente et se partage avec
   `promesses`. C'est le meilleur rapport coût-bénéfice de toute la campagne :
   une fiche à écrire, deux domaines servis, et elle joue à décharge.
