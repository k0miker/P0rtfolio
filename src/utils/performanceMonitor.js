/**
 * Vereinfachter Performance-Monitor für Animation-Kontrolle
 *
 * Zwei Steuerungswege:
 *  - Manuell: Klick auf den Toggle. Wird dauerhaft in localStorage gespeichert
 *    und hat Vorrang vor der Automatik.
 *  - Automatisch: FPS-Messung schaltet beidseitig um (runter bei schlechten,
 *    rauf bei guten FPS). Diese Auto-Entscheidung ist session-intern und wird
 *    NICHT persistiert – so beißt sich der Low-Modus nicht dauerhaft fest.
 */

class PerformanceMonitor {
  constructor() {
    this.lowPerformanceMode = false;
    this.listeners = [];

    // true, sobald der Nutzer selbst umgeschaltet hat. Dann übernimmt die
    // FPS-Automatik nicht mehr die Kontrolle.
    this.manualOverride = false;

    // Einmalige Migration: Frühere Versionen haben auch automatisch erkannte
    // Low-Werte dauerhaft gespeichert. Solche Altbestände lassen sich nicht von
    // echten manuellen Entscheidungen unterscheiden – deshalb einmal zurücksetzen,
    // damit die neue beidseitige Automatik sauber starten kann.
    if (!localStorage.getItem('performance-mode-v2')) {
      localStorage.removeItem('performance-mode');
      localStorage.setItem('performance-mode-v2', '1');
    }

    // Nur eine ausdrückliche manuelle Wahl aus einer früheren Session
    // wiederherstellen. Automatisch erkannte Werte werden nicht gespeichert.
    const savedMode = localStorage.getItem('performance-mode');
    if (savedMode === 'low' || savedMode === 'high') {
      this.manualOverride = true;
      this.setPerformanceMode(savedMode === 'low', { persist: false });
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
    // Sofortigen Status mitteilen
    setTimeout(() => callback(this.lowPerformanceMode), 10);
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.lowPerformanceMode);
      } catch (e) {
        console.error("Error in performance listener:", e);
      }
    });
    document.dispatchEvent(new CustomEvent('performanceModeChange', {
      detail: { mode: this.lowPerformanceMode ? 'low' : 'high' }
    }));
  }

  /**
   * @param {boolean} isLowPerformance
   * @param {{persist?: boolean}} [options] persist=true schreibt die Wahl
   *   dauerhaft in localStorage (nur bei manueller Umschaltung).
   */
  setPerformanceMode(isLowPerformance, { persist = false } = {}) {
    if (persist) {
      localStorage.setItem('performance-mode', isLowPerformance ? 'low' : 'high');
    }

    if (this.lowPerformanceMode === isLowPerformance) return;

    this.lowPerformanceMode = isLowPerformance;
    document.documentElement.setAttribute('data-performance', isLowPerformance ? 'low' : 'high');
    document.body.setAttribute('data-performance', isLowPerformance ? 'low' : 'high');

    this.notifyListeners();
  }

  // Toggle zwischen Modi – zählt als manuelle Wahl und wird persistiert.
  togglePerformanceMode() {
    this.manualOverride = true;
    this.setPerformanceMode(!this.lowPerformanceMode, { persist: true });
    return this.lowPerformanceMode;
  }

  // FPS messen und automatisch umschalten
  start() {
    if (!this.measuring) {
      this.measuring = true;
      this.lowFpsStreak = 0;
      this.highFpsStreak = 0;
      // Warmup: beim Seitenladen (Bild-Dekodierung, Hydration) bricht die
      // Framerate kurz ein – das darf nicht sofort auf Low schalten
      setTimeout(() => {
        if (!this.measuring) return;
        this.frames = 0;
        this.lastTime = performance.now();
        this.measureFPS();
      }, 4000);
    }
  }

  stop() {
    this.measuring = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  measureFPS() {
    if (!this.measuring) return;

    const now = performance.now();
    this.frames++;

    if (now >= this.lastTime + 1000) {
      const fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;

      // Manuelle Wahl hat Vorrang – Automatik hält sich dann komplett zurück.
      if (!this.manualOverride) {
        if (fps < 40) {
          // Erst nach mehreren schlechten Sekunden in Folge auf Low schalten,
          // damit ein einzelner Ruckler nicht dauerhaft die Animationen killt.
          this.lowFpsStreak++;
          this.highFpsStreak = 0;
          if (this.lowFpsStreak >= 3 && !this.lowPerformanceMode) {
            this.setPerformanceMode(true, { persist: false });
          }
        } else if (fps >= 55) {
          // Erholen sich die FPS wieder deutlich, zurück auf High – aber nur,
          // wenn der Low-Modus automatisch gesetzt wurde (nicht persistiert).
          this.highFpsStreak++;
          this.lowFpsStreak = 0;
          if (this.highFpsStreak >= 3 && this.lowPerformanceMode) {
            this.setPerformanceMode(false, { persist: false });
          }
        } else {
          // Graubereich (40–54 FPS): keine Streak hochzählen, aber auch nicht
          // sofort zurücksetzen – Hysterese gegen Flackern.
          this.lowFpsStreak = 0;
          this.highFpsStreak = 0;
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.measureFPS());
  }
}

// Singleton-Instanz erstellen
const performanceMonitor = new PerformanceMonitor();

// Globale Debug-Funktion zur manuellen Steuerung
window.togglePerformance = () => {
  const isLow = performanceMonitor.togglePerformanceMode();
  return isLow ? 'Low Performance Mode' : 'High Performance Mode';
};

export { performanceMonitor };
