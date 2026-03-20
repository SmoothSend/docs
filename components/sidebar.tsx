"use client"

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavChild {
  href: string
  label: string
}

interface NavItem {
  href?: string
  label: string
  children?: NavChild[]
}

const sidebarItems: NavItem[] = [
  { href: '/', label: 'Introduction' },
  {
    label: 'Getting Started',
    children: [
      { href: '/aptos/installation', label: 'Installation' },
      { href: '/aptos/quickstart', label: 'Quick Start' },
    ],
  },
  { href: '/aptos/api-reference', label: 'API Reference' },
  { href: '/aptos/sponsorship-rules', label: 'Sponsorship Rules' },
  { href: '/aptos/examples', label: 'Examples' },
  { href: '/billing', label: 'Pricing' },
  { href: '/mcp', label: 'MCP' },
]

function SidebarContentInner({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started'])

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href
  const hasActiveChild = (children?: NavChild[]) =>
    children?.some((child) => pathname === child.href)

  return (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {sidebarItems.map((item) => {
        if (item.children) {
          const expanded = expandedSections.includes(item.label) || hasActiveChild(item.children)
          return (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-[14px] rounded-md transition-colors',
                  hasActiveChild(item.children)
                    ? 'text-white'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <span>{item.label}</span>
                <ChevronRight
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    expanded && 'rotate-90'
                  )}
                />
              </button>
              {expanded && (
                <div className="ml-3 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className={cn(
                        'block px-3 py-1.5 text-[13px] rounded-md transition-colors',
                        isActive(child.href)
                          ? 'text-[#7595FF] bg-[#7595FF]/[0.08]'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href!}
            onClick={onNavigate}
            className={cn(
              'block px-3 py-2 text-[14px] rounded-md transition-colors',
              isActive(item.href!)
                ? 'text-[#7595FF] bg-[#7595FF]/[0.08] font-medium'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Suspense fallback={null}>
      <SidebarContentInner onNavigate={onNavigate} />
    </Suspense>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[260px] border-r border-white/[0.06] bg-[#0B0C15] h-[calc(100vh-49px)] sticky top-[49px] shrink-0 overflow-y-auto sidebar-scroll">
      <SidebarContent />
    </aside>
  )
}
