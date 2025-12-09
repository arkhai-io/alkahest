//! Token Bundle obligations module
//!
//! This module provides functionality for token bundle operations including:
//! - Escrow obligations (tierable and non-tierable)
//! - Payment obligations
//! - Barter utilities for cross-token trading
//! - Utility functions for approvals

pub mod barter_utils;
pub mod escrow;
pub mod payment;
pub mod util;

use alloy::primitives::Address;
use alloy::signers::local::PrivateKeySigner;
use serde::{Deserialize, Serialize};

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::extensions::{AlkahestExtension, ContractModule};
use crate::types::{ApprovalPurpose, ProviderContext, SharedWalletProvider, TokenBundleData};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenBundleAddresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
}

impl Default for TokenBundleAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.token_bundle_addresses
    }
}

/// Available contracts in the TokenBundle module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TokenBundleContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Barter utilities contract for token bundles
    BarterUtils,
    /// Escrow obligation contract for token bundles
    EscrowObligation,
    /// Payment obligation contract for token bundles
    PaymentObligation,
}

/// Client for interacting with token bundle trading and escrow functionality.
///
/// This client provides methods for:
/// - Trading token bundles for other token bundles
/// - Creating escrow arrangements with custom demands
/// - Managing token bundle payments
/// - Collecting payments from fulfilled trades
#[derive(Clone)]
pub struct TokenBundleModule {
    pub(crate) signer: PrivateKeySigner,
    pub(crate) wallet_provider: SharedWalletProvider,
    pub addresses: TokenBundleAddresses,
}

impl ContractModule for TokenBundleModule {
    type Contract = TokenBundleContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            TokenBundleContract::Eas => self.addresses.eas,
            TokenBundleContract::BarterUtils => self.addresses.barter_utils,
            TokenBundleContract::EscrowObligation => self.addresses.escrow_obligation,
            TokenBundleContract::PaymentObligation => self.addresses.payment_obligation,
        }
    }
}

impl TokenBundleModule {
    /// Creates a new TokenBundleModule instance.
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: SharedWalletProvider,
        addresses: Option<TokenBundleAddresses>,
    ) -> eyre::Result<Self> {
        Ok(TokenBundleModule {
            signer,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Access escrow API
    ///
    /// # Example
    /// ```rust,ignore
    /// // Non-tierable escrow (1:1 escrow:fulfillment)
    /// client.token_bundle().escrow().non_tierable().create(&price, &item, expiration).await?;
    ///
    /// // Tierable escrow (1:many escrow:fulfillment)
    /// client.token_bundle().escrow().tierable().create(&price, &item, expiration).await?;
    /// ```
    pub fn escrow(&self) -> escrow::Escrow<'_> {
        escrow::Escrow::new(self)
    }

    /// Access payment API
    ///
    /// # Example
    /// ```rust,ignore
    /// client.token_bundle().payment().pay(&price, payee).await?;
    /// ```
    pub fn payment(&self) -> payment::Payment<'_> {
        payment::Payment::new(self)
    }

    /// Access barter utilities API
    ///
    /// # Example
    /// ```rust,ignore
    /// client.token_bundle().barter().buy_bundle_for_bundle(&bid, &ask, expiration).await?;
    /// client.token_bundle().barter().pay_bundle_for_bundle(buy_attestation).await?;
    /// ```
    pub fn barter(&self) -> barter_utils::BarterUtils<'_> {
        barter_utils::BarterUtils::new(self)
    }

    /// Approves all tokens in a bundle for trading.
    pub async fn approve(
        &self,
        bundle: &TokenBundleData,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<Vec<alloy::rpc::types::TransactionReceipt>> {
        util::approve(&self.wallet_provider, &self.addresses, bundle, purpose).await
    }
}

impl AlkahestExtension for TokenBundleModule {
    type Config = TokenBundleAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, providers.wallet.clone(), config)
    }
}

#[cfg(test)]
mod tests {
    use std::time::{SystemTime, UNIX_EPOCH};

    use alloy::{
        primitives::{FixedBytes, U256},
        providers::ext::AnvilApi as _,
        sol_types::SolValue as _,
    };

    use crate::{
        DefaultAlkahestClient,
        contracts::obligations::{
            TokenBundlePaymentObligation,
            escrow::non_tierable::TokenBundleEscrowObligation,
        },
        extensions::HasTokenBundle,
        fixtures::{MockERC20Permit, MockERC721, MockERC1155},
        types::{
            ApprovalPurpose, ArbiterData, Erc20Data, Erc721Data, Erc1155Data, TokenBundleData,
        },
        utils::setup_test_environment,
    };

