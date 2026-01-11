'use client'

import { useState, useEffect } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { Navbar } from '@/components/ui'
import { Loader2, Building2, MapPin, Ruler, Coins, ExternalLink } from 'lucide-react'
import { 
  useRWAFactoryGetAllProperties,
  type ParsedPropertyInfo
} from '@/hooks'
import { Address } from 'viem'
import { factoryContractABI, factoryContractAddress, rwaPropertyContractABI } from '@/config/contract'
import Link from 'next/link'

interface PropertyMetadata {
  name?: string
  description?: string
  image?: string
  attributes?: Array<{ trait_type: string; value: string | number }>
}

interface PropertyWithMetadata extends ParsedPropertyInfo {
  metadata?: PropertyMetadata
  contractAddress: Address
}

export default function MarketplacePage() {
  const { address } = useAccount()
  const [propertiesData, setPropertiesData] = useState<Map<Address, PropertyWithMetadata>>(new Map())
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const publicClient = usePublicClient()

  // Fetch all properties from factory
  const { data: allProperties, isLoading: isLoadingAllProperties } = useRWAFactoryGetAllProperties()

  // Fetch property info and metadata for each property
  useEffect(() => {
    if (!allProperties || allProperties.length === 0 || !publicClient) return

    const fetchPropertyInfos = async () => {
      const newData = new Map<Address, PropertyWithMetadata>()
      
      // Fetch all property infos and metadata in parallel
      const promises = allProperties.map(async (propertyAddress) => {
        try {
          // Fetch property info from factory
          const result = await publicClient.readContract({
            address: factoryContractAddress as Address,
            abi: factoryContractABI,
            functionName: 'getPropertyInfo',
            args: [propertyAddress],
          })
          
          const [assetName, assetType, description, isOwner, approximatedValue, totalSupply, propertyAddr, squareMeters] = result as [string, string, string, boolean, bigint, bigint, string, bigint]
          
          // Fetch URI from property contract
          let metadata: PropertyMetadata | undefined = undefined
          try {
            const uri = await publicClient.readContract({
              address: propertyAddress,
              abi: rwaPropertyContractABI,
              functionName: 'uri',
              args: [BigInt(1)], // PROPERTY_TOKEN_ID = 1
            }) as string

            if (uri && uri.startsWith('http')) {
              try {
                const response = await fetch(uri)
                if (response.ok) {
                  metadata = await response.json()
                }
              } catch (fetchErr) {
                console.error(`Error fetching metadata from ${uri}:`, fetchErr)
              }
            }
          } catch (uriErr) {
            console.error(`Error fetching URI for ${propertyAddress}:`, uriErr)
          }
          
          return {
            address: propertyAddress,
            info: {
              assetName,
              assetType,
              description,
              isOwner,
              approximatedValue: approximatedValue.toString(),
              totalSupply: totalSupply.toString(),
              propertyAddress: propertyAddr,
              squareMeters: squareMeters.toString(),
              metadata,
              contractAddress: propertyAddress,
            }
          }
        } catch (err) {
          console.error(`Error fetching property info for ${propertyAddress}:`, err)
          return null
        }
      })
      
      const results = await Promise.all(promises)
      results.forEach((result) => {
        if (result) {
          newData.set(result.address, result.info)
        }
      })
      
      setPropertiesData(newData)
    }

    fetchPropertyInfos()
  }, [allProperties, publicClient])

  // Get unique asset types for filter
  const assetTypes = Array.from(new Set(
    Array.from(propertiesData.values()).map(p => p.assetType)
  ))

  // Filter properties
  const filteredProperties = Array.from(propertiesData.values()).filter(prop => {
    const matchesSearch = prop.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prop.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || prop.assetType === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RWA Marketplace</h1>
            <p className="text-gray-400 text-lg">Discover and explore tokenized Real World Assets</p>
          </div>

          {/* Search and Filter Section */}
          <div className="relative z-10 mb-8">
            <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Search Properties</label>
                  <input
                    type="text"
                    placeholder="Search by name, description, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 transition-colors"
                  />
                </div>
                
                {/* Filter by Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Filter by Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C3FF32]/50 transition-colors"
                  >
                    <option value="all">All Types</option>
                    {assetTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results count */}
              <div className="mt-4 text-sm text-gray-400">
                Showing {filteredProperties.length} of {propertiesData.size} properties
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          {isLoadingAllProperties ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-[#C3FF32]" />
              <span className="ml-3 text-gray-400 text-lg">Loading properties...</span>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="mx-auto text-gray-500 mb-4" size={64} />
              <p className="text-gray-400 text-xl mb-2">No properties found</p>
              <p className="text-gray-500 text-sm">
                {propertiesData.size === 0 
                  ? "No properties have been launched yet. Be the first to launch an RWA property!"
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {filteredProperties.map((prop, index) => {
                const propertyAddress = prop.contractAddress
                const valueInMNT = (Number(prop.approximatedValue) / 1e18).toFixed(2)
                const metadata = prop.metadata
                const displayName = metadata?.name || prop.assetName
                const displayDescription = metadata?.description || prop.description
                const imageUrl = metadata?.image
                
                return (
                  <div
                    key={index}
                    className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-6 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      {/* Property Image */}
                      {imageUrl && (
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-[#050505] border border-white/5">
                          <img
                            src={imageUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{displayName}</h3>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#C3FF32]/10 border border-[#C3FF32]/20 text-[#C3FF32] rounded-full text-xs font-semibold">
                              {prop.assetType}
                            </span>
                          </div>
                        </div>
                        <Building2 className="text-[#C3FF32] flex-shrink-0" size={24} />
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                        {displayDescription || 'No description available'}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#050505] border border-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Coins className="text-[#C3FF32]" size={16} />
                            <p className="text-xs text-gray-400">Value</p>
                          </div>
                          <p className="text-lg font-bold text-white">{valueInMNT} MNT</p>
                        </div>
                        <div className="bg-[#050505] border border-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Ruler className="text-[#C3FF32]" size={16} />
                            <p className="text-xs text-gray-400">Size</p>
                          </div>
                          <p className="text-lg font-bold text-white">{prop.squareMeters} m²</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin size={14} />
                          <span className="font-mono truncate">{prop.propertyAddress}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Supply:</span>
                          <span className="font-mono">{prop.totalSupply}</span>
                        </div>
                        
                        {/* Metadata Attributes */}
                        {metadata?.attributes && metadata.attributes.length > 0 && (
                          <div className="pt-2 border-t border-white/5">
                            <p className="text-xs text-gray-400 mb-2">Additional Details:</p>
                            <div className="flex flex-wrap gap-2">
                              {metadata.attributes.slice(0, 3).map((attr, idx) => (
                                <div key={idx} className="px-2 py-1 bg-[#050505] border border-white/5 rounded text-xs">
                                  <span className="text-gray-400">{attr.trait_type}:</span>{' '}
                                  <span className="text-gray-300">{String(attr.value)}</span>
                                </div>
                              ))}
                              {metadata.attributes.length > 3 && (
                                <div className="px-2 py-1 bg-[#050505] border border-white/5 rounded text-xs text-gray-400">
                                  +{metadata.attributes.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/property/${propertyAddress}`}
                        className="w-full px-4 py-3 bg-[#C3FF32] text-black rounded-lg hover:bg-[#b0e62e] transition-all font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(195,255,50,0.3)] group-hover:shadow-[0_0_30px_rgba(195,255,50,0.5)]"
                      >
                        View Details
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

