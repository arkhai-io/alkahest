# Writing Escrow Contracts

Escrow contracts are used to guarantee an on-chain action upon the fulfillment of a demand. The most common use case is locking tokens to be paid out on fulfillment, but any on-chain action which you can commit to beforehand can be escrowed.

In this guide, we'll walk through creating a custom escrow contract by examining the `VoteEscrowObligation` example contract located at `src/obligations/example/VoteEscrowObligation.sol`.

## Understanding the Escrow Pattern

Escrow contracts in Alkahest follow a specific lifecycle:

1. **Lock Phase** (`_lockEscrow`): Verify preconditions and lock the asset/commitment
2. **Wait Phase**: Wait for someone to fulfill the demand
3. **Release Phase** (`_releaseEscrow`): Execute the escrowed action when demand is met
4. **Return Phase** (`_returnEscrow`): Handle expiration if demand is never met

## Step 1: Define Your Obligation Data Structure

First, define what data your escrow needs. This struct will contain all parameters necessary for the escrow:

```solidity
struct ObligationData {
    address votingContract;  // Contract where action will occur
    uint256 proposalId;       // Specific target for the action
    uint8 support;           // Action parameters (0=Against, 1=For, 2=Abstain)
    address arbiter;         // Who verifies fulfillment conditions
    bytes demand;            // Arbiter-specific verification data
}
```

The `arbiter` and `demand` fields are required - they determine what conditions must be met to release the escrow.

## Step 2: Inherit from BaseEscrowObligation

Your contract must inherit from `BaseEscrowObligation` and register an attestation schema:

```solidity
import {BaseEscrowObligation} from "../../BaseEscrowObligation.sol";

contract VoteEscrowObligation is BaseEscrowObligation {
    constructor(
        IEAS _eas,
        ISchemaRegistry _schemaRegistry
    ) BaseEscrowObligation(
        _eas,
        _schemaRegistry,
        // Define your attestation schema
        "address votingContract,uint256 proposalId,uint8 support,address arbiter,bytes demand",
        true // revocable
    ) {}
}
```

## Step 3: Implement Data Encoding/Decoding

Create helper functions to encode and decode your obligation data:

```solidity
function encodeObligationData(
    ObligationData memory data
) public pure returns (bytes memory) {
    return abi.encode(
        data.votingContract,
        data.proposalId,
        data.support,
        data.arbiter,
        data.demand
    );
}

function decodeObligationData(
    bytes memory data
) public pure returns (ObligationData memory) {
    // Decode the data back into your struct
    (
        address votingContract,
        uint256 proposalId,
        uint8 support,
        address arbiter,
        bytes memory demand
    ) = abi.decode(data, (address, uint256, uint8, address, bytes));

    return ObligationData({
        votingContract: votingContract,
        proposalId: proposalId,
        support: support,
        arbiter: arbiter,
        demand: demand
    });
}
```

## Step 4: Implement extractArbiterAndDemand

This required method tells the base contract how to find the arbiter information:

```solidity
function extractArbiterAndDemand(
    bytes memory data
) public pure override returns (address arbiter, bytes memory demand) {
    ObligationData memory obligation = decodeObligationData(data);
    return (obligation.arbiter, obligation.demand);
}
```

## Step 5: Implement \_lockEscrow

This method is called when creating an escrow. Verify preconditions and track the escrow:

```solidity
function _lockEscrow(bytes memory data, address from) internal override {
    ObligationData memory obligation = decodeObligationData(data);

    // Example: Check user has delegated voting power
    IVotingContract votingContract = IVotingContract(obligation.votingContract);
    require(
        votingContract.delegates(from) == address(this),
        "Must delegate before creating escrow"
    );

    // Track the escrow using a deterministic hash
    bytes32 dataHash = keccak256(data);
    escrowedVoter[dataHash] = from;
    escrowedData[dataHash] = obligation;

    emit VoteDelegated(dataHash, from, obligation.votingContract);
}
```

**Important**: The `_lockEscrow` method runs with `msg.sender` as the escrow contract itself. If you need the user to be `msg.sender` (like for token transfers), handle those in a separate transaction before creating the escrow.

## Step 6: Implement \_releaseEscrow

This executes when the demand is fulfilled. Perform the escrowed action:

