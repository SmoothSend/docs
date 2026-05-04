"use client"

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pathLabels: Record<string, string> = {
  '/': 'Introduction',
  '/getting-started': 'Getting Started',
  '/architecture': 'Architecture',
  '/avax/installation': 'AVAX Installation',
  '/avax/quickstart': 'AVAX Quick Start',
  '/avax/api-reference': 'AVAX API Reference',
  '/avax/examples': 'AVAX Examples',
  '/aptos/installation': 'Aptos Installation',
  '/aptos/quickstart': 'Aptos Quick Start',
  '/aptos/api-reference': 'Aptos API Reference',
  '/aptos/sponsorship-rules': 'Aptos Sponsorship Rules',
  '/aptos/examples': 'Aptos Examples',
  '/billing': 'Pricing',
  '/mcp': 'MCP',
}

function BreadcrumbsInner() {
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

export function Breadcrumbs() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbsInner />
    </Suspense>
  )
}
