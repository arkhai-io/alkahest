import pytest
from alkahest_py import EnvTestManager, MockERC721

@pytest.mark.asyncio
async def test_erc721_approve_all():
    """
    Test ERC721 approve_all functionality for both payment and escrow purposes.
    This corresponds to test_approve_all() in main.rs
    
    Flow: 
    1. Mint ERC721 tokens to Alice (2 tokens)
    2. Test approve_all for payment purpose and verify with isApprovedForAll
    3. Test approve_all for escrow purpose and verify with isApprovedForAll
    """
    env = EnvTestManager()
    
    # Setup mock ERC721 token
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    
    # Mint ERC721 tokens to Alice (mint 2 tokens like in Rust version)
    token_id_1 = mock_erc721_a.mint(env.alice)
    token_id_2 = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 tokens {token_id_1} and {token_id_2} to Alice")
    
    # Verify Alice owns both tokens
    owner_1 = mock_erc721_a.owner_of(token_id_1)
    owner_2 = mock_erc721_a.owner_of(token_id_2)
    assert not (owner_1.lower() != env.alice.lower()), "Token {token_id_1} ownership verification failed. Expected {env.alice}, got {owner_1}"
    assert not (owner_2.lower() != env.alice.lower()), "Token {token_id_2} ownership verification failed. Expected {env.alice}, got {owner_2}"
    
    # Test approve_all for payment
    print("Testing approve_all for payment purpose...")
    await env.alice_client.erc721.approve_all(env.mock_addresses.erc721_a, "payment")
    
    # Verify approval for payment obligation using isApprovedForAll
    payment_approved = mock_erc721_a.is_approved_for_all(
        env.alice, 
        env.addresses.erc721_addresses.payment_obligation
    )
    
    assert not (not payment_approved), "Payment approval for all should be set correctly"
    
    print("✅ Payment approve_all verified successfully")
    
    # Test approve_all for escrow
    print("Testing approve_all for escrow purpose...")
    await env.alice_client.erc721.approve_all(env.mock_addresses.erc721_a, "escrow")
    
    # Verify approval for escrow obligation using isApprovedForAll
    escrow_approved = mock_erc721_a.is_approved_for_all(
        env.alice, 
        env.addresses.erc721_addresses.escrow_obligation
    )
    
    assert not (not escrow_approved), "Escrow approval for all should be set correctly"
    
    print("✅ Escrow approve_all verified successfully")
