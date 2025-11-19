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
        specific_attestation_arbiter: Address::ZERO,
        trusted_party_arbiter: Address::ZERO,
        trivial_arbiter: address!("0xeAc6eDB3341b295f6eD815a66B0d7D79216a66B4"),
        trusted_oracle_arbiter: address!("0xC343eA368bb7c4a54c92a1aB4d46Db38D7CCaf39"),
        intrinsics_arbiter: address!("0xB950a89e42570Bd9cdf4f800F830bE095706CFf9"),
        intrinsics_arbiter_2: address!("0x16Bc823B27d964bbb6b48592b8b2E019b4897C62"),
        any_arbiter: address!("0x0e1B34fB00AfD95e7dD7a686B676C6bB7efA2481"),
        all_arbiter: address!("0x033EB5BF55fE4d002096232Ca7bDfF600f4e0a2b"),
        uid_arbiter: Address::ZERO,
        recipient_arbiter: Address::ZERO,
        not_arbiter: address!("0x6f9BFDF8556e6619D525ae9c13849090c0Cf886f"),
        attester_arbiter_composing: address!("0x89bfB2d970D90b5ec52C4dF0b0A0596dd3E2b688"),
        attester_arbiter_non_composing: address!("0xA9ca3210114793c67a7A3eAC45A71c8a5E46694e"),
        expiration_time_after_arbiter_composing: address!(
            "0xb5d9193565128e5D087AC0F9A24C1C7aB89809F0"
        ),
        expiration_time_before_arbiter_composing: address!(
            "0xD4604c67fae7e37C994047132413F73f65EA66D6"
        ),
        expiration_time_equal_arbiter_composing: address!(
            "0xac12C07f8358e380C43BA32D3d10caFCb79441ce"
        ),
        recipient_arbiter_composing: address!("0x774F9D7c02AfB52507e5FB3ce8713bcBb9F613Dd"),
        ref_uid_arbiter_composing: address!("0xfC85602bB4d5ca70049B8E5d3c7ba3823D1797d9"),
        revocable_arbiter_composing: address!("0xE558A87bcB5117bA14388C9bdd19f0Ee44C09dcf"),
        schema_arbiter_composing: address!("0xd4D77898824c0f7efb33Da9c5D1eFF5fc3602776"),
        time_after_arbiter_composing: address!("0xf379552a4DE2B40334FCBeefb0106d7AC9891c59"),
        time_before_arbiter_composing: address!("0xD6e582b6D8737ed72946dA0c9bbe77CE0fc35954"),
        time_equal_arbiter_composing: address!("0x320D8B22b208B43e254E02ac7Fbc1a08A3C77174"),
        uid_arbiter_composing: address!("0xD60dd6EA10634D3946B763Dc08e3A6a6251f9d8D"),
        // Payment fulfillment arbiters
        erc20_payment_fulfillment_arbiter: Address::ZERO,
        erc721_payment_fulfillment_arbiter: Address::ZERO,
        erc1155_payment_fulfillment_arbiter: Address::ZERO,
        token_bundle_payment_fulfillment_arbiter: Address::ZERO,
        // Non-composing arbiters
        expiration_time_after_arbiter_non_composing: address!(
            "0x913cc8f9a02334e7b1334476C936Bc2748a3Dd3e"
        ),
        expiration_time_before_arbiter_non_composing: address!(
            "0x150fffcE007E0940f6E2B35BBeED9a04295815B0"
        ),
        expiration_time_equal_arbiter_non_composing: address!(
            "0x83c3f93e8Ddb5427450F1a013Ac33b35AD2485cf"
        ),
        recipient_arbiter_non_composing: address!("0x2F2D602899dfE1F3a0CcE013F0aC271fa88A7117"),
        ref_uid_arbiter_non_composing: address!("0xfc31f485819dE33D3d6a9837Be266Fb4aF5b4EC6"),
        revocable_arbiter_non_composing: address!("0x7c2e5d89282ecF39Fd978Fe92C93db82098f70e1"),
        schema_arbiter_non_composing: address!("0x7CA82c608504b5e2676e1A2db257C646Ce9990C7"),
        time_after_arbiter_non_composing: address!("0x6F5925fEc86C30350a58b228b5Ec9C18C2A13E24"),
        time_before_arbiter_non_composing: address!("0x7F1553C98EcDfEF68B24071043794dEb50567e43"),
        time_equal_arbiter_non_composing: address!("0x87167276A1738cb1d3301a4Cf609ecc475e845c2"),
        uid_arbiter_non_composing: address!("0xF530DC3f8D615ADe2a1Fa9dbfeB405B3E602fD2f"),
        // Confirmation arbiters
        confirmation_arbiter: address!("0x10BC6135736A94AbB538C83ab03affd8e4aEe49D"),
        confirmation_arbiter_composing: address!("0xDB68575Ca35D926dB9045d367C6878F27d79eA5B"),
        revocable_confirmation_arbiter: address!("0xB74eBd0C5acdfDfD9222D4B9985aF79d537aaED7"),
        revocable_confirmation_arbiter_composing: address!(
            "0xCa06fF3Cbd798F4A5777BBDf3B3A0bFc7d48e7cf"
        ),
        unrevocable_confirmation_arbiter: address!("0x063B177e2765658183C28caD8BC35458cb0Be8e1"),
        unrevocable_confirmation_arbiter_composing: Address::ZERO,
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x655677c421BA84f97D7A17A4A2D5038c8B564dCD"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0xF02d5fD6c858b7E7088D5E6912008936846519E5"),
        escrow_obligation: address!("0x3826430c1C358623a76e7E240f186D8ad0aEc1d1"),
        payment_obligation: address!("0x70573b0A9E98cc9E5E8a9899C1756510057eeC70"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x83417Ea0b4dE1333C40CC8F98A4Fee2A0BAD8A8F"),
        escrow_obligation: address!("0xAb647525526BeBBE59B23af166F708b0e7A23C31"),
        payment_obligation: address!("0x64f89f110378219cb9A70Aa175d3936e36e64495"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0xC5DC89829091D35AD2aBb8c7f32C20eCF30C3eA5"),
        escrow_obligation: address!("0xe29A8516dd347919cC1939c2113EFD611Ba47a9E"),
        payment_obligation: address!("0xE083f6B4b1b5F89e6E2E1E043a1947fa14839A67"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x1300a5AD4C33F482f106B72fAA72a0e73D7e94eA"),
        escrow_obligation: address!("0x187cc572B48F296A579FC8998FF65e94eaB678f0"),
        payment_obligation: address!("0xd46EEE3c196D09cCDb752EbB79e3762fA9147E42"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        eas_schema_registry: address!("0x4200000000000000000000000000000000000020"),
        barter_utils: address!("0x20b49D94D71B686db5Da0d4E4Ea76dD158E03C4F"),
        escrow_obligation: address!("0xbeeae6735892f2dEf5F0A3D9EfEC2eAC02324b20"),
        escrow_obligation_2: address!("0x11909d3AB6D539469422B5830533c3B9B3dDaF0c"),
    },
};

pub const FILECOIN_CALIBRATION_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        specific_attestation_arbiter: address!("0x10788ba2c4c65d1e97bc6005436b61c2c2e51572"),
        trusted_party_arbiter: address!("0xed550301b3258612509615bbddd4b2383cf32df4"),
        trivial_arbiter: address!("0x6e9bc0d34fff16140401fc51653347be0a1f0ec0"),
        trusted_oracle_arbiter: address!("0x5f1db54dbc5006894ef6c43b2174c05ccaa250ec"),
        intrinsics_arbiter: Address::ZERO,
        intrinsics_arbiter_2: Address::ZERO,
        any_arbiter: Address::ZERO,
        all_arbiter: Address::ZERO,
        uid_arbiter: Address::ZERO,
        recipient_arbiter: Address::ZERO,
        not_arbiter: Address::ZERO,
        attester_arbiter_composing: Address::ZERO,
        attester_arbiter_non_composing: Address::ZERO,
        expiration_time_after_arbiter_composing: Address::ZERO,
        expiration_time_before_arbiter_composing: Address::ZERO,
        expiration_time_equal_arbiter_composing: Address::ZERO,
        recipient_arbiter_composing: Address::ZERO,
        ref_uid_arbiter_composing: Address::ZERO,
        revocable_arbiter_composing: Address::ZERO,
        schema_arbiter_composing: Address::ZERO,
        time_after_arbiter_composing: Address::ZERO,
        time_before_arbiter_composing: Address::ZERO,
        time_equal_arbiter_composing: Address::ZERO,
        uid_arbiter_composing: Address::ZERO,
        // Payment fulfillment arbiters
        erc20_payment_fulfillment_arbiter: Address::ZERO,
        erc721_payment_fulfillment_arbiter: Address::ZERO,
        erc1155_payment_fulfillment_arbiter: Address::ZERO,
        token_bundle_payment_fulfillment_arbiter: Address::ZERO,
        // Non-composing arbiters
        expiration_time_after_arbiter_non_composing: Address::ZERO,
        expiration_time_before_arbiter_non_composing: Address::ZERO,
        expiration_time_equal_arbiter_non_composing: Address::ZERO,
        recipient_arbiter_non_composing: Address::ZERO,
        ref_uid_arbiter_non_composing: Address::ZERO,
        revocable_arbiter_non_composing: Address::ZERO,
        schema_arbiter_non_composing: Address::ZERO,
        time_after_arbiter_non_composing: Address::ZERO,
        time_before_arbiter_non_composing: Address::ZERO,
        time_equal_arbiter_non_composing: Address::ZERO,
        uid_arbiter_non_composing: Address::ZERO,
        // Confirmation arbiters
        confirmation_arbiter: Address::ZERO,
        confirmation_arbiter_composing: Address::ZERO,
        revocable_confirmation_arbiter: Address::ZERO,
        revocable_confirmation_arbiter_composing: Address::ZERO,
        unrevocable_confirmation_arbiter: Address::ZERO,
        unrevocable_confirmation_arbiter_composing: Address::ZERO,
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        obligation: address!("0xbb022fc36d0cc97b6cae5a2e15d45b7a9ad46f99"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0xaeeddd0a2f24f7286eae7e7fa5cea746fcf064fc"),
        escrow_obligation: address!("0x235792a6d077a04fb190a19f362acecab7866ab5"),
        payment_obligation: address!("0xd8b6199aa91992f5d3bafddc3372b391e46c92ce"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0x2129f46737135fe4ebb3c49953487122088bc739"),
        escrow_obligation: address!("0x336f2f91b093001edd90e49216422b33b8b4e03b"),
        payment_obligation: address!("0x4b9b6ff4a7c2bc89eee6f28355b9a94e6649bbf8"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0x66b7398b2bb322bb4a480ae370142c02c52b886a"),
        escrow_obligation: address!("0x553e4de0916074201a9d32123efcc8f734ee5675"),
        payment_obligation: address!("0x903caa028b1848ab8fdd15c4ccd20c4e7be2b1c0"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        barter_utils: address!("0xb63cf08c6623f69d2ad34e37b8a68cca6c125d49"),
        escrow_obligation: address!("0xdcc1104325d9d99c6bd5faa0804a7d743f3d0c20"),
        payment_obligation: address!("0xab43cce34a7b831fa7ab134bcdc21a6ba20882b6"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x3c79a0225380fb6f3cb990ffc4e3d5af4546b524"),
        eas_schema_registry: address!("0x2bb94a4e6ec0d81de7f81007b572ac09a5be37b4"),
        barter_utils: address!("0x0c19138441e1bee2964e65e0edf1702d59a2e786"),
        escrow_obligation: address!("0x553e4de0916074201a9d32123efcc8f734ee5675"),
        escrow_obligation_2: address!("0x11c3931f2715d8fca8ea5ca79fac4bbbcdbe9903"),
    },
};
