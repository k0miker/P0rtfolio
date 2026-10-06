// =============================================================================
// Lädt den Inhalt von dist/ per SFTP auf den STRATO-Webspace.
// ⚠ Wird per `npm run sync:projects` aus dem Haupt-Portfolio in alle Portfolios
// kopiert – nur dort (P0rtfolio/scripts/deploy.mjs) bearbeiten!
//
//   npm run deploy          → bauen + hochladen
//   npm run deploy:dry      → bauen + nur anzeigen, was passieren würde
//
// Zugangsdaten (nie im Code):
//   - lokal: gemeinsame Datei ../.strato-portfolios.env (gilt für alle Portfolios),
//            optional überschrieben durch eine eigene .env im Repo
//   - GitHub Actions: Repository-Secrets SFTP_HOST, SFTP_USER, SFTP_PASSWORD
// Der Zielordner ergibt sich aus `site` in astro.config.mjs (siehe FOLDERS),
// kann aber mit SFTP_REMOTE_DIR überschrieben werden.
// =============================================================================
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, posix, relative, sep } from 'node:path';
import SftpClient from 'ssh2-sftp-client';

const DIST = 'dist';
const dry = process.argv.includes('--dry');

// Domain → Ordner auf dem Webspace (die Domain muss bei STRATO auf diesen Ordner zeigen)
const FOLDERS = {
  'www.cb-webdevelopment.de': '/portfolio',
  'v2.cb-webdevelopment.de': '/portfolio2',
  'v3.cb-webdevelopment.de': '/portfolio3',
  'v4.cb-webdevelopment.de': '/portfolio4',
  'v5.cb-webdevelopment.de': '/portfolio5',
  'b2b.cb-webdevelopment.de': '/b2b',
};

// Lokal: erst die gemeinsame Datei, dann die eigene .env (überschreibt). In GitHub Actions
// kommen die Werte aus den Secrets – process.loadEnvFile überschreibt keine gesetzten Variablen.
for (const file of ['.env', '../.strato-portfolios.env']) {
  if (existsSync(file)) process.loadEnvFile(file);
}

const site = readFileSync('astro.config.mjs', 'utf8').match(/site:\s*["']([^"']+)["']/)?.[1];
const host = site ? new URL(site).hostname : '';
const { SFTP_HOST, SFTP_USER, SFTP_PASSWORD, SFTP_PORT = '22' } = process.env;
const SFTP_REMOTE_DIR = process.env.SFTP_REMOTE_DIR || FOLDERS[host] || '';

if (!SFTP_HOST || !SFTP_USER || !SFTP_PASSWORD) {
  console.error('✗ SFTP_HOST, SFTP_USER und SFTP_PASSWORD fehlen (lokal in ../.strato-portfolios.env, bei GitHub als Secrets).');
  process.exit(1);
}
// Nie ins Hauptverzeichnis laden – dort liegt der private Ordner des Kontaktformulars
if (!SFTP_REMOTE_DIR.replace(/\/+$/, '')) {
  console.error(`✗ Kein Zielordner für "${host || 'unbekannte Domain'}" – FOLDERS in scripts/deploy.mjs ergänzen oder SFTP_REMOTE_DIR setzen. Abbruch.`);
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error('✗ dist/ fehlt – erst "npm run build" ausführen.');
  process.exit(1);
}

// --- Lokale Dateien einsammeln (inkl. .htaccess) ---
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const remoteRoot = SFTP_REMOTE_DIR.replace(/\/+$/, '');
const files = walk(DIST).map((local) => {
  const rel = relative(DIST, local).split(sep).join('/');
  return { local, rel, remote: `${remoteRoot}/${rel}` };
});

// Gehashte Assets zuerst hochladen, damit neue HTML-Seiten nie auf fehlende Dateien zeigen
files.sort((a, b) => Number(!a.rel.startsWith('_astro/')) - Number(!b.rel.startsWith('_astro/')));

