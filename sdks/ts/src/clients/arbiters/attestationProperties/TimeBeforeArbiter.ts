import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as TimeBeforeArbiterAbi } from "../../../contracts/arbiters/attestation-properties/TimeBeforeArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const timeBeforeArbiterDecodeDemandFunction = getAbiItem({
  abi: TimeBeforeArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const timeBeforeArbiterDemandDataType = timeBeforeArbiterDecodeDemandFunction.outputs[0];

/**
 * TimeBeforeArbiter Client
 *
 * Validates that the attestation timestamp is before a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeBeforeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.timeBeforeArbiter,

    /**
     * Encodes TimeBeforeArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     * @returns abi encoded bytes
     */
    encode: (demand: { time: bigint }) => {
      return encodeAbiParameters([timeBeforeArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to TimeBeforeArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([timeBeforeArbiterDemandDataType], data)[0];
    },
  };
};
