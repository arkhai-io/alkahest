import type { ViemClient } from "../../../../utils";
import type { Erc20Addresses } from "../index";
import { type Erc20NonTierableEscrowClient, makeErc20NonTierableEscrowClient } from "./nonTierable";
import { type Erc20TierableEscrowClient, makeErc20TierableEscrowClient } from "./tierable";

export { type Erc20NonTierableEscrowClient, makeErc20NonTierableEscrowClient } from "./nonTierable";
export { type Erc20TierableEscrowClient, makeErc20TierableEscrowClient } from "./tierable";

export type Erc20EscrowClient = {
  nonTierable: Erc20NonTierableEscrowClient;
  tierable: Erc20TierableEscrowClient;
};

export const makeErc20EscrowClient = (viemClient: ViemClient, addresses: Erc20Addresses): Erc20EscrowClient => {
  return {
    nonTierable: makeErc20NonTierableEscrowClient(viemClient, addresses),
    tierable: makeErc20TierableEscrowClient(viemClient, addresses),
  };
};
