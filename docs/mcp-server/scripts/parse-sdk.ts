import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative, basename, dirname } from "path";
import type { SDKModuleDoc, SDKMethodDoc, SDKTypeDoc } from "../src/data/types.js";

const SDK_DIR = join(import.meta.dir, "../../../sdks/ts/src");
const CLIENTS_DIR = join(SDK_DIR, "clients");

// Extract JSDoc comment before a declaration
function extractJSDoc(content: string, position: number): string | undefined {
  // Look backwards from position for a JSDoc comment
  const beforeContent = content.slice(0, position);
  const match = beforeContent.match(/\/\*\*\s*([\s\S]*?)\s*\*\/\s*$/);
  if (match) {
    // Clean up the JSDoc
    return match[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .filter((line) => !line.startsWith("@"))
      .join(" ")
      .trim();
  }
  return undefined;
}

// Extract method info from a makeXxxClient return object
function extractClientMethods(content: string): SDKMethodDoc[] {
  const methods: SDKMethodDoc[] = [];

  // Find the return block of makeXxxClient functions (handle nested braces)
  // Find "return {" and extract until the matching closing brace
  const returnStart = content.indexOf("return {");
  if (returnStart === -1) return methods;

  // Find the matching closing brace
  let braceCount = 0;
  let returnEnd = returnStart;
  let inBraces = false;

  for (let i = returnStart; i < content.length; i++) {
    if (content[i] === "{") {
      braceCount++;
      inBraces = true;
    } else if (content[i] === "}") {
      braceCount--;
      if (inBraces && braceCount === 0) {
        returnEnd = i + 1;
        break;
      }
    }
  }

  const returnContent = content.slice(returnStart, returnEnd);

  // Extract method names with their JSDoc descriptions
  // Pattern: /** JSDoc */ methodName: async (params) => or methodName,
  const methodPattern = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*)?(\w+):\s*(?:async\s*)?\([^)]*\)\s*=>/g;
  let match;

  while ((match = methodPattern.exec(returnContent)) !== null) {
    const jsdoc = match[1];
    const methodName = match[2];
    // Skip internal/utility names
    if (methodName === "address" || methodName.startsWith("_")) continue;

    // Parse JSDoc description
    let description: string | undefined;
    if (jsdoc) {
      description = jsdoc
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, "").trim())
        .filter((line) => line && !line.startsWith("@"))
        .join(" ")
        .trim();
    }

    methods.push({
      name: methodName,
      path: "",
      description,
      params: [],
    });
  }

  // Also look for methods that are just references (e.g., "methodName," or "methodName: someFunction,")
  const refPattern = /(\w+),\s*$/gm;
  while ((match = refPattern.exec(returnContent)) !== null) {
    const methodName = match[1];
    // Skip if already added or if internal
    if (methods.some(m => m.name === methodName)) continue;
    if (methodName === "address" || methodName.startsWith("_")) continue;

    methods.push({
      name: methodName,
      path: "",
      params: [],
    });
  }

  return methods;
}

