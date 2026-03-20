"use client"

import * as React from 'react'
import { Search, X, FileText, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Hardcoded index for client-side search
const searchIndex = [
  { id: '1', title: 'Introduction', description: 'What is SmoothSend?', href: '/' },
  { id: '2', title: 'Getting Started', description: 'Installation and setup requirements', href: '/aptos/installation' },
  { id: '3', title: 'Wallet Adapter Method', description: 'Enable gasless transactions with 3 lines of code', href: '/aptos/quickstart' },
  { id: '4', title: 'Script Composer Method', description: 'Fee-in-token transfers', href: '/aptos/quickstart' },
  { id: '5', title: 'API Reference', description: 'SmoothSendTransactionSubmitter and useSmoothSend', href: '/aptos/api-reference' },
  { id: '6', title: 'Sponsorship Rules', description: 'Whitelist senders, functions, and rate limits', href: '/aptos/sponsorship-rules' },
  { id: '7', title: 'Code Examples', description: 'Real-world transaction examples', href: '/aptos/examples' },
  { id: '8', title: 'Pricing & Billing', description: 'Credit packages, fees, and gas calculator', href: '/billing' },
  { id: '9', title: 'Model Context Protocol (MCP)', description: 'Connect Cursor, Windsurf, Claude', href: '/mcp' },
  { id: '10', title: 'Supported Tokens', description: 'USDC, USDT, WBTC, USDe, USD1 addresses', href: '/aptos/api-reference' },
]

export function SearchDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState('')
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      setQuery('')
      // Small timeout to ensure the modal is mounted before focusing
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Fuzzy search
  const filteredResults = searchIndex.filter((item) => {
    const q = query.toLowerCase()
    return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl px-4 sm:px-0">
        <div className="glass-card bg-[#0B0C15]/80 rounded-xl overflow-hidden flex flex-col max-h-[70vh]">
          {/* Search Input Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#13141F]/50">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-gray-200 placeholder:text-gray-500 focus:outline-none text-lg"
            />
            <button onClick={onClose} className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="space-y-1">
                {filteredResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.href)
                      onClose()
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-left group hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 p-1.5 rounded-md bg-white/[0.04] text-gray-400 group-hover:text-[#7595FF] group-hover:bg-[#7595FF]/10 transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-200 group-hover:text-[#7595FF] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/[0.06] bg-[#0B0C15] flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] font-mono">esc</kbd> to close</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] font-mono">↵</kbd> to select</span>
            </div>
            <span>SmoothSend Documentation</span>
          </div>

        </div>
      </div>
    </div>
  )
}
