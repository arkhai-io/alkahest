//! Native Token utility functions
//!
//! Utility functions for native token operations. Unlike ERC20, native tokens
//! do not require approvals or permits since they are transferred directly with
//! the transaction value.

// This module is included for consistency with the erc20 and erc721 modules,
// but native tokens do not require utility functions for approvals or permits.
// All native token operations are handled by sending ETH with the transaction.
