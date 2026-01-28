
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server mode required for SSR pages (prerender: false) in Astro v5
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    }
  }
});
