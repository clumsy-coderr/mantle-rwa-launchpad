---
title: Installation
description: Install and set up the RWA Tokenized SDK in your project
---

# Installation

Get started by installing the RWA Tokenized SDK in your project.

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- A project using TypeScript or JavaScript
- Access to Mantle Network (Mainnet or Testnet)

## Install the SDK

```bash
npm install rwa-tokenized-sdk
# or
yarn add rwa-tokenized-sdk
# or
pnpm add rwa-tokenized-sdk
```

## Peer Dependencies

The SDK requires `ethers.js` as a peer dependency:

```bash
npm install ethers@^6.0.0
```

For React applications (optional):

```bash
npm install react@^18.0.0 react-markdown@^10.0.0 lucide-react@^0.500.0
```

> **Note:** The SDK is provider agnostic and works with both ethers.js v5 and v6, but v6 is recommended for the best experience.

## Build the SDK (Development)

If you're working with the SDK source code directly:

```bash
# From root directory
cd sdk
npm install
npm run build
```

**Output:** Compiled JS + TypeScript declarations in `sdk/dist/`

## Import the SDK

```typescript
import { createRWAClient, createDefaultRWAClient } from 'rwa-tokenized-sdk'
import type { 
  LaunchPropertyParams,
  ParsedRWAPropertyInfo,
  LaunchPropertyResult
} from 'rwa-tokenized-sdk'
```

## Basic Setup

```typescript
import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

// Connect to Mantle Network
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')

// Create RWA client with factory address
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3'
})

// Or use default factory address
const rwa = createDefaultRWAClient()
```

## Configuration Options

```typescript
interface RWASDKConfig {
  factoryAddress: string  // Required: Factory contract address
  chainId?: number        // Optional: Chain ID (default: 5000 for Mantle Mainnet)
  rpcUrl?: string        // Optional: Custom RPC URL
}
```

### Default Factory Address

The SDK provides a default factory address for convenience:

```typescript
import { createDefaultRWAClient, DEFAULT_FACTORY_ADDRESS } from 'rwa-tokenized-sdk'

// Use default factory address
const rwa = createDefaultRWAClient()

// Or access the constant directly
console.log('Default factory:', DEFAULT_FACTORY_ADDRESS)
// Output: 0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3
```

## Next Steps

- [Quick Start Guide](/docs/quick-start) - Launch your first property
- [Factory Operations](/docs/factory-operations) - Learn about factory methods
- [Property Operations](/docs/property-operations) - Manage tokens

