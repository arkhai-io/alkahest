# Writing Arbiters (pt 2 - Off-chain Oracles)

Off-chain oracles are arbitration services that run outside the blockchain but submit their decisions on-chain via the `TrustedOracleArbiter` contract. Unlike on-chain arbiters that validate within smart contract execution, oracles perform arbitration in an external environment where they can access APIs, run complex computations, maintain state databases, or integrate with external systems.

This guide focuses on implementing oracle services in Rust using the `alkahest-rs` SDK. The patterns here apply to building production oracle infrastructure that can validate fulfillments according to custom business logic.

## The TrustedOracleArbiter Pattern

The `TrustedOracleArbiter` is a smart contract that delegates validation to a specific trusted address (the oracle). When escrows are created with this arbiter, the demand specifies:

1. **Oracle address**: Which oracle is authorized to make arbitration decisions
2. **Demand data**: Oracle-specific parameters describing validation criteria

The oracle's role is to:

1. Monitor for arbitration requests
2. Fetch and validate fulfillment data
3. Submit approval or rejection decisions on-chain

## Synchronous off-chain arbitration

Synchronous oracles process arbitration requests immediately within the listener callback. They fetch the data, apply validation logic, and return a decision in a single operation. This pattern works when validation can complete quickly without waiting for external events.

**Pattern illustrated**: Real-time validation where the oracle can make immediate decisions based on the current state of fulfillments and escrows.

### Example: Command Execution Validator

This example demonstrates an oracle that validates shell command output by running test cases. The pattern shows how to:

- Extract and parse custom demand formats
- Execute external validation logic (running shell commands)
- Return immediate pass/fail decisions

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_capitalization.rs`

```rust
use alkahest_rs::{
    AlkahestClient,
    clients::{
        arbiters::{ArbitersModule, TrustedOracleArbiter},
        oracle::ArbitrateOptions,
    },
    contracts::StringObligation,
    extensions::{HasOracle, HasStringObligation},
};
use alloy::primitives::Bytes;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct TestCase {
    input: String,
    output: String,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct CommandTestDemand {
    description: String,
    test_cases: Vec<TestCase>,
}

async fn run_oracle(charlie_client: AlkahestClient<BaseExtensions>) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_client_arc = Arc::new(charlie_client.clone());

    // Listen for arbitration requests and validate synchronously
    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            move |attestation| {
                let client = charlie_client_arc.clone();
                let attestation = attestation.clone();

                async move {
                    // Step 1: Extract obligation data
                    let Ok(statement) = client
                        .extract_obligation_data::<StringObligation::ObligationData>(&attestation)
                    else {
                        return Some(false);
                    };

                    let command = statement.item;

                    // Step 2: Get escrow and extract demand
                    let Ok((_, demand)) = client
                        .get_escrow_and_demand::<TrustedOracleArbiter::DemandData>(&attestation)
                        .await
                    else {
                        return Some(false);
                    };

                    // Step 3: Parse oracle-specific demand
                    let Ok(test_demand) = serde_json::from_slice::<CommandTestDemand>(
                        demand.data.as_ref()
                    ) else {
                        return Some(false);
                    };

                    // Step 4: Run validation logic
                    for case in test_demand.test_cases {
                        let full_command = format!("echo \"$INPUT\" | {}", command);
                        let output = match Command::new("bash")
                            .arg("-lc")
                            .arg(&full_command)
                            .env("INPUT", &case.input)
                            .output()
                        {
                            Ok(output) if output.status.success() => {
                                String::from_utf8_lossy(&output.stdout)
                                    .trim_end()
                                    .to_owned()
                            }
                            _ => return Some(false),
                        };

                        if output != case.output {
                            return Some(false);
                        }
                    }

                    Some(true)
                }
            },
            |_| async {},  // No-op for rejected fulfillments
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: false,
            },
        )
        .await?;

    // Results available in listen_result.decisions
    Ok(())
}
```

**Creating escrows for this oracle**:

```rust
// Prepare the demand
let demand_payload = CommandTestDemand {
    description: "Capitalize stdin".to_owned(),
    test_cases: vec![
        TestCase {
            input: "hello".to_owned(),
            output: "HELLO".to_owned(),
        },
        TestCase {
            input: "world test".to_owned(),
            output: "WORLD TEST".to_owned(),
        },
    ],
};

