import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type Erc721EscrowClient, makeErc721EscrowClient } from "./escrow";
import { type Erc721PaymentClient, makeErc721PaymentClient } from "./payment";
import { type Erc721UtilClient, makeErc721UtilClient } from "./util";

export { type Erc721EscrowClient, makeErc721EscrowClient } from "./escrow";
export { type Erc721DefaultEscrowClient, makeErc721DefaultEscrowClient } from "./escrow/default";
export { type Erc721UnconditionalEscrowClient, makeErc721UnconditionalEscrowClient } from "./escrow/unconditional";
export { type Erc721PaymentClient, makeErc721PaymentClient } from "./payment";
export { type Erc721UtilClient, makeErc721UtilClient } from "./util";

export type Erc721Addresses = {
  eas: `0x${string}`;
  atomicPaymentUtils: `0x${string}`;
  nativeTokenAtomicPaymentUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationUnconditional: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickErc721Addresses = (addresses: ChainAddresses): Erc721Addresses => ({
  eas: addresses.eas,
  atomicPaymentUtils: addresses.erc721AtomicPaymentUtils,
  nativeTokenAtomicPaymentUtils: addresses.nativeTokenAtomicPaymentUtils,
  escrowObligation: addresses.erc721EscrowObligation,
  escrowObligationUnconditional: addresses.erc721UnconditionalEscrowObligation,
  paymentObligation: addresses.erc721PaymentObligation,
});

export type Erc721Client = {
  util: Erc721UtilClient;
  escrow: Erc721EscrowClient;
  payment: Erc721PaymentClient;
};

export const makeErc721Client = (viemClient: ViemClient, addresses: Erc721Addresses): Erc721Client => {
  return {
    util: makeErc721UtilClient(viemClient, addresses),
    escrow: makeErc721EscrowClient(viemClient, addresses),
    payment: makeErc721PaymentClient(viemClient, addresses),
  };
};
