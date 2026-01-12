---
title: Factory Operations
description: Launch and manage RWA properties through the factory
---

# Factory Operations

The RWA Factory is the central contract that manages all tokenized properties. Use these methods to launch new properties, query existing ones, and manage factory ownership.

## Creating a Client

```typescript
import { createRWAClient, createDefaultRWAClient } from 'rwa-tokenized-sdk'

// Custom factory address
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3',
  chainId: 5000,        // Optional: Mantle Mainnet
  rpcUrl: 'https://rpc.mantle.xyz' // Optional
})

// Using default factory address
const rwa = createDefaultRWAClient({
  chainId: 5000 // Optional override
})
```

## Launch Property

Create a new tokenized property. This creates a new ERC1155 property contract.

```typescript
const result = await rwa.launchProperty({
  assetName: 'Downtown Office Building',
  assetType: 'Real Estate',
  description: 'Premium office building in the heart of downtown',
  isOwner: true,
  approximatedValue: BigInt('1000000000000000000000'), // $1000 in wei (18 decimals)
  totalSupply: BigInt('1000000'), // 1M tokens
  propertyAddress: '123 Main St, Downtown, City',
  squareMeters: BigInt('500'),
  uri: 'ipfs://QmXyZ123...' // IPFS metadata URI
}, signer)

// Returns:
// {
//   transactionHash: string
//   propertyAddress: string
//   propertyId: number
// }

console.log('✅ Property launched!')
console.log('Property Address:', result.propertyAddress)
console.log('Transaction Hash:', result.transactionHash)
console.log('Property ID:', result.propertyId)
```

> **Note:** The issuer (the address that calls `launchProperty`) receives all tokens initially. The total supply is minted to the issuer's address.

**Event Emitted:**
- `PropertyLaunched` - Emitted when a property is successfully launched. See [Events documentation](/docs/api-reference#events) for details.

**Parameters:**
- `assetName` (string, required) - Name of the asset
- `assetType` (string, required) - Type of asset (e.g., "Real Estate", "Collectibles")
- `description` (string, required) - Detailed description
- `isOwner` (boolean, required) - Whether the issuer owns the asset
- `approximatedValue` (bigint | string, required) - Value in wei (18 decimals)
- `totalSupply` (bigint | string, required) - Total token supply
- `propertyAddress` (string, required) - Physical address
- `squareMeters` (bigint | string, required) - Size in square meters
- `uri` (string, required) - IPFS metadata URI
- `signer` (Signer, required) - ethers.js signer for transaction

## Query Properties

### Get All Properties

Get all property addresses from the factory.

```typescript
const properties = await rwa.getAllProperties(provider)
// Returns: ['0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', '0x8ba1f109551bD432803012645Hac136c22C9', ...]
```

### Get Property Count

Get the total number of properties launched.

```typescript
const count = await rwa.getPropertyCount(provider)
console.log(`Total properties: ${count.toString()}`)
```

### Get Property by Index

Get a property address by index.

```typescript
const propertyAddress = await rwa.getProperty(0, provider)
// Returns: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

### Get Property Info

Get property information from the factory registry.

```typescript
const info = await rwa.getPropertyInfo(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)

console.log(info)
// {
//   assetName: 'Downtown Office Building',
//   assetType: 'Real Estate',
//   description: 'Premium office building...',
//   isOwner: true,
//   approximatedValue: '1000000000000',
//   totalSupply: '1000000',
//   propertyAddress: '123 Main St',
//   squareMeters: '500'
// }
```

## User Properties

### Get User Properties

Get all properties owned/created by a user.

```typescript
const userProperties = await rwa.getUserProperties(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
// Returns: ['0xProperty1...', '0xProperty2...']
```

### Get User Property Count

Get the number of properties for a user.

```typescript
const count = await rwa.getUserPropertyCount(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
console.log(`User has ${count.toString()} properties`)
```

### Get User Property by Index

Get a user's property by index.

```typescript
const property = await rwa.getUserPropertyByIndex(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  0,
  provider
)
```

## Validation

### Check Valid Property

Check if an address is a valid property contract.

```typescript
const isValid = await rwa.isValidProperty(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
// Returns: true | false
```

## Factory Ownership

### Get Factory Owner

Get the factory contract owner address.

```typescript
const owner = await rwa.getFactoryOwner(provider)
console.log('Factory owner:', owner)
```

### Transfer Factory Ownership

Transfer factory ownership (only current owner).

```typescript
const txHash = await rwa.transferFactoryOwnership(
  '0xNewOwnerAddress...',
  signer
)
```

### Renounce Factory Ownership

Renounce factory ownership (only current owner).

```typescript
const txHash = await rwa.renounceFactoryOwnership(signer)
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function factoryOperationsExample() {
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
    const signer = await provider.getSigner()
    
    const rwa = createRWAClient({
      factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
    })
    
    // Get all properties
    const properties = await rwa.getAllProperties(provider)
    console.log(`Found ${properties.length} properties`)
    
    // Get property count
    const count = await rwa.getPropertyCount(provider)
    console.log(`Total count: ${count.toString()}`)
    
    // Get first property
    if (properties.length > 0) {
      const firstProperty = properties[0]
      const info = await rwa.getPropertyInfo(firstProperty, provider)
      console.log('First property:', info)
      
      // Validate property
      const isValid = await rwa.isValidProperty(firstProperty, provider)
      console.log('Is valid property:', isValid)
    }
    
    // Get user's properties
    const userAddress = await signer.getAddress()
    const userProperties = await rwa.getUserProperties(userAddress, provider)
    console.log(`Your properties: ${userProperties.length}`)
    
    // Get user property count
    const userCount = await rwa.getUserPropertyCount(userAddress, provider)
    console.log(`Your property count: ${userCount.toString()}`)
    
    // Get factory owner
    const factoryOwner = await rwa.getFactoryOwner(provider)
    console.log('Factory owner:', factoryOwner)
    
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
```

## Next Steps

- [Property Operations](/docs/property-operations) - Interact with tokenized properties
- [Examples](/docs/examples) - Complete code examples
- [API Reference](/docs/api-reference) - Full API documentation

