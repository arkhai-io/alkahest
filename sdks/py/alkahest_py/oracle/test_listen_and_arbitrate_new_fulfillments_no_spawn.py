#!/usr/bin/env python3
"""
Test the Oracle arbitrate_many functionality with Future mode (only new events)
"""

import pytest
import time
from alkahest_py import (
    EnvTestManager,
    ArbitrationMode,
    MockERC20,
    TrustedOracleArbiterDemandData,
)

@pytest.mark.asyncio
async def test_arbitrate_many_future():
    """Test arbitrate_many with Future mode: only processes new fulfillments"""
    # Setup test environment
    env = EnvTestManager()

    # Setup escrow
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 100)

    price = {"address": env.mock_addresses.erc20_a, "value": 100}
    trusted_oracle_arbiter = env.addresses.arbiters_addresses.trusted_oracle_arbiter

    demand_data = TrustedOracleArbiterDemandData(env.bob, [])
    demand_bytes = demand_data.encode_self()

    arbiter = {
        "arbiter": trusted_oracle_arbiter,
        "demand": demand_bytes
    }

    expiration = int(time.time()) + 3600
    escrow_receipt = await env.alice_client.erc20.escrow.non_tierable.permit_and_create(
        price, arbiter, expiration
    )
    escrow_uid = escrow_receipt['log']['uid']

    # Decision function
    def decision_function(attestation, demand):
        obligation_str = env.bob_client.extract_obligation_data(attestation)
        print(f"Arbitrating obligation: {obligation_str}")
        return obligation_str == "good"

    # Callback function
    decision_count = {"count": 0}
    def callback(decision):
        decision_count["count"] += 1
        print(f"Callback: Decision made: {decision.decision}")

    # Start listening with Future mode (should not process past arbitrations)
    # Note: This test is timing-dependent and may be flaky
    oracle_client = env.bob_client.oracle

    # With Future mode and short timeout, should process 0 past decisions
    decisions = await oracle_client.arbitrate_many(
        decision_function,
        callback,
        ArbitrationMode.Future,
        timeout_seconds=1.0
    )

    # Verify: should have 0 decisions since Future mode skips past and no new fulfillments
    assert len(decisions) == 0, f"Expected 0 decisions with Future mode, got {len(decisions)}"

    print(f"Processed {len(decisions)} decisions (expected 0 with Future mode)")
    print("Arbitrate many with Future mode passed")
