import pytest
from alkahest_py import EnvTestManager, MockERC721

@pytest.mark.asyncio
async def test_buy_erc721_for_erc721():
    """
    Test buying ERC721 for ERC721 tokens.
    This corresponds to test_buy_erc721_for_erc721() in main.rs
    
    Flow: Alice escrows ERC721 A to buy ERC721 B
    """
    env = EnvTestManager()
    
    # Setup mock ERC721 tokens
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    
    # Mint an ERC721 token to Alice
    token_id_a = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 token {token_id_a} to Alice")
    
    # Verify Alice owns the token
    token_owner = mock_erc721_a.owner_of(token_id_a)
    assert not (token_owner.lower() != env.alice.lower()), "Token ownership verification failed. Expected {env.alice}, got {token_owner}"
    
    # Create bid and ask data
    bid_data = {
        "address": env.mock_addresses.erc721_a,
        "id": token_id_a
    }
    ask_data = {
        "address": env.mock_addresses.erc721_b,
        "id": 2  # Ask for ERC721 B token ID 2
    }
    
    # Alice approves token for escrow
    await env.alice_client.erc721.approve(bid_data, "escrow")
    
    # Alice makes escrow (creates buy order)
    buy_result = await env.alice_client.erc721.buy_erc_721_for_erc_721(bid_data, ask_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Verify escrow happened
    current_owner = mock_erc721_a.owner_of(token_id_a)
    escrow_address = env.addresses.erc721_addresses.escrow_obligation
    print(f"ERC721 token {token_id_a} now owned by: {current_owner}")
    print(f"Expected escrow address: {escrow_address}")
    
    assert not (current_owner.lower() != escrow_address.lower()), "Token should be in escrow at {escrow_address}, but owned by {current_owner}"
    
    # Verify the attestation was created
    assert not (not buy_attestation_uid), "Buy attestation UID should be valid"
