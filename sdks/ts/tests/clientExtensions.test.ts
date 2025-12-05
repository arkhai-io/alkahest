import { describe, expect, it } from "bun:test";
import type { Account, Chain, Transport, WalletClient } from "viem";
import { makeMinimalClient } from "../src";

describe("Client Extension Tests", () => {
    it("can chain multiple extensions", () => {
        // Mock wallet client
        const mockWalletClient = {
            extend: () => mockWalletClient,
            account: { address: "0xMockAddress" },
            chain: { id: 31337, name: "MockChain" },
        } as unknown as WalletClient<Transport, Chain, Account>;

        // Mock contract addresses for unsupported chain
        const mockAddresses = {
            trustedOracleArbiter: "0x1234567890123456789012345678901234567890" as `0x${string}`,
            anyArbiter: "0x1234567890123456789012345678901234567890" as `0x${string}`,
            allArbiter: "0x1234567890123456789012345678901234567890" as `0x${string}`,
            // Add other required addresses...
        };

        // Create minimal client with custom addresses
        const client = makeMinimalClient(mockWalletClient, mockAddresses);

        const extensionA = (_baseClient: unknown) => ({
            methodA: () => "Extension A",
        });

        const firstExtension = client.extend(extensionA);

        const extensionB = (_baseClient: unknown) => ({
            methodB: () => "Extension B",
        });

        const extendedClient = firstExtension.extend(extensionB);

        // Verify extensions
        expect(extendedClient.methodA()).toBe("Extension A");
        expect(extendedClient.methodB()).toBe("Extension B");
        expect(extendedClient.address).toBe("0xMockAddress");
    });
});