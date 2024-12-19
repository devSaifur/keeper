import { defineConfig } from '@tanstack/start/config'
import { cloudflare } from 'unenv'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': '/app'
      }
    }
  },
  server: {
    preset: 'cloudflare-pages',
    unenv: cloudflare
  }
})
