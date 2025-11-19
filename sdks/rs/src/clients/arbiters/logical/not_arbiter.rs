use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule, contracts::logical::NotArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of NotArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedNotArbiterDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
}

/// NotArbiter-specific API for convenient access to decode functionality
pub struct NotArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> NotArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode NotArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().not().decode(demand_data)?;
    /// ```
    pub fn decode(&self, demand_data: DemandData) -> eyre::Result<DecodedNotArbiterDemandData> {
        self.module.decode_not_arbiter_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_not_arbiter_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedNotArbiterDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedNotArbiterDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
        })
    }
}
