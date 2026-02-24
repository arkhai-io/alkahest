import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import type { Erc20, Erc721, Erc1155 } from "../../../sdks/ts/src/types.ts";

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

      // ERC20 for ERC20 (most common case)
      if (opts.bidType === "erc20" && opts.askType === "erc20") {
        const bid: Erc20 = { address: opts.bidToken as `0x${string}`, value: BigInt(opts.bidAmount) };
        const ask: Erc20 = { address: opts.askToken as `0x${string}`, value: BigInt(opts.askAmount) };

        if (opts.permit) {
          result = await client.erc20.barter.permitAndBuyErc20ForErc20(bid, ask, expiration);
        } else {
          result = await client.erc20.barter.buyErc20ForErc20(bid, ask, expiration);
        }
      } else if (opts.bidType === "erc20" && opts.askType === "erc721") {
        const bid: Erc20 = { address: opts.bidToken as `0x${string}`, value: BigInt(opts.bidAmount) };
        const ask: Erc721 = { address: opts.askToken as `0x${string}`, id: BigInt(opts.askTokenId || "0") };

        if (opts.permit) {
          result = await client.erc20.barter.permitAndBuyErc721WithErc20(bid, ask, expiration);
        } else {
          result = await client.erc20.barter.buyErc721WithErc20(bid, ask, expiration);
        }
      } else if (opts.bidType === "erc20" && opts.askType === "erc1155") {
        const bid: Erc20 = { address: opts.bidToken as `0x${string}`, value: BigInt(opts.bidAmount) };
        const ask: Erc1155 = {
          address: opts.askToken as `0x${string}`,
          id: BigInt(opts.askTokenId || "0"),
          value: BigInt(opts.askAmount),
        };

        if (opts.permit) {
          result = await client.erc20.barter.permitAndBuyErc1155WithErc20(bid, ask, expiration);
        } else {
          result = await client.erc20.barter.buyErc1155WithErc20(bid, ask, expiration);
        }
      } else {
        throw new Error(
          `Barter combination --bid-type ${opts.bidType} --ask-type ${opts.askType} is not yet supported via CLI. ` +
            "Supported: erc20/erc20, erc20/erc721, erc20/erc1155. Use the SDK directly for other combinations.",
        );
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

      if (opts.bidType === "erc20" && opts.askType === "erc20") {
        if (opts.permit) {
          result = await client.erc20.barter.permitAndPayErc20ForErc20(uid);
        } else {
          result = await client.erc20.barter.payErc20ForErc20(uid);
        }
      } else if (opts.bidType === "erc20" && opts.askType === "erc721") {
        if (opts.permit) {
          result = await client.erc20.barter.permitAndPayErc20ForErc721(uid);
        } else {
          result = await client.erc20.barter.payErc20ForErc721(uid);
        }
      } else if (opts.bidType === "erc20" && opts.askType === "erc1155") {
        if (opts.permit) {
          result = await client.erc20.barter.permitAndPayErc20ForErc1155(uid);
        } else {
          result = await client.erc20.barter.payErc20ForErc1155(uid);
        }
      } else {
        throw new Error(
          `Barter fulfillment for --bid-type ${opts.bidType} --ask-type ${opts.askType} not yet supported via CLI.`,
        );
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
