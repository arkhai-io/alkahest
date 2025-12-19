import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc1155EscrowAbi } from "../../../../contracts/obligations/escrow/non-tierable/ERC1155EscrowObligation";
import type { Demand, Erc1155 } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { Erc1155Addresses } from "../index";
import { makeErc1155UtilClient } from "../util";

const erc1155EscrowDecodeFunction = getAbiItem({
  abi: erc1155EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc1155EscrowObligationDataType = erc1155EscrowDecodeFunction.outputs[0];

export type Erc1155NonTierableEscrowClient = ReturnType<typeof makeErc1155NonTierableEscrowClient>;

export const makeErc1155NonTierableEscrowClient = (
  viemClient: ViemClient,
  addresses: Erc1155Addresses,
) => {
  const util = makeErc1155UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligation,
      abi: erc1155EscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligation,
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
        address: addresses.escrowObligation,
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
        address: addresses.escrowObligation,
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
        address: addresses.escrowObligation,
        abi: erc1155EscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: erc1155EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
