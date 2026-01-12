---
title: API Reference
description: Complete API reference for all SDK methods
---

Complete reference for all methods and types in the RWA Tokenized SDK.

## Creating a Client

### `createRWAClient(config)`

Creates an RWA client instance with custom configuration.

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3', // Required
  chainId: 5000,        // Optional: Mantle Mainnet
  rpcUrl: 'https://rpc.mantle.xyz' // Optional
})
```

**Parameters:**
- `config.factoryAddress` (string, required) - Factory contract address
- `config.chainId` (number, optional) - Chain ID
- `config.rpcUrl` (string, optional) - RPC URL

**Returns:** RWA client object

### `createDefaultRWAClient(overrides?)`

Creates an RWA client with default factory address.

```typescript
import { createDefaultRWAClient } from 'rwa-tokenized-sdk'

const rwa = createDefaultRWAClient({
  chainId: 5000 // Optional override
})
```

## Factory Methods

### `launchProperty(params, signer)`

Launch a new tokenized property.

**Parameters:**
- `params.assetName` (string, required)
- `params.assetType` (string, required)
- `params.description` (string, required)
- `params.isOwner` (boolean, required)
- `params.approximatedValue` (bigint | string, required)
- `params.totalSupply` (bigint | string, required)
- `params.propertyAddress` (string, required)
- `params.squareMeters` (bigint | string, required)
- `params.uri` (string, required)
- `signer` (Signer, required)

**Returns:** `Promise<LaunchPropertyResult>`

```typescript
interface LaunchPropertyResult {
  transactionHash: string
  propertyAddress: string
  propertyId: number
}
```

### `getAllProperties(provider)`

Get all property addresses from the factory.

**Returns:** `Promise<string[]>`

### `getPropertyCount(provider)`

Get total number of properties.

**Returns:** `Promise<bigint>`

### `getProperty(index, provider)`

Get property address by index.

**Parameters:**
- `index` (bigint | number)
- `provider` (Provider)

**Returns:** `Promise<string>`

### `getPropertyInfo(propertyAddress, provider)`

Get property information from factory registry.

**Parameters:**
- `propertyAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<ParsedRWAPropertyInfo>`

### `getUserProperties(userAddress, provider)`

Get all properties for a user.

**Parameters:**
- `userAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<string[]>`

### `getUserPropertyCount(userAddress, provider)`

Get user's property count.

**Parameters:**
- `userAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<bigint>`

### `getUserPropertyByIndex(userAddress, index, provider)`

Get user property by index.

**Parameters:**
- `userAddress` (string)
- `index` (bigint | number)
- `provider` (Provider)

**Returns:** `Promise<string>`

### `getFactoryAddress()`

Get the factory address used by this client instance.

**Returns:** `string`

### `isValidProperty(propertyAddress, provider)`

Check if address is a valid property.

**Parameters:**
- `propertyAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<boolean>`

### `getFactoryOwner(provider)`

Get factory owner address.

**Returns:** `Promise<string>`

### `transferFactoryOwnership(newOwner, signer)`

Transfer factory ownership (only owner).

**Parameters:**
- `newOwner` (string)
- `signer` (Signer)

**Returns:** `Promise<string>` (transaction hash)

### `renounceFactoryOwnership(signer)`

Renounce factory ownership (only owner).

**Parameters:**
- `signer` (Signer)

**Returns:** `Promise<string>` (transaction hash)

## Property Methods

### `getPropertyDetails(propertyAddress, provider)`

Get complete property details with URI.

**Parameters:**
- `propertyAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<ParsedRWAPropertyInfo>`

### `getTokenBalance(propertyAddress, userAddress, provider)`

Get token balance for a user.

**Parameters:**
- `propertyAddress` (string)
- `userAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<bigint>`

### `getBatchTokenBalances(propertyAddress, accounts, tokenIds, provider)`

Get batch token balances.

**Parameters:**
- `propertyAddress` (string)
- `accounts` (string[])
- `tokenIds` ((bigint | number)[])
- `provider` (Provider)

**Returns:** `Promise<bigint[]>`

### `transferTokens(propertyAddress, from, to, tokenId, amount, signer, data?)`

Transfer tokens.

**Parameters:**
- `propertyAddress` (string)
- `from` (string)
- `to` (string)
- `tokenId` (bigint | number)
- `amount` (bigint | string)
- `signer` (Signer)
- `data` (string, optional, default: "0x")

**Returns:** `Promise<string>` (transaction hash)

### `batchTransferTokens(propertyAddress, from, to, tokenIds, amounts, signer, data?)`

Batch transfer tokens.

**Parameters:**
- `propertyAddress` (string)
- `from` (string)
- `to` (string)
- `tokenIds` ((bigint | number)[])
- `amounts` ((bigint | string)[])
- `signer` (Signer)
- `data` (string, optional, default: "0x")

**Returns:** `Promise<string>` (transaction hash)

### `setApprovalForAll(propertyAddress, operator, approved, signer)`

Approve or revoke operator.

**Parameters:**
- `propertyAddress` (string)
- `operator` (string)
- `approved` (boolean)
- `signer` (Signer)

**Returns:** `Promise<string>` (transaction hash)

### `isApprovedForAll(propertyAddress, account, operator, provider)`

Check operator approval.

**Parameters:**
- `propertyAddress` (string)
- `account` (string)
- `operator` (string)
- `provider` (Provider)

**Returns:** `Promise<boolean>`

### `supportsInterface(propertyAddress, interfaceId, provider)`

Check interface support (ERC165).

**Parameters:**
- `propertyAddress` (string)
- `interfaceId` (string)
- `provider` (Provider)

**Returns:** `Promise<boolean>`

### `getPropertyOwner(propertyAddress, provider)`

Get property owner address.

**Parameters:**
- `propertyAddress` (string)
- `provider` (Provider)

**Returns:** `Promise<string>`

### `transferPropertyOwnership(propertyAddress, newOwner, signer)`

Transfer property ownership (only owner).

**Parameters:**
- `propertyAddress` (string)
- `newOwner` (string)
- `signer` (Signer)

**Returns:** `Promise<string>` (transaction hash)

### `renouncePropertyOwnership(propertyAddress, signer)`

Renounce property ownership (only owner).

**Parameters:**
- `propertyAddress` (string)
- `signer` (Signer)

**Returns:** `Promise<string>` (transaction hash)

## Type Definitions

All types are exported from the SDK for your convenience:

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

### `RWASDKConfig`

Configuration for creating an RWA client.

```typescript
interface RWASDKConfig {
  factoryAddress: string  // Required: Factory contract address
  chainId?: number        // Optional: Chain ID (default: 5000 for Mantle Mainnet)
  rpcUrl?: string        // Optional: Custom RPC URL
}
```

### `LaunchPropertyParams`

Parameters for launching a new property.

```typescript
interface LaunchPropertyParams {
  assetName: string              // Required: Name of the asset
  assetType: string              // Required: Type of asset (e.g., "Real Estate")
  description: string            // Required: Detailed description
  isOwner: boolean               // Required: Whether the issuer owns the asset
  approximatedValue: bigint | string  // Required: Value in wei (18 decimals)
  totalSupply: bigint | string   // Required: Total token supply
  propertyAddress: string        // Required: Physical address
  squareMeters: bigint | string   // Required: Size in square meters
  uri: string                    // Required: IPFS metadata URI
}
```

### `LaunchPropertyResult`

Result returned after successfully launching a property.

```typescript
interface LaunchPropertyResult {
  transactionHash: string  // Transaction hash
  propertyAddress: string  // Address of the new property contract
  propertyId: number       // Property ID assigned by the factory
}
```

### `ParsedRWAPropertyInfo`

Property information with string values (parsed from contract).

```typescript
interface ParsedRWAPropertyInfo {
  assetName: string
  assetType: string
  description: string
  isOwner: boolean
  approximatedValue: string      // BigInt converted to string
  totalSupply: string            // BigInt converted to string
  propertyAddress: string
  squareMeters: string           // BigInt converted to string
  contractAddress?: string      // Property contract address (when from getPropertyDetails)
  uri?: string                   // IPFS metadata URI (when from getPropertyDetails)
}
```

### `RWAPropertyInfo`

Raw property information from contract (with BigInt values).

```typescript
interface RWAPropertyInfo {
  assetName: string
  assetType: string
  description: string
  isOwner: boolean
  approximatedValue: bigint
  totalSupply: bigint
  propertyAddress: string
  squareMeters: bigint
}
```

### `RWAPropertyMetadata`

Metadata structure for IPFS/off-chain storage.

```typescript
interface RWAPropertyMetadata {
  name: string
  description: string
  image?: string
  external_url?: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
  properties?: {
    assetType: string
    approximatedValue: string
    totalSupply: string
    propertyAddress?: string
    squareMeters?: string
    isOwner: boolean
  }
}
```

## Events

The RWA contracts emit events that can be listened to for tracking property launches, token transfers, approvals, and ownership changes.

### Factory Events

#### `PropertyLaunched`

Emitted when a new property is launched through the factory.

```solidity
event PropertyLaunched(
    address indexed propertyContract,
    address indexed issuer,
    string assetName,
    string assetType,
    uint256 indexed propertyId
)
```

**Parameters:**
- `propertyContract` (address, indexed) - Address of the newly created property contract
- `issuer` (address, indexed) - Address that launched the property
- `assetName` (string) - Name of the asset
- `assetType` (string) - Type of the asset (e.g., "Real Estate", "Art")
- `propertyId` (uint256, indexed) - Property ID assigned by the factory (index in allProperties array)

**Example:**
```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const factoryAddress = '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'

