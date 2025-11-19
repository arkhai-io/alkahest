use alkahest_rs::{
    clients::arbiters::DecodedDemand,
    contracts::{
        attestation_properties::composing::{AttesterArbiter, SchemaArbiter},
        logical::AllArbiter,
    },
    extensions::HasArbiters,
    utils::setup_test_environment,
};
use alloy::primitives::{Address, Bytes, FixedBytes};

/// Test creating and decoding a complex tree arbiter structure
/// This demonstrates the full decode functionality working with deeply nested arbiters
#[tokio::test]
async fn test_complex_tree_arbiter_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Step 1: Create leaf arbiters (AttesterArbiter and SchemaArbiter that reference TrivialArbiter)

    // Create an AttesterArbiter that requires a specific attester
    let attester1 = Address::from_slice(&[1u8; 20]);
    let attester_demand1 = AttesterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter, // Points to TrivialArbiter (leaf)
        baseDemand: Bytes::new(),
        attester: attester1,
    };
    let attester_bytes1: Bytes = attester_demand1.clone().into();

    // Create a SchemaArbiter that requires a specific schema
    let schema1 = FixedBytes::<32>::from_slice(&[2u8; 32]);
    let schema_demand1 = SchemaArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter, // Points to TrivialArbiter (leaf)
        baseDemand: Bytes::new(),
        schema: schema1,
    };
    let schema_bytes1: Bytes = schema_demand1.clone().into();

    // Step 2: Create a nested AttesterArbiter that references the SchemaArbiter
    let attester2 = Address::from_slice(&[3u8; 20]);
    let nested_attester_demand = AttesterArbiter::DemandData {
        baseArbiter: addresses.schema_arbiter_composing, // Points to SchemaArbiter
        baseDemand: schema_bytes1.clone(),
        attester: attester2,
    };
    let nested_attester_bytes: Bytes = nested_attester_demand.clone().into();

    // Step 3: Create the root AllArbiter that contains all the arbiters
    let all_arbiter_demand = AllArbiter::DemandData {
        arbiters: vec![
            addresses.attester_arbiter_composing, // First attester arbiter
            addresses.schema_arbiter_composing,   // Schema arbiter
            addresses.attester_arbiter_composing, // Nested attester arbiter
            addresses.trivial_arbiter,            // Direct trivial arbiter
        ],
        demands: vec![
            attester_bytes1,       // Demand for first attester arbiter
            schema_bytes1,         // Demand for schema arbiter
            nested_attester_bytes, // Demand for nested attester arbiter
            Bytes::new(),          // Empty demand for trivial arbiter
        ],
    };
    let all_arbiter_bytes: Bytes = all_arbiter_demand.clone().into();

    // Step 4: Test decoding the entire tree structure
    let decoded = test
        .alice_client
        .arbiters()
        .decode_arbiter_demand(addresses.all_arbiter, &all_arbiter_bytes)?;

    // Step 5: Verify the decoded structure
    match decoded {
        DecodedDemand::AllArbiter(all_data) => {
            assert_eq!(all_data.arbiters.len(), 4);
            assert_eq!(all_data.demands.len(), 4);

            // Verify first attester arbiter (leaf level)
            match &all_data.demands[0] {
                DecodedDemand::AttesterArbiterComposing(attester_data) => {
                    assert_eq!(attester_data.attester, attester1);
                    assert_eq!(attester_data.base_arbiter, addresses.trivial_arbiter);
                    // Verify nested base demand is TrivialArbiter
                    match attester_data.base_demand.as_ref() {
                        DecodedDemand::TrivialArbiter => {
                            println!(
                                "✅ First attester arbiter correctly decoded with TrivialArbiter base"
                            );
                        }
                        _ => panic!("Expected TrivialArbiter in first attester base demand"),
                    }
                }
                _ => panic!("Expected AttesterArbiterComposing for first demand"),
            }

            // Verify schema arbiter (leaf level)
            match &all_data.demands[1] {
                DecodedDemand::SchemaArbiterComposing(schema_data) => {
                    assert_eq!(schema_data.schema, schema1);
                    assert_eq!(schema_data.base_arbiter, addresses.trivial_arbiter);
                    // Verify nested base demand is TrivialArbiter
                    match schema_data.base_demand.as_ref() {
                        DecodedDemand::TrivialArbiter => {
                            println!(
                                "✅ Schema arbiter correctly decoded with TrivialArbiter base"
                            );
                        }
                        _ => panic!("Expected TrivialArbiter in schema base demand"),
                    }
                }
                _ => panic!("Expected SchemaArbiterComposing for second demand"),
            }

            // Verify nested attester arbiter (two levels deep)
            match &all_data.demands[2] {
                DecodedDemand::AttesterArbiterComposing(nested_attester_data) => {
                    assert_eq!(nested_attester_data.attester, attester2);
                    assert_eq!(
                        nested_attester_data.base_arbiter,
                        addresses.schema_arbiter_composing
                    );

                    // Verify the nested base demand is a SchemaArbiter
                    match nested_attester_data.base_demand.as_ref() {
                        DecodedDemand::SchemaArbiterComposing(nested_schema_data) => {
                            assert_eq!(nested_schema_data.schema, schema1);
                            assert_eq!(nested_schema_data.base_arbiter, addresses.trivial_arbiter);

                            // Verify the deepest level is TrivialArbiter
                            match nested_schema_data.base_demand.as_ref() {
                                DecodedDemand::TrivialArbiter => {
                                    println!(
                                        "✅ Nested attester arbiter correctly decoded with SchemaArbiter->TrivialArbiter chain"
                                    );
                                }
                                _ => panic!("Expected TrivialArbiter in deepest nested level"),
                            }
                        }
                        _ => {
                            panic!("Expected SchemaArbiterComposing in nested attester base demand")
                        }
                    }
                }
                _ => panic!("Expected AttesterArbiterComposing for third demand"),
            }

            // Verify direct trivial arbiter
            match &all_data.demands[3] {
                DecodedDemand::TrivialArbiter => {
                    println!("✅ Direct trivial arbiter correctly decoded");
                }
                _ => panic!("Expected TrivialArbiter for fourth demand"),
            }

            println!("✅ Complex tree arbiter structure successfully created and decoded!");
            println!("   Tree structure:");
            println!("   AllArbiter");
            println!("   ├── AttesterArbiter -> TrivialArbiter");
            println!("   ├── SchemaArbiter -> TrivialArbiter");
            println!("   ├── AttesterArbiter -> SchemaArbiter -> TrivialArbiter");
            println!("   └── TrivialArbiter");
        }
        _ => panic!("Expected AllArbiter at root level"),
    }

    Ok(())
}

