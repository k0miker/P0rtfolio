// Simple state management für komplexeres UX
class PortfolioStore {
  #state = {
    activeFilter: 'all',
    projects: [],
    darkMode: false
  };
  
  #listeners = [];
  
  constructor() {
    // Lade anfängliche Theme-Präferenz
    this.#state.darkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    this.#notifyListeners();
  }
  
  subscribe(listener) {
    this.#listeners.push(listener);
    return () => this.#listeners = this.#listeners.filter(l => l !== listener);
  }
  
  #notifyListeners() {
    this.#listeners.forEach(listener => listener(this.#state));
  }
  
  toggleDarkMode() {
    this.#state.darkMode = !this.#state.darkMode;
    localStorage.setItem('theme', this.#state.darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-mode', this.#state.darkMode);
    this.#notifyListeners();
  }
  
  setFilter(filter) {
    this.#state.activeFilter = filter;
    this.#notifyListeners();
  }
  
  setProjects(projects) {
    this.#state.projects = projects;
    this.#notifyListeners();
  }
  
  getFilteredProjects() {
    if (this.#state.activeFilter === 'all') {
      return this.#state.projects;
    }
    return this.#state.projects.filter(p => p.tags.includes(this.#state.activeFilter));
  }
}

export const portfolioStore = new PortfolioStore();
