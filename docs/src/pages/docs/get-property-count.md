---
title: getPropertyCount
description: Get total number of properties
---

Get total number of properties deployed by the factory.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const count = await client.getPropertyCount()
console.log('Total properties:', count.toString())
```

## Returns

`Promise<bigint>` - Total number of properties

## Example Response

```typescript
3n
```

## Related

- [getAllProperties](/docs/get-all-properties) - Get all property addresses
- [getProperty](/docs/get-property) - Get property by index
