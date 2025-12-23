import {
  type AbiParameter,
  type Account,
  type Chain,
  type DecodeAbiParametersReturnType,
  decodeAbiParameters,
  type PublicActions,
  parseAbiItem,
  parseAbiParameters,
  parseEventLogs,
  publicActions,
  type Transport,
  type WalletClient,
} from "viem";
import { makeArbitersClient } from "./clients/arbiters";
import { contractAddresses as defaultContractAddresses, supportedChains } from "./config";
import { abi as easAbi } from "./contracts/IEAS";
import { makeDefaultExtension } from "./extensions";
import type { ChainAddresses } from "./types";
import { getAttestation, getOptimalPollingInterval, decodeDemandWithAddresses, type DecodedDemandResult } from "./utils";
import type { Demand } from "./types";

// Forward declarations to avoid circular type inference
type Extended = {
  [key: string]: unknown;
};

type ExtendableClient<T extends object, TExtended extends Extended | undefined = undefined> = T &
  (TExtended extends Extended ? TExtended : object) & {
    extend<U extends Extended>(
      extender: (client: T & (TExtended extends Extended ? TExtended : object)) => U,
    ): ExtendableClient<T, U & (TExtended extends Extended ? TExtended : object)>;
  };

// Base client type (without extensions)
export type MinimalClient = ExtendableClient<{
  viemClient: WalletClient<Transport, Chain, Account> & PublicActions<Transport, Chain, Account>;
  makeExtendableClient: typeof makeExtendableClient;
  address: `0x${string}`;
  contractAddresses: ChainAddresses;
  getAttestation: (uid: `0x${string}`) => ReturnType<typeof getAttestation>;
  getAttestedEventFromTxHash: (hash: `0x${string}`) => Promise<{
    recipient: `0x${string}`;
    attester: `0x${string}`;
    uid: `0x${string}`;
    schemaUID: `0x${string}`;
  }>;
  waitForFulfillment: (
    contractAddress: `0x${string}`,
    buyAttestation: `0x${string}`,
    pollingInterval?: number,
  ) => Promise<{
    payment?: `0x${string}` | undefined;
    fulfillment?: `0x${string}` | undefined;
    fulfiller?: `0x${string}` | undefined;
  }>;
  extractObligationData: <ObligationData extends readonly AbiParameter[]>(
    obligationAbi: ObligationData,
    attestation: { data: `0x${string}` },
  ) => DecodeAbiParametersReturnType<ObligationData>;
  getEscrowAttestation: (fulfillment: { refUID: `0x${string}` }) => ReturnType<typeof getAttestation>;
  extractDemandData: <DemandData extends readonly AbiParameter[]>(
    demandAbi: DemandData,
    escrowAttestation: { data: `0x${string}` },
  ) => DecodeAbiParametersReturnType<DemandData>;
  getEscrowAndDemand: <DemandData extends readonly AbiParameter[]>(
    demandAbi: DemandData,
    fulfillment: { refUID: `0x${string}` },
  ) => Promise<[Awaited<ReturnType<typeof getAttestation>>, DecodeAbiParametersReturnType<DemandData>]>;
  decodeDemand: (demand: Demand) => DecodedDemandResult;
}>;

// Full client type with default extensions
export type AlkahestClient = MinimalClient &
  ReturnType<typeof makeDefaultExtension> & {
    extend: MinimalClient["extend"];
  };

// Helper function to create extendable clients (following viem's pattern)
function makeExtendableClient<T extends object, TExtended extends Extended | undefined = undefined>(
  base: T,
): ExtendableClient<T, TExtended> {
  type ExtendFn = (base: T & (TExtended extends Extended ? TExtended : object)) => Extended;

  function extend(current: typeof base) {
    return (extendFn: ExtendFn) => {
      const extensions = extendFn(current as any) as Extended;
      // Remove any base keys from extensions to avoid conflicts
      for (const key in base) delete extensions[key];
      const combined = { ...current, ...extensions };
      return Object.assign(combined, { extend: extend(combined as any) });
    };
  }

  return Object.assign(base, { extend: extend(base) as any }) as ExtendableClient<T, TExtended>;
}

