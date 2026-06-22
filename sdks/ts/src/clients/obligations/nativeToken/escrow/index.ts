import type { ViemClient } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";
import { makeNativeTokenDefaultEscrowClient, type NativeTokenDefaultEscrowClient } from "./default";
import { makeNativeTokenUnconditionalEscrowClient, type NativeTokenUnconditionalEscrowClient } from "./unconditional";

export {
  decodeObligation as decodeDefaultObligation,
  encodeObligation as encodeDefaultObligation,
  makeNativeTokenDefaultEscrowClient,
  type NativeTokenDefaultEscrowClient,
  type NativeTokenDefaultEscrowObligationData,
} from "./default";
export {
  decodeObligation as decodeUnconditionalObligation,
  encodeObligation as encodeUnconditionalObligation,
  makeNativeTokenUnconditionalEscrowClient,
  type NativeTokenUnconditionalEscrowClient,
  type NativeTokenUnconditionalEscrowObligationData,
} from "./unconditional";

/** Native-token escrow client namespace. */
export type NativeTokenEscrowClient = {
  default: NativeTokenDefaultEscrowClient;
  unconditional: NativeTokenUnconditionalEscrowClient;
};

/** Create default and unconditional native-token escrow clients. */
export const makeNativeTokenEscrowClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
): NativeTokenEscrowClient => {
  return {
    default: makeNativeTokenDefaultEscrowClient(viemClient, addresses),
    unconditional: makeNativeTokenUnconditionalEscrowClient(viemClient, addresses),
  };
};
