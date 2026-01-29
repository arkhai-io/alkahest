use alloy::primitives::{Address, address};

use crate::{
    DefaultExtensionConfig,
    clients::{
        arbiters::ArbitersAddresses, attestation::AttestationAddresses, erc20::Erc20Addresses,
        erc721::Erc721Addresses, erc1155::Erc1155Addresses, native_token::NativeTokenAddresses,
        string_obligation::StringObligationAddresses, token_bundle::TokenBundleAddresses,
    },
};

pub const BASE_SEPOLIA_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        trivial_arbiter: address!("0x7f02E155FA58C672016c27E45770b977C5cBf6b7"),
        trusted_oracle_arbiter: address!("0xD2c1A86BBa27143bc43C9A2Ef23BD1EC8B4C568F"),
        intrinsics_arbiter: address!("0xd3e987538653Afe7648C4Fe785B3a0B3352B7B16"),
        intrinsics_arbiter_2: address!("0xa4911d9297263Ee395d0d24b96F7bFbbfD6Af759"),
        erc8004_arbiter: address!("0x0F15beE06168D38073BD8035a7c7B59D11beFd30"),
        // Logical arbiters
        any_arbiter: address!("0x8234415C1c19769251b32dE1f4BE7096C05D97f0"),
        all_arbiter: address!("0x0DD4DbC1A5e32358bcAFD6bb9DF78D25a38EbC7B"),
        // Attestation property arbiters (non-composing only)
        attester_arbiter: address!("0x10AB72fa34d049784D0A7dc4401b808F0d256848"),
        expiration_time_after_arbiter: address!("0xe5258952a5CF466CB3cF019eF026cC27bd27825d"),
        expiration_time_before_arbiter: address!("0xf04a544850027636be60E8F64c17b303F803bf1f"),
        expiration_time_equal_arbiter: address!("0xbe991C2bbd3a9AE613A68269beC1c194176Ab085"),
        recipient_arbiter: address!("0x29f94Dbfc3094FF3B864c1E0fd212F996BF76D44"),
        ref_uid_arbiter: address!("0xC4AE2943CC5bC3c8209ef67619E5a9e8d14eD716"),
        revocable_arbiter: address!("0x412b3857b8d1D20Df792dB18FB46160856B24934"),
        schema_arbiter: address!("0xEc05410a9FE53dd53032071429206CfeB6212560"),
        time_after_arbiter: address!("0xC220c37ACbeB6AB9DAd1B97919dcCBB98eD3c089"),
        time_before_arbiter: address!("0x4DD40e6b9Fa2D42F64631CFc00cD72b7847f5101"),
        time_equal_arbiter: address!("0x49b4061A47C32A4D5b8B39dBa91537A4dE12BEc2"),
        uid_arbiter: address!("0x429e52Ad326B0f3940fEbB97A6B0276977972c38"),
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: address!("0xC36a9d985B90637faadc4F8D6BB45a4D5f481Eac"),
        exclusive_unrevocable_confirmation_arbiter: address!("0xe4890dF50C8B5f8bf634E605Af3242c68BaB6582"),
        nonexclusive_revocable_confirmation_arbiter: address!("0x857C76610d341A3441592676dcaA4b4B32E8147E"),
        nonexclusive_unrevocable_confirmation_arbiter: address!("0xbd4F441DDc125b05442635d41549BA8144f7a6BD"),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x6Fc6eCe01b0C54F1caf73239D089419192C3af39"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x3974e5aFf7d2CdD0FDED00b47A68e93e3A1e9ccD"),
        escrow_obligation_nontierable: address!("0x19df198F7C538f478746F092fb3aF7BE159f9801"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x6E7f0246f703aA3e54750Bd627F3d89a29c7D782"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0xa9Cad2D8E0f6B34d41098483E1DeE762E4654b05"),
        escrow_obligation_nontierable: address!("0x8e7baDE784E12Bb91D282a3acE6d7Cb88e849909"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x5f7E2c0Dc49cEbe6562b712AcCc0c271c8bA7498"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x2af05e925fE255a76AA19F0a48A4FdB2f193a35C"),
        escrow_obligation_nontierable: address!("0x8337588Ad3C715097794f5490aeF8845132B6129"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xe8b925Dc07ADeC34961d34df7cC3cDC4fB7eb2C0"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x4E90839e391c00F26A234cdA41575AEEAD39c660"), // TODO: Add actual address when deployed
        escrow_obligation_nontierable: address!("0x5E3e92F52E15dD5cC95cba8c90e816291646673B"), // TODO: Add actual address when deployed
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xd83E2d0f6521c69238433B155fa6B4cf6cadeA20"), // TODO: Add actual address when deployed
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x5aecaf71E96ab66000b3c4c28Ab9ABA9b037Dc5b"),
        escrow_obligation_nontierable: address!("0xC98837EBEb2a943BF4597D855720E40a70dA9145"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x36e48AE703f578D3BE1ddd9baB671a65fb466E72"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        eas_schema_registry: address!("0x4200000000000000000000000000000000000020"),
        barter_utils: address!("0x6Ae1b13367ACB4b66B4eD50440d70E61F8c039fD"),
        escrow_obligation_nontierable: address!("0x95D1d5B694Ccb7D604385BB516bCeea993f55BC2"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_2_nontierable: address!("0xC44c66C3c2FAA5B10bb76faB9568f208c48E255a"),
        escrow_obligation_2_tierable: Address::ZERO, // TODO: Add actual address when deployed
    },
};

