# alkahest-py

## usage

1. `pip install alkahest-py`

2. import the module and create an AlkahestClient instance

```python
from alkahest_py import AlkahestClient

client = AlkahestClient(
        "0xprivatekey",
        "https://rpc_url.com"
)

async def main():
    hash =  client.erc20.approve(
        {"address": "0x036CbD53842c5426634e7929541eC2318f3dCF7e", "value": 100},
        "escrow",
    )

    print(hash)

if __name__ == "__main__":
    asyncio.run(main())
```

3. for more extensive API docs, `git clone https://github.com/CoopHive/alkahest-py` and run `cargo doc --open`. most functions are in the submodules Erc20Client, Erc721Client etc. the [alkahest-rs docs](https://docs.rs/alkahest-rs/latest/alkahest_rs/) might be more useful than the alkahest-py docs, since many rust types get wrangled into python strings. FixedBytes<32> and Address are strings starting with "0x" in python, but Bytes is python bytes (b"..."). structs (ArbiterData, Erc20Data) are dictionaries with item names matching the struct's fields. ApprovalPurpose can be "escrow" or "payment".

note that ArbiterData ({"arbiter": "0x...", "demand": b"..."}) expects demand as abi encoded bytes. for arbiters that aren't explicitly supported, you'll have to manually encode the Solidity struct, e.g. with [eth_abi](https://eth-abi.readthedocs.io/en/latest/encoding.html). passing a dictionary matching the solidity struct's format isn't supported.

see alkahest_py/test.py for a usage example.
