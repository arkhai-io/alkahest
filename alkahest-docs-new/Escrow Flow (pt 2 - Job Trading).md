# Escrow Flow (pt 2 - Job Trading)

Here's how Alice buys a compute job from Bob with her ERC-20 token, where the validity of the job result is decided by a mutually trusted third party Charlie:

1. Alice deposits her ERC-20 token into escrow via the ERC20EscrowObligation contract. Her demand is made via the TrustedOracleArbiter contract, and contains her compute query and the mutually trusted third party's address (Charlie).
2. Bob parses Alice's query from her demand, completes the compute task, and submits the result in an attestation via the StringResultObligation contract. Then he requests an arbitration on his attestation from Charlie via TrustedOracleArbiter.
3. Charlie sees the arbitration request event, reads Alice's query and Bob's fulfillment, and determines whether the fulfillment is valid.
4. Finalization
   1. If Charlie decides the fulfillment is valid, Bob can now use his result attestation from StringResultObligation to claim Alice's escrow.
   2. If not valid, Alice can wait for her escrow to expire and reclaim it.

## Depositing escrow using TrustedOracleArbiter

You can use TrustedOracleArbiter when you want an off-chain judge to decide whether a deal has been validly fulfilled. The judge could be a real person or an automated program. In this example, we'll demand that Bob capitalize a string for us, and Charlie will verify off-chain whether Bob did so correctly. In practice, this might represent Bob doing a complex computation, and Charlie verifying if it meets Alice's criteria.
[code example]

## Fulfilling a job and requesting arbitration

The `data` field of TrustedOracleArbiter doesn't enforce any kind of schema, so you have to come to an agreement with a buyer beforehand in order to understand and parse their query. StringObligation is a similarly flexible contract that you can use for fulfillments when the data won't be used directly by other on-chain contracts.

Note that the fulfillment should contain a copy or reference to the demand it's intended to fulfill. This is needed to prevent a fulfillment that's valid for one query being used to claim another escrow demanding the same judge, but with a different query. Usually, this is done by setting the escrow attestation as the refUID of the fulfillment.
[code example]

After making a fulfillment attestation via StringObligation, you can call requestArbitration on TrustedOracleArbiter to request an arbitration.
[code example]

Charlie should listen for `ArbitrationRequested` events demanding him as the oracle. Then he can retrieve the attestation from EAS, decide if it's valid, and use the arbitrate function on TrustedOracleArbiter to submit his decision on-chain.

Note that the `ArbitrationRequested` event doesn't have a reference to an escrow/demand. As explained above, the demand should be retrieved from the fulfillment attestation. If it's an escrow attestation referenced by refUID, you can get the attestation from EAS and parse the demand.
[code example]

## Waiting for arbitration and claiming escrow

Bob can listen for the `ArbitrationMade` event from TrustedOracleArbiter, then claim the escrow if the decision was positive, or retry if not.
[code example]

If no valid fulfillment is made, Alice can reclaim the escrow after it expires.
[code example]

## SDK utilities

The SDK provides functions to make it easier to set up an automatic validator server that interacts with TrustedOracleArbiter.
[code example]

It also provides functions for waiting for an escrow to be fulfilled (claimed), and for listening for the ArbitrationMade event.
[code example]
