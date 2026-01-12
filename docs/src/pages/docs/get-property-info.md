---
title: getPropertyInfo
description: Get property information from factory registry
---

Get basic property information from the factory registry.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const info = await client.getPropertyInfo(propertyAddress)
console.log('Property info:', info)
```

## Parameters

- `propertyAddress` (string) - Property contract address

## Returns

`Promise<PropertyInfo>`

## PropertyInfo Type

```typescript
interface PropertyInfo {
  address: string    // Property contract address
  index: bigint      // Index in factory registry
  deployedAt: bigint // Block number when deployed
}
```

## Example Response

```typescript
{
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  index: 0n,
  deployedAt: 12345678n
}
```

## Related

- [getPropertyDetails](/docs/get-property-details) - Get detailed property information
