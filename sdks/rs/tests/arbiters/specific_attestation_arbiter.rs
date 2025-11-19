use crate::arbiters::common::create_test_attestation;
use alkahest_rs::{contracts, utils::setup_test_environment};
use alloy::primitives::FixedBytes;

#[tokio::test]
async fn test_specific_attestation_arbiter_with_incorrect_uid_original() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let attestation = create_test_attestation(Some(uid), None);

    // Create demand data with non-matching UID
    let different_uid = FixedBytes::<32>::from_slice(&[2u8; 32]);
    let demand_data = contracts::SpecificAttestationArbiter::DemandData { uid: different_uid };

    // Encode the demand data
    let encoded = demand_data.into();

    // Check obligation should revert with NotDemandedAttestation
    let specific_attestation_arbiter = contracts::SpecificAttestationArbiter::new(
        test.addresses
            .arbiters_addresses
            .specific_attestation_arbiter,
        &test.alice_client.public_provider,
    );

    let result = specific_attestation_arbiter
        .checkObligation(attestation.clone().into(), encoded, FixedBytes::<32>::ZERO)
        .call()
        .await;

    assert!(
        result.is_err(),
        "SpecificAttestationArbiter should revert with incorrect UID"
    );

    Ok(())
}

#[tokio::test]
async fn test_specific_attestation_arbiter_with_incorrect_uid() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation
    let uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let attestation = create_test_attestation(Some(uid), None);

    // Create demand data with non-matching UID
    let different_uid = FixedBytes::<32>::from_slice(&[2u8; 32]);
    let demand_data = contracts::SpecificAttestationArbiter::DemandData { uid: different_uid };

    // Encode demand data
    let demand = demand_data.into();
    let counteroffer = FixedBytes::<32>::default();

    // Check obligation should revert with NotDemandedAttestation
    let specific_attestation_arbiter = contracts::SpecificAttestationArbiter::new(
        test.addresses
            .arbiters_addresses
            .specific_attestation_arbiter,
        &test.alice_client.wallet_provider,
    );

    let result = specific_attestation_arbiter
        .checkObligation(attestation.into(), demand, counteroffer)
        .call()
        .await;

    // Should fail with NotDemandedAttestation
    assert!(result.is_err(), "Should have failed with incorrect UID");

    Ok(())
}

#[tokio::test]
async fn test_specific_attestation_arbiter_trait_based_encoding() -> eyre::Result<()> {
    let test_data = contracts::SpecificAttestationArbiter::DemandData {
        uid: FixedBytes::<32>::from_slice(&[1u8; 32]),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::SpecificAttestationArbiter::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::SpecificAttestationArbiter::DemandData =
        encoded_bytes.clone().try_into()?;

    // Verify both decoded versions match original
    assert_eq!(
        decoded_from_ref.uid, test_data.uid,
        "UID should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.uid, test_data.uid,
        "UID should match (from owned)"
    );

    println!(
        "Original -> Bytes -> DemandData conversions successful for SpecificAttestationArbiter"
    );
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}
