import pytest
from alkahest_py import EnvTestManager, MockERC721

@pytest.mark.asyncio
async def test_pay_with_erc721():
    """
    Test paying with ERC721 tokens.
    This corresponds to test_pay_with_erc721() in main.rs
    
    Flow: Alice pays ERC721 token directly to Bob
    """
    env = EnvTestManager()
    
    # Setup mock ERC721 token
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    
    # Mint an ERC721 token to Alice
    token_id = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 token {token_id} to Alice")
    
    # Verify Alice owns the token
    token_owner = mock_erc721_a.owner_of(token_id)
    assert not (token_owner.lower() != env.alice.lower()), "Token ownership verification failed. Expected {env.alice}, got {token_owner}"
    
    # Create price data
    price_data = {
        "address": env.mock_addresses.erc721_a,
        "id": token_id
    }
    
    # Alice approves token for payment
    await env.alice_client.erc721.approve(price_data, "payment")
    
    # Alice makes direct payment to Bob
    payment_result = await env.alice_client.erc721.pay_with_erc721(price_data, env.bob)

    assert not (not payment_result['log']['uid'] or payment_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify payment happened - Bob should now own the token
    final_owner = mock_erc721_a.owner_of(token_id)
    print(f"ERC721 token {token_id} finally owned by: {final_owner}")
    assert not (final_owner.lower() != env.bob.lower()), "Bob should own the ERC721 token, but it's owned by {final_owner}"
