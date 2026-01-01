# Writing Arbiters (pt 2 - Off-chain Oracles)

Off-chain oracles are arbitration services that run outside the blockchain but submit their decisions on-chain via the `TrustedOracleArbiter` contract. Unlike on-chain arbiters (see pt 1) that validate within smart contract execution, oracles perform arbitration in an external environment where they can access APIs, run complex computations, maintain state databases, or integrate with external systems.

This guide focuses on implementing oracle services in Python using the `alkahest-py` SDK. The patterns here apply to building production oracle infrastructure that can validate work submissions against arbitrary criteria.

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
| **Contextless** | `bool` | Oracle maintains state | Ignores demand | Signature verification, identity validation, format checking |
| **Demand-Based** | `bool` | Stateless | Uses demand from callback | Custom validation per escrow, test case validation |
| **Asynchronous** | `bool` (simulated) | Job queue | Uses demand from callback | Time-based monitoring, long-running computations |

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

**Reference implementation**: `alkahest-py/alkahest_py/oracle/test_identity.py`

### Step 1: Define fulfillment format and registry state

Define what fulfillments look like and what state you maintain:

```python
import json
from dataclasses import dataclass
from typing import Dict
from eth_account import Account
from eth_account.messages import encode_defunct

@dataclass
class IdentityFulfillment:
    pubkey: str
    nonce: int
    data: str
    signature: str

# Oracle's internal registry (identity address -> current nonce)
# This represents the oracle's concept of which identities are valid
# and tracks nonces to prevent replay attacks
identity_registry: Dict[str, int] = {}
```

### Step 2: Initialize your registry

Before starting the listener, populate your oracle's state:

```python
async def run_contextless_oracle(oracle_client):
    # Step 2: Register known identities with starting nonces
    identity_registry.clear()
    identity_registry[identity_address_1.lower()] = 0
    identity_registry[identity_address_2.lower()] = 0
    # In production: load from database

    # ... rest of oracle setup ...
```

### Step 3: Implement the validation callback

The validation callback receives two arguments: the fulfillment attestation and the demand bytes from the `ArbitrationRequested` event. For contextless validation, we ignore the demand and focus on the attestation:

```python
from alkahest_py import ArbitrateOptions, ArbitrationMode

def verify_identity_decision(attestation, demand, client) -> bool:
    """
    Verify an identity fulfillment by checking:
    1. The signature is valid
    2. The nonce is greater than the last seen nonce
    3. The recovered address matches the claimed pubkey
    """
    try:
        # Step 3a: Extract fulfillment data
        obligation_str = client.oracle.extract_obligation_data(attestation)
        payload = json.loads(obligation_str)

        parsed = IdentityFulfillment(
            pubkey=payload['pubkey'],
            nonce=payload['nonce'],
            data=payload['data'],
            signature=payload['signature']
        )

        # Step 3b: Check against oracle's registry
        pubkey_lower = parsed.pubkey.lower()
        if pubkey_lower not in identity_registry:
            return False  # Unknown identity - not in our registry

        # Step 3c: Verify nonce progression (replay protection)
        # Each identity must use an increasing nonce to prevent reusing old signatures
        current_nonce = identity_registry[pubkey_lower]
        if parsed.nonce <= current_nonce:
            return False

        # Step 3d: Verify signature format
        sig_len = len(parsed.signature) if parsed.signature else 0
        if not parsed.signature or sig_len not in [130, 132]:
            return False

        # Step 3e: Verify cryptographic signature
        message = f"{parsed.data}:{parsed.nonce}"
        encoded_message = encode_defunct(text=message)

        try:
            recovered = Account.recover_message(encoded_message, signature=parsed.signature)
        except Exception:
            return False

        # Check recovered address matches claimed pubkey
        if recovered.lower() != pubkey_lower:
            return False  # Signature mismatch

        # Step 3f: Update state and approve
        identity_registry[pubkey_lower] = parsed.nonce
        return True

    except Exception:
        return False
```

### Step 4: Set up listener and cleanup

Wire everything together with the listener:

