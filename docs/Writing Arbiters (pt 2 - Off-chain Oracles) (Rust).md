# Writing Arbiters (pt 2 - Off-chain Oracles)

Off-chain oracles are arbitration services that run outside the blockchain but submit their decisions on-chain via the `TrustedOracleArbiter` contract. Unlike on-chain arbiters (see pt 1) that validate within smart contract execution, oracles perform arbitration in an external environment where they can access APIs, run complex computations, maintain state databases, or integrate with external systems.

This guide focuses on implementing oracle services in Rust using the `alkahest-rs` SDK. The patterns here apply to building production oracle infrastructure that can validate work submissions against arbitrary criteria.

## Understanding Your Role as an Oracle

**Example scenario**: Alice wants Bob to capitalize a string ("hello world" → "HELLO WORLD"). She creates an escrow offering payment, specifying you (Charlie) as the trusted oracle who will verify if Bob's work is correct. Bob submits his result, requests your arbitration, and if you approve, he can claim the payment.

Your oracle service needs to:

1. **Listen** for arbitration requests that specify you as the oracle
2. **Extract** the fulfillment data and original demand from attestations
3. **Validate** the fulfillment according to the demand criteria
4. **Submit** your approval or rejection decision on-chain

The `TrustedOracleArbiter` contract handles the on-chain logic - your job is to implement the validation logic and submit decisions.

For a complete example of how oracles fit into the escrow/fulfillment flow, see "Escrow Flow (pt 2 - Job Trading)".

## Three Validation Patterns

| Pattern | Returns | State | Demand Access | Use Case |
|---------|---------|-------|---------------|----------|
| **Contextless** | `Some(bool)` | Oracle maintains state | Ignores demand | Signature verification, identity validation, format checking |
| **Demand-Based** | `Some(bool)` | Stateless | Uses demand from callback | Custom validation per escrow, test case validation |
| **Asynchronous** | `None` | Job queue | Uses demand from callback | Time-based monitoring, long-running computations |

**Decision flowchart:**
```
Does validation require waiting over time?
  ├─ Yes → Asynchronous
  └─ No → Does validation need the escrow's demand parameters?
           ├─ Yes → Demand-Based
           └─ No → Contextless
```

## Pattern 1: Contextless Validation

Contextless oracles validate fulfillments based purely on the fulfillment's intrinsic properties and the oracle's own maintained state, without referencing the original escrow demand. This pattern is useful for building reusable validation services that work across any escrow.

**When to use**: Signature verification, format checking, identity validation, standard verification against a maintained registry.

**Why contextless**: The oracle provides a generic service (e.g., "I verify signatures from known identities") rather than validating against buyer-specific criteria. The validation logic doesn't depend on what Alice requested - only on what Bob submitted.

**Composability**: Because contextless oracles are generic and reusable, they can be easily composed with other arbiters using logical combinators like `AllArbiter` and `AnyArbiter`. For example, you could require that a fulfillment is both signed by a verified identity (contextless oracle) AND meets specific job criteria (demand-based oracle). See "Escrow Flow (pt 3 - Composing Demands)" for composition patterns.

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_identity.rs`

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
// This represents the oracle's concept of which identities are valid
// and tracks nonces to prevent replay attacks
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

### Step 3: Implement the validation callback

The validation callback receives an `AttestationWithDemand` containing both the fulfillment attestation and the demand bytes from the `ArbitrationRequested` event. For contextless validation, we ignore the demand and focus on the attestation:

```rust
use alkahest_rs::{
    contracts::StringObligation,
    clients::oracle::{ArbitrateOptions, AttestationWithDemand},
    extensions::HasOracle,
};
use alloy::dyn_abi::SolType;

