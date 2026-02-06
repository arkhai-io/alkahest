import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import lunr from "lunr";
import type {
  ContractDoc,
  ChainDeployment,
  SDKModuleDoc,
  SDKTypeDoc,
  GuideDoc,
  SearchDocument,
} from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_DIR = join(__dirname, "../../generated");

// Cache for loaded data
let contractsCache: ContractDoc[] | null = null;
let deploymentsCache: ChainDeployment[] | null = null;
let sdkCache: { modules: SDKModuleDoc[]; types: SDKTypeDoc[] } | null = null;
let guidesCache: GuideDoc[] | null = null;
let searchIndexCache: lunr.Index | null = null;
let searchDocsCache: SearchDocument[] | null = null;

export function loadContracts(): ContractDoc[] {
  if (!contractsCache) {
    const data = readFileSync(join(GENERATED_DIR, "contracts.json"), "utf-8");
    contractsCache = JSON.parse(data);
  }
  return contractsCache!;
}

export function loadDeployments(): ChainDeployment[] {
  if (!deploymentsCache) {
    const data = readFileSync(join(GENERATED_DIR, "deployments.json"), "utf-8");
    deploymentsCache = JSON.parse(data);
  }
  return deploymentsCache!;
}

export function loadSDK(): { modules: SDKModuleDoc[]; types: SDKTypeDoc[] } {
  if (!sdkCache) {
    const data = readFileSync(join(GENERATED_DIR, "sdk.json"), "utf-8");
    sdkCache = JSON.parse(data);
  }
  return sdkCache!;
}

export function loadGuides(): GuideDoc[] {
  if (!guidesCache) {
    const data = readFileSync(join(GENERATED_DIR, "guides.json"), "utf-8");
    guidesCache = JSON.parse(data);
  }
  return guidesCache!;
}

export function loadSearchIndex(): lunr.Index {
  if (!searchIndexCache) {
    const data = readFileSync(join(GENERATED_DIR, "search-index.json"), "utf-8");
    searchIndexCache = lunr.Index.load(JSON.parse(data));
  }
  return searchIndexCache!;
}

export function loadSearchDocs(): SearchDocument[] {
  if (!searchDocsCache) {
    const data = readFileSync(join(GENERATED_DIR, "search-docs.json"), "utf-8");
    searchDocsCache = JSON.parse(data);
  }
  return searchDocsCache!;
}

// Helper to get a contract by name
export function getContract(name: string): ContractDoc | undefined {
  const contracts = loadContracts();
  return contracts.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

// Helper to get deployment for a chain
export function getDeployment(chainName: string): ChainDeployment | undefined {
  const deployments = loadDeployments();
  return deployments.find(
    (d) => d.chainName.toLowerCase().includes(chainName.toLowerCase())
  );
}

// Helper to get a guide by path or title
export function getGuide(identifier: string): GuideDoc | undefined {
  const guides = loadGuides();
  const lower = identifier.toLowerCase();
  return guides.find(
    (g) =>
      g.path.toLowerCase().includes(lower) ||
      g.title.toLowerCase().includes(lower)
  );
}

// Helper to get SDK module by name
export function getSDKModule(name: string): SDKModuleDoc | undefined {
  const { modules } = loadSDK();
  const lower = name.toLowerCase();
  return modules.find(
    (m) => m.name.toLowerCase().includes(lower)
  );
}
