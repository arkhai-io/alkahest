import type { ChainAddresses } from "./types";

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",

    erc20BarterUtils: "0x3974e5aFf7d2CdD0FDED00b47A68e93e3A1e9ccD",
    erc20EscrowObligation: "0x19df198F7C538f478746F092fb3aF7BE159f9801",
    erc20PaymentObligation: "0x6E7f0246f703aA3e54750Bd627F3d89a29c7D782",

    erc721BarterUtils: "0xa9Cad2D8E0f6B34d41098483E1DeE762E4654b05",
    erc721EscrowObligation: "0x8e7baDE784E12Bb91D282a3acE6d7Cb88e849909",
    erc721PaymentObligation: "0x5f7E2c0Dc49cEbe6562b712AcCc0c271c8bA7498",

    erc1155BarterUtils: "0x2af05e925fE255a76AA19F0a48A4FdB2f193a35C",
    erc1155EscrowObligation: "0x8337588Ad3C715097794f5490aeF8845132B6129",
    erc1155PaymentObligation: "0xe8b925Dc07ADeC34961d34df7cC3cDC4fB7eb2C0",

    tokenBundleBarterUtils: "0x5aecaf71E96ab66000b3c4c28Ab9ABA9b037Dc5b",
    tokenBundleEscrowObligation: "0xC98837EBEb2a943BF4597D855720E40a70dA9145",
    tokenBundlePaymentObligation: "0x36e48AE703f578D3BE1ddd9baB671a65fb466E72",

    attestationBarterUtils: "0x6Ae1b13367ACB4b66B4eD50440d70E61F8c039fD",
    attestationEscrowObligation: "0x95D1d5B694Ccb7D604385BB516bCeea993f55BC2",
    attestationEscrowObligation2: "0xC44c66C3c2FAA5B10bb76faB9568f208c48E255a",

    stringObligation: "0x6Fc6eCe01b0C54F1caf73239D089419192C3af39",

    trivialArbiter: "0x7f02E155FA58C672016c27E45770b977C5cBf6b7",
    trustedOracleArbiter: "0xD2c1A86BBa27143bc43C9A2Ef23BD1EC8B4C568F",
    allArbiter: "0x0DD4DbC1A5e32358bcAFD6bb9DF78D25a38EbC7B",
    anyArbiter: "0x8234415C1c19769251b32dE1f4BE7096C05D97f0",
    intrinsicsArbiter: "0xd3e987538653Afe7648C4Fe785B3a0B3352B7B16",
    intrinsicsArbiter2: "0xa4911d9297263Ee395d0d24b96F7bFbbfD6Af759",
    nativeTokenEscrowObligation: "0x5E3e92F52E15dD5cC95cba8c90e816291646673B",
    nativeTokenPaymentObligation: "0xd83E2d0f6521c69238433B155fa6B4cf6cadeA20",
    nativeTokenBarterUtils: "0x4E90839e391c00F26A234cdA41575AEEAD39c660",

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter: "0xC36a9d985B90637faadc4F8D6BB45a4D5f481Eac",
    exclusiveUnrevocableConfirmationArbiter: "0xe4890dF50C8B5f8bf634E605Af3242c68BaB6582",
    nonexclusiveRevocableConfirmationArbiter: "0x857C76610d341A3441592676dcaA4b4B32E8147E",
    nonexclusiveUnrevocableConfirmationArbiter: "0xbd4F441DDc125b05442635d41549BA8144f7a6BD",

    // Attestation Properties Arbiters
    recipientArbiter: "0x29f94Dbfc3094FF3B864c1E0fd212F996BF76D44",
    attesterArbiter: "0x10AB72fa34d049784D0A7dc4401b808F0d256848",
    schemaArbiter: "0xEc05410a9FE53dd53032071429206CfeB6212560",
    uidArbiter: "0x429e52Ad326B0f3940fEbB97A6B0276977972c38",
    refUidArbiter: "0xC4AE2943CC5bC3c8209ef67619E5a9e8d14eD716",
    revocableArbiter: "0x412b3857b8d1D20Df792dB18FB46160856B24934",
    timeAfterArbiter: "0xC220c37ACbeB6AB9DAd1B97919dcCBB98eD3c089",
    timeBeforeArbiter: "0x4DD40e6b9Fa2D42F64631CFc00cD72b7847f5101",
    timeEqualArbiter: "0x49b4061A47C32A4D5b8B39dBa91537A4dE12BEc2",
    expirationTimeAfterArbiter: "0xe5258952a5CF466CB3cF019eF026cC27bd27825d",
    expirationTimeBeforeArbiter: "0xf04a544850027636be60E8F64c17b303F803bf1f",
    expirationTimeEqualArbiter: "0xbe991C2bbd3a9AE613A68269beC1c194176Ab085",
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
