# Méthode de la synthèse faîtière

> Design validé le 2026-07-31. Porte sur les 15 pièces de jugement rendues au
> 31/07/2026. Complète
> `methodes/methode-recherche.md` et `methode-jugement.md` sans les réécrire ; sur les deux
> points où le §7 et le §9 de la méthode jugement disent autre chose (quatorze
> pièces, politique étrangère hors périmètre), ce document fait foi (§2).

## 1. Cadrage

- **Finalité** : inchangée. Éclairer le vote de Romain en mai 2027. Dossier
  strictement personnel, verrou de sortie absolu.
- **Les quatre arbitrages fondateurs** (proposés le 31/07/2026) :
  1. *Pas d'arithmétique des verdicts* : la table des 15 verdicts est un donné,
     jamais un calcul. Treize défavorables sur quinze n'impliquent par eux-mêmes
     aucun niveau d'ensemble. Le verdict se rend sur les fils transverses et les
     charges déterminantes qui convergent, pas sur un décompte.
  2. *La synthèse n'instruit pas* : elle se rend sur les 15 pièces de
     `jugement/`, pas sur les 511 fiches. Aucune charge ni décharge nouvelle ne
     peut naître en séance de synthèse. Si la lecture croisée en fait émerger
     une, elle passe d'abord par la révision de la pièce de domaine concernée
     (contrat §10 de la méthode jugement), puis la synthèse reprend.
  3. *Même standard, un cran plus haut* : standard contradiction inchangé,
     échelle commune inchangée, grade commandant la force de l'affirmation
     inchangé. Ce qui est propre à la synthèse est le standard de preuve du fil
     transverse (§5) et son test de contradiction (§6).
  4. *Portée 2027 en grille de lecture, jamais en consigne* : la synthèse arme
     la décision de vote, elle ne la rend pas. Macron ne se représente pas : ce
     qui se transmet en 2027, ce sont des personnes, des méthodes et des récits.
     La synthèse se clôt sur les questions que le bilan permet de poser à ceux
     qui s'en réclament ou le combattent, sans nom et sans pronostic.
- **Ce que la synthèse n'est pas** : pas une compilation des 15 verdicts (la
  table du §4 y suffit), pas une moyenne ni un score, pas un réquisitoire ni une
  réhabilitation, pas un programme, pas un pronostic électoral.

## 2. Position dans le poste et amendements emportés

```
politique/
├── methodes/methode-synthese      # ce document
└── jugement/
    ├── plan.md              # ligne S = suivi de la synthèse + prompt de séance
    └── synthese.md          # la pièce faîtière, unique, révisable
```

