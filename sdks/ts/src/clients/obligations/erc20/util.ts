import { hexToNumber, parseAbiParameter, slice } from "viem";
import { abi as erc20Abi } from "../../../contracts/ERC20Permit";
import type { ApprovalPurpose, Eip2612Props, Erc20, PermitSignature } from "../../../types";
import { readContract, writeContract, type ViemClient } from "../../../utils";
import type { Erc20Addresses } from "./index";

export type Erc20UtilClient = ReturnType<typeof makeErc20UtilClient>;

export const makeErc20UtilClient = (
  viemClient: ViemClient,
  addresses: Erc20Addresses,
) => {
  const signPermit = async (props: Eip2612Props): Promise<PermitSignature> => {
    const types = {
      Permit: parseAbiParameter("(address owner, address spender, uint256 value, uint256 nonce, uint256 deadline)")
        .components,
    };
    const domainData = {
      name: props.erc20Name,
      version: props.permitVersion ?? "1",
      chainId: props.chainId,
      verifyingContract: props.contractAddress,
    };

    const message = {
      owner: props.ownerAddress,
      spender: props.spenderAddress,
      value: props.value,
      nonce: props.nonce,
      deadline: props.deadline,
    };

    const signature = await viemClient.account.signTypedData!({
      message,
      domain: domainData,
      primaryType: "Permit",
      types,
    });

    const [r, s, v] = [slice(signature, 0, 32), slice(signature, 32, 64), slice(signature, 64, 65)];

    return { deadline: props.deadline, r, s, v: hexToNumber(v) };
  };

  const getPermitSignature = async (
    spender: `0x${string}`,
    token: Erc20,
    deadline: bigint,
  ): Promise<PermitSignature> => {
    const nonce = await readContract<bigint>(viemClient, {
      address: token.address,
      abi: erc20Abi.abi,
      functionName: "nonces",
      args: [viemClient.account.address],
    });

    const erc20Name = await readContract<string>(viemClient, {
      address: token.address,
      abi: erc20Abi.abi,
      functionName: "name",
    });

    return signPermit({
      ownerAddress: viemClient.account.address,
      spenderAddress: spender,
      value: token.value,
      nonce,
      deadline,
      erc20Name,
      contractAddress: token.address,
      chainId: viemClient.chain.id,
    });
  };

  const getPermitDeadline = (): bigint => {
    return BigInt(Math.floor(Date.now() / 1000)) + 3600n;
  };

  return {
    signPermit,
    getPermitSignature,
    getPermitDeadline,

    approve: async (token: Erc20, purpose: ApprovalPurpose) => {
      const to =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.barterUtils;

      const hash = await writeContract(viemClient, {
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [to, token.value],
      });
      return hash;
    },

    approveIfLess: async (token: Erc20, purpose: ApprovalPurpose) => {
      const to =
        purpose === "escrow"
          ? addresses.escrowObligation
          : purpose === "payment"
            ? addresses.paymentObligation
            : addresses.barterUtils;

      const currentAllowance = await readContract<bigint>(viemClient, {
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "allowance",
        args: [viemClient.account.address, to],
      });

      if (currentAllowance < token.value) {
        return writeContract(viemClient, {
          address: token.address,
          abi: erc20Abi.abi,
          functionName: "approve",
          args: [to, token.value],
        });
      }
      return null;
    },
  };
};
