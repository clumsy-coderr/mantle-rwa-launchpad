---
title: PropertyLaunched Event
description: Listen to PropertyLaunched events when new properties are launched
---

The `PropertyLaunched` event is emitted by the RWAFactory contract when a new property is successfully launched.

## Event Signature

```solidity
event PropertyLaunched(
    address indexed propertyContract,
    address indexed issuer,
    string assetName,
    string assetType,
    uint256 indexed propertyId
)
```

## Parameters

- `propertyContract` (address, indexed) - Address of the newly created property contract
- `issuer` (address, indexed) - Address that launched the property
- `assetName` (string) - Name of the asset
- `assetType` (string) - Type of the asset (e.g., "Real Estate", "Art", "Collectibles")
- `propertyId` (uint256, indexed) - Property ID assigned by the factory (index in allProperties array)

## Listening to Events

### Using ethers.js

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const factoryAddress = '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'

// Factory ABI for PropertyLaunched event
const factoryABI = [
  'event PropertyLaunched(address indexed propertyContract, address indexed issuer, string assetName, string assetType, uint256 indexed propertyId)'
]

const factory = new ethers.Contract(factoryAddress, factoryABI, provider)

// Listen for new property launches
factory.on('PropertyLaunched', (propertyContract, issuer, assetName, assetType, propertyId) => {
  console.log('🎉 New Property Launched!')
  console.log('Property Contract:', propertyContract)
  console.log('Issuer:', issuer)
  console.log('Asset Name:', assetName)
  console.log('Asset Type:', assetType)
  console.log('Property ID:', propertyId.toString())
})
```

### Query Past Events

```typescript
// Get events from a specific block range
const filter = factory.filters.PropertyLaunched()
const events = await factory.queryFilter(filter, fromBlock, toBlock)

events.forEach((event) => {
  console.log('Property:', event.args.propertyContract)
  console.log('Issuer:', event.args.issuer)
  console.log('Asset Name:', event.args.assetName)
  console.log('Asset Type:', event.args.assetType)
  console.log('Property ID:', event.args.propertyId.toString())
})
```

### Filter by Issuer

```typescript
// Listen for properties launched by a specific address
const issuerAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

factory.on('PropertyLaunched', (propertyContract, issuer, assetName, assetType, propertyId) => {
  if (issuer.toLowerCase() === issuerAddress.toLowerCase()) {
    console.log('Property launched by tracked issuer:', propertyContract)
  }
})
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToPropertyLaunches() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const factoryAddress = rwa.getFactoryAddress()
  
  const factoryABI = [
    'event PropertyLaunched(address indexed propertyContract, address indexed issuer, string assetName, string assetType, uint256 indexed propertyId)'
  ]
  
  const factory = new ethers.Contract(factoryAddress, factoryABI, provider)
  
  // Listen for new launches
  factory.on('PropertyLaunched', async (propertyContract, issuer, assetName, assetType, propertyId) => {
    console.log('✅ New Property Launched!')
    console.log('Property:', propertyContract)
    console.log('Issuer:', issuer)
    console.log('Name:', assetName)
    console.log('Type:', assetType)
    console.log('ID:', propertyId.toString())
    
    // Get property details using SDK
    const details = await rwa.getPropertyDetails(propertyContract, provider)
    console.log('Property Details:', details)
  })
  
  console.log('👂 Listening for PropertyLaunched events...')
}
```

## Use Cases

- **Real-time Notifications**: Get notified immediately when new properties are launched
- **Analytics**: Track property launches for analytics and reporting
- **Marketplace Integration**: Update marketplace listings when new properties are created
- **User Dashboards**: Show users when properties they're interested in are launched

## Related

- [TransferSingle Event](/docs/events-transfer-single) - Token transfer events
- [API Reference - Events](/docs/api-reference#events) - Complete events documentation
- [Factory Operations](/docs/factory-operations) - Learn how to launch properties

