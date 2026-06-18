use alkahest_rs::{
    contracts::obligations::{
        NativeTokenPaymentObligation,
        escrow::non_tierable::NativeTokenEscrowObligation,
    },
};
use alloy::{
    primitives::{address, Bytes, U256},
    sol_types::SolValue,
};
use eyre::Result;

#[tokio::test]
async fn test_decode_escrow_obligation() -> Result<()> {
    // Create sample obligation data
    let arbiter = address!("0x1234567890123456789012345678901234567890");
    let demand = Bytes::from(vec![1, 2, 3, 4]); // sample demand data
    let amount: U256 = 100.try_into()?;

    let escrow_data = NativeTokenEscrowObligation::ObligationData {
        arbiter,
        demand: demand.clone(),
        amount,
    };

    // Encode the data
    let encoded = escrow_data.abi_encode();

    // Decode the data
    let decoded = NativeTokenEscrowObligation::ObligationData::abi_decode(&encoded)?;

    // Verify decoded data
    assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
    assert_eq!(decoded.demand, demand, "Demand should match");
    assert_eq!(decoded.amount, amount, "Amount should match");

    Ok(())
}

#[tokio::test]
async fn test_decode_payment_obligation() -> Result<()> {
    // Create sample obligation data
    let amount: U256 = 100.try_into()?;
    let payee = address!("0x2345678901234567890123456789012345678901");

    let payment_data = NativeTokenPaymentObligation::ObligationData { amount, payee };

    // Encode the data
    let encoded = payment_data.abi_encode();

    // Decode the data
    let decoded = NativeTokenPaymentObligation::ObligationData::abi_decode(&encoded)?;

    // Verify decoded data
    assert_eq!(decoded.amount, amount, "Amount should match");
    assert_eq!(decoded.payee, payee, "Payee should match");

    Ok(())
}

// Additional tests would be added here similar to the ERC20 module tests
// but focusing on native token functionality
