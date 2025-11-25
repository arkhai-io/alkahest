// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {EASDeployer} from "test/utils/EASDeployer.sol";

// ERC20 Contracts
import {ERC20EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol";
import {ERC20PaymentObligation} from "@src/obligations/ERC20PaymentObligation.sol";
import {ERC20BarterUtils} from "@src/utils/ERC20BarterUtils.sol";

// ERC721 Contracts
import {ERC721EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC721EscrowObligation.sol";
import {ERC721PaymentObligation} from "@src/obligations/ERC721PaymentObligation.sol";
import {ERC721BarterUtils} from "@src/utils/ERC721BarterUtils.sol";

// ERC1155 Contracts
import {ERC1155EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC1155EscrowObligation.sol";
import {ERC1155PaymentObligation} from "@src/obligations/ERC1155PaymentObligation.sol";
import {ERC1155BarterUtils} from "@src/utils/ERC1155BarterUtils.sol";

// TokenBundle Contracts
import {TokenBundleEscrowObligation} from "@src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol";
import {TokenBundlePaymentObligation} from "@src/obligations/TokenBundlePaymentObligation.sol";
import {TokenBundleBarterUtils} from "@src/utils/TokenBundleBarterUtils.sol";

// Native Token Contracts
import {NativeTokenEscrowObligation} from "@src/obligations/escrow/non-tierable/NativeTokenEscrowObligation.sol";
import {NativeTokenPaymentObligation} from "@src/obligations/NativeTokenPaymentObligation.sol";
import {NativeTokenBarterUtils} from "@src/utils/NativeTokenBarterUtils.sol";

// Attestation Contracts
import {AttestationEscrowObligation} from "@src/obligations/escrow/non-tierable/AttestationEscrowObligation.sol";
import {AttestationEscrowObligation2} from "@src/obligations/escrow/non-tierable/AttestationEscrowObligation2.sol";
import {AttestationBarterUtils} from "@src/utils/AttestationBarterUtils.sol";

// Arbiter Contracts
// import {SpecificAttestationArbiter} from "@src/arbiters/SpecificAttestationArbiter.sol";
// import {TrustedPartyArbiter} from "@src/arbiters/TrustedPartyArbiter.sol";
import {TrivialArbiter} from "@src/arbiters/TrivialArbiter.sol";
import {TrustedOracleArbiter} from "@src/arbiters/TrustedOracleArbiter.sol";

// Additional Arbiters
import {AllArbiter} from "@src/arbiters/logical/AllArbiter.sol";
import {AnyArbiter} from "@src/arbiters/logical/AnyArbiter.sol";
import {IntrinsicsArbiter} from "@src/arbiters/IntrinsicsArbiter.sol";
import {IntrinsicsArbiter2} from "@src/arbiters/IntrinsicsArbiter2.sol";
import {ERC8004Arbiter} from "@src/arbiters/ERC8004Arbiter.sol";

// Confirmation Arbiters
import {ConfirmationArbiter} from "@src/arbiters/confirmation/ConfirmationArbiter.sol";
import {ConfirmationArbiterComposing} from "@src/arbiters/confirmation/ConfirmationArbiterComposing.sol";
import {RevocableConfirmationArbiter} from "@src/arbiters/confirmation/RevocableConfirmationArbiter.sol";
import {RevocableConfirmationArbiterComposing} from "@src/arbiters/confirmation/RevocableConfirmationArbiterComposing.sol";
import {UnrevocableConfirmationArbiter} from "@src/arbiters/confirmation/UnrevocableConfirmationArbiter.sol";
import {UnrevocableConfirmationArbiterComposing} from "@src/arbiters/confirmation/UnrevocableConfirmationArbiterComposing.sol";

// Attestation Property Arbiters
import {AttesterArbiter} from "@src/arbiters/attestation-properties/AttesterArbiter.sol";
import {ExpirationTimeAfterArbiter} from "@src/arbiters/attestation-properties/ExpirationTimeAfterArbiter.sol";
import {ExpirationTimeBeforeArbiter} from "@src/arbiters/attestation-properties/ExpirationTimeBeforeArbiter.sol";
import {ExpirationTimeEqualArbiter} from "@src/arbiters/attestation-properties/ExpirationTimeEqualArbiter.sol";
import {RecipientArbiter} from "@src/arbiters/attestation-properties/RecipientArbiter.sol";
import {RefUidArbiter} from "@src/arbiters/attestation-properties/RefUidArbiter.sol";
import {RevocableArbiter} from "@src/arbiters/attestation-properties/RevocableArbiter.sol";
import {SchemaArbiter} from "@src/arbiters/attestation-properties/SchemaArbiter.sol";
import {TimeAfterArbiter} from "@src/arbiters/attestation-properties/TimeAfterArbiter.sol";
import {TimeBeforeArbiter} from "@src/arbiters/attestation-properties/TimeBeforeArbiter.sol";
import {TimeEqualArbiter} from "@src/arbiters/attestation-properties/TimeEqualArbiter.sol";
import {UidArbiter} from "@src/arbiters/attestation-properties/UidArbiter.sol";

// String Obligation
import {StringObligation} from "@src/obligations/StringObligation.sol";

contract Deploy is Script {
    function run() external {
        // Load environment variables
        string memory easAddressStr = vm.envString("EAS_ADDRESS");
        string memory easSrAddressStr = vm.envString("EAS_SR_ADDRESS");
        uint256 deployerPrivateKey = vm.envUint("DEPLOYMENT_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy EAS and schema registry if needed
        address easAddress;
        address schemaRegistryAddress;

        bool shouldDeployEAS = keccak256(abi.encodePacked(easAddressStr)) == keccak256(abi.encodePacked("deploy"));
        bool shouldDeploySR = keccak256(abi.encodePacked(easSrAddressStr)) == keccak256(abi.encodePacked("deploy"));

        if (shouldDeployEAS || shouldDeploySR) {
            require(shouldDeployEAS && shouldDeploySR, "Both EAS_ADDRESS and EAS_SR_ADDRESS must be 'deploy' or both must be addresses");

            EASDeployer easDeployer = new EASDeployer();
            (IEAS eas, ISchemaRegistry schemaRegistry) = easDeployer.deployEAS();
            easAddress = address(eas);
            schemaRegistryAddress = address(schemaRegistry);
        } else {
            easAddress = vm.parseAddress(easAddressStr);
            schemaRegistryAddress = vm.parseAddress(easSrAddressStr);
        }

        // Deploy arbiters
        // SpecificAttestationArbiter specificArbiter = new SpecificAttestationArbiter();
        // TrustedPartyArbiter trustedPartyArbiter = new TrustedPartyArbiter();
        TrivialArbiter trivialArbiter = new TrivialArbiter();
        TrustedOracleArbiter trustedOracleArbiter = new TrustedOracleArbiter(
            IEAS(easAddress)
        );

        // Deploy Additional Arbiters
        AllArbiter allArbiter = new AllArbiter();
        AnyArbiter anyArbiter = new AnyArbiter();
        IntrinsicsArbiter intrinsicsArbiter = new IntrinsicsArbiter();
        IntrinsicsArbiter2 intrinsicsArbiter2 = new IntrinsicsArbiter2();
        ERC8004Arbiter erc8004Arbiter = new ERC8004Arbiter();

        // Deploy Confirmation Arbiters
        ConfirmationArbiter confirmationArbiter = new ConfirmationArbiter(
            IEAS(easAddress)
        );
        ConfirmationArbiterComposing confirmationArbiterComposing = new ConfirmationArbiterComposing(
            IEAS(easAddress)
        );
        RevocableConfirmationArbiter revocableConfirmationArbiter = new RevocableConfirmationArbiter(
            IEAS(easAddress)
        );
        RevocableConfirmationArbiterComposing revocableConfirmationArbiterComposing = new RevocableConfirmationArbiterComposing(
            IEAS(easAddress)
        );
        UnrevocableConfirmationArbiter unrevocableConfirmationArbiter = new UnrevocableConfirmationArbiter(
            IEAS(easAddress)
        );
        UnrevocableConfirmationArbiterComposing unrevocableConfirmationArbiterComposing = new UnrevocableConfirmationArbiterComposing(
            IEAS(easAddress)
        );

        // Deploy Attestation Property Arbiters
        AttesterArbiter attesterArbiter = new AttesterArbiter();
        ExpirationTimeAfterArbiter expirationTimeAfterArbiter = new ExpirationTimeAfterArbiter();
        ExpirationTimeBeforeArbiter expirationTimeBeforeArbiter = new ExpirationTimeBeforeArbiter();
        ExpirationTimeEqualArbiter expirationTimeEqualArbiter = new ExpirationTimeEqualArbiter();
        RecipientArbiter recipientArbiter = new RecipientArbiter();
        RefUidArbiter refUidArbiter = new RefUidArbiter();
        RevocableArbiter revocableArbiter = new RevocableArbiter();
        SchemaArbiter schemaArbiter = new SchemaArbiter();
        TimeAfterArbiter timeAfterArbiter = new TimeAfterArbiter();
        TimeBeforeArbiter timeBeforeArbiter = new TimeBeforeArbiter();
        TimeEqualArbiter timeEqualArbiter = new TimeEqualArbiter();
        UidArbiter uidArbiter = new UidArbiter();

        // Deploy StringObligation
        StringObligation stringObligation = new StringObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );

        // Deploy ERC20 contracts
        ERC20EscrowObligation erc20Escrow = new ERC20EscrowObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        ERC20PaymentObligation erc20Payment = new ERC20PaymentObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        // ERC20BarterUtils erc20BarterUtils = new ERC20BarterUtils(
        //     IEAS(easAddress),
        //     erc20Escrow,
        //     erc20Payment
        // );

        // Deploy ERC721 contracts
        ERC721EscrowObligation erc721Escrow = new ERC721EscrowObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        ERC721PaymentObligation erc721Payment = new ERC721PaymentObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        // ERC721BarterUtils erc721BarterUtils = new ERC721BarterUtils(
        //     IEAS(easAddress),
        //     erc721Escrow,
        //     erc721Payment
        // );

        // Deploy ERC1155 contracts
        ERC1155EscrowObligation erc1155Escrow = new ERC1155EscrowObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        ERC1155PaymentObligation erc1155Payment = new ERC1155PaymentObligation(
            IEAS(easAddress),
            ISchemaRegistry(schemaRegistryAddress)
        );
        // ERC1155BarterUtils erc1155BarterUtils = new ERC1155BarterUtils(
        //     IEAS(easAddress),
        //     erc1155Escrow,
        //     erc1155Payment
        // );

        // Deploy TokenBundle contracts
        TokenBundleEscrowObligation bundleEscrow = new TokenBundleEscrowObligation(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );
        TokenBundlePaymentObligation bundlePayment = new TokenBundlePaymentObligation(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );
        TokenBundleBarterUtils bundleBarterUtils = new TokenBundleBarterUtils(
            IEAS(easAddress),
            bundleEscrow,
            bundlePayment
        );

        // Deploy Native Token contracts
        NativeTokenEscrowObligation nativeEscrow = new NativeTokenEscrowObligation(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );
        NativeTokenPaymentObligation nativePayment = new NativeTokenPaymentObligation(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );

        // Deploy barter utils contracts
        ERC20BarterUtils erc20BarterUtils = new ERC20BarterUtils(
            IEAS(easAddress),
            erc20Escrow,
            erc20Payment,
            erc721Escrow,
            erc721Payment,
            erc1155Escrow,
            erc1155Payment,
            bundleEscrow,
            bundlePayment,
            nativeEscrow,
            nativePayment
        );

        ERC721BarterUtils erc721BarterUtils = new ERC721BarterUtils(
            IEAS(easAddress),
            erc20Escrow,
            erc20Payment,
            erc721Escrow,
            erc721Payment,
            erc1155Escrow,
            erc1155Payment,
            bundleEscrow,
            bundlePayment,
            nativeEscrow,
            nativePayment
        );

        ERC1155BarterUtils erc1155BarterUtils = new ERC1155BarterUtils(
            IEAS(easAddress),
            erc20Escrow,
            erc20Payment,
            erc721Escrow,
            erc721Payment,
            erc1155Escrow,
            erc1155Payment,
            bundleEscrow,
            bundlePayment,
            nativeEscrow,
            nativePayment
        );

        NativeTokenBarterUtils nativeBarterUtils = new NativeTokenBarterUtils(
            IEAS(easAddress),
            erc20Escrow,
            erc20Payment,
            erc721Escrow,
            erc721Payment,
            erc1155Escrow,
            erc1155Payment,
            bundleEscrow,
            bundlePayment,
            nativeEscrow,
            nativePayment
        );

        // Deploy attestation barter contracts
        AttestationEscrowObligation attestationEscrow = new AttestationEscrowObligation(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );
        AttestationEscrowObligation2 attestationEscrow2 = new AttestationEscrowObligation2(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress)
            );
        AttestationBarterUtils attestationBarterUtils = new AttestationBarterUtils(
                IEAS(easAddress),
                ISchemaRegistry(schemaRegistryAddress),
                attestationEscrow2
            );

        vm.stopBroadcast();

        // Print all deployed addresses
        console.log("\nEAS:");
        console.log("EAS:", easAddress);
        console.log("Schema Registry:", schemaRegistryAddress);

        console.log("\nArbiters:");
        // console.log("SpecificAttestationArbiter:", address(specificArbiter));
        // console.log("TrustedPartyArbiter:", address(trustedPartyArbiter));
        console.log("TrivialArbiter:", address(trivialArbiter));
        console.log("TrustedOracleArbiter:", address(trustedOracleArbiter));

        console.log("\nAdditional Arbiters:");
        console.log("AllArbiter:", address(allArbiter));
        console.log("AnyArbiter:", address(anyArbiter));
        console.log("IntrinsicsArbiter:", address(intrinsicsArbiter));
        console.log("IntrinsicsArbiter2:", address(intrinsicsArbiter2));
        console.log("ERC8004Arbiter:", address(erc8004Arbiter));

        console.log("\nConfirmation Arbiters:");
        console.log("ConfirmationArbiter:", address(confirmationArbiter));
        console.log("ConfirmationArbiterComposing:", address(confirmationArbiterComposing));
        console.log("RevocableConfirmationArbiter:", address(revocableConfirmationArbiter));
        console.log("RevocableConfirmationArbiterComposing:", address(revocableConfirmationArbiterComposing));
        console.log("UnrevocableConfirmationArbiter:", address(unrevocableConfirmationArbiter));
        console.log("UnrevocableConfirmationArbiterComposing:", address(unrevocableConfirmationArbiterComposing));

        console.log("\nAttestation Property Arbiters:");
        console.log("AttesterArbiter:", address(attesterArbiter));
        console.log("ExpirationTimeAfterArbiter:", address(expirationTimeAfterArbiter));
        console.log("ExpirationTimeBeforeArbiter:", address(expirationTimeBeforeArbiter));
        console.log("ExpirationTimeEqualArbiter:", address(expirationTimeEqualArbiter));
        console.log("RecipientArbiter:", address(recipientArbiter));
        console.log("RefUidArbiter:", address(refUidArbiter));
        console.log("RevocableArbiter:", address(revocableArbiter));
        console.log("SchemaArbiter:", address(schemaArbiter));
        console.log("TimeAfterArbiter:", address(timeAfterArbiter));
        console.log("TimeBeforeArbiter:", address(timeBeforeArbiter));
        console.log("TimeEqualArbiter:", address(timeEqualArbiter));
        console.log("UidArbiter:", address(uidArbiter));

        console.log("\nString Obligation:");
        console.log("StringObligation:", address(stringObligation));

        console.log("\nERC20 Contracts:");
        console.log("ERC20EscrowObligation:", address(erc20Escrow));
        console.log("ERC20PaymentObligation:", address(erc20Payment));
        console.log("ERC20BarterUtils:", address(erc20BarterUtils));

        console.log("\nERC721 Contracts:");
        console.log("ERC721EscrowObligation:", address(erc721Escrow));
        console.log("ERC721PaymentObligation:", address(erc721Payment));
        console.log("ERC721BarterUtils:", address(erc721BarterUtils));

        console.log("\nERC1155 Contracts:");
        console.log("ERC1155EscrowObligation:", address(erc1155Escrow));
        console.log("ERC1155PaymentObligation:", address(erc1155Payment));
        console.log("ERC1155BarterUtils:", address(erc1155BarterUtils));

        console.log("\nTokenBundle Contracts:");
        console.log("TokenBundleEscrowObligation:", address(bundleEscrow));
        console.log("TokenBundlePaymentObligation:", address(bundlePayment));
        console.log("TokenBundleBarterUtils:", address(bundleBarterUtils));

        console.log("\nNative Token Contracts:");
        console.log("NativeTokenEscrowObligation:", address(nativeEscrow));
        console.log("NativeTokenPaymentObligation:", address(nativePayment));
        console.log("NativeTokenBarterUtils:", address(nativeBarterUtils));

        console.log("\nAttestation Barter Contracts:");
        console.log("AttestationEscrowObligation:", address(attestationEscrow));
        console.log(
            "AttestationEscrowObligation2:",
            address(attestationEscrow2)
        );
        console.log("AttestationBarterUtils:", address(attestationBarterUtils));

        // Create JSON with deployed addresses
        string memory deploymentJson = "deploymentJson";

        // Add EAS addresses
        vm.serializeAddress(deploymentJson, "eas", easAddress);
        vm.serializeAddress(
            deploymentJson,
            "easSchemaRegistry",
            schemaRegistryAddress
        );

        // Add arbiter addresses
        // vm.serializeAddress(
        //     deploymentJson,
        //     "specificAttestationArbiter",
        //     address(specificArbiter)
        // );
        // vm.serializeAddress(
        //     deploymentJson,
        //     "trustedPartyArbiter",
        //     address(trustedPartyArbiter)
        // );
        vm.serializeAddress(
            deploymentJson,
            "trivialArbiter",
            address(trivialArbiter)
        );
        vm.serializeAddress(
            deploymentJson,
            "trustedOracleArbiter",
            address(trustedOracleArbiter)
        );

        // Add Additional Arbiters
        vm.serializeAddress(deploymentJson, "allArbiter", address(allArbiter));
        vm.serializeAddress(deploymentJson, "anyArbiter", address(anyArbiter));
        vm.serializeAddress(
            deploymentJson,
            "intrinsicsArbiter",
            address(intrinsicsArbiter)
        );
        vm.serializeAddress(
            deploymentJson,
            "intrinsicsArbiter2",
            address(intrinsicsArbiter2)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc8004Arbiter",
            address(erc8004Arbiter)
        );

        // Add Confirmation Arbiters
        vm.serializeAddress(
            deploymentJson,
            "confirmationArbiter",
            address(confirmationArbiter)
        );
        vm.serializeAddress(
            deploymentJson,
            "confirmationArbiterComposing",
            address(confirmationArbiterComposing)
        );
        vm.serializeAddress(
            deploymentJson,
            "revocableConfirmationArbiter",
            address(revocableConfirmationArbiter)
        );
        vm.serializeAddress(
            deploymentJson,
            "revocableConfirmationArbiterComposing",
            address(revocableConfirmationArbiterComposing)
        );
        vm.serializeAddress(
            deploymentJson,
            "unrevocableConfirmationArbiter",
            address(unrevocableConfirmationArbiter)
        );
        vm.serializeAddress(
            deploymentJson,
            "unrevocableConfirmationArbiterComposing",
            address(unrevocableConfirmationArbiterComposing)
        );

        // Add Attestation Property Arbiters
        vm.serializeAddress(deploymentJson, "attesterArbiter", address(attesterArbiter));
        vm.serializeAddress(deploymentJson, "expirationTimeAfterArbiter", address(expirationTimeAfterArbiter));
        vm.serializeAddress(deploymentJson, "expirationTimeBeforeArbiter", address(expirationTimeBeforeArbiter));
        vm.serializeAddress(deploymentJson, "expirationTimeEqualArbiter", address(expirationTimeEqualArbiter));
        vm.serializeAddress(deploymentJson, "recipientArbiter", address(recipientArbiter));
        vm.serializeAddress(deploymentJson, "refUidArbiter", address(refUidArbiter));
        vm.serializeAddress(deploymentJson, "revocableArbiter", address(revocableArbiter));
        vm.serializeAddress(deploymentJson, "schemaArbiter", address(schemaArbiter));
        vm.serializeAddress(deploymentJson, "timeAfterArbiter", address(timeAfterArbiter));
        vm.serializeAddress(deploymentJson, "timeBeforeArbiter", address(timeBeforeArbiter));
        vm.serializeAddress(deploymentJson, "timeEqualArbiter", address(timeEqualArbiter));
        vm.serializeAddress(deploymentJson, "uidArbiter", address(uidArbiter));

        // Add string obligation
        vm.serializeAddress(
            deploymentJson,
            "stringObligation",
            address(stringObligation)
        );

        // Add ERC20 addresses
        vm.serializeAddress(
            deploymentJson,
            "erc20EscrowObligation",
            address(erc20Escrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc20PaymentObligation",
            address(erc20Payment)
        );

        // Add ERC721 addresses
        vm.serializeAddress(
            deploymentJson,
            "erc721EscrowObligation",
            address(erc721Escrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc721PaymentObligation",
            address(erc721Payment)
        );

        // Add ERC1155 addresses
        vm.serializeAddress(
            deploymentJson,
            "erc1155EscrowObligation",
            address(erc1155Escrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc1155PaymentObligation",
            address(erc1155Payment)
        );

        // Add TokenBundle addresses
        vm.serializeAddress(
            deploymentJson,
            "tokenBundleEscrowObligation",
            address(bundleEscrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "tokenBundlePaymentObligation",
            address(bundlePayment)
        );
        vm.serializeAddress(
            deploymentJson,
            "tokenBundleBarterUtils",
            address(bundleBarterUtils)
        );

        // Add BarterUtils addresses (using CrossToken contracts)
        vm.serializeAddress(
            deploymentJson,
            "erc20BarterUtils",
            address(erc20BarterUtils)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc721BarterUtils",
            address(erc721BarterUtils)
        );
        vm.serializeAddress(
            deploymentJson,
            "erc1155BarterUtils",
            address(erc1155BarterUtils)
        );
        vm.serializeAddress(
            deploymentJson,
            "nativeTokenBarterUtils",
            address(nativeBarterUtils)
        );

        // Add Native Token addresses
        vm.serializeAddress(
            deploymentJson,
            "nativeTokenEscrowObligation",
            address(nativeEscrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "nativeTokenPaymentObligation",
            address(nativePayment)
        );

        // Add Attestation addresses
        vm.serializeAddress(
            deploymentJson,
            "attestationEscrowObligation",
            address(attestationEscrow)
        );
        vm.serializeAddress(
            deploymentJson,
            "attestationEscrowObligation2",
            address(attestationEscrow2)
        );
        string memory finalJson = vm.serializeAddress(
            deploymentJson,
            "attestationBarterUtils",
            address(attestationBarterUtils)
        );

        // Generate timestamp for filename
        uint256 timestamp = block.timestamp;
        string memory filename = string.concat(
            "./deployments/deployment_",
            vm.toString(timestamp),
            ".json"
        );

        // Write JSON to file
        vm.writeJson(finalJson, filename);
        console.log("\nSaving addresses to", filename);

        console.log("\nDeployment complete!");
    }
}
