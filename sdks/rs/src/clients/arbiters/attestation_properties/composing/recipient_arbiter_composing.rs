use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::RecipientArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of RecipientArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedRecipientArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same recipient address as original
    pub recipient: Address,
}

/// RecipientArbiter-specific API for convenient access to decode functionality
pub struct RecipientArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> RecipientArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode RecipientArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().recipient().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedRecipientArbiterComposingDemandData> {
        self.module
            .decode_recipient_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_recipient_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedRecipientArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let recipient = demand_data.recipient;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedRecipientArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            recipient,
        })
    }
}