let encoded_demand = ArbitersModule::encode_trusted_oracle_arbiter_demand(
    &TrustedOracleArbiter::DemandData {
        oracle: charlie_client.address,
        data: Bytes::from(serde_json::to_vec(&demand_payload)?),
    }
);

let arbiter_item = ArbiterData {
    arbiter: addresses.arbiters_addresses.trusted_oracle_arbiter,
    demand: encoded_demand,
};

// Create escrow with this arbiter
let escrow_receipt = alice_client
    .erc20()
    .permit_and_buy_with_erc20(&price, &arbiter_item, expiration)
    .await?;
```

**Submitting fulfillments**:

```rust
// Bob submits a command that should pass validation
let fulfillment_receipt = bob_client
    .string_obligation()
    .do_obligation("tr '[:lower:]' '[:upper:]'".to_owned(), Some(escrow_uid))
    .await?;
let fulfillment_uid = DefaultAlkahestClient::get_attested_event(fulfillment_receipt)?.uid;

// Request arbitration from the oracle
bob_client
    .oracle()
    .request_arbitration(fulfillment_uid, charlie_client.address)
    .await?;
```

**When to use synchronous oracles**:

- Validation completes quickly (< 1 second)
- No waiting for external events or timeouts
- Computational validation (running code, checking formats)
- Simple API calls that return immediately
- Cryptographic verification
- Database lookups with immediate results

**Key implementation aspects**:

1. **Immediate decisions**: Return `Some(true)` or `Some(false)` directly from the callback
2. **Error handling**: Return `Some(false)` for any parsing or execution errors
3. **Stateless validation**: Each request is independent
4. **Simple cleanup**: Just unsubscribe when done

## Asynchronous off-chain arbitration

Asynchronous oracles defer decision-making to a separate process. The listener callback schedules work but returns `None` instead of a decision. A background worker processes scheduled tasks and submits decisions when ready. This pattern is necessary when validation requires waiting for time-based conditions, accumulating data, or performing long-running operations.

**Pattern illustrated**: Deferred validation where the oracle schedules monitoring tasks and submits decisions after observing behavior over time or waiting for specific conditions.

### Example: Service Uptime Monitor

This example demonstrates an oracle that validates service uptime by scheduling periodic health checks. The pattern shows how to:

- Schedule deferred validation work
- Maintain validation state in a database
- Use background workers to process scheduled tasks
- Submit decisions asynchronously

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_uptime.rs`

