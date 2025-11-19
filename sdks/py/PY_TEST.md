### Run pytest directly

> **Note:** To use the `-n auto` option for parallel execution, install pytest-xdist: `pip install pytest-xdist`

```bash
# Run all tests
pytest -v

# Run all tests in parallel (auto-detect CPU cores)
pytest -n auto -v

# Run specific test file
pytest alkahest_py/test_erc20_approval.py -v

# Run specific test file in parallel
pytest alkahest_py/test_erc20_approval.py -n auto -v

# Run tests with specific pattern
pytest -k "erc20" -v

# Run tests with specific pattern in parallel
pytest -k "erc20" -n auto -v

# Run tests excluding slow ones (if marked)
pytest -m "not slow" -v

# Run tests excluding slow ones in parallel
pytest -m "not slow" -n auto -v
```

### Run tests from any directory

```bash
cd /path/to/alkahest-py
python -m pytest alkahest_py/ -v

# Run tests from any directory in parallel
cd /path/to/alkahest-py
python -m pytest alkahest_py/ -n auto -v
```
