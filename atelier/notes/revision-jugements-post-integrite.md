# Révision des jugements après la campagne d'intégrité

> Note de chantier ouverte le 03/08/2026, à la clôture de la campagne
> d'intégrité des sources. Elle existe pour qu'une séance suivante exécute
> sans rien redécouvrir. Le contrat de la campagne qui la précède est dans
> [`campagne-integrite-sources.md`](campagne-integrite-sources.md).

## Pourquoi cette révision

Le 03/08/2026, 95 références officielles fabriquées ont été remplacées dans
`base/`. La réparation ne s'est pas limitée aux adresses : ouvrir les textes
a fait apparaître une douzaine d'erreurs de fond, dont une qui **inverse le
sens** d'une pièce.

Les quinze pièces de jugement et la synthèse ont été écrites sur les fiches
d'avant correction. Tant que la révision n'est pas faite, le dossier publie
des verdicts partiellement adossés à des faits qu'on sait faux. C'est le
seul chantier ouvert qui touche à ce que le lecteur voit.

## Les invariants qui gouvernent cette séance

Ils priment sur toute considération d'efficacité.

1. **Sens unique.** Le jugement lit les fiches, il ne les modifie jamais. Si
   la relecture d'une pièce révèle une erreur de fiche : corriger la fiche
   d'abord, dans un commit séparé, puis juger sur la fiche corrigée.
2. **Le juge lit les pièces, jamais des résumés de pièces.** Un sous-agent
   peut préparer la logistique (liste des fiches, frontmatters), jamais le
   fond. Cette note elle-même est de la logistique : elle dit où regarder,
   elle ne dispense pas de lire les fiches.
3. **Le grade commande la force de l'affirmation.** A et B autorisent
   l'affirmation pleine, C impose le conditionnel et ne peut jamais être
   déterminant dans un verdict.
4. **La synthèse en dernier.** C'est la seule pièce qui dépend des quinze
   autres. Ses fils transverses se re-testent après, pas pendant.

## Méthode à relire avant de commencer

`METHODE.md`, les deux sections qui portent l'écriture du jugement (§6 et §7
dans la numérotation actuelle) : les cinq sections fixes d'une pièce, le test
de contradiction en quatre attaques, et les retournements de charge. Une
candidate qui échoue au test va en section « ce qui est écarté » avec sa
raison, elle ne disparaît pas.

Frontmatter d'une pièce : `domaine`, `verdict`, `date_verdict`.

## Périmètre exact : ce qui a changé, et où le vérifier

Onze pièces sur seize citent une fiche dont le **fond** a bougé. Les autres
ne citent que des fiches dont seule l'URL a été réparée : elles ne sont pas
concernées par cette passe.

### ecologie-energie — FAIT le 03/08/2026, commit `80ca9a1`

Verdict inchangé (défavorable), huit points bougés, `date_verdict` avancé au
03/08. La décharge 3 versait un « préjudice regardé comme réparé » qui
n'existe pas ; elle est rectifiée et une charge apparaît en charge 3, avec
quatre limites dont la plus sérieuse : le constat d'inexécution figure dans
les motifs d'un jugement de rejet, pas dans son dispositif. Plan vélo et
police de l'eau passent de B à A et leurs constats sont attribués à la Cour
des comptes ; la limite d'entrée qui disait l'inverse tombe.

**Le huitième point n'était pas dans le tableau ci-dessous, et c'est la leçon
de la séance.** Croiser les fiches modifiées avec les fiches citées a fait
apparaître `2019-08-30-abandon-astrid-quatrieme-generation`, fiche de
grade A ajoutée au domaine par le rattrapage ciblé du 03/08 et que la pièce
du 31/07 ne pouvait pas connaître. Le contrat d'intégrité ne couvrait que les
références réparées ; la campagne de couverture avait ajouté de la matière en
parallèle. Voir plus bas « Le contrôle qui manquait ».

### ecologie-energie — les 7 points annoncés (traités)

