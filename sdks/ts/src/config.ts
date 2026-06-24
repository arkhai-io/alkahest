import type { ChainAddresses } from "./types";

const zeroAddress = "0x0000000000000000000000000000000000000000" as const;

const unreleasedAddresses = {
  erc20UnconditionalEscrowObligation: zeroAddress,
  erc721UnconditionalEscrowObligation: zeroAddress,
  erc1155UnconditionalEscrowObligation: zeroAddress,
  nativeTokenUnconditionalEscrowObligation: zeroAddress,
  tokenBundleUnconditionalEscrowObligation: zeroAddress,
  attestationUnconditionalEscrowObligation: zeroAddress,
  attestationReferenceUnconditionalEscrowObligation: zeroAddress,
  hookEscrowObligation: zeroAddress,
  hooksEscrowObligation: zeroAddress,
  erc20EscrowHook: zeroAddress,
  erc721EscrowHook: zeroAddress,
  erc1155EscrowHook: zeroAddress,
  nativeTokenEscrowHook: zeroAddress,
  attestationEscrowHook: zeroAddress,
  attestationReferenceEscrowHook: zeroAddress,
  erc20Splitter: zeroAddress,
  erc1155Splitter: zeroAddress,
  nativeTokenSplitter: zeroAddress,
  tokenBundleSplitter: zeroAddress,
  tokenBundleSplitterUnvalidated: zeroAddress,
} satisfies Pick<
  ChainAddresses,
  | "erc20UnconditionalEscrowObligation"
  | "erc721UnconditionalEscrowObligation"
  | "erc1155UnconditionalEscrowObligation"
  | "nativeTokenUnconditionalEscrowObligation"
  | "tokenBundleUnconditionalEscrowObligation"
  | "attestationUnconditionalEscrowObligation"
  | "attestationReferenceUnconditionalEscrowObligation"
  | "hookEscrowObligation"
  | "hooksEscrowObligation"
  | "erc20EscrowHook"
  | "erc721EscrowHook"
  | "erc1155EscrowHook"
  | "nativeTokenEscrowHook"
  | "attestationEscrowHook"
  | "attestationReferenceEscrowHook"
  | "erc20Splitter"
  | "erc1155Splitter"
  | "nativeTokenSplitter"
  | "tokenBundleSplitter"
  | "tokenBundleSplitterUnvalidated"
>;