```solidity
function _releaseEscrow(
    bytes memory escrowData,
    address to,  // The fulfiller
    bytes32 fulfillmentUid
) internal override returns (bytes memory result) {
    ObligationData memory obligation = decodeObligationData(escrowData);
    bytes32 dataHash = keccak256(escrowData);

    // Get the original escrower
    address voter = escrowedVoter[dataHash];
    require(voter != address(0), "No active escrow");

    // Execute the escrowed action (e.g., cast a vote)
    IVotingContract votingContract = IVotingContract(obligation.votingContract);
    votingContract.castVoteWithReason(
        obligation.proposalId,
        obligation.support,
        string(abi.encodePacked("Vote cast on behalf of ", voter))
    );

    // Clean up
    delete escrowedVoter[dataHash];

    // Return any relevant data
    return abi.encode(obligation.proposalId, obligation.support, to, voter);
}
```

## Step 7: Implement \_returnEscrow

Handle expiration and cleanup when escrows are reclaimed:

```solidity
function _returnEscrow(bytes memory data, address to) internal override {
    bytes32 dataHash = keccak256(data);

    if (escrowedVoter[dataHash] != address(0)) {
        // Clean up storage
        delete escrowedVoter[dataHash];
        delete escrowedData[dataHash];

        emit VoteReturned(dataHash, to);

        // Note: Cannot automatically return delegated voting power
        // because only the user can call delegate() (msg.sender check)
    }
}
```

## Step 8: Add Public Entry Points

Create user-friendly functions for creating escrows:

```solidity
function doObligation(
    bytes calldata data,
    uint64 expirationTime
) external returns (bytes32 uid) {
    // Call the base implementation
    uid = doObligationRaw(data, expirationTime, bytes32(0));

    // Track any additional mappings you need
    bytes32 dataHash = keccak256(data);
    attestationToDataHash[uid] = dataHash;

    return uid;
}

// Overload for typed data
function doObligation(
    ObligationData memory obligationData,
    uint64 expirationTime
) external returns (bytes32 uid) {
    bytes memory encodedData = encodeObligationData(obligationData);
    return this.doObligation(encodedData, expirationTime);
}
```

## TypeScript SDK Extension

Create a TypeScript client for your escrow contract:

```typescript
import { getAttestedEventFromTxHash, type ViemClient } from "../utils";
import type { ChainAddresses, Demand } from "../types";

interface VoteData {
  votingContract: `0x${string}`;
  proposalId: bigint;
  support: number;
}

export const makeVoteEscrowClient = (
  viemClient: ViemClient,
  addresses: ChainAddresses & { voteEscrowObligation: `0x${string}` },
) => ({
  createVoteEscrow: async (
    vote: VoteData,
    demand: Demand,
    expiration: bigint,
  ) => {
    const hash = await viemClient.writeContract({
      address: addresses.voteEscrowObligation,
      abi: voteEscrowAbi.abi,
      functionName: "doObligation",
      args: [
        {
          votingContract: vote.votingContract,
          proposalId: vote.proposalId,
          support: vote.support,
          arbiter: demand.arbiter,
          demand: demand.demand,
        },
        expiration,
      ],
    });

    const attested = await getAttestedEventFromTxHash(viemClient, hash);
    return { hash, attested };
  },

  collectVoteEscrow: async (
    escrowAttestation: `0x${string}`,
    fulfillment: `0x${string}`,
  ) => {
    const hash = await viemClient.writeContract({
      address: addresses.voteEscrowObligation,
      abi: voteEscrowAbi.abi,
      functionName: "collectEscrowRaw",
      args: [escrowAttestation, fulfillment],
    });
    return hash;
  },
});
```

## Rust SDK Extension

Create a Rust client for your escrow contract:

```rust
use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;

pub struct VoteData {
    pub voting_contract: Address,
    pub proposal_id: u64,
    pub support: u8,
}

impl VoteEscrowModule {
    pub async fn create_vote_escrow(
        &self,
        vote: &VoteData,
        demand: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let vote_escrow_contract = contracts::VoteEscrowObligation::new(
            self.addresses.vote_escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = vote_escrow_contract
            .doObligation(
                contracts::VoteEscrowObligation::ObligationData {
                    voting_contract: vote.voting_contract,
                    proposal_id: vote.proposal_id.into(),
                    support: vote.support,
                    arbiter: demand.arbiter,
                    demand: demand.demand.clone(),
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
```

