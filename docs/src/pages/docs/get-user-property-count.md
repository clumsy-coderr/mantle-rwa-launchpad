---
title: getUserPropertyCount
description: Get the number of properties owned by a user
---

Get the total number of properties owned by a specific user.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const count = await client.getUserPropertyCount(userAddress)
console.log('User property count:', count.toString())
```

## Parameters

- `userAddress` (string) - User address to get property count for

## Returns

`Promise<bigint>` - Number of properties owned by the user

## Example Response

```typescript
2n
```

## Related

- [getUserProperties](/docs/get-user-properties) - Get all user properties
- [getUserPropertyByIndex](/docs/get-user-property-by-index) - Get property by index for user
