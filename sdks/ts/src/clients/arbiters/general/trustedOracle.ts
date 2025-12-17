import { type Address, type BlockNumber, type BlockTag, decodeAbiParameters, encodeAbiParameters, getAbiItem, parseAbiItem } from "viem";
import { abi as trustedOracleArbiterAbi } from "../../../contracts/arbiters/TrustedOracleArbiter";
import type { Attestation, ChainAddresses } from "../../../types";
import { getAttestation, getOptimalPollingInterval, type ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const trustedOracleArbiterDecodeDemandFunction = getAbiItem({
  abi: trustedOracleArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const trustedOracleArbiterDemandDataType = trustedOracleArbiterDecodeDemandFunction.outputs[0];

/**
 * TrustedOracleArbiter DemandData type
 */
export type TrustedOracleArbiterDemandData = {
  oracle: `0x${string}`;
  data: `0x${string}`;
};

/**
 * Encodes TrustedOracleArbiter.DemandData to bytes.
 * @param demand - struct DemandData {address oracle, bytes data}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: TrustedOracleArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([trustedOracleArbiterDemandDataType], [demand]);
};

/**
 * Decodes TrustedOracleArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): TrustedOracleArbiterDemandData => {
  return decodeAbiParameters([trustedOracleArbiterDemandDataType], demandData)[0] as TrustedOracleArbiterDemandData;
};

/**
 * Options for arbitration
 */
export type ArbitrateOptions = {
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

export type ArbitrationResult = {
  decision: boolean;
  demand: `0x${string}`;
};

export type Decision = {
  hash: `0x${string}`;
  attestation: Attestation;
  decision: boolean;
};

export type ListenAndArbitrateResult = {
  decisions: Decision[];
  unwatch: () => void;
};

/**
 * TrustedOracleArbiter Client
 *
 * Handles oracle-based decision making with arbitration requests.
 * This arbiter allows for external oracles to make decisions on attestation validity.
 * 
 * Features:
 * - Request arbitration from specific oracles
 * - Listen for arbitration requests
 * - Submit arbitration decisions
 * - Wait for arbitration results
 * - Automated arbitration workflows
 */
export const makeTrustedOracleArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  // Cache the parsed event ABIs to avoid re-parsing on each call
  const arbitrationMadeEvent = parseAbiItem(
    "event ArbitrationMade(bytes32 indexed obligation, address indexed oracle, bool decision)",
  );

  const arbitrationRequestedEvent = parseAbiItem(
    "event ArbitrationRequested(bytes32 indexed obligation, address indexed oracle)",
  );

  const arbitrateOnchain = async (obligationUid: `0x${string}`, demand: `0x${string}`, decision: boolean) =>
    await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [obligationUid, demand, decision],
      account: viemClient.account,
      chain: viemClient.chain,
    });

  /**
   * Request arbitration for an obligation
   */
  const requestArbitration = async (obligationUid: `0x${string}`, oracle: Address, demand: `0x${string}`) => {
    return await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "requestArbitration",
      args: [obligationUid, oracle, demand],
      account: viemClient.account,
      chain: viemClient.chain,
    });
  };

  /**
   * Get arbitration requests for the current oracle
   */
  const getArbitrationRequests = async (options: ArbitrateOptions = {}): Promise<Attestation[]> => {
    const logs = await viemClient.getLogs({
      address: addresses.trustedOracleArbiter,
      event: arbitrationRequestedEvent,
      args: {
        oracle: viemClient.account.address,
      },
      fromBlock: options.fromBlock || "earliest",
      toBlock: options.toBlock || "latest",
    });

    const attestations = await Promise.all(
      logs.map(async (log) => await getAttestation(viemClient, log.args.obligation!, addresses)),
    );

    // Filter out expired or revoked attestations
    const now = BigInt(Math.floor(Date.now() / 1000));
    const validAttestations = attestations.filter(
      (attestation) =>
        (attestation.expirationTime === BigInt(0) || attestation.expirationTime >= now) &&
        (attestation.revocationTime === BigInt(0) || attestation.revocationTime >= now),
    );

    if (options.skipAlreadyArbitrated) {
      // Filter out already arbitrated attestations
      const filteredAttestations = await Promise.all(
        validAttestations.map(async (attestation) => {
          const existingLogs = await viemClient.getLogs({
            address: addresses.trustedOracleArbiter,
            event: arbitrationMadeEvent,
            args: {
              obligation: attestation.uid,
              oracle: viemClient.account.address,
            },
            fromBlock: "earliest",
            toBlock: "latest",
          });

          return existingLogs.length === 0 ? attestation : null;
        }),
      );

      return filteredAttestations.filter((a) => a !== null) as Attestation[];
    }

    return validAttestations;
  };

  /**
   * Arbitrate past attestations
   * @param arbitrate - Callback that returns {decision, demand} for each attestation, or null to skip
   */
  const arbitratePast = async (
    arbitrate: (attestation: Attestation) => Promise<ArbitrationResult | null>,
    options: ArbitrateOptions = {},
  ): Promise<Decision[]> => {
    const attestations = await getArbitrationRequests(options);

    const decisions = await Promise.all(
      attestations.map(async (attestation) => {
        const result = await arbitrate(attestation);
        if (result === null) return null;

        const hash = await arbitrateOnchain(attestation.uid, result.demand, result.decision);
        return { hash, attestation, decision: result.decision };
      }),
    );

    return decisions.filter((d) => d !== null) as Decision[];
  };

  /**
   * Listen for new arbitration requests and arbitrate them
   * @param arbitrate - Callback that returns {decision, demand} for each attestation, or null to skip
   */
  const listenAndArbitrate = async (
    arbitrate: (attestation: Attestation) => Promise<ArbitrationResult | null>,
    options: ArbitrateOptions & {
      onAfterArbitrate?: (decision: Decision) => Promise<void>;
      pollingInterval?: number;
    } = {},
  ): Promise<ListenAndArbitrateResult> => {
    // Arbitrate past attestations if not onlyNew
    const decisions = options.onlyNew ? [] : await arbitratePast(arbitrate, options);

    // Use optimal polling interval based on transport type
    const optimalInterval = getOptimalPollingInterval(viemClient, options.pollingInterval);

    // Listen for new arbitration requests
    const unwatch = viemClient.watchEvent({
      address: addresses.trustedOracleArbiter,
      event: arbitrationRequestedEvent,
      args: {
        oracle: viemClient.account.address,
      },
      onLogs: async (logs) => {
        await Promise.all(
          logs.map(async (log) => {
            const attestation = await getAttestation(viemClient, log.args.obligation!, addresses);

            // Check if already arbitrated if skipAlreadyArbitrated is enabled
            if (options.skipAlreadyArbitrated) {
              const existingLogs = await viemClient.getLogs({
                address: addresses.trustedOracleArbiter,
                event: arbitrationMadeEvent,
                args: {
                  obligation: attestation.uid,
                  oracle: viemClient.account.address,
                },
                fromBlock: "earliest",
                toBlock: "latest",
              });

              if (existingLogs.length > 0) {
                return; // Skip if already arbitrated
              }
            }

            const result = await arbitrate(attestation);
            if (result === null) return;

            const hash = await arbitrateOnchain(attestation.uid, result.demand, result.decision);

            const decision = {
              hash,
              attestation,
              decision: result.decision,
            };

            if (options.onAfterArbitrate) {
              await options.onAfterArbitrate(decision);
            }
          }),
        );
      },
      pollingInterval: optimalInterval,
    });

    return { decisions, unwatch };
  };

  return {
    encodeDemand,
    decodeDemand,

    /**
     * Arbitrate on the validity of an obligation fulfilling a demand
     * @param obligation - bytes32 obligation
     * @param demand - bytes demand data
     * @param decision - bool decision
     * @returns transaction hash
     */
    arbitrate: async (obligation: `0x${string}`, demand: `0x${string}`, decision: boolean) => {
      const hash = await viemClient.writeContract({
        address: addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "arbitrate",
        args: [obligation, demand, decision],
      });
      return hash;
    },

    /**
     * Request arbitration on an obligation from TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle to request arbitration from
     * @returns transaction hash
     */
    requestArbitration,

    /**
     * Check if an arbitration has already been made for a specific obligation by a specific oracle
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle
     * @returns the arbitration result if exists, undefined if not
     */
    checkExistingArbitration: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
    ): Promise<
      | {
        obligation: `0x${string}`;
        oracle: `0x${string}`;
        decision: boolean;
      }
      | undefined
    > => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { obligation, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length > 0 && logs[0]) {
        return logs[0].args as {
          obligation: `0x${string}`;
          oracle: `0x${string}`;
          decision: boolean;
        };
      }

      return undefined;
    },

    /**
     * Wait for an arbitration to be made on a TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns the event args
     */
    waitForArbitration: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      obligation?: `0x${string}` | undefined;
      oracle?: `0x${string}` | undefined;
      decision?: boolean | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: { obligation, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length && logs[0]) return logs[0].args;

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: addresses.trustedOracleArbiter,
          event: arbitrationMadeEvent,
          args: { obligation, oracle },
          pollingInterval: optimalInterval,
          onLogs: (logs) => {
            if (logs[0]) {
              resolve(logs[0].args);
              unwatch();
            }
          },
          fromBlock: 1n,
        });
      });
    },

    /**
     * Wait for an arbitration request to be made on a TrustedOracleArbiter
     * @param obligation - bytes32 obligation uid
     * @param oracle - address of the oracle
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns the event args
     */
    waitForArbitrationRequest: async (
      obligation: `0x${string}`,
      oracle: `0x${string}`,
      pollingInterval?: number,
    ): Promise<{
      obligation?: `0x${string}` | undefined;
      oracle?: `0x${string}` | undefined;
    }> => {
      const logs = await viemClient.getLogs({
        address: addresses.trustedOracleArbiter,
        event: arbitrationRequestedEvent,
        args: { obligation, oracle },
        fromBlock: "earliest",
        toBlock: "latest",
      });

      if (logs.length && logs[0]) return logs[0].args;

      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return new Promise((resolve) => {
        const unwatch = viemClient.watchEvent({
          address: addresses.trustedOracleArbiter,
          event: arbitrationRequestedEvent,
          args: { obligation, oracle },
          pollingInterval: optimalInterval,
          onLogs: (logs) => {
            if (logs[0]) {
              resolve(logs[0].args);
              unwatch();
            }
          },
          fromBlock: 1n,
        });
      });
    },

    /**
     * Listen for arbitration requests and only arbitrate on request
     * This function continuously listens for ArbitrationRequested events
     * and calls the provided arbitration handler for each request
     * @param oracle - address of the oracle (filter for requests to this oracle)
     * @param arbitrationHandler - function to handle arbitration requests, returns {decision, demand}
     * @param pollingInterval - polling interval in milliseconds (default: 1000)
     * @returns unwatch function to stop listening
     */
    listenForArbitrationRequestsOnly: (
      oracle: `0x${string}`,
      arbitrationHandler: (obligation: `0x${string}`, oracle: `0x${string}`) => Promise<ArbitrationResult>,
      pollingInterval?: number,
    ) => {
      // Use optimal polling interval based on transport type
      const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

      return viemClient.watchEvent({
        address: addresses.trustedOracleArbiter,
        event: arbitrationRequestedEvent,
        args: { oracle },
        pollingInterval: optimalInterval,
        onLogs: async (logs) => {
          for (const log of logs) {
            const { obligation: requestedObligation, oracle: requestedOracle } = log.args;
            if (requestedObligation && requestedOracle) {
              try {
                // Call the arbitration handler to get the decision and demand
                const result = await arbitrationHandler(requestedObligation, requestedOracle);

                // Submit the arbitration
                await viemClient.writeContract({
                  address: addresses.trustedOracleArbiter,
                  abi: trustedOracleArbiterAbi.abi,
                  functionName: "arbitrate",
                  args: [requestedObligation, result.demand, result.decision],
                });
              } catch (error) {
                console.error(`Failed to arbitrate for obligation ${requestedObligation}:`, error);
              }
            }
          }
        },
        fromBlock: 1n,
      });
    },

    // Oracle-specific functions (from oracle.ts)
    getArbitrationRequests,
    arbitratePast,
    listenAndArbitrate,
  };
};