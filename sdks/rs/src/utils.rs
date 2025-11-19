use alloy::{
    network::{EthereumWallet, TxSigner},
    node_bindings::AnvilInstance,
    primitives::{Address, Signature},
    providers::{ProviderBuilder, WsConnect},
    signers::local::PrivateKeySigner,
};

use crate::{
    AlkahestClient, DefaultExtensionConfig,
    clients::{
        arbiters::ArbitersAddresses, attestation::AttestationAddresses, erc20::Erc20Addresses,
        erc721::Erc721Addresses, erc1155::Erc1155Addresses, native_token::NativeTokenAddresses,
        string_obligation::StringObligationAddresses, token_bundle::TokenBundleAddresses,
    },
    contracts::{
        AttestationBarterUtils, AttestationEscrowObligation, AttestationEscrowObligation2,
        ERC20EscrowObligation, ERC20PaymentObligation, ERC721EscrowObligation,
        ERC721PaymentObligation, ERC1155EscrowObligation, ERC1155PaymentObligation,
        IntrinsicsArbiter, IntrinsicsArbiter2, RecipientArbiter, SpecificAttestationArbiter,
        StringObligation, TokenBundleBarterUtils, TrivialArbiter, TrustedOracleArbiter,
        TrustedPartyArbiter,
        attestation_properties::{composing::*, non_composing::*},
        confirmation_arbiters::{
            ConfirmationArbiter, ConfirmationArbiterComposing, RevocableConfirmationArbiter,
            RevocableConfirmationArbiterComposing, UnrevocableConfirmationArbiter,
            UnrevocableConfirmationArbiterComposing,
        },
        erc20_barter_cross_token::ERC20BarterCrossToken,
        erc721_barter_cross_token::ERC721BarterCrossToken,
        erc1155_barter_cross_token::ERC1155BarterCrossToken,
        logical::*,
        payment_fulfillment_arbiters::{
            ERC20PaymentFulfillmentArbiter, ERC721PaymentFulfillmentArbiter,
            ERC1155PaymentFulfillmentArbiter, TokenBundlePaymentFulfillmentArbiter,
        },
        token_bundle::{TokenBundleEscrowObligation, TokenBundlePaymentObligation},
    },
    fixtures::{EAS, MockERC20Permit, MockERC721, MockERC1155, SchemaRegistry},
    types::{PublicProvider, WalletProvider},
};

pub async fn get_wallet_provider<T: TxSigner<Signature> + Sync + Send + 'static>(
    private_key: T,
    rpc_url: impl ToString,
) -> eyre::Result<WalletProvider> {
    let wallet = EthereumWallet::from(private_key);
    let ws = WsConnect::new(rpc_url.to_string());

    let provider = ProviderBuilder::new().wallet(wallet).connect_ws(ws).await?;

    Ok(provider)
}

pub async fn get_public_provider(rpc_url: impl ToString) -> eyre::Result<PublicProvider> {
    let ws = WsConnect::new(rpc_url.to_string());

    let provider = ProviderBuilder::new().connect_ws(ws).await?;

    Ok(provider)
}

