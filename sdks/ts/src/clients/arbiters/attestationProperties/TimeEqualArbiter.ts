import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as TimeEqualArbiterAbi } from "../../../contracts/arbiters/attestation-properties/TimeEqualArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const timeEqualArbiterDecodeDemandFunction = getAbiItem({
  abi: TimeEqualArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const timeEqualArbiterDemandDataType = timeEqualArbiterDecodeDemandFunction.outputs[0];

/**
 * TimeEqualArbiter Client
 *
 * Validates that the attestation timestamp equals a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeEqualArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.timeEqualArbiter,

    /**
     * Encodes TimeEqualArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     * @returns abi encoded bytes
     */
    encode: (demand: { time: bigint }) => {
      return encodeAbiParameters([timeEqualArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to TimeEqualArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([timeEqualArbiterDemandDataType], data)[0];
    },
  };
};
