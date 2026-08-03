# Couverture : education-recherche

Matrice construite le 2026-08-03 (audit D1 + D2). Domaine pilote « mince »
du format : 23 fiches, le plus petit corpus actif du dossier.

## Périmètre (condensé du jugement)

École primaire et secondaire, lycée et baccalauréat, voie professionnelle,
accès à l'enseignement supérieur, condition étudiante, recherche publique et
sa programmation budgétaire. Les pièces transverses sont jugées ici sous leur
seul angle éducatif (l'agrégat budgétaire en `finances-publiques`, l'abaya en
`libertes-publiques`, le respect des engagements en `promesses`).

Le jugement nomme lui-même quatre trous : acquis des élèves (PISA, TIMSS),
harcèlement scolaire, mixité sociale et privé sous contrat, autonomie et
financement des universités. Il s'interdit en conséquence tout verdict sur
« le niveau scolaire ».

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| École primaire (dédoublement, méthode, évaluations) | OK | OK | partiel | OK | dédoublement suivi jusqu'en 2025 par sa date de fin |
| Collège (choc des savoirs, temps d'enseignement) | TROU | OK | OK | partiel | premier quinquennat quasi vide sur le collège |
| Lycée et baccalauréat | OK | OK | — | OK | effet sur la valeur du diplôme non mesuré (aucune source de niveau, voir ER-02) |
| Voie professionnelle | TROU | OK | — | partiel | transformation 2018-2019 absente (ER-07) |
| Métier enseignant (recrutement, rémunération) | partiel | OK | OK | partiel | formation initiale INSPE / concours en M2 absente (ER-06) |
| Accès au supérieur (Parcoursup, ORE, Mon Master) | OK | OK | OK | saturé | trois périodes couvertes, charges et décharges des deux côtés |
| Condition étudiante | OK | partiel | TROU | partiel | réforme des bourses 2023 absente (ER-08), rien après 2023 |
| Recherche publique (LPR et exécution) | OK | OK | OK | OK | annulations 2017 citées en limite de charge sans fiche dédiée, assumé |
| École inclusive (AESH) | TROU | OK | — | partiel | rien avant 2022 alors que le cadre AESH naît en 2019 (ER-01) |
| Acquis des élèves (PISA, TIMSS, niveau) | TROU | TROU | TROU | TROU | ER-02 ; trou nommé par le jugement |
| Mixité sociale, privé sous contrat | TROU | TROU | TROU | TROU | ER-05 ; trou nommé par le jugement |
| Harcèlement scolaire | TROU | TROU | TROU | TROU | ER-04 ; trou nommé par le jugement |
| Covid : écoles et continuité pédagogique | TROU | — | — | TROU | ER-03 ; décharge potentielle absente |
| Laïcité à l'école (abaya) | — | OK | — | OK | grief de fond jugé en `libertes-publiques` |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `abandonné` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| ER-01 | T1 | Loi « école de la confiance » (2019) : instruction à 3 ans, INSPE, cadre AESH | P1 | 2019 = zéro fiche (audit D2) ; loi structurante du canon externe | ouvert |
| ER-02 | T1 | Acquis des élèves : PISA 2022 (publication 2023), évaluations de niveau | P1 | Trou nommé par le jugement ; le choc des savoirs en découle sans que la cause soit au dossier | ouvert |
| ER-03 | T4 | Covid : écoles maintenues ouvertes 2020-2021, continuité pédagogique | P1 | Passe adversariale ; décharge potentielle absente, à chercher d'abord | ouvert |
| ER-04 | T1 | Harcèlement scolaire : plan pHARe, loi de 2022, séquence 2023 | P2 | Trou nommé par le jugement | ouvert |
| ER-05 | T1 | Mixité sociale et privé sous contrat : protocole 2023 abandonné, financement | P2 | Trou nommé par le jugement | ouvert |
| ER-06 | T1 | Réforme de la formation des enseignants (INSPE, concours en M2, 2019-2021) | P2 | Sous-thème métier enseignant incomplet ; fusion possible avec ER-01 selon découpage | ouvert |
| ER-07 | T1 | Transformation de la voie professionnelle 2018-2019 | P2 | Ligne voie pro vide avant 2023 | ouvert |
| ER-08 | T2 | Réforme des bourses étudiantes 2023, précarité étudiante | P2 | Sous-thème condition étudiante partiel | ouvert |
| ER-09 | T3 | Fin de période : novembre 2024 → juillet 2026, une seule fiche d'entrée | P2 | Limite déclarée du jugement + audit D2 (2026 = 0) | ouvert |
| ER-10 | T2 | Universités : autonomie et financement hors dépense par étudiant | P3 | Trou nommé par le jugement | ouvert |

Notes de clôture hors file :

- SNU : couvert par `base/2025-09-19-extinction-snu.md` (domaine `promesses`),
  enrichi lors du run du 24/07/2026. Hors périmètre éducatif strict, pas un
  trou de ce domaine.
- Écart d'ingestion 20 → 23 fiches : le run du 24/07/2026 a versé 20 fiches ;
  trois fiches d'autres séances portent aussi le slug. Comptes cohérents entre
  le grep de `base/` et le périmètre du jugement (23).
- Le rapport de recherche ne nomme pas ses 14 angles individuellement
  (0 déclaré échoué) : la reconstruction par angles est impossible pour ce
  domaine, la matrice s'appuie sur le jugement, la chronologie et le canon
  externe.
- Red-team du run partielle (environ un tiers des claims non contredits
  activement, quota saturé) : prudence marginale supérieure déjà actée par le
  jugement, rien à rouvrir tant qu'aucun de ces claims ne porte une charge
  seule.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1 :

1. Matrice : quatre lignes en TROU (acquis des élèves, mixité, harcèlement,
   Covid), quatre en partiel.
2. Aucun P0 ouvert (aucune charge du jugement ne repose sur une pièce fausse
   ou morte).
3. Trois P1 ouverts (ER-01, ER-02, ER-03) : le domaine attend une campagne de
   couverture avant toute déclaration de saturation.
