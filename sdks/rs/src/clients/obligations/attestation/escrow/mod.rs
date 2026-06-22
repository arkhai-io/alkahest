//! Attestation escrow obligation clients

pub mod default;
pub mod reference;

pub use default::DefaultEscrow;
pub use reference::ReferenceEscrow;

use super::AttestationModule;

/// Escrow API accessor for attestation obligations
pub struct Escrow<'a> {
    module: &'a AttestationModule,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Access default escrow operations (stores full attestation data).
    pub fn default(&self) -> DefaultEscrow<'a> {
        DefaultEscrow::new(self.module)
    }

    /// Access attestation-reference escrow operations.
    pub fn reference(&self) -> ReferenceEscrow<'a> {
        ReferenceEscrow::new(self.module)
    }
}
