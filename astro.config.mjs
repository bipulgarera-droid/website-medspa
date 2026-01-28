
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Pure static build, client-side data fetching
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
