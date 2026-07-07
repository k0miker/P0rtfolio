/**
 * Fixierter Parallax-Hintergrund + Ken-Burns-Drift — nur im High-Performance-Modus.
 *
 * Komplett CSS-gerendert, kein Scroll-JavaScript (das läuft immer einen Frame
 * hinter dem nativen Scrollen her und ruckelt):
 *
 * 1. Jede Sektion bekommt `clip-path: inset(0)` und eine Hintergrund-Ebene mit
 *    `position: fixed; inset: 0`. Die Ebene klebt am Viewport (exakt der Look
 *    von background-attachment: fixed), wird aber auf die Sektion geclippt —
 *    das funktioniert im Gegensatz zu fixed-Attachment auch auf iOS und läuft
 *    butterweich, weil der Browser alles nativ auf dem Compositor rendert.
 * 2. Obendrauf zoomt/driftet die Ebene per Keyframe-Animation ganz langsam
 *    (Ken-Burns-Effekt) — zeitgesteuert, unabhängig vom Scrollen.
 *
 * Beim Wechsel auf Low-Performance wird alles rückstandsfrei abgebaut und die
 * ursprünglichen Hintergründe wiederhergestellt.
 */

// Dauer eines Drift-Durchlaufs (hin und zurück via alternate)
const DRIFT_DURATION_S = 15;

const STYLE_ID = "parallax-keyframes";

// Zoom bleibt immer ≥ 1.05 (2.5% Rand), Translate max 1.5% → nie sichtbare Kanten
const KEYFRAMES = `
@keyframes parallax-drift {
  from { transform: scale(1.15) translate(1.2%, 0.8%); }
  to   { transform: scale(1.05) translate(-1.2%, -0.8%); }
}
@media (prefers-reduced-motion: reduce) {
  .parallax-layer { animation: none !important; }
}
`;

class FixedParallax {
  constructor(selectors) {
    this.selectors = selectors;
    this.entries = [];
    this.active = false;
  }

  injectKeyframes() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
  }

  init() {
    if (this.active) return;
    this.injectKeyframes();

    this.selectors.forEach((selector, index) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const bg = getComputedStyle(section).backgroundImage;
      if (!bg || bg === "none") return;

      // Ursprüngliche Inline-Styles merken, um sie beim Teardown wiederherzustellen
      const original = {
        backgroundImage: section.style.backgroundImage,
        position: section.style.position,
        clipPath: section.style.clipPath,
        zIndex: section.style.zIndex,
      };

      const layer = document.createElement("div");
      layer.className = "parallax-layer";
      layer.setAttribute("aria-hidden", "true");
      Object.assign(layer.style, {
        position: "fixed",
        inset: "0",
        backgroundImage: bg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: "-1",
        pointerEvents: "none",
        // Ken-Burns-Drift; versetzt gestartet und abwechselnd gegenläufig,
        // damit nicht alle Sektionen synchron in dieselbe Richtung ziehen
        animation: `parallax-drift ${DRIFT_DURATION_S}s ease-in-out infinite alternate`,
        animationDelay: `${-index * (DRIFT_DURATION_S / 2)}s`,
        animationDirection: index % 2 ? "alternate-reverse" : "alternate",
        willChange: "transform",
      });

      // Sektion vorbereiten: eigenes Bild aus, Ebene per clip-path einfangen
      // (overflow clippt position: fixed nicht — clip-path schon)
      section.style.backgroundImage = "none";
      if (getComputedStyle(section).position === "static") {
        section.style.position = "relative";
      }
      section.style.clipPath = "inset(0)";
      if (getComputedStyle(section).zIndex === "auto") {
        section.style.zIndex = "0";
      }
      section.prepend(layer);

      this.entries.push({ section, layer, original });
    });

    this.active = this.entries.length > 0;
  }

  destroy() {
    if (!this.entries.length) return;
    this.entries.forEach(({ section, layer, original }) => {
      layer.remove();
      section.style.backgroundImage = original.backgroundImage;
      section.style.position = original.position;
      section.style.clipPath = original.clipPath;
      section.style.zIndex = original.zIndex;
    });
    this.entries = [];
    this.active = false;
  }
}

/**
 * Verdrahtet das Parallax mit dem Performance-Modus:
 * high → aktiv, low → abgebaut. Reagiert live auf performanceModeChange.
 */
export function setupParallax() {
  const parallax = new FixedParallax([
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
