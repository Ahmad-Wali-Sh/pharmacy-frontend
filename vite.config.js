import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for the build
    assetsInlineLimit: 0, // Ensure assets are not inlined
    rollupOptions: {
      input: {
        main: './index.html', // Entry point of your application
      },
    },
    // Copy env.json to the build output directory
    assets: {
      include: ['env.json'],
    },
  },
})