// Extract exported types with their descriptions
function extractTypes(content: string): SDKTypeDoc[] {
  const types: SDKTypeDoc[] = [];

  // Pattern: export type TypeName = { ... }
  const typePattern = /(?:\/\*\*[\s\S]*?\*\/\s*)?export\s+type\s+(\w+)\s*=\s*([^;]+);/g;
  let match;

  while ((match = typePattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const typeName = match[1];
    const typeDefinition = match[2].trim();

    // Extract JSDoc if present
    const jsdocMatch = fullMatch.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
    const description = jsdocMatch
      ? jsdocMatch[1]
          .split("\n")
          .map((line) => line.replace(/^\s*\*\s?/, "").trim())
          .filter((line) => line && !line.startsWith("@"))
          .join(" ")
          .trim()
      : undefined;

    types.push({
      name: typeName,
      definition: typeDefinition.length > 200 ? typeDefinition.slice(0, 200) + "..." : typeDefinition,
      description,
    });
  }

  return types;
}

// Extract exported functions with their descriptions
function extractFunctions(content: string): SDKMethodDoc[] {
  const methods: SDKMethodDoc[] = [];

  // Pattern: export const functionName = (params) => or export function functionName(params)
  const fnPattern =
    /(?:\/\*\*[\s\S]*?\*\/\s*)?export\s+(?:const\s+(\w+)\s*=\s*(?:async\s*)?\(([^)]*)\)|function\s+(\w+)\s*\(([^)]*)\))/g;
  let match;

  while ((match = fnPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const fnName = match[1] || match[3];
    const paramsStr = match[2] || match[4];

    // Skip makeXxx client factory functions (handled separately)
    if (fnName.startsWith("make") && fnName.endsWith("Client")) continue;
    // Skip internal functions
    if (fnName.startsWith("_") || fnName === "pick") continue;

    // Extract JSDoc if present
    const jsdocMatch = fullMatch.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
    const description = jsdocMatch
      ? jsdocMatch[1]
          .split("\n")
          .map((line) => line.replace(/^\s*\*\s?/, "").trim())
          .filter((line) => line && !line.startsWith("@"))
          .join(" ")
          .trim()
      : undefined;

    // Parse params
    const params = paramsStr
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p)
      .map((p) => {
        const [name, type] = p.split(":").map((s) => s.trim());
        return { name: name || "", type: type || "unknown" };
      });

    methods.push({
      name: fnName,
      path: "",
      description,
      params,
    });
  }

  return methods;
}

// Parse a single module directory
function parseModule(modulePath: string, moduleName: string): SDKModuleDoc | null {
  const indexPath = join(modulePath, "index.ts");
  if (!existsSync(indexPath)) return null;

  const content = readFileSync(indexPath, "utf-8");

  // Extract client type to determine submodules
  const clientTypeMatch = content.match(/export\s+type\s+\w+Client\s*=\s*\{([^}]+)\}/);
  const submodules: string[] = [];
  if (clientTypeMatch) {
    const typeContent = clientTypeMatch[1];
    const submodulePattern = /(\w+):\s*\w+Client/g;
    let match;
    while ((match = submodulePattern.exec(typeContent)) !== null) {
      submodules.push(match[1]);
    }
  }

  // Extract types and functions
  const types = extractTypes(content);
  const functions = extractFunctions(content);

  // If this module has submodules, we might want to recurse
  const methods: SDKMethodDoc[] = [...functions];

  // For each submodule, check if there's a directory with more methods
  for (const sub of submodules) {
    const subPath = join(modulePath, sub);
    if (existsSync(subPath) && statSync(subPath).isDirectory()) {
      const subModule = parseModule(subPath, `${moduleName}.${sub}`);
      if (subModule) {
        // Add prefixed methods
        for (const m of subModule.methods) {
          methods.push({
            ...m,
            name: `${sub}.${m.name}`,
          });
        }
      }
    } else {
      // Check for a file like submodule.ts
      const subFilePath = join(modulePath, `${sub}.ts`);
      if (existsSync(subFilePath)) {
        const subContent = readFileSync(subFilePath, "utf-8");
        const subMethods = extractClientMethods(subContent);
        for (const m of subMethods) {
          methods.push({
            ...m,
            name: `${sub}.${m.name}`,
          });
        }
      }
    }
  }

  // Also check for index.ts client methods
  const indexMethods = extractClientMethods(content);
  methods.push(...indexMethods);

  // Determine corresponding contract
  let correspondingContract: string | undefined;
  if (moduleName.includes("erc20")) correspondingContract = "ERC20EscrowObligation";
  else if (moduleName.includes("erc721")) correspondingContract = "ERC721EscrowObligation";
  else if (moduleName.includes("erc1155")) correspondingContract = "ERC1155EscrowObligation";
  else if (moduleName.includes("nativeToken")) correspondingContract = "NativeTokenEscrowObligation";
  else if (moduleName.includes("bundle") || moduleName.includes("tokenBundle"))
    correspondingContract = "TokenBundleEscrowObligation";
  else if (moduleName.includes("attestation")) correspondingContract = "AttestationEscrowObligation";

  return {
    name: moduleName,
    path: relative(SDK_DIR, modulePath),
    methods,
    correspondingContract,
  };
}

