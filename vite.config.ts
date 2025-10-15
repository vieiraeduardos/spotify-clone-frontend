/// <reference types="vitest" />
import { sentryVitePlugin } from "@sentry/vite-plugin";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
      type: 'module'
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
    manifest: {
      name: 'Luiza Labs - Spotify Clone',
      short_name: 'Luiza Labs',
      description: 'Projeto de integração com a API do Spotify - Clone do Spotify',
      theme_color: '#1DB954',
      background_color: '#000000',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      globDirectory: 'dist',
      globIgnores: [
        '**/node_modules/**/*',
        'sw.js',
        'workbox-*.js'
      ],
      swDest: 'dist/sw.js',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.spotify\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'spotify-api-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 1 // 1 hora
            }
          }
        },
        {
          urlPattern: /^https:\/\/i\.scdn\.co\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'spotify-images-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 60 * 60 * 1 // 1 hora
            }
          }
        }
      ]
    }
  }), sentryVitePlugin({
    org: "accenture-99c",
    project: "luiza-labs"
  })],

  server: {
    port: 8080,
    host: "0.0.0.0",
    allowedHosts: [".onrender.com"]
  },

  preview: {
    port: 8080,
    host: "0.0.0.0",
    allowedHosts: [".onrender.com"]
  },

  test: {
    coverage: {
      provider: 'v8', 
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },

  build: {
    sourcemap: true
  }
})