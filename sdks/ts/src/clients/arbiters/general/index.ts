import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeIntrinsicsArbiter2Client } from "./IntrinsicsArbiter2";
import { makeSpecificAttestationArbiterClient } from "./SpecificAttestationArbiter";
import { TrustedOracleArbiterCodec, makeTrustedOracleArbiterClient } from "./TrustedOracleArbiter";
import { makeTrustedPartyArbiterClient } from "./TrustedPartyArbiter";

/**
 * General Arbiters Client
 * 
 * Provides access to basic arbiters that don't depend on specific attestation properties:
 * - IntrinsicsArbiter2: Schema-based validation
 * - TrustedPartyArbiter: Creator-based validation with composable base arbiter  
 * - SpecificAttestationArbiter: Validates against a specific attestation UID
 * - TrustedOracleArbiter: Oracle-based decision making with arbitration requests
 */
export const makeGeneralArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const intrinsics2 = makeIntrinsicsArbiter2Client(viemClient, addresses);
  const trustedParty = makeTrustedPartyArbiterClient(viemClient, addresses);
  const specificAttestation = makeSpecificAttestationArbiterClient(viemClient, addresses);
  const trustedOracle = makeTrustedOracleArbiterClient(viemClient, addresses);

  return {
    intrinsics2,
    trustedParty,
    specificAttestation,
    trustedOracle,

    // Backward compatibility - flat methods
    encodeIntrinsics2Demand: intrinsics2.encode,
    decodeIntrinsics2Demand: intrinsics2.decode,
    encodeTrustedPartyDemand: trustedParty.encode,
    decodeTrustedPartyDemand: trustedParty.decode,
    encodeSpecificAttestationDemand: specificAttestation.encode,
    decodeSpecificAttestationDemand: specificAttestation.decode,
    encodeTrustedOracleDemand: trustedOracle.encode,
    decodeTrustedOracleDemand: trustedOracle.decode,
    arbitrateAsTrustedOracle: trustedOracle.arbitrate,
    requestArbitrationFromTrustedOracle: trustedOracle.requestArbitration,
    checkExistingArbitration: trustedOracle.checkExistingArbitration,
    waitForTrustedOracleArbitration: trustedOracle.waitForArbitration,
    waitForTrustedOracleArbitrationRequest: trustedOracle.waitForArbitrationRequest,
    listenForArbitrationRequestsOnly: trustedOracle.listenForArbitrationRequestsOnly,
    
    // Oracle functionality for backward compatibility with oracle.ts
    getArbitrationRequests: trustedOracle.getArbitrationRequests,
    arbitratePast: trustedOracle.arbitratePast,
    listenAndArbitrate: trustedOracle.listenAndArbitrate,
  };
};

// Export static codecs for use without client instantiation
export { TrustedOracleArbiterCodec };