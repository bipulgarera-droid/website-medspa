
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // SSG by default, SSR for dynamic routes
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
