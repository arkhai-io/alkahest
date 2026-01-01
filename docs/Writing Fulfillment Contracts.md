# Writing Fulfillment Contracts

Fulfillment contracts are specialized obligation contracts that create attestations representing completed work, delivered results, or fulfilled conditions. These contracts work in tandem with arbiters to enable conditional release of escrowed assets or execution of on-chain actions.

## Using StringObligation

The simplest pattern for fulfillment uses generic contracts like `StringObligation` that can store arbitrary string data. This approach prioritizes flexibility and rapid prototyping over structure and type safety.

**Pattern illustrated**: Using generic data containers for fulfillments where the validation logic is entirely handled by external arbiters (often off-chain oracles).

### Example: API-like Compute Jobs with Generic Results

This example demonstrates submitting unstructured results that are validated by trusted oracles:

```solidity
// Step 1: Create escrow with query for oracle validation
bytes memory innerDemand = abi.encode("GET weather NYC");
bytes memory demand = abi.encode(
    TrustedOracleArbiter.DemandData({
        oracle: oracleAddress,
        data: innerDemand
    })
);

bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: paymentToken,
        amount: paymentAmount,
        arbiter: address(trustedOracleArbiter),
        demand: demand
    }),
    expirationTime
);

// Step 2: Submit result as simple string
StringObligation.ObligationData memory resultData = StringObligation
    .ObligationData({
        item: "72F, sunny"  // Unstructured result
    });

bytes32 fulfillmentUid = stringObligation.doObligation(
    resultData,
    escrowUid  // Reference to the escrow being fulfilled
);

// Step 3: Oracle validates the string result
trustedOracleArbiter.arbitrate(fulfillmentUid, true);

// Step 4: Claim escrow with validated fulfillment
erc20EscrowObligation.collectEscrow(escrowUid, fulfillmentUid);
```

**When to use this pattern**:

- Rapid prototyping where data format is still evolving
- Simple text-based results (answers, summaries, translations)
- Cases where all validation logic lives off-chain
- Maximum flexibility is more important than on-chain queryability

**Trade-offs**:

- ✅ Maximum flexibility - any string data can be stored
- ✅ Simple to implement and modify
- ✅ Low gas costs for simple data
- ❌ No on-chain structure or validation
- ❌ Difficult to query or index specific fields
- ❌ All parsing must happen off-chain

## Fulfillment contracts that don't implement IArbiter

More sophisticated fulfillment patterns use specialized contracts that enforce structure without implementing validation logic. This separation of concerns creates cleaner, more maintainable systems.

**Pattern illustrated**: Creating domain-specific fulfillment contracts that provide structure and helper functions while delegating validation to separate arbiter contracts.

### Example: Specialized API Result Contract

This example shows a fulfillment contract specialized for API-like results with rich metadata:

```solidity
contract ApiResultObligation is BaseObligation {
    struct ObligationData {
        string endpoint;      // API endpoint called
        string method;        // HTTP method
        uint16 statusCode;    // Response status
        string headers;       // Response headers
        string body;         // Response body
        uint256 timestamp;    // When the call was made
    }

    // Helper functions for structured queries
    function isSuccessfulCall(bytes32 uid) external view returns (bool) {
        ObligationData memory data = getObligationData(uid);
        return data.statusCode >= 200 && data.statusCode < 300;
    }

    function matchesEndpoint(
        bytes32 uid,
        string calldata endpoint
    ) external view returns (bool) {
        ObligationData memory data = getObligationData(uid);
        return keccak256(bytes(data.endpoint)) == keccak256(bytes(endpoint));
    }

    // Convenience method for common cases
    function doSimpleObligation(
        string calldata endpoint,
        string calldata body,
        bytes32 refUID
    ) external returns (bytes32) {
        ObligationData memory data = ObligationData({
            endpoint: endpoint,
            method: "GET",
            statusCode: 200,
            headers: "Content-Type: application/json",
            body: body,
            timestamp: block.timestamp
        });
        return doObligation(data, refUID);
    }
}
```

Usage example:

```solidity
// Submit structured result
ApiResultObligation.ObligationData memory resultData =
    ApiResultObligation.ObligationData({
        endpoint: "https://api.weather.com/v1/NYC",
        method: "GET",
        statusCode: 200,
        headers: "Content-Type: application/json",
        body: '{"temperature": "72", "unit": "F"}',
        timestamp: block.timestamp
    });

bytes32 fulfillmentUid = apiResultObligation.doObligation(
    resultData,
    escrowUid
);

// Oracle can now validate with rich context
bool isSuccess = apiResultObligation.isSuccessfulCall(fulfillmentUid);
bool correctEndpoint = apiResultObligation.matchesEndpoint(
    fulfillmentUid,
    expectedEndpoint
);
```

**When to use this pattern**:

- Production systems requiring consistent data formats
- Need for on-chain queryability and indexing
- Multiple validation criteria based on different fields
- Complex domains with rich metadata requirements

**Benefits of separation from IArbiter**:

1. **Single Responsibility**: Fulfillment contracts focus on data storage and access
2. **Reusability**: Same fulfillment format can work with different arbiters
3. **Upgradeability**: Can deploy new arbiters without changing fulfillment format
4. **Composability**: Can combine multiple fulfillment types with logical arbiters

### Design Considerations

When choosing between generic and specialized fulfillment contracts:

**Use Generic (StringObligation) when**:

- Data format is undefined or rapidly changing
- Validation is entirely off-chain
- Simplicity is paramount
- Gas optimization for simple data

**Use Specialized contracts when**:

- Data has consistent structure
- On-chain validation or queries are needed
- Multiple parties need to interpret the data
- Building production-grade systems

### Advanced Pattern: Typed Fulfillment Registry

For systems with many fulfillment types, consider a registry pattern:

```solidity
contract FulfillmentRegistry {
    mapping(string => address) public fulfillmentContracts;

    function registerFulfillmentType(
        string calldata typeName,
        address contractAddress
    ) external onlyOwner {
        fulfillmentContracts[typeName] = contractAddress;
    }

    function getFulfillmentContract(
        string calldata typeName
    ) external view returns (address) {
        address contract_ = fulfillmentContracts[typeName];
        require(contract_ != address(0), "Unknown fulfillment type");
        return contract_;
    }
}
```

This enables dynamic fulfillment types while maintaining structure:

- Requesters specify desired fulfillment type in demands
- Providers use the appropriate contract for their fulfillment
- Oracles know how to parse each registered type
- New types can be added without modifying existing contracts

## Fulfillment contracts that implement IArbiter

Some fulfillment contracts have an obvious, inherent way to validate their data that makes sense to bundle directly with the obligation format. This pattern combines the obligation and arbiter functionality when the validation logic is tightly coupled to the data structure itself.

**Pattern illustrated**: Bundled validation for cases where there's a single, canonical way to verify the fulfillment data (e.g., cryptographic signatures, mathematical proofs, or other deterministic validation).

### Example: Cryptographic Signature Verification

This example demonstrates a combined Obligation/IArbiter contract that handles cryptographic signature verification:

```solidity
contract CryptoSignatureObligation is BaseObligation, IArbiter {
    struct DemandData {
        address publicKey;      // Required signer
        bytes32 challenge;      // Message to sign
        string domain;         // Optional EIP-712 domain
    }

    struct ObligationData {
        bytes signature;       // The cryptographic proof
        address signerAddress; // Who created the signature
        uint256 timestamp;     // When signed
        string metadata;       // Additional context
    }

    // Implements IArbiter to self-validate
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 fulfilling
    ) external view override returns (bool) {
        DemandData memory demandData = abi.decode(demand, (DemandData));
        ObligationData memory obligationData = decodeObligationData(
            obligation.data
        );

        // Verify signer matches requirement
        if (obligationData.signerAddress != demandData.publicKey) {
            return false;
        }

        // Verify signature cryptographically
        return _verifySignature(
            demandData.challenge,
            obligationData.signature,
            demandData.publicKey,
            demandData.domain
        );
    }

    function _verifySignature(
        bytes32 challenge,
        bytes memory signature,
        address expectedSigner,
        string memory domain
    ) internal pure returns (bool) {
        // Extract signature components
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // Create message hash
        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", challenge)
        );

        // Recover and verify signer
        address recoveredSigner = ecrecover(messageHash, v, r, s);
        return recoveredSigner == expectedSigner;
    }
}
```