```rust
use std::{
    collections::HashMap,
    sync::{Arc, OnceLock},
};
use tokio::sync::{Mutex, Notify};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct UptimeDemand {
    service_url: String,
    min_uptime: f64,      // Required uptime percentage (0.0-1.0)
    start: u64,           // Start time for monitoring window
    end: u64,             // End time for monitoring window
    check_interval_secs: u64,
}

#[derive(Debug, Clone)]
struct PingEvent {
    delay: StdDuration,
    success: bool,
}

#[derive(Debug, Clone)]
struct UptimeJob {
    min_uptime: f64,
    schedule: Vec<PingEvent>,
}

type JobDb = Arc<Mutex<HashMap<FixedBytes<32>, UptimeJob>>>;
type UrlIndex = Arc<Mutex<HashMap<String, FixedBytes<32>>>>;

#[derive(Clone)]
struct SchedulerContext {
    job_db: JobDb,
    notify: Arc<Notify>,
    url_index: UrlIndex,
    client: Arc<AlkahestClient<BaseExtensions>>,
}

static SCHEDULER_STATE: OnceLock<Mutex<Option<SchedulerContext>>> = OnceLock::new();

fn scheduler_state() -> &'static Mutex<Option<SchedulerContext>> {
    SCHEDULER_STATE.get_or_init(|| Mutex::new(None))
}

// Listener callback: schedules work but doesn't make decisions
fn schedule_pings(
    attestation: &alkahest_rs::contracts::IEAS::Attestation,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = attestation.clone();

    Box::pin(async move {
        let ctx_opt = scheduler_state().lock().await.clone();
        let Some(ctx) = ctx_opt else {
            return None;
        };

        // Extract the service URL from the fulfillment
        let Ok(statement) = ctx.client
            .extract_obligation_data::<StringObligation::ObligationData>(&attestation)
        else {
            return None;
        };
        let url = statement.item.clone();

        // Look up which fulfillment this is
        let Some(uid) = ctx.url_index.lock().await.get(&url).cloned() else {
            return None;
        };

        // Get the escrow demand
        let Ok((_, demand)) = ctx.client
            .get_escrow_and_demand::<TrustedOracleArbiter::DemandData>(&attestation)
            .await
        else {
            return None;
        };

        let Ok(parsed_demand) = serde_json::from_slice::<UptimeDemand>(
            demand.data.as_ref()
        ) else {
            return None;
        };

        // Calculate ping schedule
        let total_span = parsed_demand.end.saturating_sub(parsed_demand.start).max(1);
        let interval = parsed_demand.check_interval_secs.max(1);
        let checks = (total_span / interval).max(1) as usize;

        let mut schedule = Vec::with_capacity(checks);
        for i in 0..checks {
            // In production: ping the service_url here
            let delay_ms = 100 + (i * 25) as u64;
            schedule.push(PingEvent {
                delay: StdDuration::from_millis(delay_ms),
                success: true, // Simulated result
            });
        }

        // Store the job for background processing
        ctx.job_db.lock().await.entry(uid).or_insert(UptimeJob {
            min_uptime: parsed_demand.min_uptime,
            schedule,
        });

        ctx.notify.notify_one();
        None  // Don't make a decision yet
    })
}

// Background worker: processes scheduled jobs
async fn run_worker(
    job_db: JobDb,
    notify: Arc<Notify>,
    arbiters: ArbitersModule,
) {
    loop {
        let maybe_job = {
            let mut db = job_db.lock().await;
            if let Some((&uid, job)) = db.iter().next() {
                let job = job.clone();
                db.remove(&uid);
                Some((uid, job))
            } else {
                None
            }
        };

        if let Some((uid, job)) = maybe_job {
            // Execute the monitoring schedule
            let mut successes = 0usize;
            let total_checks = job.schedule.len().max(1);

            for ping in job.schedule {
                tokio::time::sleep(ping.delay).await;
                // In production: actually ping the service
                if ping.success {
                    successes += 1;
                }
            }

            // Calculate uptime and make decision
            let uptime = successes as f64 / total_checks as f64;
            let decision = uptime >= job.min_uptime;

            // Submit decision on-chain
            arbiters
                .arbitrate_as_trusted_oracle(uid, decision)
                .await
                .expect("oracle arbitration tx should succeed");
        } else {
            // Wait for new work
            match tokio::time::timeout(StdDuration::from_secs(2), notify.notified()).await {
                Ok(_) => continue,
                Err(_) => {
                    if job_db.lock().await.is_empty() {
                        break;
                    }
                }
            }
        }
    }
}

async fn run_async_oracle(
    charlie_client: AlkahestClient<BaseExtensions>
) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_arbiters = charlie_client.arbiters().clone();

    // Initialize shared state
    let job_db: JobDb = Arc::new(Mutex::new(HashMap::new()));
    let url_index: UrlIndex = Arc::new(Mutex::new(HashMap::new()));
    let notify = Arc::new(Notify::new());

    // Set up scheduler context
    {
        let mut slot = scheduler_state().lock().await;
        *slot = Some(SchedulerContext {
            job_db: Arc::clone(&job_db),
            notify: Arc::clone(&notify),
            url_index: Arc::clone(&url_index),
            client: Arc::new(charlie_client.clone()),
        });
    }

    // Start background worker
    let worker_db = Arc::clone(&job_db);
    let worker_notify = Arc::clone(&notify);
    let worker_arbiters = charlie_arbiters.clone();

    let worker = tokio::spawn(async move {
        run_worker(worker_db, worker_notify, worker_arbiters).await;
    });

    // Start listening for arbitration requests
    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            schedule_pings,
            |_| async {},
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: false,
            },
        )
        .await?;

    // Wait for work to complete
    worker.await.unwrap();

    // Cleanup
    charlie_oracle.unsubscribe(listen_result.subscription_id).await?;
    {
        let mut slot = scheduler_state().lock().await;
        *slot = None;
    }

    Ok(())
}
```