export const contractAddresses: Record<string, ChainAddresses> = {
  "Base Sepolia": {
    eas: "0x4200000000000000000000000000000000000021",
    easSchemaRegistry: "0x4200000000000000000000000000000000000020",

    erc20AtomicPaymentUtils: "0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0",
    erc20EscrowObligation: "0x5c55EFa334A7FceF530a081D19Be98E871EdbB83",
    erc20UnconditionalEscrowObligation: "0x56AcF1b3A736C5524b8836534D15445322a50a2B",
    erc20PaymentObligation: "0x0f953267E8d835b9f33b361C963F126775316dcA",

    erc721AtomicPaymentUtils: "0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0",
    erc721EscrowObligation: "0x0850d8F7015Ba183227925cd100968e82aCb266A",
    erc721UnconditionalEscrowObligation: "0x63A26965Ea23A61219128a57392f8a2A4E7be140",
    erc721PaymentObligation: "0x2e8aa787750853ce422E487dacad385296F81169",

    erc1155AtomicPaymentUtils: "0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0",
    erc1155EscrowObligation: "0x267C98D752C6B9F9B354471A08F72aaCb9eC8567",
    erc1155UnconditionalEscrowObligation: "0x62c1351503Ef1308FfF550cD594c95F3112F61aB",
    erc1155PaymentObligation: "0x1F559CE3f65374593ff39EC5a74ea36db0b817d1",

    tokenBundleAtomicPaymentUtils: "0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0",
    tokenBundleEscrowObligation: "0xC52c611c0C9A11fF625B93f9D1fb9E74C45d9859",
    tokenBundleUnconditionalEscrowObligation: "0xa5ba8B7382093525F5F6739cCff910376D63c1ba",
    tokenBundlePaymentObligation: "0x7F445E83779Df77cAB8E71eC3C5E2Bffe4EB1314",

    atomicAttestationUtils: "0x886f7cE4bF11dBDbA163bEE866533965177ae680",
    attestationEscrowObligation: "0xFa299C13D7F17B6a3E63b1bE985F93020Db1169C",
    attestationUnconditionalEscrowObligation: "0x61504DB9850e54fEb9f0681631BE8906a75B3bB9",
    attestationReferenceEscrowObligation: "0x18a38eE1e1609e21b29F9bec07Ea6633BB5E8368",
    attestationReferenceUnconditionalEscrowObligation: "0x7833cD2ADD07CD7bD0DA20020663D6857fDa1E6C",

    stringObligation: "0x22d3203992CCC7Dfb2Ec12D87E15b0d8698De35b",
    commitRevealObligation: "0x14d0B7D4ed6915CE0b1a0d54F9D5912584dB550E",

    trivialArbiter: "0xa42Df9aDF17f26Ff1eD5206cf83E5dab88bD3523",
    trustedOracleArbiter: "0x504f496F696c41558070a933c90a98604c3f4475",
    allArbiter: "0x9F78AAca04A2c005618c3B214e609B13Bbe66356",
    anyArbiter: "0xaF67e09D889e0df9d404059283A1FA7BA7Ac7d88",
    intrinsicsArbiter: "0xd78d4404E2E1a9033eEf1ac69BF488f6a4Ea9aC0",
    erc8004Arbiter: "0x65dE059a0B2A060E842B8106B1BE365bf5f2F80f",
    referencesEscrowArbiter: "0x335441cc9813558067e5b3a4c39AF8a9cFb6fAF8",

    nativeTokenAtomicPaymentUtils: "0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0",
    nativeTokenEscrowObligation: "0x5d83C1Cb608e891F7B2Bcc12294d1e64aBB8eC7F",
    nativeTokenUnconditionalEscrowObligation: "0x58368eE14F75FA38366E7da12707Ec501e3F042a",
    nativeTokenPaymentObligation: "0xd53357af507f4c865A6345a05dC9849BB3eFD7c7",

    exclusiveRevocableConfirmationArbiter: "0xf6388A7b78c4A130249160CbcC609530D267B59B",
    exclusiveUnrevocableConfirmationArbiter: "0x21F1402b4006B4A799502F948cfED187E66e9bb9",
    nonexclusiveRevocableConfirmationArbiter: "0xC4876Bf97a5C24E26e8286fF7a3391c20A8a0A6e",
    nonexclusiveUnrevocableConfirmationArbiter: "0x9F8AF67d89B674513eFAdf29ed936c4704A64fEb",

    recipientArbiter: "0x507CFD91DD2d2b8E7F93812414d8Ce9dC5404F62",
    attesterArbiter: "0xa50365B53232f54cf6C60f0f432ad64169A6e76e",
    schemaArbiter: "0xA8f8e66d12b97EbE93C79b36D015666DEC2Dd151",
    uidArbiter: "0x9F06F7E040d57e21964cCa4D91CBC57b25C55D67",
    refUidArbiter: "0xafA3c1593ca451DA36dB7fD36077BcFFf7B4c717",
    revocableArbiter: "0x6a9e076cf1Df39D029A7B6d48A1Ab36B3cC28639",
    timeAfterArbiter: "0x24D729f6f8Fc3DF5EB42939276cF2Efe9fF963d6",
    timeBeforeArbiter: "0xCE156DEAB9B4A525640a0BC2Ad9966d13f9a134a",
    timeEqualArbiter: "0x5dc2d28f06DDB3e60b76fab033F672126572c976",
    expirationTimeAfterArbiter: "0xd8C0Ab60B431061a079C8b4e0BaCf7CbF6aEA29d",
    expirationTimeBeforeArbiter: "0xcae48f46d89cd2d78118a84d8CA589Ee7d29C98c",
    expirationTimeEqualArbiter: "0x9354ca2BdB314BB41C78CBff4C4443718a8813DF",

    hookEscrowObligation: "0x5aD1B5f0eE7A520311B4b8d8f758d48934851981",
    hooksEscrowObligation: "0xa21a3A6db8b00303D7e919Ea8983CFd2DC6Ed1d3",
    erc20EscrowHook: "0xEF0473fE3777b45C68455f90d4edCC1A8673c518",
    erc721EscrowHook: "0x80016D907E87989457C0253D42e0a4348476DBb3",
    erc1155EscrowHook: "0xC2045eF34C8789dE4744272706a8800A03cE1f11",
    nativeTokenEscrowHook: "0xFeE4003D97e77251091D9C686ba4da4E46D98c05",
    attestationEscrowHook: "0x2fd54cC36e441B2a3c0202B621208db046C18ea3",
    attestationReferenceEscrowHook: "0x335cE1C9DFA441C2db31914502E5CeD9b38DCBFD",

    erc20Splitter: "0xd6816aC123844edb88f0AF146Cc565C6663DE97B",
    erc1155Splitter: "0xB386B657F66c8eAb3A3335d590Eef4a0871e63a3",
    nativeTokenSplitter: "0xa32161d10B31f3eB5BfC0EEfDE64784e01CBD9E1",
    tokenBundleSplitter: "0xceC0D468b29cA55FEA224e2b66AC5694036aA24d",
    tokenBundleSplitterUnvalidated: "0x6c1c55E13E5Ec8668dad15dbe1B461E7814643a1",
  },
  "Sepolia": {
    ...unreleasedAddresses,
    eas: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    easSchemaRegistry: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0",

    erc20AtomicPaymentUtils: "0x5bf7c8b0d60d05af0a3De531EB876De271E80dbc",
    erc20EscrowObligation: "0xB2c808911E84E80156101983897Da7c80e13cB47",
    erc20PaymentObligation: "0xb822aA07F55a8B75Ee133ede1f21C4E49DE7952f",

    erc721AtomicPaymentUtils: "0xEB0C0c41F708B8b3556a6F44a1a015a6832C2d2C",
    erc721EscrowObligation: "0x2A7df117e45D93d34a7893CC3aE8B105Ae0B561C",
    erc721PaymentObligation: "0x59A9c929778Ad2cC4D5DB6151bDEf0F9Fa7A068C",

    erc1155AtomicPaymentUtils: "0x52De4B30721b3E3660A79da7491a9B2F8a9cB1D5",
    erc1155EscrowObligation: "0xf04d9CA943f57353A3A735494E503280C1cD5e77",
    erc1155PaymentObligation: "0x52748DD0E39eD6eA9f626179b5eb512302adA7D9",

    tokenBundleAtomicPaymentUtils: "0xA7EacA68Bffc9443eA08fd58633Eeed3f5EE8A92",
    tokenBundleEscrowObligation: "0x677Aa9e1CD9D05f57FbCa2327155EA7479ec7Ac3",
    tokenBundlePaymentObligation: "0x36Fcf1Ddee838a94B1358285A11e8bbbb90eD9A1",

    atomicAttestationUtils: "0x0000000000000000000000000000000000000000",
    attestationEscrowObligation: "0x6eb7792D821f32914Be75901F1b4269B13Efad2e",
    attestationReferenceEscrowObligation: "0x1A7c6F951e0a33F4910dbe56a200Eb413AEca17b",

    stringObligation: "0xC51C938f5497be8157DAf8CCc3Eb11Afb8b752C0",
    commitRevealObligation: "0x9fD6D7A3B4e4b5dD75c50F5f16Deba46162127C3",

    trivialArbiter: "0x594E79466b6ac01C6416C929e428264a4bdF0C92",
    trustedOracleArbiter: "0x3B2a812E3eb3B729D40d866Da16c2BB2b6cDd2f2",
    allArbiter: "0x847F69d27E4F1A8a115aCa3F4358B079706dc9CE",
    anyArbiter: "0xe968dFA581B8aBb94eC5F24d0b56163DE69511fD",
    intrinsicsArbiter: "0xaabdDAa76651d20922d1F561f924a40F6fE7710c",
    erc8004Arbiter: "0x367fEd55E65bd0FCCF8F966A04989AB61E1b5A49",
    referencesEscrowArbiter: zeroAddress,
    nativeTokenEscrowObligation: "0x9bA50DB048d1E5db034377abf97F92496D027C71",
    nativeTokenPaymentObligation: "0xf60db64506E366a0A6c1f4cF9D849Adc7bB886D6",
    nativeTokenAtomicPaymentUtils: "0xA42032D8BFeE2302cC6F80ff51D283Ffc5a4081f",

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter: "0x941044D43F9d75dfA8Ad24880B9B9cAD6e116a66",
    exclusiveUnrevocableConfirmationArbiter: "0x16aeE626D398B547eDD5fa4BdAA638524C92921d",
    nonexclusiveRevocableConfirmationArbiter: "0xe483EDA58b5f9Eba06A1ad0151dA5e4a5fFC8300",
    nonexclusiveUnrevocableConfirmationArbiter: "0x01666d869918aDDDED1B30eF2d36f3C990F09BDE",

    // Attestation Properties Arbiters
    recipientArbiter: "0xF1C9E20078A13816ACdDF3153e2eAaDd93Fd6E57",
    attesterArbiter: "0x6CC4068d471E96A1669097918e18017f5764f72a",
    schemaArbiter: "0x913eAdD13dcCdeD9CD5518075083b6C7A9574A8c",
    uidArbiter: "0xae4fa2D5d7EDD6Aaf697dC0c98EDb921F0fEc058",
    refUidArbiter: "0xE9ee2c57B18283b66d342D33d63C55f1427f9e9B",
    revocableArbiter: "0xeda25079f76ef93c54cC042116Be8D88E49D3439",
    timeAfterArbiter: "0x0ea9e144FfDc6456E5cE8d1f75c686112e8f29c5",
    timeBeforeArbiter: "0x68A6e6022ab9984Ee1A9A6cee384FF2aE8be5264",
    timeEqualArbiter: "0x208385Fb349c01af2CfA8C6b86F633F6642718e2",
    expirationTimeAfterArbiter: "0x309509db364526C7aE202eA9ED94a398a0819d38",
    expirationTimeBeforeArbiter: "0xFAf8a07709dB9f90d0A0415876CfE00D904cd40B",
    expirationTimeEqualArbiter: "0x7c782ac7741BB78DB7491Ee222af0a04f7f2bc0b",
  },
  "Filecoin Calibration": {
    ...unreleasedAddresses,
    eas: "0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524",
    easSchemaRegistry: "0x2BB94a4E6eC0D81dE7f81007b572Ac09A5BE37b4",

    erc20AtomicPaymentUtils: "0xb5800e34602154ce92c5eb0e7cb455306d7d590e",
    erc20EscrowObligation: "0x6bcec91a89a63d50368bce54cb9ed0399992c18b",
    erc20PaymentObligation: "0x33f6f558c1fcac597f2b635bc50554055ff98165",

    erc721AtomicPaymentUtils: "0x797a737defb8cae0a30324ecfa52eaab9c0a5fd6",
    erc721EscrowObligation: "0x99f5335b95e1c0be4c218a59aae26efc50d5673f",
    erc721PaymentObligation: "0x5b6bff4dc108c58b97721330666f56c8028c097c",

    erc1155AtomicPaymentUtils: "0x850d8df3ff0149bd5a9191a958b287b25564716b",
    erc1155EscrowObligation: "0xf9dbc74553faecac775201113198085c4d572805",
    erc1155PaymentObligation: "0x4cb076af47f0f3909ebafd88cbc0c4cc8dee17dd",

    tokenBundleAtomicPaymentUtils: "0xfca2c2df4023a0a418bf354b5bfff1ebfe0520a9",
    tokenBundleEscrowObligation: "0x902ac1997bd29a037263e0d80952c80d69d9afd4",
    tokenBundlePaymentObligation: "0xc1b02efec19a171ecbb7c8ad54b9617e80fdf40f",

    atomicAttestationUtils: "0x0000000000000000000000000000000000000000",
    attestationEscrowObligation: "0xd59c6c6cb025e76a0a1e706c62a9df38b04694e2",
    attestationReferenceEscrowObligation: "0xa22b4d9fe7a746d44be1e724bb1a26593bca2c1b",

    stringObligation: "0x66c3f78258823b9b899ab14b11e1dcf978c060d7",
    commitRevealObligation: "0x32889Ee549d61Ed5D14f2D499fCc809a4feC0dD8",

    trivialArbiter: "0xd56bd862e7bebd0bd7356603e9e52b32c241e2ae",
    trustedOracleArbiter: "0x61dc9c2d757a1c9d0d38a281288d9ef918e77baa",
    allArbiter: "0x49026902790a8ecb427f335ca0d097c7c5795d13",
    anyArbiter: "0xb6890a8cb8cdefce11edc0314125b750f48bff1b",
    intrinsicsArbiter: "0x81dc8f2c5677b02afcafef34fa7e75d55dfaef20",
    erc8004Arbiter: "0x3c1E21911C609714dBc0Ab90800c7aD8817B8e83",
    referencesEscrowArbiter: zeroAddress,
    nativeTokenEscrowObligation: "0x7490102a8b821c70679508426823f26c9bab4714",
    nativeTokenPaymentObligation: "0xd511278d5b9e5f8f9b99d01ea326b8232c133be5",
    nativeTokenAtomicPaymentUtils: "0x3c07027874650794eae300c603f066af182ea86a",

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter: "0xa740634e718c8727853d1e69963303d5cb8ea44c",
    exclusiveUnrevocableConfirmationArbiter: "0xb3d71c6f96cdd41e56dd9870b232225c379f2890",
    nonexclusiveRevocableConfirmationArbiter: "0x831b40ae79d391c7d56209802b9745fe0743dbf5",
    nonexclusiveUnrevocableConfirmationArbiter: "0xfeaa2fa295d1453ba382b7ee0e3f66c489a6d9bb",

    // Attestation Properties Arbiters
    recipientArbiter: "0xe0d55949e6e1590f26ef37a1d01df52fbb1b2fce",
    attesterArbiter: "0xe571d48d05962c57c95e48b8a7375466d1d02487",
    schemaArbiter: "0x9d5817ff5519f45bf8ed6c3ada638b874dbcb540",
    uidArbiter: "0xaa9aef96068f2be679ae8781a4fc33ff4798758f",
    refUidArbiter: "0x546526311e6639399fdc583df84eee8b123d79d5",
    revocableArbiter: "0xe8d45cf2471882730a7e0ac142966df07ae148d4",
    timeAfterArbiter: "0x2725a6869b42edfd155889098408ccb3b1ed060e",
    timeBeforeArbiter: "0x014aa3dc53004b50bc13aa1d85a83bcca5c0671a",
    timeEqualArbiter: "0x1c21a8fb4f69adb0ccdd22d8c125f8689bf227af",
    expirationTimeAfterArbiter: "0xbd90af50fb667724338eb8da541f923f1822ac3c",
    expirationTimeBeforeArbiter: "0xbcce130337f2d8029982a14471d8686afcef20ff",
    expirationTimeEqualArbiter: "0x98d5bc7593143e55e9949da97603126cae0bfd7f",
  },
  "GenLayer Bradbury": {
    ...unreleasedAddresses,
    eas: "0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98",
    easSchemaRegistry: "0xA1F9076932f6eEA0D90BBfA1D6E81D001012645D",

    erc20AtomicPaymentUtils: "0x52De4B30721b3E3660A79da7491a9B2F8a9cB1D5",
    erc20EscrowObligation: "0x2A7df117e45D93d34a7893CC3aE8B105Ae0B561C",
    erc20PaymentObligation: "0x59A9c929778Ad2cC4D5DB6151bDEf0F9Fa7A068C",

    erc721AtomicPaymentUtils: "0xA42032D8BFeE2302cC6F80ff51D283Ffc5a4081f",
    erc721EscrowObligation: "0xf04d9CA943f57353A3A735494E503280C1cD5e77",
    erc721PaymentObligation: "0x52748DD0E39eD6eA9f626179b5eb512302adA7D9",

    erc1155AtomicPaymentUtils: "0x6eb7792D821f32914Be75901F1b4269B13Efad2e",
    erc1155EscrowObligation: "0x677Aa9e1CD9D05f57FbCa2327155EA7479ec7Ac3",
    erc1155PaymentObligation: "0x36Fcf1Ddee838a94B1358285A11e8bbbb90eD9A1",

    tokenBundleAtomicPaymentUtils: "0xf60db64506E366a0A6c1f4cF9D849Adc7bB886D6",
    tokenBundleEscrowObligation: "0xA7EacA68Bffc9443eA08fd58633Eeed3f5EE8A92",
    tokenBundlePaymentObligation: "0x9bA50DB048d1E5db034377abf97F92496D027C71",

    atomicAttestationUtils: "0x0000000000000000000000000000000000000000",
    attestationEscrowObligation: "0x5E6602F080E9B37267aa52306c699ae54Cd71056",
    attestationReferenceEscrowObligation: "0x57D5165F9487F6E7bD6E6a24017FAdadc2b1D7D2",

    stringObligation: "0xB2c808911E84E80156101983897Da7c80e13cB47",
    commitRevealObligation: "0xb822aA07F55a8B75Ee133ede1f21C4E49DE7952f",

    trivialArbiter: "0x847F69d27E4F1A8a115aCa3F4358B079706dc9CE",
    trustedOracleArbiter: "0xe968dFA581B8aBb94eC5F24d0b56163DE69511fD",
    allArbiter: "0xaabdDAa76651d20922d1F561f924a40F6fE7710c",
    anyArbiter: "0xF486f9a62eeb085e99828e1D706bBA5dfC1bD1fD",
    intrinsicsArbiter: "0xBE7fE4d7CEb2140eeBdf01e12D198AEBAdC1F54D",
    erc8004Arbiter: "0xe483EDA58b5f9Eba06A1ad0151dA5e4a5fFC8300",
    referencesEscrowArbiter: zeroAddress,
    nativeTokenEscrowObligation: "0x5bf7c8b0d60d05af0a3De531EB876De271E80dbc",
    nativeTokenPaymentObligation: "0xEB0C0c41F708B8b3556a6F44a1a015a6832C2d2C",
    nativeTokenAtomicPaymentUtils: "0x1A7c6F951e0a33F4910dbe56a200Eb413AEca17b",

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter: "0x309509db364526C7aE202eA9ED94a398a0819d38",
    exclusiveUnrevocableConfirmationArbiter: "0x6CC4068d471E96A1669097918e18017f5764f72a",
    nonexclusiveRevocableConfirmationArbiter: "0x941044D43F9d75dfA8Ad24880B9B9cAD6e116a66",
    nonexclusiveUnrevocableConfirmationArbiter: "0x16aeE626D398B547eDD5fa4BdAA638524C92921d",

    // Attestation Properties Arbiters
    recipientArbiter: "0xeda25079f76ef93c54cC042116Be8D88E49D3439",
    attesterArbiter: "0xFAf8a07709dB9f90d0A0415876CfE00D904cd40B",
    schemaArbiter: "0x68A6e6022ab9984Ee1A9A6cee384FF2aE8be5264",
    uidArbiter: "0x05d9Aa2A6AE38619b864Ff7f87A8f94301ecAB42",
    refUidArbiter: "0x913eAdD13dcCdeD9CD5518075083b6C7A9574A8c",
    revocableArbiter: "0x0ea9e144FfDc6456E5cE8d1f75c686112e8f29c5",
    timeAfterArbiter: "0x208385Fb349c01af2CfA8C6b86F633F6642718e2",
    timeBeforeArbiter: "0xae4fa2D5d7EDD6Aaf697dC0c98EDb921F0fEc058",
    timeEqualArbiter: "0xC51C938f5497be8157DAf8CCc3Eb11Afb8b752C0",
    expirationTimeAfterArbiter: "0x7c782ac7741BB78DB7491Ee222af0a04f7f2bc0b",
    expirationTimeBeforeArbiter: "0xF1C9E20078A13816ACdDF3153e2eAaDd93Fd6E57",
    expirationTimeEqualArbiter: "0xE9ee2c57B18283b66d342D33d63C55f1427f9e9B",
  },
  "Ethereum": {
    ...unreleasedAddresses,
    eas: "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587",
    easSchemaRegistry: "0xA7b39296258348C78294F95B872b282326A97BDF",

    erc20AtomicPaymentUtils: "0x5bf7c8b0d60d05af0a3De531EB876De271E80dbc",
    erc20EscrowObligation: "0xB2c808911E84E80156101983897Da7c80e13cB47",
    erc20PaymentObligation: "0xb822aA07F55a8B75Ee133ede1f21C4E49DE7952f",

    erc721AtomicPaymentUtils: "0xEB0C0c41F708B8b3556a6F44a1a015a6832C2d2C",
    erc721EscrowObligation: "0x2A7df117e45D93d34a7893CC3aE8B105Ae0B561C",
    erc721PaymentObligation: "0x59A9c929778Ad2cC4D5DB6151bDEf0F9Fa7A068C",

    erc1155AtomicPaymentUtils: "0x52De4B30721b3E3660A79da7491a9B2F8a9cB1D5",
    erc1155EscrowObligation: "0xf04d9CA943f57353A3A735494E503280C1cD5e77",
    erc1155PaymentObligation: "0x52748DD0E39eD6eA9f626179b5eb512302adA7D9",

    tokenBundleAtomicPaymentUtils: "0xA7EacA68Bffc9443eA08fd58633Eeed3f5EE8A92",
    tokenBundleEscrowObligation: "0x677Aa9e1CD9D05f57FbCa2327155EA7479ec7Ac3",
    tokenBundlePaymentObligation: "0x36Fcf1Ddee838a94B1358285A11e8bbbb90eD9A1",

    atomicAttestationUtils: "0x0000000000000000000000000000000000000000",
    attestationEscrowObligation: "0x6eb7792D821f32914Be75901F1b4269B13Efad2e",
    attestationReferenceEscrowObligation: "0x1A7c6F951e0a33F4910dbe56a200Eb413AEca17b",

    stringObligation: "0xC51C938f5497be8157DAf8CCc3Eb11Afb8b752C0",
    commitRevealObligation: "0x05d9Aa2A6AE38619b864Ff7f87A8f94301ecAB42",

    trivialArbiter: "0x594E79466b6ac01C6416C929e428264a4bdF0C92",
    trustedOracleArbiter: "0x3B2a812E3eb3B729D40d866Da16c2BB2b6cDd2f2",
    allArbiter: "0x847F69d27E4F1A8a115aCa3F4358B079706dc9CE",
    anyArbiter: "0xe968dFA581B8aBb94eC5F24d0b56163DE69511fD",
    intrinsicsArbiter: "0xaabdDAa76651d20922d1F561f924a40F6fE7710c",
    erc8004Arbiter: "0xBE7fE4d7CEb2140eeBdf01e12D198AEBAdC1F54D",
    referencesEscrowArbiter: zeroAddress,
    nativeTokenEscrowObligation: "0x9bA50DB048d1E5db034377abf97F92496D027C71",
    nativeTokenPaymentObligation: "0xf60db64506E366a0A6c1f4cF9D849Adc7bB886D6",
    nativeTokenAtomicPaymentUtils: "0xA42032D8BFeE2302cC6F80ff51D283Ffc5a4081f",

    // Confirmation arbiters (new naming convention)
    exclusiveRevocableConfirmationArbiter: "0x941044D43F9d75dfA8Ad24880B9B9cAD6e116a66",
    exclusiveUnrevocableConfirmationArbiter: "0x16aeE626D398B547eDD5fa4BdAA638524C92921d",
    nonexclusiveRevocableConfirmationArbiter: "0xe483EDA58b5f9Eba06A1ad0151dA5e4a5fFC8300",
    nonexclusiveUnrevocableConfirmationArbiter: "0x01666d869918aDDDED1B30eF2d36f3C990F09BDE",

    // Attestation Properties Arbiters
    recipientArbiter: "0xF1C9E20078A13816ACdDF3153e2eAaDd93Fd6E57",
    attesterArbiter: "0x6CC4068d471E96A1669097918e18017f5764f72a",
    schemaArbiter: "0x913eAdD13dcCdeD9CD5518075083b6C7A9574A8c",
    uidArbiter: "0xae4fa2D5d7EDD6Aaf697dC0c98EDb921F0fEc058",
    refUidArbiter: "0xE9ee2c57B18283b66d342D33d63C55f1427f9e9B",
    revocableArbiter: "0xeda25079f76ef93c54cC042116Be8D88E49D3439",
    timeAfterArbiter: "0x0ea9e144FfDc6456E5cE8d1f75c686112e8f29c5",
    timeBeforeArbiter: "0x68A6e6022ab9984Ee1A9A6cee384FF2aE8be5264",
    timeEqualArbiter: "0x208385Fb349c01af2CfA8C6b86F633F6642718e2",
    expirationTimeAfterArbiter: "0x309509db364526C7aE202eA9ED94a398a0819d38",
    expirationTimeBeforeArbiter: "0xFAf8a07709dB9f90d0A0415876CfE00D904cd40B",
    expirationTimeEqualArbiter: "0x7c782ac7741BB78DB7491Ee222af0a04f7f2bc0b",
  },
} as const;

export const supportedChains = ["Base Sepolia", "Sepolia", "Filecoin Calibration", "GenLayer Bradbury", "Ethereum"];
