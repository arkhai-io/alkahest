//! ERC20 barter utilities.
//!
//! These helpers settle existing escrows atomically by paying with ERC20
//! tokens. Create escrows through the ERC20 escrow client.

use alloy::primitives::{Bytes, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::Erc20Data;

use super::Erc20Module;

/// Barter utilities API for ERC20 token payments.
pub struct BarterUtils<'a> {
    module: &'a Erc20Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

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

    pub async fn permit_and_pay_erc20_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self
            .erc20_payment_demand_for_erc20_escrow(buy_attestation)
            .await?;
        let permit = self.get_payment_permit(&demand).await?;
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc20(
                buy_attestation,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

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

    pub async fn permit_and_pay_erc20_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self
            .erc20_payment_demand_for_erc721_escrow(buy_attestation)
            .await?;
        let permit = self.get_payment_permit(&demand).await?;
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc721(
                buy_attestation,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

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

    pub async fn permit_and_pay_erc20_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self
            .erc20_payment_demand_for_erc1155_escrow(buy_attestation)
            .await?;
        let permit = self.get_payment_permit(&demand).await?;
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayErc20ForErc1155(
                buy_attestation,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

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

    pub async fn permit_and_pay_erc20_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self
            .erc20_payment_demand_for_token_bundle_escrow(buy_attestation)
            .await?;
        let permit = self.get_payment_permit(&demand).await?;
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayErc20ForBundle(
                buy_attestation,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

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

    pub async fn permit_and_pay_erc20_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self
            .erc20_payment_demand_for_native_token_escrow(buy_attestation)
            .await?;
        let permit = self.get_payment_permit(&demand).await?;
        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayErc20ForEth(
                buy_attestation,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
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

    fn erc20_payment_demand_from_demand_bytes(&self, demand: &[u8]) -> eyre::Result<Erc20Data> {
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(demand)?;

        Ok(Erc20Data {
            address: demand_data.token,
            value: demand_data.amount,
        })
    }

    async fn erc20_payment_demand_for_erc20_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Erc20Data> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC20EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.erc20_payment_demand_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn erc20_payment_demand_for_erc721_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Erc20Data> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC721EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.erc20_payment_demand_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn erc20_payment_demand_for_erc1155_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Erc20Data> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::ERC1155EscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.erc20_payment_demand_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn erc20_payment_demand_for_token_bundle_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Erc20Data> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.erc20_payment_demand_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn erc20_payment_demand_for_native_token_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<Erc20Data> {
        let escrow_data =
            contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation::ObligationData::abi_decode(
                self.escrow_attestation_data(buy_attestation).await?.as_ref(),
            )?;

        self.erc20_payment_demand_from_demand_bytes(escrow_data.demand.as_ref())
    }

    async fn get_payment_permit(&self, payment: &Erc20Data) -> eyre::Result<PaymentPermit> {
        let util = self.module.util();
        let deadline = super::util::Util::get_permit_deadline()?;
        let permit = util
            .get_permit_signature(
                self.module.addresses.barter_utils,
                payment,
                U256::from(deadline),
            )
            .await?;

        Ok(PaymentPermit {
            deadline: U256::from(deadline),
            v: 27 + permit.v() as u8,
            r: permit.r().into(),
            s: permit.s().into(),
        })
    }
}

struct PaymentPermit {
    deadline: U256,
    v: u8,
    r: FixedBytes<32>,
    s: FixedBytes<32>,
}
