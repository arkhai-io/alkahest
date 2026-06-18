//! Attestation V2 escrow obligation clients
//!
//! V2 references the attestation by UID instead of storing the full data.

pub mod default_escrow;
pub mod unconditional;

pub use default_escrow::Default;
pub use unconditional::Unconditional;

use super::super::AttestationModule;

/// V2 escrow API accessor
pub struct V2<'a> {
    module: &'a AttestationModule,
}

impl<'a> V2<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Access default escrow operations (1:1 escrow:fulfillment)
    pub fn default(&self) -> Default<'a> {
        Default::new(self.module)
    }

    /// Access unconditional escrow operations (no default fulfillment checks)
    pub fn unconditional(&self) -> Unconditional<'a> {
        Unconditional::new(self.module)
    }
}
