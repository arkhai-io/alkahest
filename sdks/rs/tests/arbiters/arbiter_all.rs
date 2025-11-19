use alkahest_rs::{contracts, extensions::HasArbiters, utils::setup_test_environment};
use alloy::primitives::{Bytes, FixedBytes};

use crate::arbiters::common::create_test_attestation;

#[tokio::test]
async fn test_all_arbiter() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test attestation
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let attestation = create_test_attestation(Some(uid), None);

    // Create different demand data for different arbiters

    // SpecificAttestationArbiter with matching UID (will return true)
    let specific_matching = contracts::SpecificAttestationArbiter::DemandData { uid };
    let specific_matching_encoded = specific_matching.into();

    // SpecificAttestationArbiter with non-matching UID (will return false/error)
    let non_matching_uid = FixedBytes::<32>::from_slice(&[2u8; 32]);
    let specific_non_matching = contracts::SpecificAttestationArbiter::DemandData {
        uid: non_matching_uid,
    };
    let specific_non_matching_encoded: Bytes = specific_non_matching.into();

    // Set up AllArbiter
    let all_arbiter = contracts::logical::AllArbiter::new(
        addresses.all_arbiter,
        &test.alice_client.wallet_provider,
    );

    // Test case 1: One true, one false - should return false
    let all_demand_data1 = contracts::logical::AllArbiter::DemandData {
        arbiters: vec![
            addresses.trivial_arbiter,              // Always returns true
            addresses.specific_attestation_arbiter, // Will return false with non-matching UID
        ],
        demands: vec![
            Bytes::default(),                      // Empty data for TrivialArbiter
            specific_non_matching_encoded.clone(), // Non-matching UID for SpecificAttestationArbiter
        ],
    };

    let all_demand1 = all_demand_data1.into();
    let result_all1 = all_arbiter
        .checkObligation(
            attestation.clone().into(),
            all_demand1,
            FixedBytes::<32>::default(),
        )
        .call()
        .await;

    // Should fail since one arbiter would fail
    assert!(
        result_all1.is_err(),
        "AllArbiter should return false if any arbiter returns false"
    );

    // Test case 2: All true - should return true
    let all_demand_data2 = contracts::logical::AllArbiter::DemandData {
        arbiters: vec![
            addresses.trivial_arbiter,              // Always returns true
            addresses.specific_attestation_arbiter, // Will return true with matching UID
        ],
        demands: vec![
            Bytes::default(),          // Empty data for TrivialArbiter
            specific_matching_encoded, // Matching UID for SpecificAttestationArbiter
        ],
    };

    let all_demand2 = all_demand_data2.into();
    let result_all2 = all_arbiter
        .checkObligation(
            attestation.clone().into(),
            all_demand2,
            FixedBytes::<32>::default(),
        )
        .call()
        .await?;

    assert!(
        result_all2,
        "AllArbiter should return true if all arbiters return true"
    );

    // Test case 3: Empty arbiters list - should return true (vacuously true)
    let all_demand_data3 = contracts::logical::AllArbiter::DemandData {
        arbiters: vec![],
        demands: vec![],
    };

    let all_demand3 = all_demand_data3.into();
    let result_all3 = all_arbiter
        .checkObligation(attestation.into(), all_demand3, FixedBytes::<32>::default())
        .call()
        .await?;

    assert!(
        result_all3,
        "AllArbiter should return true with empty arbiters list"
    );

    Ok(())
}

#[tokio::test]
async fn test_encode_and_decode_all_arbiter_demand() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test UID for SpecificAttestationArbiter
    let test_uid = FixedBytes::<32>::from_slice(&[1u8; 32]);

    // Create real demand data for each arbiter
    let trivial_demand = Bytes::default(); // TrivialArbiter accepts empty bytes

    let specific_attestation_demand_data =
        contracts::SpecificAttestationArbiter::DemandData { uid: test_uid };
    let specific_attestation_demand: Bytes = specific_attestation_demand_data.into();

    // Create a test demand data
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];
    let demands = vec![trivial_demand, specific_attestation_demand];

    let demand_data = contracts::logical::AllArbiter::DemandData { arbiters, demands };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: contracts::logical::AllArbiter::DemandData = (&encoded).try_into()?;
    // Verify decoded data
    assert_eq!(
        decoded.arbiters.len(),
        demand_data.arbiters.len(),
        "Number of arbiters should match"
    );
    assert_eq!(
        decoded.demands.len(),
        demand_data.demands.len(),
        "Number of demands should match"
    );

    for i in 0..decoded.arbiters.len() {
        assert_eq!(
            decoded.arbiters[i], demand_data.arbiters[i],
            "Arbiter address should match"
        );
        assert_eq!(
            decoded.demands[i], demand_data.demands[i],
            "Demand data should match"
        );
    }

    Ok(())
}

