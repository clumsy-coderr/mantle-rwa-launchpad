---
title: Troubleshooting
description: Common issues and solutions
---

Common issues you might encounter and how to resolve them.

## Common Issues

### 1. "Factory address is required" Error

**Error:**
```
Error: Factory address is required
```

**Solution:** Make sure you provide a factory address when creating the client:

```typescript
const rwa = createRWAClient({
  factoryAddress: '0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3' // Required!
})
```

### 2. Transaction Reverted

**Error:**
```
Transaction reverted
```

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

### 3. Provider Not Connected

**Error:**
```
Provider not connected
```

**Solution:**
```typescript
// Check if provider is available
if (!window.ethereum) {
  throw new Error('Please install MetaMask or another wallet')
}

const provider = new ethers.BrowserProvider(window.ethereum)
await provider.send('eth_requestAccounts', [])
const signer = await provider.getSigner()
```

### 4. Wrong Network

**Error:**
```
Network mismatch
```

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

### 5. Type Errors with ethers.js

**Error:**
```
Type errors with ethers.js
```

**Solution:** Make sure you're using ethers.js v6:

```bash
npm install ethers@^6.0.0
```

The SDK handles both ethers.js v5 and v6 automatically, but v6 is recommended.

### 6. PropertyLaunched Event Not Found

**Error:**
```
PropertyLaunched event not found in transaction receipt
```

**Solution:** This can happen if the transaction receipt structure is different. Check the transaction hash manually:

```typescript
try {
  const result = await rwa.launchProperty(params, signer)
  // If propertyAddress is missing, check the transaction manually
  if (!result.propertyAddress) {
    console.log('Check transaction:', result.transactionHash)
    // You can query the factory for the latest property
    const count = await rwa.getPropertyCount(provider)
    const latestProperty = await rwa.getProperty(Number(count) - 1, provider)
    console.log('Latest property:', latestProperty)
  }
} catch (error) {
  console.error('Error:', error)
}
```

### 7. Invalid Recipient Address

**Error:**
```
Invalid recipient address
```

**Solution:** Make sure the recipient address is valid and not the zero address:

```typescript
// Validate address before transfer
if (!to || to === '0x0000000000000000000000000000000000000000') {
  throw new Error('Invalid recipient address')
}

await rwa.transferTokens(
  propertyAddress,
  from,
  to,
  1,
  BigInt('100'),
  signer
)
```

### 8. Insufficient Balance

**Error:**
```
Insufficient balance
```

**Solution:** Check balance before transferring:

```typescript
const balance = await rwa.getTokenBalance(
  propertyAddress,
  userAddress,
  provider
)

if (balance < amount) {
  throw new Error(`Insufficient balance. You have ${balance.toString()}, need ${amount.toString()}`)
}

await rwa.transferTokens(
  propertyAddress,
  userAddress,
  recipient,
  1,
  amount,
  signer
)
```

### 9. Operator Not Approved

**Error:**
```
Operator not approved
```

**Solution:** Approve operator before allowing them to transfer:

```typescript
// Check approval first
const isApproved = await rwa.isApprovedForAll(
  propertyAddress,
  userAddress,
  operatorAddress,
  provider
)

if (!isApproved) {
  // Approve operator
  await rwa.setApprovalForAll(
    propertyAddress,
    operatorAddress,
    true,
    signer
  )
}
```

### 10. Array Length Mismatch

**Error:**
```
Accounts and tokenIds arrays must have the same length
```

**Solution:** Ensure arrays have matching lengths:

```typescript
const accounts = ['0x...', '0x...']
const tokenIds = [1, 1] // Must match accounts length

const balances = await rwa.getBatchTokenBalances(
  propertyAddress,
  accounts,
  tokenIds,
  provider
)
```

### 11. Invalid Parameters Error

**Error:**
```
Asset name is required
Description is required
Approximated value must be positive
```

**Solution:** Validate all parameters before launching:

```typescript
// Validate parameters
if (!params.assetName || params.assetName.trim() === '') {
  throw new Error('Asset name is required')
}

if (!params.uri || params.uri.trim() === '') {
  throw new Error('URI is required')
}

if (BigInt(params.approximatedValue) <= 0n) {
  throw new Error('Approximated value must be positive')
}

if (BigInt(params.totalSupply) <= 0n) {
  throw new Error('Total supply must be positive')
}

// Then launch
const result = await rwa.launchProperty(params, signer)
```

### 12. Network Connection Issues

**Error:**
```
Network error
RPC endpoint not responding
```

**Solution:** Check network connection and RPC endpoint:

```typescript
// Test provider connection
try {
  const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
  const blockNumber = await provider.getBlockNumber()
  console.log('Connected to network, latest block:', blockNumber)
} catch (error) {
  console.error('Network connection failed:', error)
  // Try alternative RPC or check internet connection
}
```

## Getting Help

If you're still experiencing issues:

1. Check the [API Reference](/docs/api-reference) for method signatures
2. Review the [Examples](/docs/examples) for working code
3. Verify your network connection and RPC endpoint
4. Check transaction status on [Mantle Explorer](https://explorer.mantle.xyz)

## Network Configuration

Make sure you're connected to the correct network:

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Mantle Mainnet | 5000 | `https://rpc.mantle.xyz` | [explorer.mantle.xyz](https://explorer.mantle.xyz) |
| Mantle Testnet | 5001 | `https://rpc.testnet.mantle.xyz` | [explorer.testnet.mantle.xyz](https://explorer.testnet.mantle.xyz) |

### Switching Networks Programmatically

```typescript
// Check current network
const network = await provider.getNetwork()
console.log('Current network:', network.chainId)

// Switch to Mantle Mainnet
if (network.chainId !== 5000n) {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1388' }] // 5000 in hex
    })
  } catch (switchError: any) {
    // If network doesn't exist, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1388',
          chainName: 'Mantle',
          nativeCurrency: {
            name: 'MNT',
            symbol: 'MNT',
            decimals: 18
          },
          rpcUrls: ['https://rpc.mantle.xyz'],
          blockExplorerUrls: ['https://explorer.mantle.xyz']
        }]
      })
    }
  }
}
```

## Next Steps

- [Installation](/docs/installation) - Set up the SDK
- [Quick Start](/docs/quick-start) - Get started
- [API Reference](/docs/api-reference) - Full API documentation

