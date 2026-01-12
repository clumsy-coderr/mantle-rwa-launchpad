---
title: getAllProperties
description: Get all property addresses from the factory
---

Get all property addresses from the factory.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const properties = await client.getAllProperties()
console.log('All properties:', properties)
```

## Returns

`Promise<string[]>` - Array of property contract addresses

## Example Response

```typescript
[
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x8ba1f109551bD43280301264576176875f2E1Cd8',
  '0x3c44CdDdB6a900fa2b585dd299e03d12FA4293BC'
]
```

## Related

- [getPropertyCount](/docs/get-property-count) - Get total number of properties
- [getProperty](/docs/get-property) - Get property by index
