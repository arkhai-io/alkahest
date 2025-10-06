# Writing Arbiters (pt 2 - Off-chain Oracles)

Off-chain oracles are arbitration services that run outside the blockchain but submit their decisions on-chain via the `TrustedOracleArbiter` contract. Unlike on-chain arbiters that validate within smart contract execution, oracles perform arbitration in an external environment where they can access APIs, run complex computations, maintain state databases, or integrate with external systems.

This guide focuses on implementing oracle services in Rust using the `alkahest-rs` SDK. The patterns here apply to building production oracle infrastructure that can validate fulfillments according to custom business logic.

## Understanding Your Role as an Oracle

As an oracle operator (Charlie in the examples), you provide a trusted arbitration service. Buyers (Alice) create escrows that specify your address as the trusted judge, and sellers (Bob) submit fulfillments that you validate.

Your oracle service needs to:

1. **Listen** for arbitration requests that specify you as the oracle
2. **Extract** the fulfillment data and original demand from attestations
3. **Validate** the fulfillment according to the demand criteria
4. **Submit** your approval or rejection decision on-chain

The `TrustedOracleArbiter` contract handles the on-chain logic - your job is to implement the validation logic and submit decisions.

## Synchronous off-chain arbitration

Synchronous oracles process arbitration requests immediately within the listener callback. They fetch the data, apply validation logic, and return a decision in a single operation. This pattern works when validation can complete quickly without waiting for external events.

**When to use**: Validation completes quickly (< 1 second), no waiting for external events, computational validation, simple API calls, cryptographic verification.

### Step 1: Define your demand format

First, decide what information buyers need to provide in their demands. This becomes your oracle's "API":

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TestCase {
    input: String,
    output: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct CommandTestDemand {
    description: String,
    test_cases: Vec<TestCase>,
}
```

Buyers will encode this as JSON in the `TrustedOracleArbiter` demand's `data` field.

### Step 2: Set up the oracle listener

Create a client and start listening for arbitration requests:

```rust
use alkahest_rs::{
    AlkahestClient,
    clients::oracle::ArbitrateOptions,
    extensions::HasOracle,
};

async fn run_oracle(charlie_client: AlkahestClient<BaseExtensions>) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();

    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            validation_callback,  // We'll implement this next
            |_| async {},         // Optional: callback for rejections
            &ArbitrateOptions {
                skip_arbitrated: true,  // Don't re-process already decided
                only_new: false,        // Process backlog on startup
            },
        )
        .await?;

    Ok(())
}
```

### Step 3: Implement validation logic

The validation callback receives each fulfillment attestation and returns your decision:

```rust
use alkahest_rs::{
    clients::arbiters::TrustedOracleArbiter,
    contracts::StringObligation,
    extensions::HasStringObligation,
};
use std::sync::Arc;

