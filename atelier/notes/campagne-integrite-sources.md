# Campagne d'intégrité des sources — mode opératoire et état

> Note de chantier ouverte le 03/08/2026. Elle existe pour qu'une séance
> suivante reprenne sans rien redécouvrir. L'inventaire à traiter est dans
> [`../references-fabriquees.md`](../references-fabriquees.md), cette note dit
> comment le traiter.

## Ce qui a été trouvé

Le sondage réel des 887 sources distinctes du corpus a établi que **84
références officielles ne mènent à aucun texte** : elles répondent HTTP 200 en
affichant la page d'erreur du portail. 67 fiches touchées, 11 domaines, 79 des
84 sur des fiches de grade A, et les 67 fiches sont citées par au moins une
pièce de jugement, 8 par la synthèse.

Ces 84 s'ajoutent aux onze de `sante`, corrigées avant le sondage général et
donc absentes de l'inventaire : le total établi sur le dossier est de 95.

S'y ajoutent 264 sources mortes (adresses de portails qui ont bougé) et 15
déplacées, d'un registre moins grave, à traiter ensuite.

## Ce que la campagne a déjà réparé

`sante` est fait : onze références fabriquées corrigées le 03/08/2026, chaque
texte réel ouvert et vérifié sur son contenu. Aucun grade n'a bougé, parce que
les faits étaient exacts et les dates aussi — seules les URL étaient inventées.
Restent 17 sources mortes dans ce domaine.

## La recette, éprouvée onze fois

Pour une référence fabriquée, dans cet ordre :

1. **Lire la fiche** pour savoir quel texte l'URL est censée désigner. Le corps
   de la fiche nomme presque toujours la loi ou le décret avec son numéro et sa
   date. C'est l'énoncé de la cible, et il s'est révélé exact à chaque fois.
2. **Recherche restreinte au portail** (`allowed_domains: legifrance.gouv.fr`)
   sur le numéro et l'intitulé. Une requête suffit en général.
3. **Ouvrir le résultat** et vérifier qu'il s'agit du bon texte, en demandant un
   élément de contenu, pas seulement le titre : un article, un chiffre, une date
   de publication. C'est ce qui a permis de confirmer l'arrêté du 13/09/2021 par
   son objectif de 51 505 à l'article 2.
4. **Remplacer** l'URL dans la fiche. Nommer le texte dans le corps quand il ne
   l'était pas.
5. **Ne pas toucher au grade** sauf si le doute qui le tenait en B portait
   précisément sur cette URL. Cas rencontré une fois (vidéosurveillance
   algorithmique, B → A) contre douze fois où le grade tenait à autre chose.
6. **Ne pas toucher aux pièces de jugement.** Le sens unique tient : la fiche se
   corrige d'abord, dans son propre commit, la révision des jugements vient
   après et groupée.

## Ordre de traitement recommandé

1. Les **8 fiches citées par la synthèse** en premier : ce sont celles dont un
   défaut remonte jusqu'au verdict d'ensemble. Elles sont identifiables par
   `grep -l <slug> jugement/synthese.md`.
2. Puis par domaine décroissant : `ecologie-energie` (18),
   `education-recherche` (17), `justice-affaires` (10), `promesses` (10),
   `libertes-publiques` (9), `economie` (8), puis la longue traîne.
3. Les 264 sources mortes ensuite, dans un second temps : le document existe,
   c'est l'adresse qui a pourri, la gravité n'est pas la même.

## Pièges rencontrés, à ne pas repayer

**Le sondeur se fait bloquer après une centaine de requêtes.** Le `fetch` de
bun reçoit un défi anti-robot Cloudflare sur Légifrance passé un certain
volume. L'outil le détecte désormais et le classe BLOQUEE au lieu de VIVANTE,
mais pour vérifier un texte pendant cette fenêtre, il faut passer par l'autre
mécanisme de récupération, qui n'est pas soumis au même filtre.

