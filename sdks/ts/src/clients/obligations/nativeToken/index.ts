import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeNativeTokenBarterUtilsClient, type NativeTokenBarterUtilsClient } from "./barterUtils";
import { makeNativeTokenEscrowClient, type NativeTokenEscrowClient } from "./escrow";
import {
  makeNativeTokenPaymentClient,
  type NativeTokenPaymentClient,
  type NativeTokenPaymentObligationData,
} from "./payment";

export { makeNativeTokenBarterUtilsClient, type NativeTokenBarterUtilsClient } from "./barterUtils";
export { makeNativeTokenEscrowClient, type NativeTokenEscrowClient } from "./escrow";
export {
  decodeObligation as decodeDefaultEscrowObligation,
  encodeObligation as encodeDefaultEscrowObligation,
  makeNativeTokenDefaultEscrowClient,
  type NativeTokenDefaultEscrowClient,
  type NativeTokenDefaultEscrowObligationData,
} from "./escrow/default";
export {
  decodeObligation as decodeUnconditionalEscrowObligation,
  encodeObligation as encodeUnconditionalEscrowObligation,
  makeNativeTokenUnconditionalEscrowClient,
  type NativeTokenUnconditionalEscrowClient,
  type NativeTokenUnconditionalEscrowObligationData,
} from "./escrow/unconditional";
export {
  decodeObligation as decodePaymentObligation,
  encodeObligation as encodePaymentObligation,
  makeNativeTokenPaymentClient,
  type NativeTokenPaymentClient,
  type NativeTokenPaymentObligationData,
} from "./payment";

export type NativeTokenAddresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationUnconditional: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickNativeTokenAddresses = (addresses: ChainAddresses): NativeTokenAddresses => ({
  eas: addresses.eas,
  barterUtils: addresses.nativeTokenBarterUtils,
  escrowObligation: addresses.nativeTokenEscrowObligation,
  escrowObligationUnconditional: addresses.nativeTokenEscrowObligation, // TODO: Add unconditional address when available
  paymentObligation: addresses.nativeTokenPaymentObligation,
});

export type NativeTokenClient = {
  escrow: NativeTokenEscrowClient;
  payment: NativeTokenPaymentClient;
  barter: NativeTokenBarterUtilsClient;
};

export const makeNativeTokenClient = (viemClient: ViemClient, addresses: NativeTokenAddresses): NativeTokenClient => {
  return {
    escrow: makeNativeTokenEscrowClient(viemClient, addresses),
    payment: makeNativeTokenPaymentClient(viemClient, addresses),
    barter: makeNativeTokenBarterUtilsClient(viemClient, addresses),
  };
};
