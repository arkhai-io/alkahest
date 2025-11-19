use alloy::rpc::types::TransactionReceipt;
use alloy::signers::local::PrivateKeySigner;
use alloy::{
    primitives::{Address, Bytes, FixedBytes, U256},
    sol_types::SolValue,
};

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts;
use crate::extensions::AlkahestExtension;
use crate::extensions::ContractModule;
use crate::types::{
    ArbiterData, DecodedAttestation, Erc20Data, Erc721Data, Erc1155Data, TokenBundleData,
};
use crate::types::{ProviderContext, WalletProvider};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NativeTokenAddresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
}

/// Client for interacting with native token (ETH) trading and escrow functionality.
///
/// This client provides methods for:
/// - Trading native tokens for other tokens (ERC20, ERC721, ERC1155)
/// - Creating escrow arrangements with custom demands
/// - Managing direct native token payments
/// - Collecting payments from fulfilled trades
#[derive(Clone)]
pub struct NativeTokenModule {
    signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: NativeTokenAddresses,
}

impl Default for NativeTokenAddresses {
    fn default() -> Self {
        NativeTokenAddresses {
            eas: BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas,
            barter_utils: Address::ZERO, // TODO: Add actual address when deployed
            escrow_obligation: Address::ZERO, // TODO: Add actual address when deployed
            payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
        }
    }
}

/// Data structure for native token amounts
#[derive(Debug, Clone)]
pub struct NativeTokenData {
    pub value: U256,
}

/// Available contracts in the Native Token module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum NativeTokenContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Barter utilities contract for native tokens
    BarterUtils,
    /// Escrow obligation contract for native tokens
    EscrowObligation,
    /// Payment obligation contract for native tokens
    PaymentObligation,
}

impl ContractModule for NativeTokenModule {
    type Contract = NativeTokenContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            NativeTokenContract::Eas => self.addresses.eas,
            NativeTokenContract::BarterUtils => self.addresses.barter_utils,
            NativeTokenContract::EscrowObligation => self.addresses.escrow_obligation,
            NativeTokenContract::PaymentObligation => self.addresses.payment_obligation,
        }
    }
}

impl NativeTokenModule {
    /// Creates a new NativeTokenModule instance.
    ///
    /// # Arguments
    /// * `signer` - The private key for signing transactions
    /// * `wallet_provider` - The wallet provider for transactions
    /// * `addresses` - Optional custom contract addresses, uses defaults if None
    ///
    /// # Returns
    /// * `Result<Self>` - The initialized client instance
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: WalletProvider,
        addresses: Option<NativeTokenAddresses>,
    ) -> eyre::Result<Self> {
        Ok(NativeTokenModule {
            signer,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Decodes NativeTokenEscrowObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::NativeTokenEscrowObligation::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::NativeTokenEscrowObligation::ObligationData> {
        let obligation_data =
            contracts::NativeTokenEscrowObligation::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    /// Decodes NativeTokenPaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `eyre::Result<contracts::NativeTokenPaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_payment_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::NativeTokenPaymentObligation::ObligationData> {
        let obligation_data =
            contracts::NativeTokenPaymentObligation::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    pub async fn get_escrow_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::NativeTokenEscrowObligation::ObligationData>>
    {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::NativeTokenEscrowObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub async fn get_payment_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::NativeTokenPaymentObligation::ObligationData>>
    {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::NativeTokenPaymentObligation::ObligationData::abi_decode(&attestation.data)?;

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
        let escrow_contract = contracts::NativeTokenEscrowObligation::new(
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
        let escrow_contract = contracts::NativeTokenEscrowObligation::new(
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

    /// Creates an escrow arrangement with native tokens for a custom demand.
    ///
    /// # Arguments
    /// * `price` - The native token data for payment
    /// * `item` - The arbiter and demand data
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_with_native_token(
        &self,
        price: &NativeTokenData,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract = contracts::NativeTokenEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_obligation_contract
            .doObligation(
                contracts::NativeTokenEscrowObligation::ObligationData {
                    arbiter: item.arbiter,
                    demand: item.demand.clone(),
                    amount: price.value,
                },
                expiration,
            )
            .value(price.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Makes a direct payment with native tokens.
    ///
    /// # Arguments
    /// * `price` - The native token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_with_native_token(
        &self,
        price: &NativeTokenData,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::NativeTokenPaymentObligation::new(
            self.addresses.payment_obligation,
            &self.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(contracts::NativeTokenPaymentObligation::ObligationData {
                amount: price.value,
                payee,
            })
            .value(price.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade native tokens for other native tokens.
    ///
    /// # Arguments
    /// * `bid` - The native token data being offered
    /// * `ask` - The native token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_native_for_native(
        &self,
        bid: &NativeTokenData,
        ask: &NativeTokenData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );
        let receipt = barter_utils_contract
            .buyEthForEth(bid.value, ask.value, expiration)
            .value(bid.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing native-for-native trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_native_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payEthForEth(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade native tokens for ERC20 tokens.
    ///
    /// # Arguments
    /// * `bid` - The native token data being offered
    /// * `ask` - The ERC20 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc20_for_native(
        &self,
        bid: &NativeTokenData,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc20WithEth(bid.value, ask.address, ask.value, expiration)
            .value(bid.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC20-for-native trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_native_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payEthForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade native tokens for an ERC721 token.
    ///
    /// # Arguments
    /// * `bid` - The native token data being offered
    /// * `ask` - The ERC721 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc721_for_native(
        &self,
        bid: &NativeTokenData,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc721WithEth(bid.value, ask.address, ask.id, expiration)
            .value(bid.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-native trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_native_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payEthForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade native tokens for an ERC1155 token.
    ///
    /// # Arguments
    /// * `bid` - The native token data being offered
    /// * `ask` - The ERC1155 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc1155_for_native(
        &self,
        bid: &NativeTokenData,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc1155WithEth(bid.value, ask.address, ask.id, ask.value, expiration)
            .value(bid.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC1155-for-native trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_native_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payEthForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade native tokens for a bundle of tokens.
    ///
    /// # Arguments
    /// * `bid` - The native token data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_for_native(
        &self,
        bid: &NativeTokenData,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyBundleWithEth(bid.value, (ask, self.signer.address()).into(), expiration)
            .value(bid.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing bundle-for-native trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_native_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::NativeTokenBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payEthForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}

impl AlkahestExtension for NativeTokenModule {
    type Config = NativeTokenAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, (*providers.wallet).clone(), config)
    }
}
