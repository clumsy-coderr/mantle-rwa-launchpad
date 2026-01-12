export interface CheckoutOptions {
  amount: number
  merchant: string
  planId?: string
}

export interface VerifyResponse {
  verified: boolean
  payer: string
  merchant: string
  timestamp: string
  amount: string
  payment_id: string
  subscription?: {
    subscription_id: string
    status: string
    current_period_end: number
  }
}

export interface SubscriptionStatusData {
  active: boolean
  subscription_id?: string
  plan?: string
  current_period_end?: number
  status?: 'active' | 'canceled' | 'expired' | 'payment_required'
}

export interface Plan {
  id: string
  name: string
  amount: string
  interval: 'weekly' | 'monthly' | 'yearly'
  merchant_id: string
}

export interface Subscription {
  id: string
  merchant_id: string
  payer_wallet: string
  plan_id: string
  status: 'active' | 'canceled' | 'expired' | 'payment_required'
  current_period_end: number
  created_at: string
}

export interface AccessResponse {
  access: boolean
  reason?: string
  subscription?: {
    id: string
    plan: string
    expires: number
  }
}

// ============================================
// RWA Launchpad Types
// ============================================

/**
 * Property information structure returned from contract
 */
export interface RWAPropertyInfo {
  assetName: string
  assetType: string
  description: string
  isOwner: boolean
  approximatedValue: bigint
  totalSupply: bigint
  propertyAddress: string
  squareMeters: bigint
}

/**
 * Parsed property information with string values
 */
export interface ParsedRWAPropertyInfo {
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

/**
 * Launch property parameters
 */
export interface LaunchPropertyParams {
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

/**
 * Property metadata for IPFS/off-chain storage
 */
export interface RWAPropertyMetadata {
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

/**
 * Configuration for RWA SDK
 */
export interface RWASDKConfig {
  factoryAddress: string
  chainId?: number
  rpcUrl?: string
}

/**
 * Transaction result from launching a property
 */
export interface LaunchPropertyResult {
  transactionHash: string
  propertyAddress: string
  propertyId: number
}

