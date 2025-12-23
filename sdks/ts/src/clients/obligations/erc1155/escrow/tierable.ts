import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc1155EscrowAbi } from "../../../../contracts/obligations/escrow/tierable/ERC1155EscrowObligation";
import type { Demand, Erc1155 } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { Erc1155Addresses } from "../index";
import { makeErc1155UtilClient } from "../util";

const erc1155EscrowDecodeFunction = getAbiItem({
  abi: erc1155EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc1155EscrowObligationDataType = erc1155EscrowDecodeFunction.outputs[0];

/**
 * ERC1155 Tierable Escrow ObligationData type
 */
export type Erc1155TierableEscrowObligationData = {
  token: `0x${string}`;
  tokenId: bigint;
  amount: bigint;
  arbiter: `0x${string}`;
  demand: `0x${string}`;
};

/**
 * Encodes ERC1155TierableEscrowObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address token, uint256 tokenId, uint256 amount, address arbiter, bytes demand}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: Erc1155TierableEscrowObligationData): `0x${string}` => {
  return encodeAbiParameters([erc1155EscrowObligationDataType], [data]);
};

/**
 * Decodes ERC1155TierableEscrowObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): Erc1155TierableEscrowObligationData => {
  return decodeAbiParameters([erc1155EscrowObligationDataType], obligationData)[0] as Erc1155TierableEscrowObligationData;
};

export type Erc1155TierableEscrowClient = ReturnType<typeof makeErc1155TierableEscrowClient>;

export const makeErc1155TierableEscrowClient = (
  viemClient: ViemClient,
  addresses: Erc1155Addresses,
) => {
  const util = makeErc1155UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligationTierable,
      abi: erc1155EscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligationTierable,
    getSchema,

    encodeObligationRaw: (data: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
      token: `0x${string}`;
      tokenId: bigint;
      amount: bigint;
    }) => {
      return encodeAbiParameters([erc1155EscrowObligationDataType], [data]);
    },

    encodeObligation: (token: Erc1155, demand: Demand) => {
      return encodeAbiParameters([erc1155EscrowObligationDataType], [{
        arbiter: demand.arbiter,
        demand: demand.demand,
        token: token.address,
        tokenId: token.id,
        amount: token.value,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc1155EscrowObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc1155EscrowObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    create: async (price: Erc1155, item: Demand, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: erc1155EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndCreate: async (price: Erc1155, item: Demand, expiration: bigint) => {
      await util.approveAll(price.address, "escrow");
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: erc1155EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    collect: async (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: erc1155EscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: erc1155EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
