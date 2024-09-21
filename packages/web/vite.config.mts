import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";

installGlobals();

/// <reference types="vitest" />
export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
  server: {
    port: 3000,
    proxy: {
      "/msr/api": {
        target: "https://monster-siren.hypergryph.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
