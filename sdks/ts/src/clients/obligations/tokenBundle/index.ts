import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeTokenBundleEscrowClient, type TokenBundleEscrowClient } from "./escrow";
import { makeTokenBundlePaymentClient, type TokenBundlePaymentClient } from "./payment";
import { makeTokenBundleUtilClient, type TokenBundleUtilClient } from "./util";

export { makeTokenBundleEscrowClient, type TokenBundleEscrowClient } from "./escrow";
export { makeTokenBundleDefaultEscrowClient, type TokenBundleDefaultEscrowClient } from "./escrow/default";
export { makeTokenBundleUnconditionalEscrowClient, type TokenBundleUnconditionalEscrowClient } from "./escrow/unconditional";
export { makeTokenBundlePaymentClient, type TokenBundlePaymentClient } from "./payment";
export { makeTokenBundleUtilClient, type TokenBundleUtilClient } from "./util";

export type TokenBundleAddresses = {
  eas: `0x${string}`;
  atomicPaymentUtils: `0x${string}`;
  nativeTokenAtomicPaymentUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationUnconditional: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickTokenBundleAddresses = (addresses: ChainAddresses): TokenBundleAddresses => ({
  eas: addresses.eas,
  atomicPaymentUtils: addresses.tokenBundleAtomicPaymentUtils,
  nativeTokenAtomicPaymentUtils: addresses.nativeTokenAtomicPaymentUtils,
  escrowObligation: addresses.tokenBundleEscrowObligation,
  escrowObligationUnconditional: addresses.tokenBundleUnconditionalEscrowObligation,
  paymentObligation: addresses.tokenBundlePaymentObligation,
});

export type TokenBundleClient = {
  util: TokenBundleUtilClient;
  escrow: TokenBundleEscrowClient;
  payment: TokenBundlePaymentClient;
};

export const makeTokenBundleClient = (viemClient: ViemClient, addresses: TokenBundleAddresses): TokenBundleClient => {
  return {
    util: makeTokenBundleUtilClient(viemClient, addresses),
    escrow: makeTokenBundleEscrowClient(viemClient, addresses),
    payment: makeTokenBundlePaymentClient(viemClient, addresses),
  };
};
