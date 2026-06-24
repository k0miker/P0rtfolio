# Redesign-Plan – ausstehende Änderungen

Branch: `redesign/editorial-terminal`

## Design-Richtung (Kontext)

**Editorial-Basis + Terminal-Akzente.** Sans (Inter) als seriöser Unterbau für
Fließtext/Headlines, Monospace (Space Mono) nur als gezielter Akzent
(Prompts, Labels, Cursor, Code-Tags). Tomato (`--accent`) ist die einzige
Leitfarbe. Terminal-Fenster sind neutral-grau (`#252525` Body,
`var(--bg-secondary)` Titelleiste).

**Design-System / wichtige Dateien:**
- `src/css/styles.css` – Tokens: Font-Familien (`--font-body/-mono/-marker`),
  fluide Typo-Skala (`--step--1` … `--step-5`), Section-Spacing
  (`--space-section/-block`, `--content-max`), Elevation (`--elev-1` … `--elev-4`).
- `src/css/terminal.css` – wiederverwendbares Terminal-Fenster
  (`.terminal-window/-titlebar/-dots/-title/-body/-cmd`, `.term-cursor`,
  `cursor-blink`). Global in `index.astro` importiert.
- `src/pages/index.astro` – globales Font-Setup (Body = `--font-body`, Mono nur
  noch als Akzent; das alte `* { font-family: mono }` ist aufgelöst).

**Bereits umgesetzt:** Token-/Typo-Fundament, About (Myself) als Terminal
(Bio + `whoami --tags`), Skills als Terminal (`./skills --list` + `--stack`),
Projects als animiertes Bento-Grid (Mutations-Engine).

**Neu hinzugefügt (Projekt):** `ConnectAI – KI für Myfactory ERP`
(`https://www.connectai-erp.de/`) in `src/data/projectData.js` (id `20`,
Kategorie `AI`, `tile: "wide"`). Cover-Screenshot via Playwright erstellt:
`src/assets/images/p17.png` (in `Projects.astro`-`imageMap` registriert).

**Highlight = Grumbach:** Die Grumbach-Entsorgung-Karte steht jetzt an erster
Stelle der `projects`-Liste (= Karte 0). Das animierte Bento setzt Karte 0 als
2×2-„Hero" oben links – dieser Slot ist in der Mutations-Engine **stabil** (keine
Vorlage zerlegt eine einzelne 2×2-Region), bleibt also dauerhaft das Highlight.

**Bento jetzt dynamisch (Option C umgesetzt):** Die Mutations-Engine in
`Projects.astro` ist nicht mehr auf 12 Karten / 5×4 festgenagelt. `COLS` bleibt 5,
`ROWS` wird aus der Kartenanzahl berechnet (C zwischen N und 2N). `genLayout()`
erzeugt das lückenlose Start-Layout für **jede** Projektanzahl (≥3; ab ≥5 mit
2×2-Hero) aus 2×2-Hero + Dominosteinen + 1×1-Feldern (max. 2×2, passend zu den
vorhandenen TPL-Vorlagen). Verifiziert für N=3…40; N=1/2 fallen auf das statische
Layout zurück. Neue Projekte können also einfach hinzugefügt werden, das Bento
passt sich automatisch an.

---

## 1. Nav (`src/components/Nav.astro`) — ⏸️ ZURÜCKGESTELLT

Ziel: ans Token-/Designsystem angleichen, Terminal-Akzent dezent aufgreifen,
Brand-Animation entschlacken.

**Status:** Ein Redesign-Versuch (Token-Umstellung, Wortmarke `colinblome.dev`
mit `.term-cursor`, Slash-Akzent, Akzent-Unterstrich beim aktiven Link) wurde
umgesetzt, aber auf Wunsch wieder **verworfen** – die Nav bleibt vorerst im
Originalzustand (committeter Stand). Falls erneut angefasst: kleiner/dezenter
vorgehen, die bestehende Brand-Optik nicht komplett ersetzen.

