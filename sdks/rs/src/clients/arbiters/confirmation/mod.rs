//! Confirmation arbiters module
//!
//! This module contains arbiters that handle confirmation-based logic
//! for attestation validation.
//!
//! The confirmation arbiters have been restructured with new naming:
//! - ExclusiveRevocableConfirmationArbiter: Single fulfillment per escrow, can revoke
//! - ExclusiveUnrevocableConfirmationArbiter: Single fulfillment per escrow, cannot revoke
//! - NonexclusiveRevocableConfirmationArbiter: Multiple fulfillments per escrow, can revoke
//! - NonexclusiveUnrevocableConfirmationArbiter: Multiple fulfillments per escrow, cannot revoke
//!
//! Note: These arbiters do not use DemandData - they use confirmations mapping.

mod exclusive_revocable;
mod exclusive_unrevocable;
mod nonexclusive_revocable;
mod nonexclusive_unrevocable;

use alloy::primitives::Address;

use crate::clients::arbiters::ArbitersModule;

/// Confirmation arbiter type
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ConfirmationArbiterType {
    /// Only one fulfillment can be confirmed per escrow, confirmation can be revoked
    ExclusiveRevocable,
    /// Only one fulfillment can be confirmed per escrow, confirmation cannot be revoked
    ExclusiveUnrevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations can be revoked
    NonexclusiveRevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations cannot be revoked
    NonexclusiveUnrevocable,
}

impl ArbitersModule {
    /// Get the address of a confirmation arbiter by type
    pub fn confirmation_arbiter_address(&self, arbiter_type: ConfirmationArbiterType) -> Address {
        match arbiter_type {
            ConfirmationArbiterType::ExclusiveRevocable => {
                self.addresses.exclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::ExclusiveUnrevocable => {
                self.addresses.exclusive_unrevocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveRevocable => {
                self.addresses.nonexclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveUnrevocable => {
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter
            }
        }
    }
}
