// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site as siteConfig } from './src/config/site.ts';

// Pages that stay out of the sitemap while their feature switch is off
const hidden = [
  '/404',
  !siteConfig.showEvents && '/events/',
  !siteConfig.showGuides && '/resources/guides/',
  !siteConfig.showFacultySection && '/about/faculty/',
].filter(Boolean);

export default defineConfig({
  site: 'https://gccenable.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !hidden.some((h) => page.includes(h)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
