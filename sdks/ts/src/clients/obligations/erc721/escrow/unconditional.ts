import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc721EscrowAbi } from "../../../../contracts/obligations/escrow/unconditional/UnconditionalERC721EscrowObligation";
import type { Demand, Erc721 } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../../utils";
import type { Erc721Addresses } from "../index";
import { makeErc721UtilClient } from "../util";

const erc721EscrowDecodeFunction = getAbiItem({
  abi: erc721EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc721EscrowObligationDataType = erc721EscrowDecodeFunction.outputs[0];

/**
 * ERC721 Unconditional Escrow ObligationData type
 */
export type Erc721UnconditionalEscrowObligationData = {
  token: `0x${string}`;
  tokenId: bigint;
  arbiter: `0x${string}`;
  demand: `0x${string}`;
};

/**
 * Encodes ERC721UnconditionalEscrowObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address token, uint256 tokenId, address arbiter, bytes demand}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: Erc721UnconditionalEscrowObligationData): `0x${string}` => {
  return encodeAbiParameters([erc721EscrowObligationDataType], [data]);
};

/**
 * Decodes ERC721UnconditionalEscrowObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): Erc721UnconditionalEscrowObligationData => {
  return decodeAbiParameters([erc721EscrowObligationDataType], obligationData)[0] as Erc721UnconditionalEscrowObligationData;
};

export type Erc721UnconditionalEscrowClient = ReturnType<typeof makeErc721UnconditionalEscrowClient>;

export const makeErc721UnconditionalEscrowClient = (viemClient: ViemClient, addresses: Erc721Addresses) => {
  const util = makeErc721UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligationUnconditional,
      abi: erc721EscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligationUnconditional,
    getSchema,

    encodeObligationRaw: (data: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
      token: `0x${string}`;
      tokenId: bigint;
    }) => {
      return encodeAbiParameters([erc721EscrowObligationDataType], [data]);
    },

    encodeObligation: (token: Erc721, demand: Demand) => {
      return encodeAbiParameters(
        [erc721EscrowObligationDataType],
        [
          {
            arbiter: demand.arbiter,
            demand: demand.demand,
            token: token.address,
            tokenId: token.id,
          },
        ],
      );
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc721EscrowObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc721EscrowObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    create: async (price: Erc721, item: Demand, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationUnconditional,
        abi: erc721EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndCreate: async (price: Erc721, item: Demand, expiration: bigint) => {
      await util.approve(price, "escrow");
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationUnconditional,
        abi: erc721EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
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
        address: addresses.escrowObligationUnconditional,
        abi: erc721EscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationUnconditional,
        abi: erc721EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