/**
 * Creates an Alkahest client for interacting with the protocol
 * @param walletClient - Viem wallet client object
 * @param contractAddresses - Optional custom contract addresses (useful for local testing)
 * @returns Client object with methods for interacting with different token standards and attestations
 *
 * @example
 * ```ts
 * const client = makeClient(
 *   privateKeyToAccount(process.env.PRIVKEY as `0x${string}`, {
 *     nonceManager, // automatic nonce management
 *   })
 * );
 * ```
 */
export const makeClient = (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddresses?: Partial<ChainAddresses>,
): AlkahestClient => {
  const client = makeMinimalClient(walletClient, contractAddresses);
  return client.extend(makeDefaultExtension) as AlkahestClient;
};

/**
 * Creates a minimal Alkahest client with only core functionality
 * @param walletClient - Viem wallet client object
 * @param contractAddresses - Optional custom contract addresses (useful for local testing)
 * @returns Minimal client object that can be extended with additional functionality
 *
 * @example
 * ```ts
 * // Create minimal client
 * const baseClient = makeMinimalClient(walletClient);
 *
 * // Extend with default functionality
 * const fullClient = baseClient.extend(makeDefaultExtension);
 *
 * // Or extend with custom functionality
 * const customClient = baseClient.extend((client) => ({
 *   erc20: makeErc20Client(client.viemClient, client.contractAddresses),
 *   customMethod: () => "custom functionality"
 * }));
 * ```
 */

