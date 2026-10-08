// Die geteilten Projektdaten (projectData.js, gesynct für alle Portfolios) verweisen
// absolut auf /projects/… – v1 läuft aber unter /v1/. Base voranstellen, damit die
// Bilder auch im Dev-Server laden (live liegt dieselbe Kopie unter /v1/projects/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const withBase = (url) =>
  url && url.startsWith("/") && !url.startsWith(`${BASE}/`) ? `${BASE}${url}` : url;