| Fiche | Ce qui a changé, et ce qu'il faut vérifier dans la pièce |
|---|---|
| `2023-12-22-affaire-du-siecle-astreinte-rejetee` | **Sens inversé, le point le plus important de la séance.** La fiche disait « le préjudice de 15 Mt est regardé comme réparé ». Le tribunal juge l'inverse : il **constate que l'État n'avait pas entièrement réparé** au 31/12/2022, qu'il restait 3 à 5 Mt CO2e, et n'écarte l'astreinte (1,1025 Md€ demandés, plus 122,5 M€ par semestre) que parce que la tendance 2023 achèvera la réparation. **Manquement reconnu, sanction écartée.** Si la pièce a versé ce jugement en décharge, la décharge tombe et une charge apparaît. |
| `2021-10-01-boucliers-tarifaires-energie` | Le gel porte sur les tarifs d'**Engie** seulement, au niveau du **31/10/2021** et non du 01/10, du 01/11/2021 au 30/06/2022. |
| `2022-07-07-creation-sgpe` | Pellion nommé par décret du **13/07/2022**, non le 15. Cessation au 31/03/2025 par décret du 26/03. La vacance de poste, point à charge de la pièce, n'est pas affectée. |
| `2024-03-21-maprimerenov-retropedalage-monogestes` | Deux textes distincts du même jour : le **décret** prolonge le parcours monogeste des maisons F et G et lève l'obligation de geste de chauffage ; c'est l'**arrêté** qui lève l'obligation de DPE, du 15/05 au 31/12/2024. Ne plus attribuer les deux au décret. |
| `2025-02-14-versement-nucleaire-universel` | **Le seuil de 78 €/MWh ne figure pas dans la loi.** Le tarif de minoration est fixé par arrêté sur proposition de la CRE. Le seuil relève de l'accord État-EDF. Grade B maintenu. Si la pièce impute ce seuil à la loi de finances, corriger. |
| `2026-04-02-plan-velo-objectif-manque` | Fiche réécrite sur pièces et **rehaussée B → A** au rattrapage du 03/08 ; elle était datée par erreur du 15/04 et a été **renommée** au 02/04. Répercuter la mention de grade et la limite d'entrée. |
| `2026-05-12-cour-comptes-police-eau` | Idem : réécrite sur pièces et **rehaussée B → A**. La pièce la présentait comme non confirmée par la juridiction financière ; ce n'est plus le cas. |

### Les autres pièces

| Pièce | Fiche | Ce qui a changé |
|---|---|---|
| education-recherche | `2023-07-19-enseignants-hausse-partielle` | **2 550 € n'est pas le total** mais la seule part fixe ; la part fonctionnelle ajoute 1 250 €, soit 3 800 € cumulés. Et le décret ne fixe aucun montant, c'est l'arrêté du même jour. |
| education-recherche | `2024-03-15-choc-des-savoirs-groupes-de-besoins` | Les décrets sont du **16 mars**, seul l'arrêté est du 15. La prépa-seconde était une **phase pilote** pour la seule année 2024-2025. |
| education-recherche | `2024-11-28-choc-des-savoirs-annulation-abandon` | Le décret de 2026 ne **supprime** pas les groupes de besoins : il en retire le **caractère obligatoire**, l'arrêté jumeau abrogeant l'article 4-1 de l'arrêté de 2015. Les groupes restent une modalité possible d'un accompagnement renforcé. Le décret de juillet 2026 **élargit** la prépa-seconde au-delà des seuls élèves sans brevet. Une pièce qui écrit « abandon » ou « suppression » doit être nuancée. |
| economie | `2022-05-11-bareme-macron-validation-judiciaire` | **Chambre sociale, pas assemblée plénière.** Et deux arrêts d'objets distincts : le 21-14.490 sur la convention OIT n° 158 et le rejet du contrôle in concreto, le 21-15.247 sur l'absence d'effet direct de la Charte sociale européenne. |
| economie | `2021-10-01-boucliers-tarifaires-energie` | Voir ci-dessus. |
| justice-affaires | `2022-10-05-prescription-ferrand` | **Chambre de l'instruction** de Douai, non cour d'appel. Nomination au Conseil constitutionnel par **décision** du Président, non par décret. L'arrêt de cassation n'est pas publié sur le portail : la source est la publication d'Anticor, partie à l'instance. |
| justice-affaires | `2021-11-05-proces-benalla-premiere-instance` | Les peines des trois policiers sont **déclassées en grade B** : aucune pièce judiciaire au dossier ne les porte. Une charge qui s'appuyait dessus doit être réécrite au conditionnel ou écartée. |
| justice-affaires | `2021-12-08-demission-griset-condamnation` | Le décret de suspension de la Légion d'honneur est en **accès protégé** : il ne nomme publiquement ni l'intéressé ni la sanction. L'identification et la durée de cinq ans viennent de la presse. |
| institutions | `2022-10-05-prescription-ferrand` | Voir ci-dessus, surtout la nature de l'acte de nomination. |
| promesses | `2023-07-19-enseignants-hausse-partielle` | Voir ci-dessus. |
| promesses | `2024-06-09-dissolution-caducite-chantiers` | La réforme de l'assurance chômage est suspendue **par prolongation** des règles antérieures jusqu'au 31/07/2024, non par une suspension directe. Nuance de mécanisme, à vérifier si la pièce en tire un argument. |
| europe | `2023-12-08-pnrr-repowereu-40-3-milliards` | **La date du 08/12/2023 n'est pas confirmée** ; le montant de 40,3 Md€ l'est. Ne pas citer la date comme établie. |
| finances-publiques | `2023-12-08-pnrr-repowereu-40-3-milliards` | Idem. |
| industrie | `2025-02-14-versement-nucleaire-universel` | Voir ci-dessus, seuil de 78 €/MWh. |
| securite-immigration | `2023-11-02-reforme-ddpn` | Grade B **maintenu**, mais son motif change : c'est l'écart entre périmètre réel et communication qui le tient, plus une URL douteuse. Une pièce qui relativisait la fiche pour cause de sourçage incertain doit être réécrite. |
| libertes-publiques | `2026-03-20-vsa-prorogee-2027` | Fiche **rehaussée B → A** au rattrapage du 03/08, la prorogation au 31/12/2027 étant confirmée par l'article 47 de la loi et par la décision du Conseil constitutionnel. |
| synthese | `2021-10-01-boucliers-tarifaires-energie`, `2024-06-09-dissolution-caducite-chantiers` | Voir ci-dessus. **En dernier**, après les quinze. |

