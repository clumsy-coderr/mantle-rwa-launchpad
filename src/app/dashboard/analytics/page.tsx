'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { Navbar } from '@/components/ui'
import { Loader2, Building2, TrendingUp, Wallet } from 'lucide-react'
import { 
  useRWAFactoryGetAllProperties, 
  useRWAFactoryGetCurrentUserProperties,
  useRWAFactoryGetPropertyCount,
  useRWAFactoryGetCurrentUserPropertyCount,
  type ParsedPropertyInfo
} from '@/hooks'
import { Address } from 'viem'
import { factoryContractABI, factoryContractAddress } from '@/config/contract'
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

export default function AnalyticsPage() {
  const { address } = useAccount()
  const [propertiesData, setPropertiesData] = useState<Map<Address, ParsedPropertyInfo>>(new Map())
  const publicClient = usePublicClient()

  // Fetch all properties from factory
  const { data: allProperties, isLoading: isLoadingAllProperties, refetch: refetchAllProperties } = useRWAFactoryGetAllProperties()
  
  // Fetch user's properties
  const { data: userProperties, isLoading: isLoadingUserProperties, refetch: refetchUserProperties } = useRWAFactoryGetCurrentUserProperties()
  
  // Get property counts
  const { data: totalPropertyCount, isLoading: isLoadingCount } = useRWAFactoryGetPropertyCount()
  const { data: userPropertyCount, isLoading: isLoadingUserCount } = useRWAFactoryGetCurrentUserPropertyCount()

  // Fetch property info for each property
  useEffect(() => {
    if (!allProperties || allProperties.length === 0 || !publicClient) return

    const fetchPropertyInfos = async () => {
      const newData = new Map<Address, ParsedPropertyInfo>()
      
      // Fetch all property infos in parallel
      const promises = allProperties.map(async (propertyAddress) => {
        try {
          const result = await publicClient.readContract({
            address: factoryContractAddress as Address,
            abi: factoryContractABI,
            functionName: 'getPropertyInfo',
            args: [propertyAddress],
          })
          
          const [assetName, assetType, description, isOwner, approximatedValue, totalSupply, propertyAddr, squareMeters] = result as [string, string, string, boolean, bigint, bigint, string, bigint]
          
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

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    if (propertiesData.size === 0) return null

    const properties = Array.from(propertiesData.values())
    
    // Group by asset type
    const typeCount: Record<string, number> = {}
    const typeValue: Record<string, bigint> = {}
    
    let totalValue = BigInt(0)
    let userTotalValue = BigInt(0)
    const userPropertyAddresses = new Set(userProperties || [])
    
    properties.forEach(prop => {
      const value = BigInt(prop.approximatedValue)
      totalValue += value
      
      if (userPropertyAddresses.has(prop.propertyAddress as Address)) {
        userTotalValue += value
      }
      
      typeCount[prop.assetType] = (typeCount[prop.assetType] || 0) + 1
      typeValue[prop.assetType] = (typeValue[prop.assetType] || BigInt(0)) + value
    })

    // Prepare chart data
    const typeChartData = Object.entries(typeCount).map(([type, count]) => ({
      name: type,
      value: count,
      totalValue: typeValue[type]?.toString() || '0'
    }))

    const valueChartData = Object.entries(typeValue)
      .map(([type, value]) => ({
        name: type,
        value: Number(value) / 1e18, // Convert from wei
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10) // Top 10

    return {
      totalProperties: properties.length,
      userProperties: userProperties?.length || 0,
      totalValue: totalValue.toString(),
      userTotalValue: userTotalValue.toString(),
      typeChartData,
      valueChartData,
      properties,
    }
  }, [propertiesData, userProperties])

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RWA Analytics Dashboard</h1>
            <p className="text-gray-400 text-lg">Real World Assets analytics, insights, and AI-powered automation</p>
            {address && (
              <p className="text-sm text-gray-500 mt-3 font-mono">
                Wallet: {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            )}
          </div>

          {/* RWA Analytics Section */}
          <div className="relative z-10 mb-12">
            <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent"></div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building2 className="text-[#C3FF32]" size={28} />
                RWA Properties Overview
              </h2>

              {isLoadingAllProperties || isLoadingUserProperties ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin h-8 w-8 text-[#C3FF32]" />
                  <span className="ml-3 text-gray-400">Loading properties...</span>
                </div>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Total Properties</p>
                        <Building2 className="text-[#C3FF32]" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-white">{totalPropertyCount || allProperties?.length || 0}</p>
              </div>
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Your Properties</p>
                        <Wallet className="text-[#C3FF32]" size={20} />
                  </div>
                      <p className="text-3xl font-bold text-[#C3FF32]">{userPropertyCount || userProperties?.length || 0}</p>
                </div>
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Total Value</p>
                        <TrendingUp className="text-[#C3FF32]" size={20} />
              </div>
                      <p className="text-2xl font-bold text-white">
                        {analyticsData ? (Number(analyticsData.totalValue) / 1e18).toFixed(2) : '0'} MNT
                      </p>
            </div>
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Your Value</p>
                        <TrendingUp className="text-[#C3FF32]" size={20} />
                </div>
                      <p className="text-2xl font-bold text-[#C3FF32]">
                        {analyticsData ? (Number(analyticsData.userTotalValue) / 1e18).toFixed(2) : '0'} MNT
                      </p>
            </div>
          </div>

                  {/* Charts */}
                  {analyticsData && analyticsData.typeChartData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Properties by Type - Pie Chart */}
                      <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Properties by Type</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={analyticsData.typeChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {analyticsData.typeChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#C3FF32', '#876dff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'][index % 6]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#0E0E11', 
                                border: '1px solid #C3FF32/20',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
            </div>

                      {/* Value Distribution - Bar Chart */}
                      <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Value Distribution by Type</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={analyticsData.valueChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis 
                              dataKey="name" 
                              stroke="#888"
                              tick={{ fill: '#888', fontSize: 12 }}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis 
                              stroke="#888"
                              tick={{ fill: '#888', fontSize: 12 }}
                              label={{ value: 'MNT', angle: -90, position: 'insideLeft', fill: '#888' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#0E0E11', 
                                border: '1px solid #C3FF32/20',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                              formatter={(value: number | undefined) => `${(value || 0).toFixed(2)} MNT`}
                            />
                            <Bar dataKey="value" fill="#C3FF32" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                  </div>
                )}

                  {/* Properties List */}
                  {analyticsData && analyticsData.properties.length > 0 && (
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">All Properties</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {analyticsData.properties.map((prop, index) => {
                          const isUserProperty = userProperties?.includes(prop.propertyAddress as Address)
                          return (
                            <div 
                              key={index} 
                              className={`bg-[#0A0A0C] border rounded-lg p-4 ${
                                isUserProperty ? 'border-[#C3FF32]/50' : 'border-white/5'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-white font-semibold">{prop.assetName}</h4>
                                    {isUserProperty && (
                                      <span className="px-2 py-1 bg-[#C3FF32]/10 border border-[#C3FF32]/20 text-[#C3FF32] rounded text-xs font-semibold">
                                        Your Property
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400 mb-1">Type: {prop.assetType}</p>
                                  <p className="text-sm text-gray-400 mb-1">Address: {prop.propertyAddress}</p>
                                  <p className="text-sm text-gray-400 mb-1">Size: {prop.squareMeters} m²</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[#C3FF32] font-bold">
                                    {(Number(prop.approximatedValue) / 1e18).toFixed(2)} MNT
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">Supply: {prop.totalSupply}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}

                  {(!analyticsData || analyticsData.properties.length === 0) && !isLoadingAllProperties && (
                    <div className="text-center py-12">
                      <Building2 className="mx-auto text-gray-500 mb-4" size={48} />
                      <p className="text-gray-400">No properties found. Launch your first RWA property!</p>
                    </div>
                  )}
                </>
                )}
              </div>
            </div>

          
        </div>
      </main>
    </div>
  )
}

