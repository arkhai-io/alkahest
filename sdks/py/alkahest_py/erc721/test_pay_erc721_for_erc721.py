import pytest
from alkahest_py import EnvTestManager, MockERC721

@pytest.mark.asyncio
async def test_pay_erc721_for_erc721(env, alice_client, bob_client):
    """
    Test paying ERC721 for ERC721 tokens.
    This corresponds to test_pay_erc721_for_erc721() in main.rs
    
    Flow: Alice creates ERC721 escrow, Bob fulfills with his ERC721
    """
    
    # Setup mock ERC721 tokens
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    mock_erc721_b = MockERC721(env.mock_addresses.erc721_b, env.god_wallet_provider)
    
    # Mint ERC721 tokens to Alice and Bob
    token_id_a = mock_erc721_a.mint(env.alice)
    token_id_b = mock_erc721_b.mint(env.bob)
    print(f"Minted ERC721 token {token_id_a} to Alice")
    print(f"Minted ERC721 token {token_id_b} to Bob")
    
    # Verify ownership
    alice_token_owner = mock_erc721_a.owner_of(token_id_a)
    bob_token_owner = mock_erc721_b.owner_of(token_id_b)
    assert alice_token_owner.lower() == env.alice.lower(), "Alice token ownership verification failed. Expected {env.alice}, got {alice_token_owner}"
    assert bob_token_owner.lower() == env.bob.lower(), "Bob token ownership verification failed. Expected {env.bob}, got {bob_token_owner}"
    
    # Create bid and ask data
    bid_data = {
        "address": env.mock_addresses.erc721_a,
        "id": token_id_a
    }
    ask_data = {
        "address": env.mock_addresses.erc721_b,
        "id": token_id_b
    }
    
    # Alice approves token for escrow and creates buy attestation
    await alice_client.erc721.util.approve(bid_data, "barter")
    
    buy_result = await alice_client.erc721.barter.buy_erc721_for_erc721(bid_data, ask_data, 0)
    
    assert buy_result['log']['uid'] and buy_result['log']['uid'] != "0x0000000000000000000000000000000000000000000000000000000000000000", "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Bob approves token for payment
    await bob_client.erc721.util.approve(ask_data, "barter")

    # Bob fulfills the buy attestation
    pay_result = await bob_client.erc721.barter.pay_erc721_for_erc721(buy_attestation_uid)

    assert pay_result['log']['uid'] and pay_result['log']['uid'] != "0x0000000000000000000000000000000000000000000000000000000000000000", "Invalid payment attestation UID"
    
    # Verify token transfers
    alice_final_owner = mock_erc721_b.owner_of(token_id_b)
    bob_final_owner = mock_erc721_a.owner_of(token_id_a)
    
    print(f"Alice now owns ERC721 B token {token_id_b}: {alice_final_owner}")
    print(f"Bob now owns ERC721 A token {token_id_a}: {bob_final_owner}")
    
    # Both sides should have received the tokens
    assert alice_final_owner.lower() == env.alice.lower(), "Alice should have received ERC721 B token {token_id_b}, but it's owned by {alice_final_owner}"
    assert bob_final_owner.lower() == env.bob.lower(), "Bob should have received ERC721 A token {token_id_a}, but it's owned by {bob_final_owner}"
