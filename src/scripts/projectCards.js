document.addEventListener('DOMContentLoaded', () => {
  // Batteriespar-Modus ist immer aktiv - keine Tilt-Effekte
  // Der Code bleibt hier erhalten für den Fall, dass der Modus in Zukunft deaktiviert wird
  
  // Für einen expliziten Test können wir auch überprüfen:
  const isBatterySaving = localStorage.getItem("battery-saving") !== "false"; // Default: true
  
  if (!isBatterySaving && window.matchMedia('(min-width: 768px)').matches) {
    // Dieser Code wird nicht ausgeführt, weil der Batteriespar-Modus immer aktiv ist
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const projectsContainer = document.querySelector('#projects');
      
      if (!projectsContainer) return;
      
      // Throttle-Funktion zur Reduzierung der Berechnungen
      let ticking = false;
      let lastMouseEvent = null;
      
      projectsContainer.addEventListener('mousemove', e => {
        lastMouseEvent = e;
        
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleMouseMove(lastMouseEvent);
            ticking = false;
          });
          
          ticking = true;
        }
      });
      
      // Separate Funktion für die Berechnung
      function handleMouseMove(e) {
        const card = e.target.closest('.box');
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reduzierte Tilt-Stärke (von /10 auf /15)
        const tiltX = (centerY - y) / 15;
        const tiltY = (x - centerX) / 15;
        
        // GPU-beschleunigte Transformation mit geringerem Skalierungsfaktor
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      
      // Optimiertes Reset-Event
      projectsContainer.addEventListener('mouseleave', () => {
        projectsContainer.querySelectorAll('.box').forEach(card => {
          card.style.transform = '';
        });
      });
      
      // Einzelkarten-Reset für bessere Performance
      projectsContainer.addEventListener('mouseout', e => {
        const card = e.target.closest('.box');
        if (card && !card.contains(e.relatedTarget)) {
          card.style.transform = '';
        }
      });
    }
  }
});
