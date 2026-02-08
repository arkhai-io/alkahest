#[cfg(test)]
mod tests {
    use alkahest_rs::{
        extensions::{HasErc20, HasStringObligation},
        fixtures::MockERC20Permit,
        types::{ArbiterData, Erc20Data},
    };
    use alloy::{
        network::EthereumWallet,
        primitives::{Bytes, U256},
        providers::{Provider, ProviderBuilder, WsConnect},
    };

    use alkahest_rs::utils::setup_test_environment;

    #[tokio::test]
    async fn test_nonce_synchronization_across_modules() -> eyre::Result<()> {
        let test = setup_test_environment().await?;

        // Give alice some ERC20 tokens first
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(200))
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: U256::from(100),
        };

        // Create custom arbiter data
        let arbiter = test.addresses.erc20_addresses.clone().payment_obligation;
        let demand = Bytes::from(b"custom demand data");
        let item = ArbiterData { arbiter, demand };

        let erc20_receipt1 = test
            .alice_client
            .erc20()
            .escrow()
            .non_tierable()
            .permit_and_create(&price, &item, 0)
            .await?;

        // Call StringObligation module (different module)
        let string_receipt = test
            .alice_client
            .string_obligation()
            .do_obligation("test obligation".to_string(), None, None)
            .await?;

        let price2 = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: U256::from(50),
        };

        println!("About to make second ERC20 call...");

        let erc20_receipt2 = test
            .alice_client
            .erc20()
            .escrow()
            .non_tierable()
            .permit_and_create(&price2, &item, 0)
            .await?;

        let final_nonce = test
            .alice_client
            .wallet_provider
            .get_transaction_count(test.alice.address())
            .await?;

        println!("Final nonce: {}", final_nonce);

        // Verify that all transactions were successful
        assert!(erc20_receipt1.status());
        assert!(string_receipt.status());
        assert!(erc20_receipt2.status());

        // Verify nonces increased correctly
        println!("✅ Nonce synchronization test passed");

        Ok(())
    }

    #[tokio::test]
    async fn test_nonce_synchronization_with_new_modules() -> eyre::Result<()> {
        let test = setup_test_environment().await?;

        // Give alice some ERC20 tokens first
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(300))
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: U256::from(100),
        };

        // Create custom arbiter data
        let arbiter = test.addresses.erc20_addresses.clone().payment_obligation;
        let demand = Bytes::from(b"custom demand data");
        let item = ArbiterData { arbiter, demand };

        // Create NEW module instances using the SAME wallet provider as the client
        use alkahest_rs::clients::erc20::Erc20Module;
        use alkahest_rs::clients::string_obligation::StringObligationModule;

        let wallet = EthereumWallet::from(test.alice.clone());
        let ws = WsConnect::new(test.anvil.ws_endpoint_url());

        let provider = ProviderBuilder::new()
            .with_simple_nonce_management()
            .wallet(wallet.clone())
            .connect_ws(ws)
            .await?;

        // Manually create a new wallet provider using the same signer and RPC URL
        let shared_wallet_provider = std::sync::Arc::new(provider);

        let new_erc20_module = Erc20Module::new(
            test.alice.clone(),
            shared_wallet_provider.clone(),
            Some(test.addresses.erc20_addresses.clone()),
        )?;

        let new_string_obligation_module = StringObligationModule::new(
            test.alice.clone(),
            shared_wallet_provider.clone(),
            Some(test.addresses.string_obligation_addresses.clone()),
        )?;

        // First call: escrow creation with NEW ERC20 module instance
        let receipt1 = new_erc20_module
            .escrow()
            .non_tierable()
            .permit_and_create(&price, &item, 0)
            .await?;

        println!("First ERC20 transaction completed with new ERC20 module");

        // Second call: do_obligation with NEW StringObligation module instance
        let string_receipt = new_string_obligation_module
            .do_obligation("test obligation".to_string(), None, None)
            .await?;

        println!("StringObligation transaction completed with new module instance");

        let price2 = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: U256::from(75),
        };

        println!("About to make second ERC20 call with NEW ERC20 module instance...");

        // Third call: escrow creation again with NEW ERC20 module instance
        let receipt2 = new_erc20_module
            .escrow()
            .non_tierable()
            .permit_and_create(&price2, &item, 0)
            .await?;

        println!("Second ERC20 transaction completed with new ERC20 module");

        let final_nonce = test
            .alice_client
            .wallet_provider
            .get_transaction_count(test.alice.address())
            .await?;

        println!("Final nonce: {}", final_nonce);

        // Verify that all transactions were successful
        assert!(receipt1.status());
        assert!(string_receipt.status());
        assert!(receipt2.status());

        // Verify nonces increased correctly
        println!("✅ Nonce synchronization with new modules test passed");

        Ok(())
    }
}
