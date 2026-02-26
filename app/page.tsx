import Link from 'next/link'
import { ArrowRight, Zap, Shield, Code2, Rocket, BookOpen, Globe, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { GasCalculator } from '@/components/gas-calculator'
import { LatencyTest } from '@/components/latency-test'

const FEATURES = [
  {
    icon: Code2,
    color: '#7595FF',
    title: '3-Line Integration',
    desc: 'Drop-in replacement for your existing wallet adapter. Any transaction type, zero refactoring.',
  },
  {
    icon: Shield,
    color: '#7595FF',
    title: 'Secure by Default',
    desc: 'API key auth, rate limiting, and gateway-level secret validation on every request.',
  },
  {
    icon: Zap,
    color: '#06b6d4',
    title: 'Testnet Always Free',
    desc: 'Build and test without spending a cent. Pay only when you ship to mainnet.',
  },
  {
    icon: Rocket,
    color: '#7595FF',
    title: 'Global Edge',
    desc: 'Cloudflare Worker gateway with sub-500ms p99 latency worldwide.',
  },
  {
    icon: BookOpen,
    color: '#06b6d4',
    title: 'Complete Docs',
    desc: 'Guides, API reference, and real code examples for every use case.',
  },
  {
    icon: Globe,
    color: '#7595FF',
    title: 'Multi-Chain Coming',
    desc: 'Aptos live now. EVM and Stellar support in progress.',
  },
]

const STATS = [
  { value: '3', label: 'lines of code' },
  { value: 'Free', label: 'testnet always' },
  { value: '$0.01', label: 'minimum fee' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden px-4 py-16 lg:py-0">

        {/* Ambient background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#7595FF]/[0.07] blur-[120px] animate-pulse-glow" />
          <div
            className="absolute -top-16 right-[-100px] w-[550px] h-[550px] rounded-full bg-[#06b6d4]/[0.06] blur-[100px] animate-pulse-glow"
            style={{ animationDelay: '1.8s' }}
          />
          <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[280px] rounded-full bg-[#7595FF]/[0.04] blur-[90px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(117,149,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(117,149,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — text */}
            <div className="space-y-8">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-[#7595FF]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <Zap className="w-3.5 h-3.5 text-[#7595FF] shrink-0" />
                <span className="text-sm font-medium text-[#7595FF]">Live on Aptos Mainnet</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04]">
                  <span className="bg-gradient-to-r from-[#7595FF] via-[#b0c0ff] to-[#06b6d4] bg-clip-text text-transparent">
                    SmoothSend
                  </span>
                  <br />
                  <span className="text-white">Documentation</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-[480px] leading-relaxed">
                  Enable gasless transactions on Aptos with 3 lines of code.
                  Your users never pay gas — you set the experience.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#7595FF] hover:bg-[#5B7ADD] text-white shadow-xl shadow-[#7595FF]/25 transition-all duration-200 active:scale-95"
                >
                  <Link href="/aptos/quickstart">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200"
                >
                  <Link href="/aptos/installation">
                    Installation Guide
                  </Link>
                </Button>
              </div>

              {/* Stats bar */}
              <div className="pt-1 border-t border-white/[0.07] space-y-3">
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white tabular-nums">{s.value}</span>
                      <span className="text-sm text-gray-500">{s.label}</span>
                    </div>
                  ))}
                </div>
                <LatencyTest />
              </div>
            </div>

            {/* Right — glass code card */}
            <div className="relative animate-float">
              {/* Glow halo behind card */}
              <div className="absolute inset-[-24px] bg-gradient-to-br from-[#7595FF]/15 to-[#06b6d4]/10 blur-3xl rounded-3xl pointer-events-none" />
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <CodeBlock
                  language="typescript"
                  filename="App.tsx"
                  showLineNumbers
                  highlightLines={[1, 4, 5, 6, 10]}
                  code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const smoothSend = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

export function Providers({ children }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{ network: Network.MAINNET, transactionSubmitter: smoothSend }}
    >
      {children} {/* ← Now completely gasless */}
    </AptosWalletAdapterProvider>
  );
}`}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Subtle section separator glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Production-ready gasless infrastructure with first-class developer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-6 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-default"
                style={{ '--hover-color': color } as React.CSSProperties}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gas Calculator ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7595FF]/[0.04] blur-[80px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-3xl relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7595FF]/10 border border-[#7595FF]/20 mb-4">
              <Coins className="w-3.5 h-3.5 text-[#7595FF]" />
              <span className="text-xs font-medium text-[#7595FF]">Pricing Calculator</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Gas Estimator</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              See exactly what you&apos;ll pay — and how much gas your users skip — before you go live.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6 md:p-8">
            <GasCalculator />
          </div>

          <div className="text-center mt-6">
            <Link href="/billing" className="text-sm text-[#7595FF] hover:underline inline-flex items-center gap-1">
              View full pricing details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick Start preview ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-gray-400">
              Works with any transaction — transfers, contracts, NFTs, DeFi.
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <CodeBlock
              language="typescript"
              filename="quickstart.tsx"
              showLineNumbers
              highlightLines={[1, 4, 5, 6, 10, 11, 15]}
              code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';

// 1 — Create the submitter once
const smoothSend = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'testnet', // testnet is always free
});

// 2 — Pass to your wallet provider
<AptosWalletAdapterProvider
  dappConfig={{ network: Network.TESTNET, transactionSubmitter: smoothSend }}
>

// 3 — Use signAndSubmitTransaction as normal. Now gasless!
const { signAndSubmitTransaction } = useWallet();
const result = await signAndSubmitTransaction({ data: payload });`}
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild className="bg-[#7595FF] hover:bg-[#5B7ADD] text-white shadow-lg shadow-[#7595FF]/20">
              <Link href="/aptos/quickstart">
                Read the Full Guide <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7595FF]/[0.07] via-transparent to-[#06b6d4]/[0.05] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#7595FF]/[0.06] blur-[70px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-2xl relative text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to ship gasless?</h2>
          <p className="text-gray-400 text-lg">
            Get your API key, integrate in minutes, and let your users focus on your app — not gas fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#7595FF] hover:bg-[#5B7ADD] text-white shadow-xl shadow-[#7595FF]/25 transition-all duration-200 active:scale-95"
            >
              <Link href="https://dashboard.smoothsend.xyz" target="_blank">
                Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20"
            >
              <Link href="/billing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
