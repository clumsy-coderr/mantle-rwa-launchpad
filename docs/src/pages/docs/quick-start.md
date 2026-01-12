---
title: Quick Start
description: Get started with your first tokenized property in minutes
---

This guide will walk you through launching your first tokenized property using the RWA Tokenized SDK.

## Step 1: Install the SDK

```bash
npm install rwa-tokenized-sdk ethers@^6.0.0
```

## Step 2: Connect to Mantle Network

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

// Option 1: Using public RPC (read-only operations)
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')

// Option 2: Using browser provider (MetaMask, etc.) - for transactions
const provider = new ethers.BrowserProvider(window.ethereum)
await provider.send('eth_requestAccounts', [])
const signer = await provider.getSigner()

// Option 3: Using custom RPC
const provider = new ethers.JsonRpcProvider('YOUR_CUSTOM_RPC_URL', {
  name: 'Mantle',
  chainId: 5000
})
```

## Step 3: Create RWA Client

```typescript
// Option 1: Custom factory address
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
})

// Option 2: Use default factory address
import { createDefaultRWAClient } from 'rwa-tokenized-sdk'
const rwa = createDefaultRWAClient()
```

## Step 4: Launch Your First Property

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

console.log('✅ Property launched!')
console.log('Property Address:', result.propertyAddress)
console.log('Transaction Hash:', result.transactionHash)
console.log('Property ID:', result.propertyId)
```

## Step 5: Query Your Property

```typescript
// Get property details
const details = await rwa.getPropertyDetails(
  result.propertyAddress,
  provider
)

console.log('Property Details:', details)
// {
//   assetName: 'Downtown Office Building',
//   assetType: 'Real Estate',
//   description: 'Premium office building...',
//   isOwner: true,
//   approximatedValue: '1000000000000000000000',
//   totalSupply: '1000000',
//   propertyAddress: '123 Main St',
//   squareMeters: '500',
//   contractAddress: '0x...',
//   uri: 'ipfs://QmXyZ123...'
// }

// Get your token balance
const userAddress = await signer.getAddress()
const balance = await rwa.getTokenBalance(
  result.propertyAddress,
  userAddress,
  provider
)

console.log('Your balance:', balance.toString())
```

## Complete Example

Here's a complete example that launches a property and performs basic operations:

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function launchAndManageProperty() {
  try {
    // 1. Setup
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const userAddress = await signer.getAddress()
    
    const rwa = createRWAClient({
      factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
    })
    
    // 2. Launch property
    console.log('🚀 Launching property...')
    const launchResult = await rwa.launchProperty({
      assetName: 'Downtown Office Building',
      assetType: 'Real Estate',
      description: 'A premium office building in downtown area',
      isOwner: true,
      approximatedValue: BigInt('1000000000000000000000'), // $1000
      totalSupply: BigInt('1000000'), // 1M tokens
      propertyAddress: '123 Main St, Downtown',
      squareMeters: BigInt('500'),
      uri: 'ipfs://QmYourMetadataHash'
    }, signer)
    
    const propertyAddress = launchResult.propertyAddress
    console.log('✅ Property launched:', propertyAddress)
    
    // 3. Get property details
    const details = await rwa.getPropertyDetails(propertyAddress, provider)
    console.log('📋 Property details:', details)
    
    // 4. Check token balance (issuer gets all tokens initially)
    const balance = await rwa.getTokenBalance(
      propertyAddress,
      userAddress,
      provider
    )
    console.log('💰 Your balance:', balance.toString())
    
    // 5. Get all properties
    const allProperties = await rwa.getAllProperties(provider)
    console.log('📦 Total properties:', allProperties.length)
    
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}
```

## What's Next?

- [Factory Operations](/docs/factory-operations) - Learn all factory methods
- [Property Operations](/docs/property-operations) - Manage tokens and transfers
- [Examples](/docs/examples) - More complete examples
- [API Reference](/docs/api-reference) - Full API documentation

