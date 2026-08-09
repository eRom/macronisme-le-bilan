# La carte de partage d'un brief

Une image par domaine, 1200×630, commitée dans `atlas/briefs/<domaine>/og.png`.
Elle porte son texte et ses chiffres **dans le pixel** : aucun contrôle
automatique ne peut les relire, c'est le prix assumé d'une identité visuelle par
domaine dans un fil social. La seule garde possible est humaine, et elle est
au §Contrôle en bas de ce fichier.

## Ce que la famille a en commun

Les cartes doivent se reconnaître entre elles. Ce qui ne bouge pas d'un domaine
à l'autre : le papier `#FAF8F5`, la barre bleu Souverain `#122B78` en tête, deux
colonnes séparées d'un filet vertical, la ligne de marque en petites capitales
espacées, le nom du domaine en très gros serif, le verdict en garance `#8A1622`,
la date en machine à écrire, le bloc de chiffres en navy à droite, et la ligne
de pied qui compte les pièces et donne l'adresse.

Ce qui change : le nom du domaine, le contenu du bloc de chiffres, et le compte
de pièces. La direction artistique n'est pas figée au-delà de ça — la spec la
laisse ouverte domaine par domaine.

## Génération

Outil : `mcp__plugin_erom-image_gpt__gpt_image_generate` (gpt-image-2), en
`size: "1920x1008"` et `quality: "medium"`. Ce format donne exactement le ratio
de 1200×630 après réduction, et ses deux bords sont multiples de 16 comme
l'exige l'API. La qualité `medium` suffit pour ce type de composition
typographique ; `high` coûte environ quatre fois plus pour un gain invisible ici.

Sortir dans un dossier de travail, pas directement dans le dépôt : l'image
source ne doit pas être commitée.

## Squelette de prompt

Reprendre mot pour mot, en ne remplaçant que ce qui est entre chevrons. Les
chaînes de texte exactes sont entre guillemets dans le prompt : le modèle les
reproduit caractère par caractère, y compris les accents, à condition qu'on le
lui demande explicitement — c'est ce que fait la dernière phrase.

> A flat, print-like graphic poster on warm off-white paper, colour #FAF8F5. No
> photography, no people, no gradients, no drop shadows, no 3D, no rounded
> corners, no logos, no icons, no decorative flourishes. The aesthetic is a
> sober contemporary French institutional document — a parliamentary report
> cover: hairline rules only, right angles only, strict left alignment, generous
> margins. A solid deep navy blue horizontal bar, colour #122B78, spans the full
> width along the very top edge, about 1.5% of the image height. LAYOUT — two
> columns separated by a single vertical hairline rule in #D9D4CC at about 63%
> of the width. Wide empty margins: nothing important within 8% of any edge.
> LEFT COLUMN, top to bottom, left-aligned: 1. Small letter-spaced uppercase
> serif, warm grey #78716C, exact text: "MACRONISME 2017-2026 · LE BILAN"
> 2. A very large high-contrast serif headline (Spectral or Georgia style),
> near-black #1C1A19, `<mise en ligne du nom : « exact single word "SANTÉ" » ou
> « set on exactly two lines, the first line reading "LIBERTÉS" and the second
> line reading "PUBLIQUES", both flush left »>`. 3. A horizontal hairline rule
> in #D9D4CC. 4. Medium serif line: "Verdict :" in near-black #1C1A19, then on
> the same line `<"VERDICT EN CAPITALES">` in deep crimson #8A1622, semibold.
> 5. Small monospace typewriter text in grey #78716C, exact text:
> `<"appréciation portée le 4 août 2026">` RIGHT COLUMN, a stacked data block,
> figures in deep navy #122B78, set in a large letter-spaced MONOSPACE
> TYPEWRITER face, never a serif, each on its own line with a small MONOSPACE
> TYPEWRITER caption in grey beneath: `<un à trois chiffres, chacun suivi de sa
> légende courte>`. Then a hairline rule, then a small serif line in near-black,
> exact text: `<"ce que les chiffres mesurent">`. BOTTOM, full width above the
> lower margin: a horizontal hairline rule in #D9D4CC, and beneath it one small
> MONOSPACE TYPEWRITER line in grey #78716C, exact text: `<"N pièces datées et
> sourcées · macronisme-le-bilan.netlify.app">`. Render every French accent
> exactly: É, é, à, û. Reproduce all quoted text character for character, no
> extra words, no invented labels, no watermark. Text crisp, perfectly
> horizontal, fully inside the margins.

