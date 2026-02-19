---
name: alkahest-user
description: Interact with Alkahest escrow contracts as a buyer, seller, or oracle using the TypeScript SDK
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

## Setup

```typescript
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { makeClient } from "@alkahest/ts-sdk";

const walletClient = createWalletClient({
  account: privateKeyToAccount("0xYOUR_PRIVATE_KEY"),
  chain: baseSepolia,
  transport: http("https://your-rpc-url"),
});

const client = makeClient(walletClient);
```

The client auto-detects the chain and loads the correct contract addresses. To use custom addresses, pass them as the second argument to `makeClient`.

## Buyer Workflow: Create Escrow

### 1. Approve tokens (if ERC20/ERC721/ERC1155)

```typescript
await client.erc20.util.approve(
  { address: TOKEN_ADDRESS, value: amount },
  "escrow"
);
```

### 2. Encode your demand

The demand specifies what fulfillment you require. Choose an arbiter and encode its demand data:

```typescript
// Example: require fulfillment validated by a trusted oracle
const demand = {
  arbiter: client.contractAddresses.trustedOracleArbiter,
  demand: client.arbiters.general.trustedOracle.encodeDemand({
    oracle: ORACLE_ADDRESS,
    data: "0x", // optional extra data for the oracle
  }),
};
```

### 3. Create the escrow

```typescript
const { hash, attested } = await client.erc20.escrow.nonTierable.doObligation(
  client.erc20.escrow.nonTierable.encodeObligationRaw({
    token: TOKEN_ADDRESS,
    amount: parseEther("1.0"),
    arbiter: demand.arbiter,
    demand: demand.demand,
  }),
);
const escrowUid = attested.uid;
```

### 4. Wait for fulfillment

```typescript
const result = await client.waitForFulfillment(
  client.contractAddresses.erc20EscrowObligation,
  escrowUid,
);
// result contains: { payment, fulfillment, fulfiller }
```

### 5. Reclaim expired escrow (if unfulfilled)

```typescript
// Only works after the escrow's expirationTime has passed
// Not available via SDK helper — call the contract directly if needed
```

## Seller Workflow: Fulfill Escrow

### Using StringObligation (off-chain validated work)

```typescript
// 1. Create fulfillment referencing the escrow
const { hash, attested } = await client.stringObligation.doObligation(
  "Here is my completed deliverable",
  undefined, // schema (optional)
  escrowUid,  // refUID — links to the escrow
);

// 2. If escrow uses TrustedOracleArbiter, request arbitration
await client.arbiters.general.trustedOracle.arbitrate(
  attested.uid, // the fulfillment UID
  true,         // approval decision (as oracle)
);
```

### Using direct payment (token-for-token barter)

```typescript
// Atomic swap: buy ERC20 for ERC20
const { hash } = await client.erc20.barter.buyErc20ForErc20(
  { address: BID_TOKEN, value: bidAmount },  // what you're offering
  { address: ASK_TOKEN, value: askAmount },  // what you want
  BigInt(Math.floor(Date.now() / 1000) + 3600), // expiration
);
```

## Oracle Workflow: Arbitrate

### Manual arbitration

```typescript
// Submit decision for a specific fulfillment
await client.arbiters.general.trustedOracle.arbitrate(
  fulfillmentAttestation, // the attestation to judge
  true,                    // decision: true = approve, false = reject
);
```

### Auto-arbitration (listen and decide)

```typescript
const { decisions, unwatch } = await client.arbiters.general.trustedOracle.arbitrateMany({
  mode: "listen",           // "listen" for live, "past" for historical
  pollingInterval: 5000,    // ms
  onAfterArbitrate: (uid, decision) => {
    console.log(`Arbitrated ${uid}: ${decision}`);
  },
});
```

## Commit-Reveal Workflow

Use commit-reveal when fulfillment data is self-contained (e.g., a string answer) to prevent frontrunning.

### Seller: Commit then reveal

