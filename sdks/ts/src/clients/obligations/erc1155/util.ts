import { abi as erc1155Abi } from "../../../contracts/IERC1155";
import type { ApprovalPurpose } from "../../../types";
import { writeContract, type ViemClient } from "../../../utils";
import type { Erc1155Addresses } from "./index";

export type Erc1155UtilClient = ReturnType<typeof makeErc1155UtilClient>;

export const makeErc1155UtilClient = (
  viemClient: ViemClient,
  addresses: Erc1155Addresses,
) => {
  return {
    approveAll: async (tokenContract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.escrowObligation : addresses.paymentObligation;
      const hash = await writeContract(viemClient, {
        address: tokenContract,
        abi: erc1155Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, true],
      });
      return hash;
    },

    revokeAll: async (tokenContract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.escrowObligation : addresses.paymentObligation;
      const hash = await writeContract(viemClient, {
        address: tokenContract,
        abi: erc1155Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, false],
      });
      return hash;
    },

    approveAllForBarterUtils: async (tokenContract: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: tokenContract,
        abi: erc1155Abi.abi,
        functionName: "setApprovalForAll",
        args: [addresses.barterUtils, true],
      });
      return hash;
    },
  };
};
