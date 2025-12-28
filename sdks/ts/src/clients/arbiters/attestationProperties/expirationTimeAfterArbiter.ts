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
 * ExpirationTimeAfterArbiter DemandData type
 */
export type ExpirationTimeAfterArbiterDemandData = {
  expirationTime: bigint;
};

/**
 * Encodes ExpirationTimeAfterArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 expirationTime}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: ExpirationTimeAfterArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([expirationTimeAfterArbiterDemandDataType], [demand]);
};

/**
 * Decodes ExpirationTimeAfterArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): ExpirationTimeAfterArbiterDemandData => {
  return decodeAbiParameters(
    [expirationTimeAfterArbiterDemandDataType],
    demandData,
  )[0] as ExpirationTimeAfterArbiterDemandData;
};

/**
 * ExpirationTimeAfterArbiter Client
 *
 * Validates that the attestation expiration time is after a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeAfterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
