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
  };
};