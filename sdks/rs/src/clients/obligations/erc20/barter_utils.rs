//! ERC20 barter utilities
//!
//! Provides functionality for trading ERC20 tokens for other token types
//! including ERC20, ERC721, ERC1155, and token bundles.

use alloy::primitives::{FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{Erc20Data, Erc721Data, Erc1155Data, TokenBundleData};

use super::Erc20Module;

/// Barter utilities API for ERC20 tokens
pub struct BarterUtils<'a> {
    module: &'a Erc20Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

    // =========================================================================
    // ERC20 for ERC20
    // =========================================================================

    /// Creates an escrow to trade ERC20 tokens for other ERC20 tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC20 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc20_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc20ForErc20(bid.address, bid.value, ask.address, ask.value, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC20 tokens for other ERC20 tokens using permit signature.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC20 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_buy_erc20_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;

        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                bid,
                U256::from(deadline),
            )
            .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndBuyErc20ForErc20(
                bid.address,
                bid.value,
                ask.address,
                ask.value,
                expiration,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC20-for-ERC20 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc20_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc20ForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC20-for-ERC20 trade escrow using permit signature.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay_erc20_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;
        let buy_attestation_data =
            contracts::obligations::escrow::non_tierable::ERC20EscrowObligation::ObligationData::abi_decode(
                buy_attestation_data.data.as_ref(),
            )?;
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                buy_attestation_data.demand.as_ref(),
            )?;

        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                &Erc20Data {
                    address: demand_data.token,
                    value: demand_data.amount,
                },
                U256::from(deadline),
            )
            .await?;

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc20(
                buy_attestation,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC20 for ERC721
    // =========================================================================

    /// Creates an escrow to trade ERC20 tokens for an ERC721 token.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC721 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc721_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc721WithErc20(bid.address, bid.value, ask.address, ask.id, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC20 tokens for ERC721 tokens using permit signature.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC721 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_buy_erc721_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                bid,
                U256::from(deadline),
            )
            .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndBuyErc721WithErc20(
                bid.address,
                bid.value,
                ask.address,
                ask.id,
                expiration,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
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
    pub async fn pay_erc20_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc20ForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC20 trade escrow using permit signature.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay_erc20_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;
        let buy_attestation_data =
            contracts::obligations::escrow::non_tierable::ERC721EscrowObligation::ObligationData::abi_decode(
                buy_attestation_data.data.as_ref(),
            )?;
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                buy_attestation_data.demand.as_ref(),
            )?;

        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                &Erc20Data {
                    address: demand_data.token,
                    value: demand_data.amount,
                },
                U256::from(deadline),
            )
            .await?;

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc721(
                buy_attestation,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC20 for ERC1155
    // =========================================================================

    /// Creates an escrow to trade ERC20 tokens for an ERC1155 token.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC1155 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_erc1155_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc1155WithErc20(
                bid.address,
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

    /// Creates an escrow to trade ERC20 tokens for ERC1155 tokens using permit signature.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The ERC1155 token data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_buy_erc1155_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                bid,
                U256::from(deadline),
            )
            .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndBuyErc1155WithErc20(
                bid.address,
                bid.value,
                ask.address,
                ask.id,
                ask.value,
                expiration,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
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
    pub async fn pay_erc20_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc20ForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC1155-for-ERC20 trade escrow using permit signature.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay_erc20_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;
        let buy_attestation_data =
            contracts::obligations::escrow::non_tierable::ERC1155EscrowObligation::ObligationData::abi_decode(
                buy_attestation_data.data.as_ref(),
            )?;
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                buy_attestation_data.demand.as_ref(),
            )?;

        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                &Erc20Data {
                    address: demand_data.token,
                    value: demand_data.amount,
                },
                U256::from(deadline),
            )
            .await?;

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc1155(
                buy_attestation,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC20 for Token Bundle
    // =========================================================================

    /// Creates an escrow to trade ERC20 tokens for a bundle of tokens.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyBundleWithErc20(
                bid.address,
                bid.value,
                (ask, self.module.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow to trade ERC20 tokens for a bundle of tokens using permit signature.
    ///
    /// # Arguments
    /// * `bid` - The ERC20 token data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_buy_bundle_for_erc20(
        &self,
        bid: &Erc20Data,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                bid,
                U256::from(deadline),
            )
            .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndBuyBundleWithErc20(
                bid.address,
                bid.value,
                (ask, self.module.signer.address()).into(),
                expiration,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing bundle-for-ERC20 trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc20_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc20ForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing bundle-for-ERC20 trade escrow using permit signature.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay_erc20_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;
        let buy_attestation_data =
            contracts::obligations::escrow::non_tierable::TokenBundleEscrowObligation::ObligationData::abi_decode(
                buy_attestation_data.data.as_ref(),
            )?;
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                buy_attestation_data.demand.as_ref(),
            )?;

        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                &Erc20Data {
                    address: demand_data.token,
                    value: demand_data.amount,
                },
                U256::from(deadline),
            )
            .await?;

        let receipt = barter_utils_contract
            .permitAndPayErc20ForBundle(
                buy_attestation,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC20 for Native Token (ETH)
    // =========================================================================

    /// Fulfills an existing native-token-for-ERC20 trade escrow by paying with ERC20.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order (native token escrow)
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay_erc20_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc20ForEth(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing native-token-for-ERC20 trade escrow using permit signature.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order (native token escrow)
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay_erc20_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;
        let buy_attestation_data =
            contracts::obligations::escrow::non_tierable::NativeTokenEscrowObligation::ObligationData::abi_decode(
                buy_attestation_data.data.as_ref(),
            )?;
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                buy_attestation_data.demand.as_ref(),
            )?;

        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                &Erc20Data {
                    address: demand_data.token,
                    value: demand_data.amount,
                },
                U256::from(deadline),
            )
            .await?;

        let receipt = barter_utils_contract
            .permitAndPayErc20ForEth(
                buy_attestation,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
