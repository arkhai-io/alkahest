import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeErc20BarterUtilsClient, type Erc20BarterUtilsClient } from "./barterUtils";
import { makeErc20EscrowClient, type Erc20EscrowClient } from "./escrow";
import { makeErc20PaymentClient, type Erc20PaymentClient } from "./payment";
import { makeErc20UtilClient, type Erc20UtilClient } from "./util";

export { makeErc20BarterUtilsClient, type Erc20BarterUtilsClient } from "./barterUtils";
export { makeErc20EscrowClient, type Erc20EscrowClient } from "./escrow";
export { makeErc20NonTierableEscrowClient, type Erc20NonTierableEscrowClient } from "./escrow/nonTierable";
export { makeErc20TierableEscrowClient, type Erc20TierableEscrowClient } from "./escrow/tierable";
export { makeErc20PaymentClient, type Erc20PaymentClient } from "./payment";
export { makeErc20UtilClient, type Erc20UtilClient } from "./util";

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

export const makeErc20Client = (
  viemClient: ViemClient,
  addresses: Erc20Addresses,
): Erc20Client => {
  return {
    util: makeErc20UtilClient(viemClient, addresses),
    escrow: makeErc20EscrowClient(viemClient, addresses),
    payment: makeErc20PaymentClient(viemClient, addresses),
    barter: makeErc20BarterUtilsClient(viemClient, addresses),
  };
};
