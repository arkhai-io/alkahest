use crate::arbiters::common::create_test_attestation;
use alkahest_rs::{contracts, utils::setup_test_environment};
use alloy::{
    primitives::{Bytes, FixedBytes},
    sol,
    sol_types::SolValue,
};

#[tokio::test]
async fn test_trivial_arbiter_always_returns_true() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a test attestation (values don't matter for TrivialArbiter)
    let attestation = create_test_attestation(None, None);

    // Empty demand data
    let demand = Bytes::default();
    let counteroffer = FixedBytes::<32>::default();

    // Check that the arbiter returns true
    let trivial_arbiter = contracts::TrivialArbiter::new(
        test.addresses.arbiters_addresses.trivial_arbiter,
        &test.alice_client.wallet_provider,
    );

    let result = trivial_arbiter
        .checkObligation(attestation.clone().into(), demand.clone(), counteroffer)
        .call()
        .await?;

    // Should always return true
    assert!(result, "TrivialArbiter should always return true");

    // Try with different values, should still return true
    let attestation2 = contracts::IEAS::Attestation {
        uid: FixedBytes::<32>::from_slice(&[1u8; 32]),
        ..attestation
    };

    sol! {
        struct TestDemand {
            bool data;
        }
    }

    let demand2 = TestDemand { data: true }.abi_encode().into();
    let counteroffer2 = FixedBytes::<32>::from_slice(&[42u8; 32]);

    let result2 = trivial_arbiter
        .checkObligation(attestation2.into(), demand2, counteroffer2)
        .call()
        .await?;

    // Should still return true
    assert!(
        result2,
        "TrivialArbiter should always return true, even with different values"
    );

    Ok(())
}
