<div align="center">
  <img src="https://github.com/arkhai-io/decentralized-rag-database/blob/main/assets/logo.jpg" alt="Arkhai Logo" width="200"/>

# Alkahest

**Contract library and SDKs for validated peer-to-peer escrow**

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

</div>

Alkahest is a library and ecosystem for peer-to-peer exchange.

Statements represent obligations within a peer-to-peer agreement, while validators represent conditions under which statements are considered valid.

These compose with each other to eventually enable trading anything for anything else, with flexible per-deal assurance guarantees.

Learn more at [Alkahest Docs](https://www.arkhai.io/docs).

## Contract Architecture

### Base Contracts

- [IArbiter](src/IArbiter.sol) - Interface for decision-making logic
- [BaseObligation](src/BaseObligation.sol) - Base contract for all obligation types
- [BaseEscrowObligation](src/BaseEscrowObligation.sol) - Base contract for escrow-based obligations
- [BaseAttester](src/BaseAttester.sol) - Base contract for EAS attestation integration

### Obligations (Statements)

**Escrow Obligations** - Lock assets until conditions are met:
- [ERC20EscrowObligation](src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol)
- [ERC721EscrowObligation](src/obligations/escrow/non-tierable/ERC721EscrowObligation.sol)
- [ERC1155EscrowObligation](src/obligations/escrow/non-tierable/ERC1155EscrowObligation.sol)
- [NativeTokenEscrowObligation](src/obligations/escrow/non-tierable/NativeTokenEscrowObligation.sol)
- [TokenBundleEscrowObligation](src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol)
- [AttestationEscrowObligation](src/obligations/escrow/non-tierable/AttestationEscrowObligation.sol)

**Payment Obligations** - Direct payment on fulfillment:
- [ERC20PaymentObligation](src/obligations/ERC20PaymentObligation.sol)
- [ERC721PaymentObligation](src/obligations/ERC721PaymentObligation.sol)
- [ERC1155PaymentObligation](src/obligations/ERC1155PaymentObligation.sol)
- [NativeTokenPaymentObligation](src/obligations/NativeTokenPaymentObligation.sol)
- [TokenBundlePaymentObligation](src/obligations/TokenBundlePaymentObligation.sol)

**Custom Result Obligations** - Non-token obligations:
- [StringResultObligation](src/obligations/example/StringResultObligation.sol)
- [ApiResultObligation](src/obligations/example/ApiResultObligation.sol)
- [CryptoSignatureObligation](src/arbiters/example/CryptoSignatureObligation.sol)

### Arbiters (Validators)

**Trusted Arbiters**:
- [TrustedOracleArbiter](src/arbiters/TrustedOracleArbiter.sol)
- [ERC8004Arbiter](src/arbiters/ERC8004Arbiter.sol)

**Example Arbiters**:
- [OptimisticStringValidator](src/arbiters/example/OptimisticStringValidator.sol)
- [StringCapitalizer](src/arbiters/example/StringCapitalizer.sol)
- [MajorityVoteArbiter](src/arbiters/example/MajorityVoteArbiter.sol)
- [GameWinner](src/arbiters/example/GameWinner.sol)

**Logical Combinators**:
- [AllArbiter](src/arbiters/logical/AllArbiter.sol) - Requires all conditions
- [AnyArbiter](src/arbiters/logical/AnyArbiter.sol) - Requires any condition

**Attestation Property Arbiters**:
- Located in [src/arbiters/attestation-properties](src/arbiters/attestation-properties/)
- Composing and non-composing variants for validating EAS attestation properties

### Utilities

- [TokenBundleBarterUtils](src/utils/TokenBundleBarterUtils.sol) - Helper for token bundle trades
- [AttestationBarterUtils](src/utils/AttestationBarterUtils.sol) - Helper for attestation-based trades
- [ERC20BarterUtils](src/utils/ERC20BarterUtils.sol) - Helper for ERC20 trades

## Example Workflows

Integration tests demonstrate real-world usage patterns:

- **Token Trading**: [ERC20BarterUtilsCrossToken.t.sol](test/integration/ERC20BarterUtilsCrossToken.t.sol) - Exchange different ERC20 tokens
- **Token Bundles**: [TokenBundleBarterUtils.t.sol](test/integration/TokenBundleBarterUtils.t.sol) - Trade bundles of ERC20/721/1155
- **String Processing**: [StringCapitalizer.t.sol](test/integration/StringCapitalizer.t.sol) - Buy string processing with ERC20
- **Cryptographic Proofs**: [CryptoSignatureObligation.t.sol](test/integration/CryptoSignatureObligation.t.sol) - Validate signatures
- **Majority Voting**: [MajorityVoteArbiter.t.sol](test/integration/MajorityVoteArbiter.t.sol) - Multi-party decision making
- **Attestation Trading**: [AttestationBarterUtils.t.sol](test/integration/AttestationBarterUtils.t.sol) - Trade with EAS attestations

## Running Tests

```bash
# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test file
forge test --match-path test/integration/ERC20BarterUtilsCrossToken.t.sol

# Run with gas reporting
forge test --gas-report
```

## Building

```bash
forge build
```

## Deployment

Deployment scripts are located in [script/](script/). See [script/Deploy.s.sol](script/Deploy.s.sol) for the main deployment script.

### Current Deployments

**⚠️ Alpha Status Disclaimer**: Alkahest is currently in alpha and undergoing security audits. The contracts are subject to change and may be updated in backwards-incompatible ways. Use at your own risk.

Deployed contract addresses and transaction hashes are available for the following networks:

- [Monad Mainnet](deployments/deployments_monad.txt) ([JSON](deployments/deployment_monad.json))
- [Base Sepolia Testnet](deployments/deployments_base_sepolia.txt) ([JSON](deployments/deployment_base_sepolia.json))
- [Filecoin Calibration Testnet](deployments/deployments_filecoin_calibration.txt) ([JSON](deployments/deployment_filecoin_calibration.json))
