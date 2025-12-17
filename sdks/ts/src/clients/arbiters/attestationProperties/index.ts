import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeAttesterArbiterClient } from "./AttesterArbiter";
import { makeExpirationTimeAfterArbiterClient } from "./ExpirationTimeAfterArbiter";
import { makeExpirationTimeBeforeArbiterClient } from "./ExpirationTimeBeforeArbiter";
import { makeExpirationTimeEqualArbiterClient } from "./ExpirationTimeEqualArbiter";
import { makeRecipientArbiterClient } from "./RecipientArbiter";
import { makeRefUidArbiterClient } from "./RefUidArbiter";
import { makeRevocableArbiterClient } from "./RevocableArbiter";
import { makeSchemaArbiterClient } from "./SchemaArbiter";
import { makeTimeAfterArbiterClient } from "./TimeAfterArbiter";
import { makeTimeBeforeArbiterClient } from "./TimeBeforeArbiter";
import { makeTimeEqualArbiterClient } from "./TimeEqualArbiter";
import { makeUidArbiterClient } from "./UidArbiter";

/**
 * Attestation Properties Arbiters Client
 *
 * Provides access to arbiters that validate specific properties of attestations.
 * Use with AllArbiter for composable validation.
 *
 * Supported attestation properties:
 * - attester: Validates the attester address
 * - recipient: Validates the recipient address
 * - schema: Validates the schema hash
 * - uid: Validates the attestation UID
 * - refUid: Validates the reference UID
 * - revocable: Validates the revocable flag
 * - timeAfter/timeBefore/timeEqual: Validates timestamp
 * - expirationTimeAfter/expirationTimeBefore/expirationTimeEqual: Validates expiration timestamp
 */
export const makeAttestationPropertiesArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const attester = makeAttesterArbiterClient(viemClient, addresses);
  const recipient = makeRecipientArbiterClient(viemClient, addresses);
  const schema = makeSchemaArbiterClient(viemClient, addresses);
  const uid = makeUidArbiterClient(viemClient, addresses);
  const refUid = makeRefUidArbiterClient(viemClient, addresses);
  const revocable = makeRevocableArbiterClient(viemClient, addresses);
  const timeAfter = makeTimeAfterArbiterClient(viemClient, addresses);
  const timeBefore = makeTimeBeforeArbiterClient(viemClient, addresses);
  const timeEqual = makeTimeEqualArbiterClient(viemClient, addresses);
  const expirationTimeAfter = makeExpirationTimeAfterArbiterClient(viemClient, addresses);
  const expirationTimeBefore = makeExpirationTimeBeforeArbiterClient(viemClient, addresses);
  const expirationTimeEqual = makeExpirationTimeEqualArbiterClient(viemClient, addresses);

  return {
    attester,
    recipient,
    schema,
    uid,
    refUid,
    revocable,
    timeAfter,
    timeBefore,
    timeEqual,
    expirationTimeAfter,
    expirationTimeBefore,
    expirationTimeEqual,
  };
};
