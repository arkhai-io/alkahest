import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_buy_erc721_with_erc1155():
    """
    Test using ERC1155 to buy ERC721 tokens.
    This corresponds to test_buy_erc721_with_erc1155() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. Alice approves ERC1155 tokens for escrow
    3. Alice creates purchase offer using ERC1155 to buy ERC721
    4. Verify ERC1155 tokens are in escrow and attestation is created
    """
    env = EnvTestManager()
    
    # Setup mock ERC1155 token
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155 tokens (ID: 1) to Alice")
    
    # Create exchange information
    bid_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    ask_data = {
        "address": env.mock_addresses.erc721_a,
        "id": 1
    }
    
    # Alice approves tokens for escrow
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")
    
    # Alice creates purchase offer
    buy_result = await env.alice_client.erc1155.buy_erc721_with_erc1155(bid_data, ask_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    # Verify escrow happened
    escrow_balance = mock_erc1155_a.balance_of(env.addresses.erc1155_addresses.escrow_obligation, 1)
    alice_balance_after = mock_erc1155_a.balance_of(env.alice, 1)
    
    assert not (escrow_balance != 5), "5 tokens should be in escrow, got {escrow_balance}"
    
    assert not (alice_balance_after != 5), "Alice should have 5 tokens remaining, got {alice_balance_after}"
    
    print("✅ ERC1155 to ERC721 purchase offer created")
    print(f"ERC1155 tokens in escrow: {escrow_balance}")
    print(f"Alice remaining balance: {alice_balance_after}")
