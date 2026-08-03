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

## État au 03/08/2026

- Fait : `sante`, onze références corrigées et commitées.
- Fait : les deux P0 découverts en amont (vidéosurveillance algorithmique,
  fiche de la ministre de la Culture), corrigés.
- À faire : les 73 références fabriquées restantes, par
  [`../references-fabriquees.md`](../references-fabriquees.md).
- À faire ensuite : 264 sources mortes, 15 déplacées.
- À faire en dernier : la révision des pièces de jugement, groupée, une fois le
  corpus assaini. Aucun verdict n'a bougé à ce jour et aucun ne doit bouger
  avant que les fiches soient sûres.
