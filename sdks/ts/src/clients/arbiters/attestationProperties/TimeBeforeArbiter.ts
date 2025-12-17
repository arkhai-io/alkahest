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
 * TimeBeforeArbiter DemandData type
 */
export type TimeBeforeArbiterDemandData = {
  time: bigint;
};

/**
 * Encodes TimeBeforeArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 time}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: TimeBeforeArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([timeBeforeArbiterDemandDataType], [demand]);
};

/**
 * Decodes TimeBeforeArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): TimeBeforeArbiterDemandData => {
  return decodeAbiParameters([timeBeforeArbiterDemandDataType], demandData)[0] as TimeBeforeArbiterDemandData;
};

/**
 * TimeBeforeArbiter Client
 *
 * Validates that the attestation timestamp is before a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeBeforeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
