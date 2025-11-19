use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::signers::local::PrivateKeySigner;
use alloy::sol_types::SolValue as _;

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts;
use crate::extensions::AlkahestExtension;
use crate::extensions::ContractModule;
use crate::types::WalletProvider;
use crate::types::{
    ApprovalPurpose, ArbiterData, DecodedAttestation, Erc20Data, Erc721Data, Erc1155Data,
    TokenBundleData,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Erc1155Addresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
}

/// Client for interacting with ERC1155 token trading and escrow functionality.
///
/// This client provides methods for:
/// - Trading ERC1155 tokens for other ERC1155, ERC20, and ERC721 tokens
/// - Creating escrow arrangements with custom demands
/// - Managing token approvals
/// - Collecting payments from fulfilled trades
#[derive(Clone)]
pub struct Erc1155Module {
    signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: Erc1155Addresses,
}

impl Default for Erc1155Addresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.erc1155_addresses
    }
}

/// Available contracts in the ERC1155 module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Erc1155Contract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Barter utilities contract for ERC1155 tokens
    BarterUtils,
    /// Escrow obligation contract for ERC1155 tokens
    EscrowObligation,
    /// Payment obligation contract for ERC1155 tokens
    PaymentObligation,
}

impl ContractModule for Erc1155Module {
    type Contract = Erc1155Contract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            Erc1155Contract::Eas => self.addresses.eas,
            Erc1155Contract::BarterUtils => self.addresses.barter_utils,
            Erc1155Contract::EscrowObligation => self.addresses.escrow_obligation,
            Erc1155Contract::PaymentObligation => self.addresses.payment_obligation,
        }
    }
}