    // Helper function to create a token bundle for Alice
    fn create_alice_bundle(test: &crate::utils::TestContext) -> eyre::Result<TokenBundleData> {
        let erc20_amount = U256::from(500);
        let erc1155_amount = U256::from(50);
        let erc721_id = U256::from(1);

        Ok(TokenBundleData {
            erc20s: vec![Erc20Data {
                address: test.mock_addresses.erc20_a,
                value: erc20_amount,
            }],
            erc721s: vec![Erc721Data {
                address: test.mock_addresses.erc721_a,
                id: erc721_id,
            }],
            erc1155s: vec![Erc1155Data {
                address: test.mock_addresses.erc1155_a,
                id: U256::from(1),
                value: erc1155_amount,
            }],
            native_amount: U256::ZERO,
        })
    }

    // Helper function to create a token bundle for Bob
    fn create_bob_bundle(test: &crate::utils::TestContext) -> eyre::Result<TokenBundleData> {
        let erc20_amount = U256::from(500);
        let erc1155_amount = U256::from(50);
        let erc721_id = U256::from(1);

        Ok(TokenBundleData {
            erc20s: vec![Erc20Data {
                address: test.mock_addresses.erc20_b,
                value: erc20_amount,
            }],
            erc721s: vec![Erc721Data {
                address: test.mock_addresses.erc721_b,
                id: erc721_id,
            }],
            erc1155s: vec![Erc1155Data {
                address: test.mock_addresses.erc1155_b,
                id: U256::from(1),
                value: erc1155_amount,
            }],
            native_amount: U256::ZERO,
        })
    }

    #[tokio::test]
    async fn test_buy_bundle_for_bundle() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Set up the tokens for both parties
        // Mint ERC20 tokens
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc20_b = MockERC20Permit::new(test.mock_addresses.erc20_b, &test.god_provider);
        mock_erc20_b
            .transfer(test.bob.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC721 tokens
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc721_b = MockERC721::new(test.mock_addresses.erc721_b, &test.god_provider);
        mock_erc721_b
            .mint(test.bob.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC1155 tokens
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc1155_b = MockERC1155::new(test.mock_addresses.erc1155_b, &test.god_provider);
        mock_erc1155_b
            .mint(test.bob.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create bundles for Alice and Bob
        let alice_bundle = create_alice_bundle(&test)?;
        let bob_bundle = create_bob_bundle(&test)?;

        // Check initial balances
        let initial_erc20_a_escrow_balance = mock_erc20_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
            )
            .call()
            .await?;

        let _initial_erc721_a_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let initial_erc1155_a_escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
                U256::from(1),
            )
            .call()
            .await?;

        // Alice approves her tokens for barter
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::BarterUtils)
            .await?;

        // Set expiration time to 1 day from now
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400;

        // Alice creates buy order for Bob's bundle
        let receipt = test
            .alice_client
            .token_bundle()
            .barter()
            .buy_bundle_for_bundle(&alice_bundle, &bob_bundle, expiration)
            .await?;

        // Verify attestation was created
        let buy_attestation = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(
            buy_attestation.uid,
            FixedBytes::<32>::default(),
            "Buy attestation should have a valid UID"
        );

