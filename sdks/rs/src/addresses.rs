use alloy::primitives::{Address, address};

use crate::{
    DefaultExtensionConfig,
    clients::{
        arbiters::ArbitersAddresses, attestation::AttestationAddresses,
        commit_reveal_obligation::CommitRevealObligationAddresses, erc20::Erc20Addresses,
        erc721::Erc721Addresses, erc1155::Erc1155Addresses, hook_based::HookBasedAddresses,
        native_token::NativeTokenAddresses, splitters::SplittersAddresses,
        string_obligation::StringObligationAddresses, token_bundle::TokenBundleAddresses,
    },
};

const UNRELEASED_HOOK_BASED_ADDRESSES: HookBasedAddresses = HookBasedAddresses {
    eas: Address::ZERO,
    hook_escrow_obligation: Address::ZERO,
    hooks_escrow_obligation: Address::ZERO,
    erc20_escrow_hook: Address::ZERO,
    erc721_escrow_hook: Address::ZERO,
    erc1155_escrow_hook: Address::ZERO,
    native_token_escrow_hook: Address::ZERO,
    attestation_escrow_hook: Address::ZERO,
    attestation_reference_escrow_hook: Address::ZERO,
};

const UNRELEASED_SPLITTERS_ADDRESSES: SplittersAddresses = SplittersAddresses {
    erc20_splitter: Address::ZERO,
    erc1155_splitter: Address::ZERO,
    native_token_splitter: Address::ZERO,
    token_bundle_splitter: Address::ZERO,
    token_bundle_splitter_unvalidated: Address::ZERO,
};

