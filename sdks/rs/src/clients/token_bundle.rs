use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::signers::local::PrivateKeySigner;
use alloy::sol_types::SolValue as _;
use std::collections::HashSet;

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts::{self, IERC20, IERC721, IERC1155};
use crate::extensions::ContractModule;
use crate::types::{ArbiterData, DecodedAttestation, TokenBundleData};
use crate::{
    extensions::AlkahestExtension,
    types::{ApprovalPurpose, ProviderContext, WalletProvider},
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenBundleAddresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
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
    signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: TokenBundleAddresses,
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
    ///
    /// # Arguments
    /// * `private_key` - The private key for signing transactions
    /// * `rpc_url` - The RPC endpoint URL
    /// * `addresses` - Optional custom contract addresses, uses defaults if None
    ///
    /// # Returns
    /// * `Result<Self>` - The initialized client instance
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: WalletProvider,
        addresses: Option<TokenBundleAddresses>,
    ) -> eyre::Result<Self> {
        Ok(TokenBundleModule {
            signer,
            wallet_provider,

            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Decodes TokenBundleEscrowObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::TokenBundleEscrowObligation::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation(
        obligation_data: Bytes,
    ) -> eyre::Result<contracts::TokenBundleEscrowObligation::ObligationData> {
        let obligation_data = contracts::TokenBundleEscrowObligation::ObligationData::abi_decode(
            obligation_data.as_ref(),
        )?;
        return Ok(obligation_data);
    }

    /// Decodes TokenBundlePaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    ///
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    ///
    /// * `eyre::Result<contracts::TokenBundlePaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_payment_obligation(
        obligation_data: Bytes,
    ) -> eyre::Result<contracts::TokenBundlePaymentObligation::ObligationData> {
        let obligation_data = contracts::TokenBundlePaymentObligation::ObligationData::abi_decode(
            obligation_data.as_ref(),
        )?;
        return Ok(obligation_data);
    }

    pub async fn get_escrow_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<contracts::token_bundle::TokenBundleEscrowObligation::ObligationData>,
    > {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::token_bundle::TokenBundleEscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub async fn get_payment_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<contracts::token_bundle::TokenBundlePaymentObligation::ObligationData>,
    > {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::token_bundle::TokenBundlePaymentObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Collects payment from a fulfilled trade.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    /// * `fulfillment` - The attestation UID of the fulfillment
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn collect_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract = contracts::token_bundle::TokenBundleEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_contract
            .collectEscrow(buy_attestation, fulfillment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects expired escrow funds after expiration time has passed.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the expired escrow
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn reclaim_expired(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract = contracts::token_bundle::TokenBundleEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_contract
            .reclaimExpired(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow arrangement with token bundles for a custom demand.
    ///
    /// # Arguments
    /// * `price` - The token bundle data for payment
    /// * `item` - The arbiter and demand data
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_with_bundle(
        &self,
        price: &TokenBundleData,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract = contracts::token_bundle::TokenBundleEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_obligation_contract
            .doObligation((price, item).into(), expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Makes a direct payment with token bundles.
    ///
    /// # Arguments
    /// * `price` - The token bundle data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_with_bundle(
        &self,
        price: &TokenBundleData,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract =
            contracts::token_bundle::TokenBundlePaymentObligation::new(
                self.addresses.payment_obligation,
                &self.wallet_provider,
            );

        let receipt = payment_obligation_contract
            .doObligation((price, payee).into())
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade token bundles for other token bundles.
    ///
    /// # Arguments
    /// * `bid` - The token bundle data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_for_bundle(
        &self,
        bid: &TokenBundleData,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::TokenBundleBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let zero_arbiter = ArbiterData {
            arbiter: Address::ZERO,
            demand: Bytes::new(),
        };

        let receipt = barter_utils_contract
            .buyBundleForBundle(
                (bid, &zero_arbiter).into(),
                (ask, self.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing bundle-for-bundle trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_bundle_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::TokenBundleBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payBundleForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Approves all tokens in a bundle for trading.
    ///
    /// # Arguments
    /// * `bundle` - The token bundle data containing tokens to approve
    /// * `purpose` - Purpose of approval (escrow or payment)
    ///
    /// # Returns
    /// * `Result<Vec<TransactionReceipt>>` - A vector of transaction receipts for all approval transactions
    ///
    /// # Example
    /// * let approvals = client.approve(&token_bundle, ApprovalPurpose::Escrow).await?;
    pub async fn approve(
        &self,
        bundle: &TokenBundleData,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<Vec<TransactionReceipt>> {
        // Get the appropriate contract address based on purpose
        let target = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let mut results = Vec::new();

        // Process ERC20 tokens
        for token in &bundle.erc20s {
            let erc20_contract = IERC20::new(token.address, &self.wallet_provider);

            // Use map_err for more concise error handling
            let receipt = erc20_contract
                .approve(target, token.value)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC20 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC20 approval receipt: {}", e))?;

            results.push(receipt);
        }

        // Process ERC721 tokens - group by token contract to use setApprovalForAll when possible
        let erc721_addresses: HashSet<Address> =
            bundle.erc721s.iter().map(|token| token.address).collect();

        // For contracts with multiple tokens, use setApprovalForAll
        for address in erc721_addresses {
            let erc721_contract = IERC721::new(address, &self.wallet_provider);

            let receipt = erc721_contract
                .setApprovalForAll(target, true)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC721 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC721 approval receipt: {}", e))?;

            results.push(receipt);
        }

        // Process ERC1155 tokens - group by token contract to use setApprovalForAll
        let erc1155_addresses: HashSet<Address> =
            bundle.erc1155s.iter().map(|token| token.address).collect();

        // For ERC1155, always use setApprovalForAll
        for address in erc1155_addresses {
            let erc1155_contract = IERC1155::new(address, &self.wallet_provider);

            let receipt = erc1155_contract
                .setApprovalForAll(target, true)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC1155 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC1155 approval receipt: {}", e))?;

            results.push(receipt);
        }

        Ok(results)
    }
}

impl AlkahestExtension for TokenBundleModule {
    type Config = TokenBundleAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, (*providers.wallet).clone(), config)
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

    use super::TokenBundleModule;
    use crate::{
        DefaultAlkahestClient,
        contracts::token_bundle::{TokenBundleEscrowObligation, TokenBundlePaymentObligation},
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

        // Alice approves her tokens for escrow
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Escrow)
            .await?;

        // Set expiration time to 1 day from now
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400;

        // Alice creates buy order for Bob's bundle
        let receipt = test
            .alice_client
            .token_bundle()
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
            .buy_with_bundle(
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

        // Alice approves her tokens for payment
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Payment)
            .await?;

        // Alice fulfills Bob's order
        let pay_receipt = test
            .alice_client
            .token_bundle()
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

        // Alice approves her tokens for escrow
        test.alice_client
            .token_bundle()
            .approve(&alice_bundle, ApprovalPurpose::Escrow)
            .await?;

        // Alice creates a buy order with a short expiration
        let buy_receipt = test
            .alice_client
            .token_bundle()
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
        let decoded = TokenBundleModule::decode_escrow_obligation(encoded.into())?;

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
        let decoded = TokenBundleModule::decode_payment_obligation(encoded.into())?;

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
            .buy_with_bundle(&alice_bundle, &item, 0)
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
            .pay_with_bundle(&alice_bundle, test.bob.address())
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