- Frontmatter de `synthese.md` : identique aux pièces de domaine pour garder le
  dossier `jugement/` mécaniquement uniforme (`grep "^verdict:"` rend les seize
  verdicts d'un coup) :

```markdown
---
domaine: synthese
verdict: <slug de l'échelle commune>
date_verdict: AAAA-MM-JJ
---
```

- Suivi : la ligne S de `atelier/plan-jugement.md` seulement. La colonne « Jugement » de
  `chronologie.md` est par domaine et ne bouge pas.
- **Amendements emportés par ce document** (datés du 31/07/2026, notes renvoyées
  dans la méthode jugement) :
  1. La synthèse porte sur **quinze** pièces, pas quatorze : `international` a
     été réouvert et jugé (mitigé) le 31/07/2026, après la rédaction de la
     méthode jugement.
  2. La limite « politique étrangère hors périmètre assumé, terrain écarté
     plutôt porté à l'actif » (§7 de la méthode jugement) est caduque. La limite
     réelle, à dire dans le périmètre de la synthèse, est celle héritée de la
     pièce `international` : corpus mince (27 fiches, deux runs Grok au statut
     partial), relations bilatérales hors Ukraine et Sahel non couvertes,
     divergence Kiel non tranchée.

## 3. Matière première et sens unique redoublé

- La séance lit les **15 pièces en entier**, dans l'ordre de la grille v0. Elles
  tiennent en contexte. Jamais de résumés, pas de subagent sur le fond : la
  règle du juge (§8 de la méthode jugement) vaut pour le juge des juges.
- Les fiches de `base/` ne s'ouvrent qu'en **sondage ciblé** : vérifier une
  pièce maîtresse citée par un fil, lever un doute de double comptage, contrôler
  un grade. Le déclencheur d'un sondage est toujours un doute précis, jamais une
  relecture générale : relire le socle, c'est refaire l'instruction, et
  l'arbitrage 2 l'interdit.
- **Sens unique redoublé** : la synthèse ne modifie ni fiche ni pièce. Erreur de
  fiche : séance socle ponctuelle (régime v0), puis correction de la pièce de
  domaine, puis synthèse. Erreur de pièce : révision de pièce (méthode jugement),
  puis synthèse. Toujours dans cet ordre, commits séparés.

## 4. Anatomie de la synthèse

Six sections fixes, dans cet ordre :

1. **Périmètre et limites** : ce sur quoi la synthèse se rend (les 15 pièces et
   leurs dates de verdict) et les limites dites d'entrée : déséquilibre de
   couverture 2017-2022 vs 2024-2026 (hérité du socle, il traverse tous les
   domaines), corpus international mince (§2), instruments sans série
   comparative (44.3, 47-1, procédure accélérée, référendums par présidence),
   et l'origine à charge du dossier, corrigée domaine par domaine par
   l'instruction, redite ici une fois pour toutes.
2. **La table des quinze verdicts** : slug, verdict, date du verdict, lien vers
   la pièce. Ordre de la grille v0, sans commentaire et sans classement.
3. **Les fils transverses à charge** : trois à cinq, ordonnés par poids,
   anatomie du §5.
4. **Les fils transverses à décharge** : traitement strictement symétrique à la
   section 3. La symétrie est ce qui rend le verdict d'ensemble crédible.
5. **Ce qui est écarté** : les récits globaux séduisants qui ne survivent pas au
   test du §6, chacun avec sa raison en une phrase ou deux. C'est ici que les
   grands récits médiatiques (« dérive autoritaire », « président des riches »,
   « tout est la faute d'une Assemblée ingouvernable », « bilan impossible à
   juger ») sont affrontés nommément, et que les cinq retournements de charge
   (§7 de la méthode jugement) reprennent du service si un fil tentait de
   ré-agréger ce que les pièces ont déjà écarté.
6. **Verdict d'ensemble** : niveau de l'échelle commune + motifs pesant
   explicitement les sections 3 et 4, citant les deux ou trois fils
   déterminants et leurs pièces maîtresses ; ce qui ferait basculer le niveau
   d'ici mai 2027 ; puis la portée 2027 (grille de lecture, arbitrage 4).

## 5. Le fil transverse : définition et standard de preuve

Un fil transverse est une affirmation qui n'appartient en propre à aucun domaine
et que plusieurs pièces établissent ensemble.

Anatomie d'un fil : l'affirmation + les pièces de domaine qui le portent (avec
leur verdict) + les deux ou trois fiches déterminantes en wikilinks avec leurs
grades + ce qui le limite. Comme pour une charge de domaine, la limite fait
partie du fil.

Standard de preuve, trois conditions cumulatives :

1. **Deux domaines minimum**, et le fil ne s'appuie que sur des charges ou
   décharges ayant survécu au test de contradiction dans leur pièce.
2. **Fiches d'appui distinctes** : le multi-tagging du socle fait qu'une même
   fiche vit dans plusieurs domaines. Une fiche citée par trois pièces est UN
   appui, pas trois. Un fil dont la convergence repose sur la même fiche vue
   sous plusieurs angles n'est pas transverse : il retombe dans un domaine.
3. **Le grade commande la force** (§5 de la méthode jugement, inchangé) : un fil
   déterminant pour le verdict d'ensemble repose sur du A/B.

Candidats hérités du §9 de la méthode jugement, à instruire sans préjuger de
leur survie : le rapport au Parlement (ordonnances + procédure accélérée + 47-1
+ budgets sans vote au fond), la verticalité (conseils de défense + refus
présidentiels de démission + délais de formation des gouvernements +
participation sans conséquence contraignante). D'autres fils peuvent émerger de
la lecture croisée, à charge comme à décharge.

## 6. Le test de contradiction au niveau synthèse

Tout candidat fil (à charge comme à décharge) passe quatre attaques avant
d'entrer en section 3 ou 4 ; sinon il va en section 5 avec sa raison.

1. **Double comptage** : le fil converge-t-il encore quand chaque fiche n'est
   comptée qu'une fois ? Sinon, il n'est pas transverse.
2. **Instruction nouvelle** : le fil tient-il debout avec la seule matière
   retenue par les pièces ? Un fil qui a besoin d'une charge qu'aucune pièce n'a
   retenue n'est pas un fil de synthèse : c'est une révision de pièce à faire
   d'abord, ou un candidat à écarter.
3. **Comparaison historique au carré** : un fil qui affirme une rupture propre à
   la période cite au moins une série comparative datée qui la porte (la leçon
   du socle : la ratification des ordonnances en a une, le 49.3 n'en a pas).
   Sans série, le fil se formule en descriptif borné, jamais en « du jamais
   vu ».
4. **Le meilleur contre-récit** : chaque fil est confronté explicitement au
   contre-récit global le plus fort le concernant (l'absence de majorité
   post-2022 explique la contrainte procédurale ; le déséquilibre de couverture
   gonfle la fin de période ; la conjoncture mondiale explique les résultats
   économiques). Le fil n'entre que si sa formulation survit au contre-récit,
   et la version qui entre dit en quoi.

## 7. Le verdict d'ensemble

- **Échelle commune** du §4 de la méthode jugement, étendue telle quelle
  (`tres-favorable`, `favorable`, `mitige`, `defavorable`,
  `gravement-defavorable`), même registre d'audit.
- Il se rend sur la **balance des fils** (sections 3 et 4), éclairée par la
  table des verdicts, jamais sur le décompte (arbitrage 1). Les motifs disent
  pourquoi ce niveau et pas les deux voisins, comme dans la pièce de référence
  `institutions`.
- Les motifs incluent, quel que soit le niveau, **ce qui ferait basculer**
  d'ici mai 2027 : les événements qui déclencheraient le contrat de réouverture
  (§10 de la méthode jugement) et dans quel sens ils pèseraient.
- **Portée 2027** : trois à cinq questions que le bilan arme, à poser à tout
  candidat qui revendique cet héritage ou le combat. Jamais un nom, jamais une
  consigne, jamais un pronostic.

## 8. Déroulé de la séance

Une séance unique, la dernière du chantier jugement :

1. Relire ce document en entier, puis les §4 à §7 de la méthode jugement
   (échelle, grades, test de contradiction, garde-fous et retournements).
2. Lire les 15 pièces de `jugement/` en entier, dans l'ordre de la grille v0.
   Fiches de `base/` en sondage ciblé seulement (§3).
3. Dresser les candidats fils, à charge et à décharge, en partant des candidats
   nommés (§5) sans s'y limiter.
4. Passer chaque fil au test du §6.
5. Rédiger `jugement/synthese.md` selon l'anatomie du §4. Contrôle mécanique :
   zéro wikilink mort, tout lien de pièce pointant vers un fichier existant.
6. Mettre à jour la ligne S de `atelier/plan-jugement.md`, committer
   (`politique: jugement synthese (<verdict>)`).
7. Récap pour Romain : fils retenus et écartés, balance, verdict motivé. La
   synthèse est validée par Romain comme chacune des 15 pièces.

Reprise à froid : prompt de séance autoportant tenu dans `atelier/plan-jugement.md`,
sous celui des domaines.

## 9. Révision de la synthèse

La synthèse est la seule pièce qui dépend des quinze autres. Toute révision
d'une pièce de domaine (contrat de réouverture, §10 de la méthode jugement)
déclenche un recheck de la synthèse : les fils citant le domaine révisé sont
re-testés, le verdict d'ensemble re-motivé si besoin, `date_verdict` mise à
jour. Le sens unique du §3 vaut aussi en révision : recheck de la synthèse ne
rouvre jamais ni pièce ni fiche.

## 10. Hors périmètre et interdits

- Pas de note chiffrée, pas de moyenne, pas de pondération explicite des
  domaines, pas de classement hors la table des verdicts.
- Pas de consigne de vote, pas de pronostic, pas de comparaison avec des
  candidats déclarés ou pressentis de 2027.
- Pas d'instruction nouvelle en séance de synthèse ; pas de run erom-research:agy, pas de
  Grok, pas de sondage web : la synthèse se rend sur pièces, le web n'y entre
  pas.
- Jamais de modification de fiche ni de pièce depuis la séance de synthèse.
- Verrou de sortie inchangé : rien de le corpus ne part vers un service
  externe sans demande explicite de Romain dans la session.
