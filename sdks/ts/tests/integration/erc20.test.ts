import { beforeAll, test } from "bun:test";
import {
  createWalletClient,
  decodeAbiParameters,
  encodeAbiParameters,
  http,
  nonceManager,
  parseAbiParameters,
  webSocket,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { contractAddresses, makeClient } from "../../src";

// Note: JobResultObligation contract ABI is not included in the SDK
// We inline a minimal ABI for the makeStatement function
const jobResultObligationAbi = {
  abi: [
    {
      "inputs": [
        {
          "components": [
            { "internalType": "string", "name": "result", "type": "string" }
          ],
          "internalType": "struct JobResultObligation.StatementData",
          "name": "data",
          "type": "tuple"
        },
        { "internalType": "bytes32", "name": "refUID", "type": "bytes32" }
      ],
      "name": "makeStatement",
      "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
} as const;

// Network clients - these use external network (Base Sepolia)
let clientBuyer: ReturnType<typeof makeClient>;
let clientSeller: ReturnType<typeof makeClient>;
let clientBuyerWs: ReturnType<typeof makeClient>; // WebSocket client for events
let clientSellerWs: ReturnType<typeof makeClient>; // WebSocket client for events

const usdc = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const eurc = "0x808456652fdb597867f38412077A9182bf77359F";

/**
 * Creates clients for Base Sepolia network testing
 * This function encapsulates the WebSocket setup pattern for external networks
 */
function createNetworkClients() {
  // HTTP clients for transactions (more reliable for write operations)
  const buyerClient = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string), // Base Sepolia RPC URL
    }),
  );

  const sellerClient = makeClient(
    createWalletClient({
      account: privateKeyToAccount(process.env.PRIVKEY_BOB as `0x${string}`, {
        nonceManager, // automatic nonce management
      }),
      chain: baseSepolia,
      transport: http(process.env.RPC_URL as string), // Base Sepolia RPC URL
    }),
  );

  // WebSocket clients for event watching (if WebSocket URL is available)
  let buyerClientWs: ReturnType<typeof makeClient>;
  let sellerClientWs: ReturnType<typeof makeClient>;

  if (process.env.WS_RPC_URL) {
    buyerClientWs = makeClient(
      createWalletClient({
        account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
          nonceManager,
        }),
        chain: baseSepolia,
        transport: webSocket(process.env.WS_RPC_URL as string), // WebSocket transport for real-time events
      }),
    );

    sellerClientWs = makeClient(
      createWalletClient({
        account: privateKeyToAccount(process.env.PRIVKEY_BOB as `0x${string}`, {
          nonceManager,
        }),
        chain: baseSepolia,
        transport: webSocket(process.env.WS_RPC_URL as string), // WebSocket transport for real-time events
      }),
    );
  } else {
    // Fallback to HTTP if WebSocket URL not available
    buyerClientWs = buyerClient;
    sellerClientWs = sellerClient;
  }

  return {
    buyerClient,
    sellerClient,
    buyerClientWs,
    sellerClientWs,
  };
}

const baseSepoliaAddresses = contractAddresses["Base Sepolia"];
const shouldSkip =
  !process.env.PRIVKEY_ALICE ||
  !process.env.PRIVKEY_BOB ||
  !process.env.RPC_URL ||
  !baseSepoliaAddresses ||
  baseSepoliaAddresses.trustedPartyArbiter === "0x";

beforeAll(() => {
  // Skip tests if required environment variables are not set
  if (shouldSkip) {
    console.log("Skipping external network tests - missing environment variables");
    return;
  }

  const clients = createNetworkClients();
  clientBuyer = clients.buyerClient;
  clientSeller = clients.sellerClient;
  clientBuyerWs = clients.buyerClientWs;
  clientSellerWs = clients.sellerClientWs;
});

test("tradeErc20ForErc20", async () => {
  if (shouldSkip) return;

  // approve barter utils contract to spend tokens (uses "barter" purpose for buyErc20ForErc20)
  const escrowApproval = await clientBuyer.erc20.util.approve({ address: usdc, value: 10n }, "barter");
  console.log(escrowApproval);

  // deposit 10usdc into escrow, demanding 10eurc, with no expiration
  const escrow = await clientBuyer.erc20.barter.buyErc20ForErc20(
    { address: usdc, value: 10n },
    { address: eurc, value: 10n },
    0n,
  );
  console.log(escrow);

  // approve barter utils contract to spend tokens
  const paymentApproval = await clientSeller.erc20.util.approve({ address: eurc, value: 10n }, "barter");
  console.log(paymentApproval);

  // pay 10eurc for 10usdc (fulfill the buy order)
  const payment = await clientSeller.erc20.barter.payErc20ForErc20(escrow.attested.uid);
  console.log(payment);
});

