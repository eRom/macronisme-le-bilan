# Rattrapage securite-civile : acquis du sondage manuel

> **VERSÉ le 30/07/2026.** Tout ce qui suit est passé en fiches dans `base/`
> (réponse Darmanin au référé, réponse du gouvernement au JO Sénat, NEB 2024 de la Cour,
> rapport interministériel redaté de juillet 2023, manifestation du 15/10/2019). Le seul
> reliquat non comblé reste la série annuelle BDIFF/EFFIS 2017-2026. Document conservé pour
> les pistes déjà épuisées, à ne pas refaire à l'identique.

Note de travail du 30/07/2026. Réceptacle des pièces trouvées à la main, sans agy,
pendant l'attente du quota agy (ready ~08h19) et du reset Claude (09h00).
Destination finale : fiches de `base/` et section « À re-vérifier » de
`chronologie.md`, à l'ingestion. Rien ici n'est encore versé.

Contexte : le run agy-deep du 30/07 (4 rounds, 9 angles aboutis sur 27) avait déclaré
ces éléments introuvables. Ils l'étaient pour une recherche browsée multi-rounds, pas
en réalité. Méthode qui marche : WebSearch pour localiser, WebFetch sur la page pour
confirmer, `pdftotext -layout` quand WebFetch ne sait pas lire le PDF.

---

## TROU 1 — Réponse du ministre au référé de la Cour des comptes : COMBLÉ

C'était « la lacune la plus dommageable du dossier côté éléments à décharge ».
Le document existe, il est publié, et il est daté d'une façon qui sert la charge.

**Le référé**
- Référence : **S2022-1353**, « La flotte aérienne de la sécurité civile »
- Publication : 03/10/2022
- Page : https://www.ccomptes.fr/fr/publications/la-flotte-aerienne-de-la-securite-civile
- Document : https://www.ccomptes.fr/fr/documents/61589
- PDF : https://www.ccomptes.fr/system/files/2022-09/20221003--S2022-1353-flotte-aerienne-securite-civile.pdf
- Constats : absence de vision stratégique limitant la capacité à faire face à
  l'aggravation du risque de feux de forêt et au renouvellement de la flotte ;
  organisation fragile ; dépendance à des prestataires parfois défaillants.
- ATTENTION DATE : le run parlait tantôt d'un « référé de juillet 2022 », tantôt de
  `2022-10-03`. La référence du document tranche pour le 03/10/2022. Ne pas écrire
  « juillet 2022 ».

**La réponse ministérielle**
- Auteur : **Gérald Darmanin**, ministre de l'Intérieur et des Outre-mer
- Date : **27 octobre 2022** (gouvernement Borne)
- Document : https://www.ccomptes.fr/fr/documents/62195
- PDF : https://www.ccomptes.fr/sites/default/files/2023-10/20221003--S2022-1353-flotte-aerienne-securite-civile-rep-MIOM.pdf
- Grade A (lettre ministérielle publiée par la juridiction financière)

Engagements pris :
- inscription du renouvellement de la flotte d'hélicoptères du ministère,
  **36 appareils**, dans un projet de loi d'orientation et de programmation ;
- engagement de la France dans **rescEU** pour l'acquisition de nouveaux bombardiers d'eau.

Points où le ministre conteste ou nuance la Cour :
- l'examen des missions et implantations des hélicoptères « ne peut relever de la
  seule responsabilité du ministère », un « pilotage interministériel paraît indispensable » ;
- les arriérés de paie de 2018 ne constituent pas une « stricte anomalie » mais
  résultent de décrets entrés rétroactivement en vigueur.

