use std::time::{SystemTime, UNIX_EPOCH};

use alloy::{
    dyn_abi::SolType,
    eips::BlockNumberOrTag,
    primitives::{Address, Bytes, FixedBytes},
    providers::Provider,
    pubsub::SubscriptionStream,
    rpc::types::{Filter, Log, TransactionReceipt},
    sol,
    sol_types::SolEvent,
};
use futures::{future::try_join_all, StreamExt as _};
use tracing;

use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts::{
        arbiters::TrustedOracleArbiter,
        IEAS::{self, Attestation},
    },
    extensions::AlkahestExtension,
    types::{SharedPublicProvider, SharedWalletProvider},
};

#[derive(Debug, Clone)]
pub struct TrustedOracleAddresses {
    pub eas: Address,
    pub trusted_oracle_arbiter: Address,
}

#[derive(Clone)]
pub struct TrustedOracleModule {
    public_provider: SharedPublicProvider,
    wallet_provider: SharedWalletProvider,
    signer_address: Address,

    pub addresses: TrustedOracleAddresses,
}

impl Default for TrustedOracleAddresses {
    fn default() -> Self {
        TrustedOracleAddresses {
            eas: BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas,
            trusted_oracle_arbiter: BASE_SEPOLIA_ADDRESSES
                .arbiters_addresses
                .trusted_oracle_arbiter,
        }
    }
}

/// Mode for the `arbitrate_many` function specifying which attestations to process
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ArbitrationMode {
    /// Process all past attestations (including already arbitrated), no listener
    Past,
    /// Process only past attestations that haven't been arbitrated yet, no listener
    PastUnarbitrated,
    /// Process past unarbitrated + listen for future attestations (filtering out already arbitrated)
    AllUnarbitrated,
    /// Process all past + listen for future attestations (including already arbitrated)
    All,
    /// Only listen for future attestations, skip past
    Future,
}

/// An attestation paired with its associated demand data from ArbitrationRequested event
#[derive(Debug, Clone)]
pub struct AttestationWithDemand {
    pub attestation: Attestation,
    pub demand: Bytes,
}


impl AlkahestExtension for TrustedOracleModule {
    type Config = TrustedOracleAddresses;

    async fn init(
        signer: alloy::signers::local::PrivateKeySigner,
        providers: crate::types::ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(
            providers.public.clone(),
            providers.wallet.clone(),
            signer.address(),
            config,
        )
    }
}

pub struct Decision {
    pub attestation: IEAS::Attestation,
    pub decision: bool,
    pub receipt: TransactionReceipt,
}

/// Result from `arbitrate_many`
pub struct ArbitrateManyResult {
    /// Decisions made for past attestations (empty for `Future` mode)
    pub past_decisions: Vec<Decision>,
    /// Subscription ID for future events (None for `Past`/`PastUnarbitrated` modes)
    pub subscription_id: Option<FixedBytes<32>>,
}

impl TrustedOracleModule {
    pub fn new(
        public_provider: SharedPublicProvider,
        wallet_provider: SharedWalletProvider,
        signer_address: Address,
        addresses: Option<TrustedOracleAddresses>,
    ) -> eyre::Result<Self> {
        Ok(TrustedOracleModule {
            public_provider,
            wallet_provider,
            signer_address,
            addresses: addresses.unwrap_or_default(),
        })
    }

    pub async fn wait_for_arbitration(
        &self,
        obligation: FixedBytes<32>,
        demand: Option<Bytes>,
        oracle: Option<Address>,
        from_block: Option<u64>,
    ) -> eyre::Result<Log<TrustedOracleArbiter::ArbitrationMade>> {
        // ArbitrationMade event: (bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle, bool decision)
        // topic1 = decisionKey, topic2 = obligation, topic3 = oracle
        let mut filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
            .topic2(obligation);

        // If demand is provided, compute decisionKey and filter by it
        if let Some(demand) = demand {
            // decisionKey = keccak256(abi.encodePacked(obligation, demand))
            let mut packed = Vec::with_capacity(32 + demand.len());
            packed.extend_from_slice(obligation.as_slice());
            packed.extend_from_slice(&demand);
            let decision_key = alloy::primitives::keccak256(&packed);
            filter = filter.topic1(decision_key);
        }

        // If oracle is provided, filter by it
        if let Some(oracle) = oracle {
            filter = filter.topic3(oracle);
        }

        let logs = self.public_provider.get_logs(&filter).await?;
        if let Some(log) = logs.first() {
            let decoded_log = log.log_decode::<TrustedOracleArbiter::ArbitrationMade>()?;
            return Ok(decoded_log);
        }

        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let decoded_log = log.log_decode::<TrustedOracleArbiter::ArbitrationMade>()?;
            return Ok(decoded_log);
        }

