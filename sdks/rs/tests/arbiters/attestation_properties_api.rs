use alkahest_rs::{
    contracts::attestation_properties::composing::{
        AttesterArbiter, ExpirationTimeAfterArbiter, RecipientArbiter, SchemaArbiter,
    },
    extensions::HasArbiters,
    utils::setup_test_environment,
};
use alloy::primitives::{Address, Bytes, FixedBytes};

/// Test the new structured attestation properties API: arbiters_module.attestation_properties().attester().decode()
#[tokio::test]
async fn test_structured_attestation_properties_api() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Test AttesterArbiter via structured API
    let attester_demand = AttesterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        attester: Address::ZERO,
    };

    // Use the new structured API: arbiters_module.attestation_properties().attester().decode()
    let decoded_attester = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .attester()
        .decode(attester_demand.clone())?;

    assert_eq!(decoded_attester.base_arbiter, addresses.trivial_arbiter);
    assert_eq!(decoded_attester.attester, Address::ZERO);
    println!(
        "✅ AttesterArbiter structured API: arbiters_module.attestation_properties().attester().decode() works!"
    );

    // Test ExpirationTimeAfterArbiter via structured API
    let expiration_time_after_demand = ExpirationTimeAfterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        expirationTime: 1640995200u64, // Jan 1, 2022
    };

    // Use the new structured API: arbiters_module.attestation_properties().expiration_time_after().decode()
    let decoded_expiration_time_after = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .expiration_time_after()
        .decode(expiration_time_after_demand.clone())?;

    assert_eq!(
        decoded_expiration_time_after.base_arbiter,
        addresses.trivial_arbiter
    );
    assert_eq!(decoded_expiration_time_after.expiration_time, 1640995200u64);
    println!(
        "✅ ExpirationTimeAfterArbiter structured API: arbiters_module.attestation_properties().expiration_time_after().decode() works!"
    );

    // Test RecipientArbiter via structured API
    let recipient_demand = RecipientArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        recipient: Address::ZERO,
    };

    // Use the new structured API: arbiters_module.attestation_properties().recipient().decode()
    let decoded_recipient = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .recipient()
        .decode(recipient_demand.clone())?;

    assert_eq!(decoded_recipient.base_arbiter, addresses.trivial_arbiter);
    assert_eq!(decoded_recipient.recipient, Address::ZERO);
    println!(
        "✅ RecipientArbiter structured API: arbiters_module.attestation_properties().recipient().decode() works!"
    );

    // Test SchemaArbiter via structured API
    let schema_demand = SchemaArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        schema: FixedBytes::ZERO,
    };

    // Use the new structured API: arbiters_module.attestation_properties().schema().decode()
    let decoded_schema = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .schema()
        .decode(schema_demand.clone())?;

    assert_eq!(decoded_schema.base_arbiter, addresses.trivial_arbiter);
    assert_eq!(decoded_schema.schema, FixedBytes::ZERO);
    println!(
        "✅ SchemaArbiter structured API: arbiters_module.attestation_properties().schema().decode() works!"
    );

    println!("✅ All structured attestation properties APIs working correctly!");
    Ok(())
}

/// Test that the structured API provides the same results as direct method calls
#[tokio::test]
async fn test_structured_attestation_properties_api_equivalence() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    let attester_demand = AttesterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        attester: Address::ZERO,
    };

    // Test both APIs give same result for AttesterArbiter
    let decoded_direct = test
        .alice_client
        .arbiters()
        .decode_attester_arbiter_composing_demands(attester_demand.clone())?;

    let decoded_structured = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .attester()
        .decode(attester_demand.clone())?;

    assert_eq!(decoded_direct.base_arbiter, decoded_structured.base_arbiter);
    assert_eq!(decoded_direct.attester, decoded_structured.attester);

    // Test ExpirationTimeAfterArbiter equivalence
    let expiration_time_after_demand = ExpirationTimeAfterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        expirationTime: 1640995200u64,
    };

    let decoded_expiration_direct = test
        .alice_client
        .arbiters()
        .decode_expiration_time_after_arbiter_composing_demands(
            expiration_time_after_demand.clone(),
        )?;

    let decoded_expiration_structured = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .expiration_time_after()
        .decode(expiration_time_after_demand.clone())?;

    assert_eq!(
        decoded_expiration_direct.base_arbiter,
        decoded_expiration_structured.base_arbiter
    );
    assert_eq!(
        decoded_expiration_direct.expiration_time,
        decoded_expiration_structured.expiration_time
    );

    // Test RecipientArbiter equivalence
    let recipient_demand = RecipientArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        recipient: Address::ZERO,
    };

    let decoded_recipient_direct = test
        .alice_client
        .arbiters()
        .decode_recipient_arbiter_composing_demands(recipient_demand.clone())?;

    let decoded_recipient_structured = test
        .alice_client
        .arbiters()
        .attestation_properties()
        .recipient()
        .decode(recipient_demand.clone())?;

    assert_eq!(
        decoded_recipient_direct.base_arbiter,
        decoded_recipient_structured.base_arbiter
    );
    assert_eq!(
        decoded_recipient_direct.recipient,
        decoded_recipient_structured.recipient
    );

    println!("✅ Structured attestation properties API gives same results as direct method calls!");
    Ok(())
}