console.log(`→ ${host}: ${files.length} Dateien nach ${SFTP_USER}@${SFTP_HOST}:${remoteRoot}${dry ? '  (Probelauf)' : ''}`);

const sftp = new SftpClient();
try {
  await sftp.connect({
    host: SFTP_HOST,
    port: Number(SFTP_PORT),
    username: SFTP_USER,
    password: SFTP_PASSWORD,
    readyTimeout: 20000,
  });

  const madeDirs = new Set();
  for (const file of files) {
    const dir = posix.dirname(file.remote);
    if (!madeDirs.has(dir)) {
      if (!dry && !(await sftp.exists(dir))) await sftp.mkdir(dir, true);
      madeDirs.add(dir);
    }
    if (!dry) await sftp.fastPut(file.local, file.remote);
  }
  console.log(`  ↑ ${files.length} Dateien ${dry ? 'würden hochgeladen' : 'hochgeladen'}`);

  // Veraltete gehashte Assets aufräumen (nur in _astro/, sonst wird nichts gelöscht)
  const astroDir = `${remoteRoot}/_astro`;
  if (await sftp.exists(astroDir)) {
    const current = new Set(files.filter((f) => f.rel.startsWith('_astro/')).map((f) => posix.basename(f.rel)));
    for (const entry of await sftp.list(astroDir)) {
      if (entry.type === '-' && !current.has(entry.name)) {
        if (!dry) await sftp.delete(`${astroDir}/${entry.name}`);
        console.log(`  ✗ _astro/${entry.name} (veraltet)`);
      }
    }
  }

  // Fremde Dateien melden: alles im Zielordner, was nicht aus dem Build stammt. Gelöscht wird nichts.
  // Ausführbare Dateien (PHP, Skripte, .htaccess) sind ein Warnsignal für eine Hintertür.
  const built = new Set(files.map((f) => f.rel));
  const RISKY = /(\.(php\d?|phtml|phar|pl|py|cgi|sh)|(^|\/)\.htaccess|(^|\/)\.user\.ini)$/i;
  const foreign = [];
  async function walkRemote(dir, prefix) {
    for (const entry of await sftp.list(dir)) {
      const rel = prefix + entry.name;
      if (entry.type === 'd') {
        if (rel !== '_astro' && rel !== '.well-known') await walkRemote(`${dir}/${entry.name}`, `${rel}/`);
      } else if (!built.has(rel)) {
        foreign.push(rel);
      }
    }
  }
  // Beim Probelauf vor dem allerersten Upload gibt es den Zielordner noch nicht
  if (await sftp.exists(remoteRoot)) await walkRemote(remoteRoot, '');
  if (foreign.length) {
    const risky = foreign.filter((rel) => RISKY.test(rel));
    console.warn(`⚠ ${foreign.length} Datei(en) auf dem Server stammen nicht aus dem Build (veraltet oder fremd):`);
    for (const rel of foreign) console.warn(`    ${RISKY.test(rel) ? '‼' : '·'} ${rel}`);
    if (risky.length) {
      console.warn(`‼ ${risky.length} davon sind ausführbar – sofort prüfen und ggf. per SFTP löschen!`);
    }
    if (process.env.GITHUB_ACTIONS) {
      const level = risky.length ? 'error' : 'warning';
      const list = (risky.length ? risky : foreign).slice(0, 20).join(', ');
      console.log(`::${level} title=Fremde Dateien auf dem Server::${foreign.length} Datei(en) nicht aus dem Build, ${risky.length} ausführbar: ${list}`);
    }
  } else {
    console.log('✓ Keine fremden Dateien auf dem Server.');
  }

  console.log(dry ? '✓ Probelauf beendet – nichts wurde verändert.' : '✓ Upload abgeschlossen.');
} catch (err) {
  console.error(`✗ Deploy fehlgeschlagen: ${err.message}`);
  process.exitCode = 1;
} finally {
  await sftp.end().catch(() => {});
}