test("tradeErc20ForCustom", async () => {
  if (shouldSkip) return;

  // the example will use JobResultObligation to demand a string to be capitalized
  // but JobResultObligation is generic enough to represent much more (a db query, a Dockerfile...)
  // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Statements/JobResultObligation.sol
  //
  // for custom cases, you'll have to implement your own arbiter
  //
  // in the example, we'll use TrustedPartyArbiter and TrivialArbiter
  // to make sure the result is from a particular trusted party,
  // without actually validating the result
  // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrustedPartyArbiter.sol
  // and https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrivialArbiter.sol

  // construct custom demand. note that this could be anything, and is determined by the arbiter.
  // since our base arbiter is TrivialArbiter, which doesn't actually decode DemandData,
  // the format doesn't matter. though the seller and buyer do still have to agree on it
  // so that the seller can properly fulfill the demand.
  // struct DemandData {
  //     string query;
  // }
  const baseDemand = encodeAbiParameters(parseAbiParameters("(string query)"), [{ query: "hello world" }]);

  // we use TrustedPartyArbiter to wrap the base demand. This actually does decode DemandData,
  // and we use the DemandData format it defines,
  // to demand that only our trusted seller can fulfill the demand.
  // if the baseDemand were something other than TrivialArbiter,
  // it would be an additional check on the fulfillment.
  // many arbiters can be stacked according to this pattern.
  // TrustedPartyArbiter.DemandData:
  // struct DemandData {
  //     address creator;
  //     address baseArbiter;
  //     bytes baseDemand;
  // }
  // if using a custom Arbiter not supported by the SDK, you can use encodeAbiParameters directly,
  // like we did for the baseDemand
  if (!baseSepoliaAddresses) throw new Error("Base Sepolia addresses not found");

  const demand = clientBuyer.arbiters.general.trustedParty.encode({
    creator: clientSeller.address,
    baseArbiter: baseSepoliaAddresses.trivialArbiter,
    baseDemand,
  });

  // approve escrow contract to spend tokens
  const escrowApproval = await clientBuyer.erc20.util.approve({ address: usdc, value: 10n }, "escrow");
  clientBuyer.viemClient.waitForTransactionReceipt({ hash: escrowApproval });
  console.log("escrow approval: ", escrowApproval);

  // make escrow with generic escrow function,
  // passing in TrustedPartyArbiter's address and our custom demand,
  // and no expiration (would be a future unix timstamp in seconds if used)
  const escrow = await clientBuyer.erc20.escrow.nonTierable.create(
    { address: usdc, value: 10n },
    { arbiter: baseSepoliaAddresses.trustedPartyArbiter, demand },
    0n,
  );
  console.log("escrow: ", escrow);

  // now the seller manually decodes the obligation and demand
  // and creates a StringResultObligation
  // and manually collects payment
  const buyObligation = await clientSeller.getAttestation(escrow.attested.uid);
  // ERC20EscrowObligation.StatementData
  // struct StatementData {
  //     address token;
  //     uint256 amount;
  //     address arbiter;
  //     bytes demand;
  // }
  const decodedObligation = clientSeller.erc20.escrow.nonTierable.decodeObligation(buyObligation.data);
  // TrustedPartyArbiter.DemandData
  // if using a custom arbiter, you can instead use decodeAbiParameters directly like below
  const decodedDemand = clientSeller.arbiters.general.trustedParty.decode(decodedObligation.demand);
  // custom base demand described above
  const decodedBaseDemand = decodeAbiParameters(parseAbiParameters("(string query)"), decodedDemand.baseDemand)[0];

  // uppercase string for the example;
  // this could be anything as agreed upon between buyer and seller
  // (running a Docker job, executing a DB query...)
  // as long as the job "spec" is agreed upon between buyer and seller,
  // and the "query" is contained in the demand
  const result = decodedBaseDemand.query.toUpperCase();
  console.log("result: ", result);

  // manually make result obligation

  // JobResultObligation.StatementData:
  // struct StatementData {
  //     string result;
  // }
  //
  // JobResultObligation.makeStatement
  // function makeStatement(
  //     StatementData calldata data,
  //     bytes32 refUID
  // ) public returns (bytes32)
  const resultHash = await clientSeller.viemClient.writeContract({
    address: "0x823a06994B4e817a5127c042dBd2742CcFdF2076", // JobResultObligation custom deployment
    abi: jobResultObligationAbi.abi,
    functionName: "makeStatement",
    args: [
      { result },
      "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
    ],
  });
  console.log(resultHash);
  const resultObligation = await clientSeller.getAttestedEventFromTxHash(resultHash);
  console.log("result obligation: ", resultObligation);

  // and collect the payment from escrow
  const collection = await clientSeller.erc20.escrow.nonTierable.collectEscrow(escrow.attested.uid, resultObligation.uid);

  console.log("collection: ", collection);

  // meanwhile, the buyer can wait for fulfillment of her escrow.
  // if called after fulfillment, like in this case, it will
  // return the fulfilling obligation immediately
  // Use WebSocket client for faster event watching if available. This should auto fallback to HTTP if WS is not configured.
  const fulfillment = await clientBuyerWs.waitForFulfillment(
    baseSepoliaAddresses.erc20EscrowObligation,
    escrow.attested.uid,
  );
  console.log("fulfillment: ", fulfillment);

  // and extract the result from the fulfillment obligation
  if (!fulfillment.fulfillment) throw new Error("invalid fulfillment");
  const fulfillmentData = await clientBuyer.getAttestation(fulfillment.fulfillment);
  const decodedResult = decodeAbiParameters(parseAbiParameters("(string result)"), fulfillmentData.data)[0];
  console.log("decoded result: ", decodedResult);
});
