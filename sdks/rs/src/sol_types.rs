use alloy::{
    primitives::{Address, U256},
    sol,
};

use crate::{
    contracts::{
        self, AttestationBarterUtils, AttestationEscrowObligation, IEAS, IntrinsicsArbiter,
        IntrinsicsArbiter2, RecipientArbiter, SpecificAttestationArbiter, TrivialArbiter,
        TrustedOracleArbiter, TrustedPartyArbiter,
        attestation_properties::composing::UidArbiterComposing, logical::*,
    },
    types::{ArbiterData, TokenBundleData},
};

sol! (
    event EscrowClaimed(
        bytes32 indexed payment,
        bytes32 indexed fulfillment,
        address indexed fulfiller
    );
);

impl TokenBundleData {
    // Helper function to convert to the common token bundle format
    fn into_bundle_components(
        self,
    ) -> (
        Vec<Address>, // erc20Tokens
        Vec<U256>,    // erc20Amounts
        Vec<Address>, // erc721Tokens
        Vec<U256>,    // erc721TokenIds
        Vec<Address>, // erc1155Tokens
        Vec<U256>,    // erc1155TokenIds
        Vec<U256>,    // erc1155Amounts
    ) {
        (
            self.erc20s.iter().map(|erc20| erc20.address).collect(),
            self.erc20s.iter().map(|erc20| erc20.value).collect(),
            self.erc721s.iter().map(|erc721| erc721.address).collect(),
            self.erc721s.iter().map(|erc721| erc721.id).collect(),
            self.erc1155s
                .iter()
                .map(|erc1155| erc1155.address)
                .collect(),
            self.erc1155s.iter().map(|erc1155| erc1155.id).collect(),
            self.erc1155s.iter().map(|erc1155| erc1155.value).collect(),
        )
    }
}

macro_rules! impl_payment_obligation {
    ($target:path) => {
        impl From<(TokenBundleData, Address)> for $target {
            fn from((bundle, payee): (TokenBundleData, Address)) -> Self {
                let components = bundle.into_bundle_components();
                Self {
                    erc20Tokens: components.0,
                    erc20Amounts: components.1,
                    erc721Tokens: components.2,
                    erc721TokenIds: components.3,
                    erc1155Tokens: components.4,
                    erc1155TokenIds: components.5,
                    erc1155Amounts: components.6,
                    payee,
                }
            }
        }
        impl From<(&TokenBundleData, Address)> for $target {
            fn from((bundle, payee): (&TokenBundleData, Address)) -> Self {
                (bundle.clone(), payee).into()
            }
        }
    };
}

macro_rules! impl_escrow_obligation {
    ($target:path) => {
        impl From<(TokenBundleData, ArbiterData)> for $target {
            fn from((bundle, arbiter_data): (TokenBundleData, ArbiterData)) -> Self {
                let components = bundle.into_bundle_components();

                Self {
                    erc20Tokens: components.0,
                    erc20Amounts: components.1,
                    erc721Tokens: components.2,
                    erc721TokenIds: components.3,
                    erc1155Tokens: components.4,
                    erc1155TokenIds: components.5,
                    erc1155Amounts: components.6,
                    arbiter: arbiter_data.arbiter,
                    demand: arbiter_data.demand,
                }
            }
        }
        impl From<(&TokenBundleData, &ArbiterData)> for $target {
            fn from((bundle, arbiter_data): (&TokenBundleData, &ArbiterData)) -> Self {
                (bundle.clone(), arbiter_data.clone()).into()
            }
        }
    };
}

impl_payment_obligation!(contracts::token_bundle::TokenBundlePaymentObligation::ObligationData);
impl_payment_obligation!(
    contracts::erc20_barter_cross_token::TokenBundlePaymentObligation::ObligationData
);
impl_payment_obligation!(
    contracts::erc721_barter_cross_token::TokenBundlePaymentObligation::ObligationData
);
impl_payment_obligation!(
    contracts::erc1155_barter_cross_token::TokenBundlePaymentObligation::ObligationData
);
impl_payment_obligation!(contracts::TokenBundlePaymentObligation::ObligationData);

impl_escrow_obligation!(contracts::token_bundle::TokenBundleEscrowObligation::ObligationData);
impl_escrow_obligation!(contracts::TokenBundleEscrowObligation::ObligationData);

// Custom implementation for NativeTokenPaymentObligation (simple amount + payee)
impl From<(&TokenBundleData, Address)> for contracts::NativeTokenPaymentObligation::ObligationData {
    fn from((_bundle, payee): (&TokenBundleData, Address)) -> Self {
        // For native token payments, we only need the total ETH amount and payee
        // This would be used when someone wants to pay for tokens with ETH
        Self {
            amount: U256::ZERO, // This should be set by the caller with the actual ETH amount
            payee,
        }
    }
}

// Implementation for TokenBundlePaymentObligation2 for native token trades
impl From<(&TokenBundleData, Address)>
    for contracts::TokenBundlePaymentObligation2::ObligationData
{
    fn from((bundle, payee): (&TokenBundleData, Address)) -> Self {
        let components = bundle.clone().into_bundle_components();
        Self {
            nativeAmount: U256::ZERO, // Will be set by caller
            erc20Tokens: components.0,
            erc20Amounts: components.1,
            erc721Tokens: components.2,
            erc721TokenIds: components.3,
            erc1155Tokens: components.4,
            erc1155TokenIds: components.5,
            erc1155Amounts: components.6,
            payee,
        }
    }
}

macro_rules! impl_attestation_request {
    ($target:ident) => {
        impl From<IEAS::AttestationRequestData> for $target::AttestationRequestData {
            fn from(data: IEAS::AttestationRequestData) -> Self {
                Self {
                    recipient: data.recipient,
                    expirationTime: data.expirationTime,
                    revocable: data.revocable,
                    refUID: data.refUID,
                    data: data.data,
                    value: data.value,
                }
            }
        }

        impl From<IEAS::AttestationRequest> for $target::AttestationRequest {
            fn from(request: IEAS::AttestationRequest) -> Self {
                Self {
                    schema: request.schema,
                    data: request.data.into(),
                }
            }
        }
    };
}

impl_attestation_request!(AttestationEscrowObligation);
impl_attestation_request!(AttestationBarterUtils);

macro_rules! impl_from_attestation {
    ($target:ident) => {
        impl From<IEAS::Attestation> for $target::Attestation {
            fn from(attestation: IEAS::Attestation) -> Self {
                Self {
                    uid: attestation.uid,
                    schema: attestation.schema,
                    time: attestation.time,
                    expirationTime: attestation.expirationTime,
                    revocationTime: attestation.revocationTime,
                    refUID: attestation.refUID,
                    recipient: attestation.recipient,
                    attester: attestation.attester,
                    revocable: attestation.revocable,
                    data: attestation.data,
                }
            }
        }
    };
}

impl_from_attestation!(SpecificAttestationArbiter);
impl_from_attestation!(TrivialArbiter);
impl_from_attestation!(TrustedPartyArbiter);
impl_from_attestation!(TrustedOracleArbiter);
impl_from_attestation!(IntrinsicsArbiter);
impl_from_attestation!(IntrinsicsArbiter2);
impl_from_attestation!(AnyArbiter);
impl_from_attestation!(AllArbiter);
impl_from_attestation!(UidArbiterComposing);
impl_from_attestation!(RecipientArbiter);
