---
name: alkahest-user
description: Interact with Alkahest escrow contracts as a buyer, seller, or oracle using the CLI
---

# Alkahest User Skill

## What is Alkahest?

Alkahest is an EAS-based (Ethereum Attestation Service) escrow protocol for trustless exchanges on EVM chains. It enables:

- **Token escrow** with programmable release conditions (ERC20, ERC721, ERC1155, native tokens, bundles)
- **Arbiter-based validation** — release conditions are defined by arbiter contracts that check fulfillment
- **Composable demands** — combine multiple conditions with AND/OR logic
- **Oracle arbitration** — off-chain validation with on-chain decision submission
- **Commit-reveal** — frontrunning protection for self-contained fulfillment data

Supported chains: Base Sepolia, Sepolia, Filecoin Calibration, Ethereum mainnet.

## Roles

| Role | Description |
|------|-------------|
| **Buyer** | Creates escrow with assets + demand (what they want in return) |
| **Seller** | Fulfills the demand to collect escrowed assets |
| **Oracle** | Validates fulfillment and submits on-chain decisions (for TrustedOracleArbiter) |

## CLI Setup

The CLI is at `cli/` in the repo root. Run commands with:

```bash
bun run cli/src/index.ts [global-flags] <command> <subcommand> [options]
```

### Authentication

Provide a wallet via one of (in priority order):

| Method | Flag / Env Var |
|--------|---------------|
| Private key flag | `--private-key 0x...` |
| Mnemonic flag | `--mnemonic "word1 word2 ..."` |
| Ledger USB | `--ledger [--ledger-path <path>]` |
| Private key env | `ALKAHEST_PRIVATE_KEY=0x...` |
| Mnemonic env | `ALKAHEST_MNEMONIC="word1 word2 ..."` |
| Compat env | `PRIVATE_KEY=0x...` |

### Global Flags

```
--chain <name>          base-sepolia (default) | sepolia | filecoin-calibration | ethereum
--rpc-url <url>         Custom RPC URL (overrides chain default)
--human                 Human-readable output (default: JSON)
```

### Output Format

JSON by default (ideal for programmatic/agent use). All BigInts are serialized as strings.

```json
{ "success": true, "data": { "hash": "0x...", "uid": "0x..." } }
{ "success": false, "error": { "code": "ESCROW_CREATE_FAILED", "message": "..." } }
```

Use `--human` for labeled, indented output.

## Buyer Workflow: Create Escrow

### 1. Encode the demand

First, encode the demand data that specifies your release condition:

```bash
# Trusted oracle demand — oracle must approve fulfillment
bun run cli/src/index.ts arbiter encode-demand \
  --type trusted-oracle \
  --oracle 0xORACLE_ADDRESS \
  --data 0x
# Returns: { "success": true, "data": { "encoded": "0x..." } }
```

### 2. Create the escrow

Use the `--arbiter` address and the encoded `--demand` hex from step 1:

```bash
# ERC20 escrow with auto-approve
bun run cli/src/index.ts --private-key 0xKEY escrow create \
  --erc20 \
  --token 0xTOKEN_ADDRESS \
  --amount 1000000000000000000 \
  --arbiter 0xARBITER_ADDRESS \
  --demand 0xENCODED_DEMAND \
  --expiration 1735689600 \
  --approve

# ERC721 escrow
bun run cli/src/index.ts --private-key 0xKEY escrow create \
  --erc721 \
  --token 0xNFT_ADDRESS \
  --token-id 42 \
  --amount 0 \
  --arbiter 0xARBITER_ADDRESS \
  --demand 0xENCODED_DEMAND \
  --expiration 1735689600 \
  --approve

# Native token (ETH) escrow — no approve needed
bun run cli/src/index.ts --private-key 0xKEY escrow create \
  --native \
  --token 0x0000000000000000000000000000000000000000 \
  --amount 500000000000000000 \
  --arbiter 0xARBITER_ADDRESS \
  --demand 0xENCODED_DEMAND \
  --expiration 1735689600
```

Returns `{ "success": true, "data": { "hash": "0x...", "uid": "0x...", ... } }`. Save the `uid` — this is the escrow UID.

### 3. Wait for fulfillment

```bash
bun run cli/src/index.ts --private-key 0xKEY escrow wait \
  --erc20 --uid 0xESCROW_UID
# Blocks until fulfilled. Returns: { payment, fulfillment, fulfiller }
```

