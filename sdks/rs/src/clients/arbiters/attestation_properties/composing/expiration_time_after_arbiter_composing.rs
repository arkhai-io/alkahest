use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::ExpirationTimeAfterArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of ExpirationTimeAfterArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedExpirationTimeAfterArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same expirationTime uint64 as original
    pub expiration_time: u64,
}

/// ExpirationTimeAfterArbiter-specific API for convenient access to decode functionality
pub struct ExpirationTimeAfterArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> ExpirationTimeAfterArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode ExpirationTimeAfterArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().expiration_time_after().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedExpirationTimeAfterArbiterComposingDemandData> {
        self.module
            .decode_expiration_time_after_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_expiration_time_after_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedExpirationTimeAfterArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let expiration_time = demand_data.expirationTime;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedExpirationTimeAfterArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            expiration_time,
        })
    }
}
