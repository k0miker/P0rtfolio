/**
 * Einfacher Helper für Intersection Observer mit vernünftigen Defaults
 * @param {Element[]} elements - DOM Elements to observe
 * @param {Function} callback - Callback function for intersecting elements
 * @param {Object} options - IntersectionObserver options
 */
export function createIntersectionObserver(elements, callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };
  
  const observerOptions = {...defaultOptions, ...options};
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      callback(entry.target, entry.isIntersecting);
    });
  }, observerOptions);
  
  elements.forEach(el => observer.observe(el));
  
  return {
    disconnect: () => observer.disconnect(),
    unobserve: (element) => observer.unobserve(element)
  };
}
