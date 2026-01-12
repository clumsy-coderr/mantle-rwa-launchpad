---
title: Property Operations
description: Interact with tokenized properties and manage ERC1155 tokens
---

# Property Operations

Each tokenized property is an ERC1155 contract. Use these methods to interact with properties, manage tokens, handle approvals, and control ownership.

## Get Property Details

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

## Token Balance Operations

### Get Token Balance

Get token balance for a user (PROPERTY_TOKEN_ID = 1).

```typescript
const balance = await rwa.getTokenBalance(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // property address
  '0xUserAddress...',                            // user address
  provider
)

console.log('Balance:', balance.toString())
```

### Get Batch Token Balances

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

## Token Transfers

### Transfer Tokens

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

### Batch Transfer Tokens

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

## Operator Approvals

### Set Approval for All

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

### Check Approval

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

## Interface Support

### Check Interface Support

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

## Property Ownership

### Get Property Owner

Get the property contract owner address.

```typescript
const owner = await rwa.getPropertyOwner(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  provider
)

console.log('Property owner:', owner)
```

### Transfer Property Ownership

Transfer property ownership (only current owner).

```typescript
const txHash = await rwa.transferPropertyOwnership(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0xNewOwnerAddress...',
  signer
)
```

### Renounce Property Ownership

Renounce property ownership (only current owner).

```typescript
const txHash = await rwa.renouncePropertyOwnership(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  signer
)
```

## Complete Example

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function propertyOperationsExample() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const userAddress = await signer.getAddress()
    
    const rwa = createRWAClient({
      factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
    })
    
    const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    
    // Get property details (includes URI)
    const details = await rwa.getPropertyDetails(propertyAddress, provider)
    console.log('Property details:', details)
    console.log('Metadata URI:', details.uri)
    
    // Get token balance
    const balance = await rwa.getTokenBalance(
      propertyAddress,
      userAddress,
      provider
    )
    console.log('Your balance:', balance.toString())
    
    // Get batch balances for multiple accounts
    const accounts = [
      userAddress,
      '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      '0x8ba1f109551bD432803012645Hac136c22C9'
    ]
    const batchBalances = await rwa.getBatchTokenBalances(
      propertyAddress,
      accounts,
      [1, 1, 1], // PROPERTY_TOKEN_ID for all
      provider
    )
    console.log('Batch balances:', batchBalances.map(b => b.toString()))
    
    // Transfer tokens
    const recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    console.log('Transferring tokens...')
    const transferTx = await rwa.transferTokens(
      propertyAddress,
      userAddress,
      recipient,
      1, // PROPERTY_TOKEN_ID
      BigInt('100'),
      signer,
      '0x' // optional data
    )
    console.log('Transfer complete:', transferTx)
    
    // Batch transfer tokens
    const batchTransferTx = await rwa.batchTransferTokens(
      propertyAddress,
      userAddress,
      recipient,
      [1, 1], // token IDs
      [BigInt('50'), BigInt('75')], // amounts
      signer
    )
    console.log('Batch transfer complete:', batchTransferTx)
    
    // Approve operator (e.g., for marketplace)
    const operator = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    console.log('Approving operator...')
    await rwa.setApprovalForAll(propertyAddress, operator, true, signer)
    
    // Verify approval
    const isApproved = await rwa.isApprovedForAll(
      propertyAddress,
      userAddress,
      operator,
      provider
    )
    console.log('Operator approved:', isApproved)
    
    // Check interface support (ERC165)
    const supportsERC1155 = await rwa.supportsInterface(
      propertyAddress,
      '0xd9b67a26', // ERC1155 interface ID
      provider
    )
    console.log('Supports ERC1155:', supportsERC1155)
    
    // Get property owner
    const propertyOwner = await rwa.getPropertyOwner(propertyAddress, provider)
    console.log('Property owner:', propertyOwner)
    
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
```

## Next Steps

- [Factory Operations](/docs/factory-operations) - Launch and manage properties
- [Examples](/docs/examples) - Complete code examples
- [API Reference](/docs/api-reference) - Full API documentation

