---
title: getBatchTokenBalances
description: Get multiple token balances in a single call
---

Get token balances for multiple accounts and token IDs in a single batch call (ERC1155 balanceOfBatch).

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const accounts = [
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x8ba1f109551bD43280301264576176875f2E1Cd8'
]
const tokenIds = [1, 1] // PROPERTY_TOKEN_ID = 1

const balances = await client.getBatchTokenBalances(propertyAddress, accounts, tokenIds)
console.log('Batch balances:', balances.map(b => b.toString()))
```

## Parameters

- `propertyAddress` (string) - Property contract address
- `accounts` (string[]) - Array of account addresses
- `tokenIds` (bigint[] | number[]) - Array of token IDs (use 1 for PROPERTY_TOKEN_ID)

## Returns

`Promise<bigint[]>` - Array of token balances

## Example Response

```typescript
[1n, 0n]
```

## Notes

- More efficient than multiple individual balanceOf calls
- Accounts and tokenIds arrays must be the same length
- For RWA properties, always use token ID 1

## Related

- [getTokenBalance](/docs/get-token-balance) - Get single token balance
