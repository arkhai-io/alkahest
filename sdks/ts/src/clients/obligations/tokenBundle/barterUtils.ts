import { abi as atomicPaymentUtilsAbi } from "../../../contracts/utils/AtomicPaymentUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { TokenBundleAddresses } from "./index";

export type TokenBundleBarterUtilsClient = ReturnType<typeof makeTokenBundleBarterUtilsClient>;

export const makeTokenBundleBarterUtilsClient = (viemClient: ViemClient, addresses: TokenBundleAddresses) => {
  return {
    address: addresses.barterUtils,

    payBundleAndCollect: async (escrowUid: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "payBundleAndCollect",
        args: [escrowUid],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