pub const BASE_SEPOLIA_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        trivial_arbiter: address!("0xa42Df9aDF17f26Ff1eD5206cf83E5dab88bD3523"),
        trusted_oracle_arbiter: address!("0x504f496F696c41558070a933c90a98604c3f4475"),
        intrinsics_arbiter: address!("0xd78d4404E2E1a9033eEf1ac69BF488f6a4Ea9aC0"),
        erc8004_arbiter: address!("0x65dE059a0B2A060E842B8106B1BE365bf5f2F80f"),
        references_escrow_arbiter: address!("0x335441cc9813558067e5b3a4c39AF8a9cFb6fAF8"),
        any_arbiter: address!("0xaF67e09D889e0df9d404059283A1FA7BA7Ac7d88"),
        all_arbiter: address!("0x9F78AAca04A2c005618c3B214e609B13Bbe66356"),
        attester_arbiter: address!("0xa50365B53232f54cf6C60f0f432ad64169A6e76e"),
        expiration_time_after_arbiter: address!("0xd8C0Ab60B431061a079C8b4e0BaCf7CbF6aEA29d"),
        expiration_time_before_arbiter: address!("0xcae48f46d89cd2d78118a84d8CA589Ee7d29C98c"),
        expiration_time_equal_arbiter: address!("0x9354ca2BdB314BB41C78CBff4C4443718a8813DF"),
        recipient_arbiter: address!("0x507CFD91DD2d2b8E7F93812414d8Ce9dC5404F62"),
        ref_uid_arbiter: address!("0xafA3c1593ca451DA36dB7fD36077BcFFf7B4c717"),
        revocable_arbiter: address!("0x6a9e076cf1Df39D029A7B6d48A1Ab36B3cC28639"),
        schema_arbiter: address!("0xA8f8e66d12b97EbE93C79b36D015666DEC2Dd151"),
        time_after_arbiter: address!("0x24D729f6f8Fc3DF5EB42939276cF2Efe9fF963d6"),
        time_before_arbiter: address!("0xCE156DEAB9B4A525640a0BC2Ad9966d13f9a134a"),
        time_equal_arbiter: address!("0x5dc2d28f06DDB3e60b76fab033F672126572c976"),
        uid_arbiter: address!("0x9F06F7E040d57e21964cCa4D91CBC57b25C55D67"),
        exclusive_revocable_confirmation_arbiter: address!(
            "0xf6388A7b78c4A130249160CbcC609530D267B59B"
        ),
        exclusive_unrevocable_confirmation_arbiter: address!(
            "0x21F1402b4006B4A799502F948cfED187E66e9bb9"
        ),
        nonexclusive_revocable_confirmation_arbiter: address!(
            "0xC4876Bf97a5C24E26e8286fF7a3391c20A8a0A6e"
        ),
        nonexclusive_unrevocable_confirmation_arbiter: address!(
            "0x9F8AF67d89B674513eFAdf29ed936c4704A64fEb"
        ),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x22d3203992CCC7Dfb2Ec12D87E15b0d8698De35b"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x14d0B7D4ed6915CE0b1a0d54F9D5912584dB550E"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        atomic_payment_utils: address!("0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0"),
        escrow_obligation_default: address!("0x5c55EFa334A7FceF530a081D19Be98E871EdbB83"),
        escrow_obligation_unconditional: address!("0x56AcF1b3A736C5524b8836534D15445322a50a2B"),
        payment_obligation: address!("0x0f953267E8d835b9f33b361C963F126775316dcA"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        atomic_payment_utils: address!("0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0"),
        escrow_obligation_default: address!("0x0850d8F7015Ba183227925cd100968e82aCb266A"),
        escrow_obligation_unconditional: address!("0x63A26965Ea23A61219128a57392f8a2A4E7be140"),
        payment_obligation: address!("0x2e8aa787750853ce422E487dacad385296F81169"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        atomic_payment_utils: address!("0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0"),
        escrow_obligation_default: address!("0x267C98D752C6B9F9B354471A08F72aaCb9eC8567"),
        escrow_obligation_unconditional: address!("0x62c1351503Ef1308FfF550cD594c95F3112F61aB"),
        payment_obligation: address!("0x1F559CE3f65374593ff39EC5a74ea36db0b817d1"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        atomic_payment_utils: address!("0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0"),
        escrow_obligation_default: address!("0x5d83C1Cb608e891F7B2Bcc12294d1e64aBB8eC7F"),
        escrow_obligation_unconditional: address!("0x58368eE14F75FA38366E7da12707Ec501e3F042a"),
        payment_obligation: address!("0xd53357af507f4c865A6345a05dC9849BB3eFD7c7"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        atomic_payment_utils: address!("0x4c597Ee412A4414e80Ddb79Fde1Fb704bc1358c0"),
        escrow_obligation_default: address!("0xC52c611c0C9A11fF625B93f9D1fb9E74C45d9859"),
        escrow_obligation_unconditional: address!("0xa5ba8B7382093525F5F6739cCff910376D63c1ba"),
        payment_obligation: address!("0x7F445E83779Df77cAB8E71eC3C5E2Bffe4EB1314"),
    },
    hook_based_addresses: HookBasedAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        hook_escrow_obligation: address!("0x5aD1B5f0eE7A520311B4b8d8f758d48934851981"),
        hooks_escrow_obligation: address!("0xa21a3A6db8b00303D7e919Ea8983CFd2DC6Ed1d3"),
        erc20_escrow_hook: address!("0xEF0473fE3777b45C68455f90d4edCC1A8673c518"),
        erc721_escrow_hook: address!("0x80016D907E87989457C0253D42e0a4348476DBb3"),
        erc1155_escrow_hook: address!("0xC2045eF34C8789dE4744272706a8800A03cE1f11"),
        native_token_escrow_hook: address!("0xFeE4003D97e77251091D9C686ba4da4E46D98c05"),
        attestation_escrow_hook: address!("0x2fd54cC36e441B2a3c0202B621208db046C18ea3"),
        attestation_reference_escrow_hook: address!("0x335cE1C9DFA441C2db31914502E5CeD9b38DCBFD"),
    },
    splitters_addresses: SplittersAddresses {
        erc20_splitter: address!("0xd6816aC123844edb88f0AF146Cc565C6663DE97B"),
        erc1155_splitter: address!("0xB386B657F66c8eAb3A3335d590Eef4a0871e63a3"),
        native_token_splitter: address!("0xa32161d10B31f3eB5BfC0EEfDE64784e01CBD9E1"),
        token_bundle_splitter: address!("0xceC0D468b29cA55FEA224e2b66AC5694036aA24d"),
        token_bundle_splitter_unvalidated: address!("0x6c1c55E13E5Ec8668dad15dbe1B461E7814643a1"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        eas_schema_registry: address!("0x4200000000000000000000000000000000000020"),
        atomic_attestation_utils: address!("0x886f7cE4bF11dBDbA163bEE866533965177ae680"),
        escrow_obligation_default: address!("0xFa299C13D7F17B6a3E63b1bE985F93020Db1169C"),
        escrow_obligation_unconditional: address!("0x61504DB9850e54fEb9f0681631BE8906a75B3bB9"),
        attestation_reference_escrow_obligation_default: address!(
            "0x18a38eE1e1609e21b29F9bec07Ea6633BB5E8368"
        ),
        attestation_reference_escrow_obligation_unconditional: address!(
            "0x7833cD2ADD07CD7bD0DA20020663D6857fDa1E6C"
        ),
    },
};

pub const ETHEREUM_SEPOLIA_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        trivial_arbiter: address!("0xD56bD862e7BEbD0BD7356603e9E52B32c241E2AE"),
        trusted_oracle_arbiter: address!("0x61dC9c2D757A1C9D0d38A281288d9ef918e77Baa"),
        intrinsics_arbiter: address!("0x7B20A4b25af2a2637C240622d6C3875DeA609A64"),
        erc8004_arbiter: address!("0x194C3Da79a1De5f9141b1DbCdF98eC5d511B4E5a"),
        references_escrow_arbiter: address!("0x49026902790A8ECb427f335cA0d097c7C5795d13"),
        any_arbiter: address!("0x81dC8f2C5677b02aFcAFef34Fa7E75D55dfAEF20"),
        all_arbiter: address!("0xb6890A8Cb8CDeFcE11Edc0314125b750F48BFF1B"),
        attester_arbiter: address!("0xE571D48D05962C57c95e48b8A7375466D1d02487"),
        expiration_time_after_arbiter: address!("0xbD90aF50Fb667724338EB8DA541f923F1822ac3C"),
        expiration_time_before_arbiter: address!("0xbCCE130337F2D8029982a14471d8686AFceF20fF"),
        expiration_time_equal_arbiter: address!("0x98D5bC7593143E55e9949da97603126CAe0BfD7F"),
        recipient_arbiter: address!("0xE0d55949E6e1590F26eF37a1D01df52Fbb1b2FcE"),
        ref_uid_arbiter: address!("0x546526311E6639399FdC583dF84eEe8b123D79d5"),
        revocable_arbiter: address!("0xe8d45cf2471882730a7e0ac142966DF07ae148d4"),
        schema_arbiter: address!("0x9D5817Ff5519f45bf8ed6C3ADa638b874DBCb540"),
        time_after_arbiter: address!("0x2725A6869b42eDfD155889098408CcB3b1ed060e"),
        time_before_arbiter: address!("0x014aA3DC53004B50bC13aa1D85A83bccA5c0671a"),
        time_equal_arbiter: address!("0x1c21A8fB4F69ADb0ccDd22D8C125F8689bf227AF"),
        uid_arbiter: address!("0xaA9aEf96068f2BE679ae8781A4fC33FF4798758F"),
        exclusive_revocable_confirmation_arbiter: address!(
            "0xa740634E718c8727853D1E69963303D5cB8Ea44C"
        ),
        exclusive_unrevocable_confirmation_arbiter: address!(
            "0xB3D71c6f96cdD41e56dd9870b232225C379f2890"
        ),
        nonexclusive_revocable_confirmation_arbiter: address!(
            "0x831B40aE79D391C7d56209802b9745Fe0743DBF5"
        ),
        nonexclusive_unrevocable_confirmation_arbiter: address!(
            "0xFeaA2fa295d1453BA382b7eE0e3F66c489A6d9Bb"
        ),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        obligation: address!("0x66c3f78258823B9B899aB14B11e1DCf978c060D7"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        obligation: address!("0x931b35F81e7A585317f8cF8B45795F403EEfe468"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        atomic_payment_utils: address!("0xD59c6c6Cb025E76a0a1E706c62A9dF38b04694E2"),
        escrow_obligation_default: address!("0x6bcec91a89A63D50368BCe54Cb9eD0399992C18b"),
        escrow_obligation_unconditional: address!("0x33F6f558c1FCac597F2b635bc50554055FF98165"),
        payment_obligation: address!("0x99F5335B95e1C0bE4C218a59aae26Efc50d5673f"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        atomic_payment_utils: address!("0xD59c6c6Cb025E76a0a1E706c62A9dF38b04694E2"),
        escrow_obligation_default: address!("0x5B6Bff4DC108C58b97721330666f56c8028C097c"),
        escrow_obligation_unconditional: address!("0xF9Dbc74553FaeCAC775201113198085c4D572805"),
        payment_obligation: address!("0x4CB076aF47F0F3909Ebafd88cBc0c4CC8Dee17DD"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        atomic_payment_utils: address!("0xD59c6c6Cb025E76a0a1E706c62A9dF38b04694E2"),
        escrow_obligation_default: address!("0x902ac1997bd29A037263E0d80952C80d69D9aFd4"),
        escrow_obligation_unconditional: address!("0xc1b02eFEc19a171ECBB7C8ad54B9617E80fdF40F"),
        payment_obligation: address!("0xfca2C2DF4023A0A418BF354B5Bfff1EbFe0520A9"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        atomic_payment_utils: address!("0xD59c6c6Cb025E76a0a1E706c62A9dF38b04694E2"),
        escrow_obligation_default: address!("0x797a737deFB8cAE0a30324ecFa52eaab9c0A5fD6"),
        escrow_obligation_unconditional: address!("0x850D8Df3fF0149Bd5a9191A958B287B25564716B"),
        payment_obligation: address!("0x3c07027874650794EaE300C603f066af182EA86A"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        atomic_payment_utils: address!("0xD59c6c6Cb025E76a0a1E706c62A9dF38b04694E2"),
        escrow_obligation_default: address!("0x7490102a8B821C70679508426823F26C9bab4714"),
        escrow_obligation_unconditional: address!("0xD511278D5b9e5F8F9B99d01Ea326B8232C133be5"),
        payment_obligation: address!("0xb5800e34602154cE92C5eb0e7Cb455306d7d590E"),
    },
    hook_based_addresses: HookBasedAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        hook_escrow_obligation: address!("0xaFfE00b43dD7843E8F6E8A2B4df0a62949Bf8352"),
        hooks_escrow_obligation: address!("0xc79668ec88dA1fa6efd645Eca2dF338f39E4Dcb6"),
        erc20_escrow_hook: address!("0x13034d319e72e77e69EDD2ef09ed084d8Fc7cbAE"),
        erc721_escrow_hook: address!("0x3c1E21911C609714dBc0Ab90800c7aD8817B8e83"),
        erc1155_escrow_hook: address!("0x32889Ee549d61Ed5D14f2D499fCc809a4feC0dD8"),
        native_token_escrow_hook: address!("0xb0A6DDB4eBA2B11371b605eCFdDFE7491eE28bc0"),
        attestation_escrow_hook: address!("0x4De7D702A4edC5fe136B6899E10D770633F337aD"),
        attestation_reference_escrow_hook: address!("0xCFa0756162eE176106185A42ed14f340aAA76F8a"),
    },
    splitters_addresses: SplittersAddresses {
        erc20_splitter: address!("0x5313f28c9e32f45Bd639701e2E7e080b61c0f39e"),
        erc1155_splitter: address!("0x11f6b04b2a8FB648fcD20bd4124c448a16ca37D1"),
        native_token_splitter: address!("0xdA1fD1aC28C1d09E723e5a23Cd16554C87D0D09C"),
        token_bundle_splitter: address!("0x0F235Bf6e5725791e118A25b4903856030525EF0"),
        token_bundle_splitter_unvalidated: address!("0x4621C947D713cC7f63a377EE4D05eea789ab0956"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0xC2679fBD37d54388Ce493F1DB75320D236e1815e"),
        eas_schema_registry: address!("0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"),
        atomic_attestation_utils: address!("0xE800A6E43615C5ba54c2851633f4F92548052cd2"),
        escrow_obligation_default: address!("0xa22b4D9Fe7a746D44BE1e724BB1a26593BCa2C1B"),
        escrow_obligation_unconditional: address!("0xcda1e1EA425E31a789fefFC8e3d90f839fF49C9F"),
        attestation_reference_escrow_obligation_default: address!(
            "0xD57f20673091fB43D55eABf48b4F421DAe70A7C2"
        ),
        attestation_reference_escrow_obligation_unconditional: address!(
            "0xb47c24E94E852521b21D384981F4CEfD1AB9680C"
        ),
    },
};

pub const GENLAYER_BRADBURY_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        trivial_arbiter: address!("0x847F69d27E4F1A8a115aCa3F4358B079706dc9CE"),
        trusted_oracle_arbiter: address!("0xe968dFA581B8aBb94eC5F24d0b56163DE69511fD"),
        intrinsics_arbiter: address!("0xBE7fE4d7CEb2140eeBdf01e12D198AEBAdC1F54D"),
        erc8004_arbiter: address!("0xe483EDA58b5f9Eba06A1ad0151dA5e4a5fFC8300"),
        references_escrow_arbiter: Address::ZERO,
        // Logical arbiters
        any_arbiter: address!("0xF486f9a62eeb085e99828e1D706bBA5dfC1bD1fD"),
        all_arbiter: address!("0xaabdDAa76651d20922d1F561f924a40F6fE7710c"),
        // Attestation property arbiters (non-composing only)
        attester_arbiter: address!("0xFAf8a07709dB9f90d0A0415876CfE00D904cd40B"),
        expiration_time_after_arbiter: address!("0x7c782ac7741BB78DB7491Ee222af0a04f7f2bc0b"),
        expiration_time_before_arbiter: address!("0xF1C9E20078A13816ACdDF3153e2eAaDd93Fd6E57"),
        expiration_time_equal_arbiter: address!("0xE9ee2c57B18283b66d342D33d63C55f1427f9e9B"),
        recipient_arbiter: address!("0xeda25079f76ef93c54cC042116Be8D88E49D3439"),
        ref_uid_arbiter: address!("0x913eAdD13dcCdeD9CD5518075083b6C7A9574A8c"),
        revocable_arbiter: address!("0x0ea9e144FfDc6456E5cE8d1f75c686112e8f29c5"),
        schema_arbiter: address!("0x68A6e6022ab9984Ee1A9A6cee384FF2aE8be5264"),
        time_after_arbiter: address!("0x208385Fb349c01af2CfA8C6b86F633F6642718e2"),
        time_before_arbiter: address!("0xae4fa2D5d7EDD6Aaf697dC0c98EDb921F0fEc058"),
        time_equal_arbiter: address!("0xC51C938f5497be8157DAf8CCc3Eb11Afb8b752C0"),
        uid_arbiter: address!("0x05d9Aa2A6AE38619b864Ff7f87A8f94301ecAB42"),
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: address!(
            "0x309509db364526C7aE202eA9ED94a398a0819d38"
        ),
        exclusive_unrevocable_confirmation_arbiter: address!(
            "0x6CC4068d471E96A1669097918e18017f5764f72a"
        ),
        nonexclusive_revocable_confirmation_arbiter: address!(
            "0x941044D43F9d75dfA8Ad24880B9B9cAD6e116a66"
        ),
        nonexclusive_unrevocable_confirmation_arbiter: address!(
            "0x16aeE626D398B547eDD5fa4BdAA638524C92921d"
        ),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        obligation: address!("0xB2c808911E84E80156101983897Da7c80e13cB47"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        obligation: address!("0xb822aA07F55a8B75Ee133ede1f21C4E49DE7952f"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        atomic_payment_utils: address!("0x52De4B30721b3E3660A79da7491a9B2F8a9cB1D5"),
        escrow_obligation_default: address!("0x2A7df117e45D93d34a7893CC3aE8B105Ae0B561C"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x59A9c929778Ad2cC4D5DB6151bDEf0F9Fa7A068C"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        atomic_payment_utils: address!("0xA42032D8BFeE2302cC6F80ff51D283Ffc5a4081f"),
        escrow_obligation_default: address!("0xf04d9CA943f57353A3A735494E503280C1cD5e77"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x52748DD0E39eD6eA9f626179b5eb512302adA7D9"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        atomic_payment_utils: address!("0x6eb7792D821f32914Be75901F1b4269B13Efad2e"),
        escrow_obligation_default: address!("0x677Aa9e1CD9D05f57FbCa2327155EA7479ec7Ac3"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x36Fcf1Ddee838a94B1358285A11e8bbbb90eD9A1"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        atomic_payment_utils: address!("0x1A7c6F951e0a33F4910dbe56a200Eb413AEca17b"),
        escrow_obligation_default: address!("0x5bf7c8b0d60d05af0a3De531EB876De271E80dbc"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xEB0C0c41F708B8b3556a6F44a1a015a6832C2d2C"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        atomic_payment_utils: address!("0xf60db64506E366a0A6c1f4cF9D849Adc7bB886D6"),
        escrow_obligation_default: address!("0xA7EacA68Bffc9443eA08fd58633Eeed3f5EE8A92"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x9bA50DB048d1E5db034377abf97F92496D027C71"),
    },
    hook_based_addresses: UNRELEASED_HOOK_BASED_ADDRESSES,
    splitters_addresses: UNRELEASED_SPLITTERS_ADDRESSES,
    attestation_addresses: AttestationAddresses {
        eas: address!("0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"),
        eas_schema_registry: address!("0xA1F9076932f6eEA0D90BBfA1D6E81D001012645D"),
        atomic_attestation_utils: Address::ZERO,
        escrow_obligation_default: address!("0x5E6602F080E9B37267aa52306c699ae54Cd71056"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        attestation_reference_escrow_obligation_default: address!(
            "0x57D5165F9487F6E7bD6E6a24017FAdadc2b1D7D2"
        ),
        attestation_reference_escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
    },
};

pub const ETHEREUM_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        trivial_arbiter: address!("0x594E79466b6ac01C6416C929e428264a4bdF0C92"),
        trusted_oracle_arbiter: address!("0x3B2a812E3eb3B729D40d866Da16c2BB2b6cDd2f2"),
        intrinsics_arbiter: address!("0xaabdDAa76651d20922d1F561f924a40F6fE7710c"),
        erc8004_arbiter: address!("0xBE7fE4d7CEb2140eeBdf01e12D198AEBAdC1F54D"),
        references_escrow_arbiter: Address::ZERO,
        // Logical arbiters
        any_arbiter: address!("0xe968dFA581B8aBb94eC5F24d0b56163DE69511fD"),
        all_arbiter: address!("0x847F69d27E4F1A8a115aCa3F4358B079706dc9CE"),
        // Attestation property arbiters (non-composing only)
        attester_arbiter: address!("0x6CC4068d471E96A1669097918e18017f5764f72a"),
        expiration_time_after_arbiter: address!("0x309509db364526C7aE202eA9ED94a398a0819d38"),
        expiration_time_before_arbiter: address!("0xFAf8a07709dB9f90d0A0415876CfE00D904cd40B"),
        expiration_time_equal_arbiter: address!("0x7c782ac7741BB78DB7491Ee222af0a04f7f2bc0b"),
        recipient_arbiter: address!("0xF1C9E20078A13816ACdDF3153e2eAaDd93Fd6E57"),
        ref_uid_arbiter: address!("0xE9ee2c57B18283b66d342D33d63C55f1427f9e9B"),
        revocable_arbiter: address!("0xeda25079f76ef93c54cC042116Be8D88E49D3439"),
        schema_arbiter: address!("0x913eAdD13dcCdeD9CD5518075083b6C7A9574A8c"),
        time_after_arbiter: address!("0x0ea9e144FfDc6456E5cE8d1f75c686112e8f29c5"),
        time_before_arbiter: address!("0x68A6e6022ab9984Ee1A9A6cee384FF2aE8be5264"),
        time_equal_arbiter: address!("0x208385Fb349c01af2CfA8C6b86F633F6642718e2"),
        uid_arbiter: address!("0xae4fa2D5d7EDD6Aaf697dC0c98EDb921F0fEc058"),
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: address!(
            "0x941044D43F9d75dfA8Ad24880B9B9cAD6e116a66"
        ),
        exclusive_unrevocable_confirmation_arbiter: address!(
            "0x16aeE626D398B547eDD5fa4BdAA638524C92921d"
        ),
        nonexclusive_revocable_confirmation_arbiter: address!(
            "0xe483EDA58b5f9Eba06A1ad0151dA5e4a5fFC8300"
        ),
        nonexclusive_unrevocable_confirmation_arbiter: address!(
            "0x01666d869918aDDDED1B30eF2d36f3C990F09BDE"
        ),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        obligation: address!("0xC51C938f5497be8157DAf8CCc3Eb11Afb8b752C0"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        obligation: address!("0x05d9Aa2A6AE38619b864Ff7f87A8f94301ecAB42"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        atomic_payment_utils: address!("0x5bf7c8b0d60d05af0a3De531EB876De271E80dbc"),
        escrow_obligation_default: address!("0xB2c808911E84E80156101983897Da7c80e13cB47"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xb822aA07F55a8B75Ee133ede1f21C4E49DE7952f"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        atomic_payment_utils: address!("0xEB0C0c41F708B8b3556a6F44a1a015a6832C2d2C"),
        escrow_obligation_default: address!("0x2A7df117e45D93d34a7893CC3aE8B105Ae0B561C"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x59A9c929778Ad2cC4D5DB6151bDEf0F9Fa7A068C"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        atomic_payment_utils: address!("0x52De4B30721b3E3660A79da7491a9B2F8a9cB1D5"),
        escrow_obligation_default: address!("0xf04d9CA943f57353A3A735494E503280C1cD5e77"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x52748DD0E39eD6eA9f626179b5eb512302adA7D9"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        atomic_payment_utils: address!("0xA42032D8BFeE2302cC6F80ff51D283Ffc5a4081f"),
        escrow_obligation_default: address!("0x9bA50DB048d1E5db034377abf97F92496D027C71"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xf60db64506E366a0A6c1f4cF9D849Adc7bB886D6"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        atomic_payment_utils: address!("0xA7EacA68Bffc9443eA08fd58633Eeed3f5EE8A92"),
        escrow_obligation_default: address!("0x677Aa9e1CD9D05f57FbCa2327155EA7479ec7Ac3"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x36Fcf1Ddee838a94B1358285A11e8bbbb90eD9A1"),
    },
    hook_based_addresses: UNRELEASED_HOOK_BASED_ADDRESSES,
    splitters_addresses: UNRELEASED_SPLITTERS_ADDRESSES,
    attestation_addresses: AttestationAddresses {
        eas: address!("0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"),
        eas_schema_registry: address!("0xA7b39296258348C78294F95B872b282326A97BDF"),
        atomic_attestation_utils: Address::ZERO,
        escrow_obligation_default: address!("0x6eb7792D821f32914Be75901F1b4269B13Efad2e"),
        escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
        attestation_reference_escrow_obligation_default: address!(
            "0x1A7c6F951e0a33F4910dbe56a200Eb413AEca17b"
        ),
        attestation_reference_escrow_obligation_unconditional: Address::ZERO, // TODO: Add actual address when deployed
    },
};