#[tokio::test]
async fn test_all_arbiter_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test UID for SpecificAttestationArbiter
    let test_uid = FixedBytes::<32>::from_slice(&[1u8; 32]);

    // Create real demand data for each arbiter
    let trivial_demand = Bytes::default(); // TrivialArbiter accepts empty bytes

    let specific_attestation_demand_data =
        contracts::SpecificAttestationArbiter::DemandData { uid: test_uid };
    let specific_attestation_demand: Bytes = specific_attestation_demand_data.into();

    // Create a test demand data
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];
    let demands = vec![trivial_demand, specific_attestation_demand];

    let demand_data = contracts::logical::AllArbiter::DemandData {
        arbiters: arbiters.clone(),
        demands: demands.clone(),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = demand_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::logical::AllArbiter::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::logical::AllArbiter::DemandData =
        encoded_bytes.try_into()?;

    // Verify both decoded versions match original
    assert_eq!(
        decoded_from_ref.arbiters.len(),
        arbiters.len(),
        "Number of arbiters should match (from ref)"
    );
    assert_eq!(
        decoded_from_ref.demands.len(),
        demands.len(),
        "Number of demands should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.arbiters.len(),
        arbiters.len(),
        "Number of arbiters should match (from owned)"
    );
    assert_eq!(
        decoded_from_owned.demands.len(),
        demands.len(),
        "Number of demands should match (from owned)"
    );

    // Verify individual elements
    for i in 0..arbiters.len() {
        assert_eq!(
            decoded_from_ref.arbiters[i], arbiters[i],
            "Arbiter address should match (from ref)"
        );
        assert_eq!(
            decoded_from_ref.demands[i], demands[i],
            "Demand data should match (from ref)"
        );

        assert_eq!(
            decoded_from_owned.arbiters[i], arbiters[i],
            "Arbiter address should match (from owned)"
        );
        assert_eq!(
            decoded_from_owned.demands[i], demands[i],
            "Demand data should match (from owned)"
        );
    }

    Ok(())
}

#[tokio::test]
async fn test_decode_all_arbiter_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test UID for SpecificAttestationArbiter
    let test_uid = FixedBytes::<32>::from_slice(&[1u8; 32]);

    // Create real demand data for each arbiter
    let trivial_demand = Bytes::default(); // TrivialArbiter accepts empty bytes

    let specific_attestation_demand_data =
        contracts::SpecificAttestationArbiter::DemandData { uid: test_uid };
    let specific_attestation_demand: Bytes = specific_attestation_demand_data.into();

    // Create a test demand data
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];
    let demands = vec![trivial_demand, specific_attestation_demand];

    let demand_data = contracts::logical::AllArbiter::DemandData { arbiters, demands };

    // Test the decode_all_arbiter_demands function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_all_arbiter_demands(demand_data.clone())?;

    // Verify decoded structure
    assert_eq!(
        decoded_result.arbiters.len(),
        demand_data.arbiters.len(),
        "Number of arbiters should match"
    );
    assert_eq!(
        decoded_result.demands.len(),
        demand_data.demands.len(),
        "Number of decoded demands should match"
    );

    // Verify original arbiter addresses are preserved
    for i in 0..decoded_result.arbiters.len() {
        assert_eq!(
            decoded_result.arbiters[i], demand_data.arbiters[i],
            "Arbiter address should match"
        );
    }

    // Import the decoded types for assertions
    use alkahest_rs::clients::arbiters::DecodedDemand;

    // Verify decoded demand types
    match &decoded_result.demands[0] {
        DecodedDemand::TrivialArbiter => {
            // Expected - TrivialArbiter has no demand data
        }
        other => panic!("Expected TrivialArbiter, got {:?}", other),
    }

    match &decoded_result.demands[1] {
        DecodedDemand::SpecificAttestation(demand_data) => {
            assert_eq!(demand_data.uid, test_uid, "UID should match");
        }
        other => panic!("Expected SpecificAttestation, got {:?}", other),
    }

    println!("✅ Successfully decoded AllArbiter demands");
    println!("   - TrivialArbiter: no demand data");
    println!("   - SpecificAttestationArbiter: UID = {:?}", test_uid);

    Ok(())
}

#[tokio::test]
async fn test_decode_all_arbiter_demands_with_mixed_arbiters() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test UID for SpecificAttestationArbiter
    let test_uid = FixedBytes::<32>::from_slice(&[1u8; 32]);

    // Create demand data for SpecificAttestationArbiter
    let specific_attestation_demand_data =
        contracts::SpecificAttestationArbiter::DemandData { uid: test_uid };
    let specific_attestation_demand: Bytes = specific_attestation_demand_data.into();

    // Create AllArbiter demand data with mixed arbiters (including ones with and without demand data)
    let demand_data = contracts::logical::AllArbiter::DemandData {
        arbiters: vec![
            addresses.trivial_arbiter,              // No demand data (always true)
            addresses.specific_attestation_arbiter, // Has demand data
        ],
        demands: vec![
            Bytes::default(),            // Empty for TrivialArbiter
            specific_attestation_demand, // Real demand for SpecificAttestationArbiter
        ],
    };

    // Test the decode_all_arbiter_demands function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_all_arbiter_demands(demand_data.clone())?;

    // Import the decoded types for assertions
    use alkahest_rs::clients::arbiters::DecodedDemand;

    // Verify decoded structure
    assert_eq!(
        decoded_result.arbiters.len(),
        demand_data.arbiters.len(),
        "Number of arbiters should match"
    );
    assert_eq!(
        decoded_result.demands.len(),
        demand_data.demands.len(),
        "Number of decoded demands should match"
    );

    // Verify specific arbiters and their decoded demands
    assert_eq!(
        decoded_result.arbiters[0], addresses.trivial_arbiter,
        "First arbiter should be TrivialArbiter"
    );
    assert_eq!(
        decoded_result.arbiters[1], addresses.specific_attestation_arbiter,
        "Second arbiter should be SpecificAttestationArbiter"
    );

    // Verify decoded demand types
    match &decoded_result.demands[0] {
        DecodedDemand::TrivialArbiter => {
            // Expected - TrivialArbiter has no demand data
        }
        other => panic!("Expected TrivialArbiter, got {:?}", other),
    }

    match &decoded_result.demands[1] {
        DecodedDemand::SpecificAttestation(demand_data) => {
            assert_eq!(demand_data.uid, test_uid, "UID should match");
        }
        other => panic!("Expected SpecificAttestation, got {:?}", other),
    }

    println!("✅ Successfully decoded mixed AllArbiter demands with proper typing");

    Ok(())
}
