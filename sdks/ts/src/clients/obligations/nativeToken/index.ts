import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeNativeTokenBarterUtilsClient, type NativeTokenBarterUtilsClient } from "./barterUtils";
import { makeNativeTokenEscrowClient, type NativeTokenEscrowClient } from "./escrow";
import { makeNativeTokenPaymentClient, type NativeTokenPaymentClient, type NativeTokenPaymentObligationData } from "./payment";

export { makeNativeTokenBarterUtilsClient, type NativeTokenBarterUtilsClient } from "./barterUtils";
export { makeNativeTokenEscrowClient, type NativeTokenEscrowClient } from "./escrow";
export { makeNativeTokenNonTierableEscrowClient, type NativeTokenNonTierableEscrowClient, type NativeTokenEscrowObligationData } from "./escrow/nonTierable";
export { makeNativeTokenTierableEscrowClient, type NativeTokenTierableEscrowClient } from "./escrow/tierable";
export { makeNativeTokenPaymentClient, type NativeTokenPaymentClient, type NativeTokenPaymentObligationData } from "./payment";

export type NativeTokenAddresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationTierable: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickNativeTokenAddresses = (addresses: ChainAddresses): NativeTokenAddresses => ({
  eas: addresses.eas,
  barterUtils: addresses.nativeTokenBarterUtils,
  escrowObligation: addresses.nativeTokenEscrowObligation,
  escrowObligationTierable: addresses.nativeTokenEscrowObligation, // TODO: Add tierable address when available
  paymentObligation: addresses.nativeTokenPaymentObligation,
});

export type NativeTokenClient = {
  escrow: NativeTokenEscrowClient;
  payment: NativeTokenPaymentClient;
  barter: NativeTokenBarterUtilsClient;
};

export const makeNativeTokenClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
): NativeTokenClient => {
  return {
    escrow: makeNativeTokenEscrowClient(viemClient, addresses),
    payment: makeNativeTokenPaymentClient(viemClient, addresses),
    barter: makeNativeTokenBarterUtilsClient(viemClient, addresses),
  };
};
