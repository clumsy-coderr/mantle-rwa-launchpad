"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'
import { ConnectWallet } from './ConnectWallet'

interface NavbarProps {
  links?: Array<{ label: string; href: string }>
  ctaText?: string
  ctaHref?: string
  githubUrl?: string
}
export function Navbar({
  ctaText = "Launch Asset",
  ctaHref = "/rwa-launch",
  githubUrl = "https://github.com"
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'SDK', href: '#sdk' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'RWA Launch', href: '/rwa-launch' },
    { label: 'Analytics', href: '/dashboard/analytics' },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false
    if (!pathname) return false
    
    if (pathname === href) return true
    
    if (pathname.startsWith(href)) {
      const nextChar = pathname[href.length]
      return nextChar === undefined
    }
    
    return false
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 font-sans bg-black border-b border-white/10 ${scrolled ? 'py-2 shadow-lg shadow-black/20' : 'py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2">
            
            <span className="text-white font-bold text-xl tracking-tight">
              RWA<span className="text-[#C3FF32]">.fun</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const active = isActive(link.href)
            const href = link.href.startsWith('#') ? `/${link.href}` : link.href
            
            return (
              <Link
                key={link.label}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'text-[#C3FF32] bg-[#C3FF32]/10'
                    : 'text-gray-400 hover:text-[#C3FF32] hover:bg-white/5'
                }`}
              >
                {link.label}
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C3FF32] rounded-full"></div>
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          
          <ConnectWallet />
        
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {links.map((link) => {
            const active = isActive(link.href)
            const href = link.href.startsWith('#') ? `/${link.href}` : link.href
            
            return (
              <Link
                key={link.label}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  active
                    ? 'text-[#C3FF32] bg-[#C3FF32]/10'
                    : 'text-gray-300 hover:text-[#C3FF32] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
          
            <div className="flex justify-center">
              <ConnectWallet />
            </div>
           
          </div>
        </div>
      </div>
    </nav>
  )
}

