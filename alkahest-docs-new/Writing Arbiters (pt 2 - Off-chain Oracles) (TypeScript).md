# Writing Arbiters (pt 2 - Off-chain Oracles)

Off-chain oracles are arbitration services that run outside the blockchain but submit their decisions on-chain via the `TrustedOracleArbiter` contract. Unlike on-chain arbiters (see pt 1) that validate within smart contract execution, oracles perform arbitration in an external environment where they can access APIs, run complex computations, maintain state databases, or integrate with external systems.

This guide focuses on implementing oracle services in TypeScript using the `alkahest-ts` SDK. The patterns here apply to building production oracle infrastructure that can validate work submissions against arbitrary criteria.

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

| Pattern | Returns | State | Escrow Access | Use Case |
|---------|---------|-------|---------------|----------|
| **Contextless** | `boolean` | Oracle maintains state | No | Signature verification, identity validation, format checking |
| **Demand-Based** | `boolean` | Stateless | Yes - reads demand | Custom validation per escrow, test case validation |
| **Asynchronous** | `null` | Job queue | Yes - reads demand | Time-based monitoring, long-running computations |

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

**Reference implementation**: `alkahest-ts/tests/integration/offchain-oracle-identity.test.ts`

### Step 1: Define fulfillment format and registry state

Define what fulfillments look like and what state you maintain:

```typescript
import { parseAbiParameters, recoverMessageAddress } from "viem";

// Fulfillment format (what sellers submit)
type IdentityFulfillment = {
  pubkey: `0x${string}`;
  nonce: number;
  data: string;
  signature: `0x${string}`;
};

// Oracle's internal registry (identity address -> current nonce)
// This represents the oracle's concept of which identities are valid
// and tracks nonces to prevent replay attacks
const identityRegistry = new Map<`0x${string}`, number>();

// ABI for decoding StringObligation data
const stringObligationAbi = parseAbiParameters("(string item)");
```

### Step 2: Initialize your registry

Before starting the listener, populate your oracle's state:

```typescript
async function runContextlessOracle(charlieClient: AlkahestClient) {
  // Step 2: Register known identities with starting nonces
  identityRegistry.set(identityAddress1, 0);
  identityRegistry.set(identityAddress2, 0);
  // In production: load from database

  // ... rest of oracle setup ...
}
```

### Step 3: Implement the validation callback

The validation callback receives the fulfillment attestation and checks it against your registry:

```typescript
const listener = await charlieClient.oracle.listenAndArbitrate(
  async (attestation) => {
    // Step 3a: Extract fulfillment data
    const obligation = charlieClient.extractObligationData(
      stringObligationAbi,
      attestation,
    );

    const payload = obligation[0]?.item;
    if (!payload) return false;

    // Step 3b: Parse the fulfillment payload
    let parsed: IdentityFulfillment;
    try {
      parsed = JSON.parse(payload) as IdentityFulfillment;
    } catch {
      return false;
    }

    // Step 3c: Check against oracle's registry
    const currentNonce = identityRegistry.get(parsed.pubkey);
    if (currentNonce === undefined) {
      return false;  // Unknown identity - not in our registry
    }

    // Step 3d: Verify nonce progression (replay protection)
    // Each identity must use an increasing nonce to prevent reusing old signatures
    if (parsed.nonce <= currentNonce) {
      return false;
    }

    // Step 3e: Verify signature format
    if (typeof parsed.signature !== "string" || parsed.signature.length !== 132) {
      return false;
    }

    // Step 3f: Verify cryptographic signature
    const message = `${parsed.data}:${parsed.nonce}`;
    let recovered: `0x${string}`;
    try {
      recovered = await recoverMessageAddress({
        message,
        signature: parsed.signature,
      });
    } catch {
      return false;
    }

    if (recovered.toLowerCase() !== parsed.pubkey.toLowerCase()) {
      return false;  // Signature mismatch
    }

    // Step 3g: Update state and approve
    identityRegistry.set(parsed.pubkey, parsed.nonce);
    return true;
  },
  { skipAlreadyArbitrated: true },
);
```

### Step 4: Cleanup

Stop the listener when done:

```typescript
// When shutting down the oracle
listener.unwatch();
identityRegistry.clear();
```

**Complete pattern:**

1. Define fulfillment format and registry state
2. Initialize your oracle's registry/database
3. Implement validation callback that:
   - Extracts fulfillment data
   - Checks against oracle's internal state
   - Performs validation (e.g., signature checks)
   - Updates state if needed
   - Returns `true` or `false`
4. Cleanup listener and state

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

**Reference implementation**: `alkahest-ts/tests/integration/offchain-oracle-capitalization.test.ts`

### Step 1: Define your demand format

Decide what parameters buyers provide in their escrow demands:

