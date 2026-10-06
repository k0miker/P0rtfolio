// =============================================================================
// Nimmt für alle Projekte mit Website neue Screenshots auf:
//   - Desktop  (1440×900, doppelte Pixeldichte) → p.image          z. B. /projects/p14.webp
//   - Handy    (390×844,  doppelte Pixeldichte) → p.image + "-m"   z. B. /projects/p14-m.webp
// Die Projektkarten zeigen in hohen, schmalen Bento-Kacheln automatisch die
// Handy-Ansicht, sobald es die "-m"-Datei gibt (siehe src/components/ui/Card.astro).
//
//   npm run screenshots                     → alle Projekte, Desktop + Handy
//   npm run screenshots -- --only=14,23     → nur diese Projekt-IDs
//   npm run screenshots -- --mobile-only    → vorhandene Desktop-Bilder behalten
//
// Projekte mit `screenshot: false` in projectData.js werden übersprungen
// (z. B. wenn die Seite offline ist oder das Bild bewusst gestaltet wurde).
// Danach Bilder prüfen und mit `npm run sync:projects` verteilen.
// =============================================================================
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { projects } from "../src/data/projectData.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const mobileOnly = process.argv.includes("--mobile-only");

const VIEWS = [
  { suffix: "", viewport: { width: 1440, height: 900 }, width: 1600, isMobile: false },
  { suffix: "-m", viewport: { width: 390, height: 844 }, width: 780, isMobile: true },
].filter((v) => !mobileOnly || v.isMobile);

// Cookie-Banner wegklicken – erst "ablehnen"-artige Knöpfe, dann "zustimmen"-artige
const CONSENT_BUTTONS = [
  /^(alle )?ablehnen$/i, /nur (notwendige|essenzielle|erforderliche)/i, /^reject/i, /^decline/i,
  /^(alle )?akzeptieren$/i, /^zustimmen$/i, /^accept/i, /^verstanden$/i, /^ok$/i,
];

async function dismissConsent(page) {
  for (const pattern of CONSENT_BUTTONS) {
    const button = page.getByRole("button", { name: pattern }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      await page.waitForTimeout(600);
      break;
    }
  }
}

// Werbe-/Karriere-Popups schließen (Schließen-Knopf oder Escape)
const CLOSE_BUTTONS = /^(schließen|close|×|✕|x)$|popup schließen|dialog schließen/i;

async function dismissPopups(page) {
  for (let i = 0; i < 3; i++) {
    const button = page.getByRole("button", { name: CLOSE_BUTTONS }).first();
    if (!(await button.isVisible().catch(() => false))) break;
    await button.click().catch(() => {});
    await page.waitForTimeout(500);
  }
  await page.keyboard.press("Escape").catch(() => {});
}

// Lokal installiertes Chrome nutzen, sonst Playwrights eigenes Chromium
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find(existsSync);
const browser = await chromium.launch(chrome ? { executablePath: chrome } : {});
let failed = 0;

for (const p of projects) {
  if (!p.website || !p.image || p.screenshot === false) continue;
  if (only && !only.includes(p.id)) continue;

  for (const view of VIEWS) {
    const file = join(ROOT, "public", p.image.replace(/\.webp$/, `${view.suffix}.webp`));
    const context = await browser.newContext({
      viewport: view.viewport,
      deviceScaleFactor: 2,
      isMobile: view.isMobile,
      hasTouch: view.isMobile,
      locale: "de-DE",
      reducedMotion: "reduce", // Einblend-Animationen sofort fertig
    });
    const page = await context.newPage();
    try {
      await page.goto(p.website, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1500);
      // Mehrere Runden: manche Seiten zeigen den Cookie-Dialog erst nach einem anderen Popup
      for (let round = 0; round < 3; round++) {
        await dismissConsent(page);
        await dismissPopups(page);
        await page.waitForTimeout(800);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1200);
      const shot = await page.screenshot();
      await sharp(shot).resize({ width: view.width }).webp({ quality: 80 }).toFile(file);
      console.log(`✓ ${p.title}${view.isMobile ? " (Handy)" : ""} → public${p.image.replace(/\.webp$/, `${view.suffix}.webp`)}`);
    } catch (err) {
      failed++;
      console.warn(`✗ ${p.title}${view.isMobile ? " (Handy)" : ""}: ${err.message.split("\n")[0]}`);
    } finally {
      await context.close();
    }
  }
}

await browser.close();
if (failed) process.exitCode = 1;
