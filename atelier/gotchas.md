# Gotchas

Les pièges rencontrés en construisant ce dossier, avec ce qui a marché. Écrit
pour épargner à quelqu'un d'autre le temps qu'ils ont coûté.

## Sourcing et vérification

**Certains domaines sont inaccessibles à la récupération automatique.**
`theguardian.com` et `web.archive.org` ont refusé toute lecture par l'outil de
fetch de l'agent, les deux le même jour (31/07/2026). Contournement éprouvé :
récupérer la page à la main dans le navigateur, puis en archiver une copie datée
à côté du corpus pour les re-vérifications futures. Précédent :
[`research/annexes/`](research/annexes).

**Une copie d'archive ne se publie pas telle quelle.** Archiver un article de
presse entier est légitime en local pour revérifier un verbatim. Le publier sous
la licence du dépôt affirmerait une réutilisabilité qui n'existe pas. À la
publication, réduire l'archive aux seuls passages cités par la fiche, avec
attribution et lien vers l'original. Un document public officiel (discours,
Journal officiel) ne pose pas ce problème.

**`vie-publique.fr` renvoie un contenu vide à la récupération automatique** alors
que l'URL est valide et indexée : la page est rendue en JavaScript. Le contenu
existe, l'outil ne le voit pas. Ne pas conclure que la source est morte.

**Ne jamais deviner un identifiant JORFTEXT pour construire une URL Légifrance.**
Un identifiant faux renvoie une page « Pas de contenu disponible » qui ressemble
à un succès de récupération. C'est le piège le plus coûteux du dossier, parce
qu'il produit une source d'apparence valide. Retrouver l'identifiant par une
recherche restreinte à `legifrance.gouv.fr` : une requête suffit.

> C'est l'origine de la règle du sondage systématique : **tout identifiant non
> ouvert est présumé faux.** Les moteurs de recherche fabriquent des numéros de
> loi et des URL parfaitement plausibles.

**L'ampleur du piège a été mesurée le 03/08/2026, et elle est massive.** Le
sondage réel des 887 sources distinctes du corpus a trouvé **84 références
officielles qui ne mènent à aucun texte** : 67 fiches, 11 domaines, 79 sur des
fiches de grade A, toutes citées par au moins une pièce de jugement. Avec les
onze de `sante` corrigées en amont, 95 au total. La règle du sondage n'était
donc pas une précaution théorique, c'était une dette. Elle a été soldée le
jour même, en quatre lots ; mode opératoire et pièges dans
`notes/campagne-integrite-sources.md`.

**Une campagne de réparation se solde par une mesure, pas par un décompte de
ses propres commits.** Après avoir remplacé les 95 références, le corpus
entier a été re-sondé : 895 sources, zéro piège. Le run a immédiatement
attrapé une source ajoutée le jour même, déplacée d'un hôte de presse à un
autre. Vérifier que la mesure est valide avant de s'en réjouir : ici, dix
sources bloquées seulement prouvaient que l'anti-robot ne s'était pas
déclenché, donc que le zéro portait sur des réponses réelles.

**Écrire ses doutes dans la fiche est ce qui permet de les solder plus tard.**
Deux fiches portaient, en toutes lettres, une réserve sur leur propre source :
« l'identifiant cité ne résout vers aucun texte », « le run associait ce
décret à l'URL d'un autre ». Ces deux phrases ont fait gagner une demi-heure
chacune à la campagne de réparation, deux mois plus tard. Une réserve écrite
est une dette identifiée ; une réserve tue est une erreur.

**Un identifiant fabriqué tombe dans la bonne plage numérique.** Les 84 faux
identifiants étaient à quelques centaines d'unités des vrais, soit à quelques
jours de la bonne date de publication. Un contrôle de vraisemblance
chronologique (`audit-identifiants.ts`) n'en signale aucun et ne le peut pas :
il trie des candidats au sondage, il ne vérifie rien. **Ne jamais conclure d'un
silence de cet outil.** Seul `audit-sources.ts`, qui ouvre les URL, tranche.

