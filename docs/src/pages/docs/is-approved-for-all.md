---
title: isApprovedForAll
description: Check if an operator is approved for all tokens of an account
---

Check if an operator is approved to manage all tokens of an account (ERC1155 isApprovedForAll).

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const account = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const operator = '0x8ba1f109551bD43280301264576176875f2E1Cd8'

const isApproved = await client.isApprovedForAll(propertyAddress, account, operator)
console.log('Is approved for all:', isApproved)
```

## Parameters

- `propertyAddress` (string) - Property contract address
- `account` (string) - Account address that granted approval
- `operator` (string) - Operator address to check approval for

## Returns

`Promise<boolean>` - True if operator is approved for all tokens

## Example Response

```typescript
true
```

## Notes

- This checks ERC1155 operator approval
- Operators can transfer tokens on behalf of the account
- Approval is required for marketplace transactions

## Related

- [ApprovalForAll Event](/docs/events-approval-for-all) - Listen to approval changes
