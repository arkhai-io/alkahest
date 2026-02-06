import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import lunr from "lunr";
import { parseSolidityContracts } from "./parse-solidity.js";
import { parseDeployments } from "./parse-deployments.js";
import { parseSDK } from "./parse-sdk.js";
import { parseGuides } from "./parse-guides.js";
import type { SearchDocument } from "../src/data/types.js";

const GENERATED_DIR = join(import.meta.dir, "../generated");

// Ensure generated directory exists
if (!existsSync(GENERATED_DIR)) {
  mkdirSync(GENERATED_DIR, { recursive: true });
}

console.log("Generating documentation data...\n");

// Parse all sources
const [contracts, deployments, { modules: sdkModules, types: sdkTypes }, guides] = await Promise.all([
  parseSolidityContracts(),
  parseDeployments(),
  parseSDK(),
  parseGuides(),
]);

// Merge deployment addresses into contracts
for (const contract of contracts) {
  const deployedAddresses: Record<string, string> = {};
  for (const deployment of deployments) {
    const contractEntry = deployment.contracts[contract.name];
    if (contractEntry) {
      deployedAddresses[deployment.chainName] = contractEntry.address;
    }
  }
  (contract as any).deployedAddresses = deployedAddresses;
}

// Build search index
console.log("\nBuilding search index...");
const searchDocs: SearchDocument[] = [];

// Add contracts to search
for (const contract of contracts) {
  searchDocs.push({
    id: `contract:${contract.name}`,
    type: "contract",
    title: contract.name,
    content: [
      contract.description || "",
      contract.category,
      contract.subcategory || "",
      contract.schema || "",
      contract.structs.map((s) => `${s.name} ${s.fields.map((f) => f.name).join(" ")}`).join(" "),
      contract.functions.map((f) => f.name).join(" "),
    ].join(" "),
    category: contract.category,
    path: contract.path,
  });
}

// Add SDK modules to search
for (const module of sdkModules) {
  searchDocs.push({
    id: `sdk:${module.name}`,
    type: "sdk",
    title: module.name,
    content: [
      module.description || "",
      module.correspondingContract || "",
      module.methods.map((m) => `${m.name} ${m.description || ""}`).join(" "),
    ].join(" "),
    path: module.path,
  });
}

// Add guides to search
for (const guide of guides) {
  searchDocs.push({
    id: `guide:${guide.path}`,
    type: "guide",
    title: guide.title,
    content: [
      guide.sections.map((s) => `${s.title} ${s.content}`).join(" "),
      guide.referencedContracts.join(" "),
    ].join(" "),
    path: guide.path,
  });
}

// Build lunr index
const searchIndex = lunr(function () {
  this.ref("id");
  this.field("title", { boost: 10 });
  this.field("content");
  this.field("category");

  for (const doc of searchDocs) {
    this.add(doc);
  }
});

// Write all generated files
console.log("\nWriting generated files...");

writeFileSync(join(GENERATED_DIR, "contracts.json"), JSON.stringify(contracts, null, 2));
console.log(`  contracts.json (${contracts.length} contracts)`);

writeFileSync(join(GENERATED_DIR, "deployments.json"), JSON.stringify(deployments, null, 2));
console.log(`  deployments.json (${deployments.length} chains)`);

writeFileSync(
  join(GENERATED_DIR, "sdk.json"),
  JSON.stringify({ modules: sdkModules, types: sdkTypes }, null, 2)
);
console.log(`  sdk.json (${sdkModules.length} modules, ${sdkTypes.length} types)`);

writeFileSync(join(GENERATED_DIR, "guides.json"), JSON.stringify(guides, null, 2));
console.log(`  guides.json (${guides.length} guides)`);

writeFileSync(join(GENERATED_DIR, "search-index.json"), JSON.stringify(searchIndex));
console.log(`  search-index.json (${searchDocs.length} documents)`);

writeFileSync(join(GENERATED_DIR, "search-docs.json"), JSON.stringify(searchDocs, null, 2));
console.log(`  search-docs.json`);

console.log("\nGeneration complete!");