**Le pire cas répond HTTP 200.** Une page Légifrance affichant « Pas de contenu
disponible » renvoie un code de succès. Un contrôle de statut ne voit rien, un
contrôle d'identifiant ne voit rien, seul le contenu de la page trahit. Corollaire
symétrique : un défi anti-robot Cloudflare répond aussi 200, et le compter
« vivant » serait pire encore, puisque cela déclarerait vérifiée une source que
personne n'a vue. Les deux marqueurs sont dans les tables de l'outil.

**Une URL valide peut mener au mauvais texte.** Relevé dans
`securite-immigration` : l'URL d'un décret de 2019 servie pour un décret de
2023. Aucun contrôle mécanique ne voit ce cas, la page est parfaitement valide.
Il faut lire ce qu'elle contient. Sonder une URL, ce n'est pas vérifier qu'elle
répond, c'est vérifier qu'elle désigne le texte annoncé.

**Dédoublonner les URL fait perdre l'information de la cible.** Deux fiches
peuvent citer la même référence fabriquée en visant deux textes différents.
Rencontré sur la loi pouvoir d'achat du 16/08/2022 : une fiche visait
l'article 10, l'autre l'article 1er. Réparer d'un seul remplacement aurait
produit une source valide pointant vers le mauvais article, soit le piège
précédent creusé de sa propre main. **Une réparation groupée par URL doit
rouvrir chaque fiche qui la cite.**

**Toutes les juridictions ne publient pas sur le portail.** Trois jugements du
tribunal administratif de Paris (Affaire du Siècle) étaient cités par un
identifiant `CETATEXT` : aucun identifiant n'aurait pu fonctionner, le fonds
lui-même ne contient pas ces décisions. Avant de chercher un numéro, vérifier
que la juridiction publie là ; sinon la source est la page de la juridiction,
citée avec le numéro de jugement.

**Un décret et un arrêté du même jour portent des objets différents.** Le
décret n° 2024-249 et l'arrêté du 21/03/2024 ont été confondus dans une fiche :
le premier prolonge le parcours monogeste, le second lève l'obligation de DPE.
Réparer l'URL sans lire le texte aurait donné à l'erreur l'apparence d'une
source vérifiée, ce qui est pire que l'erreur nue.

**Ne jamais corriger une fiche sur la foi d'un résumé de moteur.** Un résumé
de recherche donnait 0,6 puis 0,7 kt eq CO2/MW là où une fiche écrivait 1,8 ;
le texte ouvert a donné raison à la fiche (1,8 jusqu'au 31/12/2024, 0,7
ensuite). Le résumé se trompe dans les deux sens : il peut valider une erreur
comme en inventer une.

**Un numéro de pourvoi trouvé en base tierce peut désigner une autre
affaire.** En cherchant l'arrêt de cassation Ferrand du 05/10/2022, un moteur
a servi un numéro de pourvoi rendu par une base juridique libre à la même
date : ouverture faite, il s'agissait d'une affaire sans rapport, jugée à
Riom. Le piège que ce dossier répare, reconstitué par la réparation
elle-même. **Ouvrir avant de citer vaut aussi pour les sources de secours.**

**La formation d'une juridiction est un fait à vérifier, pas à supposer.** Le
barème des indemnités prud'homales a été validé par la chambre sociale de la
Cour de cassation, non par son assemblée plénière : la confusion est répandue
parce que les avis de 2019, eux, venaient de l'assemblée plénière. De même,
la nature de l'acte se vérifie : la nomination au Conseil constitutionnel est
une décision du Président de la République, pas un décret.

**La version consolidée n'est pas le texte publié.** Interrogée sur la loi du
24/12/2018, la version `loda` a répondu que les articles sur les heures
supplémentaires et la CSG n'y figuraient pas ; la version `jorf`, celle du
Journal officiel, les porte bien aux articles 2 et 3. Les dispositions
codifiées disparaissent de la consolidation. **Pour établir ce qu'une loi
contenait à sa promulgation, citer le `jorf`, pas le `loda`.**

