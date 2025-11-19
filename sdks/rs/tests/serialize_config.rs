use alkahest_rs::{
    DefaultExtensionConfig,
    addresses::{BASE_SEPOLIA_ADDRESSES, FILECOIN_CALIBRATION_ADDRESSES},
};
use serde_json;
use std::fs;
use tempfile::tempdir;

#[test]
fn test_default_config_creation() {
    // Create a default config (uses Base Sepolia addresses)
    let default_config = DefaultExtensionConfig::default();

    // Verify it uses Base Sepolia addresses
    assert_eq!(
        default_config.arbiters_addresses.eas,
        BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas
    );
    assert_eq!(
        default_config.erc20_addresses.barter_utils,
        BASE_SEPOLIA_ADDRESSES.erc20_addresses.barter_utils
    );
}

#[test]
fn test_config_serialization_to_json() -> Result<(), Box<dyn std::error::Error>> {
    let default_config = DefaultExtensionConfig::default();

    // Serialize to JSON string
    let json_string = serde_json::to_string_pretty(&default_config)?;

    // Verify JSON string is not empty and contains expected fields
    assert!(!json_string.is_empty());
    assert!(json_string.contains("arbiters_addresses"));
    assert!(json_string.contains("erc20_addresses"));
    assert!(json_string.contains("erc721_addresses"));
    assert!(json_string.contains("erc1155_addresses"));
    assert!(json_string.contains("token_bundle_addresses"));
    assert!(json_string.contains("attestation_addresses"));
    assert!(json_string.contains("string_obligation_addresses"));

    Ok(())
}

#[test]
fn test_config_file_persistence() -> Result<(), Box<dyn std::error::Error>> {
    let default_config = DefaultExtensionConfig::default();

    // Create a temporary directory for test files
    let temp_dir = tempdir()?;
    let file_path = temp_dir.path().join("test_config.json");

    // Serialize and save to file
    let json_string = serde_json::to_string_pretty(&default_config)?;
    fs::write(&file_path, &json_string)?;

    // Verify file was created
    assert!(file_path.exists());

    // Load from file
    let loaded_json = fs::read_to_string(&file_path)?;
    let loaded_config: DefaultExtensionConfig = serde_json::from_str(&loaded_json)?;

    // Verify loaded config matches original
    assert_eq!(
        loaded_config.arbiters_addresses.eas,
        default_config.arbiters_addresses.eas
    );
    assert_eq!(
        loaded_config.erc20_addresses.barter_utils,
        default_config.erc20_addresses.barter_utils
    );
    assert_eq!(
        loaded_config.erc721_addresses.eas,
        default_config.erc721_addresses.eas
    );

    Ok(())
}

#[test]
fn test_custom_config_with_mixed_networks() -> Result<(), Box<dyn std::error::Error>> {
    // Create a custom config mixing different network addresses
    let custom_config = DefaultExtensionConfig {
        arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.clone(),
        erc20_addresses: BASE_SEPOLIA_ADDRESSES.erc20_addresses.clone(),
        ..FILECOIN_CALIBRATION_ADDRESSES
    };

    // Verify it uses mixed addresses
    assert_eq!(
        custom_config.arbiters_addresses.eas,
        FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.eas
    );
    assert_eq!(
        custom_config.erc20_addresses.eas,
        BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas
    );

    // Verify they're different (since we're mixing networks)
    assert_ne!(
        custom_config.arbiters_addresses.eas,
        custom_config.erc20_addresses.eas
    );

    // Test serialization of custom config
    let custom_json = serde_json::to_string_pretty(&custom_config)?;
    assert!(!custom_json.is_empty());

    Ok(())
}

