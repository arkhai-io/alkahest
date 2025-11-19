import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_buy_with_erc1155():
    """
    Test ERC1155 buy_with_erc1155 functionality with custom arbiter data.
    This corresponds to test_buy_with_erc1155() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. Alice approves tokens for escrow
    3. Alice creates escrow with custom demand using buy_with_erc1155
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
    
    # Create ERC1155 price data
    price_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    # Create custom arbiter data
    arbiter_data = {
        "arbiter": env.addresses.erc1155_addresses.payment_obligation,
        "demand": b"custom demand data"
    }
    
    # Alice approves tokens for escrow
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")
    
    # Alice creates escrow with custom demand
    buy_result = await env.alice_client.erc1155.buy_with_erc1155(price_data, arbiter_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    # Verify escrow happened - check alice's balance decreased
    alice_balance_after = mock_erc1155_a.balance_of(env.alice, 1)
    expected_remaining = 5  # 10 - 5 = 5
    
    assert not (alice_balance_after != expected_remaining), "Alice should have {expected_remaining} tokens remaining, got {alice_balance_after}"
    
    # Check escrow contract's balance increased
    escrow_balance = mock_erc1155_a.balance_of(env.addresses.erc1155_addresses.escrow_obligation, 1)
    
    assert not (escrow_balance != 5), "Escrow should have 5 tokens, got {escrow_balance}"
    
    print("✅ Tokens successfully escrowed")
    print(f"Alice remaining balance: {alice_balance_after}")
    print(f"Escrow balance: {escrow_balance}")