async fn run_oracle(charlie_client: AlkahestClient<BaseExtensions>) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_client_arc = Arc::new(charlie_client.clone());

    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            move |attestation| {
                let client = charlie_client_arc.clone();
                let attestation = attestation.clone();

                async move {
                    // Step 3a: Extract the fulfillment data
                    let Ok(fulfillment) = client
                        .extract_obligation_data::<StringObligation::ObligationData>(&attestation)
                    else {
                        return Some(false);  // Invalid format
                    };

                    let submitted_command = fulfillment.item;

                    // Step 3b: Get the original demand from the escrow
                    let Ok((_, demand)) = client
                        .get_escrow_and_demand::<TrustedOracleArbiter::DemandData>(&attestation)
                        .await
                    else {
                        return Some(false);  // Can't find escrow
                    };

                    // Step 3c: Parse your custom demand format
                    let Ok(test_demand) = serde_json::from_slice::<CommandTestDemand>(
                        demand.data.as_ref()
                    ) else {
                        return Some(false);  // Invalid demand format
                    };

                    // Step 3d: Apply your validation logic
                    for case in test_demand.test_cases {
                        let full_command = format!("echo \"$INPUT\" | {}", submitted_command);
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
                            _ => return Some(false),  // Command failed
                        };

                        if output != case.output {
                            return Some(false);  // Output doesn't match
                        }
                    }

                    // All test cases passed
                    Some(true)
                }
            },
            |_| async {},
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: false,
            },
        )
        .await?;

    Ok(())
}
```

**Breaking down the validation callback:**

1. **Extract fulfillment**: Parse the attestation data into your expected format
2. **Get demand**: Retrieve the original escrow and extract the demand parameters
3. **Parse demand**: Decode your custom demand format (JSON in this case)
4. **Validate**: Apply your business logic to check if fulfillment meets demand
5. **Return decision**: `Some(true)` to approve, `Some(false)` to reject

### Step 4: Handle lifecycle and cleanup

Add proper cleanup when shutting down your oracle:

```rust
async fn run_oracle(charlie_client: AlkahestClient<BaseExtensions>) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_client_arc = Arc::new(charlie_client.clone());

    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            move |attestation| {
                // ... validation logic from Step 3 ...
            },
            |_| async {},
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: false,
            },
        )
        .await?;

    // Unsubscribe when done (e.g., on shutdown signal)
    charlie_oracle
        .unsubscribe(listen_result.subscription_id)
        .await?;

    Ok(())
}
```

**Complete synchronous oracle pattern:**

1. Define demand format (your oracle's API)
2. Set up listener with `listen_and_arbitrate_async()`
3. Implement validation callback:
   - Extract fulfillment data
   - Get original demand from escrow
   - Parse demand format
   - Apply validation logic
   - Return `Some(true)` or `Some(false)`
4. Handle cleanup on shutdown

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_capitalization.rs`

## Asynchronous off-chain arbitration

Asynchronous oracles defer decision-making to a separate process. The listener callback schedules work but returns `None` instead of a decision. A background worker processes scheduled tasks and submits decisions when ready. This pattern is necessary when validation requires waiting for time-based conditions, accumulating data, or performing long-running operations.

**When to use**: Time-based validation (uptime, duration), accumulating evidence over time, monitoring external services, long-running computations, waiting for consensus.

### Step 1: Define demand format and job state

Define both the demand buyers will provide and the internal state for tracking scheduled work:

```rust
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, OnceLock};
use tokio::sync::{Mutex, Notify};

// Demand format (buyers provide this)
#[derive(Debug, Clone, Serialize, Deserialize)]
struct UptimeDemand {
    service_url: String,
    min_uptime: f64,      // Required uptime percentage (0.0-1.0)
    start: u64,           // Start time for monitoring window
    end: u64,             // End time for monitoring window
    check_interval_secs: u64,
}

// Internal job state (your oracle tracks this)
#[derive(Debug, Clone)]
struct UptimeJob {
    min_uptime: f64,
    schedule: Vec<PingEvent>,
}

#[derive(Debug, Clone)]
struct PingEvent {
    delay: StdDuration,
    success: bool,
}

// Shared state between listener and worker
type JobDb = Arc<Mutex<HashMap<FixedBytes<32>, UptimeJob>>>;

#[derive(Clone)]
struct SchedulerContext {
    job_db: JobDb,
    notify: Arc<Notify>,
    client: Arc<AlkahestClient<BaseExtensions>>,
}

static SCHEDULER_STATE: OnceLock<Mutex<Option<SchedulerContext>>> = OnceLock::new();
```

### Step 2: Implement the scheduling callback

The listener callback schedules work but doesn't make decisions (returns `None`):

