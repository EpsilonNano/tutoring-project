import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://EpsilonNano.github.io',
  base: '/tutoring-project',
  integrations: [sitemap()],
})