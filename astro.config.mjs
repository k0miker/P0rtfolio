import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.cb-webdevelopment.de",
  // Läuft als Version 1 im Unterordner – Haupt-Portfolio im Webroot ist P0rtfolio5.
  // Daten, SEO und Sync werden trotzdem weiter HIER gepflegt (npm run sync:projects).
  base: "/v1/",
  // Astro 7 entfernt beim Komprimieren Zeilenumbrüche vor Inline-Elementen
  // ("unserer\n<a>" -> "unserer<a>") und damit sichtbare Leerzeichen.
  compressHTML: false,
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "es2015",
    },
  },
});
