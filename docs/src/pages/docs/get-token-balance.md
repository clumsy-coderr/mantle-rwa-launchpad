---
title: getTokenBalance
description: Get token balance for a specific user and property
---

Get the token balance for a specific user and property (ERC1155 balanceOf).

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

const balance = await client.getTokenBalance(propertyAddress, userAddress)
console.log('Token balance:', balance.toString())
```

## Parameters

- `propertyAddress` (string) - Property contract address
- `userAddress` (string) - User address to check balance for

## Returns

`Promise<bigint>` - Token balance (always 1 for PROPERTY_TOKEN_ID)

## Example Response

```typescript
1n
```

## Notes

- RWA properties use a single token ID (PROPERTY_TOKEN_ID = 1)
- Each property token represents fractional ownership
- Balance will be 1 if user owns the property, 0 otherwise

## Related

- [getBatchTokenBalances](/docs/get-batch-token-balances) - Get multiple balances at once
