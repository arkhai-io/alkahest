import { decodeAbiParameters, encodeAbiParameters, getAbiItem, hexToNumber, parseAbiParameter, slice } from "viem";
import { abi as erc20BarterUtilsAbi } from "../contracts/ERC20BarterCrossToken";
import { abi as erc20EscrowAbi } from "../contracts/ERC20EscrowObligation";
import { abi as erc20PaymentAbi } from "../contracts/ERC20PaymentObligation";
import { abi as erc20Abi } from "../contracts/ERC20Permit";
import { abi as erc721EscrowAbi } from "../contracts/ERC721EscrowObligation";
import { abi as easAbi } from "../contracts/IEAS";
import { abi as tokenBundleEscrowAbi } from "../contracts/TokenBundleEscrowObligation";
import { abi as tokenBundlePaymentAbi } from "../contracts/TokenBundlePaymentObligation";
import type {
  ApprovalPurpose,
  ChainAddresses,
  Demand,
  Eip2612Props,
  Erc20,
  Erc721,
  Erc1155,
  TokenBundle,
} from "../types";
import { flattenTokenBundle, getAttestation, getAttestedEventFromTxHash, type ViemClient } from "../utils";

// Extract ObligationData struct ABIs from contract ABIs at module initialization
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
const tokenBundleEscrowDecodeFunction = getAbiItem({
  abi: tokenBundleEscrowAbi.abi,
  name: "decodeObligationData",
});
const tokenBundlePaymentDecodeFunction = getAbiItem({
  abi: tokenBundlePaymentAbi.abi,
  name: "decodeObligationData",
});

// Extract the ObligationData struct types from the function inputs
const erc20EscrowObligationDataType = erc20EscrowDoObligationFunction.inputs[0];
const erc20PaymentObligationDataType = erc20PaymentDoObligationFunction.inputs[0];
const erc721EscrowObligationDataType = erc721EscrowDoObligationFunction.inputs[0];
const tokenBundleEscrowObligationDataType = tokenBundleEscrowDecodeFunction.outputs[0];
const tokenBundlePaymentObligationDataType = tokenBundlePaymentDecodeFunction.outputs[0];

