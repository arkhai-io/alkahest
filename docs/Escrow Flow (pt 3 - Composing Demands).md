# Escrow Flow (pt 3 - Composing Demands)

The logical arbiter contracts AnyArbiter and AllArbiter can be used to compose demands. For example, you could demand that

- a task can only be completed by a particular account, and is validated by a trusted third party
- a task is completed before a particular deadline, and validated by any of a list of trusted third parties
- uptime for a server provision is above a certain threshold, and is actually the expected service

## Using logical arbiters

You can use AllArbiter to demand multiple conditions at the same time. For example, that your task is completed by a particular individual before a deadline, and validated by a third party.

**CLI**

```bash
# Encode individual demands
bun run cli/src/index.ts arbiter encode-demand --type recipient \
  --recipient 0xBOB
# → { "encoded": "0xRECIPIENT_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle \
  --oracle 0xCHARLIE --data 0x
# → { "encoded": "0xORACLE_DEMAND" }

# Compose with AllArbiter - both conditions must be met
# Use addresses from: bun run cli/src/index.ts config show --chain base-sepolia
bun run cli/src/index.ts arbiter encode-demand --type all \
  --demands '[{"arbiter":"0xRECIPIENT_ARBITER","demand":"0xRECIPIENT_DEMAND"},{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE_DEMAND"}]'
# → { "encoded": "0xCOMPOSED_DEMAND" }

# Create escrow with the composed demand
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
// Example: Require job completed by specific recipient AND validated by oracle
bytes memory recipientDemand = abi.encode(
    RecipientArbiter.DemandData({
        recipient: bob  // Only Bob can fulfill this
    })
);

bytes memory oracleDemand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: charlie,  // Charlie validates the result
        data: abi.encode("complete the analysis task")
    })
);

// Compose with AllArbiter - both conditions must be met
bytes memory composedDemand = abi.encode(
    AllArbiter.DemandData({
        arbiters: [address(recipientArbiter), address(trustedOracleArbiter)],
        demands: [recipientDemand, oracleDemand]
    })
);

// Deposit escrow with the composed demand
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
// Example: Require job completed by specific recipient AND validated by oracle
const recipientDemand = encodeAbiParameters(
  parseAbiParameters("(address recipient)"),
  [{ recipient: bob }],
);

const oracleDemand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: charlie,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "complete the analysis task" },
  ]),
});

// Compose with AllArbiter - both conditions must be met
const composedDemand = aliceClient.arbiters.encodeAllArbiterDemand({
  arbiters: [recipientArbiter, trustedOracleArbiter],
  demands: [recipientDemand, oracleDemand],
});

// Deposit escrow with the composed demand (using permit for gasless approval)
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

// Example: Require job completed by specific recipient AND validated by oracle
let recipient_demand_data = contracts::RecipientArbiter::DemandData {
    recipient: bob_address,
};
let recipient_demand = recipient_demand_data.abi_encode().into();

let oracle_demand_data = contracts::TrustedOracleArbiter::DemandData {
    oracle: charlie_address,
    data: "complete the analysis task".abi_encode().into(),
};
let oracle_demand = oracle_demand_data.abi_encode().into();

// Compose with AllArbiter - both conditions must be met
let composed_demand_data = MultiArbiter::DemandData {
    arbiters: vec![recipient_arbiter_address, trusted_oracle_arbiter_address],
    demands: vec![recipient_demand, oracle_demand],
};
let composed_demand = alice_client
    .arbiters()
    .encode_multi_arbiter_demand(&composed_demand_data);

// Deposit escrow with the composed demand (using permit for gasless approval)
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
```

**Python**

