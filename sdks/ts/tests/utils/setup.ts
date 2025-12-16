// Import contract artifacts using relative paths (not path aliases)
import AttestationBarterUtils from "../../src/contracts/AttestationBarterUtils.json";
import AttestationEscrowObligation from "../../src/contracts/AttestationEscrowObligation.json";
import AttestationEscrowObligation2 from "../../src/contracts/AttestationEscrowObligation2.json";
import ERC20BarterCrossToken from "../../src/contracts/ERC20BarterCrossToken.json";
import ERC20EscrowObligation from "../../src/contracts/ERC20EscrowObligation.json";
import ERC20PaymentObligation from "../../src/contracts/ERC20PaymentObligation.json";
import ERC721BarterCrossToken from "../../src/contracts/ERC721BarterCrossToken.json";
import ERC721EscrowObligation from "../../src/contracts/ERC721EscrowObligation.json";
import ERC721PaymentObligation from "../../src/contracts/ERC721PaymentObligation.json";
import ERC1155BarterCrossToken from "../../src/contracts/ERC1155BarterCrossToken.json";
import ERC1155EscrowObligation from "../../src/contracts/ERC1155EscrowObligation.json";
import ERC1155PaymentObligation from "../../src/contracts/ERC1155PaymentObligation.json";
import SpecificAttestationArbiter from "../../src/contracts/SpecificAttestationArbiter.json";
import StringObligation from "../../src/contracts/StringObligation.json";
import TokenBundleBarterUtils from "../../src/contracts/TokenBundleBarterUtils.json";
import TokenBundleEscrowObligation from "../../src/contracts/TokenBundleEscrowObligation.json";
import TokenBundlePaymentObligation from "../../src/contracts/TokenBundlePaymentObligation.json";
import TrivialArbiter from "../../src/contracts/TrivialArbiter.json";
import TrustedOracleArbiter from "../../src/contracts/TrustedOracleArbiter.json";
import TrustedPartyArbiter from "../../src/contracts/TrustedPartyArbiter.json";
import NativeTokenPaymentObligation from "../../src/contracts/NativeTokenPaymentObligation.json";
import NativeTokenEscrowObligation from "../../src/contracts/NativeTokenEscrowObligation.json";
import { createAnvil } from "@viem/anvil";

