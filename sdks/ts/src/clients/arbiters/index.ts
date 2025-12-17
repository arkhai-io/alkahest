import type { ChainAddresses } from "../../types";
import type { ViemClient } from "../../utils";
import { makeAttestationPropertiesArbitersClient } from "./attestationProperties";
import { makeConfirmationArbitersClient } from "./confirmation";
import { TrustedOracleArbiterCodec, makeGeneralArbitersClient } from "./general";
import { AnyArbiterCodec, AllArbiterCodec, makeLogicalArbitersClient } from "./logical";

/**
 * Hierarchical Arbiters Client
 *
 * Provides a structured, object-oriented interface for all arbiter functionality.
 *
 * API structure:
 * - client.arbiters.general.intrinsics (no DemandData)
 * - client.arbiters.general.intrinsics2.encode(...) (schema-based)
 * - client.arbiters.general.trustedOracle.arbitrate(...)
 * - client.arbiters.logical.any.encode(...)
 * - client.arbiters.logical.all.decode(...)
 * - client.arbiters.attestationProperties.recipient.encode(...)
 * - client.arbiters.attestationProperties.schema.decode(...)
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

// Export static codecs for use without client instantiation
export { AnyArbiterCodec, AllArbiterCodec, TrustedOracleArbiterCodec };
