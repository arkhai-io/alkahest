import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeBeforeArbiterAbi } from "../../../contracts/arbiters/attestation-properties/ExpirationTimeBeforeArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const expirationTimeBeforeArbiterDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeBeforeArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const expirationTimeBeforeArbiterDemandDataType = expirationTimeBeforeArbiterDecodeDemandFunction.outputs[0];

/**
 * ExpirationTimeBeforeArbiter Client
 *
 * Validates that the attestation expiration time is before a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeBeforeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.expirationTimeBeforeArbiter,

    /**
     * Encodes ExpirationTimeBeforeArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 expirationTime}
     * @returns abi encoded bytes
     */
    encode: (demand: { expirationTime: bigint }) => {
      return encodeAbiParameters([expirationTimeBeforeArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to ExpirationTimeBeforeArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([expirationTimeBeforeArbiterDemandDataType], data)[0];
    },
  };
};
