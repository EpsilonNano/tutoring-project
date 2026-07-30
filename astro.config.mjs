import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://brantfordtutors.ca',
  // base removed — defaults to '/'
  integrations: [sitemap()],
})