//! Attestation V1 escrow obligation clients
//!
//! V1 stores the full attestation data in the escrow obligation.

pub mod non_tierable;
pub mod tierable;

pub use non_tierable::NonTierable;
pub use tierable::Tierable;

use super::super::AttestationModule;

/// V1 escrow API accessor
pub struct V1<'a> {
    module: &'a AttestationModule,
}

impl<'a> V1<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Access non-tierable escrow operations (1:1 escrow:fulfillment)
    pub fn non_tierable(&self) -> NonTierable<'a> {
        NonTierable::new(self.module)
    }

    /// Access tierable escrow operations (1:many escrow:fulfillment)
    pub fn tierable(&self) -> Tierable<'a> {
        Tierable::new(self.module)
    }
}