```rust
fn schedule_pings(
    attestation: &alkahest_rs::contracts::IEAS::Attestation,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = attestation.clone();

    Box::pin(async move {
        let ctx_opt = SCHEDULER_STATE.get()?.lock().await.clone();
        let Some(ctx) = ctx_opt else {
            return None;
        };

        // Step 2a: Extract fulfillment (service URL submitted)
        let Ok(statement) = ctx.client
            .extract_obligation_data::<StringObligation::ObligationData>(&attestation)
        else {
            return None;
        };
        let service_url = statement.item.clone();

        // Step 2b: Get the demand from escrow
        let Ok((_, demand)) = ctx.client
            .get_escrow_and_demand::<TrustedOracleArbiter::DemandData>(&attestation)
            .await
        else {
            return None;
        };

        // Step 2c: Parse demand
        let Ok(uptime_demand) = serde_json::from_slice::<UptimeDemand>(
            demand.data.as_ref()
        ) else {
            return None;
        };

        // Step 2d: Create monitoring schedule
        let total_span = uptime_demand.end.saturating_sub(uptime_demand.start).max(1);
        let interval = uptime_demand.check_interval_secs.max(1);
        let checks = (total_span / interval).max(1) as usize;

        let mut schedule = Vec::with_capacity(checks);
        for i in 0..checks {
            schedule.push(PingEvent {
                delay: StdDuration::from_secs(i as u64 * interval),
                success: true,  // Will be determined by actual ping
            });
        }

        // Step 2e: Store job for background processing
        ctx.job_db.lock().await.insert(attestation.uid, UptimeJob {
            min_uptime: uptime_demand.min_uptime,
            schedule,
        });

        ctx.notify.notify_one();  // Wake up worker
        None  // Don't make decision yet - worker will handle it
    })
}
```

### Step 3: Implement the background worker

Create a worker that processes scheduled jobs and submits decisions:

```rust
use alkahest_rs::clients::arbiters::ArbitersModule;

async fn run_worker(
    job_db: JobDb,
    notify: Arc<Notify>,
    arbiters: ArbitersModule,
) {
    loop {
        // Step 3a: Get next job from queue
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
            // Step 3b: Execute the monitoring schedule
            let mut successes = 0usize;
            let total_checks = job.schedule.len().max(1);

            for ping in job.schedule {
                tokio::time::sleep(ping.delay).await;
                // In production: actually ping the service
                // let success = check_service_health(&service_url).await;
                if ping.success {
                    successes += 1;
                }
            }

            // Step 3c: Calculate result and make decision
            let uptime = successes as f64 / total_checks as f64;
            let decision = uptime >= job.min_uptime;

            // Step 3d: Submit decision on-chain
            arbiters
                .arbitrate_as_trusted_oracle(uid, decision)
                .await
                .expect("oracle arbitration tx should succeed");
        } else {
            // Step 3e: Wait for new work
            match tokio::time::timeout(StdDuration::from_secs(2), notify.notified()).await {
                Ok(_) => continue,
                Err(_) => {
                    if job_db.lock().await.is_empty() {
                        break;  // No work and no notifications - exit
                    }
                }
            }
        }
    }
}
```

### Step 4: Wire everything together

Set up the listener, worker, and shared state:

```rust
async fn run_async_oracle(
    charlie_client: AlkahestClient<BaseExtensions>
) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_arbiters = charlie_client.arbiters().clone();

    // Step 4a: Initialize shared state
    let job_db: JobDb = Arc::new(Mutex::new(HashMap::new()));
    let notify = Arc::new(Notify::new());

    {
        let mut slot = SCHEDULER_STATE.get_or_init(|| Mutex::new(None)).lock().await;
        *slot = Some(SchedulerContext {
            job_db: Arc::clone(&job_db),
            notify: Arc::clone(&notify),
            client: Arc::new(charlie_client.clone()),
        });
    }

    // Step 4b: Start background worker
    let worker_db = Arc::clone(&job_db);
    let worker_notify = Arc::clone(&notify);
    let worker_arbiters = charlie_arbiters.clone();

    let worker = tokio::spawn(async move {
        run_worker(worker_db, worker_notify, worker_arbiters).await;
    });

    // Step 4c: Start listener
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

    // Step 4d: Wait and cleanup
    worker.await.unwrap();
    charlie_oracle.unsubscribe(listen_result.subscription_id).await?;

    {
        let mut slot = SCHEDULER_STATE.get().unwrap().lock().await;
        *slot = None;
    }

    Ok(())
}
```

**Complete asynchronous oracle pattern:**

1. Define demand format and job state structures
2. Implement scheduling callback that:
   - Extracts fulfillment data
   - Gets demand from escrow
   - Creates job schedule
   - Stores job in shared database
   - Returns `None` (defers decision)
