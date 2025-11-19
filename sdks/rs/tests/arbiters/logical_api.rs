use alkahest_rs::{
    contracts::logical::{AllArbiter, AnyArbiter, NotArbiter},
    extensions::HasArbiters,
    utils::setup_test_environment,
};
use alloy::primitives::Bytes;

/// Test the new structured logical API: arbiters_module.logical().all().decode()
#[tokio::test]
async fn test_structured_logical_api() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Test AllArbiter via structured API
    let all_demand = AllArbiter::DemandData {
        arbiters: vec![addresses.trivial_arbiter, addresses.trivial_arbiter],
        demands: vec![Bytes::new(), Bytes::new()],
    };

    // Use the new structured API: arbiters_module.logical().all().decode()
    let decoded_all = test
        .alice_client
        .arbiters()
        .logical()
        .all()
        .decode(all_demand.clone())?;

    assert_eq!(decoded_all.arbiters.len(), 2);
    assert_eq!(decoded_all.demands.len(), 2);
    println!("✅ AllArbiter structured API: arbiters_module.logical().all().decode() works!");

    // Test AnyArbiter via structured API
    let any_demand = AnyArbiter::DemandData {
        arbiters: vec![addresses.trivial_arbiter],
        demands: vec![Bytes::new()],
    };

    // Use the new structured API: arbiters_module.logical().any().decode()
    let decoded_any = test
        .alice_client
        .arbiters()
        .logical()
        .any()
        .decode(any_demand.clone())?;

    assert_eq!(decoded_any.arbiters.len(), 1);
    assert_eq!(decoded_any.demands.len(), 1);
    println!("✅ AnyArbiter structured API: arbiters_module.logical().any().decode() works!");

    // Test NotArbiter via structured API
    let not_demand = NotArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
    };

    // Use the new structured API: arbiters_module.logical().not().decode()
    let decoded_not = test
        .alice_client
        .arbiters()
        .logical()
        .not()
        .decode(not_demand.clone())?;

    assert_eq!(decoded_not.base_arbiter, addresses.trivial_arbiter);
    println!("✅ NotArbiter structured API: arbiters_module.logical().not().decode() works!");

    println!("✅ All structured logical APIs working correctly!");
    Ok(())
}

/// Test that the structured API provides the same results as direct method calls
#[tokio::test]
async fn test_structured_api_equivalence() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    let all_demand = AllArbiter::DemandData {
        arbiters: vec![addresses.trivial_arbiter, addresses.trivial_arbiter],
        demands: vec![Bytes::new(), Bytes::new()],
    };

    // Test both APIs give same result
    let decoded_direct = test
        .alice_client
        .arbiters()
        .decode_all_arbiter_demands(all_demand.clone())?;

    let decoded_structured = test
        .alice_client
        .arbiters()
        .logical()
        .all()
        .decode(all_demand.clone())?;

    assert_eq!(
        decoded_direct.arbiters.len(),
        decoded_structured.arbiters.len()
    );
    assert_eq!(
        decoded_direct.demands.len(),
        decoded_structured.demands.len()
    );
    assert_eq!(decoded_direct.arbiters, decoded_structured.arbiters);

    println!("✅ Structured API gives same results as direct method calls!");
    Ok(())
}
