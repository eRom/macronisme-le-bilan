# Méthode — exhaustivité réaliste du dossier

> Procédé, pas chantier ouvert. Rédigé le 2026-08-03.
> Ne remplace pas `METHODE.md` (contrat public) ni le contrat de réouverture
> de `CLAUDE.md`. Complète les deux : comment détecter les trous, prioriser,
> combler, et arrêter.

## 0. Ce que « exhaustif » ne veut pas dire

Le dossier ne peut pas, et ne doit pas, devenir une encyclopédie de neuf ans
d'exécutif. Trois raisons, qui valent mieux que de l'humilité de façade :

1. **La base est un dossier de pièces, pas un flux d'actualité.** Chaque fiche
   a un coût de sondage, de grade, de maintenance d'URL. Une base qui grossit
   sans critère se dégrade.
2. **Le jugement n'a pas besoin de tout pour tenir.** Une charge A/B survit
   avec un petit nombre de pièces solides. Ajouter des pièces périphériques
   n'améliore le verdict que si elles changent la balance ou sa limite.
3. **L'exhaustivité absolue est non falsifiable.** On peut toujours citer un
   épisode manquant (ASTRID, un amendement, un discours). Sans critère
   d'arrêt, le chantier est infini et l'atelier reprend le dessus sur l'œuvre.

**Objectif utile, reformulé :**

> Maximiser la **couverture déclarée** d'une matrice par domaine (sous-thèmes
> × période × type de pièce), rendre les **trous nommés** (known unknowns),
> et n'ouvrir une réouverture que si le trou est **notable** ou **chargeant**
> (il déplace ou fragilise une charge / décharge).

Autrement dit : pas 100 % du réel, mais **zéro trou silencieux** sur ce que le
dossier prétend couvrir, et une file priorisée pour le reste.

---

## 1. Typologie des trous

Tous les manques ne se traitent pas pareil. Classer avant d'agir.

| Type | Définition | Exemple | Traitement |
|---|---|---|---|
| **T1 — Structurel** | Sous-thème central du périmètre jamais ouvert | ASTRID (4e gen, 2019) dans `ecologie-energie` / `industrie` | Matrice → fiche(s) si notable ; puis recheck jugement si la charge nucléaire bascule ou se précise |
| **T2 — Documentaire** | Fait déjà ciblé, source manquante ou grade trop bas | Référé Cour des comptes sans réponse ministérielle (`securite-civile`) | Rattrapage ciblé (jamais run multi-rounds) |
| **T3 — Temporel** | Période sous-documentée vs une autre | 2017-2022 plus maigre que 2024-2026 (biais déclaré METHODE §9) | Campagne bornée par années, pas par volume de fiches |
| **T4 — Décharge absente** | Charge forte sans élément à décharge documenté | Accusation sans réponse officielle | Chercher la décharge d'abord ; si introuvable, le dire dans la limite de la charge |
| **T5 — Grade** | Pièce en B/C alors qu'une source A existe | Rapport Cour des comptes non résolu, fiche restée B | Sondage ciblé ; rehausser ou documenter l'échec |
| **T6 — Actualité / post-socle** | Fait après la date de clôture du socle | Événement 2026-2027 | Contrat de réouverture (événement majeur) ou file de veille |
| **T7 — Signal social** | Sujet bruyant (X, presse) absent de `base/` | Série Cercle Aristote, thread viral | File d'attente : notabilité ≠ entrée automatique |

