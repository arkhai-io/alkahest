# Escrow Flow (pt 2b - Frontrunning Protection)

In [pt 2](Escrow%20Flow%20(pt%202%20-%20Job%20Trading).md), Alice buys a compute job from Bob, with Charlie validating the result. Bob fulfills the job via StringResultObligation and submits "HELLO WORLD" on-chain. But there's a problem: Bob's fulfillment data is visible in the mempool before it's mined. Since the result is self-contained — it's valid regardless of who submits it — a frontrunner Eve can copy Bob's data and submit her own fulfillment first, stealing the escrow.

This applies whenever the fulfillment data is not tied to the fulfiller's identity. For example, the answer to a question, the result of a computation, or a proof whose validity doesn't depend on who produced it.

CommitRevealObligation solves this by requiring fulfillers to commit to their answer before revealing it. The commitment hides the answer while binding it to the fulfiller's address, so even if Eve sees the commitment, she can't extract or reuse the data.

## How it works

CommitRevealObligation is both an obligation contract (it creates fulfillment attestations) and an arbiter (it verifies the commit-reveal protocol was followed). Here's the mechanism:

1. **Commit**: Bob computes a commitment hash from the escrow UID, his own address, and the fulfillment data. He submits this hash on-chain along with a bond (fixed ETH amount).
2. **Wait**: Bob must wait at least one block. This prevents same-block frontrunning — no one can see Bob's commitment and race to commit+reveal in the same block.
3. **Reveal**: Bob submits the actual fulfillment data via `doObligation()`, creating an EAS attestation. The data includes the payload, salt, and a schema tag.
4. **Verification**: When the escrow is collected, the built-in arbiter checks that a matching commitment exists and was made in an earlier block.
5. **Bond reclaim**: After a successful reveal, Bob reclaims his bond.

The bond exists to disincentivize spam commits. Bob would typically only commit the block before he's ready to reveal. If a commit goes unrevealed past the deadline, anyone can slash the bond.

The commitment hash is: `keccak256(abi.encode(refUID, claimer, keccak256(abi.encode(obligationData))))`, where `refUID` is the escrow attestation UID, `claimer` is Bob's address, and `obligationData` is the full fulfillment data (payload + salt + schema tag).

## Depositing escrow with frontrunning protection

Since CommitRevealObligation only enforces the commit-reveal protocol — it doesn't validate the quality of the result — you typically compose it with another arbiter using AllArbiter. Here we combine it with TrustedOracleArbiter from pt 2, so the escrow demands both:
- A valid commit-reveal (prevents frontrunning)
- Charlie's approval (validates the result)

**CLI**

```bash
# Step 1: Encode oracle demand
bun run cli/src/index.ts arbiter encode-demand \
  --type trusted-oracle \
  --oracle 0xCHARLIE --data 0x
# → { "encoded": "0xORACLE_DEMAND" }

# Step 2: Compose with AllArbiter (commit-reveal + oracle)
# Get contract addresses first
bun run cli/src/index.ts config show --chain base-sepolia
# Use commitRevealObligation and trustedOracleArbiter addresses

bun run cli/src/index.ts arbiter encode-demand --type all \
  --demands '[{"arbiter":"0xCOMMIT_REVEAL_OBLIGATION","demand":"0x"},{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE_DEMAND"}]'
# → { "encoded": "0xCOMPOSED_DEMAND" }

# Step 3: Create escrow with the composed demand
bun run cli/src/index.ts --private-key 0xALICE_KEY escrow create \
  --erc20 \
  --token 0xERC20_TOKEN --amount 100000000000000000000 \
  --arbiter 0xALL_ARBITER \
  --demand 0xCOMPOSED_DEMAND \
  --expiration 1735689600 \
  --approve
```

**Solidity**

```solidity
// Encode the TrustedOracleArbiter demand (same as pt 2)
bytes memory oracleDemand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: charlie,
        data: abi.encode("capitalize hello world")
    })
);

// Compose with AllArbiter: commit-reveal + oracle validation
bytes memory composedDemand = abi.encode(
    AllArbiter.DemandData({
        arbiters: [address(commitRevealObligation), address(trustedOracleArbiter)],
        demands: [bytes(""), oracleDemand]  // CommitRevealObligation ignores its demand bytes
    })
);

// Deposit ERC-20 into escrow
IERC20(erc20Token).approve(address(erc20EscrowObligation), 100 * 10**18);
bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: erc20Token,
        amount: 100 * 10**18,
        arbiter: address(allArbiter),
        demand: composedDemand
    }),
    block.timestamp + 86400
);
```

