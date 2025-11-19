#!/usr/bin/env python3
"""
NOTE: This test file is deprecated.
The escrow-specific oracle methods were removed in the simplified API.
Use test_listen_and_arbitrate_no_spawn.py instead.
"""

import pytest

@pytest.mark.skip(reason="Escrow-specific oracle methods removed in simplified API")
async def test_listen_and_arbitrate_for_escrow_no_spawn():
    pass
