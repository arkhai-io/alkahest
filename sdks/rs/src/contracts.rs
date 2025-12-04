use alloy::sol;

// Core interfaces
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

// Arbiters module - mirrors contracts/src/arbiters/
pub mod arbiters {
    use alloy::sol;

    // Root-level arbiters
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

    sol!(
        #[allow(missing_docs)]
        #[sol(rpc)]
        #[derive(Debug)]
        ERC8004Arbiter,
        "src/contracts/arbiters/ERC8004Arbiter.json"
    );

    // attestation-properties submodule
    pub mod attestation_properties {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AttesterArbiter,
            "src/contracts/arbiters/attestation-properties/AttesterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeAfterArbiter,
            "src/contracts/arbiters/attestation-properties/ExpirationTimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeBeforeArbiter,
            "src/contracts/arbiters/attestation-properties/ExpirationTimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExpirationTimeEqualArbiter,
            "src/contracts/arbiters/attestation-properties/ExpirationTimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RecipientArbiter,
            "src/contracts/arbiters/attestation-properties/RecipientArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RefUidArbiter,
            "src/contracts/arbiters/attestation-properties/RefUidArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            RevocableArbiter,
            "src/contracts/arbiters/attestation-properties/RevocableArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            SchemaArbiter,
            "src/contracts/arbiters/attestation-properties/SchemaArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeAfterArbiter,
            "src/contracts/arbiters/attestation-properties/TimeAfterArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeBeforeArbiter,
            "src/contracts/arbiters/attestation-properties/TimeBeforeArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TimeEqualArbiter,
            "src/contracts/arbiters/attestation-properties/TimeEqualArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            UidArbiter,
            "src/contracts/arbiters/attestation-properties/UidArbiter.json"
        );
    }

    // confirmation submodule
    pub mod confirmation {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExclusiveRevocableConfirmationArbiter,
            "src/contracts/arbiters/confirmation/ExclusiveRevocableConfirmationArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ExclusiveUnrevocableConfirmationArbiter,
            "src/contracts/arbiters/confirmation/ExclusiveUnrevocableConfirmationArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            NonexclusiveRevocableConfirmationArbiter,
            "src/contracts/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            NonexclusiveUnrevocableConfirmationArbiter,
            "src/contracts/arbiters/confirmation/NonexclusiveUnrevocableConfirmationArbiter.json"
        );
    }

    // logical submodule
    pub mod logical {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AllArbiter,
            "src/contracts/arbiters/logical/AllArbiter.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AnyArbiter,
            "src/contracts/arbiters/logical/AnyArbiter.json"
        );
    }
}

// Obligations module - mirrors contracts/src/obligations/
pub mod obligations {
    // Payment obligations submodule
    pub mod payment {
        use alloy::sol;

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC20PaymentObligation,
            "src/contracts/obligations/payment/ERC20PaymentObligation.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC721PaymentObligation,
            "src/contracts/obligations/payment/ERC721PaymentObligation.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC1155PaymentObligation,
            "src/contracts/obligations/payment/ERC1155PaymentObligation.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TokenBundlePaymentObligation,
            "src/contracts/obligations/payment/TokenBundlePaymentObligation.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            NativeTokenPaymentObligation,
            "src/contracts/obligations/payment/NativeTokenPaymentObligation.json"
        );

        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            StringObligation,
            "src/contracts/obligations/payment/StringObligation.json"
        );
    }

    // Re-export payment obligations for convenience
    pub use payment::ERC20PaymentObligation;
    pub use payment::ERC721PaymentObligation;
    pub use payment::ERC1155PaymentObligation;
    pub use payment::TokenBundlePaymentObligation;
    pub use payment::NativeTokenPaymentObligation;
    pub use payment::StringObligation;

    // Escrow obligations submodule
    pub mod escrow {
        pub mod non_tierable {
            use alloy::sol;

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC20EscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/ERC20EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC721EscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/ERC721EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC1155EscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/ERC1155EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                TokenBundleEscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/TokenBundleEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                NativeTokenEscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/NativeTokenEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                AttestationEscrowObligation,
                "src/contracts/obligations/escrow/non-tierable/AttestationEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                AttestationEscrowObligation2,
                "src/contracts/obligations/escrow/non-tierable/AttestationEscrowObligation2.json"
            );
        }

        pub mod tierable {
            use alloy::sol;

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC20EscrowObligation,
                "src/contracts/obligations/escrow/tierable/ERC20EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC721EscrowObligation,
                "src/contracts/obligations/escrow/tierable/ERC721EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                ERC1155EscrowObligation,
                "src/contracts/obligations/escrow/tierable/ERC1155EscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                TokenBundleEscrowObligation,
                "src/contracts/obligations/escrow/tierable/TokenBundleEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                NativeTokenEscrowObligation,
                "src/contracts/obligations/escrow/tierable/NativeTokenEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                AttestationEscrowObligation,
                "src/contracts/obligations/escrow/tierable/AttestationEscrowObligation.json"
            );

            sol!(
                #[allow(missing_docs)]
                #[sol(rpc)]
                #[derive(Debug)]
                AttestationEscrowObligation2,
                "src/contracts/obligations/escrow/tierable/AttestationEscrowObligation2.json"
            );
        }
    }
}

// Utils module - mirrors contracts/src/utils/
// Each barter utils is in its own submodule to avoid naming conflicts
// from internal types like ObligationData that share names across contracts
pub mod utils {
    pub mod erc20 {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC20BarterUtils,
            "src/contracts/utils/ERC20BarterUtils.json"
        );
    }

    pub mod erc721 {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC721BarterUtils,
            "src/contracts/utils/ERC721BarterUtils.json"
        );
    }

    pub mod erc1155 {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            ERC1155BarterUtils,
            "src/contracts/utils/ERC1155BarterUtils.json"
        );
    }

    pub mod token_bundle {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            TokenBundleBarterUtils,
            "src/contracts/utils/TokenBundleBarterUtils.json"
        );
    }

    pub mod native_token {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            NativeTokenBarterUtils,
            "src/contracts/utils/NativeTokenBarterUtils.json"
        );
    }

    pub mod attestation {
        use alloy::sol;
        sol!(
            #[allow(missing_docs)]
            #[sol(rpc)]
            #[derive(Debug)]
            AttestationBarterUtils,
            "src/contracts/utils/AttestationBarterUtils.json"
        );
    }

    // Re-export the main contract types for convenience
    pub use erc20::ERC20BarterUtils;
    pub use erc721::ERC721BarterUtils;
    pub use erc1155::ERC1155BarterUtils;
    pub use token_bundle::TokenBundleBarterUtils;
    pub use native_token::NativeTokenBarterUtils;
    pub use attestation::AttestationBarterUtils;
}