fn verify_identity(
    awd: &AttestationWithDemand,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = awd.attestation.clone();

    Box::pin(async move {
        // Step 3a: Extract fulfillment data
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
            return Some(false);  // Unknown identity - not in our registry
        };

        // Step 3d: Verify nonce progression (replay protection)
        // Each identity must use an increasing nonce to prevent reusing old signatures
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

### Step 4: Set up listener with after-arbitrate hook

Wire everything together with the listener and an optional callback that runs after each decision is submitted on-chain:

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
            |decision| async move {
                // Optional: called after arbitration is submitted on-chain
                // Useful for logging, notifications, or post-processing
                println!("Arbitrated {}: {}", decision.attestation.uid, decision.decision);
            },
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

**Complete pattern:**

1. Define fulfillment format and registry state
2. Initialize your oracle's registry/database
3. Implement validation callback that:
   - Extracts fulfillment data
   - Checks against oracle's internal state
   - Performs validation (e.g., signature checks)
   - Updates state if needed
   - Returns `Some(true)` or `Some(false)`
4. Set up listener with optional after-arbitrate hook and cleanup

## Pattern 2: Demand-Based Validation

Demand-based oracles validate fulfillments against specific criteria provided by the buyer in the escrow demand. Each escrow can specify different requirements, and the oracle validates that Bob's fulfillment meets Alice's exact specifications.

**When to use**: Custom validation criteria per escrow, need to compare fulfillment against buyer's specifications, computational validation with test cases.

**Why demand-based**: Alice specifies exactly what she wants (e.g., "capitalize these specific test cases"), and the oracle verifies Bob's work matches those requirements. Different escrows have different demands, all validated by the same oracle.

**Example flow**:
```
1. Alice creates escrow → demands oracle=charlie, data="capitalize hello world"
                         offers 100 tokens

2. Bob fulfills → submits "HELLO WORLD"
                 references Alice's escrow via refUID

3. Bob requests arbitration → asks Charlie to validate

4. Charlie validates → extracts Bob's result and Alice's query
                      checks if "HELLO WORLD" matches uppercase("hello world")
                      submits decision on-chain

5. Bob claims payment → uses approved attestation to collect escrow
```

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_capitalization.rs`

### Step 1: Define your demand format

Decide what parameters buyers provide in their escrow demands:

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

Buyers encode this as JSON in the `TrustedOracleArbiter` demand's `data` field.

### Step 2: Implement validation with demand

The validation callback receives an `AttestationWithDemand` containing both the fulfillment attestation and the demand bytes from the `ArbitrationRequested` event:

```rust
use alkahest_rs::{
    AlkahestClient,
    clients::oracle::{ArbitrateOptions, AttestationWithDemand},
    contracts::StringObligation,
    extensions::{HasOracle, HasStringObligation},
};
use std::sync::Arc;

async fn run_oracle(charlie_client: AlkahestClient<BaseExtensions>) -> eyre::Result<()> {
    let charlie_oracle = charlie_client.oracle().clone();
    let charlie_client_arc = Arc::new(charlie_client.clone());

    let listen_result = charlie_oracle
        .listen_and_arbitrate_async(
            move |awd: &AttestationWithDemand| {
                let client = charlie_client_arc.clone();
                let attestation = awd.attestation.clone();
                let demand_bytes = awd.demand.clone();

                async move {
                    // Step 2a: Extract fulfillment using client helper
                    let Ok(fulfillment) = client
                        .extract_obligation_data::<StringObligation::ObligationData>(&attestation)
                    else {
                        return Some(false);
                    };

                    let submitted_command = fulfillment.item;

                    // Step 2b: Parse your custom demand format from the callback argument
                    let Ok(test_demand) = serde_json::from_slice::<CommandTestDemand>(
                        demand_bytes.as_ref()
                    ) else {
                        return Some(false);
                    };

                    // Step 2c: Apply validation logic using demand parameters
                    // Run each test case to verify Bob's submission works correctly
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
                            _ => return Some(false),
                        };

                        if output != case.output {
                            return Some(false);
                        }
                    }

                    Some(true)
                }
            },
            |decision| async move {
                // Called after arbitration tx succeeds
                println!("Arbitrated {}: {}", decision.attestation.uid, decision.decision);
            },
            &ArbitrateOptions {
                skip_arbitrated: true,
                only_new: false,
            },
        )
        .await?;

    charlie_oracle.unsubscribe(listen_result.subscription_id).await?;
    Ok(())
}
```

**SDK helpers:**

- `client.extract_obligation_data::<T>()` - Decode fulfillment attestation data
- The `awd.demand` field contains the demand bytes from the `ArbitrationRequested` event
  - This is Alice's original requirements encoded as bytes - parse as needed for your use case

### Step 3: Understanding the data flow

```
ArbitrationRequested Event
  └─ obligation: fulfillment UID
  └─ oracle: charlie_address
  └─ demand: bytes (your custom demand format)
        │
        ▼
  Callback receives AttestationWithDemand {
        │
        ├─ attestation: Fulfillment Attestation
        │    └─ data: StringObligation { item: "tr '[:lower:]' '[:upper:]'" }
        │    └─ refUID: points to escrow
        │
        └─ demand: Bytes (from event)
             └─ Your custom format (e.g., JSON with test_cases)
  }
