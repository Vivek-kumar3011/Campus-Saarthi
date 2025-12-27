import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // 👈 YE SABSE ZAROORI HAI! Isse path /assets se ./assets ho jayega.
  build: {
    outDir: 'dist', // 👈 Confirm karein ki output 'dist' folder mein ja raha hai
    emptyOutDir: true,
  }
})