// Parse the arbiters hierarchy
function parseArbitersModule(): SDKModuleDoc[] {
  const modules: SDKModuleDoc[] = [];
  const arbitersDir = join(CLIENTS_DIR, "arbiters");

  if (!existsSync(arbitersDir)) return modules;

  // Parse the main arbiters categories
  const categories = ["general", "logical", "attestationProperties", "confirmation"];

  for (const category of categories) {
    const categoryDir = join(arbitersDir, category);
    if (!existsSync(categoryDir)) continue;

    const indexPath = join(categoryDir, "index.ts");
    if (!existsSync(indexPath)) continue;

    const content = readFileSync(indexPath, "utf-8");
    const methods: SDKMethodDoc[] = [];

    // Look for import statements to find source files with client factories
    // Pattern: import { makeXxxClient } from "./filename"
    const importPattern = /import\s*\{\s*make(\w+)Client[^}]*\}\s*from\s*["']\.\/(\w+)["']/g;
    let match;

    while ((match = importPattern.exec(content)) !== null) {
      const clientName = match[1];
      const fileName = match[2];

      // Build the file path
      const filePath = join(categoryDir, `${fileName}.ts`);
      if (existsSync(filePath)) {
        const fileContent = readFileSync(filePath, "utf-8");
        const fileMethods = extractClientMethods(fileContent);

        // Determine a short name for the arbiter
        const shortName = clientName.replace(/Arbiter$/, "").toLowerCase();

        for (const m of fileMethods) {
          methods.push({
            ...m,
            name: `${shortName}.${m.name}`,
          });
        }
      }
    }

    modules.push({
      name: `arbiters.${category}`,
      path: relative(SDK_DIR, categoryDir),
      methods,
    });
  }

  return modules;
}

// Parse the obligations hierarchy
function parseObligationsModule(): SDKModuleDoc[] {
  const modules: SDKModuleDoc[] = [];
  const obligationsDir = join(CLIENTS_DIR, "obligations");

  if (!existsSync(obligationsDir)) return modules;

  const tokenTypes = ["erc20", "erc721", "erc1155", "nativeToken", "tokenBundle", "attestation", "string"];

  for (const tokenType of tokenTypes) {
    const tokenDir = join(obligationsDir, tokenType);
    if (!existsSync(tokenDir)) continue;

    const module = parseModule(tokenDir, tokenType);
    if (module) {
      modules.push(module);
    }
  }

  return modules;
}

// Parse types.ts for main type definitions
function parseMainTypes(): SDKTypeDoc[] {
  const typesPath = join(SDK_DIR, "types.ts");
  if (!existsSync(typesPath)) return [];

  const content = readFileSync(typesPath, "utf-8");
  return extractTypes(content);
}

// Main export function
export async function parseSDK(): Promise<{ modules: SDKModuleDoc[]; types: SDKTypeDoc[] }> {
  const modules: SDKModuleDoc[] = [];

  // Parse arbiters
  modules.push(...parseArbitersModule());

  // Parse obligations
  modules.push(...parseObligationsModule());

  // Parse main types
  const types = parseMainTypes();

  console.log(`Parsed ${modules.length} SDK modules and ${types.length} types`);
  return { modules, types };
}

// Run directly for testing
if (import.meta.main) {
  const { modules, types } = await parseSDK();
  console.log("\nModules:");
  for (const mod of modules) {
    console.log(`  ${mod.name}: ${mod.methods.length} methods`);
    if (mod.methods.length > 0) {
      console.log(`    Methods: ${mod.methods.map(m => m.name).join(", ")}`);
    }
  }
  console.log(`\nTypes: ${types.length} total`);
}
