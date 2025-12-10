//! ERC20 utility functions for permits and approvals

use alloy::dyn_abi::Eip712Domain;
use alloy::primitives::{Address, U256};
use alloy::providers::Provider as _;
use alloy::rpc::types::TransactionReceipt;
use alloy::signers::{Signature, Signer};
use std::time::{SystemTime, UNIX_EPOCH};

use crate::contracts::ERC20Permit;
use crate::types::{ApprovalPurpose, Erc20Data};

use super::Erc20Module;

/// Utility API for ERC20 tokens (permits and approvals)
pub struct Util<'a> {
    module: &'a Erc20Module,
}

impl<'a> Util<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

    /// Get a permit signature for token approval.
    ///
    /// # Arguments
    /// * `spender` - The address being approved to spend tokens
    /// * `token` - The token data including address and amount
    /// * `deadline` - The timestamp until which the permit is valid
    ///
    /// # Returns
    /// * `Result<Signature>` - The permit signature
    pub async fn get_permit_signature(
        &self,
        spender: Address,
        token: &Erc20Data,
        deadline: U256,
    ) -> eyre::Result<Signature> {
        use alloy::sol;

        // Define the Permit type using the sol! macro
        sol! {
            struct Permit {
                address owner;
                address spender;
                uint256 value;
                uint256 nonce;
                uint256 deadline;
            }
        }

        let token_contract = ERC20Permit::new(token.address, &self.module.wallet_provider);
        let owner = self.module.signer.address();

        // Get token name and nonce
        let (name, nonce, chain_id) = tokio::try_join!(
            async { Ok::<_, eyre::Error>(token_contract.name().call().await?) },
            async { Ok(token_contract.nonces(owner).call().await?) },
            async { Ok(self.module.wallet_provider.get_chain_id().await?) },
        )?;

        // Create the EIP-712 domain
        let domain = Eip712Domain {
            name: Some(name.into()),
            version: Some("1".into()),
            chain_id: Some(chain_id.try_into()?),
            verifying_contract: Some(token.address),
            salt: None,
        };

        // Create the permit data
        let permit = Permit {
            owner,
            spender,
            value: token.value,
            nonce,
            deadline,
        };

        // Sign the typed data according to EIP-712
        let signature = self.module.signer.sign_typed_data(&permit, &domain).await?;

        Ok(signature)
    }

    /// Approves token spending for payment or escrow purposes.
    ///
    /// # Arguments
    /// * `token` - The token data including address and amount
    /// * `purpose` - Whether the approval is for payment or escrow
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve(
        &self,
        token: &Erc20Data,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let to = match purpose {
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let token_contract = ERC20Permit::new(token.address, &self.module.wallet_provider);
        let receipt = token_contract
            .approve(to, token.value)
            .send()
            .await?
            .get_receipt()
            .await?;
        Ok(receipt)
    }

    /// Approves token spending if current allowance is less than required amount.
    ///
    /// # Arguments
    /// * `token` - The token data including address and amount
    /// * `purpose` - Whether the approval is for payment or escrow
    ///
    /// # Returns
    /// * `Result<Option<TransactionReceipt>>` - The transaction receipt if approval was needed
    pub async fn approve_if_less(
        &self,
        token: &Erc20Data,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<Option<TransactionReceipt>> {
        let to = match purpose {
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let token_contract = ERC20Permit::new(token.address, &self.module.wallet_provider);
        let current_allowance = token_contract
            .allowance(self.module.signer.address(), to)
            .call()
            .await?;

        if current_allowance >= token.value {
            return Ok(None);
        }

        let receipt = token_contract
            .approve(to, token.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(Some(receipt))
    }

    /// Helper to get permit deadline (current time + 1 hour)
    pub fn get_permit_deadline() -> eyre::Result<u64> {
        Ok(SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 3600)
    }
}
