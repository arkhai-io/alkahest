import pytest
import time
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_erc1155_reclaim_expired():
    """
    Test collecting expired escrowed ERC1155 tokens with time-based expiration.
    This corresponds to test_reclaim_expired() in main.rs for ERC1155
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. Alice creates escrow with short expiration
    3. Wait for escrow to expire
    4. Alice collects expired tokens back
    5. Verify tokens returned to Alice
    """
    env = EnvTestManager()
    
    # Setup mock ERC1155 token
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155 tokens (ID: 1) to Alice")
    
    # Create trade data
    bid_data = {
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 5
    }
    
    ask_data = {
        "address": env.mock_addresses.erc1155_b,
        "id": 2,
        "value": 3
    }
    
    # Alice approves tokens for escrow
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")
    
    # Check initial balance
    initial_alice_balance = mock_erc1155_a.balance_of(env.alice, 1)

    # Alice makes escrow with a short expiration (current time + 15 second)
    expiration = int(time.time()) + 15
    buy_result = await env.alice_client.erc1155.buy_erc1155_for_erc1155(bid_data, ask_data, expiration)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Verify tokens are in escrow
    escrow_balance = mock_erc1155_a.balance_of(env.addresses.erc1155_addresses.escrow_obligation, 1)
    alice_balance_after_escrow = mock_erc1155_a.balance_of(env.alice, 1)
    
    assert not (escrow_balance != 5), "5 tokens should be in escrow, got {escrow_balance}"
    
    assert not (alice_balance_after_escrow != 5), "Alice should have 5 tokens remaining, got {alice_balance_after_escrow}"
    
    print(f"ERC1155 tokens {bid_data['value']} in escrow at: {env.addresses.erc1155_addresses.escrow_obligation}")
    
    await env.god_wallet_provider.anvil_increase_time(20)
    
    # Alice collects expired funds
    collect_result = await env.alice_client.erc1155.reclaim_expired(buy_attestation_uid)
    print(f"Collected expired escrow, transaction: {collect_result}")
    
    # Verify tokens returned to Alice
    final_alice_balance = mock_erc1155_a.balance_of(env.alice, 1)
    final_escrow_balance = mock_erc1155_a.balance_of(env.addresses.erc1155_addresses.escrow_obligation, 1)
    
    assert not (final_alice_balance != initial_alice_balance), "All tokens should be returned to Alice. Expected {initial_alice_balance}, got {final_alice_balance}"
    
    assert not (final_escrow_balance != 0), "Escrow should be empty after collection. Got {final_escrow_balance}"
    
    print(f"ERC1155 tokens finally returned to Alice: {final_alice_balance}")
