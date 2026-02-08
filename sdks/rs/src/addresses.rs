use alloy::primitives::{Address, address};

use crate::{
    DefaultExtensionConfig,
    clients::{
        arbiters::ArbitersAddresses, attestation::AttestationAddresses,
        commit_reveal_obligation::CommitRevealObligationAddresses, erc20::Erc20Addresses,
        erc721::Erc721Addresses, erc1155::Erc1155Addresses, native_token::NativeTokenAddresses,
        string_obligation::StringObligationAddresses, token_bundle::TokenBundleAddresses,
    },
};

pub const BASE_SEPOLIA_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        trivial_arbiter: address!("0x50EDa6c29C740bfbA6875422287025D985b96b7b"),
        trusted_oracle_arbiter: address!("0x3664b11BcCCeCA27C21BBAB43548961eD14d4D6D"),
        intrinsics_arbiter: address!("0x24aAFec3f86CAd330600dD2397DEB8498D44bfd9"),
        intrinsics_arbiter_2: address!("0x51a28Ad45BE6eb6fd6D76af56a7D62ECd99547C7"),
        erc8004_arbiter: address!("0x1d11Be012f4B81617a55B40D64F72AA062DA1Dd5"),
        // Logical arbiters
        any_arbiter: address!("0xaaC3465f340C7A2841A120F81Ce6744cda00d263"),
        all_arbiter: address!("0x0D95c1Cd62cd9C7cCCB237a3Ae08aA61Ed83381f"),
        // Attestation property arbiters (non-composing only)
        attester_arbiter: address!("0xB0d19784373EC5FDd2E44A2b594B10FE9bBecC94"),
        expiration_time_after_arbiter: address!("0x05Ae296859454612a9a346B2EeBE6915319993Ec"),
        expiration_time_before_arbiter: address!("0x698008cC7F4714D331Aa27278BfE6B74FA925cF7"),
        expiration_time_equal_arbiter: address!("0x4d05EA86C2C0af7CA94dc71Da45aba9368e664e4"),
        recipient_arbiter: address!("0xE6CB55B60b6B47B45de05df75B48D656E4bD3730"),
        ref_uid_arbiter: address!("0xdEc95668f431639AAE975CfA9101Bb2A5b5803F6"),
        revocable_arbiter: address!("0x550eF7e901F612914651f3c92c0798eBab037AF6"),
        schema_arbiter: address!("0xc15Ef82Adf03820dA8a0705200602107a06652BE"),
        time_after_arbiter: address!("0xd88274b04194bebA06B32D3F67265e4b530F4C4d"),
        time_before_arbiter: address!("0xEC177a4FA6c42B1EA2bbEC70F3FFaE2aCD94e4aF"),
        time_equal_arbiter: address!("0x0E16A9f94aD457214d5e8AdD30c64D8c6FD4a416"),
        uid_arbiter: address!("0x0Be4E6D777D5C1AE3DDF338AF2398A279571511b"),
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: address!("0xBA0e678f4F1a62f5d737F9289B7e1F2F8580DD8D"),
        exclusive_unrevocable_confirmation_arbiter: address!("0x141Bfd94A1C2B2728dF693657d1C7589b06A139E"),
        nonexclusive_revocable_confirmation_arbiter: address!("0xB78A1870C5412EBa6042a5b1dE895E8f879AbeC6"),
        nonexclusive_unrevocable_confirmation_arbiter: address!("0x74FaFAAEa1bA879E73Cd7e38ec6F3ff86554D4B7"),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x544873C22A3228798F91a71C4ef7a9bFe96E7CE0"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0xD1e0756d7F8508aDf9b12B5039DcaD12b1e95a22"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x946Ef4E912897B4A24b9250513dfeE3fc4303Dde"),
        escrow_obligation_nontierable: address!("0x1Fe964348Ec42D9Bb1A072503ce8b4744266FF43"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x8d13d7542E64D9Da29AB66B6E9b4a6583C64b3F6"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x707f280Fa738b4cc175A369d450f2f603094cbAf"),
        escrow_obligation_nontierable: address!("0x7675a56b2880EF059cFC725E715E1139D689c07B"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x9Daf829f183cA46ad2146F489E7d14335C9B59a9"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x4E4F0F883B1fEC20F219E0c8D2ec0061FE3c1328"),
        escrow_obligation_nontierable: address!("0xB8A3107DA5428a34f818ea4229233fBAe59C16F2"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x6f71429bD940Bf3345780a8E5F5cf3BcdffE80C1"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0xaaB70Cfc37C5E73e185E2976609A82Ba22A4310d"),
        escrow_obligation_nontierable: address!("0x8a1172D32B8cEf14094cF1E7d6F3d1A36D949FDe"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xAB1E9714fbD4f9B5546e891B7Ba392b08c44c37A"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x47C033F49D5A1559AC48f27571204a29b8E728b8"),
        escrow_obligation_nontierable: address!("0x38e8E5684aFB24A88cD9B276032bCBD19C4b9d6e"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xFa5446475De31fa3c6457E2b62EA5a8F8172Cd29"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        eas_schema_registry: address!("0x4200000000000000000000000000000000000020"),
        barter_utils: address!("0x84D390BCd90d5f65D14ff66f6860DCa45e776666"),
        escrow_obligation_nontierable: address!("0x9D133Cbd51270a2A410465F82dAFFD6c1C87322D"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_2_nontierable: address!("0xa076e9ca47f192E6AfB67817608E382074CF0Dcf"),
        escrow_obligation_2_tierable: Address::ZERO, // TODO: Add actual address when deployed
    },
};