**Un acte individuel relatif à l'état des personnes est publié sans être
lisible.** Le décret suspendant un ministre de la Légion d'honneur existe,
est daté et opposable, mais son contenu est en accès protégé : il ne nomme
publiquement ni l'intéressé ni la sanction. Le citer seul ne prouve rien ; il
faut le doubler de la source qui identifie, et dire laquelle établit quoi.

**Un rapport de commission porte les chiffres du projet, la loi ceux du texte
voté.** Sur le Fonds vert, le rapport sénatorial donne 650 M€ d'autorisations
d'engagement au PLF 2026 quand la loi promulguée en retient 837. Les deux
chiffres sont exacts et ne disent pas la même chose. Pour un montant
budgétaire définitif, la source est la loi ; le rapport sert à documenter
l'écart, qui est lui-même un fait.

## Les moteurs de recherche

**Ils ne se valent pas sur la fabrication de références.** Sur ce dossier, le
moteur employé pour `international` (Grok) a montré un sourcing quasi
exclusivement primaire, un refus de citer les identifiants qu'il n'avait pas
ouverts, et des incertitudes auto-déclarées en fin de rapport : zéro référence
fabriquée au re-sondage intégral de ses deux rapports. Le moteur employé pour les
quatorze autres domaines fabriquait au contraire des identifiants Légifrance.
Contrepartie du premier : un corpus nettement plus mince (20 à 25 pièces par run
contre 40 à 90), et un statut de couverture `partial` sur les deux runs.

**Un statut `partial` est l'issue normale, pas un incident.** Lire la section de
couverture du rapport, puis compléter par un run ciblé ou du sondage manuel.

**Une recherche multi-rounds est le mauvais outil pour retrouver un document
nommé.** Démontré deux fois. Sur `securite-civile`, quatre des cinq lacunes
qu'un run approfondi avait déclarées introuvables ont été comblées à la main en
une heure, par recherche ciblée sur les portails officiels. Dès qu'on connaît le
titre, l'auteur ou le numéro d'un document, chercher directement.

## Le build du site

**Le build est en DEUX étapes indépendantes.** `bun run build.ts` régénère les
données mais ne recompile pas `src/`. Une modification TypeScript déployée sans
rejouer `bun build ./src/app.ts …` part en production sans effet, et le rapport
de build affiche quand même « Verdict : OK ». Piège classique, il coûte un
déploiement pour rien.

**Le corpus markdown est enveloppé à 80 colonnes : toute expression régulière
qui vise une tournure doit tolérer `\s+`, jamais l'espace simple.** Une pièce de
jugement sur quinze coupait « du domaine dans\n`chronologie.md` » en plein
milieu. Un motif à espaces simples l'aurait manquée en silence.

**Un renommage global peut désarmer une table de motifs sans que rien ne le
signale.** Le renommage de l'outillage dans le corpus a laissé les motifs de
réécriture sur l'ancien nom : ils ne matchaient plus rien, et la table
d'interdits aurait fait échouer le build suivant. Invisible pendant un jour,
parce que le dernier build vert datait d'avant le renommage. **Après tout
renommage touchant le corpus, rejouer le build qui l'audite, pas seulement
grep.**

**`dist/data.js` contient chaque texte DEUX fois** : le HTML rendu, et le texte
brut qui en est dérivé pour l'index de recherche. Tout comptage d'occurrences
sur ce fichier est donc doublé. Ne pas en conclure à des emplacements distincts
dans le corpus.

**sigma.js ne sait pas lire les couleurs OKLCH.** Le design du site est en
OKLCH ; les couleurs passées au graphe doivent être converties en hexadécimal,
sinon les nœuds sont rendus sans couleur, sans erreur.

**`atlas/.netlify/` est gitignoré** : l'identifiant qui lie le dossier au site
d'hébergement n'est pas versionné. Un clone frais ne peut pas déployer avant
d'avoir relié le projet (`netlify link`).

## L'audit de publiabilité

