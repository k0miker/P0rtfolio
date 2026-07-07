/**
 * Scroll-Parallax für Sektions-Hintergründe — läuft nur im High-Performance-Modus.
 *
 * Statt background-attachment: fixed bekommt jede Sektion eine eigene, leicht
 * überhohe Hintergrund-Ebene, die per translate3d dem Scroll "hinterherhinkt".
 * Transforms laufen auf dem Compositor (keine Repaints) und funktionieren damit
 * auch auf iOS, wo fixed-Attachment nicht unterstützt wird.
 *
 * Beim Wechsel auf Low-Performance wird alles rückstandsfrei abgebaut und die
 * ursprünglichen Hintergründe wiederhergestellt.
 */

// Wie stark der Hintergrund am Viewport "klebt":
// 1 = exakt wie background-attachment: fixed (Bild steht, Inhalt schiebt drüber),
// 0 = Bild scrollt normal mit. 0.85 = fixed-Look mit leichter Drift.
const STICKINESS = 0.85;

class SectionParallax {
  constructor(selectors) {
    this.selectors = selectors;
    this.entries = [];
    this.active = false;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.update = this.update.bind(this);
  }

  init() {
    if (this.active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    this.selectors.forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const bg = getComputedStyle(section).backgroundImage;
      if (!bg || bg === "none") return;

      // Ursprüngliche Inline-Styles merken, um sie beim Teardown wiederherzustellen
      const original = {
        backgroundImage: section.style.backgroundImage,
        position: section.style.position,
        overflow: section.style.overflow,
        zIndex: section.style.zIndex,
      };

      const layer = document.createElement("div");
      layer.className = "parallax-layer";
      layer.setAttribute("aria-hidden", "true");
      Object.assign(layer.style, {
        position: "absolute",
        left: "0",
        right: "0",
        backgroundImage: bg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: "-1",
        pointerEvents: "none",
        willChange: "transform",
      });

      // Sektion vorbereiten: eigenes Bild aus, Ebene dahinter einhängen
      section.style.backgroundImage = "none";
      if (getComputedStyle(section).position === "static") {
        section.style.position = "relative";
      }
      section.style.overflow = "clip";
      if (getComputedStyle(section).zIndex === "auto") {
        section.style.zIndex = "0";
      }
      section.prepend(layer);

      this.entries.push({ section, layer, original });
    });

    if (!this.entries.length) return;

    this.active = true;
    this.measure();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize);
    this.update();
  }

  destroy() {
    if (!this.active && !this.entries.length) return;
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);

    this.entries.forEach(({ section, layer, original }) => {
      layer.remove();
      section.style.backgroundImage = original.backgroundImage;
      section.style.position = original.position;
      section.style.overflow = original.overflow;
      section.style.zIndex = original.zIndex;
    });
    this.entries = [];
    this.active = false;
    this.ticking = false;
  }

  // Ebene viewport-hoch bemessen (wie es background-attachment: fixed rendert);
  // bei STICKINESS < 1 zusätzlich Drift-Spielraum einrechnen, damit keine Lücke entsteht
  measure() {
    const vh = window.innerHeight;
    this.entries.forEach((entry) => {
      const sh = entry.section.offsetHeight;
      // Grundhöhe = Viewport (wie fixed rendert); ist die Sektion höher,
      // driftet die Ebene um (sh - vh) · (1 - STICKINESS) und braucht Reserve
      const height = vh + Math.max(0, sh - vh) * (1 - STICKINESS) + 4;
      entry.layer.style.top = "0";
      entry.layer.style.height = `${Math.ceil(height)}px`;
    });
  }

  onScroll() {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(this.update);
    }
  }

  onResize() {
    this.measure();
    this.onScroll();
  }

  update() {
    this.ticking = false;
    const vh = window.innerHeight;
    this.entries.forEach(({ section, layer }) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return; // nicht im Viewport
      // Gegenläufig zur Sektionsbewegung verschieben → Bild bleibt (fast) am Viewport
      const offset = -rect.top * STICKINESS;
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }
}

/**
 * Verdrahtet das Parallax mit dem Performance-Modus:
 * high → aktiv, low → abgebaut. Reagiert live auf performanceModeChange.
 */
export function setupParallax() {
  const parallax = new SectionParallax([
    "#home-section",
    "#skills",
    "#contact-section",
  ]);

  const apply = (mode) => {
    if (mode === "low") {
      parallax.destroy();
    } else {
      parallax.init();
    }
  };

  // Initialen Modus bestimmen (Attribut wird im High-Modus nicht immer gesetzt)
  const isLow =
    document.documentElement.getAttribute("data-performance") === "low" ||
    localStorage.getItem("performance-mode") === "low";
  apply(isLow ? "low" : "high");

  document.addEventListener("performanceModeChange", (event) => {
    apply(event.detail.mode);
  });
}
