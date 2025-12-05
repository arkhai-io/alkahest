import type { ChainAddresses } from "../../types";
import type { ViemClient } from "../../utils";
import { makeAttestationPropertiesArbitersClient } from "./attestation";
import { TrustedOracleArbiterCodec, makeGeneralArbitersClient } from "./general";
import { AnyArbiterCodec, AllArbiterCodec, makeLogicalArbitersClient } from "./logical";

/**
 * Hierarchical Arbiters Client
 *
 * Provides a structured, object-oriented interface for all arbiter functionality.
 * 
 * New API structure:
 * - client.arbiters.general.intrinsics2.encode(...)
 * - client.arbiters.general.trustedParty.decode(...)
 * - client.arbiters.logical.any.encode(...)
 * - client.arbiters.logical.all.decode(...)
 * - client.arbiters.attestation.recipient.composing.encode(...)
 * - client.arbiters.attestation.schema.nonComposing.decode(...)
 * 
 * Also maintains backward compatibility with flat method names.
 */
export const makeArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const generalArbiters = makeGeneralArbitersClient(viemClient, addresses);
  const logicalArbiters = makeLogicalArbitersClient(viemClient, addresses);
  const attestationArbiters = makeAttestationPropertiesArbitersClient(viemClient, addresses);

  // Create a client that exposes only the hierarchical API
  return {
    general: generalArbiters,
    logical: logicalArbiters,
    attestation: attestationArbiters,
  };
};

// Export static codecs for use without client instantiation
export { AnyArbiterCodec, AllArbiterCodec, TrustedOracleArbiterCodec };