3. Implement background worker that:
   - Polls job database
   - Executes scheduled work
   - Makes decision based on results
   - Calls `arbitrate_as_trusted_oracle()` to submit
4. Wire together with shared state and cleanup

**Key differences from synchronous:**
- Callback returns `None` instead of `Some(bool)`
- Requires background worker thread
- Must manually call `arbitrate_as_trusted_oracle()`
- Needs shared state management (Arc, Mutex)

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_uptime.rs`

## Contextless arbitration

Contextless oracles validate fulfillments without examining the original escrow demand. Instead of checking demand parameters, they validate based on the intrinsic properties of the fulfillment itself and external state maintained by the oracle. This pattern is useful for building reusable validation services that don't need to be configured per-escrow.

**When to use**: Generic validation services (signature verification, format checking), stateful validation with external databases, reusable verification infrastructure, building marketplace-style validator services.

### Step 1: Define fulfillment format and registry state

Define what fulfillments look like and what state you maintain:

```rust
use std::{collections::HashMap, sync::OnceLock};
use alloy::primitives::{Address, Signature, keccak256};
use tokio::sync::Mutex;

// Fulfillment format (what sellers submit)
#[derive(Debug, Clone, Serialize, Deserialize)]
struct IdentityFulfillment {
    pubkey: Address,
    nonce: u64,
    data: String,
    signature: Vec<u8>,
}

// Oracle's internal registry (identity address -> current nonce)
static IDENTITY_REGISTRY: OnceLock<Mutex<HashMap<Address, u64>>> = OnceLock::new();

fn identity_registry() -> &'static Mutex<HashMap<Address, u64>> {
    IDENTITY_REGISTRY.get_or_init(|| Mutex::new(HashMap::new()))
}
```

### Step 2: Initialize your registry

Before starting the listener, populate your oracle's state:

```rust
async fn run_contextless_oracle(
    charlie_client: AlkahestClient<BaseExtensions>
) -> eyre::Result<()> {
    // Step 2: Register known identities with starting nonces
    {
        let mut registry = identity_registry().lock().await;
        registry.insert(identity_address_1, 0);
        registry.insert(identity_address_2, 0);
        // In production: load from database
    }

    // ... rest of oracle setup ...
}
```

### Step 3: Implement validation without demand

The validation callback only looks at the fulfillment and your registry:

```rust
fn verify_identity(
    attestation: &alkahest_rs::contracts::IEAS::Attestation,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = attestation.clone();

    Box::pin(async move {
        // Step 3a: Extract fulfillment (no escrow/demand needed)
        let obligation: StringObligation::ObligationData =
            match StringObligation::ObligationData::abi_decode(&attestation.data) {
                Ok(o) => o,
                Err(_) => return Some(false),
            };

        // Step 3b: Parse the fulfillment payload
        let payload = obligation.item.clone();
        let parsed: IdentityFulfillment = match serde_json::from_str(&payload) {
            Ok(p) => p,
            Err(_) => return Some(false),
        };

        // Step 3c: Check against oracle's registry
        let mut registry = identity_registry().lock().await;
        let Some(current_nonce) = registry.get_mut(&parsed.pubkey) else {
            return Some(false);  // Unknown identity
        };

        // Step 3d: Verify nonce progression (replay protection)
        if parsed.nonce <= *current_nonce {
            return Some(false);
        }

        // Step 3e: Verify cryptographic signature
        if parsed.signature.len() != 65 {
            return Some(false);
        }

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
            return Some(false);  // Signature mismatch
        };

        // Step 3f: Update state and approve
        *current_nonce = parsed.nonce;
        Some(true)
    })
}
```

### Step 4: Set up listener and cleanup

Wire everything together:

```rust
async fn run_contextless_oracle(
    charlie_client: AlkahestClient<BaseExtensions>
) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();

    // Initialize registry (Step 2)
    {
        let mut registry = identity_registry().lock().await;
        registry.insert(known_identity_address, 0);
    }

    // Listen and validate
    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            verify_identity,
            |_| async {},
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: true,  // Contextless often only needs new fulfillments
            },
        )
        .await?;

    // Cleanup
    charlie_oracle.unsubscribe(listen_result.subscription_id).await?;

    Ok(())
}
```

**Complete contextless oracle pattern:**

1. Define fulfillment format and registry state
2. Initialize your oracle's registry/database
3. Implement validation callback that:
   - Extracts fulfillment data (no demand needed)
   - Checks against oracle's internal state
   - Performs intrinsic validation (e.g., signature checks)
   - Updates state if needed
   - Returns `Some(true)` or `Some(false)`
4. Set up listener and cleanup

**Key difference from demand-based:**
- Never calls `get_escrow_and_demand()` - validation is entirely based on fulfillment content and oracle's own state

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_identity.rs`

