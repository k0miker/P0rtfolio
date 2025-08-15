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

export const projects = [
  {
    id: "1",
    title: "Bonsai World",
    description: 
       "A website for bonsai enthusiasts with modern design and user-friendly navigation.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "p1",
    modalDescriptionDe: "Mein erstes reines HTML/CSS-Projekt ohne Baukasten oder Frameworks. Im Rahmen des DCI Kurses entstanden, konnte ich hierbei meine Leidenschaft für die Bonsai-Kunst zum Ausdruck bringen. Das Projekt hat mir geholfen, grundlegende Webentwicklungsprinzipien zu verstehen und meine Coding-Fähigkeiten zu verbessern.",
    modalDescriptionEn: "My first pure HTML/CSS project without any builders or frameworks. Created during the DCI course, I was able to express my passion for the art of bonsai. This project helped me understand basic web development principles and improve my coding skills.",
    website: "https://bonsaiworld.netlify.app/",
    github: "https://github.com/k0miker/bonsaiworld",
    iframe: true,
    iframeUrl: "https://bonsaiworld.netlify.app/",
    badges: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "2",
    title: "Firma Blome",
    description: "A small web project for our family business at the time, created with WIX without significant prior knowledge.",
    image: "p2",
    technologies: ["HTML", "CSS"],
    modalDescriptionDe: "Eine uralte Website, auf die ich nicht ganz so stolz bin, da sie mit Wix erstellt wurde. Es war mein erster Versuch, eine Website für das Familienunternehmen zu erstellen, ohne wirkliche Vorkenntnisse im Web-Design. Trotz der Einschränkungen von Wix hat es mir grundlegende Konzepte der Website-Gestaltung vermittelt und meinen Weg in die Webentwicklung eingeleitet.",
    modalDescriptionEn: "An old website that I'm not particularly proud of as it was created with Wix. It was my first attempt to create a website for the family business without any real prior knowledge in web design. Despite Wix's limitations, it taught me basic concepts of website design and initiated my path into web development.",
    website: "https://k0mikerhdf.wixsite.com/blome",
    github: null,
    iframe: false,
    category: "Business",
    badges: ["Wixx", "Business"]
  },
  {
    id: "4",
    title: "Marketing Campagne",
    description: "A small layout example for a marketing campagne refered to the Bonasiworld",
    image: "p4",
    technologies: ["Canva", "Design", "Marketing"],
    modalDescriptionDe: "Ein Marketing-Konzept, das ich für die Bonsaiworld-Webseite entwickelt habe. Hierbei konnte ich meine Design-Fähigkeiten erweitern und lernen, wie man eine kohärente Markenidentität über verschiedene Medien hinweg schafft. Das Projekt umfasste die Erstellung von visuellen Inhalten, Slogans und einer Strategie zur Zielgruppenansprache.",
    modalDescriptionEn: "A marketing concept I developed for the Bonsaiworld website. This allowed me to expand my design skills and learn how to create a coherent brand identity across different media. The project included creating visual content, slogans, and a strategy for target audience engagement.",
    website: "https://www.canva.com/design/DAGBc48w39w/bc-CJ_qwSN3KxtlTtbQlmg/view?utm_content=DAGBc48w39w&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    github: "https://github.com/k0miker/",
    iframe: false,
    category: "Marketing",
    badges: ["Design", "Marketing", "Canva"]
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
    badges: ["Astro", "Typo3","Business"]
  },
  {
    id: "7",
    title: "Starfield canvas",
    description: "A small canvas excurse witch let to this",
    image: "p7",
    technologies: ["Canvas", "Animation"],
    modalDescriptionDe: "Eine faszinierende Erkundung der Canvas-API, die zu dieser hypnotisierenden Animation führte. Nutze die Tasten W und S, um zu beschleunigen und zu verlangsamen, und drücke Num+, um die Anzahl der Sterne zu erhöhen. Dieses Projekt war ein wichtiger Schritt beim Erlernen von Echtzeit-Animationen und interaktiven Elementen und hat mein Verständnis für die leistungsfähigen grafischen Fähigkeiten moderner Browser vertieft.",
    modalDescriptionEn: "A fascinating exploration of the Canvas API, which led to this hypnotic animation. Use the W and S keys to accelerate and decelerate, and press Num+ to increase the number of stars. This project was an important step in learning real-time animations and interactive elements and deepened my understanding of the powerful graphical capabilities of modern browsers.",
    website: "https://starfield-cb.netlify.app/",
    github: "https://github.com/k0miker/",
    codepen: "https://codepen.io/k0miker/pen/wvLoevE",
    iframe: false,
    category: "Animation",
    badges: ["Canvas"]
  },
  {
    id: "8",
    title: "Starfieldclash",
    description: "A small canvas excurse witch let to this Game",
    image: "p8",
    technologies: ["Canvas", "Game", "Animation"],
    modalDescriptionDe: "Ein interaktives Spiel, das auf meinen Erfahrungen mit dem Starfield-Canvas-Projekt aufbaut. Diese Weiterentwicklung integriert Spielmechaniken, Kollisionserkennung und Punktesysteme. Die Herausforderung bestand darin, eine reibungslose Spielerfahrung zu schaffen und gleichzeitig die visuellen Effekte des ursprünglichen Projekts zu erhalten. Die Arbeit an diesem Projekt hat meine JavaScript-Kenntnisse erheblich verbessert und mir ein tiefes Verständnis für Spieleentwicklung im Browser vermittelt.",
    modalDescriptionEn: "An interactive game built on my experiences with the Starfield Canvas project. This evolution integrates game mechanics, collision detection, and scoring systems. The challenge was to create a smooth gaming experience while maintaining the visual effects of the original project. Working on this project significantly improved my JavaScript skills and gave me a deep understanding of game development in the browser.",
    website: "https://k0miker.github.io/starfieldclash/",
    github: "https://github.com/k0miker/starfieldclash",
    iframe: false,
    category: "Game",
    badges: ["Canvas", "Game"]
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
    badges: ["Canvas", "Game", "kollision detection", "AI"]
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
    badges: ["React", "Three.js","Data Visualization","3D","WebGL",]
  },
  {
    id: "11",
    title: "BrokeChain",
    description: "My first React Narive Project in typescript. A small trading demo app for crypto currencies.",
    image: "p11",
    technologies: ["React Native", "TypeScript", "Mobile App", "Crypto", "AI"],
    modalDescriptionDe: "Mein erstes React Native-Projekt, entwickelt in TypeScript. BrokeChain ist eine Demo-App für Kryptowährungshandel, die Echtzeit-Daten von Krypto-APIs abruft und visualisiert. Die Entwicklung dieser App forderte mich heraus, die Konzepte von React auf die mobile Entwicklung zu übertragen und dabei die Vorteile von TypeScript zu nutzen. Das Projekt umfasst komplexe Funktionalitäten wie Benutzerauthentifizierung, Daten-Caching und responsive Layouts für verschiedene Gerätetypen. Die Arbeit an BrokeChain hat meine Fähigkeiten in der mobilen App-Entwicklung erheblich erweitert.",
    modalDescriptionEn: "My first React Native project, developed in TypeScript. BrokeChain is a demo app for cryptocurrency trading that fetches and visualizes real-time data from crypto APIs. Developing this app challenged me to apply React concepts to mobile development while leveraging the advantages of TypeScript. The project includes complex functionalities such as user authentication, data caching, and responsive layouts for different device types. Working on BrokeChain has significantly expanded my skills in mobile app development.",
    website: "https://broke.dev-space.vip",
    github: "https://github.com/k0miker/brokechain",
    iframeUrl: "https://broke.dev-space.vip",
    responsiveIframe: true,
    category: "Finance",
    badges: ["React Native", "TypeScript", "Mobile App", "Crypto", "AI"]
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
    badges: ["Astro", "Restaurant", "Business", "Responsive Design"]
  },
  {
    id: "12",
    title: "Pizzeria La Bellezza",
    description: "Professionelle Restaurant-Website mit eleganter Präsentation und Bestell-Funktionalität",
    image: "p12",
    technologies: ["Astro", "CSS", "JavaScript", "Business"],
    modalDescriptionDe: "Eine professionelle Website für die Pizzeria La Bellezza, die italienische Gastfreundschaft und Kochkunst in den Mittelpunkt stellt. Die Seite bietet eine umfassende Präsentation des Restaurants mit detaillierter Speisekarte, Informationen über die Geschichte und Philosophie des Hauses sowie moderne Funktionalitäten für Reservierungen und Bestellungen. Das elegante Design spiegelt die Qualität und Tradition der italienischen Küche wider und schafft eine einladende Online-Präsenz.",
    modalDescriptionEn: "A professional website for Pizzeria La Bellezza, highlighting Italian hospitality and culinary arts. The site offers a comprehensive presentation of the restaurant with a detailed menu, information about the history and philosophy of the establishment, and modern functionalities for reservations and orders. The elegant design reflects the quality and tradition of Italian cuisine and creates an inviting online presence.",
    website: "https://www.pizzeria-la-bellezza.de",
    github: "https://github.com/k0miker/pizzeria-la-bellezza",
    iframe: true,
    iframeUrl: "https://www.pizzeria-la-bellezza.de",
    category: "Restaurant",
    badges: ["Astro", "Restaurant", "Business", "Professional"]
  }
];
