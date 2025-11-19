import pytest
from alkahest_py import EnvTestManager, MockERC1155, MockERC20

@pytest.mark.asyncio
async def test_pay_erc1155_for_erc20():
    """
    Test using ERC1155 to fulfill ERC20 escrow.
    This corresponds to test_pay_erc1155_for_erc20() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice and ERC20 tokens to Bob
    2. Bob creates escrow offering ERC20 for Alice's ERC1155
    3. Alice fulfills the escrow with her ERC1155 tokens
    4. Verify both parties received their tokens
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155 tokens (ID: 1) to Alice")
    
    # Give Bob some ERC20 tokens for escrow
    mock_erc20_a.transfer(env.bob, 100)
    bob_erc20_balance = mock_erc20_a.balance_of(env.bob)
    assert not (bob_erc20_balance != 100), "Bob should have 100 ERC20 tokens, got {bob_erc20_balance}"
    
    # Create trade data
    bid_data = {  # Bob's bid (what he offers)
        "address": env.mock_addresses.erc20_a,
        "value": 100
    }
    
    ask_data = {  # Bob asks for Alice's ERC1155
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    # Bob approves tokens for escrow and creates buy attestation
    await env.bob_client.erc20.approve(bid_data, "escrow")

    buy_result = await env.bob_client.erc20.buy_erc1155_for_erc20(bid_data, ask_data, 0)
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her ERC1155 tokens for payment
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "payment")
    
    # Check initial balances
    initial_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    initial_bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Alice fulfills Bob's buy attestation with her ERC1155
    pay_result = await env.alice_client.erc1155.pay_erc1155_for_erc20(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    final_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    final_bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Both sides should have received the tokens
    alice_received_erc20 = final_alice_erc20_balance - initial_alice_erc20_balance
    bob_received_erc1155 = final_bob_erc1155_balance - initial_bob_erc1155_balance
    
    assert not (alice_received_erc20 != 100), "Alice should have received 100 ERC20 tokens, got {alice_received_erc20}"
    
    assert not (bob_received_erc1155 != 5), "Bob should have received 5 ERC1155 tokens, got {bob_received_erc1155}"
    
    print("✅ ERC1155 for ERC20 exchange successful")
    print(f"Alice received {alice_received_erc20} ERC20 tokens")
    print(f"Bob received {bob_received_erc1155} ERC1155 tokens")
