import pytest
from alkahest_py import EnvTestManager, MockERC20

@pytest.mark.asyncio
async def test_pay_erc20_for_erc20():
    env = EnvTestManager()
    
    # Setup mock ERC20 tokens
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20_b = MockERC20(env.mock_addresses.erc20_b, env.god_wallet_provider)
    
    # Give Alice some token A (for bidding)
    alice_initial_a = mock_erc20_a.balance_of(env.alice)
    mock_erc20_a.transfer(env.alice, 100)
    alice_after_transfer_a = mock_erc20_a.balance_of(env.alice)
    
    assert not (alice_after_transfer_a != alice_initial_a + 100), "Alice token A transfer failed. Expected {alice_initial_a + 100}, got {alice_after_transfer_a}"
    
    # Give Bob some token B (for fulfillment)
    bob_initial_b = mock_erc20_b.balance_of(env.bob)
    mock_erc20_b.transfer(env.bob, 200)
    bob_after_transfer_b = mock_erc20_b.balance_of(env.bob)
    
    assert not (bob_after_transfer_b != bob_initial_b + 200), "Bob token B transfer failed. Expected {bob_initial_b + 200}, got {bob_after_transfer_b}"
    
    # Alice creates buy order: wants 200 token B for 100 token A
    bid_data = {"address": env.mock_addresses.erc20_a, "value": 100}  # Alice offers token A
    ask_data = {"address": env.mock_addresses.erc20_b, "value": 200}  # Alice wants token B
    
    # Alice approves tokens for escrow
    await env.alice_client.erc20.approve(bid_data, "escrow")
    
    # Alice creates the buy order
    buy_result = await env.alice_client.erc20.buy_erc20_for_erc20(bid_data, ask_data, 0)

    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Verify Alice's tokens are in escrow
    alice_balance_a_after_escrow = mock_erc20_a.balance_of(env.alice)
    escrow_balance_a = mock_erc20_a.balance_of(env.addresses.erc20_addresses.escrow_obligation)
    
    assert not (alice_balance_a_after_escrow != alice_initial_a), "Alice should have {alice_initial_a} token A after escrow, got {alice_balance_a_after_escrow}"
    
    assert not (escrow_balance_a != 100), "Escrow should have 100 token A, got {escrow_balance_a}"
    
    # Bob approves tokens for payment
    await env.bob_client.erc20.approve(ask_data, "payment")

    # Bob fulfills the buy order
    pay_result = await env.bob_client.erc20.pay_erc20_for_erc20(buy_attestation_uid)

    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify final token balances
    alice_final_a = mock_erc20_a.balance_of(env.alice)
    alice_final_b = mock_erc20_b.balance_of(env.alice)
    bob_final_a = mock_erc20_a.balance_of(env.bob)
    bob_final_b = mock_erc20_b.balance_of(env.bob)
    
    # Alice should have no token A (transferred to Bob) and 200 token B (received from Bob)
    assert not (alice_final_a != alice_initial_a), "Alice final token A balance incorrect. Expected {alice_initial_a}, got {alice_final_a}"
    
    assert not (alice_final_b != 200), "Alice should have received 200 token B, got {alice_final_b}"
    
    # Bob should have 100 token A (received from Alice) and original token B minus 200
    assert not (bob_final_a != 100), "Bob should have received 100 token A, got {bob_final_a}"
    
    assert not (bob_final_b != bob_initial_b), "Bob final token B balance incorrect. Expected {bob_initial_b}, got {bob_final_b}"
