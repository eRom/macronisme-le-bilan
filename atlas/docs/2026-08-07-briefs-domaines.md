# Briefs de domaine : pages autonomes de partage

Spec arrêtée le 07/08/2026. Elle décrit une nouvelle sortie du pipeline `atlas` :
une page HTML autonome par domaine jugé, conçue comme accroche depuis les
réseaux sociaux et comme seule surface du dossier réellement indexable.

## 1. Pourquoi

Le site est une application monopage : tout le rendu vient de `data.js` par
JavaScript, et l'URL d'une pièce est un fragment (`#/domaine/institutions`).
Deux conséquences qu'aucun réglage ne corrige :

- **Les moteurs indexent mal.** Il n'existe aujourd'hui qu'une seule URL
  canonique pour 534 fiches et 15 jugements.
- **Le partage social est aveugle.** Une seule carte OpenGraph pour tout le
  dossier : quel que soit le sujet du message, l'aperçu est le même.

Un brief répond aux deux : une URL réelle par domaine, son propre titre, sa
propre description, sa propre carte de partage, et son texte présent dans le
HTML sans exécution de JavaScript.

Le brief ne remplace pas l'atlas et ne le duplique pas. L'atlas reste l'outil
d'exploration ; le brief est la porte d'entrée d'un domaine, et il renvoie vers
l'atlas pour tout le détail.

## 2. Périmètre

**Un seul domaine construit : `institutions`.** Les quatorze autres seront
ouverts à la demande, et seulement si le format prend sur les réseaux sociaux.
La topologie décrite ici vaut pour les quinze ; le rendu, lui, est écrit à la
main domaine par domaine.

Hors périmètre, explicitement :

- pas de page d'index `/briefs/` ;
- pas de lien depuis l'atlas vers les briefs ;
- pas de brief sur une fiche isolée : l'unité est le domaine jugé.

## 3. Adresse et arborescence

Adresse publique : `https://macronisme-le-bilan.netlify.app/briefs/institutions/`

Le slug est celui du fichier de `jugement/`, sans exception ni alias.

```
atlas/briefs/institutions/
  page.html        mise en page écrite à la main, aucun chiffre en dur
  brief.json       paramètres du domaine (voir §7 et §8)
  og.png           carte de partage, générée, commitée
atlas/briefs/_socle/
  brief.css        socle structurel commun aux quinze (topologie, frise, registre)
  institut.css     copie de la feuille du design system, à ne jamais éditer ici
  fonts/*.woff2    Spectral et Courier Prime, auto-hébergées
  fonts/OFL.txt    licence des fontes
```

La feuille du design system et ses fontes sont **versionnées dans ce dépôt**, pas
lues chez le voisin. Le pipeline ne peut pas dépendre d'un chemin machine : il
doit builder sur n'importe quelle machine, et l'audit de publiabilité interdit
d'ailleurs qu'un tel chemin figure où que ce soit. Une correction du design
system remonte à son dépôt d'origine, puis se recopie ici.

Sortie du build, dans `dist/` :

```
dist/briefs/institutions/index.html   page + bloc de données injecté
dist/briefs/institutions/og.png       copie de la carte
dist/briefs/_socle/institut.css       feuille du design system, copiée telle quelle
dist/briefs/_socle/brief.css          socle propre aux briefs
dist/briefs/_socle/*.woff2            Spectral et Courier Prime, auto-hébergées
```

**Le socle est partagé, pas dupliqué.** Quinze copies des fontes pèseraient
2,2 Mo pour rien, et le navigateur les mettrait quinze fois en cache. La page
reste sans réseau ni CDN : tout ce qu'elle charge vient du même déploiement.

## 4. Design

Design system **institut** : papier chaud, encre, Spectral pour tout y compris
l'interface, bleu Souverain pour ce qui structure, garance réservée à l'alerte,
vert réservé à l'acquis, filets plutôt qu'ombres, angles droits.

**Rien ne bouge au survol.** Aucune translation, aucune mise à l'échelle,
aucune élévation : les états parlent par la couleur seule. Cette règle du design
system n'est pas négociable et contraint toute l'interactivité de la frise.

