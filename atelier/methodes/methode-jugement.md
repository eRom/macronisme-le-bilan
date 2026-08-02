# Méthode de la couche jugement

> Design validé le 2026-07-31. Porte sur le socle clos au 30/07/2026 (511 fiches,
> 14 domaines). Complète `methodes/methode-recherche.md` sans le modifier : le socle reste régi
> par la v0, le jugement par ce document.

## 1. Cadrage

- **Finalité** : éclairer le vote de Romain en mai 2027. Dossier strictement
  personnel, verrou de sortie absolu (aucun service externe, jamais).
- **Les quatre arbitrages fondateurs** (décidés le 31/07/2026) :
  1. *Standard contradiction* : le lecteur est Romain, mais chaque affirmation
     est écrite pour survivre à un contradicteur hostile. Aucun argument qui se
     réfute en une phrase.
  2. *Décharge dans le corps, verdict libre* : charges et décharges sont pesées
     ensemble, au même niveau ; un domaine peut finir n'importe où sur l'échelle
     du §4. Le dossier reste à charge par construction (c'est son origine),
     le jugement ne l'est pas par obligation.
  3. *Grain par domaine* : une pièce de jugement par domaine de la grille v0,
     plus une synthèse faîtière écrite en dernier.
  4. *Échelle fixe et motifs* : chaque pièce conclut par un verdict sur l'échelle
     commune (§4), motivé en prose.
- **Ce que le jugement n'est pas** : pas un résumé jugé du rapport de recherche
  (il se rend sur les fiches, pas sur les runs), pas un réquisitoire (le verdict
  est libre), pas une note chiffrée (l'échelle est qualitative).

## 2. Structure

```
politique/
├── methodes/methode-jugement.md      # ce document
├── jugement/
│   ├── plan.md              # tableau de bord : domaines jugés / à juger, volumes
│   ├── <slug-domaine>.md    # une pièce par domaine, slug identique à la grille v0
│   └── synthese.md          # écrite après les 14 pièces
```

- Nommage : le slug exact de la grille §4 de la v0 (`institutions.md`,
  `finances-publiques.md`...). Pas de date dans le nom : une pièce de jugement
  se révise, elle ne se périme pas par construction comme une fiche.
- Suivi : `atelier/plan-jugement.md`, tableau de bord dédié du chantier (une ligne par
  domaine, volumes de fiches, verdicts), doublé de la colonne « Jugement » de
  `chronologie.md`. Les deux se mettent à jour dans le même geste de fin de
  séance (§8).

## 3. Anatomie d'une pièce

Frontmatter minimal :

```markdown
---
domaine: institutions
verdict: defavorable        # slug de l'échelle du §4
date_verdict: 2026-08-02
---
```

Cinq sections fixes, dans cet ordre, mêmes titres partout :

1. **Périmètre** : ce que le domaine couvre, renvois aux domaines voisins,
   limites héritées de la recherche, dites d'entrée (dont le déséquilibre de
   couverture 2017-2022 vs 2024-2026 quand il joue).
2. **Les charges qui tiennent** : chaque charge = affirmation + pièces citées en
   wikilinks avec leurs grades + ce qui la limite. Ordonnées par poids.
3. **Les décharges qui tiennent** : traitement strictement symétrique à la
   section 2. La symétrie est ce qui rend le verdict crédible.
4. **Ce qui est écarté** : les charges (ou décharges) séduisantes qui ne
   survivent pas au test de contradiction (§6), chacune avec sa raison en une
   phrase. Cette section désarme le contradicteur d'avance ; les retournements
   de charge applicables au domaine (§7) y vivent.
5. **Verdict** : niveau de l'échelle + motifs. Les motifs pèsent explicitement
   les sections 2 et 3 et citent les deux ou trois pièces déterminantes.

## 4. L'échelle du verdict

Cinq niveaux symétriques, registre d'audit, communs aux 14 domaines
(slugs : `tres-favorable`, `favorable`, `mitige`, `defavorable`,
`gravement-defavorable`) :

| Niveau | Critère d'attribution |
|---|---|
| très favorable | les décharges A/B dominent nettement ; charges résiduelles mineures ou écartées |
| favorable | la balance penche à décharge ; des charges réelles subsistent mais secondaires |
| mitigé | charges et décharges de poids comparable ; les motifs disent ce qui ferait basculer |
| défavorable | une ou plusieurs charges déterminantes (A/B) tiennent après contradiction, sans compensation |
| gravement défavorable | charges déterminantes multiples et convergentes ; décharges marginales |

Le verdict se rend sur la balance des sections 2 et 3, jamais sur l'impression
générale. L'asymétrie du dossier d'origine (à charge) ne crée aucun droit à un
verdict défavorable : un domaine instruit à charge peut finir favorable.

## 5. Le grade commande la force de l'affirmation

Le pont entre le socle et le jugement. Une affirmation du jugement hérite du
grade de ses pièces :

| Grade des pièces | Ce que l'affirmation a le droit de dire |
|---|---|
| A | affirmation pleine, opposable (document officiel, jugement définitif) |
| B | affirmation pleine, présentée comme sourcée presse |
| C | conditionnel obligatoire, signalée comme allégation |
| D | n'entre jamais dans un jugement |

Corollaires :
- Pas de charge ni de décharge sans wikilink vers ses pièces.
- Une affirmation portée uniquement par du C ne peut pas être déterminante dans
  un verdict.
- Sens unique : le jugement lit les fiches, ne les modifie jamais. Si l'écriture
  d'une pièce révèle une erreur de fiche, on corrige la fiche d'abord (session
  socle ponctuelle, commit séparé), puis on juge sur la fiche corrigée. Le socle
  est clos à l'ajout de matière, pas à la correction d'erreurs.

## 6. Le test de contradiction

Toute candidate (charge comme décharge) passe quatre attaques avant d'entrer en
section 2 ou 3. Elle n'y entre que si elle survit ; sinon elle va en section 4
avec sa raison. Les quatre attaques, tirées des leçons du socle :

1. **Comparaison historique** : le fait est-il propre à la période, ou continu
   voire antérieur ? (L'attaque qui a tué la charge 49.3, les volumes
   d'ordonnances, le rythme des conseils de défense.)
2. **Biais de période ou de mesure** : pic isolé pris pour une tendance, biais
   de recul, deux bornes de mesure prises pour une contradiction. (Feux 2022,
   taux de ratification mesuré trop tôt, durée des affaires courantes 2024.)
3. **Nature juridique exacte** : cavalier législatif vs censure de fond, secret
   des délibérations du Gouvernement vs secret de la défense nationale,
   régime d'exception vs circonstances exceptionnelles. (Les confusions que la
   red-team du socle a relevées le plus souvent.)
4. **Solidité des pièces** : grades réels, sources encore vivantes, identifiants
   sondés. Tout identifiant non sondé est présumé faux (règle du socle).

## 7. Garde-fous permanents

**Les cinq retournements de charge.** Comparaison historique jouant contre la
thèse d'une rupture macroniste. Toute pièce touchant un de ces sujets intègre le
retournement, sans exception :

| Sujet | Retournement | Domaines concernés |
|---|---|---|
| 49.3 | record individuel Rocard (28 sur 13 textes vs 23 sur 6 pour Borne) ; cadre restreint en 2008 | institutions, libertes-publiques |
| Volumes d'ordonnances | hausse continue depuis 2007, accélération maximale sous Hollande (+78,3 %) | institutions |
| Conseils de défense | rythme hebdomadaire institué en juillet 2016 sous Hollande ; 2022 (38 réunions) en dessous | institutions, sante |
| Feux de forêt | 2022 pic isolé (5,7 × la moyenne) ; 2024 campagne la plus calme (0,27 ×) | securite-civile, ecologie-energie |
| Censures constitutionnelles | 32 articles (immigration) et 7 (budget 2026) sont des cavaliers, pas des censures de fond | institutions, securite-immigration, finances-publiques |

**Les trois charges qui survivent au test** (établies le 30/07, à porter là où
elles s'appliquent) : ratification des ordonnances (79,6 % puis 61,3 % puis
20,3 %, rupture datée de 2017 qui survit à la correction du biais de recul) ;
procédure accélérée quasi systématique sans gain d'application (constat du Sénat
lui-même) ; transmission de PLFSS au Sénat sans vote de l'Assemblée, trois fois
en trois ans.

