import * as parser from "@solidity-parser/parser";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, basename, dirname } from "path";
import type {
  ContractDoc,
  ContractCategory,
  StructDef,
  FunctionDef,
  EventDef,
  ErrorDef,
  FunctionParam,
} from "../src/data/types.js";

const CONTRACTS_DIR = join(import.meta.dir, "../../../contracts/src");

// Recursively get all .sol files
function getSolidityFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getSolidityFiles(fullPath));
    } else if (entry.endsWith(".sol")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Determine contract category from path and content
function categorizeContract(
  path: string,
  contractName: string,
  inherits: string[]
): { category: ContractCategory; subcategory?: string } {
  const relativePath = relative(CONTRACTS_DIR, path);

  // Interfaces
  if (contractName.startsWith("I") && contractName[1] === contractName[1].toUpperCase()) {
    return { category: "interface" };
  }

  // Base contracts
  if (contractName.startsWith("Base")) {
    return { category: "base" };
  }

  // Arbiters
  if (relativePath.startsWith("arbiters/") || contractName.endsWith("Arbiter")) {
    let subcategory: string | undefined;
    if (relativePath.includes("logical/")) subcategory = "logical";
    else if (relativePath.includes("confirmation/")) subcategory = "confirmation";
    else if (relativePath.includes("attestation-properties/")) subcategory = "attestation-properties";
    else if (relativePath.includes("example/")) subcategory = "example";
    return { category: "arbiter", subcategory };
  }

  // Utils
  if (relativePath.startsWith("utils/") || contractName.endsWith("Utils")) {
    return { category: "utils" };
  }

  // Obligations
  if (relativePath.startsWith("obligations/")) {
    if (relativePath.includes("escrow/")) {
      return { category: "escrow", subcategory: relativePath.includes("tierable/") ? "tierable" : "non-tierable" };
    }
    if (relativePath.includes("payment/")) {
      return { category: "payment" };
    }
    return { category: "obligation" };
  }

  // Check inheritance for hints
  if (inherits.some((i) => i.includes("Escrow"))) {
    return { category: "escrow" };
  }
  if (inherits.some((i) => i.includes("Payment"))) {
    return { category: "payment" };
  }
  if (inherits.some((i) => i.includes("Arbiter"))) {
    return { category: "arbiter" };
  }

  return { category: "obligation" };
}

// Extract params from AST node
function extractParams(params: any[]): FunctionParam[] {
  return params.map((p) => ({
    name: p.name || "",
    type: formatType(p.typeName),
  }));
}

// Format type from AST
function formatType(typeName: any): string {
  if (!typeName) return "unknown";

  switch (typeName.type) {
    case "ElementaryTypeName":
      return typeName.name;
    case "UserDefinedTypeName":
      return typeName.namePath;
    case "ArrayTypeName":
      return `${formatType(typeName.baseTypeName)}[]`;
    case "Mapping":
      return `mapping(${formatType(typeName.keyType)} => ${formatType(typeName.valueType)})`;
    default:
      return typeName.name || "unknown";
  }
}

// Extract struct definition
function extractStruct(node: any): StructDef {
  return {
    name: node.name,
    fields: node.members.map((m: any) => ({
      name: m.name,
      type: formatType(m.typeName),
    })),
  };
}

// Extract function definition
function extractFunction(node: any): FunctionDef {
  const visibility = node.visibility || "public";
  const stateMutability = node.stateMutability;

  return {
    name: node.name || (node.isConstructor ? "constructor" : "fallback"),
    visibility: visibility as FunctionDef["visibility"],
    stateMutability: stateMutability as FunctionDef["stateMutability"],
    params: extractParams(node.parameters || []),
    returns: extractParams(node.returnParameters || []),
  };
}

// Extract event definition
function extractEvent(node: any): EventDef {
  return {
    name: node.name,
    params: extractParams(node.parameters || []),
  };
}

// Extract error definition
function extractError(node: any): ErrorDef {
  return {
    name: node.name,
    params: extractParams(node.parameters || []),
  };
}

// Extract NatSpec comments
function extractNatSpec(comments: any[]): {
  notice?: string;
  dev?: string;
  title?: string;
  params?: Record<string, string>;
  returns?: Record<string, string>;
} {
  if (!comments || comments.length === 0) return {};

  const result: ReturnType<typeof extractNatSpec> = {};

  for (const comment of comments) {
    if (comment.type !== "NatSpecMultiLine") continue;

    const lines = comment.value.split("\n");
    for (const line of lines) {
      const trimmed = line.trim().replace(/^\*\s*/, "");

      if (trimmed.startsWith("@title ")) {
        result.title = trimmed.slice(7).trim();
      } else if (trimmed.startsWith("@notice ")) {
        result.notice = (result.notice ? result.notice + " " : "") + trimmed.slice(8).trim();
      } else if (trimmed.startsWith("@dev ")) {
        result.dev = (result.dev ? result.dev + " " : "") + trimmed.slice(5).trim();
      } else if (trimmed.startsWith("@param ")) {
        const match = trimmed.slice(7).match(/^(\w+)\s+(.*)/);
        if (match) {
          result.params = result.params || {};
          result.params[match[1]] = match[2];
        }
      } else if (trimmed.startsWith("@return ")) {
        const match = trimmed.slice(8).match(/^(\w+)\s+(.*)/);
        if (match) {
          result.returns = result.returns || {};
          result.returns[match[1]] = match[2];
        }
      }
    }
  }

  return result;
}

// Extract schema string from constructor
function extractSchema(constructorNode: any, source: string): string | undefined {
  if (!constructorNode) return undefined;

  // Look for string literal in constructor body that looks like a schema
  // Pattern: "address arbiter, bytes demand, ..."
  const match = source.match(/"([^"]*address[^"]*,\s*[^"]+)"/);
  if (match) {
    return match[1];
  }

  return undefined;
}

