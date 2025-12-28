import { abi as erc20Abi } from "../../../contracts/ERC20Permit";
import { abi as erc721Abi } from "../../../contracts/IERC721";
import { abi as erc1155Abi } from "../../../contracts/IERC1155";
import type { ApprovalPurpose, TokenBundle } from "../../../types";
import { type ViemClient, writeContract } from "../../../utils";
import type { TokenBundleAddresses } from "./index";

export type TokenBundleUtilClient = ReturnType<typeof makeTokenBundleUtilClient>;

export const makeTokenBundleUtilClient = (viemClient: ViemClient, addresses: TokenBundleAddresses) => {
  return {
    approve: async (bundle: TokenBundle, purpose: ApprovalPurpose) => {
      const target =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.barterUtils;
      const results: `0x${string}`[] = [];

      // Process ERC20 tokens sequentially
      for (const token of bundle.erc20s) {
        const hash = await writeContract(viemClient, {
          address: token.address,
          abi: erc20Abi.abi,
          functionName: "approve",
          args: [target, token.value],
        });
        results.push(hash);
      }

      // Process ERC721 tokens sequentially (use setApprovalForAll per contract)
      const erc721AddressesSet = new Set(bundle.erc721s.map((token) => token.address));
      for (const address of erc721AddressesSet) {
        const hash = await writeContract(viemClient, {
          address: address,
          abi: erc721Abi.abi,
          functionName: "setApprovalForAll",
          args: [target, true],
        });
        results.push(hash);
      }

      // Process ERC1155 tokens sequentially (use setApprovalForAll per contract)
      const erc1155AddressesSet = new Set(bundle.erc1155s.map((token) => token.address));
      for (const address of erc1155AddressesSet) {
        const hash = await writeContract(viemClient, {
          address: address,
          abi: erc1155Abi.abi,
          functionName: "setApprovalForAll",
          args: [target, true],
        });
        results.push(hash);
      }

      return results;
    },
  };
};
