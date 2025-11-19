use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::AttesterArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of AttesterArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedAttesterArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same attester address as original
    pub attester: Address,
}

/// AttesterArbiter-specific API for convenient access to decode functionality
pub struct AttesterArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> AttesterArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode AttesterArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().attester().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedAttesterArbiterComposingDemandData> {
        self.module
            .decode_attester_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_attester_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedAttesterArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let attester = demand_data.attester;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedAttesterArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            attester,
        })
    }
}
