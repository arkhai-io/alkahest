import pytest
from alkahest_py import EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_approve_if_less():
    test = EnvTestManager()
    mock_erc20_a = MockERC20(test.mock_addresses.erc20_a, test.god_wallet_provider)
    
    mock_erc20_a.transfer(test.alice, 1000)
    alice_balance = mock_erc20_a.balance_of(test.alice)
    
    token = {"address": test.mock_addresses.erc20_a, "value": 100}
    
    # First approval should return receipt
    receipt_opt = await test.alice_client.erc20.approve_if_less(token, "payment")
    assert receipt_opt is not None, "First approval should return receipt"
    
    payment_allowance = mock_erc20_a.allowance(
        test.alice,
        test.addresses.erc20_addresses.payment_obligation
    )
    
    # Second approval with same amount should return None (no need to approve again)
    receipt_opt = await test.alice_client.erc20.approve_if_less(token, "payment")
    assert receipt_opt is None, f"Second approval should return None, got: {receipt_opt}"
    
    # Third approval with larger amount should return receipt
    larger_token = {"address": test.mock_addresses.erc20_a, "value": 150}
    receipt_opt = await test.alice_client.erc20.approve_if_less(larger_token, "payment")
    assert receipt_opt is not None, "Third approval should return receipt for larger amount"
    
    new_payment_allowance = mock_erc20_a.allowance(
        test.alice,
        test.addresses.erc20_addresses.payment_obligation
    )
    assert new_payment_allowance >= 150, f"New allowance {new_payment_allowance} is insufficient for 150"
