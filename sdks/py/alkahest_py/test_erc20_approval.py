import pytest
from alkahest_py import EnvTestManager, MockERC20

@pytest.mark.asyncio
async def test_erc20_approvals():
    # Test payment approval
    env1 = EnvTestManager()
    mock_erc20_1 = MockERC20(env1.mock_addresses.erc20_a, env1.god_wallet_provider)
    
    mock_erc20_1.transfer(env1.alice, 100)
    
    token_data = {"address": env1.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await env1.alice_client.erc20.approve(token_data, "payment")
    
    payment_allowance = mock_erc20_1.allowance(env1.alice, env1.addresses.erc20_addresses.payment_obligation)
    assert payment_allowance == 100, "Payment approval failed"

    # Test escrow approval
    env2 = EnvTestManager()
    mock_erc20_2 = MockERC20(env2.mock_addresses.erc20_a, env2.god_wallet_provider)
    
    mock_erc20_2.transfer(env2.alice, 100)
    
    token_data = {"address": env2.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await env2.alice_client.erc20.approve(token_data, "escrow")

    escrow_allowance = mock_erc20_2.allowance(env2.alice, env2.addresses.erc20_addresses.escrow_obligation)
    assert escrow_allowance == 100, "Escrow approval failed"
