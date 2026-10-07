// Sektionen der Startseite in Seitenreihenfolge.
// Einzige Quelle für Nav, Seitenleiste (ScrollProgress) und Scroll-Spy.
// `id` = Element, das als Sektion erkannt wird; `href` = Sprungziel.
// Startseite = BASE_URL (/v1/), die Seite läuft als Unterordner.
const home = import.meta.env.BASE_URL;

export const navSections = [
  { id: "home", label: "Start", href: `${home}#home` },
  { id: "about", label: "Über mich", href: `${home}#about` },
  { id: "skills", label: "Skills", href: `${home}#skills` },
  { id: "projects", label: "Projekte", href: `${home}#projects` },
  { id: "region", label: "FAQ", href: `${home}#faq` },
  { id: "contact", label: "Kontakt", href: `${home}#contact` },
];