**Une garde qui n'a jamais rien attrapé ne prouve rien.** Test négatif qui coûte
deux minutes et qui vaut le coup : désactiver le filtre, relancer le build,
vérifier qu'il **échoue** en listant les fuites, puis restaurer. Fait le
01/08/2026 (sortie en erreur, 22 fuites listées avec extrait). Sans ce test, un
scan silencieusement inopérant est indiscernable d'un corpus propre.

**Vérifier l'audit sur le fichier SERVI, pas sur le local.** Re-télécharger le
`data.js` de production et y rejouer les motifs interdits. Le local peut être
propre pendant qu'un déploiement plus ancien reste en ligne.

**Le corpus doit être autonome à la source.** Règle amendée le 02/08/2026, et
c'est la leçon la plus transposable du lot. Le pipeline réparait au RENDU les
renvois du corpus vers les fichiers de travail, ce qui suffisait tant que seul le
site était publié. Dès que la source elle-même part dans un dépôt public, il n'y
a plus de rendu entre elle et le lecteur : la version brute, renvois internes
compris, est ce qu'on lit. La table de réécriture a donc disparu, et la table
d'interdits reste seule.

> Le test à se poser avant d'écrire une réparation : **est-ce que je répare la
> chose publiée, ou seulement une de ses vues ?**

## Méthode

**Toute séance commence par la lecture complète de la méthode de sa couche.**
C'est ce qui a tenu la cohérence sur seize pièces écrites à des jours
différents : mêmes sections, même échelle, mêmes garde-fous. Un frontmatter
uniforme (`domaine`, `verdict`, `date_verdict`) rend ensuite le dossier
interrogeable d'un `grep`.

**Contrôle mécanique avant tout commit** : zéro renvoi `[[slug]]` mort, tout lien
de pièce pointant vers un fichier existant. Le build le fait aujourd'hui, mais la
règle précède l'outil.

**Les trois audits ne se remplacent pas, ils se complètent.**
`atlas/build.ts` scanne le rendu du site, `audit-publiabilite.ts` scanne les
sources markdown, `audit-sources.ts` sort du dépôt et ouvre les URL. Le
troisième est le seul à voir qu'une référence est vide, et c'est le seul qui
coûte du réseau : il se lance par campagne, pas à chaque commit.

**Le grade proposé par une recherche n'est qu'une proposition.** À l'ingestion,
il est revérifié, et en cas de doute c'est le grade inférieur qui est retenu.
Une allégation mal sourcée posée au milieu de faits établis ne renforce pas le
dossier, elle le fragilise.

**Une note de reprise ne connaît que le périmètre de la campagne qui l'a
produite.** Le contrat de révision des jugements listait, pièce par pièce, les
fiches dont une référence avait été réparée. Il était exact et il était
incomplet : en parallèle, un rattrapage ciblé avait **ajouté** des fiches de
grade A aux domaines. Une pièce de jugement peut donc être périmée sans
qu'aucune de ses citations n'ait bougé, et aucune relecture de ses renvois ne
le montre. Deux commandes le montrent, elles :

```bash
# 1. fiches modifiées ET citées par la pièce
git diff --name-only <base>..HEAD -- base/ | sed 's|base/||;s|\.md$||' > /tmp/mod.txt
grep -oFf /tmp/mod.txt jugement/<domaine>.md | sort -u

# 2. périmètre annoncé contre périmètre réel
for f in base/*.md; do awk '/^domaines:/{print; exit}' "$f"; done | grep -c "\b<domaine>\b"
grep -oE "sur les [0-9]+ fiches" jugement/<domaine>.md
```

Le second contrôle a payé deux fois : il a trouvé la matière ajoutée sur deux
domaines, et **deux comptes de périmètre déjà faux** au moment où les pièces
ont été écrites, que rien d'autre n'aurait signalés. Le compte de fiches
annoncé par une pièce est une affirmation vérifiable comme les autres.

> La règle : **le contrat de reprise dit où regarder, il ne dit pas où ne pas
> regarder.** Avant de réviser une pièce, recalculer son périmètre plutôt que
> de le lire dans la note.