## Choosing the Right Pattern

| Validation Type | Pattern | Returns | State | Uses Demand? |
|-----------------|---------|---------|-------|--------------|
| Fast computation | Synchronous | `Some(bool)` | None | Yes |
| Time-based monitoring | Asynchronous | `None` | Job queue | Yes |
| Generic verification | Contextless | `Some(bool)` | Registry | No |
| Custom business logic | Synchronous | `Some(bool)` | None | Yes |
| Consensus/voting | Asynchronous | `None` | Vote tracker | Yes/No |

**Decision tree:**
1. Does validation need demand parameters? If no → **Contextless**
2. Does validation complete in < 1 second? If yes → **Synchronous**
3. Does validation require waiting or monitoring? If yes → **Asynchronous**

## Production Considerations

### Error Handling and Logging

Always handle errors gracefully and log for debugging:

```rust
use tracing::{info, warn, error};

// In validation callback
let Ok(data) = parse_data(&attestation) else {
    error!("Failed to parse attestation: {:?}", attestation.uid);
    return Some(false);  // Reject invalid data
};

// Log decisions
info!(
    uid = ?attestation.uid,
    decision = decision,
    "Oracle decision: {}",
    if decision { "approved" } else { "rejected" }
);
```

### State Persistence

For async oracles, persist state to survive restarts:

```rust
// Use sled, rocksdb, or postgres for production
use sled::Db;

struct PersistentJobDb {
    db: Db,
}

impl PersistentJobDb {
    fn insert_job(&self, uid: &FixedBytes<32>, job: &UptimeJob) -> eyre::Result<()> {
        let value = bincode::serialize(job)?;
        self.db.insert(uid.as_slice(), value)?;
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

### Gas Management and Retries

Handle transaction failures gracefully:

```rust
async fn submit_with_retry(
    arbiters: &ArbitersModule,
    uid: FixedBytes<32>,
    decision: bool,
) -> eyre::Result<()> {
    for attempt in 0..3 {
        match arbiters.arbitrate_as_trusted_oracle(uid, decision).await {
            Ok(_) => return Ok(()),
            Err(e) => {
                warn!("Arbitration attempt {} failed: {}", attempt + 1, e);
                tokio::time::sleep(Duration::from_secs(2u64.pow(attempt))).await;
            }
        }
    }
    Err(eyre!("Failed to submit arbitration after 3 attempts"))
}
```

### Security Checklist

1. **Private key security**: Use environment variables or key management services
2. **Input sanitization**: Validate all external data before processing
3. **Rate limiting**: Track requests per address to prevent spam
4. **Audit logging**: Record all decisions with timestamps
5. **Monitoring**: Track approval/rejection rates and investigate anomalies

## Testing Your Oracle

Test validation logic in isolation before running the full oracle:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_validation_logic() {
        let test_case = TestCase {
            input: "hello".to_owned(),
            output: "HELLO".to_owned(),
        };

        let result = run_command_test("tr '[:lower:]' '[:upper:]'", &test_case).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_reject_invalid() {
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

See the reference implementations for full integration test examples:
- `alkahest-rs/tests/offchain_oracle_capitalization.rs` (synchronous)
- `alkahest-rs/tests/offchain_oracle_uptime.rs` (asynchronous)
- `alkahest-rs/tests/offchain_oracle_identity.rs` (contextless)
