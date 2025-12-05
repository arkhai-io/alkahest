import { type Address, type BlockNumber, type BlockTag, parseAbiItem } from "viem";
import { abi as trustedOracleArbiterAbi } from "../contracts/TrustedOracleArbiter";
import type { Attestation, ChainAddresses } from "../types";
import { getAttestation, getOptimalPollingInterval, type ViemClient } from "../utils";

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

export type Decision = {
  hash: `0x${string}`;
  attestation: Attestation;
  decision: boolean;
};

export type ListenAndArbitrateResult = {
  decisions: Decision[];
  unwatch: () => void;
};

export const makeOracleClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const arbitrationRequestedEvent = parseAbiItem(
    "event ArbitrationRequested(bytes32 indexed obligation, address indexed oracle)",
  );
  const arbitrationMadeEvent = parseAbiItem(
    "event ArbitrationMade(bytes32 indexed obligation, address indexed oracle, bool decision)",
  );

  const arbitrateOnchain = async (obligationUid: `0x${string}`, decision: boolean) =>
    await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "arbitrate",
      args: [obligationUid, decision],
      account: viemClient.account,
      chain: viemClient.chain,
    });

  /**
   * Request arbitration for an obligation
   */
  const requestArbitration = async (obligationUid: `0x${string}`, oracle: Address) => {
    return await viemClient.writeContract({
      address: addresses.trustedOracleArbiter,
      abi: trustedOracleArbiterAbi.abi,
      functionName: "requestArbitration",
      args: [obligationUid, oracle],
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
   */
  const arbitratePast = async (
    arbitrate: (attestation: Attestation) => Promise<boolean | null>,
    options: ArbitrateOptions = {},
  ): Promise<Decision[]> => {
    const attestations = await getArbitrationRequests(options);

    // Process arbitration sequentially to avoid nonce conflicts
    const decisions: (Decision | null)[] = [];
    for (const attestation of attestations) {
      const decision = await arbitrate(attestation);
      if (decision === null) {
        decisions.push(null);
        continue;
      }

      const hash = await arbitrateOnchain(attestation.uid, decision);
      decisions.push({ hash, attestation, decision });
    }

    // Wait for all transactions to be mined in parallel
    const validDecisions = decisions.filter((d) => d !== null) as Decision[];
    await Promise.all(validDecisions.map((d) => viemClient.waitForTransactionReceipt({ hash: d.hash })));

    return validDecisions;
  };

  /**
   * Listen for new arbitration requests and arbitrate them
   */
  const listenAndArbitrate = async (
    arbitrate: (attestation: Attestation) => Promise<boolean | null>,
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

            const _decision = await arbitrate(attestation);
            if (_decision === null) return;

            const hash = await arbitrateOnchain(attestation.uid, _decision);

            const decision = {
              hash,
              attestation,
              decision: _decision,
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

  /**
   * Wait for an arbitration decision to be made for a specific obligation
   * Useful for claiming escrow after arbitration is complete
   */
  const waitForArbitration = async (
    obligationUid: `0x${string}`,
    oracle: Address,
    pollingInterval?: number,
  ): Promise<{
    obligation: `0x${string}`;
    oracle: Address;
    decision: boolean;
  }> => {
    // First check if arbitration already exists
    const existingLogs = await viemClient.getLogs({
      address: addresses.trustedOracleArbiter,
      event: arbitrationMadeEvent,
      args: {
        obligation: obligationUid,
        oracle,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    });

    if (existingLogs.length > 0) {
      return existingLogs[0]!.args as {
        obligation: `0x${string}`;
        oracle: Address;
        decision: boolean;
      };
    }

    // Use optimal polling interval based on transport type
    const optimalInterval = getOptimalPollingInterval(viemClient, pollingInterval ?? 1000);

    // Wait for new arbitration to be made
    return new Promise((resolve) => {
      const unwatch = viemClient.watchEvent({
        address: addresses.trustedOracleArbiter,
        event: arbitrationMadeEvent,
        args: {
          obligation: obligationUid,
          oracle,
        },
        pollingInterval: optimalInterval,
        onLogs: (logs) => {
          if (logs.length > 0 && logs[0]) {
            resolve(logs[0].args as {
              obligation: `0x${string}`;
              oracle: Address;
              decision: boolean;
            });
            unwatch();
          }
        },
      });
    });
  };

  return {
    requestArbitration,
    getArbitrationRequests,
    arbitratePast,
    listenAndArbitrate,
    waitForArbitration,
  };
};
