import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as erc20EscrowAbi } from "../../../contracts/obligations/escrow/default/ERC20EscrowObligation";
import { abi as erc721EscrowAbi } from "../../../contracts/obligations/escrow/default/ERC721EscrowObligation";
import { abi as erc1155EscrowAbi } from "../../../contracts/obligations/escrow/default/ERC1155EscrowObligation";
import { abi as tokenBundleEscrowAbi } from "../../../contracts/obligations/escrow/default/TokenBundleEscrowObligation";
import { abi as nativeTokenEscrowAbi } from "../../../contracts/obligations/escrow/default/NativeTokenEscrowObligation";
import { abi as erc20PaymentAbi } from "../../../contracts/obligations/payment/ERC20PaymentObligation";
import { abi as erc20BarterUtilsAbi } from "../../../contracts/utils/ERC20BarterUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc20Addresses } from "./index";
import { makeErc20UtilClient } from "./util";

const erc20EscrowDoObligationFunction = getAbiItem({
  abi: erc20EscrowAbi.abi,
  name: "doObligation",
});
const erc20PaymentDoObligationFunction = getAbiItem({
  abi: erc20PaymentAbi.abi,
  name: "doObligation",
});
const erc721EscrowDoObligationFunction = getAbiItem({
  abi: erc721EscrowAbi.abi,
  name: "doObligation",
});
const erc1155EscrowDecodeFunction = getAbiItem({
  abi: erc1155EscrowAbi.abi,
  name: "decodeObligationData",
});
const tokenBundleEscrowDecodeFunction = getAbiItem({
  abi: tokenBundleEscrowAbi.abi,
  name: "decodeObligationData",
});
const nativeTokenEscrowDecodeFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "decodeObligationData",
});

const erc20EscrowObligationDataType = erc20EscrowDoObligationFunction.inputs[0];
const erc20PaymentObligationDataType = erc20PaymentDoObligationFunction.inputs[0];
const erc721EscrowObligationDataType = erc721EscrowDoObligationFunction.inputs[0];
const erc1155EscrowObligationDataType = erc1155EscrowDecodeFunction.outputs[0];
const tokenBundleEscrowObligationDataType = tokenBundleEscrowDecodeFunction.outputs[0];
const nativeTokenEscrowObligationDataType = nativeTokenEscrowDecodeFunction.outputs[0];

export type Erc20BarterUtilsClient = ReturnType<typeof makeErc20BarterUtilsClient>;

export const makeErc20BarterUtilsClient = (viemClient: ViemClient, addresses: Erc20Addresses) => {
  const util = makeErc20UtilClient(viemClient, addresses);

  return {
    address: addresses.barterUtils,

    // =========================================================================
    // ERC20 for ERC20
    // =========================================================================

    payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const deadline = util.getPermitDeadline();

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [erc20EscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demandData.token, value: demandData.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc20",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC20 for ERC721
    // =========================================================================

    payErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc721",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const deadline = util.getPermitDeadline();

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [erc721EscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demandData.token, value: demandData.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc721",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC20 for ERC1155
    // =========================================================================

    payErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc1155",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const deadline = util.getPermitDeadline();

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [erc1155EscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demandData.token, value: demandData.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc1155",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC20 for Token Bundle
    // =========================================================================

    payErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const deadline = util.getPermitDeadline();

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [tokenBundleEscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demandData.token, value: demandData.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForBundle",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC20 for Native Token (ETH)
    // =========================================================================

    payErc20ForNative: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForEth",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20ForNative: async (buyAttestation: `0x${string}`) => {
      const deadline = util.getPermitDeadline();

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [nativeTokenEscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demandData.token, value: demandData.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForEth",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
