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

**Trois lectures valent d'être faites tôt**, parce que plusieurs instructions
d'ici ne s'exécutent bien qu'en les connaissant : l'émetteur de briefs dans
`atlas/build.ts` (la section « briefs de domaine », qui porte tous les contrôles
bloquants), `atlas/briefs/_socle/brief.css` (les classes disponibles et celles
qui portent déjà un filet), et **un brief existant** — `institutions` ou
`libertes-publiques` — dont le `brief.json` et l'`index.html` sont les meilleurs
modèles qui soient.

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

**La clé est `domaines:`, au pluriel et sous forme de liste** — une fiche relève
souvent de plusieurs domaines. Filtre par appartenance à cette liste, jamais par
égalité. Le singulier `domaine:` est la clé de `jugement/` : un filtre dessus
rend zéro fiche, et le script plante deux lignes plus loin sans dire pourquoi.

Ce sondage sert deux choses : repérer les particularités à dire au lecteur (une
frise qui commence avant le quinquennat, une année vide, un taux de citation
inhabituel), et connaître les valeurs interdites du §4.

## §2 — Les compteurs, pris sur le corpus

Ne calcule jamais à la main le nombre de pièces citées : la règle de « citée »
(invoquée par une charge ou une décharge, à l'exclusion du périmètre et des
écartés) n'est portée que par `build.ts`.

Crée le dossier avec son `index.html` — **écris-le définitif dès maintenant**,
le §4 le rend indépendant des compteurs par construction, un brouillon jetable
serait du travail perdu — et un `brief.json` dont seuls les `og_compteurs` sont
provisoires. Lance `bun run build.ts` depuis `atlas/`, et lis la section
**« Briefs de domaine émis »** de `build-report.md` :

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

Passe chaque candidat aux trois tests. **Ils ne sont pas parallèles** : le
troisième arbitre le deuxième, et lire la liste comme trois gardes indépendantes
mène à une impasse dès qu'un domaine porte une décharge forte — ce qui sera le
cas de plusieurs des douze domaines restants.

1. **Sa fiche est-elle de grade A, sur source primaire ?** Un chiffre de
   signature porté par du grade C est indéfendable, et un chiffre spectaculaire
   de grade B — typiquement une allégation associative relayée en source
   parlementaire — meurt ici, quel que soit son effet.

2. **Que reste-t-il du chiffre une fois sa correction appliquée ?** La question
   n'est pas « peut-on lui opposer une objection » : tout chiffre en appelle
   une, et un domaine sérieux en fournit toujours. Elle est **« reste-t-il
   quelque chose après » **. Un chiffre dont la correction absorbe l'essentiel
   de la substance est mauvais même s'il est de grade A : si retirer ce que la
   pièce concède ramène l'accroche à une valeur qui ne dit plus rien, écarte-le.

3. **La fiche l'assortit-elle d'une correction, d'une année de repli, d'un
   avertissement ?** Alors la légende porte cette correction, **dans la légende
   elle-même et pas ailleurs**. C'est ce qui neutralise le test 2 : un chiffre
   dont la correction est déjà inscrite n'est plus démontable, il est seulement
   attaquable, et l'attaque tombe sur une légende qui l'attendait.

Le bon candidat est celui qui **survit à sa propre correction** : même en
accordant intégralement la décharge la plus forte du domaine, il reste vrai et
il reste parlant.

Écris-le dans `brief.json` avec sa légende et le slug de la fiche qui l'établit
— le build vérifie que cette fiche existe, rien de plus : l'exactitude du
chiffre reste ta responsabilité, et elle se vérifie en ouvrant la fiche.

**Consigne l'arbitrage dans `brief.json`, sous une clé `_chiffre_ecarte`.** Le
fichier porte déjà des clés préfixées `_` qui ne servent qu'à la reprise
humaine ; c'est leur emploi. Le corps du commit et le message final le redisent,
mais c'est là qu'il survit à la conversation.

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
(`2026-08-04` et « 4 août 2026 »), et tout compteur rédigé en chiffres suivi de
« charges », « décharges », « pièces », « URL » ou « sources distinctes ».

S'y ajoutent **six compteurs**, cherchés tels quels dès qu'ils valent 10 ou plus
— `fiches`, `citees`, `urls`, `charges`, `decharges`, `gradeA`. Les deux
derniers surprennent : `urls` et `gradeA` ne se devinent pas comme des
« compteurs du domaine », et ils ne sont connus qu'après le premier build. Deux
d'entre eux peuvent tomber sur la même valeur, ce qui rend le motif d'autant
plus facile à heurter par accident. Écris la page sans aucun nombre et la
question ne se pose pas.

Les commentaires HTML sont exemptés : le contrôle les retire avant de scanner,
et le build les retire du rendu.

Deux choses que le build vérifie aussi, sans que ça se voie d'ici. Tout renvoi
`src=` ou `href=` vers `../_socle/…` doit pointer un fichier réel — le gabarit
en porte trois, garde-les tels quels. Et **le nom affiché du domaine vient de la
pièce de jugement**, pas de `brief.json` : tu n'as rien à déclarer pour lui.

