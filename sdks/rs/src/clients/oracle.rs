use std::time::{SystemTime, UNIX_EPOCH};

use alloy::{
    dyn_abi::SolType,
    eips::BlockNumberOrTag,
    primitives::{Address, FixedBytes},
    providers::Provider,
    pubsub::SubscriptionStream,
    rpc::types::{Filter, Log, TransactionReceipt},
    sol,
    sol_types::SolEvent,
};
use futures::{StreamExt as _, future::try_join_all};
use tokio::time::Duration;
use tracing;

use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts::{
        IEAS::{self, Attestation},
        TrustedOracleArbiter,
    },
    extensions::AlkahestExtension,
    types::{PublicProvider, WalletProvider},
};

#[derive(Debug, Clone)]
pub struct OracleAddresses {
    pub eas: Address,
    pub trusted_oracle_arbiter: Address,
}

#[derive(Clone)]
pub struct OracleModule {
    public_provider: PublicProvider,
    wallet_provider: WalletProvider,
    signer_address: Address,

    pub addresses: OracleAddresses,
}

impl Default for OracleAddresses {
    fn default() -> Self {
        OracleAddresses {
            eas: BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas,
            trusted_oracle_arbiter: BASE_SEPOLIA_ADDRESSES
                .arbiters_addresses
                .trusted_oracle_arbiter,
        }
    }
}

#[derive(Debug, Clone)]
pub struct ArbitrateOptions {
    pub skip_arbitrated: bool,
    pub only_new: bool,
}

impl Default for ArbitrateOptions {
    fn default() -> Self {
        ArbitrateOptions {
            skip_arbitrated: false,
            only_new: false,
        }
    }
}

// Trait for abstracting over sync and async arbitration strategies
trait ArbitrationStrategy {
    type Future: std::future::Future<Output = Option<bool>> + Send;

    fn arbitrate(&self, attestation: &Attestation) -> Self::Future;
}

// Sync arbitration strategy
struct SyncArbitration<F> {
    func: F,
}

impl<F> SyncArbitration<F> {
    fn new(func: F) -> Self {
        Self { func }
    }
}

impl<F> ArbitrationStrategy for SyncArbitration<F>
where
    F: Fn(&Attestation) -> Option<bool>,
{
    type Future = std::future::Ready<Option<bool>>;

    fn arbitrate(&self, attestation: &Attestation) -> Self::Future {
        std::future::ready((self.func)(attestation))
    }
}

// Async arbitration strategy
struct AsyncArbitration<F> {
    func: F,
}

impl<F> AsyncArbitration<F> {
    fn new(func: F) -> Self {
        Self { func }
    }
}

impl<F, Fut> ArbitrationStrategy for AsyncArbitration<F>
where
    F: Fn(&Attestation) -> Fut,
    Fut: std::future::Future<Output = Option<bool>> + Send,
{
    type Future = Fut;

    fn arbitrate(&self, attestation: &Attestation) -> Self::Future {
        (self.func)(attestation)
    }
}

impl AlkahestExtension for OracleModule {
    type Config = OracleAddresses;

    async fn init(
        _signer: alloy::signers::local::PrivateKeySigner,
        providers: crate::types::ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(
            (*providers.public).clone(),
            (*providers.wallet).clone(),
            providers.signer.address(),
            config,
        )
    }
}

pub struct Decision {
    pub attestation: IEAS::Attestation,
    pub decision: bool,
    pub receipt: TransactionReceipt,
}

pub struct ListenAndArbitrateResult {
    pub decisions: Vec<Decision>,
    pub subscription_id: FixedBytes<32>,
}

impl OracleModule {
    pub fn new(
        public_provider: PublicProvider,
        wallet_provider: WalletProvider,
        signer_address: Address,
        addresses: Option<OracleAddresses>,
    ) -> eyre::Result<Self> {
        Ok(OracleModule {
            public_provider,
            wallet_provider,
            signer_address,
            addresses: addresses.unwrap_or_default(),
        })
    }

