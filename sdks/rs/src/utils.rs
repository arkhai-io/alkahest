use alloy::{
    network::{EthereumWallet, TxSigner},
    node_bindings::AnvilInstance,
    primitives::{Address, Signature},
    providers::{
        ProviderBuilder, WsConnect,
    },
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
        arbiters::{
            TrivialArbiter, TrustedOracleArbiter, IntrinsicsArbiter, IntrinsicsArbiter2,
            logical::{AllArbiter, AnyArbiter},
            attestation_properties::{
                AttesterArbiter, ExpirationTimeAfterArbiter, ExpirationTimeBeforeArbiter,
                ExpirationTimeEqualArbiter, RecipientArbiter, RefUidArbiter, RevocableArbiter,
                SchemaArbiter, TimeAfterArbiter, TimeBeforeArbiter, TimeEqualArbiter, UidArbiter,
            },
            confirmation::{
                ExclusiveRevocableConfirmationArbiter, ExclusiveUnrevocableConfirmationArbiter,
                NonexclusiveRevocableConfirmationArbiter, NonexclusiveUnrevocableConfirmationArbiter,
            },
        },
        obligations::{
            escrow::non_tierable::{
                AttestationEscrowObligation, AttestationEscrowObligation2, ERC20EscrowObligation, ERC721EscrowObligation,
                ERC1155EscrowObligation, NativeTokenEscrowObligation, TokenBundleEscrowObligation,
            },
            // Payment obligations are at root of obligations module
            ERC20PaymentObligation, ERC721PaymentObligation, ERC1155PaymentObligation,
            NativeTokenPaymentObligation, TokenBundlePaymentObligation, StringObligation,
        },
        utils::{
            AttestationBarterUtils, ERC20BarterUtils, ERC721BarterUtils, ERC1155BarterUtils,
            NativeTokenBarterUtils, TokenBundleBarterUtils,
        },
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

    let provider = ProviderBuilder::new()
        .with_simple_nonce_management()
        .wallet(wallet.clone())
        .connect_ws(ws)
        .await?;

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
    let god_provider = get_wallet_provider(god.clone(), anvil.ws_endpoint_url()).await?;
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

    // Deploy core arbiters
    let trivial_arbiter = TrivialArbiter::deploy(&god_provider).await?;
    let trusted_oracle_arbiter =
        TrustedOracleArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let intrinsics_arbiter = IntrinsicsArbiter::deploy(&god_provider).await?;
    let intrinsics_arbiter_2 = IntrinsicsArbiter2::deploy(&god_provider).await?;
    let any_arbiter = AnyArbiter::deploy(&god_provider).await?;
    let all_arbiter = AllArbiter::deploy(&god_provider).await?;

    // Deploy attestation property arbiters (non-composing only - composing arbiters removed)
    let attester_arbiter = AttesterArbiter::deploy(&god_provider).await?;
    let expiration_time_after_arbiter = ExpirationTimeAfterArbiter::deploy(&god_provider).await?;
    let expiration_time_before_arbiter = ExpirationTimeBeforeArbiter::deploy(&god_provider).await?;
    let expiration_time_equal_arbiter = ExpirationTimeEqualArbiter::deploy(&god_provider).await?;
    let recipient_arbiter = RecipientArbiter::deploy(&god_provider).await?;
    let ref_uid_arbiter = RefUidArbiter::deploy(&god_provider).await?;
    let revocable_arbiter = RevocableArbiter::deploy(&god_provider).await?;
    let schema_arbiter = SchemaArbiter::deploy(&god_provider).await?;
    let time_after_arbiter = TimeAfterArbiter::deploy(&god_provider).await?;
    let time_before_arbiter = TimeBeforeArbiter::deploy(&god_provider).await?;
    let time_equal_arbiter = TimeEqualArbiter::deploy(&god_provider).await?;
    let uid_arbiter = UidArbiter::deploy(&god_provider).await?;

    // Deploy confirmation arbiters (new naming convention)
    let exclusive_revocable_confirmation_arbiter =
        ExclusiveRevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let exclusive_unrevocable_confirmation_arbiter =
        ExclusiveUnrevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let nonexclusive_revocable_confirmation_arbiter =
        NonexclusiveRevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;
    let nonexclusive_unrevocable_confirmation_arbiter =
        NonexclusiveUnrevocableConfirmationArbiter::deploy(&god_provider, eas.address().clone()).await?;

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

    // Deploy obligations
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
    let native_token_escrow_obligation = deploy_obligation!(NativeTokenEscrowObligation);
    let native_token_payment_obligation = deploy_obligation!(NativeTokenPaymentObligation);

    // Note: StringObligation might need different constructor - using Address::ZERO for now
    let string_obligation = StringObligation::deploy(
        &god_provider,
        eas.address().clone(),
        schema_registry.address().clone(),
    )
    .await?;

    // Deploy barter utils
    // Note: AttestationBarterUtils uses AttestationEscrowObligation2 (V2)
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
    let erc20_barter_utils = ERC20BarterUtils::deploy(
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
    let erc721_barter_utils = ERC721BarterUtils::deploy(
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
    let erc1155_barter_utils = ERC1155BarterUtils::deploy(
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
    let native_token_barter_utils = NativeTokenBarterUtils::deploy(
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

    let alice: PrivateKeySigner = anvil.keys()[1].clone().into();
    let bob: PrivateKeySigner = anvil.keys()[2].clone().into();

    let addresses = DefaultExtensionConfig {
        arbiters_addresses: ArbitersAddresses {
            eas: eas.address().clone(),
            trivial_arbiter: trivial_arbiter.address().clone(),
            trusted_oracle_arbiter: trusted_oracle_arbiter.address().clone(),
            intrinsics_arbiter: intrinsics_arbiter.address().clone(),
            intrinsics_arbiter_2: intrinsics_arbiter_2.address().clone(),
            erc8004_arbiter: Address::ZERO, // Not deployed in test environment
            any_arbiter: any_arbiter.address().clone(),
            all_arbiter: all_arbiter.address().clone(),
            // Attestation property arbiters
            attester_arbiter: attester_arbiter.address().clone(),
            expiration_time_after_arbiter: expiration_time_after_arbiter.address().clone(),
            expiration_time_before_arbiter: expiration_time_before_arbiter.address().clone(),
            expiration_time_equal_arbiter: expiration_time_equal_arbiter.address().clone(),
            recipient_arbiter: recipient_arbiter.address().clone(),
            ref_uid_arbiter: ref_uid_arbiter.address().clone(),
            revocable_arbiter: revocable_arbiter.address().clone(),
            schema_arbiter: schema_arbiter.address().clone(),
            time_after_arbiter: time_after_arbiter.address().clone(),
            time_before_arbiter: time_before_arbiter.address().clone(),
            time_equal_arbiter: time_equal_arbiter.address().clone(),
            uid_arbiter: uid_arbiter.address().clone(),
            // Confirmation arbiters
            exclusive_revocable_confirmation_arbiter: exclusive_revocable_confirmation_arbiter.address().clone(),
            exclusive_unrevocable_confirmation_arbiter: exclusive_unrevocable_confirmation_arbiter.address().clone(),
            nonexclusive_revocable_confirmation_arbiter: nonexclusive_revocable_confirmation_arbiter.address().clone(),
            nonexclusive_unrevocable_confirmation_arbiter: nonexclusive_unrevocable_confirmation_arbiter.address().clone(),
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
