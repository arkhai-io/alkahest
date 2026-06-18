import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeIntrinsicsArbiterClient } from "./intrinsicsArbiter";
import { makeTrustedOracleArbiterClient } from "./trustedOracle";

// Re-export static encode/decode functions and types from trustedOracle
export {
  type ArbitrationMode,
  type AttestationWithDemand,
  decodeDemand as decodeTrustedOracleDemand,
  encodeDemand as encodeTrustedOracleDemand,
  type TrustedOracleArbiterDemandData,
} from "./trustedOracle";

/**
 * General Arbiters Client
 *
 * Provides access to basic arbiters that don't depend on specific attestation properties:
 * - IntrinsicsArbiter: Basic validation (not expired, not revoked) - no DemandData
 * - TrustedOracleArbiter: Oracle-based decision making with arbitration requests
 *
 * Note: TrustedPartyArbiter has been removed (identical to RecipientArbiter)
 * Note: SpecificAttestationArbiter has been removed (identical to UidArbiter)
 */
export const makeGeneralArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const intrinsics = makeIntrinsicsArbiterClient(viemClient, addresses);
  const trustedOracle = makeTrustedOracleArbiterClient(viemClient, addresses);

  return {
    intrinsics,
    trustedOracle,
  };
};
