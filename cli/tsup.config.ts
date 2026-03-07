import { defineConfig } from "tsup";
import { writeFileSync, readFileSync } from "fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  clean: true,
  dts: false,
  bundle: true,
  splitting: false,
  treeshake: true,
  external: ["viem", "commander", "@viem/anvil"],
  banner: {
    js: "#!/usr/bin/env node",
  },
  onSuccess: async () => {
    // Strip unused side-effect import of test-only dependency
    const file = "dist/index.js";
    let code = readFileSync(file, "utf-8");
    code = code.replace(/^import\s+['"]@viem\/anvil['"];?\s*$/m, "");
    writeFileSync(file, code);
  },
});
