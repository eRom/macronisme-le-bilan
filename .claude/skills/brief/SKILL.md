---
name: brief
description: Construit de bout en bout un brief de domaine du dossier — page autonome, référencement, carte OpenGraph générée, post X planifié, build et commit — puis s'arrête pour validation humaine avant toute mise en ligne. À utiliser dès que Romain demande un brief de domaine, sous n'importe quelle forme : « /brief europe », « fais le brief de la santé », « on ouvre un brief sur les retraites », « nouvelle page de partage pour tel domaine », ou même simplement « brief institutions ». Couvre aussi la régénération d'un brief existant. Ne pas s'en servir pour écrire une fiche de `base/` ni une pièce de `jugement/` : le brief est une vitrine du socle clos, il n'ajoute aucune matière.
---

# Construire un brief de domaine

Un brief est une page autonome sous `atlas/briefs/<domaine>/`, servie en
`/briefs/<domaine>/`, qui donne à un domaine jugé sa propre URL, son propre
référencement et sa propre carte de partage. L'atlas reste l'outil
d'exploration ; le brief est la porte d'entrée d'un domaine.

**Spec de référence, à lire si un point te manque :**
`atlas/docs/2026-08-07-briefs-domaines.md`. Elle porte la topologie, les cinq
contrôles bloquants et la règle du chiffre de signature. Ce runbook en est
l'exécution ; en cas de contradiction, la spec gagne.

## Ce que tu décides, et ce que tu ne décides pas

Tu enchaînes tout ce qui suit sans rien demander. Trois choix relèvent du
jugement — le chiffre de signature, les chapeaux propres au domaine, l'angle du
post — et tu les fais toi-même, **en écrivant à Romain pourquoi tu as retenu
celui-là et écarté l'autre**. Il arbitre à la fin, sur pièce, pas au milieu du
travail sur une question hors contexte.

En revanche tu ne mets rien en ligne de ta propre initiative : voir §11.

## §0 — Les deux gardes, avant tout le reste

**Le domaine doit être jugé.** Vérifie que `jugement/<domaine>.md` existe. Sinon,
arrête-toi et dis-le : un brief sans pièce de jugement n'a ni verdict, ni
charges, ni décharges, et le build le refusera de toute façon. Le slug est
exactement le nom du fichier de `jugement/`, sans alias.

**Le brief ne doit pas déjà exister.** Si `atlas/briefs/<domaine>/` est là,
**n'écris rien**. Dis ce que le dossier contient déjà, rappelle que
`index.html` porte de la rédaction humaine qu'un écrasement perd sans retour,
et demande si tu régénères. N'enchaîne qu'après un accord explicite — et même
alors, propose de ne régénérer que ce qui doit l'être (souvent la seule carte).

Ces deux gardes se vérifient en un seul appel, avant toute lecture.

## §1 — Lire la matière

Lis **la pièce de jugement en entier**. Pas son résumé, pas ses titres : les
limites de chaque charge (« ce qui limite la charge »), la section « ce qui est
écarté » et les motifs du verdict sont précisément ce qui empêche d'écrire une
vitrine malhonnête. C'est là que se trouvent les objections que ton post devra
préparer.

Sonde ensuite `base/` pour le domaine : dates extrêmes, répartition par année,
par type, par grade, URL distinctes. Un script jetable sur le frontmatter suffit.
Ce sondage sert deux choses : repérer les particularités à dire au lecteur (une
frise qui commence avant le quinquennat, une année vide, un taux de citation
inhabituel), et connaître les valeurs interdites du §4.

## §2 — Les compteurs, pris sur le corpus

Ne calcule jamais à la main le nombre de pièces citées : la règle de « citée »
(invoquée par une charge ou une décharge, à l'exclusion du périmètre et des
écartés) n'est portée que par `build.ts`.

Crée le dossier avec un `index.html` et un `brief.json` provisoires, lance
`bun run build.ts` depuis `atlas/`, et lis la section **« Briefs de domaine
émis »** de `build-report.md` :

```
- <domaine> — N pièces, M citées, verdict X
```

Elle est écrite même quand le brief échoue faute de `og.png`, ce qui est le cas
à ce stade. N'attends pas le message d'écart de `og_compteurs` pour ça : ce
contrôle vit dans la branche `else` du test d'existence de l'image, il ne se
déclenche pas tant qu'elle manque.

## §3 — Le chiffre de signature

Un chiffre par domaine, choisi dans les charges qui tiennent, qui donne son
accroche à la page. C'est la décision la plus lourde du brief.

