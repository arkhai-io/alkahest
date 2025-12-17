import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeEqualArbiterAbi } from "../../../contracts/arbiters/attestation-properties/ExpirationTimeEqualArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const expirationTimeEqualArbiterDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeEqualArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const expirationTimeEqualArbiterDemandDataType = expirationTimeEqualArbiterDecodeDemandFunction.outputs[0];

/**
 * ExpirationTimeEqualArbiter Client
 *
 * Validates that the attestation expiration time equals a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeEqualArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.expirationTimeEqualArbiter,

    /**
     * Encodes ExpirationTimeEqualArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     * @returns abi encoded bytes
     */
    encode: (demand: { expirationTime: bigint }) => {
      return encodeAbiParameters([expirationTimeEqualArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to ExpirationTimeEqualArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([expirationTimeEqualArbiterDemandDataType], data)[0];
    },
  };
};
