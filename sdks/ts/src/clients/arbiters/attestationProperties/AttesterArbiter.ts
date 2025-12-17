import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as AttesterArbiterAbi } from "../../../contracts/arbiters/attestation-properties/AttesterArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const attesterArbiterDecodeDemandFunction = getAbiItem({
  abi: AttesterArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const attesterArbiterDemandDataType = attesterArbiterDecodeDemandFunction.outputs[0];

/**
 * AttesterArbiter Client
 *
 * Validates the attester address of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeAttesterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes AttesterArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address attester}
     * @returns abi encoded bytes
     */
    encode: (demand: { attester: `0x${string}` }) => {
      return encodeAbiParameters([attesterArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes AttesterArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([attesterArbiterDemandDataType], demandData)[0];
    },
  };
};
