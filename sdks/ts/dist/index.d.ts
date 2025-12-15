import * as viem from 'viem';
import { Hex, BlockNumber, BlockTag, Address, Abi, WalletClient, Transport, Chain, Account, PublicActions, AbiParameter, DecodeAbiParametersReturnType } from 'viem';
import * as arktype from 'arktype';
import * as zod from 'zod';
import * as abitype from 'abitype';

type ChainAddresses = {
    eas: `0x${string}`;
    easSchemaRegistry: `0x${string}`;
    erc20EscrowObligation: `0x${string}`;
    erc20PaymentObligation: `0x${string}`;
    erc20BarterUtils: `0x${string}`;
    erc721EscrowObligation: `0x${string}`;
    erc721PaymentObligation: `0x${string}`;
    erc721BarterUtils: `0x${string}`;
    erc1155EscrowObligation: `0x${string}`;
    erc1155BarterUtils: `0x${string}`;
    erc1155PaymentObligation: `0x${string}`;
    tokenBundleEscrowObligation: `0x${string}`;
    tokenBundlePaymentObligation: `0x${string}`;
    tokenBundleBarterUtils: `0x${string}`;
    attestationEscrowObligation: `0x${string}`;
    attestationEscrowObligation2: `0x${string}`;
    attestationBarterUtils: `0x${string}`;
    stringObligation: `0x${string}`;
    trustedPartyArbiter: `0x${string}`;
    trivialArbiter: `0x${string}`;
    specificAttestationArbiter: `0x${string}`;
    trustedOracleArbiter: `0x${string}`;
    anyArbiter: `0x${string}`;
    allArbiter: `0x${string}`;
    notArbiter: `0x${string}`;
    intrinsicsArbiter: `0x${string}`;
    intrinsicsArbiter2: `0x${string}`;
    erc8004Arbiter: `0x${string}`;
    confirmationArbiter: `0x${string}`;
    confirmationArbiterComposing: `0x${string}`;
    revocableConfirmationArbiter: `0x${string}`;
    revocableConfirmationArbiterComposing: `0x${string}`;
    unrevocableConfirmationArbiter: `0x${string}`;
    unrevocableArbiterComposing: `0x${string}`;
    nativeTokenEscrowObligation: `0x${string}`;
    nativeTokenPaymentObligation: `0x${string}`;
    nativeTokenBarterUtils: `0x${string}`;
    attesterArbiterComposing?: `0x${string}`;
    expirationTimeArbiterComposing?: `0x${string}`;
    recipientArbiterComposing?: `0x${string}`;
    refUidArbiterComposing?: `0x${string}`;
    revocableArbiterComposing?: `0x${string}`;
    revocationTimeArbiterComposing?: `0x${string}`;
    schemaArbiterComposing?: `0x${string}`;
    timestampArbiterComposing?: `0x${string}`;
    uidArbiterComposing?: `0x${string}`;
    valueArbiterComposing?: `0x${string}`;
    attesterArbiterNonComposing?: `0x${string}`;
    expirationTimeArbiterNonComposing?: `0x${string}`;
    recipientArbiterNonComposing?: `0x${string}`;
    refUidArbiterNonComposing?: `0x${string}`;
    revocableArbiterNonComposing?: `0x${string}`;
    revocationTimeArbiterNonComposing?: `0x${string}`;
    schemaArbiterNonComposing?: `0x${string}`;
    timestampArbiterNonComposing?: `0x${string}`;
    uidArbiterNonComposing?: `0x${string}`;
    valueArbiterNonComposing?: `0x${string}`;
};
type PermitSignature = {
    deadline: bigint;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
};
type SignPermitProps = {
    /** Address of the token to approve */
    contractAddress: Hex;
    /** Name of the token to approve.
     * Corresponds to the `name` method on the ERC-20 contract. Please note this must match exactly byte-for-byte */
    erc20Name: string;
    /** Owner of the tokens. Usually the currently connected address. */
    ownerAddress: Hex;
    /** Address to grant allowance to */
    spenderAddress: Hex;
    /** Expiration of this approval, in SECONDS */
    deadline: bigint;
    /** Numerical chainId of the token contract */
    chainId: number;
    /** Defaults to 1. Some tokens need a different version, check the [PERMIT INFORMATION](https://github.com/vacekj/wagmi-permit/blob/main/PERMIT.md) for more information */
    permitVersion?: string;
    /** Permit nonce for the specific address and token contract. You can get the nonce from the `nonces` method on the token contract. */
    nonce: bigint;
};
type Eip2612Props = SignPermitProps & {
    /** Amount to approve */
    value: bigint;
};
type Erc20 = {
    address: `0x${string}`;
    value: bigint;
};
type Erc721 = {
    address: `0x${string}`;
    id: bigint;
};
type Erc1155 = {
    address: `0x${string}`;
    id: bigint;
    value: bigint;
};
type Demand = {
    arbiter: `0x${string}`;
    demand: `0x${string}`;
};
type TokenBundle = {
    erc20s: Erc20[];
    erc721s: Erc721[];
    erc1155s: Erc1155[];
};
type TokenBundleFlat = {
    erc20Tokens: `0x${string}`[];
    erc20Amounts: bigint[];
    erc721Tokens: `0x${string}`[];
    erc721TokenIds: bigint[];
    erc1155Tokens: `0x${string}`[];
    erc1155TokenIds: bigint[];
    erc1155Amounts: bigint[];
};
type ApprovalPurpose = "escrow" | "payment";
type Attestation = {
    uid: `0x${string}`;
    schema: `0x${string}`;
    time: bigint;
    expirationTime: bigint;
    revocationTime: bigint;
    refUID: `0x${string}`;
    recipient: `0x${string}`;
    attester: `0x${string}`;
    revocable: boolean;
    data: `0x${string}`;
};
interface TimeFilters {
    /** Only process attestations after this timestamp (Unix timestamp in seconds) */
    minTime?: bigint;
    /** Only process attestations before this timestamp (Unix timestamp in seconds) */
    maxTime?: bigint;
    /** Skip attestations past their expiration time */
    excludeExpired?: boolean;
    /** Only process attestations older than this duration (seconds) */
    minAge?: bigint;
    /** Only process attestations newer than this duration (seconds) */
    maxAge?: bigint;
}
interface AttestationFilters {
    /** Only process attestations from specific attester */
    specificAttester?: string;
    /** Skip attestations from these attesters */
    excludeAttesters?: string[];
    /** Only process attestations for specific recipient */
    specificRecipient?: string;
    /** Skip revoked attestations */
    excludeRevoked?: boolean;
    /** Only process attestations with reference UID */
    requireRefUID?: boolean;
    /** Only process attestations with specific schema */
    specificSchema?: string;
}
interface BlockFilters {
    /** Start from specific block number or block tag */
    fromBlock?: BlockNumber | BlockTag;
    /** End at specific block number or block tag */
    toBlock?: BlockNumber | BlockTag;
    /** Limit the block range to prevent timeouts */
    maxBlockRange?: bigint;
}
interface BatchFilters {
    /** Limit number of obligations to process */
    maxObligations?: number;
    /** Process recent attestations first */
    prioritizeRecent?: boolean;
    /** Process in batches of this size */
    batchSize?: number;
}
interface PerformanceFilters {
    /** Skip if estimated gas exceeds limit */
    maxGasPerTx?: bigint;
    /** Only simulate, don't execute transactions */
    dryRun?: boolean;
    /** Skip validation for faster processing */
    skipValidation?: boolean;
}
interface EnhancedArbitrateFilters extends TimeFilters, AttestationFilters, BlockFilters, BatchFilters, PerformanceFilters {
    /** Only arbitrate if escrow demands current oracle */
    onlyIfEscrowDemandsCurrentOracle?: boolean;
    /** Skip obligations that have already been arbitrated */
    skipAlreadyArbitrated?: boolean;
}
/**
 * Basic native token transfer arbitration request
 * Oracles can verify if a native token transfer occurred with specific criteria
 */
