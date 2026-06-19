import { abi as atomicPaymentUtilsAbi } from "../../../contracts/utils/AtomicPaymentUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc1155Addresses } from "./index";

export type Erc1155BarterUtilsClient = ReturnType<typeof makeErc1155BarterUtilsClient>;

export const makeErc1155BarterUtilsClient = (viemClient: ViemClient, addresses: Erc1155Addresses) => {
  return {
    address: addresses.barterUtils,

    payErc1155AndCollect: async (escrowUid: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "payErc1155AndCollect",
        args: [escrowUid],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