// Listen for PropertyLaunched events
const factory = new ethers.Contract(factoryAddress, [
  'event PropertyLaunched(address indexed propertyContract, address indexed issuer, string assetName, string assetType, uint256 indexed propertyId)'
], provider)

factory.on('PropertyLaunched', (propertyContract, issuer, assetName, assetType, propertyId) => {
  console.log('New property launched!')
  console.log('Property Contract:', propertyContract)
  console.log('Issuer:', issuer)
  console.log('Asset Name:', assetName)
  console.log('Asset Type:', assetType)
  console.log('Property ID:', propertyId.toString())
})
```

### Property Events (ERC1155)

Each property contract inherits from ERC1155 and emits standard ERC1155 events.

#### `TransferSingle`

Emitted when a single token type is transferred.

```solidity
event TransferSingle(
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256 id,
    uint256 value
)
```

**Parameters:**
- `operator` (address, indexed) - Address that performed the transfer
- `from` (address, indexed) - Address tokens were transferred from (zero address for minting)
- `to` (address, indexed) - Address tokens were transferred to (zero address for burning)
- `id` (uint256) - Token ID (always 1 for PROPERTY_TOKEN_ID)
- `value` (uint256) - Amount of tokens transferred

**Example:**
```typescript
const property = new ethers.Contract(propertyAddress, [
  'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)'
], provider)

