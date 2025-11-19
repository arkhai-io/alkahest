import pytest
from alkahest_py import EnvTestManager, MockERC20, MockERC721

@pytest.mark.asyncio
async def test_pay_erc20_for_erc721():
    """
    Test paying ERC20 tokens to fulfill an ERC721 escrow.
    This corresponds to test_pay_erc20_for_erc721() in main.rs
    
    Flow: Bob escrows ERC721, Alice pays ERC20 to get the ERC721
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc721 = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    
    # Give Alice ERC20 tokens and Bob an ERC721 token
    alice_initial_erc20 = mock_erc20_a.balance_of(env.alice)
    mock_erc20_a.transfer(env.alice, 100)
    alice_after_transfer = mock_erc20_a.balance_of(env.alice)
    
    assert not (alice_after_transfer != alice_initial_erc20 + 100), "Alice ERC20 transfer failed. Expected {alice_initial_erc20 + 100}, got {alice_after_transfer}"
    
    # Mint an ERC721 token to Bob (token ID 1)
    token_id = mock_erc721.mint(env.bob)
    print(f"Minted ERC721 token {token_id} to Bob")
    
    # Verify Bob owns the token
    token_owner = mock_erc721.owner_of(token_id)
    assert not (token_owner.lower() != env.bob.lower()), "Token ownership verification failed. Expected {env.bob}, got {token_owner}"
    
    # Create test data  
    erc20_amount = 50
    erc721_token_id = token_id  # Use the token ID we just minted
    
    # Calculate expiration as absolute timestamp (current time + 1 hour)
    import time
    expiration = int(time.time()) + 3600  # 1 hour from now
    
    # Step 1: Bob approves his ERC721 for escrow
    erc721_data = {"address": env.mock_addresses.erc721_a, "id": erc721_token_id}
    await env.bob_client.erc721.approve(erc721_data, "escrow")

    # Step 2: Bob creates ERC721 escrow requesting ERC20
    erc20_data = {"address": env.mock_addresses.erc20_a, "value": erc20_amount}
    buy_result = await env.bob_client.erc721.buy_erc20_with_erc721(erc721_data, erc20_data, expiration)

    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Verify ERC721 is in escrow 
    erc721_owner = mock_erc721.owner_of(erc721_token_id)
    print(f"ERC721 token {erc721_token_id} now owned by: {erc721_owner}")
    # Note: The token should now be owned by the escrow contract
    
    initial_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    
    # Step 3: Alice approves her ERC20 tokens for payment
    await env.alice_client.erc20.approve(erc20_data, "payment")
    
    # Step 4: Alice fulfills Bob's escrow
    pay_result = await env.alice_client.erc20.pay_erc20_for_erc721(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    # Alice should now own the ERC721 token
    final_erc721_owner = mock_erc721.owner_of(erc721_token_id)
    print(f"ERC721 token {erc721_token_id} finally owned by: {final_erc721_owner}")
    assert not (final_erc721_owner.lower() != env.alice.lower()), "Alice should own the ERC721 token, but it's owned by {final_erc721_owner}"
    
    # Alice spent erc20_amount tokens
    final_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    alice_spent = initial_alice_erc20_balance - final_alice_erc20_balance
    assert not (alice_spent != erc20_amount), "Alice should have spent {erc20_amount} ERC20 tokens, spent {alice_spent}"
    
    # Bob received erc20_amount tokens
    bob_erc20_balance = mock_erc20_a.balance_of(env.bob)
    assert not (bob_erc20_balance != erc20_amount), "Bob should have received {erc20_amount} ERC20 tokens, got {bob_erc20_balance}"
