//! Logical arbiters module
//!
//! This module contains logical arbiters that combine multiple arbiters
//! using logical operations (ANY, ALL, NOT).
//!
//! These arbiters use trait-based encoding/decoding for convenient .into() conversions.

pub mod all_arbiter;
pub mod any_arbiter;
pub mod not_arbiter;

// Re-export key types for easier access
pub use all_arbiter::{AllArbiter, DecodedAllArbiterDemandData};
pub use any_arbiter::{AnyArbiter, DecodedAnyArbiterDemandData};
pub use not_arbiter::{DecodedNotArbiterDemandData, NotArbiter};

use crate::clients::arbiters::ArbitersModule;

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

    /// Access NotArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.logical().not().decode(demand_data)?;
    /// ```
    pub fn not(&self) -> NotArbiter<'_> {
        NotArbiter::new(self.module)
    }
}
