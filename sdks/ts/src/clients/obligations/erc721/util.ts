import { abi as erc721Abi } from "../../../contracts/IERC721";
import type { ApprovalPurpose, Erc721 } from "../../../types";
import { type ViemClient, writeContract } from "../../../utils";
import type { Erc721Addresses } from "./index";

/** ERC721 approval helper client. */
export type Erc721UtilClient = ReturnType<typeof makeErc721UtilClient>;

/** Create ERC721 approval helpers. */
export const makeErc721UtilClient = (viemClient: ViemClient, addresses: Erc721Addresses) => {
  return {
    approve: async (token: Erc721, purpose: ApprovalPurpose) => {
      const to =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.atomicPaymentUtils;
      const hash = await writeContract(viemClient, {
        address: token.address,
        abi: erc721Abi.abi,
        functionName: "approve",
        args: [to, token.id],
      });
      return hash;
    },

    approveAll: async (tokenContract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.atomicPaymentUtils;
      const hash = await writeContract(viemClient, {
        address: tokenContract,
        abi: erc721Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, true],
      });
      return hash;
    },

    revokeAll: async (tokenContract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.atomicPaymentUtils;
      const hash = await writeContract(viemClient, {
        address: tokenContract,
        abi: erc721Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, false],
      });
      return hash;
    },
  };
};
