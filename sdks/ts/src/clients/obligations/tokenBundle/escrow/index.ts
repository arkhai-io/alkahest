import type { ViemClient } from "../../../../utils";
import type { TokenBundleAddresses } from "../index";
import { makeTokenBundleDefaultEscrowClient, type TokenBundleDefaultEscrowClient } from "./default";
import { makeTokenBundleUnconditionalEscrowClient, type TokenBundleUnconditionalEscrowClient } from "./unconditional";

export { makeTokenBundleDefaultEscrowClient, type TokenBundleDefaultEscrowClient } from "./default";
export { makeTokenBundleUnconditionalEscrowClient, type TokenBundleUnconditionalEscrowClient } from "./unconditional";

/** Token-bundle escrow client namespace. */
export type TokenBundleEscrowClient = {
  default: TokenBundleDefaultEscrowClient;
  unconditional: TokenBundleUnconditionalEscrowClient;
};

/** Create default and unconditional token-bundle escrow clients. */
export const makeTokenBundleEscrowClient = (
  viemClient: ViemClient,
  addresses: TokenBundleAddresses,
): TokenBundleEscrowClient => {
  return {
    default: makeTokenBundleDefaultEscrowClient(viemClient, addresses),
    unconditional: makeTokenBundleUnconditionalEscrowClient(viemClient, addresses),
  };
};
