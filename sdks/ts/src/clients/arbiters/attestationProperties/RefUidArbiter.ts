import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RefUidArbiterAbi } from "../../../contracts/arbiters/attestation-properties/RefUidArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const refUidArbiterDecodeDemandFunction = getAbiItem({
  abi: RefUidArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const refUidArbiterDemandDataType = refUidArbiterDecodeDemandFunction.outputs[0];

/**
 * RefUid Arbiter Client
 *
 * Validates the reference UID of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeRefUidArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes RefUidArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 refUID}
     * @returns abi encoded bytes
     */
    encode: (demand: { refUID: `0x${string}` }) => {
      return encodeAbiParameters([refUidArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes RefUidArbiter.DemandData from bytes.
     * @param data - abi encoded bytes
     * @returns decoded DemandData struct
     */
    decode: (data: `0x${string}`) => {
      return decodeAbiParameters([refUidArbiterDemandDataType], data)[0];
    },
  };
};
