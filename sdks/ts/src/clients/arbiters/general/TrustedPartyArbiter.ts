import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as TrustedPartyArbiterAbi } from "../../../contracts/TrustedPartyArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const trustedPartyArbiterDecodeDemandFunction = getAbiItem({
  abi: TrustedPartyArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const trustedPartyArbiterDemandDataType = trustedPartyArbiterDecodeDemandFunction.outputs[0];

/**
 * TrustedPartyArbiter Client
 *
 * Handles creator-based validation with composable base arbiter.
 * This arbiter validates that an attestation was created by a trusted party
 * and optionally applies additional validation through a base arbiter.
 */
export const makeTrustedPartyArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes TrustedPartyArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address creator}
     * @returns abi encoded bytes
     */
    encode: (demand: {
      baseArbiter: `0x${string}`;
      baseDemand: `0x${string}`;
      creator: `0x${string}`;
    }) => {
      return encodeAbiParameters([trustedPartyArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes TrustedPartyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([trustedPartyArbiterDemandDataType], demandData)[0];
    },
  };
};