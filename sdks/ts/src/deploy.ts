import { parseEther } from "viem";
import type { ChainAddresses } from "./types";

// EAS
import EAS from "./contracts/eas/EAS.json";
import SchemaRegistry from "./contracts/eas/SchemaRegistry.json";

// Arbiters - General
import TrivialArbiter from "./contracts/arbiters/TrivialArbiter.json";
import TrustedOracleArbiter from "./contracts/arbiters/TrustedOracleArbiter.json";
import IntrinsicsArbiter from "./contracts/arbiters/IntrinsicsArbiter.json";
import IntrinsicsArbiter2 from "./contracts/arbiters/IntrinsicsArbiter2.json";

// Arbiters - Logical
import AllArbiter from "./contracts/arbiters/logical/AllArbiter.json";
import AnyArbiter from "./contracts/arbiters/logical/AnyArbiter.json";

// Arbiters - Attestation Properties
import AttesterArbiter from "./contracts/arbiters/attestation-properties/AttesterArbiter.json";
import ExpirationTimeAfterArbiter from "./contracts/arbiters/attestation-properties/ExpirationTimeAfterArbiter.json";
import ExpirationTimeBeforeArbiter from "./contracts/arbiters/attestation-properties/ExpirationTimeBeforeArbiter.json";
import ExpirationTimeEqualArbiter from "./contracts/arbiters/attestation-properties/ExpirationTimeEqualArbiter.json";
import RecipientArbiter from "./contracts/arbiters/attestation-properties/RecipientArbiter.json";
import RefUidArbiter from "./contracts/arbiters/attestation-properties/RefUidArbiter.json";
import RevocableArbiter from "./contracts/arbiters/attestation-properties/RevocableArbiter.json";
import SchemaArbiter from "./contracts/arbiters/attestation-properties/SchemaArbiter.json";
import TimeAfterArbiter from "./contracts/arbiters/attestation-properties/TimeAfterArbiter.json";
import TimeBeforeArbiter from "./contracts/arbiters/attestation-properties/TimeBeforeArbiter.json";
import TimeEqualArbiter from "./contracts/arbiters/attestation-properties/TimeEqualArbiter.json";
import UidArbiter from "./contracts/arbiters/attestation-properties/UidArbiter.json";

// Arbiters - Confirmation
import ExclusiveRevocableConfirmationArbiter from "./contracts/arbiters/confirmation/ExclusiveRevocableConfirmationArbiter.json";
import ExclusiveUnrevocableConfirmationArbiter from "./contracts/arbiters/confirmation/ExclusiveUnrevocableConfirmationArbiter.json";
import NonexclusiveRevocableConfirmationArbiter from "./contracts/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.json";
import NonexclusiveUnrevocableConfirmationArbiter from "./contracts/arbiters/confirmation/NonexclusiveUnrevocableConfirmationArbiter.json";

// Obligations - Escrow
import AttestationEscrowObligation from "./contracts/obligations/escrow/non-tierable/AttestationEscrowObligation.json";
import AttestationEscrowObligation2 from "./contracts/obligations/escrow/non-tierable/AttestationEscrowObligation2.json";
import ERC20EscrowObligation from "./contracts/obligations/escrow/non-tierable/ERC20EscrowObligation.json";
import ERC721EscrowObligation from "./contracts/obligations/escrow/non-tierable/ERC721EscrowObligation.json";
import ERC1155EscrowObligation from "./contracts/obligations/escrow/non-tierable/ERC1155EscrowObligation.json";
import NativeTokenEscrowObligation from "./contracts/obligations/escrow/non-tierable/NativeTokenEscrowObligation.json";
import TokenBundleEscrowObligation from "./contracts/obligations/escrow/non-tierable/TokenBundleEscrowObligation.json";

// Obligations - Payment
import ERC20PaymentObligation from "./contracts/obligations/payment/ERC20PaymentObligation.json";
import ERC721PaymentObligation from "./contracts/obligations/payment/ERC721PaymentObligation.json";
import ERC1155PaymentObligation from "./contracts/obligations/payment/ERC1155PaymentObligation.json";
import NativeTokenPaymentObligation from "./contracts/obligations/payment/NativeTokenPaymentObligation.json";
import TokenBundlePaymentObligation from "./contracts/obligations/payment/TokenBundlePaymentObligation.json";

// Obligations - Other
import StringObligation from "./contracts/obligations/StringObligation.json";
import CommitRevealObligation from "./contracts/obligations/CommitRevealObligation.json";

