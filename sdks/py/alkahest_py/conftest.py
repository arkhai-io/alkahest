"""
Pytest fixtures for Alkahest Python SDK tests.

These fixtures provide user-facing client instances that go through the same
initialization path as what real users would experience, ensuring tests catch
bugs in the actual SDK interface.
"""

import pytest
from alkahest_py import AlkahestClient, EnvTestManager


@pytest.fixture
def env():
    """
    Create a test environment with Anvil chain, deployed contracts, and test accounts.

    Returns:
        EnvTestManager: Test environment with addresses, private keys, and mock tokens.
    """
    return EnvTestManager()


@pytest.fixture
def alice_client(env):
    """
    Create an AlkahestClient for Alice using the user-facing constructor.

    This ensures tests exercise the same initialization path that real users hit,
    catching any bugs in the Python SDK client construction.

    Returns:
        AlkahestClient: A fully initialized client for Alice's account.
    """
    return AlkahestClient(
        private_key=env.alice_private_key,
        rpc_url=env.rpc_url,
        address_config=env.addresses,
    )


@pytest.fixture
def bob_client(env):
    """
    Create an AlkahestClient for Bob using the user-facing constructor.

    This ensures tests exercise the same initialization path that real users hit,
    catching any bugs in the Python SDK client construction.

    Returns:
        AlkahestClient: A fully initialized client for Bob's account.
    """
    return AlkahestClient(
        private_key=env.bob_private_key,
        rpc_url=env.rpc_url,
        address_config=env.addresses,
    )