## Python SDK Extension

Create a Python client for your escrow contract:

```python
from eth_abi import encode
from web3 import Web3

class VoteEscrowClient:
    def __init__(self, web3: Web3, addresses: dict):
        self.w3 = web3
        self.vote_escrow_address = addresses['vote_escrow_obligation']

    async def create_vote_escrow(
        self,
        vote_data: dict,
        demand: dict,
        expiration: int = 0
    ):
        """
        Create a vote escrow.

        Args:
            vote_data: Dict with voting_contract, proposal_id, support
            demand: Dict with arbiter and demand bytes
            expiration: Unix timestamp for expiration (0 = no expiration)
        """
        contract = self.w3.eth.contract(
            address=self.vote_escrow_address,
            abi=VOTE_ESCROW_ABI
        )

        tx = await contract.functions.doObligation(
            (
                vote_data['voting_contract'],
                vote_data['proposal_id'],
                vote_data['support'],
                demand['arbiter'],
                demand['demand']
            ),
            expiration
        ).build_transaction()

        return await self.w3.eth.send_transaction(tx)
```

## Usage Example

Here's how users interact with your escrow contract:

```typescript
// Step 1: User prepares by delegating (if required)
await votingContract.delegate(voteEscrowAddress);

// Step 2: Create escrow
const escrow = await client.voteEscrow.createVoteEscrow(
  {
    votingContract: daoAddress,
    proposalId: 42n,
    support: 1, // Vote FOR
  },
  {
    arbiter: trivialArbiterAddress, // Arbiter that checks conditions
    demand: "0x", // Arbiter-specific data
  },
  0n, // No expiration
);

// Step 3: Someone fulfills the demand
const fulfillment = await createFulfillmentAttestation();

// Step 4: Collect escrow to execute the action
await client.voteEscrow.collectVoteEscrow(escrow.attested.uid, fulfillment.uid);

// Alternative: Reclaim if expired
await client.voteEscrow.reclaimExpired(escrow.attested.uid);
```

## Key Considerations

### Precondition Verification

Always verify that users have completed necessary setup before creating escrows. For example, the VoteEscrowObligation requires users to delegate voting power first.

### Message Sender Context

Remember that `_lockEscrow`, `_releaseEscrow`, and `_returnEscrow` execute with the escrow contract as `msg.sender`. If you need user-initiated actions (like token approvals), handle those separately.

### Cleanup After Expiration

The `_returnEscrow` method cannot always undo all actions automatically. Users may need to take manual steps after reclaiming expired escrows.

### One Escrow Per User

Consider implementing limits to prevent conflicts. The example tracks `activeEscrow` to ensure each user has only one active escrow at a time.

### Arbiter Selection

Choose arbiters carefully based on your use case:

- `TrivialArbiter`: Always returns true (useful for testing)
- `StringObligation`: Checks for matching string attestations
- Custom arbiters: Implement complex verification logic

## Testing Your Escrow Contract

Write comprehensive tests covering the full lifecycle:

```solidity
contract VoteEscrowTest is Test {
    function testFullEscrowFlow() public {
        // Setup
        vm.startPrank(alice);
        votingContract.delegate(address(voteEscrow));

        // Create escrow
        bytes32 escrowUid = voteEscrow.doObligation(
            encodeData(proposalId, voteFor, arbiter, demand),
            0 // no expiration
        );
        vm.stopPrank();

        // Create fulfillment
        vm.startPrank(bob);
        bytes32 fulfillmentUid = createFulfillment();

        // Collect escrow
        voteEscrow.collectEscrowRaw(escrowUid, fulfillmentUid);
        vm.stopPrank();

        // Verify action executed
        assertTrue(votingContract.hasVoted(proposalId, address(voteEscrow)));
    }
}
```

## Summary

Creating an escrow contract involves:

1. Defining your obligation data structure
2. Inheriting from `BaseEscrowObligation`
3. Implementing the four required methods
4. Adding user-friendly entry points
5. Creating SDK extensions for easy integration
6. Testing the complete escrow lifecycle

The `VoteEscrowObligation` example at `src/obligations/example/VoteEscrowObligation.sol` demonstrates all these patterns in a working implementation that escrows voting power until conditions are met.
