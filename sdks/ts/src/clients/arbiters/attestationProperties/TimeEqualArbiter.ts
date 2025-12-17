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
 * TimeEqualArbiter DemandData type
 */
export type TimeEqualArbiterDemandData = {
  time: bigint;
};

/**
 * Encodes TimeEqualArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 time}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: TimeEqualArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([timeEqualArbiterDemandDataType], [demand]);
};

/**
 * Decodes TimeEqualArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): TimeEqualArbiterDemandData => {
  return decodeAbiParameters([timeEqualArbiterDemandDataType], demandData)[0] as TimeEqualArbiterDemandData;
};

/**
 * TimeEqualArbiter Client
 *
 * Validates that the attestation timestamp equals a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeEqualArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
