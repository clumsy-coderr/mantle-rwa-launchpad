---
title: getPropertyDetails
description: Get detailed property information including metadata
---

Get comprehensive property details including metadata from IPFS.

## Usage

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'

const client = createRWAClient({
  provider: 'https://rpc.mantle.xyz'
})

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
const details = await client.getPropertyDetails(propertyAddress)
console.log('Property details:', details)
```

## Parameters

- `propertyAddress` (string) - Property contract address

## Returns

`Promise<ParsedRWAPropertyInfo>`

## ParsedRWAPropertyInfo Type

```typescript
interface ParsedRWAPropertyInfo {
  contractAddress: string      // Property contract address
  uri: string                   // IPFS metadata URI
  name: string                  // Property name
  description: string           // Property description
  image: string                 // Property image URL
  attributes: PropertyAttribute[] // Property attributes
  totalSupply: bigint          // Total token supply
  owner: string                // Property owner address
}
```

## Example Response

```typescript
{
  contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  uri: 'ipfs://QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7',
  name: 'Luxury Downtown Apartment',
  description: 'A premium 2-bedroom apartment in the city center',
  image: 'ipfs://QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7/image.jpg',
  attributes: [
    { trait_type: 'Location', value: 'Downtown' },
    { trait_type: 'Bedrooms', value: '2' },
    { trait_type: 'Square Footage', value: '1200' }
  ],
  totalSupply: 1000n,
  owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
}
```

## Related

- [getPropertyInfo](/docs/get-property-info) - Get basic property information
