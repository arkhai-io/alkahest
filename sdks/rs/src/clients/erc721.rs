use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::signers::local::PrivateKeySigner;
use alloy::sol_types::SolValue as _;

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts::{self};
use crate::extensions::AlkahestExtension;
use crate::extensions::ContractModule;
use crate::types::{
    ApprovalPurpose, ArbiterData, DecodedAttestation, Erc20Data, Erc721Data, Erc1155Data,
    TokenBundleData,
};
use crate::types::{ProviderContext, WalletProvider};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Erc721Addresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
}

/// Client for interacting with ERC721 token trading and escrow functionality.
///
/// This client provides methods for:
/// - Trading ERC721 tokens for other ERC721, ERC20, and ERC1155 tokens
/// - Creating escrow arrangements with custom demands
/// - Managing token approvals
/// - Collecting payments from fulfilled trades
#[derive(Clone)]
pub struct Erc721Module {
    signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: Erc721Addresses,
}

impl Default for Erc721Addresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.erc721_addresses
    }
}

/// Available contracts in the ERC721 module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Erc721Contract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Barter utilities contract for ERC721 tokens
    BarterUtils,
    /// Escrow obligation contract for ERC721 tokens
    EscrowObligation,
    /// Payment obligation contract for ERC721 tokens
    PaymentObligation,
}

impl ContractModule for Erc721Module {
    type Contract = Erc721Contract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            Erc721Contract::Eas => self.addresses.eas,
            Erc721Contract::BarterUtils => self.addresses.barter_utils,
            Erc721Contract::EscrowObligation => self.addresses.escrow_obligation,
            Erc721Contract::PaymentObligation => self.addresses.payment_obligation,
        }
    }
}

