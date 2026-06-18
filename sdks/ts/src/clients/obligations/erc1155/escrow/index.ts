import type { ViemClient } from "../../../../utils";
import type { Erc1155Addresses } from "../index";
import { type Erc1155DefaultEscrowClient, makeErc1155DefaultEscrowClient } from "./default";
import { type Erc1155UnconditionalEscrowClient, makeErc1155UnconditionalEscrowClient } from "./unconditional";

export { type Erc1155DefaultEscrowClient, makeErc1155DefaultEscrowClient } from "./default";
export { type Erc1155UnconditionalEscrowClient, makeErc1155UnconditionalEscrowClient } from "./unconditional";

export type Erc1155EscrowClient = {
  default: Erc1155DefaultEscrowClient;
  unconditional: Erc1155UnconditionalEscrowClient;
};

export const makeErc1155EscrowClient = (viemClient: ViemClient, addresses: Erc1155Addresses): Erc1155EscrowClient => {
  return {
    default: makeErc1155DefaultEscrowClient(viemClient, addresses),
    unconditional: makeErc1155UnconditionalEscrowClient(viemClient, addresses),
  };
};
