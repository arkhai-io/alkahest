import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import type { Erc20 } from "../../../sdks/ts/src/types.ts";

const ZERO_UID = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

export function makePaymentCommand() {
  const payment = new Command("payment").description("Payment operations");

  const pay = new Command("pay")
    .description("Make a payment")
    .option("--erc20", "ERC20 token payment")
    .option("--native", "Native token payment")
    .option("--token <address>", "Token contract address (required for ERC20)")
    .requiredOption("--amount <wei>", "Amount in wei")
    .requiredOption("--payee <address>", "Payee address")
    .option("--ref-uid <uid>", "Reference attestation UID")
    .option("--approve", "Approve tokens before paying")
    .option("--permit", "Use permit for token approval");

  pay.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      if (!opts.native && !opts.token) {
        throw new Error("--token is required for ERC20 payments");
      }

      const refUID = (opts.refUid as `0x${string}`) || ZERO_UID;
      let result: { hash: `0x${string}`; attested: any };

      if (opts.native) {
        result = await client.nativeToken.payment.pay(
          { amount: BigInt(opts.amount), payee: opts.payee as `0x${string}` },
          refUID,
        );
      } else {
        // Default to ERC20
        const price: Erc20 = {
          address: opts.token as `0x${string}`,
          value: BigInt(opts.amount),
        };
        const payee = opts.payee as `0x${string}`;

        if (opts.permit) {
          result = await client.erc20.payment.permitAndPay(price, payee, refUID);
        } else if (opts.approve) {
          result = await client.erc20.payment.approveAndPay(price, payee, refUID);
        } else {
          result = await client.erc20.payment.pay(price, payee, refUID);
        }
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
      outputError("PAYMENT_PAY_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const get = new Command("get")
    .description("Get payment details by UID")
    .option("--erc20", "ERC20 payment")
    .option("--native", "Native token payment")
    .requiredOption("--uid <uid>", "Payment attestation UID");

  get.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      let obligation: any;
      if (opts.native) {
        obligation = await client.nativeToken.payment.getObligation(opts.uid as `0x${string}`);
      } else {
        obligation = await client.erc20.payment.getObligation(opts.uid as `0x${string}`);
      }

      outputSuccess(obligation, human);
    } catch (e: any) {
      outputError("PAYMENT_GET_FAILED", e.message, human);
      process.exit(1);
    }
  });

  payment.addCommand(pay);
  payment.addCommand(get);

  return payment;
}
