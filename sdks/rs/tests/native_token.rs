use alkahest_rs::{
    clients::native_token::NativeTokenModule, contracts::NativeTokenPaymentObligation,
    utils::setup_test_environment,
};
use alloy::{
    primitives::{Bytes, U256},
    sol_types::SolValue,
};
use eyre::Result;

#[tokio::test]
async fn test_decode_escrow_obligation() -> Result<()> {
    // test setup
    let test = setup_test_environment().await?;

    // Create sample obligation data
    let arbiter = test.addresses.erc20_addresses.payment_obligation;
    let demand = Bytes::from(vec![1, 2, 3, 4]); // sample demand data
    let amount: U256 = 100.try_into()?;

    let escrow_data = alkahest_rs::contracts::NativeTokenEscrowObligation::ObligationData {
        arbiter,
        demand: demand.clone(),
        amount,
    };

    // Encode the data
    let encoded = escrow_data.abi_encode();

    // Decode the data
    let decoded = NativeTokenModule::decode_escrow_obligation(&encoded.into())?;

    // Verify decoded data
    assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
    assert_eq!(decoded.demand, demand, "Demand should match");
    assert_eq!(decoded.amount, amount, "Amount should match");

    Ok(())
}

#[tokio::test]
async fn test_decode_payment_obligation() -> Result<()> {
    // test setup
    let test = setup_test_environment().await?;

    // Create sample obligation data
    let amount: U256 = 100.try_into()?;
    let payee = test.alice.address();

    let payment_data = NativeTokenPaymentObligation::ObligationData { amount, payee };

    // Encode the data
    let encoded = payment_data.abi_encode();

    // Decode the data
    let decoded = NativeTokenModule::decode_payment_obligation(&encoded.into())?;

    // Verify decoded data
    assert_eq!(decoded.amount, amount, "Amount should match");
    assert_eq!(decoded.payee, payee, "Payee should match");

    Ok(())
}

// Additional tests would be added here similar to the ERC20 module tests
// but focusing on native token functionality
