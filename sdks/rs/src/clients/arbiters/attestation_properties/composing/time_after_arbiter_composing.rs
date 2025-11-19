use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::TimeAfterArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of TimeAfterArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedTimeAfterArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same time uint64 as original
    pub time: u64,
}

/// TimeAfterArbiter-specific API for convenient access to decode functionality
pub struct TimeAfterArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> TimeAfterArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode TimeAfterArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().time_after().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedTimeAfterArbiterComposingDemandData> {
        self.module
            .decode_time_after_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_time_after_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedTimeAfterArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let time = demand_data.time;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedTimeAfterArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            time,
        })
    }
}
