"""
Test synchronous offchain oracle capitalization flow
"""
import pytest
import json
import subprocess
import time
from dataclasses import dataclass
from typing import List
from alkahest_py import (
    EnvTestManager,
    MockERC20,
    TrustedOracleArbiterDemandData,
    ArbitrateOptions,
    AlkahestClient,
)


@dataclass
class ShellTestCase:
    input: str
    output: str


@dataclass
class ShellOracleDemand:
    description: str
    test_cases: List[ShellTestCase]


@pytest.mark.asyncio
async def test_synchronous_offchain_oracle_capitalization_flow():
    """
    Test a synchronous offchain oracle that verifies shell commands
    Alice escrows ERC20 collateral guarded by Charlie's oracle.
    Bob submits a bash pipeline fulfillment that capitalizes input.
    Charlie evaluates and arbitrates the fulfillment.
    Bob collects the escrowed payment upon successful arbitration.
    """
    env = EnvTestManager()

    # Bob acts as the oracle for this test
    oracle_address = env.bob
    oracle_client = env.bob_client

    # Step 1: Alice escrows ERC20 collateral guarded by Charlie's oracle suite
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)
    mock_erc20.transfer(env.alice, 100)

    demand_payload = ShellOracleDemand(
        description="Capitalize stdin",
        test_cases=[
            ShellTestCase(input="alice", output="ALICE"),
            ShellTestCase(input="bob builder", output="BOB BUILDER"),
        ]
    )

    # Encode the demand for TrustedOracleArbiter
    demand_data = TrustedOracleArbiterDemandData(
        oracle_address,
        json.dumps({
            "description": demand_payload.description,
            "test_cases": [
                {"input": tc.input, "output": tc.output}
                for tc in demand_payload.test_cases
            ]
        }).encode('utf-8')
    )
    demand_bytes = demand_data.encode_self()

    arbiter = {
        "arbiter": env.addresses.arbiters_addresses.trusted_oracle_arbiter,
        "demand": demand_bytes
    }

    price = {"address": env.mock_addresses.erc20_a, "value": 100}
    expiration = int(time.time()) + 3600

    escrow_receipt = await env.alice_client.erc20.permit_and_buy_with_erc20(
        price, arbiter, expiration
    )
    escrow_uid = escrow_receipt['log']['uid']

    # Step 2: Bob submits a bash pipeline fulfillment
    fulfillment_uid = await env.bob_client.string_obligation.do_obligation(
        "tr '[:lower:]' '[:upper:]'",
        escrow_uid
    )

    # Step 3: Bob asks the oracle to arbitrate his fulfillment
    await env.bob_client.oracle.request_arbitration(fulfillment_uid, oracle_address)

    # Step 4: Oracle evaluates with async decision function
    async def decision_function(attestation):
        """Evaluate whether the fulfillment meets the demand requirements"""
        # Extract the obligation data (the bash command)
        try:
            statement = oracle_client.oracle.extract_obligation_data(attestation)
        except Exception as e:
            print(f"Failed to extract obligation: {e}")
            return False

        # Fetch escrow attestation from blockchain (async!)
        try:
            escrow_attestation = await oracle_client.get_escrow_attestation(attestation)
            demand_data_obj = oracle_client.oracle.extract_demand_data(escrow_attestation)
            # Parse the JSON demand payload
            demand_json = json.loads(demand_data_obj.data.decode('utf-8'))
        except Exception as e:
            print(f"Failed to fetch/extract demand: {e}")
            return False

        # Run the test cases from the fetched demand
        for case in demand_json['test_cases']:
            command = f'echo "$INPUT" | {statement}'
            try:
                result = subprocess.run(
                    ["bash", "-c", command],
                    env={"INPUT": case['input']},
                    capture_output=True,
                    text=True,
                    timeout=5
                )
                if result.returncode != 0:
                    return False
                output = result.stdout.rstrip('\n')
                if output != case['output']:
                    return False
            except Exception:
                return False

        return True

    def callback(decision):
        """Called when arbitration completes"""
        pass

    # Listen and arbitrate
    options = ArbitrateOptions(skip_arbitrated=False, only_new=False)
    result = await oracle_client.oracle.listen_and_arbitrate_no_spawn(
        decision_function,
        callback,
        options,
        timeout_seconds=2.0
    )

    # Verify all decisions were approved
    assert len(result.decisions) == 1, f"Expected 1 decision, got {len(result.decisions)}"
    assert all(d.decision for d in result.decisions), "Oracle rejected fulfillment"

    # Step 5: The successful arbitration lets Bob claim the escrowed payment
    await env.bob_client.erc20.collect_escrow(escrow_uid, fulfillment_uid)

    print("✅ Synchronous offchain oracle capitalization test passed")
