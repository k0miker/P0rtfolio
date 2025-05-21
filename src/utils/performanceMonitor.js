/**
 * Performance-Monitor für adaptive Animationen
 * Misst die FPS und passt Animationen entsprechend an
 */

class PerformanceMonitor {
  constructor(options = {}) {
    // Konfigurationsoptionen
    this.options = {
      targetFPS: 50,         // Ziel-FPS, unter der Optimierungen aktiviert werden
      lowFPS: 30,            // Grenze für niedrige FPS-Einstellung
      sampleSize: 10,        // Anzahl der Frames für den Durchschnitt
      checkInterval: 2000,   // Zeit zwischen Messungen in ms
      ...options
    };
    
    // Status-Variablen
    this.frames = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.averageFPS = 60;
    this.performanceMode = 'high'; // 'high', 'medium', 'low'
    this.callbacks = {
      onPerformanceModeChange: [],
      onFPSChange: []
    };
    
    // FPS-Messung starten
    this.start();
  }
  
  // Startet die FPS-Messung
  start() {
    // Zählt Frames für die FPS-Berechnung
    const countFrame = () => {
      this.frames++;
      requestAnimationFrame(countFrame);
    };
    
    // Timer für die regelmäßige Auswertung
    const checkFPS = () => {
      const now = performance.now();
      const elapsed = now - this.lastTime;
      const currentFPS = (this.frames * 1000) / elapsed;
      
      // FPS-Verlauf aktualisieren
      this.fpsHistory.push(currentFPS);
      if (this.fpsHistory.length > this.options.sampleSize) {
        this.fpsHistory.shift();
      }
      
      // Durchschnitt berechnen
      this.averageFPS = this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length;
      
      // FPS-Änderung mitteilen
      this.notifyFPSChange(this.averageFPS);
      
      // Performance-Modus basierend auf FPS bestimmen
      let newMode = 'high';
      
      if (this.averageFPS < this.options.lowFPS) {
        newMode = 'low';
      } else if (this.averageFPS < this.options.targetFPS) {
        newMode = 'medium';
      }
      
      // Wenn sich der Performance-Modus geändert hat, Callbacks auslösen
      if (newMode !== this.performanceMode) {
        this.performanceMode = newMode;
        this.notifyPerformanceModeChange(newMode, this.averageFPS);
        
        // In den lokalen Speicher schreiben für seitenübergreifende Konsistenz
        try {
          localStorage.setItem('performance-mode', newMode);
        } catch (e) {
          console.warn('Konnte Performance-Modus nicht im localStorage speichern:', e);
        }
      }
      
      // Zurücksetzen für den nächsten Check
      this.frames = 0;
      this.lastTime = now;
      
      // Nächste Prüfung planen
      setTimeout(checkFPS, this.options.checkInterval);
    };
    
    // Starten der Messungen
    requestAnimationFrame(countFrame);
    setTimeout(checkFPS, this.options.checkInterval);
    
    // Prüfen, ob ein gespeicherter Performance-Modus existiert
    try {
      const savedMode = localStorage.getItem('performance-mode');
      if (savedMode && ['high', 'medium', 'low'].includes(savedMode)) {
        this.performanceMode = savedMode;
        // Initial-Benachrichtigung mit gespeichertem Modus
        setTimeout(() => {
          this.notifyPerformanceModeChange(savedMode, this.averageFPS);
        }, 100);
      }
    } catch (e) {
      console.warn('Konnte gespeicherten Performance-Modus nicht abrufen:', e);
    }
  }
  
  // Registriert einen Callback für Änderungen des Performance-Modus
  onPerformanceModeChange(callback) {
    this.callbacks.onPerformanceModeChange.push(callback);
    
    // Sofort mit aktuellem Modus aufrufen
    callback(this.performanceMode, this.averageFPS);
    
    return this; // Für Verkettung
  }
  
  // Registrieren eines Callbacks für FPS-Änderungen
  onFPSChange(callback) {
    this.callbacks.onFPSChange.push(callback);
    callback(this.averageFPS);
    return this;
  }
  
  // Informiert alle Callbacks über Änderungen
  notifyPerformanceModeChange(mode, fps) {
    this.callbacks.onPerformanceModeChange.forEach(callback => {
      try {
        callback(mode, fps);
      } catch (e) {
        console.error('Fehler in Performance-Callback:', e);
      }
    });
  }
  
  // Informiert alle Callbacks über FPS-Änderungen
  notifyFPSChange(fps) {
    this.callbacks.onFPSChange.forEach(callback => {
      try {
        callback(fps);
      } catch (e) {
        console.error('Fehler in FPS-Callback:', e);
      }
    });
  }
  
