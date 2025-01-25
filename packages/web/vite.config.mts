/// <reference types="vitest" />
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
    proxy: {
      "/msr/api": {
        target: "https://monster-siren.hypergryph.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/msr\/api/, ""),
      },
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
