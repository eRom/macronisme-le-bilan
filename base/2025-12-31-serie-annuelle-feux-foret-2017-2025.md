---
titre: Série annuelle des feux de forêt en France 2017-2025 (BDIFF, recoupée EFFIS)
type: affaire
domaines: [securite-civile, ecologie-energie]
date: 2025-12-31
acteurs:
  president: Emmanuel Macron
  ministres: [ministères de l'Intérieur et de l'Agriculture]
  gouvernement: gouvernements successifs 2017-2026
grade: A
statut: null
sources:
  - https://bdiff.agriculture.gouv.fr/incendies
  - https://data.effis.emergency.copernicus.eu/effis/reports-and-publications/annual-fire-reports/Annual_Report_2023.pdf
---

Série reconstituée le 30/07/2026 par export direct de la Base de données sur les incendies de forêt (BDIFF, ministère de l'Agriculture), périmètre France entière, type de feu F (feux de forêt), campagnes 2017 à 2025. C'est le référentiel continu de sinistralité qui manquait au domaine.

| Campagne | Feux de forêt | Surface parcourue (ha) | dont surface forêt (ha) |
|---|---|---|---|
| 2017 | 3 304 | 23 174 | 11 361 |
| 2018 | 1 928 | 4 036 | 1 572 |
| 2019 | 2 972 | 15 190 | 5 920 |
| 2020 | 2 971 | 11 226 | 7 679 |
| 2021 | 2 362 | 12 853 | 7 964 |
| 2022 | 4 433 | 59 021 | 45 817 |
| 2023 | 2 682 | 5 441 | 2 216 |
| 2024 | 1 367 | 2 769 | 1 140 |
| 2025 | 2 541 | 21 945 | 11 000 |

Recoupement croisé qui valide la série : pour 2023, le rapport annuel EFFIS donne 5 414 ha de surface brûlée par feux de forêt en France et 2 675 feux, contre 5 441 ha et 2 682 feux dans l'export BDIFF, soit un écart de 0,5 % imputable aux mises à jour de base postérieures au rapport. La colonne « surface parcourue » de la BDIFF correspond donc bien à la ligne « forest fire » d'EFFIS ; la colonne « surface forêt » est la seule occupation forestière à l'intérieur de ces feux, et vaut deux à quatre fois moins.

Moyenne de référence, source EFFIS (rapport annuel 2023, table 9, « adjusted mean 2006-2021 » pour la France, corrigée des campagnes non renseignées) : 10 427 ha brûlés par an par feux de forêt et 2 835 feux. C'est l'étalon qui manquait. Rapportées à cette moyenne : 2022 vaut 5,7 fois la moyenne, 2017 2,2 fois, 2025 2,1 fois, et à l'inverse 2024 vaut 0,27 fois et 2018 0,39 fois.

Trois enseignements à porter dans toute lecture du domaine. Un, **la série n'est pas monotone et 2022 est un pic isolé, pas le début d'une pente** : 2023 et 2024 sont très en dessous de la moyenne 2006-2021, et 2024 est la campagne la plus calme des deux quinquennats. La commission des finances du Sénat le confirme indépendamment en évoquant « le caractère heureux des résultats de la campagne 2024 de lutte contre les feux de forêt, qui s'expliquaient par une météo clémente ». Deux, une charge qui affirmerait que les surfaces brûlées augmentent continûment sous Macron se réfute avec la seule année 2024. Trois, le facteur météorologique est explicitement reconnu comme déterminant par la source parlementaire, ce qui interdit d'imputer les variations aux moyens de lutte ([[2025-07-01-arbitrage-abe-aude-bouches-du-rhone]]).

Second référentiel, tous feux de végétation confondus. La BDIFF recense 21 141 feux et 31 744 ha parcourus pour la seule campagne 2025, contre 2 541 feux et 21 945 ha pour les seuls feux de forêt : le nombre de feux est huit fois supérieur, la surface d'un tiers seulement. Pour 2023, EFFIS donne 17 306 ha et 18 936 feux tous végétaux, contre 5 414 ha et 2 675 feux pour la forêt seule, la moyenne ajustée 2006-2021 tous végétaux étant de 16 407 ha et 12 578 feux. La série annuelle tous végétaux 2017-2024 n'a pas pu être exportée : le formulaire de la BDIFF bascule sur le filtre « type de feu F » dès qu'on lui passe une plage d'années, et n'accepte pas de borne de date en paramètre d'URL.

Ce que la série ne permet pas de faire. Elle **ne couvre pas 2026** : la BDIFF n'a publié aucune campagne 2026 au 30/07/2026, sa campagne courante étant 2025. Les 116 085 ha annoncés pour 2026 ([[2026-07-27-bilan-provisoire-saison-2026]]) sont un chiffre provisoire, tous végétaux, issu de la presse professionnelle : ils ne se comparent donc ni à la colonne « feux de forêt » de ce tableau, ni à la moyenne EFFIS des feux de forêt. La comparaison légitime, quand la campagne 2026 sera publiée, sera BDIFF tous végétaux contre BDIFF tous végétaux.

Réserve de méthode signalée par la base elle-même à l'export : « certaines données sont associées à l'ancienne version du formulaire incendie », les schémas de saisie ayant changé au cours de la période. Voir aussi la rupture de périmètre de 2023 liée à l'intégration de Prométhée ([[2023-01-01-rupture-bdiff-effis]]).

Recette de reproduction, à conserver : requête GET sur `https://bdiff.agriculture.gouv.fr/incendies` avec les paramètres `if[periodeAnnees][anneeDeb]`, `if[periodeAnnees][anneeFin]`, `if[fr]=1` et `if[submit]=`, en conservant le cookie de session, puis téléchargement de `https://bdiff.agriculture.gouv.fr/incendies/zip` avec ce même cookie. L'archive contient `Incendies.csv`, une ligne par incendie, avec l'année, la surface parcourue et la ventilation par occupation du sol en mètres carrés.
