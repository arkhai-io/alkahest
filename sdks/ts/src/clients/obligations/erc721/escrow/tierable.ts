import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc721EscrowAbi } from "../../../../contracts/obligations/escrow/tierable/ERC721EscrowObligation";
import type { Demand, Erc721 } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { Erc721Addresses } from "../index";
import { makeErc721UtilClient } from "../util";

const erc721EscrowDecodeFunction = getAbiItem({
  abi: erc721EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc721EscrowObligationDataType = erc721EscrowDecodeFunction.outputs[0];

export type Erc721TierableEscrowClient = ReturnType<typeof makeErc721TierableEscrowClient>;

export const makeErc721TierableEscrowClient = (
  viemClient: ViemClient,
  addresses: Erc721Addresses,
) => {
  const util = makeErc721UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligationTierable,
      abi: erc721EscrowAbi.abi,
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
    }) => {
      return encodeAbiParameters([erc721EscrowObligationDataType], [data]);
    },

    encodeObligation: (token: Erc721, demand: Demand) => {
      return encodeAbiParameters([erc721EscrowObligationDataType], [{
        arbiter: demand.arbiter,
        demand: demand.demand,
        token: token.address,
        tokenId: token.id,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc721EscrowObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

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
        address: addresses.escrowObligationTierable,
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
        address: addresses.escrowObligationTierable,
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
        address: addresses.escrowObligationTierable,
        abi: erc721EscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: erc721EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