export const makeMinimalClient = (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddresses?: Partial<ChainAddresses>,
): MinimalClient => {
  const viemClient = walletClient.extend(publicActions);

  // Determine base addresses to use
  let baseAddresses: ChainAddresses | undefined;
  if (supportedChains.includes(viemClient.chain.name)) {
    baseAddresses = defaultContractAddresses[viemClient.chain.name as keyof typeof defaultContractAddresses];
  }

  if (!baseAddresses && !contractAddresses) {
    throw new Error(
      `Chain "${viemClient.chain.name}" is not supported and no custom contract addresses were provided.`,
    );
  }

  // Create a full ChainAddresses object with zero address fallbacks
  const zeroAddress = "0x0000000000000000000000000000000000000000" as const;
  const addresses: ChainAddresses = {
    eas: contractAddresses?.eas || baseAddresses?.eas || zeroAddress,
    easSchemaRegistry: contractAddresses?.easSchemaRegistry || baseAddresses?.easSchemaRegistry || zeroAddress,

    erc20EscrowObligation:
      contractAddresses?.erc20EscrowObligation || baseAddresses?.erc20EscrowObligation || zeroAddress,
    erc20PaymentObligation:
      contractAddresses?.erc20PaymentObligation || baseAddresses?.erc20PaymentObligation || zeroAddress,
    erc20BarterUtils: contractAddresses?.erc20BarterUtils || baseAddresses?.erc20BarterUtils || zeroAddress,

    erc721EscrowObligation:
      contractAddresses?.erc721EscrowObligation || baseAddresses?.erc721EscrowObligation || zeroAddress,
    erc721PaymentObligation:
      contractAddresses?.erc721PaymentObligation || baseAddresses?.erc721PaymentObligation || zeroAddress,
    erc721BarterUtils: contractAddresses?.erc721BarterUtils || baseAddresses?.erc721BarterUtils || zeroAddress,

    erc1155EscrowObligation:
      contractAddresses?.erc1155EscrowObligation || baseAddresses?.erc1155EscrowObligation || zeroAddress,
    erc1155PaymentObligation:
      contractAddresses?.erc1155PaymentObligation || baseAddresses?.erc1155PaymentObligation || zeroAddress,
    erc1155BarterUtils: contractAddresses?.erc1155BarterUtils || baseAddresses?.erc1155BarterUtils || zeroAddress,

    tokenBundleEscrowObligation:
      contractAddresses?.tokenBundleEscrowObligation || baseAddresses?.tokenBundleEscrowObligation || zeroAddress,
    tokenBundlePaymentObligation:
      contractAddresses?.tokenBundlePaymentObligation || baseAddresses?.tokenBundlePaymentObligation || zeroAddress,
    tokenBundleBarterUtils:
      contractAddresses?.tokenBundleBarterUtils || baseAddresses?.tokenBundleBarterUtils || zeroAddress,

    attestationEscrowObligation:
      contractAddresses?.attestationEscrowObligation || baseAddresses?.attestationEscrowObligation || zeroAddress,
    attestationEscrowObligation2:
      contractAddresses?.attestationEscrowObligation2 || baseAddresses?.attestationEscrowObligation2 || zeroAddress,
    attestationBarterUtils:
      contractAddresses?.attestationBarterUtils || baseAddresses?.attestationBarterUtils || zeroAddress,

    stringObligation: contractAddresses?.stringObligation || baseAddresses?.stringObligation || zeroAddress,

    nativeTokenPaymentObligation:
      contractAddresses?.nativeTokenPaymentObligation || baseAddresses?.nativeTokenPaymentObligation || zeroAddress,
    nativeTokenEscrowObligation:
      contractAddresses?.nativeTokenEscrowObligation || baseAddresses?.nativeTokenEscrowObligation || zeroAddress,

    trivialArbiter: contractAddresses?.trivialArbiter || baseAddresses?.trivialArbiter || zeroAddress,
    trustedOracleArbiter: contractAddresses?.trustedOracleArbiter || baseAddresses?.trustedOracleArbiter || zeroAddress,
    intrinsicsArbiter: contractAddresses?.intrinsicsArbiter || baseAddresses?.intrinsicsArbiter || zeroAddress,
    intrinsicsArbiter2: contractAddresses?.intrinsicsArbiter2 || baseAddresses?.intrinsicsArbiter2 || zeroAddress,
    anyArbiter: contractAddresses?.anyArbiter || baseAddresses?.anyArbiter || zeroAddress,
    allArbiter: contractAddresses?.allArbiter || baseAddresses?.allArbiter || zeroAddress,
    nativeTokenBarterUtils:
      contractAddresses?.nativeTokenBarterUtils || baseAddresses?.nativeTokenBarterUtils || zeroAddress,

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter:
      contractAddresses?.exclusiveRevocableConfirmationArbiter ||
      baseAddresses?.exclusiveRevocableConfirmationArbiter ||
      zeroAddress,
    exclusiveUnrevocableConfirmationArbiter:
      contractAddresses?.exclusiveUnrevocableConfirmationArbiter ||
      baseAddresses?.exclusiveUnrevocableConfirmationArbiter ||
      zeroAddress,
    nonexclusiveRevocableConfirmationArbiter:
      contractAddresses?.nonexclusiveRevocableConfirmationArbiter ||
      baseAddresses?.nonexclusiveRevocableConfirmationArbiter ||
      zeroAddress,
    nonexclusiveUnrevocableConfirmationArbiter:
      contractAddresses?.nonexclusiveUnrevocableConfirmationArbiter ||
      baseAddresses?.nonexclusiveUnrevocableConfirmationArbiter ||
      zeroAddress,

    // Attestation Properties Arbiters
    recipientArbiter: contractAddresses?.recipientArbiter || baseAddresses?.recipientArbiter || zeroAddress,
    attesterArbiter: contractAddresses?.attesterArbiter || baseAddresses?.attesterArbiter || zeroAddress,
    schemaArbiter: contractAddresses?.schemaArbiter || baseAddresses?.schemaArbiter || zeroAddress,
    uidArbiter: contractAddresses?.uidArbiter || baseAddresses?.uidArbiter || zeroAddress,
    refUidArbiter: contractAddresses?.refUidArbiter || baseAddresses?.refUidArbiter || zeroAddress,
    revocableArbiter: contractAddresses?.revocableArbiter || baseAddresses?.revocableArbiter || zeroAddress,
    timeAfterArbiter: contractAddresses?.timeAfterArbiter || baseAddresses?.timeAfterArbiter || zeroAddress,
    timeBeforeArbiter: contractAddresses?.timeBeforeArbiter || baseAddresses?.timeBeforeArbiter || zeroAddress,
    timeEqualArbiter: contractAddresses?.timeEqualArbiter || baseAddresses?.timeEqualArbiter || zeroAddress,
    expirationTimeAfterArbiter:
      contractAddresses?.expirationTimeAfterArbiter || baseAddresses?.expirationTimeAfterArbiter || zeroAddress,
    expirationTimeBeforeArbiter:
      contractAddresses?.expirationTimeBeforeArbiter || baseAddresses?.expirationTimeBeforeArbiter || zeroAddress,
    expirationTimeEqualArbiter:
      contractAddresses?.expirationTimeEqualArbiter || baseAddresses?.expirationTimeEqualArbiter || zeroAddress,
  };

  const client = {
    /** The underlying Viem client */
    viemClient,

    makeExtendableClient,

    /** Address of the account used to create this client */
    address: viemClient.account.address,

    /** Contract addresses being used */
    contractAddresses: addresses,

    /**
     * Retrieves an attestation by its UID
     * @param uid - The unique identifier of the attestation
     * @returns The attestation data
     */
    getAttestation: async (uid: `0x${string}`) => {
      return await getAttestation(viemClient, uid, addresses);
    },

    /**
     * Gets an attestation from a transaction hash
     * @param hash - The transaction hash
     * @returns The attestation event args
     */
    getAttestedEventFromTxHash: async (hash: `0x${string}`) => {
      const tx = await viemClient.waitForTransactionReceipt({ hash });
      const events = parseEventLogs({
        abi: easAbi.abi,
        eventName: "Attested",
        logs: tx.logs,
      });
      if (!events[0]) throw new Error("No Attested event found in transaction");
      return events[0].args;
    },

    /**
     * Waits for an escrow to be fulfilled
     * @param contractAddress - The address of the escrow contract
     * @param buyAttestation - The UID of the buy attestation
     * @returns Object containing payment, fulfillment and fulfiller details
     *
     * @example
     * ```ts
     * // Wait for fulfillment of an escrow
     * const fulfillment = await client.waitForFulfillment(
     *   contractAddresses.erc20EscrowObligation,
     *   escrow.attested.uid,
     * );
     * ```
     */
    waitForFulfillment: async (
      contractAddress: `0x${string}`,
      buyAttestation: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      payment?: `0x${string}` | undefined;
      fulfillment?: `0x${string}` | undefined;
      fulfiller?: `0x${string}` | undefined;
    }> => {
      const fulfillmentEvent = parseAbiItem(
        "event EscrowCollected(bytes32 indexed escrow, bytes32 indexed fulfillment, address indexed fulfiller)",
      );
      const logs = await viemClient.getLogs({
        address: contractAddress,
        event: fulfillmentEvent,
        args: { escrow: buyAttestation },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length && logs[0])
        return {
          payment: logs[0].args.escrow,
          fulfillment: logs[0].args.fulfillment,
          fulfiller: logs[0].args.fulfiller,
        };

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval);

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: contractAddress,
          event: fulfillmentEvent,
          args: { escrow: buyAttestation },
          onLogs: (logs) => {
            if (!logs[0]) return;
            resolve({
              payment: logs[0].args.escrow,
              fulfillment: logs[0].args.fulfillment,
              fulfiller: logs[0].args.fulfiller,
            });
            unwatch();
          },
          pollingInterval: optimalInterval,
        });
      });
    },

    /**
     * Extract obligation data from a fulfillment attestation
     * @param obligationAbi - ABI parameters for the obligation data
     * @param attestation - The attestation containing the obligation data
     * @returns Decoded obligation data
     *
     * @example
     * ```ts
     * import { parseAbiParameters } from "viem";
     *
     * const obligationAbi = parseAbiParameters("(string item)");
     * const obligation = client.extractObligationData(obligationAbi, attestation);
     * ```
     */
    extractObligationData: <ObligationData extends readonly AbiParameter[]>(
      obligationAbi: ObligationData,
      attestation: { data: `0x${string}` },
    ): DecodeAbiParametersReturnType<ObligationData> => {
      return decodeAbiParameters(obligationAbi, attestation.data);
    },

    /**
     * Get the escrow attestation that this fulfillment references via refUID
     * @param fulfillment - The fulfillment attestation
     * @returns The escrow attestation
     *
     * @example
     * ```ts
     * const escrowAttestation = await client.getEscrowAttestation(fulfillmentAttestation);
     * ```
     */
    getEscrowAttestation: async (fulfillment: { refUID: `0x${string}` }) => {
      return await getAttestation(viemClient, fulfillment.refUID, addresses);
    },

    /**
     * Extract demand data from an escrow attestation
     * @param demandAbi - ABI parameters for the demand data
     * @param escrowAttestation - The escrow attestation
     * @returns Decoded demand data
     *
     * @example
     * ```ts
     * import { parseAbiParameters } from "viem";
     *
     * const demandAbi = parseAbiParameters("(address oracle, bytes data)");
     * const demand = client.extractDemandData(demandAbi, escrowAttestation);
     * ```
     */
    extractDemandData: <DemandData extends readonly AbiParameter[]>(
      demandAbi: DemandData,
      escrowAttestation: { data: `0x${string}` },
    ): DecodeAbiParametersReturnType<DemandData> => {
      const arbiterDemandAbi = parseAbiParameters("(address arbiter, bytes demand)");
      const arbiterDemand = decodeAbiParameters(arbiterDemandAbi, escrowAttestation.data)[0];

      const trustedOracleDemandAbi = parseAbiParameters("(address oracle, bytes data)");
      const trustedOracleDemand = decodeAbiParameters(trustedOracleDemandAbi, arbiterDemand.demand)[0];

      return decodeAbiParameters(demandAbi, trustedOracleDemand.data);
    },

    /**
     * Get escrow attestation and extract demand data in one call
     * @param demandAbi - ABI parameters for the demand data
     * @param fulfillment - The fulfillment attestation
     * @returns Tuple of [escrow attestation, decoded demand data]
     *
     * @example
     * ```ts
     * import { parseAbiParameters } from "viem";
     *
     * const demandAbi = parseAbiParameters("(address oracle, bytes data)");
     * const [escrow, demand] = await client.getEscrowAndDemand(demandAbi, fulfillment);
     * ```
     */
    getEscrowAndDemand: async <DemandData extends readonly AbiParameter[]>(
      demandAbi: DemandData,
      fulfillment: { refUID: `0x${string}` },
    ): Promise<[Awaited<ReturnType<typeof getAttestation>>, DecodeAbiParametersReturnType<DemandData>]> => {
      const escrow = await getAttestation(viemClient, fulfillment.refUID, addresses);

      const arbiterDemandAbi = parseAbiParameters("(address arbiter, bytes demand)");
      const arbiterDemand = decodeAbiParameters(arbiterDemandAbi, escrow.data)[0];

      const trustedOracleDemandAbi = parseAbiParameters("(address oracle, bytes data)");
      const trustedOracleDemand = decodeAbiParameters(trustedOracleDemandAbi, arbiterDemand.demand)[0];

      const demand = decodeAbiParameters(demandAbi, trustedOracleDemand.data);

      return [escrow, demand];
    },

    /**
     * Decode an arbiter demand using the client's ChainAddresses
     * Recursively decodes nested demands for composing arbiters (All/Any)
     *
     * @param demand - The demand to decode {arbiter: Address, demand: Bytes}
     * @returns Decoded demand with optional children for composing arbiters
     *
     * @example
     * ```ts
     * const decoded = client.decodeDemand({
     *   arbiter: contractAddresses.allArbiter,
     *   demand: "0x..."
     * });
     * console.log(decoded.arbiter); // the arbiter address
     * console.log(decoded.decoded); // the decoded demand data
     * console.log(decoded.children); // nested demands if composing arbiter
     * ```
     */
    decodeDemand: (demand: Demand): DecodedDemandResult => {
      return decodeDemandWithAddresses(demand, addresses);
    },
  };

  return makeExtendableClient(client);
};

// Main arbiters client - provides both hierarchical and flat APIs
export * from "./clients/arbiters";
export * from "./config";
export * from "./extensions";
export * from "./types";
export * from "./utils";

// Export contract ABIs
export * as contracts from "./contracts";

// Export test fixtures
export * as fixtures from "../tests/fixtures";

// Export test utilities
export { setupTestEnvironment, type TestContext } from "../tests/utils/setup";

