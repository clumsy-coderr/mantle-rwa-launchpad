---
title: getPropertyOwner
description: Get the owner of a property contract
---

Get the owner address of a property contract (Ownable contract owner).

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const owner = await client.getPropertyOwner(propertyAddress)
console.log('Property owner:', owner)
```

## Parameters

- `propertyAddress` (string) - Property contract address

## Returns

`Promise<string>` - Owner address of the property contract

## Example Response

```typescript
'0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

## Related

- [getFactoryOwner](/docs/get-factory-owner) - Get factory contract owner