**Viem**

```typescript
import { encodeAbiParameters, parseAbiParameters } from "viem";

// Encode the TrustedOracleArbiter demand (same as pt 2)
const oracleDemand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: charlie,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "capitalize hello world" },
  ]),
});

// Compose with AllArbiter: commit-reveal + oracle validation
const composedDemand = aliceClient.arbiters.encodeAllArbiterDemand({
  arbiters: [addresses.commitRevealObligation, trustedOracleArbiter],
  demands: ["0x", oracleDemand],  // CommitRevealObligation ignores its demand bytes
});

// Deposit ERC-20 into escrow
const { attested: escrow } = await aliceClient.erc20.escrow.nonTierable.permitAndCreate(
  { address: erc20Token, value: parseEther("100") },
  { arbiter: allArbiter, demand: composedDemand },
  BigInt(Math.floor(Date.now() / 1000) + 86400),
);
```

**Alloy**

```rust
use alloy::sol_types::SolValue;
use alkahest_rs::clients::arbiters::MultiArbiter;

// Encode the TrustedOracleArbiter demand (same as pt 2)
let oracle_demand_data = contracts::TrustedOracleArbiter::DemandData {
    oracle: charlie_address,
    data: "capitalize hello world".abi_encode().into(),
};
let oracle_demand = oracle_demand_data.abi_encode().into();

// Compose with AllArbiter: commit-reveal + oracle validation
let composed_demand_data = MultiArbiter::DemandData {
    arbiters: vec![
        commit_reveal_obligation_address,
        trusted_oracle_arbiter_address,
    ],
    demands: vec![
        Bytes::new(),     // CommitRevealObligation ignores its demand bytes
        oracle_demand,
    ],
};
let composed_demand = alice_client
    .arbiters()
    .encode_multi_arbiter_demand(&composed_demand_data);

// Deposit ERC-20 into escrow
let price = Erc20Data {
    address: erc20_token,
    value: U256::from(100e18),
};
let item = ArbiterData {
    arbiter: all_arbiter_address,
    demand: composed_demand,
};
let escrow_receipt = alice_client
    .erc20()
    .escrow()
    .non_tierable()
    .permit_and_create(&price, &item, expiration_time)
    .await?;
let escrow_uid = DefaultAlkahestClient::get_attested_event(escrow_receipt)?.uid;
```

**Python**

```python
from eth_abi import encode
from alkahest_py import AllArbiterDemandData, TrustedOracleArbiterDemandData

# Encode the TrustedOracleArbiter demand (same as pt 2)
oracle_inner = encode(['string'], ['capitalize hello world'])
oracle_demand = TrustedOracleArbiterDemandData(charlie, oracle_inner).encode_self()

# Compose with AllArbiter: commit-reveal + oracle validation
composed_demand = AllArbiterDemandData(
    [commit_reveal_obligation, trusted_oracle_arbiter],
    [b"", oracle_demand]  # CommitRevealObligation ignores its demand bytes
).encode_self()

# Deposit ERC-20 into escrow
price = {"address": erc20_token, "value": 100}
item = {"arbiter": all_arbiter, "demand": composed_demand}
escrow_receipt = await alice_client.erc20.escrow.non_tierable.permit_and_create(
    price, item, int(time.time()) + 86400
)
escrow_uid = escrow_receipt["log"]["uid"]
```

## Committing to a fulfillment

Bob computes his result, then commits to it before revealing. The commitment binds the data to Bob's address and the specific escrow, so no one else can use it.

The `payload` field holds the actual result data (here, the ABI-encoded string). The `salt` is a random value Bob generates to make the commitment unpredictable. The `schema` field is an arbitrary tag describing the payload format — it's not enforced on-chain but helps off-chain consumers decode the payload.

**CLI**