```python
from eth_abi import encode
from alkahest_py import AllArbiterDemandData, RecipientArbiterDemandData, TrustedOracleArbiterDemandData

# Example: Require job completed by specific recipient AND validated by oracle
recipient_demand = RecipientArbiterDemandData(bob).encode_self()

oracle_inner_data = encode(['string'], ['complete the analysis task'])
oracle_demand = TrustedOracleArbiterDemandData(charlie, oracle_inner_data).encode_self()

# Compose with AllArbiter - both conditions must be met
composed_demand = AllArbiterDemandData(
    [recipient_arbiter, trusted_oracle_arbiter],
    [recipient_demand, oracle_demand]
).encode_self()

# Deposit escrow with the composed demand (using permit for gasless approval)
price = {"address": erc20_token, "value": 100}
item = {"arbiter": all_arbiter, "demand": composed_demand}
escrow_receipt = await alice_client.erc20.escrow.non_tierable.permit_and_create(
    price, item, int(time.time()) + 86400
)
```

You can use AnyArbiter when multiple alternative conditions can be considered valid. For example, if you accept a decision from any of a list of trusted third party oracles, or if there are different proof mechanisms that equally ensure the validity of a result.

**CLI**

```bash
# Encode individual oracle demands
bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle \
  --oracle 0xCHARLIE --data 0x
# → { "encoded": "0xORACLE1_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle \
  --oracle 0xDAVE --data 0x
# → { "encoded": "0xORACLE2_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle \
  --oracle 0xEVE --data 0x
# → { "encoded": "0xORACLE3_DEMAND" }

# Compose with AnyArbiter - any one oracle can validate
bun run cli/src/index.ts arbiter encode-demand --type any \
  --demands '[{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE1_DEMAND"},{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE2_DEMAND"},{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE3_DEMAND"}]'
# → { "encoded": "0xCOMPOSED_DEMAND" }

# Create escrow with flexible oracle validation
bun run cli/src/index.ts --private-key 0xALICE_KEY escrow create \
  --erc20 \
  --token 0xERC20_TOKEN --amount 50000000000000000000 \
  --arbiter 0xANY_ARBITER \
  --demand 0xCOMPOSED_DEMAND \
  --expiration 1735689600 \
  --approve
```

**Solidity**

```solidity
// Example: Accept validation from ANY of multiple trusted oracles
bytes memory oracle1Demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: charlie,
        data: abi.encode("verify computation result")
    })
);

bytes memory oracle2Demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: dave,
        data: abi.encode("verify computation result")
    })
);

bytes memory oracle3Demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: eve,
        data: abi.encode("verify computation result")
    })
);

// Compose with AnyArbiter - any one oracle can validate
bytes memory composedDemand = abi.encode(
    AnyArbiter.DemandData({
        arbiters: [
            address(trustedOracleArbiter),
            address(trustedOracleArbiter),
            address(trustedOracleArbiter)
        ],
        demands: [oracle1Demand, oracle2Demand, oracle3Demand]
    })
);

// Create escrow with flexible oracle validation
bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: erc20Token,
        amount: 50 * 10**18,
        arbiter: address(anyArbiter),
        demand: composedDemand
    }),
    block.timestamp + 7200  // 2 hour expiration
);
```

**Viem**

```typescript
// Example: Accept validation from ANY of multiple trusted oracles
const oracle1Demand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: charlie,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "verify computation result" },
  ]),
});

const oracle2Demand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: dave,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "verify computation result" },
  ]),
});

const oracle3Demand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: eve,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "verify computation result" },
  ]),
});

// Compose with AnyArbiter - any one oracle can validate
const composedDemand = aliceClient.arbiters.encodeAnyArbiterDemand({
  arbiters: [trustedOracleArbiter, trustedOracleArbiter, trustedOracleArbiter],
  demands: [oracle1Demand, oracle2Demand, oracle3Demand],
});

// Create escrow with flexible oracle validation (using approveAndCreate)
const { attested: escrow } = await aliceClient.erc20.escrow.nonTierable.approveAndCreate(
  { address: erc20Token, value: parseEther("50") },
  { arbiter: anyArbiter, demand: composedDemand },
  BigInt(Math.floor(Date.now() / 1000) + 7200), // 2 hour expiration
);
```

**Alloy**

