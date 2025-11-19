use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::RefUidArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::{Address, FixedBytes};

impl_demand_data_conversions!(DemandData);

/// Decoded version of RefUidArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedRefUidArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same refUID bytes32 as original
    pub ref_uid: FixedBytes<32>,
}

/// RefUidArbiter-specific API for convenient access to decode functionality
pub struct RefUidArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> RefUidArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode RefUidArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().ref_uid().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedRefUidArbiterComposingDemandData> {
        self.module
            .decode_ref_uid_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_ref_uid_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedRefUidArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let ref_uid = demand_data.refUID;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedRefUidArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            ref_uid,
        })
    }
}
