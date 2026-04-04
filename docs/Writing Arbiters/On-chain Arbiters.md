---
title: 'On-chain Arbiters'
slug: 'on-chain-arbiters'
---

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

When writing custom arbiters, you'll want to create corresponding SDK extensions to make them easy to use from client applications. The Alkahest SDKs (TypeScript, Rust, and Python) provide extensible architectures for adding new functionality.

### TypeScript SDK Extensions

To add support for a new arbiter in the TypeScript SDK:

1. **Create a client module** in `alkahest-ts/src/clients/`:

```typescript
// alkahest-ts/src/clients/majorityVote.ts
import type { ViemClient } from "../utils";
import type { ChainAddresses } from "../types";

export const makeMajorityVoteClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses,
) => ({
  encodeMajorityVoteDemand: (
    voters: string[],
    quorum: number,
    data: string,
  ) => {
    return encodeAbiParameters(
      [
        { name: "voters", type: "address[]" },
        { name: "quorum", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
      [voters, quorum, data],
    );
  },

  decodeMajorityVoteDemand: (encoded: string) => {
    return decodeAbiParameters(
      [
        { name: "voters", type: "address[]" },
        { name: "quorum", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
      encoded,
    );
  },

  castVote: async (obligation: string, vote: boolean, demandData: string) => {
    // Implementation for casting a vote
  },

  getVoteStatus: async (obligation: string) => {
    // Implementation for checking vote status
  },
});
```

2. **Add to the extensions** in `alkahest-ts/src/extensions.ts`:

```typescript
export const makeDefaultExtension = (client: any) => ({
  // ... existing extensions ...
  majorityVote: makeMajorityVoteClient(
    client.viemClient,
    client.contractAddresses,
  ),
});
```

### Rust SDK Extensions

For the Rust SDK, implement a trait-based extension:

1. **Define the trait** in `alkahest-rs/src/extensions/`:

```rust
// alkahest-rs/src/extensions/majority_vote.rs
use alloy::primitives::{Address, Bytes, U256};

#[async_trait]
pub trait HasMajorityVote {
    async fn encode_majority_vote_demand(
        &self,
        voters: Vec<Address>,
        quorum: U256,
        data: Bytes,
    ) -> Result<Bytes>;

    async fn cast_vote(
        &self,
        obligation: Bytes32,
        vote: bool,
        demand_data: Bytes,
    ) -> Result<TransactionReceipt>;

    async fn get_vote_status(
        &self,
        obligation: Bytes32,
    ) -> Result<(U256, U256)>; // (yes_votes, no_votes)
}
```

2. **Implement for AlkahestClient**:

```rust
impl<E> HasMajorityVote for AlkahestClient<E>
where
    E: AlkahestExtension,
{
    // Implementation details...
}
```

### Python SDK Extensions

The Python SDK uses PyO3 bindings to expose Rust functionality:

1. **Add Python bindings** in `alkahest-py/src/`:

```python
# alkahest-py/alkahest_py/__init__.py
from .alkahest_py import (
    # ... existing imports ...
    PyMajorityVoteArbiterDemandData as MajorityVoteArbiterDemandData,
)

class MajorityVoteClient:
    def encode_demand(self, voters: list[str], quorum: int, data: bytes) -> bytes:
        """Encode demand data for MajorityVoteArbiter"""
        pass

    def cast_vote(self, obligation: str, vote: bool, demand_data: bytes):
        """Cast a vote for an obligation"""
        pass

    def get_vote_status(self, obligation: str) -> tuple[int, int]:
        """Get current vote counts (yes_votes, no_votes)"""
        pass
```

2. **Expose via AlkahestClient**:

```python
class AlkahestClient:
    @property
    def majority_vote(self) -> MajorityVoteClient:
        """Access MajorityVote arbiter functionality"""
        return MajorityVoteClient(self._client)
```

### Best Practices for SDK Extensions

1. **Type Safety**: Use proper typing in all SDKs to catch errors at compile/type-check time
2. **Consistent APIs**: Keep method names and patterns consistent across SDKs
3. **Documentation**: Include comprehensive docstrings/comments with usage examples
4. **Testing**: Write integration tests that verify the SDK correctly interacts with contracts
5. **Error Handling**: Provide meaningful error messages for common failure cases
6. **Gas Estimation**: Include gas estimation helpers for transaction methods
7. **Event Parsing**: Add utilities to parse and filter relevant events

### Example Usage Across SDKs

Once implemented, developers can use your arbiter consistently across all SDKs:

**TypeScript**:

```typescript
const demandData = await client.majorityVote.encodeMajorityVoteDemand(
  [alice, bob, charlie],
  2,
  "0x",
);
await client.majorityVote.castVote(obligationUID, true, demandData);
```

**Rust**:

```rust
let demand_data = client.encode_majority_vote_demand(
    vec![alice, bob, charlie],
    U256::from(2),
    Bytes::default(),
).await?;
client.cast_vote(obligation_uid, true, demand_data).await?;
```

**Python**:

```python
demand_data = client.majority_vote.encode_demand(
    [alice, bob, charlie],
    2,
    b""
)
client.majority_vote.cast_vote(obligation_uid, True, demand_data)
```