```bash
# Compute the commitment hash
bun run cli/src/index.ts --private-key 0xBOB_KEY commit-reveal compute-commitment \
  --ref-uid 0xESCROW_UID \
  --claimer 0xBOB_ADDRESS \
  --payload 0xPAYLOAD_HEX \
  --salt 0xRANDOM_SALT_HEX \
  --schema 0x0000000000000000000000000000000000000000000000000000000000000000
# → { "commitment": "0x..." }

# Submit the commitment with bond
bun run cli/src/index.ts --private-key 0xBOB_KEY commit-reveal commit \
  --commitment 0xCOMMITMENT_HASH
```

**Solidity**

```solidity
// Bob prepares his fulfillment data
CommitRevealObligation.ObligationData memory data = CommitRevealObligation.ObligationData({
    payload: abi.encode("HELLO WORLD"),
    salt: bytes32(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)))),
    schema: bytes32(0)  // optional tag for the payload format
});

// Compute the commitment hash
bytes32 commitment = commitRevealObligation.computeCommitment(escrowUid, bob, data);

// Submit the commitment with bond
commitRevealObligation.commit{value: commitRevealObligation.bondAmount()}(commitment);
```

**Viem**

```typescript
import { keccak256, toHex } from "viem";

// Bob prepares his fulfillment data
const obligationData = {
  payload: encodeAbiParameters(parseAbiParameters("string"), ["HELLO WORLD"]),
  salt: keccak256(toHex(crypto.getRandomValues(new Uint8Array(32)))),
  schema: "0x0000000000000000000000000000000000000000000000000000000000000000",
};

// Compute the commitment hash
const commitment = await bobClient.commitReveal.computeCommitment(
  escrow.uid,
  bob,  // Bob's address
  obligationData,
);

// Submit the commitment with bond (bondAmount is fetched automatically)
const { hash: commitTx } = await bobClient.commitReveal.commit(commitment);
```

**Alloy**

```rust
use alloy::primitives::{Bytes, FixedBytes};
use alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData;

// Bob prepares his fulfillment data
let data = ObligationData {
    payload: "HELLO WORLD".abi_encode().into(),
    salt: FixedBytes::<32>::random(),
    schema: FixedBytes::<32>::default(),  // optional tag for the payload format
};

// Compute the commitment hash
let commitment = bob_client
    .commit_reveal()
    .compute_commitment(escrow_uid, bob_address, data.clone())
    .await?;

// Submit the commitment with bond (bondAmount is fetched automatically)
let commit_receipt = bob_client
    .commit_reveal()
    .commit(commitment)
    .await?;
```

**Python**

```python
import os

# Bob prepares his fulfillment data
payload = encode(['string'], ['HELLO WORLD'])
salt = "0x" + os.urandom(32).hex()
schema = "0x" + "00" * 32

# Compute the commitment hash
commitment = await bob_client.commit_reveal.compute_commitment(
    escrow_uid,
    bob,  # Bob's address
    payload,
    salt,
    schema,
)

# Submit the commitment with bond (bondAmount is fetched automatically)
commit_tx = await bob_client.commit_reveal.commit(commitment)
```

## Revealing the fulfillment

After waiting at least one block, Bob reveals his data by calling `doObligation()`. This creates an EAS attestation containing the payload, salt, and schema tag. The escrow UID is set as the attestation's `refUID`, linking the fulfillment to the escrow.

**CLI**

```bash
# Reveal the fulfillment (must be in a later block than the commit)
bun run cli/src/index.ts --private-key 0xBOB_KEY commit-reveal reveal \
  --payload 0xPAYLOAD_HEX \
  --salt 0xRANDOM_SALT_HEX \
  --schema 0x0000000000000000000000000000000000000000000000000000000000000000 \
  --ref-uid 0xESCROW_UID
# → { "uid": "0xFULFILLMENT_UID", ... }
```

**Solidity**

```solidity
// Bob reveals his fulfillment (must be in a later block than the commit)
bytes32 fulfillmentUid = commitRevealObligation.doObligation(data, escrowUid);
```

**Viem**

```typescript
// Bob reveals his fulfillment (must be in a later block than the commit)
const { hash: revealTx, attested: fulfillment } = await bobClient.commitReveal.doObligation(
  obligationData,
  escrow.uid,
);
```

**Alloy**