```python
# Define callback wrapper (client needs to be accessible)
# The callback receives (attestation, demand) - we ignore demand for contextless validation
def decision_function(attestation, demand):
    return verify_identity_decision(attestation, demand, oracle_client)

def callback(decision):
    # Optional: called after arbitration is submitted on-chain
    # Useful for logging, notifications, or post-processing
    print(f"Arbitrated {decision.attestation.uid}: {decision.decision}")

# Listen and validate
options = ArbitrateOptions(ArbitrationMode.Unarbitrated)
result = await oracle_client.oracle.listen_and_arbitrate_no_spawn(
    decision_function,
    callback,
    options,
    timeout_seconds=10.0
)

# Cleanup
identity_registry.clear()
```

**Complete pattern:**

1. Define fulfillment format and registry state
2. Initialize your oracle's registry/database
3. Implement validation callback that:
   - Extracts fulfillment data
   - Checks against oracle's internal state
   - Performs validation (e.g., signature checks)
   - Updates state if needed
   - Returns `True` or `False`
4. Set up listener with callback and cleanup

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

**Reference implementation**: `alkahest-py/alkahest_py/oracle/test_capitalization.py`

### Step 1: Define your demand format

Decide what parameters buyers provide in their escrow demands:

```python
import json
import subprocess
from dataclasses import dataclass
from typing import List

@dataclass
class ShellTestCase:
    input: str
    output: str

@dataclass
class ShellOracleDemand:
    description: str
    test_cases: List[ShellTestCase]
```

Buyers encode this as JSON in the `TrustedOracleArbiter` demand's `data` field.

### Step 2: Implement validation with demand

The validation callback receives two arguments: the fulfillment attestation and the demand bytes from the `ArbitrationRequested` event:

```python
async def decision_function(attestation, demand):
    """Evaluate whether the fulfillment meets the demand requirements"""
    try:
        # Step 2a: Extract fulfillment using client helper
        statement = oracle_client.oracle.extract_obligation_data(attestation)
    except Exception as e:
        print(f"Failed to extract obligation: {e}")
        return False

    # Step 2b: Parse the demand from the callback argument
    try:
        demand_json = json.loads(bytes(demand).decode('utf-8'))
    except Exception as e:
        print(f"Failed to parse demand: {e}")
        return False

    # Step 2c: Apply validation logic using demand parameters
    # Run each test case to verify Bob's submission works correctly
    for case in demand_json['test_cases']:
        command = f'echo "$INPUT" | {statement}'
        try:
            result = subprocess.run(
                ["bash", "-c", command],
                env={"INPUT": case['input']},
                capture_output=True,
                text=True,
                timeout=5
            )
            if result.returncode != 0:
                return False
            output = result.stdout.rstrip('\n')
            if output != case['output']:
                return False
        except Exception:
            return False

    return True
```

**SDK helpers:**

- `client.oracle.extract_obligation_data(attestation)` - Decode fulfillment attestation data
- The `demand` argument is passed directly to your callback from the `ArbitrationRequested` event
  - This is Alice's original requirements encoded as bytes - parse as needed for your use case

### Step 3: Understanding the data flow

```
ArbitrationRequested Event
  └─ obligation: fulfillment UID
  └─ oracle: charlie_address
  └─ demand: bytes (your custom demand format)
        │
        ▼
  Callback receives (attestation, demand)
        │
        ├─ attestation: Fulfillment Attestation
        │    └─ data: StringObligation { item: "tr '[:lower:]' '[:upper:]'" }
        │    └─ refUID: points to escrow
        │
        └─ demand: bytes (passed directly from event)
             └─ Your custom format (e.g., JSON with test_cases)
```

### Step 4: Set up the listener

```python
def callback(decision):
    """Called when arbitration completes"""
    print(f"Arbitrated {decision.attestation.uid}: {decision.decision}")

# Listen and arbitrate
options = ArbitrateOptions(ArbitrationMode.All)
result = await oracle_client.oracle.listen_and_arbitrate_no_spawn(
    decision_function,
    callback,
    options,
    timeout_seconds=10.0
)

# Verify decisions
assert all(d.decision for d in result.decisions), "Oracle rejected fulfillment"
```

**Complete pattern:**