/// Test creating an even more complex nested structure using AnyArbiter
#[tokio::test]
async fn test_any_arbiter_nested_tree_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Create multiple different composing arbiters as leaves
    let attester = Address::from_slice(&[10u8; 20]);
    let schema = FixedBytes::<32>::from_slice(&[20u8; 32]);

    // Create AttesterArbiter
    let attester_demand = AttesterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        attester,
    };
    let attester_bytes: Bytes = attester_demand.into();

    // Create SchemaArbiter
    let schema_demand = SchemaArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        schema,
    };
    let schema_bytes: Bytes = schema_demand.into();

    // Create an AllArbiter containing the above arbiters
    let inner_all_demand = AllArbiter::DemandData {
        arbiters: vec![
            addresses.attester_arbiter_composing,
            addresses.schema_arbiter_composing,
        ],
        demands: vec![attester_bytes, schema_bytes],
    };
    let inner_all_bytes: Bytes = inner_all_demand.into();

    // Create an AnyArbiter that contains the AllArbiter and a direct TrivialArbiter
    use alkahest_rs::contracts::logical::AnyArbiter;
    let any_arbiter_demand = AnyArbiter::DemandData {
        arbiters: vec![addresses.all_arbiter, addresses.trivial_arbiter],
        demands: vec![inner_all_bytes, Bytes::new()],
    };
    let any_arbiter_bytes: Bytes = any_arbiter_demand.into();

    // Decode the AnyArbiter tree
    let decoded = test
        .alice_client
        .arbiters()
        .decode_arbiter_demand(addresses.any_arbiter, &any_arbiter_bytes)?;

    match decoded {
        DecodedDemand::AnyArbiter(any_data) => {
            assert_eq!(any_data.arbiters.len(), 2);
            assert_eq!(any_data.demands.len(), 2);

            // First demand should be AllArbiter
            match &any_data.demands[0] {
                DecodedDemand::AllArbiter(all_data) => {
                    assert_eq!(all_data.arbiters.len(), 2);

                    // Verify nested AttesterArbiter
                    match &all_data.demands[0] {
                        DecodedDemand::AttesterArbiterComposing(attester_data) => {
                            assert_eq!(attester_data.attester, attester);
                            println!(
                                "✅ Nested AttesterArbiter in AnyArbiter->AllArbiter correctly decoded"
                            );
                        }
                        _ => panic!("Expected AttesterArbiterComposing in nested AllArbiter"),
                    }

                    // Verify nested SchemaArbiter
                    match &all_data.demands[1] {
                        DecodedDemand::SchemaArbiterComposing(schema_data) => {
                            assert_eq!(schema_data.schema, schema);
                            println!(
                                "✅ Nested SchemaArbiter in AnyArbiter->AllArbiter correctly decoded"
                            );
                        }
                        _ => panic!("Expected SchemaArbiterComposing in nested AllArbiter"),
                    }
                }
                _ => panic!("Expected AllArbiter in first AnyArbiter demand"),
            }

            // Second demand should be TrivialArbiter
            match &any_data.demands[1] {
                DecodedDemand::TrivialArbiter => {
                    println!("✅ Direct TrivialArbiter in AnyArbiter correctly decoded");
                }
                _ => panic!("Expected TrivialArbiter in second AnyArbiter demand"),
            }

            println!("✅ Complex AnyArbiter tree structure successfully created and decoded!");
            println!("   Tree structure:");
            println!("   AnyArbiter");
            println!("   ├── AllArbiter");
            println!("   │   ├── AttesterArbiter -> TrivialArbiter");
            println!("   │   └── SchemaArbiter -> TrivialArbiter");
            println!("   └── TrivialArbiter");
        }
        _ => panic!("Expected AnyArbiter at root level"),
    }

    Ok(())
}

