document.addEventListener('DOMContentLoaded', () => {
  // Batteriespar-Modus ist immer aktiv - zeige alle Elemente sofort
  document.querySelectorAll('.background-image').forEach(img => {
    img.style.opacity = '1';
  });
});
