---
title: getFactoryOwner
description: Get the owner of the factory contract
---

Get the owner address of the RWA factory contract.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const owner = await client.getFactoryOwner()
console.log('Factory owner:', owner)
```

## Returns

`Promise<string>` - Owner address of the factory contract

## Example Response

```typescript
'0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

## Notes

- The factory owner can deploy new property contracts
- Only the factory owner can update factory settings
- This is typically a multisig or governance address

## Related

- [getPropertyOwner](/docs/get-property-owner) - Get property contract owner
