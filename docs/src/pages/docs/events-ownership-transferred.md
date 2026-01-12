---
title: OwnershipTransferred Event
description: Listen to OwnershipTransferred events for ownership changes
---

# OwnershipTransferred Event

The `OwnershipTransferred` event is emitted by both RWAFactory and RWAProperty contracts (inherited from Ownable) when ownership is transferred or renounced.

## Event Signature

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
)
```

## Parameters

- `previousOwner` (address, indexed) - Previous owner address
- `newOwner` (address, indexed) - New owner address (zero address `0x0000...` if ownership is renounced)

## Factory Ownership Events

Listen to ownership changes for the factory contract.

### Using ethers.js

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const factoryAddress = '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'

// Ownable OwnershipTransferred event ABI
const factoryABI = [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
]

const factory = new ethers.Contract(factoryAddress, factoryABI, provider)

// Listen for factory ownership changes
factory.on('OwnershipTransferred', (previousOwner, newOwner) => {
  if (newOwner === ethers.ZeroAddress) {
    console.log(`👑 Factory ownership renounced by ${previousOwner}`)
  } else {
    console.log(`👑 Factory ownership transferred:`)
    console.log(`From: ${previousOwner}`)
    console.log(`To: ${newOwner}`)
  }
})
```

## Property Ownership Events

Listen to ownership changes for individual property contracts.

```typescript
const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

const propertyABI = [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
]

const property = new ethers.Contract(propertyAddress, propertyABI, provider)

// Listen for property ownership changes
property.on('OwnershipTransferred', (previousOwner, newOwner) => {
  if (newOwner === ethers.ZeroAddress) {
    console.log(`👑 Property ownership renounced by ${previousOwner}`)
  } else {
    console.log(`👑 Property ownership transferred:`)
    console.log(`From: ${previousOwner}`)
    console.log(`To: ${newOwner}`)
  }
})
```

## Query Past Events

```typescript
// Get factory ownership changes
const factoryFilter = factory.filters.OwnershipTransferred()
const factoryEvents = await factory.queryFilter(factoryFilter, fromBlock, toBlock)

// Get property ownership changes
const propertyFilter = property.filters.OwnershipTransferred()
const propertyEvents = await property.queryFilter(propertyFilter, fromBlock, toBlock)
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToOwnershipChanges() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const factoryAddress = rwa.getFactoryAddress()
  
  // Factory ownership
  const factoryABI = [
    'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
  ]
  
  const factory = new ethers.Contract(factoryAddress, factoryABI, provider)
  
  factory.on('OwnershipTransferred', async (previousOwner, newOwner) => {
    console.log('👑 Factory Ownership Changed')
    console.log('Previous Owner:', previousOwner)
    console.log('New Owner:', newOwner === ethers.ZeroAddress ? 'Renounced' : newOwner)
    
    // Verify current owner using SDK
    const currentOwner = await rwa.getFactoryOwner(provider)
    console.log('Current Owner:', currentOwner)
  })
  
  // Property ownership
  const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  const property = new ethers.Contract(propertyAddress, factoryABI, provider)
  
  property.on('OwnershipTransferred', async (previousOwner, newOwner) => {
    console.log('👑 Property Ownership Changed')
    console.log('Property:', propertyAddress)
    console.log('Previous Owner:', previousOwner)
    console.log('New Owner:', newOwner === ethers.ZeroAddress ? 'Renounced' : newOwner)
    
    // Verify current owner using SDK
    const currentOwner = await rwa.getPropertyOwner(propertyAddress, provider)
    console.log('Current Owner:', currentOwner)
  })
  
  console.log('👂 Listening for OwnershipTransferred events...')
}
```

## Use Cases

- **Security Monitoring**: Track ownership changes for security audits
- **Governance**: Monitor factory ownership for governance purposes
- **Analytics**: Track ownership transfer patterns
- **Notifications**: Alert users when ownership changes affect them

## Understanding Ownership

### Factory Ownership
- Factory owner can transfer or renounce factory ownership
- Factory owner has administrative control over the factory contract
- Ownership changes affect all properties managed by the factory

### Property Ownership
- Property owner can transfer or renounce property ownership
- Property owner has administrative control over the property contract
- Each property has its own independent ownership

### Renouncing Ownership
When `newOwner` is the zero address (`0x0000...`), ownership has been renounced:
- The contract becomes ownerless
- No further ownership transfers are possible
- This is an irreversible action

## Related

- [PropertyLaunched Event](/docs/events-property-launched) - New property creation events
- [API Reference - Events](/docs/api-reference#events) - Complete events documentation
- [Factory Operations](/docs/factory-operations) - Learn about factory ownership
- [Property Operations](/docs/property-operations) - Learn about property ownership

