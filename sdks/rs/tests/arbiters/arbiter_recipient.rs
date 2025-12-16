use alkahest_rs::{
    contracts::{self, arbiters::attestation_properties::RecipientArbiter},
    utils::setup_test_environment,
};
use alloy::primitives::{Address, Bytes, FixedBytes};
use std::time::{SystemTime, UNIX_EPOCH};

// Helper to create attestation in the format expected by RecipientArbiter
fn create_recipient_arbiter_attestation(
    uid: Option<FixedBytes<32>>,
    recipient: Option<Address>,
) -> RecipientArbiter::Attestation {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    RecipientArbiter::Attestation {
        uid: uid.unwrap_or_default(),
        schema: FixedBytes::<32>::default(),
        time: now,
        expirationTime: 0,
        revocationTime: 0,
        refUID: FixedBytes::<32>::default(),
        recipient: recipient.unwrap_or_default(),
        attester: Address::default(),
        revocable: true,
        data: Bytes::default(),
    }
}

#[tokio::test]
async fn test_recipient_arbiter_with_incorrect_recipient() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation with Bob as recipient
    let bob_address = test.bob.address();
    let attestation = create_recipient_arbiter_attestation(None, Some(bob_address));

    // Create demand data expecting Alice as recipient
    let alice_address = test.alice.address();
    let demand_data = RecipientArbiter::DemandData {
        recipient: alice_address, // Different from attestation.recipient which is Bob
    };

    // Encode demand data
    let demand = demand_data.into();
    let counteroffer = FixedBytes::<32>::default();

    // Create RecipientArbiter contract instance
    let recipient_arbiter = RecipientArbiter::new(
        test.addresses.arbiters_addresses.recipient_arbiter,
        &test.alice_client.public_provider,
    );

    // Call check_obligation - should revert with RecipientMismatched
    let result = recipient_arbiter
        .checkObligation(attestation, demand, counteroffer)
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
    let attestation = create_recipient_arbiter_attestation(None, Some(recipient));

    // Create demand data with the correct recipient
    let demand_data = RecipientArbiter::DemandData {
        recipient,
    };

    // Encode demand data
    let demand = demand_data.into();
    let counteroffer = FixedBytes::<32>::default();

    // Check obligation should return true
    let recipient_arbiter = RecipientArbiter::new(
        test.addresses.arbiters_addresses.recipient_arbiter,
        &test.alice_client.public_provider,
    );

    // Call check_obligation
    let result = recipient_arbiter
        .checkObligation(attestation, demand, counteroffer)
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
    let recipient = test.alice.address();

    let demand_data = RecipientArbiter::DemandData {
        recipient,
    };

    // Encode the demand data
    let encoded: Bytes = demand_data.clone().into();

    // Decode the demand data
    let decoded: RecipientArbiter::DemandData =
        (&encoded).try_into()?;

    // Verify the data was encoded and decoded correctly
    assert_eq!(
        decoded.recipient, recipient,
        "Recipient did not round-trip correctly"
    );

    Ok(())
}

#[tokio::test]
async fn test_recipient_arbiter_trait_based_encoding() -> eyre::Result<()> {
    // Set up test environment
    let test = setup_test_environment().await?;

    let test_data = RecipientArbiter::DemandData {
        recipient: test.alice.address(),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: RecipientArbiter::DemandData = (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: RecipientArbiter::DemandData = encoded_bytes.clone().try_into()?;

    // Verify both decoded versions match original
    assert_eq!(
        decoded_from_ref.recipient, test_data.recipient,
        "Recipient should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.recipient, test_data.recipient,
        "Recipient should match (from owned)"
    );

    println!(
        "Original -> Bytes -> DemandData conversions successful for RecipientArbiter"
    );
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}
