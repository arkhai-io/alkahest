import pytest
from alkahest_py import MockERC20


@pytest.mark.asyncio
async def test_approvals(env, alice_client):
    # Test payment approval
    mock_erc20_1 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)

    mock_erc20_1.transfer(env.alice, 100)

    token_data = {"address": env.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await alice_client.erc20.util.approve(token_data, "payment")

    payment_allowance = mock_erc20_1.allowance(env.alice, env.addresses.erc20_addresses.payment_obligation)
    assert payment_allowance == 100, "Payment approval failed"

    # Test escrow approval independently by approving a different spender.
    token_data = {"address": env.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await alice_client.erc20.util.approve(token_data, "escrow")

    escrow_allowance = mock_erc20_1.allowance(env.alice, env.addresses.erc20_addresses.escrow_obligation_default)
    assert escrow_allowance == 100, "Escrow approval failed"
