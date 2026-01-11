"use client"
import {
  Navbar,
  Hero,
  FeaturesGrid,
  SDKSection,
  DashboardPreview,
  AIAgents,
  CTASection,
  Footer
} from '@/components/ui'

export default function Home() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans selection:bg-[#C3FF32] selection:text-black scroll-smooth">
      <Navbar />
      <Hero
        badge="RWA TOKENIZATION PLATFORM"
        title="Tokenize Real-World"
        titleHighlight="Assets on Blockchain"
        description="Transform illiquid assets into tradeable tokens. Real estate, commodities, art, collectibles, and more—all tokenized and tradeable 24/7 on-chain."
        subtitle="Unlock liquidity, fractionalize ownership, and democratize access to premium alternative assets through blockchain technology."
        primaryCta={{ text: "Tokenize Your Asset", href: "/rwa-launch" }}
        secondaryCta={{ text: "Explore SDK", href: "/sdk-demo" }}
      />
      <FeaturesGrid 
        title="Why Tokenize Real-World Assets?"
        subtitle="Bridge traditional finance with DeFi. Fractionalize ownership, unlock liquidity, and create new investment opportunities."
      />
      <SDKSection 
        title="Developer-First RWA Tokenization SDK"
        description="Build RWA tokenization applications in minutes. Our comprehensive SDK handles smart contract interactions, token management, and asset lifecycle—all with full TypeScript support and battle-tested security."
        features={[
          'Complete RWA tokenization workflow',
          'ERC1155 multi-token standard support',
          'Full TypeScript types & IntelliSense',
          'Mantle Network optimized for low fees',
          'IPFS integration for asset metadata',
          'Factory pattern for scalable deployments'
        ]}
        badges={['Type-Safe SDK', 'Production Ready', 'Mantle Network', 'Open Source']}
      />
      <DashboardPreview 
        title="Complete RWA Management Platform"
        subtitle="Launch, manage, and track your tokenized assets with real-time analytics and comprehensive dashboards."
      />
      <AIAgents 
        title="AI-Powered RWA Tokenization"
        subtitle="Automate compliance, valuation, and analytics for your tokenized assets. Let AI handle the complexity while you focus on growth."
        heroTitle="Intelligent Asset Tokenization"
        heroDescription="Our AI agents continuously monitor regulatory compliance, perform real-time asset valuations, and provide instant insights—ensuring your tokenized assets remain compliant and accurately priced."
        heroBenefits={[
          'Automated regulatory compliance checks',
          'Real-time asset valuation & pricing',
          'Natural language analytics queries',
          'Cross-jurisdiction legal verification'
        ]}
        heroStat={{
          value: "90%",
          label: "Faster tokenization process"
        }}
      />
      <CTASection title="Start Tokenizing Real-World Assets Today" />
      <Footer 
        tagline="The Future of Asset Tokenization. Built on Blockchain."
      />
    </div>
  )
}
