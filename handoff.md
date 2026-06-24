# Handoff-Prompt (für neue Conversation)

> Kopiere alles unterhalb der Linie als ersten Prompt in eine neue Conversation.

---

Du übernimmst ein laufendes Redesign meines Portfolios (Astro + Tailwind,
Windows/PowerShell). Antworte auf Deutsch, committe lokal ok, aber **pushe nie
ohne Ansage**. Validiere Änderungen mit `npm run build` und check im Browser
(`npm run dev`); bei neuen Client-Scripts den Dev-Server neu starten + Hard-Reload.

**Branch:** `redesign/editorial-terminal`

**Design-Richtung: Editorial-Basis + Terminal-Akzente.**
Sans (Inter, `--font-body`) für Fließtext/Headlines, Monospace (Space Mono,
`--font-mono`) nur als Akzent (Prompts, Labels, Cursor). Tomato (`--accent`) ist
die einzige Leitfarbe. Terminal-Fenster sind neutral-grau (`#252525` Body,
`var(--bg-secondary)` Titelleiste).

**Design-System (schon vorhanden):**
- `src/css/styles.css` – Tokens: `--font-body/-mono/-marker`, fluide Typo-Skala
  `--step--1`…`--step-5`, Spacing `--space-section/-block`, `--content-max`,
  Elevation `--elev-1`…`--elev-4`.
- `src/css/terminal.css` – geteiltes Terminal-Fenster
  (`.terminal-window/-titlebar/-dots/-title/-body/-cmd`, `.term-cursor`,
  `cursor-blink`), global in `src/pages/index.astro` importiert.
- Globales Font-Setup in `index.astro`: Body = `--font-body`; das alte
  `* { font-family: mono }` ist aufgelöst, Mono nur noch gezielt.

**Schon fertig:**
- Token-/Typo-Fundament.
- Hero (`src/components/Iam.astro`): **bewusst beim Original belassen**
  (zentrierter Typewriter-Console-Hero). NICHT durch ein Editorial-Layout
  ersetzen – das wurde getestet und verworfen.
- About (`src/components/Myself.astro`): Bio als Terminal (`cat about.md`,
  EN/DE-Tabs) + „Self Proclamations" als Terminal (`whoami --tags`).
- Skills (`src/components/Skills.astro`): Terminal `./skills --list` (CSS-Bars,
  ein Tomato-Verlauf statt Regenbogen-Hover) + `./skills --stack` (Icon-Grid).
- Projects (`src/components/Projects.astro` + `ui/Card.astro`): echtes Bento-Grid
  mit animierter **Mutations-Engine** (festes 5×4-Raster, Karten haben feste
  Flächennamen `p1..p12`, pro Tick wird ein zufälliger Bereich neu aufgeteilt,
  FLIP-Animation; pausiert bei Filter/außer Sicht/`prefers-reduced-motion`;
  braucht genau 12 Karten, sonst statischer Fallback). 3D-Tilt der Cards entfernt.
  Filter-Buttons als Mono-Pills. Gefilterter Zustand füllt den Platz
  gleichmäßig (`is-filtered`/`is-single`).

**Deine Aufgabe:** Setze die noch offenen Punkte aus `plan.md` um – zuerst
**Nav** (`src/components/Nav.astro`), dann **Contact**
(`src/components/Contact.astro`), inkl. dem `50{`→`50%{`-Keyframe-Fix in Contact
(einzige verbleibende Build-Warnung). Details, konkrete Checklisten und ein
späterer Bento-Task (pro-Projekt erlaubte Kachelgrößen) stehen in `plan.md`.

Bitte arbeite sektionsweise, halte bestehende JS-Logik/Interaktionen intakt und
zeig mir nach jeder Sektion das Ergebnis zum Gegencheck. Lies zuerst `plan.md`
und die jeweils betroffene Komponente, bevor du änderst.
