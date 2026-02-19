import { Command } from "commander";
import { addTokenTypeFlags, resolveTokenType, type TokenType } from "../token-type.ts";
import { createAlkahestClient } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import type { AlkahestClient } from "../../../sdks/ts/src/index.ts";
import type { Demand, Erc20, Erc721, Erc1155 } from "../../../sdks/ts/src/types.ts";

function getEscrowClient(client: AlkahestClient, tokenType: TokenType) {
  switch (tokenType) {
    case "erc20":
      return client.erc20.escrow.nonTierable;
    case "erc721":
      return client.erc721.escrow.nonTierable;
    case "erc1155":
      return client.erc1155.escrow.nonTierable;
    case "native":
      return client.nativeToken.escrow.nonTierable;
    case "bundle":
      return client.bundle.escrow.nonTierable;
  }
}

function getEscrowContractAddress(client: AlkahestClient, tokenType: TokenType): `0x${string}` {
  switch (tokenType) {
    case "erc20":
      return client.contractAddresses.erc20EscrowObligation;
    case "erc721":
      return client.contractAddresses.erc721EscrowObligation;
    case "erc1155":
      return client.contractAddresses.erc1155EscrowObligation;
    case "native":
      return client.contractAddresses.nativeTokenEscrowObligation;
    case "bundle":
      return client.contractAddresses.tokenBundleEscrowObligation;
  }
}

export function makeEscrowCommand() {
  const escrow = new Command("escrow").description("Escrow operations");

  // escrow create
  const create = new Command("create")
    .description("Create an escrow")
    .requiredOption("--token <address>", "Token contract address")
    .requiredOption("--amount <wei>", "Amount in wei")
    .option("--token-id <id>", "Token ID (for ERC721/ERC1155)")
    .requiredOption("--arbiter <address>", "Arbiter contract address")
    .requiredOption("--demand <hex>", "Encoded demand data (hex)")
    .requiredOption("--expiration <unix>", "Expiration timestamp (unix seconds)")
    .option("--approve", "Approve tokens before creating")
    .option("--permit", "Use permit for token approval");

  addTokenTypeFlags(create);

  create.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);
      const tokenType = resolveTokenType(opts);

      const demand: Demand = {
        arbiter: opts.arbiter as `0x${string}`,
        demand: opts.demand as `0x${string}`,
      };
      const expiration = BigInt(opts.expiration);

      let result: { hash: `0x${string}`; attested: any };

      if (tokenType === "erc20") {
        const price: Erc20 = {
          address: opts.token as `0x${string}`,
          value: BigInt(opts.amount),
        };
        const escrowClient = client.erc20.escrow.nonTierable;
        if (opts.permit) {
          result = await escrowClient.permitAndCreate(price, demand, expiration);
        } else if (opts.approve) {
          result = await escrowClient.approveAndCreate(price, demand, expiration);
        } else {
          result = await escrowClient.create(price, demand, expiration);
        }
      } else if (tokenType === "erc721") {
        const token: Erc721 = {
          address: opts.token as `0x${string}`,
          id: BigInt(opts.tokenId || "0"),
        };
        const escrowClient = client.erc721.escrow.nonTierable;
        if (opts.approve) {
          result = await escrowClient.approveAndCreate(token, demand, expiration);
        } else {
          result = await escrowClient.create(token, demand, expiration);
        }
      } else if (tokenType === "erc1155") {
        const token: Erc1155 = {
          address: opts.token as `0x${string}`,
          id: BigInt(opts.tokenId || "0"),
          value: BigInt(opts.amount),
        };
        const escrowClient = client.erc1155.escrow.nonTierable;
        if (opts.approve) {
          result = await escrowClient.approveAndCreate(token, demand, expiration);
        } else {
          result = await escrowClient.create(token, demand, expiration);
        }
      } else if (tokenType === "native") {
        const escrowClient = client.nativeToken.escrow.nonTierable;
        result = await escrowClient.create(BigInt(opts.amount), demand, expiration);
      } else {
        throw new Error("Bundle escrow create not yet supported via CLI. Use the SDK directly.");
      }

      outputSuccess(
        {
          hash: result.hash,
          uid: result.attested.uid,
          recipient: result.attested.recipient,
          attester: result.attested.attester,
        },
        human,
      );
    } catch (e: any) {
      outputError("ESCROW_CREATE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  // escrow collect
  const collect = new Command("collect")
    .description("Collect an escrow after fulfillment")
    .requiredOption("--escrow-uid <uid>", "Escrow attestation UID")
    .requiredOption("--fulfillment-uid <uid>", "Fulfillment attestation UID");

  addTokenTypeFlags(collect);

  collect.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);
      const tokenType = resolveTokenType(opts);

      const escrowClient = getEscrowClient(client, tokenType);
      const hash = await escrowClient.collect(
        opts.escrowUid as `0x${string}`,
        opts.fulfillmentUid as `0x${string}`,
      );

      outputSuccess({ hash }, human);
    } catch (e: any) {
      outputError("ESCROW_COLLECT_FAILED", e.message, human);
      process.exit(1);
    }
  });

  // escrow reclaim
  const reclaim = new Command("reclaim")
    .description("Reclaim an expired escrow")
    .requiredOption("--uid <uid>", "Escrow attestation UID");

  addTokenTypeFlags(reclaim);

  reclaim.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);
      const tokenType = resolveTokenType(opts);

      const escrowClient = getEscrowClient(client, tokenType);
      const hash = await escrowClient.reclaimExpired(opts.uid as `0x${string}`);

      outputSuccess({ hash }, human);
    } catch (e: any) {
      outputError("ESCROW_RECLAIM_FAILED", e.message, human);
      process.exit(1);
    }
  });

  // escrow get
  const get = new Command("get")
    .description("Get escrow details by UID")
    .requiredOption("--uid <uid>", "Escrow attestation UID");

  addTokenTypeFlags(get);

  get.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);
      const tokenType = resolveTokenType(opts);

      const escrowClient = getEscrowClient(client, tokenType);
      const obligation = await escrowClient.getObligation(opts.uid as `0x${string}`);

      outputSuccess(obligation, human);
    } catch (e: any) {
      outputError("ESCROW_GET_FAILED", e.message, human);
      process.exit(1);
    }
  });

  // escrow wait
  const wait = new Command("wait")
    .description("Wait for an escrow to be fulfilled")
    .requiredOption("--uid <uid>", "Escrow attestation UID");

  addTokenTypeFlags(wait);

  wait.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);
      const tokenType = resolveTokenType(opts);

      const contractAddress = getEscrowContractAddress(client, tokenType);
      const fulfillment = await client.waitForFulfillment(
        contractAddress,
        opts.uid as `0x${string}`,
      );

      outputSuccess(fulfillment, human);
    } catch (e: any) {
      outputError("ESCROW_WAIT_FAILED", e.message, human);
      process.exit(1);
    }
  });

  escrow.addCommand(create);
  escrow.addCommand(collect);
  escrow.addCommand(reclaim);
  escrow.addCommand(get);
  escrow.addCommand(wait);

  return escrow;
}
