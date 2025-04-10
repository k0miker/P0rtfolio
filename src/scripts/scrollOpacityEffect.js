document.addEventListener('DOMContentLoaded', () => {
  // Elemente, deren Opazität gesteuert werden soll
  const sections = [
    {
      id: 'iam',
      selector: '#iam .background-image',
      fadeDirection: 'out' // Ausblenden beim Scrollen
    },
    {
      id: 'skills',
      selector: '#skills .background-image',
      fadeDirection: 'in' // Einblenden beim Scrollen
    },
    {
      id: 'contact',
      selector: '#contact .background-image',
      fadeDirection: 'in' // Einblenden beim Scrollen
    }
  ];

  // Funktion zur Berechnung der Opazität basierend auf der Scroll-Position
  function calculateOpacity(element, fadeDirection) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Position des Elements relativ zum Viewport
    const distanceFromCenter = Math.abs((rect.top + rect.height / 2) - (windowHeight / 2));
    const maxDistance = windowHeight * 0.8; // 80% der Viewport-Höhe
    
    // Normalisierte Position (0 = in der Mitte, 1 = weit entfernt)
    let normalizedPosition = Math.min(distanceFromCenter / maxDistance, 1);
    
    // Opazität basierend auf der Richtung
    return fadeDirection === 'out' 
      ? 1 - normalizedPosition // Ausblenden (1 = voll sichtbar, 0 = unsichtbar)
      : normalizedPosition;    // Einblenden (0 = unsichtbar, 1 = voll sichtbar)
  }

  // Funktion zum Aktualisieren der Opazität aller Elemente
  function updateOpacity() {
    sections.forEach(section => {
      const element = document.querySelector(section.selector);
      if (element) {
        // Berechne die Opazität für jedes Element
        const opacity = calculateOpacity(element, section.fadeDirection);
        
        // Wende die Opazität mit einer Verzögerung (für flüssigeren Effekt) an
        requestAnimationFrame(() => {
          element.style.opacity = opacity;
        });
      }
    });
  }

  // Event-Listener für das Scroll-Event
  window.addEventListener('scroll', () => {
    // Throttle für bessere Performance
    if (!window.requestAnimationFrame) {
      setTimeout(updateOpacity, 300);
    } else {
      requestAnimationFrame(updateOpacity);
    }
  });

  // Initiale Aktualisierung
  updateOpacity();
});
