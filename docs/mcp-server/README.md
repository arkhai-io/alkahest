# Alkahest Docs MCP Server

An MCP (Model Context Protocol) server that provides intelligent documentation access for the Alkahest protocol. Goes beyond static docs by extracting structured knowledge from contracts, SDK, and deployments.

## Features

- **Smart Search**: Full-text search across contracts, SDK modules, and guides
- **Contract Documentation**: Detailed info including functions, events, errors, schemas, and deployed addresses
- **SDK Documentation**: Client method listings with hierarchical module structure
- **Deployment Info**: Contract addresses per chain (Base Sepolia, Filecoin Calibration, Monad)
- **Guide Access**: Documentation guides with code examples

## Quick Setup (Copy-Paste)

**Claude Code:**
```bash
claude mcp add alkahest-docs -- npx alkahest-mcp
```

**Cursor / Windsurf / Other MCP Clients:**
```bash
npx @anthropic-ai/mcp-cli add alkahest-docs -- npx alkahest-mcp
```

### Manual Config

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "alkahest-docs": {
      "command": "npx",
      "args": ["alkahest-mcp"]
    }
  }
}
```

**Claude Code** (`~/.claude/settings.json`):
```json
{
  "mcpServers": {
    "alkahest-docs": {
      "command": "npx",
      "args": ["alkahest-mcp"]
    }
  }
}
```

## Development

```bash
cd docs/mcp-server
bun install
bun run generate  # Extract documentation data
bun run build     # Compile TypeScript
bun run dev       # Run in dev mode
```

## Available Tools

### `search_docs`
Search across all documentation.

```json
{
  "query": "ERC20 escrow",
  "type": "contract",  // optional: contract, sdk, guide, all
  "limit": 10         // optional
}
```

### `get_contract`
Get detailed contract documentation.

```json
{
  "name": "ERC20EscrowObligation"
}
```

### `list`
List contracts or SDK modules by category.

```json
{
  "type": "contract",
  "category": "arbiter"  // optional: arbiter, escrow, payment, utils
}
```

### `get_deployment`
Get contract addresses for a chain.

```json
{
  "chain": "base-sepolia"
}
```

### `get_sdk_method`
Get SDK module documentation.

```json
{
  "module": "erc20"
}
```

### `get_guide`
Get a documentation guide.

```json
{
  "topic": "token trading"
}
```

## Architecture

```
docs/mcp-server/
├── scripts/           # Data extraction
│   ├── generate.ts    # Main generation script
│   ├── parse-solidity.ts
│   ├── parse-sdk.ts
│   ├── parse-deployments.ts
│   └── parse-guides.ts
├── src/
│   ├── index.ts       # MCP server
│   ├── data/          # Data loading
│   └── search/        # Search engine
└── generated/         # Build output (gitignored)
```