**ASTRID** est un T1 (et un T7 une fois qu'Aristote le médiatise). Fessenheim,
Belfort, Flamanville, EPR sont déjà là : le trou n'est pas « le nucléaire »,
c'est **une décision structurante de la filière neutrons rapides / 4e gen**.

---

## 2. Les trois couches de couverture

Ne pas confondre.

```
Couche A — Matrice déclarée     ce que le domaine DOIT couvrir (périmètre)
Couche B — Corpus réel          ce qui est dans base/ aujourd'hui
Couche C — File d'attente       trous nommés + signaux non encore instruits
```

- **A sans B** = trou (à prioriser).
- **B hors A** = pièce hors périmètre ou multi-tag à vérifier.
- **C** n'est jamais de la foi : c'est de l'atelier (`atelier/couverture/`).

La promesse publique du dossier (METHODE, site) porte sur B + les limites
dites en clair. C n'apparaît pas comme couverture.

---

## 3. Matrice par domaine (le plan dont tu parles)

Un fichier par domaine, vivant, dans l'atelier :

```
atelier/couverture/<slug>.md
```

### 3.1 Contenu type

```markdown
# Couverture : <slug>

## Périmètre (copié / condensé du jugement § Périmètre)
…

## Matrice sous-thèmes × période

| Sous-thème | 2017-22 | 2022-24 | 2024-26 | Statut | Notes |
|---|---|---|---|---|---|
| Nucléaire — parc / EPR | OK | OK | OK | saturé | Flamanville, Belfort… |
| Nucléaire — 4e gen / ASTRID | TROU | — | — | T1 | abandon 2019 |
| … | | | | | |

Statuts : `OK` | `partiel` | `TROU` | `hors-périmètre` | `abandonné`

## Trous nommés (C)

| ID | Type | Intitulé | Priorité | Source du signal | Statut |
|---|---|---|---|---|---|
| EE-01 | T1 | Abandon ASTRID 2019 | P1 | Cercle Aristote 2026-08 + canon filière | ouvert |

## Signaux en attente (T7, non triés)

- …

## Critère de saturation du domaine

Le domaine est **saturé pour la vN** quand :
1. chaque ligne de la matrice est `OK` ou `hors-périmètre` / `abandonné` motivé ;
2. aucun trou P0 ouvert ;
3. s'il y a eu des ajouts depuis le verdict : les 3 derniers n'ont modifié
   ni charge ni décharge du jugement (test de non-déplacement) ; sinon, la
   passe adversariale du domaine tient lieu de test.
```

### 3.2 D'où sort la liste des sous-thèmes

Ordre de construction, pour un domaine donné :

1. **Périmètre du jugement** (déjà écrit) + table METHODE §4.
2. **Angles du rapport** `atelier/research/<slug>.md` : aboutis **et** échoués
   (les échoués sont la première mine de T1/T2).
3. **Section « À re-vérifier »** de `atelier/chronologie.md`.
4. **Canon externe minimal** (une passe, pas une recherche infinie) :
   - lois / ordonnances majeures Légifrance ou Vie publique sur le thème ;
   - 2–3 rapports Cour des comptes ou parlementaires de référence ;
   - pour l'énergie : décisions structurantes de filière (Fessenheim, ASTRID,
     Belfort, renationalisation EDF, EPR2…) — liste courte et discutable.
5. **Passe adversariale** (optionnelle, 1× par domaine) : « si je voulais
   démontrer que ce domaine est un dossier à charge incomplet, quels 5 faits
   manqueraient ? » → candidats T1/T4 uniquement.

Interdit : relancer un run multi-rounds « pour être exhaustif ». Le socle a
déjà payé ce coût ; 9/15 rapports sont non convergés **et c'est assumé**.

---

## 4. Détection des trous (pipeline de diagnostic)

À lancer domaine par domaine, ou en audit global léger. Lecture seule tant
qu'aucune réouverture n'est décidée.

### Étape D1 — Inventaire passif (déjà payé)

Pour chaque slug :

- extraire du jugement : limites du périmètre, charges dont la limite dit
  « non documenté », décharges absentes ;
- extraire de `chronologie.md` : points ouverts du domaine ;
- extraire du research brut : angles `failed` / non versés / `partial` ;
- lister les slugs `base/` du domaine (grep frontmatter) et croiser.

Livrable : brouillon de `atelier/couverture/<slug>.md`, section Trous.

### Étape D2 — Audit mécanique (scriptable, faible coût)

Sur `base/` :

| Indicateur | À quoi ça sert |
|---|---|
| Histogramme par année (nom de fichier ou `date:`) | T3 — biais temporel |
| Comptage par `type:` (affaire / mesure / promesse / déclaration) | Déséquilibre de nature |
| Fiches multi-domaines vs mono | Transverses sous-exploitées |
| Grades C restants | Candidats T5 |
| Mentions dans research non présentes en slug | Pièces jamais ingérées |

Ne **pas** en déduire automatiquement une fiche. Un trou d'histogramme n'est
un T3 que s'il croise un sous-thème de la matrice.

### Étape D3 — Canon de notabilité (filtre d'entrée)

Un fait entre en file (C) seulement s'il coche **au moins deux** critères
**et** croise un sous-thème de la matrice (ou en révèle un manquant) :

- [ ] **Acte d'autorité** : loi, décret, décision de justice, rapport
      institutionnel, annonce présidentielle ou ministérielle datée
- [ ] **Conséquence durable** : budget, capacité industrielle, droit applicable,
      structure d'un service public, engagement international
