// =============================================================================
// Erzeugt llms.txt / llms-full.txt (https://llmstxt.org) für alle Portfolios
// aus den zentralen Daten. Genutzt von:
//   - src/pages/llms.txt.js + llms-full.txt.js  (Haupt-Portfolio, beim Build)
//   - scripts/sync-projects.mjs                 (schreibt in die anderen Repos)
// =============================================================================
import { projects } from "./projectData.js";
import { SITE_URL, person, business, serviceArea, faq } from "./seo.js";

// Alle Portfolio-Varianten: key = portfolioConfig-Wert
export const SITES = {
  v1: { url: SITE_URL, label: "Haupt-Portfolio (v1)" },
  v2: { url: "https://portfolio2.colinblome.dev", label: "Portfolio v2" },
  v3: { url: "https://portfolio3.colinblome.dev", label: "Portfolio v3" },
  terminal: { url: "https://portfolio4.colinblome.dev", label: "Portfolio v4 (Terminal)" },
  b2b: { url: "https://b2b.colinblome.dev", label: "B2B-Portfolio" },
};

const clean = (t) => t.replace(/\s*\(Aktuell\)$/, "");
const work = () => projects.filter((p) => p.category !== "Portfolio");

function header(siteKey) {
  const site = SITES[siteKey];
  const lines = [
    `# ${person.name} – ${business.name}`,
    "",
    `> ${business.description}`,
    "",
  ];
  if (siteKey !== "v1") {
    lines.push(
      `Diese Seite (${site.url}) ist eine Design-Variante des Portfolios von ${person.name}. ` +
        `Haupt-Website mit allen aktuellen Informationen: ${SITE_URL}/`,
      ""
    );
  }
  lines.push(
    "## Kontakt",
    "",
    `- Website: ${SITE_URL}/`,
    `- E-Mail: ${person.email}`,
    `- Telefon: ${person.telephone}`,
    `- Standort: ${business.locality} (${business.postalCode}), ${business.region}, Deutschland`,
    ...person.sameAs.map((u) => `- ${u.includes("github") ? "GitHub" : "LinkedIn"}: ${u}`),
    `- Google-Unternehmensprofil: ${business.googleProfile}`,
    "",
    "## Leistungen",
    "",
    ...business.services.map((s) => `- ${s}`),
    "",
    "## Servicegebiet",
    "",
    ...serviceArea.map(([p, n]) => `- ${p}: ${n}`),
    ""
  );
  return lines;
}

const footer = (siteKey) => [
  "## Portfolio-Varianten",
  "",
  ...Object.entries(SITES).map(([k, s]) => `- [${s.label}](${s.url}/)${k === siteKey ? " – diese Seite" : ""}`),
  "",
  "## Optional",
  "",
  `- [Ausführliche Fassung mit Projektbeschreibungen und FAQ](${SITES[siteKey].url}/llms-full.txt)`,
  `- [Impressum](${SITES[siteKey].url}/impressum/)`,
  `- [Datenschutz](${SITES[siteKey].url}/datenschutz/)`,
  "",
];

export function buildLlmsTxt(siteKey = "v1") {
  return [
    ...header(siteKey),
    "## Projekte",
    "",
    ...work().map((p) => `- [${clean(p.title)}](${p.website}): ${p.description}`),
    "",
    ...footer(siteKey),
  ].join("\n");
}

export function buildLlmsFullTxt(siteKey = "v1") {
  return [
    ...header(siteKey),
    "## Projekte",
    "",
    ...work().flatMap((p) => [
      `### ${clean(p.title)}`,
      "",
      `- Website: ${p.website}`,
      `- Kategorie: ${p.category}`,
      `- Technologien: ${p.technologies.join(", ")}`,
      "",
      p.modalDescriptionDe,
      "",
    ]),
    "## Häufige Fragen",
    "",
    ...faq.flatMap(({ q, a }) => [`### ${q}`, "", a, ""]),
    ...footer(siteKey),
  ].join("\n");
}
