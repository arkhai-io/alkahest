import type { ViemClient } from "../../../../utils";
import type { TokenBundleAddresses } from "../index";
import { makeTokenBundleDefaultEscrowClient, type TokenBundleDefaultEscrowClient } from "./default";
import { makeTokenBundleUnconditionalEscrowClient, type TokenBundleUnconditionalEscrowClient } from "./unconditional";

export { makeTokenBundleDefaultEscrowClient, type TokenBundleDefaultEscrowClient } from "./default";
export { makeTokenBundleUnconditionalEscrowClient, type TokenBundleUnconditionalEscrowClient } from "./unconditional";

export type TokenBundleEscrowClient = {
  default: TokenBundleDefaultEscrowClient;
  unconditional: TokenBundleUnconditionalEscrowClient;
};

export const makeTokenBundleEscrowClient = (
  viemClient: ViemClient,
  addresses: TokenBundleAddresses,
): TokenBundleEscrowClient => {
  return {
    default: makeTokenBundleDefaultEscrowClient(viemClient, addresses),
    unconditional: makeTokenBundleUnconditionalEscrowClient(viemClient, addresses),
  };
};
