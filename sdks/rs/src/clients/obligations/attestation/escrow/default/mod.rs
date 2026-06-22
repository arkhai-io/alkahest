//! Attestation default escrow obligation clients
//!
//! Default attestation escrows store the full attestation data in the escrow obligation.

pub mod default_escrow;
pub mod unconditional;

pub use default_escrow::Default;
pub use unconditional::Unconditional;

use super::super::AttestationModule;

/// Default attestation escrow API accessor.
pub struct DefaultEscrow<'a> {
    module: &'a AttestationModule,
}

impl<'a> DefaultEscrow<'a> {
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
