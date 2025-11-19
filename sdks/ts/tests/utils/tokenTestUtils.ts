import type { Client, PublicActions, TestClient } from "viem";
import type { Erc20, Erc721, Erc1155 } from "../../src/types";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";

// Helper to compare addresses with normalization
export function compareAddresses(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

export type AlkahestTestActions = ReturnType<ReturnType<typeof createTokenTestExtension>>;

// Create token testing extensions that can be added to viem clients
export function createTokenTestExtension<C extends Client & PublicActions>() {
  return (client: C) => ({
    // Get ERC20 token balance
    async getErc20Balance(token: Omit<Erc20, "value">, owner: `0x${string}`) {
      return client.readContract({
        address: token.address,
        abi: MockERC20Permit.abi,
        functionName: "balanceOf",
        args: [owner],
      }) as Promise<bigint>;
    },

    // Get ERC721 token owner
    async getErc721Owner(token: Erc721) {
      return client.readContract({
        address: token.address,
        abi: MockERC721.abi,
        functionName: "ownerOf",
        args: [token.id],
      }) as Promise<`0x${string}`>;
    },

    // Get ERC1155 token balance
    async getErc1155Balance(token: Omit<Erc1155, "value">, owner: `0x${string}`) {
      return client.readContract({
        address: token.address,
        abi: MockERC1155.abi,
        functionName: "balanceOf",
        args: [owner, token.id],
      }) as Promise<bigint>;
    },
  });
}

// Legacy utility functions for backward compatibility
// Utility function to check ERC20 balance
export async function getErc20Balance(
  testClient: TestClient & PublicActions,
  tokenAddress: `0x${string}`,
  ownerAddress: `0x${string}`,
) {
  return testClient.readContract({
    address: tokenAddress,
    abi: MockERC20Permit.abi,
    functionName: "balanceOf",
    args: [ownerAddress],
  }) as Promise<bigint>;
}

// Utility function to check ERC721 owner
export async function getERC721Owner(
  testClient: TestClient & PublicActions,
  tokenAddress: `0x${string}`,
  tokenId: bigint,
) {
  return testClient.readContract({
    address: tokenAddress,
    abi: MockERC721.abi,
    functionName: "ownerOf",
    args: [tokenId],
  }) as Promise<`0x${string}`>;
}

// Utility function to check ERC1155 balance
export async function getERC1155Balance(
  testClient: TestClient & PublicActions,
  tokenAddress: `0x${string}`,
  ownerAddress: `0x${string}`,
  tokenId: bigint,
) {
  return testClient.readContract({
    address: tokenAddress,
    abi: MockERC1155.abi,
    functionName: "balanceOf",
    args: [ownerAddress, tokenId],
  }) as Promise<bigint>;
}
