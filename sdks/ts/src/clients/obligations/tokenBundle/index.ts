import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeTokenBundleBarterUtilsClient, type TokenBundleBarterUtilsClient } from "./barterUtils";
import { makeTokenBundleEscrowClient, type TokenBundleEscrowClient } from "./escrow";
import { makeTokenBundlePaymentClient, type TokenBundlePaymentClient } from "./payment";
import { makeTokenBundleUtilClient, type TokenBundleUtilClient } from "./util";

export { makeTokenBundleBarterUtilsClient, type TokenBundleBarterUtilsClient } from "./barterUtils";
export { makeTokenBundleEscrowClient, type TokenBundleEscrowClient } from "./escrow";
export { makeTokenBundleNonTierableEscrowClient, type TokenBundleNonTierableEscrowClient } from "./escrow/nonTierable";
export { makeTokenBundleTierableEscrowClient, type TokenBundleTierableEscrowClient } from "./escrow/tierable";
export { makeTokenBundlePaymentClient, type TokenBundlePaymentClient } from "./payment";
export { makeTokenBundleUtilClient, type TokenBundleUtilClient } from "./util";

export type TokenBundleAddresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  nativeTokenBarterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationTierable: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickTokenBundleAddresses = (addresses: ChainAddresses): TokenBundleAddresses => ({
  eas: addresses.eas,
  barterUtils: addresses.tokenBundleBarterUtils,
  nativeTokenBarterUtils: addresses.nativeTokenBarterUtils,
  escrowObligation: addresses.tokenBundleEscrowObligation,
  escrowObligationTierable: addresses.tokenBundleEscrowObligation, // TODO: Add tierable address when available
  paymentObligation: addresses.tokenBundlePaymentObligation,
});

export type TokenBundleClient = {
  util: TokenBundleUtilClient;
  escrow: TokenBundleEscrowClient;
  payment: TokenBundlePaymentClient;
  barter: TokenBundleBarterUtilsClient;
};

export const makeTokenBundleClient = (
  viemClient: ViemClient,
  addresses: TokenBundleAddresses,
): TokenBundleClient => {
  return {
    util: makeTokenBundleUtilClient(viemClient, addresses),
    escrow: makeTokenBundleEscrowClient(viemClient, addresses),
    payment: makeTokenBundlePaymentClient(viemClient, addresses),
    barter: makeTokenBundleBarterUtilsClient(viemClient, addresses),
  };
};
