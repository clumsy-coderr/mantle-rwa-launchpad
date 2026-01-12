# 📦 RWA Tokenized SDK - Complete Usage Guide

## 🎯 Overview

A TypeScript SDK that enables developers to integrate **Real World Assets (RWA) tokenization** on Mantle Network into their applications. This SDK provides a complete interface to interact with RWA Factory and Property smart contracts, enabling seamless tokenization of real-world assets as ERC1155 tokens.

**Features:**
- ✅ Complete RWA Factory operations (launch, query, manage properties)
- ✅ Full ERC1155 token support (transfers, approvals, batch operations)
- ✅ Property ownership management
- ✅ Factory ownership controls
- ✅ Comprehensive TypeScript types
- ✅ Provider agnostic (works with ethers.js v5 and v6)
- ✅ Optimized for Mantle Network

---

## 📁 SDK Structure

```
/sdk
├── package.json          # SDK package config
├── tsconfig.json         # TypeScript config
├── index.ts             # Main exports
├── /client              # Core SDK client
│   └── rwa.ts          # RWA Factory and Property operations
├── /types               # TypeScript definitions
│   └── index.ts         # All types exported
└── /dist                # Compiled output (after build)
    ├── index.js
    ├── index.d.ts
    └── ...
```

---

## 🛠️ Build the SDK

```bash
# From root directory
cd sdk
npm install
npm run build
```

**Output:** Compiled JS + TypeScript declarations in `sdk/dist/`

---

## 🚀 Quick Start

### Installation

```bash
npm install rwa-tokenized-sdk
# or
yarn add rwa-tokenized-sdk
# or
pnpm add rwa-tokenized-sdk
```

### Peer Dependencies

```bash
npm install ethers@^6.0.0
# For React components (optional)
npm install react@^18.0.0 react-markdown@^10.0.0 lucide-react@^0.500.0
```

### Basic Setup

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

// Connect to Mantle Network
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')

// Create RWA client
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
})

// Get all properties
const properties = await rwa.getAllProperties(provider)
console.log(`Found ${properties.length} properties`)
```

---

## 📚 API Reference

### **Creating a Client**

#### `createRWAClient(config)`

Creates an RWA client instance with custom configuration.

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3', // Required
  chainId: 5000,        // Optional: Mantle Mainnet
  rpcUrl: 'https://rpc.mantle.xyz' // Optional
})
```

#### `createDefaultRWAClient(overrides?)`

Creates an RWA client with default factory address.

```typescript
import { createDefaultRWAClient } from 'rwa-tokenized-sdk'

const rwa = createDefaultRWAClient({
  chainId: 5000 // Optional override
})
```

---

### **Factory Operations**

#### `launchProperty(params, signer)`

Launch a new tokenized property. This creates a new ERC1155 property contract.

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
})

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

