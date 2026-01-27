import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cspPlugin } from './vite-plugin-csp'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cspPlugin(), // CSP только в продакшне
  ],
})