**Lis `atlas/briefs/_socle/brief.css` avant d'écrire ton bloc d'accents.** Sans
ça, l'accent se pose à l'aveugle : la classe que tu vises porte peut-être déjà
un filet, et tu le doublerais.

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

**C'est le second build**, celui qui compte : le premier, au §2, n'était là que
pour lire les compteurs, et il échouait forcément faute de carte. Maintenant que
`og.png` existe et que `brief.json` porte les vrais `og_compteurs`, la garde de
la carte se déclenche enfin et le verdict global devient significatif.

```bash
cd atlas
bun run build.ts
bun build ./src/app.ts --outdir ./dist --minify --target browser
```

La seconde ligne reconstruit l'application de l'atlas, dont le brief ne dépend
pas — il ne charge que `_socle/`. Elle est là pour que `dist/` reste cohérent en
vue d'un déploiement, pas pour le brief : un échec là ne dit rien sur ton
travail.

Trois choses doivent être vraies, et se constatent, elles ne se supposent pas :

1. `build-report.md` dit **534/534** (ou l'effectif du jour) et « Verdict du
   build : OK », section « Briefs de domaine (bloquant) » à « aucun ».
2. Le **registre et les intitulés du jugement existent sans JavaScript** dans
   `dist/briefs/<domaine>/index.html`. C'est la raison d'être du brief côté
   référencement. Compte les lignes `b-reg-ligne` : il doit y en avoir autant
   que de pièces.
3. `bun run atelier/audit-publiabilite.ts` (depuis la racine) sort sans fuite.

## §8 — Vérifier le rendu, par la mesure

Sers `atlas/dist/` sur un port local, par exemple :

```bash
cd atlas/dist && python3 -m http.server 8777
```

Deux raisons, et la seconde est la vraie : l'extension Chrome refuse les URL
`file://`, et surtout `contentDocument` d'une iframe y est inaccessible par
politique d'origine. Le §11 vante plus loin l'ouverture en `file://`, qui est
un critère réel de la spec — mais **les mesures ci-dessous ne s'y font pas**, on
n'y récolterait qu'une erreur opaque.

**Mesure le débordement horizontal plutôt que de le regarder.** Dans la page
servie, crée des iframes calibrées à 280, 320, 375, 390, 430, 768 et 1100 px, et
compare `scrollWidth` à `clientWidth` de chacune ; liste au passage les éléments
dont le bord droit dépasse, c'est ce qui nomme le coupable en une passe. Ce
protocole a rattrapé un défaut du socle que deux relectures humaines et un
déploiement avaient laissé passer, parce qu'il ne se voyait qu'en dessous de
375 px.

**Deux méthodes qui mentent, et il faut le savoir avant de les croire.** Chrome
headless en `--window-size` étroit a affiché une page franchement débordante
alors qu'elle ne l'était pas. Et `resize_window(390, …)` répond
`Successfully resized` puis laisse `window.innerWidth` à plus de 1600 : macOS
impose une largeur de fenêtre minimale, et l'échec est parfaitement silencieux.

**Pour la capture mobile**, que le juge visuel réclame : rends la page dans une
iframe **visible** de 390 px placée en haut à gauche, le reste du document vidé
et le fond neutralisé, puis capture la région `[0, 0, 390, 845]` par `zoom`.
Pour atteindre un bloc plus bas, repositionne le cadre en `top` négatif plutôt
que de faire défiler. Vérifie `innerWidth` dans le cadre avant de capturer :
c'est ce qui distingue une vraie capture mobile d'une page large photographiée
de près.

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

**Le document porte aussi un tableau « Planning » en tête**, avec un statut par
étape. Ajoute-y ta ligne : écrire la section et laisser le tableau périmé est
l'oubli classique.

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
le précédent brief.

Le document se donne à lui-même une règle — un nouveau brief se décide après
mesure du précédent, pas sous l'effet d'un bon score — **et il consigne aussi
qu'elle a déjà été levée une fois, par décision.** Tu vas donc tomber sur une
note qui dit les deux. Ne la contredis pas sans la voir : la sortie propre est
de distinguer la fabrication de la publication. Construire la page ne consomme
rien ; c'est l'envoi qui se discipline. Pose donc une condition de départ
explicite sur l'étape que tu écris — le post précédent doit avoir été mesuré
avant que celui-ci parte.

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

Dis franchement ce que tu **n'as pas** pu vérifier. Le critère « fonctionne
entièrement en `file://` » de la spec, notamment, ne s'établit ici que
structurellement — script classique et non module, pas de `defer`, chargé après
le bloc de données, aucune ressource distante — puisque les mesures du §8
exigent une origine servie. C'est une limite connue, pas un oubli : la nommer
vaut mieux que laisser croire à une vérification qui n'a pas eu lieu.

Si Romain valide : `netlify deploy --prod --dir=dist` depuis `atlas/`, puis
`git push`. Sinon, la conversation continue et le commit sert de filet.

Un déploiement différé ne crée aucune dette : `--dir=dist` envoie un instantané
complet et atomique, et le site ne pose aucun cache long. Seule précaution le
jour venu — **relancer le build**, `dist/` n'étant pas versionné.
