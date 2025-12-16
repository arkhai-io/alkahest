//! Attestation escrow obligation clients

pub mod v1;
pub mod v2;

pub use v1::V1;
pub use v2::V2;

use super::AttestationModule;

/// Escrow API accessor for attestation obligations
pub struct Escrow<'a> {
    module: &'a AttestationModule,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Access V1 escrow operations (stores full attestation data)
    pub fn v1(&self) -> V1<'a> {
        V1::new(self.module)
    }

    /// Access V2 escrow operations (references attestation by UID)
    pub fn v2(&self) -> V2<'a> {
        V2::new(self.module)
    }
}
