import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as erc20PaymentAbi } from "../../../contracts/obligations/payment/ERC20PaymentObligation";
import { abi as atomicPaymentUtilsAbi } from "../../../contracts/utils/AtomicPaymentUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc20Addresses } from "./index";
import { makeErc20UtilClient } from "./util";

const erc20PaymentDoObligationFunction = getAbiItem({
  abi: erc20PaymentAbi.abi,
  name: "doObligation",
});
const erc20PaymentObligationDataType = erc20PaymentDoObligationFunction.inputs[0];

export type Erc20BarterUtilsClient = ReturnType<typeof makeErc20BarterUtilsClient>;

export const makeErc20BarterUtilsClient = (viemClient: ViemClient, addresses: Erc20Addresses) => {
  const util = makeErc20UtilClient(viemClient, addresses);

  const getPaymentDemand = async (escrowUid: `0x${string}`) => {
    const escrow = await viemClient.readContract({
      address: addresses.eas,
      abi: easAbi.abi,
      functionName: "getAttestation",
      args: [escrowUid],
      authorizationList: undefined,
    });

    const [, demand] = await viemClient.readContract({
      address: escrow.attester,
      abi: [
        {
          type: "function",
          name: "decodeCondition",
          inputs: [{ name: "data", type: "bytes" }],
          outputs: [
            { name: "arbiter", type: "address" },
            { name: "demand", type: "bytes" },
          ],
          stateMutability: "pure",
        },
      ],
      functionName: "decodeCondition",
      args: [escrow.data],
      authorizationList: undefined,
    });

    return decodeAbiParameters([erc20PaymentObligationDataType], demand)[0];
  };

  return {
    address: addresses.barterUtils,

    payErc20AndCollect: async (escrowUid: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "payErc20AndCollect",
        args: [escrowUid],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPayErc20AndCollect: async (escrowUid: `0x${string}`) => {
      const deadline = util.getPermitDeadline();
      const demand = await getPaymentDemand(escrowUid);
      const permit = await util.getPermitSignature(
        addresses.barterUtils,
        { address: demand.token, value: demand.amount },
        deadline,
      );

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: atomicPaymentUtilsAbi.abi,
        functionName: "permitAndPayErc20AndCollect",
        args: [escrowUid, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
