import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/PortFolio_Build_Gem/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
