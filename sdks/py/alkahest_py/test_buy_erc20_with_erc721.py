import pytest
from alkahest_py import EnvTestManager, MockERC721

@pytest.mark.asyncio
async def test_buy_erc20_with_erc721():
    """
    Test buying ERC20 tokens with ERC721.
    This corresponds to test_buy_erc20_with_erc721() in main.rs
    
    Flow: Alice escrows ERC721 to buy ERC20 tokens
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
    
    # Create exchange information
    bid_data = {
        "address": env.mock_addresses.erc721_a,
        "id": token_id
    }
    ask_data = {
        "address": env.mock_addresses.erc20_a,
        "value": 100
    }
    
    # Alice approves token for escrow
    await env.alice_client.erc721.approve(bid_data, "escrow")
    
    # Alice creates purchase offer
    buy_result = await env.alice_client.erc721.buy_erc20_with_erc721(bid_data, ask_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Verify escrow happened
    current_owner = mock_erc721_a.owner_of(token_id)
    escrow_address = env.addresses.erc721_addresses.escrow_obligation
    print(f"ERC721 token {token_id} now owned by: {current_owner}")
    print(f"Expected escrow address: {escrow_address}")
    
    assert not (current_owner.lower() != escrow_address.lower()), "Token should be in escrow at {escrow_address}, but owned by {current_owner}"
    
    # Verify the attestation was created
    assert not (not buy_attestation_uid), "Buy attestation UID should be valid"
