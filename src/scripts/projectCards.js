document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.box');
  
  // Tilt-Effekt für Desktop
  if (window.matchMedia('(min-width: 768px)').matches) {
    projectCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (centerY - y) / 10;
        const tiltY = (x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