**Creating escrows for async oracles**:

```rust
let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();
let demand = UptimeDemand {
    service_url: "https://api.example.com/health".to_owned(),
    min_uptime: 0.95,  // 95% uptime required
    start: now,
    end: now + 3600,   // Monitor for 1 hour
    check_interval_secs: 60,  // Check every minute
};

let encoded_demand = ArbitersModule::encode_trusted_oracle_arbiter_demand(
    &TrustedOracleArbiter::DemandData {
        oracle: charlie_client.address,
        data: Bytes::from(serde_json::to_vec(&demand)?),
    }
);

// Create escrow as before
let escrow_receipt = alice_client
    .erc20()
    .permit_and_buy_with_erc20(&price, &arbiter_item, expiration)
    .await?;
```

**Submitting fulfillments for async validation**:

```rust
// Bob provides the service URL as his fulfillment
let fulfillment_receipt = bob_client
    .string_obligation()
    .do_obligation("https://api.example.com/health".to_owned(), Some(escrow_uid))
    .await?;

// Request arbitration
bob_client
    .oracle()
    .request_arbitration(fulfillment_uid, charlie_client.address)
    .await?;

// The oracle will monitor the service and submit a decision later
```

**When to use asynchronous oracles**:

- Time-based validation (uptime, duration, deadlines)
- Accumulating evidence over multiple observations
- Monitoring external services or APIs
- Long-running computations
- Waiting for consensus from multiple sources
- Rate-limited operations

**Key implementation aspects**:

1. **Deferred decisions**: Return `None` from listener callback
2. **Shared state**: Use thread-safe data structures (Arc, Mutex)
3. **Worker pattern**: Separate process for executing scheduled work
4. **Manual submission**: Call `arbitrate_as_trusted_oracle()` when ready
5. **Notification**: Use channels or notifiers to signal new work

## Contextless arbitration

Contextless oracles validate fulfillments without examining the original escrow demand. Instead of checking demand parameters, they validate based on the intrinsic properties of the fulfillment itself and external state maintained by the oracle. This pattern is useful for building reusable validation services that don't need to be configured per-escrow.

**Pattern illustrated**: Generic validation services where the oracle maintains its own database of valid states and validates fulfillments against that state, independent of what each escrow's demand specifies.

### Example: Identity Registry Validator

This example demonstrates an oracle that validates cryptographic signatures against a maintained identity registry with replay protection. The pattern shows how to:

- Validate based purely on fulfillment content
- Maintain external state (registry) independent of escrow demands
- Implement stateful validation (nonce tracking)
- Provide generic verification services

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_identity.rs`

```rust
use std::{collections::HashMap, sync::OnceLock};
use alloy::{
    primitives::{Address, Signature, keccak256},
    signers::Signer,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct IdentityFulfillment {
    pubkey: Address,
    nonce: u64,
    data: String,
    signature: Vec<u8>,
}

static IDENTITY_REGISTRY: OnceLock<Mutex<HashMap<Address, u64>>> = OnceLock::new();

fn identity_registry() -> &'static Mutex<HashMap<Address, u64>> {
    IDENTITY_REGISTRY.get_or_init(|| Mutex::new(HashMap::new()))
}

// Validation function that doesn't use demand data
fn verify_identity(
    attestation: &alkahest_rs::contracts::IEAS::Attestation,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = attestation.clone();

    Box::pin(async move {
        // Extract obligation data (no demand needed)
        let obligation: StringObligation::ObligationData =
            match StringObligation::ObligationData::abi_decode(&attestation.data) {
                Ok(o) => o,
                Err(_) => return Some(false),
            };

        let payload = obligation.item.clone();
        let parsed: IdentityFulfillment = match serde_json::from_str(&payload) {
            Ok(p) => p,
            Err(_) => return Some(false),
        };

        // Check against oracle's internal registry
        let mut registry = identity_registry().lock().await;
        let Some(current_nonce) = registry.get_mut(&parsed.pubkey) else {
            return Some(false);  // Unknown identity
        };

        // Verify nonce progression (replay protection)
        if parsed.nonce <= *current_nonce {
            return Some(false);
        }

        // Verify signature length
        if parsed.signature.len() != 65 {
            return Some(false);
        }

        // Verify cryptographic signature
        let sig = match Signature::try_from(parsed.signature.as_slice()) {
            Ok(s) => s,
            Err(_) => return Some(false),
        };

        let message = format!("{}:{}", parsed.data, parsed.nonce);
        let hash = keccak256(message.as_bytes());

        let Ok(recovered) = sig.recover_address_from_prehash(&hash) else {
            return Some(false);
        };

        if recovered != parsed.pubkey {
            return Some(false);
        }

        // Update state and approve
        *current_nonce = parsed.nonce;
        Some(true)
    })
}

