import pytest
from alkahest_py import EnvTestManager, MockERC721, MockERC20, MockERC1155, ERC721PaymentObligationData

@pytest.mark.asyncio
async def test_pay_erc721_for_bundle():
    """
    Test paying ERC721 for a token bundle.
    This corresponds to test_pay_erc721_for_bundle() in main.rs
    
    Flow: Bob escrows a bundle (ERC20 + ERC721 + ERC1155), Alice pays ERC721 to get the bundle
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    mock_erc20_b = MockERC20(env.mock_addresses.erc20_b, env.god_wallet_provider)
    mock_erc721_b = MockERC721(env.mock_addresses.erc721_b, env.god_wallet_provider)
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Mint an ERC721 token to Alice (she will fulfill with this)
    alice_token_id = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 token {alice_token_id} to Alice")
    
    # Give Bob tokens for the bundle (he will escrow these)
    # ERC20
    mock_erc20_b.transfer(env.bob, 20)
    bob_erc20_balance = mock_erc20_b.balance_of(env.bob)
    assert not (bob_erc20_balance != 20), "Bob should have 20 ERC20 tokens, got {bob_erc20_balance}"
    
    # ERC721
    bob_token_id = mock_erc721_b.mint(env.bob)
    print(f"Minted ERC721 token {bob_token_id} to Bob")
    
    # ERC1155
    mock_erc1155_a.mint(env.bob, 1, 5)
    bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    assert not (bob_erc1155_balance != 5), "Bob should have 5 ERC1155 tokens, got {bob_erc1155_balance}"
    
    # Check balances before the exchange
    initial_alice_erc20_balance = mock_erc20_b.balance_of(env.alice)
    initial_alice_erc1155_balance = mock_erc1155_a.balance_of(env.alice, 1)
    
    # Bob's bundle that he'll escrow
    bundle_data = {
        "erc20s": [{"address": env.mock_addresses.erc20_b, "value": 20}],
        "erc721s": [{"address": env.mock_addresses.erc721_b, "id": bob_token_id}],
        "erc1155s": [{"address": env.mock_addresses.erc1155_a, "id": 1, "value": 5}]
    }
    
    # Create the ERC721 payment obligation data as the demand
    payment_obligation = ERC721PaymentObligationData(
        token=env.mock_addresses.erc721_a,
        token_id=str(alice_token_id),
        payee=env.bob
    )
    
    # Encode the payment obligation for the demand field
    demand_bytes = payment_obligation.encode_self()
    
    # Bob approves all tokens for the bundle escrow
    await env.bob_client.token_bundle.approve(bundle_data, "escrow")
    
    # Bob creates bundle escrow demanding ERC721 from Alice
    arbiter_data = {
        "arbiter": env.addresses.erc721_addresses.payment_obligation,
        "demand": demand_bytes
    }
    
    buy_result = await env.bob_client.token_bundle.buy_with_bundle(bundle_data, arbiter_data, 0)
    
    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her ERC721 for payment
    erc721_data = {"address": env.mock_addresses.erc721_a, "id": alice_token_id}
    await env.alice_client.erc721.approve(erc721_data, "payment")
    
    # Alice fulfills Bob's buy attestation with her ERC721
    pay_result = await env.alice_client.erc721.pay_erc721_for_bundle(buy_attestation_uid)

    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    # Check Alice received all tokens from the bundle
    final_alice_erc20_balance = mock_erc20_b.balance_of(env.alice)
    alice_erc721_owner = mock_erc721_b.owner_of(bob_token_id)
    final_alice_erc1155_balance = mock_erc1155_a.balance_of(env.alice, 1)
    
    # Check Bob received the ERC721 token
    bob_token_owner = mock_erc721_a.owner_of(alice_token_id)
    
    # Verify Alice received the bundle
    assert not (final_alice_erc20_balance - initial_alice_erc20_balance != 20), "Alice should have received 20 ERC20 tokens, got {final_alice_erc20_balance - initial_alice_erc20_balance}"
    
    assert not (alice_erc721_owner.lower() != env.alice.lower()), "Alice should have received the ERC721 token from bundle, but it's owned by {alice_erc721_owner}"
    
    assert not (final_alice_erc1155_balance - initial_alice_erc1155_balance != 5), "Alice should have received 5 ERC1155 tokens, got {final_alice_erc1155_balance - initial_alice_erc1155_balance}"
    
    # Verify Bob received the ERC721
    assert not (bob_token_owner.lower() != env.bob.lower()), "Bob should have received the ERC721 token, but it's owned by {bob_token_owner}"
