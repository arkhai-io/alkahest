import AttestationBarterUtils from "@contracts/AttestationBarterUtils.json";
import AttestationEscrowObligation from "@contracts/AttestationEscrowObligation.json";
import AttestationEscrowObligation2 from "@contracts/AttestationEscrowObligation2.json";
import ERC20BarterCrossToken from "@contracts/ERC20BarterCrossToken.json";
// Import contract artifacts
import ERC20EscrowObligation from "@contracts/ERC20EscrowObligation.json";
import ERC20PaymentObligation from "@contracts/ERC20PaymentObligation.json";
import ERC721BarterCrossToken from "@contracts/ERC721BarterCrossToken.json";
import ERC721EscrowObligation from "@contracts/ERC721EscrowObligation.json";
import ERC721PaymentObligation from "@contracts/ERC721PaymentObligation.json";
import ERC1155BarterCrossToken from "@contracts/ERC1155BarterCrossToken.json";
import ERC1155EscrowObligation from "@contracts/ERC1155EscrowObligation.json";
import ERC1155PaymentObligation from "@contracts/ERC1155PaymentObligation.json";
import SpecificAttestationArbiter from "@contracts/SpecificAttestationArbiter.json";
import StringObligation from "@contracts/StringObligation.json";
import TokenBundleBarterUtils from "@contracts/TokenBundleBarterUtils.json";
import TokenBundleEscrowObligation from "@contracts/TokenBundleEscrowObligation.json";
import TokenBundlePaymentObligation from "@contracts/TokenBundlePaymentObligation.json";
import NativeTokenPaymentObligation from "@contracts/NativeTokenPaymentObligation.json";
import NativeTokenEscrowObligation from "@contracts/NativeTokenEscrowObligation.json";
import TrivialArbiter from "@contracts/TrivialArbiter.json";
import TrustedOracleArbiter from "@contracts/TrustedOracleArbiter.json";
import TrustedPartyArbiter from "@contracts/TrustedPartyArbiter.json";
import { createAnvil } from "@viem/anvil";
import { $ } from "bun";
import {
  createTestClient,
  createWalletClient,
  http,
  nonceManager,
  type PublicActions,
  parseEther,
  publicActions,
  type TestClient,
  type WalletActions,
  walletActions,
  webSocket,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import { makeClient } from "../../src";
import AllArbiter from "../../src/contracts/AllArbiter.json";
import AnyArbiter from "../../src/contracts/AnyArbiter.json";
import IntrinsicsArbiter from "../../src/contracts/IntrinsicsArbiter2.json";
import IntrinsicsArbiter2 from "../../src/contracts/IntrinsicsArbiter2.json";
// Import implementation contracts from fixtures
import EAS from "../fixtures/EAS.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import { type AlkahestTestActions, createTokenTestExtension } from "./tokenTestUtils";

export type TestContext = {
  // Anvil instance and clients
  anvil: ReturnType<typeof createAnvil>;
  testClient: TestClient & WalletActions & PublicActions & AlkahestTestActions;
  anvilInitState?: `0x${string}`;

  // User addresses and clients
  alice: `0x${string}`;
  bob: `0x${string}`;
  charlie: `0x${string}`;
  aliceClient: ReturnType<typeof makeClient>;
  bobClient: ReturnType<typeof makeClient>;
  charlieClient: ReturnType<typeof makeClient>;
  aliceClientWs: ReturnType<typeof makeClient>;
  bobClientWs: ReturnType<typeof makeClient>;
  charlieClientWs: ReturnType<typeof makeClient>;

  // Contract addresses
  addresses: {
    eas: `0x${string}`;
    easSchemaRegistry: `0x${string}`;

    // Arbiters
    trivialArbiter: `0x${string}`;
    trustedPartyArbiter: `0x${string}`;
    trustedOracleArbiter: `0x${string}`;
    specificAttestationArbiter: `0x${string}`;
    intrinsicsArbiter: `0x${string}`;
    intrinsicsArbiter2: `0x${string}`;
    anyArbiter: `0x${string}`;
    allArbiter: `0x${string}`;

    // ERC20
    erc20EscrowObligation: `0x${string}`;
    erc20PaymentObligation: `0x${string}`;
    erc20BarterUtils: `0x${string}`;

    // ERC721
    erc721EscrowObligation: `0x${string}`;
    erc721PaymentObligation: `0x${string}`;
    erc721BarterUtils: `0x${string}`;

    // ERC1155
    erc1155EscrowObligation: `0x${string}`;
    erc1155PaymentObligation: `0x${string}`;
    erc1155BarterUtils: `0x${string}`;

    // Token Bundle
    tokenBundleEscrowObligation: `0x${string}`;
    tokenBundlePaymentObligation: `0x${string}`;
    tokenBundleBarterUtils: `0x${string}`;

    // Attestation
    attestationEscrowObligation: `0x${string}`;
    attestationEscrowObligation2: `0x${string}`;
    attestationBarterUtils: `0x${string}`;

    // String obligation
    stringObligation: `0x${string}`;

    // Native payment
    nativeTokenPaymentObligation: `0x${string}`;
    nativeTokenEscrowObligation: `0x${string}`;
  };

  // Mock token addresses
  mockAddresses: {
    erc20A: `0x${string}`;
    erc20B: `0x${string}`;
    erc20C: `0x${string}`;
    erc721A: `0x${string}`;
    erc721B: `0x${string}`;
    erc721C: `0x${string}`;
    erc1155A: `0x${string}`;
    erc1155B: `0x${string}`;
    erc1155C: `0x${string}`;
  };

  // Helper functions
  deployContract: <T extends { abi: any; bytecode: { object: string } }>(
    contract: T,
    args?: any[],
  ) => Promise<`0x${string}`>;
  deployObligation: <T extends { abi: any; bytecode: { object: string } }>(contract: T) => Promise<`0x${string}`>;
};

/**
 * Sets up a complete test environment for Alkahest tests
 *
 * This function:
 * 1. Launches an Anvil instance
 * 2. Sets up test accounts with ETH
 * 3. Deploys all core contracts (EAS, obligations, arbiters, etc.)
 * 4. Deploys mock tokens for testing
 * 5. Distributes mock tokens to test accounts
 * 6. Creates Alkahest clients for each test account
 *
 * @returns TestContext object with all necessary test resources
 */
export async function setupTestEnvironment(): Promise<TestContext> {
  // Use a dynamic port to avoid conflicts when running multiple tests
  const port = Math.floor(Math.random() * 10000) + 50000; // Random port between 50000-60000
  const anvil = createAnvil({
    port,
    host: "127.0.0.1",
  });
  await anvil.start();

  const chain = foundry;
  const transport = http(`http://${anvil.host}:${anvil.port}`, {
    timeout: 60_000,
  });

  // Create test accounts
  const aliceAccount = privateKeyToAccount(generatePrivateKey(), {
    nonceManager,
  });
  const bobAccount = privateKeyToAccount(generatePrivateKey(), {
    nonceManager,
  });
  const charlieAccount = privateKeyToAccount(generatePrivateKey(), {
    nonceManager,
  });
  const alice = aliceAccount.address;
  const bob = bobAccount.address;
  const charlie = charlieAccount.address;

  // Create test client for deployment
  const testClient = createTestClient({
    mode: "anvil",
    account: privateKeyToAccount(generatePrivateKey(), {
      nonceManager,
    }),
    chain,
    transport,
  })
    .extend(walletActions)
    .extend(publicActions)
    .extend(createTokenTestExtension());

  // Fund accounts with ETH
  await testClient.setBalance({
    address: testClient.account.address,
    value: parseEther("10"),
  });
  await testClient.setBalance({
    address: alice,
    value: parseEther("10"),
  });
  await testClient.setBalance({
    address: bob,
    value: parseEther("10"),
  });
  await testClient.setBalance({
    address: charlie,
    value: parseEther("10"),
  });

  // Create wallet clients for accounts
  const aliceWalletClient = createWalletClient({
    account: aliceAccount,
    chain,
    transport,
    pollingInterval: 1000,
  }).extend(publicActions);

  const bobWalletClient = createWalletClient({
    account: bobAccount,
    chain,
    transport,
    pollingInterval: 1000,
  }).extend(publicActions);

  const charlieWalletClient = createWalletClient({
    account: charlieAccount,
    chain,
    transport,
    pollingInterval: 1000,
  }).extend(publicActions);

  // Initialize addresses object
  const addresses: TestContext["addresses"] = {
    eas: "" as `0x${string}`,
    easSchemaRegistry: "" as `0x${string}`,

    trivialArbiter: "" as `0x${string}`,
    trustedPartyArbiter: "" as `0x${string}`,
    trustedOracleArbiter: "" as `0x${string}`,
    specificAttestationArbiter: "" as `0x${string}`,
    intrinsicsArbiter: "" as `0x${string}`,
    intrinsicsArbiter2: "" as `0x${string}`,
    anyArbiter: "" as `0x${string}`,
    allArbiter: "" as `0x${string}`,

    erc20EscrowObligation: "" as `0x${string}`,
    erc20PaymentObligation: "" as `0x${string}`,
    erc20BarterUtils: "" as `0x${string}`,

    erc721EscrowObligation: "" as `0x${string}`,
    erc721PaymentObligation: "" as `0x${string}`,
    erc721BarterUtils: "" as `0x${string}`,

    erc1155EscrowObligation: "" as `0x${string}`,
    erc1155PaymentObligation: "" as `0x${string}`,
    erc1155BarterUtils: "" as `0x${string}`,

    tokenBundleEscrowObligation: "" as `0x${string}`,
    tokenBundlePaymentObligation: "" as `0x${string}`,
    tokenBundleBarterUtils: "" as `0x${string}`,

    attestationEscrowObligation: "" as `0x${string}`,
    attestationEscrowObligation2: "" as `0x${string}`,
    attestationBarterUtils: "" as `0x${string}`,

    stringObligation: "" as `0x${string}`,
    nativeTokenPaymentObligation: "" as `0x${string}`,
    nativeTokenEscrowObligation: "" as `0x${string}`,
  };

  const mockAddresses: TestContext["mockAddresses"] = {
    erc20A: "" as `0x${string}`,
    erc20B: "" as `0x${string}`,
    erc20C: "" as `0x${string}`,
    erc721A: "" as `0x${string}`,
    erc721B: "" as `0x${string}`,
    erc721C: "" as `0x${string}`,
    erc1155A: "" as `0x${string}`,
    erc1155B: "" as `0x${string}`,
    erc1155C: "" as `0x${string}`,
  };

  // Helper to deploy contracts
  async function deployContract<T extends { abi: any; bytecode: { object: string } }>(
    contract: T,
    args: any[] = [],
  ): Promise<`0x${string}`> {
    const hash = await testClient.deployContract({
      abi: contract.abi,
      bytecode: contract.bytecode.object as `0x${string}`,
      args,
    });

    const receipt = await testClient.waitForTransactionReceipt({ hash });
    return receipt.contractAddress as `0x${string}`;
  }

  // Deploy EAS contracts
  addresses.easSchemaRegistry = await deployContract(SchemaRegistry);
  addresses.eas = await deployContract(EAS, [addresses.easSchemaRegistry]);

  // Deploy arbiters
  addresses.trivialArbiter = await deployContract(TrivialArbiter);
  addresses.trustedPartyArbiter = await deployContract(TrustedPartyArbiter);
  addresses.trustedOracleArbiter = await deployContract(TrustedOracleArbiter, [addresses.eas]);

  addresses.specificAttestationArbiter = await deployContract(SpecificAttestationArbiter);
  addresses.intrinsicsArbiter = await deployContract(IntrinsicsArbiter);
  addresses.intrinsicsArbiter2 = await deployContract(IntrinsicsArbiter2);
  addresses.anyArbiter = await deployContract(AnyArbiter);
  addresses.allArbiter = await deployContract(AllArbiter);

  // Deploy obligation contracts (all following same pattern with EAS and schema registry)

  // Helper to deploy obligation contracts
  async function deployObligation<T extends { abi: any; bytecode: { object: string } }>(
    contract: T,
  ): Promise<`0x${string}`> {
    return deployContract(contract, [addresses.eas, addresses.easSchemaRegistry]);
  }

  // Deploy basic obligations
  addresses.erc20EscrowObligation = await deployObligation(ERC20EscrowObligation);
  addresses.erc20PaymentObligation = await deployObligation(ERC20PaymentObligation);
  addresses.erc721EscrowObligation = await deployObligation(ERC721EscrowObligation);
  addresses.erc721PaymentObligation = await deployObligation(ERC721PaymentObligation);
  addresses.erc1155EscrowObligation = await deployObligation(ERC1155EscrowObligation);
  addresses.erc1155PaymentObligation = await deployObligation(ERC1155PaymentObligation);
  addresses.tokenBundleEscrowObligation = await deployObligation(TokenBundleEscrowObligation);
  addresses.tokenBundlePaymentObligation = await deployObligation(TokenBundlePaymentObligation);
  addresses.attestationEscrowObligation = await deployObligation(AttestationEscrowObligation);
  addresses.attestationEscrowObligation2 = await deployObligation(AttestationEscrowObligation2);
  addresses.stringObligation = await deployObligation(StringObligation);
  addresses.nativeTokenPaymentObligation = await deployObligation(NativeTokenPaymentObligation);
  addresses.nativeTokenEscrowObligation = await deployObligation(NativeTokenEscrowObligation);

  // Deploy barter utils

  // ERC20 barter utils with cross-token functionality
  addresses.erc20BarterUtils = await deployContract(ERC20BarterCrossToken, [
    addresses.eas,
    addresses.erc20EscrowObligation,
    addresses.erc20PaymentObligation,
    addresses.erc721EscrowObligation,
    addresses.erc721PaymentObligation,
    addresses.erc1155EscrowObligation,
    addresses.erc1155PaymentObligation,
    addresses.tokenBundleEscrowObligation,
    addresses.tokenBundlePaymentObligation,
  ]);

  // ERC721 barter utils
  addresses.erc721BarterUtils = await deployContract(ERC721BarterCrossToken, [
    addresses.eas,
    addresses.erc20EscrowObligation,
    addresses.erc20PaymentObligation,
    addresses.erc721EscrowObligation,
    addresses.erc721PaymentObligation,
    addresses.erc1155EscrowObligation,
    addresses.erc1155PaymentObligation,
    addresses.tokenBundleEscrowObligation,
    addresses.tokenBundlePaymentObligation,
  ]);

  // ERC1155 barter utils
  addresses.erc1155BarterUtils = await deployContract(ERC1155BarterCrossToken, [
    addresses.eas,
    addresses.erc20EscrowObligation,
    addresses.erc20PaymentObligation,
    addresses.erc721EscrowObligation,
    addresses.erc721PaymentObligation,
    addresses.erc1155EscrowObligation,
    addresses.erc1155PaymentObligation,
    addresses.tokenBundleEscrowObligation,
    addresses.tokenBundlePaymentObligation,
  ]);

  // Token bundle barter utils
  addresses.tokenBundleBarterUtils = await deployContract(TokenBundleBarterUtils, [
    addresses.eas,
    addresses.tokenBundleEscrowObligation,
    addresses.tokenBundlePaymentObligation,
  ]);

  // Attestation barter utils
  addresses.attestationBarterUtils = await deployContract(AttestationBarterUtils, [
    addresses.eas,
    addresses.easSchemaRegistry,
    addresses.attestationEscrowObligation2,
  ]);

  // Deploy mock tokens
  mockAddresses.erc20A = await deployContract(MockERC20Permit, ["Token A", "TKA"]);
  mockAddresses.erc20B = await deployContract(MockERC20Permit, ["Token B", "TKB"]);
  mockAddresses.erc20C = await deployContract(MockERC20Permit, ["Token C", "TKC"]);
  mockAddresses.erc721A = await deployContract(MockERC721);
  mockAddresses.erc721B = await deployContract(MockERC721);
  mockAddresses.erc721C = await deployContract(MockERC721);
  mockAddresses.erc1155A = await deployContract(MockERC1155);
  mockAddresses.erc1155B = await deployContract(MockERC1155);
  mockAddresses.erc1155C = await deployContract(MockERC1155);

  // Distribute tokens to test accounts

  // Transfer ERC20 tokens
  await testClient.writeContract({
    address: mockAddresses.erc20A,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [alice, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc20B,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [bob, parseEther("1000")],
  });

  // Mint NFTs to test accounts
  await testClient.writeContract({
    address: mockAddresses.erc721A,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [alice],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721B,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [bob],
  });

  // Mint ERC1155 tokens
  await testClient.writeContract({
    address: mockAddresses.erc1155A,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [alice, 1n, 100n],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155B,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [bob, 1n, 100n],
  });

  // Mint ERC1155 tokens for Charlie
  await testClient.writeContract({
    address: mockAddresses.erc20C,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [charlie, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721C,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [charlie],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155C,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [charlie, 1n, 100n],
  });

  // Create Alkahest clients
  const aliceClient = makeClient(aliceWalletClient, addresses);
  const bobClient = makeClient(bobWalletClient, addresses);
  const charlieClient = makeClient(charlieWalletClient, addresses);

  // Create WebSocket clients for real-time event watching
  const aliceWalletClientWs = createWalletClient({
    account: aliceAccount,
    chain,
    transport: webSocket(`ws://localhost:${anvil.port}`),
    pollingInterval: 1000,
  }).extend(publicActions);

  const bobWalletClientWs = createWalletClient({
    account: bobAccount,
    chain,
    transport: webSocket(`ws://localhost:${anvil.port}`),
    pollingInterval: 1000,
  }).extend(publicActions);

  const charlieWalletClientWs = createWalletClient({
    account: charlieAccount,
    chain,
    transport: webSocket(`ws://localhost:${anvil.port}`),
    pollingInterval: 1000,
  }).extend(publicActions);

  const aliceClientWs = makeClient(aliceWalletClientWs, addresses);
  const bobClientWs = makeClient(bobWalletClientWs, addresses);
  const charlieClientWs = makeClient(charlieWalletClientWs, addresses);

  // Capture initial state for test resets
  const anvilInitState = await testClient.dumpState();

  return {
    anvil,
    testClient,
    anvilInitState,

    deployContract,
    deployObligation,

    alice,
    bob,
    charlie,
    aliceClient,
    bobClient,
    charlieClient,
    aliceClientWs,
    bobClientWs,
    charlieClientWs,

    addresses,
    mockAddresses,
  };
}

/**
 * Tears down the test environment
 * @param context The test context to tear down
 */
export async function teardownTestEnvironment(context: TestContext) {
  /*
  try {
    await context.anvil.stop();
  } catch (e) {
    // Ensure anvil is killed even if graceful stop fails
    await $`pkill anvil`;
  }
  */
  await $`pkill anvil`;
}
