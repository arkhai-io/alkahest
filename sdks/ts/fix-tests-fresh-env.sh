#!/bin/bash

# Update all test files to use beforeEach with fresh environment

files=(
  "tests/integration/offchain-oracle-capitalization.test.ts"
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

  if [ ! -f "$file" ]; then
    echo "  File not found, skipping"
    continue
  fi

  # Replace beforeAll/afterAll with beforeEach/afterEach
  perl -i -pe 's/from "bun:test";/from "bun:test";/g' "$file"
  perl -i -pe 's/import \{ afterAll, beforeAll,/import { afterEach, beforeEach,/g' "$file"
  perl -i -pe 's/import \{ beforeAll,/import { beforeEach,/g' "$file"
  perl -i -pe 's/, afterAll \}/,afterEach }/g' "$file"

  # Replace beforeAll with beforeEach
  perl -i -pe 's/^beforeAll\(/beforeEach(/g' "$file"

  # Replace afterAll with afterEach
  perl -i -pe 's/^afterAll\(/afterEach(/g' "$file"

  # Remove any resetTestEnvironment calls or imports
  perl -i -pe 's/resetTestEnvironment, //g' "$file"
  perl -i -pe 's/, resetTestEnvironment//g' "$file"

  # Remove beforeEach with loadState pattern
  perl -i -0pe 's/beforeEach\(async \(\) => \{[^}]*if \(testContext\.anvilInitState\) \{[^}]*await testContext\.testClient\.loadState\([^)]*\);[^}]*\}[^}]*\}\);\n*//gs' "$file"

  echo "  Done"
done

echo "All files processed"
