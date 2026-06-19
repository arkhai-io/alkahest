//! Native token barter utilities.
//!
//! These helpers settle existing escrows atomically by paying with native
//! tokens. Create escrows through the native token escrow client.

use alloy::primitives::{Bytes, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;

use super::NativeTokenModule;

/// Barter utilities API for native token payments.
pub struct BarterUtils<'a> {
    module: &'a NativeTokenModule,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a NativeTokenModule) -> Self {
        Self { module }
    }

    pub async fn pay_native_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self
            .native_payment_amount_for_native_escrow(buy_attestation)
            .await?;
        let receipt = self
            .pay_with_native(buy_attestation, amount, NativePayTarget::Native)
            .await?;

        Ok(receipt)
    }

    pub async fn pay_native_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self
            .native_payment_amount_for_erc20_escrow(buy_attestation)
            .await?;
        let receipt = self
            .pay_with_native(buy_attestation, amount, NativePayTarget::Erc20)
            .await?;

        Ok(receipt)
    }

    pub async fn pay_native_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self
            .native_payment_amount_for_erc721_escrow(buy_attestation)
            .await?;
        let receipt = self
            .pay_with_native(buy_attestation, amount, NativePayTarget::Erc721)
            .await?;

        Ok(receipt)
    }

    pub async fn pay_native_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self
            .native_payment_amount_for_erc1155_escrow(buy_attestation)
            .await?;
        let receipt = self
            .pay_with_native(buy_attestation, amount, NativePayTarget::Erc1155)
            .await?;

        Ok(receipt)
    }

    pub async fn pay_native_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self
            .native_payment_amount_for_token_bundle_escrow(buy_attestation)
            .await?;
        let receipt = self
            .pay_with_native(buy_attestation, amount, NativePayTarget::Bundle)
            .await?;

        Ok(receipt)
    }

    async fn escrow_attestation_data(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Bytes> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let buy_attestation_data = eas_contract.getAttestation(buy_attestation).call().await?;

        Ok(buy_attestation_data.data)
    }

    fn native_payment_amount_from_demand_bytes(&self, demand: &[u8]) -> eyre::Result<U256> {
        let demand_data =
            contracts::obligations::NativeTokenPaymentObligation::ObligationData::abi_decode(
                demand,
            )?;

        Ok(demand_data.amount)
    }

    async fn native_payment_amount_for_native_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<U256> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.native_payment_amount_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn native_payment_amount_for_erc20_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<U256> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC20EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.native_payment_amount_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn native_payment_amount_for_erc721_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<U256> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC721EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.native_payment_amount_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn native_payment_amount_for_erc1155_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<U256> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC1155EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.native_payment_amount_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn native_payment_amount_for_token_bundle_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<U256> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.native_payment_amount_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn pay_with_native(
        &self,
        buy_attestation: FixedBytes<32>,
        amount: U256,
        target: NativePayTarget,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::NativeTokenBarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = match target {
            NativePayTarget::Native => {
                barter_utils_contract
                    .payEthForEth(buy_attestation)
                    .value(amount)
                    .send()
                    .await?
                    .get_receipt()
                    .await?
            }
            NativePayTarget::Erc20 => {
                barter_utils_contract
                    .payEthForErc20(buy_attestation)
                    .value(amount)
                    .send()
                    .await?
                    .get_receipt()
                    .await?
            }
            NativePayTarget::Erc721 => {
                barter_utils_contract
                    .payEthForErc721(buy_attestation)
                    .value(amount)
                    .send()
                    .await?
                    .get_receipt()
                    .await?
            }
            NativePayTarget::Erc1155 => {
                barter_utils_contract
                    .payEthForErc1155(buy_attestation)
                    .value(amount)
                    .send()
                    .await?
                    .get_receipt()
                    .await?
            }
            NativePayTarget::Bundle => {
                barter_utils_contract
                    .payEthForBundle(buy_attestation)
                    .value(amount)
                    .send()
                    .await?
                    .get_receipt()
                    .await?
            }
        };

        Ok(receipt)
    }
}

enum NativePayTarget {
    Native,
    Erc20,
    Erc721,
    Erc1155,
    Bundle,
}
