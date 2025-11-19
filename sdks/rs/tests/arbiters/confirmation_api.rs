use alkahest_rs::{
    contracts::confirmation_arbiters::{
        ConfirmationArbiterComposing, RevocableConfirmationArbiterComposing,
        UnrevocableConfirmationArbiterComposing,
    },
    extensions::HasArbiters,
    utils::setup_test_environment,
};
use alloy::primitives::Bytes;

/// Test the new structured confirmation API: arbiters_module.confirmation().confirmation().decode()
#[tokio::test]
async fn test_structured_confirmation_api() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Test ConfirmationArbiterComposing via structured API
    let confirmation_demand = ConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    // Use the new structured API: arbiters_module.confirmation().confirmation().decode()
    let decoded_confirmation = test
        .alice_client
        .arbiters()
        .confirmation()
        .confirmation()
        .decode(confirmation_demand.clone())?;

    assert_eq!(decoded_confirmation.base_arbiter, addresses.trivial_arbiter);
    println!(
        "✅ ConfirmationArbiter structured API: arbiters_module.confirmation().confirmation().decode() works!"
    );

    // Test RevocableConfirmationArbiterComposing via structured API
    let revocable_demand = RevocableConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    // Use the new structured API: arbiters_module.confirmation().revocable().decode()
    let decoded_revocable = test
        .alice_client
        .arbiters()
        .confirmation()
        .revocable()
        .decode(revocable_demand.clone())?;

    assert_eq!(decoded_revocable.base_arbiter, addresses.trivial_arbiter);
    println!(
        "✅ RevocableConfirmationArbiter structured API: arbiters_module.confirmation().revocable().decode() works!"
    );

    // Test UnrevocableConfirmationArbiterComposing via structured API
    let unrevocable_demand = UnrevocableConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    // Use the new structured API: arbiters_module.confirmation().unrevocable().decode()
    let decoded_unrevocable = test
        .alice_client
        .arbiters()
        .confirmation()
        .unrevocable()
        .decode(unrevocable_demand.clone())?;

    assert_eq!(decoded_unrevocable.base_arbiter, addresses.trivial_arbiter);
    println!(
        "✅ UnrevocableConfirmationArbiter structured API: arbiters_module.confirmation().unrevocable().decode() works!"
    );

    println!("✅ All structured confirmation APIs working correctly!");
    Ok(())
}

/// Test that the structured API provides the same results as direct method calls
#[tokio::test]
async fn test_structured_confirmation_api_equivalence() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    let confirmation_demand = ConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    // Test both APIs give same result for ConfirmationArbiterComposing
    let decoded_direct = test
        .alice_client
        .arbiters()
        .decode_confirmation_arbiter_composing_demands(confirmation_demand.clone())?;

    let decoded_structured = test
        .alice_client
        .arbiters()
        .confirmation()
        .confirmation()
        .decode(confirmation_demand.clone())?;

    assert_eq!(decoded_direct.base_arbiter, decoded_structured.base_arbiter);

    // Test RevocableConfirmationArbiterComposing equivalence
    let revocable_demand = RevocableConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    let decoded_revocable_direct = test
        .alice_client
        .arbiters()
        .decode_revocable_confirmation_arbiter_composing_demands(revocable_demand.clone())?;

    let decoded_revocable_structured = test
        .alice_client
        .arbiters()
        .confirmation()
        .revocable()
        .decode(revocable_demand.clone())?;

    assert_eq!(
        decoded_revocable_direct.base_arbiter,
        decoded_revocable_structured.base_arbiter
    );

    // Test UnrevocableConfirmationArbiterComposing equivalence
    let unrevocable_demand = UnrevocableConfirmationArbiterComposing::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    let decoded_unrevocable_direct = test
        .alice_client
        .arbiters()
        .decode_unrevocable_confirmation_arbiter_composing_demands(unrevocable_demand.clone())?;

    let decoded_unrevocable_structured = test
        .alice_client
        .arbiters()
        .confirmation()
        .unrevocable()
        .decode(unrevocable_demand.clone())?;

    assert_eq!(
        decoded_unrevocable_direct.base_arbiter,
        decoded_unrevocable_structured.base_arbiter
    );

    println!("✅ Structured confirmation API gives same results as direct method calls!");
    Ok(())
}
