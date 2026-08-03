# Références officielles fabriquées : inventaire du 03/08/2026

> Document de travail. Ne fait pas foi : il recense un défaut à réparer,
> il ne corrige rien. Chaque ligne se solde par l'ouverture du vrai texte.

## Ce qui a été mesuré

`bun run atelier/audit-sources.ts` a ouvert une par une les 887 sources
distinctes citées par les 534 fiches. Résultat : **84 références répondent
HTTP 200 en affichant la page d'erreur du portail**. Elles ont l'apparence
d'une référence valide et ne mènent à aucun texte. 67 fiches sont touchées,
dans 11 domaines.

S'y ajoutent, dans un registre moins grave et traité séparément, 264 sources
mortes (adresses de portails qui ont bougé) et 15 déplacées.

## Pourquoi « fabriquées » et non « périmées »

Trois hypothèses plus bénignes ont été testées et écartées : erreur de chemin
(les identifiants échouent aussi sur les routes alternatives du portail),
rendu JavaScript (le message d'erreur est bien servi dans le HTML), blocage
anti-robot (détecté à part par l'outil, verdict BLOQUEE). Un identifiant qui
ne résout sur aucune route n'a jamais désigné de texte.

## Ce que l'inventaire ne dit pas

Que les faits soient faux. Sur les onze références corrigées dans `sante`
le même jour, les onze textes réels existaient, aux dates et aux numéros que
les fiches annonçaient : seules les URL étaient inventées, et aucun grade n'a
eu à bouger. C'est l'appareil de sourçage qui est cassé, et c'est déjà
disqualifiant pour un dossier qui fait du sondage des sources sa règle
première.

## Avancement

Les entrées marquées `[FAIT]` ont été remplacées par le texte réel, ouvert et
vérifié sur un élément de contenu.

| Lot | Périmètre | Entrées soldées | Reste |
|---|---|---|---|
| 1 | fiches citées par la synthèse | 9 (10 références, l'une servant à deux fiches) | 75 |
| 2 | `ecologie-energie` et `education-recherche`, soldés en entier | 31 | 44 |
| 3 | `justice-affaires`, `promesses`, `libertes-publiques`, `economie`, soldés en entier | 34 | 10 |

Reste la seule traîne : `europe` 3, `industrie` 3, `securite-immigration` 2,
`finances-publiques` 1, `retraites-social` 1.

Deux références du lot 3 n'existent pas sur le portail et ne peuvent pas y
être retrouvées : l'arrêt de cassation Ferrand du 05/10/2022 et le jugement
Benalla de première instance. Elles sont remplacées par des sources publiques
non législatives, et les fiches disent laquelle établit quoi.

## Inventaire

Le domaine indiqué est le premier slug de la fiche. Une fiche transverse
apparaît une seule fois.

Attention à une entrée qui compte pour deux : l'inventaire dédoublonne les
URL, mais deux fiches peuvent citer la même référence fabriquée en visant
deux textes différents. C'est arrivé sur la loi pouvoir d'achat du 16/08/2022,
où une fiche visait l'article 10 et l'autre l'article 1er. **Avant de solder
une entrée « source partagée », vérifier ce que chaque fiche visait.**

### ecologie-energie — 18 références — **SOLDÉ le 03/08/2026**

Correspondance établie, fabriqué → réel :

| Fiche | Texte réel retrouvé |
|---|---|
| démission Hulot | décret du 04/09/2018 composition du Gouvernement, `JORFTEXT000037365283` |
| deuxième budget carbone | décret n° 2020-457, `JORFTEXT000041814459` |
| Affaire du Siècle, carence | TA Paris 03/02/2021 n° 1904967 et a., **absent du portail** : page du tribunal |
| Grande-Synthe II | CE 01/07/2021 n° 427301, `CETATEXT000043754044` |
| Affaire du Siècle, 15 Mt | TA Paris 14/10/2021, **absent du portail** : page du tribunal |
| départ Montchalin | décret du 04/07/2022 composition du Gouvernement, `JORFTEXT000046013941` |
| création SGPE (×2) | décret n° 2022-990 `JORFTEXT000046026058` ; nomination Pellion du 13/07/2022 `JORFTEXT000046045444` |
| Grande-Synthe III | CE 10/05/2023 n° 467982, `CETATEXT000047540937` |
| vols intérieurs | décret n° 2023-385, `JORFTEXT000047571222` |
| Affaire du Siècle, astreinte | TA Paris 22/12/2023 n° 2321828/4-1, **absent du portail** : page du tribunal |
| MaPrimeRénov' | décret n° 2024-249 `JORFTEXT000049309890` **et** arrêté du 21/03/2024 `JORFTEXT000049309915`, qui portent deux objets distincts |
| sortie du charbon | décret n° 2023-817, `JORFTEXT000047989248` |
| prime à la conversion | décret n° 2024-1084, `JORFTEXT000050690951` |
| versement nucléaire | loi n° 2025-127 `JORFTEXT000051168007` + code de l'énergie `LEGISCTA000051213805` |
| clôture Grande-Synthe | CE 24/10/2025 n° 467982, `CETATEXT000052431885` |

Inventaire d'origine conservé tel quel ci-dessous.

- `2018-08-28-demission-hulot.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037367394
- `2020-04-21-deuxieme-budget-carbone-releve.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041814674
- `2021-02-03-affaire-du-siecle-carence-fautive.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000043135606
- `2021-07-01-conseil-etat-grande-synthe-ii.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000043741846
- `2021-10-14-affaire-du-siecle-injonction-15mt.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000044212720
- `2022-07-04-montchalin-depart-legislatives.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046011488
- `2022-07-07-creation-sgpe.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046025067
- `2022-07-07-creation-sgpe.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046046083
- `2023-05-10-conseil-etat-grande-synthe-iii.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000047535565
- `2023-05-23-vols-interieurs-trois-liaisons.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047573429
- `2023-11-09-conseil-etat-annule-dissolution-soulevements.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000048375836
  → CETATEXT000048384891 (CE Section, 09/11/2023, n° 476384)
- `2023-12-22-affaire-du-siecle-astreinte-rejetee.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000050779774
- `2024-03-21-maprimerenov-retropedalage-monogestes.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049309283
- `2024-09-24-sortie-charbon-cordemais-2027.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048007270
- `2024-11-29-suppression-prime-conversion.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050685243
- `2025-02-14-versement-nucleaire-universel.md` [B]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051151600
- `2025-10-24-conseil-etat-cloture-grande-synthe.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000052309825
- `2026-02-20-fonds-vert-dotation-divisee.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051325608
  → JORFTEXT000053508155 (LFI 2026, loi n° 2026-103 du 19/02/2026), plus deux
  sources non-Légifrance : c'était la seule source de la fiche

### education-recherche — 17 références — **SOLDÉ le 03/08/2026**

Correspondance établie, fabriqué → réel :

| Fiche | Texte réel retrouvé |
|---|---|
| maths hors tronc commun (×2) | arrêté du 16/07/2018 cycle terminal `LEGITEXT000037208167` ; arrêté du 03/01/2023 `JORFTEXT000047005229` |
| réforme du lycée (×2) | arrêté du 16/07/2018 épreuves `JORFTEXT000037202834` ; décret n° 2021-983 `JORFTEXT000043861382` |
| LPR | loi n° 2020-1674, `JORFTEXT000042738027` |
| AESH | loi n° 2022-1574, `JORFTEXT000046751169` |
| sélection en master (×3) | CE 07/06/2023 n° 471537 `CETATEXT000047656413` ; CE 31/10/2023 même requête `CETATEXT000048300416` ; loi n° 2016-1828 `JORFTEXT000033680801` |
| voie professionnelle (×2) | décret n° 2023-765 `JORFTEXT000047963959` ; arrêté du 11/08/2023 `JORFTEXT000047963979` |
| choc des savoirs, groupes (×2) | décrets n° 2024-228 `JORFTEXT000049286365` et n° 2024-229 `JORFTEXT000049286397`, **du 16 et non du 15 mars** |
| choc des savoirs, abandon (×2) | décret n° 2026-172 `JORFTEXT000053652587`, arrêté du 10/03/2026 `JORFTEXT000053652601`, décret n° 2026-625 `JORFTEXT000054417257` |

Inventaire d'origine conservé tel quel ci-dessous.

- `2018-07-16-maths-hors-tronc-commun-effet-filles.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037227443/
- `2018-07-16-maths-hors-tronc-commun-effet-filles.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047006093
- `2018-07-16-reforme-lycee-bac-blanquer.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037213456/
- `2018-07-16-reforme-lycee-bac-blanquer.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043862740
- `2020-12-24-lpr-loi-programmation-recherche.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042730303
- `2022-12-16-aesh-cdi-poles-appui-scolarite.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046752317
- `2023-06-07-selection-master-mon-master.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000047693998
- `2023-06-07-selection-master-mon-master.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000048308183
- `2023-06-07-selection-master-mon-master.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000033678916
- `2023-08-11-reforme-voie-professionnelle-allocation-stage.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048063007
- `2023-08-11-reforme-voie-professionnelle-allocation-stage.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048063059
- `2024-02-21-annulations-credits-recherche-decrochage-lpr.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049181180
  → JORFTEXT000049180270 (décret n° 2024-124 du 21/02/2024)
- `2024-02-21-annulations-credits-recherche-decrochage-lpr.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050136270
  → JORFTEXT000051520782 (décret n° 2025-374 du 25/04/2025)
- `2024-03-15-choc-des-savoirs-groupes-de-besoins.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049286438
- `2024-03-15-choc-des-savoirs-groupes-de-besoins.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049286439
- `2024-11-28-choc-des-savoirs-annulation-abandon.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050228394
- `2024-11-28-choc-des-savoirs-annulation-abandon.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050720455

### justice-affaires — 10 références

- `2017-06-21-remaniement-departs-enquetes.md` [A] (source partagée avec 1 autre fiche)
  https://www.legifrance.gouv.fr/juri/id/JURITEXT000046399042
- `2019-07-16-demission-de-rugy.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038772879
- `2019-07-16-demission-de-rugy.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038772392
- `2019-12-16-demission-delevoye-condamnation.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039630800
- `2021-11-05-proces-benalla-premiere-instance.md` [A] (source partagée avec 1 autre fiche)
  https://www.legifrance.gouv.fr/juri/id/JURITEXT000049817758
- `2021-12-08-demission-griset-condamnation.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050965389
- `2022-07-04-eviction-abad.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046005595
- `2022-10-05-prescription-ferrand.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051191079
- `2025-04-11-lecornu-audition-narcy.md` [C]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050193796
- `2025-04-11-lecornu-audition-narcy.md` [C]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050337854

### promesses — 10 références

- `2017-09-22-prelevement-a-la-source.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000035607374
- `2022-08-16-aah-deconjugalisee.md` [A] (source partagée avec 1 autre fiche) **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000046186638
  → JORFARTI000046186750 (article 10 de la loi n° 2022-1158) pour l'AAH, et
  JORFARTI000046186741 (article 1er) pour
  `2022-08-16-prime-partage-valeur-triplee.md` : deux articles distincts
  derrière une seule URL fabriquée
- `2022-08-16-suppression-redevance-tv.md` [A]
  https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000046186419
- `2023-04-14-retraite-64-ans-au-lieu-de-65.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047444984
- `2023-07-19-enseignants-hausse-partielle.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047862211
- `2023-11-20-lopj-10000-postes-justice.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048430856
- `2023-12-18-rsa-conditionne-15h.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048581965
- `2024-02-12-leasing-social-suspendu.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048566270
- `2024-02-12-leasing-social-suspendu.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049130761
- `2024-06-09-dissolution-caducite-chantiers.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049858349
  → JORFTEXT000049849562 (décret n° 2024-648 du 30/06/2024)

### libertes-publiques — 9 références

- `2017-10-30-loi-silt.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000035931950
- `2020-02-20-gendnotes.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041610486/
- `2020-06-18-loi-avia-censuree.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042031804
  → JORFTEXT000042031970 (loi n° 2020-766 du 24/06/2020)
- `2020-12-02-fichiers-pasp-elargis.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042607035/
- `2021-07-30-loi-patr-boites-noires.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043876156/
- `2021-07-30-loi-patr-boites-noires.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043835501
- `2023-01-24-lopmi-amendes-forfaitaires.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047100735
- `2023-05-19-loi-jo-vsa.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047561917/
- `2024-05-17-loi-sren-censure-outrage.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049581335

### economie — 8 références

- `2017-09-22-ordonnances-penicaud-code-travail.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000035567456
- `2017-09-22-ordonnances-penicaud-code-travail.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000035567547
- `2018-12-24-loi-mues-paquet-pouvoir-achat.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037851892
- `2018-12-24-loi-mues-paquet-pouvoir-achat.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037845222
- `2021-12-01-indemnite-inflation-100e.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000044471556/
- `2022-05-11-bareme-macron-validation-judiciaire.md` [A]
  https://www.legifrance.gouv.fr/juri/id/JURITEXT000045785989
- `2022-05-11-bareme-macron-validation-judiciaire.md` [A]
  https://www.legifrance.gouv.fr/juri/id/JURITEXT000045785966
- `2023-02-01-assurance-chomage-contra-cyclique.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047061188

### europe — 3 références

- `2019-07-24-taxe-gafa-retorsions-americaines.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038821376/
- `2022-07-27-conseil-etat-valide-renouvellements-controles.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000046107386
- `2023-12-08-pnrr-repowereu-40-3-milliards.md` [A]
  https://www.sgae.gouv.fr/fr/actualites/relance-resilience-repowereu-france

### industrie — 3 références

- `2023-10-23-loi-industrie-verte.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048255958
- `2023-10-23-loi-industrie-verte.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049889410
- `2024-09-21-valse-ministres-industrie.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050244465

### securite-immigration — 3 références

- `2023-11-02-reforme-ddpn.md` [B]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048307044
- `2025-05-12-droit-du-sol-mayotte-deux-parents.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050478125
- `2025-06-13-loi-narcotrafic.md` [A] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050835478
  → JORFTEXT000051734851 (loi n° 2025-532 du 13/06/2025)

### finances-publiques — 2 références

- `2021-10-01-boucliers-tarifaires-energie.md` [B] **[FAIT]**
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044244249
  → JORFTEXT000044239204 (décret n° 2021-1380 du 23/10/2021)
- `2025-09-08-chute-bayrou-confiance.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052329482

### retraites-social — 1 référence

- `2025-05-30-decret-sanctions-rsa.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051770000