import {
  createTestClient,
  createWalletClient,
  http,
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
import { nonceManager } from "viem";
import { makeClient } from "../../src";
import AllArbiter from "../../src/contracts/AllArbiter.json";
import AnyArbiter from "../../src/contracts/AnyArbiter.json";
import IntrinsicsArbiter from "../../src/contracts/IntrinsicsArbiter2.json";
import IntrinsicsArbiter2 from "../../src/contracts/IntrinsicsArbiter2.json";
// Attestation Properties Arbiters - Non-Composing
import AttesterArbiterNonComposing from "../../src/contracts/AttesterArbiterNonComposing.json";
import RecipientArbiterNonComposing from "../../src/contracts/RecipientArbiterNonComposing.json";
import RefUidArbiterNonComposing from "../../src/contracts/RefUidArbiterNonComposing.json";
import RevocableArbiterNonComposing from "../../src/contracts/RevocableArbiterNonComposing.json";
import SchemaArbiterNonComposing from "../../src/contracts/SchemaArbiterNonComposing.json";
import TimeAfterArbiterNonComposing from "../../src/contracts/TimeAfterArbiterNonComposing.json";
import TimeBeforeArbiterNonComposing from "../../src/contracts/TimeBeforeArbiterNonComposing.json";
import TimeEqualArbiterNonComposing from "../../src/contracts/TimeEqualArbiterNonComposing.json";
import UidArbiterNonComposing from "../../src/contracts/UidArbiterNonComposing.json";
import ExpirationTimeAfterArbiterNonComposing from "../../src/contracts/ExpirationTimeAfterArbiterNonComposing.json";
import ExpirationTimeBeforeArbiterNonComposing from "../../src/contracts/ExpirationTimeBeforeArbiterNonComposing.json";
import ExpirationTimeEqualArbiterNonComposing from "../../src/contracts/ExpirationTimeEqualArbiterNonComposing.json";
// Attestation Properties Arbiters - Composing
import AttesterArbiterComposing from "../../src/contracts/AttesterArbiterComposing.json";
import RecipientArbiterComposing from "../../src/contracts/RecipientArbiterComposing.json";
import RefUidArbiterComposing from "../../src/contracts/RefUidArbiterComposing.json";
import RevocableArbiterComposing from "../../src/contracts/RevocableArbiterComposing.json";
import SchemaArbiterComposing from "../../src/contracts/SchemaArbiterComposing.json";
import TimeAfterArbiterComposing from "../../src/contracts/TimeAfterArbiterComposing.json";
import TimeBeforeArbiterComposing from "../../src/contracts/TimeBeforeArbiterComposing.json";
import TimeEqualArbiterComposing from "../../src/contracts/TimeEqualArbiterComposing.json";
import UidArbiterComposing from "../../src/contracts/UidArbiterComposing.json";
import ExpirationTimeAfterArbiterComposing from "../../src/contracts/ExpirationTimeAfterArbiterComposing.json";
import ExpirationTimeBeforeArbiterComposing from "../../src/contracts/ExpirationTimeBeforeArbiterComposing.json";
import ExpirationTimeEqualArbiterComposing from "../../src/contracts/ExpirationTimeEqualArbiterComposing.json";
// Import implementation contracts from fixtures
import EAS from "../fixtures/EAS.json";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";
import SchemaRegistry from "../fixtures/SchemaRegistry.json";
import { type AlkahestTestActions, createTokenTestExtension } from "./tokenTestUtils";
import { fr } from "zod/v4/locales";

export type TestContext = {
  // Anvil instance and clients
  anvil: ReturnType<typeof createAnvil>;
  testClient: TestClient & WalletActions & PublicActions & AlkahestTestActions;
  anvilInitState?: `0x${string}`;
  wsTransports?: any[];

  // User addresses and clients
  alice: {
    address: `0x${string}`;
    privateKey: `0x${string}`;
    client: ReturnType<typeof makeClient>;
    clientWs: ReturnType<typeof makeClient>;
  };
  bob: {
    address: `0x${string}`;
    privateKey: `0x${string}`;
    client: ReturnType<typeof makeClient>;
    clientWs: ReturnType<typeof makeClient>;
  };
  charlie: {
    address: `0x${string}`;
    privateKey: `0x${string}`;
    client: ReturnType<typeof makeClient>;
    clientWs: ReturnType<typeof makeClient>;
  };

  // Contract addresses
  addresses: {
    eas: `0x${string}`;
    easSchemaRegistry: `0x${string}`;

    // Arbiters - General
    trivialArbiter: `0x${string}`;
    trustedPartyArbiter: `0x${string}`;
    trustedOracleArbiter: `0x${string}`;
    specificAttestationArbiter: `0x${string}`;
    intrinsicsArbiter: `0x${string}`;
    intrinsicsArbiter2: `0x${string}`;
    anyArbiter: `0x${string}`;
    allArbiter: `0x${string}`;

    // Attestation Properties Arbiters - Non-Composing
    attesterArbiterNonComposing: `0x${string}`;
    recipientArbiterNonComposing: `0x${string}`;
    refUidArbiterNonComposing: `0x${string}`;
    revocableArbiterNonComposing: `0x${string}`;
    schemaArbiterNonComposing: `0x${string}`;
    timeAfterArbiterNonComposing: `0x${string}`;
    timeBeforeArbiterNonComposing: `0x${string}`;
    timeEqualArbiterNonComposing: `0x${string}`;
    uidArbiterNonComposing: `0x${string}`;
    expirationTimeAfterArbiterNonComposing: `0x${string}`;
    expirationTimeBeforeArbiterNonComposing: `0x${string}`;
    expirationTimeEqualArbiterNonComposing: `0x${string}`;

    // Attestation Properties Arbiters - Composing
    attesterArbiterComposing: `0x${string}`;
    recipientArbiterComposing: `0x${string}`;
    refUidArbiterComposing: `0x${string}`;
    revocableArbiterComposing: `0x${string}`;
    schemaArbiterComposing: `0x${string}`;
    timeAfterArbiterComposing: `0x${string}`;
    timeBeforeArbiterComposing: `0x${string}`;
    timeEqualArbiterComposing: `0x${string}`;
    uidArbiterComposing: `0x${string}`;
    expirationTimeAfterArbiterComposing: `0x${string}`;
    expirationTimeBeforeArbiterComposing: `0x${string}`;
    expirationTimeEqualArbiterComposing: `0x${string}`;

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

// Global flag to track if we've set up WebSocket error suppression
let wsErrorSuppressionInstalled = false;
let originalConsoleError: typeof console.error;

/**
 * Install global WebSocket error suppression for tests
 * This prevents noisy WebSocket connection errors during test lifecycle
 */
function installWebSocketErrorSuppression() {
  if (wsErrorSuppressionInstalled) return;

  originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(" ");
    // Suppress WebSocket and ErrorEvent logs that occur during test lifecycle
    if (
      message.includes("WebSocket connection to") ||
      message.includes("ErrorEvent") ||
      (message.includes("error") && message.includes("ws://localhost"))
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  wsErrorSuppressionInstalled = true;
}

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
export interface SetupTestEnvironmentOptions {
  anvilOptions?: Partial<Parameters<typeof createAnvil>[0]>;
}

export async function setupTestEnvironment(options?: SetupTestEnvironmentOptions): Promise<TestContext> {
  // Install WebSocket error suppression once globally
  installWebSocketErrorSuppression();
  // Use a dynamic port to avoid conflicts when running multiple tests
  const port = Math.floor(Math.random() * 10000) + 50000; // Random port between 50000-60000

  const defaultAnvilConfig = {
    port,
    host: "127.0.0.1",
    chainId: 31337, // Default Anvil/Foundry chain ID
  };

  const anvilConfig = { ...defaultAnvilConfig, ...options?.anvilOptions };
  const anvil = createAnvil(anvilConfig);
  await anvil.start();

  // Override foundry chain to match anvil's actual configuration
  const chain = {
    ...foundry,
    id: anvilConfig.chainId,
    rpcUrls: {
      default: {
        http: [`http://${anvilConfig.host}:${anvilConfig.port}`],
        webSocket: [`ws://${anvilConfig.host}:${anvilConfig.port}`],
      },
    },
  } as const;

  const transport = http(`http://${anvil.host}:${anvil.port}`, {
    timeout: 60_000,
  });

  // Create test accounts
  const alicePrivateKey = generatePrivateKey();
  const bobPrivateKey = generatePrivateKey();
  const charliePrivateKey = generatePrivateKey();

  // Use viem's default singleton nonce manager
  // This is shared across all tests and accounts, keyed by ${address}.${chainId}
  const aliceAccount = privateKeyToAccount(alicePrivateKey, { nonceManager });
  const bobAccount = privateKeyToAccount(bobPrivateKey, { nonceManager });
  const charlieAccount = privateKeyToAccount(charliePrivateKey, { nonceManager });
  const aliceAddress = aliceAccount.address;
  const bobAddress = bobAccount.address;
  const charlieAddress = charlieAccount.address;

  // Create test client for deployment
  const testClient = createTestClient({
    mode: "anvil",
    account: privateKeyToAccount(generatePrivateKey(), { nonceManager }),
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
    address: aliceAddress,
    value: parseEther("10"),
  });
  await testClient.setBalance({
    address: bobAddress,
    value: parseEther("10"),
  });
  await testClient.setBalance({
    address: charlieAddress,
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

    // Attestation Properties Arbiters - Non-Composing
    attesterArbiterNonComposing: "" as `0x${string}`,
    recipientArbiterNonComposing: "" as `0x${string}`,
    refUidArbiterNonComposing: "" as `0x${string}`,
    revocableArbiterNonComposing: "" as `0x${string}`,
    schemaArbiterNonComposing: "" as `0x${string}`,
    timeAfterArbiterNonComposing: "" as `0x${string}`,
    timeBeforeArbiterNonComposing: "" as `0x${string}`,
    timeEqualArbiterNonComposing: "" as `0x${string}`,
    uidArbiterNonComposing: "" as `0x${string}`,
    expirationTimeAfterArbiterNonComposing: "" as `0x${string}`,
    expirationTimeBeforeArbiterNonComposing: "" as `0x${string}`,
    expirationTimeEqualArbiterNonComposing: "" as `0x${string}`,

    // Attestation Properties Arbiters - Composing
    attesterArbiterComposing: "" as `0x${string}`,
    recipientArbiterComposing: "" as `0x${string}`,
    refUidArbiterComposing: "" as `0x${string}`,
    revocableArbiterComposing: "" as `0x${string}`,
    schemaArbiterComposing: "" as `0x${string}`,
    timeAfterArbiterComposing: "" as `0x${string}`,
    timeBeforeArbiterComposing: "" as `0x${string}`,
    timeEqualArbiterComposing: "" as `0x${string}`,
    uidArbiterComposing: "" as `0x${string}`,
    expirationTimeAfterArbiterComposing: "" as `0x${string}`,
    expirationTimeBeforeArbiterComposing: "" as `0x${string}`,
    expirationTimeEqualArbiterComposing: "" as `0x${string}`,

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

  // Deploy Attestation Properties Arbiters - Non-Composing
  addresses.attesterArbiterNonComposing = await deployContract(AttesterArbiterNonComposing);
  addresses.recipientArbiterNonComposing = await deployContract(RecipientArbiterNonComposing);
  addresses.refUidArbiterNonComposing = await deployContract(RefUidArbiterNonComposing);
  addresses.revocableArbiterNonComposing = await deployContract(RevocableArbiterNonComposing);
  addresses.schemaArbiterNonComposing = await deployContract(SchemaArbiterNonComposing);
  addresses.timeAfterArbiterNonComposing = await deployContract(TimeAfterArbiterNonComposing);
  addresses.timeBeforeArbiterNonComposing = await deployContract(TimeBeforeArbiterNonComposing);
  addresses.timeEqualArbiterNonComposing = await deployContract(TimeEqualArbiterNonComposing);
  addresses.uidArbiterNonComposing = await deployContract(UidArbiterNonComposing);
  addresses.expirationTimeAfterArbiterNonComposing = await deployContract(ExpirationTimeAfterArbiterNonComposing);
  addresses.expirationTimeBeforeArbiterNonComposing = await deployContract(ExpirationTimeBeforeArbiterNonComposing);
  addresses.expirationTimeEqualArbiterNonComposing = await deployContract(ExpirationTimeEqualArbiterNonComposing);

  // Deploy Attestation Properties Arbiters - Composing
  addresses.attesterArbiterComposing = await deployContract(AttesterArbiterComposing);
  addresses.recipientArbiterComposing = await deployContract(RecipientArbiterComposing);
  addresses.refUidArbiterComposing = await deployContract(RefUidArbiterComposing);
  addresses.revocableArbiterComposing = await deployContract(RevocableArbiterComposing);
  addresses.schemaArbiterComposing = await deployContract(SchemaArbiterComposing);
  addresses.timeAfterArbiterComposing = await deployContract(TimeAfterArbiterComposing);
  addresses.timeBeforeArbiterComposing = await deployContract(TimeBeforeArbiterComposing);
  addresses.timeEqualArbiterComposing = await deployContract(TimeEqualArbiterComposing);
  addresses.uidArbiterComposing = await deployContract(UidArbiterComposing);
  addresses.expirationTimeAfterArbiterComposing = await deployContract(ExpirationTimeAfterArbiterComposing);
  addresses.expirationTimeBeforeArbiterComposing = await deployContract(ExpirationTimeBeforeArbiterComposing);
  addresses.expirationTimeEqualArbiterComposing = await deployContract(ExpirationTimeEqualArbiterComposing);

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
    args: [aliceAddress, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc20B,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [bobAddress, parseEther("1000")],
  });

  // Mint NFTs to test accounts
  await testClient.writeContract({
    address: mockAddresses.erc721A,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [aliceAddress],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721B,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [bobAddress],
  });

  // Mint ERC1155 tokens
  await testClient.writeContract({
    address: mockAddresses.erc1155A,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [aliceAddress, 1n, 100n],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155B,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [bobAddress, 1n, 100n],
  });

  // Mint ERC1155 tokens for Charlie
  await testClient.writeContract({
    address: mockAddresses.erc20C,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [charlieAddress, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721C,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [charlieAddress],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155C,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [charlieAddress, 1n, 100n],
  });

  // Create Alkahest clients
  const aliceClient = makeClient(aliceWalletClient, addresses);
  const bobClient = makeClient(bobWalletClient, addresses);
  const charlieClient = makeClient(charlieWalletClient, addresses);

  // Create WebSocket clients for real-time event watching
  // Configure with retryCount: 0 to prevent reconnection attempts during teardown
  const wsTransportAlice = webSocket(`ws://localhost:${anvil.port}`, {
    retryCount: 0,
    timeout: 1000,
  });
  const wsTransportBob = webSocket(`ws://localhost:${anvil.port}`, {
    retryCount: 0,
    timeout: 1000,
  });
  const wsTransportCharlie = webSocket(`ws://localhost:${anvil.port}`, {
    retryCount: 0,
    timeout: 1000,
  });

  const aliceWalletClientWs = createWalletClient({
    account: aliceAccount,
    chain,
    transport: wsTransportAlice,
    pollingInterval: 1000,
  }).extend(publicActions);

  const bobWalletClientWs = createWalletClient({
    account: bobAccount,
    chain,
    transport: wsTransportBob,
    pollingInterval: 1000,
  }).extend(publicActions);

  const charlieWalletClientWs = createWalletClient({
    account: charlieAccount,
    chain,
    transport: wsTransportCharlie,
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
    wsTransports: [wsTransportAlice, wsTransportBob, wsTransportCharlie],

    deployContract,
    deployObligation,

    alice: {
      address: aliceAddress,
      privateKey: alicePrivateKey,
      client: aliceClient,
      clientWs: aliceClientWs,
    },
    bob: {
      address: bobAddress,
      privateKey: bobPrivateKey,
      client: bobClient,
      clientWs: bobClientWs,
    },
    charlie: {
      address: charlieAddress,
      privateKey: charliePrivateKey,
      client: charlieClient,
      clientWs: charlieClientWs,
    },

    addresses,
    mockAddresses,
  };
}