```typescript
import {
  encodeAbiParameters,
  hexToBytes,
  parseAbiParameters,
  stringToHex,
} from "viem";
import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(execCallback);

type ShellTestCase = {
  input: string;
  output: string;
};

type ShellOracleDemand = {
  description: string;
  test_cases: ShellTestCase[];
};

// ABIs for decoding
const stringObligationAbi = parseAbiParameters("(string item)");
const shellDemandAbi = parseAbiParameters("(bytes payload)");
```

Buyers encode this as JSON in the `TrustedOracleArbiter` demand's `data` field.

### Step 2: Implement validation with demand

The SDK provides critical helpers for extracting both the fulfillment and the original escrow demand:

```typescript
const listener = await charlieClient.oracle.listenAndArbitrate(
  async (attestation) => {
    // Step 2a: Extract fulfillment using client helper
    const obligation = charlieClient.extractObligationData(
      stringObligationAbi,
      attestation,
    );

    const statement = obligation[0]?.item;
    if (!statement) return false;

    // Step 2b: Get escrow and extract demand using client helper
    // CRITICAL: This fetches the escrow attestation from the fulfillment's refUID
    // and decodes the nested TrustedOracleArbiter demand structure
    // Without checking the refUID, Bob could reuse one valid fulfillment
    // to claim multiple different escrows (replay attack)
    const [, demandData] = await charlieClient.getEscrowAndDemand(
      shellDemandAbi,
      attestation,
    );

    const payloadHex = demandData[0]?.payload;
    if (!payloadHex) return false;

    // Step 2c: Parse your custom demand format from the inner data
    // This is where Alice's specific requirements are decoded
    const payloadJson = new TextDecoder().decode(hexToBytes(payloadHex));

    let payload: ShellOracleDemand;
    try {
      payload = JSON.parse(payloadJson) as ShellOracleDemand;
    } catch {
      return false;
    }

    // Step 2d: Apply validation logic using demand parameters
    // Run each test case to verify Bob's submission works correctly
    for (const testCase of payload.test_cases) {
      const command = `echo "$INPUT" | ${statement}`;
      try {
        const { stdout } = await execAsync(command, {
          env: {
            ...process.env,
            INPUT: testCase.input,
          },
          shell: "/bin/bash",
        });

        if (stdout.trimEnd() !== testCase.output) {
          return false;
        }
      } catch {
        return false;
      }
    }

    return true;
  },
  { skipAlreadyArbitrated: true },
);
```

**SDK helpers introduced:**

- `client.extractObligationData(abi, attestation)` - Decode fulfillment attestation data
- `client.getEscrowAndDemand(abi, attestation)` - **THE KEY HELPER** - Fetch escrow from refUID and decode demand structure
  - Internally fetches the escrow attestation referenced by the fulfillment
  - Then decodes the TrustedOracleArbiter wrapper and inner demand
  - This is how you access Alice's original requirements to validate against Bob's work

### Step 3: Understanding the data flow

```
Fulfillment Attestation
  └─ data: StringObligation { item: "tr '[:lower:]' '[:upper:]'" }
  └─ refUID: points to escrow ──┐
                                 │
                                 ▼
                         Escrow Attestation
                           └─ data: ERC20EscrowObligation {
                                arbiter: TrustedOracleArbiter address,
                                demand: TrustedOracleArbiter::DemandData {
                                  oracle: charlie_address,
                                  data: CommandTestDemand (JSON) {
                                    test_cases: [...]
                                  }
                                }
                              }
```

**Complete pattern:**

