import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as SpecificAttestationArbiterAbi } from "../../../contracts/SpecificAttestationArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const specificAttestationArbiterDecodeDemandFunction = getAbiItem({
  abi: SpecificAttestationArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const specificAttestationArbiterDemandDataType = specificAttestationArbiterDecodeDemandFunction.outputs[0];

/**
 * SpecificAttestationArbiter Client
 *
 * Validates against a specific attestation UID.
 * This arbiter ensures that the attestation matches a specific, predetermined attestation.
 */
export const makeSpecificAttestationArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes SpecificAttestationArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 uid}
     * @returns abi encoded bytes
     */
    encode: (demand: { uid: `0x${string}` }) => {
      return encodeAbiParameters([specificAttestationArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes SpecificAttestationArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([specificAttestationArbiterDemandDataType], demandData)[0];
    },
  };
};