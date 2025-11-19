import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_pay_with_erc1155():
    """
    Test ERC1155 pay_with_erc1155 functionality for direct payments.
    This corresponds to test_pay_with_erc1155() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. Alice approves tokens for payment
    3. Alice makes direct payment to Bob using pay_with_erc1155
    4. Verify tokens transferred to Bob and payment attestation created
    """
    env = EnvTestManager()
    
    # Setup mock ERC1155 token
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155 tokens (ID: 1) to Alice")
    
    # Verify Alice owns the tokens
    alice_balance = mock_erc1155_a.balance_of(env.alice, 1)
    assert not (alice_balance != 10), "Token ownership verification failed. Expected 10, got {alice_balance}"
    
    # Create ERC1155 price data
    price_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    # Alice approves tokens for payment
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "payment")
    
    # Check initial Bob balance
    initial_bob_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Alice makes direct payment to Bob
    pay_result = await env.alice_client.erc1155.pay_with_erc_1155(price_data, env.bob)

    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify payment happened
    final_bob_balance = mock_erc1155_a.balance_of(env.bob, 1)
    final_alice_balance = mock_erc1155_a.balance_of(env.alice, 1)
    
    # Bob should have received 5 tokens
    assert not (final_bob_balance - initial_bob_balance != 5), "Bob should have received 5 tokens, got {final_bob_balance - initial_bob_balance}"
    
    # Alice should have 5 tokens remaining
    assert not (final_alice_balance != 5), "Alice should have 5 tokens remaining, got {final_alice_balance}"
    
    print("✅ Payment successful")
    print(f"Bob received: {final_bob_balance - initial_bob_balance} tokens")
    print(f"Alice remaining: {final_alice_balance} tokens")
