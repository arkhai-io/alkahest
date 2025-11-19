# Alkahest Extension System

## Overview

The Alkahest SDK uses a modular extension system that allows you to include only the functionality you need. Each extension module (ERC20, ERC721, Attestation, etc.) is independent and has its own configuration type, making the system flexible and type-safe.

## Key Concepts

### Extensions

Extensions are modules that add functionality to the `AlkahestClient`. Each extension:

- Has its own configuration type (`Config` associated type)
- Can be used independently or combined with other extensions
- Implements the `AlkahestExtension` trait

### Extension Trait

```rust
pub trait AlkahestExtension: Clone + Send + Sync + 'static {
    /// The configuration type for this extension
    type Config: Clone + Send + Sync + 'static;

    /// Initialize the extension with its specific configuration
    fn init(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
        config: Option<Self::Config>,
    ) -> impl std::future::Future<Output = eyre::Result<Self>> + Send;

    /// Find a client by type (for nested modules)
    fn find_client<T: Clone + Send + Sync + 'static>(&self) -> Option<&T>;
}
```

## Available Modules

| Module                   | Configuration Type          | Description                    |
| ------------------------ | --------------------------- | ------------------------------ |
| `Erc20Module`            | `Erc20Addresses`            | ERC20 token operations         |
| `Erc721Module`           | `Erc721Addresses`           | ERC721 NFT operations          |
| `Erc1155Module`          | `Erc1155Addresses`          | ERC1155 multi-token operations |
| `TokenBundleModule`      | `TokenBundleAddresses`      | Bundle multiple token types    |
| `AttestationModule`      | `AttestationAddresses`      | EAS attestation operations     |
| `StringObligationModule` | `StringObligationAddresses` | String-based obligations       |
| `ArbitersModule`         | `ArbitersAddresses`         | Arbiter contract interactions  |
| `OracleModule`           | `OracleAddresses`           | Oracle functionality           |

## Usage Patterns

### 1. Minimal Client (No Extensions)

```rust
use alkahest_rs::AlkahestClient;

let client = AlkahestClient::new(
    private_key,
    rpc_url
).await?;
```

### 2. Adding Extensions via Chaining

```rust
use alkahest_rs::{AlkahestClient, clients::erc20::{Erc20Module, Erc20Addresses}};

// Start with minimal client and add extensions
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension::<Erc20Module>(Some(erc20_addresses))
    .await?;

// Or use default configuration when available
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension_default::<Erc20Module>()
    .await?;
```

### 3. Combining Multiple Modules

```rust
use alkahest_rs::{
    AlkahestClient,
    clients::{
        erc20::{Erc20Module, Erc20Addresses},
        erc721::{Erc721Module, Erc721Addresses},
    }
};

// Chain multiple extensions
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension::<Erc20Module>(Some(erc20_addresses))
    .await?
    .with_extension::<Erc721Module>(Some(erc721_addresses))
    .await?;

// Access modules through trait methods
client.erc20().transfer(...).await?;
client.erc721().mint(...).await?;
```

### 4. All Base Extensions

For convenience, you can use `with_base_extensions` which includes all standard modules:

```rust
use alkahest_rs::{AlkahestClient, DefaultExtensionConfig};

// Using default configuration (Base Sepolia)
let client = AlkahestClient::with_base_extensions(
    private_key,
    rpc_url,
    None
).await?;

// Using custom configuration
let config = DefaultExtensionConfig {
    erc20_addresses: custom_erc20,
    erc721_addresses: custom_erc721,
    // ... other configurations
};
let client = AlkahestClient::with_base_extensions(
    private_key,
    rpc_url,
    Some(config)
).await?;
```

### 5. Chaining Extensions with Mixed Configurations

You can mix custom configurations and defaults:

```rust
use alkahest_rs::AlkahestClient;
use alkahest_rs::clients::{erc20::Erc20Module, erc721::Erc721Module};

// Mix custom and default configurations
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension::<Erc20Module>(Some(custom_erc20_addresses))
    .await?
    .with_extension_default::<Erc721Module>()  // Uses default addresses
    .await?;
```

## Creating Custom Extensions

You can create your own extensions by implementing the `AlkahestExtension` trait:

