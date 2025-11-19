import pytest
from alkahest_py import EnvTestManager, MockERC1155

@pytest.mark.asyncio
async def test_erc1155_revoke_all():
    """
    Test ERC1155 revoke_all functionality for payment purpose.
    This corresponds to test_erc1155_revoke_all() in main.rs
    
    Flow: 
    1. Mint ERC1155 tokens to Alice
    2. First approve_all for payment purpose
    3. Then revoke_all for payment purpose
    4. Verify that approval has been revoked using isApprovedForAll
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
    
    # First approve_all for payment
    print("Setting approve_all for payment purpose...")
    await env.alice_client.erc1155.approve_all(env.mock_addresses.erc1155_a, "payment")
    
    # Verify approval was set
    payment_approved_before = mock_erc1155_a.is_approved_for_all(
        env.alice, 
        env.addresses.erc1155_addresses.payment_obligation
    )
    
    assert not (not payment_approved_before), "Payment approval should be set before revocation"
    
    print("✅ Payment approve_all verified as set")
    
    # Then revoke_all for payment
    print("Revoking all approvals for payment purpose...")
    await env.alice_client.erc1155.revoke_all(env.mock_addresses.erc1155_a, "payment")
    
    # Verify revocation
    payment_approved_after = mock_erc1155_a.is_approved_for_all(
        env.alice, 
        env.addresses.erc1155_addresses.payment_obligation
    )
    
    assert not (payment_approved_after), "Payment approval should be revoked"
    
    print("✅ Payment approval successfully revoked")
