//! Attestation V2 escrow obligation clients
//!
//! V2 references the attestation by UID instead of storing the full data.

pub mod non_tierable;
pub mod tierable;

pub use non_tierable::NonTierable;
pub use tierable::Tierable;

use super::super::AttestationModule;

/// V2 escrow API accessor
pub struct V2<'a> {
    module: &'a AttestationModule,
}

impl<'a> V2<'a> {
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
