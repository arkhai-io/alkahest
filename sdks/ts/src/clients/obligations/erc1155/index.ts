import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type Erc1155BarterUtilsClient, makeErc1155BarterUtilsClient } from "./barterUtils";
import { type Erc1155EscrowClient, makeErc1155EscrowClient } from "./escrow";
import { type Erc1155PaymentClient, makeErc1155PaymentClient } from "./payment";
import { type Erc1155UtilClient, makeErc1155UtilClient } from "./util";

export { type Erc1155BarterUtilsClient, makeErc1155BarterUtilsClient } from "./barterUtils";
export { type Erc1155EscrowClient, makeErc1155EscrowClient } from "./escrow";
export { type Erc1155NonTierableEscrowClient, makeErc1155NonTierableEscrowClient } from "./escrow/nonTierable";
export { type Erc1155TierableEscrowClient, makeErc1155TierableEscrowClient } from "./escrow/tierable";
export { type Erc1155PaymentClient, makeErc1155PaymentClient } from "./payment";
export { type Erc1155UtilClient, makeErc1155UtilClient } from "./util";

export type Erc1155Addresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  nativeTokenBarterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationTierable: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickErc1155Addresses = (addresses: ChainAddresses): Erc1155Addresses => ({
  eas: addresses.eas,
  barterUtils: addresses.erc1155BarterUtils,
  nativeTokenBarterUtils: addresses.nativeTokenBarterUtils,
  escrowObligation: addresses.erc1155EscrowObligation,
  escrowObligationTierable: addresses.erc1155EscrowObligation, // TODO: Add tierable address when available
  paymentObligation: addresses.erc1155PaymentObligation,
});

export type Erc1155Client = {
  util: Erc1155UtilClient;
  escrow: Erc1155EscrowClient;
  payment: Erc1155PaymentClient;
  barter: Erc1155BarterUtilsClient;
};

export const makeErc1155Client = (viemClient: ViemClient, addresses: Erc1155Addresses): Erc1155Client => {
  return {
    util: makeErc1155UtilClient(viemClient, addresses),
    escrow: makeErc1155EscrowClient(viemClient, addresses),
    payment: makeErc1155PaymentClient(viemClient, addresses),
    barter: makeErc1155BarterUtilsClient(viemClient, addresses),
  };
};
