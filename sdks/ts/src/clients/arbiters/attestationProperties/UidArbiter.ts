import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as UidArbiterAbi } from "../../../contracts/arbiters/attestation-properties/UidArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const uidArbiterDecodeDemandFunction = getAbiItem({
  abi: UidArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const uidArbiterDemandDataType = uidArbiterDecodeDemandFunction.outputs[0];

/**
 * Uid Arbiter Client
 *
 * Validates the UID of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeUidArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes UidArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 uid}
     * @returns abi encoded bytes
     */
    encode: (demand: { uid: `0x${string}` }) => {
      return encodeAbiParameters([uidArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes UidArbiter.DemandData from bytes.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([uidArbiterDemandDataType], data)[0];
    },
  };
};
