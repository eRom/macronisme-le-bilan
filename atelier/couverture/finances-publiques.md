# Couverture : finances-publiques

Matrice construite le 2026-08-03 (audit D1 + D2). 82 fiches, 63 A, 19 B, 0 C.

## Périmètre (condensé du jugement)

La trajectoire du déficit et de la dette, la consolidation budgétaire et ses
instruments (décret d'annulation, 49.3 budgétaire, loi spéciale), **la
fiscalité**, la dépense publique et son efficacité, la dette sociale
transférée à la Cades, le portefeuille de l'État actionnaire. Transverses
jugés ailleurs : la procédure (`institutions`), le contenu des boucliers
(`sante`, `economie`), les coupes écologiques (`ecologie-energie`), la
trajectoire européenne contraignante (`europe`), l'assurance chômage
(`retraites-social`).

Limites d'entrée : la passe adversariale du run a échoué, plusieurs agrégats
reposent sur des sources parlementaires ou de presse là où la lecture
Légifrance n'a pas été faite (grade B, jamais déterminants seuls), les
communiqués des agences de notation n'ont pas été vérifiés, et aucune série
comparative entre présidences n'existe.

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Trajectoire du déficit et de la dette | partiel | OK | saturé | OK | le socle 2017-2021 tient sur les rappels de séries des publications récentes |
| Instruments de consolidation | — | OK | saturé | saturé | décret d'annulation, 49.3 budgétaire, deux lois spéciales |
| Fiscalité | TROU | TROU | partiel | TROU | FP-01 ; les réformes fiscales fondatrices existent en base sans le slug de ce domaine |
| Dépense publique et efficacité | partiel | OK | OK | partiel | France 2030, décarbonation, impôts de production, aides aux entreprises |
| Dette sociale et Cades | OK | — | OK | OK | transferts de 136 puis 15 Md€ |
| État actionnaire | OK | OK | OK | OK | doctrine inversée, rapport 2024 |
| Traçabilité et contrôle | — | OK | OK | OK | PNRR, cabinets de conseil, Fonds Marianne, lettres-plafonds |
| Instabilité budgétaire et censures | — | — | saturé | saturé | censures, chutes de gouvernement, lois spéciales |
| Finances locales | TROU | TROU | TROU | TROU | FP-02 ; ni contrats de Cahors, ni compensation de la taxe d'habitation, ni dotation globale |
| Défense et sécurité civile (volet financier) | OK | OK | OK | OK | LPM, programme 161, série des crédits |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `saturé`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| FP-01 | T1 | Fiscalité : suppression de l'ISF, prélèvement forfaitaire unique, impôt sur les sociétés à 25 %, taxe d'habitation — sous l'angle des recettes et non de la promesse tenue | P1 | Vérifié : les quatre fiches existent en `base/` mais portent les slugs `promesses` et `economie`, jamais `finances-publiques`. Le domaine juge donc « la fiscalité » de son périmètre sans aucune pièce fiscale | ouvert |
| FP-03 | T5 | Textes à consolider sur Légifrance : LPM 2024-2030, loi spéciale de décembre 2024, loi de finances 2025, budget 2026 promulgué et sa cible de déficit | P1 | Point ouvert de la chronologie ; dix-neuf fiches sont en B pour ce motif | ouvert |
| FP-02 | T1 | Finances locales : contrats de Cahors, compensation de la taxe d'habitation, trajectoire de la dotation globale | P2 | Sous-thème du périmètre (« la dépense publique ») sans aucune fiche | ouvert |
| FP-04 | T5 | Communiqués primaires des agences de notation 2024-2025 | P2 | Point ouvert ; le fait des dégradations est établi, les motifs ne le sont pas | ouvert |
| FP-05 | T2 | Volet judiciaire McKinsey : suites de l'enquête du parquet national financier | P2 | Lacune du run ; aucune URL primaire collectée | ouvert |
| FP-06 | T2 | Commission d'enquête sénatoriale sur la dérive budgétaire (rapport Husson) | P2 | Lacune du run ; fait notoire non sourcé | ouvert |
| FP-07 | T3 | 2017-2021 : quatorze fiches sur quatre-vingt-deux | P2 | Audit D2 ; le déséquilibre est le plus marqué du dossier | ouvert |
| FP-08 | T2 | Chiffrage primaire des boucliers énergie et rapport final du comité Cœuré sur les aides Covid | P3 | Lacune du run ; les ordres de grandeur circulent sans ancrage | ouvert |
| FP-09 | T2 | Consolidation pluriannuelle officielle de l'aide à l'Ukraine | P3 | Lacune du run ; la fiche existante est en B | ouvert |

Note structurelle, à lire avant toute campagne sur ce domaine :

Le run de recherche de ce domaine est le seul du dossier à déclarer **zéro
angle abouti sur vingt-trois** et zéro source. Les quatre-vingt-deux fiches ne
viennent donc pas de lui : elles ont été versées par l'ingestion des autres
domaines et par du sondage manuel. Cela explique à la fois la solidité
apparente (63 fiches en A) et la nature des trous : ce qui manque ici n'est
pas ce qu'un moteur aurait raté, c'est ce qu'aucun autre domaine n'avait de
raison d'apporter — la fiscalité et les finances locales, précisément.

## Signaux en attente (T7, non triés)

Aucun.

## Critère de saturation du domaine

Non saturé pour la v1 :

1. Matrice : deux lignes en TROU, deux en partiel.
2. Aucun P0 ouvert.
3. Deux P1. FP-01 est le trou le plus révélateur de la campagne : il ne se
   comble pas par une recherche mais par l'ajout d'un slug à des fiches
   existantes, conformément à l'invariant « une pièce transverse reste une
   seule fiche ». Il faudra ensuite vérifier si la pièce de jugement, écrite
   sans ces pièces, tient toujours.