## Le contrôle qui manquait

Le tableau ci-dessus vient de la campagne d'intégrité : il ne connaît que les
fiches dont une **référence** a été réparée. Or la branche portait aussi un
rattrapage ciblé qui a **ajouté** de la matière. Une pièce peut donc être
périmée sans qu'aucune de ses citations n'ait bougé.

Deux commandes à passer sur chaque pièce avant de la réviser. La première
croise les fiches modifiées et les fiches citées, la seconde compare le
périmètre annoncé au périmètre réel.

```bash
git diff --name-only ba312c4..HEAD -- base/ | sed 's|base/||;s|\.md$||' > /tmp/mod.txt
grep -oFf /tmp/mod.txt jugement/<domaine>.md | sort -u

for f in base/*.md; do awk '/^domaines:/{print; exit}' "$f"; done | grep -c "\b<domaine>\b"
grep -oE "sur les [0-9]+ fiches" jugement/<domaine>.md
```

Résultat du passage du 03/08 sur les quinze : quatre écarts de périmètre, de
deux natures différentes.

| Pièce | Annoncé | Réel | Cause |
|---|---|---|---|
| education-recherche | 23 | 25 | matière ajoutée : `2019-07-26-loi-ecole-de-la-confiance` et `2023-12-05-pisa-2022-chute-mathematiques`, **grade A, non citées** |
| industrie | 69 | 70 | matière ajoutée : `2019-08-30-abandon-astrid-quatrieme-generation`, **grade A, non citée** |
| institutions | 82 | 84 | rien n'a bougé sur la branche : **le compte était faux au 31/07** |
| justice-affaires | 53 | 54 | idem, compte faux au 31/07 |

Les onze autres pièces annoncent juste. Pour les deux premières lignes, la
question est de fond : citer la fiche ou dire pourquoi on ne la cite pas.
Pour les deux dernières, c'est une correction de chiffre.

**Le premier des deux contrôles a payé encore plus.** Passé sur les seize
pièces, il a montré que le tableau des points ci-dessus, bâti sur la campagne
d'intégrité, ne voyait qu'une partie du gisement : **62 fiches ont changé au
fond**, et deux pièces déclarées hors périmètre par ce contrat en citaient
(`retraites-social`, cinq fiches ; `sante`, une). Le tri se fait en une
commande, en excluant les lignes d'URL du diff :

```bash
for f in $(cat /tmp/mod.txt); do
  d=$(git diff <base>..HEAD -- "base/$f.md" | grep '^[+-]' | grep -v '^[+-][+-]' | grep -v http)
  [ -n "$d" ] && echo "$f"
done > /tmp/fond.txt
grep -oFf /tmp/fond.txt jugement/<domaine>.md | sort -u
```

Sans ce tri, la plupart des 62 sont des gains de précision sans effet sur les
pièces (numéro de décision ajouté, article cité). Avec lui, on lit les diffs et
on voit lesquelles renversent une affirmation.

## Ordre de travail

1. ~~**`ecologie-energie`** en premier~~ **FAIT** le 03/08, commit `80ca9a1`.
2. ~~Puis les dix autres pièces~~ **FAIT** le 03/08. Douze pièces révisées au
   total, pas dix : le contrôle de périmètre en a ajouté deux que ce contrat
   déclarait hors périmètre (`retraites-social` et `sante`).
3. **La synthèse en dernier**, une fois les quinze arrêtées : re-tester les
   fils transverses qui citent un domaine révisé, re-motiver le verdict
   d'ensemble si besoin.

