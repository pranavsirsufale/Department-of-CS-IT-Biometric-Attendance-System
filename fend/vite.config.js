import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:8000/api/v1",
        changeOrigin: true
      }
    }
  }
=======
>>>>>>> 86c5c22 (add backend and frontend logic)
})