impl Erc721Module {
    /// Creates a new Erc721Module instance.
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
        addresses: Option<Erc721Addresses>,
    ) -> eyre::Result<Self> {
        Ok(Erc721Module {
            signer,
            wallet_provider,

            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Decodes ERC721EscrowObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::ERC721EscrowObligation::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::ERC721EscrowObligation::ObligationData> {
        let obligation_data = contracts::ERC721EscrowObligation::ObligationData::abi_decode(
            obligation_data.as_ref(),
        )?;
        return Ok(obligation_data);
    }

    /// Decodes ERC721PaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    ///
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    ///
    /// * `eyre::Result<contracts::ERC721PaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_payment_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::ERC721PaymentObligation::ObligationData> {
        let obligation_data = contracts::ERC721PaymentObligation::ObligationData::abi_decode(
            obligation_data.as_ref(),
        )?;
        return Ok(obligation_data);
    }

    pub async fn get_escrow_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::ERC721EscrowObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::ERC721EscrowObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub async fn get_payment_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::ERC721PaymentObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::ERC721PaymentObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Approves a specific token for trading.
    ///
    /// # Arguments
    /// * `token` - The ERC721 token data including address and token ID
    /// * `purpose` - Whether the approval is for payment or escrow
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve(
        &self,
        token: &Erc721Data,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract = contracts::IERC721::new(token.address, &self.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let receipt = erc721_contract
            .approve(to, token.id)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Approves all tokens from a contract for trading.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC721 contract address
    /// * `purpose` - Whether the approval is for payment or escrow
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract = contracts::IERC721::new(token_contract, &self.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let receipt = erc721_contract
            .setApprovalForAll(to, true)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Revokes approval for all tokens from a contract.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC721 contract address
    /// * `purpose` - Whether to revoke payment or escrow approval
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn revoke_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract = contracts::IERC721::new(token_contract, &self.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let receipt = erc721_contract
            .setApprovalForAll(to, false)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
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
        let escrow_contract = contracts::ERC721EscrowObligation::new(
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
        let escrow_contract = contracts::ERC721EscrowObligation::new(
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

    /// Creates an escrow arrangement with ERC721 tokens for a custom demand.
    ///
    /// # Arguments
    /// * `price` - The ERC721 token data for payment
    /// * `item` - The arbiter and demand data
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_with_erc721(
        &self,
        price: &Erc721Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract = contracts::ERC721EscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_obligation_contract
            .doObligation(
                contracts::ERC721EscrowObligation::ObligationData {
                    token: price.address,
                    tokenId: price.id,
                    arbiter: item.arbiter,
                    demand: item.demand.clone(),
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Makes a direct payment with ERC721 tokens.
    ///
    /// # Arguments
    /// * `price` - The ERC721 token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_with_erc721(
        &self,
        price: &Erc721Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::ERC721PaymentObligation::new(
            self.addresses.payment_obligation,
            &self.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(contracts::ERC721PaymentObligation::ObligationData {
                token: price.address,
                tokenId: price.id,
                payee,
            })
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC721 tokens for other ERC721 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC721 token data being offered
    /// * `ask` - The ERC721 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc721_for_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::ERC721BarterUtils::new(self.addresses.barter_utils, &self.wallet_provider);

        let receipt = barter_utils_contract
            .buyErc721ForErc721(bid.address, bid.id, ask.address, ask.id, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC721 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc721_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::ERC721BarterUtils::new(self.addresses.barter_utils, &self.wallet_provider);

        let receipt = barter_utils_contract
            .payErc721ForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC721 tokens for ERC20 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC721 token data being offered
    /// * `ask` - The ERC20 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc20_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyErc20WithErc721(bid.address, bid.id, ask.address, ask.value, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC20 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc721_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc721ForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC721 tokens for ERC1155 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC721 token data being offered
    /// * `ask` - The ERC1155 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc1155_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyErc1155WithErc721(
                bid.address,
                bid.id,
                ask.address,
                ask.id,
                ask.value,
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC1155 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc721_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc721ForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC721 tokens for a bundle of tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC721 token data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyBundleWithErc721(
                bid.address,
                bid.id,
                (ask, self.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-bundle trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc721_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc721_barter_cross_token::ERC721BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc721ForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}

impl AlkahestExtension for Erc721Module {
    type Config = Erc721Addresses;
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
        primitives::{Bytes, FixedBytes, U256},
        providers::ext::AnvilApi as _,
        sol_types::SolValue as _,
    };

    use super::Erc721Module;
    use crate::{
        DefaultAlkahestClient,
        extensions::{HasErc20, HasErc721, HasErc1155, HasTokenBundle},
        fixtures::{MockERC20Permit, MockERC721, MockERC1155},
        types::{
            ApprovalPurpose, ArbiterData, Erc20Data, Erc721Data, Erc1155Data, TokenBundleData,
        },
        utils::setup_test_environment,
    };

    #[tokio::test]
    async fn test_decode_escrow_obligation() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // Create sample obligation data
        let token_address = test.mock_addresses.erc721_a;
        let id: U256 = 1.try_into()?;
        let arbiter = test.addresses.erc721_addresses.payment_obligation;
        let demand = Bytes::from(vec![1, 2, 3, 4]); // sample demand data

        let escrow_data = crate::contracts::ERC721EscrowObligation::ObligationData {
            token: token_address,
            tokenId: id,
            arbiter,
            demand: demand.clone(),
        };

        // Encode the data
        let encoded = escrow_data.abi_encode();

        // Decode the data
        let decoded = Erc721Module::decode_escrow_obligation(&encoded.into())?;

        // Verify decoded data
        assert_eq!(decoded.token, token_address, "Token address should match");
        assert_eq!(decoded.tokenId, id, "ID should match");
        assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
        assert_eq!(decoded.demand, demand, "Demand should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_decode_payment_obligation() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // Create sample obligation data
        let token_address = test.mock_addresses.erc721_a;
        let id: U256 = 1.try_into()?;
        let payee = test.alice.address();

        let payment_data = crate::contracts::ERC721PaymentObligation::ObligationData {
            token: token_address,
            tokenId: id,
            payee,
        };

        // Encode the data
        let encoded = payment_data.abi_encode();

        // Decode the data
        let decoded = Erc721Module::decode_payment_obligation(&encoded.into())?;

        // Verify decoded data
        assert_eq!(decoded.token, token_address, "Token address should match");
        assert_eq!(decoded.tokenId, id, "ID should match");
        assert_eq!(decoded.payee, payee, "Payee should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_approve() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        let token = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // Test approve for payment
        let _receipt = test
            .alice_client
            .erc721()
            .approve(&token, ApprovalPurpose::Payment)
            .await?;

        // Verify approval for payment obligation
        let payment_approved = mock_erc721_a.getApproved(1.try_into()?).call().await?;

        assert_eq!(
            payment_approved,
            test.addresses.erc721_addresses.clone().payment_obligation,
            "Payment approval should be set correctly"
        );

        // Test approve for escrow
        let _receipt = test
            .alice_client
            .erc721()
            .approve(&token, ApprovalPurpose::Escrow)
            .await?;

        // Verify approval for escrow obligation
        let escrow_approved = mock_erc721_a.getApproved(1.try_into()?).call().await?;

        assert_eq!(
            escrow_approved, test.addresses.erc721_addresses.escrow_obligation,
            "Escrow approval should be set correctly"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_approve_all() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC721 tokens to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Test approve_all for payment
        let _receipt = test
            .alice_client
            .erc721()
            .approve_all(test.mock_addresses.erc721_a, ApprovalPurpose::Payment)
            .await?;

        // Verify approval for payment obligation
        let payment_approved = mock_erc721_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc721_addresses.clone().payment_obligation,
            )
            .call()
            .await?;

        assert!(
            payment_approved,
            "Payment approval for all should be set correctly"
        );

        // Test approve_all for escrow
        let _receipt = test
            .alice_client
            .erc721()
            .approve_all(test.mock_addresses.erc721_a, ApprovalPurpose::Escrow)
            .await?;

        // Verify approval for escrow obligation
        let escrow_approved = mock_erc721_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc721_addresses.escrow_obligation,
            )
            .call()
            .await?;

        assert!(
            escrow_approved,
            "Escrow approval for all should be set correctly"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_revoke_all() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC721 tokens to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // First approve all
        test.alice_client
            .erc721()
            .approve_all(test.mock_addresses.erc721_a, ApprovalPurpose::Payment)
            .await?;

        // Then revoke all
        let _receipt = test
            .alice_client
            .erc721()
            .revoke_all(test.mock_addresses.erc721_a, ApprovalPurpose::Payment)
            .await?;

        // Verify revocation
        let payment_approved = mock_erc721_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc721_addresses.clone().payment_obligation,
            )
            .call()
            .await?;

        assert!(!payment_approved, "Payment approval should be revoked");

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_with_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // Create custom arbiter data
        let arbiter = test.addresses.erc721_addresses.clone().payment_obligation;
        let demand = Bytes::from(b"custom demand data");
        let item = ArbiterData { arbiter, demand };

        // approve token for escrow
        test.alice_client
            .erc721()
            .approve(&price, ApprovalPurpose::Escrow)
            .await?;

        // alice creates escrow with custom demand
        let receipt = test
            .alice_client
            .erc721()
            .buy_with_erc721(&price, &item, 0)
            .await?;

        // Verify escrow happened
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // token in escrow
        assert_eq!(
            owner, test.addresses.erc721_addresses.escrow_obligation,
            "Token should be owned by escrow contract"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_with_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // approve token for payment
        test.alice_client
            .erc721()
            .approve(&price, ApprovalPurpose::Payment)
            .await?;

        // alice makes direct payment to bob
        let receipt = test
            .alice_client
            .erc721()
            .pay_with_erc721(&price, test.bob.address())
            .await?;

        // Verify payment happened
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // token paid to bob
        assert_eq!(owner, test.bob.address(), "Token should be owned by Bob");

        // payment obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc721_for_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc721Data {
            address: test.mock_addresses.erc721_b,
            id: 2.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        // alice makes escrow
        let receipt = test
            .alice_client
            .erc721()
            .buy_erc721_for_erc721(&bid, &ask, 0)
            .await?;

        // verify escrow
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        assert_eq!(
            owner, test.addresses.erc721_addresses.escrow_obligation,
            "Token should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc721_for_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC721 tokens to alice and bob
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

        // begin test
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc721Data {
            address: test.mock_addresses.erc721_b,
            id: 1.try_into()?,
        };

        // alice approves token for escrow and creates buy attestation
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .alice_client
            .erc721()
            .buy_erc721_for_erc721(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // bob approves token for payment
        test.bob_client
            .erc721()
            .approve(&ask, ApprovalPurpose::Payment)
            .await?;

        // bob fulfills the buy attestation
        let _sell_receipt = test
            .bob_client
            .erc721()
            .pay_erc721_for_erc721(buy_attestation)
            .await?;

        // verify token transfers
        let alice_token_b_owner = mock_erc721_b.ownerOf(1.try_into()?).call().await?;
        let bob_token_a_owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // both sides received the tokens
        assert_eq!(
            alice_token_b_owner,
            test.alice.address(),
            "Alice should have received token B"
        );
        assert_eq!(
            bob_token_a_owner,
            test.bob.address(),
            "Bob should have received token A"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_collect_expired() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc721Data {
            address: test.mock_addresses.erc721_b,
            id: 2.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        // alice makes escrow with a short expiration
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 10;
        let receipt = test
            .alice_client
            .erc721()
            .buy_erc721_for_erc721(&bid, &ask, expiration as u64 + 1)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(receipt)?.uid;

        // Wait for expiration
        test.god_provider.anvil_increase_time(20).await?;

        // alice collects expired funds
        let _collect_receipt = test
            .alice_client
            .erc721()
            .reclaim_expired(buy_attestation)
            .await?;

        // verify token returned to alice
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        assert_eq!(
            owner,
            test.alice.address(),
            "Token should be returned to Alice"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc20_with_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: 100.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc721()
            .buy_erc20_with_erc721(&bid, &ask, 0)
            .await?;

        // Verify escrow happened
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        assert_eq!(
            owner, test.addresses.erc721_addresses.escrow_obligation,
            "Token should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc1155_with_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 10.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc721()
            .buy_erc1155_with_erc721(&bid, &ask, 0)
            .await?;

        // Verify escrow happened
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        assert_eq!(
            owner, test.addresses.erc721_addresses.escrow_obligation,
            "Token should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_bundle_with_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // Create bundle data
        let bundle = TokenBundleData {
            erc20s: vec![Erc20Data {
                address: test.mock_addresses.erc20_b,
                value: 20.try_into()?,
            }],
            erc721s: vec![Erc721Data {
                address: test.mock_addresses.erc721_b,
                id: 2.try_into()?,
            }],
            erc1155s: vec![Erc1155Data {
                address: test.mock_addresses.erc1155_a,
                id: 1.try_into()?,
                value: 5.try_into()?,
            }],
        };

        // alice approves token for escrow
        test.alice_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc721()
            .buy_bundle_with_erc721(&bid, bundle, 0)
            .await?;

        // Verify escrow happened
        let owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        assert_eq!(
            owner, test.addresses.erc721_addresses.escrow_obligation,
            "Token should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc721_for_erc20() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice (she will fulfill with this)
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // give bob some ERC20 tokens for escrow
        let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
        mock_erc20_a
            .transfer(test.bob.address(), 100.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc20Data {
            // bob's bid
            address: test.mock_addresses.erc20_a,
            value: 100.try_into()?,
        };
        let ask = Erc721Data {
            // bob asks for alice's ERC721
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // bob approves tokens for escrow and creates buy attestation
        test.bob_client
            .erc20()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .bob_client
            .erc20()
            .buy_erc721_for_erc20(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her ERC721 token for payment
        test.alice_client
            .erc721()
            .approve(&ask, ApprovalPurpose::Payment)
            .await?;

        // alice fulfills bob's buy attestation with her ERC721
        let _sell_receipt = test
            .alice_client
            .erc721()
            .pay_erc721_for_erc20(buy_attestation)
            .await?;

        // verify token transfers
        let alice_token_a_balance = mock_erc20_a.balanceOf(test.alice.address()).call().await?;

        let bob_token_owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // both sides received the tokens
        assert_eq!(
            alice_token_a_balance,
            100.try_into()?,
            "Alice should have received ERC20 tokens"
        );
        assert_eq!(
            bob_token_owner,
            test.bob.address(),
            "Bob should have received the ERC721 token"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc721_for_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice (she will fulfill with this)
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // give bob some ERC1155 tokens for escrow
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.bob.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc1155Data {
            // bob's bid
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 10.try_into()?,
        };
        let ask = Erc721Data {
            // bob asks for alice's ERC721
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // bob approves tokens for escrow and creates buy attestation
        test.bob_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .bob_client
            .erc1155()
            .buy_erc721_with_erc1155(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her token for payment
        test.alice_client
            .erc721()
            .approve(&ask, ApprovalPurpose::Payment)
            .await?;

        // alice fulfills the buy attestation
        let _sell_receipt = test
            .alice_client
            .erc721()
            .pay_erc721_for_erc1155(buy_attestation)
            .await?;

        // verify token transfers
        let alice_erc1155_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        let bob_token_owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // both sides received the tokens
        assert_eq!(
            alice_erc1155_balance,
            10.try_into()?,
            "Alice should have received ERC1155 tokens"
        );
        assert_eq!(
            bob_token_owner,
            test.bob.address(),
            "Bob should have received the ERC721 token"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc721_for_bundle() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint an ERC721 token to alice (she will fulfill with this)
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.alice.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // give bob tokens for the bundle (he will escrow these)
        // ERC20
        let mock_erc20_b = MockERC20Permit::new(test.mock_addresses.erc20_b, &test.god_provider);
        mock_erc20_b
            .transfer(test.bob.address(), 20.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC721
        let mock_erc721_b = MockERC721::new(test.mock_addresses.erc721_b, &test.god_provider);
        mock_erc721_b
            .mint(test.bob.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // ERC1155
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.bob.address(), 1.try_into()?, 5.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        // Check balances before the exchange
        let initial_alice_erc20_balance =
            mock_erc20_b.balanceOf(test.alice.address()).call().await?;
        let initial_alice_erc1155_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        // Bob's bundle that he'll escrow
        let bundle = TokenBundleData {
            erc20s: vec![Erc20Data {
                address: test.mock_addresses.erc20_b,
                value: 20.try_into()?,
            }],
            erc721s: vec![Erc721Data {
                address: test.mock_addresses.erc721_b,
                id: 1.try_into()?,
            }],
            erc1155s: vec![Erc1155Data {
                address: test.mock_addresses.erc1155_a,
                id: 1.try_into()?,
                value: 5.try_into()?,
            }],
        };

        // Create the ERC721 payment obligation data as the demand
        let payment_obligation_data = crate::contracts::ERC721PaymentObligation::ObligationData {
            token: test.mock_addresses.erc721_a,
            tokenId: 1.try_into()?,
            payee: test.bob.address(),
        };

        // bob approves all tokens for the bundle escrow
        test.bob_client
            .token_bundle()
            .approve(&bundle, ApprovalPurpose::Escrow)
            .await?;

        // bob creates bundle escrow demanding ERC721 from Alice
        let buy_receipt = test
            .bob_client
            .token_bundle()
            .buy_with_bundle(
                &bundle,
                &ArbiterData {
                    arbiter: test.addresses.erc721_addresses.payment_obligation,
                    demand: payment_obligation_data.abi_encode().into(),
                },
                0,
            )
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her ERC721 for payment
        test.alice_client
            .erc721()
            .approve(
                &Erc721Data {
                    address: test.mock_addresses.erc721_a,
                    id: 1.try_into()?,
                },
                ApprovalPurpose::Payment,
            )
            .await?;

        // alice fulfills bob's buy attestation with her ERC721
        let pay_receipt = test
            .alice_client
            .erc721()
            .pay_erc721_for_bundle(buy_attestation)
            .await?;

        // Verify the payment attestation was created
        let pay_attestation = DefaultAlkahestClient::get_attested_event(pay_receipt)?;
        assert_ne!(pay_attestation.uid, FixedBytes::<32>::default());

        // verify token transfers
        // Check alice received all tokens from the bundle
        let final_alice_erc20_balance = mock_erc20_b.balanceOf(test.alice.address()).call().await?;

        let alice_erc721_owner = mock_erc721_b.ownerOf(1.try_into()?).call().await?;

        let final_alice_erc1155_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        // Check bob received the ERC721 token
        let bob_token_owner = mock_erc721_a.ownerOf(1.try_into()?).call().await?;

        // Verify alice received the bundle
        assert_eq!(
            final_alice_erc20_balance - initial_alice_erc20_balance,
            20.try_into()?,
            "Alice should have received ERC20 tokens"
        );
        assert_eq!(
            alice_erc721_owner,
            test.alice.address(),
            "Alice should have received the ERC721 token from bundle"
        );
        assert_eq!(
            final_alice_erc1155_balance - initial_alice_erc1155_balance,
            5.try_into()?,
            "Alice should have received ERC1155 tokens"
        );

        // Verify bob received the ERC721
        assert_eq!(
            bob_token_owner,
            test.bob.address(),
            "Bob should have received the ERC721 token"
        );

        Ok(())
    }
}