property.on('TransferSingle', (operator, from, to, id, value) => {
  console.log('Token transfer:')
  console.log('Operator:', operator)
  console.log('From:', from)
  console.log('To:', to)
  console.log('Token ID:', id.toString())
  console.log('Amount:', value.toString())
})
```

#### `TransferBatch`

Emitted when multiple token types are transferred in a batch.

```solidity
event TransferBatch(
    address indexed operator,
    address indexed from,
    address indexed to,
    uint256[] ids,
    uint256[] values
)
```

**Parameters:**
- `operator` (address, indexed) - Address that performed the transfer
- `from` (address, indexed) - Address tokens were transferred from
- `to` (address, indexed) - Address tokens were transferred to
- `ids` (uint256[]) - Array of token IDs
- `values` (uint256[]) - Array of amounts transferred

#### `ApprovalForAll`

Emitted when an operator is approved or revoked for all tokens.

```solidity
event ApprovalForAll(
    address indexed account,
    address indexed operator,
    bool approved
)
```

**Parameters:**
- `account` (address, indexed) - Token owner address
- `operator` (address, indexed) - Operator address
- `approved` (bool) - Whether the operator is approved (true) or revoked (false)

**Example:**
```typescript
property.on('ApprovalForAll', (account, operator, approved) => {
  console.log('Approval changed:')
  console.log('Account:', account)
  console.log('Operator:', operator)
  console.log('Approved:', approved)
})
```

### Ownership Events

Both Factory and Property contracts inherit from Ownable and emit ownership transfer events.

#### `OwnershipTransferred`

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
)
```

**Parameters:**
- `previousOwner` (address, indexed) - Previous owner address
- `newOwner` (address, indexed) - New owner address (zero address if ownership is renounced)

**Example:**
```typescript
// Listen for factory ownership changes
const factoryOwnable = new ethers.Contract(factoryAddress, [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
], provider)

factoryOwnable.on('OwnershipTransferred', (previousOwner, newOwner) => {
  console.log('Factory ownership transferred:')
  console.log('Previous Owner:', previousOwner)
  console.log('New Owner:', newOwner)
})

// Listen for property ownership changes
const propertyOwnable = new ethers.Contract(propertyAddress, [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
], provider)

propertyOwnable.on('OwnershipTransferred', (previousOwner, newOwner) => {
  console.log('Property ownership transferred:')
  console.log('Previous Owner:', previousOwner)
  console.log('New Owner:', newOwner)
})
```

### Complete Event Listening Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function listenToEvents() {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const factoryAddress = '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
  
  // Factory ABI for events
  const factoryABI = [
    'event PropertyLaunched(address indexed propertyContract, address indexed issuer, string assetName, string assetType, uint256 indexed propertyId)',
    'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
  ]
  
  const factory = new ethers.Contract(factoryAddress, factoryABI, provider)
  
  // Listen for new property launches
  factory.on('PropertyLaunched', async (propertyContract, issuer, assetName, assetType, propertyId) => {
    console.log('🎉 New Property Launched!')
    console.log('Property:', propertyContract)
    console.log('Issuer:', issuer)
    console.log('Name:', assetName)
    console.log('Type:', assetType)
    console.log('ID:', propertyId.toString())
    
    // Now listen to this property's events
    const propertyABI = [
      'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)',
      'event ApprovalForAll(address indexed account, address indexed operator, bool approved)'
    ]
    
    const property = new ethers.Contract(propertyContract, propertyABI, provider)
    
    property.on('TransferSingle', (operator, from, to, id, value) => {
      console.log(`📦 Transfer: ${value.toString()} tokens from ${from} to ${to}`)
    })
    
    property.on('ApprovalForAll', (account, operator, approved) => {
      console.log(`🔐 Approval: ${account} ${approved ? 'approved' : 'revoked'} ${operator}`)
    })
  })
  
  // Listen for factory ownership changes
  factory.on('OwnershipTransferred', (previousOwner, newOwner) => {
    console.log(`👑 Factory ownership: ${previousOwner} → ${newOwner}`)
  })
  
  console.log('👂 Listening for events...')
}
```

## Next Steps

- [Examples](/docs/examples) - Complete code examples
- [Troubleshooting](/docs/troubleshooting) - Common issues and solutions