```

**Complete pattern:**

1. Define demand format (your oracle's API)
2. Implement validation callback that receives `&AttestationWithDemand`:
   - Use `extract_obligation_data()` to get fulfillment from `awd.attestation`
   - Parse `awd.demand` bytes for your custom demand format
   - Apply validation logic comparing fulfillment to demand
   - Return `Some(true)` or `Some(false)`
3. Set up listener with after-arbitrate hook

## Pattern 3: Asynchronous Validation

Asynchronous oracles handle validation that cannot complete immediately. They require monitoring over time, accumulating data, or waiting for external conditions. The oracle schedules work for later, and a background worker submits the decision when ready.

**When to use**: Time-based monitoring (uptime checks, deadline validation), accumulating evidence over multiple observations, long-running computations, waiting for consensus from multiple sources.

**Why asynchronous**: Some validation is inherently time-based. For example, "verify this server stays up for 24 hours" cannot be validated instantly - you must schedule checks over time and make a final decision later.

**Architecture**:
```
Listener (receives requests) → Job Queue (stores pending work)
                                     ↓
                                Worker Thread (processes jobs over time)
                                     ↓
                                On-chain Submission (final decision)
```

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

The listener callback schedules work but **does not make a decision** - it returns `None` to defer the decision to the worker:

```rust
use alkahest_rs::clients::oracle::AttestationWithDemand;

fn schedule_pings(
    awd: &AttestationWithDemand,
) -> Pin<Box<dyn Future<Output = Option<bool>> + Send>> {
    let attestation = awd.attestation.clone();
    let demand_bytes = awd.demand.clone();

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

        // Step 2b: Parse demand from callback argument
        let Ok(uptime_demand) = serde_json::from_slice::<UptimeDemand>(
            demand_bytes.as_ref()
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

        // Step 2f: Return None to defer the decision
        // Unlike synchronous patterns that return Some(true/false),
        // async oracles return None and let the worker submit the decision later
        None
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
            // CRITICAL: Unlike synchronous oracles where listen_and_arbitrate_async
            // handles submission automatically, async oracles must MANUALLY call
            // arbitrate_as_trusted_oracle() to submit their decision
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
2. Implement scheduling callback that receives `&AttestationWithDemand`:
   - Extract fulfillment data from `awd.attestation`
   - Parse `awd.demand` bytes for your custom demand format
   - Create job schedule
   - Store job in shared database
   - Return `None` (defers decision)
3. Implement background worker that:
   - Polls job database
   - Executes scheduled work
   - Makes decision based on results
   - Calls `arbitrate_as_trusted_oracle()` to submit
4. Wire together with shared state and cleanup

**Key differences from synchronous patterns:**

| Aspect | Synchronous (Patterns 1 & 2) | Asynchronous (Pattern 3) |
|--------|------------------------------|--------------------------|
| Callback return value | `Some(true)` or `Some(false)` | `None` (defers decision) |
| Decision submission | Automatic via SDK | Manual via `arbitrate_as_trusted_oracle()` |
| Architecture | Single callback function | Callback + background worker |
| State management | Optional (Pattern 1 only) | Required (job queue) |
| Timing | Instant validation | Delayed validation over time |

**Reference implementation**: `alkahest-rs/tests/offchain_oracle_uptime.rs`

## Choosing the Right Pattern

**Quick decision tree:**
```
1. Does validation require waiting/monitoring over time?
   └─ YES → Pattern 3: Asynchronous

2. Does validation need the escrow's demand parameters?
   ├─ YES → Pattern 2: Demand-Based
   └─ NO  → Pattern 1: Contextless
```

**Detailed comparison:**

| Validation Type | Pattern | Complexity | Example |
|-----------------|---------|------------|---------|
| Signature verification | Contextless | Low | Verify identity attestations |
| Format/standard checking | Contextless | Low | Validate JSON schemas |
| Test case validation | Demand-Based | Medium | Run buyer-specified tests |
| Computational verification | Demand-Based | Medium | Check algorithmic solutions |
| Uptime monitoring | Asynchronous | High | Verify 99% uptime over 24h |
| Consensus voting | Asynchronous | High | Wait for multiple approvals |

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

## Reference Implementations

See the full working examples in the test suite:
- **Pattern 1 (Contextless)**: `alkahest-rs/tests/offchain_oracle_identity.rs` - Identity verification with signature validation
- **Pattern 2 (Demand-Based)**: `alkahest-rs/tests/offchain_oracle_capitalization.rs` - Test case validation for shell commands
- **Pattern 3 (Asynchronous)**: `alkahest-rs/tests/offchain_oracle_uptime.rs` - Uptime monitoring over time windows

These tests demonstrate the complete flow including escrow creation (Alice), fulfillment submission (Bob), oracle validation (Charlie), and payment collection.
