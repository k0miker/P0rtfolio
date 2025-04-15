document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.querySelector('#projects'); // Angenommen, die Karten sind in #projects

  // Tilt-Effekt für Desktop
  if (window.matchMedia('(min-width: 768px)').matches && projectsContainer) {
    projectsContainer.addEventListener('mousemove', e => {
      const card = e.target.closest('.box'); // Finde die nächste .box
      if (!card) return; // Nicht über einer Karte

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (centerY - y) / 10;
      const tiltY = (x - centerX) / 10;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    projectsContainer.addEventListener('mouseout', e => {
      const card = e.target.closest('.box');
      if (card) {
         // Prüfen, ob die Maus wirklich den Container verlassen hat, nicht nur eine Karte
         if (!projectsContainer.contains(e.relatedTarget)) {
            // Alle Karten zurücksetzen (oder nur die spezifische, wenn nötig)
            projectsContainer.querySelectorAll('.box').forEach(c => c.style.transform = '');
         } else if (e.relatedTarget && !card.contains(e.relatedTarget)) {
             // Maus hat die Karte verlassen, aber ist noch im Container
             card.style.transform = '';
         }
      }
    });
  }
});
