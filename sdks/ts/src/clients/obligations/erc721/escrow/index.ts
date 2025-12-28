import type { ViemClient } from "../../../../utils";
import type { Erc721Addresses } from "../index";
import { type Erc721NonTierableEscrowClient, makeErc721NonTierableEscrowClient } from "./nonTierable";
import { type Erc721TierableEscrowClient, makeErc721TierableEscrowClient } from "./tierable";

export { type Erc721NonTierableEscrowClient, makeErc721NonTierableEscrowClient } from "./nonTierable";
export { type Erc721TierableEscrowClient, makeErc721TierableEscrowClient } from "./tierable";

export type Erc721EscrowClient = {
  nonTierable: Erc721NonTierableEscrowClient;
  tierable: Erc721TierableEscrowClient;
};

export const makeErc721EscrowClient = (viemClient: ViemClient, addresses: Erc721Addresses): Erc721EscrowClient => {
  return {
    nonTierable: makeErc721NonTierableEscrowClient(viemClient, addresses),
    tierable: makeErc721TierableEscrowClient(viemClient, addresses),
  };
};
