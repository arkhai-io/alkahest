import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",

    erc20BarterUtils: "0x5C624f8FbbB377378cDfE8B627384A917FE839db",
    erc20EscrowObligation: "0xFa76421cEe6aee41adc7f6a475b9Ef3776d500F0",
    erc20PaymentObligation: "0xE95d3931E15E4d96cE1d2Dd336DcEad35A708bdB",

    erc721BarterUtils: "0x01414CC4a4c7b7fa9F551907ee89c867c7a74d29",
    erc721EscrowObligation: "0xF3C3dC387e00FE76CCF7990634aa694D466de5AA",
    erc721PaymentObligation: "0x9DFe20Ded52D0F9e535F546f87d83B473DefC5B2",

    erc1155BarterUtils: "0x70a9Ce33CF0f7487A8a33B1447455047A90F3998",
    erc1155EscrowObligation: "0x4e7d759Df6204d901fb6FD82248FEa64f129bfa3",
    erc1155PaymentObligation: "0x799048b0772381A095aa37305C1D85f26b8445C7",

    tokenBundleBarterUtils: "0xb03633005C763feAD6993541Cab2a10FA79828c1",
    tokenBundleEscrowObligation: "0xf63e97217f71C4cdbA643c8EFc9F152486560542",
    tokenBundlePaymentObligation: "0xd192685E79F760fA769614d22916528254FD4937",

    attestationBarterUtils: "0xfFA2bf5Fc4270e9AFd20Aa2C87b3B100489DF97a",
    attestationEscrowObligation: "0x021d28E9eBc935Bf21fe5Ff48cAAbE126Ed706aB",
    attestationEscrowObligation2: "0x5f177293F46d938316229A07E31bC65d64D58c9b",

    stringObligation: "0x4edEa259C8E014eeEd583D1a863e020190B21Db7",

    trivialArbiter: "0x7D4bCD84901cEC903105564f63BE70432448B222",
    trustedOracleArbiter: "0x361E0950534F4a54A39F8C4f1f642C323f6e66B9",
    allArbiter: "0x0000000000000000000000000000000000000000",
    anyArbiter: "0x0000000000000000000000000000000000000000",
    intrinsicsArbiter: "0x0000000000000000000000000000000000000000",
    intrinsicsArbiter2: "0x0000000000000000000000000000000000000000",
    nativeTokenEscrowObligation: "0x0000000000000000000000000000000000000000",
    nativeTokenPaymentObligation: "0x0000000000000000000000000000000000000000",
    nativeTokenBarterUtils: "0x0000000000000000000000000000000000000000",

    // Confirmation arbiters (new naming convention) - addresses TBD
    exclusiveRevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    exclusiveUnrevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    nonexclusiveRevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    nonexclusiveUnrevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",

    // Attestation Properties Arbiters - addresses TBD
    recipientArbiter: "0x0000000000000000000000000000000000000000",
    attesterArbiter: "0x0000000000000000000000000000000000000000",
    schemaArbiter: "0x0000000000000000000000000000000000000000",
    uidArbiter: "0x0000000000000000000000000000000000000000",
    refUidArbiter: "0x0000000000000000000000000000000000000000",
    revocableArbiter: "0x0000000000000000000000000000000000000000",
    timeAfterArbiter: "0x0000000000000000000000000000000000000000",
    timeBeforeArbiter: "0x0000000000000000000000000000000000000000",
    timeEqualArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeAfterArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeBeforeArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeEqualArbiter: "0x0000000000000000000000000000000000000000",
  },
  "Filecoin Calibration": {
    eas: "0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524",
    easSchemaRegistry: "0x2bb94a4e6ec0d81de7f81007b572ac09a5be37b4",

    erc20BarterUtils: "0xaeeddd0a2f24f7286eae7e7fa5cea746fcf064fc",
    erc20EscrowObligation: "0x235792a6d077a04fb190a19f362acecab7866ab5",
    erc20PaymentObligation: "0xd8b6199aa91992f5d3bafddc3372b391e46c92ce",

    erc721BarterUtils: "0x2129f46737135fe4ebb3c49953487122088bc739",
    erc721EscrowObligation: "0x336f2f91b093001edd90e49216422b33b8b4e03b",
    erc721PaymentObligation: "0x4b9b6ff4a7c2bc89eee6f28355b9a94e6649bbf8",

    erc1155BarterUtils: "0x66b7398b2bb322bb4a480ae370142c02c52b886a",
    erc1155EscrowObligation: "0x553e4de0916074201a9d32123efcc8f734ee5675",
    erc1155PaymentObligation: "0x903caa028b1848ab8fdd15c4ccd20c4e7be2b1c0",

    tokenBundleBarterUtils: "0xb63cf08c6623f69d2ad34e37b8a68cca6c125d49",
    tokenBundleEscrowObligation: "0xdcc1104325d9d99c6bd5faa0804a7d743f3d0c20",
    tokenBundlePaymentObligation: "0xab43cce34a7b831fa7ab134bcdc21a6ba20882b6",

    attestationBarterUtils: "0x0c19138441e1bee2964e65e0edf1702d59a2e786",
    attestationEscrowObligation: "0x553e4de0916074201a9d32123efcc8f734ee5675",
    attestationEscrowObligation2: "0x11c3931f2715d8fca8ea5ca79fac4bbbcdbe9903",

    stringObligation: "0xbb022fc36d0cc97b6cae5a2e15d45b7a9ad46f99",

    trivialArbiter: "0x6e9bc0d34fff16140401fc51653347be0a1f0ec0",
    trustedOracleArbiter: "0x5f1db54dbc5006894ef6c43b2174c05ccaa250ec",
    allArbiter: "0x0000000000000000000000000000000000000000",
    anyArbiter: "0x0000000000000000000000000000000000000000",
    intrinsicsArbiter: "0x0000000000000000000000000000000000000000",
    intrinsicsArbiter2: "0x0000000000000000000000000000000000000000",
    nativeTokenEscrowObligation: "0x0000000000000000000000000000000000000000",
    nativeTokenPaymentObligation: "0x0000000000000000000000000000000000000000",
    nativeTokenBarterUtils: "0x0000000000000000000000000000000000000000",

    // Confirmation arbiters (new naming convention) - addresses TBD
    exclusiveRevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    exclusiveUnrevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    nonexclusiveRevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",
    nonexclusiveUnrevocableConfirmationArbiter: "0x0000000000000000000000000000000000000000",

    // Attestation Properties Arbiters - addresses TBD
    recipientArbiter: "0x0000000000000000000000000000000000000000",
    attesterArbiter: "0x0000000000000000000000000000000000000000",
    schemaArbiter: "0x0000000000000000000000000000000000000000",
    uidArbiter: "0x0000000000000000000000000000000000000000",
    refUidArbiter: "0x0000000000000000000000000000000000000000",
    revocableArbiter: "0x0000000000000000000000000000000000000000",
    timeAfterArbiter: "0x0000000000000000000000000000000000000000",
    timeBeforeArbiter: "0x0000000000000000000000000000000000000000",
    timeEqualArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeAfterArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeBeforeArbiter: "0x0000000000000000000000000000000000000000",
    expirationTimeEqualArbiter: "0x0000000000000000000000000000000000000000",
  },
} as const;

export const supportedChains = ["Base Sepolia", "Filecoin Calibration"];
