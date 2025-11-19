//! Tests for the contract address API
//!
//! This tests how to access contract addresses through the Has* traits,
//! which are only available when the corresponding modules are loaded.

use alkahest_rs::{
    ArbitersContract, AttestationContract, ContractModule, DefaultAlkahestClient, Erc20Contract,
    Erc721Contract,
    extensions::{HasArbiters, HasAttestation, HasErc20, HasErc721},
    utils::setup_test_environment,
};
use eyre::Result;

#[tokio::test]
async fn test_address_api_with_base_extensions() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create a client with the default extensions (BaseExtensions)
    // This includes all standard modules
    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // The address methods are now available through the Has* traits
    // These traits are automatically implemented for clients that have the corresponding modules

    // Access ERC20 contract addresses
    let erc20_escrow = client.erc20().address(Erc20Contract::EscrowObligation);
    let erc20_payment = client.erc20().address(Erc20Contract::PaymentObligation);
    let erc20_barter = client.erc20().address(Erc20Contract::BarterUtils);

    // Verify addresses are not zero
    assert_ne!(erc20_escrow, alloy::primitives::Address::ZERO);
    assert_ne!(erc20_payment, alloy::primitives::Address::ZERO);
    assert_ne!(erc20_barter, alloy::primitives::Address::ZERO);

    // Access ERC721 contract addresses
    let erc721_escrow = client.erc721().address(Erc721Contract::EscrowObligation);
    let erc721_eas = client.erc721().address(Erc721Contract::Eas);

    assert_ne!(erc721_escrow, alloy::primitives::Address::ZERO);
    assert_ne!(erc721_eas, alloy::primitives::Address::ZERO);

    // Access Attestation contract addresses
    let attestation_eas = client.attestation().address(AttestationContract::Eas);
    let attestation_registry = client
        .attestation()
        .address(AttestationContract::EasSchemaRegistry);

    assert_ne!(attestation_eas, alloy::primitives::Address::ZERO);
    assert_ne!(attestation_registry, alloy::primitives::Address::ZERO);

    // Access Arbiter contract addresses
    let trusted_party = client
        .arbiters()
        .address(ArbitersContract::TrustedPartyArbiter);
    let trivial = client.arbiters().address(ArbitersContract::TrivialArbiter);

    assert_ne!(trusted_party, alloy::primitives::Address::ZERO);
    assert_ne!(trivial, alloy::primitives::Address::ZERO);

    // Alternative: You can also access the module directly and get addresses from there
    let erc20_module = client.erc20();
    let direct_escrow = erc20_module.addresses.escrow_obligation;

    // This should be the same as using the address method
    assert_eq!(erc20_escrow, direct_escrow);

    // All these methods use the ContractModule trait under the hood
    let via_trait = erc20_module.address(Erc20Contract::EscrowObligation);
    assert_eq!(erc20_escrow, via_trait);

    Ok(())
}

#[tokio::test]
async fn test_address_api_different_contract_types() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    let client = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Test that different contract types have different addresses
    let erc20_escrow = client.erc20().address(Erc20Contract::EscrowObligation);
    let erc721_escrow = client.erc721().address(Erc721Contract::EscrowObligation);

    // These should be different contracts even though they have similar names
    assert_ne!(erc20_escrow, erc721_escrow);

    // Test that the same contract accessed different ways returns the same address
    let arbiter_via_module = client.arbiters().address(ArbitersContract::TrivialArbiter);
    let arbiter_direct = client.arbiters().addresses.trivial_arbiter;
    assert_eq!(arbiter_via_module, arbiter_direct);

    Ok(())
}

#[tokio::test]
async fn test_address_api_consistency() -> Result<()> {
    let test_context = setup_test_environment().await?;
    let rpc_url = test_context.anvil.ws_endpoint();

    // Create two clients with the same configuration
    let client1 = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    let client2 = DefaultAlkahestClient::with_base_extensions(
        test_context.alice.clone(),
        &rpc_url,
        Some(test_context.addresses.clone()),
    )
    .await?;

    // Verify that both clients return the same addresses
    assert_eq!(
        client1.erc20().address(Erc20Contract::EscrowObligation),
        client2.erc20().address(Erc20Contract::EscrowObligation)
    );

    assert_eq!(
        client1
            .arbiters()
            .address(ArbitersContract::TrustedPartyArbiter),
        client2
            .arbiters()
            .address(ArbitersContract::TrustedPartyArbiter)
    );

    Ok(())
}
