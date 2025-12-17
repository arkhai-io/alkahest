// convert-abi.ts

import { readdir, mkdir, stat } from "fs/promises";
import { join, relative } from "path";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    in: {
      type: "string",
      short: "i",
      default: process.cwd(),
    },
    out: {
      type: "string",
      short: "o",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
  strict: true,
  allowPositionals: true,
});

if (values.help) {
  console.log(`
Usage: bun run convert-abi.ts [options]

Options:
  -i, --in <dir>     Input directory (default: current directory)
  -o, --out <dir>    Output directory (default: same as input directory)
  -h, --help         Show this help message

Example:
  bun run convert-abi.ts --in ./abis --out ./generated
`);
  process.exit(0);
}

const inputDir = join(process.cwd(), values.in ?? "");
const outputDir = values.out ? join(process.cwd(), values.out) : inputDir;

async function convertAbiFilesRecursive(currentInputDir: string, currentOutputDir: string, rootInputDir: string): Promise<number> {
  let convertedCount = 0;

  // Ensure output directory exists
  await mkdir(currentOutputDir, { recursive: true });

  // Read all entries in the current directory
  const entries = await readdir(currentInputDir, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = join(currentInputDir, entry.name);
    const outputPath = join(currentOutputDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      convertedCount += await convertAbiFilesRecursive(inputPath, outputPath, rootInputDir);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      const tsOutputPath = outputPath.replace(".json", ".ts");
      const relativePath = relative(rootInputDir, inputPath);

      try {
        // Read and parse JSON file
        const inputFile = Bun.file(inputPath);
        const jsonContent = await inputFile.text();
        const abi = JSON.parse(jsonContent);

        // Create TypeScript content
        const tsContent = `export const abi = ${JSON.stringify(abi, null, 2)} as const;`;

        // Write TypeScript file
        const outputFile = Bun.file(tsOutputPath);
        await Bun.write(outputFile, tsContent);

        console.log(`✓ Converted ${relativePath} -> ${relativePath.replace(".json", ".ts")}`);
        convertedCount++;
      } catch (error) {
        console.error(`✗ Error converting ${relativePath}:`, error);
      }
    }
  }

  return convertedCount;
}

async function convertAbiFiles() {
  try {
    console.log(`Converting ABI files from ${inputDir} to ${outputDir}\n`);

    const count = await convertAbiFilesRecursive(inputDir, outputDir, inputDir);

    if (count === 0) {
      console.log("No JSON files found in the input directory.");
    } else {
      console.log(`\nConversion completed! Converted ${count} files.`);
    }
  } catch (error) {
    console.error("Error during conversion:", error);
    process.exit(1);
  }
}

// Run the conversion
convertAbiFiles();
