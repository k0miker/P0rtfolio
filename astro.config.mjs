import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://colinblome.dev",
  integrations: [tailwind()],
  vite: {
    build: {
      target: "es2015",
    },
  },
});
