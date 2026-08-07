import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure a single React instance (Swiper otherwise bundles its own copy,
  // which silently breaks hooks / state updates).
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5174,
    strictPort: true,
  },
})
