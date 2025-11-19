import pytest
from alkahest_py import EnvTestManager, MockERC1155, MockERC721

@pytest.mark.asyncio
async def test_pay_erc1155_for_erc721():
    """
    Test using ERC1155 to fulfill ERC721 escrow.
    This corresponds to test_pay_erc1155_for_erc721() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice and ERC721 token to Bob
    2. Bob creates escrow offering ERC721 for Alice's ERC1155
    3. Alice fulfills the escrow with her ERC1155 tokens
    4. Verify both parties received their tokens
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155 tokens (ID: 1) to Alice")
    
    # Mint an ERC721 token to Bob
    bob_token_id = mock_erc721_a.mint(env.bob)
    print(f"Minted ERC721 token {bob_token_id} to Bob")
    
    # Create trade data
    bid_data = {  # Bob's bid (what he offers)
        "address": env.mock_addresses.erc721_a,
        "id": bob_token_id
    }
    
    ask_data = {  # Bob asks for Alice's ERC1155
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    # Bob approves tokens for escrow and creates buy attestation
    await env.bob_client.erc721.approve(bid_data, "escrow")

    buy_result = await env.bob_client.erc721.buy_erc1155_with_erc721(bid_data, ask_data, 0)
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her ERC1155 tokens for payment
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "payment")
    
    # Check initial ERC1155 balance for Bob
    initial_bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Alice fulfills Bob's buy attestation with her ERC1155
    pay_result = await env.alice_client.erc1155.pay_erc1155_for_erc721(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    alice_now_owns_erc721 = mock_erc721_a.owner_of(bob_token_id)
    final_bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Both sides should have received the tokens
    bob_received_erc1155 = final_bob_erc1155_balance - initial_bob_erc1155_balance
    
    assert not (alice_now_owns_erc721.lower() != env.alice.lower()), "Alice should have received the ERC721 token, but it's owned by {alice_now_owns_erc721}"
    
    assert not (bob_received_erc1155 != 5), "Bob should have received 5 ERC1155 tokens, got {bob_received_erc1155}"
    
    print("✅ ERC1155 for ERC721 exchange successful")
    print(f"Alice received ERC721 token {bob_token_id}")
    print(f"Bob received {bob_received_erc1155} ERC1155 tokens")
