# Couverture du corpus

Matrices de couverture par domaine : ce que le dossier prétend couvrir (le
périmètre déclaré), ce qu'il couvre réellement (les fiches de `base/`), et
les trous nommés en file d'attente. Le procédé complet — typologie des trous,
canon de notabilité, priorisation, critères d'arrêt — est dans
[`../methodes/methode-exhaustivite.md`](../methodes/methode-exhaustivite.md).

Rien ici ne fait foi. C'est la couche d'inventaire de l'atelier : un trou
nommé n'est ni une fiche ni une promesse de fiche, et il n'entre dans `base/`
que par le chemin de la méthode (rattrapage ciblé, sondage de chaque URL,
grade).

## Index

Les quinze matrices ont été construites le 03/08/2026 par inventaire passif :
lecture des pièces de jugement, de la chronologie de travail et des rapports
de recherche bruts, plus l'audit mécanique de `base/`. Aucune recherche
nouvelle, aucun moteur sollicité.

| # | Domaine | Fiches | Matrice | P0 | P1 | Dernier audit D1 |
|---|---------|--------|---------|----|----|------------------|
| 1 | finances-publiques | 82 | [✔](finances-publiques.md) | 0 | 2 | 2026-08-03 |
| 2 | promesses | 57 | [✔](promesses.md) | 0 | 3 (+1 veille) | 2026-08-03 |
| 3 | justice-affaires | 54 | [✔](justice-affaires.md) | 1 clos | 1 (+1 veille) | 2026-08-03 |
| 4 | libertes-publiques | 62 | [✔](libertes-publiques.md) | 1 clos | 3 | 2026-08-03 |
| 5 | sante | 63 | [✔](sante.md) | 0 | 3 | 2026-08-03 |
| 6 | retraites-social | 35 | [✔](retraites-social.md) | 0 | 2 | 2026-08-03 |
| 7 | economie | 47 | [✔](economie.md) | 0 | 3 | 2026-08-03 |
| 8 | securite-immigration | 33 | [✔](securite-immigration.md) | 0 | 2 | 2026-08-03 |
| 9 | ecologie-energie | 96 | [✔](ecologie-energie.md) | 0 | 0 (+1 veille) | 2026-08-03 |
| 10 | education-recherche | 25 | [✔](education-recherche.md) | 0 | 1 | 2026-08-03 |
| 11 | international | 27 | [✔](international.md) | 0 | 1 à trancher | 2026-08-03 |
| 12 | institutions | 84 | [✔](institutions.md) | 0 | 2 | 2026-08-03 |
| 13 | europe | 79 | [✔](europe.md) | 0 | 2 | 2026-08-03 |
| 14 | industrie | 70 | [✔](industrie.md) | 0 | 2 | 2026-08-03 |
| 15 | securite-civile | 42 | [✔](securite-civile.md) | 0 | 2 | 2026-08-03 |

Deux P0 ont été découverts et clos le jour même, tous deux du même mode de
défaillance : un identifiant Légifrance fabriqué, cité en source par une fiche
elle-même citée par une pièce de jugement.

## Priorités globales

Les trous nommés se rangent en six familles. L'ordre ci-dessous est celui de
la valeur, pas celui du volume.

**1. L'intégrité des sources, avant tout ajout.** C'est la découverte de la
campagne : sur deux fiches sondées au hasard des signaux, trois identifiants
Légifrance se sont révélés fabriqués, renvoyant une page « Pas de contenu
disponible » qui ressemble à un succès. Les files concernées existent dans
presque tous les domaines (`libertes-publiques` LP-04, `institutions` IN-02,
`securite-immigration` SI-01, `justice-affaires` JA-02 et JA-08, `industrie`
IND-03, `finances-publiques` FP-03, `promesses` PR-05, `economie` EC-06,
`sante` SA-01). Le domaine `sante` est le plus exposé : son propre rapport de
recherche déclare qu'environ la moitié des liens qu'il a sondés étaient morts
ou fabriqués. `atelier/audit-identifiants.ts` réduit la file à sonder mais ne
la supprime pas, et sa limite est démontrée (voir l'en-tête du script).

**2. Les deux plus grosses dépenses fiscales de la période sont absentes.**
Le crédit d'impôt recherche (`industrie` IND-01) et le CICE devenu baisse
pérenne de cotisations (`economie` EC-02) n'ont aucune fiche. Or `industrie`
porte une charge centrale sur la dépense sans effet mesuré : elle est amputée
de son plus gros poste.

**3. Les décharges absentes.** Une campagne qui n'ajoute que des charges
déséquilibre le dossier. Sont nommées manquantes : le congé paternité doublé
(`retraites-social` RS-01 et `promesses` PR-03, une fiche pour deux domaines),
les écoles maintenues ouvertes pendant la crise sanitaire
(`education-recherche` ER-03), le bilan officiel du 100 % Santé (`sante`
SA-05), le débat sur les recettes de cession de la Française des jeux
(`industrie` IND-06), le bilan critique de la présidence française de 2022
(`europe` EU-05).

**4. Les trous structurels de sous-thème.** Par ordre de gravité : la loi de
2019 sur les manifestations et les dissolutions d'associations
(`libertes-publiques` LP-01, LP-02), la Nouvelle-Calédonie institutionnelle
(`institutions` IN-01, croisant `libertes-publiques` LP-03), les onze vaccins
obligatoires et la séquence des urgences de l'été 2022 (`sante` SA-02, SA-03),
les crises autres que les feux (`securite-civile` SC-02), la famille et la
petite enfance (`retraites-social` RS-02), la croissance et le logement
(`economie` EC-01, EC-03).

**5. Ce qui se répare par un slug, pas par une recherche.** `finances-publiques`
juge « la fiscalité » de son périmètre sans aucune pièce fiscale : les quatre
réformes de 2017 existent en base sous d'autres slugs (FP-01). L'invariant
« une pièce transverse reste une seule fiche » impose d'ajouter le slug, pas
d'écrire des doublons. C'est le trou le moins cher du dossier.

**6. Quatre questions de périmètre à trancher avant toute recherche.** Le
terrorisme et la réponse antiterroriste (`securite-immigration` SI-02), les
relations bilatérales hors Ukraine et Sahel (`international` IT-01), le statut
du parquet (`justice-affaires` JA-07), les contentieux de santé publique
largement antérieurs à 2017 (`sante` SA-10). Aucune de ces quatre ne se
résout en cherchant : elles se résolvent en décidant, et en écrivant la
décision dans `METHODE.md`.

**En veille, sans action possible aujourd'hui** : les procédures judiciaires
pendantes (`justice-affaires` JA-01, la file la plus dense du dossier), la
décision constitutionnelle sur la loi fin de vie (`promesses` PR-02) et celle
sur la loi d'urgence agricole (`ecologie-energie` EE-04).

## File des signaux

Les signaux non triés (X, presse, lecteurs) atterrissent dans
[`signaux.md`](signaux.md) avec URL, date et une ligne de contexte, jamais
directement dans une matrice. Le tri passe par le canon de notabilité de la
méthode (deux critères minimum, croisement avec un sous-thème de matrice).
