//! Tests for the contract address API
//!
//! These tests demonstrate how to use the structured approach to accessing
//! contract addresses in the Alkahest SDK.

use alkahest_rs::{
    ArbitersContract, ContractModule as _, DefaultAlkahestClient, Erc20Contract, Erc721Contract,
    contracts,
    extensions::{HasArbiters, HasErc20},
    utils::setup_test_environment,
};
use eyre::Result;

#[tokio::test]
async fn test_type_safe_address_getters() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create client with test environment configuration
    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Get ERC20 contract addresses
    let erc20_escrow = client.erc20_address(Erc20Contract::EscrowObligation);
    let erc20_payment = client.erc20_address(Erc20Contract::PaymentObligation);
    let erc20_barter = client.erc20_address(Erc20Contract::BarterUtils);

    // Verify addresses are not zero
    assert_ne!(erc20_escrow, alloy::primitives::Address::ZERO);
    assert_ne!(erc20_payment, alloy::primitives::Address::ZERO);
    assert_ne!(erc20_barter, alloy::primitives::Address::ZERO);

    // Get ERC721 contract addresses
    let erc721_escrow = client.erc721_address(Erc721Contract::EscrowObligation);
    assert_ne!(erc721_escrow, alloy::primitives::Address::ZERO);

    // Get Arbiter contract addresses
    let trusted_party = client.arbiters_address(ArbitersContract::TrustedPartyArbiter);
    let trivial = client.arbiters_address(ArbitersContract::TrivialArbiter);

    assert_ne!(trusted_party, alloy::primitives::Address::ZERO);
    assert_ne!(trivial, alloy::primitives::Address::ZERO);

    Ok(())
}

#[tokio::test]
async fn test_enum_imports_for_cleaner_code() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Import enum variants for cleaner code
    use Erc20Contract::*;

    let addresses = vec![
        client.erc20_address(Eas),
        client.erc20_address(BarterUtils),
        client.erc20_address(EscrowObligation),
        client.erc20_address(PaymentObligation),
    ];

    // Verify all addresses are unique and non-zero
    for addr in &addresses {
        assert_ne!(*addr, alloy::primitives::Address::ZERO);
    }

    // Verify addresses are unique
    for i in 0..addresses.len() {
        for j in (i + 1)..addresses.len() {
            assert_ne!(addresses[i], addresses[j], "Addresses should be unique");
        }
    }

    Ok(())
}

#[tokio::test]
async fn test_direct_access_compatibility() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Get address using the new API
    let erc20_escrow_via_method = client.erc20_address(Erc20Contract::EscrowObligation);

    // Direct access (old way, still supported)
    let erc20_client = client.erc20();
    let erc20_escrow_direct = erc20_client.addresses.escrow_obligation;

    // Both methods should give the same address
    assert_eq!(erc20_escrow_via_method, erc20_escrow_direct);

    // Similarly for other modules
    let arbiter_via_method = client.arbiters_address(ArbitersContract::TrivialArbiter);
    let arbiter_direct = client.arbiters().addresses.trivial_arbiter;
    assert_eq!(arbiter_via_method, arbiter_direct);

    Ok(())
}

#[tokio::test]
async fn test_contract_instance_creation() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Get an address using the new API
    let escrow_addr = client.erc20_address(Erc20Contract::EscrowObligation);

    // Create a contract instance for direct interaction
    let escrow_contract =
        contracts::ERC20EscrowObligation::new(escrow_addr, client.wallet_provider.clone());

    // Verify the contract instance has the correct address
    assert_eq!(*escrow_contract.address(), escrow_addr);

    // Similarly for other contract types
    let barter_addr = client.erc721_address(Erc721Contract::BarterUtils);
    let barter_contract =
        contracts::ERC721BarterUtils::new(barter_addr, client.wallet_provider.clone());

    assert_eq!(*barter_contract.address(), barter_addr);

    Ok(())
}

#[tokio::test]
async fn test_custom_network_configuration() -> Result<()> {
    use alkahest_rs::addresses::{BASE_SEPOLIA_ADDRESSES, FILECOIN_CALIBRATION_ADDRESSES};

    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create client with Base Sepolia addresses
    let base_client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(BASE_SEPOLIA_ADDRESSES),
    )
    .await?;

    // Create client with Filecoin Calibration addresses
    let filecoin_client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(FILECOIN_CALIBRATION_ADDRESSES),
    )
    .await?;

    // Get the same contract from both clients
    let base_escrow = base_client.erc20_address(Erc20Contract::EscrowObligation);
    let filecoin_escrow = filecoin_client.erc20_address(Erc20Contract::EscrowObligation);

    // Addresses should be different between networks
    assert_ne!(base_escrow, filecoin_escrow);

    // Verify each client uses its respective network addresses
    assert_eq!(
        base_escrow,
        BASE_SEPOLIA_ADDRESSES.erc20_addresses.escrow_obligation
    );
    assert_eq!(
        filecoin_escrow,
        FILECOIN_CALIBRATION_ADDRESSES
            .erc20_addresses
            .escrow_obligation
    );

    Ok(())
}

#[tokio::test]
async fn test_address_consistency_across_access_methods() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Test that all three ways of accessing addresses give the same result
    let erc20_module = client.erc20();

    // Method 1: Using the type-safe getter
    let addr1 = client.erc20_address(Erc20Contract::BarterUtils);

    // Method 2: Using the module's address method
    let addr2 = erc20_module.address(Erc20Contract::BarterUtils);

    // Method 3: Direct field access
    let addr3 = erc20_module.addresses.barter_utils;

    // All three should be identical
    assert_eq!(addr1, addr2);
    assert_eq!(addr2, addr3);

    Ok(())
}

#[tokio::test]
async fn test_different_contract_types_have_different_addresses() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Get addresses for different contract types
    let erc20_escrow = client.erc20_address(Erc20Contract::EscrowObligation);
    let erc721_escrow = client.erc721_address(Erc721Contract::EscrowObligation);

    // Even though they have similar names, they should be different contracts
    assert_ne!(erc20_escrow, erc721_escrow);

    // For EAS contracts, they should be the same since there's only one EAS contract
    // that handles all attestations
    let erc20_eas = client.erc20_address(Erc20Contract::Eas);
    let erc721_eas = client.erc721_address(Erc721Contract::Eas);

    assert_eq!(
        erc20_eas, erc721_eas,
        "EAS contract should be the same for all modules"
    );

    Ok(())
}
