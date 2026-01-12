---
title: getUserProperties
description: Get all properties owned by a user
---

Get all property addresses owned by a specific user.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const properties = await client.getUserProperties(userAddress)
console.log('User properties:', properties)
```

## Parameters

- `userAddress` (string) - User address to get properties for

## Returns

`Promise<string[]>` - Array of property contract addresses owned by the user

## Example Response

```typescript
[
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x8ba1f109551bD43280301264576176875f2E1Cd8'
]
```

## Related

- [getUserPropertyCount](/docs/get-user-property-count) - Get count of user properties
- [getUserPropertyByIndex](/docs/get-user-property-by-index) - Get property by index for user
