import pytest
from alkahest_py import EnvTestManager, MockERC1155, MockERC20, MockERC721, ERC1155PaymentObligationData

@pytest.mark.asyncio
async def test_pay_erc1155_for_bundle():
    """
    Test using ERC1155 to fulfill bundle escrow.
    This corresponds to test_pay_erc1155_for_bundle() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice and bundle tokens to Bob
    2. Bob creates escrow offering bundle for Alice's ERC1155
    3. Alice fulfills the escrow with her ERC1155 tokens
    4. Verify both parties received their tokens
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    mock_erc20_b = MockERC20(env.mock_addresses.erc20_b, env.god_wallet_provider)
    mock_erc721_b = MockERC721(env.mock_addresses.erc721_b, env.god_wallet_provider)
    mock_erc1155_b = MockERC1155(env.mock_addresses.erc1155_b, env.god_wallet_provider)
    
    # Mint ERC1155 tokens to Alice (she will fulfill with these)
    mock_erc1155_a.mint(env.alice, 1, 10)
    print(f"Minted 10 ERC1155A tokens (ID: 1) to Alice")
    
    # Give Bob tokens for the bundle (he will escrow these)
    # ERC20
    mock_erc20_b.transfer(env.bob, 20)
    bob_erc20_balance = mock_erc20_b.balance_of(env.bob)
    assert not (bob_erc20_balance != 20), "Bob should have 20 ERC20 tokens, got {bob_erc20_balance}"
    
    # ERC721
    bob_token_id = mock_erc721_b.mint(env.bob)
    print(f"Minted ERC721 token {bob_token_id} to Bob")
    
    # ERC1155
    mock_erc1155_b.mint(env.bob, 3, 4)
    bob_erc1155_balance = mock_erc1155_b.balance_of(env.bob, 3)
    assert not (bob_erc1155_balance != 4), "Bob should have 4 ERC1155B tokens, got {bob_erc1155_balance}"
    
    # Check balances before the exchange
    initial_alice_erc20_balance = mock_erc20_b.balance_of(env.alice)
    initial_alice_erc1155b_balance = mock_erc1155_b.balance_of(env.alice, 3)
    initial_bob_erc1155a_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Bob's bundle that he'll escrow
    bundle_data = {
        "erc20s": [{"address": env.mock_addresses.erc20_b, "value": 20}],
        "erc721s": [{"address": env.mock_addresses.erc721_b, "id": bob_token_id}],
        "erc1155s": [{"address": env.mock_addresses.erc1155_b, "id": 3, "value": 4}]
    }
    
    # Create the ERC1155 payment obligation data as the demand
    payment_obligation = ERC1155PaymentObligationData(
        token=env.mock_addresses.erc1155_a,
        token_id="1",
        amount="5",
        payee=env.bob
    )
    
    # Encode the payment obligation for the demand field
    demand_bytes = payment_obligation.encode_self()
    
    # Bob approves all tokens for the bundle escrow
    await env.bob_client.token_bundle.approve(bundle_data, "escrow")
    
    # Bob creates bundle escrow demanding ERC1155 from Alice
    arbiter_data = {
        "arbiter": env.addresses.erc1155_addresses.payment_obligation,
        "demand": demand_bytes
    }
    
    buy_result = await env.bob_client.token_bundle.buy_with_bundle(bundle_data, arbiter_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her ERC1155 for payment
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "payment")
    
    # Alice fulfills Bob's buy attestation with her ERC1155
    pay_result = await env.alice_client.erc1155.pay_erc1155_for_bundle(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    # Check Alice received all tokens from the bundle
    final_alice_erc20_balance = mock_erc20_b.balance_of(env.alice)
    alice_erc721_owner = mock_erc721_b.owner_of(bob_token_id)
    final_alice_erc1155b_balance = mock_erc1155_b.balance_of(env.alice, 3)
    
    # Check Bob received the ERC1155 tokens
    final_bob_erc1155a_balance = mock_erc1155_a.balance_of(env.bob, 1)
    
    # Verify Alice received the bundle
    assert not (final_alice_erc20_balance - initial_alice_erc20_balance != 20), "Alice should have received 20 ERC20 tokens, got {final_alice_erc20_balance - initial_alice_erc20_balance}"
    
    assert not (alice_erc721_owner.lower() != env.alice.lower()), "Alice should have received the ERC721 token from bundle, but it's owned by {alice_erc721_owner}"
    
    assert not (final_alice_erc1155b_balance - initial_alice_erc1155b_balance != 4), "Alice should have received 4 ERC1155B tokens, got {final_alice_erc1155b_balance - initial_alice_erc1155b_balance}"
    
    # Verify Bob received the ERC1155
    assert not (final_bob_erc1155a_balance - initial_bob_erc1155a_balance != 5), "Bob should have received 5 ERC1155A tokens, got {final_bob_erc1155a_balance - initial_bob_erc1155a_balance}"
    
    print("✅ ERC1155 for bundle exchange successful")
    print(f"Alice received bundle: {final_alice_erc20_balance - initial_alice_erc20_balance} ERC20, ERC721 {bob_token_id}, {final_alice_erc1155b_balance - initial_alice_erc1155b_balance} ERC1155B")
    print(f"Bob received {final_bob_erc1155a_balance - initial_bob_erc1155a_balance} ERC1155A tokens")