**La règle du §8 de la spec, et elle n'est pas cosmétique :** quand une fiche
assortit un chiffre d'une correction, le chiffre retenu est **le chiffre
corrigé**. Un brief est une vitrine, c'est exactement l'endroit où un chiffre
choisi pour son effet ruine le dossier qu'il sert. Un chiffre qui survit à sa
propre correction devient inattaquable, et c'est ce qu'on cherche.

Passe chaque candidat au test suivant, et retiens celui qui y résiste :

- **Sa fiche est-elle de grade A, sur source primaire ?** Un chiffre de
  signature porté par du grade C est indéfendable.
- **Un lecteur hostile peut-il le démonter en une phrase ?** Si oui, il est
  mauvais quel que soit son effet. Méfie-toi particulièrement des comparaisons
  entre deux décomptes qui ne mesurent pas la même chose.
- **La fiche l'assortit-elle d'une correction, d'une année de repli, d'un
  avertissement ?** Alors la légende porte cette correction, dans la légende
  elle-même et pas ailleurs.

Écris-le dans `brief.json` avec sa légende et le slug de la fiche qui l'établit
— le build vérifie que cette fiche existe, rien de plus : l'exactitude du
chiffre reste ta responsabilité, et elle se vérifie en ouvrant la fiche.

## §4 — La page

Pars de `references/gabarit-index.html`. La topologie est fixe pour les quinze
domaines ; ce que tu écris est **la rédaction** : le titre et le chapeau de
chaque section, le bloc d'accents CSS, la favicon.

Le principe qui commande tout : **la page ne contient aucun chiffre, aucun
verdict, aucune date d'appréciation.** Elle arrange des blocs que `build.ts`
calcule puis injecte aux marqueurs `<!--BRIEF:XXX-->`. Une pièce révisée met
donc le brief à jour au prochain build, sans qu'on y touche. Un contrôle
bloquant refuse le build si une valeur est figée là.

Concrètement, ne doivent apparaître nulle part dans `index.html` : le libellé du
verdict (« Défavorable »), la date d'appréciation sous ses deux formes
(`2026-08-04` et « 4 août 2026 »), tout compteur du domaine à deux chiffres ou
plus pris isolément, et tout compteur rédigé en chiffres suivi de « charges »,
« décharges », « pièces », « URL » ou « sources distinctes ». Les commentaires
HTML sont exemptés : le contrôle les retire avant de scanner, et le build les
retire du rendu.

Donne à la page un caractère propre au domaine, mais **petit et justifié** : le
socle porte la topologie, ton bloc d'accents porte le registre. `institutions` a
pris la sécheresse d'un document parlementaire (petites capitales, chapeau en
italique) ; `libertes-publiques` le registre du constat (chapeau derrière un
filet de marge, comme un considérant), parce que sa matière est faite de
décisions. Cherche ce que la matière du domaine appelle, et commente-le dans le
fichier. Reste dans le design system institut : filets plutôt qu'ombres, angles
droits, **rien ne bouge au survol**, la garance au seul verdict, le vert au
seul acquis.

Le chapeau est aussi l'endroit où dire au lecteur ce que la frise a de
particulier — une série qui commence avant le quinquennat, une année sans
pièce. Une colonne vide est une information, pas un défaut de rendu.

## §5 — `brief.json`

Reprends celui d'un brief existant comme modèle. Il porte le titre et la
description de référencement, le chiffre de signature, le prompt de la carte, et
la garde qui enregistre l'état du corpus contre lequel la carte a été produite
(`og_verdict`, `og_date_verdict`, `og_compteurs`). Cette garde est bloquante :
une carte qui annonce un verdict périmé ment au lecteur avant même le clic.

Le titre de référencement tient en 60-70 caractères et nomme le domaine, la
période et la nature du travail. La description dit ce que le domaine couvre en
termes concrets — les sujets, pas les abstractions — et se termine sur la
formule du dossier : les faits sont séparés des jugements.

## §6 — La carte de partage

Suis `references/og-prompt.md` : il porte le squelette de prompt, la taille de
génération, la chaîne de réduction et le contrôle du texte.

Le point à ne pas rater : **relis l'image caractère par caractère avant de la
réduire**, accents compris. Le texte est figé dans les pixels, aucun contrôle
automatique ne peut le relire, et une faute se repaie en image entière.

## §7 — Build et vérifications

```bash
cd atlas
bun run build.ts
bun build ./src/app.ts --outdir ./dist --minify --target browser
```

Trois choses doivent être vraies, et se constatent, elles ne se supposent pas :

