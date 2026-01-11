import type { 
  RWAPropertyInfo, 
  ParsedRWAPropertyInfo, 
  LaunchPropertyParams,
  RWASDKConfig,
  LaunchPropertyResult
} from "../types"

/**
 * RWA Launchpad Client
 * 
 * Complete SDK for interacting with RWA Factory and Property contracts.
 * Supports all contract operations including:
 * 
 * Factory Operations:
 * - launchProperty: Create new RWA properties
 * - getAllProperties: Get all property addresses
 * - getPropertyCount: Get total property count
 * - getProperty: Get property by index
 * - getPropertyInfo: Get property information
 * - getUserProperties: Get user's properties
 * - getUserPropertyCount: Get user's property count
 * - getUserPropertyByIndex: Get user property by index
 * - isValidProperty: Check if address is valid property
 * - getFactoryOwner: Get factory owner
 * - renounceFactoryOwnership: Renounce factory ownership
 * - transferFactoryOwnership: Transfer factory ownership
 * 
 * Property ERC1155 Operations:
 * - getPropertyDetails: Get property details from contract
 * - getTokenBalance: Get token balance for user
 * - getBatchTokenBalances: Get batch token balances
 * - transferTokens: Transfer tokens (safeTransferFrom)
 * - batchTransferTokens: Batch transfer tokens
 * - setApprovalForAll: Approve/revoke operator
 * - isApprovedForAll: Check operator approval
 * - supportsInterface: Check interface support (ERC165)
 * 
 * Property Ownership Operations:
 * - getPropertyOwner: Get property owner
 * - renouncePropertyOwnership: Renounce property ownership
 * - transferPropertyOwnership: Transfer property ownership
 * 
 * Works with any web3 provider (ethers.js v5 or v6).
 */

// Factory Contract ABI (complete interface)
const FACTORY_ABI = [
  {
    inputs: [
      { name: "_assetName", type: "string" },
      { name: "_assetType", type: "string" },
      { name: "_description", type: "string" },
      { name: "_isOwner", type: "bool" },
      { name: "_approximatedValue", type: "uint256" },
      { name: "_totalSupply", type: "uint256" },
      { name: "_propertyAddress", type: "string" },
      { name: "_squareMeters", type: "uint256" },
      { name: "_uri", type: "string" }
    ],
    name: "launchProperty",
    outputs: [{ name: "property", type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllProperties",
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPropertyCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_index", type: "uint256" }],
    name: "getProperty",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_propertyAddress", type: "address" }],
    name: "getPropertyInfo",
    outputs: [
      { name: "assetName", type: "string" },
      { name: "assetType", type: "string" },
      { name: "description", type: "string" },
      { name: "isOwner", type: "bool" },
      { name: "approximatedValue", type: "uint256" },
      { name: "totalSupply", type: "uint256" },
      { name: "propertyAddress", type: "string" },
      { name: "squareMeters", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_user", type: "address" }],
    name: "getUserProperties",
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_user", type: "address" }],
    name: "getUserPropertyCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "_user", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    name: "getUserPropertyByIndex",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_propertyAddress", type: "address" }],
    name: "isValidProperty",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "propertyContract", type: "address" },
      { indexed: true, name: "issuer", type: "address" },
      { indexed: false, name: "assetName", type: "string" },
      { indexed: false, name: "assetType", type: "string" },
      { indexed: true, name: "propertyId", type: "uint256" }
    ],
    name: "PropertyLaunched",
    type: "event"
  }
] as const

// Property Contract ABI (complete ERC1155 interface)
const PROPERTY_ABI = [
  {
    inputs: [],
    name: "getAllDetails",
    outputs: [
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "bool" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
      { name: "", type: "string" },
      { name: "", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" }
    ],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "accounts", type: "address[]" },
      { name: "ids", type: "uint256[]" }
    ],
    name: "balanceOfBatch",
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "id", type: "uint256" },
      { name: "value", type: "uint256" },
      { name: "data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[]" },
      { name: "values", type: "uint256[]" },
      { name: "data", type: "bytes" }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "account", type: "address" },
      { name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "operator", type: "address" },
      { name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "uint256" }],
    name: "uri",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PROPERTY_TOKEN_ID",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  }
] as const

/**
 * Helper to convert string/bigint to bigint
 */
function toBigInt(value: bigint | string): bigint {
  return typeof value === "string" ? BigInt(value) : value
}

/**
 * Parse property info from contract response
 */
