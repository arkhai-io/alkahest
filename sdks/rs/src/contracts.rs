use alloy::sol;

// Core
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IEAS,
    "src/contracts/IEAS.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ISchemaRegistry,
    "src/contracts/ISchemaRegistry.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IERC20,
    "src/contracts/IERC20.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IERC721,
    "src/contracts/IERC721.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IERC1155,
    "src/contracts/IERC1155.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC20Permit,
    "src/contracts/ERC20Permit.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC20BarterUtils,
    "src/contracts/ERC20BarterUtils.json"
);

pub mod erc20_barter_cross_token {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC20BarterCrossToken,
        "src/contracts/ERC20BarterCrossToken.json"
    );
}

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC20EscrowObligation,
    "src/contracts/ERC20EscrowObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC20PaymentObligation,
    "src/contracts/ERC20PaymentObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC721BarterUtils,
    "src/contracts/ERC721BarterUtils.json"
);

pub mod erc721_barter_cross_token {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC721BarterCrossToken,
        "src/contracts/ERC721BarterCrossToken.json"
    );
}

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC721EscrowObligation,
    "src/contracts/ERC721EscrowObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC721PaymentObligation,
    "src/contracts/ERC721PaymentObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC1155BarterUtils,
    "src/contracts/ERC1155BarterUtils.json"
);

pub mod erc1155_barter_cross_token {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC1155BarterCrossToken,
        "src/contracts/ERC1155BarterCrossToken.json"
    );
}

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC1155EscrowObligation,
    "src/contracts/ERC1155EscrowObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    ERC1155PaymentObligation,
    "src/contracts/ERC1155PaymentObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    TokenBundleBarterUtils,
    "src/contracts/TokenBundleBarterUtils.json"
);

pub mod token_bundle {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        TokenBundleEscrowObligation,
        "src/contracts/TokenBundleEscrowObligation.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        TokenBundlePaymentObligation,
        "src/contracts/TokenBundlePaymentObligation.json"
    );
}

// Native Token Contracts
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    NativeTokenBarterUtils,
    "src/contracts/NativeTokenBarterUtils.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    NativeTokenEscrowObligation,
    "src/contracts/NativeTokenEscrowObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    NativeTokenPaymentObligation,
    "src/contracts/NativeTokenPaymentObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    AttestationBarterUtils,
    "src/contracts/AttestationBarterUtils.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    AttestationEscrowObligation,
    "src/contracts/AttestationEscrowObligation.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    AttestationEscrowObligation2,
    "src/contracts/AttestationEscrowObligation2.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    StringObligation,
    "src/contracts/StringObligation.json"
);

// Arbiters
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    TrivialArbiter,
    "src/contracts/arbiters/TrivialArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    TrustedPartyArbiter,
    "src/contracts/arbiters/TrustedPartyArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    RecipientArbiter,
    "src/contracts/arbiters/RecipientArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    SpecificAttestationArbiter,
    "src/contracts/arbiters/SpecificAttestationArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    TrustedOracleArbiter,
    "src/contracts/arbiters/TrustedOracleArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IntrinsicsArbiter,
    "src/contracts/arbiters/IntrinsicsArbiter.json"
);

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    IntrinsicsArbiter2,
    "src/contracts/arbiters/IntrinsicsArbiter2.json"
);

pub mod confirmation_arbiters {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ConfirmationArbiter,
        "src/contracts/arbiters/ConfirmationArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ConfirmationArbiterComposing,
        "src/contracts/arbiters/ConfirmationArbiterComposing.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        RevocableConfirmationArbiter,
        "src/contracts/arbiters/RevocableConfirmationArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        RevocableConfirmationArbiterComposing,
        "src/contracts/arbiters/RevocableConfirmationArbiterComposing.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        UnrevocableConfirmationArbiter,
        "src/contracts/arbiters/UnrevocableConfirmationArbiter.json"
    );
    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        UnrevocableConfirmationArbiterComposing,
        "src/contracts/arbiters/UnrevocableConfirmationArbiterComposing.json"
    );
}

pub mod payment_fulfillment_arbiters {
    use alloy::sol;

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC1155PaymentFulfillmentArbiter,
        "src/contracts/arbiters/ERC1155PaymentFulfillmentArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC20PaymentFulfillmentArbiter,
        "src/contracts/arbiters/ERC20PaymentFulfillmentArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC721PaymentFulfillmentArbiter,
        "src/contracts/arbiters/ERC721PaymentFulfillmentArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        TokenBundlePaymentFulfillmentArbiter,
        "src/contracts/TokenBundlePaymentFulfillmentArbiter.json"
    );
}
pub mod attestation_properties {
    pub mod composing {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AttesterArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/AttesterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeAfterArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/ExpirationTimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeBeforeArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/ExpirationTimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeEqualArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/ExpirationTimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RecipientArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/RecipientArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RefUidArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/RefUidArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RevocableArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/RevocableArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            SchemaArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/SchemaArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeAfterArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/TimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeBeforeArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/TimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeEqualArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/TimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            UidArbiterComposing,
            "src/contracts/arbiters/attestation-properties/composing/UidArbiter.json"
        );
    }

    pub mod non_composing {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AttesterArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/AttesterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeAfterArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/ExpirationTimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeBeforeArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/ExpirationTimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeEqualArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/ExpirationTimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RecipientArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/RecipientArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RefUidArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/RefUidArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RevocableArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/RevocableArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            SchemaArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/SchemaArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeAfterArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/TimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeBeforeArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/TimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeEqualArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/TimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            UidArbiterNonComposing,
            "src/contracts/arbiters/attestation-properties/non-composing/UidArbiter.json"
        );
    }
}

pub mod logical {
    use alloy::sol;
    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        AnyArbiter,
        "src/contracts/arbiters/AnyArbiter.json"
    );
    // Simple arbiters without naming conflicts
    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        NotArbiter,
        "src/contracts/arbiters/NotArbiter.json"
    );

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        AllArbiter,
        "src/contracts/arbiters/AllArbiter.json"
    );
}

// Additional contracts
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    #[derive(Debug)]
    JobResultObligation,
    "src/contracts/JobResultObligation.json"
);