**Le sujet de commit d'une pièce de jugement encode son verdict : le lire au
frontmatter, ne jamais le deviner.** La convention est `jugement <domaine>
(<verdict>)`. Sur quinze domaines dont treize sont défavorables, la pente est de
taper « defavorable » par habitude : `promesses` (mitigé) et `europe`
(défavorable) sont parties avec l'inverse le 03/08/2026, et il a fallu réécrire
l'historique local pour les corriger. Un `awk -F': ' '/^verdict:/{print $2}'`
avant d'écrire le message coûte une seconde.

Corollaire sur la réécriture elle-même, appris à la dure le même jour : `git
cherry-pick` **n'accepte pas** `-q`. Un script qui l'appelle ainsi échoue à
chaque tour, et si le `git commit --amend` qui suit n'est pas conditionné à la
réussite du cherry-pick, il amende le commit sur lequel on se trouve, c'est-à-dire
le mauvais. Trois garde-fous : brancher une sauvegarde avant de toucher à
l'historique, tester le code de retour de chaque cherry-pick, et **comparer les
arbres avant de déplacer la branche** (`git rev-parse <branche>^{tree}` des deux
côtés doit donner le même hash). C'est ce dernier contrôle qui prouve qu'une
réécriture de messages n'a pas mangé de contenu.

**Un identifiant fabriqué ne se signale pas partout de la même façon, et le
classement du sondeur suit le portail, pas la faute.** Légifrance sert une page
d'erreur en 200, donc PIEGE, et la campagne d'intégrité les a tous soldés. Le
Sénat, l'Assemblée et les sites ministériels renvoient un 404 sec : un
identifiant inventé y est classé MORTE, **indiscernable d'un document qui a
bougé**. Deux cas prouvés le 03/08/2026 : `senat.fr/rap/a22-117-31/a22-117-31.html`
(404) contre le réel `a22-117-3/a22-117-3.html` (200), un chiffre de trop ; et
`compte-rendu-commissions/20190114/lois_enq.html`, dont le suffixe `_enq` n'a
jamais existé. Conséquence pratique : **le lot des sources mortes se traite à la
recette de la campagne d'intégrité**, pas à la réparation d'adresse.

**Corollaire sur les mesures de clôture.** « 895 sources re-sondées, zéro
piège » était exact, et ne disait que zéro piège *de la famille que le sondeur
sait reconnaître*. Devant un indicateur vert, la question utile n'est pas « est-il
juste ? » mais « qu'est-ce qu'il ne peut pas voir ? »

**Le décompte d'URL mortes n'est pas la mesure du dommage : l'exposition de la
fiche l'est.** 263 adresses mortes se répartissaient en 202 fiches touchées,
dont **104 sans aucune source vivante**, 102 citées par une pièce de jugement et
73 de grade A. Une fiche à trois sources dont une meurt tient encore ; une fiche
à source unique qui meurt n'établit plus rien. `atelier/audit-orphelines.ts`
calcule la répartition à partir de la sortie de `audit-sources.ts` ; c'est elle
qui donne l'ordre de travail, pas la liste des URL.

**Pour retrouver une source morte, le moteur de recherche assisté n'est bon que
sur les documents à identifiant.** Une décision de justice, un avis numéroté, un
rapport parlementaire se retrouvent par leur numéro même quand l'URL a disparu :
deux documents retrouvés en un appel sur la fiche LBD (décision 2019-029 du
Défenseur des droits, ordonnance n° 427386 du Conseil d'État). Sur une page de
portail déplacée ou un communiqué de presse, il rend des conseils de navigation
et aucune URL, deux fois sur deux.

Deux pièges à connaître avec ce mode :

1. **La prose du moteur mélange ses propres citations.** Elle donnait `[7]`
   comme source de l'ordonnance du Conseil d'État alors que `[7]` était la page
   du Défenseur des droits. Lire la **liste de citations**, pas la rédaction :
   la liste contient des URL réellement crawlées, la rédaction en fabrique.
2. **Sur un portail réorganisé, plusieurs variantes d'URL répondent 200.** Trois
   sur la page Schengen de la Commission, dont deux qui n'étaient pas la bonne
   page. Le code HTTP ne tranche rien, seul l'élément de contenu tranche.