async fn run_contextless_oracle(
    charlie_client: AlkahestClient<BaseExtensions>
) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();

    // Initialize registry with known identities
    {
        let mut registry = identity_registry().lock().await;
        registry.insert(known_identity_address, 0);
    }

    // Listen and validate - no demand data needed
    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            verify_identity,
            |_| async {},
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: true,  // Only process new requests
            },
        )
        .await?;

    charlie_oracle.unsubscribe(listen_result.subscription_id).await?;

    Ok(())
}
```

**Creating fulfillments for contextless oracles**:

```rust
// Helper to create signed identity proofs
async fn create_identity_proof(
    signer: &PrivateKeySigner,
    address: Address,
    nonce: u64,
) -> Result<String> {
    let message = format!("{}:{}", "proof-of-identity", nonce);
    let hash = keccak256(message.as_bytes());
    let signature = signer.sign_hash(&hash).await?;

    let payload = IdentityFulfillment {
        pubkey: address,
        nonce,
        data: "proof-of-identity".to_owned(),
        signature: signature.as_bytes().to_vec(),
    };

    Ok(serde_json::to_string(&payload)?)
}

// Submit fulfillment
let proof = create_identity_proof(&identity_signer, identity_address, 1).await?;
let fulfillment_receipt = bob_client
    .string_obligation()
    .do_obligation(proof, None)  // No escrow reference needed
    .await?;
let fulfillment_uid = DefaultAlkahestClient::get_attested_event(fulfillment_receipt)?.uid;

// Request arbitration
bob_client
    .oracle()
    .request_arbitration(fulfillment_uid, charlie_client.address)
    .await?;

// Oracle validates based only on the signature and its registry
```

**When to use contextless oracles**:

- Generic validation services (signature verification, format checking)
- Stateful validation with external databases
- Reusable verification infrastructure
- When validation logic is the same for all escrows
- Building marketplace-style validator services

**Key implementation aspects**:

1. **Ignore demand data**: Validation doesn't call `get_escrow_and_demand()`
2. **External state**: Maintain databases, registries, or configuration
3. **Intrinsic validation**: Check only the fulfillment content itself
4. **Stateful checks**: Can track history (like nonces) across fulfillments
5. **Reusable service**: Same oracle validates for many different escrows

**Comparison to demand-based oracles**:

| Aspect | Demand-based | Contextless |
|--------|--------------|-------------|
| Demand parsing | Required | Ignored |
| Per-escrow config | Yes | No |
| State management | Usually stateless | Often stateful |
| Reusability | Escrow-specific | Generic service |
| Use case | Custom validation | Standard verification |

**Design considerations**:

1. **State consistency**: Ensure thread-safe access to external state
2. **Registration**: How do identities/entities get added to your registry?
3. **Cleanup**: Implement mechanisms to remove stale entries
4. **Replay protection**: Use nonces, timestamps, or other anti-replay measures
5. **Service discovery**: How do users know to use your oracle?

## Common Implementation Pattern

All oracle implementations follow this structure:

1. **Define demand format**: Create structs for oracle-specific parameters
2. **Set up listener**: Use `listen_and_arbitrate_async()` with validation callback
3. **Extract data**: Parse fulfillment and optionally demand data
4. **Apply validation logic**: Execute your oracle's business logic
5. **Return decision**: Either immediately (`Some(bool)`) or deferred (`None`)
6. **Submit decisions**: For async oracles, call `arbitrate_as_trusted_oracle()`
7. **Clean up**: Unsubscribe when done

The key differences between patterns:

- **Synchronous**: Return decision immediately, stateless, fast validation
- **Asynchronous**: Schedule work, maintain state, submit decisions later
- **Contextless**: Ignore demand, validate against external state/rules

## Production Considerations

### Error Handling

Always handle parsing and execution errors gracefully:

```rust
let Ok(data) = parse_data(&attestation) else {
    // Log error for debugging
    eprintln!("Failed to parse attestation: {:?}", attestation.uid);
    return Some(false);  // Reject invalid data
};
```

### Gas Management

Oracle arbitration transactions cost gas:

```rust
// Estimate gas before submission
let gas_estimate = arbiters
    .arbitrate_as_trusted_oracle(uid, decision)
    .estimate_gas()
    .await?;

