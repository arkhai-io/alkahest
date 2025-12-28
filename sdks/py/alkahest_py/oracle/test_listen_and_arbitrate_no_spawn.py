#!/usr/bin/env python3
"""
Test the Oracle listen_and_arbitrate_no_spawn functionality with simplified API
"""

import pytest
import time
from alkahest_py import (
    EnvTestManager,
    ArbitrateOptions,
    ArbitrationMode,
    MockERC20,
    TrustedOracleArbiterDemandData,
)

@pytest.mark.asyncio
async def test_listen_and_arbitrate_no_spawn():
    """Test listen_and_arbitrate_no_spawn: processes past arbitrations and returns immediately"""
    # Setup test environment
    env = EnvTestManager()

    # Setup escrow
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 100)

    price = {"address": env.mock_addresses.erc20_a, "value": 100}
    trusted_oracle_arbiter = env.addresses.arbiters_addresses.trusted_oracle_arbiter

    # The inner data field - this is what gets passed to arbitrate() and used for decisionKey
    inner_demand_data = b""  # Empty bytes for this simple test

    # The full encoded DemandData - this is what gets stored in the escrow
    demand_data = TrustedOracleArbiterDemandData(env.bob, inner_demand_data)
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

    # Make fulfillment
    string_client = env.bob_client.string_obligation
    fulfillment_uid = await string_client.do_obligation("good", escrow_uid)

    # Request arbitration with inner demand data (not the full encoded DemandData)
    # because TrustedOracleArbiter.checkObligation() uses only demand_.data for the decisionKey
    oracle_client = env.bob_client.oracle
    await oracle_client.request_arbitration(fulfillment_uid, env.bob, inner_demand_data)

    # Decision function
    def decision_function(attestation):
        obligation_str = env.bob_client.extract_obligation_data(attestation)
        print(f"Arbitrating obligation: {obligation_str}")
        return obligation_str == "good"

    # Callback function - NOTE: only called for NEW arbitrations while listening, not past ones
    decision_count = {"count": 0}
    def callback(decision):
        decision_count["count"] += 1
        print(f"Callback: Decision made: {decision.decision}")

    # Listen and arbitrate with short timeout (processes past, then times out)
    options = ArbitrateOptions(ArbitrationMode.All)
    result = await oracle_client.listen_and_arbitrate_no_spawn(
        decision_function,
        callback,
        options,
        timeout_seconds=1.0  # Short timeout since we're not expecting new events
    )

    # Verify result - past arbitrations are in the decisions list
    assert len(result.decisions) == 1, f"Expected 1 decision, got {len(result.decisions)}"
    assert result.decisions[0].decision == True, "Expected decision to be True"

    # The callback is NOT called for past arbitrations, only for new ones while listening
    # Since we timeout immediately, no new arbitrations come in, so callback count is 0
    print(f"Past decisions processed: {len(result.decisions)}")
    print(f"New arbitrations (callback called): {decision_count['count']}")
    print("✅ Listen and arbitrate passed")
