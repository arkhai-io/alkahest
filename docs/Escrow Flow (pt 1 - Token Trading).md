# Escrow Flow (pt 1 - Token Trading)

Here's the process for Alice to buy an ERC-721 token from Bob with her ERC-20 token:

1. Alice deposits her ERC-20 token into escrow via the ERC20EscrowObligation contract, demanding the ERC-721 token she wants
2. Bob sends the ERC-721 token to Alice via the ERC721PaymentObligation contract, receiving an EAS attestation that he did so
3. Bob uses the attestation to claim Alice's escrow

## Depositing escrow

First, make your demand with ERC721PaymentObligation.ObligationData.
**Solidity**

```solidity
// Encode the demand for the ERC-721 token Alice wants
bytes memory demand = abi.encode(
    ERC721PaymentObligation.ObligationData({
        token: 0x1234..., // ERC-721 token address
        tokenId: 42,      // Token ID Alice wants
        payee: alice      // Alice's address
    })
);
```

**Viem**

```typescript
import { encodeAbiParameters, parseAbiParameters } from "viem";

// Encode the demand for the ERC-721 token Alice wants
const demand = encodeAbiParameters(
  parseAbiParameters("(address token, uint256 tokenId, address payee)"),
  [
    {
      token: "0x1234...", // ERC-721 token address
      tokenId: 42n, // Token ID Alice wants
      payee: alice, // Alice's address
    },
  ],
);
```

**Alloy**

```rust
use alloy::sol_types::SolValue;

// Define the demand struct
let demand_data = contracts::ERC721PaymentObligation::ObligationData {
    token: token_address,
    tokenId: U256::from(42),
    payee: alice_address,
};

// Encode the demand
let demand = demand_data.abi_encode().into();
```

Then, approve the ERC20EscrowObligation contract to spend the token you're paying with, and deposit it into escrow using ERC20EscrowObligation.doObligation.
**Solidity**

```solidity
// Approve the escrow contract to spend Alice's ERC-20 tokens
IERC20(erc20Token).approve(address(erc20EscrowObligation), 1000 * 10**18);

// Deposit into escrow with the demand
bytes32 escrowUid = erc20EscrowObligation.doObligation(
    ERC20EscrowObligation.ObligationData({
        token: erc20Token,
        amount: 1000 * 10**18,
        arbiter: address(erc721PaymentObligation),
        demand: demand
    }),
    block.timestamp + 86400 // 24 hour expiration
);
```

**Viem**

```typescript
// Approve the escrow contract to spend Alice's ERC-20 tokens
await walletClient.writeContract({
  address: erc20Token,
  abi: erc20Abi,
  functionName: "approve",
  args: [erc20EscrowObligation, parseEther("1000")],
});

// Deposit into escrow with the demand
const hash = await walletClient.writeContract({
  address: erc20EscrowObligation,
  abi: erc20EscrowAbi,
  functionName: "doObligation",
  args: [
    {
      token: erc20Token,
      amount: parseEther("1000"),
      arbiter: erc721PaymentObligation,
      demand: demand,
    },
    BigInt(Math.floor(Date.now() / 1000) + 86400),
  ],
});
```

**Alloy**

```rust
// Approve the escrow contract to spend Alice's ERC-20 tokens
let token_contract = contracts::IERC20::new(token_address, &wallet_provider);
token_contract
    .approve(escrow_obligation_address, U256::from(1000e18))
    .send()
    .await?
    .get_receipt()
    .await?;

// Deposit into escrow with the demand
let escrow_contract = contracts::ERC20EscrowObligation::new(
    escrow_obligation_address,
    &wallet_provider
);
let receipt = escrow_contract
    .doObligation(
        contracts::ERC20EscrowObligation::ObligationData {
            token: token_address,
            amount: U256::from(1000e18),
            arbiter: payment_obligation_address,
            demand: demand,
        },
        expiration_time,
    )
    .send()
    .await?
    .get_receipt()
    .await?;
```

If you want to buy a different kind of token, use the ObligationData struct from the corresponding PaymentObligation contract instead (e.g. ERC20PaymentObligation for buying an ERC-20 token, or TokenBundlePaymentObligation for a bundle of many token types).
**Solidity**

