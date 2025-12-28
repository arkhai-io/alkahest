import type { ViemClient } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";
import { makeNativeTokenNonTierableEscrowClient, type NativeTokenNonTierableEscrowClient } from "./nonTierable";
import { makeNativeTokenTierableEscrowClient, type NativeTokenTierableEscrowClient } from "./tierable";

export {
  decodeObligation as decodeNonTierableObligation,
  encodeObligation as encodeNonTierableObligation,
  makeNativeTokenNonTierableEscrowClient,
  type NativeTokenNonTierableEscrowClient,
  type NativeTokenNonTierableEscrowObligationData,
} from "./nonTierable";
export {
  decodeObligation as decodeTierableObligation,
  encodeObligation as encodeTierableObligation,
  makeNativeTokenTierableEscrowClient,
  type NativeTokenTierableEscrowClient,
  type NativeTokenTierableEscrowObligationData,
} from "./tierable";

export type NativeTokenEscrowClient = {
  nonTierable: NativeTokenNonTierableEscrowClient;
  tierable: NativeTokenTierableEscrowClient;
};

export const makeNativeTokenEscrowClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
): NativeTokenEscrowClient => {
  return {
    nonTierable: makeNativeTokenNonTierableEscrowClient(viemClient, addresses),
    tierable: makeNativeTokenTierableEscrowClient(viemClient, addresses),
  };
};
