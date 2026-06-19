import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as nativePaymentAbi } from "../../../contracts/obligations/payment/NativeTokenPaymentObligation";
import { abi as atomicPaymentUtilsAbi } from "../../../contracts/utils/AtomicPaymentUtils";
import { getAttestedEventFromTxHash, type ViemClient } from "../../../utils";
import type { NativeTokenAddresses } from "./index";

const nativePaymentDoObligationFunction = getAbiItem({
  abi: nativePaymentAbi.abi,
  name: "doObligation",
});
const nativePaymentObligationDataType = nativePaymentDoObligationFunction.inputs[0];

export type NativeTokenBarterUtilsClient = ReturnType<typeof makeNativeTokenBarterUtilsClient>;

export const makeNativeTokenBarterUtilsClient = (viemClient: ViemClient, addresses: NativeTokenAddresses) => {
  const getPaymentDemand = async (escrowUid: `0x${string}`) => {
    const escrow = await viemClient.readContract({
      address: addresses.eas,
      abi: easAbi.abi,
      functionName: "getAttestation",
      args: [escrowUid],
      authorizationList: undefined,
    });

    const [, demand] = await viemClient.readContract({
      address: escrow.attester,
      abi: [
        {
          type: "function",
          name: "decodeCondition",
          inputs: [{ name: "data", type: "bytes" }],
          outputs: [
            { name: "arbiter", type: "address" },
            { name: "demand", type: "bytes" },
          ],
          stateMutability: "pure",
        },
      ],
      functionName: "decodeCondition",
      args: [escrow.data],
      authorizationList: undefined,
    });

    return decodeAbiParameters([nativePaymentObligationDataType], demand)[0];
  };

  return {
    address: addresses.barterUtils,

    payNativeAndCollect: async (escrowUid: `0x${string}`) => {
      const demand = await getPaymentDemand(escrowUid);
      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "payNativeAndCollect",
        args: [escrowUid],
        value: demand.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