        Err(eyre::eyre!("No ArbitrationMade event found"))
    }

    pub async fn unsubscribe(&self, local_id: FixedBytes<32>) -> eyre::Result<()> {
        self.public_provider
            .unsubscribe(local_id)
            .await
            .map_err(Into::into)
    }

    /// Extract obligation data from a fulfillment attestation
    ///
    /// Note: This is a convenience wrapper. The same method is available on the top-level client.
    pub fn extract_obligation_data<ObligationData: SolType>(
        &self,
        attestation: &Attestation,
    ) -> eyre::Result<ObligationData::RustType> {
        ObligationData::abi_decode(&attestation.data).map_err(Into::into)
    }

    /// Get the escrow attestation that this fulfillment references
    ///
    /// Note: This is a convenience wrapper. The same method is available on the top-level client.
    pub async fn get_escrow_attestation(
        &self,
        fulfillment: &Attestation,
    ) -> eyre::Result<Attestation> {
        let eas = IEAS::new(self.addresses.eas, &*self.wallet_provider);
        let escrow = eas.getAttestation(fulfillment.refUID).call().await?;
        Ok(escrow)
    }

    /// Extract demand data from an escrow attestation
    ///
    /// Note: This is a convenience wrapper. The same method is available on the top-level client.
    pub fn extract_demand_data<DemandData: SolType>(
        &self,
        escrow_attestation: &Attestation,
    ) -> eyre::Result<DemandData::RustType> {
        use alloy::sol;
        sol! {
            struct ArbiterDemand {
                address oracle;
                bytes demand;
            }
        }
        let arbiter_demand = ArbiterDemand::abi_decode(&escrow_attestation.data)?;
        DemandData::abi_decode(&arbiter_demand.demand).map_err(Into::into)
    }

    /// Get escrow attestation and extract demand data in one call
    ///
    /// Note: This is a convenience wrapper. The same method is available on the top-level client.
    pub async fn get_escrow_and_demand<DemandData: SolType>(
        &self,
        fulfillment: &Attestation,
    ) -> eyre::Result<(Attestation, DemandData::RustType)> {
        let escrow = self.get_escrow_attestation(fulfillment).await?;
        let demand = self.extract_demand_data::<DemandData>(&escrow)?;
        Ok((escrow, demand))
    }

    pub async fn request_arbitration(
        &self,
        obligation_uid: FixedBytes<32>,
        oracle: Address,
        demand: Bytes,
    ) -> eyre::Result<TransactionReceipt> {
        let trusted_oracle_arbiter = TrustedOracleArbiter::new(
            self.addresses.trusted_oracle_arbiter,
            &*self.wallet_provider,
        );

        let tx = trusted_oracle_arbiter
            .requestArbitration(obligation_uid, oracle, demand)
            .send()
            .await?;

        let receipt = tx.get_receipt().await?;
        Ok(receipt)
    }

    /// Arbitrate as a trusted oracle with the new 3-argument API
    ///
    /// # Arguments
    /// * `obligation` - The obligation attestation UID
    /// * `demand` - The demand data bytes
    /// * `decision` - The oracle's decision (true/false)
    pub async fn arbitrate(
        &self,
        obligation: FixedBytes<32>,
        demand: Bytes,
        decision: bool,
    ) -> eyre::Result<TransactionReceipt> {
        let trusted_oracle_arbiter = TrustedOracleArbiter::new(
            self.addresses.trusted_oracle_arbiter,
            &*self.wallet_provider,
        );

        let receipt = trusted_oracle_arbiter
            .arbitrate(obligation, demand, decision)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    fn make_arbitration_requested_filter(&self) -> Filter {
        Filter::new()
            .address(self.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationRequested::SIGNATURE_HASH)
            .topic2(self.signer_address)
            .from_block(BlockNumberOrTag::Earliest)
            .to_block(BlockNumberOrTag::Latest)
    }

    fn make_arbitration_made_filter(&self, obligation: Option<FixedBytes<32>>) -> Filter {
        // ArbitrationMade event: (bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle, bool decision)
        // topic1 = decisionKey, topic2 = obligation, topic3 = oracle
        let mut filter = Filter::new()
            .address(self.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
            .topic3(self.signer_address)
            .from_block(BlockNumberOrTag::Earliest)
            .to_block(BlockNumberOrTag::Latest);

        if let Some(obligation) = obligation {
            filter = filter.topic2(obligation);
        }

        filter
    }

    async fn filter_unarbitrated_attestations_with_demand(
        &self,
        attestations: Vec<AttestationWithDemand>,
    ) -> eyre::Result<Vec<AttestationWithDemand>> {
        let futs = attestations.into_iter().map(|awd| {
            let filter = self.make_arbitration_made_filter(Some(awd.attestation.uid));
            async move {
                let logs = self.public_provider.get_logs(&filter).await?;
                Ok::<_, eyre::Error>((awd, !logs.is_empty()))
            }
        });

        let results = try_join_all(futs).await?;
        Ok(results
            .into_iter()
            .filter_map(|(awd, is_arbitrated)| if is_arbitrated { None } else { Some(awd) })
            .collect())
    }

    async fn get_past_attestations(
        &self,
        skip_arbitrated: bool,
    ) -> eyre::Result<Vec<AttestationWithDemand>> {
        let filter = self.make_arbitration_requested_filter();

        let logs = self
            .public_provider
            .get_logs(&filter)
            .await?
            .into_iter()
            .map(|log| log.log_decode::<TrustedOracleArbiter::ArbitrationRequested>())
            .collect::<Result<Vec<_>, _>>()?;

        // Fetch attestations and pair with their demand data
        let attestation_futures = logs.into_iter().map(|log| {
            let eas = IEAS::new(self.addresses.eas, &*self.wallet_provider);
            let demand = log.inner.demand.clone();
            async move {
                let attestation = eas.getAttestation(log.inner.obligation).call().await?;
                Ok::<_, alloy::contract::Error>(AttestationWithDemand { attestation, demand })
            }
        });

        let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();

        let attestations_with_demand: Vec<AttestationWithDemand> = try_join_all(attestation_futures)
            .await?
            .into_iter()
            .filter(|awd| {
                let a = &awd.attestation;
                if (a.expirationTime != 0 && a.expirationTime < now)
                    || (a.revocationTime != 0 && a.revocationTime < now)
                {
                    return false;
                }
                true
            })
            .collect();

        let attestations_with_demand = if skip_arbitrated {
            self.filter_unarbitrated_attestations_with_demand(attestations_with_demand)
                .await?
        } else {
            attestations_with_demand
        };

        Ok(attestations_with_demand)
    }

    async fn submit_arbitrations(
        &self,
        decisions: Vec<Option<bool>>,
        attestations_with_demand: Vec<AttestationWithDemand>,
    ) -> eyre::Result<Vec<Decision>> {
        use itertools::izip;

        let arbitration_futs = attestations_with_demand
            .iter()
            .zip(decisions.iter())
            .filter_map(|(awd, decision)| {
                let trusted_oracle_arbiter = TrustedOracleArbiter::new(
                    self.addresses.trusted_oracle_arbiter,
                    &*self.wallet_provider,
                );
                if let Some(decision) = decision {
                    let demand = awd.demand.clone();
                    let uid = awd.attestation.uid;
                    Some(async move {
                        trusted_oracle_arbiter
                            .arbitrate(uid, demand, *decision)
                            .send()
                            .await
                    })
                } else {
                    None
                }
            })
            .collect::<Vec<_>>();

        let mut pending_txs = Vec::new();
        for fut in arbitration_futs {
            pending_txs.push(fut.await?);
        }

        let receipt_futs = pending_txs
            .into_iter()
            .map(|tx| async move { tx.get_receipt().await });

        let receipts = try_join_all(receipt_futs).await?;

        let result = izip!(attestations_with_demand, decisions, receipts)
            .filter(|(_, d, _)| d.is_some())
            .map(|(awd, decision, receipt)| Decision {
                attestation: awd.attestation,
                decision: decision.unwrap(),
                receipt,
            })
            .collect::<Vec<Decision>>();

        Ok(result)
    }

    /// Arbitrate multiple attestations based on the specified mode
    ///
    /// # Arguments
    /// * `arbitrate` - Sync callback that returns `Some(true/false)` to arbitrate, `None` to skip
    /// * `on_decision` - Callback invoked after each successful arbitration (for modes with listeners)
    /// * `mode` - Which attestations to process (see `ArbitrationMode`)
    ///
    /// # Returns
    /// * For `Past`/`PastUnarbitrated`: Returns decisions for past attestations, no subscription
    /// * For `All`/`AllUnarbitrated`/`Future`: Returns past decisions (if any) and subscription ID
    pub async fn arbitrate_many_sync<
        Arbitrate: Fn(&AttestationWithDemand) -> Option<bool> + Clone + Send + Sync + 'static,
        OnDecisionFut: std::future::Future<Output = ()> + Send + 'static,
        OnDecision: Fn(&Decision) -> OnDecisionFut + Clone + Send + Sync + 'static,
    >(
        &self,
        arbitrate: Arbitrate,
        on_decision: OnDecision,
        mode: ArbitrationMode,
    ) -> eyre::Result<ArbitrateManyResult> {
        use ArbitrationMode::*;

        let skip_arbitrated = matches!(mode, PastUnarbitrated | AllUnarbitrated);
        let include_past = matches!(mode, Past | PastUnarbitrated | All | AllUnarbitrated);
        let include_future = matches!(mode, Future | All | AllUnarbitrated);

        // Process past attestations
        let past_decisions = if include_past {
            let attestations = self.get_past_attestations(skip_arbitrated).await?;
            let decisions: Vec<Option<bool>> = attestations.iter().map(|awd| arbitrate(awd)).collect();
            self.submit_arbitrations(decisions, attestations).await?
        } else {
            Vec::new()
        };

        // Set up future listener if needed
        let subscription_id = if include_future {
            let filter = self.make_arbitration_requested_filter();
            let sub = self.public_provider.subscribe_logs(&filter).await?;
            let local_id = *sub.local_id();
            let stream = sub.into_stream();

            self.spawn_stream_handler(stream, arbitrate, on_decision, skip_arbitrated);

            Some(local_id)
        } else {
            None
        };

        Ok(ArbitrateManyResult {
            past_decisions,
            subscription_id,
        })
    }

    /// Arbitrate multiple attestations based on the specified mode (async callback version)
    ///
    /// # Arguments
    /// * `arbitrate` - Async callback that returns `Some(true/false)` to arbitrate, `None` to skip
    /// * `on_decision` - Callback invoked after each successful arbitration (for modes with listeners)
    /// * `mode` - Which attestations to process (see `ArbitrationMode`)
    pub async fn arbitrate_many_async<
        ArbitrateFut: std::future::Future<Output = Option<bool>> + Send,
        Arbitrate: Fn(&AttestationWithDemand) -> ArbitrateFut + Clone + Send + Sync + 'static,
        OnDecisionFut: std::future::Future<Output = ()> + Send + 'static,
        OnDecision: Fn(&Decision) -> OnDecisionFut + Clone + Send + Sync + 'static,
    >(
        &self,
        arbitrate: Arbitrate,
        on_decision: OnDecision,
        mode: ArbitrationMode,
    ) -> eyre::Result<ArbitrateManyResult>
    where
        ArbitrateFut: 'static,
    {
        use futures::future::join_all;
        use ArbitrationMode::*;

        let skip_arbitrated = matches!(mode, PastUnarbitrated | AllUnarbitrated);
        let include_past = matches!(mode, Past | PastUnarbitrated | All | AllUnarbitrated);
        let include_future = matches!(mode, Future | All | AllUnarbitrated);

        // Process past attestations
        let past_decisions = if include_past {
            let attestations = self.get_past_attestations(skip_arbitrated).await?;
            let decision_futs = attestations.iter().map(|awd| arbitrate(awd));
            let decisions = join_all(decision_futs).await;
            self.submit_arbitrations(decisions, attestations).await?
        } else {
            Vec::new()
        };

        // Set up future listener if needed
        let subscription_id = if include_future {
            let filter = self.make_arbitration_requested_filter();
            let sub = self.public_provider.subscribe_logs(&filter).await?;
            let local_id = *sub.local_id();
            let stream = sub.into_stream();

            self.spawn_stream_handler_async(stream, arbitrate, on_decision, skip_arbitrated);

            Some(local_id)
        } else {
            None
        };

        Ok(ArbitrateManyResult {
            past_decisions,
            subscription_id,
        })
    }

    fn spawn_stream_handler<
        Arbitrate: Fn(&AttestationWithDemand) -> Option<bool> + Send + Sync + 'static,
        OnDecisionFut: std::future::Future<Output = ()> + Send + 'static,
        OnDecision: Fn(&Decision) -> OnDecisionFut + Send + Sync + 'static,
    >(
        &self,
        stream: SubscriptionStream<alloy::rpc::types::Log>,
        arbitrate: Arbitrate,
        on_decision: OnDecision,
        skip_arbitrated: bool,
    ) {
        let wallet_provider = self.wallet_provider.clone();
        let eas_address = self.addresses.eas;
        let arbiter_address = self.addresses.trusted_oracle_arbiter;
        let signer_address = self.signer_address;
        let public_provider = self.public_provider.clone();

        tokio::spawn(async move {
            let eas = IEAS::new(eas_address, &wallet_provider);
            let arbiter = TrustedOracleArbiter::new(arbiter_address, &wallet_provider);
            let mut stream = stream;

            while let Some(log) = stream.next().await {
                let Ok(arbitration_log) =
                    log.log_decode::<TrustedOracleArbiter::ArbitrationRequested>()
                else {
                    continue;
                };

                let Ok(attestation) = eas
                    .getAttestation(arbitration_log.inner.obligation)
                    .call()
                    .await
                else {
                    continue;
                };

                let demand = arbitration_log.inner.demand.clone();

                if skip_arbitrated {
                    let filter = Filter::new()
                        .address(arbiter_address)
                        .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
                        .topic2(attestation.uid)
                        .topic3(signer_address)
                        .from_block(BlockNumberOrTag::Earliest)
                        .to_block(BlockNumberOrTag::Latest);
                    if let Ok(logs) = public_provider.get_logs(&filter).await {
                        if !logs.is_empty() {
                            continue;
                        }
                    }
                }

                let now = SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .unwrap()
                    .as_secs();
                if (attestation.expirationTime != 0 && attestation.expirationTime < now)
                    || (attestation.revocationTime != 0 && attestation.revocationTime < now)
                {
                    continue;
                }

                let awd = AttestationWithDemand {
                    attestation: attestation.clone(),
                    demand: demand.clone(),
                };
                let Some(decision_value) = arbitrate(&awd) else {
                    continue;
                };

                let Ok(nonce) = wallet_provider.get_transaction_count(signer_address).await else {
                    continue;
                };

                match arbiter
                    .arbitrate(attestation.uid, demand, decision_value)
                    .nonce(nonce)
                    .send()
                    .await
                {
                    Ok(tx) => {
                        if let Ok(receipt) = tx.get_receipt().await {
                            let decision = Decision {
                                attestation,
                                decision: decision_value,
                                receipt,
                            };
                            tokio::spawn(on_decision(&decision));
                        }
                    }
                    Err(err) => {
                        tracing::error!("Arbitration failed for {}: {}", attestation.uid, err);
                    }
                }
            }
        });
    }

    fn spawn_stream_handler_async<
        ArbitrateFut: std::future::Future<Output = Option<bool>> + Send + 'static,
        Arbitrate: Fn(&AttestationWithDemand) -> ArbitrateFut + Send + Sync + 'static,
        OnDecisionFut: std::future::Future<Output = ()> + Send + 'static,
        OnDecision: Fn(&Decision) -> OnDecisionFut + Send + Sync + 'static,
    >(
        &self,
        stream: SubscriptionStream<alloy::rpc::types::Log>,
        arbitrate: Arbitrate,
        on_decision: OnDecision,
        skip_arbitrated: bool,
    ) {
        let wallet_provider = self.wallet_provider.clone();
        let eas_address = self.addresses.eas;
        let arbiter_address = self.addresses.trusted_oracle_arbiter;
        let signer_address = self.signer_address;
        let public_provider = self.public_provider.clone();

        tokio::spawn(async move {
            let eas = IEAS::new(eas_address, &wallet_provider);
            let arbiter = TrustedOracleArbiter::new(arbiter_address, &wallet_provider);
            let mut stream = stream;

            while let Some(log) = stream.next().await {
                let Ok(arbitration_log) =
                    log.log_decode::<TrustedOracleArbiter::ArbitrationRequested>()
                else {
                    continue;
                };

                let Ok(attestation) = eas
                    .getAttestation(arbitration_log.inner.obligation)
                    .call()
                    .await
                else {
                    continue;
                };

                let demand = arbitration_log.inner.demand.clone();

                if skip_arbitrated {
                    let filter = Filter::new()
                        .address(arbiter_address)
                        .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
                        .topic2(attestation.uid)
                        .topic3(signer_address)
                        .from_block(BlockNumberOrTag::Earliest)
                        .to_block(BlockNumberOrTag::Latest);
                    if let Ok(logs) = public_provider.get_logs(&filter).await {
                        if !logs.is_empty() {
                            continue;
                        }
                    }
                }

                let now = SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .unwrap()
                    .as_secs();
                if (attestation.expirationTime != 0 && attestation.expirationTime < now)
                    || (attestation.revocationTime != 0 && attestation.revocationTime < now)
                {
                    continue;
                }

                let awd = AttestationWithDemand {
                    attestation: attestation.clone(),
                    demand: demand.clone(),
                };
                let Some(decision_value) = arbitrate(&awd).await else {
                    continue;
                };

                let Ok(nonce) = wallet_provider.get_transaction_count(signer_address).await else {
                    continue;
                };

                match arbiter
                    .arbitrate(attestation.uid, demand, decision_value)
                    .nonce(nonce)
                    .send()
                    .await
                {
                    Ok(tx) => {
                        if let Ok(receipt) = tx.get_receipt().await {
                            let decision = Decision {
                                attestation,
                                decision: decision_value,
                                receipt,
                            };
                            tokio::spawn(on_decision(&decision));
                        }
                    }
                    Err(err) => {
                        tracing::error!("Arbitration failed for {}: {}", attestation.uid, err);
                    }
                }
            }
        });
    }
}

// Type aliases for backwards compatibility
pub type OracleModule = TrustedOracleModule;
pub type OracleAddresses = TrustedOracleAddresses;

use super::ArbitersModule;

/// TrustedOracle API accessor (accessed via `arbiters.trusted_oracle()`)
///
/// Provides access to trusted oracle arbitration methods through the ArbitersModule.
pub struct TrustedOracle<'a> {
    module: &'a ArbitersModule,
}

