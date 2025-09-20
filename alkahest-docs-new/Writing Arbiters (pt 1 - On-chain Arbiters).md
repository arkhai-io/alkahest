# Writing Arbiters (pt 1 - On-chain Arbiters)

Arbiters are smart contracts that implement the `IArbiter` interface to validate whether an obligation (attestation) satisfies specific requirements. They act as on-chain judges that determine if conditions have been met for releasing escrowed assets or fulfilling other blockchain operations.

## Single-transaction arbiters

Single-transaction arbiters perform validation synchronously within a single transaction. They check if an obligation meets the specified demands immediately when called, making them ideal for scenarios where validation logic can be executed entirely on-chain without external dependencies.

### Example 1: String Capitalizer

The `StringCapitalizer` arbiter validates that a string has been properly capitalized. This is useful for tasks where users must transform text according to specific rules.

**Use Case**: A user posts a demand for someone to capitalize a string (e.g., "hello world"). Another user fulfills this by providing "HELLO WORLD". The arbiter validates that every lowercase letter has been converted to uppercase.

**Implementation**: `src/arbiters/example/StringCapitalizer.sol`

```solidity
contract StringCapitalizer is IArbiter {
    struct DemandData {
        string query;  // The string to be capitalized
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external view override returns (bool) {
        // Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        // Decode the demand and obligation
        DemandData memory demandData = abi.decode(demand, (DemandData));
        StringObligation.ObligationData memory obligationData =
            abi.decode(obligation.data, (StringObligation.ObligationData));

        // Check if the result is properly capitalized
        return _isCapitalized(demandData.query, obligationData.item);
    }
}
```

**Key Features**:

- Validates character-by-character transformation
- Handles mixed case inputs, numbers, and special characters
- Ensures string length matches between input and output
- Supports counteroffer references for specific demand fulfillment

**Testing**: See `test/integration/StringCapitalizer.t.sol` for comprehensive test coverage including:

- Valid capitalization scenarios
- Invalid capitalization rejection
- Mixed case handling
- Special character preservation
- Fuzz testing for edge cases

### Example 2: Game Winner

The `GameWinner` arbiter validates EAS attestations that prove a user won a game, enabling them to claim rewards from escrow. This demonstrates how arbiters can work with existing attestation systems.

**Use Case**: A gaming platform issues EAS attestations to winners. Players can use these attestations to claim prizes from various reward pools that specify requirements like minimum scores or specific games.

**Implementation**: `src/arbiters/example/GameWinner.sol`

```solidity
contract GameWinner is IArbiter {
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
        bytes32 gameId;      // Which game the reward is for
        uint256 minScore;    // Minimum score required
        uint256 validAfter;  // Time after which wins are valid
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external view override returns (bool) {
        // Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        // Verify correct schema and trusted attester
        if (obligation.schema != GAME_WINNER_SCHEMA) return false;
        if (obligation.attester != trustedGameContract) return false;

        // Decode and validate game winner data
        GameWinnerData memory winnerData =
            abi.decode(obligation.data, (GameWinnerData));
        ClaimDemand memory claimDemand =
            abi.decode(demand, (ClaimDemand));

        // Check all requirements
        if (winnerData.gameId != claimDemand.gameId) return false;
        if (winnerData.score < claimDemand.minScore) return false;
        if (winnerData.timestamp < claimDemand.validAfter) return false;
        if (obligation.recipient != winnerData.winner) return false;

        return true;
    }
}
```

**Key Features**:

- Validates attestations from trusted game contracts only
- Checks multiple claim requirements (game ID, minimum score, validity period)
- Prevents attestation reuse by verifying recipient matches winner
- Supports flexible reward criteria through `ClaimDemand` structure

**Security Considerations**:

- Only accepts attestations from the designated game contract
- Verifies schema UID to prevent attestation type confusion
- Ensures recipient field matches winner to prevent unauthorized claims
- Supports time-based validity for tournament or seasonal rewards

**Testing**: See `test/integration/GameWinner.t.sol` for comprehensive test coverage including:

- Valid winner claim scenarios
- Invalid game ID rejection
- Insufficient score handling
- Time-based validity checks
- Untrusted attester rejection
- Schema validation
- Multiple winners for team games

## Usage Pattern

Both examples follow a common pattern for single-transaction arbiters:

1. **Define demand structure**: Specify what requirements must be met
2. **Validate attestation**: Check expiration, revocation, and schema
3. **Decode data**: Extract information from both obligation and demand
4. **Apply business logic**: Implement specific validation rules
5. **Return verdict**: Simple boolean indicating pass/fail

This pattern makes arbiters composable with escrow systems and other DeFi protocols that need conditional execution based on attestations.

## Asynchronous arbiters

Asynchronous arbiters handle validation that cannot be completed in a single transaction, such as time-delayed verification or multi-party consensus.

[example: vote - to be implemented]