**Les deux limites de périmètre, jamais tues** : le dossier couvre l'action
intérieure (la politique étrangère est hors périmètre assumé et le terrain
écarté est plutôt porté à l'actif : la synthèse le dit en clair) *(amendé le
31/07/2026 : `international` réouvert et jugé le jour même ; la limite devient
le corpus mince du domaine, voir `methodes/methode-synthese` §2)* ; les fiches
restent factuelles, le jugement vit dans `jugement/` seulement.

**Notes de cadrage à relire avant d'écrire les domaines concernés** :
`base/2026-07-30-arsenal-parlementaire-ce-qui-nest-pas-mesurable.md`
(institutions, libertes-publiques),
`base/2017-05-14-base-juridique-conseil-de-defense.md` (institutions, sante),
`base/2023-01-01-rupture-bdiff-effis.md` (securite-civile, ecologie-energie).

## 8. Déroulé d'une séance

Une séance = une pièce. Séquence :

1. Relire **toutes** les fiches du domaine (17 à 69 selon le domaine : elles
   tiennent en contexte) et la section « À re-vérifier » du domaine dans
   `chronologie.md`. Le juge lit les pièces, jamais des résumés de pièces : un
   subagent peut préparer la logistique (liste des fiches du domaine,
   frontmatters), pas le fond.
