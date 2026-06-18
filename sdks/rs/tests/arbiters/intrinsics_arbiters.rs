use alkahest_rs::{
    contracts::{self, arbiters::IntrinsicsArbiter},
    utils::setup_test_environment,
};
use alloy::primitives::{Address, Bytes, FixedBytes};
use std::time::{SystemTime, UNIX_EPOCH};

#[tokio::test]
async fn test_intrinsics_arbiter() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Create a valid non-expired attestation
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    // Create a valid attestation (not expired, not revoked)
    let valid_attestation = contracts::IEAS::Attestation {
        uid: FixedBytes::<32>::from_slice(&[1u8; 32]),
        schema: FixedBytes::<32>::from_slice(&[2u8; 32]),
        time: now.into(),
        expirationTime: (now + 3600).into(), // expires in 1 hour
        revocationTime: 0u64.into(),         // not revoked
        refUID: FixedBytes::<32>::default(),
        recipient: Address::default(),
        attester: Address::default(),
        revocable: true,
        data: Bytes::default(),
    };

    // Create an expired attestation
    let expired_attestation = contracts::IEAS::Attestation {
        expirationTime: (now - 3600).into(), // expired 1 hour ago
        ..valid_attestation.clone()
    };

    // Create a revoked attestation
    let revoked_attestation = contracts::IEAS::Attestation {
        revocationTime: (now - 3600).into(), // revoked 1 hour ago
        ..valid_attestation.clone()
    };

    // Test with IntrinsicsArbiter
    let intrinsics_arbiter = IntrinsicsArbiter::new(
        test.addresses.arbiters_addresses.intrinsics_arbiter,
        &test.alice_client.wallet_provider,
    );

    // Valid attestation should pass
    let result_valid = intrinsics_arbiter
        .checkObligation(
            valid_attestation.into(),
            Bytes::default(),
            FixedBytes::<32>::default(),
        )
        .call()
        .await?;
    assert!(
        result_valid,
        "Valid attestation should pass intrinsic checks"
    );

    // Expired attestation should fail
    let result_expired = intrinsics_arbiter
        .checkObligation(
            expired_attestation.into(),
            Bytes::default(),
            FixedBytes::<32>::default(),
        )
        .call()
        .await;

    assert!(
        result_expired.is_err(),
        "Expired attestation should fail intrinsic checks"
    );

    // Revoked attestation should fail
    let result_revoked = intrinsics_arbiter
        .checkObligation(
            revoked_attestation.into(),
            Bytes::default(),
            FixedBytes::<32>::default(),
        )
        .call()
        .await;

    assert!(
        result_revoked.is_err(),
        "Revoked attestation should fail intrinsic checks"
    );

    Ok(())
}
