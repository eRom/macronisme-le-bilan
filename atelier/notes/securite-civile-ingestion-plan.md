# Ingestion securite-civile : plan de reprise après /clear

> **SOLDÉ le 30/07/2026.** L'ingestion est faite : 41 fiches versées dans `base/`,
> 29 en grade A et 12 en B, aucune en C ni D, plus 2 fiches finances-publiques enrichies.
> Ce document reste comme trace du plan, mais il n'est plus la source de vérité : trois de
> ses garde-fous ont été corrigés à l'ingestion (les 224 000 évacués de Saumos sont un
> chiffre préfectoral et se versent, les montants 2026 du programme 161 sont du PLF et non
> de la LFI, six identifiants Légifrance étaient faux). La source de vérité est le bloc
> « Ingestion du 30/07/2026 » de la section « À re-vérifier » de `chronologie.md`.

Point d'entrée unique. Écrit le 30/07/2026 à 07h00 par la session qui a mené la
recherche, avant un `/clear` motivé par la saturation du contexte (~602 k).
Tout ce qui suit est autoportant : rien ne dépend de la conversation précédente.

**État** : recherche du domaine 15 TERMINÉE, ingestion PAS COMMENCÉE.
`base/` n'a reçu aucune fiche de ce domaine. Trois commits déjà en place :
`9837914` (rapport de run), `74fcaef` (rattrapage manuel), `c501b60` (doctrine du poste).
Tâches actives : `#2` ingestion (celle-ci), `#3` run institutions (à ne pas déclencher
sans GO explicite de Romain, prévu en fin de matinée).

---

## 1. Ordre de lecture obligatoire avant d'écrire la moindre fiche

1. `methodes/methode-recherche.md` — schéma de fiche, frontmatter, grades A/B/C/D, règles
   d'ingestion. Ne rien inventer du format : il est là.
2. `chronologie.md`, section « À re-vérifier », bloc **Securite-civile** et son
   sous-bloc **Rattrapage du 30/07** — c'est la source de vérité des garde-fous et des
   identifiants déjà tranchés. Priorité sur le rapport en cas de désaccord.
3. `notes/securite-civile-rattrapage.md` — détail opérationnel du sondage manuel,
   avec les pistes déjà épuisées à ne pas refaire.
4. `research/securite-civile.md` — le rapport de run (416 lignes). À lire pour
   les pièces et leur contenu, MAIS il contient des erreurs corrigées depuis : voir §2.

**Règle de préséance** : chronologie.md et la note de rattrapage l'emportent sur le
rapport. Le rapport est le brouillon, la chronologie est la doctrine.

---

## 2. Six erreurs du rapport à ne pas recopier

Le rapport de run porte ces erreurs, toutes corrigées dans chronologie.md :

1. **Le référé de la Cour est du 03/10/2022**, référence S2022-1353, pas « juillet 2022 ».
2. **Le rapport AN n° 3065 et le « rapport Maudet-Pantel de juillet 2025 » sont le même
   document**, déposé le **15 juillet 2026**, objet « la valeur du sauvé ». Une seule fiche.
3. **Le rapport interministériel IGA/CGAAER/IGEDD est daté de juillet 2023** sur sa page
   de garde, pas de janvier 2024 (qui est la publication). Distinguer remise et publication.
4. **La décision du Conseil d'État n° 507853 REJETTE le pourvoi syndical.** Élément à
   DÉCHARGE, grade A, pas grade C. Détail en §4.
