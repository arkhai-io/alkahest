import pytest
from alkahest_py import EnvTestManager, MockERC1155


@pytest.mark.asyncio
async def test_revoke_erc1155s_in_bundle():
    """
    Test token_bundle revoke_erc1155s functionality.

    Flow:
    1. Mint ERC1155 tokens to Alice
    2. Create a token bundle with ERC1155 tokens
    3. Approve the bundle for barter
    4. Revoke ERC1155 approvals in the bundle
    5. Verify that approval has been revoked
    """
    env = EnvTestManager()

    # Setup mock ERC1155 tokens
    mock_erc1155_a = MockERC1155(env.mock_addresses.erc1155_a, env.god_wallet_provider)

    # Mint ERC1155 tokens to Alice
    mock_erc1155_a.mint(env.alice, 1, 10)
    mock_erc1155_a.mint(env.alice, 2, 20)
    print(f"Minted ERC1155 tokens to Alice")

    # Create a token bundle with ERC1155 tokens
    bundle = {
        "erc20s": [],
        "erc721s": [],
        "erc1155s": [
            {"address": env.mock_addresses.erc1155_a, "id": 1, "value": 10},
            {"address": env.mock_addresses.erc1155_a, "id": 2, "value": 20},
        ],
        "native_amount": 0,
    }

    # First approve the bundle for barter
    print("Approving bundle for barter...")
    await env.alice_client.token_bundle.util.approve(bundle, "barter")

    # Verify approval was set for ERC1155
    barter_approved_before = mock_erc1155_a.is_approved_for_all(
        env.alice,
        env.addresses.token_bundle_addresses.barter_utils
    )
    assert barter_approved_before, "Barter approval should be set before revocation"
    print("Barter approval verified as set")

    # Revoke ERC1155 approvals in the bundle
    print("Revoking ERC1155 approvals in bundle...")
    await env.alice_client.token_bundle.util.revoke_erc1155s(bundle, "barter")

    # Verify revocation
    barter_approved_after = mock_erc1155_a.is_approved_for_all(
        env.alice,
        env.addresses.token_bundle_addresses.barter_utils
    )
    assert not barter_approved_after, "Barter approval should be revoked"

    print("ERC1155 approvals in bundle successfully revoked")


@pytest.mark.asyncio
async def test_revoke_erc1155s_empty_bundle():
    """
    Test revoke_erc1155s with a bundle that has no ERC1155 tokens.
    Should complete without error.
    """
    env = EnvTestManager()

    # Create an empty bundle (no ERC1155s)
    bundle = {
        "erc20s": [],
        "erc721s": [],
        "erc1155s": [],
        "native_amount": 0,
    }

    # Revoke should succeed even with empty bundle
    result = await env.alice_client.token_bundle.util.revoke_erc1155s(bundle, "barter")

    # Empty result is expected (empty string means no receipts)
    assert result == "", f"Expected empty result for empty bundle, got {result}"
    print("Empty bundle revocation handled correctly")
