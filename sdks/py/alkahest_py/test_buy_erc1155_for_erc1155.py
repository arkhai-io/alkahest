import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_buy_erc1155_for_erc1155():
    """
    Test ERC1155 to ERC1155 exchange escrow creation.
    This corresponds to test_buy_erc1155_for_erc1155() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. Alice approves tokens for escrow
    3. Alice creates escrow offering ERC1155A for ERC1155B
    4. Verify tokens are in escrow and attestation is created
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
    
    # Create bid data (what Alice is offering)
    bid_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    # Create ask data (what Alice wants in return)
    ask_data = {
        "address": env.mock_addresses.erc1155_b,
        "id": 2,
        "value": 3
    }
    
    # Alice approves tokens for escrow
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")
    
    # Alice creates escrow offering ERC1155A for ERC1155B
    buy_result = await env.alice_client.erc1155.buy_erc1155_for_erc1155(bid_data, ask_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    # Verify escrow happened
    escrow_balance = mock_erc1155_a.balance_of(env.addresses.erc1155_addresses.escrow_obligation, 1)
    alice_balance_after = mock_erc1155_a.balance_of(env.alice, 1)
    
    assert not (escrow_balance != 5), "5 tokens should be in escrow, got {escrow_balance}"
    
    assert not (alice_balance_after != 5), "Alice should have 5 tokens remaining, got {alice_balance_after}"
    
    print("✅ ERC1155 escrow created successfully")
    print(f"Escrow balance: {escrow_balance}")
    print(f"Alice remaining balance: {alice_balance_after}")
