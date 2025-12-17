import { type Account, type Chain, type PublicActions, parseEventLogs, type Transport, type WalletClient } from "viem";
import { contractAddresses } from "./config";
import { abi as easAbi, abi as iEasAbi } from "./contracts/IEAS";
import type { ChainAddresses, TokenBundle, TokenBundleFlat } from "./types";

export type ViemClient = WalletClient<Transport, Chain, Account> & PublicActions;

/**
 * Detect if the viem client is using WebSocket transport
 * @param viemClient - The viem client
 * @returns true if using WebSocket transport, false otherwise
 */
export const isWebSocketTransport = (viemClient: ViemClient): boolean => {
  // Check if the transport has subscription capabilities
  // WebSocket transports typically have a subscribe method
  const transport = viemClient.transport;
  return (
    transport.type === "webSocket" ||
    // Additional check for subscription capabilities
    (typeof transport === "object" && transport !== null && "subscribe" in transport)
  );
};

/**
 * Get optimal polling interval based on transport type
 * @param viemClient - The viem client
 * @param defaultInterval - Default polling interval for HTTP
 * @returns optimal polling interval or undefined for WebSocket
 */
export const getOptimalPollingInterval = (
  viemClient: ViemClient,
  defaultInterval: number = 1000,
): number | undefined => {
  // For WebSocket transports, return undefined to use subscription-based watching
  // For HTTP transports, return the polling interval
  return isWebSocketTransport(viemClient) ? undefined : defaultInterval;
};

export const getAttestation = async (
  viemClient: ViemClient,
  uid: `0x${string}`,
  addresses?: Pick<ChainAddresses, "eas">,
) => {
  // Try to use provided addresses first, then fall back to chain name lookup
  const easAddress = addresses?.eas ?? contractAddresses[viemClient.chain.name]?.eas;
  if (!easAddress) {
    throw new Error(`No EAS address found for chain ${viemClient.chain.name}`);
  }

  const attestation = await viemClient.readContract({
    address: easAddress,
    abi: easAbi.abi,
    functionName: "getAttestation",
    args: [uid],
    authorizationList: undefined,
  });
  return attestation;
};

export const getAttestedEventFromTxHash = async (client: ViemClient, hash: `0x${string}`): Promise<any> => {
  let tx;
  try {
    tx = await client.waitForTransactionReceipt({ hash });
  } catch (error) {
    throw new Error(`Failed to get transaction receipt for ${hash}: ${error}`);
  }
  const events = parseEventLogs({
    abi: iEasAbi.abi,
    eventName: "Attested",
    logs: tx.logs,
  });

  if (events.length === 0 || !events[0]) {
    throw new Error(`No Attested event found in transaction ${hash}`);
  }

  return events[0].args;
};

export const flattenTokenBundle = (bundle: TokenBundle): TokenBundleFlat => ({
  nativeAmount: 0n,
  erc20Tokens: bundle.erc20s.map((x) => x.address),
  erc20Amounts: bundle.erc20s.map((x) => x.value),
  erc721Tokens: bundle.erc721s.map((x) => x.address),
  erc721TokenIds: bundle.erc721s.map((x) => x.id),
  erc1155Tokens: bundle.erc1155s.map((x) => x.address),
  erc1155TokenIds: bundle.erc1155s.map((x) => x.id),
  erc1155Amounts: bundle.erc1155s.map((x) => x.value),
});

// Export demand parsing utilities
export * from "./utils/demandParsing";

/**
 * Wrapper for viemClient.writeContract that adds required chain parameter
 */
export const writeContract = async (
  viemClient: ViemClient,
  params: Parameters<ViemClient["writeContract"]>[0]
) => {
  return viemClient.writeContract({
    ...params,
    chain: viemClient.chain,
  });
};

/**
 * Wrapper for viemClient.readContract that adds required authorizationList parameter
 */
export const readContract = async <T>(
  viemClient: ViemClient,
  params: Parameters<ViemClient["readContract"]>[0]
): Promise<T> => {
  return viemClient.readContract({
    ...params,
    authorizationList: undefined,
  }) as Promise<T>;
};

// Re-export demand parsing utilities
export { ArbiterRegistry, type ArbiterDemandParser, type ParsedDemand, DemandParsingUtils } from "./utils/demandParsing";