pub const FILECOIN_CALIBRATION_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        trivial_arbiter: address!("0x6e9bc0d34fff16140401fc51653347be0a1f0ec0"),
        trusted_oracle_arbiter: address!("0x5f1db54dbc5006894ef6c43b2174c05ccaa250ec"),
        intrinsics_arbiter: Address::ZERO,
        intrinsics_arbiter_2: Address::ZERO,
        erc8004_arbiter: Address::ZERO,
        // Logical arbiters
        any_arbiter: Address::ZERO,
        all_arbiter: Address::ZERO,
        // Attestation property arbiters (non-composing only)
        attester_arbiter: Address::ZERO,
        expiration_time_after_arbiter: Address::ZERO,
        expiration_time_before_arbiter: Address::ZERO,
        expiration_time_equal_arbiter: Address::ZERO,
        recipient_arbiter: Address::ZERO,
        ref_uid_arbiter: Address::ZERO,
        revocable_arbiter: Address::ZERO,
        schema_arbiter: Address::ZERO,
        time_after_arbiter: Address::ZERO,
        time_before_arbiter: Address::ZERO,
        time_equal_arbiter: Address::ZERO,
        uid_arbiter: Address::ZERO,
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: Address::ZERO,
        exclusive_unrevocable_confirmation_arbiter: Address::ZERO,
        nonexclusive_revocable_confirmation_arbiter: Address::ZERO,
        nonexclusive_unrevocable_confirmation_arbiter: Address::ZERO,
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        obligation: address!("0xbb022fc36d0cc97b6cae5a2e15d45b7a9ad46f99"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0xaeeddd0a2f24f7286eae7e7fa5cea746fcf064fc"),
        escrow_obligation_nontierable: address!("0x235792a6d077a04fb190a19f362acecab7866ab5"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xd8b6199aa91992f5d3bafddc3372b391e46c92ce"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0x2129f46737135fe4ebb3c49953487122088bc739"),
        escrow_obligation_nontierable: address!("0x336f2f91b093001edd90e49216422b33b8b4e03b"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x4b9b6ff4a7c2bc89eee6f28355b9a94e6649bbf8"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0x66b7398b2bb322bb4a480ae370142c02c52b886a"),
        escrow_obligation_nontierable: address!("0x553e4de0916074201a9d32123efcc8f734ee5675"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x903caa028b1848ab8fdd15c4ccd20c4e7be2b1c0"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_nontierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0xb63cf08c6623f69d2ad34e37b8a68cca6c125d49"),
        escrow_obligation_nontierable: address!("0xdcc1104325d9d99c6bd5faa0804a7d743f3d0c20"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xab43cce34a7b831fa7ab134bcdc21a6ba20882b6"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        eas_schema_registry: address!("0x2bb94a4e6ec0d81de7f81007b572ac09a5be37b4"),
        barter_utils: address!("0x0c19138441e1bee2964e65e0edf1702d59a2e786"),
        escrow_obligation_nontierable: address!("0x553e4de0916074201a9d32123efcc8f734ee5675"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_2_nontierable: address!("0x11c3931f2715d8fca8ea5ca79fac4bbbcdbe9903"),
        escrow_obligation_2_tierable: Address::ZERO, // TODO: Add actual address when deployed
    },
};