- [ ] **Présence dans un jugement existant** comme limite ou comme charge
      fragile (combler améliore le dossier déjà écrit)
- [ ] **Récurrence dans le débat public sourcé** (presse A/B, pas un seul
      thread) *et* absence totale dans `base/`

Un seul critère = signal, pas trou prioritaire. ASTRID coche 1+2 (et 4 dès
qu'il est massivement repris) → P1 légitime.

### Étape D4 — Priorisation

| Priorité | Critère | Délai typique |
|---|---|---|
| **P0** | Fragilise ou contredit une charge/décharge **déjà retenue** ; ou grade faux / source morte sur pièce citée au jugement | Avant toute publication qui s'appuie dessus ; séance dédiée |
| **P1** | T1 sur sous-thème central de la matrice ; T4 sur charge déterminante | Prochaine campagne de couverture du domaine |
| **P2** | T3 sur période creuse ; T6 événement majeur post-socle ; T7 très notoire | Veille / batch mensuel |
| **P3** | Longue traîne, épisodes de série, faits secondaires | Seulement si saturation P0–P2 et budget restant |

**Règle d'or :** un P3 n'ouvre jamais une révision de synthèse. Un P0 qui
déplace un verdict de domaine **oblige** le recheck synthèse (contrat actuel).

---

## 5. Combler un trou (régime d'écriture)

Strictement aligné sur le contrat de réouverture, affiné par type.

### 5.1 Chemin standard (T1, T2, T5, la plupart des T6)

```
1. Candidat dans atelier/couverture/<slug>.md (statut: ouvert)
2. Rattrapage ciblé (titre / date / acteur connus)
   → WebSearch borné + ouverture réelle de chaque URL
   → pas de run multi-rounds sauf matrice entière encore vide
3. Rédaction fiche(s) base/ (invariants : neutre, grade, sondage)
4. Commit séparé : fiche(s) seule(s)
5. Si et seulement si la fiche peut déplacer charge / décharge / limite :
   relire les fiches du domaine concernées (pas tout le domaine si le
   grain est local), réviser jugement/<slug>.md, date_verdict, commit dédié
6. Si le jugement de domaine a bougé : recheck synthèse
7. Clôturer le trou dans la matrice (OK ou abandonné motivé)
```

### 5.2 Chemin « document nommé » (T2 pur)

Méthode déjà prouvée (`securite-civile`) :

- chercher le titre / la cote sur le portail (ccomptes, legifrance, senat…) ;
- `curl` + `pdftotext -layout` si besoin ;
- une fiche, un grade, une limite mise à jour dans le jugement si la pièce
  était citée comme manquante.

### 5.3 Chemin actualité X / presse (T6 + T7)

```
Signal (X, fil presse, lecteur)
        │
        ▼
  File atelier (pas base/)     ← capture URL + date + 1 ligne
        │
        ▼
  Tri notabilité (D3)          ← 2 critères min
        │
   non ─┴─ oui
        │
        ▼
  Déjà une fiche ? ──oui──► enrichir (sources, date_fin) ou ignorer
        │ non
        ▼
  Événement majeur ? ──non──► P2/P3, batch
        │ oui
        ▼
  Réouverture chirurgicale (5.1)
```

**X n'est jamais une source de grade A/B.** C'est un **détecteur de sujet**.
La fiche naît d'une source primaire ou de presse indépendante, comme le reste
du corpus.

**Repost / citation sociale** (Cercle Aristote, etc.) : le post peut alimenter
la file T7 ; il ne crée pas d'obligation de fiche.
Si le fait sous-jacent est T1 (ASTRID), la fiche se justifie **par le fait**,
pas par le post.

### 5.4 Ce qu'on ne fait pas

- Rouvrir les 15 domaines parce qu'un thread a listé 7 renoncements.
- Créer une fiche par épisode de série tierce.
- Promouvoir un point de `atelier/research/` sans re-sondage.
- Modifier un jugement « pour coller à l'actu » sans nouvelle pièce en `base/`.
- Lancer 15 runs deep « pour finir les angles » : coût disproportionné,
  leçon déjà apprise (METHODE §5, gotchas).

---

## 6. Deux régimes d'entretien (2026 → 2027)

Déjà dans `CLAUDE.md` ; articulation avec la couverture :

| Régime | Quand | Rapport à la matrice |
|---|---|---|
| **Veille par événement** (recommandé) | Un fait majeur à la fois | T6 → 5.1 sur 1 domaine ; MAJ ligne matrice |
| **Campagne de couverture** | Tu choisis 1–3 domaines à densifier | D1→D4 puis batch P0/P1 ; pas de run full sauf domaine encore squelettique |
| **Campagne temporelle** | Corriger le biais 2017-2022 | Filtrer la matrice sur la colonne 2017-22 = TROU/partiel uniquement |
| **Audit de saturation** | Avant de dire « le dossier est à jour » | Parcourir les 15 `couverture/*.md` : zéro P0, P1 listés et acceptés ou planifiés |

La **campagne de rattrapage 2026-2027** du CLAUDE.md (un run par domaine sur
la seule période récente) reste l'outil lourd si la veille a décroché. Elle
ne remplace pas les matrices : elle les alimente.

---

## 7. Artefacts à tenir (léger)

| Fichier | Rôle |
|---|---|
| `atelier/couverture/<slug>.md` | Matrice + trous + saturation du domaine |
| `atelier/couverture/README.md` | Index des 15, compteur P0/P1 ouverts, date dernier audit |
| `atelier/couverture/signaux.md` | File unique T7 (X, presse, lecteurs) avant tri par domaine |
| `atelier/chronologie.md` | Garde les points ouverts historiques ; peut renvoyer vers couverture/ |
| `METHODE.md` §9 | Limites **publiques** seulement (pas la file d'atelier) |

Rien de tout cela n'est de la foi. Rien n'entre dans `base/` ou `jugement/`
sans le chemin §5.

---

## 8. Critères d'arrêt (anti-infini)

Le dossier est **assez exhaustif pour la vN** quand les quatre conditions
tiennent :

1. **Transparence** : chaque domaine a une matrice ; les trous P0/P1 sont
   nommés, pas silencieux.
2. **Solidité des verdicts** : aucun P0 ouvert sur une pièce citée au jugement.
3. **Saturation locale** : sur les domaines « denses » (ex. `ecologie-energie`),
   les ajouts récents ne déplacent plus les charges.
4. **Biais assumé** : le déséquilibre temporel et les corpus minces
   (`international`, `education-recherche`) restent dits en METHODE §9, mis
   à jour si une campagne les a réellement corrigés.

Si tu ne peux pas cocher (1), le problème n'est pas le volume de fiches, c'est
l'inventaire. Si tu coches (1)–(4) et qu'un thread cite ASTRID, tu ajoutes une
ligne P1 et tu continues ta vie — tu ne rouvres pas le chantier entier.

---

## 9. Application éclair : ASTRID (sans l'exécuter)

| Champ | Valeur |
|---|---|
| Domaines | `ecologie-energie`, éventuellement `industrie` |
| Type de trou | T1 (+ T7 via signal social) |
| Priorité | P1 (central filière, pas P0 : aucune charge actuelle du jugement ne repose sur un mensonge rendu faux par ASTRID ; en revanche la limite « nucléaire » du périmètre est incomplète) |
| Régime | Rattrapage ciblé : décision d'abandon 2019, acteurs, documents CEA / gouvernement, suite éventuelle (relance 4e gen / SMR si distincte) |
| Jugement | Recheck seulement si une charge « renoncement nucléaire / perte de capacité » gagne un maillon déterminant, ou si une décharge « virage Belfort » doit être bornée par l'épisode 2019 |
| Synthèse | Seulement si le verdict de domaine ou un fil transverse énergie bouge |

---

## 10. Séquence recommandée (quand tu décideras d'ouvrir)

Ordre à bas coût cognitif, un domaine à la fois :

1. Créer `atelier/couverture/` + README (index vide).
2. **Pilot sur un domaine dense et un mince** : `ecologie-energie` +
   `education-recherche` — pour caler le format de matrice.
3. Remplir les 15 matrices en **D1 seul** (passif) : une demi-journée
   d'inventaire, zéro fiche nouvelle.
4. Prioriser le top 15 des P0/P1 globaux.
5. Traiter par batch de 3–5 fiches max, commits séparés, jugements seulement
   si déplacement.
6. Tenir `signaux.md` en entrée continue (2 min quand un post te semble
   pertinent), tri hebdo ou mensuel.

Ne pas commencer par « relancer 15 recherches ». Commencer par **nommer**.

---

## 11. Une phrase de doctrine

> L'exhaustivité du dossier, ce n'est pas tout savoir sur Macron : c'est
> **savoir ce qu'on couvre, ce qu'on ne couvre pas, et pourquoi le prochain
> ajout mérite une fiche**.