/// Test the centralized decode functionality with a tree structure
#[tokio::test]
async fn test_centralized_tree_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Create a multi-level tree using multiple arbiter types
    let attester = Address::from_slice(&[100u8; 20]);
    let schema = FixedBytes::<32>::from_slice(&[200u8; 32]);

    // Level 1: Create a SchemaArbiter
    let schema_demand = SchemaArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        schema,
    };
    let schema_bytes: Bytes = schema_demand.into();

    // Level 2: Create an AttesterArbiter that builds on the SchemaArbiter
    let attester_demand = AttesterArbiter::DemandData {
        baseArbiter: addresses.schema_arbiter_composing,
        baseDemand: schema_bytes,
        attester,
    };
    let attester_bytes: Bytes = attester_demand.into();

    // Level 3: Create an AllArbiter that contains the nested AttesterArbiter
    let all_demand = AllArbiter::DemandData {
        arbiters: vec![addresses.attester_arbiter_composing],
        demands: vec![attester_bytes],
    };
    let all_bytes: Bytes = all_demand.into();

    // Test centralized decode through decode_arbiter_demand
    let decoded = test
        .alice_client
        .arbiters()
        .decode_arbiter_demand(addresses.all_arbiter, &all_bytes)?;

    // Traverse and verify the entire tree
    if let DecodedDemand::AllArbiter(all_data) = decoded {
        if let DecodedDemand::AttesterArbiterComposing(attester_data) = &all_data.demands[0] {
            if let DecodedDemand::SchemaArbiterComposing(schema_data) =
                attester_data.base_demand.as_ref()
            {
                if let DecodedDemand::TrivialArbiter = schema_data.base_demand.as_ref() {
                    println!("✅ Centralized decode successfully traversed 4-level tree:");
                    println!("   AllArbiter -> AttesterArbiter -> SchemaArbiter -> TrivialArbiter");

                    assert_eq!(attester_data.attester, attester);
                    assert_eq!(schema_data.schema, schema);

                    return Ok(());
                }
            }
        }
    }

    panic!("Tree structure was not decoded correctly");
}
