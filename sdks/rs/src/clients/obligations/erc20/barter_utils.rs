//! ERC20 atomic payment utilities.

use alloy::primitives::{Bytes, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::{sol, sol_types::SolValue};

use crate::contracts;
use crate::types::Erc20Data;

use super::Erc20Module;

sol! {
    #[sol(rpc)]
    contract EscrowConditionDecoder {
        function decodeCondition(bytes data) external view returns (address arbiter, bytes demand);
    }
}

pub struct BarterUtils<'a> {
    module: &'a Erc20Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

    pub async fn pay_erc20_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .payErc20AndCollect(escrow_uid)
            .send()
            .await?
            .get_receipt()
            .await?)
    }

    pub async fn permit_and_pay_erc20_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let demand = self.erc20_payment_demand(escrow_uid).await?;
        let permit = self.get_payment_permit(&demand).await?;
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .permitAndPayErc20AndCollect(
                escrow_uid,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s,
            )
            .send()
            .await?
            .get_receipt()
            .await?)
    }

    async fn erc20_payment_demand(&self, escrow_uid: FixedBytes<32>) -> eyre::Result<Erc20Data> {
        let eas = contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);
        let escrow = eas.getAttestation(escrow_uid).call().await?;
        let decoder = EscrowConditionDecoder::new(escrow.attester, &self.module.wallet_provider);
        let decoded = decoder.decodeCondition(escrow.data).call().await?;
        self.erc20_payment_demand_from_demand_bytes(&decoded.demand)
    }

    fn erc20_payment_demand_from_demand_bytes(&self, demand: &Bytes) -> eyre::Result<Erc20Data> {
        let demand_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(demand)?;

        Ok(Erc20Data {
            address: demand_data.token,
            value: demand_data.amount,
        })
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
