"use client"

import React from 'react'
import { TrendingUp, BarChart3, Globe } from 'lucide-react'

interface FeatureCard {
  title: string
  description: string
  span?: number
  visual?: React.ReactNode
  icon?: React.ReactNode
}

interface FeaturesGridProps {
  title?: string
  subtitle?: string
  features?: FeatureCard[]
}

const defaultFeatures: FeatureCard[] = [
  {
    title: "Fractionalize Ownership",
    description: "Break down high-value assets into tradeable tokens. Enable fractional ownership of real estate, art, collectibles, and commodities—making premium investments accessible to everyone.",
    span: 2,
    icon: <TrendingUp size={32} className="text-[#C3FF32]" />,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 relative flex items-center justify-center">
        <div className="w-16 h-16 bg-[#C3FF32]/10 rounded-full border border-[#C3FF32]/30 flex items-center justify-center">
          <TrendingUp size={32} className="text-[#C3FF32]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#C3FF32]/5 to-transparent rounded-lg opacity-50"></div>
        {/* Fractionalization visual */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1">
          <div className="w-8 h-8 bg-[#C3FF32]/20 rounded border border-[#C3FF32]/30"></div>
          <div className="text-[#C3FF32] text-xs">→</div>
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-4 h-4 bg-[#C3FF32]/30 rounded border border-[#C3FF32]/40"></div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Unlock Liquidity",
    description: "Transform illiquid assets into tradeable tokens. Trade real estate, commodities, and collectibles 24/7 on blockchain—no waiting periods, no intermediaries, instant settlement.",
    span: 2,
    icon: <BarChart3 size={32} className="text-[#C3FF32]" />,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 relative flex items-center justify-center">
        <div className="w-16 h-16 bg-[#C3FF32]/10 rounded-full border border-[#C3FF32]/30 flex items-center justify-center">
          <BarChart3 size={32} className="text-[#C3FF32]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#C3FF32]/5 to-transparent rounded-lg opacity-50"></div>
        {/* Chart bars animation */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-center gap-1 h-12">
          <div className="w-2 bg-[#C3FF32]/30 rounded-t h-[30%]"></div>
          <div className="w-2 bg-[#C3FF32]/50 rounded-t h-[50%]"></div>
          <div className="w-2 bg-[#C3FF32]/70 rounded-t h-[70%]"></div>
          <div className="w-2 bg-[#C3FF32] rounded-t h-full"></div>
        </div>
      </div>
    )
  },
  {
    title: "Global Access",
    description: "Tokenize and trade assets globally without borders. Blockchain-based ownership enables instant transfers, cross-border trading, and 24/7 market access from anywhere in the world.",
    span: 2,
    icon: <Globe size={32} className="text-[#C3FF32]" />,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 relative flex items-center justify-center">
        <div className="w-16 h-16 bg-[#C3FF32]/10 rounded-full border border-[#C3FF32]/30 flex items-center justify-center">
          <Globe size={32} className="text-[#C3FF32]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#C3FF32]/5 to-transparent rounded-lg opacity-50"></div>
        {/* Globe grid lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border border-[#C3FF32]/20 rounded-full"></div>
          <div className="absolute w-24 h-24 border border-[#C3FF32]/10 rounded-full"></div>
        </div>
      </div>
    )
  }
]

export function FeaturesGrid({
  title = "Features",
  subtitle = "",
  features = defaultFeatures
}: FeaturesGridProps) {
  return (
    <section id="features" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            {subtitle && <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {features.map((feature, i) => {
            const spanClass = feature.span === 3 ? 'lg:col-span-3' : 'lg:col-span-2'
            return (
            <div
              key={i}
              className={`${spanClass} bg-[#0E0E11] rounded-2xl border border-white/8 ${feature.span === 3 ? 'p-8' : 'p-6'} relative overflow-hidden group hover:border-[#C3FF32]/25 transition-all duration-300 flex flex-col h-full hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(195,255,50,0.08)]`}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/0 to-transparent group-hover:via-[#C3FF32]/40 transition-all duration-500"></div>
              
              {feature.visual && (
                <div className="flex-shrink-0">
                  {feature.visual}
                </div>
              )}
              
              <div className="flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  {feature.icon && (
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                  )}
                  <h3 className={`font-bold text-white ${feature.span === 3 ? 'text-xl' : 'text-lg'}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`text-gray-400 leading-relaxed ${feature.span === 3 ? 'text-sm' : 'text-sm'}`}>
                  {feature.description}
                </p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export type { FeatureCard }
