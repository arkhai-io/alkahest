import pytest
from alkahest_py import EnvTestManager, MockERC721, MockERC1155
from alkahest_py.barter_helpers import create_erc1155_escrow, erc721_payment_demand

@pytest.mark.asyncio
async def test_pay_erc721_and_collect(env, alice_client, bob_client):
    """
    Test paying ERC721 for ERC1155 tokens.
    This corresponds to test_pay_erc721_and_collect() in main.rs
    
    Flow: Bob escrows ERC1155, Alice pays ERC721 to get the ERC1155
    """
    
    # Setup mock tokens
    mock_erc721_a = MockERC721(env.mock_addresses.erc721_a, env.god_wallet_provider)
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)
    
    # Mint an ERC721 token to Alice (she will fulfill with this)
    token_id = mock_erc721_a.mint(env.alice)
    print(f"Minted ERC721 token {token_id} to Alice")
    
    # Give Bob some ERC1155 tokens for escrow
    mock_erc1155_a.mint(env.bob, 1, 10)  # Mint 10 tokens of ID 1 to Bob
    bob_erc1155_balance = mock_erc1155_a.balance_of(env.bob, 1)
    print(f"Bob has {bob_erc1155_balance} ERC1155 tokens of ID 1")
    
    assert bob_erc1155_balance == 10, "Bob should have 10 ERC1155 tokens, got {bob_erc1155_balance}"
    
    # Create test data
    bid_data = {  # Bob's bid
        "address": env.mock_addresses.erc1155_a,
        "id": 1,
        "value": 10
    }
    ask_data = {  # Bob asks for Alice's ERC721
        "address": env.mock_addresses.erc721_a,
        "id": token_id
    }
    
    # Bob approves tokens for escrow and creates buy attestation
    await bob_client.erc1155.util.approve_all(env.mock_addresses.erc1155_a, "barter")

    buy_result = await create_erc1155_escrow(bob_client, bid_data, erc721_payment_demand(env, ask_data, env.bob), 0)

    assert buy_result['log']['uid'] and buy_result['log']['uid'] != "0x0000000000000000000000000000000000000000000000000000000000000000", "Invalid buy attestation UID"
    
    buy_attestation_uid = buy_result['log']['uid']
    
    # Alice approves her token for payment
    erc721_data = {"address": env.mock_addresses.erc721_a, "id": token_id}
    await alice_client.erc721.util.approve(erc721_data, "barter")
    
    # Alice fulfills the buy attestation
    pay_result = await alice_client.erc721.barter.pay_erc721_and_collect(buy_attestation_uid)

    assert pay_result['log']['uid'] and pay_result['log']['uid'] != "0x0000000000000000000000000000000000000000000000000000000000000000", "Invalid payment attestation UID"
    
    # Verify token transfers
    # Alice should have received ERC1155 tokens
    alice_erc1155_balance = mock_erc1155_a.balance_of(env.alice, 1)
    assert alice_erc1155_balance == 10, "Alice should have received 10 ERC1155 tokens, got {alice_erc1155_balance}"
    
    # Bob should have received the ERC721 token
    token_owner = mock_erc721_a.owner_of(token_id)
    assert token_owner.lower() == env.bob.lower(), "Bob should have received the ERC721 token, but it's owned by {token_owner}"
