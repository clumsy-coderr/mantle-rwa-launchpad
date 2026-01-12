# RWA Tokenized SDK

[![npm version](https://img.shields.io/npm/v/rwa-tokenized-sdk)](https://www.npmjs.com/package/rwa-tokenized-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A comprehensive TypeScript/React SDK for integrating **Mantle Network**-based payments, subscriptions, and RWA (Real World Assets) tokenization into your applications. This SDK provides a complete interface to interact with RWA Factory and Property smart contracts, enabling seamless tokenization of real-world assets.

## ✨ Features

- 🏗️ **Complete RWA Operations** - Launch, manage, and query tokenized properties
- 💰 **ERC1155 Token Support** - Full token transfer, approval, and batch operations
- 🔐 **Ownership Management** - Factory and property ownership controls
- 📊 **Comprehensive Queries** - Get properties, balances, approvals, and more
- ⚡ **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🔌 **Provider Agnostic** - Works with ethers.js v5 and v6
- 🌐 **Mantle Network** - Optimized for Mantle Network (EVM-compatible)

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Mantle Network Configuration](#mantle-network-configuration)
- [RWA Launchpad API](#rwa-launchpad-api)
- [Complete Examples](#complete-examples)
- [API Reference](#api-reference)
- [Types](#types)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 📦 Installation

```bash
npm install rwa-tokenized-sdk
# or
yarn add rwa-tokenized-sdk
# or
pnpm add rwa-tokenized-sdk
```

### Peer Dependencies

This SDK requires the following peer dependencies:

```bash
npm install ethers@^6.0.0
# For React components (optional)
npm install react@^18.0.0 react-markdown@^10.0.0 lucide-react@^0.500.0
```

## 🚀 Quick Start

### Basic Setup

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

// Connect to Mantle Network
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const signer = await provider.getSigner()

// Create RWA client
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
})

// Get all properties
const properties = await rwa.getAllProperties(provider)
console.log(`Found ${properties.length} properties`)
```

### Launch a Property

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function launchProperty() {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  
  const rwa = createRWAClient({
    factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  })
  
  try {
    const result = await rwa.launchProperty({
      assetName: 'Downtown Office Building',
      assetType: 'Real Estate',
      description: 'A premium office building in downtown',
      isOwner: true,
      approximatedValue: BigInt('1000000000000000000000'), // $1000 in wei
      totalSupply: BigInt('1000000'), // 1M tokens
      propertyAddress: '123 Main St, City, State',
      squareMeters: BigInt('500'),
      uri: 'ipfs://QmYourMetadataHashHere'
    }, signer)
    
    console.log('✅ Property launched!')
    console.log('Property Address:', result.propertyAddress)
    console.log('Transaction Hash:', result.transactionHash)
    console.log('Property ID:', result.propertyId)
  } catch (error) {
    console.error('❌ Failed to launch property:', error)
  }
}
```

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

### Adding Mantle to MetaMask

Users can add Mantle Network to MetaMask with these details:

**Mainnet:**
- Network Name: Mantle
- RPC URL: `https://rpc.mantle.xyz`
- Chain ID: `5000`
- Currency Symbol: `MNT`
- Block Explorer: `https://explorer.mantle.xyz`

**Testnet:**
- Network Name: Mantle Testnet
- RPC URL: `https://rpc.testnet.mantle.xyz`
- Chain ID: `5001`
- Currency Symbol: `MNT`
- Block Explorer: `https://explorer.testnet.mantle.xyz`

## 🏗️ RWA Launchpad API

### Creating a Client

```typescript
import { createRWAClient, createDefaultRWAClient } from 'rwa-tokenized-sdk'

// Custom factory address
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3',
  chainId: 5000, // Optional
  rpcUrl: 'https://rpc.mantle.xyz' // Optional
})

// Using default factory address
const rwa = createDefaultRWAClient({
  chainId: 5000 // Optional override
})
```

### Factory Operations

#### Launch Property

Create a new tokenized property.

```typescript
const result = await rwa.launchProperty({
  assetName: 'Luxury Apartment Complex',
  assetType: 'Real Estate',
  description: 'Modern apartment complex with 50 units',
  isOwner: true,
  approximatedValue: BigInt('5000000000000000000000'), // $5000
  totalSupply: BigInt('10000000'), // 10M tokens
  propertyAddress: '456 Oak Avenue, City',
  squareMeters: BigInt('2000'),
  uri: 'ipfs://QmYourMetadataHash'
}, signer)

// Returns: { transactionHash, propertyAddress, propertyId }
```

#### Query Properties

```typescript
// Get all property addresses
const allProperties = await rwa.getAllProperties(provider)

// Get total count
const count = await rwa.getPropertyCount(provider)

// Get property by index
const property = await rwa.getProperty(0, provider)

// Get property information
const info = await rwa.getPropertyInfo(propertyAddress, provider)

// Get user's properties
const userProperties = await rwa.getUserProperties(userAddress, provider)

// Get user property by index
const userProperty = await rwa.getUserPropertyByIndex(userAddress, 0, provider)

// Validate property address
const isValid = await rwa.isValidProperty(propertyAddress, provider)
```

#### Factory Ownership

```typescript
// Get factory owner
const owner = await rwa.getFactoryOwner(provider)

// Transfer ownership (only owner)
await rwa.transferFactoryOwnership(newOwnerAddress, signer)

// Renounce ownership (only owner)
await rwa.renounceFactoryOwnership(signer)
```

### Property Operations

#### Get Property Details

```typescript
// Get complete property details with URI
const details = await rwa.getPropertyDetails(propertyAddress, provider)

console.log(details)
// {
//   assetName: 'Downtown Office Building',
//   assetType: 'Real Estate',
//   description: '...',
//   isOwner: true,
//   approximatedValue: '1000000000000',
//   totalSupply: '1000000',
//   propertyAddress: '123 Main St',
//   squareMeters: '500',
//   contractAddress: '0x...',
//   uri: 'ipfs://Qm...'
// }
```

#### Token Balance Operations

```typescript
// Get single balance
const balance = await rwa.getTokenBalance(
  propertyAddress,
  userAddress,
  provider
)

// Get batch balances (multiple accounts/tokens)
const balances = await rwa.getBatchTokenBalances(
  propertyAddress,
  ['0x...', '0x...'], // accounts
  [1, 1], // tokenIds
  provider
)
```

#### Token Transfers

```typescript
// Single token transfer
const txHash = await rwa.transferTokens(
  propertyAddress,
  fromAddress,
  toAddress,
  1, // PROPERTY_TOKEN_ID
  BigInt('1000'), // amount
  signer,
  '0x' // optional data
)

// Batch token transfer
const batchTxHash = await rwa.batchTransferTokens(
  propertyAddress,
  fromAddress,
  toAddress,
  [1, 1], // tokenIds
  [BigInt('100'), BigInt('200')], // amounts
  signer
)
```

#### Operator Approvals

```typescript
// Approve operator for all tokens
await rwa.setApprovalForAll(
  propertyAddress,
  operatorAddress,
  true, // approve
  signer
)

// Revoke operator approval
await rwa.setApprovalForAll(
  propertyAddress,
  operatorAddress,
  false, // revoke
  signer
)

// Check if operator is approved
const isApproved = await rwa.isApprovedForAll(
  propertyAddress,
  accountAddress,
  operatorAddress,
  provider
)
```

#### Property Ownership

```typescript
// Get property owner
const owner = await rwa.getPropertyOwner(propertyAddress, provider)

// Transfer property ownership
await rwa.transferPropertyOwnership(
  propertyAddress,
  newOwnerAddress,
  signer
)

// Renounce property ownership
await rwa.renouncePropertyOwnership(propertyAddress, signer)
```

#### Interface Support

```typescript
// Check if contract supports an interface (ERC165)
const supportsERC1155 = await rwa.supportsInterface(
  propertyAddress,
  '0xd9b67a26', // ERC1155 interface ID
  provider
)
```

## 📚 Complete Examples

### Example 1: Complete Property Lifecycle

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function completePropertyLifecycle() {
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
      description: 'A premium office building',
      isOwner: true,
      approximatedValue: BigInt('1000000000000000000000'),
      totalSupply: BigInt('1000000'),
      propertyAddress: '123 Main St',
      squareMeters: BigInt('500'),
      uri: 'ipfs://QmYourHash'
    }, signer)
    
    const propertyAddress = launchResult.propertyAddress
    console.log('✅ Property launched:', propertyAddress)
    
    // 3. Get property details
    const details = await rwa.getPropertyDetails(propertyAddress, provider)
    console.log('📋 Property details:', details)
    
    // 4. Check token balance
    const balance = await rwa.getTokenBalance(
      propertyAddress,
      userAddress,
      provider
    )
    console.log('💰 Your balance:', balance.toString())
    
    // 5. Transfer tokens
    const recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    console.log('📤 Transferring tokens...')
    const transferTx = await rwa.transferTokens(
      propertyAddress,
      userAddress,
      recipient,
      1,
      BigInt('100'),
      signer
    )
    console.log('✅ Transfer complete:', transferTx)
    
    // 6. Approve operator
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
    
    // 8. Get user properties
    const userProperties = await rwa.getUserProperties(userAddress, provider)
    console.log('📦 Your properties:', userProperties)
    
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  }
}
```

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
  
  // Get details for each property
  const propertyDetails = await Promise.all(
    properties.map(async (address) => {
      try {
        const details = await rwa.getPropertyDetails(address, provider)
        const balance = await rwa.getTokenBalance(
          address,
          '0xYourAddress',
          provider
        )
        return {
          ...details,
          userBalance: balance.toString()
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
  
  const propertyAddress = '0x...'
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

## 📖 API Reference

### `createRWAClient(config)`

Creates an RWA client instance.

**Parameters:**
- `config.factoryAddress` (string, required) - Factory contract address
- `config.chainId` (number, optional) - Chain ID
- `config.rpcUrl` (string, optional) - RPC URL

**Returns:** RWA client object

### Factory Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `launchProperty(params, signer)` | Launch a new property | `LaunchPropertyResult` |
| `getAllProperties(provider)` | Get all property addresses | `string[]` |
| `getPropertyCount(provider)` | Get total property count | `bigint` |
| `getProperty(index, provider)` | Get property by index | `string` |
| `getPropertyInfo(address, provider)` | Get property info | `ParsedRWAPropertyInfo` |
| `getUserProperties(user, provider)` | Get user's properties | `string[]` |
| `getUserPropertyCount(user, provider)` | Get user's property count | `bigint` |
| `getUserPropertyByIndex(user, index, provider)` | Get user property by index | `string` |
| `isValidProperty(address, provider)` | Validate property address | `boolean` |
| `getFactoryOwner(provider)` | Get factory owner | `string` |
| `transferFactoryOwnership(newOwner, signer)` | Transfer factory ownership | `string` (tx hash) |
| `renounceFactoryOwnership(signer)` | Renounce factory ownership | `string` (tx hash) |

### Property Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `getPropertyDetails(address, provider)` | Get complete property details | `ParsedRWAPropertyInfo` |
| `getTokenBalance(address, user, provider)` | Get token balance | `bigint` |
| `getBatchTokenBalances(address, accounts, tokenIds, provider)` | Get batch balances | `bigint[]` |
| `transferTokens(address, from, to, tokenId, amount, signer, data?)` | Transfer tokens | `string` (tx hash) |
| `batchTransferTokens(address, from, to, tokenIds, amounts, signer, data?)` | Batch transfer | `string` (tx hash) |
| `setApprovalForAll(address, operator, approved, signer)` | Approve/revoke operator | `string` (tx hash) |
| `isApprovedForAll(address, account, operator, provider)` | Check approval | `boolean` |
| `supportsInterface(address, interfaceId, provider)` | Check interface support | `boolean` |
| `getPropertyOwner(address, provider)` | Get property owner | `string` |
| `transferPropertyOwnership(address, newOwner, signer)` | Transfer ownership | `string` (tx hash) |
| `renouncePropertyOwnership(address, signer)` | Renounce ownership | `string` (tx hash) |

## 🔧 Types

All TypeScript types are exported for your convenience:

```typescript
import type {
  // RWA Types
  RWAPropertyInfo,
  ParsedRWAPropertyInfo,
  LaunchPropertyParams,
  RWASDKConfig,
  LaunchPropertyResult,
  RWAPropertyMetadata,
  
  // Payment/Subscription Types
  CheckoutOptions,
  VerifyResponse,
  SubscriptionStatusData,
  Plan,
  Subscription,
  AccessResponse
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
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "Factory address is required" Error

**Solution:** Make sure you provide a factory address when creating the client:

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
  const tx = await rwa.launchProperty(params, signer)
  // Wait for confirmation
  await tx.wait()
} catch (error) {
  if (error.reason) {
    console.error('Transaction failed:', error.reason)
  }
  // Check error.code for specific error types
}
```

#### 3. Provider Not Connected

**Solution:**
```typescript
// Check if provider is available
if (!window.ethereum) {
  throw new Error('Please install MetaMask or another wallet')
}

const provider = new ethers.BrowserProvider(window.ethereum)
await provider.send('eth_requestAccounts', [])
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

For ethers.js v5 compatibility, the SDK handles both versions automatically.

## 🛠️ Building

```bash
cd sdk
npm install
npm run build
```

Outputs to `dist/` with TypeScript declarations.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [Mantle Network](https://www.mantle.xyz/)
- [Mantle Explorer](https://explorer.mantle.xyz/)
- [Documentation](https://docs.mantle.xyz/)
- [GitHub Repository](https://github.com/adityajha2005/synq)

---

Made with ❤️ for the Mantle Network ecosystem