5. **Le lien causal coupe → renoncement aux Canadair est établi par la Cour des comptes**
   (note d'exécution budgétaire 2024, p. 36), pas par un rapport de député.
6. **La répartition du financement des SDIS n'est pas contradictoire** : 53,6 % départements,
   35,5 % bloc communal, 5,2 % État, 1,3 % interventions facturées, exercice 2024.

---

## 3. Vague 1 — fiches grade A à créer

**Avant chaque création : `grep -ri "<slug ou mot-clé>" base/`.** Le run europe a
produit un doublon faute de cette vérification. Plusieurs pièces ci-dessous touchent des
domaines déjà ingérés (promesses, finances-publiques, ecologie-energie, europe) et
peuvent déjà exister en base sous un autre slug : dans ce cas, ENRICHIR la fiche
existante au lieu d'en créer une seconde.

### 3a. Les 16 fiches proposées par le run

| Slug proposé | Type | Domaines additionnels |
|---|---|---|
| `2022-10-28-promesse-16-canadair` | promesse, statut `abandonnee` | promesses |
| `2023-06-02-macron-nimes-derniere-livraison-2007` | declaration | |
| `2024-02-21-decret-annulation-programme-161` | mesure | finances-publiques |
| `2024-08-12-contrat-deux-dhc-515-resceu` | mesure | europe |
| `2022-10-03-refere-cour-comptes-flotte-aerienne` | affaire | |
| `2022-10-01-prorogation-mco-sabena` | mesure | |
| `2023-12-31-commande-36-h145` | mesure | |
| `2024-08-15-disponibilite-flotte-ete-2024` | affaire, grade B | |
| `2025-02-tsca-incendie-professionnel` | mesure | |
| `2025-11-17-revalorisation-vacations-spv` | mesure | |
| `2024-04-23-lancement-beauvau` | mesure | |
| `2025-09-04-remise-rapport-beauvau` | mesure | |
| `2023-07-10-loi-prevention-incendies` | mesure | ecologie-energie |
| `2021-11-25-loi-matras` | mesure | |
| `2018-02-21-arret-matzak` | affaire | |
| `2020-10-02-tempete-alex-retex` | mesure | |
| `2020-07-24-prime-de-feu-25-pct` | mesure | |

(Le run annonçait 16 ; la liste en compte 17 avec le dédoublement Beauvau, qui est voulu.)

### 3b. Fiches NOUVELLES issues du rattrapage, à ajouter à la vague 1

Toutes adossées à une source primaire vérifiée le 30/07, donc grade A sauf mention.

- **`2022-10-27-reponse-darmanin-refere-flotte`** (affaire ou declaration) — **LA PIÈCE
  MAÎTRESSE DU DOMAINE.** Lettre de Gérald Darmanin, ministre de l'Intérieur et des
  Outre-mer, du 27/10/2022, en réponse au référé S2022-1353. Elle dit que le gouvernement
  est « pleinement mobilisé pour accélérer les travaux permettant de définir précisément
  la stratégie d'évolution de la flotte aérienne » — **la veille de la promesse
  présidentielle du 28/10/2022**. Engagements pris : 36 hélicoptères inscrits dans un
  projet de loi d'orientation et de programmation, engagement rescEU. Nuances opposées à
  la Cour : pilotage interministériel nécessaire sur les implantations, arriérés de paie
  2018 non anormaux car issus de décrets rétroactifs.
  Sources : https://www.ccomptes.fr/fr/documents/62195 et le PDF
  https://www.ccomptes.fr/sites/default/files/2023-10/20221003--S2022-1353-flotte-aerienne-securite-civile-rep-MIOM.pdf
- **`2025-06-05-reponse-gouvernement-annulation-credits`** (declaration) — élément à
  décharge PARTIEL. Réponse au JO Sénat du 05/06/2025 p. 3108 à la question écrite n° 00419
  de Françoise Dumont (Var, LR), publiée le 03/10/2024 p. 3476. Le gouvernement n'annule
  pas le décret mais invoque les 40,2 M€ de CP réouverts par la LFG du 06/12/2024,
  affectés notamment à la Nouvelle-Calédonie. À qualifier : compensation incomplète
  (40,2 sur 52,77 M€), en CP seulement, tardive de neuf mois, réaffectée.
  Source : https://www.senat.fr/questions/base/2024/qSEQ241000419.html
  PIÈGE : la question date le décret du 22 février ; il est du 21. Ne pas propager.
- **`2022-10-iga-financement-sis`** (affaire) — rapport IGA n° 22015-R, octobre 2022,
  « Le financement des services d'incendie et de secours : réalisations - défis -
  perspectives », par Philippe Sauzey, Patricia Jannin et Thomas Montbabut. Commandé par
  note du 28/01/2022, fondement article 54 de la loi n° 2021-1520. Remis octobre 2022,
  transmis au Parlement fin décembre 2022, public en janvier 2023. Recommande le dégel
  des contributions communales, plus d'intercommunalités, un fonds d'intervention SDIS
  via la TSCA. Source : https://www.vie-publique.fr/files/rapport/pdf/288276.pdf
- **`2026-07-09-conseil-etat-spv-travailleurs`** (affaire) — voir §4, garde-fou obligatoire.
- **`2026-07-15-rapport-3065-valeur-du-sauve`** (affaire) — rapport d'information n° 3065,
  commission des finances, article 146 du Règlement, rapporteurs Damien Maudet et Sophie
  Pantel, 17e législature. Porte la répartition 2024 du financement des SDIS et le
  plafonnement L. 1424-35. Source :
  https://www.assemblee-nationale.fr/dyn/17/rapports/cion_fin/l17b3065_rapport-information
- **`2019-10-15-manifestation-nationale-pompiers`** (affaire, **grade B**) — grève déclenchée
  le 26/06/2019 par une intersyndicale se déclarant représentative de 85 % des personnels,
  mobilisation amorcée en mars 2019, manifestation nationale du 15/10/2019 de République à
  Nation, 7 000 à 10 000 participants selon les neuf syndicats (chiffre syndical, aucun
  chiffre préfecture capté), cortège dispersé aux canons à eau et gaz lacrymogènes.
  Revendications : prime de feu, effectifs, agressions, retraites. Contexte causal direct
  du décret prime de feu du 24/07/2020, à lier explicitement.
  **NE JAMAIS ÉCRIRE « de 18 à 25 % »** : le décret dit 19 → 25. Le 18 % est un chiffre
  avancé par les syndicats en 2019, à donner comme tel si utile.
  Consolider sur deux sources de presse indépendantes avant de verser.

### 3c. Deux notes de cadrage hors chronologie

- **Financement des SDIS et ligne de partage des payeurs.** Exercice 2024 : départements
  3,31 Md€ (53,6 %), bloc communal 2,19 Md€ (35,5 %), État 0,32 Md€ (5,2 %), interventions
  facturées 0,08 Md€ (1,3 %), total ≈ 6,17 Md€. Formule exacte du rapport : « les
  collectivités territoriales financent près de 90 % du budget des SDIS ». Mécanisme de la
  dérive : plafonnement du bloc communal par le 8e alinéa de l'article L. 1424-35 du CGCT
  (plafond glissant indexé sur l'inflation), donc la hausse retombe sur les départements.
  TSCA 2024 : 11,4 Md€ de produit total, 1,45 Md€ vers les SDIS selon France Assureurs,
  TSCA-SDIS = 6,45 % de l'assiette (5° bis de l'article 1001 du CGI), non affectée.
  2005-2025 : TSCA-SDIS +105 %, contributions départementales +104 %. Inégalité : Ardennes
  102 % de la contribution départementale couverte, Seine-et-Marne 21 %.
- **Rupture méthodologique BDIFF / EFFIS.** Trois chiffres légitimes pour 2022 : 58 981 ha
  (BDIFF forêt), 72 000 ha (ministère, tous espaces), ~74 654 ha (EFFIS satellite). Aucun
  n'est faux, les mélanger l'est. La BDIFF a changé de périmètre en 2023 avec l'intégration
  de Prométhée. **Et surtout : la série annuelle 2017-2026 n'existe pas au dossier**, donc
  interdiction d'écrire que 2022 ou 2026 sont des ruptures par rapport à une moyenne.

---

## 4. Garde-fous non négociables, à porter DANS les fiches

1. **Deux payeurs.** Toute fiche touchant aux SDIS, aux effectifs de pompiers ou aux
   indemnités porte une ligne explicite sur le payeur. L'État n'est pas à zéro sur les
   SDIS (5,2 % en 2024) : ne pas écrire « les SDIS ne sont pas financés par l'État ».
2. **Formulation de la charge centrale.** S'appuyer sur le chiffre 16 et sur l'échéance,
   jamais sur le verbe « remplacer », qui offre une défense sémantique. La fiche promesse
   est `type: promesse`, `statut: abandonnee`, et elle embarque les trois éléments à
   décharge : chaîne De Havilland fermée depuis 2015 et aucun Canadair réceptionné depuis
   le 15/05/2007 ; programme 161 en hausse de +106 % en AE 2017-2026 ; hélicoptères et
   locations effectivement financés. Sans eux la pièce est réfutable en une source.
3. **Conseil d'État n° 507853 du 09/07/2026** : le pourvoi du syndicat Sud Solidaires des
   personnels du SDIS du Nord est **REJETÉ**. Les SPV sont bien des « travailleurs » au
   sens de la directive 2003/88/CE, mais les dérogations françaises sont **validées**
   (article 22 et article 17 § 3). Aucune condamnation de la France. C'est un élément à
   DÉCHARGE. ECLI:FR:CESEC:2026:507853.20260709.
   Source : https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-07-09/507853
4. **Deux chiffres réfutés par la red-team, à ne jamais verser** : les « 224 000 évacués »
   de Saumos, et le ratio « DHC-515 national = 2 × coût rescEU ». La Cour chiffre
   l'appareil à 62 M€ TTC, l'écart avec la subvention européenne s'expliquant par la TVA
   à l'importation (23 M€), les douanes (3 M€) et les rechanges (13 à 35 M€).
5. **Piège causal** : aucune source ne relie la surface brûlée à la disponibilité des
   Canadair. Ne pas attribuer les 116 085 ha de 2026 au déficit de flotte.
6. **Effectifs en hausse** : volontaires +3 %, professionnels +9,4 % entre 2017 et 2025.
   Le point tenable est la durée d'engagement et la disponibilité en journée, pas le nombre.
7. **Disponibilité de la flotte** : citer côte à côte le taux moyen officiel (89,1 % en
   2023, 86 % en 2024, cible 98 %) et le creux ponctuel (3 Canadair sur 12 à certaines
   périodes de l'été 2024, constat FNSPF repris par deux rapports du Sénat, PAS une donnée
   ministérielle). Les confondre est une faute.
8. **Identifiants déjà tranchés, ne pas re-sonder** : décret n° 2020-903 =
   `JORFTEXT000042148192` (NOR INTE2001941D, JO 25/07/2020) ; arrêté du 17/11/2025 =
   `JORFTEXT000052868946` (NOR INTE2522673A, JO 28/11/2025) ; décret n° 2024-124 =
   `JORFTEXT000049180270`. Citer par numéro et date, l'identifiant en second.

---

## 5. Vague 2 — pièces à sonder avant de verser

Restent en grade C jusqu'à sondage : feu de Saumos (gironde.gouv.fr), bilan de saison 2026,
commande du 04/06/2026, mission flash de mai 2024, cyclone Chido, séisme du Teil, BASC
Nîmes-Garons, communiqué Départements de France.

Méthode qui marche, dans cet ordre : `WebSearch` pour localiser la page → `WebFetch` sur la
page pour confirmer le contenu → si c'est un PDF que WebFetch ne lit pas ou qui dépasse
10 Mo, `curl -sS -L -o fichier.pdf <url>` puis `pdftotext -layout`. Firecrawl en repli sur
les pages JS-heavy (`FIRECRAWL_API_KEY` dans `~/.zshenv`, faire `source ~/.zshenv` si absente).

Tout lien mort entraîne dégradation en D ou abandon de la pièce. **Ne jamais deviner ni
reconstruire une URL ou un identifiant.** Une source fantôme au milieu de faits établis
est la faute la plus coûteuse pour un dossier à charge.

Deux pages connues pour renvoyer 403 à WebFetch : `mobile.interieur.gouv.fr` et les
archives ministres sur `interieur.gouv.fr`. Passer par vie-publique.fr ou archive.org.

---

## 6. Ce qu'il ne faut PAS faire

- Ne pas lancer de run agy-deep. Le quota agy était épuisé le 30/07 à 06h30 et le
  rattrapage a été abandonné sur décision de Romain. Le domaine 12 `institutions` attend un
  GO explicite (tâche `#3`), pas d'initiative.
- Ne pas pousser sur GitHub. Sept commits `politique:` étaient déjà en attente le 30/07
  et Romain n'a pas tranché ce qui doit partir sur le remote.
- Ne pas verser d'un bloc les pièces solides et les pièces à sonder : c'est précisément le
  scénario que la méthode v0 cherche à éviter.

---

## 7. Fin d'ingestion

1. Mettre à jour la colonne **Ingestion** de la ligne 15 du tableau de `chronologie.md`
   avec le nombre RÉEL de fiches versées et enrichies, pas le nombre proposé ici.
2. Ajouter les fiches créées au tableau **Fiches** de `chronologie.md`.
3. Reporter dans le bloc « À re-vérifier » toute erreur du rapport corrigée en direct
   pendant l'ingestion, et tout lien mort constaté.
4. Commit scoped sur le corpus uniquement, message commençant par
   `politique: ingestion du domaine securite-civile`.
5. Clore la tâche `#2`.
