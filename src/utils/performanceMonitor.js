/**
 * Vereinfachter Performance-Monitor für Animation-Kontrolle
 */

class PerformanceMonitor {
  constructor() {
    // Standardmäßig den High-Performance-Modus verwenden
    this.lowPerformanceMode = false;
    this.listeners = [];
    
    // Gespeicherte Einstellungen wiederherstellen
    const savedMode = localStorage.getItem('performance-mode');
    if (savedMode === 'low') {
      this.setPerformanceMode(true);
    } else {
      this.setPerformanceMode(false);
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
  }
  
  setPerformanceMode(isLowPerformance) {
    if (this.lowPerformanceMode === isLowPerformance) return;
    
    this.lowPerformanceMode = isLowPerformance;
    document.documentElement.setAttribute('data-performance', isLowPerformance ? 'low' : 'high');
    document.body.setAttribute('data-performance', isLowPerformance ? 'low' : 'high');
    localStorage.setItem('performance-mode', isLowPerformance ? 'low' : 'high');
    
    this.notifyListeners();
  }
  
  // Toggle zwischen Modi
  togglePerformanceMode() {
    this.setPerformanceMode(!this.lowPerformanceMode);
    return this.lowPerformanceMode;
  }
  
  // FPS messen und automatisch umschalten
  start() {
    if (!this.measuring) {
      this.frames = 0;
      this.lastTime = performance.now();
      this.measuring = true;
      this.measureFPS();
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
      
      // Automatisch auf Low-Performance umschalten bei niedrigen FPS
      if (fps < 40 && !this.lowPerformanceMode) {
        this.setPerformanceMode(true);
      }
      // Bei hohen FPS nicht automatisch zurückschalten - das sollte manuell erfolgen
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
