"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pathLabels: Record<string, string> = {
  '/': 'Introduction',
  '/aptos/installation': 'Installation',
  '/aptos/quickstart': 'Quick Start',
  '/aptos/api-reference': 'API Reference',
  '/aptos/sponsorship-rules': 'Sponsorship Rules',
  '/aptos/examples': 'Examples',
  '/billing': 'Pricing',
  '/mcp': 'MCP',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const label = pathLabels[pathname]

  if (!label) return null

  return (
    <div className="flex items-center gap-2 text-sm mb-2">
      <Link href="/" className="text-gray-500 hover:text-white transition-colors">
        Documentation
      </Link>
      <span className="text-gray-600">&gt;</span>
      <span className="text-gray-300">{label}</span>
    </div>
  )
}