Le site principal, lui, est en design system perso, mode sombre. Les deux ne se
mélangent jamais dans un même rendu : le brief est un document, l'atlas est un
outil, et la rupture visuelle au passage du pied de page est assumée.

Source de vérité du design system : son dépôt propre, dont le paquet livre une
feuille unique et ses fontes. Le pipeline copie cette feuille sans la
réécrire ; toute correction remonte au dépôt du design system, jamais ici.

## 5. Topologie de la page

Fixe pour les quinze domaines, dans cet ordre.

**1. Bandeau.** Marque du dossier, nom du domaine, verdict et date
d'appréciation. Le verdict est le seul emploi de la garance sur la page.

**2. Chiffres.** Six compteurs calculés : nombre de pièces du domaine, nombre de
pièces sur lesquelles le jugement s'appuie, URL sources distinctes, nombre de
charges, nombre de décharges, part de grade A. Plus **un chiffre de signature**
propre au domaine, choisi à la main (§8).

**3. Frise, traitement « colonnes annuelles ».** Une colonne par année, une
tuile par pièce, empilées. Bleu Souverain pour les pièces citées par les charges
et décharges du jugement, gris filet pour les autres. La densité par année se
lit sans commentaire. Survol ou clic : la pièce s'affiche dans un cartouche
adjacent (date, titre, type, grade, mention « citée par le jugement »). Filtres
par type et sur les seules pièces citées. Un repère sépare les deux
quinquennats.

**4. Le jugement.** Les intitulés numérotés des charges qui tiennent, puis des
décharges qui tiennent, dans l'ordre de la pièce. Les décharges sont les seules
à recevoir le vert du design system, qui code l'acquis.

Un **seul** lien mène à la pièce complète, sous les deux blocs, et non un lien
par intitulé comme prévu d'abord : l'atlas n'offre pas d'ancre par charge, dix
liens y pointeraient donc tous vers la même adresse. Dix liens identiques ne
servent ni le lecteur ni le référencement.

**5. Registre.** Les pièces du domaine en clair, année par année, intertitre
collant au défilement, une ligne par pièce : date, titre, type, grade. Les
pièces citées par le jugement sont marquées d'un filet bleu. **C'est le bloc que
les moteurs lisent** : il doit exister dans le HTML servi, sans exécution de
JavaScript.

**6. Pied de page.** Deux liens, et seulement deux :

- `https://macronisme-le-bilan.netlify.app/`
- `https://github.com/eRom/macronisme-le-bilan`

## 6. Architecture : données générées, mise en page à la main

C'est la décision structurante. Elle applique au brief la leçon déjà payée sur
la table des promesses : un doublon dérive à la première pièce révisée.

`build.ts` gagne un émetteur qui, pour chaque domaine déclaré, calcule un bloc
de données depuis `base/` et `jugement/`, puis **l'injecte dans la page au
moment du build**, dans une balise `<script>` en tête de corps.

`atlas/briefs/institutions/page.html` est écrite à la main et **ne contient
aucun chiffre, aucun verdict, aucune date d'appréciation, aucun titre de fiche
en dur.** Elle lit `window.BRIEF` et construit la frise, les compteurs, le
jugement et le registre à partir de lui.

Conséquence : une pièce de jugement révisée met le brief à jour au prochain
build, sans qu'on touche à la page. La dérive n'est pas rattrapée après coup,
elle est rendue impossible.

**Le registre doit exister sans JavaScript.** Le §5 en fait la surface
indexable ; un registre construit dans le navigateur serait invisible aux
moteurs et annulerait la raison d'être du brief. L'émetteur écrit donc le
registre en HTML dans le fichier de sortie, à un emplacement marqué dans
`page.html`. La frise, elle, peut se construire en JavaScript : son contenu est
déjà porté par le registre, et les tuiles portent le titre de leur pièce en
`aria-label` pour l'accessibilité.

### Le bloc de données

