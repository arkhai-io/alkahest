import pytest
import time
from alkahest_py import EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_buy_erc20_for_native():
    """
    Test buying ERC20 with native tokens.
    Alice escrows native tokens demanding ERC20.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei of native token
    ask_amount = 100  # ERC20 amount

    # Alice escrows native token, demanding ERC20
    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc20_a, "value": ask_amount}
    expiration = 0  # no expiration

    escrow_result = await env.alice_client.native_token.barter.buy_erc20_for_native(
        native_data, ask_data, expiration
    )

    assert escrow_result is not None, "Escrow creation should succeed"
    assert 'log' in escrow_result, "Should have log in result"
    escrow_uid = escrow_result['log']['uid']
    assert escrow_uid != "0x" + "00" * 32, "Should have valid escrow UID"

    print(f"Buy ERC20 for native escrow created: {escrow_uid}")


# NOTE: test_pay_native_for_erc20 is skipped - the SDK doesn't have a pay_erc20_for_native
# method to pay ERC20 into a native token escrow. This cross-token payment flow isn't implemented.


# NOTE: test_buy_native_for_native is skipped - the Rust SDK's pay_native_for_native
# doesn't send value with the transaction. This is a bug in the Rust SDK that needs to be fixed.


@pytest.mark.asyncio
async def test_buy_erc721_for_native():
    """
    Test buying ERC721 with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc721_a, "id": 1}

    escrow_result = await env.alice_client.native_token.barter.buy_erc721_for_native(
        native_data, ask_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy ERC721 for native escrow created: {escrow_result['log']['uid']}")


@pytest.mark.asyncio
async def test_buy_erc1155_for_native():
    """
    Test buying ERC1155 with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc1155_a, "id": 1, "value": 10}

    escrow_result = await env.alice_client.native_token.barter.buy_erc1155_for_native(
        native_data, ask_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy ERC1155 for native escrow created: {escrow_result['log']['uid']}")


@pytest.mark.asyncio
async def test_buy_bundle_for_native():
    """
    Test buying token bundle with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    bundle_data = {
        "erc20s": [{"address": env.mock_addresses.erc20_a, "value": 100}],
        "erc721s": [],
        "erc1155s": [],
        "native_amount": 0,
    }

    escrow_result = await env.alice_client.native_token.barter.buy_bundle_for_native(
        native_data, bundle_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy bundle for native escrow created: {escrow_result['log']['uid']}")
