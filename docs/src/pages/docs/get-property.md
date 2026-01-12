---
title: getProperty
description: Get property address by index
---

Get property contract address by its index in the factory registry.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = await client.getProperty(0)
console.log('Property at index 0:', propertyAddress)
```

## Parameters

- `index` (bigint | number) - Index of the property to retrieve

## Returns

`Promise<string>` - Property contract address

## Example Response

```typescript
'0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

## Related

- [getAllProperties](/docs/get-all-properties) - Get all property addresses
- [getPropertyCount](/docs/get-property-count) - Get total number of properties