    pub async fn wait_for_arbitration(
        &self,
        obligation: FixedBytes<32>,
        from_block: Option<u64>,
    ) -> eyre::Result<Log<TrustedOracleArbiter::ArbitrationMade>> {
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
            .topic1(obligation);

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
        let eas = IEAS::new(self.addresses.eas, &self.wallet_provider);
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
    ) -> eyre::Result<TransactionReceipt> {
        let trusted_oracle_arbiter =
            TrustedOracleArbiter::new(self.addresses.trusted_oracle_arbiter, &self.wallet_provider);

        let nonce = self
            .wallet_provider
            .get_transaction_count(self.signer_address)
            .await?;

        let tx = trusted_oracle_arbiter
            .requestArbitration(obligation_uid, oracle)
            .nonce(nonce)
            .send()
            .await?;

        let receipt = tx.get_receipt().await?;
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
        let mut filter = Filter::new()
            .address(self.addresses.trusted_oracle_arbiter)
            .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
            .topic2(self.signer_address)
            .from_block(BlockNumberOrTag::Earliest)
            .to_block(BlockNumberOrTag::Latest);

        if let Some(obligation) = obligation {
            filter = filter.topic1(obligation);
        }

        filter
    }

    async fn filter_unarbitrated_attestations(
        &self,
        attestations: Vec<Attestation>,
    ) -> eyre::Result<Vec<Attestation>> {
        let futs = attestations.into_iter().map(|a| {
            let filter = self.make_arbitration_made_filter(Some(a.uid));
            async move {
                let logs = self.public_provider.get_logs(&filter).await?;
                Ok::<_, eyre::Error>((a, !logs.is_empty()))
            }
        });

        let results = try_join_all(futs).await?;
        Ok(results
            .into_iter()
            .filter_map(|(a, is_arbitrated)| if is_arbitrated { None } else { Some(a) })
            .collect())
    }

    async fn get_arbitration_requested_attestations(
        &self,
        options: &ArbitrateOptions,
    ) -> eyre::Result<Vec<Attestation>> {
        let filter = self.make_arbitration_requested_filter();

        let logs = self
            .public_provider
            .get_logs(&filter)
            .await?
            .into_iter()
            .map(|log| log.log_decode::<TrustedOracleArbiter::ArbitrationRequested>())
            .collect::<Result<Vec<_>, _>>()?;

        let attestation_futures = logs.into_iter().map(|log| {
            let eas = IEAS::new(self.addresses.eas, &self.wallet_provider);
            async move { eas.getAttestation(log.inner.obligation).call().await }
        });

        let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();

        let attestations: Vec<Attestation> = try_join_all(attestation_futures)
            .await?
            .into_iter()
            .filter(|a| {
                if (a.expirationTime != 0 && a.expirationTime < now)
                    || (a.revocationTime != 0 && a.revocationTime < now)
                {
                    return false;
                }
                true
            })
            .collect();

        let attestations = if options.skip_arbitrated {
            self.filter_unarbitrated_attestations(attestations).await?
        } else {
            attestations
        };

        Ok(attestations)
    }

    async fn arbitrate_internal(
        &self,
        decisions: Vec<Option<bool>>,
        attestations: Vec<Attestation>,
    ) -> eyre::Result<Vec<Decision>> {
        use itertools::izip;

        let arbitration_futs = attestations
            .iter()
            .zip(decisions.iter())
            .enumerate()
            .filter_map(|(i, (attestation, decision))| {
                let trusted_oracle_arbiter = TrustedOracleArbiter::new(
                    self.addresses.trusted_oracle_arbiter,
                    &self.wallet_provider,
                );
                if let Some(decision) = decision {
                    Some(async move {
                        trusted_oracle_arbiter
                            .arbitrate(attestation.uid, *decision)
                            .send()
                            .await
                    })
                } else {
                    None
                }
            })
            .collect::<Vec<_>>();

        let pending_txs = try_join_all(arbitration_futs).await?;
        let receipt_futs = pending_txs
            .into_iter()
            .map(|tx| async move { tx.get_receipt().await });

        let receipts = try_join_all(receipt_futs).await?;

        let result = izip!(attestations, decisions, receipts)
            .filter(|(_, d, _)| d.is_some())
            .map(|(attestation, decision, receipt)| Decision {
                attestation,
                decision: decision.unwrap(),
                receipt,
            })
            .collect::<Vec<Decision>>();

        Ok(result)
    }

    async fn arbitrate_past<Strategy: ArbitrationStrategy>(
        &self,
        strategy: Strategy,
        options: &ArbitrateOptions,
    ) -> eyre::Result<Vec<Decision>>
    where
        Strategy::Future: Send,
    {
        use futures::future::join_all;

        let attestations = self.get_arbitration_requested_attestations(options).await?;

        let decision_futs = attestations.iter().map(|a| strategy.arbitrate(a));
        let decisions = join_all(decision_futs).await;

        self.arbitrate_internal(decisions, attestations).await
    }

