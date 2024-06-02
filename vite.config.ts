import { defineConfig } from "npm:vite";
import { vitePlugin as remix } from "npm:@remix-run/dev";

/// <reference types="vitest" />
// @deno-types="npm:vitest"
export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    includeSource: ["app/**/*.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "e2e"],
  },
});
