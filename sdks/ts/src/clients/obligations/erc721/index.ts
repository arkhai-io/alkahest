import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type Erc721BarterUtilsClient, makeErc721BarterUtilsClient } from "./barterUtils";
import { type Erc721EscrowClient, makeErc721EscrowClient } from "./escrow";
import { type Erc721PaymentClient, makeErc721PaymentClient } from "./payment";
import { type Erc721UtilClient, makeErc721UtilClient } from "./util";

export { type Erc721BarterUtilsClient, makeErc721BarterUtilsClient } from "./barterUtils";
export { type Erc721EscrowClient, makeErc721EscrowClient } from "./escrow";
export { type Erc721NonTierableEscrowClient, makeErc721NonTierableEscrowClient } from "./escrow/nonTierable";
export { type Erc721TierableEscrowClient, makeErc721TierableEscrowClient } from "./escrow/tierable";
export { type Erc721PaymentClient, makeErc721PaymentClient } from "./payment";
export { type Erc721UtilClient, makeErc721UtilClient } from "./util";

export type Erc721Addresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  nativeTokenBarterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationTierable: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickErc721Addresses = (addresses: ChainAddresses): Erc721Addresses => ({
  eas: addresses.eas,
  barterUtils: addresses.erc721BarterUtils,
  nativeTokenBarterUtils: addresses.nativeTokenBarterUtils,
  escrowObligation: addresses.erc721EscrowObligation,
  escrowObligationTierable: addresses.erc721EscrowObligation, // TODO: Add tierable address when available
  paymentObligation: addresses.erc721PaymentObligation,
});

export type Erc721Client = {
  util: Erc721UtilClient;
  escrow: Erc721EscrowClient;
  payment: Erc721PaymentClient;
  barter: Erc721BarterUtilsClient;
};

export const makeErc721Client = (viemClient: ViemClient, addresses: Erc721Addresses): Erc721Client => {
  return {
    util: makeErc721UtilClient(viemClient, addresses),
    escrow: makeErc721EscrowClient(viemClient, addresses),
    payment: makeErc721PaymentClient(viemClient, addresses),
    barter: makeErc721BarterUtilsClient(viemClient, addresses),
  };
};
