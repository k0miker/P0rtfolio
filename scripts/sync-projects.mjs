// =============================================================================
// Verteilt die Projektdaten aus DIESEM Repo (Single Source of Truth) an die
// anderen Portfolios:
//   - src/data/projectData.js           (mit "nicht bearbeiten"-Hinweis)
//   - alle referenzierten Bilder         (p.image   -> public/...)
//   - referenzierte Videos               (p.videoSrc -> public/..., nur wenn das
//                                          Ziel-Portfolio videoSrc überhaupt nutzt)
//   - räumt nicht mehr referenzierte Dateien in public/projects/ auf
//   - public/llms.txt + llms-full.txt (aus src/data/llms.js, mit der URL des Ziels)
//     – auch fürs B2B-Portfolio, das sonst seine eigene Projektliste pflegt
// portfolioConfig.js bleibt pro Repo unangetastet.
//
//   npm run sync:projects          -> kopieren
//   npm run sync:projects -- --dry -> nur anzeigen, was sich ändern würde
// =============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projectData.js";
import { buildLlmsTxt, buildLlmsFullTxt, SITES } from "../src/data/llms.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TARGETS = ["../P0rtfolio2", "../portfolio3", "../Portfolio4"];
const DRY = process.argv.includes("--dry");

const SOURCE_DATA = join(ROOT, "src/data/projectData.js");
const COPY_NOTICE =
  "// ⚠ AUTOMATISCH KOPIERT aus dem Haupt-Portfolio (P0rtfolio) – hier NICHT bearbeiten!\n" +
  "// Änderungen dort in src/data/projectData.js machen und `npm run sync:projects` ausführen.\n";

const images = [...new Set(projects.map((p) => p.image).filter(Boolean))];
const videos = [...new Set(projects.map((p) => p.videoSrc).filter(Boolean))];

// Liest rekursiv alle Quelldateien (ohne projectData.js), um zu prüfen,
// ob ein Portfolio videoSrc verwendet.
function usesVideos(srcDir) {
  const stack = [srcDir];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) stack.push(full);
      else if (name !== "projectData.js" && /\.(astro|jsx?|tsx?)$/.test(name) && readFileSync(full, "utf8").includes("videoSrc")) {
        return true;
      }
    }
  }
  return false;
}

function syncFile(from, to, content) {
  const data = content ?? readFileSync(from);
  if (existsSync(to) && Buffer.compare(readFileSync(to), Buffer.from(data)) === 0) return false;
  if (!DRY) {
    mkdirSync(dirname(to), { recursive: true });
    content == null ? copyFileSync(from, to) : writeFileSync(to, content);
  }
  return true;
}

const dataContent = COPY_NOTICE + readFileSync(SOURCE_DATA, "utf8");
let missing = false;

for (const rel of TARGETS) {
  const target = resolve(ROOT, rel);
  if (!existsSync(join(target, "src/data"))) {
    console.warn(`✗ ${rel}: nicht gefunden – übersprungen`);
    continue;
  }

  const changed = [];
  if (syncFile(SOURCE_DATA, join(target, "src/data/projectData.js"), dataContent)) changed.push("src/data/projectData.js");

  const media = usesVideos(join(target, "src")) ? [...images, ...videos] : images;
  for (const url of media) {
    const from = join(ROOT, "public", url);
    if (!existsSync(from)) {
      console.warn(`  ! Datei fehlt im Haupt-Portfolio: public${url}`);
      missing = true;
      continue;
    }
    if (syncFile(from, join(target, "public", url))) changed.push(`public${url}`);
  }

  // llms.txt / llms-full.txt mit der eigenen URL des Ziel-Portfolios
  const siteKey = readFileSync(join(target, "src/data/portfolioConfig.js"), "utf8").match(/export default "([^"]+)"/)?.[1];
  if (SITES[siteKey]) {
    if (syncFile(null, join(target, "public/llms.txt"), buildLlmsTxt(siteKey))) changed.push("public/llms.txt");
    if (syncFile(null, join(target, "public/llms-full.txt"), buildLlmsFullTxt(siteKey))) changed.push("public/llms-full.txt");
  } else {
    console.warn(`  ! ${rel}: unbekannter portfolioConfig-Wert "${siteKey}" – llms.txt übersprungen`);
  }

  // public/projects/ gehört komplett der Projektliste: nicht mehr referenzierte
  // Dateien (z. B. alte .png nach Umstellung auf .webp) entfernen.
  const projDir = join(target, "public/projects");
  if (existsSync(projDir)) {
    for (const name of readdirSync(projDir)) {
      if (!images.includes(`/projects/${name}`)) {
        if (!DRY) rmSync(join(projDir, name));
        changed.push(`public/projects/${name} (entfernt)`);
      }
    }
  }

  console.log(
    changed.length
      ? `${DRY ? "~" : "✓"} ${rel}: ${changed.length} Datei(en) ${DRY ? "würden aktualisiert" : "aktualisiert"}\n    ${changed.join("\n    ")}`
      : `= ${rel}: schon aktuell`
  );
}

// Portfolios mit eigener (kuratierter) Projektliste bekommen nur llms.txt
const LLMS_ONLY = [["../Portfolio-B2B", "b2b"]];
for (const [rel, siteKey] of LLMS_ONLY) {
  const target = resolve(ROOT, rel);
  if (!existsSync(join(target, "public"))) {
    console.warn(`✗ ${rel}: nicht gefunden – übersprungen`);
    continue;
  }
  const changed = [];
  if (syncFile(null, join(target, "public/llms.txt"), buildLlmsTxt(siteKey))) changed.push("public/llms.txt");
  if (syncFile(null, join(target, "public/llms-full.txt"), buildLlmsFullTxt(siteKey))) changed.push("public/llms-full.txt");
  console.log(changed.length ? `${DRY ? "~" : "✓"} ${rel}: ${changed.join(", ")}` : `= ${rel}: schon aktuell`);
}

if (missing) process.exitCode = 1;
