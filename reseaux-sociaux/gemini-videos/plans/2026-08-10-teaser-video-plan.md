# Teaser Vidéo Data-Shock Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer et rendre la vidéo teaser de 24 secondes (1:1 carré, 1080x1080, 60fps) "Le Data-Shock" pour la promotion du site `macronisme-le-bilan.netlify.app` sur X.

**Architecture:** Composition HyperFrames HTML/CSS/JS isolée dans `reseaux-sociaux/gemini-videos/teaser-data-shock/`. Animation GSAP 3 synchrone et seekable via `window.__timelines["teaser-data-shock"]`. Rendu MP4 60fps via HyperFrames / Playwright CLI.

**Tech Stack:** HTML5, CSS3 (JetBrains Mono, CSS Flexbox), GSAP 3, Bun/Node.js, HyperFrames CLI.

---

### Task 1: Composition Scaffolding & Design Tokens

**Files:**
- Create: `reseaux-sociaux/gemini-videos/teaser-data-shock/index.html`
- Create: `reseaux-sociaux/gemini-videos/teaser-data-shock/style.css`

- [ ] **Step 1: Create standalone HTML composition structure**

Create `reseaux-sociaux/gemini-videos/teaser-data-shock/index.html` with explicit sized root `data-composition-id="teaser-data-shock"`, `data-duration="24"`, and `data-fps="60"`. Include GSAP 3 CDN or local script import, and local JetBrains Mono font loading.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Teaser Data-Shock (24s)</title>
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
</head>
<body>
  <div id="root" data-composition-id="teaser-data-shock" data-duration="24" data-fps="60">
    <div class="stage-bg"></div>
    <div id="beat-1" class="clip" data-start="0" data-end="5.2" data-track-index="1">
      <div class="beat-content">
        <div class="kicker">9 ANS DE POUVOIR</div>
        <div class="counter-box">
          <span id="fiche-counter">0</span>
          <span class="unit">FICHES</span>
        </div>
        <div class="subtitle">534 FICHES DATÉES & SOURCÉES • 915 SOURCES</div>
      </div>
    </div>
    <div id="beat-2" class="clip" data-start="5" data-end="11.2" data-track-index="1">
      <div class="beat-content">
        <div class="badge-grade-a">76,6% GRADE A</div>
        <div class="grade-desc">Lois • Journal Officiel • Cour des comptes • Décisions de justice</div>
        <div class="badge-grade-d">ZÉRO RUMEUR (GRADE D)</div>
      </div>
    </div>
    <div id="beat-3" class="clip" data-start="11" data-end="17.2" data-track-index="1">
      <div class="beat-content split-view">
        <div class="col col-facts">
          <h3>BASE FACTUELLE</h3>
          <p>534 fiches neutres et datées</p>
        </div>
        <div class="laser-divider"></div>
        <div class="col col-verdicts">
          <h3>15 JUGEMENTS</h3>
          <p>13 défavorables • 2 mitigés</p>
        </div>
      </div>
      <div class="bottom-banner">DEUX COUCHES. SENS UNIQUE.</div>
    </div>
    <div id="beat-4" class="clip" data-start="17" data-end="24" data-track-index="1">
      <div class="beat-content cta-view">
        <div class="brand-title">MACRONISME : LE BILAN</div>
        <div class="url-card">macronisme-le-bilan.netlify.app</div>
        <div class="tagline">Le dossier factuel. Jugez sur pièces.</div>
      </div>
    </div>
  </div>
  <script src="./script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Add CSS styles and design tokens**

Create `reseaux-sociaux/gemini-videos/teaser-data-shock/style.css` with 1080x1080 dimensions, dark color palette (`#0B0F17`, `#111827`, `#F59E0B`, `#3B82F6`), font definitions, and clip layout definitions.

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../../../atlas/dist/fonts/JetBrainsMono-Medium.ttf') format('truetype');
  font-weight: 500;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../../../atlas/dist/fonts/JetBrainsMono-SemiBold.ttf') format('truetype');
  font-weight: 600;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  width: 1080px;
  height: 1080px;
  overflow: hidden;
  background: #000;
  font-family: 'JetBrains Mono', monospace;
}

#root {
  position: relative;
  width: 1080px;
  height: 1080px;
  background-color: #0B0F17;
  color: #F3F4F6;
}

.stage-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, #1F2937 0%, #0B0F17 70%);
  z-index: 0;
}

.clip {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.beat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px;
  width: 100%;
}

.kicker {
  font-size: 36px;
  letter-spacing: 6px;
  color: #9CA3AF;
  margin-bottom: 20px;
}

.counter-box {
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin-bottom: 30px;
}

#fiche-counter {
  font-size: 160px;
  font-weight: 700;
  color: #F59E0B;
  text-shadow: 0 0 40px rgba(245, 158, 11, 0.4);
}

.unit {
  font-size: 48px;
  font-weight: 600;
  color: #F3F4F6;
}

.subtitle {
  font-size: 28px;
  color: #D1D5DB;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px 32px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.badge-grade-a {
  font-size: 64px;
  font-weight: 700;
  color: #F59E0B;
  border: 4px solid #F59E0B;
  padding: 24px 48px;
  border-radius: 16px;
  box-shadow: 0 0 50px rgba(245, 158, 11, 0.3);
  margin-bottom: 30px;
}