```rust
// Bob reveals his fulfillment (must be in a later block than the commit)
let reveal_receipt = bob_client
    .commit_reveal()
    .do_obligation(data, Some(escrow_uid))
    .await?;
let fulfillment_uid = DefaultAlkahestClient::get_attested_event(reveal_receipt)?.uid;
```

**Python**

```python
# Bob reveals his fulfillment (must be in a later block than the commit)
fulfillment_uid = await bob_client.commit_reveal.do_obligation(
    payload,
    salt,
    schema,
    ref_uid=escrow_uid,
)
```

## Arbitration and claiming

The arbitration and claiming process is the same as in [pt 2](Escrow%20Flow%20(pt%202%20-%20Job%20Trading).md), with one difference: the fulfillment attestation is from CommitRevealObligation rather than StringObligation, so Charlie needs to decode `ObligationData` to extract the payload.

**CLI**

```bash
# Charlie arbitrates the fulfillment (same as pt 2)
bun run cli/src/index.ts --private-key 0xCHARLIE_KEY arbiter arbitrate \
  --obligation 0xFULFILLMENT_UID \
  --demand 0xORACLE_DEMAND \
  --decision true

# Bob collects the escrow
bun run cli/src/index.ts --private-key 0xBOB_KEY escrow collect \
  --erc20 \
  --escrow-uid 0xESCROW_UID \
  --fulfillment-uid 0xFULFILLMENT_UID
```

**Solidity**

```solidity
// Charlie decodes the fulfillment to validate it
Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
CommitRevealObligation.ObligationData memory revealedData = abi.decode(
    fulfillment.data,
    (CommitRevealObligation.ObligationData)
);
string memory result = abi.decode(revealedData.payload, (string));

// Charlie validates and arbitrates (same as pt 2)
bool isValid = /* validate result against the query */;
trustedOracleArbiter.arbitrate(fulfillmentUid, isValid);
```

**Viem**

```typescript
// In Charlie's arbitration callback, decode the CommitRevealObligation data
const { unwatch } = await charlieClient.oracle.listenAndArbitrateForEscrow({
  escrow: {
    attester: addresses.erc20EscrowObligation,
    demandAbi: parseAbiParameters("(address[] arbiters, bytes[] demands)"),
  },
  fulfillment: {
    attester: addresses.commitRevealObligation,
    obligationAbi: parseAbiParameters("(bytes payload, bytes32 salt, bytes32 schema)"),
  },
  arbitrate: async (obligation, demand) => {
    // obligation[0].payload contains the ABI-encoded result
    const [result] = decodeAbiParameters(
      parseAbiParameters("string"),
      obligation[0].payload,
    );

    // Validate the result (same logic as pt 2)
    if (demand[0].demands[1]) {
      // Parse the oracle demand to get the query
      const [oracleDemand] = decodeAbiParameters(
        parseAbiParameters("(address oracle, bytes data)"),
        demand[0].demands[1],
      );
      const [query] = decodeAbiParameters(
        parseAbiParameters("string"),
        oracleDemand.data,
      );
      if (query.startsWith("capitalize ")) {
        return result === query.substring(11).toUpperCase();
      }
    }
    return false;
  },
  pollingInterval: 1000,
});
```

**Alloy**

```rust
use alloy::sol_types::SolValue;

// Charlie decodes the fulfillment attestation
let fulfillment = eas_contract.getAttestation(fulfillment_uid).call().await?;
let revealed_data = CommitRevealObligation::ObligationData::abi_decode(&fulfillment.data)?;
let result = String::abi_decode(&revealed_data.payload)?;

// Validate and arbitrate (same as pt 2)
let is_valid = if query.starts_with("capitalize ") {
    result == query[11..].to_uppercase()
} else {
    false
};

charlie_client
    .oracle()
    .arbitrate(fulfillment_uid, is_valid)
    .await?;
```

**Python**

```python
from eth_abi import decode as abi_decode
from alkahest_py import CommitRevealObligationData

# Charlie decodes the fulfillment attestation
obligation = await charlie_client.commit_reveal.get_obligation(fulfillment_uid)
(result,) = abi_decode(['string'], bytes(obligation.data.payload))

# Validate and arbitrate (same as pt 2)
is_valid = result == query[11:].upper() if query.startswith("capitalize ") else False
await charlie_client.oracle.arbitrate(fulfillment_uid, is_valid)
```

Once Charlie approves, Bob claims the escrow exactly as in pt 2:

