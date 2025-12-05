#!/bin/bash

# Fix all test files that use loadState in beforeEach hooks

# List of files that need the fix
files=(
  "tests/integration/offchain-oracle-identity.test.ts"
  "tests/integration/offchain-oracle-uptime.test.ts"
  "tests/unit/arbiters.test.ts"
  "tests/unit/client.test.ts"
  "tests/unit/stringObligation.test.ts"
  "tests/unit/attestation.test.ts"
  "tests/unit/erc1155.test.ts"
  "tests/unit/erc721.test.ts"
  "tests/unit/erc20.test.ts"
  "tests/unit/tokenBundle.test.ts"
  "tests/unit/websocket.test.ts"
  "tests/unit/generalArbiters.test.ts"
)

for file in "${files[@]}"; do
  echo "Processing $file..."

  # Check if file exists
  if [ ! -f "$file" ]; then
    echo "  File not found, skipping"
    continue
  fi

  # Check if file already imports resetTestEnvironment
  if grep -q "resetTestEnvironment" "$file"; then
    echo "  Already fixed, skipping"
    continue
  fi

  # Update import statement to add resetTestEnvironment
  sed -i '' 's/import { \(.*\)setupTestEnvironment, type TestContext, teardownTestEnvironment } from/import { \1resetTestEnvironment, setupTestEnvironment, type TestContext, teardownTestEnvironment } from/' "$file"

  # Replace the beforeEach block that uses loadState
  # This is a bit tricky because the block can span multiple lines
  # We'll use perl for multi-line replacement
  perl -i -0pe 's/beforeEach\(async \(\) => \{[^}]*if \(testContext\.anvilInitState\) \{[^}]*await testContext\.testClient\.loadState\(\{[^}]*state: testContext\.anvilInitState,[^}]*\}\);[^}]*\}[^}]*\}\);/beforeEach(async () => {\n  await resetTestEnvironment(testContext);\n});/gs' "$file"

  echo "  Done"
done

echo "All files processed"
