'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  return (
    <footer className="border-t border-border/40 bg-card py-12 px-4 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <Image
                  src="/Logo Light.png"
                  alt="SmoothSend Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">SmoothSend</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gasless transactions for Aptos and Avalanche. Simple, secure, and scalable infrastructure for the next generation of dApps.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground/90">Documentation</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/getting-started" className="hover:text-primary transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/avax/quickstart" className="hover:text-primary transition-colors">
                  AVAX Quick Start
                </Link>
              </li>
              <li>
                <Link href="/aptos/quickstart" className="hover:text-primary transition-colors">
                  Aptos Quick Start
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-primary transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/aptos/api-reference" className="hover:text-primary transition-colors">
                  Aptos API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground/90">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/billing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="https://dashboard.smoothsend.xyz" target="_blank" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="https://github.com/smoothsend" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground/90">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:contact@smoothsend.xyz" className="hover:text-primary transition-colors">
                  Email Support
                </a>
              </li>
              <li>
                <a href="https://x.com/smoothsend" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.smoothsend.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SmoothSend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