**Un identifiant fabriqué tombe dans la bonne plage numérique.** Les 84 faux
identifiants sont à quelques centaines d'unités des vrais, soit à quelques
jours de la bonne date de publication. `audit-identifiants.ts`, qui juge de la
vraisemblance chronologique, n'en signale aucun et ne le peut pas. Il trie des
candidats, il ne vérifie rien. Ne jamais conclure d'un silence de cet outil.

**Le chemin n'est pas en cause.** Trois permutations ont été testées
(`/jorf/`, `/loda/`, `/ceta/`, `/juri/`) : un identifiant qui ne résout sur
aucune route n'a jamais désigné de texte. Inutile de refaire ce test.

**Une URL valide peut mener au mauvais texte.** Cas relevé dans
`securite-immigration` : l'URL d'un décret de 2019 servie pour un décret de
2023. Aucun outil ne voit ce cas, ni le code HTTP ni le contenu de la page,
qui est parfaitement valide. Seule la lecture de ce que la page contient le
révèle. C'est pourquoi l'étape 3 de la recette demande un élément de contenu.

**Une entrée « source partagée » peut cacher deux cibles distinctes.**
L'inventaire dédoublonne les URL, si bien qu'une même référence fabriquée
citée par deux fiches n'y figure qu'une fois — et rien n'indique que les deux
fiches visaient le même texte. Sur la loi pouvoir d'achat du 16/08/2022, une
fiche visait l'article 10 (AAH déconjugalisée) et l'autre l'article 1er
(prime de partage de la valeur). Solder l'entrée d'un seul remplacement aurait
donné une source valide pointant vers le mauvais article, c'est-à-dire le
piège précédent, creusé de sa propre main. **Ouvrir chaque fiche partageant
l'URL avant de solder.**

**Un identifiant peut être faux deux fois : par son numéro et par son fonds.**
Les trois jugements de l'Affaire du Siècle étaient cités en `CETATEXT`. Or le
portail ne publie pas ces jugements de tribunal administratif : aucun
identifiant n'aurait pu marcher. Chercher un identifiant plausible dans ce
cas est une perte de temps garantie. **Avant de traquer un numéro, se
demander si la juridiction publie là.** La bonne source était la page du
tribunal, avec le numéro de jugement.

**Un décret et un arrêté du même jour ne portent pas le même objet.** La fiche
MaPrimeRénov' attribuait au décret n° 2024-249 la levée de l'obligation de
DPE, qui est dans l'arrêté du même jour ; le décret ne traite que du parcours
monogeste. Une réparation d'URL qui ne lit pas le texte reconduit l'erreur en
lui donnant l'apparence d'une source vérifiée.

**Le résumé d'une recherche n'est pas le texte.** Sur le décret n° 2023-817,
le résumé annonçait un plafond de 0,6 puis 0,7 kt eq CO2/MW et laissait croire
que la fiche se trompait avec ses 1,8. L'ouverture du texte a donné raison à
la fiche : 1,8 du 01/04/2023 au 31/12/2024, 0,7 ensuite. **Ne jamais corriger
une fiche sur la foi d'un résumé de moteur ; seul le texte tranche**, dans un
sens comme dans l'autre.

**Un rapport parlementaire porte les chiffres du projet, pas de la loi.** Sur
le Fonds vert, le rapport sénatorial donne 650 M€ d'autorisations
d'engagement pour le PLF 2026, quand le texte voté en retient 837. Les deux
chiffres sont exacts, ils ne disent pas la même chose. Citer un rapport de
commission pour établir un montant budgétaire définitif est une erreur de
nature ; il faut la loi promulguée, et si l'écart est notable, le dire dans
la fiche.

## État au 03/08/2026

- Fait : `sante`, onze références corrigées et commitées.
- Fait : les deux P0 découverts en amont (vidéosurveillance algorithmique,
  fiche de la ministre de la Culture), corrigés.
