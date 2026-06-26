import p1 from "../assets/images/bonsaiworld.jpg";
import p2 from "../assets/images/blome.jpg";
import p5 from "../assets/images/p5.png";
import p7 from "../assets/images/p7.2.png";
import p8 from "../assets/images/p8.png";
import p9 from "../assets/images/p9.png";
import p10 from "../assets/images/p10-2.gif";
import p11 from "../assets/images/p11.gif";
import p12 from "../assets/images/p12.png";
import p13 from "../assets/images/p13.png";
import p14 from "../assets/images/p14.png";
import port1 from "../assets/images/portfolio1.png";
import port2 from "../assets/images/portfolio2.png";
import port3 from "../assets/images/portfolio3.png";
import p15 from "../assets/images/p15.png";
import p16 from "../assets/images/p16.png";
import p17 from "../assets/images/p17.png";

export const projects = [

  {
    id: "14",
    title: "Grumbach Entsorgung",
    description: "Professionelle Website für ein Entsorgungsunternehmen mit umfassenden Serviceinformationen",
    image: "p14",
    technologies: ["Astro", "CSS", "JavaScript", "Business"],
    modalDescriptionDe: "Eine professionelle Website für das Entsorgungsunternehmen Grumbach, die im Rahmen meiner Selbstständigkeit entwickelt wurde. Die Seite präsentiert das umfassende Dienstleistungsspektrum des Unternehmens, von Containerservice über Schrottentsorgung bis hin zu Abriss- und Erdarbeiten. Das klare, moderne Design vermittelt Professionalität und Zuverlässigkeit. Die Website bietet eine intuitive Navigation mit detaillierten Informationen zu allen Services, Kontaktmöglichkeiten und Standortinformationen. Vollständig responsiv und optimiert für alle Endgeräte.",
    modalDescriptionEn: "A professional website for the waste disposal company Grumbach, developed as part of my freelance work. The site presents the company's comprehensive range of services, from container services and scrap disposal to demolition and earthworks. The clear, modern design conveys professionalism and reliability. The website offers intuitive navigation with detailed information about all services, contact options, and location information. Fully responsive and optimized for all devices.",
    website: "https://www.altpapier.de/",
    github: null,
    iframe: true,
    iframeUrl: "https://www.altpapier.de/",
    category: "Business",
    tile: "wide",
    badges: ["Astro", "Business", "Responsive Design", "Freelance"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "20",
    title: "ConnectAI – KI für Myfactory ERP",
    description: "KI-Agenten direkt im Myfactory-ERP: Geschäftsprozesse automatisieren ohne Systemwechsel.",
    image: "p17",
    technologies: ["HTML", "CSS", "JavaScript", "AI", "ERP", "Business"],
    modalDescriptionDe: "ConnectAI ist eine KI-Integration für das Myfactory-ERP-System – ein Produkt der NETFACTORY GmbH. Statt das gewohnte ERP zu wechseln, bringen KI-Agenten Automatisierung direkt dorthin, wo die Daten liegen: automatische Angebotserstellung aus E-Mails, Adressprüfung, Chat-basierte Datenabfragen und Reporting, Sprachsteuerung sowie Marketing-Automation. Die Lösung ist DSGVO-konform (EU-Hosting bzw. eigene Infrastruktur möglich), in einem Tag einsatzbereit und reduziert manuelle Aufwände um bis zu 80 %. Im Hintergrund kommen je nach Anwendungsfall führende KI-Modelle wie OpenAI (GPT-5) oder Anthropic (Claude) zum Einsatz. Zielgruppe sind mittelständische Unternehmen aus Handel, Industrie und Abfallwirtschaft.",
    modalDescriptionEn: "ConnectAI is an AI integration for the Myfactory ERP system – a product by NETFACTORY GmbH. Instead of switching the familiar ERP, AI agents bring automation right where the data already lives: automatic quote generation from emails, address validation, chat-based data queries and reporting, voice control, and marketing automation. The solution is GDPR-compliant (EU hosting or your own infrastructure possible), ready to use in a single day, and cuts manual effort by up to 80%. Under the hood it leverages leading AI models such as OpenAI (GPT-5) or Anthropic (Claude) depending on the use case. The target audience is mid-sized companies in trade, industry, and the waste-management sector.",
    website: "https://www.connectai-erp.de/",
    github: null,
    iframe: true,
    iframeUrl: "https://www.connectai-erp.de/",
    category: "AI",
    tile: "wide",
    badges: ["AI", "ERP", "HTML", "CSS", "JavaScript", "Automation"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "5",
    title: "Industrieboden Meyer",
    description: "A webproject i have translated from Typo3 into an Astro Project",
    image: "p5",
    technologies: ["Astro", "Typo3", "javascript"],
    modalDescriptionDe: "Ein anspruchsvolles Projekt, bei dem ich eine bestehende Typo3-Website in ein modernes Astro-Framework übersetzt habe. Diese Transformation verbesserte signifikant die Performance und Wartbarkeit der Seite. Ich bin seitdem für die kontinuierliche Wartung und Aktualisierung der Website verantwortlich. Das Projekt hat mir tiefe Einblicke in Content-Management-Systeme und moderne Web-Frameworks vermittelt.",
    modalDescriptionEn: "A challenging project where I translated an existing Typo3 website into a modern Astro framework. This transformation significantly improved the performance and maintainability of the site. I have since been responsible for the continuous maintenance and updating of the website. The project gave me deep insights into content management systems and modern web frameworks.",
    website: "https://www.industriebodenplanung.com/",
    github: "https://github.com/k0miker/",
    iframe: false,
    category: "Business",
    badges: ["Astro", "Typo3","Business"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "13",
    title: "Bella Ciao Bistro",
    description: "Authentische italienische Restaurant-Website mit moderner Gestaltung und Online-Speisekarte",
    image: "p13",
    technologies: ["Astro", "CSS", "JavaScript", "Responsive Design"],
    modalDescriptionDe: "Eine moderne Website für das italienische Bistro Bella Ciao in Fürstenau. Die Seite präsentiert authentische italienische Küche mit einer interaktiven Speisekarte, die neapolitanische Panini und romanische Pinsa hervorhebt. Das Design vermittelt das warme, familiäre Ambiente einer italienischen Trattoria und bietet eine benutzerfreundliche Navigation für Gäste, die sich über das Angebot informieren oder Kontakt aufnehmen möchten. Die Website ist vollständig responsiv und optimiert für alle Geräte.",
    modalDescriptionEn: "A modern website for the Italian bistro Bella Ciao in Fürstenau. The site presents authentic Italian cuisine with an interactive menu featuring Neapolitan panini and Roman pinsa. The design conveys the warm, family atmosphere of an Italian trattoria and offers user-friendly navigation for guests who want to learn about the offerings or get in touch. The website is fully responsive and optimized for all devices.",
    website: "https://bella-ciao-fuerstenau.netlify.app/",
    github: "https://github.com/k0miker/bella-ciao-bistro",
    iframe: true,
    iframeUrl: "https://bella-ciao-fuerstenau.netlify.app/",
    category: "Restaurant",
    badges: ["Astro", "Restaurant", "Business", "Responsive Design"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "12",
    title: "Pizzeria La Bellezza",
    description: "Professionelle Restaurant-Website mit eleganter Präsentation",
    image: "p12",
    technologies: ["Astro", "CSS", "JavaScript", "Business"],
    modalDescriptionDe: "Eine professionelle Website für die Pizzeria La Bellezza, die italienische Gastfreundschaft und Kochkunst in den Mittelpunkt stellt. Die Seite bietet eine umfassende Präsentation des Restaurants mit detaillierter Speisekarte, Informationen über die Geschichte und Philosophie des Hauses. Das elegante Design spiegelt die Qualität und Tradition der italienischen Küche wider und schafft eine einladende Online-Präsenz.",
    modalDescriptionEn: "A professional website for Pizzeria La Bellezza, highlighting Italian hospitality and culinary arts. The site offers a comprehensive presentation of the restaurant with a detailed menu, information about the history and philosophy of the establishment. The elegant design reflects the quality and tradition of Italian cuisine and creates an inviting online presence.",
    website: "https://www.pizzeria-la-bellezza.de",
    github: "https://github.com/k0miker/pizzeria-la-bellezza",
    iframe: true,
    iframeUrl: "https://www.pizzeria-la-bellezza.de",
    category: "Restaurant",
    badges: ["Astro", "Restaurant", "Business", "Responsive Design"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
 
  {
    id: "9",
    title: "Zombiland",
    description: "A canvas Game to become more comfortable with JavaScript",
    image: "p9",
    technologies: ["Canvas", "Game", "Animation", "javascript"],
    modalDescriptionDe: "Ein umfangreiches Canvas-Spiel, das ich entwickelt habe, um meine JavaScript-Fähigkeiten zu verbessern. Zombi-Island bietet komplexe Spielmechaniken, Feindverhalten mit KI-Elementen und mehrere Spielebenen. Die Entwicklung dieses Projekts erforderte ein tiefes Verständnis von Objekt-orientierter Programmierung, State-Management und Optimierungstechniken für flüssige Animationen. Dieses Projekt markiert einen wichtigen Meilenstein in meiner Entwicklung als JavaScript-Programmierer.",
    modalDescriptionEn: "An extensive Canvas game I developed to improve my JavaScript skills. Zombi-Island offers complex game mechanics, enemy behavior with AI elements, and multiple game levels. The development of this project required a deep understanding of object-oriented programming, state management, and optimization techniques for smooth animations. This project marks an important milestone in my development as a JavaScript programmer.",
    website: "https://zombi-island.netlify.app/",
    github: "https://github.com/k0miker/vampire",
    iframe: false,
    isVideo: true,
    videoSrc: "/zombi-island.mp4",
    category: "Game",
    badges: ["Canvas", "Game", "kollision detection", "AI"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "10",
    title: "DataGlobe",
    description: "My first React Project also trying three.js and big Data-Visualization",
    image: "p10",
    technologies: ["React", "Three.js", "Data Visualization", "WebGL"],
    modalDescriptionDe: "Mein erstes React-Projekt, das auch Three.js für 3D-Visualisierungen nutzt. DataGlobe ist eine interaktive Datenvisualisierungsanwendung, die globale Daten auf einem 3D-Globus darstellt. Dieses komplexe Projekt kombiniert moderne Frontend-Technologien mit Datenverarbeitung und 3D-Rendering. Die Entwicklung hat mir wertvolle Einblicke in die React-Architektur, State-Management und die Integration von 3D-Bibliotheken gegeben. Es stellt einen wichtigen Schritt in meiner Entwicklung als Frontend-Entwickler dar.",
    modalDescriptionEn: "My first React project, which also uses Three.js for 3D visualizations. DataGlobe is an interactive data visualization application that displays global data on a 3D globe. This complex project combines modern frontend technologies with data processing and 3D rendering. The development gave me valuable insights into React architecture, state management, and the integration of 3D libraries. It represents an important step in my development as a frontend developer.",
    website: "https://dataglobe.netlify.app/",
    github: "https://github.com/k0miker/project-dataglobe",
    iframe: true,
    iframeUrl: "https://dataglobe.netlify.app/",
    isVideo: true,
    videoSrc: "/globe30-collon-480.mov",
    category: "Data Visualization",
    tile: "large",
    badges: ["React", "Three.js","Data Visualization","3D","WebGL",],
        grid: ["2 x 2", "1 x 2", "1 x 1"]
  },
  {
    id: "11",
    title: "BrokeChain",
    description: "My first React Narive Project in typescript. A small trading demo app for crypto currencies.",
    image: "p11",
    technologies: ["React Native", "TypeScript", "Mobile App", "Crypto", "AI"],
    modalDescriptionDe: "Mein erstes React Native-Projekt, entwickelt in TypeScript. BrokeChain ist eine Demo-App für Kryptowährungshandel, die Echtzeit-Daten von Krypto-APIs abruft und visualisiert. Die Entwicklung dieser App forderte mich heraus, die Konzepte von React auf die mobile Entwicklung zu übertragen und dabei die Vorteile von TypeScript zu nutzen. Das Projekt umfasst komplexe Funktionalitäten wie Benutzerauthentifizierung, Daten-Caching und responsive Layouts für verschiedene Gerätetypen. Die Arbeit an BrokeChain hat meine Fähigkeiten in der mobilen App-Entwicklung erheblich erweitert.",
    modalDescriptionEn: "My first React Native project, developed in TypeScript. BrokeChain is a demo app for cryptocurrency trading that fetches and visualizes real-time data from crypto APIs. Developing this app challenged me to apply React concepts to mobile development while leveraging the advantages of TypeScript. The project includes complex functionalities such as user authentication, data caching, and responsive layouts for different device types. Working on BrokeChain has significantly expanded my skills in mobile app development.",
    website: "http://brokechain.cb-web.space/",
    github: "https://github.com/k0miker/brokechain",
    iframeUrl: "http://brokechain.cb-web.space/",
    responsiveIframe: true,
    category: "Finance",
    tile: "tall",
    badges: ["React Native", "TypeScript", "Mobile App", "Crypto", "AI"],
    grid: ["2 x 2", "1 x 2", "1 x 1", "2 x 1"]
  },
  {
    id: "18",
    title: "AI Podcast",
    description: "Eine Plattform für interaktive KI-Podcasts und Debatten.",
    image: "p15",
    technologies: ["AI", "Web", "Audio"],
    modalDescriptionDe: "Ein innovatives Projekt, das KI-Technologien nutzt, um dynamische Podcast-Debatten zu generieren. Fünf verschiedene KI-Charaktere streiten, analysieren und reflektieren über vielfältige Themen – moderiert, mit Audioausgabe und Quellenangaben. Benutzer können sofort und ohne Anmeldung zuhören oder mit einem Creator-Konto eigene Episoden erstellen.",
    modalDescriptionEn: "An innovative project that leverages AI technologies to generate dynamic podcast debates. Five different AI characters argue, analyze, and reflect on diverse topics – moderated, complete with audio output and source citations. Users can listen immediately without registration or create their own episodes with a Creator account.",
    website: "https://podcast.cb-web.space/",
    github: null,
    iframe: true,
    iframeUrl: "https://podcast.cb-web.space/",
    category: "AI",
    tile: "wide",
    badges: ["AI", "Podcast", "Audio"],
    grid: ["2 x 2", "1 x 2", "1 x 1", "2 x 1"]
  },
  {
    id: "15",
    title: "Portfolio v1 (Aktuell)",
    description: "Meine aktuelle Haupt-Portfolio-Website mit Fokus auf Performance und klarem Design.",
    image: "port1",
    technologies: ["Astro", "Tailwind", "JavaScript"],
    modalDescriptionDe: "Meine aktuelle Haupt-Portfolio-Website. Entwickelt mit Astro für maximale Performance und Tailwind CSS für ein modernes, responsives Design. Der Fokus liegt auf einer klaren Präsentation meiner Projekte und Fähigkeiten sowie einer schnellen Ladezeit.",
    modalDescriptionEn: "My current main portfolio website. Developed with Astro for maximum performance and Tailwind CSS for a modern, responsive design. The focus is on a clear presentation of my projects and skills as well as fast loading times.",
    website: "https://colinblome.dev",
    github: "https://github.com/k0miker/portfolio-v1",
    iframe: true,
    iframeUrl: "https://colinblome.dev",
    category: "Portfolio",
    badges: ["Astro", "Tailwind", "Portfolio"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
  {
    id: "16",
    title: "Portfolio v2",
    description: "Die zweite Version meines Portfolios, die verschiedene Design-Konzepte erforscht.",
    image: "port2",
    technologies: ["React", "CSS", "Animation"],
    modalDescriptionDe: "Die zweite Version meines Portfolios. Hier habe ich mit verschiedenen Design-Konzepten und Animationen experimentiert. Diese Version nutzt React und legt mehr Wert auf interaktive Elemente und visuelles Storytelling.",
    modalDescriptionEn: "The second version of my portfolio. Here I experimented with different design concepts and animations. This version uses React and places more emphasis on interactive elements and visual storytelling.",
    website: "https://portfolio2.colinblome.dev",
    github: "https://github.com/k0miker/portfolio-v2",
    iframe: true,
    iframeUrl: "https://portfolio2.colinblome.dev",
    category: "Portfolio",
    badges: ["React", "Portfolio", "Animation"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
  },
   {
    id: "17",
    title: "Portfolio v3",
    description: "Die dritte Iteration meines Portfolios mit Framer Motion und GSAP Animationen.",
    image: "port3",
    technologies: ["React", "Framer Motion", "GSAP", "Three.js"],
    modalDescriptionDe: "Die dritte Iteration meines Portfolios. Diese Version nutzt Framer Motion und GSAP für komplexe Animationen und Interaktionen. Ein Experimentierfeld für modernes Web-Design und Motion Graphics.",
    modalDescriptionEn: "The third iteration of my portfolio. This version uses Framer Motion and GSAP for complex animations and interactions. A testing ground for modern web design and motion graphics.",
    website: "https://portfolio3.colinblome.dev",
    github: "https://github.com/k0miker/portfolio-v3",
    iframe: true,
    iframeUrl: "https://portfolio3.colinblome.dev",
    category: "Portfolio",
    badges: ["React", "Astro", "Framer Motion", "GSAP", "Portfolio"],
    grid: ["2 x 2", "2 x 1", "1 x 1"]
    },
    {
      id: "19",
      title: "Portfolio B2B",
      description: "Eine seriöse Portfolio-Variante mit Fokus auf Business-Kommunikation und Vertrauen.",
      image: "p16",
      technologies: ["Astro", "Tailwind", "JavaScript", "Business"],
      modalDescriptionDe: "Eine zusätzliche Portfolio-Variante mit stärkerem B2B-Fokus. Ziel ist ein seriöser Auftritt für Geschäftskunden mit klarer Struktur, professioneller Tonalität und einer direkten Darstellung von Leistungen und Referenzen.",
      modalDescriptionEn: "An additional portfolio variant with a stronger B2B focus. The goal is a more professional presence for business clients with a clear structure, professional tone, and direct presentation of services and references.",
      website: "https://b2b.colinblome.dev/",
      github: null,
      iframe: true,
      iframeUrl: "https://b2b.colinblome.dev/",
      category: "Portfolio",
      badges: ["Astro", "Tailwind", "Business", "Portfolio", "B2B"],
      grid: ["2 x 2", "2 x 1", "1 x 1"]
  }
];
