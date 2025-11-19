use alkahest_rs::{contracts, extensions::HasArbiters, utils::setup_test_environment};

#[tokio::test]
async fn test_decode_confirmation_arbiter_composing_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create test demand data with a specific attestation arbiter as base
    let uid = alloy::primitives::FixedBytes::<32>::from_slice(&[1u8; 32]);
    let specific_demand = contracts::SpecificAttestationArbiter::DemandData { uid };
    let specific_demand_encoded: alloy::primitives::Bytes = specific_demand.into();

    let demand_data = contracts::confirmation_arbiters::ConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.specific_attestation_arbiter,
        baseDemand: specific_demand_encoded,
    };

    // Decode using the new function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_confirmation_arbiter_composing_demands(demand_data.clone())?;

    // Import the decoded types for assertions
    use alkahest_rs::clients::arbiters::DecodedDemand;

    // Verify decoded structure
    assert_eq!(
        decoded_result.base_arbiter, demand_data.baseArbiter,
        "Base arbiter address should match"
    );

    // Verify the decoded base demand
    match decoded_result.base_demand.as_ref() {
        DecodedDemand::SpecificAttestation(demand) => {
            assert_eq!(demand.uid, uid, "UID should match");
        }
        other => panic!("Expected SpecificAttestation, got {:?}", other),
    }

    // Test with TrivialArbiter as well (no demand data)
    let trivial_demand_data =
        contracts::confirmation_arbiters::ConfirmationArbiterComposing::DemandData {
            baseArbiter: addresses.trivial_arbiter,
            baseDemand: alloy::primitives::Bytes::default(),
        };

    let trivial_decoded_result = test
        .alice_client
        .arbiters()
        .decode_confirmation_arbiter_composing_demands(trivial_demand_data.clone())?;

    assert_eq!(
        trivial_decoded_result.base_arbiter, trivial_demand_data.baseArbiter,
        "Trivial base arbiter address should match"
    );

    match trivial_decoded_result.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {
            // Expected - TrivialArbiter has no demand data
        }
        other => panic!("Expected TrivialArbiter, got {:?}", other),
    }

    Ok(())
}

#[tokio::test]
async fn test_decode_revocable_confirmation_arbiter_composing_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create test demand data with a trusted party arbiter as base
    let trusted_party_demand = contracts::TrustedPartyArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: alloy::primitives::Bytes::default(),
        creator: addresses.trivial_arbiter, // Use any address as creator
    };
    let trusted_party_demand_encoded: alloy::primitives::Bytes = trusted_party_demand.into();

    let demand_data =
        contracts::confirmation_arbiters::RevocableConfirmationArbiterComposing::DemandData {
            baseArbiter: addresses.trusted_party_arbiter,
            baseDemand: trusted_party_demand_encoded,
        };

    // Decode using the new function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_revocable_confirmation_arbiter_composing_demands(demand_data.clone())?;

    // Import the decoded types for assertions
    use alkahest_rs::clients::arbiters::DecodedDemand;

    // Verify decoded structure
    assert_eq!(
        decoded_result.base_arbiter, demand_data.baseArbiter,
        "Base arbiter address should match"
    );

    // Verify the decoded base demand
    match decoded_result.base_demand.as_ref() {
        DecodedDemand::TrustedParty(demand) => {
            assert_eq!(
                demand.baseArbiter, addresses.trivial_arbiter,
                "Base arbiter should match"
            );
            assert_eq!(
                demand.creator, addresses.trivial_arbiter,
                "Creator should match"
            );
        }
        other => panic!("Expected TrustedParty, got {:?}", other),
    }

    Ok(())
}

#[tokio::test]
async fn test_decode_unrevocable_confirmation_arbiter_composing_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create test demand data with nested confirmation arbiter
    let inner_confirmation_demand =
        contracts::confirmation_arbiters::ConfirmationArbiterComposing::DemandData {
            baseArbiter: addresses.trivial_arbiter,
            baseDemand: alloy::primitives::Bytes::default(),
        };
    let inner_confirmation_demand_encoded: alloy::primitives::Bytes =
        inner_confirmation_demand.into();

    let demand_data =
        contracts::confirmation_arbiters::UnrevocableConfirmationArbiterComposing::DemandData {
            baseArbiter: addresses.confirmation_arbiter_composing,
            baseDemand: inner_confirmation_demand_encoded,
        };

    // Decode using the new function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_unrevocable_confirmation_arbiter_composing_demands(demand_data.clone())?;

    // Import the decoded types for assertions
    use alkahest_rs::clients::arbiters::DecodedDemand;

    // Verify decoded structure
    assert_eq!(
        decoded_result.base_arbiter, demand_data.baseArbiter,
        "Base arbiter address should match"
    );

    // Since we're using confirmation_arbiter_composing as base, it should decode as such
    match decoded_result.base_demand.as_ref() {
        DecodedDemand::ConfirmationArbiterComposing(_) => {
            // Expected - but this is the enum variant, not the decoded content
            // The actual nested content would need deeper decoding
        }
        other => panic!("Expected ConfirmationArbiterComposing, got {:?}", other),
    }

    Ok(())
}