// Utils
import AttestationBarterUtils from "./contracts/utils/AttestationBarterUtils.json";
import ERC20BarterUtils from "./contracts/utils/ERC20BarterUtils.json";
import ERC721BarterUtils from "./contracts/utils/ERC721BarterUtils.json";
import ERC1155BarterUtils from "./contracts/utils/ERC1155BarterUtils.json";
import NativeTokenBarterUtils from "./contracts/utils/NativeTokenBarterUtils.json";
import TokenBundleBarterUtils from "./contracts/utils/TokenBundleBarterUtils.json";

export type DeployFn = (
  abi: any[],
  bytecode: `0x${string}`,
  args: any[],
) => Promise<`0x${string}`>;

export type DeployOptions = {
  scope?: "all" | "arbiters" | "obligations" | "utils";
  eas?: boolean;
  easAddress?: `0x${string}`;
  easSrAddress?: `0x${string}`;
};

type Artifact = { abi: any[]; bytecode: { object: string } };

function bytecodeOf(artifact: Artifact): `0x${string}` {
  return artifact.bytecode.object as `0x${string}`;
}

async function deploy(fn: DeployFn, artifact: Artifact, args: any[] = []): Promise<`0x${string}`> {
  return fn(artifact.abi, bytecodeOf(artifact), args);
}

