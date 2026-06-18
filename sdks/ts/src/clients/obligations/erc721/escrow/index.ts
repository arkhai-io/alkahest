import type { ViemClient } from "../../../../utils";
import type { Erc721Addresses } from "../index";
import { type Erc721DefaultEscrowClient, makeErc721DefaultEscrowClient } from "./default";
import { type Erc721UnconditionalEscrowClient, makeErc721UnconditionalEscrowClient } from "./unconditional";

export { type Erc721DefaultEscrowClient, makeErc721DefaultEscrowClient } from "./default";
export { type Erc721UnconditionalEscrowClient, makeErc721UnconditionalEscrowClient } from "./unconditional";

export type Erc721EscrowClient = {
  default: Erc721DefaultEscrowClient;
  unconditional: Erc721UnconditionalEscrowClient;
};

export const makeErc721EscrowClient = (viemClient: ViemClient, addresses: Erc721Addresses): Erc721EscrowClient => {
  return {
    default: makeErc721DefaultEscrowClient(viemClient, addresses),
    unconditional: makeErc721UnconditionalEscrowClient(viemClient, addresses),
  };
};