  // Manuelles Setzen des Performance-Modus mit zusätzlichen Aktionen
  setPerformanceMode(mode) {
    if (['high', 'medium', 'low'].includes(mode)) {
      this.performanceMode = mode;
      
      try {
        // Im localStorage speichern
        localStorage.setItem('performance-mode', mode);
        
        // Am HTML-Element setzen für CSS-Selektoren
        document.documentElement.setAttribute('data-performance', mode);
        
        // Globale Einstellung für alle anderen Komponenten
        window.currentPerformanceMode = mode;
        
        // Je nach Modus Hintergründe aktivieren oder deaktivieren
        if (mode !== 'high') {
          this.disableAnimatedBackgrounds();
          
          if (mode === 'low') {
            // Im Low-Modus auch statische Bilder verwenden
            this.useStaticImages();
          }
        } else {
          // Im High-Modus explizit Hintergründe aktivieren
          this.enableAnimatedBackgrounds();
        }
      } catch (e) {
        console.warn('Konnte Performance-Modus nicht speichern oder anwenden:', e);
      }
      
      this.notifyPerformanceModeChange(mode, this.averageFPS);
      return true;
    }
    return false;
  }
  
  // Helper-Methode zum Deaktivieren aller animierten Hintergründe
  disableAnimatedBackgrounds() {
    // Alle Canvas-Hintergründe ausblenden
    document.querySelectorAll('[id$="-background"]').forEach(bg => {
      if (bg instanceof HTMLElement) {
        bg.style.display = 'none';
      }
    });
    
    // Animationsklassen von Sektionen entfernen
    document.querySelectorAll('section.animate').forEach(section => {
      section.classList.remove('animate');
    });
    
    // Contact-Sektion Hintergrund ändern
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.style.backgroundAttachment = 'scroll';
      contactSection.style.backgroundImage = 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))';
    }
  }
  
  // Helper-Methode zum Verwenden statischer Bilder
  useStaticImages() {
    // Alle Bilder mit alternativen statischen Versionen suchen
    document.querySelectorAll('img[data-alt-src]').forEach(img => {
      const altSrc = img.getAttribute('data-alt-src');
      if (altSrc) {
        // Original-Quelle speichern wenn noch nicht getan
        if (!img.getAttribute('data-original-src')) {
          img.setAttribute('data-original-src', img.src);
        }
        img.src = altSrc;
      }
    });
    
    // Speziell für Projekt p7
    document.querySelectorAll('img[src*="p7.gif"]').forEach(img => {
      // Pfad zu p7.2.png bestimmen
      const staticSrc = img.src.replace('p7.gif', 'p7.2.png');
      
      // Original-Quelle speichern wenn noch nicht getan
      if (!img.getAttribute('data-original-src')) {
        img.setAttribute('data-original-src', img.src);
      }
      
      // Statisches Bild setzen
      img.src = staticSrc;
    });
  }
  
  // Helper-Methode zum Aktivieren animierter Hintergründe
  enableAnimatedBackgrounds() {
    // Alle Canvas-Hintergründe einblenden
    document.querySelectorAll('[id$="-background"]').forEach(bg => {
      if (bg instanceof HTMLElement) {
        bg.style.display = 'block';
      }
    });
    
    // Canvas-Elemente reaktivieren
    document.querySelectorAll('canvas.performance-dependent').forEach(canvas => {
      if (canvas instanceof HTMLCanvasElement) {
        canvas.style.display = 'block';
      }
    });
    
    // Nur im High-Modus Hintergrund-Klasse vom root entfernen
    document.documentElement.classList.remove('disable-backgrounds');
  }
  
  // Helper-Methode zum Zurücksetzen auf animierte Hintergründe
  resetToAnimatedBackgrounds() {
    // Nur bedingt animierte Hintergründe wieder aktivieren
    // Dies sollte nur im höchsten Performance-Modus geschehen
    document.querySelectorAll('[id$="-background"]').forEach(bg => {
      if (bg instanceof HTMLElement) {
        bg.style.display = '';
      }
    });
    
    // Bilder zu original zurücksetzen
    document.querySelectorAll('img[data-original-src]').forEach(img => {
      img.src = img.getAttribute('data-original-src');
    });
  }
  
  // Aktuellen Performance-Modus abrufen
  getPerformanceMode() {
    return this.performanceMode;
  }
  
  // Aktuelle FPS abrufen
  getCurrentFPS() {
    return this.averageFPS;
  }
  
  // Hilfsfunktion: Prüft, ob die FPS unter einem bestimmten Wert liegen
  isFPSBelow(threshold) {
    return this.averageFPS < threshold;
  }
}

// Singleton-Instanz exportieren
export const performanceMonitor = new PerformanceMonitor();

// Export der Klasse für Testfälle oder individuelle Instanzen
export default PerformanceMonitor;
