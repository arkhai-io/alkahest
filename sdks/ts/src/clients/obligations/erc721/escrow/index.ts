import type { ViemClient } from "../../../../utils";
import type { Erc721Addresses } from "../index";
import { makeErc721NonTierableEscrowClient, type Erc721NonTierableEscrowClient } from "./nonTierable";
import { makeErc721TierableEscrowClient, type Erc721TierableEscrowClient } from "./tierable";

export { makeErc721NonTierableEscrowClient, type Erc721NonTierableEscrowClient } from "./nonTierable";
export { makeErc721TierableEscrowClient, type Erc721TierableEscrowClient } from "./tierable";

export type Erc721EscrowClient = {
  nonTierable: Erc721NonTierableEscrowClient;
  tierable: Erc721TierableEscrowClient;
};

export const makeErc721EscrowClient = (
  viemClient: ViemClient,
  addresses: Erc721Addresses,
): Erc721EscrowClient => {
  return {
    nonTierable: makeErc721NonTierableEscrowClient(viemClient, addresses),
    tierable: makeErc721TierableEscrowClient(viemClient, addresses),
  };
};