```rust
use alkahest_rs::extensions::AlkahestExtension;

#[derive(Clone)]
struct MyExtension {
    // Your fields
    data: String,
}

#[derive(Clone)]
struct MyConfig {
    // Your configuration
    data: String,
}

impl AlkahestExtension for MyExtension {
    type Config = MyConfig;

    async fn init(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        let config = config.unwrap_or_else(|| MyConfig {
            data: "default".to_string(),
        });

        Ok(MyExtension {
            data: config.data,
        })
    }
}

// Add your custom extension to a client
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension::<MyExtension>(Some(MyConfig {
        data: "custom".to_string()
    }))
    .await?;
```

## Combining Custom Extensions with Standard Modules

```rust
// Chain your custom extension with standard modules
let client = AlkahestClient::new(private_key, rpc_url)
    .await?
    .with_extension::<MyExtension>(Some(MyConfig {
        data: "custom".to_string()
    }))
    .await?
    .with_extension::<Erc20Module>(Some(erc20_addresses))
    .await?;
```

## Dynamic Extension Loading

Extensions are always loaded dynamically via chaining:

```rust
// Start with a minimal client
let client = AlkahestClient::new(private_key, rpc_url).await?;

// Conditionally add extensions based on runtime logic
let client = if needs_erc20 {
    client.with_extension::<Erc20Module>(Some(erc20_addresses)).await?
} else {
    client
};

// Continue chaining as needed
let client = client
    .with_extension::<Erc721Module>(Some(erc721_addresses))
    .await?;
```

## Migration from Previous Version

If you were using the old extension system with `DefaultExtensionConfig` everywhere:

### Before

```rust
impl AlkahestExtension for MyModule {
    async fn init(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
        config: Option<DefaultExtensionConfig>,
    ) -> eyre::Result<Self> {
        // Extract your config from DefaultExtensionConfig
        let my_config = config.map(|c| c.my_addresses);
        Self::new(private_key, rpc_url, my_config).await
    }
}
```

### After

```rust
impl AlkahestExtension for MyModule {
    type Config = MyAddresses;  // Your specific config type

    async fn init(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        // Use config directly
        Self::new(private_key, rpc_url, config).await
    }
}
```

## Type Aliases for Convenience

The SDK provides helpful type aliases:

```rust
// Default client with all base extensions
pub type DefaultAlkahestClient = AlkahestClient<BaseExtensions>;

// Use it directly with the convenience method
let client: DefaultAlkahestClient = AlkahestClient::with_base_extensions(
    private_key,
    rpc_url,
    Some(BASE_SEPOLIA_ADDRESSES)
).await?;
```

## Best Practices

1. **Start minimal, add as needed**: Begin with `AlkahestClient::new()` and chain only the extensions you need.

2. **Use `with_extension_default()` when possible**: If an extension's configuration implements `Default`, use the simpler method.

3. **Leverage type safety**: Each module has its own configuration type, preventing configuration mismatches at compile time.

4. **Create custom extensions for domain logic**: Encapsulate your application-specific logic in custom extensions that can be chained with standard modules.

5. **Use `with_base_extensions()` for the common case**: When you need all standard modules, use this convenience method instead of chaining them individually.

## Network-Specific Configurations

The SDK provides pre-configured addresses for different networks:

```rust
use alkahest_rs::addresses::{BASE_SEPOLIA_ADDRESSES, FILECOIN_CALIBRATION_ADDRESSES};

// Base Sepolia
let client = AlkahestClient::with_base_extensions(
    private_key,
    rpc_url,
    Some(BASE_SEPOLIA_ADDRESSES)
).await?;

// Filecoin Calibration
let client = AlkahestClient::with_base_extensions(
    private_key,
    filecoin_rpc_url,
    Some(FILECOIN_CALIBRATION_ADDRESSES)
).await?;
```

## Trait-Based Access

Extensions can be accessed through traits for better abstraction:

```rust
use alkahest_rs::extensions::{HasErc20, HasErc721};

fn process_tokens<T>(client: &AlkahestClient<T>)
where
    T: AlkahestExtension + HasErc20 + HasErc721
{
    let erc20 = client.erc20();
    let erc721 = client.erc721();
    // Use the modules...
}
```

This approach allows writing generic functions that work with any client that has the required modules.
