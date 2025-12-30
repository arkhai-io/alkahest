import pytest
import time
from alkahest_py import EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_get_permit_deadline():
    """Test that get_permit_deadline returns a timestamp ~1 hour in the future"""
    env = EnvTestManager()
    current_time = int(time.time())
    # Access static method via the util instance
    deadline = type(env.alice_client.erc20.util).get_permit_deadline()

    # Deadline should be approximately 1 hour (3600 seconds) in the future
    # Allow 10 seconds tolerance for test execution time
    expected_deadline = current_time + 3600
    assert abs(deadline - expected_deadline) < 10, f"Deadline {deadline} not within 10s of expected {expected_deadline}"
    print(f"Permit deadline: {deadline} (current: {current_time})")


@pytest.mark.asyncio
async def test_get_permit_signature():
    """Test that get_permit_signature returns valid signature components"""
    env = EnvTestManager()
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 1000)

    token_data = {"address": env.mock_addresses.erc20_a, "value": 100}
    spender = env.addresses.erc20_addresses.payment_obligation
    deadline = type(env.alice_client.erc20.util).get_permit_deadline()

    # Get permit signature
    v, r, s = await env.alice_client.erc20.util.get_permit_signature(spender, token_data, deadline)

    # Verify signature components
    assert v in [27, 28], f"v should be 27 or 28, got {v}"
    assert r.startswith("0x"), f"r should be hex string starting with 0x, got {r}"
    assert s.startswith("0x"), f"s should be hex string starting with 0x, got {s}"
    assert len(r) == 66, f"r should be 66 chars (0x + 64 hex), got {len(r)}"
    assert len(s) == 66, f"s should be 66 chars (0x + 64 hex), got {len(s)}"

    print(f"Permit signature: v={v}, r={r[:10]}..., s={s[:10]}...")


@pytest.mark.asyncio
async def test_permit_signature_different_amounts():
    """Test that different amounts produce different signatures"""
    env = EnvTestManager()
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 1000)

    spender = env.addresses.erc20_addresses.payment_obligation
    deadline = type(env.alice_client.erc20.util).get_permit_deadline()

    token_data_100 = {"address": env.mock_addresses.erc20_a, "value": 100}
    token_data_200 = {"address": env.mock_addresses.erc20_a, "value": 200}

    v1, r1, s1 = await env.alice_client.erc20.util.get_permit_signature(spender, token_data_100, deadline)
    v2, r2, s2 = await env.alice_client.erc20.util.get_permit_signature(spender, token_data_200, deadline)

    # Signatures should be different for different amounts
    assert (r1, s1) != (r2, s2), "Signatures should differ for different amounts"

    print("Different amounts produce different signatures")
