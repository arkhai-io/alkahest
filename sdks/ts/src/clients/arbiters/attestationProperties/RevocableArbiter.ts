import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RevocableArbiterAbi } from "../../../contracts/arbiters/attestation-properties/RevocableArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const revocableArbiterDecodeDemandFunction = getAbiItem({
  abi: RevocableArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const revocableArbiterDemandDataType = revocableArbiterDecodeDemandFunction.outputs[0];

/**
 * Revocable Arbiter Client
 *
 * Validates the revocable flag of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeRevocableArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes RevocableArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bool revocable}
     * @returns abi encoded bytes
     */
    encode: (demand: { revocable: boolean }) => {
      return encodeAbiParameters([revocableArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes RevocableArbiter.DemandData from bytes.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([revocableArbiterDemandDataType], data)[0];
    },
  };
};
