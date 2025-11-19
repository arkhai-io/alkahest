# alkahest-ts

## usage

1. install Alkahest SDK and [Viem](https://viem.sh/) `npm install alkahest-ts viem`

2. initialize a client with a viem wallet. It must be initialized with an account, chain, and transport. only Base Sepolia is supported for now.

```ts
import { makeClient } from "alkahest-ts";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const client = makeClient(
  createWalletClient({
    account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
      nonceManager, // automatic nonce management
    }),
    chain: baseSepolia,
    transport: http(process.env.RPC_URL as string), // Base Sepolia RPC URL
  }),
);
```

## examples

### trade erc20 for erc20

```ts
// approve escrow contract to spend tokens
const escrowApproval = await clientBuyer.erc20.approve(
  { address: usdc, value: 10n },
  contractAddresses["Base Sepolia"].erc20EscrowObligation,
);
console.log(escrowApproval);

// deposit 10usdc into escrow, demanding 10eurc, with no expiration
const escrow = await clientBuyer.erc20.buyErc20ForErc20(
  { address: usdc, value: 10n },
  { address: eurc, value: 10n },
  0n,
);
console.log(escrow);

// approve payment contract to spend tokens
const paymentApproval = await clientSeller.erc20.approve(
  { address: eurc, value: 10n },
  contractAddresses["Base Sepolia"].erc20PaymentObligation,
);
console.log(paymentApproval);

// pay 10eurc for 10usdc (fulfill the buy order)
const payment = await clientSeller.erc20.payErc20ForErc20(escrow.attested.uid);
console.log(payment);
```

### trade erc20 for custom demand

```ts
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
const baseDemand = encodeAbiParameters(parseAbiParameters("(string query)"), [
  { query: "hello world" },
]);

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
const demand = clientBuyer.arbiters.encodeTrustedPartyDemand({
  creator: clientSeller.address,
  baseArbiter: contractAddresses["Base Sepolia"].trivialArbiter,
  baseDemand,
});

// approve escrow contract to spend tokens
const escrowApproval = await clientBuyer.erc20.approve(
  { address: usdc, value: 10n },
  contractAddresses["Base Sepolia"].erc20EscrowObligation,
);
clientBuyer.viemClient.waitForTransactionReceipt({ hash: escrowApproval });
console.log("escrow approval: ", escrowApproval);

// make escrow with generic escrow function,
// passing in TrustedPartyArbiter's address and our custom demand,
// and no expiration (would be a future unix timstamp in seconds if used)
const escrow = await clientBuyer.erc20.buyWithErc20(
  { address: usdc, value: 10n },
  { arbiter: contractAddresses["Base Sepolia"].trustedPartyArbiter, demand },
  0n,
);
console.log("escrow: ", escrow);

// now the seller manually decodes the statement and demand
// and creates a StringResultObligation
// and manually collects payment
const buyStatement = await clientSeller.getAttestation(escrow.attested.uid);
// ERC20EscrowObligation.StatementData
// struct StatementData {
//     address token;
//     uint256 amount;
//     address arbiter;
//     bytes demand;
// }
const decodedStatement = clientSeller.erc20.decodeEscrowObligation(
  buyStatement.data,
);
// TrustedPartyArbiter.DemandData
// if using a custom arbiter, you can instead use decodeAbiParameters directly like below
const decodedDemand = clientSeller.arbiters.decodeTrustedPartyDemand(
  decodedStatement.demand,
);
// custom base demand described above
const decodedBaseDemand = decodeAbiParameters(
  parseAbiParameters("(string query)"),
  decodedDemand.baseDemand,
)[0];

// uppercase string for the example;
// this could be anything as agreed upon between buyer and seller
// (running a Docker job, executing a DB query...)
// as long as the job "spec" is agreed upon between buyer and seller,
// and the "query" is contained in the demand
const result = decodedBaseDemand.query.toUpperCase();
console.log("result: ", result);

// manually make result statement

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
  address: contractAddresses["Base Sepolia"].jobResultObligation,
  abi: jobResultObligationAbi.abi,
  functionName: "makeStatement",
  args: [
    { result },
    "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32 0
  ],
});
console.log(resultHash);
const resultStatement = await clientSeller.getAttestationFromTxHash(resultHash);
console.log("result statement: ", resultStatement);

// and collect the payment from escrow
const collection = await clientSeller.erc20.collectEscrow(
  escrow.attested.uid,
  resultStatement.uid,
);

console.log("collection: ", collection);

// meanwhile, the buyer can wait for fulfillment of her escrow.
// if called after fulfillment, like in this case, it will
// return the fulfilling statement immediately
const fulfillment = await clientBuyer.waitForFulfillment(
  contractAddresses["Base Sepolia"].erc20EscrowObligation,
  escrow.attested.uid,
);
console.log("fulfillment: ", fulfillment);

// and extract the result from the fulfillment statement
if (!fulfillment.fulfillment) throw new Error("invalid fulfillment");
const fulfillmentData = await clientBuyer.getAttestation(
  fulfillment.fulfillment,
);
const decodedResult = decodeAbiParameters(
  parseAbiParameters("(string result)"),
  fulfillmentData.data,
)[0];
console.log("decoded result: ", decodedResult);
```

see [tests](https://github.com/CoopHive/alkahest-ts/blob/main/tests/tradeErc20.test.ts) for full example.

## Development

### Running Tests with Anvil

Tests can be run using an Anvil fork of Base Sepolia instead of connecting directly to the network. This makes tests faster and more reliable.

1. Set up your environment:
   ```
   export RPC_URL=<your-base-sepolia-rpc-url>
   ```

2. Run tests using Anvil fork:
   ```
   npm run test:anvil
   ```

3. Run a specific test file:
   ```
   npm run test:anvil:single tests/tradeErc20.test.ts
   ```

4. Start Anvil fork in a separate terminal (for debugging):
   ```
   npm run anvil
   ```
   
### Local Development Client

When developing locally with Anvil, you can create a client that connects to the local Anvil instance:

```ts
import { createWalletClient, http } from "viem";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { makeClient } from "alkahest-ts";
import { anvilChain, ANVIL_ACCOUNTS } from "./path/to/anvil";

// Connect using Anvil's default accounts
const client = makeClient(
  createWalletClient({
    account: privateKeyToAccount(ANVIL_ACCOUNTS.ALICE.privateKey, {
      nonceManager,
    }),
    chain: anvilChain,
    transport: http("http://localhost:8545"),
  }),
);
```
