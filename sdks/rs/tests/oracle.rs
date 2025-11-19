#[cfg(test)]
mod tests {
    use alkahest_rs::{
        DefaultAlkahestClient,
        clients::oracle::ArbitrateOptions,
        contracts::{self, StringObligation},
        extensions::{HasErc20, HasOracle, HasStringObligation},
        fixtures::MockERC20Permit,
        types::{ArbiterData, Erc20Data},
        utils::TestContext,
    };
    use alloy::primitives::{FixedBytes, bytes};
    use std::{
        sync::Arc,
        time::{Duration, SystemTime, UNIX_EPOCH},
    };

    use alkahest_rs::utils::setup_test_environment;

    async fn setup_escrow(
        test: &TestContext,
    ) -> eyre::Result<(Erc20Data, ArbiterData, FixedBytes<32>)> {
        let mock_erc20 = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20
            .transfer(test.alice.address(), 100u64.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: 100u64.try_into()?,
        };

        let arbiter = test.addresses.arbiters_addresses.trusted_oracle_arbiter;

        let demand_data = contracts::TrustedOracleArbiter::DemandData {
            oracle: test.bob.address(),
            data: bytes!(""),
        };

        let demand = demand_data.into();
        let item = ArbiterData { arbiter, demand };
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 3600;

        let escrow_receipt = test
            .alice_client
            .erc20()
            .permit_and_buy_with_erc20(&price, &item, expiration)
            .await?;

        let escrow_event = DefaultAlkahestClient::get_attested_event(escrow_receipt)?;

        Ok((price, item, escrow_event.uid))
    }

    async fn make_fulfillment(
        test: &TestContext,
        statement: &str,
        ref_uid: FixedBytes<32>,
    ) -> eyre::Result<FixedBytes<32>> {
        let receipt = test
            .bob_client
            .string_obligation()
            .do_obligation(statement.to_string(), Some(ref_uid))
            .await?;
        Ok(DefaultAlkahestClient::get_attested_event(receipt)?.uid)
    }

