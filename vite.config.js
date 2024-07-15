import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import purgecss from "vite-plugin-purgecss";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "endpoint.json",
          dest: "",
        },
      ],
    }),
    purgecss({
      content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        deep: [/^Toastify/],
      },
    }),
    compression(),
    {
      ...visualizer(),
      enforce: "pre",
      apply: "build",
    },
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"], 
        },
      },
    },
    chunkSizeWarningLimit: 100000,
  },
});
