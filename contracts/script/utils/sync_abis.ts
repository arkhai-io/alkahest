#!/usr/bin/env bun

/**
 * Syncs contract ABIs from Foundry build artifacts to SDK directories.
 *
 * Uses contracts/src/ directory structure as the source of truth for paths,
 * looks up artifacts in contracts/out/, and copies to both sdks/ts/ and sdks/rs/.
 *
 * For the TS SDK, also generates .ts files that re-export the ABI with `as const`.
 *
 * Usage:
 *   bun run contracts/script/utils/sync_abis.ts [--dry-run]
 */

import { readdir, mkdir, readFile, writeFile } from "fs/promises";
import { join, dirname, basename } from "path";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    "dry-run": { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
  strict: true,
  allowPositionals: true,
});

if (values.help) {
  console.log(`
Usage: bun run contracts/script/utils/sync_abis.ts [options]

Options:
  --dry-run    Show what would be done without writing files
  -h, --help   Show this help message

Run from the repo root.
`);
  process.exit(0);
}

const dryRun = values["dry-run"];
const root = join(import.meta.dir, "..", "..", "..");
const contractsSrc = join(root, "contracts", "src");
const contractsOut = join(root, "contracts", "out");
const tsContracts = join(root, "sdks", "ts", "src", "contracts");
const rsContracts = join(root, "sdks", "rs", "src", "contracts");

// Directories/files in contracts/src/ to skip (not part of the public SDK surface)
const SKIP_DIRS = new Set(["example"]);
const SKIP_FILES = new Set([
  "BaseAttester.sol",
  "BaseEscrowObligation.sol",
  "BaseEscrowObligationTierable.sol",
  "BaseObligation.sol",
  "IArbiter.sol",
  "ArbiterUtils.sol",
]);

// Path remapping: source path prefix -> SDK path prefix
// e.g. utils/barter/Foo -> utils/Foo in SDKs
const PATH_REMAPS: [string, string][] = [
  ["utils/barter/", "utils/"],
  ["utils/splitters/", "utils/splitters/"],
];

function remapPath(srcRelPath: string): string | null {
  for (const [from, to] of PATH_REMAPS) {
    if (srcRelPath.startsWith(from)) {
      return srcRelPath.replace(from, to);
    }
  }
  return srcRelPath;
}

// Extra ABIs from dependencies that aren't in contracts/src/ but should be in SDKs.
// These are looked up directly in contracts/out/ and placed at the given SDK path.
const EXTRA_ABIS: { outPath: string; sdkPath: string }[] = [
  { outPath: "IERC20.sol/IERC20.json", sdkPath: "IERC20" },
  { outPath: "IERC721.sol/IERC721.json", sdkPath: "IERC721" },
  { outPath: "IERC1155.sol/IERC1155.json", sdkPath: "IERC1155" },
  { outPath: "IEAS.sol/IEAS.json", sdkPath: "IEAS" },
  { outPath: "ISchemaRegistry.sol/ISchemaRegistry.json", sdkPath: "ISchemaRegistry" },
  { outPath: "ERC20Permit.sol/ERC20Permit.json", sdkPath: "ERC20Permit" },
];

// TS-only extras (EAS internals)
const TS_ONLY_EXTRAS: { outPath: string; sdkPath: string }[] = [
  { outPath: "EAS.sol/EAS.json", sdkPath: "eas/EAS" },
  { outPath: "SchemaRegistry.sol/SchemaRegistry.json", sdkPath: "eas/SchemaRegistry" },
];