impl<'a> TrustedOracle<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Get the TrustedOracleArbiter contract address
    pub fn address(&self) -> Address {
        self.module.addresses.trusted_oracle_arbiter
    }

    /// Arbitrate as a trusted oracle
    ///
    /// # Arguments
    /// * `obligation` - The obligation attestation UID
    /// * `demand` - The demand data bytes
    /// * `decision` - The oracle's decision (true/false)
    pub async fn arbitrate(
        &self,
        obligation: FixedBytes<32>,
        demand: Bytes,
        decision: bool,
    ) -> eyre::Result<TransactionReceipt> {
        let trusted_oracle_arbiter = TrustedOracleArbiter::new(
            self.module.addresses.trusted_oracle_arbiter,
            &*self.module.wallet_provider,
        );

        let receipt = trusted_oracle_arbiter
            .arbitrate(obligation, demand, decision)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Wait for a trusted oracle arbitration event
    ///
    /// # Arguments
    /// * `oracle` - The oracle address
    /// * `obligation` - The obligation attestation UID
    /// * `from_block` - Optional starting block number
    pub async fn wait_for_arbitration(
        &self,
        oracle: Address,
        obligation: FixedBytes<32>,
        from_block: Option<u64>,
    ) -> eyre::Result<TrustedOracleArbiter::ArbitrationMade> {
        // ArbitrationMade event: (bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle, bool decision)
        // topic1 = decisionKey, topic2 = obligation, topic3 = oracle
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.module.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
            .topic2(obligation)
            .topic3(oracle.into_word());

        let logs = self.module.public_provider.get_logs(&filter).await?;
        if let Some(log) = logs
            .iter()
            .collect::<Vec<_>>()
            .first()
            .map(|log| log.log_decode::<TrustedOracleArbiter::ArbitrationMade>())
        {
            return Ok(log?.inner.data);
        }

        let sub = self.module.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let log = log.log_decode::<TrustedOracleArbiter::ArbitrationMade>()?;
            return Ok(log.inner.data);
        }

        Err(eyre::eyre!("No ArbitrationMade event found"))
    }
}