```solidity
// Example: Demanding ERC-20 payment instead
bytes memory erc20Demand = abi.encode(
    ERC20PaymentObligation.ObligationData({
        token: 0x5678...,
        amount: 500 * 10**18,
        payee: alice
    })
);

// Example: Demanding a token bundle
bytes memory bundleDemand = abi.encode(
    TokenBundlePaymentObligation.ObligationData({
        erc20Tokens: [erc20_1, erc20_2],
        erc20Amounts: [100, 200],
        erc721Tokens: [erc721_1],
        erc721TokenIds: [1],
        erc1155Tokens: [erc1155_1],
        erc1155TokenIds: [10],
        erc1155Amounts: [5],
        payee: alice
    })
);
```

**Viem**

```typescript
// Example: Demanding ERC-20 payment instead
const erc20Demand = encodeAbiParameters(
  parseAbiParameters("(address token, uint256 amount, address payee)"),
  [
    {
      token: "0x5678...",
      amount: parseEther("500"),
      payee: alice,
    },
  ],
);

// Example: Demanding a token bundle
const bundleDemand = encodeAbiParameters(
  parseAbiParameters(
    "(address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address payee)",
  ),
  [
    {
      erc20Tokens: [erc20_1, erc20_2],
      erc20Amounts: [100n, 200n],
      erc721Tokens: [erc721_1],
      erc721TokenIds: [1n],
      erc1155Tokens: [erc1155_1],
      erc1155TokenIds: [10n],
      erc1155Amounts: [5n],
      payee: alice,
    },
  ],
);
```

**Alloy**

```rust
// Example: Demanding ERC-20 payment instead
let erc20_demand_data = contracts::ERC20PaymentObligation::ObligationData {
    token: token_address,
    amount: U256::from(500e18),
    payee: alice_address,
};
let erc20_demand = erc20_demand_data.abi_encode().into();

// Example: Demanding a token bundle
let bundle_demand_data = contracts::TokenBundlePaymentObligation2::ObligationData {
    erc20Tokens: vec![erc20_1, erc20_2],
    erc20Amounts: vec![U256::from(100), U256::from(200)],
    erc721Tokens: vec![erc721_1],
    erc721TokenIds: vec![U256::from(1)],
    erc1155Tokens: vec![erc1155_1],
    erc1155TokenIds: vec![U256::from(10)],
    erc1155Amounts: vec![U256::from(5)],
    payee: alice_address,
};
let bundle_demand = bundle_demand_data.abi_encode().into();
```

If you want to pay with a different kind of token, use the corresponding EscrowObligation contract instead when calling doObligation. Remember to approve the EscrowObligation contract to spend the token you're paying with (via setApprovalForAll for ERC-1155), and to approve all tokens in the bundle if you're using TokenBundleEscrowObligation.
**Solidity**

```solidity
// Example: Escrowing an ERC-721 token
IERC721(erc721Token).approve(address(erc721EscrowObligation), tokenId);
bytes32 escrowUid = erc721EscrowObligation.doObligation(
    ERC721EscrowObligation.ObligationData({
        token: erc721Token,
        tokenId: tokenId,
        arbiter: address(erc20PaymentObligation),
        demand: erc20Demand
    }),
    expirationTime
);

// Example: Escrowing ERC-1155 tokens
IERC1155(erc1155Token).setApprovalForAll(address(erc1155EscrowObligation), true);
bytes32 escrowUid = erc1155EscrowObligation.doObligation(
    ERC1155EscrowObligation.ObligationData({
        token: erc1155Token,
        tokenId: tokenId,
        amount: 10,
        arbiter: address(erc20PaymentObligation),
        demand: erc20Demand
    }),
    expirationTime
);
```

**Viem**

```typescript
// Example: Escrowing an ERC-721 token
await walletClient.writeContract({
  address: erc721Token,
  abi: erc721Abi,
  functionName: "approve",
  args: [erc721EscrowObligation, tokenId],
});
const hash = await walletClient.writeContract({
  address: erc721EscrowObligation,
  abi: erc721EscrowAbi,
  functionName: "doObligation",
  args: [
    {
      token: erc721Token,
      tokenId: tokenId,
      arbiter: erc20PaymentObligation,
      demand: erc20Demand,
    },
    expirationTime,
  ],
});

// Example: Escrowing ERC-1155 tokens
await walletClient.writeContract({
  address: erc1155Token,
  abi: erc1155Abi,
  functionName: "setApprovalForAll",
  args: [erc1155EscrowObligation, true],
});
```

