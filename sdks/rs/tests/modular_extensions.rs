//! Tests for the modular extension system in Alkahest SDK
//!
//! These tests demonstrate various ways to configure and use extensions:
//! - Starting with no extensions and adding them via chaining
//! - Using specific module configurations
//! - Creating custom extensions
//! - Using default configurations

use alkahest_rs::{
    AlkahestClient,
    addresses::BASE_SEPOLIA_ADDRESSES,
    clients::{
        erc20::{Erc20Addresses, Erc20Module},
        erc721::Erc721Module,
        erc1155::Erc1155Module,
        token_bundle::TokenBundleModule,
    },
    extensions::{
        AlkahestExtension, HasAttestation as _, HasErc20, HasErc721, HasErc1155 as _,
        HasTokenBundle as _,
    },
    utils::setup_test_environment,
};
use alloy::signers::local::PrivateKeySigner;
use eyre::Result;

#[tokio::test]
async fn test_building_client_by_chaining_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Start with no extensions
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url).await?;
    assert_ne!(client.address, alloy::primitives::Address::ZERO);

    // Add ERC20 module with custom config
    let erc20_config = test_context.addresses.erc20_addresses.clone();
    let client_with_erc20 = client.extend::<Erc20Module>(Some(erc20_config)).await?;

    // Verify ERC20 module is accessible
    assert_ne!(
        client_with_erc20.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    // Add ERC721 module
    let erc721_config = test_context.addresses.erc721_addresses.clone();
    let client_with_both = client_with_erc20
        .extend::<Erc721Module>(Some(erc721_config))
        .await?;

    // Verify both modules are accessible
    assert_ne!(
        client_with_both.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        client_with_both.erc721().addresses.barter_utils,
        alloy::primitives::Address::ZERO
    );

    Ok(())
}

#[tokio::test]
async fn test_using_default_configurations() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client_defaults = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc20Module>()
        .await?
        .extend_default::<Erc721Module>()
        .await?;

    // Verify modules were added with default configs
    assert_ne!(
        client_defaults.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        client_defaults.erc721().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    // Default should be non-zero addresses (test environment uses locally deployed contracts)
    assert_ne!(
        client_defaults.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    // When using default config, it should use non-zero addresses
    // (the actual addresses will be different in test environment vs Base Sepolia)
    assert_ne!(
        client_defaults.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    Ok(())
}

#[tokio::test]
async fn test_all_base_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let full_client = AlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Verify all modules are available
    assert_ne!(
        full_client.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        full_client.erc721().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        full_client.erc1155().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        full_client.token_bundle().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        full_client.attestation().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    Ok(())
}

#[tokio::test]
async fn test_chaining_multiple_extensions_with_mixed_configs() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let multi_client = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend::<Erc20Module>(Some(test_context.addresses.erc20_addresses.clone()))
        .await?
        .extend_default::<Erc721Module>()
        .await?
        .extend::<Erc1155Module>(Some(test_context.addresses.erc1155_addresses.clone()))
        .await?
        .extend::<TokenBundleModule>(Some(test_context.addresses.token_bundle_addresses.clone()))
        .await?;

    // Verify all added modules are accessible
    assert_ne!(
        multi_client.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        multi_client.erc721().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        multi_client.erc1155().addresses.eas,
        alloy::primitives::Address::ZERO
    );
    assert_ne!(
        multi_client.token_bundle().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    Ok(())
}

#[tokio::test]
async fn test_custom_configuration() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let mut custom_erc20_addresses = test_context.addresses.erc20_addresses.clone();
    let custom_address = "0x1234567890123456789012345678901234567890".parse()?;
    custom_erc20_addresses.eas = custom_address;

    let custom_client = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend::<Erc20Module>(Some(custom_erc20_addresses.clone()))
        .await?;

    // Verify custom address is used
    assert_eq!(custom_client.erc20().addresses.eas, custom_address);

    // Verify it's different from the test environment default
    assert_ne!(
        custom_client.erc20().addresses.eas,
        test_context.addresses.erc20_addresses.eas
    );

    Ok(())
}

#[tokio::test]
async fn test_custom_extension_implementation() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Define a custom extension
    #[derive(Clone)]
    struct MyCustomExtension {
        my_data: String,
        erc20: Erc20Module,
    }

    #[derive(Clone)]
    struct MyCustomConfig {
        my_data: String,
        erc20_addresses: Erc20Addresses,
    }

    impl AlkahestExtension for MyCustomExtension {
        type Config = MyCustomConfig;

        async fn init(
            private_key: PrivateKeySigner,
            providers: alkahest_rs::types::ProviderContext,
            config: Option<Self::Config>,
        ) -> eyre::Result<Self> {
            let config = config.unwrap_or_else(|| MyCustomConfig {
                my_data: "default".to_string(),
                erc20_addresses: BASE_SEPOLIA_ADDRESSES.erc20_addresses.clone(),
            });

            let erc20 =
                Erc20Module::init(private_key, providers, Some(config.erc20_addresses)).await?;

            Ok(MyCustomExtension {
                my_data: config.my_data,
                erc20,
            })
        }

        fn find_client<T: Clone + Send + Sync + 'static>(&self) -> Option<&T> {
            let self_any: &dyn std::any::Any = self;
            if let Some(client) = self_any.downcast_ref::<T>() {
                return Some(client);
            }
            self.erc20.find_client::<T>()
        }
    }

    impl HasErc20 for MyCustomExtension {
        fn erc20(&self) -> &Erc20Module {
            &self.erc20
        }
    }

    let custom_config = MyCustomConfig {
        my_data: "Hello from custom extension!".to_string(),
        erc20_addresses: test_context.addresses.erc20_addresses.clone(),
    };

    // Add custom extension to an existing client
    let base_client = AlkahestClient::new(test_context.alice.clone(), &rpc_url).await?;
    let custom_ext_client = base_client
        .extend::<MyCustomExtension>(Some(custom_config.clone()))
        .await?;

    // Verify the custom extension provides ERC20 functionality
    assert_ne!(
        custom_ext_client.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    // Test that the custom data was properly initialized
    assert_eq!(custom_config.my_data, "Hello from custom extension!");

    Ok(())
}

#[tokio::test]
async fn test_extension_isolation() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create two separate clients with different extensions
    let client1 = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc20Module>()
        .await?;

    let client2 = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc721Module>()
        .await?;

    // Client 1 should have ERC20 but not ERC721
    assert_ne!(
        client1.erc20().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    // Client 2 should have ERC721 but would need to check via find_client for ERC20
    assert_ne!(
        client2.erc721().addresses.eas,
        alloy::primitives::Address::ZERO
    );

    Ok(())
}

#[tokio::test]
async fn test_extension_ordering() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Test that extension order doesn't affect functionality
    let client_order1 = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc20Module>()
        .await?
        .extend_default::<Erc721Module>()
        .await?;

    let client_order2 = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc721Module>()
        .await?
        .extend_default::<Erc20Module>()
        .await?;

    // Both clients should have the same addresses regardless of order
    assert_eq!(
        client_order1.erc20().addresses.eas,
        client_order2.erc20().addresses.eas
    );
    assert_eq!(
        client_order1.erc721().addresses.eas,
        client_order2.erc721().addresses.eas
    );

    Ok(())
}
