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

## Inventaire

Le domaine indiqué est le premier slug de la fiche. Une fiche transverse
apparaît une seule fois.

### ecologie-energie — 18 références

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
- `2023-11-09-conseil-etat-annule-dissolution-soulevements.md` [A]
  https://www.legifrance.gouv.fr/ceta/id/CETATEXT000048375836
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
- `2026-02-20-fonds-vert-dotation-divisee.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051325608

### education-recherche — 17 références

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
- `2024-02-21-annulations-credits-recherche-decrochage-lpr.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049181180
- `2024-02-21-annulations-credits-recherche-decrochage-lpr.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050136270
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
- `2022-08-16-aah-deconjugalisee.md` [A] (source partagée avec 1 autre fiche)
  https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000046186638
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
- `2024-06-09-dissolution-caducite-chantiers.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049858349

### libertes-publiques — 9 références

- `2017-10-30-loi-silt.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000035931950
- `2020-02-20-gendnotes.md` [A]
  https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041610486/
- `2020-06-18-loi-avia-censuree.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042031804
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
- `2025-06-13-loi-narcotrafic.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050835478

### finances-publiques — 2 références

- `2021-10-01-boucliers-tarifaires-energie.md` [B]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044244249
- `2025-09-08-chute-bayrou-confiance.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052329482

### retraites-social — 1 référence

- `2025-05-30-decret-sanctions-rsa.md` [A]
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000051770000

