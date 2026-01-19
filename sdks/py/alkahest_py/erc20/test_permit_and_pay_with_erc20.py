import pytest
from alkahest_py import EnvTestManager, MockERC20

@pytest.mark.asyncio
async def test_permit_and_pay_with_erc20(env, alice_client):
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    
    alice_initial = mock_erc20.balance_of(env.alice)
    bob_initial = mock_erc20.balance_of(env.bob)
    
    transfer_amount = 100
    mock_erc20.transfer(env.alice, transfer_amount)
    
    alice_after_transfer = mock_erc20.balance_of(env.alice)
    assert alice_after_transfer == transfer_amount, "Transfer failed. Expected {transfer_amount}, got {alice_after_transfer}"
    
    payment_amount = 100
    price_data = {"address": env.mock_addresses.erc20_a, "value": payment_amount}
    
    payment_result = await alice_client.erc20.payment.permit_and_pay(price_data, env.bob)
    
    alice_final = mock_erc20.balance_of(env.alice)
    bob_final = mock_erc20.balance_of(env.bob)
    
    expected_alice_balance = alice_after_transfer - payment_amount
    assert alice_final == expected_alice_balance, "Alice balance incorrect. Expected {expected_alice_balance}, got {alice_final}"
    
    expected_bob_balance = bob_initial + payment_amount
    assert bob_final == expected_bob_balance, "Bob balance incorrect. Expected {expected_bob_balance}, got {bob_final}"
    
    assert payment_result['log']['uid'] and payment_result['log']['uid'] != "0x0000000000000000000000000000000000000000000000000000000000000000", "Invalid attestation UID"