```rust
// Example: Accept validation from ANY of multiple trusted oracles
let query = "verify computation result".abi_encode();

let oracle1_demand = contracts::TrustedOracleArbiter::DemandData {
    oracle: charlie_address,
    data: query.clone().into(),
}.abi_encode().into();

let oracle2_demand = contracts::TrustedOracleArbiter::DemandData {
    oracle: dave_address,
    data: query.clone().into(),
}.abi_encode().into();

let oracle3_demand = contracts::TrustedOracleArbiter::DemandData {
    oracle: eve_address,
    data: query.into(),
}.abi_encode().into();

// Compose with AnyArbiter - any one oracle can validate
let composed_demand_data = MultiArbiter::DemandData {
    arbiters: vec![
        trusted_oracle_arbiter_address,
        trusted_oracle_arbiter_address,
        trusted_oracle_arbiter_address,
    ],
    demands: vec![oracle1_demand, oracle2_demand, oracle3_demand],
};
let composed_demand = alice_client
    .arbiters()
    .encode_multi_arbiter_demand(&composed_demand_data);

// Create escrow with flexible oracle validation (using approve_and_create)
let price = Erc20Data {
    address: erc20_token,
    value: U256::from(50e18),
};
let item = ArbiterData {
    arbiter: any_arbiter_address,
    demand: composed_demand,
};
let escrow_receipt = alice_client
    .erc20()
    .escrow()
    .non_tierable()
    .approve_and_create(&price, &item, current_timestamp + 7200) // 2 hour expiration
    .await?;
```

**Python**

```python
# Example: Accept validation from ANY of multiple trusted oracles
query_data = encode(['string'], ['verify computation result'])

oracle1_demand = TrustedOracleArbiterDemandData(charlie, query_data).encode_self()
oracle2_demand = TrustedOracleArbiterDemandData(dave, query_data).encode_self()
oracle3_demand = TrustedOracleArbiterDemandData(eve, query_data).encode_self()

# Compose with AnyArbiter - any one oracle can validate
composed_demand = AnyArbiterDemandData(
    [trusted_oracle_arbiter, trusted_oracle_arbiter, trusted_oracle_arbiter],
    [oracle1_demand, oracle2_demand, oracle3_demand]
).encode_self()

# Create escrow with flexible oracle validation (using approve_and_create)
price = {"address": erc20_token, "value": 50}
item = {"arbiter": any_arbiter, "demand": composed_demand}
escrow_receipt = await alice_client.erc20.escrow.non_tierable.approve_and_create(
    price, item, int(time.time()) + 7200  # 2 hour expiration
)
```

Logical arbiters can be stacked. For example, you could demand that a job is completed before a deadline by a particular party, and validated by any of a list of trusted oracles.

**CLI**

```bash
# Encode individual demands
bun run cli/src/index.ts arbiter encode-demand --type time-before --time 1735693200
# → { "encoded": "0xDEADLINE_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type recipient --recipient 0xBOB
# → { "encoded": "0xRECIPIENT_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle --oracle 0xCHARLIE --data 0x
# → { "encoded": "0xORACLE1_DEMAND" }

bun run cli/src/index.ts arbiter encode-demand --type trusted-oracle --oracle 0xDAVE --data 0x
# → { "encoded": "0xORACLE2_DEMAND" }

# Create the OR condition for oracles
bun run cli/src/index.ts arbiter encode-demand --type any \
  --demands '[{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE1_DEMAND"},{"arbiter":"0xTRUSTED_ORACLE_ARBITER","demand":"0xORACLE2_DEMAND"}]'
# → { "encoded": "0xORACLE_OR_DEMAND" }

# Combine all conditions with AllArbiter: deadline AND recipient AND (oracle1 OR oracle2)
bun run cli/src/index.ts arbiter encode-demand --type all \
  --demands '[{"arbiter":"0xTIME_BEFORE_ARBITER","demand":"0xDEADLINE_DEMAND"},{"arbiter":"0xRECIPIENT_ARBITER","demand":"0xRECIPIENT_DEMAND"},{"arbiter":"0xANY_ARBITER","demand":"0xORACLE_OR_DEMAND"}]'
# → { "encoded": "0xFINAL_DEMAND" }

# Create the escrow with nested logical arbiters
bun run cli/src/index.ts --private-key 0xALICE_KEY escrow create \
  --erc20 \
  --token 0xERC20_TOKEN --amount 200000000000000000000 \
  --arbiter 0xALL_ARBITER \
  --demand 0xFINAL_DEMAND \
  --expiration 1735700400 \
  --approve
```