**Alloy**

```rust
// Example: Escrowing an ERC-721 token
let erc721_contract = contracts::IERC721::new(erc721_address, &wallet_provider);
erc721_contract
    .approve(escrow_obligation_address, token_id)
    .send()
    .await?
    .get_receipt()
    .await?;

let escrow_contract = contracts::ERC721EscrowObligation::new(
    escrow_obligation_address,
    &wallet_provider
);
let receipt = escrow_contract
    .doObligation(
        contracts::ERC721EscrowObligation::ObligationData {
            token: erc721_address,
            tokenId: token_id,
            arbiter: payment_obligation_address,
            demand: erc20_demand,
        },
        expiration_time,
    )
    .send()
    .await?
    .get_receipt()
    .await?;

// Example: Escrowing ERC-1155 tokens
let erc1155_contract = contracts::IERC1155::new(erc1155_address, &wallet_provider);
erc1155_contract
    .setApprovalForAll(escrow_obligation_address, true)
    .send()
    .await?
    .get_receipt()
    .await?;
```

## Fulfilling and claiming escrow

You can fulfill demands for ERC-721 payments with ERC721PaymentObligation.doObligation. Remember to approve the contract to use your token first. Calling doObligation will return an attestation UID that you can use to claim the escrow.
**Solidity**

```solidity
// Bob approves the payment contract to transfer his ERC-721
IERC721(erc721Token).approve(address(erc721PaymentObligation), tokenId);

// Bob fulfills Alice's demand
bytes32 paymentUid = erc721PaymentObligation.doObligation(
    ERC721PaymentObligation.ObligationData({
        token: erc721Token,
        tokenId: tokenId,
        payee: alice
    })
);

// Bob claims Alice's escrow using both attestation UIDs
erc20EscrowObligation.collectEscrow(escrowUid, paymentUid);
```

**Viem**

```typescript
// Bob approves the payment contract to transfer his ERC-721
await walletClient.writeContract({
  address: erc721Token,
  abi: erc721Abi,
  functionName: "approve",
  args: [erc721PaymentObligation, tokenId],
});

// Bob fulfills Alice's demand
const paymentTx = await walletClient.writeContract({
  address: erc721PaymentObligation,
  abi: erc721PaymentAbi,
  functionName: "doObligation",
  args: [
    {
      token: erc721Token,
      tokenId: tokenId,
      payee: alice,
    },
  ],
});
const paymentReceipt = await publicClient.waitForTransactionReceipt({
  hash: paymentTx,
});
const paymentUid = getAttestedEventFromReceipt(paymentReceipt).uid;

// Bob claims Alice's escrow using both attestation UIDs
await walletClient.writeContract({
  address: erc20EscrowObligation,
  abi: erc20EscrowAbi,
  functionName: "collectEscrow",
  args: [escrowUid, paymentUid],
});
```

**Alloy**

```rust
// Bob approves the payment contract to transfer his ERC-721
let erc721_contract = contracts::IERC721::new(erc721_address, &wallet_provider);
erc721_contract
    .approve(payment_obligation_address, token_id)
    .send()
    .await?
    .get_receipt()
    .await?;

// Bob fulfills Alice's demand
let payment_contract = contracts::ERC721PaymentObligation::new(
    payment_obligation_address,
    &wallet_provider
);
let payment_receipt = payment_contract
    .doObligation(contracts::ERC721PaymentObligation::ObligationData {
        token: erc721_address,
        tokenId: token_id,
        payee: alice_address,
    })
    .send()
    .await?
    .get_receipt()
    .await?;
let payment_uid = get_attested_event(payment_receipt)?.uid;

// Bob claims Alice's escrow using both attestation UIDs
let escrow_contract = contracts::ERC20EscrowObligation::new(
    escrow_obligation_address,
    &wallet_provider
);
escrow_contract
    .collectEscrow(escrow_uid, payment_uid)
    .send()
    .await?
    .get_receipt()
    .await?;
```

Use the corresponding PaymentObligation contract to fulfill demands for other tokens.
**Solidity**

