use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts,
    extensions::{AlkahestExtension, ContractModule},
    impl_abi_conversions,
    types::{DecodedAttestation, ProviderContext, SharedWalletProvider},
};

impl_abi_conversions!(contracts::obligations::CommitRevealObligation::ObligationData);

use alloy::{
    primitives::{Address, Bytes, FixedBytes, U256},
    rpc::types::TransactionReceipt,
    signers::local::PrivateKeySigner,
    sol_types::SolValue as _,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommitRevealObligationAddresses {
    pub eas: Address,
    pub obligation: Address,
}

#[derive(Clone)]
pub struct CommitRevealObligationModule {
    _signer: PrivateKeySigner,
    wallet_provider: SharedWalletProvider,

    pub addresses: CommitRevealObligationAddresses,
}

impl Default for CommitRevealObligationAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.commit_reveal_obligation_addresses
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CommitRevealObligationContract {
    Eas,
    Obligation,
}

impl ContractModule for CommitRevealObligationModule {
    type Contract = CommitRevealObligationContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            CommitRevealObligationContract::Eas => self.addresses.eas,
            CommitRevealObligationContract::Obligation => self.addresses.obligation,
        }
    }
}

impl CommitRevealObligationModule {
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: SharedWalletProvider,
        addresses: Option<CommitRevealObligationAddresses>,
    ) -> eyre::Result<Self> {
        Ok(CommitRevealObligationModule {
            _signer: signer,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::CommitRevealObligation::ObligationData>>
    {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &*self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::CommitRevealObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub fn decode(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::obligations::CommitRevealObligation::ObligationData> {
        let data =
            contracts::obligations::CommitRevealObligation::ObligationData::abi_decode(
                obligation_data.as_ref(),
            )?;
        Ok(data)
    }

    pub fn encode(
        obligation_data: &contracts::obligations::CommitRevealObligation::ObligationData,
    ) -> Bytes {
        contracts::obligations::CommitRevealObligation::ObligationData::abi_encode(obligation_data)
            .into()
    }

    pub async fn do_obligation(
        &self,
        data: contracts::obligations::CommitRevealObligation::ObligationData,
        ref_uid: Option<FixedBytes<32>>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let receipt = contract
            .doObligation(data, ref_uid.unwrap_or(FixedBytes::<32>::default()))
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn commit(&self, commitment: FixedBytes<32>) -> eyre::Result<TransactionReceipt> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let bond_amount = contract.bondAmount().call().await?;

        let receipt = contract
            .commit(commitment)
            .value(bond_amount)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn compute_commitment(
        &self,
        ref_uid: FixedBytes<32>,
        claimer: Address,
        data: contracts::obligations::CommitRevealObligation::ObligationData,
    ) -> eyre::Result<FixedBytes<32>> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract
            .computeCommitment(ref_uid, claimer, data)
            .call()
            .await?;

        Ok(result)
    }

    pub async fn reclaim_bond(
        &self,
        obligation_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let receipt = contract
            .reclaimBond(obligation_uid)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn slash_bond(
        &self,
        commitment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let receipt = contract
            .slashBond(commitment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn bond_amount(&self) -> eyre::Result<U256> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract.bondAmount().call().await?;
        Ok(result)
    }

    pub async fn commit_deadline(&self) -> eyre::Result<U256> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract.commitDeadline().call().await?;
        Ok(result)
    }

    pub async fn slashed_bond_recipient(&self) -> eyre::Result<Address> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract.slashedBondRecipient().call().await?;
        Ok(result)
    }

    pub async fn get_commitment(
        &self,
        commitment: FixedBytes<32>,
    ) -> eyre::Result<(u64, u64, Address)> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract.commitments(commitment).call().await?;
        Ok((result.commitBlock, result.commitTimestamp, result.committer))
    }

    pub async fn is_commitment_claimed(
        &self,
        commitment: FixedBytes<32>,
    ) -> eyre::Result<bool> {
        let contract = contracts::obligations::CommitRevealObligation::new(
            self.addresses.obligation,
            &*self.wallet_provider,
        );

        let result = contract.commitmentClaimed(commitment).call().await?;
        Ok(result)
    }
}

impl AlkahestExtension for CommitRevealObligationModule {
    type Config = CommitRevealObligationAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, providers.wallet.clone(), config)
    }
}
