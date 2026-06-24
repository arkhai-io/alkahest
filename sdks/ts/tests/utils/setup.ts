import { createAnvil } from "@viem/anvil";
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
import { deployAlkahest, type DeployFn } from "../../src/deploy";
import type { ChainAddresses } from "../../src/types";
import MockERC20Permit from "../fixtures/MockERC20Permit.json";
import MockERC721 from "../fixtures/MockERC721.json";
import MockERC1155 from "../fixtures/MockERC1155.json";
import { type AlkahestTestActions, createTokenTestExtension } from "./tokenTestUtils";

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
  addresses: TestContext_Addresses;

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

type TestContext_Addresses = {
  [K in keyof ChainAddresses]: `0x${string}`;
} & {
  erc8004Arbiter: `0x${string}`;
  notArbiter: `0x${string}`;
};

// Global flag to track if we've set up WebSocket error suppression
let wsErrorSuppressionInstalled = false;
let originalConsoleError: typeof console.error;

function installWebSocketErrorSuppression() {
  if (wsErrorSuppressionInstalled) return;

  originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args.join(" ");
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

export type AlkahestChainSetup =
  | {
      type: "managedAnvil";
      anvilOptions?: Partial<Parameters<typeof createAnvil>[0]>;
    };

export type AlkahestEasSetup =
  | { type: "deploy" }
  | {
      type: "existing";
      easAddress: `0x${string}`;
      easSrAddress: `0x${string}`;
    };

export type AlkahestMockSetup = {
  deploy: boolean;
  setupState: boolean;
};

export interface SetupAlkahestEnvironmentOptions {
  chain?: AlkahestChainSetup;
  eas?: AlkahestEasSetup;
  mocks?: AlkahestMockSetup;
}

export interface SetupTestEnvironmentOptions {
  anvilOptions?: Partial<Parameters<typeof createAnvil>[0]>;
  eas?: boolean;
  easAddress?: `0x${string}`;
  easSrAddress?: `0x${string}`;
  deployMocks?: boolean;
  setupMockState?: boolean;
}

export async function setupTestEnvironment(options?: SetupTestEnvironmentOptions): Promise<TestContext> {
  let eas: AlkahestEasSetup;
  if (options?.easAddress || options?.easSrAddress) {
    if (!options.easAddress || !options.easSrAddress) {
      throw new Error("easAddress and easSrAddress must be provided together.");
    }
    eas = { type: "existing", easAddress: options.easAddress, easSrAddress: options.easSrAddress };
  } else if (options?.eas === false) {
    throw new Error("easAddress and easSrAddress are required when eas is false.");
  } else {
    eas = { type: "deploy" };
  }

  return setupAlkahestEnvironment({
    chain: { type: "managedAnvil", anvilOptions: options?.anvilOptions },
    eas,
    mocks: {
      deploy: options?.deployMocks ?? true,
      setupState: options?.setupMockState ?? options?.deployMocks ?? true,
    },
  });
}

export async function setupAlkahestEnvironment(options?: SetupAlkahestEnvironmentOptions): Promise<TestContext> {
  installWebSocketErrorSuppression();

  const chainSetup = options?.chain ?? { type: "managedAnvil" as const };
  if (chainSetup.type !== "managedAnvil") {
    throw new Error("Only managedAnvil chain setup is currently supported by the TS test environment.");
  }

  const port = Math.floor(Math.random() * 10000) + 50000;

  const defaultAnvilConfig = {
    port,
    host: "127.0.0.1",
    chainId: 31337,
  };

  const anvilConfig = { ...defaultAnvilConfig, ...chainSetup.anvilOptions };
  const anvil = createAnvil(anvilConfig);
  await anvil.start();

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

  const aliceAccount = privateKeyToAccount(alicePrivateKey, { nonceManager });
  const bobAccount = privateKeyToAccount(bobPrivateKey, { nonceManager });
  const charlieAccount = privateKeyToAccount(charliePrivateKey, { nonceManager });
  const aliceAddress = aliceAccount.address;
  const bobAddress = bobAccount.address;
  const charlieAddress = charlieAccount.address;

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

  // Deploy all Alkahest contracts using shared function
  const deployContractHelper = async <T extends { abi: any; bytecode: { object: string } }>(
    contract: T,
    args: any[] = [],
  ): Promise<`0x${string}`> => {
    const hash = await testClient.deployContract({
      abi: contract.abi,
      bytecode: contract.bytecode.object as `0x${string}`,
      args,
    });
    const receipt = await testClient.waitForTransactionReceipt({ hash });
    return receipt.contractAddress as `0x${string}`;
  };

  const deployFn: DeployFn = async (abi, bytecode, args) => {
    const hash = await testClient.deployContract({ abi, bytecode, args });
    const receipt = await testClient.waitForTransactionReceipt({ hash });
    return receipt.contractAddress as `0x${string}`;
  };

  const easSetup = options?.eas ?? { type: "deploy" as const };
  const deployed = await deployAlkahest(deployFn, {
    eas: easSetup.type === "deploy",
    easAddress: easSetup.type === "existing" ? easSetup.easAddress : undefined,
    easSrAddress: easSetup.type === "existing" ? easSetup.easSrAddress : undefined,
  });

  const zeroAddr = "0x0000000000000000000000000000000000000000" as `0x${string}`;
  const addresses: TestContext_Addresses = {
    ...(deployed as ChainAddresses),
    // These aren't deployed by deployAlkahest but tests expect them in the type
    erc8004Arbiter: (deployed as any).erc8004Arbiter ?? zeroAddr,
    notArbiter: zeroAddr,
  };

  const deployObligation = async <T extends { abi: any; bytecode: { object: string } }>(
    contract: T,
  ): Promise<`0x${string}`> => {
    return deployContractHelper(contract, [addresses.eas, addresses.easSchemaRegistry]);
  };

  const mockSetup = options?.mocks ?? { deploy: true, setupState: true };

  // Deploy mock tokens
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

  if (mockSetup.deploy) {
    mockAddresses.erc20A = await deployContractHelper(MockERC20Permit, ["Token A", "TKA"]);
    mockAddresses.erc20B = await deployContractHelper(MockERC20Permit, ["Token B", "TKB"]);
    mockAddresses.erc20C = await deployContractHelper(MockERC20Permit, ["Token C", "TKC"]);
    mockAddresses.erc721A = await deployContractHelper(MockERC721);
    mockAddresses.erc721B = await deployContractHelper(MockERC721);
    mockAddresses.erc721C = await deployContractHelper(MockERC721);
    mockAddresses.erc1155A = await deployContractHelper(MockERC1155);
    mockAddresses.erc1155B = await deployContractHelper(MockERC1155);
    mockAddresses.erc1155C = await deployContractHelper(MockERC1155);
  }

  // Distribute tokens to test accounts
  if (mockSetup.setupState) {
    await seedMockTokenState(testClient, mockAddresses, {
      alice: aliceAddress,
      bob: bobAddress,
      charlie: charlieAddress,
    });
  }

  // Create Alkahest clients
  const aliceClient = makeClient(aliceWalletClient, addresses);
  const bobClient = makeClient(bobWalletClient, addresses);
  const charlieClient = makeClient(charlieWalletClient, addresses);

  // Create WebSocket clients
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

  const anvilInitState = await testClient.dumpState();

  return {
    anvil,
    testClient,
    anvilInitState,
    wsTransports: [wsTransportAlice, wsTransportBob, wsTransportCharlie],

    deployContract: deployContractHelper,
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

export async function seedMockTokenState(
  testClient: any,
  mockAddresses: TestContext["mockAddresses"],
  recipients: { alice: `0x${string}`; bob: `0x${string}`; charlie: `0x${string}` },
) {
  if (
    !mockAddresses.erc20A ||
    !mockAddresses.erc20B ||
    !mockAddresses.erc20C ||
    !mockAddresses.erc721A ||
    !mockAddresses.erc721B ||
    !mockAddresses.erc721C ||
    !mockAddresses.erc1155A ||
    !mockAddresses.erc1155B ||
    !mockAddresses.erc1155C
  ) {
    throw new Error("Cannot seed mock token state without deployed mock addresses.");
  }

  await testClient.writeContract({
    address: mockAddresses.erc20A,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [recipients.alice, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc20B,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [recipients.bob, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721A,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [recipients.alice],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721B,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [recipients.bob],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155A,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [recipients.alice, 1n, 100n],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155B,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [recipients.bob, 1n, 100n],
  });

  await testClient.writeContract({
    address: mockAddresses.erc20C,
    abi: MockERC20Permit.abi,
    functionName: "transfer",
    args: [recipients.charlie, parseEther("1000")],
  });

  await testClient.writeContract({
    address: mockAddresses.erc721C,
    abi: MockERC721.abi,
    functionName: "mint",
    args: [recipients.charlie],
  });

  await testClient.writeContract({
    address: mockAddresses.erc1155C,
    abi: MockERC1155.abi,
    functionName: "mint",
    args: [recipients.charlie, 1n, 100n],
  });
}