**LE DÉTAIL CHRONOLOGIQUE À EXPLOITER, pièce maîtresse du domaine.** La lettre est du
27/10/2022, soit **la veille** de la promesse présidentielle du 28/10/2022 sur les
16 Canadair. Elle contient cette phrase : « Le Gouvernement est pleinement mobilisé
pour accélérer les travaux permettant de **définir précisément** la stratégie
d'évolution de la flotte aérienne ». La veille de l'annonce d'une cible chiffrée et
d'une échéance de fin de quinquennat, le ministre de l'Intérieur écrit donc à la Cour
que la stratégie reste à définir. À rapprocher du fait déjà établi que la chaîne
DHC-515 avait été lancée dès le 31/03/2022 : la promesse est postérieure de sept mois
au calendrier industriel connu, et d'un jour à un aveu écrit d'absence de stratégie
arrêtée. C'est la formulation la plus solide de la charge, et elle est intégralement
adossée à des sources primaires.

Recoupement : les 36 hélicoptères annoncés dans cette lettre d'octobre 2022 sont les
mêmes que la commande de 36 H145-D3 que le run datait de fin 2023. Vérifier à
l'ingestion s'il s'agit de l'annonce puis de la notification du même marché, et ne pas
créer deux fiches qui se contrediraient sur la date.

---

## TROU 5 — Réponses du gouvernement aux accusations de coupes : COMBLÉ (volet questions écrites)

Le dossier n'avait « aucune contradiction officielle à opposer à la thèse du
renoncement à deux appareils ». Il en a maintenant une, datée et signée.

**Question écrite Sénat n° 00419**
- Auteure : **Françoise Dumont** (Var, Les Républicains)
- Adressée au ministre de l'Intérieur, réattribuée au ministre d'État, ministre de l'Intérieur
- Question publiée au JO Sénat du **03/10/2024**, page 3476
- URL : https://www.senat.fr/questions/base/2024/qSEQ241000419.html
- Objet : le gouvernement entend-il revenir sur l'annulation de 52,7 M€ de crédits du
  programme « sécurité civile », jugée inadaptée face aux risques du dérèglement climatique ?
- PIÈGE : la question elle-même date le décret du **22** février 2024. Le décret
  n° 2024-124 est du **21** février 2024. Ne pas propager l'erreur de la sénatrice.

**Réponse du gouvernement**
- Publiée au JO Sénat du **05/06/2025**, page 3108 (soit huit mois après la question)
- Teneur : le gouvernement n'annule pas le décret n° 2024-124, mais la loi de finances
  de fin de gestion du 06/12/2024 a ouvert **40,2 M€ de CP supplémentaires** sur le
  programme 161, « compensant ainsi la majorité de la baisse ». Cet abondement a soutenu
  la mobilisation des moyens opérationnels en 2024, notamment après les événements de
  **Nouvelle-Calédonie**.
- Lecture : c'est un élément à décharge PARTIEL, et il faut le présenter comme tel.
  Le gouvernement ne conteste pas la coupe, il fait valoir une recompensation
  ultérieure, en CP seulement, à hauteur de 40,2 sur 52,77 M€, et l'affecte à un
  usage opérationnel sans lien avec les appareils. La compensation est donc partielle,
  tardive de neuf mois, et réaffectée. C'est exactement la nuance qui rend la charge
  tenable sans être réfutable.

**Question écrite AN n° 17140 (16e législature)**
- « Décret portant annulation de crédits du programme "Sécurité civile" »
- URL : https://questions.assemblee-nationale.fr/q16/16-17140QE.htm
- Non encore ouverte au sondage. À faire : vérifier si une réponse est publiée et si
  elle diffère de celle du Sénat.

**Autre question repérée, non sondée** : Sénat qSEQ240310510, « Budget 2024 de la
sécurité civile » — https://www.senat.fr/questions/base/2024/qSEQ240310510.html

