use alkahest_rs::{contracts, extensions::HasArbiters, utils::setup_test_environment};
use alloy::primitives::Bytes;

#[tokio::test]
async fn test_encode_and_decode_not_arbiter_demand() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Create a test demand data
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::from(vec![1, 2, 3, 4, 5]);

    let demand_data = contracts::logical::NotArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: contracts::logical::NotArbiter::DemandData = (&encoded).try_into()?;

    // Verify decoded data
    assert_eq!(
        decoded.baseArbiter, base_arbiter,
        "Base arbiter should match"
    );
    assert_eq!(decoded.baseDemand, base_demand, "Base demand should match");

    Ok(())
}

#[tokio::test]
async fn test_not_arbiter_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    let test_data = contracts::logical::NotArbiter::DemandData {
        baseArbiter: test.addresses.arbiters_addresses.trivial_arbiter,
        baseDemand: Bytes::from(vec![1, 2, 3]),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::logical::NotArbiter::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::logical::NotArbiter::DemandData =
        encoded_bytes.clone().try_into()?;

    // Verify both decoded versions match original
    assert_eq!(
        decoded_from_ref.baseArbiter, test_data.baseArbiter,
        "Base arbiter should match (from ref)"
    );
    assert_eq!(
        decoded_from_ref.baseDemand, test_data.baseDemand,
        "Base demand should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.baseArbiter, test_data.baseArbiter,
        "Base arbiter should match (from owned)"
    );
    assert_eq!(
        decoded_from_owned.baseDemand, test_data.baseDemand,
        "Base demand should match (from owned)"
    );

    println!("Original -> Bytes -> DemandData conversions successful for NotArbiter");
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}

#[tokio::test]
async fn test_decode_not_arbiter_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create test demand data with a specific attestation arbiter as base
    let uid = alloy::primitives::FixedBytes::<32>::from_slice(&[1u8; 32]);
    let specific_demand = contracts::SpecificAttestationArbiter::DemandData { uid };
    let specific_demand_encoded: alloy::primitives::Bytes = specific_demand.into();

    let demand_data = contracts::logical::NotArbiter::DemandData {
        baseArbiter: addresses.specific_attestation_arbiter,
        baseDemand: specific_demand_encoded,
    };
    // Decode using the new function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_not_arbiter_demands(demand_data.clone())?;

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
    let trivial_demand_data = contracts::logical::NotArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: alloy::primitives::Bytes::default(),
    };

    let trivial_decoded_result = test
        .alice_client
        .arbiters()
        .decode_not_arbiter_demands(trivial_demand_data.clone())?;

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
