---
title: supportsInterface
description: Check if a contract supports a specific interface
---

Check if a contract supports a specific interface (ERC165 supportsInterface).

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// ERC1155 interface ID
const ERC1155_INTERFACE_ID = '0xd9b67a26'

const supportsERC1155 = await client.supportsInterface(propertyAddress, ERC1155_INTERFACE_ID)
console.log('Supports ERC1155:', supportsERC1155)
```

## Parameters

- `propertyAddress` (string) - Contract address to check
- `interfaceId` (string) - Interface ID to check for (hex string)

## Returns

`Promise<boolean>` - True if contract supports the interface

## Common Interface IDs

- ERC165: `0x01ffc9a7`
- ERC1155: `0xd9b67a26`
- ERC1155Metadata: `0x0e89341c`
- Ownable: `0x7f5828d0` (custom)

## Example Response

```typescript
true
```

## Notes

- Uses ERC165 standard interface detection
- Useful for contract validation and feature detection
- All RWA property contracts support ERC1155 interface
