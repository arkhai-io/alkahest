# Writing Arbiters (pt 1 - On-chain Arbiters)

Arbiters are smart contracts that implement the `IArbiter` interface to validate whether an obligation (attestation) satisfies specific requirements. They act as on-chain judges that determine if conditions have been met for releasing escrowed assets or fulfilling other blockchain operations.

## Single-transaction arbiters

Single-transaction arbiters perform validation synchronously within a single transaction. They check if an obligation meets the specified demands immediately when called.

### Example 1: String Capitalizer - Synchronous On-chain Computation

This example demonstrates how to write an arbiter that performs synchronous on-chain computations to validate data transformations. It works with a generic data-holding obligation format (`StringObligation`).

**Pattern illustrated**: Validating computational results where both the input (demand) and output (obligation) are stored on-chain, and the validation logic can be executed deterministically.

```solidity
contract StringCapitalizer is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        string query;  // Input data
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external view override returns (bool) {
        // Step 1: Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        // Step 2: Check counteroffer reference if provided
        if (counteroffer != bytes32(0) && obligation.refUID != counteroffer) {
            return false;
        }

        // Step 3: Decode both demand and obligation data
        DemandData memory demandData = abi.decode(demand, (DemandData));
        StringObligation.ObligationData memory obligationData =
            abi.decode(obligation.data, (StringObligation.ObligationData));

        // Step 4: Apply validation logic
        return _isCapitalized(demandData.query, obligationData.item);
    }

    function _isCapitalized(
        string memory query,
        string memory result
    ) internal pure returns (bool) {
        // Deterministic computation to validate transformation
        bytes memory queryBytes = bytes(query);
        bytes memory resultBytes = bytes(result);

        if (queryBytes.length != resultBytes.length) return false;

        for (uint256 i = 0; i < queryBytes.length; i++) {
            uint8 queryChar = uint8(queryBytes[i]);
            uint8 resultChar = uint8(resultBytes[i]);

            if (queryChar >= 0x61 && queryChar <= 0x7A) {
                // Lowercase should be capitalized
                if (resultChar != queryChar - 32) return false;
            } else {
                // Non-lowercase should remain unchanged
                if (resultChar != queryChar) return false;
            }
        }

        return true;
    }
}
```

**When to use this pattern**:

- Validating mathematical computations
- Checking data transformations (encoding, formatting, etc.)
- Verifying algorithmic solutions
- Any scenario where validation logic is purely computational

### Example 2: Game Winner - Conditional Escrow for External Attestations

This example demonstrates how to write an arbiter that creates a conditional escrow system for EAS attestations originating from external sources (like a game contract).

**Pattern illustrated**: Validating attestations from trusted external systems, where the arbiter acts as a bridge between existing attestation infrastructure and escrow mechanisms.

```solidity
contract GameWinner is IArbiter {
    using ArbiterUtils for Attestation;

    IEAS public immutable eas;
    bytes32 public immutable GAME_WINNER_SCHEMA;
    address public immutable trustedGameContract;

    struct GameWinnerData {
        bytes32 gameId;
        address winner;
        uint256 timestamp;
        uint256 score;
    }

    struct ClaimDemand {
        bytes32 gameId;
        uint256 minScore;
        uint256 validAfter;
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external view override returns (bool) {
        // Step 1: Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        // Step 2: Verify attestation source and type
        if (obligation.schema != GAME_WINNER_SCHEMA) return false;
        if (obligation.attester != trustedGameContract) return false;

        // Step 3: Check counteroffer reference if provided
        if (counteroffer != bytes32(0) && obligation.refUID != counteroffer) {
            return false;
        }

        // Step 4: Decode and validate against demand criteria
        GameWinnerData memory winnerData =
            abi.decode(obligation.data, (GameWinnerData));
        ClaimDemand memory claimDemand =
            abi.decode(demand, (ClaimDemand));

        // Step 5: Apply conditional logic
        if (winnerData.gameId != claimDemand.gameId) return false;
        if (winnerData.score < claimDemand.minScore) return false;
        if (winnerData.timestamp < claimDemand.validAfter) return false;

        // Step 6: Verify attestation ownership
        if (obligation.recipient != winnerData.winner) return false;

        return true;
    }
}
```

