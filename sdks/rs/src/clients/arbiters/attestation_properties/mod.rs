//! Attestation property arbiters
//!
//! This module contains arbiters that validate specific properties of attestations.
//! All composing variants have been removed - use AllArbiter with non-composing arbiters instead.

pub mod attester_arbiter;
pub mod expiration_time_after_arbiter;
pub mod expiration_time_before_arbiter;
pub mod expiration_time_equal_arbiter;
pub mod recipient_arbiter;
pub mod ref_uid_arbiter;
pub mod revocable_arbiter;
pub mod schema_arbiter;
pub mod time_after_arbiter;
pub mod time_before_arbiter;
pub mod time_equal_arbiter;
pub mod uid_arbiter;

use crate::clients::arbiters::ArbitersModule;

/// Attestation properties arbiters API providing structured access to arbiter functionality
pub struct AttestationProperties<'a> {
    _module: &'a ArbitersModule,
}

impl<'a> AttestationProperties<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { _module: module }
    }
}
