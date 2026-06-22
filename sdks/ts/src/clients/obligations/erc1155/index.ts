import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type Erc1155EscrowClient, makeErc1155EscrowClient } from "./escrow";
import { type Erc1155PaymentClient, makeErc1155PaymentClient } from "./payment";
import { type Erc1155UtilClient, makeErc1155UtilClient } from "./util";

export { type Erc1155EscrowClient, makeErc1155EscrowClient } from "./escrow";
export { type Erc1155DefaultEscrowClient, makeErc1155DefaultEscrowClient } from "./escrow/default";
export { type Erc1155UnconditionalEscrowClient, makeErc1155UnconditionalEscrowClient } from "./escrow/unconditional";
export { type Erc1155PaymentClient, makeErc1155PaymentClient } from "./payment";
export { type Erc1155UtilClient, makeErc1155UtilClient } from "./util";

export type Erc1155Addresses = {
  eas: `0x${string}`;
  atomicPaymentUtils: `0x${string}`;
  nativeTokenAtomicPaymentUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationUnconditional: `0x${string}`;
  paymentObligation: `0x${string}`;
};

export const pickErc1155Addresses = (addresses: ChainAddresses): Erc1155Addresses => ({
  eas: addresses.eas,
  atomicPaymentUtils: addresses.erc1155AtomicPaymentUtils,
  nativeTokenAtomicPaymentUtils: addresses.nativeTokenAtomicPaymentUtils,
  escrowObligation: addresses.erc1155EscrowObligation,
  escrowObligationUnconditional: addresses.erc1155EscrowObligation, // TODO: Add unconditional address when available
  paymentObligation: addresses.erc1155PaymentObligation,
});

export type Erc1155Client = {
  util: Erc1155UtilClient;
  escrow: Erc1155EscrowClient;
  payment: Erc1155PaymentClient;
};

export const makeErc1155Client = (viemClient: ViemClient, addresses: Erc1155Addresses): Erc1155Client => {
  return {
    util: makeErc1155UtilClient(viemClient, addresses),
    escrow: makeErc1155EscrowClient(viemClient, addresses),
    payment: makeErc1155PaymentClient(viemClient, addresses),
  };
};