1. `build-report.md` dit **534/534** (ou l'effectif du jour) et « Verdict du
   build : OK », section « Briefs de domaine (bloquant) » à « aucun ».
2. Le **registre et les intitulés du jugement existent sans JavaScript** dans
   `dist/briefs/<domaine>/index.html`. C'est la raison d'être du brief côté
   référencement. Compte les lignes `b-reg-ligne` : il doit y en avoir autant
   que de pièces.
3. `bun run atelier/audit-publiabilite.ts` (depuis la racine) sort sans fuite.

## §8 — Vérifier le rendu, par la mesure

Sers `atlas/dist/` sur un port local — l'extension Chrome refuse les URL
`file://`, et c'est le seul moyen de piloter la page.

**Mesure le débordement horizontal plutôt que de le regarder.** Dans la page
servie, crée des iframes calibrées à 320, 375, 390, 430, 768 et 1100 px, et
compare `scrollWidth` à `clientWidth` de chacune ; liste au passage les éléments
dont le bord droit dépasse, c'est ce qui nomme le coupable en une passe. Ce
protocole a rattrapé un défaut du socle que deux relectures humaines et un
déploiement avaient laissé passer, parce qu'il ne se voyait qu'en dessous de
375 px. **Ne te fie pas à Chrome headless en `--window-size` étroit** : il a
affiché une page franchement débordante alors qu'elle ne l'était pas.

Exerce ensuite l'interactivité, toujours par le code plutôt qu'à l'œil : clique
un filtre et vérifie que tuiles **et** lignes de registre tombent au compte
attendu, reviens à « Tout », survole une tuile et vérifie que le cartouche se
remplit.

Enfin, **passe le rendu au juge visuel avant de le montrer à Romain** :
`/erom-taste-gate ds=institut <captures>`, avec au moins le repos desktop, le
repos mobile et un survol. Un FAIL se corrige avant de présenter.

## §9 — Le post

Écris une étape dans `reseaux-sociaux/posts-planning.md`, sur le modèle des
étapes existantes — elles portent la doctrine du compte, lis-les. Ce fichier est
volontairement hors du dépôt (`.gitignore`) : c'est un document de travail, il
ne partira pas au commit, et c'est normal.

Ce qu'une étape contient : la date et sa fenêtre, le canal, le lien, la consigne
**aucune pièce jointe** (la page porte sa carte, une image jointe la
remplacerait et ferait perdre l'aperçu), l'angle, la liste de ce qu'il ne faut
pas écrire, le texte final prêt à coller, la reply GitHub, et **deux ou trois
replies de secours**.

Les replies de secours sont la partie utile : va chercher dans « ce qui est
écarté » et dans les limites des charges les objections que la pièce a déjà
traitées, et prépare la réponse. Le texte du post ne redit jamais les chiffres
que la carte affiche déjà. Pas de hashtag, `#Macron` à la rigueur.

Programme le post en respectant la fenêtre mardi-jeudi et en laissant respirer
le précédent brief — et rappelle la règle que le document se donne à lui-même :
un nouveau brief se décide après mesure du précédent, pas sous l'effet d'un bon
score.

## §10 — Commit

Commite les seuls fichiers du brief (`index.html`, `brief.json`, `og.png`), plus
`build.ts` si tu as dû y toucher. Suis le registre des commits du dépôt : titre
`atlas : …` en minuscule, et un corps qui explique **les décisions et leurs
raisons**, pas la liste des fichiers. Dis ce que tu as vérifié et comment.
Termine par les deux lignes d'attribution en usage dans le dépôt.

Commiter avant validation est voulu : git ne coûte rien et le travail est à
l'abri. Un retour de Romain se règle par un commit de plus.

## §11 — Présenter, et s'arrêter là

**Ne déploie pas.** Chaque `netlify deploy` consomme des crédits que Romain
paie, et une autorisation vaut pour le changement qu'elle vise, jamais pour le
suivant.

Présente : le brief et son chiffre de signature **avec la raison de l'écarté**,
le post, ce que le build et les mesures ont donné, et les décisions où tu t'es
écarté de l'évidence. Ouvre la page en local (`open` sur le fichier de `dist/`,
qui fonctionne en `file://`). Termine par l'état exact du décalage entre le
dépôt et la production, et laisse les commandes prêtes sans les lancer.

Si Romain valide : `netlify deploy --prod --dir=dist` depuis `atlas/`, puis
`git push`. Sinon, la conversation continue et le commit sert de filet.

Un déploiement différé ne crée aucune dette : `--dir=dist` envoie un instantané
complet et atomique, et le site ne pose aucun cache long. Seule précaution le
jour venu — **relancer le build**, `dist/` n'étant pas versionné.
