import { describe, expect, test } from "bun:test";
import {
  decodeERC8004Demand,
  encodeERC8004Demand,
  erc8004RequestHashFor,
  makeClient,
} from "../../src";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0x59c6995e998f97a5a004497e5da7eda29c7c6e9d4b2e3e5601c9f7c6205e5d8c");
const chain = { id: 31337, name: "test", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } } } as const;

describe("General arbiter SDK coverage", () => {
  test("encodes and decodes ERC8004Arbiter demand data", () => {
    const demand = {
      validationRegistry: "0x1111111111111111111111111111111111111111" as const,
      validatorAddress: "0x2222222222222222222222222222222222222222" as const,
      minResponse: 80,
      data: "0x1234" as const,
    };

    expect(decodeERC8004Demand(encodeERC8004Demand(demand))).toEqual(demand);
  });

  test("computes ERC8004 request hash", () => {
    const uid = `0x${"11".repeat(32)}` as const;
    expect(erc8004RequestHashFor(uid, "0x1234")).toMatch(/^0x[0-9a-f]{64}$/);
  });

  test("exposes trivial and referencesEscrow general clients", () => {
    const wallet = createWalletClient({ account, chain, transport: http() });
    const client = makeClient(wallet, {
      eas: "0x0000000000000000000000000000000000000001",
      trivialArbiter: "0x0000000000000000000000000000000000000002",
      referencesEscrowArbiter: "0x0000000000000000000000000000000000000003",
    });

    expect(client.arbiters.general.trivial.address).toBe("0x0000000000000000000000000000000000000002");
    expect(client.arbiters.general.referencesEscrow.address).toBe("0x0000000000000000000000000000000000000003");
  });
});