// Set appropriate gas limits
let tx = arbiters
    .arbitrate_as_trusted_oracle(uid, decision)
    .gas(gas_estimate * 120 / 100)  // 20% buffer
    .send()
    .await?;
```

### Monitoring and Observability

Track oracle performance:

```rust
#[derive(Debug)]
struct OracleMetrics {
    requests_processed: AtomicU64,
    approvals: AtomicU64,
    rejections: AtomicU64,
    errors: AtomicU64,
}

impl OracleMetrics {
    fn record_decision(&self, decision: bool) {
        self.requests_processed.fetch_add(1, Ordering::Relaxed);
        if decision {
            self.approvals.fetch_add(1, Ordering::Relaxed);
        } else {
            self.rejections.fetch_add(1, Ordering::Relaxed);
        }
    }
}
```

### Retry Logic

Handle transient failures:

```rust
async fn submit_with_retry(
    arbiters: &ArbitersModule,
    uid: FixedBytes<32>,
    decision: bool,
    max_retries: u32,
) -> eyre::Result<()> {
    for attempt in 0..max_retries {
        match arbiters.arbitrate_as_trusted_oracle(uid, decision).await {
            Ok(_) => return Ok(()),
            Err(e) if attempt < max_retries - 1 => {
                eprintln!("Attempt {} failed: {}. Retrying...", attempt + 1, e);
                tokio::time::sleep(Duration::from_secs(2u64.pow(attempt))).await;
            }
            Err(e) => return Err(e),
        }
    }
    unreachable!()
}
```

### State Persistence

For production async oracles, persist state to survive restarts:

```rust
use sled::Db;

struct PersistentJobDb {
    db: Db,
}

impl PersistentJobDb {
    fn new(path: &str) -> eyre::Result<Self> {
        Ok(Self {
            db: sled::open(path)?,
        })
    }

    fn insert_job(&self, uid: &FixedBytes<32>, job: &UptimeJob) -> eyre::Result<()> {
        let key = uid.as_slice();
        let value = bincode::serialize(job)?;
        self.db.insert(key, value)?;
        Ok(())
    }

    fn get_next_job(&self) -> eyre::Result<Option<(FixedBytes<32>, UptimeJob)>> {
        if let Some(Ok((key, value))) = self.db.iter().next() {
            let uid = FixedBytes::<32>::from_slice(&key);
            let job: UptimeJob = bincode::deserialize(&value)?;
            self.db.remove(&key)?;
            Ok(Some((uid, job)))
        } else {
            Ok(None)
        }
    }
}
```

### Security Considerations

1. **Key management**: Protect oracle private keys
2. **Input validation**: Sanitize all external data
3. **Rate limiting**: Prevent spam attacks
4. **Access control**: Verify arbitration request authenticity
5. **Audit logging**: Record all decisions for accountability

```rust
use tracing::{info, warn};

fn validate_and_log(attestation: &Attestation, decision: bool) {
    info!(
        uid = ?attestation.uid,
        attester = ?attestation.attester,
        decision = decision,
        "Oracle decision recorded"
    );

    if !decision {
        warn!(
            uid = ?attestation.uid,
            "Fulfillment rejected - investigate if recurring"
        );
    }
}
```

## Oracle Architecture Patterns

### Single-tenant vs Multi-tenant

**Single-tenant**: One oracle per escrow type

```rust
// Specialized oracle for specific use case
struct WeatherOracleService {
    api_key: String,
    client: AlkahestClient<BaseExtensions>,
}
```

**Multi-tenant**: One oracle serving multiple demand types

```rust
enum DemandType {
    Weather(WeatherDemand),
    Uptime(UptimeDemand),
    Identity(IdentityDemand),
}