impl Erc1155Module {
    /// Creates a new Erc1155Module instance.
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
        addresses: Option<Erc1155Addresses>,
    ) -> eyre::Result<Self> {
        Ok(Erc1155Module {
            signer,
            wallet_provider,

            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Decodes ERC1155EscrowObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::ERC1155EscrowObligation::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::ERC1155EscrowObligation::ObligationData> {
        let obligation_data =
            contracts::ERC1155EscrowObligation::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    /// Decodes ERC1155PaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    ///
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    ///
    /// * `eyre::Result<contracts::ERC1155PaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_payment_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::ERC1155PaymentObligation::ObligationData> {
        let obligation_data =
            contracts::ERC1155PaymentObligation::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    pub async fn get_escrow_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::ERC1155EscrowObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::ERC1155EscrowObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub async fn get_payment_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::ERC1155PaymentObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::ERC1155PaymentObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Approves all tokens from a contract for trading.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC1155 contract address
    /// * `purpose` - Whether the approval is for payment or escrow
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc1155_contract = contracts::IERC1155::new(token_contract, &self.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let receipt = erc1155_contract
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
    /// * `token_contract` - The ERC1155 contract address
    /// * `purpose` - Whether to revoke payment or escrow approval
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn revoke_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc1155_contract = contracts::IERC1155::new(token_contract, &self.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.addresses.escrow_obligation,
            ApprovalPurpose::Payment => self.addresses.payment_obligation,
        };

        let receipt = erc1155_contract
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
        let escrow_contract = contracts::ERC1155EscrowObligation::new(
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
        let escrow_contract = contracts::ERC1155EscrowObligation::new(
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

    /// Creates an escrow arrangement with ERC1155 tokens for a custom demand.
    ///
    /// # Arguments
    /// * `price` - The ERC1155 token data for payment
    /// * `item` - The arbiter and demand data
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_with_erc1155(
        &self,
        price: &Erc1155Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract = contracts::ERC1155EscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_obligation_contract
            .doObligation(
                contracts::ERC1155EscrowObligation::ObligationData {
                    token: price.address,
                    tokenId: price.id,
                    amount: price.value,
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

    /// Makes a direct payment with ERC1155 tokens.
    ///
    /// # Arguments
    /// * `price` - The ERC1155 token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_with_erc1155(
        &self,
        price: &Erc1155Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::ERC1155PaymentObligation::new(
            self.addresses.payment_obligation,
            &self.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(contracts::ERC1155PaymentObligation::ObligationData {
                token: price.address,
                tokenId: price.id,
                amount: price.value,
                payee,
            })
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC1155 tokens for other ERC1155 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC1155 token data being offered
    /// * `ask` - The ERC1155 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc1155_for_erc1155(
        &self,
        bid: &Erc1155Data,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::ERC1155BarterUtils::new(self.addresses.barter_utils, &self.wallet_provider);

        let receipt = barter_utils_contract
            .buyErc1155ForErc1155(
                bid.address,
                bid.id,
                bid.value,
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

    /// Fulfills an existing ERC1155-for-ERC1155 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc1155_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::ERC1155BarterUtils::new(self.addresses.barter_utils, &self.wallet_provider);

        let receipt = barter_utils_contract
            .payErc1155ForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC1155 tokens for ERC20 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC1155 token data being offered
    /// * `ask` - The ERC20 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc20_with_erc1155(
        &self,
        bid: &Erc1155Data,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyErc20WithErc1155(
                bid.address,
                bid.id,
                bid.value,
                ask.address,
                ask.value,
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC1155-for-ERC20 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc1155_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc1155ForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC1155 tokens for ERC721 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC1155 token data being offered
    /// * `ask` - The ERC721 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc721_with_erc1155(
        &self,
        bid: &Erc1155Data,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyErc721WithErc1155(
                bid.address,
                bid.id,
                bid.value,
                ask.address,
                ask.id,
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC1155-for-ERC721 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc1155_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc1155ForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC1155 tokens for a bundle of tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC1155 token data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_with_erc1155(
        &self,
        bid: &Erc1155Data,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .buyBundleWithErc1155(
                bid.address,
                bid.id,
                bid.value,
                (ask, self.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC1155-for-bundle trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc1155_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract =
            contracts::erc1155_barter_cross_token::ERC1155BarterCrossToken::new(
                self.addresses.barter_utils,
                &self.wallet_provider,
            );

        let receipt = barter_utils_contract
            .payErc1155ForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}

impl AlkahestExtension for Erc1155Module {
    type Config = Erc1155Addresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: crate::types::ProviderContext,
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

    use super::Erc1155Module;
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
        let token_address = test.mock_addresses.erc1155_a;
        let id: U256 = 1.try_into()?;
        let amount: U256 = 10.try_into()?;
        let arbiter = test.addresses.erc1155_addresses.payment_obligation;
        let demand = Bytes::from(vec![1, 2, 3, 4]); // sample demand data

        let escrow_data = crate::contracts::ERC1155EscrowObligation::ObligationData {
            token: token_address,
            tokenId: id,
            amount,
            arbiter,
            demand: demand.clone(),
        };

        // Encode the data
        let encoded = escrow_data.abi_encode();

        // Decode the data
        let decoded = Erc1155Module::decode_escrow_obligation(&encoded.into())?;

        // Verify decoded data
        assert_eq!(decoded.token, token_address, "Token address should match");
        assert_eq!(decoded.tokenId, id, "ID should match");
        assert_eq!(decoded.amount, amount, "Amount should match");
        assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
        assert_eq!(decoded.demand, demand, "Demand should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_decode_payment_obligation() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // Create sample obligation data
        let token_address = test.mock_addresses.erc1155_a;
        let id: U256 = 1.try_into()?;
        let amount: U256 = 10.try_into()?;
        let payee = test.alice.address();

        let payment_data = crate::contracts::ERC1155PaymentObligation::ObligationData {
            token: token_address,
            tokenId: id,
            amount,
            payee,
        };

        // Encode the data
        let encoded = payment_data.abi_encode();

        // Decode the data
        let decoded = Erc1155Module::decode_payment_obligation(&encoded.into())?;

        // Verify decoded data
        assert_eq!(decoded.token, token_address, "Token address should match");
        assert_eq!(decoded.tokenId, id, "ID should match");
        assert_eq!(decoded.amount, amount, "Amount should match");
        assert_eq!(decoded.payee, payee, "Payee should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_approve_all() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // Test approve_all for payment
        let _receipt = test
            .alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Verify approval for payment obligation
        let payment_approved = mock_erc1155_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc1155_addresses.clone().payment_obligation,
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
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // Verify approval for escrow obligation
        let escrow_approved = mock_erc1155_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc1155_addresses.escrow_obligation,
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

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // First approve all
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Then revoke all
        let _receipt = test
            .alice_client
            .erc1155()
            .revoke_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Verify revocation
        let payment_approved = mock_erc1155_a
            .isApprovedForAll(
                test.alice.address(),
                test.addresses.erc1155_addresses.clone().payment_obligation,
            )
            .call()
            .await?;

        assert!(!payment_approved, "Payment approval should be revoked");

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_with_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };

        // Create custom arbiter data
        let arbiter = test.addresses.erc1155_addresses.clone().payment_obligation;
        let demand = Bytes::from(b"custom demand data");
        let item = ArbiterData { arbiter, demand };

        // approve tokens for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // alice creates escrow with custom demand
        let receipt = test
            .alice_client
            .erc1155()
            .buy_with_erc1155(&price, &item, 0)
            .await?;

        // Verify escrow happened - check alice's balance decreased
        let alice_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        // Check escrow contract's balance increased
        let escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses.erc1155_addresses.escrow_obligation,
                1.try_into()?,
            )
            .call()
            .await?;

        // token in escrow
        assert_eq!(
            alice_balance,
            5.try_into()?,
            "Alice should have 5 tokens remaining"
        );
        assert_eq!(escrow_balance, 5.try_into()?, "Escrow should have 5 tokens");

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_with_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        let price = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };

        // approve tokens for payment
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Check initial balances
        let initial_bob_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // alice makes direct payment to bob
        let receipt = test
            .alice_client
            .erc1155()
            .pay_with_erc1155(&price, test.bob.address())
            .await?;

        // Verify payment happened
        let final_bob_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // tokens paid to bob
        assert_eq!(
            final_bob_balance - initial_bob_balance,
            5.try_into()?,
            "Bob should have received 5 tokens"
        );

        // payment obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc1155_for_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };
        let ask = Erc1155Data {
            address: test.mock_addresses.erc1155_b,
            id: 2.try_into()?,
            value: 3.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // alice makes escrow
        let receipt = test
            .alice_client
            .erc1155()
            .buy_erc1155_for_erc1155(&bid, &ask, 0)
            .await?;

        // verify escrow
        let escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses.erc1155_addresses.escrow_obligation,
                1.try_into()?,
            )
            .call()
            .await?;

        assert_eq!(
            escrow_balance,
            5.try_into()?,
            "5 tokens should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc1155_for_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice and bob
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        let mock_erc1155_b = MockERC1155::new(test.mock_addresses.erc1155_b, &test.god_provider);
        mock_erc1155_b
            .mint(test.bob.address(), 2.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };
        let ask = Erc1155Data {
            address: test.mock_addresses.erc1155_b,
            id: 2.try_into()?,
            value: 3.try_into()?,
        };

        // alice approves token for escrow and creates buy attestation
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .alice_client
            .erc1155()
            .buy_erc1155_for_erc1155(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // bob approves token for payment
        test.bob_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_b, ApprovalPurpose::Payment)
            .await?;

        // Check initial balances
        let initial_alice_balance_b = mock_erc1155_b
            .balanceOf(test.alice.address(), 2.try_into()?)
            .call()
            .await?;
        let initial_bob_balance_a = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // bob fulfills the buy attestation
        let _sell_receipt = test
            .bob_client
            .erc1155()
            .pay_erc1155_for_erc1155(buy_attestation)
            .await?;

        // verify token transfers
        let final_alice_balance_b = mock_erc1155_b
            .balanceOf(test.alice.address(), 2.try_into()?)
            .call()
            .await?;
        let final_bob_balance_a = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // both sides received the tokens
        assert_eq!(
            final_alice_balance_b - initial_alice_balance_b,
            3.try_into()?,
            "Alice should have received 3 tokens B"
        );
        assert_eq!(
            final_bob_balance_a - initial_bob_balance_a,
            5.try_into()?,
            "Bob should have received 5 tokens A"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_collect_expired() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };
        let ask = Erc1155Data {
            address: test.mock_addresses.erc1155_b,
            id: 2.try_into()?,
            value: 3.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // Check initial balance
        let initial_alice_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        // alice makes escrow with a short expiration
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 10;
        let receipt = test
            .alice_client
            .erc1155()
            .buy_erc1155_for_erc1155(&bid, &ask, expiration as u64 + 1)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(receipt)?.uid;

        // Wait for expiration
        test.god_provider.anvil_increase_time(20).await?;

        // alice collects expired funds
        let _collect_receipt = test
            .alice_client
            .erc1155()
            .reclaim_expired(buy_attestation)
            .await?;

        // verify tokens returned to alice
        let final_alice_balance = mock_erc1155_a
            .balanceOf(test.alice.address(), 1.try_into()?)
            .call()
            .await?;

        assert_eq!(
            final_alice_balance, initial_alice_balance,
            "All tokens should be returned to Alice"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc20_with_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };
        let ask = Erc20Data {
            address: test.mock_addresses.erc20_a,
            value: 100.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc1155()
            .buy_erc20_with_erc1155(&bid, &ask, 0)
            .await?;

        // Verify escrow happened
        let escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses.erc1155_addresses.escrow_obligation,
                1.try_into()?,
            )
            .call()
            .await?;

        assert_eq!(
            escrow_balance,
            5.try_into()?,
            "5 tokens should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_erc721_with_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };
        let ask = Erc721Data {
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };

        // alice approves token for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc1155()
            .buy_erc721_with_erc1155(&bid, &ask, 0)
            .await?;

        // Verify escrow happened
        let escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses.erc1155_addresses.escrow_obligation,
                1.try_into()?,
            )
            .call()
            .await?;

        assert_eq!(
            escrow_balance,
            5.try_into()?,
            "5 tokens should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_buy_bundle_with_erc1155() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // Create exchange information
        let bid = Erc1155Data {
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
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
                address: test.mock_addresses.erc1155_b,
                id: 3.try_into()?,
                value: 4.try_into()?,
            }],
        };

        // alice approves token for escrow
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Escrow)
            .await?;

        // alice creates purchase offer
        let receipt = test
            .alice_client
            .erc1155()
            .buy_bundle_with_erc1155(&bid, &bundle, 0)
            .await?;

        // Verify escrow happened
        let escrow_balance = mock_erc1155_a
            .balanceOf(
                test.addresses.erc1155_addresses.escrow_obligation,
                1.try_into()?,
            )
            .call()
            .await?;

        assert_eq!(
            escrow_balance,
            5.try_into()?,
            "5 tokens should be in escrow"
        );

        // escrow obligation made
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;
        assert_ne!(attested_event.uid, FixedBytes::<32>::default());

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc1155_for_erc20() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
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
        let ask = Erc1155Data {
            // bob asks for alice's ERC1155
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };

        // bob approves tokens for escrow and creates buy attestation
        test.bob_client
            .erc20()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .bob_client
            .erc20()
            .buy_erc1155_for_erc20(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her ERC1155 tokens for payment
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Check initial balances
        let initial_alice_erc20_balance =
            mock_erc20_a.balanceOf(test.alice.address()).call().await?;

        let initial_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // alice fulfills bob's buy attestation with her ERC1155
        let _sell_receipt = test
            .alice_client
            .erc1155()
            .pay_erc1155_for_erc20(buy_attestation)
            .await?;

        // verify token transfers
        let final_alice_erc20_balance = mock_erc20_a.balanceOf(test.alice.address()).call().await?;

        let final_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // both sides received the tokens
        assert_eq!(
            final_alice_erc20_balance - initial_alice_erc20_balance,
            100.try_into()?,
            "Alice should have received ERC20 tokens"
        );
        assert_eq!(
            final_bob_erc1155_balance - initial_bob_erc1155_balance,
            5.try_into()?,
            "Bob should have received the ERC1155 tokens"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc1155_for_erc721() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // mint an ERC721 token to bob
        let mock_erc721_a = MockERC721::new(test.mock_addresses.erc721_a, &test.god_provider);
        mock_erc721_a
            .mint(test.bob.address())
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        let bid = Erc721Data {
            // bob's bid
            address: test.mock_addresses.erc721_a,
            id: 1.try_into()?,
        };
        let ask = Erc1155Data {
            // bob asks for alice's ERC1155
            address: test.mock_addresses.erc1155_a,
            id: 1.try_into()?,
            value: 5.try_into()?,
        };

        // bob approves tokens for escrow and creates buy attestation
        test.bob_client
            .erc721()
            .approve(&bid, ApprovalPurpose::Escrow)
            .await?;

        let buy_receipt = test
            .bob_client
            .erc721()
            .buy_erc1155_with_erc721(&bid, &ask, 0)
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her ERC1155 tokens for payment
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // Check initial ERC1155 balance for bob
        let initial_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // alice fulfills bob's buy attestation with her ERC1155
        let _sell_receipt = test
            .alice_client
            .erc1155()
            .pay_erc1155_for_erc721(buy_attestation)
            .await?;

        // verify token transfers
        let alice_now_owns_erc721 = mock_erc721_a.ownerOf(1.try_into()?).call().await?;
        let final_bob_erc1155_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

        // both sides received the tokens
        assert_eq!(
            alice_now_owns_erc721,
            test.alice.address(),
            "Alice should have received the ERC721 token"
        );
        assert_eq!(
            final_bob_erc1155_balance - initial_bob_erc1155_balance,
            5.try_into()?,
            "Bob should have received the ERC1155 tokens"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_pay_erc1155_for_bundle() -> eyre::Result<()> {
        // test setup
        let test = setup_test_environment().await?;

        // mint ERC1155 tokens to alice (she will fulfill with these)
        let mock_erc1155_a = MockERC1155::new(test.mock_addresses.erc1155_a, &test.god_provider);
        mock_erc1155_a
            .mint(test.alice.address(), 1.try_into()?, 10.try_into()?)
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
        let mock_erc1155_b = MockERC1155::new(test.mock_addresses.erc1155_b, &test.god_provider);
        mock_erc1155_b
            .mint(test.bob.address(), 3.try_into()?, 4.try_into()?)
            .send()
            .await?
            .get_receipt()
            .await?;

        // begin test
        // Check balances before the exchange
        let initial_alice_erc20_balance =
            mock_erc20_b.balanceOf(test.alice.address()).call().await?;
        let initial_alice_erc1155b_balance = mock_erc1155_b
            .balanceOf(test.alice.address(), 3.try_into()?)
            .call()
            .await?;
        let initial_bob_erc1155a_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
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
                address: test.mock_addresses.erc1155_b,
                id: 3.try_into()?,
                value: 4.try_into()?,
            }],
        };

        // Create the ERC1155 payment obligation data as the demand
        let payment_obligation_data = crate::contracts::ERC1155PaymentObligation::ObligationData {
            token: test.mock_addresses.erc1155_a,
            tokenId: 1.try_into()?,
            amount: 5.try_into()?,
            payee: test.bob.address(),
        };

        // bob approves all tokens for the bundle escrow
        test.bob_client
            .token_bundle()
            .approve(&bundle, ApprovalPurpose::Escrow)
            .await?;

        // bob creates bundle escrow demanding ERC1155 from Alice
        let buy_receipt = test
            .bob_client
            .token_bundle()
            .buy_with_bundle(
                &bundle,
                &ArbiterData {
                    arbiter: test.addresses.erc1155_addresses.payment_obligation,
                    demand: payment_obligation_data.abi_encode().into(),
                },
                0,
            )
            .await?;

        let buy_attestation = DefaultAlkahestClient::get_attested_event(buy_receipt)?.uid;

        // alice approves her ERC1155 for payment
        test.alice_client
            .erc1155()
            .approve_all(test.mock_addresses.erc1155_a, ApprovalPurpose::Payment)
            .await?;

        // alice fulfills bob's buy attestation with her ERC1155
        let pay_receipt = test
            .alice_client
            .erc1155()
            .pay_erc1155_for_bundle(buy_attestation)
            .await?;

        // Verify the payment attestation was created
        let pay_attestation = DefaultAlkahestClient::get_attested_event(pay_receipt)?;
        assert_ne!(pay_attestation.uid, FixedBytes::<32>::default());

        // verify token transfers
        // Check alice received all tokens from the bundle
        let final_alice_erc20_balance = mock_erc20_b.balanceOf(test.alice.address()).call().await?;

        let alice_erc721_owner = mock_erc721_b.ownerOf(1.try_into()?).call().await?;

        let final_alice_erc1155b_balance = mock_erc1155_b
            .balanceOf(test.alice.address(), 3.try_into()?)
            .call()
            .await?;

        // Check bob received the ERC1155 tokens
        let final_bob_erc1155a_balance = mock_erc1155_a
            .balanceOf(test.bob.address(), 1.try_into()?)
            .call()
            .await?;

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
            final_alice_erc1155b_balance - initial_alice_erc1155b_balance,
            4.try_into()?,
            "Alice should have received ERC1155 tokens"
        );

        // Verify bob received the ERC1155
        assert_eq!(
            final_bob_erc1155a_balance - initial_bob_erc1155a_balance,
            5.try_into()?,
            "Bob should have received the ERC1155 tokens"
        );

        Ok(())
    }
}
