/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { Navbar } from '@/components/ui'
import { 
  ArrowRight, 
  Sparkles, 
  Upload, 
  X, 
  Image as ImageIcon,
  Home,
  Gem,
  FileText,
  Car,
  Watch,
  CreditCard,
  TrendingUp,
  Receipt,
  PieChart,
  Zap,
  Wine,
  Gift,
  Palette,
  Music,
  MoreHorizontal
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { uploadImageToPinata, uploadMetadataToPinata } from '@/lib/pinata'
import { useRWAFactoryLaunchProperty } from '@/hooks'
import { useToast } from '@/hooks/useToast'
import { factoryContractABI } from '@/config/contract'
import { decodeEventLog } from 'viem'
import type { LucideIcon } from 'lucide-react'

const assetTypes = [
  'Real Estate',
  'Collectibles',
  'Intellectual Property',
  'Cars',
  'Watches',
  'Cards',
  'Equity',
  'Credit',
  'Investment Product',
  'Horses',
  'Spirits',
  'Novelty Products',
  'Art',
  'Music',
  'Other'
] as const

const assetTypeIcons: Record<string, LucideIcon> = {
  'Real Estate': Home,
  'Collectibles': Gem,
  'Intellectual Property': FileText,
  'Cars': Car,
  'Watches': Watch,
  'Cards': CreditCard,
  'Equity': TrendingUp,
  'Credit': Receipt,
  'Investment Product': PieChart,
  'Horses': Zap,
  'Spirits': Wine,
  'Novelty Products': Gift,
  'Art': Palette,
  'Music': Music,
  'Other': MoreHorizontal
}

export default function LaunchAssetPage() {
  const [formData, setFormData] = useState({
    assetName: '',
    assetType: '',
    description: '',
    isOwner: '',
    approximatedValue: '',
    totalSupply: '',
    propertyAddress: '',
    squareMeters: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [metadataUri, setMetadataUri] = useState<string | null>(null)
  const [isAssetTypeOpen, setIsAssetTypeOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { launchProperty, isPending: isLaunching, isConfirming, isConfirmed, error: launchError, receipt } = useRWAFactoryLaunchProperty()
  const { showSuccess, showError, showInfo } = useToast()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAssetTypeOpen(false)
      }
    }

    if (isAssetTypeOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAssetTypeOpen])

  const handleAssetTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, assetType: type }))
    setIsAssetTypeOpen(false)
    if (errors.assetType) {
      setErrors(prev => ({ ...prev, assetType: '' }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, isOwner: value }))
    if (errors.isOwner) {
      setErrors(prev => ({ ...prev, isOwner: '' }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setImages(prev => [...prev, ...newImages])
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.assetName.trim()) newErrors.assetName = 'Please enter the asset name'
    if (!formData.assetType) newErrors.assetType = 'Please select an asset type'
    if (!formData.description.trim()) newErrors.description = 'Please describe the asset'
    if (!formData.isOwner) newErrors.isOwner = 'Please select an option'
    if (!formData.approximatedValue) newErrors.approximatedValue = 'Please enter the approximated value'
    if (images.length === 0) newErrors.images = 'Please upload at least one image'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsUploading(true)
    setUploadProgress('Uploading image to IPFS...')
    setMetadataUri(null)

    try {
      // Upload the first image
      const imageFile = images[0].file
      const imageUrl = await uploadImageToPinata(imageFile)
      setUploadProgress('Creating metadata...')

      // Create metadata
      const metadata = {
        name: formData.assetName || `${formData.assetType} | Tokenized Property`,
        description: formData.description,
        image: imageUrl,
        attributes: [
          { trait_type: "Asset Name", value: formData.assetName },
          { trait_type: "Asset Type", value: formData.assetType },
          { trait_type: "Is Owner", value: formData.isOwner },
          { trait_type: "Approximated Value (USD)", value: formData.approximatedValue },
          { trait_type: "Total Supply", value: formData.totalSupply || "N/A" },
          { trait_type: "Property Address", value: formData.propertyAddress || "N/A" },
          { trait_type: "Square Meters", value: formData.squareMeters || "N/A" },
        ]
      }

      setUploadProgress('Uploading metadata to IPFS...')
      const metadataUrl = await uploadMetadataToPinata(metadata)
      
      setMetadataUri(metadataUrl)
      setUploadProgress('Launching property on-chain...')
      showInfo('Metadata uploaded successfully. Launching property...')

      // Convert form data to contract parameters
      // Note: approximatedValue should be in USD with 18 decimals (wei format)
      // For example: $1000 = 1000 * 10^18 = 1000000000000000000000
      const approximatedValueBigInt = BigInt(Math.floor(parseFloat(formData.approximatedValue || '0') * 1e18))
      const totalSupplyBigInt = BigInt(formData.totalSupply || '1000000')
      const squareMetersBigInt = BigInt(Math.floor(parseFloat(formData.squareMeters || '0')))
      const isOwnerBool = formData.isOwner === 'yes'

      // Launch property on-chain
      try {
        await launchProperty({
          assetName: formData.assetName || `${formData.assetType} | Tokenized Property`,
          assetType: formData.assetType,
          description: formData.description,
          isOwner: isOwnerBool,
          approximatedValue: approximatedValueBigInt,
          totalSupply: totalSupplyBigInt,
          propertyAddress: formData.propertyAddress || '',
          squareMeters: squareMetersBigInt,
          uri: metadataUrl,
        })
      } catch (launchErr: any) {
        console.error('Launch error:', launchErr)
        showError(launchErr.message || 'Failed to launch property on-chain')
        setErrors({ submit: launchErr.message || 'Failed to launch property. Please try again.' })
        setUploadProgress('')
        setIsUploading(false)
        return
      }
      
    } catch (error: any) {
      console.error('Upload error:', error)
      showError(error.message || 'Failed to upload. Please try again.')
      setErrors({ submit: error.message || 'Failed to upload. Please try again.' })
      setUploadProgress('')
      setIsUploading(false)
    }
  }

  // Derive state from hook values to avoid setState in effects
  const isSuccess = isConfirmed && receipt
  const displayProgress = isSuccess ? 'Property launched successfully!' : uploadProgress
  const showUploading = isUploading && !isSuccess

  // Extract property address from receipt when successful
  const extractedPropertyAddress = React.useMemo(() => {
    if (!isSuccess || !receipt) return null

    try {
      const eventAbi = factoryContractABI.find(
        (item) => item.type === 'event' && item.name === 'PropertyLaunched'
      )

      if (eventAbi && receipt.logs) {
        for (const log of receipt.logs) {
          try {
            const decoded = decodeEventLog({
              abi: [eventAbi],
              data: log.data,
              topics: log.topics,
            })

            if (decoded.eventName === 'PropertyLaunched' && decoded.args) {
              const args = decoded.args as unknown as { propertyContract: string }
              if (args && typeof args === 'object' && 'propertyContract' in args) {
                return args.propertyContract
              }
            }
          } catch (e) {
            // Continue to next log
          }
        }
      }
    } catch (error) {
      console.error('Error parsing event logs:', error)
    }

    return null
  }, [isSuccess, receipt])

  // Show success toast when property is launched
  React.useEffect(() => {
    if (isSuccess && extractedPropertyAddress) {
      showSuccess('Property launched successfully on-chain!')
      console.log("Transaction receipt:", receipt)
      console.log("Property Address:", extractedPropertyAddress)
      console.log("Metadata IPFS URL:", metadataUri)
    }
  }, [isSuccess, extractedPropertyAddress, showSuccess, receipt, metadataUri])

  // Handle launch errors directly in component logic
  const hasLaunchError = launchError && !isConfirmed

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
        <div className="max-w-2xl w-full">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-brand text-white mb-4 leading-tight">
                RWA TOKENIZED
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C3FF32] via-[#e2ff8d] to-white">
                  LAUNCHPAD
              </span>
            </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Tokenize your real-world assets with legal compliance and global investor access.
            </p>
            </div>

            {/* Launch Form */}
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Asset Name */}
                <div>
                  <label htmlFor="assetName" className="block text-sm font-semibold text-white mb-2">
                    Asset Name <span className="text-[#C3FF32]">*</span>
                  </label>
                  <input
                    type="text"
                    id="assetName"
                    name="assetName"
                    value={formData.assetName}
                    onChange={handleChange}
                    className={`w-full bg-[#0A0A0C] border ${
                      errors.assetName ? 'border-red-500/50' : 'border-white/10'
                    } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all`}
                    placeholder="Enter the name of your asset"
                  />
                  {errors.assetName && (
                    <p className="mt-1 text-xs text-red-400">{errors.assetName}</p>
                  )}
                </div>

                {/* Asset Type Dropdown */}
                <div>
                  <label htmlFor="assetType" className="block text-sm font-semibold text-white mb-2">
                    Type of asset <span className="text-[#C3FF32]">*</span>
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsAssetTypeOpen(!isAssetTypeOpen)}
                      className={`w-full bg-[#0A0A0C] border ${
                        errors.assetType ? 'border-red-500/50' : 'border-white/10'
                      } rounded-lg ${formData.assetType ? 'pl-11' : 'px-4'} pr-10 py-3 text-white focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all text-left flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-3">
                        {formData.assetType && assetTypeIcons[formData.assetType] ? (
                          <>
                            {(() => {
                              const Icon = assetTypeIcons[formData.assetType]
                              return <Icon size={18} className="text-[#C3FF32]" />
                            })()}
                            <span>{formData.assetType}</span>
                          </>
                        ) : (
                          <span className="text-gray-500">Select asset type</span>
                        )}
                      </div>
                      <ArrowRight 
                        size={16} 
                        className={`text-gray-400 transition-transform ${isAssetTypeOpen ? 'rotate-180' : 'rotate-90'}`} 
                      />
                    </button>

                    {/* Dropdown Options */}
                    {isAssetTypeOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-[#0A0A0C] border border-white/10 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {assetTypes.map((type) => {
                          const Icon = assetTypeIcons[type]
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleAssetTypeSelect(type)}
                              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/5 transition-colors ${
                                formData.assetType === type ? 'bg-[#C3FF32]/10 text-[#C3FF32]' : 'text-white'
                              }`}
                            >
                              <Icon size={18} className={formData.assetType === type ? 'text-[#C3FF32]' : 'text-gray-400'} />
                              <span>{type}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  {errors.assetType && (
                    <p className="mt-1 text-xs text-red-400">{errors.assetType}</p>
                  )}
                </div>

                {/* Asset Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                    Describe the asset you are looking to tokenize? <span className="text-[#C3FF32]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-[#0A0A0C] border ${
                      errors.description ? 'border-red-500/50' : 'border-white/10'
                    } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all resize-none`}
                    placeholder="Provide a detailed description of the asset..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400">{errors.description}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Upload Asset Images <span className="text-[#C3FF32]">*</span>
                  </label>
                  
                  {/* Upload Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center cursor-pointer hover:border-[#C3FF32]/50 hover:bg-[#C3FF32]/5 transition-all group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-[#C3FF32]/10 rounded-full flex items-center justify-center group-hover:bg-[#C3FF32]/20 transition-colors">
                        <Upload size={24} className="text-[#C3FF32]" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Click to upload images</p>
                        <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-[#C3FF32]/50 transition-all"
                        >
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-white" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-xs text-white truncate">{image.file.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.images && (
                    <p className="mt-2 text-xs text-red-400">{errors.images}</p>
                  )}
                </div>

                {/* Asset Owner */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Are you the owner of the asset? <span className="text-[#C3FF32]">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="isOwner"
                        value="yes"
                        checked={formData.isOwner === 'yes'}
                        onChange={() => handleRadioChange('yes')}
                        className="w-4 h-4 text-[#C3FF32] bg-[#0A0A0C] border-white/10 focus:ring-[#C3FF32]/50 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="isOwner"
                        value="no"
                        checked={formData.isOwner === 'no'}
                        onChange={() => handleRadioChange('no')}
                        className="w-4 h-4 text-[#C3FF32] bg-[#0A0A0C] border-white/10 focus:ring-[#C3FF32]/50 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">No</span>
                    </label>
                  </div>
                  {errors.isOwner && (
                    <p className="mt-1 text-xs text-red-400">{errors.isOwner}</p>
                  )}
                </div>

                {/* Approximated Value */}
                <div>
                  <label htmlFor="approximatedValue" className="block text-sm font-semibold text-white mb-2">
                    Approximated value of the asset (USD) <span className="text-[#C3FF32]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      id="approximatedValue"
                      name="approximatedValue"
                      value={formData.approximatedValue}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full bg-[#0A0A0C] border ${
                        errors.approximatedValue ? 'border-red-500/50' : 'border-white/10'
                      } rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.approximatedValue && (
                    <p className="mt-1 text-xs text-red-400">{errors.approximatedValue}</p>
                  )}
                </div>

                {/* Total Supply */}
                <div>
                  <label htmlFor="totalSupply" className="block text-sm font-semibold text-white mb-2">
                    Total supply of token
                  </label>
                  <input
                    type="number"
                    id="totalSupply"
                    name="totalSupply"
                    value={formData.totalSupply}
                    onChange={handleChange}
                    min="0"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all"
                    placeholder="Enter total token supply"
                  />
              </div>

                {/* Property Address */}
                <div>
                  <label htmlFor="propertyAddress" className="block text-sm font-semibold text-white mb-2">
                    Property Address
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all"
                    placeholder="Enter physical address (if applicable)"
                  />
                </div>

                {/* Square Meters */}
                <div>
                  <label htmlFor="squareMeters" className="block text-sm font-semibold text-white mb-2">
                    Square Meters
                  </label>
                  <input
                    type="number"
                    id="squareMeters"
                    name="squareMeters"
                    value={formData.squareMeters}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C3FF32]/50 focus:ring-2 focus:ring-[#C3FF32]/20 transition-all"
                    placeholder="Enter square meters (if applicable)"
                  />
                </div>

                {/* Submit Button */}
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-6">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}
                {displayProgress && (
                  <div className="bg-[#C3FF32]/10 border border-[#C3FF32]/30 rounded-lg p-3 mt-6">
                    <p className="text-[#C3FF32] text-sm">{displayProgress}</p>
                  </div>
                )}
                {hasLaunchError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-6">
                    <p className="text-red-400 text-sm">{launchError.message || 'Failed to launch property'}</p>
                  </div>
                )}
                {metadataUri && (
                  <div className="bg-[#C3FF32]/10 border border-[#C3FF32]/30 rounded-lg p-4 mt-6">
                    <p className="text-[#C3FF32] font-semibold text-sm mb-2">Metadata URI:</p>
                    <p className="text-white text-xs break-all font-mono bg-black/30 p-2 rounded">
                      {metadataUri}
                    </p>
                  </div>
                )}
                {isConfirmed && receipt && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-6">
                    <p className="text-green-400 font-semibold text-sm mb-2">✅ Property Launched Successfully!</p>
                    <div className="space-y-2">
                      <p className="text-white text-xs">
                        Transaction Hash:
                        <a
                          href={`https://sepolia.mantlescan.xyz/tx/${receipt.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C3FF32] hover:text-[#C3FF32]/80 underline ml-2 break-all font-mono bg-black/30 p-1 rounded text-xs"
                        >
                          {receipt.transactionHash}
                        </a>
                      </p>
                      {extractedPropertyAddress && (
                        <p className="text-white text-xs">
                          Property Address:
                          <a
                            href={`https://sepolia.mantlescan.xyz/address/${extractedPropertyAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C3FF32] hover:text-[#C3FF32]/80 underline ml-2 break-all font-mono bg-black/30 p-1 rounded text-xs"
                          >
                            {extractedPropertyAddress}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={showUploading || isLaunching || isConfirming}
                  className="w-full bg-[#C3FF32] text-black px-8 py-4 rounded-lg font-bold text-sm tracking-wide hover:bg-[#b0e62e] transition-all transform hover:-translate-y-1 shadow-[0_0_25px_rgba(195,255,50,0.3)] flex items-center justify-center gap-2 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {showUploading || isLaunching || isConfirming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      {isConfirming ? 'Confirming transaction...' : isLaunching ? 'Launching property...' : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      Launch Tokenization
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1 flex items-center gap-2">
                  <Sparkles size={14} />
                  Compliant
                </div>
                <div className="text-gray-400 text-xs">Legal compliance built-in</div>
              </div>
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1">Transparent</div>
                <div className="text-gray-400 text-xs">On-chain verification</div>
              </div>
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1">Global</div>
                <div className="text-gray-400 text-xs">Worldwide investor access</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

