use alkahest_rs::{
    AlkahestClient,
    clients::erc20::{Erc20Addresses, Erc20Module},
    extensions::{AlkahestExtension, HasErc20},
    utils::setup_test_environment,
};
use alloy::{primitives::address, signers::local::PrivateKeySigner};
use eyre::Result;
use serial_test::serial;

/// Custom extension for testing
#[derive(Clone)]
pub struct CustomTrackerExtension {
    pub name: String,
    pub counter: u64,
    pub metadata: Option<String>,
}

#[derive(Clone)]
pub struct CustomTrackerConfig {
    pub name: String,
    pub initial_counter: u64,
    pub metadata: Option<String>,
}

impl Default for CustomTrackerConfig {
    fn default() -> Self {
        CustomTrackerConfig {
            name: "default_tracker".to_string(),
            initial_counter: 0,
            metadata: None,
        }
    }
}

impl CustomTrackerExtension {
    pub fn new(config: Option<CustomTrackerConfig>) -> Self {
        let config = config.unwrap_or_default();

        Self {
            name: config.name,
            counter: config.initial_counter,
            metadata: config.metadata,
        }
    }

    pub fn increment(&mut self) {
        self.counter += 1;
    }

    pub fn get_counter(&self) -> u64 {
        self.counter
    }

    pub fn set_metadata(&mut self, metadata: String) {
        self.metadata = Some(metadata);
    }
}

impl AlkahestExtension for CustomTrackerExtension {
    type Config = CustomTrackerConfig;

    async fn init(
        _private_key: PrivateKeySigner,
        _providers: alkahest_rs::types::ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Ok(CustomTrackerExtension::new(config))
    }
}

/// Test using custom tracker extension with mutating operations
#[tokio::test]
#[serial]
async fn test_custom_tracker_extension() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create custom tracker config with initial values
    let custom_config = CustomTrackerConfig {
        name: "mutation_tracker".to_string(),
        initial_counter: 10,
        metadata: None,
    };

    // Start with a minimal client (no extensions)
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url).await?;

    // Add custom tracker extension with custom config
    let client_with_tracker = client
        .extend::<CustomTrackerExtension>(Some(custom_config.clone()))
        .await?;

    // Access the tracker through find_client
    let tracker = client_with_tracker
        .extensions
        .find_client::<CustomTrackerExtension>()
        .expect("CustomTrackerExtension should be present");

    // Test initial state
    assert_eq!(tracker.get_counter(), 10);
    assert_eq!(tracker.name, "mutation_tracker");
    assert_eq!(tracker.metadata, None);

    Ok(())
}

/// Test using custom tracker extension with default config
#[tokio::test]
#[serial]
async fn test_custom_tracker_with_default() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Start with a minimal client
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url).await?;

    // Add custom tracker extension with default config
    let client_with_tracker = client.extend_default::<CustomTrackerExtension>().await?;

    // Access the tracker through find_client
    let tracker = client_with_tracker
        .extensions
        .find_client::<CustomTrackerExtension>()
        .expect("CustomTrackerExtension should be present");

    // Test default values
    assert_eq!(tracker.get_counter(), 0);
    assert_eq!(tracker.name, "default_tracker");
    assert_eq!(tracker.metadata, None);

    Ok(())
}

/// Test using ERC20 extension with custom addresses
#[tokio::test]
#[serial]
async fn test_client_with_erc20_extension() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create custom ERC20 addresses
    let custom_erc20_addresses = Erc20Addresses {
        eas: address!("0x1234567890123456789012345678901234567890"),
        payment_obligation: address!("0x2345678901234567890123456789012345678901"),
        escrow_obligation: address!("0x3456789012345678901234567890123456789012"),
        barter_utils: address!("0x4567890123456789012345678901234567890123"),
    };

    // Start with a minimal client
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url).await?;

    // Add ERC20 extension with custom addresses
    let client_with_erc20 = client
        .extend::<Erc20Module>(Some(custom_erc20_addresses.clone()))
        .await?;

    // Verify the custom addresses are used
    let erc20_client = client_with_erc20.erc20();
    assert_eq!(erc20_client.addresses.eas, custom_erc20_addresses.eas);
    assert_eq!(
        erc20_client.addresses.payment_obligation,
        custom_erc20_addresses.payment_obligation
    );
    assert_eq!(
        erc20_client.addresses.escrow_obligation,
        custom_erc20_addresses.escrow_obligation
    );
    assert_eq!(
        erc20_client.addresses.barter_utils,
        custom_erc20_addresses.barter_utils
    );

    Ok(())
}

