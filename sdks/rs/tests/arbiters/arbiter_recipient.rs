use alkahest_rs::{contracts, utils::setup_test_environment};
use alloy::primitives::{Bytes, FixedBytes};

use crate::arbiters::common::create_test_attestation;

#[tokio::test]
async fn test_recipient_arbiter_with_incorrect_recipient() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation with Bob as recipient
    let bob_address = test.bob.address();
    let attestation = create_test_attestation(None, Some(bob_address));

    // Create demand data expecting Alice as recipient
    let alice_address = test.alice.address();
    let demand_data = contracts::attestation_properties::composing::RecipientArbiter::DemandData {
        baseArbiter: test.addresses.arbiters_addresses.clone().trivial_arbiter,
        baseDemand: Bytes::from(vec![]),
        recipient: alice_address, // Different from attestation.recipient which is Bob
    };

    // Encode demand data
    let demand = demand_data.into();
    let counteroffer = FixedBytes::<32>::default();

    // Create RecipientArbiter contract instance
    let recipient_arbiter = contracts::RecipientArbiter::new(
        test.addresses.arbiters_addresses.recipient_arbiter,
        &test.alice_client.public_provider,
    );

    // Call check_obligation - should revert with RecipientMismatched
    let result = recipient_arbiter
        .checkObligation(attestation.clone().into(), demand, counteroffer)
        .call()
        .await;

    // We expect this to revert because recipient mismatch
    assert!(
        result.is_err(),
        "RecipientArbiter should revert with incorrect recipient"
    );

    Ok(())
}

#[tokio::test]
async fn test_recipient_arbiter_with_correct_recipient() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation
    let recipient = test.alice.address();
    let attestation = create_test_attestation(None, Some(recipient));

    // Create demand data with the correct recipient and TrivialArbiter as base arbiter
    let demand_data = contracts::attestation_properties::composing::RecipientArbiter::DemandData {
        baseArbiter: test.addresses.arbiters_addresses.clone().trivial_arbiter,
        baseDemand: Bytes::from(vec![]),
        recipient,
    };

    // Encode demand data
    let demand = demand_data.into();
    let counteroffer = FixedBytes::<32>::default();

    // Check obligation should return true
    let recipient_arbiter = contracts::RecipientArbiter::new(
        test.addresses.arbiters_addresses.recipient_arbiter,
        &test.alice_client.public_provider,
    );

    // Call check_obligation
    let result = recipient_arbiter
        .checkObligation(attestation.clone().into(), demand, counteroffer)
        .call()
        .await?;

    assert!(
        result,
        "RecipientArbiter should return true with correct recipient"
    );

    Ok(())
}

#[tokio::test]
async fn test_encode_and_decode_recipient_arbiter_demand() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test demand data
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::from(vec![1, 2, 3]);
    let recipient = test.alice.address();

    let demand_data = contracts::attestation_properties::composing::RecipientArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        recipient,
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: contracts::attestation_properties::composing::RecipientArbiter::DemandData =
        (&encoded).try_into()?;

    // Verify the data was encoded and decoded correctly
    assert_eq!(
        decoded.baseArbiter, base_arbiter,
        "Base arbiter did not round-trip correctly"
    );
    assert_eq!(
        decoded.baseDemand, base_demand,
        "Base demand did not round-trip correctly"
    );
    assert_eq!(
        decoded.recipient, recipient,
        "Recipient did not round-trip correctly"
    );

    Ok(())
}

#[tokio::test]
async fn test_recipient_arbiter_composing_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    let test_data = contracts::attestation_properties::composing::RecipientArbiter::DemandData {
        baseArbiter: test.addresses.arbiters_addresses.trivial_arbiter,
        baseDemand: Bytes::from(vec![1, 2, 3]),
        recipient: test.alice.address(),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::attestation_properties::composing::RecipientArbiter::DemandData = (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::attestation_properties::composing::RecipientArbiter::DemandData = encoded_bytes.clone().try_into()?;

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
        decoded_from_ref.recipient, test_data.recipient,
        "Recipient should match (from ref)"
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
        decoded_from_owned.recipient, test_data.recipient,
        "Recipient should match (from owned)"
    );

    println!(
        "Original -> Bytes -> DemandData conversions successful for RecipientArbiterComposing"
    );
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}
