// Contract documentation types
export interface StructField {
  name: string;
  type: string;
  comment?: string;
}

export interface StructDef {
  name: string;
  fields: StructField[];
}

export interface FunctionParam {
  name: string;
  type: string;
}

export interface FunctionDef {
  name: string;
  visibility: "public" | "external" | "internal" | "private";
  stateMutability?: "pure" | "view" | "payable";
  params: FunctionParam[];
  returns: FunctionParam[];
  natspec?: {
    notice?: string;
    dev?: string;
    params?: Record<string, string>;
    returns?: Record<string, string>;
  };
}

export interface EventDef {
  name: string;
  params: FunctionParam[];
}

export interface ErrorDef {
  name: string;
  params: FunctionParam[];
}

export type ContractCategory =
  | "arbiter"
  | "obligation"
  | "escrow"
  | "payment"
  | "utils"
  | "base"
  | "interface";

export interface ContractDoc {
  name: string;
  path: string;
  category: ContractCategory;
  subcategory?: string;
  description?: string;
  schema?: string;
  inherits: string[];
  implements: string[];
  structs: StructDef[];
  functions: FunctionDef[];
  events: EventDef[];
  errors: ErrorDef[];
}

// SDK documentation types
export interface SDKMethodDoc {
  name: string;
  path: string; // e.g., "erc20.escrow.create"
  description?: string;
  params: { name: string; type: string; description?: string }[];
  returns?: { type: string; description?: string };
  example?: string;
}

export interface SDKTypeDoc {
  name: string;
  definition: string;
  description?: string;
  fields?: { name: string; type: string; description?: string }[];
}

export interface SDKModuleDoc {
  name: string;
  path: string;
  description?: string;
  methods: SDKMethodDoc[];
  correspondingContract?: string;
}

// Deployment types
export interface ChainDeployment {
  chainId?: number;
  chainName: string;
  contracts: Record<
    string,
    {
      address: string;
      txHash?: string;
      blockNumber?: number;
    }
  >;
}

// Guide types
export interface GuideSection {
  title: string;
  content: string;
  codeExamples?: { language: string; code: string }[];
}

export interface GuideDoc {
  title: string;
  path: string;
  sections: GuideSection[];
  referencedContracts: string[];
}

// Search index types
export interface SearchDocument {
  id: string;
  type: "contract" | "sdk" | "guide" | "deployment";
  title: string;
  content: string;
  category?: string;
  path?: string;
}

// Generated data bundle
export interface GeneratedData {
  contracts: ContractDoc[];
  sdk: SDKModuleDoc[];
  deployments: ChainDeployment[];
  guides: GuideDoc[];
}
