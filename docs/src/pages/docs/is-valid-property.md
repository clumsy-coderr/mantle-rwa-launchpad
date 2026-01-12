---
title: isValidProperty
description: Check if an address is a valid property contract
---

Check if an address is a valid property contract deployed by the factory.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const isValid = await client.isValidProperty(propertyAddress)
console.log('Is valid property:', isValid)
```

## Parameters

- `propertyAddress` (string) - Address to validate

## Returns

`Promise<boolean>` - True if address is a valid property contract

## Example Response

```typescript
true
```

## Notes

- Validates that the address was deployed by the factory
- Checks if the contract implements the required interfaces
- Useful for input validation and security checks
