use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::confirmation_arbiters::UnrevocableConfirmationArbiterComposing::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::Address;

impl_demand_data_conversions!(DemandData);

/// Decoded version of UnrevocableConfirmationArbiterComposing::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedUnrevocableConfirmationArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
}

/// UnrevocableConfirmationArbiterComposing-specific API for convenient access to decode functionality
pub struct UnrevocableConfirmationArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> UnrevocableConfirmationArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode UnrevocableConfirmationArbiterComposing demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.confirmation().unrevocable().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedUnrevocableConfirmationArbiterComposingDemandData> {
        self.module
            .decode_unrevocable_confirmation_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_unrevocable_confirmation_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedUnrevocableConfirmationArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedUnrevocableConfirmationArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
        })
    }
}
