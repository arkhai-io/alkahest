import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeErc721BarterUtilsClient, type Erc721BarterUtilsClient } from "./barterUtils";
import { makeErc721EscrowClient, type Erc721EscrowClient } from "./escrow";
import { makeErc721PaymentClient, type Erc721PaymentClient } from "./payment";
import { makeErc721UtilClient, type Erc721UtilClient } from "./util";

export { makeErc721BarterUtilsClient, type Erc721BarterUtilsClient } from "./barterUtils";
export { makeErc721EscrowClient, type Erc721EscrowClient } from "./escrow";
export { makeErc721NonTierableEscrowClient, type Erc721NonTierableEscrowClient } from "./escrow/nonTierable";
export { makeErc721TierableEscrowClient, type Erc721TierableEscrowClient } from "./escrow/tierable";
export { makeErc721PaymentClient, type Erc721PaymentClient } from "./payment";
export { makeErc721UtilClient, type Erc721UtilClient } from "./util";

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

export const makeErc721Client = (
  viemClient: ViemClient,
  addresses: Erc721Addresses,
): Erc721Client => {
  return {
    util: makeErc721UtilClient(viemClient, addresses),
    escrow: makeErc721EscrowClient(viemClient, addresses),
    payment: makeErc721PaymentClient(viemClient, addresses),
    barter: makeErc721BarterUtilsClient(viemClient, addresses),
  };
};
