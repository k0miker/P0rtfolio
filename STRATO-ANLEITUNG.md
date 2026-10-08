# Portfolios zu STRATO umziehen

Alle 6 Portfolios laufen auf **einem** STRATO-Paket unter **www.cb-webdevelopment.de** –
die Varianten als Unterordner, damit ein (kostenloses) SSL-Zertifikat für alles reicht.

| Portfolio | Repo | Adresse | Ordner auf STRATO |
|---|---|---|---|
| Haupt-Portfolio: v5 (Modernist) | P0rtfolio5 | www.cb-webdevelopment.de | `/portfolio` |
| v1 (Classic) | P0rtfolio | www.cb-webdevelopment.de/v1/ | `/portfolio/v1` |
| v2 | P0rtfolio2 | …/v2/ | `/portfolio/v2` |
| v3 | portfolio3 | …/v3/ | `/portfolio/v3` |
| v4 (Terminal) | Portfolio4 | …/v4/ | `/portfolio/v4` |
| B2B | Portfolio-B2B | …/b2b/ | `/portfolio/b2b` |

Seit 2026-10-07 stellt **P0rtfolio5** die Startseite. **P0rtfolio** bleibt trotzdem die Zentrale
für Projektdaten, SEO, llms.txt, Kontaktformular und STRATO-Dateien (`npm run sync:projects`).
Alte `/v5/`-Links leitet die `.htaccess` per 301 auf `/` um.

Die Ordner legt das Deploy-Skript beim ersten Hochladen selbst an.

## 1. Im STRATO-Kundenlogin (einmalig)
- [ ] Domain **cb-webdevelopment.de** im Paket aktiv
- [ ] Domains verwalten → Zahnrad → Ziel **„intern“** → Ordner `/portfolio`
      (für `cb-webdevelopment.de` und `www`)
- [ ] **SSL** für die Domain inkl. www aktivieren (im Paket enthalten).
      Subdomains werden nicht gebraucht – ein Zertifikat pro Subdomain würde extra kosten.
- [ ] **SFTP-Zugang:** Ihr Paket → Datenbanken und Webspace → SFTP & SSH
      → Server + Benutzername notieren, SFTP-Passwort setzen
- [ ] **PHP-Version** auf 8.1 oder neuer
- [ ] **Postfächer** anlegen: `info@cb-webdevelopment.de` (Empfänger) und
      `webseite@cb-webdevelopment.de` (Absender des Kontaktformulars)
- [ ] **AVV** (Auftragsverarbeitungsvertrag) abschließen – steht so in der Datenschutzerklärung

## 2. Zugangsdaten – einmal für alle Portfolios
1. `K:\Work\.strato-portfolios.env` öffnen (liegt außerhalb aller Repos) und
   `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD` eintragen.
2. Im Haupt-Portfolio:
   ```bash
   npm run strato:secrets -- --dry   # zeigt, welche Repos was bekommen
   npm run strato:secrets            # trägt die 3 Secrets in alle 6 GitHub-Repos ein
   ```
   Lokal lesen alle Deploy-Skripte dieselbe Datei – keine `.env` pro Repo nötig.
   Passwort geändert? Datei anpassen, `npm run strato:secrets` erneut ausführen.

## 3. Erster Upload (lokal testen)
In jedem Portfolio-Ordner (auf Branch `strato-umzug`):
```bash
npm run deploy:dry   # Probelauf
npm run deploy       # bauen + hochladen
```
Dann im Browser prüfen – siehe Schritt 5.

## 4. Live schalten (Branch zusammenführen)
`strato-umzug` in `main`/`master` mergen und pushen → die GitHub Action
„Website veröffentlichen“ lädt ab dann bei jedem Push automatisch zu STRATO hoch.
(Netlify baut zu dem Zeitpunkt auch noch – stört nicht, siehe Schritt 6.)

## 5. Testen
- [ ] `http://cb-webdevelopment.de` → leitet auf `https://www.cb-webdevelopment.de` um
- [ ] /v2/ … /v5/ und /b2b/ laden, Versions-Umschalter springt korrekt
- [ ] Live-Vorschauen der Varianten im Haupt-Portfolio werden angezeigt (iframes)
- [ ] **Kontaktformular** auf jeder Seite (außer v5) einmal abschicken → Mail an info@ kommt an
- [ ] Google Analytics nach Einwilligung (Haupt-Portfolio) → in GA4 „Echtzeit“ sichtbar
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt` erreichbar

## 6. Alte Domain und Netlify abschalten
- [ ] **colinblome.dev** bleibt bei Porkbun bis zum Ablauf und leitet weiter:
      Nameserver bei Porkbun wieder auf Porkbun stellen (aktuell Netlify/NS1), dann
      URL-Weiterleitung **301, mit Pfad** einrichten:
      `colinblome.dev` + `www` → `https://www.cb-webdevelopment.de`,
      `portfolio2…5.colinblome.dev` → `www.cb-webdevelopment.de/v2/` … `/v5/`,
      `b2b.colinblome.dev` → `www.cb-webdevelopment.de/b2b/`.
      ⚠ .dev-Domains funktionieren nur per HTTPS – prüfen, dass die Weiterleitung
      `https://colinblome.dev` ohne Zertifikatsfehler umleitet.
- [ ] Mail: info@colinblome.dev (Zoho) ggf. noch eine Weile an info@cb-webdevelopment.de weiterleiten
- [ ] Erst wenn alles läuft: Netlify-Sites löschen

## 7. Nach dem Livegang (SEO)
- [ ] Google Search Console: neue Domain hinzufügen, Sitemap einreichen, bei
      colinblome.dev das Tool **„Adressänderung“** nutzen
- [ ] Google-Unternehmensprofil, LinkedIn, GitHub-Profil: Website-Link ändern
- [ ] Footer-Links bei Nestroy, Richter und Grumbach auf cb-webdevelopment.de umstellen
- [ ] Lebenslauf-PDF (`src/assets/doc/ColinBlome-WebDev-CV.pdf`) enthält noch colinblome.dev

## Wie es technisch funktioniert
Alle STRATO-Dateien sind für alle Portfolios identisch und werden wie die Projektdaten
per `npm run sync:projects` aus diesem Repo verteilt – nur hier bearbeiten:
- `scripts/deploy.mjs` – SFTP-Upload; Zielordner = `/portfolio` + `base` aus astro.config.mjs
- `.github/workflows/deploy.yml` – Action bei Push auf main/master
- `public/.htaccess` – HTTPS, www-Umleitung, Sicherheits-Header (CSP), Caching
- `webroot/kontakt.php` + `webroot/kontakt.js` – hier gepflegt (nicht in public/), per Sync nur nach **P0rtfolio5**
  kopiert (liegt im Webroot → `/kontakt.php`); alle Versionen senden dorthin. Spam-Schutz ohne
  Captcha, Versand per Mail an info@, danach zurück auf die Ursprungsseite.
  Der Schlüssel liegt in `/portfolio-private/` außerhalb des Webroots.
- Projektbilder (`/projects/…`, inkl. Handy-Screenshots `-m.webp`) und Projektvideos nutzen alle
  Versionen über absolute Pfade – ausgeliefert von P0rtfolio5 im Webroot.
- Favicons, `robots.txt`, `sitemap.xml`, `logo.png` liegen direkt in P0rtfolio5/public.

---
Hilfe: [STRATO SFTP-FAQ](https://www.strato.de/faq/hosting/so-nutzen-sie-ihren-ssh-sftp-zugang/) ·
STRATO-Support 030 300 146 0
