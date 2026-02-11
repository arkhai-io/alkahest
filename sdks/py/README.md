# alkahest-py

Python SDK for [Alkahest](https://github.com/arkhai-io/alkahest), a library and ecosystem of contracts for conditional peer-to-peer escrow. This is a PyO3 wrapper around the [Rust SDK](../rs/), providing Python bindings for all Alkahest functionality.

## Installation

```bash
pip install alkahest-py
```

## Usage

```python
import asyncio
from alkahest_py import AlkahestClient

client = AlkahestClient(
    "0xYOUR_PRIVATE_KEY",
    "https://your-rpc-url.com",
)

async def main():
    # Approve the barter utils contract to spend tokens
    tx_hash = await client.erc20.util.approve(
        {"address": "0x036CbD53842c5426634e7929541eC2318f3dCF7e", "value": 100},
        "barter",
    )
    print(tx_hash)

    # Create an escrow: deposit 100 token A, demanding 200 token B
    escrow = await client.erc20.barter.buy_erc20_for_erc20(
        {"address": "0x...", "value": 100},  # bid
        {"address": "0x...", "value": 200},  # ask
        0,  # no expiration
    )
    print(escrow["log"]["uid"])

asyncio.run(main())
```

Defaults to Base Sepolia addresses. Pass a custom `DefaultExtensionConfig` as the third argument for other networks (e.g., Filecoin Calibration).

## API Notes

The Python SDK wraps the Rust SDK via PyO3. Some type conventions differ from Rust:

- `FixedBytes<32>` and `Address` are Python strings starting with `"0x"`
- `Bytes` is Python `bytes` (e.g., `b"..."`)
- Structs like `ArbiterData` and `Erc20Data` are dictionaries with field names matching the Rust struct (e.g., `{"arbiter": "0x...", "demand": b"..."}`)
- `ApprovalPurpose` is a string: `"escrow"`, `"payment"`, or `"barter"`

For arbiter demands not explicitly supported by the SDK, you'll need to manually ABI-encode the Solidity struct, e.g. with [eth_abi](https://eth-abi.readthedocs.io/en/latest/encoding.html).

## API Reference

Since this is a PyO3 wrapper, the most detailed API documentation is in the [Rust SDK docs](https://docs.rs/alkahest-rs/latest/alkahest_rs/). For Python-specific patterns, see the test files in `alkahest_py/` (e.g., `alkahest_py/erc20/test_buy_erc20_for_erc20.py`).

See the [docs](../../docs/) for guides on escrow flows, composing arbiters, and building oracle validators.
