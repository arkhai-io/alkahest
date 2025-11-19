//! Confirmation arbiters module
//!
//! This module contains arbiters that handle confirmation-based logic
//! for attestation validation and composition.

pub mod confirmation_arbiter_composing;
pub mod revocable_confirmation_arbiter_composing;
pub mod unrevocable_confirmation_arbiter_composing;

// Re-export key types for easier access
pub use confirmation_arbiter_composing::{
    ConfirmationArbiter, DecodedConfirmationArbiterComposingDemandData,
};
pub use revocable_confirmation_arbiter_composing::{
    DecodedRevocableConfirmationArbiterComposingDemandData, RevocableConfirmationArbiter,
};
pub use unrevocable_confirmation_arbiter_composing::{
    DecodedUnrevocableConfirmationArbiterComposingDemandData, UnrevocableConfirmationArbiter,
};

use crate::clients::arbiters::ArbitersModule;

/// Confirmation arbiters API providing structured access to confirmation arbiter decode functionality
pub struct Confirmation<'a> {
    module: &'a ArbitersModule,
}

impl<'a> Confirmation<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Access ConfirmationArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.confirmation().confirmation().decode(demand_data)?;
    /// ```
    pub fn confirmation(&self) -> ConfirmationArbiter<'_> {
        ConfirmationArbiter::new(self.module)
    }

    /// Access RevocableConfirmationArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.confirmation().revocable().decode(demand_data)?;
    /// ```
    pub fn revocable(&self) -> RevocableConfirmationArbiter<'_> {
        RevocableConfirmationArbiter::new(self.module)
    }

    /// Access UnrevocableConfirmationArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.confirmation().unrevocable().decode(demand_data)?;
    /// ```
    pub fn unrevocable(&self) -> UnrevocableConfirmationArbiter<'_> {
        UnrevocableConfirmationArbiter::new(self.module)
    }
}
