//! ERC721 escrow obligations module

pub mod default_escrow;
pub mod unconditional;

use super::Erc721Module;

/// Escrow API for ERC721 tokens
pub struct Escrow<'a> {
    module: &'a Erc721Module,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
        Self { module }
    }

    /// Access default escrow API (1:1 escrow:fulfillment)
    pub fn default(&self) -> default_escrow::Default<'_> {
        default_escrow::Default::new(self.module)
    }

    /// Access unconditional escrow API (no default fulfillment checks)
    pub fn unconditional(&self) -> unconditional::Unconditional<'_> {
        unconditional::Unconditional::new(self.module)
    }
}
