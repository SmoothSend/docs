"use client"

import Link from 'next/link'
import { Menu, X, Search as SearchIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SidebarContent } from './sidebar'
import { SearchDialog } from './search-dialog'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.userAgent.includes('Mac'))
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0C15]/90 backdrop-blur-xl h-[49px]">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Left — Logo + Documentation */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <Image
                  src="/Logo Light.png"
                  alt="SmoothSend Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-sm tracking-wider text-white uppercase">SmoothSend</span>
            </Link>
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors hidden sm:block">
              Documentation
            </Link>
          </div>

          {/* Center — Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "relative w-full text-left bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] rounded-lg pl-9 pr-14 py-1.5 text-sm transition-all",
                searchOpen ? "opacity-0 pointer-events-none" : "opacity-100 text-gray-400"
              )}
            >
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <span>Search documentation...</span>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white/[0.06] border border-white/[0.08] rounded">
                  {isMac ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white/[0.06] border border-white/[0.08] rounded">K</kbd>
              </div>
            </button>
          </div>

          {/* Right — Dashboard CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="https://dashboard.smoothsend.xyz"
              target="_blank"
              className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium text-white bg-[#7595FF] rounded-lg hover:bg-[#5B7ADD] transition-colors"
            >
              Dashboard
            </Link>
            <button
              className="lg:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div
            className="absolute left-0 top-[49px] bottom-0 w-[280px] bg-[#0B0C15] border-r border-white/[0.06] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