**Solidity**

```solidity
// Example: Complex composition - deadline AND recipient AND (oracle1 OR oracle2)
bytes memory deadlineDemand = abi.encode(
    TimeBeforeArbiter.DemandData({
        time: uint64(block.timestamp + 3600)  // Must complete within 1 hour
    })
);

bytes memory recipientDemand = abi.encode(
    RecipientArbiter.DemandData({
        recipient: bob  // Must be fulfilled by Bob
    })
);

// Create the OR condition for oracles
bytes memory oracle1Demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: charlie,
        data: abi.encode("validate result")
    })
);

bytes memory oracle2Demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: dave,
        data: abi.encode("validate result")
    })
);

bytes memory oracleOrDemand = abi.encode(
    AnyArbiter.DemandData({
        arbiters: [address(trustedOracleArbiter), address(trustedOracleArbiter)],
        demands: [oracle1Demand, oracle2Demand]
    })
);

// Combine all conditions with AllArbiter
bytes memory finalDemand = abi.encode(
    AllArbiter.DemandData({
        arbiters: [
            address(timeBeforeArbiter),
            address(recipientArbiter),
            address(anyArbiter)
        ],
        demands: [
            deadlineDemand,
            recipientDemand,
            oracleOrDemand
        ]
    })
);

// Create the escrow with nested logical arbiters
bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: erc20Token,
        amount: 200 * 10**18,
        arbiter: address(allArbiter),
        demand: finalDemand
    }),
    block.timestamp + 7200  // 2 hour overall expiration
);
```

**Viem**

```typescript
// Example: Complex composition - deadline AND recipient AND (oracle1 OR oracle2)
const deadlineDemand = encodeAbiParameters(
  parseAbiParameters("(uint64 time)"),
  [{ time: BigInt(Math.floor(Date.now() / 1000) + 3600) }], // 1 hour deadline
);

const recipientDemand = encodeAbiParameters(
  parseAbiParameters("(address recipient)"),
  [{ recipient: bob }],
);

// Create the OR condition for oracles
const oracle1Demand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: charlie,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "validate result" },
  ]),
});

const oracle2Demand = aliceClient.arbiters.encodeTrustedOracleDemand({
  oracle: dave,
  data: encodeAbiParameters(parseAbiParameters("(string query)"), [
    { query: "validate result" },
  ]),
});

const oracleOrDemand = aliceClient.arbiters.encodeAnyArbiterDemand({
  arbiters: [trustedOracleArbiter, trustedOracleArbiter],
  demands: [oracle1Demand, oracle2Demand],
});

// Combine all conditions with AllArbiter
const finalDemand = aliceClient.arbiters.encodeAllArbiterDemand({
  arbiters: [timeBeforeArbiter, recipientArbiter, anyArbiter],
  demands: [deadlineDemand, recipientDemand, oracleOrDemand],
});

// Create the escrow with nested logical arbiters (using approveAndCreate)
const { attested: escrow } = await aliceClient.erc20.escrow.nonTierable.approveAndCreate(
  { address: erc20Token, value: parseEther("200") },
  { arbiter: allArbiter, demand: finalDemand },
  BigInt(Math.floor(Date.now() / 1000) + 7200), // 2 hour overall expiration
);
```

**Alloy**