interface NativeTokenTransferArbitrationRequest {
    type: 'native_token_transfer';
    /** Minimum native token amount that must be transferred (in wei) */
    minAmount: bigint;
    /** Address that should receive the native token */
    recipient: `0x${string}`;
    /** Address that should send the native token (optional) */
    sender?: `0x${string}`;
    /** Block number after which the transfer should occur (optional) */
    afterBlock?: bigint;
    /** Block number before which the transfer should occur (optional) */
    beforeBlock?: bigint;
    /** Specific transaction hash to verify (optional) */
    txHash?: `0x${string}`;
}
/**
 * Native token balance arbitration request
 * Oracles can verify if an address has a minimum native token balance
 */
interface NativeTokenBalanceArbitrationRequest {
    type: 'native_token_balance';
    /** Address to check balance for */
    address: `0x${string}`;
    /** Minimum balance required (in wei) */
    minBalance: bigint;
    /** Block number at which to check balance (optional, defaults to latest) */
    atBlock?: bigint;
}
/**
 * Native token payment arbitration request
 * Oracles can verify if a payment was made from payer to payee
 */
interface NativeTokenPaymentArbitrationRequest {
    type: 'native_token_payment';
    /** Amount to be paid (in wei) */
    amount: bigint;
    /** Address that should make the payment */
    payer: `0x${string}`;
    /** Address that should receive the payment */
    payee: `0x${string}`;
    /** Time window for the payment (optional) */
    timeWindow?: {
        afterBlock?: bigint;
        beforeBlock?: bigint;
    };
    /** Specific transaction hash to verify (optional) */
    txHash?: `0x${string}`;
}
/**
 * Native token escrow arbitration request
 * Oracles can verify escrow conditions are met
 */
interface NativeTokenEscrowArbitrationRequest {
    type: 'native_token_escrow';
    /** Total amount in escrow (in wei) */
    totalAmount: bigint;
    /** Parties involved in the escrow */
    parties: Array<{
        address: `0x${string}`;
        amount: bigint;
        role: 'depositor' | 'beneficiary' | 'arbiter';
    }>;
    /** Escrow conditions */
    conditions: {
        /** Whether all deposits are required */
        requireAllDeposits: boolean;
        /** Minimum number of depositors */
        minDepositors: number;
        /** Release conditions */
        releaseConditions?: string[];
    };
    /** Time window for escrow (optional) */
    timeWindow?: {
        afterBlock?: bigint;
        beforeBlock?: bigint;
    };
}
/**
 * Union type for all native token arbitration request types
 */
type NativeTokenArbitrationRequest = NativeTokenTransferArbitrationRequest | NativeTokenBalanceArbitrationRequest | NativeTokenPaymentArbitrationRequest | NativeTokenEscrowArbitrationRequest;
/**
 * Result of native token arbitration processing
 */
interface NativeTokenArbitrationResult {
    /** The original request that was processed */
    request: NativeTokenArbitrationRequest;
    /** Whether the arbitration conditions are satisfied */
    decision: boolean;
    /** Oracle that made the decision */
    oracle: `0x${string}`;
    /** Block number when decision was made */
    blockNumber: bigint;
    /** Timestamp when decision was made */
    timestamp: bigint;
    /** Additional evidence or reasoning */
    evidence?: {
        /** Transaction hashes related to the decision */
        transactionHashes?: `0x${string}`[];
        /** Balances checked during arbitration */
        balances?: Record<`0x${string}`, bigint>;
        /** Block numbers relevant to the decision */
        relevantBlocks?: bigint[];
        /** Human-readable reasoning */
        reasoning?: string;
        /** Any additional metadata */
        metadata?: Record<string, any>;
    };
}
/**
 * Context for tracking native token arbitration requests
 */
interface NativeTokenArbitrationContext {
    /** The arbitration request */
    request: NativeTokenArbitrationRequest;
    /** Address that submitted the request */
    requester: `0x${string}`;
    /** Timestamp when request was created */
    createdAt: bigint;
    /** Oracle assigned to handle the request (optional) */
    assignedOracle?: `0x${string}`;
    /** Status of the request */
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    /** Unique identifier for the request */
    requestId: `0x${string}`;
}
type EthTransferArbitrationRequest = NativeTokenTransferArbitrationRequest;
type EthBalanceArbitrationRequest = NativeTokenBalanceArbitrationRequest;
type EthArbitrationRequest = NativeTokenArbitrationRequest;
type EthArbitrationResult = NativeTokenArbitrationResult;
type EthArbitrationContext = NativeTokenArbitrationContext;

/**
 * Interface for arbiter demand parsers
 */
interface ArbiterDemandParser {
    /**
     * Parse the demand data for this arbiter type
     */
    parse: (demandData: `0x${string}`) => any;
    /**
     * Check if this arbiter supports composing (nesting other arbiters)
     */
    isComposing: boolean;
}
/**
 * Registry for mapping arbiter addresses to their demand data formats
 */
declare class ArbiterRegistry {
    private parsers;
    /**
     * Register a parser for an arbiter address
     */
    register(arbiterAddress: Address, parser: ArbiterDemandParser): void;
    /**
     * Get parser for an arbiter address
     */
    getParser(arbiterAddress: Address): ArbiterDemandParser | undefined;
    /**
     * Parse a demand recursively, handling composed arbiters
     */
    parseDemand(demand: Demand): ParsedDemand;
}
/**
 * Result of parsing a demand
 */
interface ParsedDemand {
    arbiter: Address;
    demandData: `0x${string}`;
    parsed: any;
    type: "simple" | "composing" | "unknown";
    nested?: ParsedDemand[];
}
/**
 * Utility functions for working with composed demands
 */
declare const DemandParsingUtils: {
    /**
     * Parse a demand and all its nested demands recursively
     */
    parseComposedDemand: (demand: Demand, registry: ArbiterRegistry) => ParsedDemand;
    /**
     * Find all arbiters used in a composed demand (flattened list)
     */
    getAllArbiters: (parsedDemand: ParsedDemand) => Address[];
    /**
     * Check if a demand is fully parseable (all arbiters are known)
     */
    isFullyParseable: (parsedDemand: ParsedDemand) => boolean;
    /**
     * Get a human-readable representation of the demand structure
     */
    getStructureDescription: (parsedDemand: ParsedDemand) => string;
};

/**
 * Configuration for composing arbiters that follow the standard pattern
 */
interface ComposingArbiterConfig {
    /** Address property name in ChainAddresses */
    addressKey: keyof ChainAddresses;
    /** Contract ABI */
    abi: {
        abi: any;
    };
    /** Human readable name for debugging */
    name: string;
}
/**
 * Automatically create and register all composing arbiters that follow the standard pattern
 */
declare function createFullArbiterRegistry(addresses: ChainAddresses): ArbiterRegistry;
/**
 * Create static codecs for all composing arbiters
 * This generates the codec objects that can be used for encoding/decoding without a client
 */
declare function createComposingCodecs(): Record<string, any>;
/**
 * Demand parsing utilities with automatic codec generation
 */
declare const DemandParsingRegistry: {
    /**
     * Create a fully populated registry with all known arbiters
     */
    createFullRegistry: typeof createFullArbiterRegistry;
    /**
     * Get all available static codecs
     */
    getAllCodecs: typeof createComposingCodecs;
    /**
     * Check if an arbiter address is a known composing arbiter
     */
    isKnownComposingArbiter: (address: Address, addresses: ChainAddresses) => boolean;
    /**
     * Get the configuration for a composing arbiter by address
     */
    getComposingArbiterConfig: (address: Address, addresses: ChainAddresses) => ComposingArbiterConfig | undefined;
};

/**
 * Standard interface for composing arbiter demand data
 * Most composing arbiters follow the pattern: { baseArbiter: address, baseDemand: bytes, ...specificFields }
 */
interface BaseComposingDemandData {
    baseArbiter: `0x${string}`;
    baseDemand: `0x${string}`;
}
/**
 * Generic codec factory for composing arbiters
 * Automatically extracts ABI structure and creates encode/decode functions
 */