```js
window.BRIEF = {
  domaine: "institutions",
  nom: "Institutions",
  verdict: "defavorable",
  verdict_libelle: "Défavorable",
  date_verdict: "2026-08-04",
  compteurs: {
    fiches: 84, citees: 45, charges: 6, decharges: 4,
    grades: { A: 72, B: 10, C: 2 },
    urls: 0,          // URL distinctes parmi les fiches du domaine, calculées au build
  },
  charges:   [ { n: 1, label: "…", slugs: ["…"] } ],
  decharges: [ { n: 1, label: "…", slugs: ["…"] } ],
  fiches: [
    { slug: "…", date: "2017-05-14", titre: "…",
      type: "mesure", grade: "A", citee: true }
  ],                  // triées par date croissante
  liens: {
    piece: "https://macronisme-le-bilan.netlify.app/#/domaine/institutions",
    fiche: "https://macronisme-le-bilan.netlify.app/#/fiche/",  // + slug
  },
};
```

Les deux motifs de `liens` sont ceux du routeur de l'atlas, lu le 07/08/2026 :
`#/domaine/<slug>` pour une pièce de jugement, `#/fiche/<slug>` pour une fiche.

Le calcul de `citee` reprend la règle de la pièce elle-même : une fiche est
citée si son slug apparaît en renvoi dans la section des charges ou dans celle
des décharges. Les renvois de la section « ce qui est écarté » et du périmètre
ne comptent pas : le brief marque ce qui **porte** le jugement.

## 7. La carte OpenGraph

**Générée intégralement par GPT Image**, un appel par domaine, image commitée
dans `atlas/briefs/<slug>/og.png`. Format 1200×630, ratio imposé par les
scrapers sociaux.

L'image porte donc son texte et ses chiffres dans le pixel. Aucun contrôle
automatique ne peut les relire : c'est le prix assumé du choix, en échange
d'une identité visuelle propre à chaque domaine dans un fil social.

### La garde par métadonnée

Puisque les pixels sont illisibles au build, on contrôle **ce contre quoi ils
ont été produits**. `brief.json` enregistre :

```json
{
  "og_genere_le": "2026-08-07",
  "og_verdict": "defavorable",
  "og_date_verdict": "2026-08-04",
  "og_compteurs": { "fiches": 84, "citees": 45 }
}
```

Le build confronte ces valeurs à ce que disent réellement la pièce et le corpus.
**Un écart est bloquant**, et le message nomme le domaine, ce qui a bougé, et la
commande de régénération. Même logique que le contrôle rendu bloquant le
04/08/2026 sur la table des quinze verdicts : une carte qui annonce un verdict
périmé ment au lecteur avant même qu'il ait cliqué.

Le blocage est délibérément strict. Si une révision mineure ne justifie pas de
relancer une génération d'image, la sortie est de mettre à jour `brief.json`
sciemment, pas de désarmer le contrôle.

## 8. Le chiffre de signature

Un chiffre par domaine, choisi à la main dans les charges du jugement, qui donne
à la page son accroche. Pour `institutions` : l'effondrement de la ratification
des ordonnances, 79,6 % puis 61,3 % puis 33,5 %.

Il est déclaré dans `brief.json` :

```json
{
  "chiffre_signature": {
    "valeur": "79,6 % → 61,3 % → 33,5 %",
    "legende": "Ordonnances ratifiées, trois quinquennats successifs, toutes mesurées en 2026",
    "fiche": "2022-05-13-ordonnances-effondrement-ratification"
  }
}
```

**Le choix de 33,5 % plutôt que 20,3 % n'est pas cosmétique.** La fiche donne
les deux : 20,3 % est le taux du quinquennat 2017-2022 mesuré à sa clôture,
33,5 % le même taux mesuré en juillet 2026, des ratifications étant intervenues
depuis. Elle avertit explicitement que les quinquennats antérieurs bénéficient
d'un recul plus long, ce qui les avantage mécaniquement, et que **la comparaison
honnête n'oppose pas 20,3 % à 79,6 %**. Un brief est une vitrine : c'est
exactement l'endroit où un chiffre choisi pour son effet ruinerait le dossier
qu'il sert. La règle générale pour les quatorze autres domaines : quand une
fiche assortit un chiffre d'une correction, **le chiffre de signature est le
chiffre corrigé**. La rupture reste massive, et elle devient inattaquable.

