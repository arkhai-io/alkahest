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