2. Dresser les candidates charges et décharges.
3. Passer chaque candidate au test de contradiction (§6).
4. Rédiger la pièce selon l'anatomie du §3.
5. Mettre à jour `atelier/plan-jugement.md` et la colonne « Jugement » de
   `chronologie.md`, committer (message : `politique: jugement <domaine>
   (<verdict>)`).

- **Pilote** : `institutions` en première pièce, pour roder le format (domaine
  le plus frais, garde-fous les plus travaillés, trois charges survivantes et
  trois retournements s'y croisent). Validation du format par Romain sur cette
  pièce avant de dérouler les 13 autres. **Rendu le 31/07/2026 (défavorable) et
  format validé par Romain le même jour : le moule fait foi pour les 13 pièces
  restantes.**
- **Ordre ensuite** : choisi par Romain en début de séance. Pas de routine, pas d'automatisation : des séances à la demande.
- **Reprise à froid** : un prompt de séance autoportant, à coller après /clear
  ou /compact avec le slug du domaine choisi, est tenu dans `atelier/plan-jugement.md`.

## 9. La synthèse faîtière

*(Amendé le 31/07/2026 : les pièces sont quinze depuis la réouverture
d'`international` ; la méthode complète de la synthèse vit dans
`methodes/methode-synthese`, qui fait foi sur ce paragraphe.)*

`jugement/synthese.md`, écrite après les 14 pièces :

- table des 14 verdicts ;
- trois à cinq fils transverses courts, qui n'appartiennent à aucun domaine :
  le rapport au Parlement (ordonnances + procédure accélérée + 47-1), la
  verticalité (conseils de défense + refus présidentiels de démission + délais
  de formation des gouvernements), autres fils émergeant des pièces ;
- les limites du dossier dites en clair (périmètre intérieur, déséquilibre de
  couverture temporelle) ;
- le verdict d'ensemble, orienté décision de vote de mai 2027.

## 10. Contrat de réouverture

Le jugement porte sur le socle clos au 30/07/2026. Par défaut, rien ne rouvre.
Si un événement paraît majeur à Romain d'ici mai 2027 (censure, dissolution...),
il décide explicitement une session de mise à jour ciblée : quelques fiches dans
le domaine concerné (régime v0 : sondage manuel, pas de run erom-research:agy), puis
révision de la seule pièce de jugement du domaine, verdict et
`date_verdict` compris. Le grain par domaine rend l'opération chirurgicale.

## 11. Hors périmètre et interdits

- Pas de veille continue, pas de routine automatisee.
- Jamais de jugement dans les fiches ; jamais de modification de fiche depuis
  une séance de jugement (§5, sens unique).
- Pas de run erom-research:agy : le socle est clos, les rattrapages éventuels passent par
  le régime de sondage manuel de la v0.
- Pas de note chiffrée, pas de moyenne, pas de classement des domaines hors la
  table des verdicts.
- Verrou de sortie inchangé : rien de le corpus ne part vers un service
  externe sans demande explicite de Romain dans la session.