**Trois précisions qui évitent chacune une génération perdue.**

Pour un nombre à séparateur de milliers, demander explicitement l'espace fine et
interdire la virgule (`written with a thin space between "18" and "976" and
never a comma`) — sans quoi le modèle compose à l'anglaise.

Pour un nom de domaine en deux mots, imposer la coupe sur deux lignes, sinon il
réduit le corps jusqu'à l'illisible.

Pour la machine à écrire, **insister en capitales et interdire le serif**. Le
bloc de chiffres et la ligne de pied sont en Courier sur les cartes déjà en
ligne, et c'est une part importante de ce qui les fait reconnaître comme une
série ; demandé mollement, le modèle compose tout en serif et la nouvelle carte
sort de la famille sans qu'aucun mot ne soit faux. Constaté en production le
09/08/2026, une passe perdue.

**Ce que le bloc de chiffres doit raconter.** Il porte le chiffre de signature.
S'il tient en une progression qui va dans le sens du verdict, la donner en
plusieurs valeurs — `institutions` montre trois taux de ratification qui
s'effondrent. Si la seule progression disponible joue *contre* le verdict, ne
pas la mettre en gros sur la carte : une valeur unique et son année, plus le
taux de variation, disent la même chose sans mentir. La correction, elle, vit
dans la légende du chiffre sur la page, où le lecteur la trouve.

## Réduction

```bash
sips -Z 1200 source.png --out plein.png
magick plein.png -strip -colors 64 -define png:compression-level=9 og.png
```

La réduction à 64 couleurs divise le poids par seize environ (une carte pèse
alors 35 à 45 Ko) et supprime au passage le léger relief que le modèle pose
parfois sous le titre. Vérifier ensuite le format :

```bash
sips -g pixelWidth -g pixelHeight og.png   # doit dire 1200 × 630
```

Le build refuse toute autre dimension.

## Contrôle, avant de réduire

Ouvrir l'image générée et **la lire caractère par caractère** : marque, nom du
domaine, verdict, date, chiffres et leurs légendes, ligne de pied. Vérifier les
accents un à un — É, é, à, û — et le séparateur de milliers.

Si un mot est faux : ne pas relancer le même prompt à l'identique. Corriger le
seul mot fautif via `gpt_image_edit`, ou raccourcir la chaîne en cause. Une
faute typographique se repaie en image entière.

Comparer enfin la nouvelle carte à celles déjà en place : elles doivent se
reconnaître comme d'une même série.

## La garde dans `brief.json`

Les pixels étant illisibles au build, `brief.json` enregistre l'état du corpus
contre lequel la carte a été produite :

```json
"og_genere_le": "AAAA-MM-JJ",
"og_verdict": "<verdict du frontmatter de la pièce>",
"og_date_verdict": "<date_verdict de la pièce>",
"og_compteurs": { "fiches": 0, "citees": 0 }
```

Le build confronte ces valeurs au corpus et **échoue en cas d'écart**. Le
blocage est délibérément strict : si une révision mineure ne justifie pas de
régénérer l'image, la sortie est de mettre `brief.json` à jour sciemment, jamais
de désarmer le contrôle. Garder aussi le prompt utilisé dans `og_prompt` : c'est
ce qui rend la carte reproductible.
