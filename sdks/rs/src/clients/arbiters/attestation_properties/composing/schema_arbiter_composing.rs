use crate::clients::arbiters::DecodedDemand;
use crate::{
    clients::arbiters::ArbitersModule,
    contracts::attestation_properties::composing::SchemaArbiter::DemandData,
    impl_demand_data_conversions,
};
use alloy::primitives::{Address, FixedBytes};

impl_demand_data_conversions!(DemandData);

/// Decoded version of SchemaArbiter::DemandData with actual demand structure instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedSchemaArbiterComposingDemandData {
    /// Same base arbiter address as original
    pub base_arbiter: Address,
    /// Decoded base demand instead of raw bytes
    pub base_demand: Box<DecodedDemand>,
    /// Same schema bytes32 as original
    pub schema: FixedBytes<32>,
}

/// SchemaArbiter-specific API for convenient access to decode functionality
pub struct SchemaArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> SchemaArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode SchemaArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().schema().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedSchemaArbiterComposingDemandData> {
        self.module
            .decode_schema_arbiter_composing_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_schema_arbiter_composing_demands(
        &self,
        demand_data: DemandData,
    ) -> eyre::Result<DecodedSchemaArbiterComposingDemandData> {
        let base_arbiter = demand_data.baseArbiter;
        let schema = demand_data.schema;
        let decoded_base_demand =
            self.decode_arbiter_demand(demand_data.baseArbiter, &demand_data.baseDemand)?;

        Ok(DecodedSchemaArbiterComposingDemandData {
            base_arbiter,
            base_demand: Box::new(decoded_base_demand),
            schema,
        })
    }
}
