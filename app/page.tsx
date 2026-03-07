import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function HomePage() {
  return (
    <div className="max-w-3xl px-6 lg:px-10 py-10">
      <Breadcrumbs />

      <h1 className="text-4xl font-bold mb-6">About SmoothSend</h1>

      <p className="text-gray-300 text-lg leading-relaxed mb-6">
        SmoothSend is gasless transaction infrastructure for the{' '}
        <a href="https://aptoslabs.com" target="_blank" rel="noopener noreferrer" className="text-[#7595FF] hover:underline">
          Aptos blockchain
        </a>
        . Whether you&apos;re building your first dApp or scaling a production application,
        SmoothSend lets your users transact without ever paying gas fees.
      </p>

      <p className="text-gray-400 leading-relaxed mb-4">
        With SmoothSend, you can:
      </p>

      <ul className="space-y-3 mb-8">
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Enable <span className="text-white font-medium">gasless transactions with 3 lines of code</span> using the{' '}
            <Link href="/aptos/quickstart" className="text-[#7595FF] hover:underline">Wallet Adapter</Link> integration.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Build <span className="text-white font-medium">fee-in-token transfers</span> with{' '}
            <Link href="/aptos/api-reference" className="text-[#7595FF] hover:underline">Script Composer</Link> — no APT needed.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Configure{' '}
            <Link href="/aptos/sponsorship-rules" className="text-[#7595FF] hover:underline">Sponsorship Rules</Link>{' '}
            to control exactly which transactions you sponsor.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Instantly generate API keys for access to gasless relayer infrastructure.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Monitor usage, manage API keys, and top up credits from the{' '}
            <a href="https://dashboard.smoothsend.xyz" target="_blank" rel="noopener noreferrer" className="text-[#7595FF] hover:underline">
              Dashboard
            </a>.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-gray-600 mt-1.5">&bull;</span>
          <span className="text-gray-300">
            Use the{' '}
            <Link href="/mcp" className="text-[#7595FF] hover:underline">MCP integration</Link>{' '}
            to interact with SmoothSend from AI coding agents.
          </span>
        </li>
      </ul>

      <p className="text-gray-300 leading-relaxed mb-8">
        SmoothSend is designed to simplify web3 onboarding, eliminate gas fee friction, and help you
        deliver great blockchain experiences — fast.
      </p>

      <p className="text-gray-300 mb-12">
        <span className="font-medium text-white">Ready to get started?</span>{' '}
        <Link href="/aptos/installation" className="text-[#7595FF] hover:underline">
          See our Getting Started guide
        </Link>.
      </p>

      {/* Bottom page navigation */}
      <div className="border-t border-white/[0.06] pt-6">
        <div className="flex justify-end">
          <Link
            href="/aptos/installation"
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Getting Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
