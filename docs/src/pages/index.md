---
title: Getting Started
pageTitle: RWA Tokenized SDK | Real World Assets Tokenization
description: A comprehensive TypeScript SDK for tokenizing Real World Assets (RWA) on Mantle Network. Launch, manage, and trade tokenized properties with ERC1155 support.
---

# RWA Tokenized SDK

A comprehensive TypeScript SDK that enables developers to integrate **Real World Assets (RWA) tokenization** on Mantle Network into their applications. This SDK provides a complete interface to interact with RWA Factory and Property smart contracts, enabling seamless tokenization of real-world assets as ERC1155 tokens.

## ✨ Features

- 🏗️ **Complete RWA Operations** - Launch, manage, and query tokenized properties
- 💰 **ERC1155 Token Support** - Full token transfer, approval, and batch operations
- 🔐 **Ownership Management** - Factory and property ownership controls
- 📊 **Comprehensive Queries** - Get properties, balances, approvals, and more
- ⚡ **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🔌 **Provider Agnostic** - Works with ethers.js v5 and v6
- 🌐 **Mantle Network** - Optimized for Mantle Network (EVM-compatible)

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Install and set up the SDK in your project." /%}

{% quick-link title="Quick Start" icon="installation" href="/docs/quick-start" description="Get started with your first tokenized property in minutes." /%}

{% quick-link title="Factory Operations" icon="plugins" href="/docs/factory-operations" description="Launch and manage RWA properties through the factory." /%}

{% quick-link title="Property Operations" icon="presets" href="/docs/property-operations" description="Interact with tokenized properties and manage tokens." /%}

{% quick-link title="SDK Features" icon="plugins" href="/docs/sdk-features" description="Complete overview of all SDK features and functionality." /%}

{% /quick-links %}

---

## What is RWA Tokenization?

Real World Assets (RWA) tokenization is the process of converting physical assets (like real estate, collectibles, or commodities) into digital tokens on the blockchain. Each token represents a fractional ownership of the underlying asset, making it easier to trade, transfer, and manage ownership.

Our SDK makes it simple to:

- **Launch Properties**: Create new tokenized properties with custom metadata
- **Manage Tokens**: Transfer, approve, and batch operate on ERC1155 tokens
- **Query Data**: Get property information, balances, and ownership details
- **Control Ownership**: Manage factory and property ownership

---

## Quick Example

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

// Launch a property
const result = await rwa.launchProperty({
  assetName: 'Downtown Office Building',
  assetType: 'Real Estate',
  description: 'Premium office building in the heart of downtown',
  isOwner: true,
  approximatedValue: BigInt('1000000000000000000000'), // $1000
  totalSupply: BigInt('1000000'), // 1M tokens
  propertyAddress: '123 Main St, Downtown, City',
  squareMeters: BigInt('500'),
  uri: 'ipfs://QmXyZ123...' // IPFS metadata URI
}, signer)

console.log('Property Address:', result.propertyAddress)
console.log('Transaction Hash:', result.transactionHash)

// Get all properties
const properties = await rwa.getAllProperties(provider)
console.log(`Found ${properties.length} properties`)
```

---

## 🌐 Network Support

The SDK is optimized for **Mantle Network**, an EVM-compatible Layer 2 solution.

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Mantle Mainnet | 5000 | `https://rpc.mantle.xyz` | [explorer.mantle.xyz](https://explorer.mantle.xyz) |
| Mantle Testnet | 5001 | `https://rpc.testnet.mantle.xyz` | [explorer.testnet.mantle.xyz](https://explorer.testnet.mantle.xyz) |

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

---

## 📚 Documentation

Ready to get started? Check out our comprehensive documentation:

1. **[Installation Guide](/docs/installation)** - Set up the SDK in your project
2. **[Quick Start](/docs/quick-start)** - Launch your first property in minutes
3. **[SDK Features](/docs/sdk-features)** - Complete overview of all SDK features
4. **[Factory Operations](/docs/factory-operations)** - Learn all factory methods
5. **[Property Operations](/docs/property-operations)** - Manage tokens and properties
6. **[Examples](/docs/examples)** - Complete code examples for common use cases
7. **[API Reference](/docs/api-reference)** - Full API documentation with types
8. **[Troubleshooting](/docs/troubleshooting)** - Common issues and solutions

## 🔗 Additional Resources

- [Mantle Network](https://www.mantle.xyz/) - Official Mantle Network website
- [Mantle Explorer](https://explorer.mantle.xyz/) - Explore transactions and contracts
- [Mantle Documentation](https://docs.mantle.xyz/) - Mantle Network documentation

---

Made with ❤️ for the Mantle Network ecosystem
