import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeAttesterArbiterClient } from "./AttesterArbiter";
import { makeExpirationTimeArbiterClient } from "./ExpirationTimeArbiter";
import { makeRecipientArbiterClient } from "./RecipientArbiter";
import { makeRefUidArbiterClient } from "./RefUidArbiter";
import { makeRevocableArbiterClient } from "./RevocableArbiter";
import { makeSchemaArbiterClient } from "./SchemaArbiter";
import { makeTimeArbiterClient } from "./TimeArbiter";
import { makeUidArbiterClient } from "./UidArbiter";

/**
 * Attestation Properties Arbiters Client
 * 
 * Provides access to arbiters that validate specific properties of attestations.
 * Each arbiter type comes in two variants:
 * - Composing: Can be combined with a base arbiter for additional validation
 * - Non-Composing: Standalone validation against the property
 * 
 * Supported attestation properties:
 * - Attester: Validates the attester address
 * - Recipient: Validates the recipient address  
 * - Schema: Validates the schema hash
 * - Time: Validates timestamp (After/Before/Equal variants)
 * - ExpirationTime: Validates expiration timestamp (After/Before/Equal variants)
 * - UID: Validates the attestation UID
 * - RefUID: Validates the reference UID
 * - Revocable: Validates the revocable flag
 */
export const makeAttestationPropertiesArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const attester = makeAttesterArbiterClient(viemClient, addresses);
  const recipient = makeRecipientArbiterClient(viemClient, addresses);
  const schema = makeSchemaArbiterClient(viemClient, addresses);
  const time = makeTimeArbiterClient(viemClient, addresses);
  const uid = makeUidArbiterClient(viemClient, addresses);
  const revocable = makeRevocableArbiterClient(viemClient, addresses);
  const refUid = makeRefUidArbiterClient(viemClient, addresses);
  const expirationTime = makeExpirationTimeArbiterClient(viemClient, addresses);

  return {
    attester,
    recipient,
    schema,
    time,
    uid,
    revocable,
    refUid,
    expirationTime,

    // Backward compatibility - flat methods for existing arbiters
    encodeAttesterArbiterComposingDemand: attester.composing.encode,
    decodeAttesterArbiterComposingDemand: attester.composing.decode,
    encodeAttesterArbiterNonComposingDemand: attester.nonComposing.encode,
    decodeAttesterArbiterNonComposingDemand: attester.nonComposing.decode,
    
    encodeRecipientArbiterComposingDemand: recipient.composing.encode,
    decodeRecipientArbiterComposingDemand: recipient.composing.decode,
    encodeRecipientArbiterNonComposingDemand: recipient.nonComposing.encode,
    decodeRecipientArbiterNonComposingDemand: recipient.nonComposing.decode,
    
    encodeSchemaArbiterComposingDemand: schema.composing.encode,
    decodeSchemaArbiterComposingDemand: schema.composing.decode,
    encodeSchemaArbiterNonComposingDemand: schema.nonComposing.encode,
    decodeSchemaArbiterNonComposingDemand: schema.nonComposing.decode,

    // Time arbiters - flat methods
    encodeTimeAfterArbiterComposingDemand: time.after.composing.encode,
    decodeTimeAfterArbiterComposingDemand: time.after.composing.decode,
    encodeTimeAfterArbiterNonComposingDemand: time.after.nonComposing.encode,
    decodeTimeAfterArbiterNonComposingDemand: time.after.nonComposing.decode,
    encodeTimeBeforeArbiterComposingDemand: time.before.composing.encode,
    decodeTimeBeforeArbiterComposingDemand: time.before.composing.decode,
    encodeTimeBeforeArbiterNonComposingDemand: time.before.nonComposing.encode,
    decodeTimeBeforeArbiterNonComposingDemand: time.before.nonComposing.decode,
    encodeTimeEqualArbiterComposingDemand: time.equal.composing.encode,
    decodeTimeEqualArbiterComposingDemand: time.equal.composing.decode,
    encodeTimeEqualArbiterNonComposingDemand: time.equal.nonComposing.encode,
    decodeTimeEqualArbiterNonComposingDemand: time.equal.nonComposing.decode,

    // ExpirationTime arbiters - flat methods
    encodeExpirationTimeAfterArbiterComposingDemand: expirationTime.after.composing.encode,
    decodeExpirationTimeAfterArbiterComposingDemand: expirationTime.after.composing.decode,
    encodeExpirationTimeAfterArbiterNonComposingDemand: expirationTime.after.nonComposing.encode,
    decodeExpirationTimeAfterArbiterNonComposingDemand: expirationTime.after.nonComposing.decode,
    encodeExpirationTimeBeforeArbiterComposingDemand: expirationTime.before.composing.encode,
    decodeExpirationTimeBeforeArbiterComposingDemand: expirationTime.before.composing.decode,
    encodeExpirationTimeBeforeArbiterNonComposingDemand: expirationTime.before.nonComposing.encode,
    decodeExpirationTimeBeforeArbiterNonComposingDemand: expirationTime.before.nonComposing.decode,
    encodeExpirationTimeEqualArbiterComposingDemand: expirationTime.equal.composing.encode,
    decodeExpirationTimeEqualArbiterComposingDemand: expirationTime.equal.composing.decode,
    encodeExpirationTimeEqualArbiterNonComposingDemand: expirationTime.equal.nonComposing.encode,
    decodeExpirationTimeEqualArbiterNonComposingDemand: expirationTime.equal.nonComposing.decode,

    // UID arbiters - flat methods
    encodeUidArbiterComposingDemand: uid.composing.encode,
    decodeUidArbiterComposingDemand: uid.composing.decode,
    encodeUidArbiterNonComposingDemand: uid.nonComposing.encode,
    decodeUidArbiterNonComposingDemand: uid.nonComposing.decode,

    // RefUID arbiters - flat methods
    encodeRefUidArbiterComposingDemand: refUid.composing.encode,
    decodeRefUidArbiterComposingDemand: refUid.composing.decode,
    encodeRefUidArbiterNonComposingDemand: refUid.nonComposing.encode,
    decodeRefUidArbiterNonComposingDemand: refUid.nonComposing.decode,

    // Revocable arbiters - flat methods
    encodeRevocableArbiterComposingDemand: revocable.composing.encode,
    decodeRevocableArbiterComposingDemand: revocable.composing.decode,
    encodeRevocableArbiterNonComposingDemand: revocable.nonComposing.encode,
    decodeRevocableArbiterNonComposingDemand: revocable.nonComposing.decode,
  };
};