console.log('Transaction Hash:', result.transactionHash)
console.log('Property Address:', result.propertyAddress)
console.log('Property ID:', result.propertyId)
```

**Parameters:**
- `params.assetName` (string, required) - Name of the asset
- `params.assetType` (string, required) - Type of asset (e.g., "Real Estate", "Collectibles")
- `params.description` (string, required) - Detailed description
- `params.isOwner` (boolean, required) - Whether the issuer owns the asset
- `params.approximatedValue` (bigint | string, required) - Value in wei (18 decimals)
- `params.totalSupply` (bigint | string, required) - Total token supply
- `params.propertyAddress` (string, required) - Physical address
- `params.squareMeters` (bigint | string, required) - Size in square meters
- `params.uri` (string, required) - IPFS metadata URI
- `signer` (Signer, required) - ethers.js signer for transaction

**Returns:**
```typescript
{
  transactionHash: string
  propertyAddress: string
  propertyId: number
}
```

---

#### `getAllProperties(provider)`

Get all property addresses from the factory.

```typescript
const properties = await rwa.getAllProperties(provider)
// Returns: ['0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', '0x8ba1f109551bD432803012645Hac136c22C9', ...]
```

---

#### `getPropertyCount(provider)`

Get the total number of properties launched.

```typescript
const count = await rwa.getPropertyCount(provider)
console.log(`Total properties: ${count.toString()}`)
```

---

#### `getProperty(index, provider)`

Get a property address by index.

```typescript
const propertyAddress = await rwa.getProperty(0, provider)
// Returns: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
```

---

#### `getPropertyInfo(propertyAddress, provider)`

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

---

#### `getUserProperties(userAddress, provider)`

Get all properties owned/created by a user.

```typescript
const userProperties = await rwa.getUserProperties(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
// Returns: ['0xProperty1...', '0xProperty2...']
```

---

#### `getUserPropertyCount(userAddress, provider)`

Get the number of properties for a user.

```typescript
const count = await rwa.getUserPropertyCount(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
console.log(`User has ${count.toString()} properties`)
```

---

#### `getUserPropertyByIndex(userAddress, index, provider)`

Get a user's property by index.

```typescript
const property = await rwa.getUserPropertyByIndex(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  0,
  provider
)
```

---

#### `isValidProperty(propertyAddress, provider)`

Check if an address is a valid property contract.

```typescript
const isValid = await rwa.isValidProperty(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)
// Returns: true | false
```

---

#### `getFactoryOwner(provider)`

Get the factory contract owner address.

```typescript
const owner = await rwa.getFactoryOwner(provider)
console.log('Factory owner:', owner)
```

---

#### `transferFactoryOwnership(newOwner, signer)`

Transfer factory ownership (only current owner).

```typescript
const txHash = await rwa.transferFactoryOwnership(
  '0xNewOwnerAddress...',
  signer
)
```

---

#### `renounceFactoryOwnership(signer)`

Renounce factory ownership (only current owner).

```typescript
const txHash = await rwa.renounceFactoryOwnership(signer)
```

---

### **Property Operations**

#### `getPropertyDetails(propertyAddress, provider)`

Get complete property details directly from the property contract (includes URI).

```typescript
const details = await rwa.getPropertyDetails(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)

console.log(details)
// {
//   assetName: 'Downtown Office Building',
//   assetType: 'Real Estate',
//   description: 'Premium office building...',
//   isOwner: true,
//   approximatedValue: '1000000000000',
//   totalSupply: '1000000',
//   propertyAddress: '123 Main St',
//   squareMeters: '500',
//   contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
//   uri: 'ipfs://QmXyZ123...'
// }
```

---

#### `getTokenBalance(propertyAddress, userAddress, provider)`

Get token balance for a user (PROPERTY_TOKEN_ID = 1).

```typescript
const balance = await rwa.getTokenBalance(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // property address
  '0xUserAddress...',                            // user address
  provider
)

console.log('Balance:', balance.toString())
```

---

#### `getBatchTokenBalances(propertyAddress, accounts, tokenIds, provider)`

Get batch token balances for multiple accounts.

```typescript
const balances = await rwa.getBatchTokenBalances(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  [
    '0xAccount1...',
    '0xAccount2...',
    '0xAccount3...'
  ],
  [1, 1, 1], // PROPERTY_TOKEN_ID for all
  provider
)

console.log('Balances:', balances.map(b => b.toString()))
```

---

#### `transferTokens(propertyAddress, from, to, tokenId, amount, signer, data?)`

Transfer tokens from one address to another.

```typescript
const txHash = await rwa.transferTokens(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // property address
  '0xFromAddress...',                            // sender
  '0xToAddress...',                              // recipient
  1,                                             // PROPERTY_TOKEN_ID
  BigInt('1000'),                                // amount
  signer,
  '0x'                                           // optional data
)

console.log('Transfer complete:', txHash)
```

---

#### `batchTransferTokens(propertyAddress, from, to, tokenIds, amounts, signer, data?)`

Batch transfer multiple token types.

```typescript
const txHash = await rwa.batchTransferTokens(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xFromAddress...',
  '0xToAddress...',
  [1, 1],                    // token IDs
  [BigInt('100'), BigInt('200')], // amounts
  signer
)

console.log('Batch transfer complete:', txHash)
```

---

#### `setApprovalForAll(propertyAddress, operator, approved, signer)`

Approve or revoke an operator for all tokens.

```typescript
// Approve operator
const txHash = await rwa.setApprovalForAll(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xOperatorAddress...',
  true,  // approve
  signer
)

// Revoke approval
await rwa.setApprovalForAll(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xOperatorAddress...',
  false, // revoke
  signer
)
```

---

#### `isApprovedForAll(propertyAddress, account, operator, provider)`

Check if an operator is approved for all tokens.

```typescript
const isApproved = await rwa.isApprovedForAll(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xAccountAddress...',
  '0xOperatorAddress...',
  provider
)

console.log('Operator approved:', isApproved)
```

---

#### `supportsInterface(propertyAddress, interfaceId, provider)`

Check if the contract supports a specific interface (ERC165).

```typescript
// Check ERC1155 support
const supportsERC1155 = await rwa.supportsInterface(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xd9b67a26', // ERC1155 interface ID
  provider
)

console.log('Supports ERC1155:', supportsERC1155)
```

---

#### `getPropertyOwner(propertyAddress, provider)`

Get the property contract owner address.

```typescript
const owner = await rwa.getPropertyOwner(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)

console.log('Property owner:', owner)
```

---

#### `transferPropertyOwnership(propertyAddress, newOwner, signer)`

Transfer property ownership (only current owner).

```typescript
const txHash = await rwa.transferPropertyOwnership(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xNewOwnerAddress...',
  signer
)
```

---

#### `renouncePropertyOwnership(propertyAddress, signer)`

Renounce property ownership (only current owner).

```typescript
const txHash = await rwa.renouncePropertyOwnership(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  signer
)
```

---

## 🎨 Complete Examples

### Example 1: Launch and Manage a Property

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
    
    // 5. Transfer tokens to another address
    const recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    console.log('📤 Transferring tokens...')
    const transferTx = await rwa.transferTokens(
      propertyAddress,
      userAddress,
      recipient,
      1, // PROPERTY_TOKEN_ID
      BigInt('100'),
      signer
    )
    console.log('✅ Transfer complete:', transferTx)
    
    // 6. Approve an operator (e.g., for marketplace)
    const operator = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    console.log('🔐 Approving operator...')
    await rwa.setApprovalForAll(propertyAddress, operator, true, signer)
    
    // 7. Verify approval
    const isApproved = await rwa.isApprovedForAll(
      propertyAddress,
      userAddress,
      operator,
      provider
    )
    console.log('✅ Operator approved:', isApproved)
    
    // 8. Get user's properties
    const userProperties = await rwa.getUserProperties(userAddress, provider)
    console.log('📦 Your properties:', userProperties)
    
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}
```

---

### Example 2: Marketplace Integration

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function marketplaceExample() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  // Get all properties
  const properties = await rwa.getAllProperties(provider)
  console.log(`Found ${properties.length} properties`)
  
  // Get details for each property
  const propertyDetails = await Promise.all(
    properties.map(async (address) => {
      try {
        const details = await rwa.getPropertyDetails(address, provider)
        const count = await rwa.getPropertyCount(provider)
        return {
          ...details,
          index: properties.indexOf(address),
          totalProperties: count.toString()
        }
      } catch (error) {
        console.error(`Error fetching ${address}:`, error)
        return null
      }
    })
  )
  
  // Filter out nulls and display
  const validProperties = propertyDetails.filter(p => p !== null)
  console.log('Available properties:', validProperties)
  
  return validProperties
}
```

---

### Example 3: Batch Operations

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function batchOperationsExample() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const signer = await provider.getSigner()
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
  const accounts = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    '0x8ba1f109551bD432803012645Hac136c22C9'
  ]
  
  // Get batch balances
  const balances = await rwa.getBatchTokenBalances(
    propertyAddress,
    accounts,
    [1, 1], // PROPERTY_TOKEN_ID for both
    provider
  )
  
  console.log('Balances:', balances.map(b => b.toString()))
  
  // Batch transfer
  const txHash = await rwa.batchTransferTokens(
    propertyAddress,
    await signer.getAddress(),
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    [1, 1],
    [BigInt('100'), BigInt('200')],
    signer
  )
  
  console.log('Batch transfer complete:', txHash)
}
```

---

### Example 4: Using with React/Wagmi

```typescript
'use client'

import { useAccount, useProvider } from 'wagmi'
import { createRWAClient } from 'rwa-tokenized-sdk'
import { useEffect, useState } from 'react'

export function PropertyList() {
  const { address } = useAccount()
  const provider = useProvider()
  const [properties, setProperties] = useState<string[]>([])
  
  useEffect(() => {
    if (!provider || !address) return
    
    async function loadProperties() {
      const rwa = createRWAClient({
        factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
      })
      
      // Get user's properties
      const userProperties = await rwa.getUserProperties(address, provider)
      setProperties(userProperties)
    }
    
    loadProperties()
  }, [provider, address])
  
  return (
    <div>
      <h2>Your Properties ({properties.length})</h2>
      {properties.map((addr, i) => (
        <div key={i}>{addr}</div>
      ))}
    </div>
  )
}
```

---

## 📊 TypeScript Types

All types are exported from the SDK:

```typescript
import type { 
  // RWA Types
  RWAPropertyInfo,
  ParsedRWAPropertyInfo,
  LaunchPropertyParams,
  RWASDKConfig,
  LaunchPropertyResult,
  RWAPropertyMetadata
} from 'rwa-tokenized-sdk'
```

### Type Definitions

```typescript
interface LaunchPropertyParams {
  assetName: string
  assetType: string
  description: string
  isOwner: boolean
  approximatedValue: bigint | string
  totalSupply: bigint | string
  propertyAddress: string
  squareMeters: bigint | string
  uri: string
}

interface ParsedRWAPropertyInfo {
  assetName: string
  assetType: string
  description: string
  isOwner: boolean
  approximatedValue: string
  totalSupply: string
  propertyAddress: string
  squareMeters: string
  contractAddress?: string
  uri?: string
}

interface LaunchPropertyResult {
  transactionHash: string
  propertyAddress: string
  propertyId: number
}

interface RWASDKConfig {
  factoryAddress: string
  chainId?: number
  rpcUrl?: string
}
```

---

## 🌐 Mantle Network Configuration

### Network Details

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Mantle Mainnet | 5000 | `https://rpc.mantle.xyz` | [explorer.mantle.xyz](https://explorer.mantle.xyz) |
| Mantle Testnet | 5001 | `https://rpc.testnet.mantle.xyz` | [explorer.testnet.mantle.xyz](https://explorer.testnet.mantle.xyz) |

### Connecting to Mantle Network

```typescript
import { ethers } from 'ethers'

// Option 1: Using public RPC
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')

// Option 2: Using browser provider (MetaMask, etc.)
const provider = new ethers.BrowserProvider(window.ethereum)

// Option 3: Using custom RPC
const provider = new ethers.JsonRpcProvider('YOUR_CUSTOM_RPC_URL', {
  name: 'Mantle',
  chainId: 5000
})

// Get signer
const signer = await provider.getSigner()
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Factory address is required" Error

**Solution:** Make sure you provide a factory address:

```typescript
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3' // Required!
})
```

#### 2. Transaction Reverted

**Possible causes:**
- Insufficient gas
- Invalid parameters
- Insufficient balance
- Not authorized (for ownership functions)

**Solution:**
```typescript
try {
  const result = await rwa.launchProperty(params, signer)
  console.log('Success:', result.transactionHash)
} catch (error: any) {
  if (error.reason) {
    console.error('Transaction failed:', error.reason)
  }
  console.error('Full error:', error)
}
```

#### 3. Provider Not Connected

**Solution:**
```typescript
if (!window.ethereum) {
  throw new Error('Please install MetaMask or another wallet')
}

const provider = new ethers.BrowserProvider(window.ethereum)
await provider.send('eth_requestAccounts', [])
const signer = await provider.getSigner()
```

#### 4. Wrong Network

**Solution:**
```typescript
// Check current network
const network = await provider.getNetwork()
if (network.chainId !== 5000n) { // Mantle Mainnet
  // Prompt user to switch network
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x1388' }] // 5000 in hex
  })
}
```

#### 5. Type Errors with ethers.js

**Solution:** Make sure you're using ethers.js v6:

```bash
npm install ethers@^6.0.0
```

The SDK handles both ethers.js v5 and v6 automatically.

---

## 🧪 Testing the SDK

### **1. Visit SDK Demo Page**
```
http://localhost:3000/sdk-demo
```

Shows all SDK methods with interactive examples.

### **2. Test Property Launch**
```typescript
// Connect wallet
// Launch property with metadata
// Verify property address returned
// Check property details
```

### **3. Test Token Operations**
```typescript
// Get token balance
// Transfer tokens
// Approve operator
// Verify operations
```

---

## 📦 Exporting for Others

### **Method 1: npm Package**
```bash
cd sdk
npm publish
```

Then developers can:
```bash
npm install rwa-tokenized-sdk
```

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
```

### **Method 2: Git Submodule**
```bash
# Other developers can add as submodule
git submodule add https://github.com/yourusername/rwa-tokenized
```

---

## ✅ SDK Features Checklist

- ✅ Complete RWA Factory operations
- ✅ Full ERC1155 token support
- ✅ Property ownership management
- ✅ Factory ownership controls
- ✅ Comprehensive TypeScript types
- ✅ Provider agnostic (ethers.js v5/v6)
- ✅ Batch operations support
- ✅ Approval management
- ✅ Interface support checking
- ✅ Compiled dist/ output
- ✅ Demo page included

---

## 🚀 Ready to Ship!

Your SDK is production-ready. Developers can now integrate RWA tokenization into their applications with just a few lines of code! 🎉

---

## 📄 License

This SDK is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 RWA Tokenized

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 Additional Resources

- [Mantle Network](https://www.mantle.xyz/)
- [Mantle Explorer](https://explorer.mantle.xyz/)
- [Mantle Documentation](https://docs.mantle.xyz/)
- [GitHub Repository](https://github.com/adityajha2005/synq)

---

Made with ❤️ for the Mantle Network ecosystem
