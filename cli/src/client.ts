import { createWalletClient, http, type Account, type Chain } from "viem";
import { makeClient, type AlkahestClient } from "../../sdks/ts/src/index.ts";
import type { ChainAddresses } from "../../sdks/ts/src/types.ts";
import { readFileSync } from "node:fs";

export function createAlkahestClient(
  account: Account,
  chain: Chain,
  rpcUrl?: string,
  contractAddresses?: Partial<ChainAddresses>,
): AlkahestClient {
  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(rpcUrl),
  });

  return makeClient(walletClient, contractAddresses);
}

export function loadAddresses(path?: string): Partial<ChainAddresses> | undefined {
  if (!path) return undefined;
  return JSON.parse(readFileSync(path, "utf-8"));
}
