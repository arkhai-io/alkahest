import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc721BarterUtilsAbi } from "../contracts/ERC721BarterCrossToken";
import { abi as erc721EscrowAbi } from "../contracts/ERC721EscrowObligation";
import { abi as erc721PaymentAbi } from "../contracts/ERC721PaymentObligation";
import { abi as erc721Abi } from "../contracts/IERC721";
import type { ApprovalPurpose, ChainAddresses, Demand, Erc20, Erc721, Erc1155, TokenBundle } from "../types";
import { flattenTokenBundle, getAttestedEventFromTxHash, type ViemClient } from "../utils";

// Extract ABI types at module initialization with fail-fast error handling
const erc721EscrowDecodeFunction = getAbiItem({
  abi: erc721EscrowAbi.abi,
  name: "decodeObligationData",
});
const erc721PaymentDecodeFunction = getAbiItem({
  abi: erc721PaymentAbi.abi,
  name: "decodeObligationData",
});

// Extract the ObligationData struct types from the function outputs
const erc721EscrowObligationDataType = erc721EscrowDecodeFunction.outputs[0];
const erc721PaymentObligationDataType = erc721PaymentDecodeFunction.outputs[0];

export const makeErc721Client = (viemClient: ViemClient, addresses: ChainAddresses) => {
  /**
   * Encodes ERC721EscrowObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodeEscrowObligationRaw = (data: {
    arbiter: `0x${string}`;
    demand: `0x${string}`;
    token: `0x${string}`;
    tokenId: bigint;
  }) => {
    return encodeAbiParameters([erc721EscrowObligationDataType], [data]);
  };

  /**
   * Encodes ERC721PaymentObligation.ObligationData to bytes using raw parameters.
   * @param data - ObligationData object to encode
   * @returns the abi encoded ObligationData as bytes
   */
  const encodePaymentObligationRaw = (data: { token: `0x${string}`; tokenId: bigint; payee: `0x${string}` }) => {
    return encodeAbiParameters([erc721PaymentObligationDataType], [data]);
  };

  return {
    encodeEscrowObligationRaw,
    encodePaymentObligationRaw,
    /**
     * Encodes ERC721EscrowObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC721 token details
     * @param demand - Custom demand details
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrowObligation: (token: Erc721, demand: Demand) => {
      return encodeEscrowObligationRaw({
        token: token.address,
        tokenId: token.id,
        arbiter: demand.arbiter,
        demand: demand.demand,
      });
    },

    /**
     * Encodes ERC721PaymentObligation.ObligationData to bytes using type-based parameters.
     * @param token - ERC721 token details
     * @param payee - Address to receive the payment
     * @returns the abi encoded ObligationData as bytes
     */
    encodePaymentObligation: (token: Erc721, payee: `0x${string}`) => {
      return encodePaymentObligationRaw({
        token: token.address,
        tokenId: token.id,
        payee,
      });
    },

    /**
     * Decodes ERC721EscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrowObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc721EscrowObligationDataType], obligationData)[0];
    },
    /**
     * Decodes ERC721PaymentObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodePaymentObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc721PaymentObligationDataType], obligationData)[0];
    },
    /**
     * Approves a specific token for trading
     * @param token - Token details including address and id
     * @param purpose - Purpose of approval (escrow or payment)
     * @returns Transaction hash
     */
    approve: async (token: Erc721, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc721EscrowObligation : addresses.erc721PaymentObligation;
      const hash = await viemClient.writeContract({
        address: token.address,
        abi: erc721Abi.abi,
        functionName: "approve",
        args: [to, token.id],
      });

      return hash;
    },

    /**
     * Approves all tokens from a contract for trading
     * @param token_contract - Address of the token contract
     * @param purpose - Purpose of approval (escrow or payment)
     * @returns Transaction hash
     */
    approveAll: async (token_contract: `0x${string}`, purpose: ApprovalPurpose) => {
      const to = purpose === "escrow" ? addresses.erc721EscrowObligation : addresses.erc721PaymentObligation;
      const hash = await viemClient.writeContract({
        address: token_contract,
        abi: erc721Abi.abi,
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
      const to = purpose === "escrow" ? addresses.erc721EscrowObligation : addresses.erc721PaymentObligation;
      const hash = await viemClient.writeContract({
        address: token_contract,
        abi: erc721Abi.abi,
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
        address: addresses.erc721EscrowObligation,
        abi: erc721EscrowAbi.abi,
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
        address: addresses.erc721EscrowObligation,
        abi: erc721EscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },

    /**
     * Creates an escrow with ERC721 tokens for a custom demand
     * @param price - ERC721 token details for payment
     * @param item - Custom demand details including arbiter and demand data
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc721.buyWithErc721(
     *   { address: nft, id: 1n },
     *   { arbiter: arbitratorAddress, demand: encodedDemand },
     *   0n,
     * );
     * ```
     */
    buyWithErc721: async (price: Erc721, item: Demand, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721EscrowObligation,
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

    /**
     * Creates a direct payment obligation with ERC721 tokens
     * @param price - ERC721 token details for payment
     * @param payee - Address to receive the payment
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc721.payWithErc721(
     *   { address: nft, id: 1n },
     *   receiverAddress,
     * );
     * ```
     */
    payWithErc721: async (price: Erc721, payee: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721PaymentObligation,
        abi: erc721PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            payee,
          },
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC721 tokens for ERC721 tokens
     * @param bid - ERC721 token offered
     * @param ask - ERC721 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc721.buyErc721ForErc721(
     *   { address: myNft, id: 1n },
     *   { address: theirNft, id: 2n },
     *   0n,
     * );
     * ```
     */
    buyErc721ForErc721: async (bid: Erc721, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc721ForErc721",
        args: [bid.address, bid.id, ask.address, ask.id, expiration],
      });
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC721-ERC721 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash
     *
     * @example
     * ```ts
     * const payment = await client.erc721.payErc721ForErc721(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc721ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc721",
        args: [buyAttestation],
      });
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      return { hash };
    },

    /**
     * Creates an escrow for trading ERC721 tokens for ERC20 tokens
     * @param bid - ERC721 token offered
     * @param ask - ERC20 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc721.buyErc20WithErc721(
     *   { address: nft, id: 1n },
     *   { address: usdc, value: 1000n },
     *   0n,
     * );
     * ```
     */
    buyErc20WithErc721: async (bid: Erc721, ask: Erc20, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc20WithErc721",
        args: [bid.address, bid.id, ask.address, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC721-ERC20 trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc721.payErc721ForErc20(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc721ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC721 tokens for ERC1155 tokens
     * @param bid - ERC721 token offered
     * @param ask - ERC1155 token requested
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc721.buyErc1155WithErc721(
     *   { address: nft, id: 1n },
     *   { address: multiToken, id: 2n, value: 5n },
     *   0n,
     * );
     * ```
     */
    buyErc1155WithErc721: async (bid: Erc721, ask: Erc1155, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc1155WithErc721",
        args: [bid.address, bid.id, ask.address, ask.id, ask.value, expiration],
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
     * const payment = await client.erc721.payErc721ForErc1155(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc721ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc1155",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an escrow for trading ERC721 tokens for a bundle of tokens
     * @param bid - ERC721 token offered
     * @param ask - Bundle of tokens requested
     * @param payee - Address to receive the payment
     * @param expiration - Escrow expiration time (0 for no expiration)
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const escrow = await client.erc721.buyBundleWithErc721(
     *   { address: nft, id: 1n },
     *   tokenBundle,
     *   receiverAddress,
     *   0n,
     * );
     * ```
     */
    buyBundleWithErc721: async (bid: Erc721, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyBundleWithErc721",
        args: [bid.address, bid.id, { ...flattenTokenBundle(ask), payee }, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Fulfills an ERC721-Bundle trade
     * @param buyAttestation - UID of the buy attestation to fulfill
     * @returns Transaction hash and attestation
     *
     * @example
     * ```ts
     * const payment = await client.erc721.payErc721ForBundle(
     *   escrow.attested.uid,
     * );
     * ```
     */
    payErc721ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.erc721BarterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // ============ Native Token Functions ============

    /**
     * Buy ERC721 NFT with native tokens (ETH)
     * @param bidAmount - Amount of native tokens to pay
     * @param ask - ERC721 token details to purchase
     * @param expiration - Expiration timestamp for the offer
     * @returns Transaction hash and attestation UID
     */
    buyErc721WithNative: async (
      bidAmount: bigint,
      ask: Erc721,
      expiration: bigint
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc721WithEth",
        args: [bidAmount, ask.address, ask.id, expiration],
        value: bidAmount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Pay native tokens to fulfill an ERC721 escrow (someone escrowed ERC721, you pay native tokens to claim it)
     * @param buyAttestation - The ERC721 escrow attestation UID to fulfill
     * @returns Transaction hash and attestation UID
     */
    payNativeForErc721: async (buyAttestation: `0x${string}`) => {
      // Get the buy attestation to determine the amount needed
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
      });

      // Decode the ERC721 escrow data to get the native token payment demand
      const escrowData = decodeAbiParameters(
        [erc721EscrowObligationDataType],
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
        functionName: "payEthForErc721",
        args: [buyAttestation],
        value: demandData.amount,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