Usage example:

```solidity
// Step 1: Create escrow requiring Bob's signature
bytes memory demand = cryptoSigObligation.encodeDemand(
    bob,                           // Bob must sign
    keccak256("Authenticate"),     // Challenge to sign
    ""                            // No domain
);

bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: paymentToken,
        amount: paymentAmount,
        arbiter: address(cryptoSigObligation),  // Self-validating
        demand: demand
    }),
    expirationTime
);

// Step 2: Bob creates signature off-chain
bytes32 messageHash = keccak256(
    abi.encodePacked("\x19Ethereum Signed Message:\n32", challenge)
);
(uint8 v, bytes32 r, bytes32 s) = signMessage(messageHash);  // Off-chain
bytes memory signature = abi.encodePacked(r, s, v);

// Step 3: Submit signature as fulfillment
bytes32 fulfillmentUid = cryptoSigObligation.doObligation(
    CryptoSignatureObligation.ObligationData({
        signature: signature,
        signerAddress: bob,
        timestamp: block.timestamp,
        metadata: "Authentication proof"
    }),
    escrowUid
);

// Step 4: Claim escrow (self-validates via checkObligation)
erc20EscrowObligation.collectEscrow(escrowUid, fulfillmentUid);
```

**When to use this pattern**:

- The fulfillment format has one obvious way to validate it
- Validation logic is inherently tied to the data structure
- The same validation will always be used (no alternative interpretations)
- Examples: cryptographic signatures, hash preimages, mathematical proofs

**When NOT to use this pattern**:

- Generic data formats that could be validated many different ways (like `StringObligation`)
- When validation logic might need to be updated or swapped
- When different use cases require different validation criteria
- When validation depends on external state or oracle data

**Trade-offs**:

1. **Simplicity**: Single contract for both storage and validation
2. **Tight Coupling**: Can't swap validation logic without new contract
3. **Clear Intent**: The validation method is part of the fulfillment definition
4. **Gas Consideration**: Validation logic affects every claim transaction

### Design Principles for Combined Obligation/Arbiter Contracts

When deciding whether to implement IArbiter in a fulfillment contract:

**Good Candidates**:

- Cryptographic operations (signatures, hashes, proofs)
- Mathematical validations (ranges, formulas, checksums)
- Self-contained proofs with deterministic verification
- Domain-specific formats with canonical validation

**Poor Candidates**:

- Generic containers (strings, bytes, JSON-like structures)
- Business logic that may evolve
- Validations requiring external data or consensus
- Formats used across different validation contexts

**Implementation Guidelines**:

- Keep `doObligation()` and `checkObligation()` logic clearly separated
- Validation should be deterministic and state-independent
- Consider gas costs of validation in every claim
- Document why validation is bundled rather than separate

### Advanced Pattern: Proof Aggregation

For complex scenarios requiring multiple proofs:

```solidity
contract MultiProofObligation is BaseObligation, IArbiter {
    struct ProofSet {
        bytes[] proofs;
        uint256 proofType;  // Bitmap of proof types included
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external pure override returns (bool) {
        ProofSet memory proofs = abi.decode(obligation.data, (ProofSet));
        RequiredProofs memory required = abi.decode(demand, (RequiredProofs));

        // Verify each required proof type is present and valid
        for (uint i = 0; i < required.types.length; i++) {
            if (!_verifyProof(proofs, required.types[i])) {
                return false;
            }
        }
        return true;
    }
}
```

This pattern enables:

- Multiple proof requirements in single fulfillment
- Flexible proof combinations
- Efficient batch validation
- Extensible proof types

### Choosing Between Patterns

**Separate Arbiters (like with StringObligation)**:

- Maximum flexibility - any arbiter can validate
- Clean separation of concerns
- Validation logic can evolve independently
- Same format works with different validation strategies

**Combined Obligation/IArbiter (like CryptoSignatureObligation)**:

- Natural fit when validation is inherent to the format
- Simpler deployment (one contract instead of two)
- Clear semantics - the validation is part of the definition
- Reduced flexibility - validation is fixed

The choice isn't about sophistication but about coupling: use combined contracts when the validation method is fundamental to what the fulfillment represents, and separate contracts when the data format and validation logic naturally vary independently.
