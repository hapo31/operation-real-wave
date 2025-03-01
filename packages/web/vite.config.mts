/// <reference types="vitest" />
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    cjsInterop({
      dependencies: ["@mui/icons-material/**"],
    }),
  ],
  test: {
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
  ssr: {
    noExternal: ["@mui/icons-material"],
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
