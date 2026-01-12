---
title: TransferSingle Event
description: Listen to TransferSingle events for token transfers
---

# TransferSingle Event

The `TransferSingle` event is emitted by RWAProperty contracts (ERC1155) when a single token type is transferred.

## Event Signature

```solidity
event TransferSingle(
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256 id,
    uint256 value
)
```

## Parameters

- `operator` (address, indexed) - Address that performed the transfer (can be the sender or an approved operator)
- `from` (address, indexed) - Address tokens were transferred from (zero address `0x0000...` for minting)
- `to` (address, indexed) - Address tokens were transferred to (zero address `0x0000...` for burning)
- `id` (uint256) - Token ID (always `1` for PROPERTY_TOKEN_ID)
- `value` (uint256) - Amount of tokens transferred

## Listening to Events

### Using ethers.js

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// ERC1155 TransferSingle event ABI
const propertyABI = [
  'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)'
]

const property = new ethers.Contract(propertyAddress, propertyABI, provider)

// Listen for token transfers
property.on('TransferSingle', (operator, from, to, id, value) => {
  console.log('📦 Token Transfer:')
  console.log('Operator:', operator)
  console.log('From:', from)
  console.log('To:', to)
  console.log('Token ID:', id.toString())
  console.log('Amount:', value.toString())
})
```

### Query Past Events

```typescript
// Get all transfer events from a specific block range
const filter = property.filters.TransferSingle()
const events = await property.queryFilter(filter, fromBlock, toBlock)

events.forEach((event) => {
  console.log('Transfer:', {
    operator: event.args.operator,
    from: event.args.from,
    to: event.args.to,
    tokenId: event.args.id.toString(),
    amount: event.args.value.toString()
  })
})
```

### Filter by Address

```typescript
// Listen for transfers involving a specific address
const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

property.on('TransferSingle', (operator, from, to, id, value) => {
  const userLower = userAddress.toLowerCase()
  
  if (from.toLowerCase() === userLower) {
    console.log(`📤 Sent ${value.toString()} tokens to ${to}`)
  }
  
  if (to.toLowerCase() === userLower) {
    console.log(`📥 Received ${value.toString()} tokens from ${from}`)
  }
})
```

### Filter by Token ID

```typescript
// Filter by PROPERTY_TOKEN_ID (always 1)
const PROPERTY_TOKEN_ID = 1

property.on('TransferSingle', (operator, from, to, id, value) => {
  if (id.toString() === PROPERTY_TOKEN_ID.toString()) {
    console.log(`Property token transfer: ${value.toString()} tokens`)
  }
})
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToTransfers() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  
  const propertyABI = [
    'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)'
  ]
  
  const property = new ethers.Contract(propertyAddress, propertyABI, provider)
  
  // Listen for transfers
  property.on('TransferSingle', async (operator, from, to, id, value) => {
    console.log('📦 Token Transfer Detected')
    console.log('From:', from)
    console.log('To:', to)
    console.log('Amount:', value.toString())
    
    // Get updated balances using SDK
    if (from !== ethers.ZeroAddress) {
      const fromBalance = await rwa.getTokenBalance(propertyAddress, from, provider)
      console.log('From balance:', fromBalance.toString())
    }
    
    if (to !== ethers.ZeroAddress) {
      const toBalance = await rwa.getTokenBalance(propertyAddress, to, provider)
      console.log('To balance:', toBalance.toString())
    }
  })
  
  console.log('👂 Listening for TransferSingle events...')
}
```

## Use Cases

- **Real-time Balance Updates**: Update UI when tokens are transferred
- **Transaction Tracking**: Track all token movements for a property
- **Analytics**: Monitor trading activity and volume
- **Notifications**: Notify users when they receive tokens
- **Marketplace Integration**: Update listings when tokens change hands

## Distinguishing Minting and Burning

```typescript
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

property.on('TransferSingle', (operator, from, to, id, value) => {
  if (from === ZERO_ADDRESS) {
    console.log(`🆕 Minted ${value.toString()} tokens to ${to}`)
  } else if (to === ZERO_ADDRESS) {
    console.log(`🔥 Burned ${value.toString()} tokens from ${from}`)
  } else {
    console.log(`↔️ Transferred ${value.toString()} tokens from ${from} to ${to}`)
  }
})
```

## Related

- [TransferBatch Event](/docs/events-transfer-batch) - Batch token transfer events
- [ApprovalForAll Event](/docs/events-approval-for-all) - Operator approval events
- [API Reference - Events](/docs/api-reference#events) - Complete events documentation
- [Property Operations](/docs/property-operations) - Learn how to transfer tokens

