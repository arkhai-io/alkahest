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
        trivial_arbiter: address!("0x7D4bCD84901cEC903105564f63BE70432448B222"),
        trusted_oracle_arbiter: address!("0x361E0950534F4a54A39F8C4f1f642C323f6e66B9"),
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
        eas: address!("0x4200000000000000000000000000000000000021"),
        obligation: address!("0x4edEa259C8E014eeEd583D1a863e020190B21Db7"),
    },
    erc20_addresses: Erc20Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x5C624f8FbbB377378cDfE8B627384A917FE839db"),
        escrow_obligation_nontierable: address!("0xFa76421cEe6aee41adc7f6a475b9Ef3776d500F0"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xE95d3931E15E4d96cE1d2Dd336DcEad35A708bdB"),
    },
    erc721_addresses: Erc721Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x01414CC4a4c7b7fa9F551907ee89c867c7a74d29"),
        escrow_obligation_nontierable: address!("0xF3C3dC387e00FE76CCF7990634aa694D466de5AA"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x9DFe20Ded52D0F9e535F546f87d83B473DefC5B2"),
    },
    erc1155_addresses: Erc1155Addresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0x70a9Ce33CF0f7487A8a33B1447455047A90F3998"),
        escrow_obligation_nontierable: address!("0x4e7d759Df6204d901fb6FD82248FEa64f129bfa3"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0x799048b0772381A095aa37305C1D85f26b8445C7"),
    },
    native_token_addresses: NativeTokenAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_nontierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
    },
    token_bundle_addresses: TokenBundleAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        barter_utils: address!("0xb03633005C763feAD6993541Cab2a10FA79828c1"),
        escrow_obligation_nontierable: address!("0xf63e97217f71C4cdbA643c8EFc9F152486560542"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        payment_obligation: address!("0xd192685E79F760fA769614d22916528254FD4937"),
    },
    attestation_addresses: AttestationAddresses {
        eas: address!("0x4200000000000000000000000000000000000021"),
        eas_schema_registry: address!("0x4200000000000000000000000000000000000020"),
        barter_utils: address!("0xfFA2bf5Fc4270e9AFd20Aa2C87b3B100489DF97a"),
        escrow_obligation_nontierable: address!("0x021d28E9eBc935Bf21fe5Ff48cAAbE126Ed706aB"),
        escrow_obligation_tierable: Address::ZERO, // TODO: Add actual address when deployed
        escrow_obligation_2_nontierable: address!("0x5f177293F46d938316229A07E31bC65d64D58c9b"),
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
