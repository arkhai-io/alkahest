import pytest
from alkahest_py import EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_approve_if_less(env, alice_client):
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)

    mock_erc20_a.transfer(env.alice, 1000)
    alice_balance = mock_erc20_a.balance_of(env.alice)

    token = {"address": env.mock_addresses.erc20_a, "value": 100}

    # First approval should return receipt
    receipt_opt = await alice_client.erc20.util.approve_if_less(token, "payment")
    assert receipt_opt is not None, "First approval should return receipt"

    payment_allowance = mock_erc20_a.allowance(
        env.alice,
        env.addresses.erc20_addresses.payment_obligation
    )

    # Second approval with same amount should return None (no need to approve again)
    receipt_opt = await alice_client.erc20.util.approve_if_less(token, "payment")
    assert receipt_opt is None, f"Second approval should return None, got: {receipt_opt}"

    # Third approval with larger amount should return receipt
    larger_token = {"address": env.mock_addresses.erc20_a, "value": 150}
    receipt_opt = await alice_client.erc20.util.approve_if_less(larger_token, "payment")
    assert receipt_opt is not None, "Third approval should return receipt for larger amount"

    new_payment_allowance = mock_erc20_a.allowance(
        env.alice,
        env.addresses.erc20_addresses.payment_obligation
    )
    assert new_payment_allowance >= 150, f"New allowance {new_payment_allowance} is insufficient for 150"
