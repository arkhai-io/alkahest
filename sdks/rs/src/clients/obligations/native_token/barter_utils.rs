//! Native token atomic payment utilities.

use alloy::primitives::{Bytes, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::{sol, sol_types::SolValue};

use crate::contracts;

use super::NativeTokenModule;

sol! {
    #[sol(rpc)]
    contract EscrowConditionDecoder {
        function decodeCondition(bytes data) external view returns (address arbiter, bytes demand);
    }
}

pub struct BarterUtils<'a> {
    module: &'a NativeTokenModule,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a NativeTokenModule) -> Self {
        Self { module }
    }

    pub async fn pay_native_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let amount = self.native_payment_amount(escrow_uid).await?;
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .payNativeAndCollect(escrow_uid)
            .value(amount)
            .send()
            .await?
            .get_receipt()
            .await?)
    }

    async fn native_payment_amount(&self, escrow_uid: FixedBytes<32>) -> eyre::Result<U256> {
        let eas = contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let escrow = eas.getAttestation(escrow_uid).call().await?;
        let decoder = EscrowConditionDecoder::new(escrow.attester, &self.module.wallet_provider);
        let decoded = decoder.decodeCondition(escrow.data).call().await?;
        self.native_payment_amount_from_demand_bytes(&decoded.demand)
    }

    fn native_payment_amount_from_demand_bytes(&self, demand: &Bytes) -> eyre::Result<U256> {
        let demand_data =
            contracts::obligations::NativeTokenPaymentObligation::ObligationData::abi_decode(demand)?;
        Ok(demand_data.amount)
    }
}
