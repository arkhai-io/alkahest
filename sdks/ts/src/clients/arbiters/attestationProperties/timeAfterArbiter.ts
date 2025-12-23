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
 * TimeAfterArbiter DemandData type
 */
export type TimeAfterArbiterDemandData = {
  time: bigint;
};

/**
 * Encodes TimeAfterArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 time}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: TimeAfterArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([timeAfterArbiterDemandDataType], [demand]);
};

/**
 * Decodes TimeAfterArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): TimeAfterArbiterDemandData => {
  return decodeAbiParameters([timeAfterArbiterDemandDataType], demandData)[0] as TimeAfterArbiterDemandData;
};

/**
 * TimeAfterArbiter Client
 *
 * Validates that the attestation timestamp is after a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeTimeAfterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
