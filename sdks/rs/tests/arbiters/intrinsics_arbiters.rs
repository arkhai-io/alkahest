use alkahest_rs::{contracts, utils::setup_test_environment};
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
    let intrinsics_arbiter = contracts::IntrinsicsArbiter::new(
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

#[tokio::test]
async fn test_intrinsics_arbiter_2() -> eyre::Result<()> {
    // Setup test environment
    let test = setup_test_environment().await?;

    // Define schemas
    let schema1 = FixedBytes::<32>::from_slice(&[1u8; 32]);
    let schema2 = FixedBytes::<32>::from_slice(&[2u8; 32]);

    // Create a valid attestation with schema1
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let valid_attestation = contracts::IEAS::Attestation {
        uid: FixedBytes::<32>::from_slice(&[1u8; 32]),
        schema: schema1,
        time: now.into(),
        expirationTime: (now + 3600).into(), // expires in 1 hour
        revocationTime: 0u64.into(),         // not revoked
        refUID: FixedBytes::<32>::default(),
        recipient: Address::default(),
        attester: Address::default(),
        revocable: true,
        data: Bytes::default(),
    };

    // Test with IntrinsicsArbiter2
    let intrinsics_arbiter2 = contracts::IntrinsicsArbiter2::new(
        test.addresses.arbiters_addresses.intrinsics_arbiter_2,
        &test.alice_client.wallet_provider,
    );

    // Create demand with matching schema
    let matching_demand = contracts::IntrinsicsArbiter2::DemandData { schema: schema1 };
    let encoded_matching_demand = matching_demand.into();

    // Create demand with non-matching schema
    let non_matching_demand = contracts::IntrinsicsArbiter2::DemandData { schema: schema2 };
    let encoded_non_matching_demand = non_matching_demand.into();

    // Test with matching schema - should pass
    let result_matching = intrinsics_arbiter2
        .checkObligation(
            valid_attestation.clone().into(),
            encoded_matching_demand,
            FixedBytes::<32>::default(),
        )
        .call()
        .await?;
    assert!(
        result_matching,
        "Attestation with matching schema should pass"
    );

    // Test with non-matching schema - should fail
    let result_non_matching = intrinsics_arbiter2
        .checkObligation(
            valid_attestation.into(),
            encoded_non_matching_demand,
            FixedBytes::<32>::default(),
        )
        .call()
        .await;

    assert!(
        result_non_matching.is_err(),
        "Attestation with non-matching schema should fail"
    );

    Ok(())
}

#[tokio::test]
async fn test_intrinsics_arbiter2_trait_based_encoding() -> eyre::Result<()> {
    let test_data = contracts::IntrinsicsArbiter2::DemandData {
        schema: FixedBytes::<32>::from_slice(&[1u8; 32]),
    };

    // Test From trait: DemandData -> Bytes
    let encoded_bytes: alloy::primitives::Bytes = test_data.clone().into();

    // Test TryFrom trait: &Bytes -> DemandData
    let decoded_from_ref: contracts::IntrinsicsArbiter2::DemandData =
        (&encoded_bytes).try_into()?;

    // Test TryFrom trait: Bytes -> DemandData
    let decoded_from_owned: contracts::IntrinsicsArbiter2::DemandData =
        encoded_bytes.clone().try_into()?;

    // Verify both decoded versions match original
    assert_eq!(
        decoded_from_ref.schema, test_data.schema,
        "Schema should match (from ref)"
    );

    assert_eq!(
        decoded_from_owned.schema, test_data.schema,
        "Schema should match (from owned)"
    );

    println!("Original -> Bytes -> DemandData conversions successful for IntrinsicsArbiter2");
    println!("Encoded bytes length: {}", encoded_bytes.len());

    Ok(())
}
