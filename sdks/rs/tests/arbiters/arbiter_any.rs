use alkahest_rs::{contracts, extensions::HasArbiters, utils::setup_test_environment};
use alloy::primitives::{Bytes, FixedBytes};

use crate::arbiters::common::create_test_attestation;

#[tokio::test]
async fn test_any_arbiter() -> eyre::Result<()> {
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

    // Set up AnyArbiter with two arbiters
    let any_arbiter = contracts::logical::AnyArbiter::new(
        addresses.any_arbiter,
        &test.alice_client.wallet_provider,
    );

    // Test case 1: One true, one false - should return true
    let any_demand_data1 = contracts::logical::AnyArbiter::DemandData {
        arbiters: vec![
            addresses.trivial_arbiter,              // Always returns true
            addresses.specific_attestation_arbiter, // Will return false with non-matching UID
        ],
        demands: vec![
            Bytes::default(),                      // Empty data for TrivialArbiter
            specific_non_matching_encoded.clone(), // Non-matching UID for SpecificAttestationArbiter
        ],
    };

    let any_demand1 = any_demand_data1.into();
    let result_any1 = any_arbiter
        .checkObligation(
            attestation.clone().into(),
            any_demand1,
            FixedBytes::<32>::default(),
        )
        .call()
        .await?;

    assert!(
        result_any1,
        "AnyArbiter should return true if any arbiter returns true"
    );

    // Test case 2: Both false - should return false
    let any_demand_data2 = contracts::logical::AnyArbiter::DemandData {
        arbiters: vec![
            addresses.specific_attestation_arbiter, // Will return false with non-matching UID
            addresses.specific_attestation_arbiter, // Will return false with non-matching UID
        ],
        demands: vec![
            specific_non_matching_encoded.clone(), // Non-matching UID
            specific_non_matching_encoded,         // Non-matching UID
        ],
    };

    let any_demand2 = any_demand_data2.into();
    let result_any2 = any_arbiter
        .checkObligation(
            attestation.clone().into(),
            any_demand2,
            FixedBytes::<32>::default(),
        )
        .call()
        .await;

    // Should fail since both arbiters would fail
    assert!(
        result_any2.is_err() || !result_any2.unwrap(),
        "AnyArbiter should return false if all arbiters return false"
    );

    // Test case 3: All true - should return true
    let any_demand_data3 = contracts::logical::AnyArbiter::DemandData {
        arbiters: vec![
            addresses.trivial_arbiter,              // Always returns true
            addresses.specific_attestation_arbiter, // Will return true with matching UID
        ],
        demands: vec![
            Bytes::default(),          // Empty data for TrivialArbiter
            specific_matching_encoded, // Matching UID for SpecificAttestationArbiter
        ],
    };

    let any_demand3 = any_demand_data3.into();
    let result_any3 = any_arbiter
        .checkObligation(attestation.into(), any_demand3, FixedBytes::<32>::default())
        .call()
        .await?;

    assert!(
        result_any3,
        "AnyArbiter should return true if all arbiters return true"
    );

    Ok(())
}

#[tokio::test]
async fn test_encode_and_decode_any_arbiter_demand() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test demand data
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];
    let demands = vec![Bytes::default(), Bytes::from(vec![1, 2, 3])];

    let demand_data = contracts::logical::AnyArbiter::DemandData { arbiters, demands };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: contracts::logical::AnyArbiter::DemandData = (&encoded).try_into()?;

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
async fn test_any_arbiter_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create a test demand data
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];
    let demands = vec![Bytes::default(), Bytes::from(vec![1, 2, 3])];

    let demand_data = contracts::logical::AnyArbiter::DemandData {
        arbiters: arbiters.clone(),
        demands: demands.clone(),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = demand_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::logical::AnyArbiter::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::logical::AnyArbiter::DemandData =
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
async fn test_decode_any_arbiter_demands() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    // Get arbiter addresses
    let addresses = test.addresses.arbiters_addresses;

    // Create test demand data with mixed arbiters
    let arbiters = vec![
        addresses.trivial_arbiter,
        addresses.specific_attestation_arbiter,
    ];

    let uid = alloy::primitives::FixedBytes::<32>::from_slice(&[1u8; 32]);
    let specific_demand = contracts::SpecificAttestationArbiter::DemandData { uid };
    let specific_demand_encoded: alloy::primitives::Bytes = specific_demand.into();

    let demands = vec![
        alloy::primitives::Bytes::default(), // TrivialArbiter has no demand data
        specific_demand_encoded,             // SpecificAttestationArbiter demand
    ];

    let demand_data = contracts::logical::AnyArbiter::DemandData {
        arbiters: arbiters.clone(),
        demands: demands.clone(),
    };

    // Decode using the new function
    let decoded_result = test
        .alice_client
        .arbiters()
        .decode_any_arbiter_demands(demand_data.clone())?;

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
        "Number of demands should match"
    );

    // Verify individual arbiters and demands
    for i in 0..decoded_result.arbiters.len() {
        assert_eq!(
            decoded_result.arbiters[i], arbiters[i],
            "Arbiter address {} should match",
            i
        );
    }

    // Verify specific demand types
    match &decoded_result.demands[0] {
        DecodedDemand::TrivialArbiter => {
            // Expected - TrivialArbiter has no demand data
        }
        other => panic!("Expected TrivialArbiter, got {:?}", other),
    }

    match &decoded_result.demands[1] {
        DecodedDemand::SpecificAttestation(demand) => {
            assert_eq!(demand.uid, uid, "UID should match");
        }
        other => panic!("Expected SpecificAttestation, got {:?}", other),
    }

    Ok(())
}