- [ ] **Tokens statt Hardcodes:** Link-Hover nutzt aktuell Tailwind
  `hover:bg-gray-200` / `focus:bg-gray-200` und feste `text-gray-200/600`.
  Auf `var(--bg-secondary)`, `var(--text-secondary)`, `var(--accent)` umstellen.
  Linkgröße auf `var(--step--1)`, Mono via `var(--font-mono)`.
- [ ] **Cursor konsistent:** Die `animate-ping`-Unterstriche (`_`) im Logo und am
  Link-Ende durch die ruhigere `cursor-blink`-Animation aus `terminal.css`
  ersetzen (gleicher Blink wie in den Terminal-Sektionen).
- [ ] **Brand/Logo entschlacken:** Die `.name` Hover-Morph-Animation
  („Colin Blome" → „Webdevelopment" mit `blur`, `font-size:0`, Buchstaben-
  Rotation, `i:nth-of-type`-Tricks) ist sehr gimmickig. Auf eine klare Wortmarke
  reduzieren, z. B. `CB` (Logo) + `colinblome.dev` mit einem Terminal-Cursor `_`
  in Akzentfarbe. Hover höchstens dezent (Akzentfarbe / leichtes Tracking).
- [ ] **Pfad-Optik nutzen:** Links sind schon `/Home`, `/About`, … (terminal-
  artig). Den führenden `/` in `var(--accent)` einfärben, Rest neutral – billiger,
  starker Akzent.
- [ ] **Aktiver Link:** Statt nur `background: var(--bg-secondary)` ein klarer
  Akzent-Indikator (z. B. Akzent-Text + Unterstrich/Border-bottom in `--accent`).
- [ ] **Navbar-Hintergrund:** `--nav-bg` (Verlauf) und gescrollt `.colored`
  (solid) prüfen – Kontrast/Lesbarkeit über dem Hero sicherstellen; Elevation
  über `--nav-shadow` ok lassen oder auf `--elev-*` mappen.
- [ ] **CSS aufräumen:** Es gibt **zwei** `@media (max-width: 768px)`-Blöcke mit
  teils widersprüchlichen `nav`-Regeln – zusammenführen.
- [ ] `nav * { font-family: mono }` → `var(--font-mono)`; `text-transform:
  uppercase` beibehalten (passt zum Terminal-Look) oder bewusst entscheiden.

JS (`Nav.astro` Script) bleibt funktional unangetastet (Scroll-`colored`,
Mobile-Menü, Projekt-Dropdown, Active-Highlight).

---

## 2. Contact (`src/components/Contact.astro`) — ✅ ERLEDIGT

Ziel: konsistent mit About/Skills (Terminal) **oder** sauber editorial; Tokens
angleichen; Bug fixen.

**Umgesetzt:** Terminal-Treatment gewählt – `.card/.header/.body` durch das
geteilte `.terminal-window` ersetzt (Titel `contact.sh — colin@webdev`, Prompt
`$ ./contact --message`, Abschluss-Prompt mit `.term-cursor`). Formular ist der
„Output"; Inputs/Textarea für dunklen Grund umgestylt (heller Text, dezente
Border, Akzent-Fokus mit Ring), Labels in `--font-mono`. Keyframe-Bug `50{` →
`50%{` gefixt (Build ist jetzt warnungsfrei). Toter `h1:hover span`-Code sowie
ungenutzte `.card/.header/.body/.form-bg`-Regeln entfernt. Direkt-Kontakt-Texte
im Terminal hell erzwungen (robust für Light-/Dark-Mode). JS (Formvalidierung,
Copy-Buttons, Reveal) unverändert.

- [ ] **Keyframe-Bug fixen:** Zeile ~303, `@keyframes highlight` hat `50{`
  statt `50%{`. Das ist die einzige verbleibende Build-Warnung
  (`Expected percentage but found "50"`). Einfach `50%` schreiben.
- [ ] **Terminal-Treatment (empfohlen, für Konsistenz):** `.card/.header/.body`
  durch das geteilte `.terminal-window` ersetzen
  (Titel `contact.sh — colin@webdev`, Prompt `$ ./contact --message`).
  Das Formular ist der „Output". Inputs/Textarea für dunklen Hintergrund
  umstylen (heller Text, dezente Border, Akzent-Fokus). Labels sind schon Mono.
  *(Alternative: editorial hell lassen, dann nur Tokens angleichen.)*
