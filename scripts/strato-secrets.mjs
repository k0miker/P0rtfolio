// =============================================================================
// Trägt die gemeinsamen STRATO-Zugangsdaten als GitHub-Secrets in ALLE Portfolio-
// Repos ein – damit sie nicht in jedem Repo einzeln gepflegt werden müssen.
// (GitHub kennt bei privaten Konten keine repo-übergreifenden Secrets, nur bei Organisationen.)
//
// Quelle: K:\Work\.strato-portfolios.env (liegt außerhalb aller Repos, wird nie committet)
//   SFTP_HOST=…   SFTP_USER=…   SFTP_PASSWORD=…   (optional SFTP_PORT=22)
//
//   npm run strato:secrets          → in allen Repos setzen (braucht `gh auth login`)
//   npm run strato:secrets -- --dry → nur anzeigen
// Nach einer Passwortänderung bei STRATO: Datei anpassen und einfach erneut ausführen.
// =============================================================================
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ENV_FILE = resolve(ROOT, "../.strato-portfolios.env");
const REPOS = [".", "../P0rtfolio2", "../portfolio3", "../Portfolio4", "../P0rtfolio5", "../Portfolio-B2B"];
const KEYS = ["SFTP_HOST", "SFTP_USER", "SFTP_PASSWORD", "SFTP_PORT"];
const DRY = process.argv.includes("--dry");

if (!existsSync(ENV_FILE)) {
  console.error(`✗ ${ENV_FILE} fehlt.`);
  process.exit(1);
}
process.loadEnvFile(ENV_FILE);
const missing = KEYS.slice(0, 3).filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`✗ In ${ENV_FILE} fehlen: ${missing.join(", ")}`);
  process.exit(1);
}

for (const rel of REPOS) {
  const dir = resolve(ROOT, rel);
  if (!existsSync(join(dir, ".git"))) {
    console.warn(`✗ ${rel}: kein Git-Repo – übersprungen`);
    continue;
  }
  const url = execFileSync("git", ["remote", "get-url", "origin"], { cwd: dir, encoding: "utf8" }).trim();
  const repo = url.match(/github\.com[/:]([^/]+\/[^/.]+)/)?.[1];
  if (!repo) {
    console.warn(`✗ ${rel}: kein GitHub-Remote (${url}) – übersprungen`);
    continue;
  }
  for (const key of KEYS) {
    const value = process.env[key];
    if (!value) continue;
    if (!DRY) execFileSync("gh", ["secret", "set", key, "--repo", repo], { input: value, stdio: ["pipe", "ignore", "inherit"] });
  }
  console.log(`${DRY ? "~" : "✓"} ${repo}: ${KEYS.filter((k) => process.env[k]).join(", ")}`);
}
