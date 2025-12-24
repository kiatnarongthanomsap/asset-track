import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-remote': {
        target: 'https://apps2.coop.ku.ac.th/assetpro_api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-remote/, ''),
      }
    }
  }
})