Commit dédié par pièce, convention du dépôt : `jugement <domaine> (<verdict>)`.
**Lire le `verdict:` au frontmatter avant d'écrire le sujet**, il ne se devine
pas : `promesses` et `europe` ont été committées avec le mauvais verdict au
sujet le 03/08, et il a fallu réécrire l'historique local pour les corriger.

## État au 03/08/2026

Treize pièces sur quinze révisées, aucun verdict déplacé. Deux gardent le
31/07 parce qu'aucune de leurs fiches n'a bougé au fond et que leur périmètre
annoncé était juste : `international` et `securite-civile`. La date fait
désormais signal.

| Pièce | Verdict | Ce qui a bougé |
|---|---|---|
| ecologie-energie | défavorable | 8 points, dont l'inversion de l'Affaire du Siècle et l'entrée d'ASTRID |
| education-recherche | défavorable | PISA 2022 ferme un trou nommé qui motivait le verdict ; loi école de la confiance en décharge ; choc des savoirs requalifié |
| justice-affaires | défavorable | deux décisions non publiées sur les portails, dit au périmètre ; LOPJ en emplois nets |
| institutions | défavorable | base juridique du conseil de défense (R\* 1122-1) sous la charge 4 |
| economie | défavorable | barème Macron : chambre sociale et non assemblée plénière, deux arrêts distincts |
| promesses | mitigé | la revalorisation enseignante n'est pas inconditionnelle ; plafond charbon borné dans le temps |
| libertes-publiques | défavorable | VSA B → A ; encadrement GendNotes au texte ; « menace nouvelle » |
| securite-immigration | défavorable | « menace nouvelle » (motivation inversée) ; réserve Mayotte ; décision du Conseil constitutionnel |
| industrie | défavorable | ASTRID en bornage de la décharge 2 ; seuil de 78 €/MWh hors de la loi |
| europe | défavorable | « menace nouvelle » ; réserve de datation PNRR |
| finances-publiques | défavorable | Fonds vert : 650 M€ au projet, 837 M€ au vote ; réserve PNRR |
| retraites-social | défavorable | contra-cyclicité : condition de réouverture et non de maintien ; barème et garde-fou familial du décret RSA |
| sante | défavorable | le fondement de l'opacité est le secret des délibérations, pas une classification défense |

Aucune charge déterminante n'est tombée, aucune décharge n'a disparu. Les
corrections ont surtout resserré des qualifications juridiques (formation de
juridiction, nature de l'acte, fondement du secret, motivation exacte du juge)
et rendu des limites plus honnêtes des deux côtés.

## `date_verdict` : tranché

**Oui, `date_verdict` avance dès que la pièce est modifiée**, même si le
verdict ne bouge pas. Décision de Romain, 03/08/2026. La règle est inscrite
au contrat du dépôt, à l'étape 6 de « Écrire ou réviser une pièce de
jugement » dans `CLAUDE.md` : elle vaut désormais pour toute révision future,
pas seulement pour cette séance.

Raison : la date dit quand l'appréciation a été portée, pas quand elle a
changé. Un lecteur qui voit `date_verdict: 2026-07-31` sur une pièce reprise
le 03/08 est mal informé sur la fraîcheur de ce qu'il lit.

Conséquence pratique pour cette séance : les seize pièces portent aujourd'hui
`date_verdict: 2026-07-31`. Chaque pièce touchée passe à sa date de révision.
Les cinq pièces non concernées gardent le 31/07, et c'est un signal utile :
leur appréciation n'a pas eu à être reprise.

## Ce qui n'est PAS dans cette séance

- **Les 262 sources mortes et 16 déplacées.** Mode de défaillance distinct et
  moins grave : le document existe, l'adresse a pourri. Aucun fait n'en
  dépend. À traiter après.
- **La campagne de couverture** (`methode-exhaustivite.md`, matrices dans
  `couverture/`). Ajouter de la matière pendant qu'on réaligne les jugements
  reviendrait à juger sur une base mouvante.
- **Les points de sourçage ouverts** listés en fin de
  `campagne-integrite-sources.md` : quatre affirmations de grade A sans
  source, et la date de la fiche PNRR qui pourrait entraîner un renommage.

## Décision en attente, hors séance

La branche `exhaut-v1` porte tout le travail du 03/08 et `main` est restée au
30/07 : le site publié ne connaît aucune des 95 réparations. Merge maintenant
ou après la révision des jugements ? Position recommandée : **après**,
publier des fiches corrigées sous des verdicts non révisés créerait
l'incohérence que le sens unique cherche à éviter. Décision de Romain.

## Contrôles avant chaque commit

```bash
bun run atelier/audit-publiabilite.ts     # doit dire VERDICT : OK
cd atlas && bun run build.ts              # doit dire 534/534 et Verdict : OK
```
