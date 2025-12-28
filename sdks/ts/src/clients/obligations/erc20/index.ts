import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type Erc20BarterUtilsClient, makeErc20BarterUtilsClient } from "./barterUtils";
import { type Erc20EscrowClient, makeErc20EscrowClient } from "./escrow";
import { type Erc20PaymentClient, makeErc20PaymentClient } from "./payment";
import { type Erc20UtilClient, makeErc20UtilClient } from "./util";

export { type Erc20BarterUtilsClient, makeErc20BarterUtilsClient } from "./barterUtils";
export { type Erc20EscrowClient, makeErc20EscrowClient } from "./escrow";
export { type Erc20NonTierableEscrowClient, makeErc20NonTierableEscrowClient } from "./escrow/nonTierable";
export { type Erc20TierableEscrowClient, makeErc20TierableEscrowClient } from "./escrow/tierable";
export { type Erc20PaymentClient, makeErc20PaymentClient } from "./payment";
export { type Erc20UtilClient, makeErc20UtilClient } from "./util";

export type Erc20Addresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationTierable: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickErc20Addresses = (addresses: ChainAddresses): Erc20Addresses => ({
  eas: addresses.eas,
  barterUtils: addresses.erc20BarterUtils,
  escrowObligation: addresses.erc20EscrowObligation,
  escrowObligationTierable: addresses.erc20EscrowObligation, // TODO: Add tierable address when available
  paymentObligation: addresses.erc20PaymentObligation,
});

export type Erc20Client = {
  util: Erc20UtilClient;
  escrow: Erc20EscrowClient;
  payment: Erc20PaymentClient;
  barter: Erc20BarterUtilsClient;
};

export const makeErc20Client = (viemClient: ViemClient, addresses: Erc20Addresses): Erc20Client => {
  return {
    util: makeErc20UtilClient(viemClient, addresses),
    escrow: makeErc20EscrowClient(viemClient, addresses),
    payment: makeErc20PaymentClient(viemClient, addresses),
    barter: makeErc20BarterUtilsClient(viemClient, addresses),
  };
};
