## Objectif

Construire un bilan documenté et sourcé des deux quinquennats Macron (2017-2027), gouvernements et ministres inclus, en vue de la présidentielle de mai 2027.

## Contrat du poste (v0)

- **Méthode complète** : lire `methodes/methode-recherche.md` avant toute opération (schéma de fiche, grille des domaines, gabarit de prompt erom-research:deep-gemini, règles d'ingestion).
- **Base** : `base/` contient les fiches (une pièce = une fiche, `AAAA-MM-JJ-slug.md`, frontmatter normalisé avec grade de preuve A/B/C/D). `research/` reçoit les rapports erom-research:deep-gemini bruts. `chronologie.md` indexe les fiches et suit l'avancement par domaine.
- **Posture** : les fiches sont factuelles, datées, sourcées, sans jugement.
- **Couche jugement** (validée le 31/07/2026) : lire `methode-jugement.md` avant toute séance. Une pièce par domaine dans `jugement/` (slug de la grille v0) + `jugement/synthese.md` faîtière ; standard contradiction, verdict sur échelle commune à cinq niveaux, suivi par `atelier/plan-jugement.md` et la colonne « Jugement » de `chronologie.md`. Le jugement ne vit que dans `jugement/`, jamais dans les fiches.
- **Synthèse faîtière** : méthode dédiée dans `methodes/methode-synthese` (trois process, trois méthodes), à lire en entier avant la séance de synthèse. Fils transverses avec standard de preuve propre (deux domaines minimum, fiches d'appui distinctes), verdict d'ensemble sur l'échelle commune, portée 2027 en grille de lecture, jamais de consigne de vote.
- **Deux régimes de recherche, à ne pas confondre** (règle amendée le 30/07/2026) :
  - *Exploration d'un domaine* : `erom-research:deep-gemini`, ou `erom-research:deep-grok` sur décision de
    Romain (amendement du 31/07/2026, domaine international : Grok préserve le quota
    Google, sourcing primaire honnête mais corpus plus mince, rapports dans
    `docs/research/grok/` à la racine du HQ). Jamais Perplexity. C'est ce qui produit
    les rapports de `research/` (agy) et de `docs/research/grok/` (Grok).
  - *Sondage de vérification et rattrapage ciblé* : WebSearch pour localiser, WebFetch
    sur la page pour confirmer, `curl` + `pdftotext -layout` quand le PDF dépasse la
    limite de WebFetch (10 Mo) ou n'est pas lisible directement. À utiliser dès qu'on
    cherche un document précis dont on connaît le titre, l'auteur ou le numéro, et pour
    sonder tout identifiant ou URL avant de le figer dans une fiche.
    Démontré le 30/07 sur le domaine 15 : quatre des cinq lacunes qu'un run depth H de
    4 rounds avait déclarées introuvables ont été comblées à la main en une heure, pour
    un coût sans commune mesure. Un run multi-rounds est le mauvais outil pour retrouver
    un document nommé.
- **Coût réel d'un run erom-research:deep-gemini, à connaître avant d'en lancer un** : le workflow spawne
  un sous-agent Claude par angle et par claim, chacun appelant agy. Seule la recherche
  browsée est côté Gemini ; le raisonnement est facturé côté Claude. Un depth H sur
  6 angles a consommé environ 1,4 million de tokens de sous-agents le 30/07. Ne jamais
  présenter un run erom-research:deep-gemini comme gratuit côté Claude, et vérifier les deux quotas avant
  de lancer.
- **Atlas (site public)** : `atlas/` contient le mini-site statique du dossier, PUBLIÉ le 01/08/2026 sur https://macronisme-le-bilan.netlify.app (Netlify, deploy CLI du seul `atlas/dist/` généré, jamais le repo). Plans : `atelier/conception/plan-atlas.md` ; commandes : `atlas/CLAUDE.md`. Le pipeline lit `base/` et `jugement/` en lecture seule ; `research/`, `methodes/` et `chronologie.md` ne sont jamais publiés ; audit de publiabilité obligatoire avant chaque mise en ligne.
- **Mettre à jour le site en prod** (src -> build -> prod), depuis `atlas/` :

  ```bash
  bun run build.ts                                                  # base/ + jugement/ -> dist/data.js + build-report.md
  bun build ./src/app.ts --outdir ./dist --minify --target browser  # src/*.ts -> dist/app.js
  netlify deploy --prod --dir=dist                                  # dist/ -> https://macronisme-le-bilan.netlify.app
  ```

  Le pipeline de données et le bundle front sont deux étapes distinctes : une modif dans
  `src/` n'atteint la prod que si la seconde ligne est rejouée. Avant la troisième :
  `build-report.md` doit dire 531/531 et « Verdict du build : OK » (le build sort en
  exit 1 sur erreur bloquante). L'audit de publiabilité est désormais tenu par le build
  lui-même (depuis le 01/08) : `build.ts` reformule au rendu les renvois internes du
  corpus (table `REFORMULATIONS`) puis scanne le `data.js` final contre les motifs
  interdits (table `INTERDITS` : suivi interne, outillage de recherche, chemins locaux,
  nom de famille, arborescence de travail). Toute survivance est bloquante et listée
  dans le rapport. Le corpus source n'est jamais modifié : le nettoyage vit au rendu.
  Ajouter un motif à `INTERDITS` plutôt que de rattraper à la main. Après : vérifier en
  ligne, `curl -s -o /dev/null -w "%{http_code}" https://macronisme-le-bilan.netlify.app/`.
  Netlify n'est PAS connecté au repo : il ne voit que ce que le CLI pousse depuis `dist/`.
- **Verrou (amendé le 01/08/2026)** : le corpus source (`base/`, `jugement/`, `research/`, `methodes/`, `chronologie.md`) reste strictement personnel : il ne part JAMAIS vers Slack, Linear, artifact, indexation ou tout service externe sans demande explicite de Romain dans la session. Exception décidée par Romain le 01/08/2026 : le produit Atlas (`atlas/dist/`) est public sur Netlify ; tout redéploiement repasse par l'audit de publiabilité.