```solidity
// Example: Fulfilling ERC-20 payment demand
IERC20(erc20Token).approve(address(erc20PaymentObligation), amount);
bytes32 paymentUid = erc20PaymentObligation.doObligation(
    ERC20PaymentObligation.ObligationData({
        token: erc20Token,
        amount: amount,
        payee: alice
    })
);

// Example: Fulfilling token bundle payment demand
// Approve all tokens in the bundle first
for (uint i = 0; i < erc20Tokens.length; i++) {
    IERC20(erc20Tokens[i]).approve(address(bundlePaymentObligation), erc20Amounts[i]);
}
for (uint i = 0; i < erc721Tokens.length; i++) {
    IERC721(erc721Tokens[i]).approve(address(bundlePaymentObligation), erc721TokenIds[i]);
}
// ... then fulfill
bytes32 paymentUid = bundlePaymentObligation.doObligation(bundleData);
```

**Viem**

```typescript
// Example: Fulfilling ERC-20 payment demand
await walletClient.writeContract({
  address: erc20Token,
  abi: erc20Abi,
  functionName: "approve",
  args: [erc20PaymentObligation, amount],
});
const paymentTx = await walletClient.writeContract({
  address: erc20PaymentObligation,
  abi: erc20PaymentAbi,
  functionName: "doObligation",
  args: [
    {
      token: erc20Token,
      amount: amount,
      payee: alice,
    },
  ],
});

// Example: Fulfilling token bundle payment demand
// Approve all tokens in the bundle first
for (const token of bundleData.erc20Tokens) {
  await walletClient.writeContract({
    address: token.address,
    abi: erc20Abi,
    functionName: "approve",
    args: [bundlePaymentObligation, token.amount],
  });
}
// ... similar for ERC-721 and ERC-1155 tokens
```

**Alloy**

```rust
// Example: Fulfilling ERC-20 payment demand
let erc20_contract = contracts::IERC20::new(erc20_address, &wallet_provider);
erc20_contract
    .approve(payment_obligation_address, amount)
    .send()
    .await?
    .get_receipt()
    .await?;

let payment_contract = contracts::ERC20PaymentObligation::new(
    payment_obligation_address,
    &wallet_provider
);
let payment_receipt = payment_contract
    .doObligation(contracts::ERC20PaymentObligation::ObligationData {
        token: erc20_address,
        amount: amount,
        payee: alice_address,
    })
    .send()
    .await?
    .get_receipt()
    .await?;

// Example: Fulfilling token bundle payment demand
// Approve all tokens in the bundle first
for erc20_token in &bundle_data.erc20s {
    let erc20_contract = contracts::IERC20::new(erc20_token.address, &wallet_provider);
    erc20_contract
        .approve(payment_obligation_address, erc20_token.value)
        .send()
        .await?
        .get_receipt()
        .await?;
}
// ... similar for ERC-721 and ERC-1155 tokens
```

## Reclaiming expired escrow

You can reclaim your escrow if nobody fulfills it before it expires.
**Solidity**

```solidity
// Alice reclaims her expired escrow
erc20EscrowObligation.reclaimExpired(escrowUid);
```

**Viem**

```typescript
// Alice reclaims her expired escrow
await walletClient.writeContract({
  address: erc20EscrowObligation,
  abi: erc20EscrowAbi,
  functionName: "reclaimExpired",
  args: [escrowUid],
});
```

**Alloy**

```rust
// Alice reclaims her expired escrow
let escrow_contract = contracts::ERC20EscrowObligation::new(
    escrow_obligation_address,
    &wallet_provider
);
escrow_contract
    .reclaimExpired(escrow_uid)
    .send()
    .await?
    .get_receipt()
    .await?;
```

## Utility contracts and SDK functions

There are utility contracts that provide a convenient interface for doing token trades atomically, and SDKs in TypeScript, Rust, and Python that wrap these. The SDKs additionally have functions that generate ERC-20 permits to enable easy approval and escrow/payment in one transaction.

The functions to escrow one type of token, demanding any other type (buyYforX), and to fulfill any type of escrow demanding that token type (payXforY), are available in \[TokenType]BarterUtils.sol, or the corresponding barter module of each SDK (e.g. `client.erc20.barter`, `client.tokenBundle.barter`...). Available token types are native tokens (ETH), ERC-20, ERC-721, ERC-1155, and bundles of all of these together.

For ERC-20 tokens, `permit_and_*` functions combine approval and action in a single gasless step. For escrow and payment modules, `approve_and_create` and `approve_and_pay` functions combine approval and action in two transactions but a single SDK call.
**Solidity**

