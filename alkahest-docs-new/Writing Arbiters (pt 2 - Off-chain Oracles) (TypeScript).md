# Writing Arbiters (pt 2 - Off-chain Oracles)

## Synchronous off-chain arbitration

[example: test suite]

## Asynchronous off-chain arbitration

Some deals need real-world evidence that arrives after the arbitration request
is made. In the uptime example:

1. Alice escrows tokens with a `TrustedOracleArbiter` demand that encodes JSON
   describing the service URL, the observation window, a minimum uptime
   percentage, and the polling cadence.
2. Bob fulfills `StringObligation.sol` with the URL that should be monitored and
   immediately requests arbitration from Charlie, the oracle named in Alice's
   demand.
3. Charlie calls
   `listen_and_arbitrate_for_escrow_async(..., |_obligation, demand| async { ... })`
   with a closure that always returns `None`. The closure just records the
   request in an in-memory “database”, scheduling future pings based on the
   demand payload.
4. A background worker thread watches that database, simulates the scheduled
   pings, and only after the last simulated probe evaluates whether the observed
   success rate meets Alice's uptime threshold. At that point the worker calls
   `arbitrate_as_trusted_oracle` to publish Charlie's decision onchain.
5. When the oracle transaction lands, Bob can collect the escrow if the uptime
   target was satisfied.

All of the wiring—including the shared state, scheduler, and worker—is in
`alkahest-rs/tests/offchain_oracle_uptime.rs`. Running the test spins up the
local Anvil sandbox, deploys contracts, and walks through the entire
asynchronous workflow without needing an external service.

Alice's demand payload looks like:

```json
{
  "service_url": "https://uptime.hyperspace",
  "min_uptime": 0.75,
  "start": 1700000000,
  "end": 1700000010,
  "check_interval_secs": 2
}
```

Charlie never decides inside the arbiter callback—instead the callback schedules
work and the background thread issues the final arbitration when enough data has
been gathered.

## Contextless arbitration

Sometimes arbitration logic depends entirely on information the oracle already
holds. Charlie can act as an identity gatekeeper without any escrow:

1. Alice posts a `StringObligation` fulfillment containing JSON with the
   submitter's public key, an incrementing nonce, arbitrary payload data, and a
   65-byte secp256k1 signature.
2. Charlie owns a private registry of trusted identities where each entry
   tracks the latest accepted nonce. He calls
   `listen_and_arbitrate_async(..., verify_identity, ...)`, where the callback
   parses the JSON and returns `None` only on parsing failure; otherwise it
   returns `Some(decision)`.
3. The callback checks that the public key is known, the nonce strictly
   increases, and that the signature signs `"data:nonce"` with the stated key.
   On success Charlie bumps the stored nonce and returns `Some(true)`; otherwise
   he returns `Some(false)`.
4. Because `require_request` is enabled, Charlie only arbitrates fulfillments
   after the submitter explicitly calls `requestArbitration` targeting him.

The end-to-end harness—registry, verifier, and asynchronous listener—is in
`alkahest-rs/tests/offchain_oracle_identity.rs`. The test demonstrates both an
accepted claim and a rejected replay with a stale nonce, matching the expected
behavior of a local identity registry.
