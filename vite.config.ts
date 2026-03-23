import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-i18next') || id.includes('i18next')) return 'i18n';
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) return 'vendor';
        },
      },
    },
  },
})
