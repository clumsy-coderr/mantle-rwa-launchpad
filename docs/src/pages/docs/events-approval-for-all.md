---
title: ApprovalForAll Event
description: Listen to ApprovalForAll events for operator approvals
---

# ApprovalForAll Event

The `ApprovalForAll` event is emitted by RWAProperty contracts (ERC1155) when an operator is approved or revoked for all tokens owned by an account.

## Event Signature

```solidity
event ApprovalForAll(
    address indexed account,
    address indexed operator,
    bool approved
)
```

## Parameters

- `account` (address, indexed) - Token owner address
- `operator` (address, indexed) - Operator address being approved or revoked
- `approved` (bool) - Whether the operator is approved (`true`) or revoked (`false`)

## Listening to Events

### Using ethers.js

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// ERC1155 ApprovalForAll event ABI
const propertyABI = [
  'event ApprovalForAll(address indexed account, address indexed operator, bool approved)'
]

const property = new ethers.Contract(propertyAddress, propertyABI, provider)

// Listen for approval changes
property.on('ApprovalForAll', (account, operator, approved) => {
  if (approved) {
    console.log(`✅ ${account} approved ${operator} as operator`)
  } else {
    console.log(`❌ ${account} revoked approval for ${operator}`)
  }
})
```

### Query Past Events

```typescript
// Get all approval events
const filter = property.filters.ApprovalForAll()
const events = await property.queryFilter(filter, fromBlock, toBlock)

events.forEach((event) => {
  const { account, operator, approved } = event.args
  console.log('Approval:', {
    account,
    operator,
    approved: approved ? 'Approved' : 'Revoked'
  })
})
```

### Filter by Account

```typescript
// Listen for approvals for a specific account
const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

property.on('ApprovalForAll', (account, operator, approved) => {
  if (account.toLowerCase() === userAddress.toLowerCase()) {
    console.log(`User ${account} ${approved ? 'approved' : 'revoked'} ${operator}`)
  }
})
```

### Filter by Operator

```typescript
// Listen for approvals for a specific operator (e.g., marketplace)
const marketplaceAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

property.on('ApprovalForAll', (account, operator, approved) => {
  if (operator.toLowerCase() === marketplaceAddress.toLowerCase()) {
    console.log(`Marketplace ${approved ? 'approved' : 'revoked'} by ${account}`)
  }
})
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToApprovals() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  
  const propertyABI = [
    'event ApprovalForAll(address indexed account, address indexed operator, bool approved)'
  ]
  
  const property = new ethers.Contract(propertyAddress, propertyABI, provider)
  
  // Listen for approval changes
  property.on('ApprovalForAll', async (account, operator, approved) => {
    console.log('🔐 Approval Changed')
    console.log('Account:', account)
    console.log('Operator:', operator)
    console.log('Status:', approved ? 'Approved' : 'Revoked')
    
    // Verify approval status using SDK
    const isApproved = await rwa.isApprovedForAll(
      propertyAddress,
      account,
      operator,
      provider
    )
    console.log('Verified approval status:', isApproved)
  })
  
  console.log('👂 Listening for ApprovalForAll events...')
}
```

## Use Cases

- **Marketplace Integration**: Track when users approve marketplaces to trade their tokens
- **Security Monitoring**: Monitor approval changes for security purposes
- **User Dashboards**: Show users their current operator approvals
- **Analytics**: Track approval patterns and operator usage

## Understanding Approvals

When `approved` is `true`:
- The operator can transfer any tokens owned by the account
- The operator can approve other operators on behalf of the account
- Useful for marketplaces, DEXs, or other services

When `approved` is `false`:
- The operator's approval is revoked
- The operator can no longer transfer tokens on behalf of the account

## Related

- [TransferSingle Event](/docs/events-transfer-single) - Token transfer events
- [TransferBatch Event](/docs/events-transfer-batch) - Batch transfer events
- [API Reference - Events](/docs/api-reference#events) - Complete events documentation
- [Property Operations](/docs/property-operations) - Learn how to manage approvals

