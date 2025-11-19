use alloy::sol;

// Test mock contracts
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    EAS,
    "src/fixtures/EAS.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    SchemaRegistry,
    "src/fixtures/SchemaRegistry.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    MockERC20Permit,
    "src/fixtures/MockERC20Permit.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    MockERC721,
    "src/fixtures/MockERC721.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    MockERC1155,
    "src/fixtures/MockERC1155.json"
);