    #[tokio::test]
    async fn test_trivial_arbitrate_past() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        let bob_client = test.bob_client.clone();
        let decisions = test
            .bob_client
            .oracle()
            .arbitrate_past_sync(
                move |attestation| {
                    let obligation = bob_client
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(decisions.len(), 1);
        assert_eq!(decisions[0].decision, true);

        let collection = test
            .bob_client
            .erc20()
            .collect_escrow(escrow_uid, fulfillment_uid)
            .await?;

        println!("✅ Arbitrate decision passed. Tx: {:?}", collection);

        Ok(())
    }

    #[tokio::test]
    async fn test_conditional_arbitrate_past() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let good_fulfillment = make_fulfillment(&test, "good", escrow_uid).await?;
        let bad_fulfillment = make_fulfillment(&test, "bad", escrow_uid).await?;

        // Request arbitration for both
        test.bob_client
            .oracle()
            .request_arbitration(good_fulfillment, test.bob.address())
            .await?;
        test.bob_client
            .oracle()
            .request_arbitration(bad_fulfillment, test.bob.address())
            .await?;

        let bob_client = test.bob_client.clone();
        let decisions = test
            .bob_client
            .oracle()
            .arbitrate_past_sync(
                move |attestation| {
                    let obligation = bob_client
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(decisions.len(), 2);
        assert_eq!(
            decisions.iter().filter(|d| d.decision).count(),
            1,
            "Only one should be approved"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_skip_arbitrated_arbitrate_past() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        // First arbitration
        let bob_client = test.bob_client.clone();
        let decisions = test
            .bob_client
            .oracle()
            .arbitrate_past_sync(
                move |attestation| {
                    let obligation = bob_client
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(decisions.len(), 1);

        // Second arbitration with skip_arbitrated should find nothing
        let bob_client2 = test.bob_client.clone();
        let decisions = test
            .bob_client
            .oracle()
            .arbitrate_past_sync(
                move |attestation| {
                    let obligation = bob_client2
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                &ArbitrateOptions {
                    skip_arbitrated: true,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(decisions.len(), 0, "Should skip already arbitrated");

        Ok(())
    }

    #[tokio::test]
    async fn test_arbitrate_past_async() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        let bob_client = Arc::new(test.bob_client.clone());
        let decisions = test
            .bob_client
            .oracle()
            .arbitrate_past_async(
                move |attestation| {
                    let client = bob_client.clone();
                    let attestation = attestation.clone();
                    async move {
                        let obligation = client
                            .extract_obligation_data::<StringObligation::ObligationData>(
                                &attestation,
                            )
                            .ok()?;
                        Some(obligation.item == "good")
                    }
                },
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(decisions.len(), 1);
        assert_eq!(decisions[0].decision, true);

        Ok(())
    }

    #[tokio::test]
    async fn test_trivial_listen_and_arbitrate() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        let oracle_client = Arc::new(test.bob_client.oracle().clone());
        let result = test
            .bob_client
            .oracle()
            .listen_and_arbitrate_sync(
                move |attestation| {
                    let obligation = (*oracle_client)
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                |_decision| async {},
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(result.decisions.len(), 1);
        assert_eq!(result.decisions[0].decision, true);

        test.bob_client
            .oracle()
            .unsubscribe(result.subscription_id)
            .await?;

        Ok(())
    }

    #[tokio::test]
    async fn test_listen_and_arbitrate_new_fulfillments() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let oracle_client = Arc::new(test.bob_client.oracle().clone());
        let result = test
            .bob_client
            .oracle()
            .listen_and_arbitrate_sync(
                move |attestation| {
                    let obligation = (*oracle_client)
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                |_decision| async {},
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: true,
                },
            )
            .await?;

        assert_eq!(result.decisions.len(), 0, "Should not arbitrate past");

        // Now make a new fulfillment after listening started
        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        test.bob_client
            .oracle()
            .wait_for_arbitration(fulfillment_uid, None)
            .await?;

        let collection = test
            .bob_client
            .erc20()
            .collect_escrow(escrow_uid, fulfillment_uid)
            .await?;

        println!("✅ Arbitrate decision passed. Tx: {:?}", collection);

        test.bob_client
            .oracle()
            .unsubscribe(result.subscription_id)
            .await?;
        Ok(())
    }

    #[tokio::test]
    async fn test_listen_and_arbitrate_async() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        let bob_client = Arc::new(test.bob_client.clone());
        let result = test
            .bob_client
            .oracle()
            .listen_and_arbitrate_async(
                move |attestation| {
                    let client = bob_client.clone();
                    let attestation = attestation.clone();
                    async move {
                        let obligation = client
                            .extract_obligation_data::<StringObligation::ObligationData>(
                                &attestation,
                            )
                            .ok()?;
                        Some(obligation.item == "good")
                    }
                },
                |_decision| async {},
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(result.decisions.len(), 1);
        assert_eq!(result.decisions[0].decision, true);

        test.bob_client
            .oracle()
            .wait_for_arbitration(fulfillment_uid, None)
            .await?;

        let collection = test
            .bob_client
            .erc20()
            .collect_escrow(escrow_uid, fulfillment_uid)
            .await?;

        println!("✅ Arbitrate decision passed. Tx: {:?}", collection);

        test.bob_client
            .oracle()
            .unsubscribe(result.subscription_id)
            .await?;

        Ok(())
    }

    #[tokio::test]
    async fn test_listen_and_arbitrate_no_spawn() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let fulfillment_uid = make_fulfillment(&test, "good", escrow_uid).await?;

        // Request arbitration
        test.bob_client
            .oracle()
            .request_arbitration(fulfillment_uid, test.bob.address())
            .await?;

        let oracle_client = test.bob_client.oracle().clone();
        let result = test
            .bob_client
            .oracle()
            .listen_and_arbitrate_no_spawn(
                move |attestation| {
                    let obligation = oracle_client
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                |_decision| async {},
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
                Some(Duration::from_secs(5)),
            )
            .await?;

        assert_eq!(result.decisions.len(), 1);
        assert_eq!(result.decisions[0].decision, true);

        test.bob_client
            .oracle()
            .wait_for_arbitration(fulfillment_uid, None)
            .await?;

        let collection = test
            .bob_client
            .erc20()
            .collect_escrow(escrow_uid, fulfillment_uid)
            .await?;

        println!("✅ Arbitrate decision passed. Tx: {:?}", collection);

        Ok(())
    }

    #[tokio::test]
    async fn test_conditional_listen_and_arbitrate() -> eyre::Result<()> {
        let test = setup_test_environment().await?;
        let (_, _, escrow_uid) = setup_escrow(&test).await?;

        let good_fulfillment = make_fulfillment(&test, "good", escrow_uid).await?;
        let bad_fulfillment = make_fulfillment(&test, "bad", escrow_uid).await?;

        // Request arbitration for both
        test.bob_client
            .oracle()
            .request_arbitration(good_fulfillment, test.bob.address())
            .await?;
        test.bob_client
            .oracle()
            .request_arbitration(bad_fulfillment, test.bob.address())
            .await?;

        let oracle_client = Arc::new(test.bob_client.oracle().clone());
        let result = test
            .bob_client
            .oracle()
            .listen_and_arbitrate_sync(
                move |attestation| {
                    let obligation = (*oracle_client)
                        .extract_obligation_data::<StringObligation::ObligationData>(attestation)
                        .ok()?;
                    Some(obligation.item == "good")
                },
                |_decision| async {},
                &ArbitrateOptions {
                    skip_arbitrated: false,
                    only_new: false,
                },
            )
            .await?;

        assert_eq!(result.decisions.len(), 2);
        assert_eq!(
            result.decisions.iter().filter(|d| d.decision).count(),
            1,
            "Only one should be approved"
        );

        test.bob_client
            .oracle()
            .wait_for_arbitration(good_fulfillment, None)
            .await?;

        let collection = test
            .bob_client
            .erc20()
            .collect_escrow(escrow_uid, good_fulfillment)
            .await?;

        println!("✅ Arbitrate decision passed. Tx: {:?}", collection);

        test.bob_client
            .oracle()
            .unsubscribe(result.subscription_id)
            .await?;

        Ok(())
    }
}
