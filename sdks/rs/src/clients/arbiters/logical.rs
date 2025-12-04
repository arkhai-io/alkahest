//! Logical arbiters module
//!
//! This module contains logical arbiters that combine multiple arbiters
//! using logical operations (ANY, ALL).
//!
//! These arbiters use trait-based encoding/decoding for convenient .into() conversions.

use alloy::primitives::Address;

use crate::{
    clients::arbiters::{ArbitersModule, DecodedDemand},
    contracts::arbiters::logical::{AllArbiter as AllArbiterContract, AnyArbiter as AnyArbiterContract},
    impl_demand_data_conversions,
};

// Implement demand data conversions
impl_demand_data_conversions!(AllArbiterContract::DemandData);
impl_demand_data_conversions!(AnyArbiterContract::DemandData);

/// Decoded version of AllArbiter::DemandData with actual demand structures instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedAllArbiterDemandData {
    /// Same arbiters vector as original
    pub arbiters: Vec<Address>,
    /// Decoded demands instead of raw bytes
    pub demands: Vec<DecodedDemand>,
}

/// Decoded version of AnyArbiter::DemandData with actual demand structures instead of raw bytes
#[derive(Debug, Clone)]
pub struct DecodedAnyArbiterDemandData {
    /// Same arbiters vector as original
    pub arbiters: Vec<Address>,
    /// Decoded demands instead of raw bytes
    pub demands: Vec<DecodedDemand>,
}

/// Logical arbiters API providing structured access to logical arbiter decode functionality
pub struct Logical<'a> {
    module: &'a ArbitersModule,
}

impl<'a> Logical<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Access AllArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().all().decode(demand_data)?;
    /// ```
    pub fn all(&self) -> AllArbiter<'_> {
        AllArbiter::new(self.module)
    }

    /// Access AnyArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().any().decode(demand_data)?;
    /// ```
    pub fn any(&self) -> AnyArbiter<'_> {
        AnyArbiter::new(self.module)
    }
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
    pub fn decode(
        &self,
        demand_data: AllArbiterContract::DemandData,
    ) -> eyre::Result<DecodedAllArbiterDemandData> {
        self.module.decode_all_arbiter_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_all_arbiter_demands(
        &self,
        demand_data: AllArbiterContract::DemandData,
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

/// AnyArbiter-specific API for convenient access to decode functionality
pub struct AnyArbiter<'a> {
    module: &'a ArbitersModule,
}

impl<'a> AnyArbiter<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Decode AnyArbiter demand data into structured format
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().any().decode(demand_data)?;
    /// ```
    pub fn decode(
        &self,
        demand_data: AnyArbiterContract::DemandData,
    ) -> eyre::Result<DecodedAnyArbiterDemandData> {
        self.module.decode_any_arbiter_demands(demand_data)
    }
}

impl ArbitersModule {
    pub fn decode_any_arbiter_demands(
        &self,
        demand_data: AnyArbiterContract::DemandData,
    ) -> eyre::Result<DecodedAnyArbiterDemandData> {
        if demand_data.arbiters.len() != demand_data.demands.len() {
            return Err(eyre::eyre!(
                "AnyArbiter has mismatched arrays: {} arbiters vs {} demands",
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

        Ok(DecodedAnyArbiterDemandData {
            arbiters,
            demands: decoded_demands,
        })
    }
}
