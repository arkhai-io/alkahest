import pytest
import time
from alkahest_py import EnvTestManager, MockERC20

@pytest.mark.asyncio
async def test_permit_and_buy_with_erc20(env, alice_client):
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    
    god_initial = mock_erc20.balance_of(env.god)
    alice_initial = mock_erc20.balance_of(env.alice)
    
    transfer_amount = 100
    mock_erc20.transfer(env.alice, transfer_amount)
    
    alice_after_transfer = mock_erc20.balance_of(env.alice)
    expected_alice_balance = alice_initial + transfer_amount
    
    assert alice_after_transfer == expected_alice_balance, f"Transfer failed. Expected {expected_alice_balance}, got {alice_after_transfer}"
    
    price_data = {"address": env.mock_addresses.erc20_a, "value": 50}
    arbiter_data = {
    "arbiter": env.addresses.erc20_addresses.payment_obligation,
    "demand": b"test"
    }
    expiration = int(time.time()) + 3600
    
    result = await alice_client.erc20.escrow.non_tierable.permit_and_create(
    price_data, arbiter_data, expiration
    )
    
    alice_final = mock_erc20.balance_of(env.alice)