- [ ] **Tokens:** `.card` nutzt `--card-shadow`/`--card-border-glow` →
  auf `--elev-2`/`--elev-3` umstellen. Schriftgrößen auf `--step-*`.
- [ ] **Cursor konsistent:** `animate-ping` `_` / `!` im Header durch
  `cursor-blink` bzw. statisch ersetzen.
- [ ] **Toter Code:** Die `h1:hover span`-Regeln greifen nicht (im Markup ist
  `div.header`, kein `h1`). Entfernen oder Header zu `h1`/`h2` machen.
- [ ] **Direkt-Kontakt** (E-Mail/Telefon mit Copy) ist schon Mono + Akzent –
  nur Tokens/Spacing angleichen.
- [ ] **Hintergrund:** schwerer Inset-Shadow + Fixed-BG prüfen; ggf. leichter
  Scrim wie im Hero für bessere Lesbarkeit.

JS (Formvalidierung, Copy-Buttons, Reveal) bleibt funktional unangetastet.

---

## 3. Global: Motion-Cleanup (Schritt 9, optional)

- [ ] Dauer-Animationen entfernen/abschalten: `smoothGlow`/`fluidGlow` in
  `src/css/darkmode.css` (Card-`::before`-Glow ist bereits auskommentiert –
  Reste/Keyframes entfernen), `pulseShadow` in `styles.css` prüfen.
- [ ] Einheitliche Scroll-Reveals mit `IntersectionObserver` + dezentem Stagger
  statt mehrerer Dauerläufer (`.offscreen/.in-view` ist bereits die Basis).
- [ ] Elevation durchgängig über `--elev-*` statt Einzelschatten.

---

## 4. Später: Pro-Projekt erlaubte Kachelgrößen (Bento)

Problem: Manche Projekt-Screenshots sehen als `1x2` (hoch) schlecht aus,
andere als `2x1` (breit) – je nach Bildausschnitt.

Idee:
- In `src/data/projectData.js` je Projekt ein Feld ergänzen, z. B.
  `allow: ["1x1", "2x1", "2x2"]` (welche Formen legitim sind). Default = alle.
- Die **Mutations-Engine** in `src/components/Projects.astro` (Script
  „Animiertes Bento") muss das respektieren: beim Zuweisen einer Region-ID auf
  ein Sub-Rect (`mutate()`, Block `idsSorted.forEach(...)`) prüfen, ob die
  resultierende Form `w×h` für dieses Projekt erlaubt ist. Template-Varianten,
  die einer Karte eine **verbotene** Form geben würden, überspringen
  (in `alts`-Filter integrieren).
- Karten sind in DOM-Reihenfolge `p1..p12` = `filteredProjects`-Reihenfolge →
  Mapping Karte↔Projekt ist über den Index gegeben.
- Edge Case beachten: Wenn Constraints zu strikt sind, findet ein Tick evtl.
  keine gültige Mutation – dann einfach diesen Tick auslassen (wie jetzt schon
  bei „keine Alternative gefunden").

Hinweis (aktualisiert): Das animierte Bento ist inzwischen **anzahl-unabhängig**
(`genLayout()` + dynamische `ROWS`, siehe Kontext oben). Es funktioniert für
beliebig viele Projekte (≥3). Dieser Abschnitt betrifft nur noch die **separate**
Idee, pro Projekt erlaubte Kachel-Formen einzuschränken (`allow: [...]`).

---

## Workflow / Konventionen

- Dev: `npm run dev` · Build/Validierung: `npm run build`.
- Sprache: Deutsch. Nichts ohne Ansage pushen (lokal committen ok).
- Nach jeder Sektion kurz im Browser gegenchecken (Astro HMR; bei neuen
  Client-Scripts ggf. Dev-Server neu starten + Hard-Reload).
- Bestehende JS-Logik und funktionierende Interaktionen erhalten, nur Stil/
  Struktur ans System angleichen.