function parsePropertyInfo(
  data: [string, string, string, boolean, bigint, bigint, string, bigint],
  contractAddress?: string,
  uri?: string
): ParsedRWAPropertyInfo {
  const [
    assetName,
    assetType,
    description,
    isOwner,
    approximatedValue,
    totalSupply,
    propertyAddress,
    squareMeters
  ] = data

  return {
    assetName,
    assetType,
    description,
    isOwner,
    approximatedValue: approximatedValue.toString(),
    totalSupply: totalSupply.toString(),
    propertyAddress,
    squareMeters: squareMeters.toString(),
    contractAddress,
    uri
  }
}

/**
 * RWA Factory Client
 * 
 * Usage:
 * ```typescript
 * import { createRWAClient } from '@synq/sdk'
 * 
 * const rwa = createRWAClient({
 *   factoryAddress: '0x...',
 *   chainId: 5001
 * })
 * 
 * // Launch a property
 * const result = await rwa.launchProperty(params, signer)
 * 
 * // Get all properties
 * const properties = await rwa.getAllProperties(provider)
 * ```
 */
export function createRWAClient(config: RWASDKConfig) {
  const { factoryAddress } = config

  if (!factoryAddress) {
    throw new Error("Factory address is required")
  }

  return {
    /**
     * Launch a new RWA property
     * 
     * @param params Property launch parameters
     * @param signerOrProvider Signer (for write) or Provider (for read)
     * @returns Transaction hash and property address
     */
    async launchProperty(
      params: LaunchPropertyParams,
      signerOrProvider: any
    ): Promise<LaunchPropertyResult> {
      // Normalize parameters
      const normalizedParams = {
        assetName: params.assetName,
        assetType: params.assetType,
        description: params.description,
        isOwner: params.isOwner,
        approximatedValue: toBigInt(params.approximatedValue),
        totalSupply: toBigInt(params.totalSupply),
        propertyAddress: params.propertyAddress,
        squareMeters: toBigInt(params.squareMeters),
        uri: params.uri
      }

      // Validate parameters
      if (!normalizedParams.assetName || normalizedParams.assetName.trim() === "") {
        throw new Error("Asset name is required")
      }
      if (!normalizedParams.assetType || normalizedParams.assetType.trim() === "") {
        throw new Error("Asset type is required")
      }
      if (!normalizedParams.description || normalizedParams.description.trim() === "") {
        throw new Error("Description is required")
      }
      if (normalizedParams.approximatedValue <= 0n) {
        throw new Error("Approximated value must be positive")
      }
      if (normalizedParams.totalSupply <= 0n) {
        throw new Error("Total supply must be positive")
      }
      if (!normalizedParams.uri || normalizedParams.uri.trim() === "") {
        throw new Error("URI is required")
      }

      // Get contract instance
      let contract: any
      if (signerOrProvider.getAddress) {
        // It's a signer
        const { Contract } = await import("ethers")
        contract = new Contract(factoryAddress, FACTORY_ABI, signerOrProvider)
      } else {
        // It's a provider
        const { Contract } = await import("ethers")
        contract = new Contract(factoryAddress, FACTORY_ABI, signerOrProvider)
      }

      // Call launchProperty
      const tx = await contract.launchProperty(
        normalizedParams.assetName,
        normalizedParams.assetType,
        normalizedParams.description,
        normalizedParams.isOwner,
        normalizedParams.approximatedValue,
        normalizedParams.totalSupply,
        normalizedParams.propertyAddress,
        normalizedParams.squareMeters,
        normalizedParams.uri
      )

      // Wait for transaction
      const receipt = await tx.wait()

      // Extract property address from event
      const logs = receipt.logs || []
      let propertyAddress: string | undefined
      let propertyId: number | undefined

      // Parse logs to find PropertyLaunched event
      for (const log of logs) {
        try {
          // Try to parse with contract interface
          const parsed = contract.interface.parseLog(log as any)
          if (parsed && parsed.name === "PropertyLaunched") {
            propertyAddress = parsed.args.propertyContract as string
            propertyId = Number(parsed.args.propertyId)
            break
          }
        } catch {
          // Continue to next log if parsing fails
          continue
        }
      }

      if (!propertyAddress) {
        // Fallback: try to decode from receipt directly
        // Some providers structure events differently
        const receiptAny = receipt as any
        if (receiptAny.events && receiptAny.events.PropertyLaunched) {
          const event = receiptAny.events.PropertyLaunched
          propertyAddress = event.args?.propertyContract || event.returnValues?.propertyContract
          propertyId = Number(event.args?.propertyId || event.returnValues?.propertyId || 0)
        }
      }

      if (!propertyAddress) {
        throw new Error(
          "PropertyLaunched event not found in transaction receipt. " +
          "Please check the transaction hash manually."
        )
      }

      return {
        transactionHash: receipt.hash || (receipt as any).transactionHash,
        propertyAddress,
        propertyId: propertyId || 0
      }
    },

    /**
     * Get all property addresses
     */
    async getAllProperties(provider: any): Promise<string[]> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getAllProperties()
    },

    /**
     * Get total number of properties
     */
    async getPropertyCount(provider: any): Promise<bigint> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getPropertyCount()
    },

    /**
     * Get property address by index
     */
    async getProperty(index: bigint | number, provider: any): Promise<string> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getProperty(BigInt(index))
    },

    /**
     * Get property information from factory
     */
    async getPropertyInfo(
      propertyAddress: string,
      provider: any
    ): Promise<ParsedRWAPropertyInfo> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      const data = await contract.getPropertyInfo(propertyAddress)
      return parsePropertyInfo(data, propertyAddress)
    },

    /**
     * Get all properties for a user
     */
    async getUserProperties(userAddress: string, provider: any): Promise<string[]> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getUserProperties(userAddress)
    },

    /**
     * Get user's property count
     */
    async getUserPropertyCount(userAddress: string, provider: any): Promise<bigint> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getUserPropertyCount(userAddress)
    },

    /**
     * Check if an address is a valid property
     */
    async isValidProperty(propertyAddress: string, provider: any): Promise<boolean> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.isValidProperty(propertyAddress)
    },

    /**
     * Get property details directly from property contract
     */
    async getPropertyDetails(
      propertyAddress: string,
      provider: any
    ): Promise<ParsedRWAPropertyInfo> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      
      const [details, uri] = await Promise.all([
        propertyContract.getAllDetails(),
        propertyContract.uri(1) // PROPERTY_TOKEN_ID is 1
      ])

      return parsePropertyInfo(details, propertyAddress, uri)
    },

    /**
     * Get token balance for a user
     */
    async getTokenBalance(
      propertyAddress: string,
      userAddress: string,
      provider: any
    ): Promise<bigint> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      const tokenId = await propertyContract.PROPERTY_TOKEN_ID()
      return await propertyContract.balanceOf(userAddress, tokenId)
    },

    /**
     * Get factory address
     */
    getFactoryAddress(): string {
      return factoryAddress
    },

    // ============================================
    // FACTORY OWNERSHIP FUNCTIONS
    // ============================================

    /**
     * Get user property by index
     */
    async getUserPropertyByIndex(
      userAddress: string,
      index: bigint | number,
      provider: any
    ): Promise<string> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.getUserPropertyByIndex(userAddress, BigInt(index))
    },

    /**
     * Get factory owner address
     */
    async getFactoryOwner(provider: any): Promise<string> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, provider)
      return await contract.owner()
    },

    /**
     * Renounce factory ownership (only owner)
     */
    async renounceFactoryOwnership(signer: any): Promise<string> {
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, signer)
      const tx = await contract.renounceOwnership()
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    /**
     * Transfer factory ownership (only owner)
     */
    async transferFactoryOwnership(
      newOwner: string,
      signer: any
    ): Promise<string> {
      if (!newOwner || newOwner === "0x0000000000000000000000000000000000000000") {
        throw new Error("Invalid new owner address")
      }
      const { Contract } = await import("ethers")
      const contract = new Contract(factoryAddress, FACTORY_ABI, signer)
      const tx = await contract.transferOwnership(newOwner)
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    // ============================================
    // PROPERTY ERC1155 FUNCTIONS
    // ============================================

    /**
     * Get batch token balances for multiple accounts and token IDs
     */
    async getBatchTokenBalances(
      propertyAddress: string,
      accounts: string[],
      tokenIds: (bigint | number)[],
      provider: any
    ): Promise<bigint[]> {
      if (accounts.length !== tokenIds.length) {
        throw new Error("Accounts and tokenIds arrays must have the same length")
      }
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      const normalizedTokenIds = tokenIds.map(id => BigInt(id))
      return await propertyContract.balanceOfBatch(accounts, normalizedTokenIds)
    },

    /**
     * Transfer tokens from one address to another
     * 
     * @param propertyAddress Property contract address
     * @param from Sender address
     * @param to Recipient address
     * @param tokenId Token ID (usually 1 for PROPERTY_TOKEN_ID)
     * @param amount Amount to transfer
     * @param data Additional data (optional, can be empty bytes)
     * @param signer Signer (must be the sender or approved operator)
     * @returns Transaction hash
     */
    async transferTokens(
      propertyAddress: string,
      from: string,
      to: string,
      tokenId: bigint | number,
      amount: bigint | string,
      signer: any,
      data: string = "0x"
    ): Promise<string> {
      if (!to || to === "0x0000000000000000000000000000000000000000") {
        throw new Error("Invalid recipient address")
      }
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, signer)
      const normalizedAmount = toBigInt(amount)
      if (normalizedAmount <= 0n) {
        throw new Error("Transfer amount must be positive")
      }
      const tx = await propertyContract.safeTransferFrom(
        from,
        to,
        BigInt(tokenId),
        normalizedAmount,
        data
      )
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    /**
     * Batch transfer tokens from one address to another
     * 
     * @param propertyAddress Property contract address
     * @param from Sender address
     * @param to Recipient address
     * @param tokenIds Array of token IDs
     * @param amounts Array of amounts to transfer
     * @param signer Signer (must be the sender or approved operator)
     * @param data Additional data (optional, can be empty bytes)
     * @returns Transaction hash
     */
    async batchTransferTokens(
      propertyAddress: string,
      from: string,
      to: string,
      tokenIds: (bigint | number)[],
      amounts: (bigint | string)[],
      signer: any,
      data: string = "0x"
    ): Promise<string> {
      if (tokenIds.length !== amounts.length) {
        throw new Error("TokenIds and amounts arrays must have the same length")
      }
      if (!to || to === "0x0000000000000000000000000000000000000000") {
        throw new Error("Invalid recipient address")
      }
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, signer)
      const normalizedTokenIds = tokenIds.map(id => BigInt(id))
      const normalizedAmounts = amounts.map(amt => toBigInt(amt))
      const tx = await propertyContract.safeBatchTransferFrom(
        from,
        to,
        normalizedTokenIds,
        normalizedAmounts,
        data
      )
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    /**
     * Approve or revoke operator approval for all tokens
     * 
     * @param propertyAddress Property contract address
     * @param operator Operator address to approve/revoke
     * @param approved Whether to approve (true) or revoke (false)
     * @param signer Signer (must be the token owner)
     * @returns Transaction hash
     */
    async setApprovalForAll(
      propertyAddress: string,
      operator: string,
      approved: boolean,
      signer: any
    ): Promise<string> {
      if (!operator || operator === "0x0000000000000000000000000000000000000000") {
        throw new Error("Invalid operator address")
      }
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, signer)
      const tx = await propertyContract.setApprovalForAll(operator, approved)
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    /**
     * Check if an operator is approved for all tokens
     */
    async isApprovedForAll(
      propertyAddress: string,
      account: string,
      operator: string,
      provider: any
    ): Promise<boolean> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      return await propertyContract.isApprovedForAll(account, operator)
    },

    /**
     * Check if contract supports a specific interface (ERC165)
     */
    async supportsInterface(
      propertyAddress: string,
      interfaceId: string,
      provider: any
    ): Promise<boolean> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      return await propertyContract.supportsInterface(interfaceId)
    },

    // ============================================
    // PROPERTY OWNERSHIP FUNCTIONS
    // ============================================

    /**
     * Get property owner address
     */
    async getPropertyOwner(
      propertyAddress: string,
      provider: any
    ): Promise<string> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, provider)
      return await propertyContract.owner()
    },

    /**
     * Renounce property ownership (only owner)
     */
    async renouncePropertyOwnership(
      propertyAddress: string,
      signer: any
    ): Promise<string> {
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, signer)
      const tx = await propertyContract.renounceOwnership()
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    },

    /**
     * Transfer property ownership (only owner)
     */
    async transferPropertyOwnership(
      propertyAddress: string,
      newOwner: string,
      signer: any
    ): Promise<string> {
      if (!newOwner || newOwner === "0x0000000000000000000000000000000000000000") {
        throw new Error("Invalid new owner address")
      }
      const { Contract } = await import("ethers")
      const propertyContract = new Contract(propertyAddress, PROPERTY_ABI, signer)
      const tx = await propertyContract.transferOwnership(newOwner)
      const receipt = await tx.wait()
      return receipt.hash || (receipt as any).transactionHash
    }
  }
}

/**
 * Default factory address (can be overridden)
 */
export const DEFAULT_FACTORY_ADDRESS = "0x7d7aF5715e5671e0E3126b2428Dc2629bD9061e3"

/**
 * Create RWA client with default factory address
 */
export function createDefaultRWAClient(overrides?: Partial<RWASDKConfig>) {
  return createRWAClient({
    factoryAddress: DEFAULT_FACTORY_ADDRESS,
    ...overrides
  })
}

