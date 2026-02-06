#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  loadContracts,
  loadDeployments,
  loadSDK,
  loadGuides,
  getContract,
  getDeployment,
  getGuide,
  getSDKModule,
} from "./data/loader.js";
import { search } from "./search/index.js";

const server = new Server(
  {
    name: "alkahest-docs",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_docs",
      description:
        "Search Alkahest documentation including contracts, SDK methods, and guides. Use this to find relevant information for a specific topic.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (e.g., 'ERC20 escrow', 'oracle validation', 'token trading')",
          },
          type: {
            type: "string",
            enum: ["contract", "sdk", "guide", "all"],
            description: "Filter results by type (default: all)",
          },
          limit: {
            type: "number",
            description: "Maximum number of results (default: 10)",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_contract",
      description:
        "Get detailed documentation for a specific Alkahest smart contract including its functions, events, errors, and deployed addresses.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Contract name (e.g., 'ERC20EscrowObligation', 'TrustedOracleArbiter')",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "list",
      description:
        "List Alkahest contracts or SDK modules by category. Use this to explore available functionality.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["contract", "sdk"],
            description: "What to list: 'contract' for smart contracts, 'sdk' for SDK modules",
          },
          category: {
            type: "string",
            description:
              "For contracts: 'arbiter', 'escrow', 'payment', 'utils', 'base'. For SDK: 'arbiters', 'erc20', 'erc721', etc.",
          },
        },
        required: ["type"],
      },
    },
    {
      name: "get_deployment",
      description: "Get deployed contract addresses for a specific blockchain network.",
      inputSchema: {
        type: "object",
        properties: {
          chain: {
            type: "string",
            description: "Chain name (e.g., 'base-sepolia', 'filecoin', 'monad')",
          },
        },
        required: ["chain"],
      },
    },
    {
      name: "get_sdk_method",
      description: "Get documentation for SDK module methods.",
      inputSchema: {
        type: "object",
        properties: {
          module: {
            type: "string",
            description: "Module name (e.g., 'erc20', 'arbiters.general', 'nativeToken')",
          },
        },
        required: ["module"],
      },
    },
    {
      name: "get_guide",
      description: "Get a documentation guide by topic.",
      inputSchema: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description:
              "Guide topic (e.g., 'escrow', 'token trading', 'arbiters', 'oracle')",
          },
        },
        required: ["topic"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const toolArgs = args || {};

  try {
    switch (name) {
      case "search_docs": {
        const results = search(toolArgs.query as string, {
          type: toolArgs.type as any,
          limit: (toolArgs.limit as number) || 10,
        });

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No results found for "${toolArgs.query}". Try different keywords or browse with the 'list' tool.`,
              },
            ],
          };
        }

        const formatted = results.map((r) => ({
          type: r.type,
          name: r.title,
          category: r.category,
          relevance: Math.round(r.score * 100) / 100,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(formatted, null, 2),
            },
          ],
        };
      }

      case "get_contract": {
        const contract = getContract(toolArgs.name as string);
        if (!contract) {
          return {
            content: [
              {
                type: "text",
                text: `Contract "${toolArgs.name}" not found. Use 'list' with type='contract' to see available contracts.`,
              },
            ],
          };
        }

        // Format contract info
        const info = {
          name: contract.name,
          category: contract.category,
          subcategory: contract.subcategory,
          description: contract.description,
          path: contract.path,
          schema: contract.schema,
          inherits: contract.inherits,
          implements: contract.implements,
          deployedAddresses: (contract as any).deployedAddresses,
          structs: contract.structs,
          functions: contract.functions.map((f) => ({
            name: f.name,
            visibility: f.visibility,
            stateMutability: f.stateMutability,
            params: f.params,
            returns: f.returns,
          })),
          events: contract.events,
          errors: contract.errors,
        };

        return {
          content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
        };
      }

      case "list": {
        if (toolArgs.type === "contract") {
          const contracts = loadContracts();
          let filtered = contracts;

          if (toolArgs.category) {
            const cat = (toolArgs.category as string).toLowerCase();
            filtered = contracts.filter(
              (c) =>
                c.category.toLowerCase() === cat ||
                c.subcategory?.toLowerCase() === cat
            );
          }

          const list = filtered.map((c) => ({
            name: c.name,
            category: c.category,
            subcategory: c.subcategory,
            description: c.description?.slice(0, 100),
          }));

          return {
            content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
          };
        }

        if (toolArgs.type === "sdk") {
          const { modules } = loadSDK();
          let filtered = modules;

          if (toolArgs.category) {
            const cat = (toolArgs.category as string).toLowerCase();
            filtered = modules.filter((m) =>
              m.name.toLowerCase().includes(cat)
            );
          }

          const list = filtered.map((m) => ({
            name: m.name,
            path: m.path,
            methodCount: m.methods.length,
            correspondingContract: m.correspondingContract,
          }));

          return {
            content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: "Invalid type. Use 'contract' or 'sdk'.",
            },
          ],
        };
      }

      case "get_deployment": {
        const deployment = getDeployment(toolArgs.chain as string);
        if (!deployment) {
          const deployments = loadDeployments();
          const chains = deployments.map((d) => d.chainName).join(", ");
          return {
            content: [
              {
                type: "text",
                text: `Chain "${toolArgs.chain}" not found. Available chains: ${chains}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  chainName: deployment.chainName,
                  chainId: deployment.chainId,
                  contracts: deployment.contracts,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_sdk_method": {
        const module = getSDKModule(toolArgs.module as string);
        if (!module) {
          const { modules } = loadSDK();
          const names = modules.map((m) => m.name).join(", ");
          return {
            content: [
              {
                type: "text",
                text: `Module "${toolArgs.module}" not found. Available modules: ${names}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  name: module.name,
                  path: module.path,
                  correspondingContract: module.correspondingContract,
                  methods: module.methods,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_guide": {
        const guide = getGuide(toolArgs.topic as string);
        if (!guide) {
          const guides = loadGuides();
          const titles = guides.map((g) => g.title).join("\n  - ");
          return {
            content: [
              {
                type: "text",
                text: `Guide for "${toolArgs.topic}" not found. Available guides:\n  - ${titles}`,
              },
            ],
          };
        }

        // Return guide with full content
        const output = {
          title: guide.title,
          path: guide.path,
          referencedContracts: guide.referencedContracts,
          sections: guide.sections.map((s) => ({
            title: s.title,
            content: s.content.slice(0, 500) + (s.content.length > 500 ? "..." : ""),
            codeExamples: s.codeExamples?.length || 0,
          })),
        };

        return {
          content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
        };
      }

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// List resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const guides = loadGuides();
  const deployments = loadDeployments();

  return {
    resources: [
      ...guides.map((g) => ({
        uri: `alkahest://guides/${g.path}`,
        name: g.title,
        description: `Documentation guide: ${g.title}`,
        mimeType: "text/markdown",
      })),
      ...deployments.map((d) => ({
        uri: `alkahest://deployments/${d.chainName.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${d.chainName} Deployments`,
        description: `Contract addresses for ${d.chainName}`,
        mimeType: "application/json",
      })),
    ],
  };
});

// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri.startsWith("alkahest://guides/")) {
    const path = uri.replace("alkahest://guides/", "");
    const guide = getGuide(path);
    if (guide) {
      // Reconstruct markdown-like content
      const content = guide.sections
        .map((s) => {
          let text = `## ${s.title}\n\n${s.content}`;
          if (s.codeExamples) {
            for (const ex of s.codeExamples) {
              text += `\n\n\`\`\`${ex.language}\n${ex.code}\n\`\`\``;
            }
          }
          return text;
        })
        .join("\n\n");

      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: `# ${guide.title}\n\n${content}`,
          },
        ],
      };
    }
  }

  if (uri.startsWith("alkahest://deployments/")) {
    const chainSlug = uri.replace("alkahest://deployments/", "");
    const deployment = getDeployment(chainSlug);
    if (deployment) {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(deployment, null, 2),
          },
        ],
      };
    }
  }

  throw new Error(`Resource not found: ${uri}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Alkahest Docs MCP Server running on stdio");
}

main().catch(console.error);
