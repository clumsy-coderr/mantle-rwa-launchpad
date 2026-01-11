"use client"

import React from 'react'
import Image from 'next/image'
import { Building2, Users, TrendingUp, Coins } from 'lucide-react'

interface DashboardPreviewProps {
  title?: string
  subtitle?: string
}

export function DashboardPreview({
  title = "Complete RWA Management Platform",
  subtitle = "Launch, manage, and track your tokenized assets with real-time analytics and comprehensive dashboards."
}: DashboardPreviewProps) {
  const metrics = [
    {
      icon: Building2,
      value: "$45.2M",
      label: "Total Assets Tokenized",
      change: "+32% this month"
    },
    {
      icon: Users,
      value: "3,847",
      label: "Token Holders",
      change: "+289 new holders"
    },
    {
      icon: TrendingUp,
      value: "1,847",
      label: "RWA Tokens Launched",
      change: "+127 this week"
    },
    {
      icon: Coins,
      value: "$18.5M",
      label: "Trading Volume",
      change: "+58% growth"
    }
  ]

  return (
    <section id="dashboard" className="py-24 bg-[#0A0A0C] flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="bg-[#0E0E11] border border-white/10 rounded-xl p-6 hover:border-[#C3FF32]/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg flex items-center justify-center group-hover:bg-[#C3FF32]/20 transition-colors">
                    <Icon className="text-[#C3FF32]" size={20} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs md:text-sm text-gray-400 mb-2">{metric.label}</div>
                <div className="text-xs text-[#C3FF32] font-semibold">{metric.change}</div>
              </div>
            )
          })}
        </div>

     
      </div>
    </section>
  )
}

