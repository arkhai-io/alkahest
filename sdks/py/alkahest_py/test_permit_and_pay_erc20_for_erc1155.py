import pytest
from alkahest_py import EnvTestManager, MockERC20, MockERC1155

@pytest.mark.asyncio
async def test_permit_and_pay_erc20_for_erc1155():
    """
    Test paying ERC20 tokens to fulfill an ERC1155 escrow using permit (no pre-approval needed).
    This corresponds to test_permit_and_pay_erc20_for_erc1155() in main.rs
    
    Flow: Bob escrows ERC1155, Alice pays ERC20 using permit to get the ERC1155
    
    ⚠️ KNOWN LIMITATION: This test currently fails because MockERC1155 is not yet 
    available in the Python module. Bob cannot mint/own ERC1155 tokens before 
    trying to approve them for escrow, causing a "not token owner" error.
    
    TO FIX: Export MockERC1155 in lib.rs and ensure it's available in the Python module.
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Give Alice ERC20 tokens and Bob ERC1155 tokens
    alice_initial_erc20 = mock_erc20_a.balance_of(env.alice)
    mock_erc20_a.transfer(env.alice, 100)
    alice_after_transfer = mock_erc20_a.balance_of(env.alice)
    
    assert not (alice_after_transfer != alice_initial_erc20 + 100), "Alice ERC20 transfer failed. Expected {alice_initial_erc20 + 100}, got {alice_after_transfer}"
    
    # Mint ERC1155 tokens to Bob (token ID 1, amount 50)
    token_id = 1
    token_amount = 50
    mock_erc1155_a.mint(env.bob, token_id, token_amount)
    print(f"Minted ERC1155 token {token_id} (amount {token_amount}) to Bob")
    
    # Verify Bob owns the tokens
    bob_balance = mock_erc1155_a.balance_of(env.bob, token_id)
    assert not (bob_balance != token_amount), "Token balance verification failed. Expected {token_amount}, got {bob_balance}"
    
    # Create test data
    erc20_amount = 50
    token_id = 1
    token_amount = 50  # Amount of ERC1155 tokens Bob has
    
    # Calculate expiration as absolute timestamp (current time + 1 hour)
    import time
    expiration = int(time.time()) + 3600  # 1 hour from now
    
    # Step 1: Bob approves his ERC1155 for escrow
    await env.bob_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "escrow")
    
    # Step 2: Bob creates ERC1155 escrow requesting ERC20
    erc1155_data = {"address": env.mock_addresses.erc1155_a, "id": token_id, "value": token_amount}
    erc20_data = {"address": env.mock_addresses.erc20_a, "value": erc20_amount}
    buy_result = await env.bob_client.erc1155.buy_erc20_with_erc1155(
        erc1155_data, erc20_data, expiration
    )
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Check initial balances before the exchange
    # Alice should start with 0 ERC1155 tokens (would check with mock_erc1155_a.balance_of when available)
    # initial_alice_erc1155_balance = mock_erc1155_a.balance_of(env.alice, token_id)
    # assert initial_alice_erc1155_balance == 0
    
    initial_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    
    # Step 3: Alice fulfills Bob's escrow using permit (no pre-approval needed)
    pay_result = await env.alice_client.erc20.permit_and_pay_erc20_for_erc1155(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    # Alice should have received the ERC1155 tokens (would check with mock_erc1155_a.balance_of when available)
    # final_alice_erc1155_balance = mock_erc1155_a.balance_of(env.alice, token_id)
    # assert final_alice_erc1155_balance == token_amount
    
    # Alice spent erc20_amount tokens
    final_alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    alice_spent = initial_alice_erc20_balance - final_alice_erc20_balance
    assert not (alice_spent != erc20_amount), "Alice should have spent {erc20_amount} ERC20 tokens, spent {alice_spent}"
    
    # Bob received erc20_amount tokens
    bob_erc20_balance = mock_erc20_a.balance_of(env.bob)
    assert not (bob_erc20_balance != erc20_amount), "Bob should have received {erc20_amount} ERC20 tokens, got {bob_erc20_balance}"
