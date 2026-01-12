'use client'

import { useState } from 'react'
import { Navbar } from '@/components/ui'
import { factoryContractAddress } from '@/config/contract'
import { Terminal, Copy, Check, Building2, Database, Search, Wallet, ArrowRightLeft, Shield, Code2, Play } from 'lucide-react'

// Mock data for demo
const mockProperties = [
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x8ba1f109551bD432803012645Hac136c22C9',
  '0x1234567890123456789012345678901234567890',
  '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
]

const mockPropertyDetails = {
  assetName: 'Downtown Office Building',
  assetType: 'Real Estate',
  description: 'Premium office building in the heart of downtown',
  isOwner: true,
  approximatedValue: '1000000000000',
  totalSupply: '1000000',
  propertyAddress: '123 Main St, Downtown',
  squareMeters: '500',
  contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  uri: 'ipfs://QmXyZ123...'
}

export default function SDKDemoPage() {
  const [activeTab, setActiveTab] = useState<'factory' | 'query' | 'launch' | 'transfer' | 'approval'>('factory')
  const [copied, setCopied] = useState<string | null>(null)
  const [demoResults, setDemoResults] = useState<any>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const runDemo = (demoType: string) => {
    // Simulate API call delay
    setTimeout(() => {
      switch (demoType) {
        case 'getAllProperties':
          setDemoResults({
            type: 'getAllProperties',
            data: mockProperties,
            code: `const properties = await rwa.getAllProperties(provider)
// Returns: ${JSON.stringify(mockProperties, null, 2)}`
          })
          break
        case 'getPropertyCount':
          setDemoResults({
            type: 'getPropertyCount',
            data: mockProperties.length.toString(),
            code: `const count = await rwa.getPropertyCount(provider)
// Returns: "${mockProperties.length}"`
          })
          break
        case 'getPropertyDetails':
          setDemoResults({
            type: 'getPropertyDetails',
            data: mockPropertyDetails,
            code: `const details = await rwa.getPropertyDetails(
  '${mockProperties[0]}',
  provider
)
// Returns: ${JSON.stringify(mockPropertyDetails, null, 2)}`
          })
          break
        case 'getTokenBalance':
          setDemoResults({
            type: 'getTokenBalance',
            data: '50000',
            code: `const balance = await rwa.getTokenBalance(
  '${mockProperties[0]}',
  '0xYourAddress...',
  provider
)
// Returns: "50000"`
          })
          break
        case 'launchProperty':
          setDemoResults({
            type: 'launchProperty',
            data: {
              transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
              propertyAddress: '0xNewProperty123456789012345678901234567890',
              propertyId: mockProperties.length + 1
            },
            code: `const result = await rwa.launchProperty({
  assetName: 'Downtown Office',
  assetType: 'Real Estate',
  description: 'Premium office building',
  isOwner: true,
  approximatedValue: BigInt('1000000000000'),
  totalSupply: BigInt('1000000'),
  propertyAddress: '123 Main St',
  squareMeters: BigInt('500'),
  uri: 'ipfs://Qm...'
}, signer)
// Returns: {
//   transactionHash: '0x1234...',
//   propertyAddress: '0xNewProperty...',
//   propertyId: ${mockProperties.length + 1}
// }`
          })
          break
      }
    }, 500)
  }

  const codeExamples = {
    factory: `import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

// Initialize SDK
const rwa = createRWAClient({
  factoryAddress: '${factoryContractAddress}'
})

// Get provider
const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')

// Get all properties
const properties = await rwa.getAllProperties(provider)
console.log('Properties:', properties)

// Get property count
const count = await rwa.getPropertyCount(provider)
console.log('Total properties:', count.toString())

// Get property by index
const property = await rwa.getProperty(0, provider)
console.log('First property:', property)

// Get property info
const info = await rwa.getPropertyInfo(properties[0], provider)
console.log('Property info:', info)

// Get user properties
const userProperties = await rwa.getUserProperties(
  '0xUserAddress...',
  provider
)
console.log('User properties:', userProperties)

// Check if valid property
const isValid = await rwa.isValidProperty(properties[0], provider)
console.log('Is valid:', isValid)`,
    query: `import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const rwa = createRWAClient({
  factoryAddress: '${factoryContractAddress}'
})

const provider = new ethers.JsonRpcProvider('https://rpc.mantle.xyz')
const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// Get property details
const details = await rwa.getPropertyDetails(propertyAddress, provider)
console.log('Details:', details)
// {
//   assetName: 'Downtown Office Building',
//   assetType: 'Real Estate',
//   description: 'Premium office building...',
//   approximatedValue: '1000000000000',
//   totalSupply: '1000000',
//   ...
// }

// Get token balance
const balance = await rwa.getTokenBalance(
  propertyAddress,
  '0xUserAddress...',
  provider
)
console.log('Balance:', balance.toString())

// Get batch token balances
const balances = await rwa.getBatchTokenBalances(
  propertyAddress,
  ['0xAddress1...', '0xAddress2...'],
  [1, 1], // PROPERTY_TOKEN_ID
  provider
)
console.log('Balances:', balances)`,
    launch: `import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const rwa = createRWAClient({
  factoryAddress: '${factoryContractAddress}'
})

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

// Launch a new property
const result = await rwa.launchProperty({
  assetName: 'Downtown Office',
  assetType: 'Real Estate',
  description: 'Premium office building in downtown area',
  isOwner: true,
  approximatedValue: BigInt('1000000000000'),
  totalSupply: BigInt('1000000'),
  propertyAddress: '123 Main St',
  squareMeters: BigInt('500'),
  uri: 'ipfs://QmXyZ123...'
}, signer)

console.log('Property launched!')
console.log('Transaction hash:', result.transactionHash)
console.log('Property address:', result.propertyAddress)
console.log('Property ID:', result.propertyId)`,
    transfer: `import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const rwa = createRWAClient({
  factoryAddress: '${factoryContractAddress}'
})

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// Transfer tokens
const txHash = await rwa.transferTokens(
  propertyAddress,
  '0xFromAddress...',
  '0xToAddress...',
  1, // PROPERTY_TOKEN_ID
  BigInt('1000'),
  signer
)

console.log('Transfer complete:', txHash)

// Batch transfer
const batchTxHash = await rwa.batchTransferTokens(
  propertyAddress,
  '0xFromAddress...',
  '0xToAddress...',
  [1, 1], // token IDs
  [BigInt('1000'), BigInt('2000')], // amounts
  signer
)

console.log('Batch transfer complete:', batchTxHash)`,
    approval: `import { createRWAClient } from 'rwa-tokenized-sdk'
import { ethers } from 'ethers'

const rwa = createRWAClient({
  factoryAddress: '${factoryContractAddress}'
})

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

const propertyAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'

// Set approval for all
await rwa.setApprovalForAll(
  propertyAddress,
  '0xOperatorAddress...',
  true, // approve
  signer
)

// Check approval status
const isApproved = await rwa.isApprovedForAll(
  propertyAddress,
  '0xAccountAddress...',
  '0xOperatorAddress...',
  provider
)

console.log('Is approved:', isApproved)`
  }

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[#C3FF32] text-sm font-mono mb-6 border border-[#C3FF32]/20 bg-[#C3FF32]/5">
              <Terminal size={14} /> SDK Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              RWA Launchpad SDK Demo
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Interactive demo showcasing the RWA SDK functionality with mock data. Explore all available methods and see example code.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-yellow-400 text-sm">⚠️ This is a demo with mock data - no real blockchain calls</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-2 mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveTab('factory'); setDemoResults(null) }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'factory'
                  ? 'bg-[#C3FF32] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Database size={16} />
              Factory Operations
            </button>
            <button
              onClick={() => { setActiveTab('query'); setDemoResults(null) }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'query'
                  ? 'bg-[#C3FF32] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Search size={16} />
              Property Queries
            </button>
            <button
              onClick={() => { setActiveTab('launch'); setDemoResults(null) }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'launch'
                  ? 'bg-[#C3FF32] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Building2 size={16} />
              Launch Property
            </button>
            <button
              onClick={() => { setActiveTab('transfer'); setDemoResults(null) }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'transfer'
                  ? 'bg-[#C3FF32] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <ArrowRightLeft size={16} />
              Token Transfers
            </button>
            <button
              onClick={() => { setActiveTab('approval'); setDemoResults(null) }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'approval'
                  ? 'bg-[#C3FF32] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Shield size={16} />
              Approvals
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Example */}
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code2 size={20} />
                  Code Example
                </h2>
                <button
                  onClick={() => copyToClipboard(codeExamples[activeTab], 'code')}
                  className="text-xs text-[#C3FF32] hover:underline flex items-center gap-1"
                >
                  {copied === 'code' ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[#050505] rounded-lg p-4 border border-white/5 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono leading-relaxed">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Play size={20} />
                  Try It Out
                </h2>
              </div>

              <div className="space-y-4">
                {activeTab === 'factory' && (
                  <>
                    <button
                      onClick={() => runDemo('getAllProperties')}
                      className="w-full bg-[#C3FF32] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#b0e62e] transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} />
                      Run getAllProperties()
                    </button>
                    <button
                      onClick={() => runDemo('getPropertyCount')}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} />
                      Run getPropertyCount()
                    </button>
                  </>
                )}

                {activeTab === 'query' && (
                  <>
                    <button
                      onClick={() => runDemo('getPropertyDetails')}
                      className="w-full bg-[#C3FF32] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#b0e62e] transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} />
                      Run getPropertyDetails()
                    </button>
                    <button
                      onClick={() => runDemo('getTokenBalance')}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} />
                      Run getTokenBalance()
                    </button>
                  </>
                )}

                {activeTab === 'launch' && (
                  <button
                    onClick={() => runDemo('launchProperty')}
                    className="w-full bg-[#C3FF32] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#b0e62e] transition-colors flex items-center justify-center gap-2"
                  >
                    <Play size={14} />
                    Run launchProperty()
                  </button>
                )}

                {activeTab === 'transfer' && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      Transfer operations require a connected wallet. In production, use transferTokens() or batchTransferTokens() methods.
                    </p>
                  </div>
                )}

                {activeTab === 'approval' && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      Approval operations require a connected wallet. In production, use setApprovalForAll() and isApprovedForAll() methods.
                    </p>
                  </div>
                )}

                {/* Demo Results */}
                {demoResults && (
                  <div className="bg-[#050505] rounded-lg p-4 border border-white/5 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">Result:</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(demoResults.data, null, 2), 'result')}
                        className="text-xs text-[#C3FF32] hover:underline"
                      >
                        {copied === 'result' ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </div>
                    <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                      {typeof demoResults.data === 'object' 
                        ? JSON.stringify(demoResults.data, null, 2)
                        : demoResults.data}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SDK Features */}
          <div className="mt-8 bg-[#0E0E11] rounded-2xl border border-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">SDK Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#050505] rounded-lg p-6 border border-white/5">
                <div className="w-12 h-12 bg-[#C3FF32]/10 rounded-lg flex items-center justify-center mb-4">
                  <Database size={24} className="text-[#C3FF32]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Factory Operations</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• getAllProperties()</li>
                  <li>• getPropertyCount()</li>
                  <li>• getPropertyInfo()</li>
                  <li>• getUserProperties()</li>
                  <li>• isValidProperty()</li>
                </ul>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 border border-white/5">
                <div className="w-12 h-12 bg-[#C3FF32]/10 rounded-lg flex items-center justify-center mb-4">
                  <Wallet size={24} className="text-[#C3FF32]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Token Operations</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• getTokenBalance()</li>
                  <li>• getBatchTokenBalances()</li>
                  <li>• transferTokens()</li>
                  <li>• batchTransferTokens()</li>
                </ul>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 border border-white/5">
                <div className="w-12 h-12 bg-[#C3FF32]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={24} className="text-[#C3FF32]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Approval Management</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• setApprovalForAll()</li>
                  <li>• isApprovedForAll()</li>
                  <li>• supportsInterface()</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="mt-8 bg-[#0E0E11] rounded-2xl border border-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Installation</h2>
            <div className="bg-[#050505] rounded-lg p-4 border border-white/5">
              <pre className="text-sm text-gray-300 font-mono">
                <code>{`npm install rwa-tokenized-sdk
# or
yarn add rwa-tokenized-sdk
# or
pnpm add rwa-tokenized-sdk`}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
