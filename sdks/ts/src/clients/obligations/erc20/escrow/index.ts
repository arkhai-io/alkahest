import type { ViemClient } from "../../../../utils";
import type { Erc20Addresses } from "../index";
import { type Erc20DefaultEscrowClient, makeErc20DefaultEscrowClient } from "./default";
import { type Erc20UnconditionalEscrowClient, makeErc20UnconditionalEscrowClient } from "./unconditional";

export { type Erc20DefaultEscrowClient, makeErc20DefaultEscrowClient } from "./default";
export { type Erc20UnconditionalEscrowClient, makeErc20UnconditionalEscrowClient } from "./unconditional";

export type Erc20EscrowClient = {
  default: Erc20DefaultEscrowClient;
  unconditional: Erc20UnconditionalEscrowClient;
};

export const makeErc20EscrowClient = (viemClient: ViemClient, addresses: Erc20Addresses): Erc20EscrowClient => {
  return {
    default: makeErc20DefaultEscrowClient(viemClient, addresses),
    unconditional: makeErc20UnconditionalEscrowClient(viemClient, addresses),
  };
};