**Volet nature juridique des montants 2026 : à moitié tranché sans sondage.** La
chronologie porte déjà comme fait vérifié le 29/07 que la loi de finances pour 2026
est promulguée : **loi n° 2026-103 du 19/02/2026, JORFTEXT000053508155**. Reste à
confirmer que les 994,9 M€ AE / 882,7 M€ CP du programme 161 viennent bien de cette
LFI et non du PLF. Source à privilégier : le rapport Sénat sur le PLF 2026 déjà repéré
par le run (https://www.senat.fr/rap/l25-139-328-2/l25-139-328-2_mono.html) et les
documents budgétaires du programme 161.

---

## TROU 4 — Rapports de la Cour des comptes : COMBLÉ, et il change le dossier

Le run affirmait qu'« aucun rapport de la Cour des comptes ni de l'IGA sur la sécurité
civile autre que le référé de juillet 2022 n'a été identifié sur 2017-2026 ». C'est
faux. La Cour publie une **note d'analyse de l'exécution budgétaire (NEB) de la mission
Sécurités chaque année**, chacune comportant une partie sur le programme 161. Six URL
directes confirmées :

| Exercice | PDF |
|---|---|
| 2018 | https://www.ccomptes.fr/system/files/2019-05/NEB-2018-Securites.pdf |
| 2019 | https://www.ccomptes.fr/system/files/2020-04/NEB-2019-Securites_0.pdf |
| 2021 | https://www.ccomptes.fr/system/files/2022-06/NEB-2021-Securites.pdf |
| 2022 | https://www.ccomptes.fr/system/files/2023-06/NEB-2022-Securites.pdf |
| 2023 | https://www.ccomptes.fr/sites/default/files/2024-04/NEB-2023-Securites.pdf |
| 2024 | https://www.ccomptes.fr/sites/default/files/2025-04/NEB-2024-Securites_0.pdf |

Manquent 2017 et 2020, qui existent probablement selon le même schéma d'URL. La NEB
2023 traite spécifiquement de la disponibilité des hélicoptères. Ne jamais deviner les
URL manquantes : les chercher.

**La NEB 2024 (publiée avril 2025) tranche cinq points que le dossier portait en
mono-source ou en incertitude. Texte intégral extrait dans le scratchpad :
`neb-2024-securites.txt` (3590 lignes).**

1. **LE LIEN CAUSAL EST ÉTABLI PAR LA COUR ELLE-MÊME**, et non par un rapport
   parlementaire comme le croyait le run. Citation exacte, page 36 : « En 2024, seuls
   les deux appareils financés dans le cadre du programme européen RescEU ont été
   commandés, **la France ayant renoncé aux deux Canadairs supplémentaires prévus en
   option suite à l'annulation de crédits par le décret du 21 février 2024**. » C'est
   la pièce la plus solide du domaine sur le volet budgétaire : le renoncement n'est
   plus une imputation de député, c'est un constat de la juridiction financière.
   Requalifier la fiche du décret 2024-124 en conséquence.

2. **Coût réel par appareil : 62 M€ TTC.** Détail : les deux appareils rescEU coûtent
   98,8 M€ et sont couverts par la Commission via DG ECHO ; restent à la charge du
   programme 161 la TVA à l'importation (23 M€), les frais de douane (3 M€), un lot
   initial de rechanges et des provisions (estimés entre 13 et 35 M€). Crédits engagés :
   132,65 M€ AE en 2024 et 28,63 M€ CP. En 2025, seules 3 M€ AE et 1 M€ CP de
   provisions, avec une faible probabilité de mobilisation.
   → Ce chiffrage remplace le claim mono-source « coût réel d'acquisition d'un DHC-515 »
   et confirme définitivement que le ratio « coût national = 2 × coût rescEU » était
   faux : ce sont des périmètres différents, pas un facteur deux.

3. **Le contrat du 12/08/2024 prévoit la possibilité d'aller jusqu'à 16 appareils**, via
   une option portant sur 14 avions supplémentaires commandables à l'unité, avec
   échéance contractuelle au **30 juin 2030** pour affermir tout ou partie. Confirme la
   pièce du run.

4. **Inventaire de la flotte d'hélicoptères au titre de 2024, source de contrôle** :
   37 appareils en service, soit **33 EC145 ancienne génération et 4 H145**. Le
   renouvellement des 33 EC145 par des H145 plus l'acquisition de 3 appareils
   supplémentaires vise une cible de **40 appareils** de nouvelle génération. Marché
   engagé pour l'essentiel en 2023 (412 M€), 89,6 M€ de CP en 2024.
   → Comble partiellement la lacune « inventaire exact de la flotte ». Attention à ne
   pas confondre avec la formulation du run (« 36 H145-D3 commandés fin 2023 ») :
   croiser les deux avant de figer une fiche.

5. **Le renouvellement des Canadair est décompté « hors LOPMI »**, l'achat ayant été
   annoncé après le dépôt de la loi d'orientation et de programmation du ministère de
   l'Intérieur. Les crédits initiaux venaient d'**amendements au PLF 2023** (240 M€ AE
   et 24 M€ CP), reportés en 2024 pour 132,5 M€ AE et 28,6 M€ CP.
   → Point de méthode budgétaire à exploiter : la promesse présidentielle n'était pas
   portée par la loi de programmation du ministère, mais par des amendements
   parlementaires, puis reportée d'un exercice.

La Cour porte aussi une appréciation générale sur l'exercice : « une annulation de
crédits sans précédent » dès le début de l'année, et un jugement sur le fait que geler
ou annuler des crédits dans des proportions significatives sur cette mission ne
contribue pas à l'effort de réduction des dépenses (lignes 108-112 et 554 du texte
extrait, à citer précisément après relecture du passage complet).