```typescript
// 1. Compute commitment hash
const commitment = await client.commitReveal.computeCommitment(
  escrowUid,               // the escrow being fulfilled
  sellerAddress,           // claimer address
  { payload: "0x...", salt: "0x...", schema: "0x..." },
);

// 2. Commit with bond (sends ETH)
const bondAmount = await client.commitReveal.getBondAmount();
await client.commitReveal.commit(commitment);
// Bond amount is sent as msg.value automatically

// 3. Wait at least 1 block, then reveal
const { attested } = await client.commitReveal.doObligation(
  { payload: encodedPayload, salt: randomSalt, schema: schemaTag },
  escrowUid,
);

// 4. Reclaim bond after successful reveal
await client.commitReveal.reclaimBond(attested.uid);
```

### Composing commit-reveal with other demands

Use `AllArbiter` to require both commit-reveal AND other conditions:

```typescript
const demand = client.arbiters.logical.all.encodeDemand({
  arbiters: [
    client.contractAddresses.commitRevealObligation, // built-in arbiter
    client.contractAddresses.trustedOracleArbiter,
  ],
  demands: [
    "0x", // commit-reveal has no demand data
    client.arbiters.general.trustedOracle.encodeDemand({
      oracle: ORACLE_ADDRESS,
      data: "0x",
    }),
  ],
});
```

## Composing Demands

### AllArbiter (AND logic)

All conditions must be satisfied:

```typescript
const demand = client.arbiters.logical.all.encodeDemand({
  arbiters: [ARBITER_1, ARBITER_2],
  demands: [DEMAND_1, DEMAND_2],
});
```

### AnyArbiter (OR logic)

At least one condition must be satisfied:

```typescript
const demand = client.arbiters.logical.any.encodeDemand({
  arbiters: [ARBITER_1, ARBITER_2],
  demands: [DEMAND_1, DEMAND_2],
});
```

### Nesting

Arbiters compose arbitrarily:

```typescript
// (conditionA AND conditionB) OR conditionC
const innerDemand = client.arbiters.logical.all.encodeDemand({
  arbiters: [ARBITER_A, ARBITER_B],
  demands: [DEMAND_A, DEMAND_B],
});
const outerDemand = client.arbiters.logical.any.encodeDemand({
  arbiters: [client.contractAddresses.allArbiter, ARBITER_C],
  demands: [innerDemand, DEMAND_C],
});
```

## Confirmation Arbiters

For manual buyer-side approval of fulfillments:

```typescript
// Buyer confirms a fulfillment
await client.arbiters.confirmation.exclusiveRevocable.confirm(escrowUid, fulfillmentUid);

// Buyer revokes confirmation (if revocable)
await client.arbiters.confirmation.exclusiveRevocable.revokeConfirmation(escrowUid, fulfillmentUid);

// Check confirmation status
const confirmed = await client.arbiters.confirmation.exclusiveRevocable.isConfirmed(escrowUid, fulfillmentUid);
```

Variants: `exclusiveRevocable`, `exclusiveUnrevocable`, `nonexclusiveRevocable`, `nonexclusiveUnrevocable`.

## Decoding Attestations

```typescript
// Get an attestation by UID
const attestation = await client.getAttestation(uid);

// Decode obligation data from an escrow attestation
const data = client.extractObligationData(erc20EscrowObligationAbi, attestation);

// Decode demand from an escrow attestation
const demandData = client.extractDemandData(trustedOracleArbiterDemandAbi, escrowAttestation);

// Generic demand decoder (auto-detects arbiter type)
const decoded = client.decodeDemand({ arbiter: arbiterAddress, demand: demandBytes });
```

## Escrow Types

| Type | What's escrowed | Key fields |
|------|----------------|------------|
| ERC20 | Fungible tokens | `token`, `amount` |
| ERC721 | NFTs | `token`, `id` |
| ERC1155 | Semi-fungible tokens | `token`, `id`, `amount` |
| Native Token | ETH/native currency | `amount` |
| Token Bundle | Mix of all token types | `erc20s`, `erc721s`, `erc1155s` |
| Attestation | EAS attestations | `attestation` (AttestationRequest) |

All escrow types share the same workflow: approve -> encode obligation -> doObligation -> wait -> collect.

## Additional Resources

- Use the `alkahest-docs` MCP server for looking up contract details and addresses
- See `references/contracts.md` for all contract addresses and obligation data schemas
- See `references/arbiters.md` for all arbiter types and demand encoding patterns