pub async fn setup_test_environment() -> eyre::Result<TestContext> {
    let anvil = alloy::node_bindings::Anvil::new().try_spawn()?;

    let god: PrivateKeySigner = anvil.keys()[0].clone().into();
    let god_wallet = EthereumWallet::from(god.clone());

    let ws = WsConnect::new(anvil.ws_endpoint_url());
    let god_provider = ProviderBuilder::new()
        .wallet(god_wallet)
        .connect_ws(ws)
        .await?;
    let god_provider_ = god_provider.clone();

    let schema_registry = SchemaRegistry::deploy(&god_provider).await?;
    let eas = EAS::deploy(&god_provider, schema_registry.address().clone()).await?;

    let mock_erc20_a =
        MockERC20Permit::deploy(&god_provider, "Mock Erc20".into(), "TK1".into()).await?;
    let mock_erc20_b =
        MockERC20Permit::deploy(&god_provider, "Mock Erc20".into(), "TK2".into()).await?;
    let mock_erc721_a = MockERC721::deploy(&god_provider).await?;
    let mock_erc721_b = MockERC721::deploy(&god_provider).await?;
    let mock_erc1155_a = MockERC1155::deploy(&god_provider).await?;
    let mock_erc1155_b = MockERC1155::deploy(&god_provider).await?;

    let uid_arbiter = UidArbiterComposing::deploy(&god_provider).await?;
    let recipient_arbiter = RecipientArbiter::deploy(&god_provider).await?;
    let specific_attestation_arbiter = SpecificAttestationArbiter::deploy(&god_provider).await?;
    let trivial_arbiter = TrivialArbiter::deploy(&god_provider).await?;
    let trusted_oracle_arbiter =
        TrustedOracleArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let trusted_party_arbiter = TrustedPartyArbiter::deploy(&god_provider).await?;
    let intrinsics_arbiter = IntrinsicsArbiter::deploy(&god_provider).await?;
    let intrinsics_arbiter_2 = IntrinsicsArbiter2::deploy(&god_provider).await?;
    let any_arbiter = AnyArbiter::deploy(&god_provider).await?;
    let all_arbiter = AllArbiter::deploy(&god_provider).await?;

    // Deploy new arbiters (except payment fulfillment arbiters which need obligations first)
    let not_arbiter = NotArbiter::deploy(&god_provider).await?;
    let attester_arbiter_composing = AttesterArbiterComposing::deploy(&god_provider).await?;
    let attester_arbiter_non_composing = AttesterArbiterNonComposing::deploy(&god_provider).await?;
    let expiration_time_after_arbiter_composing =
        ExpirationTimeAfterArbiterComposing::deploy(&god_provider).await?;
    let expiration_time_before_arbiter_composing =
        ExpirationTimeBeforeArbiterComposing::deploy(&god_provider).await?;
    let expiration_time_equal_arbiter_composing =
        ExpirationTimeEqualArbiterComposing::deploy(&god_provider).await?;
    let recipient_arbiter_composing = RecipientArbiterComposing::deploy(&god_provider).await?;
    let ref_uid_arbiter_composing = RefUidArbiterComposing::deploy(&god_provider).await?;
    let revocable_arbiter_composing = RevocableArbiterComposing::deploy(&god_provider).await?;
    let schema_arbiter_composing = SchemaArbiterComposing::deploy(&god_provider).await?;
    let time_after_arbiter_composing = TimeAfterArbiterComposing::deploy(&god_provider).await?;
    let time_before_arbiter_composing = TimeBeforeArbiterComposing::deploy(&god_provider).await?;
    let time_equal_arbiter_composing = TimeEqualArbiterComposing::deploy(&god_provider).await?;
    let uid_arbiter_composing = UidArbiterComposing::deploy(&god_provider).await?;

    // Deploy non-composing arbiters
    let expiration_time_after_arbiter_non_composing =
        ExpirationTimeAfterArbiterNonComposing::deploy(&god_provider).await?;
    let expiration_time_before_arbiter_non_composing =
        ExpirationTimeBeforeArbiterNonComposing::deploy(&god_provider).await?;
    let expiration_time_equal_arbiter_non_composing =
        ExpirationTimeEqualArbiterNonComposing::deploy(&god_provider).await?;
    let recipient_arbiter_non_composing =
        RecipientArbiterNonComposing::deploy(&god_provider).await?;
    let ref_uid_arbiter_non_composing = RefUidArbiterNonComposing::deploy(&god_provider).await?;
    let revocable_arbiter_non_composing =
        RevocableArbiterNonComposing::deploy(&god_provider).await?;
    let schema_arbiter_non_composing = SchemaArbiterNonComposing::deploy(&god_provider).await?;
    let time_after_arbiter_non_composing =
        TimeAfterArbiterNonComposing::deploy(&god_provider).await?;
    let time_before_arbiter_non_composing =
        TimeBeforeArbiterNonComposing::deploy(&god_provider).await?;
    let time_equal_arbiter_non_composing =
        TimeEqualArbiterNonComposing::deploy(&god_provider).await?;
    let uid_arbiter_non_composing = UidArbiterNonComposing::deploy(&god_provider).await?;

    // Deploy confirmation arbiters
    let confirmation_arbiter =
        ConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let confirmation_arbiter_composing =
        ConfirmationArbiterComposing::deploy(&god_provider, eas.address().clone()).await?;
    let revocable_confirmation_arbiter =
        RevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let revocable_confirmation_arbiter_composing =
        RevocableConfirmationArbiterComposing::deploy(&god_provider, eas.address().clone()).await?;
    let unrevocable_confirmation_arbiter =
        UnrevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;

    let unrevocable_confirmation_arbiter_composing =
        UnrevocableConfirmationArbiterComposing::deploy(&god_provider, eas.address().clone())
            .await?;

    macro_rules! deploy_obligation {
        ($name:ident) => {
            $name::deploy(
                &god_provider,
                eas.address().clone(),
                schema_registry.address().clone(),
            )
            .await?
        };
    }

    let attestation_escrow_obligation = deploy_obligation!(AttestationEscrowObligation);
    let attestation_escrow_obligation_2 = deploy_obligation!(AttestationEscrowObligation2);
    let bundle_escrow_obligation = deploy_obligation!(TokenBundleEscrowObligation);
    let bundle_payment_obligation = deploy_obligation!(TokenBundlePaymentObligation);
    let erc20_escrow_obligation = deploy_obligation!(ERC20EscrowObligation);
    let erc20_payment_obligation = deploy_obligation!(ERC20PaymentObligation);
    let erc721_escrow_obligation = deploy_obligation!(ERC721EscrowObligation);
    let erc721_payment_obligation = deploy_obligation!(ERC721PaymentObligation);
    let erc1155_escrow_obligation = deploy_obligation!(ERC1155EscrowObligation);
    let erc1155_payment_obligation = deploy_obligation!(ERC1155PaymentObligation);
    let string_obligation = deploy_obligation!(StringObligation);

    // Deploy native token contracts
    let native_token_escrow_obligation = crate::contracts::NativeTokenEscrowObligation::deploy(
        &god_provider,
        eas.address().clone(),
        schema_registry.address().clone(),
    )
    .await?;
    let native_token_payment_obligation = crate::contracts::NativeTokenPaymentObligation::deploy(
        &god_provider,
        eas.address().clone(),
        schema_registry.address().clone(),
    )
    .await?;
    let native_token_barter_utils = crate::contracts::NativeTokenBarterUtils::deploy(
        &god_provider,
        eas.address().clone(),
        erc20_escrow_obligation.address().clone(),
        erc20_payment_obligation.address().clone(),
        erc721_escrow_obligation.address().clone(),
        erc721_payment_obligation.address().clone(),
        erc1155_escrow_obligation.address().clone(),
        erc1155_payment_obligation.address().clone(),
        bundle_escrow_obligation.address().clone(),
        bundle_payment_obligation.address().clone(),
        native_token_escrow_obligation.address().clone(),
        native_token_payment_obligation.address().clone(),
    )
    .await?;

    // Deploy payment fulfillment arbiters (after obligations are available)
    let erc20_payment_fulfillment_arbiter = ERC20PaymentFulfillmentArbiter::deploy(
        &god_provider,
        erc20_payment_obligation.address().clone(),
        specific_attestation_arbiter.address().clone(),
    )
    .await?;
    let erc721_payment_fulfillment_arbiter = ERC721PaymentFulfillmentArbiter::deploy(
        &god_provider,
        erc721_payment_obligation.address().clone(),
        specific_attestation_arbiter.address().clone(),
    )
    .await?;
    let erc1155_payment_fulfillment_arbiter = ERC1155PaymentFulfillmentArbiter::deploy(
        &god_provider,
        erc1155_payment_obligation.address().clone(),
        specific_attestation_arbiter.address().clone(),
    )
    .await?;
    let token_bundle_payment_fulfillment_arbiter = TokenBundlePaymentFulfillmentArbiter::deploy(
        &god_provider,
        bundle_payment_obligation.address().clone(),
        specific_attestation_arbiter.address().clone(),
    )
    .await?;

    macro_rules! deploy_cross_token {
        ($name:ident) => {
            $name::deploy(
                &god_provider,
                eas.address().clone(),
                erc20_escrow_obligation.address().clone(),
                erc20_payment_obligation.address().clone(),
                erc721_escrow_obligation.address().clone(),
                erc721_payment_obligation.address().clone(),
                erc1155_escrow_obligation.address().clone(),
                erc1155_payment_obligation.address().clone(),
                bundle_escrow_obligation.address().clone(),
                bundle_payment_obligation.address().clone(),
            )
            .await?
        };
    }

    let attestation_barter_utils = AttestationBarterUtils::deploy(
        &god_provider,
        eas.address().clone(),
        schema_registry.address().clone(),
        attestation_escrow_obligation_2.address().clone(),
    )
    .await?;
    let bundle_barter_utils = TokenBundleBarterUtils::deploy(
        &god_provider,
        eas.address().clone(),
        bundle_escrow_obligation.address().clone(),
        bundle_payment_obligation.address().clone(),
    )
    .await?;
    let erc20_barter_utils = deploy_cross_token!(ERC20BarterCrossToken);
    let erc721_barter_utils = deploy_cross_token!(ERC721BarterCrossToken);
    let erc1155_barter_utils = deploy_cross_token!(ERC1155BarterCrossToken);

    let alice: PrivateKeySigner = anvil.keys()[1].clone().into();
    let bob: PrivateKeySigner = anvil.keys()[2].clone().into();

    let addresses = DefaultExtensionConfig {
        arbiters_addresses: ArbitersAddresses {
            eas: eas.address().clone(),
            specific_attestation_arbiter: specific_attestation_arbiter.address().clone(),
            trivial_arbiter: trivial_arbiter.address().clone(),
            trusted_oracle_arbiter: trusted_oracle_arbiter.address().clone(),
            trusted_party_arbiter: trusted_party_arbiter.address().clone(),
            intrinsics_arbiter: intrinsics_arbiter.address().clone(),
            intrinsics_arbiter_2: intrinsics_arbiter_2.address().clone(),
            any_arbiter: any_arbiter.address().clone(),
            all_arbiter: all_arbiter.address().clone(),
            uid_arbiter: uid_arbiter.address().clone(),
            recipient_arbiter: recipient_arbiter.address().clone(),
            not_arbiter: not_arbiter.address().clone(),
            attester_arbiter_composing: attester_arbiter_composing.address().clone(),
            attester_arbiter_non_composing: attester_arbiter_non_composing.address().clone(),
            expiration_time_after_arbiter_composing: expiration_time_after_arbiter_composing
                .address()
                .clone(),
            expiration_time_before_arbiter_composing: expiration_time_before_arbiter_composing
                .address()
                .clone(),
            expiration_time_equal_arbiter_composing: expiration_time_equal_arbiter_composing
                .address()
                .clone(),
            recipient_arbiter_composing: recipient_arbiter_composing.address().clone(),
            ref_uid_arbiter_composing: ref_uid_arbiter_composing.address().clone(),
            revocable_arbiter_composing: revocable_arbiter_composing.address().clone(),
            schema_arbiter_composing: schema_arbiter_composing.address().clone(),
            time_after_arbiter_composing: time_after_arbiter_composing.address().clone(),
            time_before_arbiter_composing: time_before_arbiter_composing.address().clone(),
            time_equal_arbiter_composing: time_equal_arbiter_composing.address().clone(),
            uid_arbiter_composing: uid_arbiter_composing.address().clone(),
            // Payment fulfillment arbiters
            erc20_payment_fulfillment_arbiter: erc20_payment_fulfillment_arbiter.address().clone(),
            erc721_payment_fulfillment_arbiter: erc721_payment_fulfillment_arbiter
                .address()
                .clone(),
            erc1155_payment_fulfillment_arbiter: erc1155_payment_fulfillment_arbiter
                .address()
                .clone(),
            token_bundle_payment_fulfillment_arbiter: token_bundle_payment_fulfillment_arbiter
                .address()
                .clone(),
            // Non-composing arbiters
            expiration_time_after_arbiter_non_composing:
                expiration_time_after_arbiter_non_composing
                    .address()
                    .clone(),
            expiration_time_before_arbiter_non_composing:
                expiration_time_before_arbiter_non_composing
                    .address()
                    .clone(),
            expiration_time_equal_arbiter_non_composing:
                expiration_time_equal_arbiter_non_composing
                    .address()
                    .clone(),
            recipient_arbiter_non_composing: recipient_arbiter_non_composing.address().clone(),
            ref_uid_arbiter_non_composing: ref_uid_arbiter_non_composing.address().clone(),
            revocable_arbiter_non_composing: revocable_arbiter_non_composing.address().clone(),
            schema_arbiter_non_composing: schema_arbiter_non_composing.address().clone(),
            time_after_arbiter_non_composing: time_after_arbiter_non_composing.address().clone(),
            time_before_arbiter_non_composing: time_before_arbiter_non_composing.address().clone(),
            time_equal_arbiter_non_composing: time_equal_arbiter_non_composing.address().clone(),
            uid_arbiter_non_composing: uid_arbiter_non_composing.address().clone(),
            // Confirmation arbiters
            confirmation_arbiter: confirmation_arbiter.address().clone(),
            confirmation_arbiter_composing: confirmation_arbiter_composing.address().clone(),
            revocable_confirmation_arbiter: revocable_confirmation_arbiter.address().clone(),
            revocable_confirmation_arbiter_composing: revocable_confirmation_arbiter_composing
                .address()
                .clone(),
            unrevocable_confirmation_arbiter: unrevocable_confirmation_arbiter.address().clone(),
            unrevocable_confirmation_arbiter_composing: unrevocable_confirmation_arbiter_composing
                .address()
                .clone(),
        },
        string_obligation_addresses: StringObligationAddresses {
            eas: eas.address().clone(),
            obligation: string_obligation.address().clone(),
        },
        erc20_addresses: Erc20Addresses {
            eas: eas.address().clone(),
            barter_utils: erc20_barter_utils.address().clone(),
            escrow_obligation: erc20_escrow_obligation.address().clone(),
            payment_obligation: erc20_payment_obligation.address().clone(),
        },
        erc721_addresses: Erc721Addresses {
            eas: eas.address().clone(),
            barter_utils: erc721_barter_utils.address().clone(),
            escrow_obligation: erc721_escrow_obligation.address().clone(),
            payment_obligation: erc721_payment_obligation.address().clone(),
        },
        erc1155_addresses: Erc1155Addresses {
            eas: eas.address().clone(),
            barter_utils: erc1155_barter_utils.address().clone(),
            escrow_obligation: erc1155_escrow_obligation.address().clone(),
            payment_obligation: erc1155_payment_obligation.address().clone(),
        },
        native_token_addresses: NativeTokenAddresses {
            eas: eas.address().clone(),
            barter_utils: native_token_barter_utils.address().clone(),
            escrow_obligation: native_token_escrow_obligation.address().clone(),
            payment_obligation: native_token_payment_obligation.address().clone(),
        },
        token_bundle_addresses: TokenBundleAddresses {
            eas: eas.address().clone(),
            barter_utils: bundle_barter_utils.address().clone(),
            escrow_obligation: bundle_escrow_obligation.address().clone(),
            payment_obligation: bundle_payment_obligation.address().clone(),
        },
        attestation_addresses: AttestationAddresses {
            eas: eas.address().clone(),
            eas_schema_registry: schema_registry.address().clone(),
            barter_utils: attestation_barter_utils.address().clone(),
            escrow_obligation: attestation_escrow_obligation.address().clone(),
            escrow_obligation_2: attestation_escrow_obligation_2.address().clone(),
        },
    };

    let alice_client = AlkahestClient::with_base_extensions(
        alice.clone(),
        anvil.ws_endpoint_url(),
        Some(addresses.clone()),
    )
    .await?;
    let bob_client = AlkahestClient::with_base_extensions(
        bob.clone(),
        anvil.ws_endpoint_url(),
        Some(addresses.clone()),
    )
    .await?;

    Ok(TestContext {
        anvil,
        alice,
        bob,
        god,
        god_provider: god_provider_,
        alice_client,
        bob_client,
        addresses,
        mock_addresses: MockAddresses {
            erc20_a: mock_erc20_a.address().clone(),
            erc20_b: mock_erc20_b.address().clone(),
            erc721_a: mock_erc721_a.address().clone(),
            erc721_b: mock_erc721_b.address().clone(),
            erc1155_a: mock_erc1155_a.address().clone(),
            erc1155_b: mock_erc1155_b.address().clone(),
        },
    })
}

pub struct TestContext {
    pub anvil: AnvilInstance,
    pub alice: PrivateKeySigner,
    pub bob: PrivateKeySigner,
    pub god: PrivateKeySigner,
    pub god_provider: WalletProvider,
    pub alice_client: AlkahestClient<crate::extensions::BaseExtensions>,
    pub bob_client: AlkahestClient<crate::extensions::BaseExtensions>,
    pub addresses: DefaultExtensionConfig,
    pub mock_addresses: MockAddresses,
}

pub struct MockAddresses {
    pub erc20_a: Address,
    pub erc20_b: Address,
    pub erc721_a: Address,
    pub erc721_b: Address,
    pub erc1155_a: Address,
    pub erc1155_b: Address,
}