    pub async fn arbitrate_past_sync<Arbitrate: Fn(&Attestation) -> Option<bool>>(
        &self,
        arbitrate: Arbitrate,
        options: &ArbitrateOptions,
    ) -> eyre::Result<Vec<Decision>> {
        let strategy = SyncArbitration::new(arbitrate);
        self.arbitrate_past(strategy, options).await
    }

    pub async fn arbitrate_past_async<
        ArbitrateFut: std::future::Future<Output = Option<bool>> + Send,
        Arbitrate: Fn(&Attestation) -> ArbitrateFut,
    >(
        &self,
        arbitrate: Arbitrate,
        options: &ArbitrateOptions,
    ) -> eyre::Result<Vec<Decision>> {
        let strategy = AsyncArbitration::new(arbitrate);
        self.arbitrate_past(strategy, options).await
    }

    async fn spawn_arbitration_listener<
        Strategy: ArbitrationStrategy + Send + 'static,
        OnAfterArbitrateFut: std::future::Future<Output = ()> + Send + 'static,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Send + Sync + 'static,
    >(
        &self,
        stream: SubscriptionStream<Log>,
        strategy: Strategy,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
    ) where
        Strategy::Future: Send,
    {
        let wallet_provider = self.wallet_provider.clone();
        let eas_address = self.addresses.eas;
        let arbiter_address = self.addresses.trusted_oracle_arbiter;
        let signer_address = self.signer_address;
        let public_provider = self.public_provider.clone();
        let options = options.clone();

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

                if options.skip_arbitrated {
                    let filter = Filter::new()
                        .address(arbiter_address)
                        .event_signature(TrustedOracleArbiter::ArbitrationMade::SIGNATURE_HASH)
                        .topic1(attestation.uid)
                        .topic2(signer_address)
                        .from_block(BlockNumberOrTag::Earliest)
                        .to_block(BlockNumberOrTag::Latest);
                    let logs_result = public_provider.get_logs(&filter).await;

                    if let Ok(logs) = logs_result {
                        if logs.len() > 0 {
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

                let Some(decision_value) = strategy.arbitrate(&attestation).await else {
                    continue;
                };

                let Ok(nonce) = wallet_provider.get_transaction_count(signer_address).await else {
                    continue;
                };

                match arbiter
                    .arbitrate(attestation.uid, decision_value)
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
                            tokio::spawn(on_after_arbitrate(&decision));
                        }
                    }
                    Err(err) => {
                        tracing::error!("Arbitration failed for {}: {}", attestation.uid, err);
                    }
                }
            }
        });
    }

    async fn spawn_arbitration_listener_sync<
        Arbitrate: Fn(&Attestation) -> Option<bool> + Send + Sync + 'static,
        OnAfterArbitrateFut: std::future::Future<Output = ()> + Send + 'static,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Send + Sync + 'static,
    >(
        &self,
        stream: SubscriptionStream<Log>,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
    ) {
        let strategy = SyncArbitration::new(arbitrate);
        self.spawn_arbitration_listener(stream, strategy, on_after_arbitrate, options)
            .await;
    }

    pub async fn spawn_arbitration_listener_async<
        ArbitrateFut: std::future::Future<Output = Option<bool>> + Send,
        Arbitrate: Fn(&Attestation) -> ArbitrateFut + Send + Sync + 'static,
        OnAfterArbitrateFut: std::future::Future<Output = ()> + Send + 'static,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Send + Sync + 'static,
    >(
        &self,
        stream: SubscriptionStream<Log>,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
    ) {
        let strategy = AsyncArbitration::new(arbitrate);
        self.spawn_arbitration_listener(stream, strategy, on_after_arbitrate, options)
            .await;
    }

    async fn handle_arbitration_stream_no_spawn<
        Arbitrate: Fn(&Attestation) -> Option<bool>,
        OnAfterArbitrateFut: std::future::Future<Output = ()>,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut,
    >(
        &self,
        mut stream: SubscriptionStream<Log>,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
        timeout: Option<Duration>,
    ) {
        let eas = IEAS::new(self.addresses.eas, &self.wallet_provider);
        let arbiter =
            TrustedOracleArbiter::new(self.addresses.trusted_oracle_arbiter, &self.wallet_provider);

        loop {
            let next_result = if let Some(timeout_duration) = timeout {
                match tokio::time::timeout(timeout_duration, stream.next()).await {
                    Ok(Some(log)) => Some(log),
                    Ok(None) => None,
                    Err(_) => {
                        tracing::info!("Stream timeout reached after {:?}", timeout_duration);
                        break;
                    }
                }
            } else {
                stream.next().await
            };

            let Some(log) = next_result else {
                break;
            };

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

            if options.skip_arbitrated {
                let filter = self.make_arbitration_made_filter(Some(attestation.uid));
                let logs_result = self.public_provider.get_logs(&filter).await;

                if let Ok(logs) = logs_result {
                    if logs.len() > 0 {
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

            let Some(decision_value) = arbitrate(&attestation) else {
                continue;
            };

            let Ok(nonce) = self
                .wallet_provider
                .get_transaction_count(self.signer_address)
                .await
            else {
                continue;
            };

            match arbiter
                .arbitrate(attestation.uid, decision_value)
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
                        on_after_arbitrate(&decision).await;
                    }
                }
                Err(err) => {
                    tracing::error!("Arbitration failed for {}: {}", attestation.uid, err);
                }
            }
        }
    }

    pub async fn listen_and_arbitrate_sync<
        Arbitrate: Fn(&Attestation) -> Option<bool> + Send + Sync + 'static,
        OnAfterArbitrateFut: std::future::Future<Output = ()> + Send + 'static,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Send + Sync + 'static,
    >(
        &self,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
    ) -> eyre::Result<ListenAndArbitrateResult> {
        let decisions = if options.only_new {
            Vec::new()
        } else {
            // Need to capture arbitrate for past arbitration
            let attestations = self.get_arbitration_requested_attestations(options).await?;
            let decisions: Vec<Option<bool>> = attestations.iter().map(|a| arbitrate(a)).collect();
            self.arbitrate_internal(decisions, attestations).await?
        };

        let filter = self.make_arbitration_requested_filter();
        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let local_id = *sub.local_id();
        let stream: SubscriptionStream<Log> = sub.into_stream();

        self.spawn_arbitration_listener_sync(stream, arbitrate, on_after_arbitrate, options)
            .await;

        Ok(ListenAndArbitrateResult {
            decisions,
            subscription_id: local_id,
        })
    }

    pub async fn listen_and_arbitrate_async<
        ArbitrateFut: std::future::Future<Output = Option<bool>> + Send,
        Arbitrate: Fn(&Attestation) -> ArbitrateFut + Send + Sync + 'static,
        OnAfterArbitrateFut: std::future::Future<Output = ()> + Send + 'static,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Send + Sync + 'static,
    >(
        &self,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
    ) -> eyre::Result<ListenAndArbitrateResult> {
        let decisions = if options.only_new {
            Vec::new()
        } else {
            // Need to capture arbitrate for past arbitration
            use futures::future::join_all;
            let attestations = self.get_arbitration_requested_attestations(options).await?;
            let decision_futs = attestations.iter().map(|a| arbitrate(a));
            let decisions = join_all(decision_futs).await;
            self.arbitrate_internal(decisions, attestations).await?
        };

        let filter = self.make_arbitration_requested_filter();
        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let local_id = *sub.local_id();
        let stream: SubscriptionStream<Log> = sub.into_stream();

        self.spawn_arbitration_listener_async(stream, arbitrate, on_after_arbitrate, options)
            .await;

        Ok(ListenAndArbitrateResult {
            decisions,
            subscription_id: local_id,
        })
    }

    pub async fn listen_and_arbitrate_no_spawn<
        Arbitrate: Fn(&Attestation) -> Option<bool> + Clone,
        OnAfterArbitrateFut: std::future::Future<Output = ()>,
        OnAfterArbitrate: Fn(&Decision) -> OnAfterArbitrateFut + Clone,
    >(
        &self,
        arbitrate: Arbitrate,
        on_after_arbitrate: OnAfterArbitrate,
        options: &ArbitrateOptions,
        timeout: Option<Duration>,
    ) -> eyre::Result<ListenAndArbitrateResult> {
        let decisions = if options.only_new {
            Vec::new()
        } else {
            self.arbitrate_past_sync(arbitrate.clone(), options).await?
        };

        let filter = self.make_arbitration_requested_filter();
        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let local_id = *sub.local_id();
        let stream: SubscriptionStream<Log> = sub.into_stream();

        self.handle_arbitration_stream_no_spawn(
            stream,
            arbitrate,
            on_after_arbitrate,
            options,
            timeout,
        )
        .await;

        Ok(ListenAndArbitrateResult {
            decisions,
            subscription_id: local_id,
        })
    }
}
