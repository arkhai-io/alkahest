//! Token Bundle escrow obligations module
//!
//! This module contains escrow obligation clients for token bundles.
//!
//! - `non_tierable`: 1:1 escrow to fulfillment relationship
//! - `tierable`: 1:many escrow to fulfillment relationship

pub mod non_tierable;
pub mod tierable;

use super::TokenBundleModule;

/// Escrow API for token bundles
pub struct Escrow<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    /// Access non-tierable escrow API (1:1 escrow:fulfillment)
    pub fn non_tierable(&self) -> non_tierable::NonTierable<'_> {
        non_tierable::NonTierable::new(self.module)
    }

    /// Access tierable escrow API (1:many escrow:fulfillment)
    pub fn tierable(&self) -> tierable::Tierable<'_> {
        tierable::Tierable::new(self.module)
    }
}
