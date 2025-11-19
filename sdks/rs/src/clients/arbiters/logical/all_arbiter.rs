use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule, contracts::logical::AllArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;
impl_demand_data_conversions!(DemandData);

/// Decoded version of AllArbiter::DemandData with actual demand structures instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedAllArbiterDemandData {
    /// Same arbiters vector as original
    pub arbiters: Vec<Address>,
    /// Decoded demands instead of raw bytes
    pub demands: Vec<DecodedDemand>,
}

/// AllArbiter-specific API for convenient access to decode functionality
pub struct AllArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> AllArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode AllArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().all().decode(demand_data)?;
    /// ```
    pub fn decode(&self, demand_data: DemandData) -> eyre::Result<DecodedAllArbiterDemandData> {
        self.module.decode_all_arbiter_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_all_arbiter_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedAllArbiterDemandData> {
        if demand_data.arbiters.len() != demand_data.demands.len() {
            return Err(eyre::eyre!(
                "AllArbiter has mismatched arrays: {} arbiters vs {} demands",
                demand_data.arbiters.len(),
                demand_data.demands.len()
            ));
        }

        let arbiters = demand_data.arbiters.clone();
        let mut decoded_demands = Vec::new();

        for (arbiter_addr, demand_bytes) in
            demand_data.arbiters.iter().zip(demand_data.demands.iter())
        {
            let decoded = self.decode_arbiter_demand(*arbiter_addr, demand_bytes)?;
            decoded_demands.push(decoded);
        }

        Ok(DecodedAllArbiterDemandData {
            arbiters,
            demands: decoded_demands,
        })
    }
}
