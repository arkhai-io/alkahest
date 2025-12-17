import type { ChainAddresses } from "../../types";
import type { ViemClient } from "../../utils";
import { makeAttestationPropertiesArbitersClient } from "./attestationProperties";
import { makeConfirmationArbitersClient } from "./confirmation";
import { makeGeneralArbitersClient } from "./general";
import { makeLogicalArbitersClient, AllArbiter, AnyArbiter } from "./logical";

/**
 * Hierarchical Arbiters Client
 *
 * Provides a structured, object-oriented interface for all arbiter functionality.
 *
 * API structure:
 * - client.arbiters.general.intrinsics (no DemandData)
 * - client.arbiters.general.intrinsics2.encodeDemand(...) (schema-based)
 * - client.arbiters.general.trustedOracle.arbitrate(...)
 * - client.arbiters.logical.any.encodeDemand(...)
 * - client.arbiters.logical.all.decodeDemand(...)
 * - client.arbiters.attestationProperties.recipient.encodeDemand(...)
 * - client.arbiters.attestationProperties.schema.decodeDemand(...)
 * - client.arbiters.confirmation.exclusiveRevocable.confirm(...)
 */
export const makeArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const generalArbiters = makeGeneralArbitersClient(viemClient, addresses);
  const logicalArbiters = makeLogicalArbitersClient(viemClient, addresses);
  const attestationPropertiesArbiters = makeAttestationPropertiesArbitersClient(viemClient, addresses);
  const confirmationArbiters = makeConfirmationArbitersClient(viemClient, addresses);

  return {
    general: generalArbiters,
    logical: logicalArbiters,
    attestationProperties: attestationPropertiesArbiters,
    confirmation: confirmationArbiters,
  };
};

// Export static arbiter objects for use without client instantiation
export { AllArbiter, AnyArbiter };

// Re-export types and static functions from logical arbiters
export type {
  DecodedDemandWithChildren,
  DemandDecoder,
  DecodersRecord,
  RecursivelyDecodedDemand,
  AllArbiterDemandData,
  AnyArbiterDemandData,
} from "./logical";

// Re-export static functions and types from general arbiters
export {
  encodeTrustedOracleDemand,
  decodeTrustedOracleDemand,
  type TrustedOracleArbiterDemandData,
} from "./general";

// Re-export types from attestation properties arbiters
export type { AttesterArbiterDemandData } from "./attestationProperties/AttesterArbiter";
export type { RecipientArbiterDemandData } from "./attestationProperties/RecipientArbiter";
export type { RefUidArbiterDemandData } from "./attestationProperties/RefUidArbiter";
export type { RevocableArbiterDemandData } from "./attestationProperties/RevocableArbiter";
export type { SchemaArbiterDemandData } from "./attestationProperties/SchemaArbiter";
export type { UidArbiterDemandData } from "./attestationProperties/UidArbiter";
export type { TimeAfterArbiterDemandData } from "./attestationProperties/TimeAfterArbiter";
export type { TimeBeforeArbiterDemandData } from "./attestationProperties/TimeBeforeArbiter";
export type { TimeEqualArbiterDemandData } from "./attestationProperties/TimeEqualArbiter";
export type { ExpirationTimeAfterArbiterDemandData } from "./attestationProperties/ExpirationTimeAfterArbiter";
export type { ExpirationTimeBeforeArbiterDemandData } from "./attestationProperties/ExpirationTimeBeforeArbiter";
export type { ExpirationTimeEqualArbiterDemandData } from "./attestationProperties/ExpirationTimeEqualArbiter";

// Re-export static encode/decode functions from attestation properties
export { encodeDemand as encodeAttesterDemand, decodeDemand as decodeAttesterDemand } from "./attestationProperties/AttesterArbiter";
export { encodeDemand as encodeRecipientDemand, decodeDemand as decodeRecipientDemand } from "./attestationProperties/RecipientArbiter";
export { encodeDemand as encodeRefUidDemand, decodeDemand as decodeRefUidDemand } from "./attestationProperties/RefUidArbiter";
export { encodeDemand as encodeRevocableDemand, decodeDemand as decodeRevocableDemand } from "./attestationProperties/RevocableArbiter";
export { encodeDemand as encodeSchemaDemand, decodeDemand as decodeSchemaDemand } from "./attestationProperties/SchemaArbiter";
export { encodeDemand as encodeUidDemand, decodeDemand as decodeUidDemand } from "./attestationProperties/UidArbiter";
export { encodeDemand as encodeTimeAfterDemand, decodeDemand as decodeTimeAfterDemand } from "./attestationProperties/TimeAfterArbiter";
export { encodeDemand as encodeTimeBeforeDemand, decodeDemand as decodeTimeBeforeDemand } from "./attestationProperties/TimeBeforeArbiter";
export { encodeDemand as encodeTimeEqualDemand, decodeDemand as decodeTimeEqualDemand } from "./attestationProperties/TimeEqualArbiter";
export { encodeDemand as encodeExpirationTimeAfterDemand, decodeDemand as decodeExpirationTimeAfterDemand } from "./attestationProperties/ExpirationTimeAfterArbiter";
export { encodeDemand as encodeExpirationTimeBeforeDemand, decodeDemand as decodeExpirationTimeBeforeDemand } from "./attestationProperties/ExpirationTimeBeforeArbiter";
export { encodeDemand as encodeExpirationTimeEqualDemand, decodeDemand as decodeExpirationTimeEqualDemand } from "./attestationProperties/ExpirationTimeEqualArbiter";