declare function createComposingArbiterCodec<T extends BaseComposingDemandData>(contractAbi: {
    abi: Abi;
}): {
    /**
     * Encodes composing arbiter demand data to bytes
     */
    encode: (demand: T) => `0x${string}`;
    /**
     * Decodes composing arbiter demand data from bytes
     */
    decode: (demandData: `0x${string}`) => T;
};
/**
 * Generic codec factory for non-composing arbiters
 * Similar pattern but without baseArbiter/baseDemand fields
 */
declare function createNonComposingArbiterCodec<T>(contractAbi: {
    abi: Abi;
}): {
    /**
     * Encodes non-composing arbiter demand data to bytes
     */
    encode: (demand: T) => `0x${string}`;
    /**
     * Decodes non-composing arbiter demand data from bytes
     */
    decode: (demandData: `0x${string}`) => T;
};

type ViemClient = WalletClient<Transport, Chain, Account> & PublicActions;
/**
 * Detect if the viem client is using WebSocket transport
 * @param viemClient - The viem client
 * @returns true if using WebSocket transport, false otherwise
 */
declare const isWebSocketTransport: (viemClient: ViemClient) => boolean;
/**
 * Get optimal polling interval based on transport type
 * @param viemClient - The viem client
 * @param defaultInterval - Default polling interval for HTTP
 * @returns optimal polling interval or undefined for WebSocket
 */
declare const getOptimalPollingInterval: (viemClient: ViemClient, defaultInterval?: number) => number | undefined;
declare const getAttestation: (viemClient: ViemClient, uid: `0x${string}`, addresses?: Pick<ChainAddresses, "eas">) => Promise<{
    uid: `0x${string}`;
    schema: `0x${string}`;
    time: bigint;
    expirationTime: bigint;
    revocationTime: bigint;
    refUID: `0x${string}`;
    recipient: `0x${string}`;
    attester: `0x${string}`;
    revocable: boolean;
    data: `0x${string}`;
}>;
declare const getAttestedEventFromTxHash: (client: ViemClient, hash: `0x${string}`) => Promise<any>;
declare const flattenTokenBundle: (bundle: TokenBundle) => TokenBundleFlat;

/**
 * Wrapper for viemClient.writeContract that adds required chain parameter
 */
declare const writeContract: (viemClient: ViemClient, params: Parameters<ViemClient["writeContract"]>[0]) => Promise<`0x${string}`>;
/**
 * Wrapper for viemClient.readContract that adds required authorizationList parameter
 */
declare const readContract: <T>(viemClient: ViemClient, params: Parameters<ViemClient["readContract"]>[0]) => Promise<T>;

/**
 * Options for arbitration
 */
type ArbitrateOptions$1 = {
    /**
     * Skip attestations that have already been arbitrated by this oracle
     */
    skipAlreadyArbitrated?: boolean;
    /**
     * Only arbitrate new attestations (don't process past attestations)
     */
    onlyNew?: boolean;
    /**
     * Block range for past arbitration
     */
    fromBlock?: BlockNumber | BlockTag;
    toBlock?: BlockNumber | BlockTag;
};
type Decision$1 = {
    hash: `0x${string}`;
    attestation: Attestation;
    decision: boolean;
};
type ListenAndArbitrateResult$1 = {
    decisions: Decision$1[];
    unwatch: () => void;
};

/**
 * Native Token Payment Obligation Data structure
 * Matches the Solidity struct: struct ObligationData { uint256 amount; address payee; }
 */
type NativeTokenPaymentObligationData = {
    amount: bigint;
    payee: Address;
};
/**
 * Native Token Escrow Obligation Data structure
 * Matches the Solidity struct: struct ObligationData { address arbiter; bytes demand; uint256 amount; }
 */
type NativeTokenEscrowObligationData = {
    arbiter: Address;
    demand: `0x${string}`;
    amount: bigint;
};

/**
 * Static encoding/decoding utilities for TrustedOracleArbiter demands
 * These functions don't require client instantiation since they only handle data transformation
 */
