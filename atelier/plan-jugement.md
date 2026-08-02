# Plan de la couche jugement

> Tableau de bord du chantier, créé le 31/07/2026. Une ligne par pièce. À chaque
> verdict rendu : mettre à jour cette table ET la colonne « Jugement » de
> `chronologie.md`, dans le même geste de fin de séance (méthode §8). L'ordre
> des séances est choisi par Romain en début de séance. Les volumes de fiches
> par slug datent du pointage du 31/07/2026 (socle clos, multi-tagging compris :
> une fiche transverse compte dans chacun de ses domaines).

| # | Domaine | Fiches au 31/07 | Jugement | Verdict |
|---|---------|-----------------|----------|---------|
| 1 | finances-publiques | 82 | ✔ 2026-07-31 | [défavorable](finances-publiques.md) |
| 2 | promesses | 57 | ✔ 2026-07-31 | [mitigé](promesses.md) |
| 3 | justice-affaires | 53 | ✔ 2026-07-31 | [défavorable](justice-affaires.md) |
| 4 | libertes-publiques | 62 | ✔ 2026-07-31 | [défavorable](libertes-publiques.md) |
| 5 | sante | 63 | ✔ 2026-07-31 | [défavorable](sante.md) |
| 6 | retraites-social | 35 | ✔ 2026-07-31 | [défavorable](retraites-social.md) |
| 7 | economie | 47 | ✔ 2026-07-31 | [défavorable](economie.md) |
| 8 | securite-immigration | 33 | ✔ 2026-07-31 | [défavorable](securite-immigration.md) |
| 9 | ecologie-energie | 95 | ✔ 2026-07-31 | [défavorable](ecologie-energie.md) |
| 10 | education-recherche | 23 | ✔ 2026-07-31 | [défavorable](education-recherche.md) |
| 11 | international | 27 | ✔ 2026-07-31 | [mitigé](international.md) |
| 12 | institutions | 82 | ✔ 2026-07-31 | [défavorable](institutions.md) |
| 13 | europe | 79 | ✔ 2026-07-31 | [défavorable](europe.md) |
| 14 | industrie | 69 | ✔ 2026-07-31 | [défavorable](industrie.md) |
| 15 | securite-civile | 42 | ✔ 2026-07-31 | [défavorable](securite-civile.md) |
| S | synthèse faîtière | les 15 pièces | ✔ 2026-07-31 | [défavorable](synthese.md) |

## Prompt de séance (reprise à froid, après /clear ou /compact)

Choisir un domaine dans la table, remplacer `<slug>` (quatre occurrences, dont
celle du message de commit à l'étape 5), coller tel quel :

```
Séance de jugement du poste politique, domaine : <slug>.

Suis politique/methode-jugement.md à la lettre (déroulé §8) :
1. Lis la méthode en entier, puis jugement/institutions.md comme
   référence de format (moule validé le 31/07/2026).
2. Liste les fiches du domaine (grep "^domaines:.*<slug>" base/*.md)
   et lis-les TOUTES, ainsi que la section « À re-vérifier » du domaine dans
   chronologie.md. Jamais de résumés, pas de subagent sur le fond.
3. Dresse les candidates charges et décharges, passe chacune au test de
   contradiction (§6), applique les garde-fous et retournements du §7.
4. Rédige jugement/<slug>.md selon l'anatomie §3, verdict sur
   l'échelle §4, wikilinks partout, puis contrôle mécanique : zéro wikilink
   mort.
5. Mets à jour atelier/plan-jugement.md et la colonne « Jugement » de chronologie.md,
   committe (politique: jugement <slug> (<verdict>)).
6. Termine par un récap : la balance, le verdict motivé, ce qui a été écarté,
   et attends ma validation.
```

## Prompt de séance synthèse (reprise à froid)

À coller tel quel une fois les 15 pièces rendues :

```
Séance de synthèse faîtière du poste politique.

Suis methodes/methode-synthese à la lettre (déroulé §8) :
1. Lis la méthode en entier, puis methode-jugement.md §4 à §7 (échelle, grades,
   test de contradiction, garde-fous et retournements).
2. Lis les 15 pièces de jugement/ EN ENTIER, dans l'ordre de la grille
   v0. Jamais de résumés, pas de subagent sur le fond ; fiches de base/ en
   sondage ciblé seulement.
3. Dresse les candidats fils transverses (charge et décharge), passe chacun au
   test de contradiction (§6 : double comptage, instruction nouvelle, série
   comparative, meilleur contre-récit).
4. Rédige jugement/synthese.md selon l'anatomie §4 : périmètre et
   limites, table des 15 verdicts, fils à charge, fils à décharge, écartés,
   verdict d'ensemble sur l'échelle commune avec portée 2027 en grille de
   lecture. Contrôle mécanique : zéro wikilink mort.
5. Mets à jour la ligne S de atelier/plan-jugement.md, committe
   (politique: jugement synthese (<verdict>)).
6. Termine par un récap : fils retenus et écartés, balance, verdict motivé,
   et attends ma validation.
```
