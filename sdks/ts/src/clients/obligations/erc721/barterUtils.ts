import { abi as atomicPaymentUtilsAbi } from "../../../contracts/utils/AtomicPaymentUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc721Addresses } from "./index";

export type Erc721BarterUtilsClient = ReturnType<typeof makeErc721BarterUtilsClient>;

export const makeErc721BarterUtilsClient = (viemClient: ViemClient, addresses: Erc721Addresses) => {
  return {
    address: addresses.barterUtils,

    payErc721AndCollect: async (escrowUid: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "payErc721AndCollect",
        args: [escrowUid],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