- Fait : **lot 1**, les 8 fiches citées par la synthèse. Neuf entrées de
  l'inventaire soldées, dix références remplacées, neuf fiches touchées.
  Aucun grade n'a bougé. Deux fiches ont gagné une précision de fond au
  passage, parce que le texte réel disait autre chose que la fiche : le gel
  des tarifs du gaz court du 31/10/2021 et non du 01/10, et le décret du
  30/06/2024 suspend la réforme de l'assurance chômage en prolongeant les
  règles antérieures plutôt qu'en la suspendant directement.
- Fait : **lot 2**, `ecologie-energie` et `education-recherche` soldés en
  entier. 31 entrées, 24 fiches. Sept corrections de fond au passage, toutes
  découvertes en ouvrant le texte et invisibles à un contrôle d'URL : deux
  erreurs de date de décret, une attribution de mesure au mauvais texte du
  même jour, un résumé de jugement qui inversait le sens du dispositif, un
  seuil de prix attribué à une loi qui ne le contient pas, deux NOR non
  sondés retirés. Un seul grade a bougé, et il n'a pas bougé : le versement
  nucléaire universel reste en B, mais sa réserve change d'objet.
- Fait : **lot 3**, `justice-affaires`, `promesses`, `libertes-publiques` et
  `economie` soldés en entier. 34 entrées, 26 fiches. Quatre corrections de
  fond, dont une erreur répandue reprise telle quelle par le corpus : le
  barème prud'homal a été validé par la chambre sociale de la Cour de
  cassation, non par son assemblée plénière. Deux décisions de justice se
  sont révélées absentes du portail et sont désormais sourcées ailleurs, en
  le disant.
- Fait : **lot 4**, la traîne. 10 entrées, 9 fiches. Deux d'entre elles
  portaient déjà en toutes lettres une réserve sur leur propre source ; les
  deux sont levées sur pièces. Une réserve nouvelle est posée sur la date
  d'adoption de la décision du Conseil dans la fiche PNRR, faute de source
  primaire : le montant est établi, la date ne l'est pas.
- **L'inventaire des références fabriquées est soldé.** 95 références au
  total sur le dossier, toutes remplacées par un texte réel ouvert et vérifié
  sur son contenu.
- À faire ensuite : 264 sources mortes, 15 déplacées.
- À faire en dernier : la révision des pièces de jugement, groupée, une fois le
  corpus assaini. Aucun verdict n'a bougé à ce jour et aucun ne doit bouger
  avant que les fiches soient sûres.

## Lacunes de sourçage repérées en chemin, hors périmètre de la campagne

Elles ne relèvent pas de la référence fabriquée mais de l'affirmation non
sourcée. À traiter en campagne de couverture, pas ici.

- `2025-06-13-loi-narcotrafic` affirme que les décrets d'application ont été
  pris (26/12/2025, 30/03/2026) sans citer aucun des deux.
- `2026-02-20-fonds-vert-dotation-divisee` attribue une critique à l'AMF et
  une analyse de méthode de cotation à la Cour des comptes et à I4CE, sans
  source pour l'une ni pour l'autre.
- `2021-11-05-proces-benalla-premiere-instance` donne les peines de trois
  policiers qu'aucune pièce judiciaire du dossier ne porte ; elles sont
  désormais explicitement déclassées en grade B dans la fiche.
- `2023-12-08-pnrr-repowereu-40-3-milliards` porte la date du 08/12/2023 dans
  son nom de fichier et son frontmatter, alors que l'adoption par le Conseil
  à cette date n'est pas confirmée. À trancher sur le Journal officiel de
  l'Union européenne ; si la date change, la fiche se renomme.
- `2024-09-21-valse-ministres-industrie` : nominations de Sébastien Martin et
  de Maud Bregeon, et décret d'attributions n° 2025-22, non sondés.
