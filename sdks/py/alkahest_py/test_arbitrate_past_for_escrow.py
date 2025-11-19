#!/usr/bin/env python3
"""
NOTE: This test file is deprecated.
The escrow-specific oracle methods were removed in the simplified API.
Use test_arbitrate_past.py instead, which works with both escrows and other obligation types.
"""

import pytest

@pytest.mark.skip(reason="Escrow-specific oracle methods removed in simplified API")
async def test_arbitrate_past_for_escrow_sync():
    pass