// Parse a single Solidity file
function parseFile(filePath: string): ContractDoc[] {
  const source = readFileSync(filePath, "utf-8");
  const contracts: ContractDoc[] = [];

  try {
    const ast = parser.parse(source, {
      tolerant: true,
      loc: true,
      range: true,
    });

    for (const node of ast.children) {
      if (node.type !== "ContractDefinition") continue;

      const inherits = (node.baseContracts || []).map((bc: any) => bc.baseName.namePath);
      const implementsList = inherits.filter((i: string) => i.startsWith("I"));

      const { category, subcategory } = categorizeContract(filePath, node.name, inherits);

      const structs: StructDef[] = [];
      const functions: FunctionDef[] = [];
      const events: EventDef[] = [];
      const errors: ErrorDef[] = [];
      let constructorNode: any = null;

      for (const subNode of node.subNodes || []) {
        switch (subNode.type) {
          case "StructDefinition":
            structs.push(extractStruct(subNode));
            break;
          case "FunctionDefinition":
            if (subNode.isConstructor) {
              constructorNode = subNode;
            }
            // Only include public/external functions
            if (["public", "external"].includes(subNode.visibility || "public")) {
              functions.push(extractFunction(subNode));
            }
            break;
          case "EventDefinition":
            events.push(extractEvent(subNode));
            break;
          case "CustomErrorDefinition":
            errors.push(extractError(subNode));
            break;
        }
      }

      // Extract NatSpec from contract-level comments
      const natspec = extractNatSpec((node as any).comments || []);
      const schema = extractSchema(constructorNode, source);

      contracts.push({
        name: node.name,
        path: relative(CONTRACTS_DIR, filePath),
        category,
        subcategory,
        description: natspec.notice || natspec.title,
        schema,
        inherits: inherits.filter((i: string) => !i.startsWith("I")),
        implements: implementsList,
        structs,
        functions,
        events,
        errors,
      });
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
  }

  return contracts;
}

// Main export function
export async function parseSolidityContracts(): Promise<ContractDoc[]> {
  const files = getSolidityFiles(CONTRACTS_DIR);
  const contracts: ContractDoc[] = [];

  for (const file of files) {
    contracts.push(...parseFile(file));
  }

  // Sort by category and name
  contracts.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  console.log(`Parsed ${contracts.length} contracts from ${files.length} files`);
  return contracts;
}

// Run directly for testing
if (import.meta.main) {
  const contracts = await parseSolidityContracts();
  console.log(JSON.stringify(contracts.slice(0, 3), null, 2));
}
