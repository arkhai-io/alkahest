import type { ViemClient } from "../../../../utils";
import type { TokenBundleAddresses } from "../index";
import { makeTokenBundleNonTierableEscrowClient, type TokenBundleNonTierableEscrowClient } from "./nonTierable";
import { makeTokenBundleTierableEscrowClient, type TokenBundleTierableEscrowClient } from "./tierable";

export { makeTokenBundleNonTierableEscrowClient, type TokenBundleNonTierableEscrowClient } from "./nonTierable";
export { makeTokenBundleTierableEscrowClient, type TokenBundleTierableEscrowClient } from "./tierable";

export type TokenBundleEscrowClient = {
  nonTierable: TokenBundleNonTierableEscrowClient;
  tierable: TokenBundleTierableEscrowClient;
};

export const makeTokenBundleEscrowClient = (
  viemClient: ViemClient,
  addresses: TokenBundleAddresses,
): TokenBundleEscrowClient => {
  return {
    nonTierable: makeTokenBundleNonTierableEscrowClient(viemClient, addresses),
    tierable: makeTokenBundleTierableEscrowClient(viemClient, addresses),
  };
};
