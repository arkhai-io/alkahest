"""Integration tests for NLPArbiterCoprocessor.

Run against GenLayer Bradbury testnet:
    gltest tests/integration/ -v -s --network testnet_bradbury

Deployed addresses on GenLayer Bradbury:
    GenLayerNLPArbiter (Solidity): TBD (deploy via forge)
    NLPArbiterCoprocessor (GenLayer): 0xD5FB972C43d4E1cCf682307901627A98A13FC00F
    EAS: 0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98
"""

from gltest import get_contract_factory
from gltest.assertions import tx_execution_succeeded

# Deployed contract addresses on GenLayer Bradbury
COPROCESSOR_ADDRESS = "0xD5FB972C43d4E1cCf682307901627A98A13FC00F"
EAS_ADDRESS = "0xaC18Fa0DE3123215404a0C5f6d02ed9B2D0D0d98"
SOLIDITY_ARBITER_ADDRESS = "0x322ddf273DCc0405C2cD5fc01A0d6fb496740727"


def test_deploy_coprocessor():
    """Deploy the NLP arbiter coprocessor contract to testnet."""
    factory = get_contract_factory("nlp_arbiter")

    contract = factory.deploy(args=[SOLIDITY_ARBITER_ADDRESS, EAS_ADDRESS])
    assert contract is not None
    assert contract.address is not None
