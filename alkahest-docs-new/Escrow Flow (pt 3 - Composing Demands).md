# Escrow Flow (pt 3 - Composing Demands)

The logical arbiter contracts AnyArbiter and AllArbiter can be used to compose demands. For example, you could demand that

- a task can only be completed by a particular account, and is validated by a trusted third party
- a task is completed before a particular deadline, and validated by any of a list of trusted third parties
- uptime for a server provision is above a certain threshold, and is actually the expected service

## Using logical arbiters

You can use AllArbiter to demand multiple conditions at the same time. For example, that your task is completed by a particular individual before a deadline, and validated by a third party.

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

// Deposit escrow with the composed demand
const { attested: escrow } = await aliceClient.erc20.permitAndBuyWithErc20(
  {
    address: erc20Token,
    value: parseEther("100"),
  },
  {
    arbiter: allArbiter,
    demand: composedDemand,
  },
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

// Deposit escrow with the composed demand
let escrow_receipt = alice_client
    .erc20()
    .permit_and_buy_with_erc20(
        &Erc20Data {
            address: erc20_token,
            value: U256::from(100e18),
        },
        &ArbiterData {
            arbiter: all_arbiter_address,
            demand: composed_demand,
        },
        expiration_time,
    )
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

# Deposit escrow with the composed demand
escrow_receipt = await alice_client.erc20.permit_and_buy_with_erc20(
    {"address": erc20_token, "value": 100},
    {"arbiter": all_arbiter, "demand": composed_demand},
    int(time.time()) + 86400
)
```

You can use AnyArbiter when multiple alternative conditions can be considered valid. For example, if you accept a decision from any of a list of trusted third party oracles, or if there are different proof mechanisms that equally ensure the validity of a result.

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

// Create escrow with flexible oracle validation
const { attested: escrow } = await aliceClient.erc20.buyWithErc20(
  {
    address: erc20Token,
    value: parseEther("50"),
  },
  {
    arbiter: anyArbiter,
    demand: composedDemand,
  },
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

// Create escrow with flexible oracle validation
let escrow_receipt = alice_client
    .erc20()
    .buy_with_erc20(
        &Erc20Data {
            address: erc20_token,
            value: U256::from(50e18),
        },
        &ArbiterData {
            arbiter: any_arbiter_address,
            demand: composed_demand,
        },
        current_timestamp + 7200, // 2 hour expiration
    )
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

# Create escrow with flexible oracle validation
escrow_receipt = await alice_client.erc20.buy_with_erc20(
    {"address": erc20_token, "value": 50},
    {"arbiter": any_arbiter, "demand": composed_demand},
    int(time.time()) + 7200  # 2 hour expiration
)
```

Logical arbiters can be stacked. For example, you could demand that a job is completed before a deadline by a particular party, and validated by any of a list of trusted oracles.

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

// Create the escrow with nested logical arbiters
const { attested: escrow } = await aliceClient.erc20.buyWithErc20(
  {
    address: erc20Token,
    value: parseEther("200"),
  },
  {
    arbiter: allArbiter,
    demand: finalDemand,
  },
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

// Create the escrow with nested logical arbiters
let escrow_receipt = alice_client
    .erc20()
    .buy_with_erc20(
        &Erc20Data {
            address: erc20_token,
            value: U256::from(200e18),
        },
        &ArbiterData {
            arbiter: all_arbiter_address,
            demand: final_demand,
        },
        current_timestamp + 7200, // 2 hour overall expiration
    )
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

# Create the escrow with nested logical arbiters
escrow_receipt = await alice_client.erc20.buy_with_erc20(
    {"address": erc20_token, "value": 200},
    {"arbiter": all_arbiter, "demand": final_demand},
    int(time.time()) + 7200  # 2 hour overall expiration
)
```

## Parsing composed demands

When parsing composed demands, you can use the arbiter address of each subdemand as a type id. You could communicate the whole composed demand off-chain, and only validate that the on-chain demand matches what was communicated.

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

**TypeScript**

```typescript
// Example: Validate that on-chain demand matches expected structure
function validateDemand(
  onChainDemand: `0x${string}`,
  expectedDemand: `0x${string}`,
): boolean {
  // Simply check if the demands match
  return onChainDemand.toLowerCase() === expectedDemand.toLowerCase();
}

// Or decode and validate specific parts
const parseAllArbiterDemand = (demand: `0x${string}`) => {
  const decoded = aliceClient.arbiters.decodeAllArbiterDemand(demand);
  return {
    arbiters: decoded.arbiters,
    demands: decoded.demands,
  };
};

// Example usage
const { arbiters, demands } = parseAllArbiterDemand(composedDemand);
if (arbiters[0] !== timeBeforeArbiter) {
  throw new Error("First arbiter must be TimeBeforeArbiter");
}
if (arbiters[1] !== recipientArbiter) {
  throw new Error("Second arbiter must be RecipientArbiter");
}

// Parse sub-demands based on known arbiter types
const deadlineData = decodeAbiParameters(
  parseAbiParameters("(uint64 time)"),
  demands[0] as `0x${string}`,
)[0];
console.log("Deadline:", new Date(Number(deadlineData.time) * 1000));
```

**Alloy**

```rust
use alloy::dyn_abi::DynSolValue;

// Example: Validate that on-chain demand matches expected structure
fn validate_demand(on_chain_demand: &Bytes, expected_demand: &Bytes) -> bool {
    on_chain_demand == expected_demand
}

// Or decode and validate specific parts
fn parse_all_arbiter_demand(
    client: &ArbitersModule<_>,
    demand: Bytes,
) -> eyre::Result<(Vec<Address>, Vec<Bytes>)> {
    let demand_data = client.decode_multi_arbiter_demand(demand)?;
    Ok((demand_data.arbiters, demand_data.demands))
}

// Example usage
let (arbiters, sub_demands) = parse_all_arbiter_demand(&alice_client.arbiters(), composed_demand)?;
assert_eq!(arbiters[0], time_before_arbiter_address, "First arbiter must be TimeBeforeArbiter");
assert_eq!(arbiters[1], recipient_arbiter_address, "Second arbiter must be RecipientArbiter");

// Parse sub-demands based on known arbiter types
let deadline_data = contracts::TimeBeforeArbiter::DemandData::abi_decode(
    &sub_demands[0],
    true
)?;
println!("Deadline: {}", deadline_data.time);
```

**Python**

```python
from eth_abi import decode
from eth_utils import keccak

# Example: Validate that on-chain demand matches expected structure
def validate_demand(on_chain_demand: bytes, expected_demand: bytes) -> bool:
    """Simply check if the demands match"""
    return keccak(on_chain_demand) == keccak(expected_demand)

# Or decode and validate specific parts
def parse_all_arbiter_demand(demand: bytes):
    """Decode AllArbiter.DemandData"""
    # Decode as (address[], bytes[])
    arbiters, demands = decode(['address[]', 'bytes[]'], demand)
    return {'arbiters': arbiters, 'demands': demands}

# Example usage
parsed = parse_all_arbiter_demand(composed_demand)
arbiters = parsed['arbiters']
sub_demands = parsed['demands']

assert arbiters[0] == time_before_arbiter, "First arbiter must be TimeBeforeArbiter"
assert arbiters[1] == recipient_arbiter, "Second arbiter must be RecipientArbiter"

# Parse sub-demands based on known arbiter types
deadline_data = decode(['uint64'], sub_demands[0])
print(f"Deadline: {datetime.fromtimestamp(deadline_data[0])}")
```

If this isn't possible, you could keep a local record mapping sub-arbiters that you support (including each logical arbiter) to their DemandData formats, and parse demands recursively.

**Solidity**

```solidity
// Example: Recursive demand parser contract
contract DemandParser {
    struct ArbiterInfo {
        string name;
        string demandFormat;
        bool isLogical;
    }

    mapping(address => ArbiterInfo) public arbiterRegistry;

    constructor() {
        // Register known arbiters
        arbiterRegistry[address(timeBeforeArbiter)] = ArbiterInfo(
            "TimeBeforeArbiter",
            "(uint64)",
            false
        );
        arbiterRegistry[address(recipientArbiter)] = ArbiterInfo(
            "RecipientArbiter",
            "(address)",
            false
        );
        arbiterRegistry[address(trustedOracleArbiter)] = ArbiterInfo(
            "TrustedOracleArbiter",
            "(address,bytes)",
            false
        );
        arbiterRegistry[address(allArbiter)] = ArbiterInfo(
            "AllArbiter",
            "(address[],bytes[])",
            true
        );
        arbiterRegistry[address(anyArbiter)] = ArbiterInfo(
            "AnyArbiter",
            "(address[],bytes[])",
            true
        );
    }

    function parseDemand(address arbiter, bytes memory demand)
        public
        view
        returns (string memory arbiterName, bytes memory parsedData)
    {
        ArbiterInfo memory info = arbiterRegistry[arbiter];
        require(bytes(info.name).length > 0, "Unknown arbiter");

        if (info.isLogical) {
            // Recursively parse logical arbiters
            (address[] memory subArbiters, bytes[] memory subDemands) =
                abi.decode(demand, (address[], bytes[]));

            // Continue parsing sub-demands...
            for (uint i = 0; i < subArbiters.length; i++) {
                (string memory subName,) = parseDemand(subArbiters[i], subDemands[i]);
                // Process sub-demand...
            }
        }

        return (info.name, demand);
    }
}
```

**TypeScript**

```typescript
// Example: Recursive demand parser with arbiter registry
class DemandParser {
  private arbiterRegistry: Map<
    string,
    {
      name: string;
      demandFormat: string;
      isLogical: boolean;
      parseFunction?: (data: `0x${string}`) => any;
    }
  >;

  constructor() {
    this.arbiterRegistry = new Map();

    // Register known arbiters
    this.arbiterRegistry.set(timeBeforeArbiter, {
      name: "TimeBeforeArbiter",
      demandFormat: "(uint64 time)",
      isLogical: false,
      parseFunction: (data) =>
        decodeAbiParameters(parseAbiParameters("(uint64 time)"), data)[0],
    });

    this.arbiterRegistry.set(recipientArbiter, {
      name: "RecipientArbiter",
      demandFormat: "(address recipient)",
      isLogical: false,
      parseFunction: (data) =>
        decodeAbiParameters(parseAbiParameters("(address recipient)"), data)[0],
    });

    this.arbiterRegistry.set(trustedOracleArbiter, {
      name: "TrustedOracleArbiter",
      demandFormat: "(address oracle, bytes data)",
      isLogical: false,
      parseFunction: (data) => client.arbiters.decodeTrustedOracleDemand(data),
    });

    this.arbiterRegistry.set(allArbiter, {
      name: "AllArbiter",
      demandFormat: "(address[] arbiters, bytes[] demands)",
      isLogical: true,
      parseFunction: (data) => client.arbiters.decodeAllArbiterDemand(data),
    });

    this.arbiterRegistry.set(anyArbiter, {
      name: "AnyArbiter",
      demandFormat: "(address[] arbiters, bytes[] demands)",
      isLogical: true,
      parseFunction: (data) => client.arbiters.decodeAnyArbiterDemand(data),
    });
  }

  parseDemand(arbiter: `0x${string}`, demand: `0x${string}`): any {
    const info = this.arbiterRegistry.get(arbiter);
    if (!info) {
      throw new Error(`Unknown arbiter: ${arbiter}`);
    }

    const parsed = info.parseFunction ? info.parseFunction(demand) : null;

    if (info.isLogical) {
      // Recursively parse logical arbiters
      const { arbiters, demands } = parsed;
      const subResults = [];

      for (let i = 0; i < arbiters.length; i++) {
        subResults.push(this.parseDemand(arbiters[i], demands[i]));
      }

      return {
        name: info.name,
        arbiters: arbiters,
        subDemands: subResults,
      };
    }

    return {
      name: info.name,
      data: parsed,
    };
  }
}

// Example usage
const parser = new DemandParser();
const result = parser.parseDemand(allArbiter, composedDemand);
console.log("Parsed demand structure:", JSON.stringify(result, null, 2));
```

**Alloy**

```rust
// Example: Recursive demand parser with arbiter registry
use std::collections::HashMap;

struct ArbiterInfo {
    name: String,
    demand_format: String,
    is_logical: bool,
}

struct DemandParser {
    arbiter_registry: HashMap<Address, ArbiterInfo>,
}

impl DemandParser {
    fn new() -> Self {
        let mut registry = HashMap::new();

        // Register known arbiters
        registry.insert(
            time_before_arbiter_address,
            ArbiterInfo {
                name: "TimeBeforeArbiter".to_string(),
                demand_format: "(uint64)".to_string(),
                is_logical: false,
            },
        );

        registry.insert(
            recipient_arbiter_address,
            ArbiterInfo {
                name: "RecipientArbiter".to_string(),
                demand_format: "(address)".to_string(),
                is_logical: false,
            },
        );

        registry.insert(
            trusted_oracle_arbiter_address,
            ArbiterInfo {
                name: "TrustedOracleArbiter".to_string(),
                demand_format: "(address,bytes)".to_string(),
                is_logical: false,
            },
        );

        registry.insert(
            all_arbiter_address,
            ArbiterInfo {
                name: "AllArbiter".to_string(),
                demand_format: "(address[],bytes[])".to_string(),
                is_logical: true,
            },
        );

        registry.insert(
            any_arbiter_address,
            ArbiterInfo {
                name: "AnyArbiter".to_string(),
                demand_format: "(address[],bytes[])".to_string(),
                is_logical: true,
            },
        );

        Self {
            arbiter_registry: registry,
        }
    }

    fn parse_demand(&self, arbiter: Address, demand: Bytes) -> eyre::Result<Value> {
        let info = self.arbiter_registry
            .get(&arbiter)
            .ok_or_else(|| eyre::eyre!("Unknown arbiter: {}", arbiter))?;

        if info.is_logical {
            // Parse as MultiArbiter::DemandData
            let demand_data = MultiArbiter::DemandData::abi_decode(&demand, true)?;

            // Recursively parse sub-demands
            let mut sub_results = Vec::new();
            for (sub_arbiter, sub_demand) in demand_data.arbiters.iter()
                .zip(demand_data.demands.iter())
            {
                sub_results.push(self.parse_demand(*sub_arbiter, sub_demand.clone())?);
            }

            return Ok(json!({
                "name": info.name,
                "arbiters": demand_data.arbiters,
                "subDemands": sub_results,
            }));
        }

        // Parse based on known format
        let parsed_data = match info.name.as_str() {
            "TimeBeforeArbiter" => {
                let data = contracts::TimeBeforeArbiter::DemandData::abi_decode(&demand, true)?;
                json!({ "time": data.time })
            },
            "RecipientArbiter" => {
                let data = contracts::RecipientArbiter::DemandData::abi_decode(&demand, true)?;
                json!({ "recipient": data.recipient })
            },
            "TrustedOracleArbiter" => {
                let data = contracts::TrustedOracleArbiter::DemandData::abi_decode(&demand, true)?;
                json!({ "oracle": data.oracle, "data": data.data })
            },
            _ => json!({ "raw": demand }),
        };

        Ok(json!({
            "name": info.name,
            "data": parsed_data,
        }))
    }
}

// Example usage
let parser = DemandParser::new();
let result = parser.parse_demand(all_arbiter_address, composed_demand)?;
println!("Parsed demand structure: {:#?}", result);
```

**Python**

```python
# Example: Recursive demand parser with arbiter registry
class DemandParser:
    def __init__(self):
        self.arbiter_registry = {}

        # Register known arbiters
        self.arbiter_registry[time_before_arbiter] = {
            'name': 'TimeBeforeArbiter',
            'demand_format': '(uint64)',
            'is_logical': False,
            'parse_function': lambda data: decode(['uint64'], data)[0]
        }

        self.arbiter_registry[recipient_arbiter] = {
            'name': 'RecipientArbiter',
            'demand_format': '(address)',
            'is_logical': False,
            'parse_function': lambda data: decode(['address'], data)[0]
        }

        self.arbiter_registry[trusted_oracle_arbiter] = {
            'name': 'TrustedOracleArbiter',
            'demand_format': '(address,bytes)',
            'is_logical': False,
            'parse_function': lambda data: decode(['address', 'bytes'], data)
        }

        self.arbiter_registry[all_arbiter] = {
            'name': 'AllArbiter',
            'demand_format': '(address[],bytes[])',
            'is_logical': True,
            'parse_function': lambda data: decode(['address[]', 'bytes[]'], data)
        }

        self.arbiter_registry[any_arbiter] = {
            'name': 'AnyArbiter',
            'demand_format': '(address[],bytes[])',
            'is_logical': True,
            'parse_function': lambda data: decode(['address[]', 'bytes[]'], data)
        }

    def parse_demand(self, arbiter, demand):
        """Recursively parse a demand based on the arbiter type"""
        info = self.arbiter_registry.get(arbiter)
        if not info:
            raise ValueError(f"Unknown arbiter: {arbiter}")

        parsed = info['parse_function'](demand) if 'parse_function' in info else None

        if info['is_logical']:
            # Recursively parse logical arbiters
            arbiters, demands = parsed
            sub_results = []

            for sub_arbiter, sub_demand in zip(arbiters, demands):
                sub_results.append(self.parse_demand(sub_arbiter, sub_demand))

            return {
                'name': info['name'],
                'arbiters': arbiters,
                'subDemands': sub_results
            }

        return {
            'name': info['name'],
            'data': parsed
        }

# Example usage
parser = DemandParser()
result = parser.parse_demand(all_arbiter, composed_demand)
import json
print("Parsed demand structure:", json.dumps(result, indent=2, default=str))

# Helper function to extract specific values from parsed structure
def find_arbiter_data(parsed, arbiter_name):
    """Find data for a specific arbiter in the parsed structure"""
    if parsed['name'] == arbiter_name:
        return parsed.get('data')

    if 'subDemands' in parsed:
        for sub in parsed['subDemands']:
            result = find_arbiter_data(sub, arbiter_name)
            if result is not None:
                return result

    return None

# Extract specific values
deadline = find_arbiter_data(result, 'TimeBeforeArbiter')
recipient = find_arbiter_data(result, 'RecipientArbiter')
print(f"Deadline: {datetime.fromtimestamp(deadline)}")
print(f"Recipient: {recipient}")
```
