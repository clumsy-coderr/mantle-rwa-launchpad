---
title: TransferBatch Event
description: Listen to TransferBatch events for batch token transfers
---

# TransferBatch Event

The `TransferBatch` event is emitted by RWAProperty contracts (ERC1155) when multiple token types are transferred in a single batch operation.

## Event Signature

```solidity
event TransferBatch(
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256[] ids,
    uint256[] values
)
```

## Parameters

- `operator` (address, indexed) - Address that performed the transfer
- `from` (address, indexed) - Address tokens were transferred from
- `to` (address, indexed) - Address tokens were transferred to
- `ids` (uint256[]) - Array of token IDs being transferred
- `values` (uint256[]) - Array of amounts transferred (corresponds to ids array)

## Listening to Events

### Using ethers.js

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// ERC1155 TransferBatch event ABI
const propertyABI = [
  'event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)'
]

const property = new ethers.Contract(propertyAddress, propertyABI, provider)

// Listen for batch transfers
property.on('TransferBatch', (operator, from, to, ids, values) => {
  console.log('📦 Batch Transfer:')
  console.log('Operator:', operator)
  console.log('From:', from)
  console.log('To:', to)
  console.log('Token IDs:', ids.map(id => id.toString()))
  console.log('Amounts:', values.map(v => v.toString()))
})
```

### Query Past Events

```typescript
// Get all batch transfer events
const filter = property.filters.TransferBatch()
const events = await property.queryFilter(filter, fromBlock, toBlock)

events.forEach((event) => {
  const { operator, from, to, ids, values } = event.args
  console.log('Batch Transfer:', {
    operator,
    from,
    to,
    tokenIds: ids.map(id => id.toString()),
    amounts: values.map(v => v.toString())
  })
})
```

### Process Batch Data

```typescript
property.on('TransferBatch', (operator, from, to, ids, values) => {
  // Process each token in the batch
  for (let i = 0; i < ids.length; i++) {
    const tokenId = ids[i].toString()
    const amount = values[i].toString()
    console.log(`Token ${tokenId}: ${amount} tokens transferred`)
  }
})
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToBatchTransfers() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  
  const propertyABI = [
    'event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)'
  ]
  
  const property = new ethers.Contract(propertyAddress, propertyABI, provider)
  
  // Listen for batch transfers
  property.on('TransferBatch', async (operator, from, to, ids, values) => {
    console.log('📦 Batch Transfer Detected')
    console.log('From:', from)
    console.log('To:', to)
    
    // Process each token in the batch
    const totalAmount = values.reduce((sum, val) => sum + val, 0n)
    console.log(`Total tokens transferred: ${totalAmount.toString()}`)
    
    // Get updated balances
    const balances = await rwa.getBatchTokenBalances(
      propertyAddress,
      [from, to],
      ids.map(() => 1), // PROPERTY_TOKEN_ID
      provider
    )
    
    console.log('From balance:', balances[0].toString())
    console.log('To balance:', balances[1].toString())
  })
  
  console.log('👂 Listening for TransferBatch events...')
}
```

## Use Cases

- **Batch Operations Tracking**: Monitor when multiple tokens are transferred together
- **Efficiency Analysis**: Track batch operations for gas optimization insights
- **Marketplace Integration**: Handle batch listings and transfers
- **Analytics**: Analyze batch transfer patterns

## Difference from TransferSingle

- **TransferSingle**: One token type, one amount
- **TransferBatch**: Multiple token types, multiple amounts in one transaction

Both events can be emitted by the same contract, but `TransferBatch` is used when `safeBatchTransferFrom` is called.

## Related

- [TransferSingle Event](/docs/events-transfer-single) - Single token transfer events
- [ApprovalForAll Event](/docs/events-approval-for-all) - Operator approval events
- [API Reference - Events](/docs/api-reference#events) - Complete events documentation
- [Property Operations](/docs/property-operations) - Learn how to batch transfer tokens

