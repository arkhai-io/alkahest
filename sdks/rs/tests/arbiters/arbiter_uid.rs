use alkahest_rs::{contracts, utils::setup_test_environment};
use alloy::primitives::{Bytes, FixedBytes};

use crate::arbiters::common::create_test_attestation;

#[tokio::test]
async fn test_uid_arbiter_with_incorrect_uid() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let attestation = create_test_attestation(Some(uid), None);

    // Create demand data with non-matching UID
    let different_uid = FixedBytes::<32>::from_slice(&[2u8; 32]);
    let trivial_arbiter = test.addresses.arbiters_addresses.clone().trivial_arbiter;
    let demand_data = contracts::attestation_properties::composing::UidArbiter::DemandData {
        baseArbiter: trivial_arbiter,
        baseDemand: Bytes::default(),
        uid: different_uid,
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Check obligation should revert with UidMismatched
    let uid_arbiter_address = test.addresses.arbiters_addresses.clone().uid_arbiter;
    let uid_arbiter = contracts::attestation_properties::composing::UidArbiterComposing::new(
        uid_arbiter_address,
        &test.alice_client.public_provider,
    );

    let result = uid_arbiter
        .checkObligation(attestation.clone().into(), encoded, FixedBytes::<32>::ZERO)
        .call()
        .await;

    assert!(
        result.is_err(),
        "UidArbiter should revert with incorrect UID"
    );

    Ok(())
}

#[tokio::test]
async fn test_uid_arbiter_with_correct_uid() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let attestation = create_test_attestation(Some(uid), None);

    // Create demand data with matching UID and use trivialArbiter as the baseArbiter
    let trivial_arbiter = test.addresses.arbiters_addresses.clone().trivial_arbiter;
    let demand_data = contracts::attestation_properties::composing::UidArbiter::DemandData {
        baseArbiter: trivial_arbiter,
        baseDemand: Bytes::default(),
        uid,
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Check obligation - should return true
    let uid_arbiter_address = test.addresses.arbiters_addresses.clone().uid_arbiter;
    let uid_arbiter = contracts::attestation_properties::composing::UidArbiterComposing::new(
        uid_arbiter_address,
        &test.alice_client.public_provider,
    );
    let result = uid_arbiter
        .checkObligation(attestation.clone().into(), encoded, FixedBytes::<32>::ZERO)
        .call()
        .await?;

    assert!(result, "UidArbiter should return true with matching UID");

    Ok(())
}

#[tokio::test]
async fn test_encode_and_decode_uid_arbiter_composing_demand() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test demand data
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let trivial_arbiter = test.addresses.arbiters_addresses.clone().trivial_arbiter;
    let demand_data = contracts::attestation_properties::composing::UidArbiter::DemandData {
        baseArbiter: trivial_arbiter,
        baseDemand: Bytes::default(),
        uid,
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: contracts::attestation_properties::composing::UidArbiter::DemandData =
        (&encoded).try_into()?;

    // Verify the data was encoded and decoded correctly
    assert_eq!(decoded.uid, uid, "UID did not round-trip correctly");

    Ok(())
}

#[tokio::test]
async fn test_uid_arbiter_composing_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    let test_data = contracts::attestation_properties::composing::UidArbiter::DemandData {
        baseArbiter: test.addresses.arbiters_addresses.trivial_arbiter,
        baseDemand: Bytes::from(vec![1, 2, 3]),
        uid: FixedBytes::<32>::from_slice(&[1u8; 32]),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::attestation_properties::composing::UidArbiter::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::attestation_properties::composing::UidArbiter::DemandData =
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
        decoded_from_ref.uid, test_data.uid,
        "UID should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.baseArbiter, test_data.baseArbiter,
        "Base arbiter should match (from owned)"
    );
    assert_eq!(
        decoded_from_owned.baseDemand, test_data.baseDemand,
        "Base demand should match (from owned)"
    );
    assert_eq!(
        decoded_from_owned.uid, test_data.uid,
        "UID should match (from owned)"
    );

    println!("Original -> Bytes -> DemandData conversions successful for UidArbiterComposing");
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}
