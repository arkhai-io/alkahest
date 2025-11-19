//! Composing attestation property arbiters
//!
//! This module contains arbiters that validate attestation properties
//! in a composable manner, combining base arbiters with property checks.

pub mod attester_arbiter_composing;
pub mod expiration_time_after_arbiter_composing;
pub mod expiration_time_before_arbiter_composing;
pub mod expiration_time_equal_arbiter_composing;
pub mod recipient_arbiter_composing;
pub mod ref_uid_arbiter_composing;
pub mod revocable_arbiter_composing;
pub mod schema_arbiter_composing;
pub mod time_after_arbiter_composing;
pub mod time_before_arbiter_composing;
pub mod time_equal_arbiter_composing;
pub mod uid_arbiter_composing;

// Re-export key types for easier access
pub use attester_arbiter_composing::{AttesterArbiter, DecodedAttesterArbiterComposingDemandData};
pub use expiration_time_after_arbiter_composing::{
    DecodedExpirationTimeAfterArbiterComposingDemandData, ExpirationTimeAfterArbiter,
};
pub use expiration_time_before_arbiter_composing::{
    DecodedExpirationTimeBeforeArbiterComposingDemandData, ExpirationTimeBeforeArbiter,
};
pub use expiration_time_equal_arbiter_composing::{
    DecodedExpirationTimeEqualArbiterComposingDemandData, ExpirationTimeEqualArbiter,
};
pub use recipient_arbiter_composing::{
    DecodedRecipientArbiterComposingDemandData, RecipientArbiter,
};
pub use ref_uid_arbiter_composing::{DecodedRefUidArbiterComposingDemandData, RefUidArbiter};
pub use revocable_arbiter_composing::{
    DecodedRevocableArbiterComposingDemandData, RevocableArbiter,
};
pub use schema_arbiter_composing::{DecodedSchemaArbiterComposingDemandData, SchemaArbiter};
pub use time_after_arbiter_composing::{
    DecodedTimeAfterArbiterComposingDemandData, TimeAfterArbiter,
};
pub use time_before_arbiter_composing::{
    DecodedTimeBeforeArbiterComposingDemandData, TimeBeforeArbiter,
};
pub use time_equal_arbiter_composing::{
    DecodedTimeEqualArbiterComposingDemandData, TimeEqualArbiter,
};
pub use uid_arbiter_composing::{DecodedUidArbiterComposingDemandData, UidArbiter};

use crate::clients::arbiters::ArbitersModule;

/// Attestation Properties API providing structured access to attestation property arbiter decode functionality
pub struct AttestationProperties<'a> {
    module: &'a ArbitersModule,
}

impl<'a> AttestationProperties<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Access AttesterArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().attester().decode(demand_data)?;
    /// ```
    pub fn attester(&self) -> AttesterArbiter<'_> {
        AttesterArbiter::new(self.module)
    }

    /// Access ExpirationTimeAfterArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().expiration_time_after().decode(demand_data)?;
    /// ```
    pub fn expiration_time_after(&self) -> ExpirationTimeAfterArbiter<'_> {
        ExpirationTimeAfterArbiter::new(self.module)
    }

    /// Access ExpirationTimeBeforeArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().expiration_time_before().decode(demand_data)?;
    /// ```
    pub fn expiration_time_before(&self) -> ExpirationTimeBeforeArbiter<'_> {
        ExpirationTimeBeforeArbiter::new(self.module)
    }

    /// Access ExpirationTimeEqualArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().expiration_time_equal().decode(demand_data)?;
    /// ```
    pub fn expiration_time_equal(&self) -> ExpirationTimeEqualArbiter<'_> {
        ExpirationTimeEqualArbiter::new(self.module)
    }

    /// Access RecipientArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().recipient().decode(demand_data)?;
    /// ```
    pub fn recipient(&self) -> RecipientArbiter<'_> {
        RecipientArbiter::new(self.module)
    }

    /// Access RefUidArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().ref_uid().decode(demand_data)?;
    /// ```
    pub fn ref_uid(&self) -> RefUidArbiter<'_> {
        RefUidArbiter::new(self.module)
    }

    /// Access RevocableArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().revocable().decode(demand_data)?;
    /// ```
    pub fn revocable(&self) -> RevocableArbiter<'_> {
        RevocableArbiter::new(self.module)
    }

    /// Access SchemaArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().schema().decode(demand_data)?;
    /// ```
    pub fn schema(&self) -> SchemaArbiter<'_> {
        SchemaArbiter::new(self.module)
    }

    /// Access TimeAfterArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().time_after().decode(demand_data)?;
    /// ```
    pub fn time_after(&self) -> TimeAfterArbiter<'_> {
        TimeAfterArbiter::new(self.module)
    }

    /// Access TimeBeforeArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().time_before().decode(demand_data)?;
    /// ```
    pub fn time_before(&self) -> TimeBeforeArbiter<'_> {
        TimeBeforeArbiter::new(self.module)
    }

    /// Access TimeEqualArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().time_equal().decode(demand_data)?;
    /// ```
    pub fn time_equal(&self) -> TimeEqualArbiter<'_> {
        TimeEqualArbiter::new(self.module)
    }

    /// Access UidArbiter-specific decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded = arbiters_module.attestation_properties().uid().decode(demand_data)?;
    /// ```
    pub fn uid(&self) -> UidArbiter<'_> {
        UidArbiter::new(self.module)
    }
}
