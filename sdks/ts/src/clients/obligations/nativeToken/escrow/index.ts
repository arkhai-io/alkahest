import type { ViemClient } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";
import { makeNativeTokenNonTierableEscrowClient, type NativeTokenNonTierableEscrowClient } from "./nonTierable";
import { makeNativeTokenTierableEscrowClient, type NativeTokenTierableEscrowClient } from "./tierable";

export { makeNativeTokenNonTierableEscrowClient, type NativeTokenNonTierableEscrowClient, type NativeTokenNonTierableEscrowObligationData, encodeObligation as encodeNonTierableObligation, decodeObligation as decodeNonTierableObligation } from "./nonTierable";
export { encodeObligation as encodeTierableObligation, decodeObligation as decodeTierableObligation, type NativeTokenTierableEscrowObligationData } from "./tierable";
export { makeNativeTokenTierableEscrowClient, type NativeTokenTierableEscrowClient } from "./tierable";

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
