---
title: SDK Features
description: Complete overview of all SDK features and functionality
---

**Integrated in minutes, not weeks.**

Our SDK provides a complete interface to interact with RWA Factory and Property smart contracts. Launch properties, transfer tokens, manage approvals, and query data with simple TypeScript functions.

## Key Features

- ✅ **Complete RWA Operations** - Launch, manage, and query tokenized properties
- ✅ **ERC1155 Token Support** - Full token transfer, approval, and batch operations
- ✅ **Full TypeScript Types** - Comprehensive type definitions for all methods
- ✅ **Mantle Network Optimized** - Optimized for Mantle Network (EVM-compatible)

## Quick Start Examples

### Launch Property

```typescript
import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const result = await rwa.launchProperty({
  assetName: "Downtown Office",
  assetType: "Real Estate",
  description: "Premium office building",
  isOwner: true,
  approximatedValue: BigInt("1000000000000"),
  totalSupply: BigInt("1000000"),
  propertyAddress: "123 Main St",
  squareMeters: BigInt("500"),
  uri: "ipfs://Qm..."
}, signer);
```

### Query Properties

```typescript
import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.mantle.xyz");

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const properties = await rwa.getAllProperties(provider);
const details = await rwa.getPropertyDetails(properties[0], provider);
const balance = await rwa.getTokenBalance(properties[0], "0x...", provider);
```

### Transfer Tokens

```typescript
import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

const txHash = await rwa.transferTokens(
  "0xPropertyAddress",
  "0xFromAddress",
  "0xToAddress",
  1, // PROPERTY_TOKEN_ID
  BigInt("1000"),
  signer
);
```

### Manage Approvals

```typescript
import { createRWAClient } from "rwa-tokenized-sdk";
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const rwa = createRWAClient({
  factoryAddress: "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"
});

await rwa.setApprovalForAll(
  "0xPropertyAddress",
  "0xOperatorAddress",
  true, // approve
  signer
);

const isApproved = await rwa.isApprovedForAll(
  "0xPropertyAddress",
  "0xAccountAddress",
  "0xOperatorAddress",
  provider
);
```

---

## Complete SDK Functionality

Explore all the powerful features available in the RWA SDK.

### Factory Operations

Complete set of methods to interact with the RWA Factory contract.

- ✅ `getAllProperties()` - Get all property addresses from the factory
- ✅ `getPropertyCount()` - Get total number of properties
- ✅ `getUserProperties()` - Get all properties for a specific user
- ✅ `isValidProperty()` - Check if an address is a valid property contract
- ✅ `getPropertyInfo()` - Get property information from factory registry
- ✅ `getProperty()` - Get property address by index
- ✅ `getUserPropertyCount()` - Get user's property count
- ✅ `getUserPropertyByIndex()` - Get user property by index
- ✅ `getFactoryOwner()` - Get factory owner address
- ✅ `transferFactoryOwnership()` - Transfer factory ownership
- ✅ `renounceFactoryOwnership()` - Renounce factory ownership

**Example:**

```typescript
// Get all properties
const properties = await rwa.getAllProperties(provider);
console.log(`Found ${properties.length} properties`);

// Get property count
const count = await rwa.getPropertyCount(provider);
console.log(`Total properties: ${count.toString()}`);

// Get user's properties
const userProperties = await rwa.getUserProperties(userAddress, provider);
console.log(`User has ${userProperties.length} properties`);
```

---

### Token Operations

Full ERC1155 token support for managing token balances and transfers.

- ✅ `getTokenBalance()` - Get token balance for a user
- ✅ `getBatchTokenBalances()` - Get batch token balances for multiple accounts
- ✅ `transferTokens()` - Transfer tokens from one address to another
- ✅ `batchTransferTokens()` - Batch transfer multiple token types

**Example:**

```typescript
// Get single balance
const balance = await rwa.getTokenBalance(
  propertyAddress,
  userAddress,
  provider
);
console.log('Balance:', balance.toString());

// Get batch balances
const balances = await rwa.getBatchTokenBalances(
  propertyAddress,
  ['0x...', '0x...', '0x...'],
  [1, 1, 1], // PROPERTY_TOKEN_ID for all
  provider
);

// Transfer tokens
const txHash = await rwa.transferTokens(
  propertyAddress,
  fromAddress,
  toAddress,
  1, // PROPERTY_TOKEN_ID
  BigInt('1000'),
  signer
);
```