1. Define demand format (your oracle's API)
2. Implement validation callback that receives `(attestation, demand)`:
   - Use `extract_obligation_data(attestation)` to get fulfillment data
   - Parse `demand` bytes (e.g., `json.loads(bytes(demand).decode('utf-8'))`)
   - Apply validation logic comparing fulfillment to demand
   - Return `True` or `False`
3. Set up listener with callback

## Pattern 3: Asynchronous Validation

Asynchronous oracles handle validation that cannot complete immediately. They require monitoring over time, accumulating data, or waiting for external conditions. For the Python SDK, we demonstrate the pattern with simulated async behavior, though production implementations would use a separate worker process.

**When to use**: Time-based monitoring (uptime checks, deadline validation), accumulating evidence over multiple observations, long-running computations, waiting for consensus from multiple sources.

**Why asynchronous**: Some validation is inherently time-based. For example, "verify this server stays up for 24 hours" cannot be validated instantly - you must schedule checks over time and make a final decision later.

**Architecture (production)**:
```
Listener (receives requests) → Job Queue (stores pending work)
                                     ↓
                                Worker Process (processes jobs over time)
                                     ↓
                                On-chain Submission (final decision)
```

**Note**: The Python SDK's `listen_and_arbitrate_no_spawn` handles submission automatically. For true async validation with deferred decisions, you would need to:
1. Return `None` or skip immediate decisions in the callback
2. Store jobs in a persistent queue (database, Redis, etc.)
3. Run a separate worker process that polls the queue and calls `arbiters.arbitrate_as_trusted_oracle()` manually

**Reference implementation**: `alkahest-py/alkahest_py/oracle/test_uptime.py`

### Step 1: Define demand format

Define the demand buyers will provide:

```python
import json
import time
from dataclasses import dataclass

@dataclass
class UptimeDemand:
    service_url: str
    min_uptime: float        # Required uptime percentage (0.0-1.0)
    start: int               # Start time for monitoring window
    end: int                 # End time for monitoring window
    check_interval_secs: int
```

### Step 2: Implement validation with simulated async monitoring

In this simplified example, we simulate the monitoring synchronously. In production, you'd schedule real checks over time:

```python
async def decision_function(attestation, demand):
    """Simulate uptime monitoring and decide if service meets SLA"""
    try:
        # Step 2a: Extract service URL from fulfillment
        statement = oracle_client.oracle.extract_obligation_data(attestation)

        # Step 2b: Parse demand from callback argument
        demand_json = json.loads(bytes(demand).decode('utf-8'))

        # Verify URL matches
        if statement != demand_json['service_url']:
            return False

        # Step 2c: Simulate uptime checks using demand parameters
        # In production: this would be scheduled over the time window
        total_span = max(demand_json['end'] - demand_json['start'], 1)
        interval = max(demand_json['check_interval_secs'], 1)
        checks = max(total_span // interval, 1)

        # Simulate checks: for testing, we pretend one check failed
        # In production: actually ping the service at scheduled intervals
        successes = checks - 1  # One failure
        uptime = successes / checks

        # Step 2d: Decide based on minimum uptime requirement
        return uptime >= demand_json['min_uptime']

    except Exception:
        return False
```

### Step 3: Set up the listener

```python
def callback(decision):
    print(f"Arbitrated {decision.attestation.uid}: {decision.decision}")

# Arbitrate
options = ArbitrateOptions(ArbitrationMode.All)
result = await oracle_client.oracle.listen_and_arbitrate_no_spawn(
    decision_function,
    callback,
    options,
    timeout_seconds=10.0
)

# Verify decision
assert result.decisions[0].decision == True, "Expected uptime check to pass"
```

### Production Async Pattern

For true asynchronous validation in production:

```python
import asyncio
from typing import Dict, Optional
from dataclasses import dataclass

@dataclass
class UptimeJob:
    fulfillment_uid: str
    service_url: str
    min_uptime: float
    checks_remaining: int
    successes: int
    total_checks: int
    demand_data: bytes  # Store demand for later submission

# Job queue (use Redis, database, etc. in production)
job_queue: Dict[str, UptimeJob] = {}

async def schedule_monitoring(attestation, demand):
    """Schedule job but don't make decision yet"""
    # Extract fulfillment data
    statement = oracle_client.oracle.extract_obligation_data(attestation)
    # Parse demand from callback argument
    demand_json = json.loads(bytes(demand).decode('utf-8'))
    # Create job with demand stored for later
    job_queue[attestation.uid] = UptimeJob(
        fulfillment_uid=attestation.uid,
        service_url=statement,
        min_uptime=demand_json['min_uptime'],
        checks_remaining=...,
        successes=0,
        total_checks=...,
        demand_data=bytes(demand)  # Store for submission
    )
    return None  # Defer decision to worker

async def worker_process(arbiters_client):
    """Separate worker that processes jobs over time"""
    while True:
        for uid, job in list(job_queue.items()):
            if job.checks_remaining > 0:
                # Perform health check
                success = await check_service_health(job.service_url)
                if success:
                    job.successes += 1
                job.checks_remaining -= 1
                await asyncio.sleep(check_interval)
            else:
                # Job complete - make decision
                uptime = job.successes / job.total_checks
                decision = uptime >= job.min_uptime

                # CRITICAL: Manually submit decision
                # Parameters: fulfillment_uid, demand_data (bytes), decision (bool)
                await oracle_client.arbitrate(uid, job.demand_data, decision)
                del job_queue[uid]
```

**Complete asynchronous oracle pattern:**

1. Define demand format
2. Implement scheduling callback that receives `(attestation, demand)`:
   - Extract fulfillment data from attestation
   - Parse demand bytes
   - Create job with monitoring schedule and store demand for later
   - Store job in persistent queue
   - Return `None` to defer decision
3. Implement background worker that:
   - Polls job queue
   - Executes scheduled work over time
   - Makes decision based on results
   - Manually calls `oracle_client.arbitrate()` with stored demand
4. Run worker as separate process

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

```python
import logging

logger = logging.getLogger(__name__)

# In validation callback
try:
    data = parse_data(attestation)
except Exception as e:
    logger.error(f"Failed to parse attestation {attestation.uid}: {e}")
    return False  # Reject invalid data

# Log decisions
logger.info(
    f"Oracle decision for {attestation.uid}: "
    f"{'approved' if decision else 'rejected'}"
)
```

### State Persistence

For async oracles, persist state to survive restarts:

```python
import sqlite3
import json

class PersistentJobDb:
    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                uid TEXT PRIMARY KEY,
                job TEXT NOT NULL
            )
        """)
        self.conn.commit()

    def insert_job(self, uid: str, job: UptimeJob):
        job_json = json.dumps({
            'fulfillment_uid': job.fulfillment_uid,
            'service_url': job.service_url,
            'min_uptime': job.min_uptime,
            'checks_remaining': job.checks_remaining,
            'successes': job.successes,
            'total_checks': job.total_checks,
        })
        self.conn.execute(
            "INSERT OR REPLACE INTO jobs (uid, job) VALUES (?, ?)",
            (uid, job_json)
        )
        self.conn.commit()

    def get_next_job(self) -> Optional[tuple[str, UptimeJob]]:
        cursor = self.conn.execute("SELECT uid, job FROM jobs LIMIT 1")
        row = cursor.fetchone()
        if not row:
            return None

        uid, job_json = row
        job_data = json.loads(job_json)
        job = UptimeJob(**job_data)

        self.conn.execute("DELETE FROM jobs WHERE uid = ?", (uid,))
        self.conn.commit()

        return (uid, job)
```

### Retry Logic

Handle transaction failures gracefully:

```python
import asyncio

async def submit_with_retry(
    oracle_client,
    fulfillment_uid: str,
    demand_data: bytes,
    decision: bool,
    max_attempts: int = 3
):
    for attempt in range(max_attempts):
        try:
            await oracle_client.arbitrate(fulfillment_uid, demand_data, decision)
            return
        except Exception as e:
            logger.warning(f"Arbitration attempt {attempt + 1} failed: {e}")
            if attempt < max_attempts - 1:
                await asyncio.sleep(2 ** attempt)

    raise Exception(f"Failed to submit arbitration after {max_attempts} attempts")
```

## Reference Implementations

See the full working examples in the test suite:
- **Pattern 1 (Contextless)**: `alkahest-py/alkahest_py/oracle/test_identity.py` - Identity verification with signature validation
- **Pattern 2 (Demand-Based)**: `alkahest-py/alkahest_py/oracle/test_capitalization.py` - Test case validation for shell commands
- **Pattern 3 (Asynchronous)**: `alkahest-py/alkahest_py/oracle/test_uptime.py` - Uptime monitoring simulation

These tests demonstrate the complete flow including escrow creation (Alice), fulfillment submission (Bob), oracle validation (Charlie), and payment collection.
