import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc1155BarterUtilsAbi } from "../contracts/ERC1155BarterCrossToken";
import { abi as erc1155EscrowAbi } from "../contracts/ERC1155EscrowObligation";
import { abi as erc1155PaymentAbi } from "../contracts/ERC1155PaymentObligation";
import { abi as erc1155Abi } from "../contracts/IERC1155";
import type { ApprovalPurpose, ChainAddresses, Demand, Erc20, Erc721, Erc1155, TokenBundle } from "../types";
import { flattenTokenBundle, getAttestedEventFromTxHash, type ViemClient } from "../utils";

// Extract ABI types at module initialization with fail-fast error handling
const erc1155EscrowDecodeFunction = getAbiItem({
  abi: erc1155EscrowAbi.abi,
  name: "decodeObligationData",
});
const erc1155PaymentDecodeFunction = getAbiItem({
  abi: erc1155PaymentAbi.abi,
  name: "decodeObligationData",
});

// Extract the ObligationData struct types from the function outputs
const erc1155EscrowObligationDataType = erc1155EscrowDecodeFunction.outputs[0];
const erc1155PaymentObligationDataType = erc1155PaymentDecodeFunction.outputs[0];

export const makeErc1155Client = (viemClient: ViemClient, addresses: ChainAddresses) => {
  /**
   * Encodes ERC1155EscrowObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodeEscrowObligationRaw = (data: {
    arbiter: `0x${string}`;
    demand: `0x${string}`;
    token: `0x${string}`;
    tokenId: bigint;
    amount: bigint;
  }) => {
    return encodeAbiParameters([erc1155EscrowObligationDataType], [data]);
  };

  /**
   * Encodes ERC1155PaymentObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodePaymentObligationRaw = (data: {
    token: `0x${string}`;
    tokenId: bigint;
    amount: bigint;
    payee: `0x${string}`;
  }) => {
    return encodeAbiParameters([erc1155PaymentObligationDataType], [data]);
  };

  return {
    encodeEscrowObligationRaw,
    encodePaymentObligationRaw,
    /**
     * Encodes ERC1155EscrowObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC1155 token details
     * @param demand - Custom demand details
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrowObligation: (token: Erc1155, demand: Demand) => {
      return encodeEscrowObligationRaw({
        token: token.address,
        tokenId: token.id,
        amount: token.value,
        arbiter: demand.arbiter,
        demand: demand.demand,
      });
    },

    /**
     * Encodes ERC1155PaymentObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC1155 token details
     * @param payee - Address to receive the payment
     * @returns the abi encoded ObligationData as bytes
     */
    encodePaymentObligation: (token: Erc1155, payee: `0x${string}`) => {
      return encodePaymentObligationRaw({
        token: token.address,
        tokenId: token.id,
        amount: token.value,
        payee,
      });
    },

    /**
     * Decodes ERC1155EscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrowObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc1155EscrowObligationDataType], obligationData)[0];
    },
    /**
     * Decodes ERC1155PaymentObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodePaymentObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc1155PaymentObligationDataType], obligationData)[0];
    },
    /**
     * Approves all tokens from a contract for trading
     * @param token_contract - Address of the token contract
     * @param purpose - Purpose of approval (escrow or payment)
     * @returns Transaction hash
     */
    approveAll: async (token_contract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc1155EscrowObligation : addresses.erc1155PaymentObligation;

      const hash = await viemClient.writeContract({
        address: token_contract,
        abi: erc1155Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, true],
      });

      return hash;
    },

    /**
     * Revokes approval for all tokens from a contract
     * @param token_contract - Address of the token contract
     * @param purpose - Purpose of approval to revoke (escrow or payment)
     * @returns Transaction hash
     */
    revokeAll: async (token_contract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc1155EscrowObligation : addresses.erc1155PaymentObligation;

      const hash = await viemClient.writeContract({
        address: token_contract,
        abi: erc1155Abi.abi,
        functionName: "setApprovalForAll",
        args: [to, false],
      });

      return hash;
    },

    /**
     * Collects payment from an escrow after fulfillment
     * @param buyAttestation - UID of the buy attestation
     * @param fulfillment - UID of the fulfillment attestation
     * @returns Transaction hash
     */
    collectEscrow: async (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155EscrowObligation,
        abi: erc1155EscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    /**
     * Collects expired escrow funds
     * @param buyAttestation - UID of the expired buy attestation
     * @returns Transaction hash
     */
    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155EscrowObligation,
        abi: erc1155EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },

    /**
     * Creates an escrow with ERC1155 tokens for a custom demand
     * @param price - ERC1155 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc1155.buyWithErc1155(
     *   { address: multiToken, id: 1n, value: 5n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    buyWithErc1155: async (price: Erc1155, item: Demand, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155EscrowObligation,
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

    /**
     * Creates a direct payment obligation with ERC1155 tokens
     * @param price - ERC1155 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc1155.payWithErc1155(
     *   { address: multiToken, id: 1n, value: 5n },
     *   receiverAddress,
     * );
     * ```
     */
    payWithErc1155: async (price: Erc1155, payee: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155PaymentObligation,
        abi: erc1155PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            amount: price.value,
            payee,
          },
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC1155 tokens for ERC1155 tokens
     * @param bid - ERC1155 token offered
     * @param ask - ERC1155 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc1155.buyErc1155ForErc1155(
     *   { address: myMultiToken, id: 1n, value: 5n },
     *   { address: theirMultiToken, id: 2n, value: 10n },
     *   0n,
     * );
     * ```
     */
    buyErc1155ForErc1155: async (bid: Erc1155, ask: Erc1155, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "buyErc1155ForErc1155",
        args: [bid.address, bid.id, bid.value, ask.address, ask.id, ask.value, expiration],
      });
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC1155-ERC1155 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash
     *
     * @example
     * ```ts
     * const payment = await client.erc1155.payErc1155ForErc1155(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc1155ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc1155",
        args: [buyAttestation],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return { hash };
    },

    /**
     * Creates an escrow for trading ERC1155 tokens for ERC20 tokens
     * @param bid - ERC1155 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc1155.buyErc20WithErc1155(
     *   { address: multiToken, id: 1n, value: 5n },
     *   { address: usdc, value: 1000n },
     *   0n,
     * );
     * ```
     */
    buyErc20WithErc1155: async (bid: Erc1155, ask: Erc20, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "buyErc20WithErc1155",
        args: [bid.address, bid.id, bid.value, ask.address, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC1155-ERC20 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc1155.payErc1155ForErc20(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc1155ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC1155 tokens for ERC721 tokens
     * @param bid - ERC1155 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc1155.buyErc721WithErc1155(
     */
    buyErc721WithErc1155: async (bid: Erc1155, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "buyErc721WithErc1155",
        args: [bid.address, bid.id, bid.value, ask.address, ask.id, expiration],
      });
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC721-ERC1155 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc1155.payErc1155ForErc721(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc1155ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc721",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC1155 tokens for a bundle of tokens
     * @param bid - ERC1155 token offered
     * @param ask - Bundle of tokens requested
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc1155.buyBundleWithErc1155(
     *   { address: multiToken, id: 1n, value: 5n },
     *   tokenBundle,
     *   receiverAddress,
     *   0n,
     * );
     * ```
     */
    buyBundleWithErc1155: async (bid: Erc1155, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "buyBundleWithErc1155",
        args: [bid.address, bid.id, bid.value, { ...flattenTokenBundle(ask), payee }, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC1155-Bundle trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc1155.payErc1155ForBundle(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc1155ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc1155BarterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // ============ Native Token Functions ============

    /**
     * Buy ERC1155 tokens with native tokens (ETH)
     * @param bidAmount - Amount of native tokens to pay
     * @param ask - ERC1155 token details to purchase
     * @param expiration - Expiration timestamp for the offer
     * @returns Transaction hash and attestation UID
     */
    buyErc1155WithNative: async (
      bidAmount: bigint,
      ask: Erc1155,
      expiration: bigint
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc1155WithEth",
        args: [bidAmount, ask.address, ask.id, ask.value, expiration],
        value: bidAmount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Pay native tokens to fulfill an ERC1155 escrow (someone escrowed ERC1155, you pay native tokens to claim it)
     * @param buyAttestation - The ERC1155 escrow attestation UID to fulfill
     * @returns Transaction hash and attestation UID
     */
    payNativeForErc1155: async (buyAttestation: `0x${string}`) => {
      // Get the buy attestation to determine the amount needed
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });

      // Decode the ERC1155 escrow data to get the native token payment demand
      const escrowData = decodeAbiParameters(
        [erc1155EscrowObligationDataType],
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
        functionName: "payEthForErc1155",
        args: [buyAttestation],
        value: demandData.amount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