**Limite connue et assumée.** La valeur est saisie à la main : aucun contrôle ne
peut la recalculer depuis le corpus. Le build vérifie seulement que la fiche
citée existe dans `base/`. La responsabilité de l'exactitude du chiffre reste
humaine, et elle se vérifie en ouvrant la fiche.

## 9. Référencement

Dans le `<head>` de chaque brief, tout est propre au domaine :

- `<title>` et `<meta name="description">` ;
- `<link rel="canonical">` en URL absolue ;
- `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`,
  `og:locale`, `og:image` **en URL absolue** — les scrapers sociaux ne résolvent
  pas les chemins relatifs, la leçon est déjà consignée dans `atlas/src/index.html` ;
- `og:image:width`, `og:image:height`, `og:image:alt` ;
- `twitter:card` en `summary_large_image`, plus titre, description et image ;
- un bloc JSON-LD de type `Report` : nom du domaine, `datePublished` égale à la
  date d'appréciation, auteur, licence, lien vers le dossier.

Ces balises sont écrites par l'émetteur depuis le bloc de données, pas à la
main : elles portent le verdict et la date, donc elles dériveraient.

## 10. Contrôles ajoutés au build

Tous bloquants, tous listés dans `build-report.md` :

1. **Domaine déclaré sans pièce de jugement** correspondante dans `jugement/`.
2. **Chiffre en dur dans `page.html`** : la page ne doit contenir ni le verdict,
   ni la date d'appréciation, ni un compteur du domaine en clair. Le contrôle
   confronte la page aux valeurs réelles du corpus plutôt qu'à des motifs
   génériques, avec deux réserves apprises à l'écriture : seuls les compteurs à
   deux chiffres ou plus sont cherchés tels quels — un « 4 » isolé se rencontre
   légitimement dans du code, et un contrôle qui crie au loup finit désarmé —
   et les petits compteurs sont rattrapés par un motif rédigé
   (`\d+ charges?|décharges?|pièces?|URL`).
3. **Métadonnées de la carte OpenGraph périmées** (§7).
4. **Fiche du chiffre de signature absente** de `base/` (§8).
5. **Carte OpenGraph absente** du dossier du domaine, ou hors format 1200×630.

Le rapport de build doit continuer de dire 534/534 et « Verdict du build : OK ».

## 11. Critères d'acceptation

Le brief `institutions` est accepté quand :

- `dist/briefs/institutions/index.html` s'ouvre en `file://` et fonctionne
  entièrement : frise, filtres, cartouche, registre, liens ;
- le registre et les intitulés des charges sont présents dans le HTML servi,
  **JavaScript désactivé** ;
- aucune requête réseau sortante n'est émise à l'ouverture ;
- les chiffres affichés sont ceux du corpus au jour du build, vérifiés à la main
  une fois contre `base/` et `jugement/institutions.md` ;
- le rendu passe la grille de jugement visuelle du profil institut, en repos et
  au survol ;
- la page tient sur un écran de téléphone sans défilement horizontal ;
- `bun run atelier/audit-publiabilite.ts` sort sans fuite ;
- la carte OpenGraph est validée à l'œil : texte exact, ratio correct, lisible
  en vignette.

## 12. Ce que cette spec ne tranche pas

- **Le rendu des quatorze autres domaines.** Chacun réutilisera cette topologie
  et ce bloc de données, avec une mise en page propre. Rien n'est décidé
  d'avance sur leur apparence.
- **La direction artistique des cartes OpenGraph** au-delà d'`institutions` :
  elle se fixera sur pièce, une fois la première carte jugée.
- **L'entrée dans le dossier** : aucun lien ne mène aux briefs depuis le site ni
  depuis le dépôt tant que le format n'a pas fait ses preuves. Les briefs
  vivent d'abord par les liens postés sur les réseaux sociaux.