---

## TROU 3 — Grèves de sapeurs-pompiers 2019-2021 : LARGEMENT COMBLÉ

Le run n'avait aucune pièce. Séquence désormais datée, à consolider sur deux sources
de presse indépendantes par fait avant versement (grade B visé, A impossible pour un
fait de mobilisation).

- Mobilisation amorcée en **mars 2019**, grève déclenchée le **26 juin 2019** à l'appel
  d'une intersyndicale représentant, selon elle, 85 % des personnels de la profession.
- **Manifestation nationale du mardi 15 octobre 2019** à Paris, de la place de la
  République à la place de la Nation. **7 000 à 10 000 participants selon les neuf
  syndicats** organisateurs (chiffre syndical, à identifier comme tel ; pas de chiffre
  préfecture capté).
- Dispersion du cortège par canons à eau et gaz lacrymogènes, avec interpellations
  (franceinfo, France 24, Public Sénat).
- Revendications : revalorisation de la prime de feu, hausse des effectifs (le nombre
  d'interventions a doublé en vingt ans sans moyens correspondants), protection contre
  les agressions, maintien du régime de retraite.
- Communiqué officiel du ministère de l'Intérieur sur cette manifestation : présent
  dans les archives Christophe Castaner sur interieur.gouv.fr, mais la page renvoie
  **403 à WebFetch**. Piste de contournement à tenter : archive.org, ou la version
  non « mobile. » du domaine. La réponse ministérielle reste donc à capter.

**DIVERGENCE DE CHIFFRE À NE PAS PROPAGER.** La presse de 2019 écrit que la prime de
feu des pompiers est à **18 %** contre 26 % dans la police. Le décret n° 2020-903, source
primaire, dit : « le taux de **19 %** est remplacé par le taux de 25 % ». Ne jamais
écrire « de 18 à 25 % ». Citer le décret (19 → 25) et, si le 18 % est utile pour
restituer la revendication, le donner comme chiffre avancé par les syndicats en 2019.

---

## TROU 4, complément — Le rapport interministériel est mal daté dans le dossier

Le run parle d'un « rapport interministériel IGA/CGAAER/IGEDD de janvier 2024 » portant
27 recommandations. Le document a été récupéré et daté sur sa page de garde.

- Titre : « Politique de prévention et de lutte contre l'incendie de forêt dans un
  contexte d'extension et d'intensification du risque dû au changement climatique »
- **Deux tomes** : Tome 1 « Faire face à court terme » ; Tome 2 « S'adapter au
  changement d'ère : apprendre à vivre avec le feu pour les moyen et long termes ».
- **Le tome 2 est daté de JUILLET 2023**, pas de janvier 2024. Janvier 2024 est
  vraisemblablement la date de publication ou de mise en ligne. Cela lève au passage une
  incohérence apparente : les recommandations ont pu être reprises dans la loi du
  10/07/2023 parce que la mission avait rendu avant. À trancher avant de figer une
  fiche : distinguer date de remise et date de publication.
- Références complètes : rapports IGEDD n° **014386-02** et **014362-02**, rapport IGA
  n° **22032-R2**, rapports n° **22032** et n° **22041**.
- Auteurs : Jean Maurice Durand (CGAAER), Vincent Piveteau (CGAAER), Philippe Cannard
  (IGA), Christophe Leuret (IGEDD), Frédéric Mortier (coordonnateur, IGEDD).
- PDF tome 2 : https://observatoire.foret.gouv.fr/api-obs/upload/22032R2-Incendies-forets-tome-2.pdf
  (14 Mo, au-delà de la limite de WebFetch : télécharger avec curl puis pdftotext).
  Miroir IGEDD : https://igedd.documentation.developpement-durable.gouv.fr/documents/Affaires-0013313/014386-02_rapport-publie_tome_2.pdf
- Texte extrait dans le scratchpad : `rapport-2024-tome2.txt` (12 352 lignes).
- Le tome 2 est **prospectif** (scénarios RCP 4.5 et 8.5, projections jusqu'à 2100) et
  ne contient PAS de série rétrospective des surfaces brûlées. Pour la série, viser le
  tome 1. Le total de 27 recommandations couvre les deux tomes et vient de sources
  secondaires : décompte exact non vérifié dans les documents, ne pas l'écrire comme
  fait établi sans l'avoir compté.

---

## Restant à combler

- **TROU 2 — série annuelle BDIFF et EFFIS 2017-2026 : NON COMBLÉ.** Trois pistes
  tentées sans succès, à ne pas refaire à l'identique :
  1. Page SDES « Feux de forêt et végétation » des chiffres clés des risques naturels :
     donne 2022 (62 000 ha de forêts et 10 000 ha d'autres végétations) et des moyennes
     décennales, mais **pas la série année par année** pour 2017-2021.
  2. Jeu de données BDIFF sur data.gouv.fr : couvre **2006-2022 seulement**, et la
     ressource exposée est un lien d'API de 10,8 Ko, pas un export de la série.
  3. Recherche généraliste : ne renvoie que des agrégateurs privés (feuxdeforet.fr),
     à exclure comme source primaire.
  Pistes non encore tentées, par ordre de promesse : le **tome 1** du rapport
  interministériel (rétrospectif, « Faire face à court terme ») ; les bilans annuels de
  la DGSCGC ; les rapports annuels EFFIS/JRC (« Forest Fires in Europe ») ; le rapport
  Sénat sur le PLF 2026 déjà repéré (https://www.senat.fr/rap/l25-139-328-2/l25-139-328-2_mono.html) ;
  l'interrogation directe du formulaire https://bdiff.agriculture.gouv.fr/incendies.
  **En l'état, le domaine reste sans référentiel continu de sinistralité** : ne jamais
  affirmer que 2022 ou 2026 constituent une rupture par rapport à une moyenne, faute de
  série pour l'établir.
- **TROU 3, reliquat** — réponse ministérielle à la manifestation du 15/10/2019
  (page interieur.gouv.fr en 403) ; grèves de 2020 et 2021, non explorées.
- **TROU 5, reliquat** — réponse à la question AN n° 17140
  (https://questions.assemblee-nationale.fr/q16/16-17140QE.htm), et confirmation que les
  994,9 M€ AE / 882,7 M€ CP du programme 161 viennent bien de la LFI 2026 promulguée
  (loi n° 2026-103 du 19/02/2026) et non du PLF.
- **TROU 4, reliquat** — NEB 2017 et 2020 ; lecture des NEB 2018 à 2023 pour en tirer
  les constats année par année ; recherche de rapports thématiques de la Cour hors NEB
  et hors référé S2022-1353.