### 4. Reclaim expired escrow (if unfulfilled)

```bash
bun run cli/src/index.ts --private-key 0xKEY escrow reclaim \
  --erc20 --uid 0xESCROW_UID
```

### 5. Get escrow details

```bash
bun run cli/src/index.ts --private-key 0xKEY escrow get \
  --erc20 --uid 0xESCROW_UID
```

## Seller Workflow: Fulfill Escrow

### Using StringObligation (off-chain validated work)

```bash
# 1. Create fulfillment referencing the escrow
bun run cli/src/index.ts --private-key 0xKEY string create \
  --item "Here is my completed deliverable" \
  --ref-uid 0xESCROW_UID
# Returns: { uid: "0xFULFILLMENT_UID", ... }

# 2. If escrow uses TrustedOracleArbiter, oracle arbitrates
bun run cli/src/index.ts --private-key 0xORACLE_KEY arbiter arbitrate \
  --obligation 0xFULFILLMENT_UID \
  --demand 0xDEMAND_HEX \
  --decision true

# 3. Collect the escrow
bun run cli/src/index.ts --private-key 0xSELLER_KEY escrow collect \
  --erc20 \
  --escrow-uid 0xESCROW_UID \
  --fulfillment-uid 0xFULFILLMENT_UID
```

### Using barter (token-for-token swap)

```bash
# Create a barter offer: bid ERC20 for ERC20
bun run cli/src/index.ts --private-key 0xKEY barter create \
  --bid-type erc20 --ask-type erc20 \
  --bid-token 0xBID_TOKEN --bid-amount 1000000000000000000 \
  --ask-token 0xASK_TOKEN --ask-amount 2000000000000000000 \
  --expiration 1735689600

# Counterparty fulfills the barter
bun run cli/src/index.ts --private-key 0xCOUNTERPARTY_KEY barter fulfill \
  --uid 0xBARTER_UID \
  --bid-type erc20 --ask-type erc20
```

Supported barter pairs: `erc20/erc20`, `erc20/erc721`, `erc20/erc1155`. Use `--permit` for gasless approval.

## Oracle Workflow: Arbitrate

```bash
# Approve a fulfillment
bun run cli/src/index.ts --private-key 0xORACLE_KEY arbiter arbitrate \
  --obligation 0xFULFILLMENT_UID \
  --demand 0xDEMAND_HEX \
  --decision true

# Reject a fulfillment
bun run cli/src/index.ts --private-key 0xORACLE_KEY arbiter arbitrate \
  --obligation 0xFULFILLMENT_UID \
  --demand 0xDEMAND_HEX \
  --decision false
```

For auto-arbitration (listening for requests and auto-deciding), use the TypeScript SDK directly — see `references/typescript-sdk.md`.

## Commit-Reveal Workflow

Use commit-reveal when fulfillment data is self-contained (e.g., a string answer) to prevent frontrunning.

```bash
# 1. Compute commitment hash
bun run cli/src/index.ts --private-key 0xKEY commit-reveal compute-commitment \
  --ref-uid 0xESCROW_UID \
  --claimer 0xSELLER_ADDRESS \
  --payload 0xPAYLOAD_HEX \
  --salt 0xSALT_HEX \
  --schema 0xSCHEMA_UID
# Returns: { commitment: "0x..." }

# 2. Commit (sends bond as ETH)
bun run cli/src/index.ts --private-key 0xKEY commit-reveal commit \
  --commitment 0xCOMMITMENT_HASH

# 3. Wait at least 1 block, then reveal
bun run cli/src/index.ts --private-key 0xKEY commit-reveal reveal \
  --payload 0xPAYLOAD_HEX \
  --salt 0xSALT_HEX \
  --schema 0xSCHEMA_UID \
  --ref-uid 0xESCROW_UID
# Returns: { uid: "0xOBLIGATION_UID", ... }

# 4. Reclaim bond after successful reveal
bun run cli/src/index.ts --private-key 0xKEY commit-reveal reclaim-bond \
  --uid 0xOBLIGATION_UID

# Check bond amount and deadline
bun run cli/src/index.ts --private-key 0xKEY commit-reveal info

# Slash an unrevealed commitment's bond
bun run cli/src/index.ts --private-key 0xKEY commit-reveal slash-bond \
  --commitment 0xCOMMITMENT_HASH
```

## Encoding Demands

The `arbiter encode-demand` command encodes demand data for any arbiter type:

```bash
# Trusted oracle
bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle \
  --oracle 0xORACLE --data 0x

# IntrinsicsArbiter2 (schema check)
bun run cli/src/index.ts arbiter encode-demand --type intrinsics2 \
  --schema 0xSCHEMA_UID

# Attestation property arbiters
bun run cli/src/index.ts arbiter encode-demand --type recipient --recipient 0xADDRESS
bun run cli/src/index.ts arbiter encode-demand --type attester --attester 0xADDRESS
bun run cli/src/index.ts arbiter encode-demand --type schema --schema 0xSCHEMA_UID
bun run cli/src/index.ts arbiter encode-demand --type time-after --time 1735689600

# Logical composition (AllArbiter / AnyArbiter)
bun run cli/src/index.ts arbiter encode-demand --type all \
  --demands '[{"arbiter":"0xARB1","demand":"0xDEM1"},{"arbiter":"0xARB2","demand":"0xDEM2"}]'

bun run cli/src/index.ts arbiter encode-demand --type any \
  --demands '[{"arbiter":"0xARB1","demand":"0xDEM1"},{"arbiter":"0xARB2","demand":"0xDEM2"}]'
```

Available `--type` values: `trusted-oracle`, `intrinsics2`, `all`, `any`, `recipient`, `attester`, `schema`, `uid`, `ref-uid`, `revocable`, `time-after`, `time-before`, `time-equal`, `expiration-time-after`, `expiration-time-before`, `expiration-time-equal`.

### Decoding demands

```bash
bun run cli/src/index.ts arbiter decode-demand \
  --arbiter 0xARBITER_ADDRESS \
  --demand 0xENCODED_HEX
```

## Confirmation Arbiters

For manual buyer-side approval of fulfillments:

```bash
# Confirm a fulfillment
bun run cli/src/index.ts --private-key 0xBUYER_KEY arbiter confirm \
  --fulfillment 0xFULFILLMENT_UID \
  --escrow 0xESCROW_UID \
  --type exclusive-revocable

# Revoke confirmation (revocable variants only)
bun run cli/src/index.ts --private-key 0xBUYER_KEY arbiter revoke \
  --fulfillment 0xFULFILLMENT_UID \
  --escrow 0xESCROW_UID \
  --type exclusive-revocable
```

Types: `exclusive-revocable`, `exclusive-unrevocable`, `nonexclusive-revocable`, `nonexclusive-unrevocable`.

## Payments

```bash
# ERC20 payment with auto-approve
bun run cli/src/index.ts --private-key 0xKEY payment pay \
  --erc20 \
  --token 0xTOKEN --amount 1000000000000000000 \
  --payee 0xRECIPIENT \
  --approve

# Native token payment
bun run cli/src/index.ts --private-key 0xKEY payment pay \
  --native \
  --token 0x0000000000000000000000000000000000000000 \
  --amount 500000000000000000 \
  --payee 0xRECIPIENT

# Get payment details
bun run cli/src/index.ts --private-key 0xKEY payment get --erc20 --uid 0xUID
```

## Attestations

```bash
# Get raw attestation by UID
bun run cli/src/index.ts --private-key 0xKEY attestation get --uid 0xUID

# Decode attestation data by type
bun run cli/src/index.ts --private-key 0xKEY attestation decode \
  --uid 0xUID --type erc20-escrow
```

Decode types: `erc20-escrow`, `erc20-payment`, `erc721-escrow`, `erc721-payment`, `erc1155-escrow`, `erc1155-payment`, `string`, `commit-reveal`.

## Configuration

```bash
# Show contract addresses for a chain
bun run cli/src/index.ts config show --chain base-sepolia

# List supported chains
bun run cli/src/index.ts config chains
```

## Escrow Types

| Type | Flag | Key options |
|------|------|------------|
| ERC20 | `--erc20` | `--token`, `--amount` |
| ERC721 | `--erc721` | `--token`, `--token-id` |
| ERC1155 | `--erc1155` | `--token`, `--token-id`, `--amount` |
| Native Token | `--native` | `--amount` |
| Token Bundle | `--bundle` | (SDK only for create) |

All escrow types share the same workflow: create -> wait -> collect (or reclaim if expired).

## Additional Resources

- See `references/typescript-sdk.md` for TypeScript SDK usage (complex workflows, auto-arbitration, bundle escrows)
- See `references/contracts.md` for all contract addresses and obligation data schemas
- See `references/arbiters.md` for all arbiter types and demand encoding patterns