**Solidity**

```solidity
erc20EscrowObligation.collectEscrow(escrowUid, fulfillmentUid);
```

**Viem**

```typescript
await bobClient.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment.uid);
```

**Alloy**

```rust
bob_client
    .erc20()
    .escrow()
    .non_tierable()
    .collect(escrow_uid, fulfillment_uid)
    .await?;
```

**Python**

```python
await bob_client.erc20.escrow.non_tierable.collect(escrow_uid, fulfillment_uid)
```

## Reclaiming the bond

After a successful reveal (and escrow collection), Bob can reclaim his bond. The bond is returned to the address that committed (Bob).

**CLI**

```bash
bun run cli/src/index.ts --private-key 0xBOB_KEY commit-reveal reclaim-bond \
  --uid 0xFULFILLMENT_UID
```

**Solidity**

```solidity
commitRevealObligation.reclaimBond(fulfillmentUid);
```

**Viem**

```typescript
const { hash: reclaimTx } = await bobClient.commitReveal.reclaimBond(fulfillment.uid);
```

**Alloy**

```rust
let reclaim_receipt = bob_client
    .commit_reveal()
    .reclaim_bond(fulfillment_uid)
    .await?;
```

**Python**

```python
reclaim_tx = await bob_client.commit_reveal.reclaim_bond(fulfillment_uid)
```

## Bond slashing

If a commitment goes unrevealed past the deadline, anyone can slash the bond. This disincentivizes spam commits that clutter the commitment space. The slashed bond is sent to a preconfigured recipient (or burned if set to `address(0)`).

**CLI**

```bash
# Slash an unrevealed commitment's bond (anyone can call after deadline)
bun run cli/src/index.ts --private-key 0xANY_KEY commit-reveal slash-bond \
  --commitment 0xCOMMITMENT_HASH
```

**Solidity**

```solidity
// Anyone can call this after the commit deadline has passed
commitRevealObligation.slashBond(commitment);
```

**Viem**

```typescript
// Check the deadline first
const deadline = await bobClient.commitReveal.getCommitDeadline();
const [commitBlock, commitTimestamp, committer] = await bobClient.commitReveal.getCommitment(commitment);

// Slash if deadline has passed
const { hash: slashTx } = await anyClient.commitReveal.slashBond(commitment);
```

**Alloy**

```rust
// Check the deadline first
let deadline = client.commit_reveal().commit_deadline().await?;
let (commit_block, commit_timestamp, committer) = client
    .commit_reveal()
    .get_commitment(commitment)
    .await?;

// Slash if deadline has passed
let slash_receipt = client
    .commit_reveal()
    .slash_bond(commitment)
    .await?;
```

**Python**

```python
# Check the deadline first
deadline = await client.commit_reveal.commit_deadline()
(commit_block, commit_timestamp, committer) = await client.commit_reveal.get_commitment(commitment)

# Slash if deadline has passed
slash_tx = await client.commit_reveal.slash_bond(commitment)
```

## Configuration

CommitRevealObligation has three owner-configurable parameters:

- **`bondAmount`**: Fixed ETH amount required with each commit. Discourages spam commits and provides economic security.
- **`commitDeadline`**: Seconds after a commit within which the reveal must occur to avoid slashing.
- **`slashedBondRecipient`**: Address that receives slashed bonds (`address(0)` = burn).

You can query these via the CLI or SDK:

**CLI**

```bash
bun run cli/src/index.ts --private-key 0xKEY commit-reveal info
# → { "bondAmount": "...", "commitDeadline": "...", "slashedBondRecipient": "0x..." }
```

**Viem**

```typescript
const bondAmount = await client.commitReveal.getBondAmount();
const deadline = await client.commitReveal.getCommitDeadline();
const recipient = await client.commitReveal.getSlashedBondRecipient();
```

**Alloy**

```rust
let bond_amount = client.commit_reveal().bond_amount().await?;
let deadline = client.commit_reveal().commit_deadline().await?;
let recipient = client.commit_reveal().slashed_bond_recipient().await?;
```

**Python**

```python
bond_amount = await client.commit_reveal.bond_amount()
deadline = await client.commit_reveal.commit_deadline()
recipient = await client.commit_reveal.slashed_bond_recipient()
```
