/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: "0.0.0.0",
    allowedHosts: [".onrender.com"]
  },
  test: {
    coverage: {
      provider: 'v8', // usa o mecanismo nativo do Node
      reporter: ['text', 'lcov'], // o SonarQube lê o lcov
      reportsDirectory: './coverage',
    },
  },
})
