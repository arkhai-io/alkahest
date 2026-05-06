"""Smoke test for `get_obligation` on the ERC20 escrow client.

Mirrors the Rust/TS behavior: create an ERC20 escrow, then read it back by UID
and assert that the typed obligation fields (token, amount, arbiter, demand)
round-trip and the attestation envelope (recipient, attester) is populated.
"""
import pytest
from alkahest_py import MockERC20


@pytest.mark.asyncio
async def test_non_tierable_get_obligation(env, alice_client):
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)

    transfer_amount = 100
    mock_erc20.transfer(env.alice, transfer_amount)

    price_data = {
        "address": env.mock_addresses.erc20_a,
        "value": transfer_amount,
    }
    arbiter_address = env.addresses.erc20_addresses.payment_obligation
    demand_bytes = b"custom demand data"

    await alice_client.erc20.util.approve(price_data, "escrow")

    arbiter_data = {"arbiter": arbiter_address, "demand": demand_bytes}
    expiration = 0

    create_result = await alice_client.erc20.escrow.non_tierable.create(
        price_data, arbiter_data, expiration
    )
    escrow_uid = create_result["log"]["uid"]
    assert escrow_uid.startswith("0x") and len(escrow_uid) == 66

    fetched = await alice_client.erc20.escrow.non_tierable.get_obligation(escrow_uid)
    attestation = fetched["attestation"]
    data = fetched["data"]

    # Attestation envelope is populated.
    assert attestation.uid == escrow_uid
    assert attestation.recipient.lower() == env.alice.lower()
    # Attester should be the escrow obligation contract (it issued the attestation).
    assert attestation.attester.lower() != "0x" + "00" * 20

    # Typed obligation fields round-trip.
    assert data.token.lower() == env.mock_addresses.erc20_a.lower()
    assert data.amount == transfer_amount
    assert data.arbiter.lower() == arbiter_address.lower()
    assert bytes(data.demand) == demand_bytes