**When to use this pattern**:

- Bridging external attestation systems with escrow contracts
- Creating conditional release mechanisms based on third-party validations
- Implementing trust-based validation where specific attesters are authorized
- Building on top of existing EAS infrastructure

## Common Implementation Pattern

All single-transaction arbiters follow this structure:

1. **Define data structures**: Create structs for demand parameters and expected obligation data
2. **Implement `checkObligation`**: The main validation function that returns a boolean
3. **Validate attestation integrity**: Use `ArbiterUtils` to check expiration and revocation
4. **Verify schema and source** (if needed): Ensure attestations match expected format and origin
5. **Decode data**: Extract information from both obligation and demand
6. **Apply validation logic**: Implement the specific rules for your use case
7. **Return verdict**: Simple pass/fail boolean

The key difference between examples:

- **Computational validation** (StringCapitalizer): Demonstrates algorithmic verification of data transformations
- **Attestation bridging** (GameWinner): Demonstrates verification of external attestations with conditional logic

## Asynchronous arbiters

Asynchronous arbiters handle validation that cannot be completed in a single transaction. They maintain internal state across multiple transactions and only return true from `checkObligation` once a multi-step process has been completed.

### Example 3: MajorityVoteArbiter - Multi-transaction State Accumulation

This example demonstrates how to write an arbiter that accumulates state over multiple transactions before making a validation decision. It uses voting as an example of a process that requires multiple interactions before completion.

**Pattern illustrated**: Multi-transaction validation where the arbiter stores intermediate state and only approves obligations after a defined process reaches completion. The validation logic spans multiple transactions with state persistence between them.

```solidity
contract MajorityVoteArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address[] voters;  // List of authorized voters
        uint256 quorum;    // Minimum votes required for approval
        bytes data;        // Additional context for voters
    }

    struct VoteStatus {
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
        mapping(address => bool) vote;
    }

    IEAS public immutable eas;
    mapping(bytes32 => VoteStatus) public voteStatuses;

    // Events for transparency
    event VoteCast(
        bytes32 indexed obligation,
        address indexed voter,
        bool vote,
        uint256 yesVotes,
        uint256 noVotes
    );

    event ArbitrationComplete(
        bytes32 indexed obligation,
        bool decision,
        uint256 yesVotes,
        uint256 noVotes
    );

    function castVote(
        bytes32 obligation,
        bool vote,
        bytes calldata demandData
    ) external {
        DemandData memory demand = abi.decode(demandData, (DemandData));

        // Verify voter authorization
        bool isAuthorized = false;
        for (uint256 i = 0; i < demand.voters.length; i++) {
            if (demand.voters[i] == msg.sender) {
                isAuthorized = true;
                break;
            }
        }
        if (!isAuthorized) revert UnauthorizedVoter();

        VoteStatus storage status = voteStatuses[obligation];

        // Prevent double voting
        if (status.hasVoted[msg.sender]) revert AlreadyVoted();

        // Record vote
        status.hasVoted[msg.sender] = true;
        status.vote[msg.sender] = vote;

        if (vote) {
            status.yesVotes++;
        } else {
            status.noVotes++;
        }

        emit VoteCast(obligation, msg.sender, vote, status.yesVotes, status.noVotes);

        // Check if decision is reached
        if (status.yesVotes >= demand.quorum) {
            emit ArbitrationComplete(obligation, true, status.yesVotes, status.noVotes);
        } else if (status.noVotes > demand.voters.length - demand.quorum) {
            // Quorum becomes impossible
            emit ArbitrationComplete(obligation, false, status.yesVotes, status.noVotes);
        }
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /* counteroffer */
    ) public view override returns (bool) {
        // Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        DemandData memory demandData = abi.decode(demand, (DemandData));
        VoteStatus storage status = voteStatuses[obligation.uid];

        // Return true if quorum reached with yes votes
        return status.yesVotes >= demandData.quorum;
    }
}
```

**Key Implementation Aspects**:

1. **State Storage**: The contract maintains a mapping (`voteStatuses`) that persists state between transactions
2. **Process Accumulation**: Multiple transactions (`castVote`) modify the stored state incrementally
3. **Completion Detection**: The arbiter tracks when the process reaches a deterministic outcome
4. **Deferred Validation**: `checkObligation` returns false until the process completes, then returns the final decision

**When to use this pattern**:

- Validation that requires waiting for external events or timeouts
- Processes that need multiple parties to submit data before validation
- Scenarios where validation depends on accumulating evidence over time
- Any validation that cannot be deterministically computed in a single transaction

**Pattern Variations**:

- **Time-based**: Wait for a specific time period before allowing validation
- **Oracle-based**: Wait for external data submission from trusted sources
- **Challenge-based**: Allow a challenge period before finalizing validation
- **Threshold-based**: Accumulate metrics/scores until a threshold is reached

**Alternative Implementation Note**: Rather than implementing complex multi-transaction logic directly in an arbiter, you could also create a separate contract that manages the multi-step process and then submits a final result to `TrustedOracleArbiter`. This separation of concerns can make the system more modular and reusable.

## Implementing SDK extensions

When writing custom arbiters, you'll want to create corresponding SDK extensions to make them easy to use from client applications. The Alkahest SDKs (TypeScript, Rust, and Python) use a hierarchical module architecture.

### TypeScript SDK Extensions

The TypeScript SDK uses a factory pattern with hierarchical namespacing. To add support for a new arbiter:

1. **Create the arbiter module** with static encode/decode functions and a client factory:

```typescript
// alkahest-ts/src/clients/arbiters/custom/majorityVote.ts
import { decodeAbiParameters, encodeAbiParameters, getAbiItem, parseAbiItem } from "viem";
import { abi as majorityVoteArbiterAbi } from "../../../contracts/arbiters/MajorityVoteArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData type from contract ABI
const decodeDemandFunction = getAbiItem({
  abi: majorityVoteArbiterAbi.abi,
  name: "decodeDemandData",
});
const demandDataType = decodeDemandFunction.outputs[0];

export type MajorityVoteDemandData = {
  voters: `0x${string}`[];
  quorum: bigint;
  data: `0x${string}`;
};

// Static encode/decode functions (usable without client)
export const encodeDemand = (demand: MajorityVoteDemandData): `0x${string}` => {
  return encodeAbiParameters([demandDataType], [demand]);
};

export const decodeDemand = (demandData: `0x${string}`): MajorityVoteDemandData => {
  return decodeAbiParameters([demandDataType], demandData)[0] as MajorityVoteDemandData;
};

// Client factory for instance methods
export const makeMajorityVoteClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const voteEvent = parseAbiItem(
    "event VoteCast(bytes32 indexed obligation, address indexed voter, bool vote, uint256 yesVotes, uint256 noVotes)"
  );

  return {
    encodeDemand,
    decodeDemand,

    castVote: async (obligation: `0x${string}`, vote: boolean, demandData: `0x${string}`) => {
      return await viemClient.writeContract({
        address: addresses.majorityVoteArbiter,
        abi: majorityVoteArbiterAbi.abi,
        functionName: "castVote",
        args: [obligation, vote, demandData],
      });
    },

    getVoteStatus: async (obligation: `0x${string}`) => {
      const status = await viemClient.readContract({
        address: addresses.majorityVoteArbiter,
        abi: majorityVoteArbiterAbi.abi,
        functionName: "voteStatuses",
        args: [obligation],
      });
      return { yesVotes: status[0], noVotes: status[1] };
    },

    waitForQuorum: async (obligation: `0x${string}`, quorum: bigint) => {
      // Watch for VoteCast events until quorum reached
      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: addresses.majorityVoteArbiter,
          event: voteEvent,
          args: { obligation },
          onLogs: (logs) => {
            const latest = logs[logs.length - 1];
            if (latest && BigInt(latest.args.yesVotes!) >= quorum) {
              unwatch();
              resolve(latest.args);
            }
          },
        });
      });
    },
  };
};
```

2. **Integrate into the hierarchical client** by adding to a parent module:

```typescript
// alkahest-ts/src/clients/arbiters/custom/index.ts
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeMajorityVoteClient } from "./majorityVote";

export const makeCustomArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => ({
  majorityVote: makeMajorityVoteClient(viemClient, addresses),
});

// Re-export static functions and types
export { encodeDemand as encodeMajorityVoteDemand, decodeDemand as decodeMajorityVoteDemand } from "./majorityVote";
export type { MajorityVoteDemandData } from "./majorityVote";
```

### Rust SDK Extensions

The Rust SDK uses a module-based architecture with macros for ABI conversions:

1. **Define the module** with DemandData types and client methods:

```rust
// alkahest-rs/src/clients/arbiters/majority_vote.rs
use crate::{
    contracts,
    extensions::ContractModule,
    impl_abi_conversions,
    types::{SharedPublicProvider, SharedWalletProvider},
};
use alloy::{
    primitives::{Address, Bytes, U256},
    signers::local::PrivateKeySigner,
};

// Implement automatic ABI encoding/decoding via .into() conversions
impl_abi_conversions!(contracts::arbiters::MajorityVoteArbiter::DemandData);

pub struct MajorityVoteAddresses {
    pub majority_vote_arbiter: Address,
}

#[derive(Clone)]
pub struct MajorityVoteModule {
    signer: PrivateKeySigner,
    public_provider: SharedPublicProvider,
    wallet_provider: SharedWalletProvider,
    pub addresses: MajorityVoteAddresses,
}

impl MajorityVoteModule {
    pub fn new(
        signer: PrivateKeySigner,
        public_provider: SharedPublicProvider,
        wallet_provider: SharedWalletProvider,
        addresses: MajorityVoteAddresses,
    ) -> Self {
        Self { signer, public_provider, wallet_provider, addresses }
    }

    /// Cast a vote for an obligation
    pub async fn cast_vote(
        &self,
        obligation: alloy::primitives::FixedBytes<32>,
        vote: bool,
        demand_data: Bytes,
    ) -> eyre::Result<alloy::rpc::types::TransactionReceipt> {
        let contract = contracts::arbiters::MajorityVoteArbiter::new(
            self.addresses.majority_vote_arbiter,
            self.wallet_provider.clone(),
        );

        let tx = contract.castVote(obligation, vote, demand_data);
        let pending = tx.send().await?;
        let receipt = pending.get_receipt().await?;
        Ok(receipt)
    }

    /// Get vote status for an obligation
    pub async fn get_vote_status(
        &self,
        obligation: alloy::primitives::FixedBytes<32>,
    ) -> eyre::Result<(U256, U256)> {
        let contract = contracts::arbiters::MajorityVoteArbiter::new(
            self.addresses.majority_vote_arbiter,
            self.public_provider.clone(),
        );

        let status = contract.voteStatuses(obligation).call().await?;
        Ok((status.yesVotes, status.noVotes))
    }
}
```

2. **Add to the parent module** and expose via the client:

```rust
// In alkahest-rs/src/clients/arbiters/mod.rs
mod majority_vote;
pub use majority_vote::{MajorityVoteModule, MajorityVoteAddresses};

// In ArbitersModule, add accessor method:
impl ArbitersModule {
    pub fn majority_vote(&self) -> MajorityVoteModule {
        MajorityVoteModule::new(
            self.signer.clone(),
            self.public_provider.clone(),
            self.wallet_provider.clone(),
            // addresses from config
        )
    }
}
```

### Python SDK Extensions

The Python SDK uses PyO3 to wrap Rust modules, providing Python-native interfaces:

1. **Create PyO3 bindings** that wrap the Rust module:

```rust
// alkahest-py/src/clients/arbiters/majority_vote.rs
use alkahest_rs::clients::arbiters::MajorityVoteModule;
use pyo3::{pyclass, pymethods, PyResult};

#[pyclass]
#[derive(Clone)]
pub struct MajorityVote {
    inner: MajorityVoteModule,
}

impl MajorityVote {
    pub fn new(inner: MajorityVoteModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl MajorityVote {
    /// Cast a vote for an obligation
    pub fn cast_vote<'py>(
        &self,
        py: pyo3::Python<'py>,
        obligation: String,
        vote: bool,
        demand_data: Vec<u8>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let obligation_bytes = obligation.parse()
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(format!("{}", e)))?;
            let receipt = inner.cast_vote(obligation_bytes, vote, demand_data.into())
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
            Ok(format!("{:?}", receipt.transaction_hash))
        })
    }

    /// Get vote status for an obligation
    pub fn get_vote_status<'py>(
        &self,
        py: pyo3::Python<'py>,
        obligation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let obligation_bytes = obligation.parse()
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(format!("{}", e)))?;
            let (yes, no) = inner.get_vote_status(obligation_bytes)
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
            Ok((yes.to_string(), no.to_string()))
        })
    }

    /// Encode demand data (static method)
    #[staticmethod]
    pub fn encode_demand(voters: Vec<String>, quorum: u64, data: Vec<u8>) -> PyResult<Vec<u8>> {
        use alloy::sol_types::SolValue;
        let voters: Vec<alloy::primitives::Address> = voters.iter()
            .map(|v| v.parse())
            .collect::<Result<_, _>>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(format!("{}", e)))?;

        let demand = alkahest_rs::contracts::arbiters::MajorityVoteArbiter::DemandData {
            voters,
            quorum: alloy::primitives::U256::from(quorum),
            data: data.into(),
        };
        Ok(demand.abi_encode())
    }
}
```

2. **Expose via the ArbitersClient**:

```rust
// In alkahest-py/src/clients/arbiters/mod.rs
#[pymethods]
impl ArbitersClient {
    #[getter]
    pub fn majority_vote(&self) -> MajorityVote {
        MajorityVote::new(self.inner.majority_vote())
    }
}
```

### Best Practices for SDK Extensions

1. **Extract types from contract ABIs**: Use `getAbiItem` (TS) or `impl_abi_conversions!` (Rust) to derive types from contract ABIs rather than duplicating struct definitions
2. **Provide static functions**: Export `encodeDemand`/`decodeDemand` as static functions usable without instantiating a client
3. **Use hierarchical namespacing**: Organize under `client.arbiters.custom.*` or similar to match existing SDK patterns
4. **Handle async properly**: Use appropriate async patterns for each SDK (Promises in TS, async/await in Rust, PyO3 futures in Python)
5. **Add event helpers**: Include methods to watch for and parse relevant contract events
6. **Test with integration tests**: Write tests that deploy contracts and verify SDK interactions

### Example Usage Across SDKs

Once implemented, developers can use your arbiter consistently:

**TypeScript**:

```typescript
// Encode demand (static, no client needed)
import { encodeMajorityVoteDemand } from "alkahest-ts/clients/arbiters/custom";
const demand = encodeMajorityVoteDemand({ voters: [alice, bob, charlie], quorum: 2n, data: "0x" });

// Or via client instance
const demand = client.arbiters.custom.majorityVote.encodeDemand({ ... });
await client.arbiters.custom.majorityVote.castVote(obligationUid, true, demand);
const status = await client.arbiters.custom.majorityVote.getVoteStatus(obligationUid);
```

**Rust**:

```rust
use alkahest_rs::contracts::arbiters::MajorityVoteArbiter;
use alloy::sol_types::SolValue;

// Encode demand (using .into() from impl_abi_conversions!)
let demand_data = MajorityVoteArbiter::DemandData {
    voters: vec![alice, bob, charlie],
    quorum: U256::from(2),
    data: Bytes::default(),
};
let encoded: Bytes = demand_data.abi_encode().into();

// Via client
client.arbiters().majority_vote().cast_vote(obligation_uid, true, encoded).await?;
let (yes, no) = client.arbiters().majority_vote().get_vote_status(obligation_uid).await?;
```

**Python**:

```python
# Encode demand (static method)
demand = MajorityVote.encode_demand([alice, bob, charlie], 2, b"")

# Or via client
await client.arbiters.majority_vote.cast_vote(obligation_uid, True, demand)
yes_votes, no_votes = await client.arbiters.majority_vote.get_vote_status(obligation_uid)
```