```rust
// Example: Complex composition - deadline AND recipient AND (oracle1 OR oracle2)
let deadline_demand_data = contracts::TimeBeforeArbiter::DemandData {
    time: current_timestamp + 3600, // 1 hour deadline
};
let deadline_demand = deadline_demand_data.abi_encode().into();

let recipient_demand_data = contracts::RecipientArbiter::DemandData {
    recipient: bob_address,
};
let recipient_demand = recipient_demand_data.abi_encode().into();

// Create the OR condition for oracles
let validate_query = "validate result".abi_encode();

let oracle1_demand = contracts::TrustedOracleArbiter::DemandData {
    oracle: charlie_address,
    data: validate_query.clone().into(),
}.abi_encode().into();

let oracle2_demand = contracts::TrustedOracleArbiter::DemandData {
    oracle: dave_address,
    data: validate_query.into(),
}.abi_encode().into();

let oracle_or_demand_data = MultiArbiter::DemandData {
    arbiters: vec![trusted_oracle_arbiter_address, trusted_oracle_arbiter_address],
    demands: vec![oracle1_demand, oracle2_demand],
};
let oracle_or_demand = alice_client
    .arbiters()
    .encode_multi_arbiter_demand(&oracle_or_demand_data);

// Combine all conditions with AllArbiter
let final_demand_data = MultiArbiter::DemandData {
    arbiters: vec![
        time_before_arbiter_address,
        recipient_arbiter_address,
        any_arbiter_address,
    ],
    demands: vec![deadline_demand, recipient_demand, oracle_or_demand],
};
let final_demand = alice_client
    .arbiters()
    .encode_multi_arbiter_demand(&final_demand_data);

// Create the escrow with nested logical arbiters (using approve_and_create)
let price = Erc20Data {
    address: erc20_token,
    value: U256::from(200e18),
};
let item = ArbiterData {
    arbiter: all_arbiter_address,
    demand: final_demand,
};
let escrow_receipt = alice_client
    .erc20()
    .escrow()
    .non_tierable()
    .approve_and_create(&price, &item, current_timestamp + 7200) // 2 hour overall expiration
    .await?;
```

**Python**

```python
# Example: Complex composition - deadline AND recipient AND (oracle1 OR oracle2)
from alkahest_py import TimeBeforeArbiterDemandData, RecipientArbiterDemandData

deadline_demand = TimeBeforeArbiterDemandData(int(time.time()) + 3600).encode_self()
recipient_demand = RecipientArbiterDemandData(bob).encode_self()

# Create the OR condition for oracles
validate_query = encode(['string'], ['validate result'])
oracle1_demand = TrustedOracleArbiterDemandData(charlie, validate_query).encode_self()
oracle2_demand = TrustedOracleArbiterDemandData(dave, validate_query).encode_self()

oracle_or_demand = AnyArbiterDemandData(
    [trusted_oracle_arbiter, trusted_oracle_arbiter],
    [oracle1_demand, oracle2_demand]
).encode_self()

# Combine all conditions with AllArbiter
final_demand = AllArbiterDemandData(
    [time_before_arbiter, recipient_arbiter, any_arbiter],
    [deadline_demand, recipient_demand, oracle_or_demand]
).encode_self()

# Create the escrow with nested logical arbiters (using approve_and_create)
price = {"address": erc20_token, "value": 200}
item = {"arbiter": all_arbiter, "demand": final_demand}
escrow_receipt = await alice_client.erc20.escrow.non_tierable.approve_and_create(
    price, item, int(time.time()) + 7200  # 2 hour overall expiration
)
```

## Parsing composed demands

The CLI and SDKs provide built-in support for recursively parsing composed demands. The parsers automatically detect the arbiter type and decode each sub-demand appropriately.

**CLI**

```bash
# Decode a composed demand given the arbiter address and encoded demand hex
bun run cli/src/index.ts arbiter decode-demand \
  --arbiter 0xALL_ARBITER \
  --demand 0xCOMPOSED_DEMAND_HEX
# → Recursively decoded demand structure as JSON
```

**Solidity**