async function findSolFiles(dir: string, relBase: string = ""): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const relPath = relBase ? `${relBase}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results.push(...(await findSolFiles(join(dir, entry.name), relPath)));
    } else if (entry.isFile() && entry.name.endsWith(".sol")) {
      if (SKIP_FILES.has(entry.name)) continue;
      results.push(relPath);
    }
  }

  return results;
}

function getArtifactPath(solRelPath: string): string {
  const solFileName = basename(solRelPath);
  const contractName = solFileName.replace(".sol", "");
  return join(contractsOut, solFileName, `${contractName}.json`);
}

async function readArtifact(artifactPath: string): Promise<object | null> {
  try {
    const content = await readFile(artifactPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function generateTsExport(artifact: object): string {
  return `export const abi = ${JSON.stringify(artifact, null, 2)} as const;\n`;
}

async function writeFileSafe(path: string, content: string) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

interface SyncResult {
  written: string[];
  skipped: string[];
  missing: string[];
}

async function syncAbis(): Promise<SyncResult> {
  const result: SyncResult = { written: [], skipped: [], missing: [] };

  // Find all .sol files in contracts/src/
  const solFiles = await findSolFiles(contractsSrc);

  for (const solRelPath of solFiles) {
    const contractName = basename(solRelPath, ".sol");
    const srcRelDir = dirname(solRelPath);
    const sdkRelPath = remapPath(join(srcRelDir, contractName).replace(/\\/g, "/"));

    if (sdkRelPath === null) {
      result.skipped.push(solRelPath);
      continue;
    }

    // Find artifact
    const artifactPath = getArtifactPath(solRelPath);
    const artifact = await readArtifact(artifactPath);

    if (!artifact) {
      result.missing.push(solRelPath);
      continue;
    }

    const jsonContent = JSON.stringify(artifact, null, 2) + "\n";
    const tsContent = generateTsExport(artifact);

    const rsJsonPath = join(rsContracts, `${sdkRelPath}.json`);
    const tsJsonPath = join(tsContracts, `${sdkRelPath}.json`);
    const tsTsPath = join(tsContracts, `${sdkRelPath}.ts`);

    if (dryRun) {
      console.log(`  ${sdkRelPath}.json -> rs, ts`);
      console.log(`  ${sdkRelPath}.ts   -> ts`);
    } else {
      await writeFileSafe(rsJsonPath, jsonContent);
      await writeFileSafe(tsJsonPath, jsonContent);
      await writeFileSafe(tsTsPath, tsContent);
    }

    result.written.push(sdkRelPath);
  }

  // Handle extra ABIs (dependency interfaces)
  for (const extra of EXTRA_ABIS) {
    const artifactPath = join(contractsOut, extra.outPath);
    const artifact = await readArtifact(artifactPath);

    if (!artifact) {
      result.missing.push(extra.outPath);
      continue;
    }

    const jsonContent = JSON.stringify(artifact, null, 2) + "\n";
    const tsContent = generateTsExport(artifact);

    if (dryRun) {
      console.log(`  ${extra.sdkPath}.json -> rs, ts (extra)`);
    } else {
      await writeFileSafe(join(rsContracts, `${extra.sdkPath}.json`), jsonContent);
      await writeFileSafe(join(tsContracts, `${extra.sdkPath}.json`), jsonContent);
      await writeFileSafe(join(tsContracts, `${extra.sdkPath}.ts`), tsContent);
    }

    result.written.push(extra.sdkPath);
  }

  // Handle TS-only extras
  for (const extra of TS_ONLY_EXTRAS) {
    const artifactPath = join(contractsOut, extra.outPath);
    const artifact = await readArtifact(artifactPath);

    if (!artifact) {
      result.missing.push(extra.outPath);
      continue;
    }

    const jsonContent = JSON.stringify(artifact, null, 2) + "\n";
    const tsContent = generateTsExport(artifact);

    if (dryRun) {
      console.log(`  ${extra.sdkPath}.json -> ts only (extra)`);
    } else {
      await writeFileSafe(join(tsContracts, `${extra.sdkPath}.json`), jsonContent);
      await writeFileSafe(join(tsContracts, `${extra.sdkPath}.ts`), tsContent);
    }

    result.written.push(extra.sdkPath);
  }

  return result;
}

async function main() {
  console.log(dryRun ? "Dry run — no files will be written.\n" : "Syncing ABIs...\n");

  const result = await syncAbis();

  console.log(`\n✓ ${result.written.length} contracts synced`);

  if (result.missing.length > 0) {
    console.log(`\n⚠ ${result.missing.length} artifacts not found (run \`forge build\` first?):`);
    for (const m of result.missing) {
      console.log(`  - ${m}`);
    }
  }

  if (result.skipped.length > 0) {
    console.log(`\n⏭ ${result.skipped.length} skipped:`);
    for (const s of result.skipped) {
      console.log(`  - ${s}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