/// Test chaining multiple extensions
#[tokio::test]
#[serial]
async fn test_chaining_multiple_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create custom configurations
    let custom_erc20_addresses = Erc20Addresses {
        eas: address!("0x1234567890123456789012345678901234567890"),
        payment_obligation: address!("0x2345678901234567890123456789012345678901"),
        escrow_obligation: address!("0x3456789012345678901234567890123456789012"),
        barter_utils: address!("0x4567890123456789012345678901234567890123"),
    };

    let custom_tracker_config = CustomTrackerConfig {
        name: "chained_tracker".to_string(),
        initial_counter: 42,
        metadata: Some("test metadata".to_string()),
    };

    // Start with a minimal client and chain extensions
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend::<Erc20Module>(Some(custom_erc20_addresses.clone()))
        .await?
        .extend::<CustomTrackerExtension>(Some(custom_tracker_config.clone()))
        .await?;

    // Verify both extensions are present and accessible
    let erc20_client = client.erc20();
    assert_eq!(erc20_client.addresses.eas, custom_erc20_addresses.eas);

    let tracker = client
        .extensions
        .find_client::<CustomTrackerExtension>()
        .expect("CustomTrackerExtension should be present");
    assert_eq!(tracker.name, "chained_tracker");
    assert_eq!(tracker.counter, 42);
    assert_eq!(tracker.metadata, Some("test metadata".to_string()));

    Ok(())
}

/// Test mixing custom config and default config
#[tokio::test]
#[serial]
async fn test_mixed_config_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Start with a minimal client and add extensions with mixed configs
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc20Module>() // Use default ERC20 config
        .await?
        .extend::<CustomTrackerExtension>(Some(CustomTrackerConfig {
            name: "mixed_config_tracker".to_string(),
            initial_counter: 100,
            metadata: Some("mixed".to_string()),
        })) // Use custom tracker config
        .await?;

    // Verify ERC20 has default addresses (from BASE_SEPOLIA_ADDRESSES)
    let erc20_client = client.erc20();
    assert_ne!(
        erc20_client.addresses.eas,
        address!("0x0000000000000000000000000000000000000000")
    );

    // Verify tracker has custom config
    let tracker = client
        .extensions
        .find_client::<CustomTrackerExtension>()
        .expect("CustomTrackerExtension should be present");
    assert_eq!(tracker.name, "mixed_config_tracker");
    assert_eq!(tracker.counter, 100);

    Ok(())
}

/// Test that find_client returns None for non-existent extensions
#[tokio::test]
#[serial]
async fn test_find_client_not_found() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create a client with only ERC20 extension
    let client = AlkahestClient::new(test_context.alice.clone(), &rpc_url)
        .await?
        .extend_default::<Erc20Module>()
        .await?;

    // Try to find a non-existent extension
    let tracker = client.extensions.find_client::<CustomTrackerExtension>();
    assert!(
        tracker.is_none(),
        "find_client should return None for non-existent extensions"
    );

    // But ERC20 should be found
    let erc20 = client.extensions.find_client::<Erc20Module>();
    assert!(
        erc20.is_some(),
        "find_client should return Some for existing extensions"
    );

    Ok(())
}

/// Test using with_base_extensions for convenience
#[tokio::test]
#[serial]
async fn test_with_base_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;

    // Get the RPC URL from the anvil instance
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create a client with all base extensions
    let client = AlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Verify we can access the ERC20 module (part of base extensions)
    let erc20_client = client.erc20();
    assert_eq!(
        erc20_client.addresses.eas,
        test_context.addresses.erc20_addresses.eas
    );

    Ok(())
}