---

### Approval Management

Manage operator approvals for ERC1155 tokens.

- ✅ `setApprovalForAll()` - Approve or revoke operator for all tokens
- ✅ `isApprovedForAll()` - Check if operator is approved
- ✅ `supportsInterface()` - Check interface support (ERC165)

**Example:**

```typescript
// Approve operator
await rwa.setApprovalForAll(
  propertyAddress,
  operatorAddress,
  true, // approve
  signer
);

// Check approval
const isApproved = await rwa.isApprovedForAll(
  propertyAddress,
  accountAddress,
  operatorAddress,
  provider
);

// Check ERC1155 support
const supportsERC1155 = await rwa.supportsInterface(
  propertyAddress,
  '0xd9b67a26', // ERC1155 interface ID
  provider
);
```

---

### Property Queries

Query detailed information about tokenized properties.

- ✅ `getPropertyDetails()` - Get complete property details with URI
- ✅ `getPropertyInfo()` - Get property information from factory
- ✅ `getPropertyOwner()` - Get property contract owner

**Example:**

```typescript
// Get complete property details (includes URI)
const details = await rwa.getPropertyDetails(propertyAddress, provider);
console.log('Property:', details.assetName);
console.log('URI:', details.uri);

// Get property info from factory
const info = await rwa.getPropertyInfo(propertyAddress, provider);

// Get property owner
const owner = await rwa.getPropertyOwner(propertyAddress, provider);
```

---

### Ownership Management

Manage factory and property ownership.

- ✅ `transferFactoryOwnership()` - Transfer factory ownership (only owner)
- ✅ `renounceFactoryOwnership()` - Renounce factory ownership (only owner)
- ✅ `getFactoryOwner()` - Get factory owner address
- ✅ `transferPropertyOwnership()` - Transfer property ownership (only owner)
- ✅ `renouncePropertyOwnership()` - Renounce property ownership (only owner)
- ✅ `getPropertyOwner()` - Get property owner address

**Example:**

```typescript
// Get factory owner
const factoryOwner = await rwa.getFactoryOwner(provider);

// Transfer factory ownership
await rwa.transferFactoryOwnership(newOwnerAddress, signer);

// Transfer property ownership
await rwa.transferPropertyOwnership(
  propertyAddress,
  newOwnerAddress,
  signer
);
```

---

### Advanced Features

Additional capabilities that make the SDK powerful and developer-friendly.

- ✅ **Type-safe responses** - Full TypeScript support with comprehensive types
- ✅ **Error handling** - Comprehensive error handling and validation
- ✅ **Provider agnostic** - Works with ethers.js v5 and v6
- ✅ **Full TypeScript support** - Complete type definitions for all methods
- ✅ **Batch operations** - Efficient batch operations for multiple tokens
- ✅ **Mantle Network optimized** - Optimized for Mantle Network

**Type Safety Example:**

```typescript
import type {
  LaunchPropertyParams,
  ParsedRWAPropertyInfo,
  LaunchPropertyResult
} from 'rwa-tokenized-sdk'

// All methods return properly typed responses
const result: LaunchPropertyResult = await rwa.launchProperty(params, signer)
const details: ParsedRWAPropertyInfo = await rwa.getPropertyDetails(
  propertyAddress,
  provider
)
```

---

## SDK Highlights

The RWA SDK is designed with developer experience in mind:

- **Type-safe SDK** - Full TypeScript support with comprehensive type definitions
- **Complete API** - All factory and property operations in one place
- **Mantle Network** - Optimized for Mantle Network with full EVM compatibility
- **Provider Agnostic** - Works seamlessly with ethers.js v5 and v6
- **Error Handling** - Comprehensive error handling and validation
- **Batch Operations** - Efficient batch operations for multiple tokens

---

## Next Steps

- [Installation Guide](/docs/installation) - Set up the SDK
- [Quick Start](/docs/quick-start) - Launch your first property
- [Factory Operations](/docs/factory-operations) - Learn all factory methods
- [Property Operations](/docs/property-operations) - Manage tokens
- [API Reference](/docs/api-reference) - Full API documentation
- [Examples](/docs/examples) - Complete code examples