async fn multi_tenant_validator(attestation: &Attestation) -> Option<bool> {
    let demand_type = parse_demand_type(&attestation)?;
    match demand_type {
        DemandType::Weather(d) => validate_weather(d).await,
        DemandType::Uptime(d) => validate_uptime(d).await,
        DemandType::Identity(d) => validate_identity(d).await,
    }
}
```

### Oracle Networks

Multiple oracles can cooperate for consensus:

```rust
struct OracleNetwork {
    oracles: Vec<Address>,
    threshold: u8,
}

// Use MultiOracleArbiter contract for consensus
// Each oracle submits individual decisions
// Contract approves when threshold reached
```

### Watchtower Pattern

Monitor and auto-process escrows:

```rust
async fn watchtower(client: AlkahestClient<BaseExtensions>) {
    loop {
        // Watch for new escrows
        let new_escrows = client.erc20().watch_new_escrows().await?;

        for escrow in new_escrows {
            // Check if close to expiration
            if approaching_expiration(&escrow) {
                // Attempt to find fulfillment
                if let Some(fulfillment) = find_valid_fulfillment(&escrow).await {
                    // Auto-collect for user (they pay gas later)
                    client.erc20().collect_escrow(escrow.uid, fulfillment).await?;
                }
            }
        }

        tokio::time::sleep(Duration::from_secs(60)).await;
    }
}
```

## Testing Oracles

### Unit Testing Validation Logic

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_command_validator() {
        let test_case = TestCase {
            input: "hello".to_owned(),
            output: "HELLO".to_owned(),
        };

        let result = run_command_test("tr '[:lower:]' '[:upper:]'", &test_case).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_invalid_signature_rejection() {
        let fulfillment = IdentityFulfillment {
            pubkey: Address::ZERO,
            nonce: 1,
            data: "test".to_owned(),
            signature: vec![0u8; 65],
        };

        let result = verify_signature(&fulfillment).await;
        assert_eq!(result, Some(false));
    }
}
```

### Integration Testing

The reference implementations include full integration tests:

```rust
#[tokio::test]
async fn test_synchronous_offchain_oracle_capitalization_flow() -> Result<()> {
    let test = setup_test_environment().await?;

    // 1. Create oracle client
    let charlie_client = AlkahestClient::with_base_extensions(
        charlie_signer,
        test.anvil.ws_endpoint_url(),
        Some(test.addresses.clone()),
    ).await?;

    // 2. Create escrow with oracle demand
    let escrow_receipt = test.alice_client
        .erc20()
        .permit_and_buy_with_erc20(&price, &arbiter_item, expiration)
        .await?;

    // 3. Submit fulfillment
    let fulfillment_receipt = test.bob_client
        .string_obligation()
        .do_obligation(command, Some(escrow_uid))
        .await?;

    // 4. Request arbitration
    test.bob_client
        .oracle()
        .request_arbitration(fulfillment_uid, charlie_client.address)
        .await?;

    // 5. Oracle processes request
    let listen_result = charlie_client
        .oracle()
        .listen_and_arbitrate_async(validate_fn, reject_fn, &options)
        .await?;

    // 6. Verify decision
    assert!(listen_result.decisions.iter().all(|d| d.decision));

    // 7. Collect escrow
    test.bob_client
        .erc20()
        .collect_escrow(escrow_uid, fulfillment_uid)
        .await?;

    Ok(())
}
```

## Choosing the Right Pattern

| Validation Type | Pattern | Example Use Cases |
|-----------------|---------|-------------------|
| Fast, stateless computation | Synchronous | Format validation, simple API calls, hash verification |
| Time-based or long-running | Asynchronous | Uptime monitoring, scheduled checks, batch processing |
| Generic verification service | Contextless | Signature validation, identity verification, standard checks |
| Custom business logic | Synchronous + Demand | API validation, data transformation, conditional logic |
| Consensus or voting | Asynchronous + State | Multi-party approval, reputation systems, dispute resolution |

When in doubt, start with synchronous validation and migrate to async only when you encounter genuine need for delayed decisions.
