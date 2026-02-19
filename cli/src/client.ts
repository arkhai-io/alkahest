import { createWalletClient, http, type Account, type Chain } from "viem";
import { makeClient, type AlkahestClient } from "../../sdks/ts/src/index.ts";

export function createAlkahestClient(
  account: Account,
  chain: Chain,
  rpcUrl?: string,
): AlkahestClient {
  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(rpcUrl),
  });

  return makeClient(walletClient);
}