#[test]
fn test_round_trip_serialization() -> Result<(), Box<dyn std::error::Error>> {
    let custom_config = DefaultExtensionConfig {
        arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.clone(),
        erc20_addresses: BASE_SEPOLIA_ADDRESSES.erc20_addresses.clone(),
        ..FILECOIN_CALIBRATION_ADDRESSES
    };

    // Serialize to JSON
    let round_trip_json = serde_json::to_string(&custom_config)?;

    // Deserialize back
    let round_trip_config: DefaultExtensionConfig = serde_json::from_str(&round_trip_json)?;

    // Verify all fields are preserved
    assert_eq!(
        round_trip_config.arbiters_addresses.eas,
        custom_config.arbiters_addresses.eas
    );
    assert_eq!(
        round_trip_config.arbiters_addresses.trusted_party_arbiter,
        custom_config.arbiters_addresses.trusted_party_arbiter
    );
    assert_eq!(
        round_trip_config.erc20_addresses.eas,
        custom_config.erc20_addresses.eas
    );
    assert_eq!(
        round_trip_config.erc20_addresses.barter_utils,
        custom_config.erc20_addresses.barter_utils
    );
    assert_eq!(
        round_trip_config.erc721_addresses.eas,
        custom_config.erc721_addresses.eas
    );
    assert_eq!(
        round_trip_config.erc1155_addresses.eas,
        custom_config.erc1155_addresses.eas
    );
    assert_eq!(
        round_trip_config.token_bundle_addresses.eas,
        custom_config.token_bundle_addresses.eas
    );
    assert_eq!(
        round_trip_config.attestation_addresses.eas,
        custom_config.attestation_addresses.eas
    );

    Ok(())
}

#[test]
fn test_multiple_configs_in_same_directory() -> Result<(), Box<dyn std::error::Error>> {
    let temp_dir = tempdir()?;

    // Create and save default config
    let default_config = DefaultExtensionConfig::default();
    let default_path = temp_dir.path().join("default_config.json");
    let default_json = serde_json::to_string_pretty(&default_config)?;
    fs::write(&default_path, &default_json)?;

    // Create and save custom config
    let custom_config = DefaultExtensionConfig {
        arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.clone(),
        ..BASE_SEPOLIA_ADDRESSES
    };
    let custom_path = temp_dir.path().join("custom_config.json");
    let custom_json = serde_json::to_string_pretty(&custom_config)?;
    fs::write(&custom_path, &custom_json)?;

    // Load both configs back
    let loaded_default: DefaultExtensionConfig =
        serde_json::from_str(&fs::read_to_string(&default_path)?)?;
    let loaded_custom: DefaultExtensionConfig =
        serde_json::from_str(&fs::read_to_string(&custom_path)?)?;

    // Verify they're different
    assert_ne!(
        loaded_default.arbiters_addresses.eas,
        loaded_custom.arbiters_addresses.eas
    );

    // Verify each matches what was saved
    assert_eq!(
        loaded_default.arbiters_addresses.eas,
        default_config.arbiters_addresses.eas
    );
    assert_eq!(
        loaded_custom.arbiters_addresses.eas,
        custom_config.arbiters_addresses.eas
    );

    Ok(())
}

#[test]
fn test_config_deserialization_error_handling() {
    // Test invalid JSON
    let invalid_json = "{ invalid json }";
    let result: Result<DefaultExtensionConfig, _> = serde_json::from_str(invalid_json);
    assert!(result.is_err());

    // Test empty JSON
    let empty_json = "{}";
    let result: Result<DefaultExtensionConfig, _> = serde_json::from_str(empty_json);
    // This should fail because required fields are missing
    assert!(result.is_err());

    // Test partial JSON (missing some required fields)
    let partial_json = r#"
    {
        "arbiters_addresses": {
            "eas": "0x4200000000000000000000000000000000000021"
        }
    }
    "#;
    let result: Result<DefaultExtensionConfig, _> = serde_json::from_str(partial_json);
    assert!(result.is_err());
}

#[test]
fn test_config_comparison() {
    let config1 = DefaultExtensionConfig::default();
    let config2 = DefaultExtensionConfig::default();

    // Two default configs should have the same addresses
    assert_eq!(
        config1.arbiters_addresses.eas,
        config2.arbiters_addresses.eas
    );

    let config3 = DefaultExtensionConfig {
        arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.clone(),
        ..BASE_SEPOLIA_ADDRESSES
    };

    // Config with different network should have different addresses
    assert_ne!(
        config1.arbiters_addresses.eas,
        config3.arbiters_addresses.eas
    );
}

#[test]
fn test_base_sepolia_vs_filecoin_addresses() {
    // Verify that Base Sepolia and Filecoin Calibration have different addresses
    assert_ne!(
        BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas,
        FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.eas
    );
    assert_ne!(
        BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas,
        FILECOIN_CALIBRATION_ADDRESSES.erc20_addresses.eas
    );
    assert_ne!(
        BASE_SEPOLIA_ADDRESSES.erc721_addresses.eas,
        FILECOIN_CALIBRATION_ADDRESSES.erc721_addresses.eas
    );
}
