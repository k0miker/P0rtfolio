// Main script file for global interactions

document.addEventListener("DOMContentLoaded", () => {
  // --- Dark Mode Logic ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  
  if (darkModeToggle) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    
    function updateIcon(isDarkMode) {
      if (!darkModeToggle) return;
      darkModeToggle.innerHTML = '';
      const icon = document.createElement('i');
      if (isDarkMode) {
        icon.className = 'fa-solid fa-sun';
        icon.setAttribute('title', 'Light Mode aktivieren');
      } else {
        icon.className = 'fa-solid fa-moon';
        icon.setAttribute('title', 'Dark Mode aktivieren');
      }
      darkModeToggle.appendChild(icon);
    }

    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
      document.documentElement.classList.add("dark-mode"); 
      updateIcon(true);
    } else {
      document.documentElement.classList.remove("dark-mode");
      updateIcon(false);
    }
    
    darkModeToggle.addEventListener("click", () => {
      const isDarkMode = document.documentElement.classList.toggle("dark-mode"); 
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      updateIcon(isDarkMode);
    });
  }

  // --- Intersection Observer for Navigation ---
  const sections = document.querySelectorAll("div[id]");
  const navLinks = document.querySelectorAll("nav a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.1, 
      rootMargin: "0px 0px -60% 0px", 
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // --- General Animation Observer ---
  const observerOptions = {
    rootMargin: "50px",
    threshold: 0.1,
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("in-view")) {
        entry.target.classList.add("in-view");
        if (entry.target.hasAttribute("data-stagger-children")) {
          const children = entry.target.querySelectorAll(".stagger-item");
          children.forEach((child, index) => {
            const isMobile = window.innerWidth < 768;
            const delay = isMobile ? index * 0.05 : index * 0.1;
            child.style.transitionDelay = `${delay}s`;
          });
        }
      } else if (!entry.isIntersecting && entry.target.classList.contains("in-view")) {
        if (window.innerWidth >= 768) {
          entry.target.classList.remove("in-view");
        }
      }
    });
  }, observerOptions);
  
  const animatables = [
    ...document.querySelectorAll(".offscreen"),
    ...document.querySelectorAll(".animate-on-scroll")
  ].filter(el => el !== null);
  
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasDeviceMemory = 'deviceMemory' in navigator;
  const isMobileWithLowMemory = window.innerWidth < 768 && hasDeviceMemory && navigator.deviceMemory < 4;
  
  if (!prefersReducedMotion && !isMobileWithLowMemory) {
    animatables.forEach(element => {
      animationObserver.observe(element);
    });
  } else {
    animatables.forEach(element => {
      element.classList.add("in-view");
    });
  }

  // --- Performance Monitor Integration ---
  import('../utils/performanceMonitor.js').then(({ performanceMonitor }) => {
    performanceMonitor.start();
    
    const performanceToggle = document.getElementById('performanceToggle');

    if (performanceToggle) { 
      function updatePerformanceIcon(isLowMode) {
        if (!performanceToggle) return;
        
        performanceToggle.innerHTML = ''; 
        const icon = document.createElement('i'); 
        
        if (isLowMode) {
          icon.className = 'fa-solid fa-gauge';
          icon.setAttribute('title', 'Performance-Modus deaktivieren (Animationen an)');
          icon.style.color = 'tomato';
        } else {
          icon.className = 'fa-solid fa-gauge-high';
          icon.setAttribute('title', 'Performance-Modus aktivieren (Animationen aus)');
          icon.style.color = 'var(--accent)';
        }
        performanceToggle.appendChild(icon);
      }

      // Initial state check
      const isLowMode = document.body.classList.contains('reduce-motion');
      updatePerformanceIcon(isLowMode);

      performanceToggle.addEventListener('click', () => {
        const newMode = performanceMonitor.togglePerformanceMode();
        updatePerformanceIcon(newMode);
      });
      
      // Listen for auto-updates
      performanceMonitor.addListener((isLowMode) => {
        updatePerformanceIcon(isLowMode);
      });
    }
  }).catch(err => console.error("Failed to load performance monitor", err));
});