pub const FILECOIN_CALIBRATION_ADDRESSES: DefaultExtensionConfig = DefaultExtensionConfig {
    arbiters_addresses: ArbitersAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        trivial_arbiter: address!("0xd56bd862e7bebd0bd7356603e9e52b32c241e2ae"),
        trusted_oracle_arbiter: address!("0x61dc9c2d757a1c9d0d38a281288d9ef918e77baa"),
        intrinsics_arbiter: address!("0x81dc8f2c5677b02afcafef34fa7e75d55dfaef20"),
        intrinsics_arbiter_2: address!("0x7b20a4b25af2a2637c240622d6c3875dea609a64"),
        erc8004_arbiter: address!("0x194c3da79a1de5f9141b1dbcdf98ec5d511b4e5a"),
        // Logical arbiters
        any_arbiter: address!("0xb6890a8cb8cdefce11edc0314125b750f48bff1b"),
        all_arbiter: address!("0x49026902790a8ecb427f335ca0d097c7c5795d13"),
        // Attestation property arbiters (non-composing only)
        attester_arbiter: address!("0xe571d48d05962c57c95e48b8a7375466d1d02487"),
        expiration_time_after_arbiter: address!("0xbd90af50fb667724338eb8da541f923f1822ac3c"),
        expiration_time_before_arbiter: address!("0xbcce130337f2d8029982a14471d8686afcef20ff"),
        expiration_time_equal_arbiter: address!("0x98d5bc7593143e55e9949da97603126cae0bfd7f"),
        recipient_arbiter: address!("0xe0d55949e6e1590f26ef37a1d01df52fbb1b2fce"),
        ref_uid_arbiter: address!("0x546526311e6639399fdc583df84eee8b123d79d5"),
        revocable_arbiter: address!("0xe8d45cf2471882730a7e0ac142966df07ae148d4"),
        schema_arbiter: address!("0x9d5817ff5519f45bf8ed6c3ada638b874dbcb540"),
        time_after_arbiter: address!("0x2725a6869b42edfd155889098408ccb3b1ed060e"),
        time_before_arbiter: address!("0x014aa3dc53004b50bc13aa1d85a83bcca5c0671a"),
        time_equal_arbiter: address!("0x1c21a8fb4f69adb0ccdd22d8c125f8689bf227af"),
        uid_arbiter: address!("0xaa9aef96068f2be679ae8781a4fc33ff4798758f"),
        // Confirmation arbiters (new naming convention)
        exclusive_revocable_confirmation_arbiter: address!("0xa740634e718c8727853d1e69963303d5cb8ea44c"),
        exclusive_unrevocable_confirmation_arbiter: address!("0xb3d71c6f96cdd41e56dd9870b232225c379f2890"),
        nonexclusive_revocable_confirmation_arbiter: address!("0x831b40ae79d391c7d56209802b9745fe0743dbf5"),
        nonexclusive_unrevocable_confirmation_arbiter: address!("0xfeaa2fa295d1453ba382b7ee0e3f66c489a6d9bb"),
    },
    string_obligation_addresses: StringObligationAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        obligation: address!("0x66c3f78258823b9b899ab14b11e1dcf978c060d7"),
    },
    commit_reveal_obligation_addresses: CommitRevealObligationAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        obligation: address!("0x931b35f81e7a585317f8cf8b45795f403eefe468"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        barter_utils: address!("0xb5800e34602154ce92c5eb0e7cb455306d7d590e"),
        escrow_obligation_nontierable: address!("0x6bcec91a89a63d50368bce54cb9ed0399992c18b"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x33f6f558c1fcac597f2b635bc50554055ff98165"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        barter_utils: address!("0x797a737defb8cae0a30324ecfa52eaab9c0a5fd6"),
        escrow_obligation_nontierable: address!("0x99f5335b95e1c0be4c218a59aae26efc50d5673f"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x5b6bff4dc108c58b97721330666f56c8028c097c"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        barter_utils: address!("0x850d8df3ff0149bd5a9191a958b287b25564716b"),
        escrow_obligation_nontierable: address!("0xf9dbc74553faecac775201113198085c4d572805"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x4cb076af47f0f3909ebafd88cbc0c4cc8dee17dd"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        barter_utils: address!("0x3c07027874650794eae300c603f066af182ea86a"),
        escrow_obligation_nontierable: address!("0x7490102a8b821c70679508426823f26c9bab4714"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xd511278d5b9e5f8f9b99d01ea326b8232c133be5"),
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        barter_utils: address!("0xfca2c2df4023a0a418bf354b5bfff1ebfe0520a9"),
        escrow_obligation_nontierable: address!("0x902ac1997bd29a037263e0d80952c80d69d9afd4"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xc1b02efec19a171ecbb7c8ad54b9617e80fdf40f"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x3c79a0225380fB6F3CB990FfC4E3D5aF4546b524"),
        eas_schema_registry: address!("0x2BB94a4E6eC0D81dE7f81007b572Ac09A5BE37b4"),
        barter_utils: address!("0xcda1e1ea425e31a789feffc8e3d90f839ff49c9f"),
        escrow_obligation_nontierable: address!("0xd59c6c6cb025e76a0a1e706c62a9df38b04694e2"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_2_nontierable: address!("0xa22b4d9fe7a746d44be1e724bb1a26593bca2c1b"),
        escrow_obligation_2_tierable: Address::ZERO, // TODO: Add actual address when deployed
    },
};
