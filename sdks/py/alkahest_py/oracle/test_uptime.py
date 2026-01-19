"""
Test asynchronous offchain oracle uptime monitoring flow (simplified)
"""
import pytest
import json
import time
from dataclasses import dataclass
from alkahest_py import (
    EnvTestManager,
    MockERC20,
    TrustedOracleArbiterDemandData,
    ArbitrationMode,
)

@dataclass
class UptimeDemand:
    service_url: str
    min_uptime: float
    start: int
    end: int
    check_interval_secs: int

@pytest.mark.asyncio
async def test_asynchronous_offchain_oracle_uptime_flow(env, alice_client, bob_client):
    """
    Test an asynchronous offchain oracle that monitors service uptime
    Alice escrows payment for uptime monitoring service.
    Bob claims to provide the service at a URL.
    Charlie monitors the service asynchronously and arbitrates.
    Bob collects payment if uptime meets the threshold.
    """

    # Simplification: Bob acts as the oracle
    oracle_address = env.bob
    oracle_client = bob_client

    # Step 1: Alice escrows ERC20 with uptime demand
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 100)

    now = int(time.time())
    demand_payload = UptimeDemand(
        service_url="https://uptime.hyperspace",
        min_uptime=0.75,
        start=now,
        end=now + 10,
        check_interval_secs=2
    )

    # The inner data field (JSON payload) - this is what gets passed to arbitrate()
    inner_demand_data = json.dumps({
        "service_url": demand_payload.service_url,
        "min_uptime": demand_payload.min_uptime,
        "start": demand_payload.start,
        "end": demand_payload.end,
        "check_interval_secs": demand_payload.check_interval_secs
    }).encode('utf-8')

    # The full encoded DemandData - this is what gets stored in the escrow
    demand_data = TrustedOracleArbiterDemandData(oracle_address, inner_demand_data)
    demand_bytes = demand_data.encode_self()

    arbiter = {
        "arbiter": env.addresses.arbiters_addresses.trusted_oracle_arbiter,
        "demand": demand_bytes
    }

    price = {"address": env.mock_addresses.erc20_a, "value": 100}
    expiration = now + 3600

    escrow_receipt = await alice_client.erc20.escrow.non_tierable.permit_and_create(
        price, arbiter, expiration
    )
    escrow_uid = escrow_receipt['log']['uid']

    # Step 2: Bob submits the service URL as fulfillment
    service_url = demand_payload.service_url
    fulfillment_uid = await bob_client.string_obligation.do_obligation(
        service_url,
        escrow_uid
    )

    # Step 3: Request arbitration with inner demand data (not the full encoded DemandData)
    # because TrustedOracleArbiter.checkObligation() uses only demand_.data for the decisionKey
    await bob_client.oracle.request_arbitration(fulfillment_uid, oracle_address, inner_demand_data)

    # Step 4: Oracle arbitrates using simulated uptime monitoring
    async def decision_function(attestation, demand):
        """Simulate uptime monitoring and decide if service meets SLA"""
        try:
            # Extract service URL from fulfillment
            statement = oracle_client.oracle.extract_obligation_data(attestation)

            # Parse demand directly from callback argument (no need to fetch from escrow!)
            demand_json = json.loads(bytes(demand).decode('utf-8'))

            # Verify URL matches
            if statement != demand_json['service_url']:
                return False

            # Simulate uptime checks using demand
            total_span = max(demand_json['end'] - demand_json['start'], 1)
            interval = max(demand_json['check_interval_secs'], 1)
            checks = max(total_span // interval, 1)

            # Simulate checks: fail one check (index 1)
            successes = checks - 1  # One failure
            uptime = successes / checks

            # Decide based on minimum uptime requirement
            return uptime >= demand_json['min_uptime']

        except Exception:
            return False

    def callback(decision):
        pass

    # Arbitrate with AllUnarbitrated mode
    decisions = await oracle_client.oracle.arbitrate_many(
        decision_function,
        callback,
        ArbitrationMode.AllUnarbitrated,
        timeout_seconds=2.0
    )

    # Verify decision
    assert len(decisions) >= 1, "Expected at least 1 decision"
    assert decisions[0].decision == True, "Expected uptime check to pass"

    # Step 5: Bob collects the escrowed payment
    await bob_client.erc20.escrow.non_tierable.collect(escrow_uid, fulfillment_uid)

    print("Asynchronous offchain oracle uptime test passed")
