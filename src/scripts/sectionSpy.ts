// Gemeinsamer Scroll-Spy für Nav und Seitenleiste.
// - setzt --scroll-progress (0–1) auf <html> für Fortschrittsanzeigen in CSS
// - meldet die aktuelle Sektion an alle Listener (null = keine, z. B. Impressum)
import { navSections } from "../data/navSections.js";

type Listener = (id: string | null) => void;

const listeners = new Set<Listener>();
let current: string | null = null;
let started = false;
let ticking = false;

function measure() {
  ticking = false;
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  root.style.setProperty(
    "--scroll-progress",
    max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0",
  );

  // Aktiv ist die letzte Sektion, deren Oberkante die Linie bei 35 % passiert hat
  const line = window.innerHeight * 0.35;
  const present = navSections
    .map((s) => document.getElementById(s.id))
    .filter((el): el is HTMLElement => el !== null);

  let id: string | null = null;
  for (const el of present) {
    if (el.getBoundingClientRect().top <= line) id = el.id;
  }
  // Am Seitenende erreicht die letzte Sektion die Linie evtl. nie
  if (present.length && max > 0 && window.scrollY >= max - 4) {
    id = present[present.length - 1].id;
  }

  if (id !== current) {
    current = id;
    listeners.forEach((fn) => fn(id));
  }
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(measure);
}

export function onSectionChange(fn: Listener) {
  listeners.add(fn);
  if (!started) {
    started = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    measure();
  }
  fn(current);
}
