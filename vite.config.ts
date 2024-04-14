import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";

/// <reference types="vitest" />
export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
});
