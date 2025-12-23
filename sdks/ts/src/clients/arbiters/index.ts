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
  type ArbitrationMode,
  encodeIntrinsics2Demand,
  decodeIntrinsics2Demand,
  type IntrinsicsArbiter2DemandData,
} from "./general";

// Re-export types from attestation properties arbiters
export type { AttesterArbiterDemandData } from "./attestationProperties/attesterArbiter";
export type { RecipientArbiterDemandData } from "./attestationProperties/recipientArbiter";
export type { RefUidArbiterDemandData } from "./attestationProperties/refUidArbiter";
export type { RevocableArbiterDemandData } from "./attestationProperties/revocableArbiter";
export type { SchemaArbiterDemandData } from "./attestationProperties/schemaArbiter";
export type { UidArbiterDemandData } from "./attestationProperties/uidArbiter";
export type { TimeAfterArbiterDemandData } from "./attestationProperties/timeAfterArbiter";
export type { TimeBeforeArbiterDemandData } from "./attestationProperties/timeBeforeArbiter";
export type { TimeEqualArbiterDemandData } from "./attestationProperties/timeEqualArbiter";
export type { ExpirationTimeAfterArbiterDemandData } from "./attestationProperties/expirationTimeAfterArbiter";
export type { ExpirationTimeBeforeArbiterDemandData } from "./attestationProperties/expirationTimeBeforeArbiter";
export type { ExpirationTimeEqualArbiterDemandData } from "./attestationProperties/expirationTimeEqualArbiter";

// Re-export static encode/decode functions from attestation properties
export { encodeDemand as encodeAttesterDemand, decodeDemand as decodeAttesterDemand } from "./attestationProperties/attesterArbiter";
export { encodeDemand as encodeRecipientDemand, decodeDemand as decodeRecipientDemand } from "./attestationProperties/recipientArbiter";
export { encodeDemand as encodeRefUidDemand, decodeDemand as decodeRefUidDemand } from "./attestationProperties/refUidArbiter";
export { encodeDemand as encodeRevocableDemand, decodeDemand as decodeRevocableDemand } from "./attestationProperties/revocableArbiter";
export { encodeDemand as encodeSchemaDemand, decodeDemand as decodeSchemaDemand } from "./attestationProperties/schemaArbiter";
export { encodeDemand as encodeUidDemand, decodeDemand as decodeUidDemand } from "./attestationProperties/uidArbiter";
export { encodeDemand as encodeTimeAfterDemand, decodeDemand as decodeTimeAfterDemand } from "./attestationProperties/timeAfterArbiter";
export { encodeDemand as encodeTimeBeforeDemand, decodeDemand as decodeTimeBeforeDemand } from "./attestationProperties/timeBeforeArbiter";
export { encodeDemand as encodeTimeEqualDemand, decodeDemand as decodeTimeEqualDemand } from "./attestationProperties/timeEqualArbiter";
export { encodeDemand as encodeExpirationTimeAfterDemand, decodeDemand as decodeExpirationTimeAfterDemand } from "./attestationProperties/expirationTimeAfterArbiter";
export { encodeDemand as encodeExpirationTimeBeforeDemand, decodeDemand as decodeExpirationTimeBeforeDemand } from "./attestationProperties/expirationTimeBeforeArbiter";
export { encodeDemand as encodeExpirationTimeEqualDemand, decodeDemand as decodeExpirationTimeEqualDemand } from "./attestationProperties/expirationTimeEqualArbiter";
