import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // or `true` to allow access from other devices
    port: 5173,          // optional: ensures consistent port
  }
})
