// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // We provide our own base styles in src/styles/global.css and import it
      // from the layout, so disable Astro's automatic Tailwind injection.
      applyBaseStyles: false,
    }),
  ],
  // Marketing site is 95% static — emit HTML at build time.
  output: 'static',
  // Cloudflare Pages / Vercel both detect this automatically.

  vite: {
    // Dedupe React across the dep graph. Without this, a transitive dep can
    // pull in a second copy of react/react-dom and the @astrojs/react
    // hydration script ends up loading createRoot from a different copy than
    // the one Vite optimised — surfacing as:
    //   "does not provide an export named 'createRoot'"
    resolve: {
      dedupe: ['react', 'react-dom', 'react-dom/client'],
    },
    // Force Vite's pre-bundler to handle these entries. react-dom/client is
    // a CJS file; without pre-bundling, Vite tries to serve it as ESM and
    // the named export resolution fails.
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});

