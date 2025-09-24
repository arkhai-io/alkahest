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

[example: cryptography]
