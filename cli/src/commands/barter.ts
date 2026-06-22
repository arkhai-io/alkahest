import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import type { Demand, Erc20, Erc721, Erc1155 } from "../../../sdks/ts/src/types.ts";

type SupportedAskType = "erc20" | "erc721" | "erc1155";

function assertSupportedAskType(value: string): asserts value is SupportedAskType {
  if (value !== "erc20" && value !== "erc721" && value !== "erc1155") {
    throw new Error(`Unsupported ask type ${value}. Supported: erc20, erc721, erc1155.`);
  }
}

async function getErc20EscrowDemand(client: ReturnType<typeof createAlkahestClient>, uid: `0x${string}`) {
  const escrow = await client.erc20.escrow.default.getObligation(uid);
  return escrow.data as {
    token: `0x${string}`;
    amount: bigint;
    arbiter: `0x${string}`;
    demand: `0x${string}`;
  };
}

export function makeBarterCommand() {
  const barter = new Command("barter").description("Barter operations");

  const create = new Command("create")
    .description("Create a barter offer (escrow bid, demanding ask)")
    .requiredOption("--bid-type <type>", "Bid token type (erc20, erc721, erc1155, native)")
    .requiredOption("--ask-type <type>", "Ask token type (erc20, erc721, erc1155, native)")
    .requiredOption("--bid-token <address>", "Bid token address")
    .requiredOption("--bid-amount <wei>", "Bid amount in wei")
    .option("--bid-token-id <id>", "Bid token ID (for ERC721/ERC1155)")
    .requiredOption("--ask-token <address>", "Ask token address")
    .requiredOption("--ask-amount <wei>", "Ask amount in wei")
    .option("--ask-token-id <id>", "Ask token ID (for ERC721/ERC1155)")
    .requiredOption("--expiration <unix>", "Expiration timestamp (unix seconds)")
    .option("--approve", "Approve tokens before creating")
    .option("--permit", "Use permit for token approval");

  create.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const expiration = BigInt(opts.expiration);
      let result: { hash: `0x${string}`; attested: any };

      if (opts.bidType !== "erc20") {
        throw new Error(
          `Barter combination --bid-type ${opts.bidType} --ask-type ${opts.askType} is not yet supported via CLI. ` +
            "Supported: erc20/erc20, erc20/erc721, erc20/erc1155. Use the SDK directly for other combinations.",
        );
      }

      if (opts.permit) {
        throw new Error("--permit is not supported for barter create. Use --approve or pre-approve the ERC20 escrow.");
      }

      assertSupportedAskType(opts.askType);

      const bid: Erc20 = { address: opts.bidToken as `0x${string}`, value: BigInt(opts.bidAmount) };
      let demand: Demand;

      if (opts.askType === "erc20") {
        const ask: Erc20 = { address: opts.askToken as `0x${string}`, value: BigInt(opts.askAmount) };
        demand = {
          arbiter: client.erc20.payment.address,
          demand: client.erc20.payment.encodeObligation(ask, account.address),
        };
      } else if (opts.askType === "erc721") {
        const ask: Erc721 = { address: opts.askToken as `0x${string}`, id: BigInt(opts.askTokenId || "0") };
        demand = {
          arbiter: client.erc721.payment.address,
          demand: client.erc721.payment.encodeObligation(ask, account.address),
        };
      } else {
        const ask: Erc1155 = {
          address: opts.askToken as `0x${string}`,
          id: BigInt(opts.askTokenId || "0"),
          value: BigInt(opts.askAmount),
        };
        demand = {
          arbiter: client.erc1155.payment.address,
          demand: client.erc1155.payment.encodeObligation(ask, account.address),
        };
      }

      result = opts.approve
        ? await client.erc20.escrow.default.approveAndCreate(bid, demand, expiration)
        : await client.erc20.escrow.default.create(bid, demand, expiration);

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
      outputError("BARTER_CREATE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const fulfill = new Command("fulfill")
    .description("Fulfill a barter offer")
    .requiredOption("--uid <uid>", "Barter escrow attestation UID")
    .requiredOption("--bid-type <type>", "Original bid type (erc20)")
    .requiredOption("--ask-type <type>", "Original ask type (erc20, erc721, erc1155)")
    .option("--approve", "Approve tokens before fulfilling")
    .option("--permit", "Use permit for token approval");

  fulfill.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const uid = opts.uid as `0x${string}`;
      let result: { hash: `0x${string}`; attested: any };

      if (opts.bidType !== "erc20") {
        throw new Error(
          `Barter fulfillment for --bid-type ${opts.bidType} --ask-type ${opts.askType} not yet supported via CLI.`,
        );
      }

      assertSupportedAskType(opts.askType);

      if (opts.askType === "erc20") {
        if (opts.permit) {
          result = await client.erc20.payment.permitAndPayErc20AndCollect(uid);
        } else {
          if (opts.approve) {
            const escrow = await getErc20EscrowDemand(client, uid);
            const ask = client.erc20.payment.decodeObligation(escrow.demand) as {
              token: `0x${string}`;
              amount: bigint;
              payee: `0x${string}`;
            };
            await client.erc20.util.approve({ address: ask.token, value: ask.amount }, "atomicPayment");
          }
          result = await client.erc20.payment.payErc20AndCollect(uid);
        }
      } else if (opts.askType === "erc721") {
        if (opts.permit) {
          throw new Error("--permit is only supported when the ask token is ERC20.");
        }
        if (opts.approve) {
          const escrow = await getErc20EscrowDemand(client, uid);
          const ask = client.erc721.payment.decodeObligation(escrow.demand) as {
            token: `0x${string}`;
            tokenId: bigint;
            payee: `0x${string}`;
          };
          await client.erc721.util.approve({ address: ask.token, id: ask.tokenId }, "atomicPayment");
        }
        result = await client.erc721.payment.payErc721AndCollect(uid);
      } else {
        if (opts.permit) {
          throw new Error("--permit is only supported when the ask token is ERC20.");
        }
        if (opts.approve) {
          const escrow = await getErc20EscrowDemand(client, uid);
          const ask = client.erc1155.payment.decodeObligation(escrow.demand) as {
            token: `0x${string}`;
            tokenId: bigint;
            amount: bigint;
            payee: `0x${string}`;
          };
          await client.erc1155.util.approveAll(ask.token, "atomicPayment");
        }
        result = await client.erc1155.payment.payErc1155AndCollect(uid);
      }

      outputSuccess(
        {
          hash: result.hash,
          uid: result.attested.uid,
        },
        human,
      );
    } catch (e: any) {
      outputError("BARTER_FULFILL_FAILED", e.message, human);
      process.exit(1);
    }
  });

  barter.addCommand(create);
  barter.addCommand(fulfill);

  return barter;
}