export async function deployAlkahest(
  deployFn: DeployFn,
  options?: DeployOptions,
): Promise<Partial<ChainAddresses>> {
  const scope = options?.scope ?? "all";
  const result: Partial<ChainAddresses> = {};

  let easAddress = options?.easAddress;
  let easSrAddress = options?.easSrAddress;

  // 1. EAS + SchemaRegistry
  if (options?.eas) {
    easSrAddress = await deploy(deployFn, SchemaRegistry as Artifact);
    easAddress = await deploy(deployFn, EAS as Artifact, [easSrAddress]);
  }

  if (!easAddress || !easSrAddress) {
    throw new Error(
      "EAS and SchemaRegistry addresses are required. Either use eas: true to deploy, " +
        "or provide easAddress and easSrAddress.",
    );
  }

  result.eas = easAddress;
  result.easSchemaRegistry = easSrAddress;

  // 2. Arbiters
  if (scope === "all" || scope === "arbiters") {
    // Core arbiters
    result.trivialArbiter = await deploy(deployFn, TrivialArbiter as Artifact);
    result.trustedOracleArbiter = await deploy(deployFn, TrustedOracleArbiter as Artifact, [easAddress]);
    result.intrinsicsArbiter = await deploy(deployFn, IntrinsicsArbiter as Artifact);
    result.intrinsicsArbiter2 = await deploy(deployFn, IntrinsicsArbiter2 as Artifact);
    result.allArbiter = await deploy(deployFn, AllArbiter as Artifact);
    result.anyArbiter = await deploy(deployFn, AnyArbiter as Artifact);

    // Attestation property arbiters (no constructor args)
    result.attesterArbiter = await deploy(deployFn, AttesterArbiter as Artifact);
    result.recipientArbiter = await deploy(deployFn, RecipientArbiter as Artifact);
    result.refUidArbiter = await deploy(deployFn, RefUidArbiter as Artifact);
    result.revocableArbiter = await deploy(deployFn, RevocableArbiter as Artifact);
    result.schemaArbiter = await deploy(deployFn, SchemaArbiter as Artifact);
    result.uidArbiter = await deploy(deployFn, UidArbiter as Artifact);
    result.timeAfterArbiter = await deploy(deployFn, TimeAfterArbiter as Artifact);
    result.timeBeforeArbiter = await deploy(deployFn, TimeBeforeArbiter as Artifact);
    result.timeEqualArbiter = await deploy(deployFn, TimeEqualArbiter as Artifact);
    result.expirationTimeAfterArbiter = await deploy(deployFn, ExpirationTimeAfterArbiter as Artifact);
    result.expirationTimeBeforeArbiter = await deploy(deployFn, ExpirationTimeBeforeArbiter as Artifact);
    result.expirationTimeEqualArbiter = await deploy(deployFn, ExpirationTimeEqualArbiter as Artifact);

    // Confirmation arbiters (each takes [eas])
    result.exclusiveRevocableConfirmationArbiter = await deploy(
      deployFn,
      ExclusiveRevocableConfirmationArbiter as Artifact,
      [easAddress],
    );
    result.exclusiveUnrevocableConfirmationArbiter = await deploy(
      deployFn,
      ExclusiveUnrevocableConfirmationArbiter as Artifact,
      [easAddress],
    );
    result.nonexclusiveRevocableConfirmationArbiter = await deploy(
      deployFn,
      NonexclusiveRevocableConfirmationArbiter as Artifact,
      [easAddress],
    );
    result.nonexclusiveUnrevocableConfirmationArbiter = await deploy(
      deployFn,
      NonexclusiveUnrevocableConfirmationArbiter as Artifact,
      [easAddress],
    );
  }

  // 3. Obligations
  if (scope === "all" || scope === "obligations") {
    const easArgs = [easAddress, easSrAddress];

    result.erc20EscrowObligation = await deploy(deployFn, ERC20EscrowObligation as Artifact, easArgs);
    result.erc20PaymentObligation = await deploy(deployFn, ERC20PaymentObligation as Artifact, easArgs);
    result.erc721EscrowObligation = await deploy(deployFn, ERC721EscrowObligation as Artifact, easArgs);
    result.erc721PaymentObligation = await deploy(deployFn, ERC721PaymentObligation as Artifact, easArgs);
    result.erc1155EscrowObligation = await deploy(deployFn, ERC1155EscrowObligation as Artifact, easArgs);
    result.erc1155PaymentObligation = await deploy(deployFn, ERC1155PaymentObligation as Artifact, easArgs);
    result.tokenBundleEscrowObligation = await deploy(deployFn, TokenBundleEscrowObligation as Artifact, easArgs);
    result.tokenBundlePaymentObligation = await deploy(deployFn, TokenBundlePaymentObligation as Artifact, easArgs);
    result.nativeTokenEscrowObligation = await deploy(deployFn, NativeTokenEscrowObligation as Artifact, easArgs);
    result.nativeTokenPaymentObligation = await deploy(deployFn, NativeTokenPaymentObligation as Artifact, easArgs);
    result.attestationEscrowObligation = await deploy(deployFn, AttestationEscrowObligation as Artifact, easArgs);
    result.attestationEscrowObligation2 = await deploy(deployFn, AttestationEscrowObligation2 as Artifact, easArgs);
    result.stringObligation = await deploy(deployFn, StringObligation as Artifact, easArgs);
    result.commitRevealObligation = await deploy(deployFn, CommitRevealObligation as Artifact, [
      easAddress,
      easSrAddress,
      parseEther("0.01"),
      3600n,
      "0x0000000000000000000000000000000000000000",
    ]);
  }

  // 4. Utils
  if (scope === "all" || scope === "utils") {
    const erc20Escrow = result.erc20EscrowObligation;
    const erc20Payment = result.erc20PaymentObligation;
    const erc721Escrow = result.erc721EscrowObligation;
    const erc721Payment = result.erc721PaymentObligation;
    const erc1155Escrow = result.erc1155EscrowObligation;
    const erc1155Payment = result.erc1155PaymentObligation;
    const bundleEscrow = result.tokenBundleEscrowObligation;
    const bundlePayment = result.tokenBundlePaymentObligation;
    const nativeEscrow = result.nativeTokenEscrowObligation;
    const nativePayment = result.nativeTokenPaymentObligation;

    if (!erc20Escrow || !erc20Payment) {
      throw new Error(
        "Cannot deploy utils without obligation addresses. Deploy obligations first or use scope 'all'.",
      );
    }

    const barterArgs = [
      easAddress,
      erc20Escrow,
      erc20Payment,
      erc721Escrow,
      erc721Payment,
      erc1155Escrow,
      erc1155Payment,
      bundleEscrow,
      bundlePayment,
      nativeEscrow,
      nativePayment,
    ];

    result.erc20BarterUtils = await deploy(deployFn, ERC20BarterUtils as Artifact, barterArgs);
    result.erc721BarterUtils = await deploy(deployFn, ERC721BarterUtils as Artifact, barterArgs);
    result.erc1155BarterUtils = await deploy(deployFn, ERC1155BarterUtils as Artifact, barterArgs);
    result.nativeTokenBarterUtils = await deploy(deployFn, NativeTokenBarterUtils as Artifact, barterArgs);
    result.tokenBundleBarterUtils = await deploy(deployFn, TokenBundleBarterUtils as Artifact, [
      easAddress,
      bundleEscrow,
      bundlePayment,
    ]);
    result.attestationBarterUtils = await deploy(deployFn, AttestationBarterUtils as Artifact, [
      easAddress,
      easSrAddress,
      result.attestationEscrowObligation2,
    ]);
  }

  return result;
}
