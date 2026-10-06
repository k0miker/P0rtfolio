// =============================================================================
// Zentrale Fakten für SEO/GEO des Haupt-Portfolios.
// Daraus entstehen: sichtbare Region-&-FAQ-Sektion, JSON-LD und llms.txt.
// Regel: Was im JSON-LD steht, muss auch sichtbar auf der Seite stehen.
// =============================================================================
import { projects } from "./projectData.js";

export const SITE_URL = "https://colinblome.dev";

// Feste IDs, damit alle Portfolios auf dieselbe Person/Firma verweisen
export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

export const person = {
  name: "Colin Blome",
  jobTitle: "Webentwickler",
  email: "info@colinblome.dev",
  telephone: "+49 173 6098320",
  sameAs: [
    "https://github.com/k0miker",
    "https://www.linkedin.com/in/k0miker",
  ],
};

export const business = {
  name: "CB-Webdevelopment",
  alternateName: ["CB-WebDev", "CB-Webdevelopment – Webentwicklung Fürstenau"],
  description:
    "Freiberufliche Webentwicklung aus Fürstenau: moderne, schnelle Websites und Webanwendungen für kleine und mittlere Unternehmen in der Samtgemeinde Bersenbrück und im Landkreis Osnabrück.",
  locality: "Fürstenau",
  postalCode: "49584",
  region: "Niedersachsen",
  country: "DE",
  geo: { latitude: 52.5167, longitude: 7.6667 },
  googleProfile: "https://g.page/cb-webdev",
  services: [
    "Websites für Unternehmen",
    "Webanwendungen",
    "Online-Shops",
    "Responsive Webdesign",
    "Lokale Suchmaschinenoptimierung",
    "Website-Wartung und Betreuung",
  ],
};

// Servicegebiet: [Ort, Hinweis]
export const serviceArea = [
  ["Fürstenau", "Standort – persönliche Beratung vor Ort"],
  ["Samtgemeinde Bersenbrück", "Bersenbrück, Alfhausen, Ankum, Eggermühlen, Kettenkamp, Rieste"],
  ["Landkreis Osnabrück", "Termine vor Ort nach Absprache"],
  ["Deutschlandweit", "Zusammenarbeit per Telefon und Videocall"],
];

export const faq = [
  {
    q: "Was ist in einer Website von CB-Webdevelopment enthalten?",
    a: "Responsive Design für alle Endgeräte, eine SEO-Grundausstattung, SSL-Verschlüsselung und eine schnelle, moderne Technik. Wartung und Inhaltspflege sind auf Wunsch möglich.",
  },
  {
    q: "Wie lange dauert die Umsetzung einer Website?",
    a: "Eine typische Unternehmenswebsite ist in zwei bis vier Wochen online – abhängig vom Umfang und davon, wie schnell Texte und Bilder vorliegen.",
  },
  {
    q: "Was kostet eine Website?",
    a: "Der Preis hängt vom Umfang ab. Nach einem unverbindlichen Erstgespräch erhalten Sie ein individuelles Angebot.",
  },
  {
    q: "Gibt es persönliche Betreuung vor Ort?",
    a: "Ja. In Fürstenau, der Samtgemeinde Bersenbrück und im Landkreis Osnabrück sind Termine vor Ort möglich, überregional läuft die Zusammenarbeit per Telefon und Videocall.",
  },
  {
    q: "Hilft CB-Webdevelopment auch bei der lokalen Auffindbarkeit?",
    a: "Ja. Dazu gehören saubere Seitenstruktur, strukturierte Daten, lokale Suchbegriffe und die Einrichtung bzw. Pflege des Google-Unternehmensprofils.",
  },
];

// JSON-LD-Graph für die Startseite
export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: business.name,
        inLanguage: "de-DE",
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: person.name,
        jobTitle: person.jobTitle,
        email: person.email,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/logo.png`,
        sameAs: person.sameAs,
        worksFor: { "@id": BUSINESS_ID },
        knowsAbout: ["Webentwicklung", "Webdesign", "Astro", "React", "TypeScript", "Lokale SEO"],
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: business.name,
        alternateName: business.alternateName,
        description: business.description,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/logo.png`,
        email: person.email,
        telephone: person.telephone,
        founder: { "@id": PERSON_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: business.locality,
          postalCode: business.postalCode,
          addressRegion: business.region,
          addressCountry: business.country,
        },
        geo: { "@type": "GeoCoordinates", ...business.geo },
        areaServed: [
          { "@type": "City", name: "Fürstenau" },
          { "@type": "City", name: "Bersenbrück" },
          { "@type": "City", name: "Ankum" },
          { "@type": "AdministrativeArea", name: "Samtgemeinde Bersenbrück" },
          { "@type": "AdministrativeArea", name: "Landkreis Osnabrück" },
          { "@type": "Country", name: "Deutschland" },
        ],
        knowsAbout: business.services,
        sameAs: [business.googleProfile, ...person.sameAs],
      },
      // Referenzen: live geschaltete Kunden-Websites (keine Demos auf *.netlify.app),
      // die auf der Seite als Projekte zu sehen sind
      ...projects
        .filter((p) => ["Business", "Restaurant"].includes(p.category) && p.website && !p.website.includes(".netlify.app"))
        .map((p) => ({
          "@type": "WebSite",
          "@id": `${SITE_URL}/#projekt-${p.id}`,
          name: p.title,
          url: p.website,
          description: p.description,
          creator: { "@id": BUSINESS_ID },
        })),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

// Schlanker Graph für Unterseiten (Impressum, Datenschutz)
export function pageGraph({ url, name }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": BUSINESS_ID },
  };
}