.grade-desc {
  font-size: 28px;
  color: #9CA3AF;
  margin-bottom: 40px;
  max-width: 800px;
}

.badge-grade-d {
  font-size: 32px;
  color: #EF4444;
  border: 2px solid #EF4444;
  padding: 12px 28px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
}

.split-view {
  flex-direction: row;
  justify-content: space-around;
  width: 900px;
  gap: 40px;
  position: relative;
}

.col {
  flex: 1;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.col h3 {
  font-size: 32px;
  margin-bottom: 16px;
}

.col-facts h3 { color: #3B82F6; }
.col-verdicts h3 { color: #F59E0B; }

.laser-divider {
  width: 4px;
  height: 300px;
  background: linear-gradient(180deg, #3B82F6, #F59E0B);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
}

.bottom-banner {
  margin-top: 50px;
  font-size: 32px;
  font-weight: 600;
  color: #F3F4F6;
  letter-spacing: 2px;
}

.brand-title {
  font-size: 40px;
  letter-spacing: 4px;
  color: #9CA3AF;
  margin-bottom: 30px;
}

.url-card {
  font-size: 44px;
  font-weight: 700;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.1);
  border: 2px solid #F59E0B;
  padding: 30px 50px;
  border-radius: 16px;
  box-shadow: 0 0 60px rgba(245, 158, 11, 0.3);
  margin-bottom: 30px;
}

.tagline {
  font-size: 32px;
  color: #F3F4F6;
}
```

- [ ] **Step 3: Commit Task 1**

```bash
git add reseaux-sociaux/gemini-videos/teaser-data-shock/
git commit -m "feat(video): add HTML and CSS scaffolding for teaser data-shock"
```

---

### Task 2: Synchronous Seekable GSAP Timeline

**Files:**
- Create: `reseaux-sociaux/gemini-videos/teaser-data-shock/script.js`

- [ ] **Step 1: Write `script.js` with `window.__timelines["teaser-data-shock"]`**

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({ paused: true });
  window.__timelines = window.__timelines || {};
  window.__timelines["teaser-data-shock"] = tl;

  const counterObj = { val: 0 };
  const counterEl = document.getElementById("fiche-counter");

  // Beat 1 (0s to 5s)
  tl.to(counterObj, {
    val: 534,
    duration: 1.8,
    ease: "power3.out",
    onUpdate: () => {
      if (counterEl) counterEl.textContent = Math.round(counterObj.val);
    }
  }, 0.2);

  tl.from("#beat-1 .kicker", { opacity: 0, y: -20, duration: 0.5 }, 0.1);
  tl.from("#beat-1 .subtitle", { opacity: 0, y: 20, duration: 0.5 }, 1.5);

  // Beat 2 (5s to 11s)
  tl.from("#beat-2 .badge-grade-a", { scale: 0.7, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, 5.2);
  tl.from("#beat-2 .grade-desc", { opacity: 0, y: 20, duration: 0.5 }, 5.8);
  tl.from("#beat-2 .badge-grade-d", { opacity: 0, scale: 0.8, duration: 0.4 }, 7.0);

  // Beat 3 (11s to 17s)
  tl.from("#beat-3 .col-facts", { x: -100, opacity: 0, duration: 0.6, ease: "power2.out" }, 11.2);
  tl.from("#beat-3 .col-verdicts", { x: 100, opacity: 0, duration: 0.6, ease: "power2.out" }, 11.2);
  tl.from("#beat-3 .laser-divider", { scaleY: 0, duration: 0.5 }, 11.0);
  tl.from("#beat-3 .bottom-banner", { opacity: 0, y: 20, duration: 0.5 }, 12.5);

  // Beat 4 (17s to 24s)
  tl.from("#beat-4 .brand-title", { opacity: 0, y: -20, duration: 0.5 }, 17.2);
  tl.from("#beat-4 .url-card", { scale: 0.85, opacity: 0, duration: 0.7, ease: "back.out(1.4)" }, 17.6);
  tl.from("#beat-4 .tagline", { opacity: 0, y: 20, duration: 0.5 }, 18.5);
});
```

- [ ] **Step 2: Commit Task 2**

```bash
git add reseaux-sociaux/gemini-videos/teaser-data-shock/script.js
git commit -m "feat(video): add seekable GSAP timeline for teaser data-shock"
```

---

### Task 3: HyperFrames Validation & Local Rendering

**Files:**
- Output: `reseaux-sociaux/gemini-videos/teaser-data-shock/teaser-data-shock.mp4`

- [ ] **Step 1: Run hyperframes check/snapshot**

Run: `npx hyperframes check` or `npx hyperframes snapshot` in `reseaux-sociaux/gemini-videos/teaser-data-shock/`.

- [ ] **Step 2: Render video MP4**

Run: `npx hyperframes render --input reseaux-sociaux/gemini-videos/teaser-data-shock/index.html --output reseaux-sociaux/gemini-videos/teaser-data-shock/teaser-data-shock.mp4`

- [ ] **Step 3: Verify output file exists and size is valid**

Run: `ls -lh reseaux-sociaux/gemini-videos/teaser-data-shock/teaser-data-shock.mp4`
Expected: Non-zero MP4 file generated.

- [ ] **Step 4: Commit final video & project**

```bash
git add reseaux-sociaux/gemini-videos/
git commit -m "feat(video): render final 24s teaser data-shock video MP4"
```
