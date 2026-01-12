---
title: getUserPropertyByIndex
description: Get a user's property by index
---

Get a specific property owned by a user by its index.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const propertyAddress = await client.getUserPropertyByIndex(userAddress, 0)
console.log('First user property:', propertyAddress)
```

## Parameters

- `userAddress` (string) - User address
- `index` (bigint | number) - Index of the property in user's collection

## Returns

`Promise<string>` - Property contract address

## Example Response

```typescript
'0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

## Related

- [getUserProperties](/docs/get-user-properties) - Get all user properties
- [getUserPropertyCount](/docs/get-user-property-count) - Get count of user properties