export const makeErc20Client = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const getEscrowSchema = async () =>
    await viemClient.readContract({
      address: addresses.erc20EscrowObligation,
      abi: erc20EscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  const getPaymentSchema = async () =>
    await viemClient.readContract({
      address: addresses.erc20PaymentObligation,
      abi: erc20PaymentAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  /**
   * Signs an EIP-2612 permit for token approval
   * @param props - Permit properties including token details and approval parameters
   * @returns Signature components (r, s, v)
   * @internal
   */
  const signPermit = async (props: Eip2612Props) => {
    const types = {
      Permit: parseAbiParameter("(address owner, address spender, uint256 value, uint256 nonce, uint256 deadline)")
        .components,
    };
    const domainData = {
      name: props.erc20Name,
      /** We assume 1 if permit version is not specified */
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

    return { r, s, v: hexToNumber(v) };
  };

  /**
   * Encodes ERC20EscrowObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodeEscrowObligationRaw = (data: {
    arbiter: `0x${string}`;
    demand: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
  }) => {
    return encodeAbiParameters([erc20EscrowObligationDataType], [data]);
  };

  /**
   * Encodes ERC20PaymentObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodePaymentObligationRaw = (data: { token: `0x${string}`; amount: bigint; payee: `0x${string}` }) => {
    return encodeAbiParameters([erc20PaymentObligationDataType], [data]);
  };

  return {
    encodeEscrowObligationRaw,
    encodePaymentObligationRaw,
    /**
     * Encodes ERC20EscrowObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC20 token details
     * @param demand - Custom demand details
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrowObligation: (token: Erc20, demand: Demand) => {
      return encodeEscrowObligationRaw({
        arbiter: demand.arbiter,
        demand: demand.demand,
        token: token.address,
        amount: token.value,
      });
    },

    /**
     * Encodes ERC20PaymentObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC20 token details
     * @param payee - Address to receive the payment
     * @returns the abi encoded ObligationData as bytes
     */
    encodePaymentObligation: (token: Erc20, payee: `0x${string}`) => {
      return encodePaymentObligationRaw({
        token: token.address,
        amount: token.value,
        payee,
      });
    },
    /**
     * Decodes ERC20EscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrowObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc20EscrowObligationDataType], obligationData)[0];
    },
    /**
     * Decodes ERC20PaymentObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodePaymentObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc20PaymentObligationDataType], obligationData)[0];
    },
    getEscrowSchema,
    getPaymentSchema,
    /**
     * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded obligation data
     * @param uid - UID of the attestation
     * @returns The complete obligation including attestation metadata and decoded obligation data
     */
    getEscrowObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getEscrowSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc20EscrowObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },
    getPaymentObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getPaymentSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc20PaymentObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },
    /**
     * Approves the spender to use tokens
     * @param token - Token details including address and amount
     * @param spender - Address to approve
     * @returns Transaction hash
     */
    approve: async (token: Erc20, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc20EscrowObligation : addresses.erc20PaymentObligation;

      const hash = await viemClient.writeContract({
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [to, token.value],
      });
      return hash;
    },

    /**
     * Approves spender if current allowance is less than required amount
     * @param token - Token details including address and amount
     * @param spender - Address to approve
     * @returns Transaction hash or null if approval not needed
     */
    approveIfLess: async (token: Erc20, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc721EscrowObligation : addresses.erc721PaymentObligation;

      const currentAllowance = await viemClient.readContract({
        address: token.address,
        abi: erc20Abi.abi,
        functionName: "allowance",
        args: [viemClient.account.address, to],
      });

      if (currentAllowance < token.value) {
        return viemClient.writeContract({
          address: token.address,
          abi: erc20Abi.abi,
          functionName: "approve",
          args: [to, token.value],
        });
      }
      return null;
    },

    /**
     * Collects payment from an escrow after fulfillment
     * @param buyAttestation - UID of the buy attestation
     * @param fulfillment - UID of the fulfillment attestation
     * @returns Transaction hash
     */
    collectEscrow: async (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => {
      let hash: `0x${string}`;
      try {
        const { request } = await viemClient.simulateContract({
          address: addresses.erc20EscrowObligation,
          abi: erc20EscrowAbi.abi,
          functionName: "collectEscrow",
          args: [buyAttestation, fulfillment],
        });
        hash = await viemClient.writeContract(request);
      } catch (error) {
        throw new Error(`Failed to collect payment for ${buyAttestation} with fulfillment ${fulfillment}: ${error}`);
      }
      return hash;
    },

    /**
     * Collects expired escrow funds
     * @param buyAttestation - UID of the expired buy attestation
     * @returns Transaction hash
     */
    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },

    /**
     * Creates an escrow with ERC20 tokens for a custom demand
     * @param price - ERC20 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyWithErc20(
     *   { address: usdc, value: 10n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    buyWithErc20: async (price: Erc20, item: Demand, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20EscrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
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

    /**
     * Creates an escrow with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.permitAndBuyWithErc20(
     *   { address: usdc, value: 10n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    permitAndBuyWithErc20: async (price: Erc20, item: Demand, expiration: bigint) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: price.value,
        nonce: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: price.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyWithErc20",
        args: [
          price.address,
          price.value,
          item.arbiter,
          item.demand,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.payWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    payWithErc20: async (price: Erc20, payee: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20PaymentObligation,
        abi: erc20PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            payee,
          },
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.permitAndPayWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    permitAndPayWithErc20: async (price: Erc20, payee: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20PaymentObligation,
        value: price.value,
        nonce: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: price.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: price.address,
        chainId: viemClient.chain.id,
      });
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayWithErc20",
        args: [price.address, price.value, payee, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC20 tokens
     * @param bid - ERC20 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc20ForErc20(
     *   { address: usdc, value: 10n },
     *   { address: eurc, value: 10n },
     *   0n,
     * );
     * ```
     */
    buyErc20ForErc20: async (bid: Erc20, ask: Erc20, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc20ForErc20",
        args: [bid.address, bid.value, ask.address, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC20 tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.permitAndBuyErc20ForErc20(
     *   { address: usdc, value: 10n },
     *   { address: eurc, value: 10n },
     *   0n,
     * );
     * ```
     */
    permitAndBuyErc20ForErc20: async (bid: Erc20, ask: Erc20, expiration: bigint) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc20ForErc20",
        args: [bid.address, bid.value, ask.address, ask.value, expiration, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC20 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.payErc20ForErc20(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates a direct payment obligation with ERC20 tokens using EIP-2612 permit
     * @param price - ERC20 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc20.permitAndPayWithErc20(
     *   { address: usdc, value: 10n },
     *   receiverAddress,
     * );
     * ```
     */
    permitAndPayErc20ForErc20: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;

      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [erc20EscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];

      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20PaymentObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc20",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for an ERC721 token
     * @param bid - ERC20 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc721WithErc20(
     *   { address: usdc, value: 10n },
     *   { address: nft, id: 1n },
     *   0n,
     * );
     * ```
     */
    buyErc721WithErc20: async (bid: Erc20, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc721WithErc20",
        args: [bid.address, bid.value, ask.address, ask.id, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for an ERC721 token using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndBuyErc721WithErc20: async (bid: Erc20, ask: Erc721, expiration: bigint) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc721WithErc20",
        args: [bid.address, bid.value, ask.address, ask.id, expiration, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC721 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc721",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC721 trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForErc721: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [erc721EscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc721",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC1155 tokens
     * @param bid - ERC20 token offered
     * @param ask - ERC1155 token requested including token ID and amount
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyErc1155WithErc20(
     *   { address: usdc, value: 10n },
     *   { address: token, id: 1n, value: 5n },
     *   0n,
     * );
     * ```
     */
    buyErc1155WithErc20: async (bid: Erc20, ask: Erc1155, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyErc1155WithErc20",
        args: [bid.address, bid.value, ask.address, ask.id, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for ERC1155 tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param ask - ERC1155 token requested including token ID and amount
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndBuyErc1155WithErc20: async (bid: Erc20, ask: Erc1155, expiration: bigint) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyErc1155WithErc20",
        args: [
          bid.address,
          bid.value,
          ask.address,
          ask.id,
          ask.value,
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC1155 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForErc1155",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-ERC1155 trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForErc1155: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { name: "token", type: "address" },
              { name: "tokenId", type: "uint256" },
              { name: "amount", type: "uint256" },
              { name: "arbiter", type: "address" },
              { name: "demand", type: "bytes" },
            ],
          },
        ],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForErc1155",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for a bundle of tokens
     * @param bid - ERC20 token offered
     * @param bundle - Bundle of tokens requested (ERC20, ERC721, ERC1155)
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc20.buyBundleWithErc20(
     *   { address: usdc, value: 10n },
     *   {
     *     erc20: [{ address: dai, value: 5n }],
     *     erc721: [{ address: nft, id: 1n }],
     *     erc1155: [{ address: token, id: 1n, value: 3n }],
     *   },
     *   receiverAddress,
     *   0n,
     * );
     * ```
     */
    buyBundleWithErc20: async (bid: Erc20, bundle: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "buyBundleWithErc20",
        args: [bid.address, bid.value, { ...flattenTokenBundle(bundle), payee }, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC20 tokens for a bundle of tokens using EIP-2612 permit
     * @param bid - ERC20 token offered
     * @param bundle - Bundle of tokens requested (ERC20, ERC721, ERC1155)
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     */
    permitAndBuyBundleWithErc20: async (bid: Erc20, bundle: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: bid.value,
        nonce: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: bid.address,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: bid.address,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndBuyBundleWithErc20",
        args: [
          bid.address,
          bid.value,
          { ...flattenTokenBundle(bundle), payee },
          expiration,
          deadline,
          permit.v,
          permit.r,
          permit.s,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-bundle trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    payErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "payErc20ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC20-bundle trade using EIP-2612 permit
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     */
    permitAndPayErc20ForBundle: async (buyAttestation: `0x${string}`) => {
      const deadline = BigInt(Math.floor(Date.now() / 1000)) + 3600n;
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });
      const buyAttestationObligationData = decodeAbiParameters(
        [tokenBundleEscrowObligationDataType],
        buyAttestationData.data,
      )[0];
      const demandData = decodeAbiParameters([erc20PaymentObligationDataType], buyAttestationObligationData.demand)[0];
      const permit = await signPermit({
        ownerAddress: viemClient.account.address,
        spenderAddress: addresses.erc20EscrowObligation,
        value: demandData.amount,
        nonce: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "nonces",
          args: [viemClient.account.address],
        }),
        deadline,
        erc20Name: await viemClient.readContract({
          address: demandData.token,
          abi: erc20Abi.abi,
          functionName: "name",
        }),
        contractAddress: demandData.token,
        chainId: viemClient.chain.id,
      });

      const hash = await viemClient.writeContract({
        address: addresses.erc20BarterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayErc20ForBundle",
        args: [buyAttestation, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // ============ Native Token Functions ============

    /**
     * Buy ERC20 tokens with native tokens (ETH)
     * @param bidAmount - Amount of native tokens to pay 
     * @param ask - ERC20 token details to purchase
     * @param expiration - Expiration timestamp for the offer
     * @returns Transaction hash and attestation UID
     */
    buyErc20WithNative: async (
      bidAmount: bigint,
      ask: Erc20,
      expiration: bigint
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc20WithEth",
        args: [bidAmount, ask.address, ask.value, expiration],
        value: bidAmount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Pay native tokens to fulfill an ERC20 escrow (someone escrowed ERC20, you pay native tokens to claim it)
     * @param buyAttestation - The ERC20 escrow attestation UID to fulfill
     * @returns Transaction hash and attestation UID
     */
    payNativeForErc20: async (buyAttestation: `0x${string}`) => {
      // Get the buy attestation to determine the amount needed
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });

      // Decode the ERC20 escrow data to get the native token payment demand
      const escrowData = decodeAbiParameters(
        [erc20EscrowObligationDataType],
        buyAttestationData.data
      )[0];

      // Decode the native token payment demand from the escrow
      const demandData = decodeAbiParameters(
        [{ type: "tuple", components: [
          { type: "uint256", name: "amount" },
          { type: "address", name: "payee" }
        ]}],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForErc20",
        args: [buyAttestation],
        value: demandData.amount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