```solidity
// Example: Validate that on-chain demand matches expected structure
function validateDemand(
    bytes memory onChainDemand,
    bytes memory expectedDemand
) public pure returns (bool) {
    // Simply check if the demands match
    return keccak256(onChainDemand) == keccak256(expectedDemand);
}

// Or decode and validate specific parts
function parseAllArbiterDemand(bytes memory demand)
    public
    pure
    returns (address[] memory arbiters, bytes[] memory demands)
{
    AllArbiter.DemandData memory demandData = abi.decode(
        demand,
        (AllArbiter.DemandData)
    );
    return (demandData.arbiters, demandData.demands);
}

// Example usage
(address[] memory arbiters, bytes[] memory subDemands) = parseAllArbiterDemand(composedDemand);
require(arbiters[0] == address(timeBeforeArbiter), "First arbiter must be TimeBeforeArbiter");
require(arbiters[1] == address(recipientArbiter), "Second arbiter must be RecipientArbiter");
```

**Viem**

```typescript
import { decodeDemandWithAddresses } from "alkahest-ts/utils/demandParsing";

// Use the built-in recursive demand parser with chain addresses
const decoded = decodeDemandWithAddresses(
  { arbiter: allArbiter, demand: composedDemand },
  client.addresses,
);

// The result includes arbiter, decoded data, and children for logical arbiters
console.log("Top-level arbiter:", decoded.arbiter);
console.log("Decoded data:", decoded.decoded);

// For logical arbiters (AllArbiter, AnyArbiter), children are recursively decoded
if (decoded.children) {
  for (const child of decoded.children) {
    console.log("Child arbiter:", child.arbiter);
    console.log("Child data:", child.decoded);
    // Children can also have their own children for nested logical arbiters
    if (child.children) {
      console.log("Nested children:", child.children);
    }
  }
}

// Check if an arbiter was unknown (not in the registered decoders)
if (decoded.isUnknown) {
  console.log("Unknown arbiter, raw demand:", decoded.decoded.raw);
}
```

**Alloy**

```rust
use alkahest_rs::contracts::arbiters::logical::AllArbiter as AllArbiterContract;

// Decode AllArbiter demand data from raw bytes
let demand_data: AllArbiterContract::DemandData =
    AllArbiterContract::DemandData::abi_decode(&composed_demand, true)?;

// Use the built-in recursive decoder
let decoded = alice_client
    .arbiters()
    .logical()
    .all()
    .decode(demand_data)?;

// The result contains arbiters and recursively decoded demands
println!("Arbiters: {:?}", decoded.arbiters);

// Each demand is decoded into a typed enum variant
for demand in &decoded.demands {
    match demand {
        DecodedDemand::TimeBeforeArbiter(data) => {
            println!("TimeBeforeArbiter: time={}", data.time);
        }
        DecodedDemand::RecipientArbiter(data) => {
            println!("RecipientArbiter: recipient={}", data.recipient);
        }
        DecodedDemand::TrustedOracle(data) => {
            println!("TrustedOracle: oracle={}", data.oracle);
        }
        DecodedDemand::AnyArbiter(nested) => {
            // Nested logical arbiters are also decoded
            println!("Nested AnyArbiter with {} sub-demands", nested.demands.len());
        }
        DecodedDemand::AllArbiter(nested) => {
            println!("Nested AllArbiter with {} sub-demands", nested.demands.len());
        }
        DecodedDemand::Unknown { arbiter, raw_data } => {
            println!("Unknown arbiter {}: {:?}", arbiter, raw_data);
        }
        _ => println!("Other demand type"),
    }
}
```

**Python**

```python
# Use the built-in recursive decoder
decoded = alice_client.arbiters.logical.all.decode(composed_demand)

# The result contains arbiters and recursively decoded demands
print(f"Arbiters: {decoded.arbiters}")

# Each demand has a type and optional raw data
for demand in decoded.demands:
    print(f"Demand type: {demand.demand_type}")
    if demand.raw_data:
        # Raw data can be further decoded based on the demand type
        if demand.demand_type == "TimeBeforeArbiter":
            time_value = decode(['uint64'], demand.raw_data)[0]
            print(f"  Time: {datetime.fromtimestamp(time_value)}")
        elif demand.demand_type == "RecipientArbiter":
            recipient = decode(['address'], demand.raw_data)[0]
            print(f"  Recipient: {recipient}")
        elif demand.demand_type == "TrustedOracle":
            oracle, data = decode(['address', 'bytes'], demand.raw_data)
            print(f"  Oracle: {oracle}")

# For AnyArbiter, use the any decoder
decoded_any = alice_client.arbiters.logical.any.decode(any_arbiter_demand)
print(f"AnyArbiter sub-demands: {len(decoded_any.demands)}")
```