        // Verify Alice's tokens are now in escrow
        let final_erc20_a_escrow_balance = mock_erc20_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
            )
            .call()
            .await?;

        let final_erc721_a_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let final_erc1155_a_escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
                U256::from(1),
            )
            .call()
            .await?;

        // Verify tokens were escrowed
        assert_eq!(
            final_erc20_a_escrow_balance - initial_erc20_a_escrow_balance,
            alice_bundle.erc20s[0].value,
            "ERC20 tokens should be in escrow"
        );

        assert_eq!(
            final_erc721_a_owner, test.addresses.token_bundle_addresses.escrow_obligation,
            "ERC721 token should be in escrow"
        );

        assert_eq!(
            final_erc1155_a_escrow_balance - initial_erc1155_a_escrow_balance,
            alice_bundle.erc1155s[0].value,
            "ERC1155 tokens should be in escrow"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_bundle_for_bundle() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Set up the tokens for both parties
        // Mint ERC20 tokens
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc20_b = MockERC20Permit::new(test.mock_addresses.erc20_b, &test.god_provider);
        mock_erc20_b
            .transfer(test.bob.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC721 tokens
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc721_b = MockERC721::new(test.mock_addresses.erc721_b, &test.god_provider);
        mock_erc721_b
            .mint(test.bob.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC1155 tokens
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc1155_b = MockERC1155::new(test.mock_addresses.erc1155_b, &test.god_provider);
        mock_erc1155_b
            .mint(test.bob.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create bundles for Alice and Bob
        let alice_bundle = create_alice_bundle(&test)?;
        let bob_bundle = create_bob_bundle(&test)?;

        // Bob approves his tokens for escrow
        test.bob_client
            .token_bundle()
            .approve(&bob_bundle, ApprovalPurpose::Escrow)
            .await?;

        // Create payment obligation for Alice's bundle
        let payment_obligation: TokenBundlePaymentObligation::ObligationData =
            (alice_bundle.clone(), test.bob.address()).into();

        // Set expiration time
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400;

        // Bob creates a bundle escrow demanding Alice's bundle
        let buy_receipt = test
            .bob_client
            .token_bundle()
            .escrow()
            .non_tierable()
            .create(
                &bob_bundle,
                &ArbiterData {
                    arbiter: test.addresses.token_bundle_addresses.payment_obligation,
                    demand: payment_obligation.abi_encode().into(),
                },
                expiration,
            )
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // Check balances before fulfillment
        let alice_initial_erc20_b_balance =
            mock_erc20_b.balanceOf(test.alice.address()).call().await?;

        let bob_initial_erc20_a_balance = mock_erc20_a.balanceOf(test.bob.address()).call().await?;

        let alice_initial_erc1155_b_balance = mock_erc1155_b
            .balanceOf(test.alice.address(), U256::from(1))
            .call()
            .await?;

        let bob_initial_erc1155_a_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), U256::from(1))
            .call()
            .await?;

        // Alice approves her tokens for barter
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::BarterUtils)
            .await?;

        // Alice fulfills Bob's order
        let pay_receipt = test
            .alice_client
            .token_bundle()
            .barter()
            .pay_bundle_for_bundle(buy_attestation)
            .await?;

        // Verify payment attestation was created
        let pay_attestation = DefaultAlkahestClient::get_attested_event(pay_receipt)?;
        assert_ne!(
            pay_attestation.uid,
            FixedBytes::<32>::default(),
            "Payment attestation should have a valid UID"
        );

        // Check balances after fulfillment
        let alice_final_erc20_b_balance =
            mock_erc20_b.balanceOf(test.alice.address()).call().await?;

        let bob_final_erc20_a_balance = mock_erc20_a.balanceOf(test.bob.address()).call().await?;

        let alice_final_erc1155_b_balance = mock_erc1155_b
            .balanceOf(test.alice.address(), U256::from(1))
            .call()
            .await?;

        let bob_final_erc1155_a_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), U256::from(1))
            .call()
            .await?;

        // Check ERC721 ownerships
        let alice_erc721_b_owner = mock_erc721_b.ownerOf(U256::from(1)).call().await?;
        let bob_erc721_a_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        // Verify token transfers
        // Alice receives Bob's tokens
        assert_eq!(
            alice_final_erc20_b_balance - alice_initial_erc20_b_balance,
            bob_bundle.erc20s[0].value,
            "Alice should receive Bob's ERC20 tokens"
        );

        assert_eq!(
            alice_erc721_b_owner,
            test.alice.address(),
            "Alice should receive Bob's ERC721 token"
        );

        assert_eq!(
            alice_final_erc1155_b_balance - alice_initial_erc1155_b_balance,
            bob_bundle.erc1155s[0].value,
            "Alice should receive Bob's ERC1155 tokens"
        );

        // Bob receives Alice's tokens
        assert_eq!(
            bob_final_erc20_a_balance - bob_initial_erc20_a_balance,
            alice_bundle.erc20s[0].value,
            "Bob should receive Alice's ERC20 tokens"
        );

        assert_eq!(
            bob_erc721_a_owner,
            test.bob.address(),
            "Bob should receive Alice's ERC721 token"
        );

        assert_eq!(
            bob_final_erc1155_a_balance - bob_initial_erc1155_a_balance,
            alice_bundle.erc1155s[0].value,
            "Bob should receive Alice's ERC1155 tokens"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_collect_expired() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Set up Alice's tokens
        // Mint ERC20 tokens
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC721 tokens
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Mint ERC1155 tokens
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create bundles for Alice and Bob
        let alice_bundle = create_alice_bundle(&test)?;
        let bob_bundle = create_bob_bundle(&test)?;

        // Set a short expiration (60 seconds from now)
        let short_expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 60;

        // Alice approves her tokens for barter
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::BarterUtils)
            .await?;

        // Alice creates a buy order with a short expiration
        let buy_receipt = test
            .alice_client
            .token_bundle()
            .barter()
            .buy_bundle_for_bundle(&alice_bundle, &bob_bundle, short_expiration)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // Advance blockchain time to after expiration
        test.god_provider.anvil_increase_time(120).await?; // Advance by 120 seconds

        // Check balances before collecting
        let escrow_erc721_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let initial_erc20_balance = mock_erc20_a.balanceOf(test.alice.address()).call().await?;

        let initial_erc1155_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), U256::from(1))
            .call()
            .await?;

        // Verify tokens are in escrow
        assert_eq!(
            escrow_erc721_owner, test.addresses.token_bundle_addresses.escrow_obligation,
            "ERC721 token should be in escrow before collection"
        );

        // Alice collects her expired escrow
        test.alice_client
            .token_bundle()
            .escrow()
            .non_tierable()
            .reclaim_expired(buy_attestation)
            .await?;

        // Verify Alice got her tokens back
        let final_erc20_balance = mock_erc20_a.balanceOf(test.alice.address()).call().await?;

        let final_erc721_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let final_erc1155_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), U256::from(1))
            .call()
            .await?;

        // Verify tokens returned to Alice
        assert_eq!(
            final_erc721_owner,
            test.alice.address(),
            "ERC721 token should be returned to Alice"
        );

        assert_eq!(
            final_erc1155_balance - initial_erc1155_balance,
            alice_bundle.erc1155s[0].value,
            "ERC1155 tokens should be returned to Alice"
        );

        assert_eq!(
            final_erc20_balance - initial_erc20_balance,
            alice_bundle.erc20s[0].value,
            "ERC20 tokens should be returned to Alice"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_decode_escrow_obligation() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Create sample bundle data
        let alice_bundle = create_alice_bundle(&test)?;

        // Create sample arbiter data
        let arbiter = test.addresses.token_bundle_addresses.payment_obligation;
        let demand = alloy::primitives::Bytes::from(vec![1, 2, 3, 4]); // Sample demand data

        let arbiter_data = ArbiterData {
            arbiter,
            demand: demand.clone(),
        };

        // Create the obligation data
        let escrow_data: TokenBundleEscrowObligation::ObligationData =
            (alice_bundle, arbiter_data).into();

        // Encode the data
        let encoded = escrow_data.abi_encode();

        // Decode the data
        let decoded = super::escrow::non_tierable::NonTierable::decode_obligation(&encoded.into())?;

        // Verify decoded data - note that the bundle verification would need more complex comparison
        assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
        assert_eq!(decoded.demand, demand, "Demand should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_decode_payment_obligation() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Create sample bundle data
        let alice_bundle = create_alice_bundle(&test)?;
        let payee = test.alice.address();

        // Create the obligation data
        let payment_data: TokenBundlePaymentObligation::ObligationData =
            (alice_bundle, payee).into();

        // Encode the data
        let encoded = payment_data.abi_encode();

        // Decode the data
        let decoded = super::payment::Payment::decode_obligation(&encoded.into())?;

        // Verify decoded data - note that the bundle verification would need more complex comparison
        assert_eq!(decoded.payee, payee, "Payee should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_approve() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Mint tokens to Alice
        // ERC20
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC721
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC1155
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create Alice's bundle
        let alice_bundle = create_alice_bundle(&test)?;

        // Test approve for payment
        let _receipts = test
            .alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Payment)
            .await?;

        // Verify ERC20 approval
        let erc20_payment_allowance = mock_erc20_a
            .allowance(
                test.alice.address(),
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .payment_obligation,
            )
            .call()
            .await?;

        assert!(
            erc20_payment_allowance >= alice_bundle.erc20s[0].value,
            "ERC20 payment approval should be set correctly"
        );

        // Verify ERC721 approval
        let erc721_payment_approved = mock_erc721_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .payment_obligation,
            )
            .call()
            .await?;

        assert!(
            erc721_payment_approved,
            "ERC721 payment approval should be set correctly"
        );

        // Verify ERC1155 approval
        let erc1155_payment_approved = mock_erc1155_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .payment_obligation,
            )
            .call()
            .await?;

        assert!(
            erc1155_payment_approved,
            "ERC1155 payment approval should be set correctly"
        );

        // Test approve for escrow
        let _receipts = test
            .alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Escrow)
            .await?;

        // Verify ERC20 approval
        let erc20_escrow_allowance = mock_erc20_a
            .allowance(
                test.alice.address(),
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
            )
            .call()
            .await?;

        assert!(
            erc20_escrow_allowance >= alice_bundle.erc20s[0].value,
            "ERC20 escrow approval should be set correctly"
        );

        // Verify ERC721 approval
        let erc721_escrow_approved = mock_erc721_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
            )
            .call()
            .await?;

        assert!(
            erc721_escrow_approved,
            "ERC721 escrow approval should be set correctly"
        );

        // Verify ERC1155 approval
        let erc1155_escrow_approved = mock_erc1155_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.token_bundle_addresses.escrow_obligation,
            )
            .call()
            .await?;

        assert!(
            erc1155_escrow_approved,
            "ERC1155 escrow approval should be set correctly"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_with_bundle() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Mint tokens to Alice
        // ERC20
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC721
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC1155
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create Alice's bundle
        let alice_bundle = create_alice_bundle(&test)?;

        // Create custom arbiter data
        let arbiter = test
            .addresses
            .clone()
            .token_bundle_addresses
            .payment_obligation;
        let demand = alloy::primitives::Bytes::from(b"custom demand data");
        let item = ArbiterData { arbiter, demand };

        // Alice approves tokens for escrow
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Escrow)
            .await?;

        // Alice creates escrow with custom demand
        let receipt = test
            .alice_client
            .token_bundle()
            .escrow()
            .non_tierable()
            .create(&alice_bundle, &item, 0)
            .await?;

        // Verify escrow happened
        // Check token ownerships and balances
        let erc721_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let erc20_escrow_balance = mock_erc20_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
            )
            .call()
            .await?;

        let erc1155_escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses
                    .clone()
                    .token_bundle_addresses
                    .escrow_obligation,
                U256::from(1),
            )
            .call()
            .await?;

        // Verify tokens are in escrow
        assert_eq!(
            erc721_owner, test.addresses.token_bundle_addresses.escrow_obligation,
            "ERC721 token should be owned by escrow contract"
        );

        assert!(
            erc20_escrow_balance >= alice_bundle.erc20s[0].value,
            "ERC20 tokens should be in escrow"
        );

        assert!(
            erc1155_escrow_balance >= alice_bundle.erc1155s[0].value,
            "ERC1155 tokens should be in escrow"
        );

        // Escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_with_bundle() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Mint tokens to Alice
        // ERC20
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.alice.address(), U256::from(1000))
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC721
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC1155
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), U256::from(1), U256::from(100))
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create Alice's bundle
        let alice_bundle = create_alice_bundle(&test)?;

        // Check initial balances
        let initial_bob_erc20_balance = mock_erc20_a.balanceOf(test.bob.address()).call().await?;

        let initial_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), U256::from(1))
            .call()
            .await?;

        // Alice approves tokens for payment
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Payment)
            .await?;

        // Alice makes direct payment to Bob
        let receipt = test
            .alice_client
            .token_bundle()
            .payment()
            .pay(&alice_bundle, test.bob.address())
            .await?;

        // Verify payment happened
        // Check token ownerships and balances
        let erc721_owner = mock_erc721_a.ownerOf(U256::from(1)).call().await?;

        let final_bob_erc20_balance = mock_erc20_a.balanceOf(test.bob.address()).call().await?;

        let final_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), U256::from(1))
            .call()
            .await?;

        // Verify tokens were transferred to Bob
        assert_eq!(
            erc721_owner,
            test.bob.address(),
            "ERC721 token should be owned by Bob"
        );

        assert_eq!(
            final_bob_erc20_balance - initial_bob_erc20_balance,
            alice_bundle.erc20s[0].value,
            "ERC20 tokens should be transferred to Bob"
        );

        assert_eq!(
            final_bob_erc1155_balance - initial_bob_erc1155_balance,
            alice_bundle.erc1155s[0].value,
            "ERC1155 tokens should be transferred to Bob"
        );

        // Payment obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }
}
