import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { makeClient, makeMinimalClient } from "../../src";
import { makeErc20Client } from "../../src/clients/erc20";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

describe("Client Extension Tests", () => {
  let testContext: TestContext;
  let walletClient: TestContext["alice"]["client"]["viemClient"];

  beforeEach(async () => {
    testContext = await setupTestEnvironment();
    walletClient = testContext.alice.client.viemClient;
  });

  afterEach(async () => {
    await teardownTestEnvironment(testContext);
  });

  test("makeClient should return a client with all default extensions", () => {
    const client = makeClient(walletClient, testContext.addresses);

    // Should have all the standard clients
    expect(client.arbiters).toBeDefined();
    expect(client.erc20).toBeDefined();
    expect(client.erc721).toBeDefined();
    expect(client.erc1155).toBeDefined();
    expect(client.bundle).toBeDefined();
    expect(client.attestation).toBeDefined();
    expect(client.stringObligation).toBeDefined();
    expect(client.oracle).toBeDefined();

    // Should have core properties
    expect(client.viemClient).toBeDefined();
    expect(client.address).toBeDefined();
    expect(client.contractAddresses).toBeDefined();

    // Should have utility methods
    expect(typeof client.getAttestation).toBe("function");
    expect(typeof client.getAttestedEventFromTxHash).toBe("function");
    expect(typeof client.waitForFulfillment).toBe("function");

    // Should still be extendable
    expect(typeof (client as any).extend).toBe("function");
  });

  test("makeMinimalClient should return only core functionality", () => {
    const minimalClient = makeMinimalClient(walletClient, testContext.addresses);

    // Should NOT have the standard clients
    expect((minimalClient as any).arbiters).toBeUndefined();
    expect((minimalClient as any).erc20).toBeUndefined();
    expect((minimalClient as any).erc721).toBeUndefined();
    expect((minimalClient as any).erc1155).toBeUndefined();
    expect((minimalClient as any).bundle).toBeUndefined();
    expect((minimalClient as any).attestation).toBeUndefined();
    expect((minimalClient as any).stringObligation).toBeUndefined();
    expect((minimalClient as any).oracle).toBeUndefined();

    // Should have core properties
    expect(minimalClient.viemClient).toBeDefined();
    expect(minimalClient.address).toBeDefined();
    expect(minimalClient.contractAddresses).toBeDefined();

    // Should have utility methods
    expect(typeof minimalClient.getAttestation).toBe("function");
    expect(typeof minimalClient.getAttestedEventFromTxHash).toBe("function");
    expect(typeof minimalClient.waitForFulfillment).toBe("function");

    // Should be extendable
    expect(typeof minimalClient.extend).toBe("function");
  });

  test("minimal client can be extended with custom functionality", () => {
    const minimalClient = makeMinimalClient(walletClient, testContext.addresses);

    const customClient = minimalClient.extend((client) => ({
      erc20: makeErc20Client(client.viemClient, testContext.addresses),
    }));

    // Should have only the ERC20 client, not others
    expect(customClient.erc20).toBeDefined();
    expect((customClient as any).arbiters).toBeUndefined();
    expect((customClient as any).erc721).toBeUndefined();
    expect((customClient as any).attestation).toBeUndefined();

    // Should still have core properties
    expect(customClient.viemClient).toBeDefined();
    expect(customClient.address).toBeDefined();
    expect(customClient.contractAddresses).toBeDefined();
  });

  test("can chain multiple extensions", () => {
    const minimalClient = makeMinimalClient(walletClient, testContext.addresses);

    const firstExtension = minimalClient.extend((client) => ({
      erc20: testContext.alice.client.erc20,
      customProp1: "first",
    }));

    const secondExtension = firstExtension.extend((client) => ({
      erc721: testContext.alice.client.erc721,
      customProp2: "second",
      // Fix: access the extended client properties correctly
      combined: () => `${firstExtension.customProp1}-second`,
    }));

    expect(secondExtension.erc20).toBeDefined();
    expect(secondExtension.erc721).toBeDefined();
    expect(secondExtension.customProp1).toBe("first");
    expect(secondExtension.customProp2).toBe("second");
    expect(secondExtension.combined()).toBe("first-second");
  });

  test("makeClient can be extended with custom functionality", () => {
    const client = makeClient(walletClient, testContext.addresses);

    const extendedClient = client.extend((_baseClient: unknown) => ({
      customMethod: () => "Custom Functionality",
    }));

    // Verify the custom method is added
    expect(extendedClient.customMethod()).toBe("Custom Functionality");

    // Verify the original properties are still accessible
    expect(extendedClient.viemClient).toBeDefined();
    expect(extendedClient.address).toBeDefined();
    expect(extendedClient.contractAddresses).toBeDefined();
  });

  test("makeClient can chain multiple extensions", () => {
    const client = makeClient(walletClient, testContext.addresses);

    const firstExtension = client.extend((_baseClient: unknown) => ({
      customMethod1: () => "First Extension",
    }));

    const secondExtension = firstExtension.extend((_baseClient: unknown) => ({
      customMethod2: () => "Second Extension",
    }));

    const thirdExtension = secondExtension.extend((_baseClient: unknown) => ({
      customMethod3: () => "Third Extension",
    }));

    // Verify all custom methods are added
    expect(thirdExtension.customMethod1()).toBe("First Extension");
    expect(thirdExtension.customMethod2()).toBe("Second Extension");
    expect(thirdExtension.customMethod3()).toBe("Third Extension");

    // Verify the original properties are still accessible
    expect(thirdExtension.viemClient).toBeDefined();
    expect(thirdExtension.address).toBeDefined();
    expect(thirdExtension.contractAddresses).toBeDefined();
  });
});