For custom arbiters not included in the SDK's built-in decoders, you can extend the decoder registry (TypeScript) or manually decode the raw bytes using ABI decoding.

## Why there's no NotArbiter

You might expect a `NotArbiter` to complement `AllArbiter` and `AnyArbiter`, allowing you to negate any arbiter's logic. However, Alkahest intentionally does not include a `NotArbiter` due to fundamental security concerns.

### The revert problem

Arbiters typically signal failure by **reverting** rather than returning `false`. This allows them to provide meaningful error messages explaining why arbitration failed (e.g., "recipient mismatch" or "deadline passed"). A `NotArbiter` would need to catch these reverts and invert the result, but this creates a critical ambiguity:

**A `NotArbiter` cannot distinguish between:**
- **Logical reversions** - The arbiter intentionally reverted because its condition wasn't met (e.g., wrong recipient)
- **Execution reversions** - The call failed for technical reasons (e.g., out of gas, invalid calldata, contract bug)

If a `NotArbiter` treated all reverts as "condition not met" and returned success, it would incorrectly pass arbitration when calls fail due to out-of-gas attacks, malformed data, or other execution errors. This could allow attackers to bypass security checks.

### What to do instead

**Use built-in complement arbiters.** Most arbiters with useful complements already have them:

| Arbiter | Complement |
|---------|------------|
| `TimeBeforeArbiter` | `TimeAfterArbiter` |
| `ExpirationTimeBeforeArbiter` | `ExpirationTimeAfterArbiter` |

**Write a standalone inverting arbiter.** Fork or rewrite the arbiter with inverted logic. This is the safest approach since you explicitly implement the complement:

```solidity
// Example: Standalone arbiter that inverts RecipientArbiter logic
// (allows anyone EXCEPT a specific address)
contract NotRecipientArbiter is IArbiter {
    struct DemandData {
        address excludedRecipient;
    }

    function checkStatement(
        Attestation memory statement,
        bytes memory demand,
        bytes32 /* counteroffer */
    ) external pure returns (bool) {
        DemandData memory data = abi.decode(demand, (DemandData));
        // Explicitly check the inverse condition
        return statement.recipient != data.excludedRecipient;
    }
}
```

**Subcall the original arbiter with explicit error handling.** If you want to wrap an existing arbiter, you must explicitly handle its known revert reasons rather than catching all reverts:

```solidity
// Example: Inverting arbiter that subcalls the original
contract InvertingArbiter is IArbiter {
    IArbiter public immutable underlying;

    constructor(IArbiter _underlying) {
        underlying = _underlying;
    }

    function checkStatement(
        Attestation memory statement,
        bytes memory demand,
        bytes32 counteroffer
    ) external view returns (bool) {
        try underlying.checkStatement(statement, demand, counteroffer) returns (bool result) {
            return !result;
        } catch (bytes memory reason) {
            // CRITICAL: Only catch KNOWN logical revert reasons
            // Unknown reverts (OOG, invalid data) must propagate
            bytes4 selector = bytes4(reason);
            if (selector == RecipientMismatch.selector) {
                return true; // Logical failure -> inverted success
            }
            if (selector == DeadlinePassed.selector) {
                return true; // Logical failure -> inverted success
            }
            // Unknown error - do NOT treat as success, propagate it
            assembly {
                revert(add(reason, 32), mload(reason))
            }
        }
    }
}
```

This approach requires you to enumerate every logical revert reason the underlying arbiter can produce. Unknown reverts (out of gas, invalid calldata, bugs) propagate rather than being incorrectly treated as "condition not met."
