---
title: Examples
description: Complete code examples for common use cases
---

Complete, working examples for common use cases with the RWA Tokenized SDK.

## Example 1: Launch and Manage a Property

A complete lifecycle example from launching a property to managing tokens.

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

## Example 2: Marketplace Integration

Build a marketplace that displays all available properties with user balances.

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

async function marketplaceExample(userAddress?: string) {
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
    const rwa = createRWAClient({
      factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
    })
    
    // Get all properties
    const properties = await rwa.getAllProperties(provider)
    console.log(`Found ${properties.length} properties`)
    
    // Get total count
    const totalCount = await rwa.getPropertyCount(provider)
    console.log(`Total properties: ${totalCount.toString()}`)
    
    // Get details for each property
    const propertyDetails = await Promise.all(
      properties.map(async (address) => {
        try {
          const [details, isValid] = await Promise.all([
            rwa.getPropertyDetails(address, provider),
            rwa.isValidProperty(address, provider)
          ])
          
          // Get user balance if address provided
          let userBalance = '0'
          if (userAddress) {
            const balance = await rwa.getTokenBalance(
              address,
              userAddress,
              provider
            )
            userBalance = balance.toString()
          }
          
          return {
            ...details,
            index: properties.indexOf(address),
            totalProperties: totalCount.toString(),
            isValid,
            userBalance
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
  } catch (error) {
    console.error('Marketplace error:', error)
    throw error
  }
}
```

## Example 3: Batch Operations

Efficiently handle multiple token operations at once.

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

## Example 4: React/Wagmi Integration

Use the SDK with React and Wagmi for wallet connections.

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

## Example 5: Property Portfolio Manager

Track and manage multiple properties with comprehensive information.

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'
import type { ParsedRWAPropertyInfo } from 'rwa-tokenized-sdk'

interface PropertyPortfolio {
  address: string
  details: ParsedRWAPropertyInfo
  balance: string
  owner: string
  percentageOwned: string
  totalValue: string
}

async function getPropertyPortfolio(userAddress: string) {
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
    const rwa = createRWAClient({
      factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
    })
    
    // Get user's properties
    const userProperties = await rwa.getUserProperties(userAddress, provider)
    const userCount = await rwa.getUserPropertyCount(userAddress, provider)
    
    console.log(`Loading portfolio for ${userAddress}`)
    console.log(`Total properties: ${userCount.toString()}`)
    
    // Get details for each property
    const portfolio: PropertyPortfolio[] = await Promise.all(
      userProperties.map(async (propertyAddress) => {
        const [details, balance, owner] = await Promise.all([
          rwa.getPropertyDetails(propertyAddress, provider),
          rwa.getTokenBalance(propertyAddress, userAddress, provider),
          rwa.getPropertyOwner(propertyAddress, provider)
        ])
        
        // Calculate percentage owned
        const totalSupply = BigInt(details.totalSupply)
        const userBalance = balance
        const percentage = (Number(userBalance) / Number(totalSupply)) * 100
        
        // Calculate total value owned
        const approximatedValue = BigInt(details.approximatedValue)
        const valueOwned = (approximatedValue * userBalance) / totalSupply
        
        return {
          address: propertyAddress,
          details,
          balance: balance.toString(),
          owner,
          percentageOwned: percentage.toFixed(2) + '%',
          totalValue: valueOwned.toString()
        }
      })
    )
    
    // Calculate total portfolio value
    const totalPortfolioValue = portfolio.reduce((sum, prop) => {
      return sum + BigInt(prop.totalValue)
    }, 0n)
    
    console.log(`Total portfolio value: ${totalPortfolioValue.toString()} wei`)
    
    return {
      properties: portfolio,
      totalProperties: portfolio.length,
      totalValue: totalPortfolioValue.toString()
    }
  } catch (error) {
    console.error('Portfolio error:', error)
    throw error
  }
}
```

## Next Steps

- [Factory Operations](/docs/factory-operations) - Learn all factory methods
- [Property Operations](/docs/property-operations) - Manage tokens and transfers
- [API Reference](/docs/api-reference) - Full API documentation
- [Troubleshooting](/docs/troubleshooting) - Common issues and solutions

