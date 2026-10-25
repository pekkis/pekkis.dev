import { defineConfig } from "tsdown";

// A library for the site and its future siblings in other UI frameworks: ESM with type
// declarations, one output file per module. Dependencies stay external (tsdown's default).
// Declarations come from Oxc (isolatedDeclarations in tsconfig.json), not from TypeScript's
// JS API, which TypeScript 7 no longer has.
export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "neutral",
  unbundle: true,
  dts: true,
  clean: true
});
