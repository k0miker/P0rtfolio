// =============================================================================
// Erzeugt llms.txt / llms-full.txt (https://llmstxt.org) für alle Portfolios
// aus den zentralen Daten. Genutzt von:
//   - src/pages/llms.txt.js + llms-full.txt.js  (Haupt-Portfolio, beim Build)
//   - scripts/sync-projects.mjs                 (schreibt in die anderen Repos)
// =============================================================================
import { projects } from "./projectData.js";
import { SITE_URL, person, business, serviceArea, faq } from "./seo.js";

// Alle Portfolio-Varianten: key = portfolioConfig-Wert, url ohne Schrägstrich am Ende
export const SITES = {
  v5: { url: SITE_URL, label: "Haupt-Portfolio (v5, Modernist)" },
  v1: { url: `${SITE_URL}/v1`, label: "Portfolio v1 (Classic)" },
  v2: { url: `${SITE_URL}/v2`, label: "Portfolio v2" },
  v3: { url: `${SITE_URL}/v3`, label: "Portfolio v3" },
  terminal: { url: `${SITE_URL}/v4`, label: "Portfolio v4 (Terminal)" },
  b2b: { url: `${SITE_URL}/b2b`, label: "B2B-Portfolio" },
};
// Diese Version liegt im Webroot und ist die Seite, die in der Suche erscheinen soll
export const MAIN_SITE = "v5";

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
  if (siteKey !== MAIN_SITE) {
    lines.push(
      `Diese Seite (${site.url}/) ist eine Design-Variante des Portfolios von ${person.name}. ` +
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
