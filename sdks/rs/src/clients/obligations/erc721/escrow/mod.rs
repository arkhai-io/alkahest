//! ERC721 escrow obligations module

pub mod non_tierable;
pub mod tierable;

use super::Erc721Module;

/// Escrow API for ERC721 tokens
pub struct Escrow<'a> {
    module: &'a Erc721Module,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
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
