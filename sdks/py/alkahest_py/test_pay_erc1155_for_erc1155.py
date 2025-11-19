import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_pay_erc1155_for_erc1155():
    """
    Test ERC1155 to ERC1155 exchange fulfillment.
    This corresponds to test_pay_erc1155_for_erc1155() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice and Bob
    2. Alice creates escrow offering ERC1155A for ERC1155B 
    3. Bob fulfills the escrow with his ERC1155B tokens
    4. Verify both parties received their tokens
    """
    env = EnvTestManager()
    
    # Setup mock ERC1155 tokens
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    mock_erc1155_b = MockERC1155(env.mock_addresses.erc1155_b, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice and Bob
    mock_erc1155_a.mint(env.alice, 1, 10)
    mock_erc1155_b.mint(env.bob, 2, 10)
    print(f"Minted 10 ERC1155A tokens (ID: 1) to Alice")
    print(f"Minted 10 ERC1155B tokens (ID: 2) to Bob")
    
    # Create bid and ask data
    bid_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    ask_data = {
        "address": env.mock_addresses.erc1155_b,
        "id": 2,
        "value": 3
    }
    
    # Alice approves tokens for escrow and creates buy attestation
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")

    buy_result = await env.alice_client.erc1155.buy_erc1155_for_erc1155(bid_data, ask_data, 0)
    buy_attestation_uid = buy_result['log']['uid']
    
    # Bob approves tokens for payment
    await env.bob_client.erc1155.approve_all(env.mock_addresses.erc1155_b, "payment")

    # Check initial balances
    initial_alice_balance_b = mock_erc1155_b.balance_of(env.alice, 2)
    initial_bob_balance_a = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Bob fulfills the buy attestation
    pay_result = await env.bob_client.erc1155.pay_erc1155_for_erc1155(buy_attestation_uid)

    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    final_alice_balance_b = mock_erc1155_b.balance_of(env.alice, 2)
    final_bob_balance_a = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Both sides should have received the tokens
    alice_received_b = final_alice_balance_b - initial_alice_balance_b
    bob_received_a = final_bob_balance_a - initial_bob_balance_a
    
    assert not (alice_received_b != 3), "Alice should have received 3 tokens B, got {alice_received_b}"
    
    assert not (bob_received_a != 5), "Bob should have received 5 tokens A, got {bob_received_a}"
    
    print("✅ ERC1155 to ERC1155 exchange successful")
    print(f"Alice received {alice_received_b} ERC1155B tokens")
    print(f"Bob received {bob_received_a} ERC1155A tokens")
