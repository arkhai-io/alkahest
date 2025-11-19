import pytest
from alkahest_py import EnvTestManager, MockERC721, MockERC20

@pytest.mark.asyncio
async def test_pay_erc721_for_erc20():
    """
    Test paying ERC721 for ERC20 tokens.
    This corresponds to test_pay_erc721_for_erc20() in main.rs
    
    Flow: Bob escrows ERC20, Alice pays ERC721 to get the ERC20
    """
    env = EnvTestManager()
    
    # Setup mock tokens
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    mock_erc20_a = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    
    # Mint an ERC721 token to Alice (she will fulfill with this)
    token_id = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 token {token_id} to Alice")
    
    # Give Bob some ERC20 tokens for escrow
    bob_initial_erc20 = mock_erc20_a.balance_of(env.bob)
    mock_erc20_a.transfer(env.bob, 100)
    bob_after_transfer = mock_erc20_a.balance_of(env.bob)
    
    assert not (bob_after_transfer != bob_initial_erc20 + 100), "Bob ERC20 transfer failed. Expected {bob_initial_erc20 + 100}, got {bob_after_transfer}"
    
    # Create test data
    bid_data = {  # Bob's bid
        "address": env.mock_addresses.erc20_a,
        "value": 100
    }
    ask_data = {  # Bob asks for Alice's ERC721
        "address": env.mock_addresses.erc721_a,
        "id": token_id
    }
    
    # Bob approves tokens for escrow and creates buy attestation
    await env.bob_client.erc20.approve(bid_data, "escrow")

    buy_result = await env.bob_client.erc20.buy_erc721_for_erc20(bid_data, ask_data, 0)

    assert not (not buy_result['log']['uid'] or buy_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her ERC721 token for payment
    erc721_data = {"address": env.mock_addresses.erc721_a, "id": token_id}
    await env.alice_client.erc721.approve(erc721_data, "payment")
    
    # Alice fulfills Bob's buy attestation with her ERC721
    pay_result = await env.alice_client.erc721.pay_erc721_for_erc20(buy_attestation_uid)
    
    assert not (not pay_result['log']['uid'] or pay_result['log']['uid'] == "0x0000000000000000000000000000000000000000000000000000000000000000"), "Invalid payment attestation UID"
    
    # Verify token transfers
    # Alice should have received the ERC20 tokens
    alice_erc20_balance = mock_erc20_a.balance_of(env.alice)
    assert not (alice_erc20_balance != 100), "Alice should have received 100 ERC20 tokens, got {alice_erc20_balance}"
    
    # Bob should have received the ERC721 token
    token_owner = mock_erc721_a.owner_of(token_id)
    assert not (token_owner.lower() != env.bob.lower()), "Bob should have received the ERC721 token, but it's owned by {token_owner}"
