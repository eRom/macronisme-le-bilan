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
fiches de grade A, toutes citées par au moins une pièce de jugement. La règle
du sondage n'était donc pas une précaution théorique, c'était une dette. Mode
opératoire de réparation : `notes/campagne-integrite-sources.md`.

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
