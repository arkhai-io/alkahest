import type { ViemClient } from "../../../../utils";
import type { Erc1155Addresses } from "../index";
import { makeErc1155NonTierableEscrowClient, type Erc1155NonTierableEscrowClient } from "./nonTierable";
import { makeErc1155TierableEscrowClient, type Erc1155TierableEscrowClient } from "./tierable";

export { makeErc1155NonTierableEscrowClient, type Erc1155NonTierableEscrowClient } from "./nonTierable";
export { makeErc1155TierableEscrowClient, type Erc1155TierableEscrowClient } from "./tierable";

export type Erc1155EscrowClient = {
  nonTierable: Erc1155NonTierableEscrowClient;
  tierable: Erc1155TierableEscrowClient;
};

export const makeErc1155EscrowClient = (
  viemClient: ViemClient,
  addresses: Erc1155Addresses,
): Erc1155EscrowClient => {
  return {
    nonTierable: makeErc1155NonTierableEscrowClient(viemClient, addresses),
    tierable: makeErc1155TierableEscrowClient(viemClient, addresses),
  };
};
