import { type Account, type LocalAccount, toAccount } from "viem/accounts";
import { privateKeyToAccount, mnemonicToAccount } from "viem/accounts";
import { nonceManager } from "viem";

export interface AuthOptions {
  privateKey?: string;
  mnemonic?: string;
  ledger?: boolean;
  ledgerPath?: string;
}

export async function resolveAccount(opts: AuthOptions): Promise<Account> {
  // 1. --private-key flag
  if (opts.privateKey) {
    return privateKeyToAccount(opts.privateKey as `0x${string}`, { nonceManager });
  }

  // 2. --mnemonic flag
  if (opts.mnemonic) {
    return mnemonicToAccount(opts.mnemonic, { nonceManager });
  }

  // 3. --ledger flag
  if (opts.ledger) {
    return await createLedgerAccount(opts.ledgerPath);
  }

  // 4-6. Environment variables
  const envPrivateKey = process.env.ALKAHEST_PRIVATE_KEY || process.env.PRIVATE_KEY;
  if (envPrivateKey) {
    return privateKeyToAccount(envPrivateKey as `0x${string}`, { nonceManager });
  }

  const envMnemonic = process.env.ALKAHEST_MNEMONIC;
  if (envMnemonic) {
    return mnemonicToAccount(envMnemonic, { nonceManager });
  }

  throw new Error(
    "No account provided. Use --private-key, --mnemonic, --ledger, " +
      "or set ALKAHEST_PRIVATE_KEY / ALKAHEST_MNEMONIC / PRIVATE_KEY env var.",
  );
}

async function createLedgerAccount(derivationPath?: string): Promise<LocalAccount> {
  const path = derivationPath || "m/44'/60'/0'/0/0";

  let TransportNodeHid: any;
  let Eth: any;

  try {
    TransportNodeHid = (await import("@ledgerhq/hw-transport-node-hid")).default;
    Eth = (await import("@ledgerhq/hw-app-eth")).default;
  } catch {
    throw new Error(
      "Ledger dependencies not installed. Run:\n" +
        "  bun add @ledgerhq/hw-transport-node-hid @ledgerhq/hw-app-eth",
    );
  }

  const transport = await TransportNodeHid.create();
  const eth = new Eth(transport);
  const { address } = await eth.getAddress(path);

  return toAccount({
    address: address as `0x${string}`,

    async signMessage({ message }) {
      const msgHex =
        typeof message === "string"
          ? Buffer.from(message).toString("hex")
          : typeof message === "object" && "raw" in message
            ? typeof message.raw === "string"
              ? message.raw.slice(2)
              : Buffer.from(message.raw).toString("hex")
            : "";

      const result = await eth.signPersonalMessage(path, msgHex);
      const v = parseInt(result.v.toString(), 10);
      return `0x${result.r}${result.s}${v.toString(16)}` as `0x${string}`;
    },

    async signTransaction(transaction) {
      const { serialize, type } = await import("viem");
      const serialized = serialize({ ...transaction, type: type || "eip1559" } as any);
      const rawTx = serialized.slice(2);

      const result = await eth.signTransaction(path, rawTx);
      const v = parseInt(result.v, 16);
      return `0x${result.r}${result.s}${v.toString(16)}` as `0x${string}`;
    },

    async signTypedData(typedData) {
      const result = await eth.signEIP712Message(path, typedData as any);
      const v = parseInt(result.v.toString(), 10);
      return `0x${result.r}${result.s}${v.toString(16)}` as `0x${string}`;
    },
  });
}