```solidity
// Alice: Create escrow offering ERC-20 for ERC-721 using barter utils
IERC20(usdcToken).approve(address(erc20BarterUtils), 1000e6);
bytes32 escrowUid = erc20BarterUtils.buyErc721WithErc20(
    usdcToken,      // bid token
    1000e6,         // bid amount
    erc721Token,    // ask token
    42,             // ask token ID
    expiration
);

// Bob: Fulfill escrow offering ERC-721 for ERC-20
IERC721(erc721Token).approve(address(erc721BarterUtils), 42);
bytes32 paymentUid = erc721BarterUtils.payErc721ForErc20(escrowUid);

// Or use permit for gasless approval (ERC-20 only)
bytes32 escrowUid = erc20BarterUtils.permitAndBuyErc721WithErc20(
    usdcToken, 1000e6, erc721Token, 42, expiration,
    deadline, v, r, s  // permit signature
);
```

**TypeScript**

```typescript
// Alice: Create escrow offering ERC-20 for ERC-721 (using permit for gasless approval)
const { hash, attested } = await aliceClient.erc20.barter.permitAndBuyErc721WithErc20(
  { address: usdcToken, value: 1000000000n }, // bid
  { address: erc721Token, id: 42n }, // ask
  0n, // no expiration
);

// Bob: Approve and fulfill escrow offering ERC-721 for ERC-20
await bobClient.erc721.util.approve({ address: erc721Token, id: 42n }, "barter");
const payment = await bobClient.erc721.barter.payErc721ForErc20(attested.uid);

// Can also use direct escrow/payment for custom demands (approveAndCreate combines both steps)
const escrow = await aliceClient.erc20.escrow.nonTierable.approveAndCreate(
  { address: usdcToken, value: 1000000000n },
  { arbiter: customArbiter, demand: customDemand },
  0n,
);
```

**Rust**

```rust
// Alice: Create escrow offering ERC-20 for ERC-721 (using permit for gasless approval)
let bid = Erc20Data {
    address: usdc_token,
    value: U256::from(1000000000),
};
let ask = Erc721Data {
    address: erc721_token,
    id: U256::from(42),
};

let escrow_receipt = alice_client
    .erc20()
    .barter()
    .permit_and_buy_erc721_for_erc20(&bid, &ask, 0)
    .await?;
let escrow_uid = DefaultAlkahestClient::get_attested_event(escrow_receipt)?.uid;

// Bob: Approve and fulfill escrow offering ERC-721 for ERC-20
bob_client.erc721().approve(&ask, ApprovalPurpose::BarterUtils).await?;
let payment_receipt = bob_client
    .erc721()
    .barter()
    .pay_erc721_for_erc20(escrow_uid)
    .await?;

// Can also use direct escrow/payment for custom demands (approve_and_create combines both steps)
let escrow_receipt = alice_client
    .erc20()
    .escrow()
    .non_tierable()
    .approve_and_create(
        &bid,
        &ArbiterData {
            arbiter: custom_arbiter,
            demand: custom_demand,
        },
        0,
    )
    .await?;
```

**Python**

```python
# Alice: Create escrow offering ERC-20 for ERC-721 (using permit for gasless approval)
bid = {"address": usdc_token, "value": 1000000000}
ask = {"address": erc721_token, "id": 42}

escrow = await alice_client.erc20.barter.permit_and_buy_erc721_for_erc20(bid, ask, 0)

# Bob: Approve and fulfill escrow offering ERC-721 for ERC-20
await bob_client.erc721.util.approve(ask, "barter")
payment = await bob_client.erc721.barter.pay_erc721_for_erc20(escrow["log"]["uid"])

# Example of a complete ERC20-for-ERC20 trade using permit functions
bid = {"address": usdc_token, "value": 1000}
ask = {"address": eurc_token, "value": 900}

# Alice creates escrow (permit handles approval)
escrow = await alice_client.erc20.barter.permit_and_buy_erc20_for_erc20(bid, ask, 0)

# Bob fulfills escrow (permit handles approval)
payment = await bob_client.erc20.barter.permit_and_pay_erc20_for_erc20(escrow["log"]["uid"])

# Can also use direct escrow/payment for custom demands (approve_and_create combines both steps)
escrow = await alice_client.erc20.escrow.non_tierable.approve_and_create(
    {"address": usdc_token, "value": 1000000000},
    {"arbiter": custom_arbiter, "demand": custom_demand},
    0
)
```
