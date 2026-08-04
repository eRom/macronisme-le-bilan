---
titre: Note de cadrage : rupture méthodologique de la BDIFF et divergence avec EFFIS
type: affaire
domaines: [securite-civile, ecologie-energie]
date: 2023-01-01
acteurs:
  president: Emmanuel Macron
  ministres: [ministères de l'Intérieur et de l'Agriculture]
  gouvernement: gouvernements successifs 2017-2026
grade: A
statut: null
sources:
  - https://observatoire.foret.gouv.fr/themes/l-historique-des-feux-de-foret-en-france-metropolitaine
  - https://forest-fire.emergency.copernicus.eu/about-effis
---

Note de cadrage, pas fiche d'événement. Elle protège tout le volet feux du dossier contre la réfutation la plus facile, qui consiste à opposer deux chiffres issus de référentiels différents. Date conventionnelle : la source ne donne que l'année de la rupture.

Deux référentiels coexistent et ne mesurent pas la même chose. EFFIS, système européen du Joint Research Centre, mesure par satellite la surface totale parcourue par le feu sans distinction fine d'usage des sols, landes, garrigues, friches et zones pastorales incluses. La BDIFF comptabilise historiquement la forêt stricte. Les surfaces EFFIS sont couramment de 1,5 à 2 fois supérieures à celles de la BDIFF, et parfois du double pour certaines années. À partir de 2023, la BDIFF a intégré les données de la base Prométhée et s'est ouverte aux feux d'espaces naturels, créant une rupture statistique entre les séries 2017-2022 et 2023-2026.

Conséquence : toute comparaison pluriannuelle qui mélange les deux référentiels, ou qui franchit 2023 sans précaution, est méthodologiquement invalide. Pour 2022, trois chiffres circulent légitimement : 58 981 ha (BDIFF, forêt), 72 000 ha (ministère, tous espaces), environ 74 654 ha (EFFIS, satellite). Aucun n'est faux, les mélanger l'est ([[2022-07-12-saison-2022-megafeux-gironde]]).

Mise à jour du 30/07/2026 : **la série existe désormais au dossier**, obtenue par export direct de la BDIFF et recoupée sur le rapport annuel EFFIS ([[2025-12-31-serie-annuelle-feux-foret-2017-2025]]). Elle couvre les feux de forêt de 2017 à 2025 et s'accompagne d'une moyenne de référence EFFIS (10 427 ha par an sur 2006-2021, ajustée). L'interdiction générale d'invoquer une rupture par rapport à une moyenne est donc levée pour les feux de forêt.

Ce qui reste interdit, plus étroitement : comparer un chiffre « tous végétaux » à la série « feux de forêt », et placer 2026 dans la série, la BDIFF n'ayant publié aucune campagne 2026 au 30/07/2026 ([[2026-07-27-bilan-provisoire-saison-2026]]). La série annuelle tous végétaux 2017-2024 n'a pas pu être exportée.

**Piste tous végétaux déclarée épuisée le 30/07/2026, après une seconde tentative.** L'hypothèse restante était que le formulaire n'imposait le type « feux de forêt » que sur une plage pluriannuelle et pas sur une année isolée. Elle est fausse : une requête sur la seule année 2020, sans paramètre de type, renvoie 2 971 incendies, soit exactement le nombre de feux de forêt de la série. Le filtre est donc appliqué par défaut quelle que soit la forme de la requête. Ne pas retenter par ce chemin ; les seules voies restantes seraient une reconstruction depuis le jeu de données brut de data.gouv, dont la ressource est réduite à un lien d'API, ou une demande directe au service gestionnaire.

Pistes épuisées le 30/07/2026, à ne pas refaire : page SDES des chiffres clés des risques naturels (moyennes décennales seulement), jeu de données BDIFF sur data.gouv.fr (2006-2022, ressource réduite à un lien d'API), recherche généraliste (agrégateurs privés), tables pays des rapports EFFIS (moyennes décennales et non série annuelle), service de téléchargement du JRC (formulaire et contact courriel, pas de fichier direct). Ce qui a marché : le formulaire de recherche de la BDIFF piloté en GET, recette conservée dans la fiche de la série.
