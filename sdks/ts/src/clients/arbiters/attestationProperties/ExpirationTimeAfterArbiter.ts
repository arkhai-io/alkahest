import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeAfterArbiterAbi } from "../../../contracts/arbiters/attestation-properties/ExpirationTimeAfterArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const expirationTimeAfterArbiterDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeAfterArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const expirationTimeAfterArbiterDemandDataType = expirationTimeAfterArbiterDecodeDemandFunction.outputs[0];

/**
 * ExpirationTimeAfterArbiter Client
 *
 * Validates that the attestation expiration time is after a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeAfterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.expirationTimeAfterArbiter,

    /**
     * Encodes ExpirationTimeAfterArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     * @returns abi encoded bytes
     */
    encode: (demand: { expirationTime: bigint }) => {
      return encodeAbiParameters([expirationTimeAfterArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to ExpirationTimeAfterArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([expirationTimeAfterArbiterDemandDataType], data)[0];
    },
  };
};
