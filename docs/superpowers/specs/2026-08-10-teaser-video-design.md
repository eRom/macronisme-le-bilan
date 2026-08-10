# Spec de Design : Vidéo Teaser "Le Data-Shock" (24s)

## 1. Objectif & Contexte
- **Objectif** : Générer de l'attention et du trafic vers `macronisme-le-bilan.netlify.app` depuis le réseau social X (Twitter) sur un compte à 0 abonné.
- **Approche** : Scénario 1 « Le Data-Shock » — Démonstration de force par la masse de données, la rigueur des sources et l'étanchéité de la méthode factuelle.
- **Audio** : 100 % Text-Driven (Typographie cinétique + BGM Pulse Cinématique + SFX impact/compteur). Pas de voix off.

## 2. Spécifications Techniques
- **Format** : 1080 × 1080 px (Carré 1:1, optimisé fil mobile X)
- **Framerate** : 60 fps
- **Durée** : 24 secondes (1440 frames)
- **Moteur de rendu** : HyperFrames (HTML/CSS/JS + GSAP + Playwright headless render)
- **Design System & Assets** :
  - Fontes : `JetBrains Mono` (Medium / SemiBold) + Font Titre Heavy Sans
  - Fond : `#0B0F17` (Ardoise sombre) / `#111827` (Anthracite)
  - Textes : `#F3F4F6` (Blanc cassé) / `#9CA3AF` (Gris neutre)
  - Accents : `#F59E0B` / `#FBBF24` (Ambre/Or) & `#3B82F6` (Bleu Justice)

## 3. Découpage Séquentiel (Beat-by-Beat)

### Beat 1 : Le Choc Numérique (00:00 - 00:05 | 0s à 5s)
- **Contenu** : Écran sombre. Sub-drop audio. Compteur cinétique s'affolant de 0 à 534 fiches en 1.5s.
- **Textes** :
  - "9 ANS DE POUVOIR."
  - "534 FICHES DATÉES & SOURCÉES."
  - "915 SOURCES OFFICIELLES."
- **Animations** : Compteur GSAP, micro-shake au verrouillage des chiffres, apparition séquentielle des lignes de texte en staggered fade-in.

### Beat 2 : La Pyramide de la Preuve (00:05 - 00:11 | 5s à 11s)
- **Contenu** : Carrousel 3D/2D rapide montrant un aperçu de cartes de fiches du dossier. Zoom puissant sur les badges de rang de preuve.
- **Textes** :
  - "76,6 % DE PREUVES INCONTESTABLES (GRADE A)."
  - "(Lois, Journal Officiel, Cour des comptes, Décisions de justice)"
  - "ZÉRO RUMEUR (GRADE D)."
- **Animations** : Glow ambre autour des cartes Grade A, transition fluide zoom-in/rack-focus blur-cut.

### Beat 3 : L'Étanchéité Méthodologique (00:11 - 00:17 | 11s à 17s)
- **Contenu** : Séparation de l'écran par un rayon vertical brillant.
  - Côté Gauche : "BASE FACTUELLE (534 FICHES)"
  - Côté Droit : "JUGEMENTS MOTIVÉS (15 DOMAINES)"
- **Textes** :
  - "DEUX COUCHES. SENS UNIQUE."
  - "On peut rejeter tous les verdicts et garder toutes les pièces."
- **Animations** : Cut-the-curve glissement latéral, badges de couleur opposés.

### Beat 4 : Chute & Call To Action (00:17 - 00:24 | 17s à 24s)
- **Contenu** : Fondu au noir rapide vers la carte de présentation du site. Curseur macOS surdimensionné venant survoler et cliquer l'URL.
- **Textes** :
  - "MACRONISME : LE BILAN (2017-2027)"
  - "macronisme-le-bilan.netlify.app"
  - "Le dossier factuel. Jugez sur pièces."
- **Animations** : Oversized cursor animé (entry -> click tap -> glow pulsé), léger zoom-in continu de l'arrière-plan.

## 4. Stratégie de Distribution X
- Post principal avec vidéo attachée (1:1).
- Pas de tag d'élus/Élysée. Hashtag `#Macron` au maximum.
- Reply automatique dans la minute avec le lien vers le dépôt GitHub (`github.com/eRom/macronisme-le-bilan`) pour attester de la méthode et des échecs documentés.
