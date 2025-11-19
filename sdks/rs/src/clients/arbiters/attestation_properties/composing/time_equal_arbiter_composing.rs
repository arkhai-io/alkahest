use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::TimeEqualArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of TimeEqualArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedTimeEqualArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same time uint64 as original
    pub time: u64,
}

/// TimeEqualArbiter-specific API for convenient access to decode functionality
pub struct TimeEqualArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> TimeEqualArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode TimeEqualArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().time_equal().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedTimeEqualArbiterComposingDemandData> {
        self.module
            .decode_time_equal_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_time_equal_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedTimeEqualArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let time = demand_data.time;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedTimeEqualArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            time,
        })
    }
}
