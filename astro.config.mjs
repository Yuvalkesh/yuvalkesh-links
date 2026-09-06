// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://futureproofagents.com',
  integrations: [sitemap()],
  redirects: {
    '/he/cto/': '/he/recruiting-help/cto/',
    '/he/cto/thanks/': '/he/recruiting-help/cto/thanks/',
  },
});
