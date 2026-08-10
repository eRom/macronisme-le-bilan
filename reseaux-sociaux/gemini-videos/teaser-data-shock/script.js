(function initComposition() {
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
})();
