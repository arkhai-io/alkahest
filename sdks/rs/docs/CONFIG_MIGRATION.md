# Configuration Migration Guide

## Overview

The `DefaultExtensionConfig` struct has been refactored to use non-Option fields and implement the `Default` trait, making the API cleaner and more predictable.

## Changes Made

### Before (Option-based fields)
```rust
pub struct DefaultExtensionConfig {
    pub arbiters_addresses: Option<ArbitersAddresses>,
    pub erc20_addresses: Option<Erc20Addresses>,
    pub erc721_addresses: Option<Erc721Addresses>,
    pub erc1155_addresses: Option<Erc1155Addresses>,
    pub token_bundle_addresses: Option<TokenBundleAddresses>,
    pub attestation_addresses: Option<AttestationAddresses>,
    pub string_obligation_addresses: Option<StringObligationAddresses>,
}
```

### After (Non-Option fields with Default)
```rust
#[derive(Debug, Clone)]
pub struct DefaultExtensionConfig {
    pub arbiters_addresses: ArbitersAddresses,
    pub erc20_addresses: Erc20Addresses,
    pub erc721_addresses: Erc721Addresses,
    pub erc1155_addresses: Erc1155Addresses,
    pub token_bundle_addresses: TokenBundleAddresses,
    pub attestation_addresses: AttestationAddresses,
    pub string_obligation_addresses: StringObligationAddresses,
}

impl Default for DefaultExtensionConfig {
    fn default() -> Self {
        // Returns Base Sepolia addresses
        crate::addresses::BASE_SEPOLIA_ADDRESSES
    }
}
```

## Migration Guide

### 1. Creating a client with default configuration

**Before:**
```rust
// Fields would be None, then unwrapped to Base Sepolia internally
let config = DefaultExtensionConfig {
    arbiters_addresses: None,
    erc20_addresses: None,
    // ... all fields None
};
let client = AlkahestClient::new(private_key, rpc_url, Some(config)).await?;
```

**After:**
```rust
// Option 1: Pass None to use defaults
let client: DefaultAlkahestClient =
    AlkahestClient::new(private_key, rpc_url, None).await?;

// Option 2: Use Default::default()
let client: DefaultAlkahestClient =
    AlkahestClient::new(private_key, rpc_url, Some(DefaultExtensionConfig::default())).await?;
```

### 2. Using a predefined network configuration

**Before:**
```rust
let config = DefaultExtensionConfig {
    arbiters_addresses: Some(BASE_SEPOLIA_ADDRESSES.arbiters_addresses.unwrap()),
    erc20_addresses: Some(BASE_SEPOLIA_ADDRESSES.erc20_addresses.unwrap()),
    // ... needed to handle Option and unwrap
};
```

**After:**
```rust
// Direct usage - much cleaner!
let client: DefaultAlkahestClient =
    AlkahestClient::new(private_key, rpc_url, Some(BASE_SEPOLIA_ADDRESSES)).await?;

// Or for Filecoin
let client: DefaultAlkahestClient =
    AlkahestClient::new(private_key, rpc_url, Some(FILECOIN_CALIBRATION_ADDRESSES)).await?;
```

### 3. Creating a custom configuration

**Before:**
```rust
let config = DefaultExtensionConfig {
    arbiters_addresses: Some(my_custom_arbiters),
    erc20_addresses: Some(my_custom_erc20),
    // Other fields might be None or Some(...)
    erc721_addresses: None,  // Would fall back to Base Sepolia
    // ...
};
```

**After:**
```rust
// Use struct update syntax for partial customization
let config = DefaultExtensionConfig {
    arbiters_addresses: my_custom_arbiters,
    erc20_addresses: my_custom_erc20,
    // Use defaults for other fields
    ..BASE_SEPOLIA_ADDRESSES  // or ..DefaultExtensionConfig::default()
};

let client: DefaultAlkahestClient =
    AlkahestClient::new(private_key, rpc_url, Some(config)).await?;
```

### 4. Accessing addresses in client code

**Before:**
```rust
// In client implementations
impl Default for ArbitersAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.arbiters_addresses.unwrap()  // Could panic!
    }
}

// In usage
let addresses = config.arbiters_addresses.unwrap_or_default();
```

**After:**
```rust
// In client implementations
impl Default for ArbitersAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.arbiters_addresses  // No unwrap needed
    }
}

// In usage
let addresses = config.arbiters_addresses;  // Direct access
```

## Test Code Updates

If you have tests that create configurations, update them as follows:

**Before:**
```rust
let addresses = DefaultExtensionConfig {
    arbiters_addresses: Some(ArbitersAddresses {
        eas: eas_address,
        // ...
    }),
    erc20_addresses: Some(Erc20Addresses {
        // ...
    }),
    // ...
};
```

**After:**
```rust
let addresses = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: eas_address,
        // ...
    },
    erc20_addresses: Erc20Addresses {
        // ...
    },
    // ...
};
```

## Benefits of the New Approach

1. **Type Safety**: All address fields are guaranteed to be present at compile time
2. **Cleaner API**: No need to handle `Option` types or call `.unwrap()`
3. **Better Defaults**: Clear and explicit default behavior (Base Sepolia)
4. **Reduced Boilerplate**: Less code needed to work with configurations
5. **No Runtime Panics**: Removed `.unwrap()` calls that could potentially panic

## Complete Example

```rust
use alkahest_rs::{
    AlkahestClient, DefaultAlkahestClient, DefaultExtensionConfig,
    addresses::{BASE_SEPOLIA_ADDRESSES, FILECOIN_CALIBRATION_ADDRESSES},
};
use alloy::signers::local::PrivateKeySigner;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    let private_key = PrivateKeySigner::random();

    // Example 1: Use default (Base Sepolia)
    let client1: DefaultAlkahestClient =
        AlkahestClient::new(private_key.clone(), "https://sepolia.base.org", None).await?;

    // Example 2: Use Filecoin Calibration
    let client2: DefaultAlkahestClient = AlkahestClient::new(
        private_key.clone(),
        "https://api.calibration.node.glif.io/rpc/v1",
        Some(FILECOIN_CALIBRATION_ADDRESSES),
    ).await?;

    // Example 3: Custom configuration with some Filecoin addresses
    let custom_config = DefaultExtensionConfig {
        arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses,
        erc20_addresses: FILECOIN_CALIBRATION_ADDRESSES.erc20_addresses,
        // Use Base Sepolia for the rest
        ..BASE_SEPOLIA_ADDRESSES
    };

    let client3: DefaultAlkahestClient = AlkahestClient::new(
        private_key,
        "https://sepolia.base.org",
        Some(custom_config),
    ).await?;

    Ok(())
}
```

## Backward Compatibility

While the internal structure has changed, the public API remains largely compatible:
- Passing `None` to `AlkahestClient::new()` still works and uses Base Sepolia defaults
- Existing network constants (`BASE_SEPOLIA_ADDRESSES`, `FILECOIN_CALIBRATION_ADDRESSES`) still work
- The main difference is that configuration fields are no longer wrapped in `Option`

## Questions or Issues?

If you encounter any issues during migration or have questions about the new configuration system, please open an issue on the GitHub repository.
