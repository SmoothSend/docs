"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/aptos/installation', label: 'Installation' },
  { href: '/aptos/quickstart', label: 'Quick Start' },
  { href: '/aptos/api-reference', label: 'API Reference' },
  { href: '/aptos/examples', label: 'Examples' },
  { href: '/billing', label: 'Pricing' },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0C15]/75 backdrop-blur-2xl shadow-lg shadow-black/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/Logo Light.png"
                alt="SmoothSend Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl tracking-tight">SmoothSend</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Docs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://dashboard.smoothsend.xyz"
              target="_blank"
              className="ml-4 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-200 active:scale-95"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1 bg-background/95 backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/5 border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link
                href="https://dashboard.smoothsend.xyz"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
