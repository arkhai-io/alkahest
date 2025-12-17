import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as TimeAfterArbiterAbi } from "../../../contracts/arbiters/attestation-properties/TimeAfterArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const timeAfterArbiterDecodeDemandFunction = getAbiItem({
  abi: TimeAfterArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const timeAfterArbiterDemandDataType = timeAfterArbiterDecodeDemandFunction.outputs[0];

/**
 * TimeAfterArbiter Client
 *
 * Validates that the attestation timestamp is after a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeAfterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.timeAfterArbiter,

    /**
     * Encodes TimeAfterArbiter.DemandData to bytes.
     * @param demand - struct DemandData {uint64 time}
     * @returns abi encoded bytes
     */
    encode: (demand: { time: bigint }) => {
      return encodeAbiParameters([timeAfterArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes bytes to TimeAfterArbiter.DemandData.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([timeAfterArbiterDemandDataType], data)[0];
    },
  };
};