1. Define demand format (your oracle's API)
2. Implement validation callback:
   - Use `extractObligationData()` to get fulfillment
   - Use `getEscrowAndDemand()` to get escrow demand
   - Parse your custom inner demand format
   - Apply validation logic comparing fulfillment to demand
   - Return `true` or `false`
3. Cleanup listener when done

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

**Reference implementation**: `alkahest-ts/tests/integration/offchain-oracle-uptime.test.ts`

### Step 1: Define demand format and job state

Define both the demand buyers will provide and the internal state for tracking scheduled work:

```typescript
import { parseAbiParameters, stringToHex, encodeAbiParameters, hexToBytes } from "viem";

// Demand format (buyers provide this)
type UptimeDemand = {
  service_url: string;
  min_uptime: number;      // Required uptime percentage (0.0-1.0)
  start: number;           // Start time for monitoring window
  end: number;             // End time for monitoring window
  check_interval_secs: number;
};

// Internal job state (your oracle tracks this)
type PingEvent = {
  delayMs: number;
  success: boolean;
};

type UptimeJob = {
  minUptime: number;
  schedule: PingEvent[];
};

// Shared state between listener and worker
type SchedulerContext = {
  jobDb: Map<`0x${string}`, UptimeJob>;
  urlIndex: Map<string, `0x${string}`>;
  waiters: Array<() => void>;
};

let schedulerContext: SchedulerContext | undefined;

// ABIs for decoding
const stringObligationAbi = parseAbiParameters("(string item)");
const uptimeDemandAbi = parseAbiParameters("(bytes payload)");
```

### Step 2: Implement the scheduling callback

The listener callback schedules work but **does not make a decision** - it returns `null` to defer the decision to the worker:

```typescript
const listener = await charlieClient.oracle.listenAndArbitrate(
  async (attestation) => {
    const ctx = schedulerContext;
    if (!ctx) return null;

    // Step 2a: Extract fulfillment (service URL submitted)
    const obligation = charlieClient.extractObligationData(
      stringObligationAbi,
      attestation,
    );

    const statement = obligation[0];
    if (!statement?.item) return null;

    const fulfillmentUid = ctx.urlIndex.get(statement.item);
    if (!fulfillmentUid || ctx.jobDb.has(fulfillmentUid)) return null;

    // Step 2b: Get the demand from escrow
    const [, demandData] = await charlieClient.getEscrowAndDemand(
      uptimeDemandAbi,
      attestation,
    );

    const payloadHex = demandData[0]?.payload;
    if (!payloadHex) return null;

    // Step 2c: Parse demand
    let parsed: UptimeDemand;
    try {
      const json = new TextDecoder().decode(hexToBytes(payloadHex));
      parsed = JSON.parse(json) as UptimeDemand;
    } catch {
      return null;
    }

    // Step 2d: Create monitoring schedule
    const totalSpan = Math.max(parsed.end - parsed.start, 1);
    const interval = Math.max(parsed.check_interval_secs, 1);
    const checks = Math.max(Math.floor(totalSpan / interval), 1);
    const schedule: PingEvent[] = [];
    for (let i = 0; i < checks; i++) {
      schedule.push({
        delayMs: 100 + i * 25,
        success: true,  // Will be determined by actual ping
      });
    }

    // Step 2e: Store job for background processing
    ctx.jobDb.set(fulfillmentUid, {
      minUptime: parsed.min_uptime,
      schedule,
    });

    notifyScheduler(ctx);  // Wake up worker

    // Step 2f: Return null to defer the decision
    // Unlike synchronous patterns that return true/false,
    // async oracles return null and let the worker submit the decision later
    return null;
  },
  { skipAlreadyArbitrated: true },
);
```

### Step 3: Implement the background worker

Create a worker that processes scheduled jobs and submits decisions:

```typescript
function startSchedulerWorker(
  ctx: SchedulerContext,
  arbiters: typeof charlieClient.arbiters,
) {
  let active = true;

  const promise = (async () => {
    while (active) {
      // Step 3a: Get next job from queue
      let entry = dequeueJob(ctx);
      if (!entry) {
        const hasJob = await waitForJob(ctx, 2000);
        if (!hasJob) {
          if (ctx.jobDb.size === 0) break;
          continue;
        }
        entry = dequeueJob(ctx);
        if (!entry) continue;
      }

      const { uid, job } = entry;

      // Step 3b: Execute the monitoring schedule
      let successes = 0;
      const totalChecks = Math.max(job.schedule.length, 1);

      for (const ping of job.schedule) {
        await Bun.sleep(ping.delayMs);
        // In production: actually ping the service
        // const success = await checkServiceHealth(serviceUrl);
        if (ping.success) successes += 1;
      }

      // Step 3c: Calculate result and make decision
      const uptime = successes / totalChecks;
      const decision = uptime >= job.minUptime;

      // Step 3d: Submit decision on-chain
      // CRITICAL: Unlike synchronous oracles where listenAndArbitrate
      // handles submission automatically, async oracles must MANUALLY call
      // arbitrateAsTrustedOracle() to submit their decision
      await arbiters.arbitrateAsTrustedOracle(uid, decision);
    }
  })();

  return {
    stop: () => {
      active = false;
      notifyScheduler(ctx);
    },
    promise,
  };
}

// Helper functions
function dequeueJob(ctx: SchedulerContext) {
  const next = ctx.jobDb.entries().next();
  if (next.done) return undefined;
  const [uid, job] = next.value;
  ctx.jobDb.delete(uid);
  return { uid, job };
}

function notifyScheduler(ctx: SchedulerContext) {
  const waiter = ctx.waiters.shift();
  waiter?.();
}

async function waitForJob(ctx: SchedulerContext, timeoutMs: number) {
  if (ctx.jobDb.size > 0) return true;
  return await new Promise<boolean>((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const waiter = () => {
      clearTimeout(timer);
      resolve(true);
    };
    timer = setTimeout(() => {
      const idx = ctx.waiters.indexOf(waiter);
      if (idx !== -1) ctx.waiters.splice(idx, 1);
      resolve(false);
    }, timeoutMs);
    ctx.waiters.push(waiter);
  });
}
```

### Step 4: Wire everything together

Set up the listener, worker, and shared state:

```typescript
async function runAsyncOracle(charlieClient: AlkahestClient) {
  // Step 4a: Initialize shared state
  const scheduler: SchedulerContext = {
    jobDb: new Map(),
    urlIndex: new Map(),
    waiters: [],
  };
  schedulerContext = scheduler;

  // Map service URLs to fulfillment UIDs for lookup
  scheduler.urlIndex.set(serviceUrl, fulfillmentUid);

  // Step 4b: Start background worker
  const worker = startSchedulerWorker(scheduler, charlieClient.arbiters);

  // Step 4c: Start listener
  const listener = await charlieClient.oracle.listenAndArbitrate(
    // ... scheduling callback from Step 2 ...
    { skipAlreadyArbitrated: true },
  );

  // Step 4d: Wait and cleanup
  // In production: keep running until shutdown signal
  await someShutdownSignal();

  listener.unwatch();
  worker.stop();
  await worker.promise;
  schedulerContext = undefined;
}
```

**Complete asynchronous oracle pattern:**

1. Define demand format and job state structures
2. Implement scheduling callback that:
   - Extracts fulfillment data
   - Gets demand from escrow
   - Creates job schedule
   - Stores job in shared database
   - Returns `null` (defers decision)
3. Implement background worker that:
   - Polls job database
   - Executes scheduled work
   - Makes decision based on results
   - Calls `arbitrateAsTrustedOracle()` to submit
4. Wire together with shared state and cleanup

**Key differences from synchronous patterns:**

| Aspect | Synchronous (Patterns 1 & 2) | Asynchronous (Pattern 3) |
|--------|------------------------------|--------------------------|
| Callback return value | `true` or `false` | `null` (defers decision) |
| Decision submission | Automatic via SDK | Manual via `arbitrateAsTrustedOracle()` |
| Architecture | Single callback function | Callback + background worker |
| State management | Optional (Pattern 1 only) | Required (job queue) |
| Timing | Instant validation | Delayed validation over time |

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

```typescript
// In validation callback
try {
  const data = await parseData(attestation);
} catch (error) {
  console.error("Failed to parse attestation:", attestation.uid, error);
  return false;  // Reject invalid data
}

// Log decisions
console.log(
  `Oracle decision for ${attestation.uid}: ${decision ? "approved" : "rejected"}`
);
```

### State Persistence

For async oracles, persist state to survive restarts:

```typescript
import Database from "better-sqlite3";

class PersistentJobDb {
  private db: Database.Database;

  constructor(filepath: string) {
    this.db = new Database(filepath);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        uid TEXT PRIMARY KEY,
        job TEXT NOT NULL
      )
    `);
  }

  insertJob(uid: `0x${string}`, job: UptimeJob) {
    const stmt = this.db.prepare("INSERT OR REPLACE INTO jobs (uid, job) VALUES (?, ?)");
    stmt.run(uid, JSON.stringify(job));
  }

  getNextJob(): { uid: `0x${string}`; job: UptimeJob } | undefined {
    const row = this.db.prepare("SELECT uid, job FROM jobs LIMIT 1").get() as
      | { uid: string; job: string }
      | undefined;
    if (!row) return undefined;

    this.db.prepare("DELETE FROM jobs WHERE uid = ?").run(row.uid);
    return {
      uid: row.uid as `0x${string}`,
      job: JSON.parse(row.job) as UptimeJob,
    };
  }
}
```

### Retry Logic

Handle transaction failures gracefully:

```typescript
async function submitWithRetry(
  arbiters: typeof charlieClient.arbiters,
  uid: `0x${string}`,
  decision: boolean,
  maxAttempts = 3,
) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await arbiters.arbitrateAsTrustedOracle(uid, decision);
      return;
    } catch (error) {
      console.warn(`Arbitration attempt ${attempt + 1} failed:`, error);
      if (attempt < maxAttempts - 1) {
        await Bun.sleep(2 ** attempt * 1000);
      }
    }
  }
  throw new Error(`Failed to submit arbitration after ${maxAttempts} attempts`);
}
```

## Reference Implementations

See the full working examples in the test suite:
- **Pattern 1 (Contextless)**: `alkahest-ts/tests/integration/offchain-oracle-identity.test.ts` - Identity verification with signature validation
- **Pattern 2 (Demand-Based)**: `alkahest-ts/tests/integration/offchain-oracle-capitalization.test.ts` - Test case validation for shell commands
- **Pattern 3 (Asynchronous)**: `alkahest-ts/tests/integration/offchain-oracle-uptime.test.ts` - Uptime monitoring over time windows

These tests demonstrate the complete flow including escrow creation (Alice), fulfillment submission (Bob), oracle validation (Charlie), and payment collection.
