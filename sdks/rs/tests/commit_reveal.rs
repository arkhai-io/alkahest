use std::time::{SystemTime, UNIX_EPOCH};

use alloy::{
    primitives::{Bytes, FixedBytes, U256},
    providers::ext::AnvilApi as _,
};

use alkahest_rs::{
    contracts::obligations::CommitRevealObligation,
    extensions::{HasCommitReveal, HasNativeToken},
    types::{ArbiterData, NativeTokenData},
    utils::setup_test_environment,
    DefaultAlkahestClient,
};

/// Full lifecycle: Alice escrows native tokens → Bob commits → reveals → collects escrow → reclaims bond.
#[tokio::test]
async fn test_commit_reveal_full_lifecycle() -> eyre::Result<()> {
    let test = setup_test_environment().await?;

    // ── 1. Alice creates a native-token escrow demanding a CommitRevealObligation fulfillment ──
    let escrow_amount = U256::from(2_000_000_000_000_000_000u128); // 2 ETH
    let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 3600;

    // The demand bytes are unused by CommitRevealObligation.checkObligation,
    // but we still need a valid ArbiterData pointing at the CR contract.
    let arbiter = test
        .addresses
        .commit_reveal_obligation_addresses
        .obligation;
    let item = ArbiterData {
        arbiter,
        demand: Bytes::new(),
    };

    let escrow_receipt = test
        .alice_client
        .native_token()
        .escrow()
        .non_tierable()
        .create(
            &NativeTokenData {
                value: escrow_amount,
            },
            &item,
            expiration,
        )
        .await?;

    assert!(escrow_receipt.status());
    let escrow_uid = DefaultAlkahestClient::get_attested_event(escrow_receipt)?.uid;

    // ── 2. Bob computes commitment and commits (locks bond) ──
    let salt = FixedBytes::<32>::from([0xaa; 32]);
    let schema = FixedBytes::<32>::default();
    let payload = Bytes::from(b"hello from bob".to_vec());

    let obligation_data = CommitRevealObligation::ObligationData {
        payload: payload.clone(),
        salt,
        schema,
    };

    let commitment = test
        .bob_client
        .commit_reveal()
        .compute_commitment(escrow_uid, test.bob.address(), obligation_data.clone())
        .await?;

    let commit_receipt = test.bob_client.commit_reveal().commit(commitment).await?;
    assert!(commit_receipt.status());

    // Verify commitment is stored
    let (commit_block, _commit_ts, committer) = test
        .bob_client
        .commit_reveal()
        .get_commitment(commitment)
        .await?;
    assert!(commit_block > 0);
    assert_eq!(committer, test.bob.address());

    // ── 3. Bob reveals (creates fulfillment attestation referencing escrow) ──
    // In Anvil automining mode, the next tx is in a new block, satisfying the
    // "commit must be from an earlier block" requirement.
    let reveal_receipt = test
        .bob_client
        .commit_reveal()
        .do_obligation(obligation_data, Some(escrow_uid))
        .await?;
    assert!(reveal_receipt.status());
    let fulfillment_uid = DefaultAlkahestClient::get_attested_event(reveal_receipt)?.uid;

    // ── 4. Bob collects the escrowed native tokens ──
    let collect_receipt = test
        .bob_client
        .native_token()
        .escrow()
        .non_tierable()
        .collect(escrow_uid, fulfillment_uid)
        .await?;
    assert!(collect_receipt.status());

    // ── 5. Bob reclaims bond ──
    let reclaim_receipt = test
        .bob_client
        .commit_reveal()
        .reclaim_bond(fulfillment_uid)
        .await?;
    assert!(reclaim_receipt.status());

    // Verify commitment is now claimed
    let claimed = test
        .bob_client
        .commit_reveal()
        .is_commitment_claimed(commitment)
        .await?;
    assert!(claimed);

    Ok(())
}

/// Bond slashing: Bob commits but never reveals → after deadline, bond is slashed.
#[tokio::test]
async fn test_commit_reveal_bond_slash() -> eyre::Result<()> {
    let test = setup_test_environment().await?;

    // ── 1. Alice creates a native-token escrow ──
    let escrow_amount = U256::from(2_000_000_000_000_000_000u128); // 2 ETH
    let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 7200;

    let arbiter = test
        .addresses
        .commit_reveal_obligation_addresses
        .obligation;
    let item = ArbiterData {
        arbiter,
        demand: Bytes::new(),
    };

    let escrow_receipt = test
        .alice_client
        .native_token()
        .escrow()
        .non_tierable()
        .create(
            &NativeTokenData {
                value: escrow_amount,
            },
            &item,
            expiration,
        )
        .await?;

    assert!(escrow_receipt.status());
    let escrow_uid = DefaultAlkahestClient::get_attested_event(escrow_receipt)?.uid;

    // ── 2. Bob commits ──
    let salt = FixedBytes::<32>::from([0xbb; 32]);
    let schema = FixedBytes::<32>::default();
    let payload = Bytes::from(b"will not reveal".to_vec());

    let obligation_data = CommitRevealObligation::ObligationData {
        payload: payload.clone(),
        salt,
        schema,
    };

    let commitment = test
        .bob_client
        .commit_reveal()
        .compute_commitment(escrow_uid, test.bob.address(), obligation_data.clone())
        .await?;

    let commit_receipt = test.bob_client.commit_reveal().commit(commitment).await?;
    assert!(commit_receipt.status());

    // ── 3. Advance time past the commit deadline without revealing ──
    let deadline = test.bob_client.commit_reveal().commit_deadline().await?;
    let deadline_secs: u64 = deadline.try_into()?;
    test.god_provider
        .anvil_increase_time(deadline_secs + 1)
        .await?;

    // ── 4. Anyone slashes the bond ──
    let slash_receipt = test
        .alice_client
        .commit_reveal()
        .slash_bond(commitment)
        .await?;
    assert!(slash_receipt.status());

    // Verify commitment is now marked as claimed (slashed)
    let claimed = test
        .alice_client
        .commit_reveal()
        .is_commitment_claimed(commitment)
        .await?;
    assert!(claimed);

    Ok(())
}