declare const TrustedOracleArbiterCodec: {
    /**
     * Encodes TrustedOracleArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address oracle, bytes data}
     * @returns abi encoded bytes
     */
    readonly encode: (demand: {
        oracle: `0x${string}`;
        data: `0x${string}`;
    }) => `0x${string}`;
    /**
     * Decodes TrustedOracleArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    readonly decode: (demandData: `0x${string}`) => {
        oracle: `0x${string}`;
        data: `0x${string}`;
    };
};
/**
 * Options for arbitration
 */
type ArbitrateOptions = {
    /**
     * Skip attestations that have already been arbitrated by this oracle
     */
    skipAlreadyArbitrated?: boolean;
    /**
     * Only arbitrate new attestations (don't process past attestations)
     */
    onlyNew?: boolean;
    /**
     * Block range for past arbitration
     */
    fromBlock?: BlockNumber | BlockTag;
    toBlock?: BlockNumber | BlockTag;
};
type Decision = {
    hash: `0x${string}`;
    attestation: Attestation;
    decision: boolean;
};
type ListenAndArbitrateResult = {
    decisions: Decision[];
    unwatch: () => void;
};

/**
 * Creates the default extension for the Alkahest client with all standard functionality
 * @param client - The base client to extend
 * @returns Extension object with all standard client functionality
 */
declare const makeDefaultExtension: (client: any) => {
    /** Unified client for all arbiter functionality */
    arbiters: {
        general: {
            intrinsics2: {
                encode: (demand: {
                    schema: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    schema: `0x${string}`;
                };
            };
            trustedParty: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    creator: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    creator: `0x${string}`;
                };
            };
            specificAttestation: {
                encode: (demand: {
                    uid: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    uid: `0x${string}`;
                };
            };
            trustedOracle: {
                encode: (demand: {
                    oracle: `0x${string}`;
                    data: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    oracle: `0x${string}`;
                    data: `0x${string}`;
                };
                arbitrate: (obligation: `0x${string}`, decision: boolean) => Promise<`0x${string}`>;
                requestArbitration: (obligationUid: `0x${string}`, oracle: abitype.Address) => Promise<`0x${string}`>;
                checkExistingArbitration: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<{
                    obligation: `0x${string}`;
                    oracle: `0x${string}`;
                    decision: boolean;
                } | undefined>;
                waitForArbitration: (obligation: `0x${string}`, oracle: `0x${string}`, pollingInterval?: number) => Promise<{
                    obligation?: `0x${string}` | undefined;
                    oracle?: `0x${string}` | undefined;
                    decision?: boolean | undefined;
                }>;
                waitForArbitrationRequest: (obligation: `0x${string}`, oracle: `0x${string}`, pollingInterval?: number) => Promise<{
                    obligation?: `0x${string}` | undefined;
                    oracle?: `0x${string}` | undefined;
                }>;
                listenForArbitrationRequestsOnly: (oracle: `0x${string}`, arbitrationHandler: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<boolean>, pollingInterval?: number) => viem.WatchEventReturnType;
                getArbitrationRequests: (options?: ArbitrateOptions) => Promise<Attestation[]>;
                arbitratePast: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions) => Promise<Decision[]>;
                listenAndArbitrate: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions & {
                    onAfterArbitrate?: (decision: Decision) => Promise<void>;
                    pollingInterval?: number;
                }) => Promise<ListenAndArbitrateResult>;
            };
        };
        logical: {
            any: {
                encode: (demand: {
                    arbiters: `0x${string}`[];
                    demands: `0x${string}`[];
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    arbiters: readonly `0x${string}`[];
                    demands: readonly `0x${string}`[];
                };
            };
            all: {
                encode: (demand: {
                    arbiters: `0x${string}`[];
                    demands: `0x${string}`[];
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    arbiters: readonly `0x${string}`[];
                    demands: readonly `0x${string}`[];
                };
            };
        };
        attestation: {
            attester: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        attester: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        attester: `0x${string}`;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        attester: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        attester: `0x${string}`;
                    };
                };
            };
            recipient: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        recipient: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        recipient: `0x${string}`;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        recipient: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        recipient: `0x${string}`;
                    };
                };
            };
            schema: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        schema: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        schema: `0x${string}`;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        schema: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (demandData: `0x${string}`) => {
                        schema: `0x${string}`;
                    };
                };
            };
            time: {
                after: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            time: bigint;
                        };
                    };
                };
                before: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            time: bigint;
                        };
                    };
                };
                equal: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            time: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            time: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            time: bigint;
                        };
                    };
                };
            };
            uid: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        uid: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        uid: `0x${string}`;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        uid: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        uid: `0x${string}`;
                    };
                };
            };
            revocable: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        revocable: boolean;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        revocable: boolean;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        revocable: boolean;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        revocable: boolean;
                    };
                };
            };
            refUid: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        refUID: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        refUID: `0x${string}`;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        refUID: `0x${string}`;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        refUID: `0x${string}`;
                    };
                };
            };
            expirationTime: {
                after: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            expirationTime: bigint;
                        };
                    };
                };
                before: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            expirationTime: bigint;
                        };
                    };
                };
                equal: {
                    composing: {
                        encode: (demand: {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            baseArbiter: `0x${string}`;
                            baseDemand: `0x${string}`;
                            expirationTime: bigint;
                        };
                    };
                    nonComposing: {
                        encode: (demand: {
                            expirationTime: bigint;
                        }) => `0x${string}`;
                        decode: (data: `0x${string}`) => {
                            expirationTime: bigint;
                        };
                    };
                };
            };
        };
    };
    /** Methods for interacting with ERC20 tokens */
    erc20: {
        encodeEscrowObligationRaw: (data: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            amount: bigint;
        }) => `0x${string}`;
        encodePaymentObligationRaw: (data: {
            token: `0x${string}`;
            amount: bigint;
            payee: `0x${string}`;
        }) => `0x${string}`;
        encodeEscrowObligation: (token: Erc20, demand: Demand) => `0x${string}`;
        encodePaymentObligation: (token: Erc20, payee: `0x${string}`) => `0x${string}`;
        decodeEscrowObligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            amount: bigint;
        };
        decodePaymentObligation: (obligationData: `0x${string}`) => {
            token: `0x${string}`;
            amount: bigint;
            payee: `0x${string}`;
        };
        getEscrowSchema: () => Promise<unknown>;
        getPaymentSchema: () => Promise<unknown>;
        getEscrowObligation: (uid: `0x${string}`) => Promise<{
            data: {
                arbiter: `0x${string}`;
                demand: `0x${string}`;
                token: `0x${string}`;
                amount: bigint;
            };
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
        getPaymentObligation: (uid: `0x${string}`) => Promise<{
            data: {
                token: `0x${string}`;
                amount: bigint;
                payee: `0x${string}`;
            };
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
        approve: (token: Erc20, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        approveIfLess: (token: Erc20, purpose: ApprovalPurpose) => Promise<`0x${string}` | null>;
        collectEscrow: (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => Promise<`0x${string}`>;
        reclaimExpired: (buyAttestation: `0x${string}`) => Promise<`0x${string}`>;
        buyWithErc20: (price: Erc20, item: Demand, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndBuyWithErc20: (price: Erc20, item: Demand, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payWithErc20: (price: Erc20, payee: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndPayWithErc20: (price: Erc20, payee: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc20ForErc20: (bid: Erc20, ask: Erc20, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndBuyErc20ForErc20: (bid: Erc20, ask: Erc20, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc20ForErc20: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndPayErc20ForErc20: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc721WithErc20: (bid: Erc20, ask: Erc721, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndBuyErc721WithErc20: (bid: Erc20, ask: Erc721, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc20ForErc721: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndPayErc20ForErc721: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc1155WithErc20: (bid: Erc20, ask: Erc1155, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndBuyErc1155WithErc20: (bid: Erc20, ask: Erc1155, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc20ForErc1155: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndPayErc20ForErc1155: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyBundleWithErc20: (bid: Erc20, bundle: TokenBundle, payee: `0x${string}`, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndBuyBundleWithErc20: (bid: Erc20, bundle: TokenBundle, payee: `0x${string}`, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc20ForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        permitAndPayErc20ForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc20WithNative: (bidAmount: bigint, ask: Erc20, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payNativeForErc20: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
    };
    /** Methods for interacting with native tokens */
    nativeToken: {
        encodeNativeTokenObligationData: (data: {
            amount: bigint;
            payee: abitype.Address;
        }) => `0x${string}`;
        decodeNativeTokenObligationData: (data: `0x${string}`) => {
            amount: bigint;
            payee: abitype.Address;
        };
        doNativeTokenPaymentObligation: (data: NativeTokenPaymentObligationData) => Promise<{
            hash: viem.Hash;
        }>;
        doNativeTokenPaymentObligationFor: (data: NativeTokenPaymentObligationData, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        getNativeTokenPaymentObligationData: (uid: `0x${string}`) => Promise<NativeTokenPaymentObligationData>;
        checkNativeTokenPaymentObligation: (obligationUid: `0x${string}`, demand: `0x${string}`, counteroffer?: `0x${string}`) => Promise<boolean>;
        getNativeTokenPaymentObligationFromTxHash: (txHash: viem.Hash) => Promise<NativeTokenPaymentObligationData>;
        createNativeTokenPaymentDemand: (data: {
            amount: bigint;
            payee: abitype.Address;
        }) => Demand;
        encodeNativeTokenEscrowObligationData: (data: NativeTokenEscrowObligationData) => `0x${string}`;
        decodeNativeTokenEscrowObligationData: (data: `0x${string}`) => NativeTokenEscrowObligationData;
        doNativeTokenEscrowObligation: (data: NativeTokenEscrowObligationData, expirationTime?: bigint) => Promise<{
            hash: viem.Hash;
        }>;
        doNativeTokenEscrowObligationFor: (data: NativeTokenEscrowObligationData, expirationTime: bigint, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        getNativeTokenEscrowObligationData: (uid: `0x${string}`) => Promise<NativeTokenEscrowObligationData>;
        checkNativeTokenEscrowObligation: (obligationUid: `0x${string}`, demand: `0x${string}`, counteroffer?: `0x${string}`) => Promise<boolean>;
        getNativeTokenEscrowObligationFromTxHash: (txHash: viem.Hash) => Promise<NativeTokenEscrowObligationData>;
        createNativeTokenEscrowDemand: (data: NativeTokenEscrowObligationData) => Demand;
        payNativeToken: (data: NativeTokenPaymentObligationData) => Promise<{
            hash: viem.Hash;
        }>;
        payNativeTokenFor: (data: NativeTokenPaymentObligationData, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        escrowNativeToken: (data: NativeTokenEscrowObligationData, expirationTime?: bigint) => Promise<{
            hash: viem.Hash;
        }>;
        escrowNativeTokenFor: (data: NativeTokenEscrowObligationData, expirationTime: bigint, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        getNativeTokenPayment: (uid: `0x${string}`) => Promise<NativeTokenPaymentObligationData>;
        getNativeTokenEscrow: (uid: `0x${string}`) => Promise<NativeTokenEscrowObligationData>;
        checkNativeTokenPayment: (obligationUid: `0x${string}`, demand: `0x${string}`, counteroffer?: `0x${string}`) => Promise<boolean>;
        checkNativeTokenEscrow: (obligationUid: `0x${string}`, demand: `0x${string}`, counteroffer?: `0x${string}`) => Promise<boolean>;
        doPaymentObligation: (data: NativeTokenPaymentObligationData) => Promise<{
            hash: viem.Hash;
        }>;
        doEscrowObligation: (data: NativeTokenEscrowObligationData, expirationTime?: bigint) => Promise<{
            hash: viem.Hash;
        }>;
        doPaymentObligationFor: (data: NativeTokenPaymentObligationData, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        doEscrowObligationFor: (data: NativeTokenEscrowObligationData, expirationTime: bigint, payer: abitype.Address, recipient: abitype.Address) => Promise<viem.Hash>;
        validatePaymentObligationData: (data: any) => {
            valid: boolean;
            errors: never[];
        };
        paymentAbi: readonly [{
            readonly type: "constructor";
            readonly inputs: readonly [{
                readonly name: "_eas";
                readonly type: "address";
                readonly internalType: "contract IEAS";
            }, {
                readonly name: "_schemaRegistry";
                readonly type: "address";
                readonly internalType: "contract ISchemaRegistry";
            }];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "receive";
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "ATTESTATION_SCHEMA";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "attest";
            readonly inputs: readonly [{
                readonly name: "attestation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "checkObligation";
            readonly inputs: readonly [{
                readonly name: "obligation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "demand";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "decodeObligationData";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenPaymentObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }, {
                    readonly name: "payee";
                    readonly type: "address";
                    readonly internalType: "address";
                }];
            }];
            readonly stateMutability: "pure";
        }, {
            readonly type: "function";
            readonly name: "doObligation";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenPaymentObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }, {
                    readonly name: "payee";
                    readonly type: "address";
                    readonly internalType: "address";
                }];
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationFor";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenPaymentObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }, {
                    readonly name: "payee";
                    readonly type: "address";
                    readonly internalType: "address";
                }];
            }, {
                readonly name: "payer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationForRaw";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "payer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "refUID";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationRaw";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "refUID";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "getObligationData";
            readonly inputs: readonly [{
                readonly name: "uid";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenPaymentObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }, {
                    readonly name: "payee";
                    readonly type: "address";
                    readonly internalType: "address";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getSchema";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct SchemaRecord";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "resolver";
                    readonly type: "address";
                    readonly internalType: "contract ISchemaResolver";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "schema";
                    readonly type: "string";
                    readonly internalType: "string";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "isPayable";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "pure";
        }, {
            readonly type: "function";
            readonly name: "multiAttest";
            readonly inputs: readonly [{
                readonly name: "attestations";
                readonly type: "tuple[]";
                readonly internalType: "struct Attestation[]";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "values";
                readonly type: "uint256[]";
                readonly internalType: "uint256[]";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "multiRevoke";
            readonly inputs: readonly [{
                readonly name: "attestations";
                readonly type: "tuple[]";
                readonly internalType: "struct Attestation[]";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "values";
                readonly type: "uint256[]";
                readonly internalType: "uint256[]";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "revoke";
            readonly inputs: readonly [{
                readonly name: "attestation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "version";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "string";
                readonly internalType: "string";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "PaymentMade";
            readonly inputs: readonly [{
                readonly name: "payment";
                readonly type: "bytes32";
                readonly indexed: true;
                readonly internalType: "bytes32";
            }, {
                readonly name: "buyer";
                readonly type: "address";
                readonly indexed: true;
                readonly internalType: "address";
            }];
            readonly anonymous: false;
        }, {
            readonly type: "error";
            readonly name: "AccessDenied";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "AttestationRevoked";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "DeadlineExpired";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InsufficientPayment";
            readonly inputs: readonly [{
                readonly name: "expected";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "received";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly type: "error";
            readonly name: "InsufficientValue";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidEAS";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidLength";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidSchema";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "NativeTokenTransferFailed";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly type: "error";
            readonly name: "NotFromThisAttester";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "NotPayable";
            readonly inputs: readonly [];
        }];
        escrowAbi: readonly [{
            readonly type: "constructor";
            readonly inputs: readonly [{
                readonly name: "_eas";
                readonly type: "address";
                readonly internalType: "contract IEAS";
            }, {
                readonly name: "_schemaRegistry";
                readonly type: "address";
                readonly internalType: "contract ISchemaRegistry";
            }];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "receive";
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "ATTESTATION_SCHEMA";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "attest";
            readonly inputs: readonly [{
                readonly name: "attestation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "checkObligation";
            readonly inputs: readonly [{
                readonly name: "obligation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "demand";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "collectEscrow";
            readonly inputs: readonly [{
                readonly name: "escrow";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "fulfillment";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "collectEscrowRaw";
            readonly inputs: readonly [{
                readonly name: "_escrow";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "_fulfillment";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "decodeObligationData";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenEscrowObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "arbiter";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "demand";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }, {
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }];
            }];
            readonly stateMutability: "pure";
        }, {
            readonly type: "function";
            readonly name: "doObligation";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenEscrowObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "arbiter";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "demand";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }, {
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }];
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationFor";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenEscrowObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "arbiter";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "demand";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }, {
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }];
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "payer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationForRaw";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "payer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "refUID";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "doObligationRaw";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "expirationTime";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "refUID";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "uid_";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "extractArbiterAndDemand";
            readonly inputs: readonly [{
                readonly name: "data";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly outputs: readonly [{
                readonly name: "arbiter";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "demand";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
            readonly stateMutability: "pure";
        }, {
            readonly type: "function";
            readonly name: "getObligationData";
            readonly inputs: readonly [{
                readonly name: "uid";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct NativeTokenEscrowObligation.ObligationData";
                readonly components: readonly [{
                    readonly name: "arbiter";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "demand";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }, {
                    readonly name: "amount";
                    readonly type: "uint256";
                    readonly internalType: "uint256";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "getSchema";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "tuple";
                readonly internalType: "struct SchemaRecord";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "resolver";
                    readonly type: "address";
                    readonly internalType: "contract ISchemaResolver";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "schema";
                    readonly type: "string";
                    readonly internalType: "string";
                }];
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "function";
            readonly name: "isPayable";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "pure";
        }, {
            readonly type: "function";
            readonly name: "multiAttest";
            readonly inputs: readonly [{
                readonly name: "attestations";
                readonly type: "tuple[]";
                readonly internalType: "struct Attestation[]";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "values";
                readonly type: "uint256[]";
                readonly internalType: "uint256[]";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "multiRevoke";
            readonly inputs: readonly [{
                readonly name: "attestations";
                readonly type: "tuple[]";
                readonly internalType: "struct Attestation[]";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }, {
                readonly name: "values";
                readonly type: "uint256[]";
                readonly internalType: "uint256[]";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "reclaimExpired";
            readonly inputs: readonly [{
                readonly name: "uid";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        }, {
            readonly type: "function";
            readonly name: "revoke";
            readonly inputs: readonly [{
                readonly name: "attestation";
                readonly type: "tuple";
                readonly internalType: "struct Attestation";
                readonly components: readonly [{
                    readonly name: "uid";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "schema";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "time";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "expirationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "revocationTime";
                    readonly type: "uint64";
                    readonly internalType: "uint64";
                }, {
                    readonly name: "refUID";
                    readonly type: "bytes32";
                    readonly internalType: "bytes32";
                }, {
                    readonly name: "recipient";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "attester";
                    readonly type: "address";
                    readonly internalType: "address";
                }, {
                    readonly name: "revocable";
                    readonly type: "bool";
                    readonly internalType: "bool";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                    readonly internalType: "bytes";
                }];
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "payable";
        }, {
            readonly type: "function";
            readonly name: "version";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "string";
                readonly internalType: "string";
            }];
            readonly stateMutability: "view";
        }, {
            readonly type: "event";
            readonly name: "EscrowCollected";
            readonly inputs: readonly [{
                readonly name: "escrow";
                readonly type: "bytes32";
                readonly indexed: true;
                readonly internalType: "bytes32";
            }, {
                readonly name: "fulfillment";
                readonly type: "bytes32";
                readonly indexed: true;
                readonly internalType: "bytes32";
            }, {
                readonly name: "fulfiller";
                readonly type: "address";
                readonly indexed: true;
                readonly internalType: "address";
            }];
            readonly anonymous: false;
        }, {
            readonly type: "event";
            readonly name: "EscrowMade";
            readonly inputs: readonly [{
                readonly name: "escrow";
                readonly type: "bytes32";
                readonly indexed: true;
                readonly internalType: "bytes32";
            }, {
                readonly name: "buyer";
                readonly type: "address";
                readonly indexed: true;
                readonly internalType: "address";
            }];
            readonly anonymous: false;
        }, {
            readonly type: "error";
            readonly name: "AccessDenied";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "AttestationNotFound";
            readonly inputs: readonly [{
                readonly name: "attestationId";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
        }, {
            readonly type: "error";
            readonly name: "AttestationRevoked";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "DeadlineExpired";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InsufficientPayment";
            readonly inputs: readonly [{
                readonly name: "expected";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "received";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly type: "error";
            readonly name: "InsufficientValue";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidEAS";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidEscrowAttestation";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidFulfillment";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidLength";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "InvalidSchema";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "NativeTokenTransferFailed";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly type: "error";
            readonly name: "NotFromThisAttester";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "NotPayable";
            readonly inputs: readonly [];
        }, {
            readonly type: "error";
            readonly name: "RevocationFailed";
            readonly inputs: readonly [{
                readonly name: "attestationId";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
        }, {
            readonly type: "error";
            readonly name: "UnauthorizedCall";
            readonly inputs: readonly [];
        }];
    };
    /** Methods for interacting with ERC721 tokens */
    erc721: {
        encodeEscrowObligationRaw: (data: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            tokenId: bigint;
        }) => `0x${string}`;
        encodePaymentObligationRaw: (data: {
            token: `0x${string}`;
            tokenId: bigint;
            payee: `0x${string}`;
        }) => `0x${string}`;
        encodeEscrowObligation: (token: Erc721, demand: Demand) => `0x${string}`;
        encodePaymentObligation: (token: Erc721, payee: `0x${string}`) => `0x${string}`;
        decodeEscrowObligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            tokenId: bigint;
        };
        decodePaymentObligation: (obligationData: `0x${string}`) => {
            token: `0x${string}`;
            tokenId: bigint;
            payee: `0x${string}`;
        };
        approve: (token: Erc721, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        approveAll: (token_contract: `0x${string}`, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        revokeAll: (token_contract: `0x${string}`, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        collectEscrow: (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => Promise<`0x${string}`>;
        reclaimExpired: (buyAttestation: `0x${string}`) => Promise<`0x${string}`>;
        buyWithErc721: (price: Erc721, item: Demand, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payWithErc721: (price: Erc721, payee: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc721ForErc721: (bid: Erc721, ask: Erc721, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc721ForErc721: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
        }>;
        buyErc20WithErc721: (bid: Erc721, ask: Erc20, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc721ForErc20: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc1155WithErc721: (bid: Erc721, ask: Erc1155, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc721ForErc1155: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyBundleWithErc721: (bid: Erc721, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc721ForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc721WithNative: (bidAmount: bigint, ask: Erc721, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payNativeForErc721: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
    };
    /** Methods for interacting with ERC1155 tokens */
    erc1155: {
        encodeEscrowObligationRaw: (data: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            tokenId: bigint;
            amount: bigint;
        }) => `0x${string}`;
        encodePaymentObligationRaw: (data: {
            token: `0x${string}`;
            tokenId: bigint;
            amount: bigint;
            payee: `0x${string}`;
        }) => `0x${string}`;
        encodeEscrowObligation: (token: Erc1155, demand: Demand) => `0x${string}`;
        encodePaymentObligation: (token: Erc1155, payee: `0x${string}`) => `0x${string}`;
        decodeEscrowObligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            token: `0x${string}`;
            tokenId: bigint;
            amount: bigint;
        };
        decodePaymentObligation: (obligationData: `0x${string}`) => {
            token: `0x${string}`;
            tokenId: bigint;
            amount: bigint;
            payee: `0x${string}`;
        };
        approveAll: (token_contract: `0x${string}`, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        revokeAll: (token_contract: `0x${string}`, purpose: ApprovalPurpose) => Promise<`0x${string}`>;
        collectEscrow: (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => Promise<`0x${string}`>;
        reclaimExpired: (buyAttestation: `0x${string}`) => Promise<`0x${string}`>;
        buyWithErc1155: (price: Erc1155, item: Demand, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payWithErc1155: (price: Erc1155, payee: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc1155ForErc1155: (bid: Erc1155, ask: Erc1155, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc1155ForErc1155: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
        }>;
        buyErc20WithErc1155: (bid: Erc1155, ask: Erc20, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc1155ForErc20: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc721WithErc1155: (bid: Erc1155, ask: Erc721, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc1155ForErc721: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyBundleWithErc1155: (bid: Erc1155, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payErc1155ForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyErc1155WithNative: (bidAmount: bigint, ask: Erc1155, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payNativeForErc1155: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
    };
    /** Methods for interacting with token bundles */
    bundle: {
        encodeEscrowObligationRaw: (data: {
            erc20Tokens: `0x${string}`[];
            erc20Amounts: bigint[];
            erc721Tokens: `0x${string}`[];
            erc721TokenIds: bigint[];
            erc1155Tokens: `0x${string}`[];
            erc1155TokenIds: bigint[];
            erc1155Amounts: bigint[];
            arbiter: `0x${string}`;
            demand: `0x${string}`;
        }) => `0x${string}`;
        encodePaymentObligationRaw: (data: {
            erc20Tokens: `0x${string}`[];
            erc20Amounts: bigint[];
            erc721Tokens: `0x${string}`[];
            erc721TokenIds: bigint[];
            erc1155Tokens: `0x${string}`[];
            erc1155TokenIds: bigint[];
            erc1155Amounts: bigint[];
            payee: `0x${string}`;
        }) => `0x${string}`;
        encodeEscrowObligation: (bundle: TokenBundle, demand: Demand) => `0x${string}`;
        encodePaymentObligation: (bundle: TokenBundle, payee: `0x${string}`) => `0x${string}`;
        decodeEscrowObligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            erc20Tokens: readonly `0x${string}`[];
            erc20Amounts: readonly bigint[];
            erc721Tokens: readonly `0x${string}`[];
            erc721TokenIds: readonly bigint[];
            erc1155Tokens: readonly `0x${string}`[];
            erc1155TokenIds: readonly bigint[];
            erc1155Amounts: readonly bigint[];
        };
        decodePaymentObligation: (obligationData: `0x${string}`) => {
            erc20Tokens: readonly `0x${string}`[];
            erc20Amounts: readonly bigint[];
            erc721Tokens: readonly `0x${string}`[];
            erc721TokenIds: readonly bigint[];
            erc1155Tokens: readonly `0x${string}`[];
            erc1155TokenIds: readonly bigint[];
            erc1155Amounts: readonly bigint[];
            payee: `0x${string}`;
        };
        collectEscrow: (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => Promise<`0x${string}`>;
        reclaimExpired: (buyAttestation: `0x${string}`) => Promise<`0x${string}`>;
        buyWithBundle: (price: TokenBundle, item: Demand, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payWithBundle: (price: TokenBundle, payee: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyBundleForBundle: (bid: TokenBundle, ask: TokenBundle, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payBundleForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        approve: (bundle: TokenBundle, purpose: ApprovalPurpose) => Promise<`0x${string}`[]>;
        buyBundleWithNative: (bidAmount: bigint, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        payNativeForBundle: (buyAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
    };
    /** Methods for interacting with attestations */
    attestation: {
        encodeEscrowObligation: (data: {
            attestation: {
                schema: `0x${string}`;
                data: {
                    recipient: `0x${string}`;
                    expirationTime: bigint;
                    revocable: boolean;
                    refUID: `0x${string}`;
                    data: `0x${string}`;
                    value: bigint;
                };
            };
            arbiter: `0x${string}`;
            demand: `0x${string}`;
        }) => `0x${string}`;
        encodeEscrow2Obligation: (data: {
            attestationUid: `0x${string}`;
            arbiter: `0x${string}`;
            demand: `0x${string}`;
        }) => `0x${string}`;
        decodeEscrowObligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            attestation: {
                schema: `0x${string}`;
                data: {
                    recipient: `0x${string}`;
                    expirationTime: bigint;
                    revocable: boolean;
                    refUID: `0x${string}`;
                    data: `0x${string}`;
                    value: bigint;
                };
            };
        } | undefined;
        decodeEscrow2Obligation: (obligationData: `0x${string}`) => {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            attestationUid: `0x${string}`;
        } | undefined;
        getEscrowSchema: () => Promise<`0x${string}`>;
        getEscrow2Schema: () => Promise<`0x${string}`>;
        getEscrowObligation: (uid: `0x${string}`) => Promise<{
            data: {
                arbiter: `0x${string}`;
                demand: `0x${string}`;
                attestation: {
                    schema: `0x${string}`;
                    data: {
                        recipient: `0x${string}`;
                        expirationTime: bigint;
                        revocable: boolean;
                        refUID: `0x${string}`;
                        data: `0x${string}`;
                        value: bigint;
                    };
                };
            } | undefined;
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
        getEscrow2Obligation: (uid: `0x${string}`) => Promise<{
            data: {
                arbiter: `0x${string}`;
                demand: `0x${string}`;
                attestationUid: `0x${string}`;
            } | undefined;
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
        buyWithAttestation: (attestation: {
            schema: `0x${string}`;
            data: {
                recipient: `0x${string}`;
                expirationTime: bigint;
                revocable: boolean;
                refUID: `0x${string}`;
                data: `0x${string}`;
                value: bigint;
            };
        }, item: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
        }, expiration?: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        collectEscrow: (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        buyWithAttestation2: (attestationUid: `0x${string}`, item: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
        }, expiration?: bigint) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        collectEscrow2: (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        registerSchema: (schema: string, resolver: `0x${string}`, revocable: boolean) => Promise<`0x${string}`>;
        createAttestation: (schema: `0x${string}`, recipient: `0x${string}`, expirationTime: bigint, revocable: boolean, refUID: `0x${string}`, data: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        attestAndCreateEscrow: (attestation: {
            schema: `0x${string}`;
            data: {
                recipient: `0x${string}`;
                expirationTime: bigint;
                revocable: boolean;
                refUID: `0x${string}`;
                data: `0x${string}`;
                value: bigint;
            };
        }, escrow: {
            arbiter: `0x${string}`;
            demand: `0x${string}`;
            expirationTime: bigint;
        }) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
    };
    /** Utilities for StringObligation */
    stringObligation: {
        encode: (data: {
            item: string;
        }) => `0x${string}`;
        decode: (obligationData: `0x${string}`) => {
            item: string;
        };
        decodeJson: <T>(obligationData: `0x${string}`) => T;
        decodeZod: <TSchema extends zod.ZodType, TAsync extends boolean = false, TSafe extends boolean = false>(obligationData: `0x${string}`, schema: TSchema, schemaOptions?: Partial<zod.ParseParams>, parseOptions?: {
            async: TAsync;
            safe: TSafe;
        }) => TSafe extends true ? TAsync extends true ? Promise<zod.SafeParseReturnType<zod.TypeOf<TSchema>, zod.TypeOf<TSchema>>> : zod.SafeParseReturnType<zod.TypeOf<TSchema>, zod.TypeOf<TSchema>> : TAsync extends true ? Promise<zod.TypeOf<TSchema>> : zod.TypeOf<TSchema>;
        decodeArkType: <Schema extends arktype.Type<any, any>>(obligationData: `0x${string}`, schema: Schema) => Schema["inferOut"];
        doObligation: (item: string, refUID?: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        doObligationJson: <T>(item: T, refUid?: `0x${string}`) => Promise<{
            hash: `0x${string}`;
            attested: any;
        }>;
        getSchema: () => Promise<`0x${string}`>;
        getObligation: (uid: `0x${string}`) => Promise<{
            data: {
                item: string;
            };
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
        getJsonObligation: <T>(uid: `0x${string}`) => Promise<{
            data: {
                item: T;
            };
            uid: `0x${string}`;
            schema: `0x${string}`;
            time: bigint;
            expirationTime: bigint;
            revocationTime: bigint;
            refUID: `0x${string}`;
            recipient: `0x${string}`;
            attester: `0x${string}`;
            revocable: boolean;
        }>;
    };
    oracle: {
        requestArbitration: (obligationUid: `0x${string}`, oracle: abitype.Address) => Promise<`0x${string}`>;
        getArbitrationRequests: (options?: ArbitrateOptions$1) => Promise<Attestation[]>;
        arbitratePast: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions$1) => Promise<Decision$1[]>;
        listenAndArbitrate: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions$1 & {
            onAfterArbitrate?: (decision: Decision$1) => Promise<void>;
            pollingInterval?: number;
        }) => Promise<ListenAndArbitrateResult$1>;
        waitForArbitration: (obligationUid: `0x${string}`, oracle: abitype.Address, pollingInterval?: number) => Promise<{
            obligation: `0x${string}`;
            oracle: abitype.Address;
            decision: boolean;
        }>;
    };
};

/**
 * Static encoding/decoding utilities for AllArbiter demands
 * These functions don't require client instantiation since they only handle data transformation
 */
declare const AllArbiterCodec: {
    /**
     * Encodes AllArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    readonly encode: (demand: {
        arbiters: `0x${string}`[];
        demands: `0x${string}`[];
    }) => `0x${string}`;
    /**
     * Decodes AllArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    readonly decode: (demandData: `0x${string}`) => {
        arbiters: readonly `0x${string}`[];
        demands: readonly `0x${string}`[];
    };
};

/**
 * Static encoding/decoding utilities for AnyArbiter demands
 * These functions don't require client instantiation since they only handle data transformation
 */
declare const AnyArbiterCodec: {
    /**
     * Encodes AnyArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    readonly encode: (demand: {
        arbiters: `0x${string}`[];
        demands: `0x${string}`[];
    }) => `0x${string}`;
    /**
     * Decodes AnyArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    readonly decode: (demandData: `0x${string}`) => {
        arbiters: readonly `0x${string}`[];
        demands: readonly `0x${string}`[];
    };
};

/**
 * Hierarchical Arbiters Client
 *
 * Provides a structured, object-oriented interface for all arbiter functionality.
 *
 * New API structure:
 * - client.arbiters.general.intrinsics2.encode(...)
 * - client.arbiters.general.trustedParty.decode(...)
 * - client.arbiters.logical.any.encode(...)
 * - client.arbiters.logical.all.decode(...)
 * - client.arbiters.attestation.recipient.composing.encode(...)
 * - client.arbiters.attestation.schema.nonComposing.decode(...)
 *
 * Also maintains backward compatibility with flat method names.
 */
declare const makeArbitersClient: (viemClient: ViemClient, addresses: ChainAddresses) => {
    general: {
        intrinsics2: {
            encode: (demand: {
                schema: `0x${string}`;
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                schema: `0x${string}`;
            };
        };
        trustedParty: {
            encode: (demand: {
                baseArbiter: `0x${string}`;
                baseDemand: `0x${string}`;
                creator: `0x${string}`;
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                baseArbiter: `0x${string}`;
                baseDemand: `0x${string}`;
                creator: `0x${string}`;
            };
        };
        specificAttestation: {
            encode: (demand: {
                uid: `0x${string}`;
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                uid: `0x${string}`;
            };
        };
        trustedOracle: {
            encode: (demand: {
                oracle: `0x${string}`;
                data: `0x${string}`;
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                oracle: `0x${string}`;
                data: `0x${string}`;
            };
            arbitrate: (obligation: `0x${string}`, decision: boolean) => Promise<`0x${string}`>;
            requestArbitration: (obligationUid: `0x${string}`, oracle: abitype.Address) => Promise<`0x${string}`>;
            checkExistingArbitration: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<{
                obligation: `0x${string}`;
                oracle: `0x${string}`;
                decision: boolean;
            } | undefined>;
            waitForArbitration: (obligation: `0x${string}`, oracle: `0x${string}`, pollingInterval?: number) => Promise<{
                obligation?: `0x${string}` | undefined;
                oracle?: `0x${string}` | undefined;
                decision?: boolean | undefined;
            }>;
            waitForArbitrationRequest: (obligation: `0x${string}`, oracle: `0x${string}`, pollingInterval?: number) => Promise<{
                obligation?: `0x${string}` | undefined;
                oracle?: `0x${string}` | undefined;
            }>;
            listenForArbitrationRequestsOnly: (oracle: `0x${string}`, arbitrationHandler: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<boolean>, pollingInterval?: number) => viem.WatchEventReturnType;
            getArbitrationRequests: (options?: ArbitrateOptions) => Promise<Attestation[]>;
            arbitratePast: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions) => Promise<Decision[]>;
            listenAndArbitrate: (arbitrate: (attestation: Attestation) => Promise<boolean | null>, options?: ArbitrateOptions & {
                onAfterArbitrate?: (decision: Decision) => Promise<void>;
                pollingInterval?: number;
            }) => Promise<ListenAndArbitrateResult>;
        };
    };
    logical: {
        any: {
            encode: (demand: {
                arbiters: `0x${string}`[];
                demands: `0x${string}`[];
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                arbiters: readonly `0x${string}`[];
                demands: readonly `0x${string}`[];
            };
        };
        all: {
            encode: (demand: {
                arbiters: `0x${string}`[];
                demands: `0x${string}`[];
            }) => `0x${string}`;
            decode: (demandData: `0x${string}`) => {
                arbiters: readonly `0x${string}`[];
                demands: readonly `0x${string}`[];
            };
        };
    };
    attestation: {
        attester: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    attester: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    attester: `0x${string}`;
                };
            };
            nonComposing: {
                encode: (demand: {
                    attester: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    attester: `0x${string}`;
                };
            };
        };
        recipient: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    recipient: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    recipient: `0x${string}`;
                };
            };
            nonComposing: {
                encode: (demand: {
                    recipient: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    recipient: `0x${string}`;
                };
            };
        };
        schema: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    schema: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    schema: `0x${string}`;
                };
            };
            nonComposing: {
                encode: (demand: {
                    schema: `0x${string}`;
                }) => `0x${string}`;
                decode: (demandData: `0x${string}`) => {
                    schema: `0x${string}`;
                };
            };
        };
        time: {
            after: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        time: bigint;
                    };
                };
            };
            before: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        time: bigint;
                    };
                };
            };
            equal: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        time: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        time: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        time: bigint;
                    };
                };
            };
        };
        uid: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    uid: `0x${string}`;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    uid: `0x${string}`;
                };
            };
            nonComposing: {
                encode: (demand: {
                    uid: `0x${string}`;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    uid: `0x${string}`;
                };
            };
        };
        revocable: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    revocable: boolean;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    revocable: boolean;
                };
            };
            nonComposing: {
                encode: (demand: {
                    revocable: boolean;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    revocable: boolean;
                };
            };
        };
        refUid: {
            composing: {
                encode: (demand: {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    refUID: `0x${string}`;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    baseArbiter: `0x${string}`;
                    baseDemand: `0x${string}`;
                    refUID: `0x${string}`;
                };
            };
            nonComposing: {
                encode: (demand: {
                    refUID: `0x${string}`;
                }) => `0x${string}`;
                decode: (data: `0x${string}`) => {
                    refUID: `0x${string}`;
                };
            };
        };
        expirationTime: {
            after: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        expirationTime: bigint;
                    };
                };
            };
            before: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        expirationTime: bigint;
                    };
                };
            };
            equal: {
                composing: {
                    encode: (demand: {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        baseArbiter: `0x${string}`;
                        baseDemand: `0x${string}`;
                        expirationTime: bigint;
                    };
                };
                nonComposing: {
                    encode: (demand: {
                        expirationTime: bigint;
                    }) => `0x${string}`;
                    decode: (data: `0x${string}`) => {
                        expirationTime: bigint;
                    };
                };
            };
        };
    };
};

declare const contractAddresses: Record<string, ChainAddresses>;
declare const supportedChains: string[];

type Extended = {
    [key: string]: unknown;
};
type ExtendableClient<T extends object, TExtended extends Extended | undefined = undefined> = T & (TExtended extends Extended ? TExtended : object) & {
    extend<U extends Extended>(extender: (client: T & (TExtended extends Extended ? TExtended : object)) => U): ExtendableClient<T, U & (TExtended extends Extended ? TExtended : object)>;
};
type MinimalClient = ExtendableClient<{
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
    waitForFulfillment: (contractAddress: `0x${string}`, buyAttestation: `0x${string}`, pollingInterval?: number) => Promise<{
        payment?: `0x${string}` | undefined;
        fulfillment?: `0x${string}` | undefined;
        fulfiller?: `0x${string}` | undefined;
    }>;
    extractObligationData: <ObligationData extends readonly AbiParameter[]>(obligationAbi: ObligationData, attestation: {
        data: `0x${string}`;
    }) => DecodeAbiParametersReturnType<ObligationData>;
    getEscrowAttestation: (fulfillment: {
        refUID: `0x${string}`;
    }) => ReturnType<typeof getAttestation>;
    extractDemandData: <DemandData extends readonly AbiParameter[]>(demandAbi: DemandData, escrowAttestation: {
        data: `0x${string}`;
    }) => DecodeAbiParametersReturnType<DemandData>;
    getEscrowAndDemand: <DemandData extends readonly AbiParameter[]>(demandAbi: DemandData, fulfillment: {
        refUID: `0x${string}`;
    }) => Promise<[Awaited<ReturnType<typeof getAttestation>>, DecodeAbiParametersReturnType<DemandData>]>;
}>;
type AlkahestClient = MinimalClient & ReturnType<typeof makeDefaultExtension> & {
    extend: MinimalClient["extend"];
};
declare function makeExtendableClient<T extends object, TExtended extends Extended | undefined = undefined>(base: T): ExtendableClient<T, TExtended>;
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
declare const makeClient: (walletClient: WalletClient<Transport, Chain, Account>, contractAddresses?: Partial<ChainAddresses>) => AlkahestClient;
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
declare const makeMinimalClient: (walletClient: WalletClient<Transport, Chain, Account>, contractAddresses?: Partial<ChainAddresses>) => MinimalClient;

export { type AlkahestClient, AllArbiterCodec, AnyArbiterCodec, type ApprovalPurpose, type ArbiterDemandParser, ArbiterRegistry, type Attestation, type AttestationFilters, type BatchFilters, type BlockFilters, type ChainAddresses, type Demand, DemandParsingRegistry, DemandParsingUtils, type Eip2612Props, type EnhancedArbitrateFilters, type Erc1155, type Erc20, type Erc721, type EthArbitrationContext, type EthArbitrationRequest, type EthArbitrationResult, type EthBalanceArbitrationRequest, type EthTransferArbitrationRequest, type MinimalClient, type NativeTokenArbitrationContext, type NativeTokenArbitrationRequest, type NativeTokenArbitrationResult, type NativeTokenBalanceArbitrationRequest, type NativeTokenEscrowArbitrationRequest, type NativeTokenPaymentArbitrationRequest, type NativeTokenTransferArbitrationRequest, type ParsedDemand, type PerformanceFilters, type PermitSignature, type SignPermitProps, type TimeFilters, type TokenBundle, type TokenBundleFlat, TrustedOracleArbiterCodec, type ViemClient, contractAddresses, createComposingArbiterCodec, createFullArbiterRegistry, createNonComposingArbiterCodec, flattenTokenBundle, getAttestation, getAttestedEventFromTxHash, getOptimalPollingInterval, isWebSocketTransport, makeArbitersClient, makeClient, makeDefaultExtension, makeMinimalClient, readContract, supportedChains, writeContract };
