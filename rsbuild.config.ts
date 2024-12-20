import path from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: { index: './src/main.tsx' }
  },
  html: {
    template: './index.html'
  },
  tools: {
    webpack: {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['postcss-loader'],
            type: 'css'
          }
        ]
      }
    },
    rspack: {
      plugins: [TanStackRouterRspack()]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, './server')
    }
  }
})
