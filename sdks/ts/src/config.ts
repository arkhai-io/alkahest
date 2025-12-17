import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",

    erc20BarterUtils: "0xF02d5fD6c858b7E7088D5E6912008936846519E5",
    erc20EscrowObligation: "0x3826430c1C358623a76e7E240f186D8ad0aEc1d1",
    erc20PaymentObligation: "0x70573b0A9E98cc9E5E8a9899C1756510057eeC70",

    erc721BarterUtils: "0x83417Ea0b4dE1333C40CC8F98A4Fee2A0BAD8A8F",
    erc721EscrowObligation: "0xAb647525526BeBBE59B23af166F708b0e7A23C31",
    erc721PaymentObligation: "0x64f89f110378219cb9A70Aa175d3936e36e64495",

    erc1155BarterUtils: "0xC5DC89829091D35AD2aBb8c7f32C20eCF30C3eA5",
    erc1155EscrowObligation: "0xe29A8516dd347919cC1939c2113EFD611Ba47a9E",
    erc1155PaymentObligation: "0xE083f6B4b1b5F89e6E2E1E043a1947fa14839A67",

    tokenBundleBarterUtils: "0x1300a5AD4C33F482f106B72fAA72a0e73D7e94eA",
    tokenBundleEscrowObligation: "0x187cc572B48F296A579FC8998FF65e94eaB678f0",
    tokenBundlePaymentObligation: "0xd46EEE3c196D09cCDb752EbB79e3762fA9147E42",

    attestationBarterUtils: "0x20b49D94D71B686db5Da0d4E4Ea76dD158E03C4F",
    attestationEscrowObligation: "0xbeeae6735892f2dEf5F0A3D9EfEC2eAC02324b20",
    attestationEscrowObligation2: "0x11909d3AB6D539469422B5830533c3B9B3dDaF0c",

    stringObligation: "0x655677c421BA84f97D7A17A4A2D5038c8B564dCD",

    trustedOracleArbiter: "0xC343eA368bb7c4a54c92a1aB4d46Db38D7CCaf39",
    allArbiter: "0x033EB5BF55fE4d002096232Ca7bDfF600f4e0a2b",
    anyArbiter: "0x0e1B34fB00AfD95e7dD7a686B676C6bB7efA2481",
    notArbiter: "0x6f9BFDF8556e6619D525ae9c13849090c0Cf886f",
    intrinsicsArbiter: "0xB950a89e42570Bd9cdf4f800F830bE095706CFf9",
    intrinsicsArbiter2: "0x16Bc823B27d964bbb6b48592b8b2E019b4897C62",
    nativeTokenEscrowObligation: "0x5Cd459c5775bEB4aDBbB5E6e0714E7CBefa7103a",
    nativeTokenPaymentObligation: "0x82c4778699A498e07E31ee0678F1Db146CA47e50",
    nativeTokenBarterUtils: "0x592C653B1d28787c645528dfF84D06A26eE3E9c5",

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
    trustedOracleArbiter: "0x5f1db54dbc5006894ef6c43b2174c05ccaa250ec",
    stringObligation: "0xbb022fc36d0cc97b6cae5a2e15d45b7a9ad46f99",
    erc20EscrowObligation: "0x235792a6d077a04fb190a19f362acecab7866ab5",
    erc20PaymentObligation: "0xd8b6199aa91992f5d3bafddc3372b391e46c92ce",
    erc721EscrowObligation: "0x336f2f91b093001edd90e49216422b33b8b4e03b",
    erc721PaymentObligation: "0x4b9b6ff4a7c2bc89eee6f28355b9a94e6649bbf8",
    erc1155EscrowObligation: "0x96c14b182cd99a09ddddc6b755ba0c4ed3d6991c",
    erc1155PaymentObligation: "0x903caa028b1848ab8fdd15c4ccd20c4e7be2b1c0",
    tokenBundleEscrowObligation: "0xdcc1104325d9d99c6bd5faa0804a7d743f3d0c20",
    tokenBundlePaymentObligation: "0xab43cce34a7b831fa7ab134bcdc21a6ba20882b6",
    tokenBundleBarterUtils: "0xb63cf08c6623f69d2ad34e37b8a68cca6c125d49",
    erc20BarterUtils: "0xaeeddd0a2f24f7286eae7e7fa5cea746fcf064fc",
    erc721BarterUtils: "0x2129f46737135fe4ebb3c49953487122088bc739",
    erc1155BarterUtils: "0x66b7398b2bb322bb4a480ae370142c02c52b886a",
    attestationEscrowObligation: "0x553e4de0916074201a9d32123efcc8f734ee5675",
    attestationEscrowObligation2: "0x11c3931f2715d8fca8ea5ca79fac4bbbcdbe9903",
    attestationBarterUtils: "0x0c19138441e1bee2964e65e0edf1702d59a2e786",
    anyArbiter: "0x0000000000000000000000000000000000000000",
    allArbiter: "0x0000000000000000000000000000000000000000",
    notArbiter: "0x0000000000000000000000000000000000000000",
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
