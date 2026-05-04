import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Getting Started',
  description:
    'Start with SmoothSend across Aptos and Avalanche. Choose the right chain/mode, generate API keys, and run your first gasless transaction.',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/getting-started',
  },
}

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl text-muted-foreground">
            SmoothSend supports multiple chains with a shared gateway + API key model.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose your chain path</CardTitle>
            <CardDescription>
              Same product, different transaction rails.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">Chain</th>
                    <th className="pb-3 pr-6 font-medium">Model</th>
                    <th className="pb-3 font-medium">Start here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Aptos</td>
                    <td className="py-3 pr-6 text-gray-300">Fee-payer relayer + Script Composer</td>
                    <td className="py-3">
                      <Link href="/aptos/installation" className="text-[#7595FF] hover:underline">
                        Aptos Installation
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Avalanche (AVAX)</td>
                    <td className="py-3 pr-6 text-gray-300">ERC-4337 bundler + VerifyingPaymaster</td>
                    <td className="py-3">
                      <Link href="/avax/installation" className="text-[#7595FF] hover:underline">
                        AVAX Installation
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Generate API keys</CardTitle>
            <CardDescription>
              Use public keys in frontend and secret keys on backend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="bash"
              code={`# Frontend (browser)
pk_nogas_xxx

# Backend/server/agents
sk_nogas_xxx`}
            />
            <p className="text-sm text-gray-400">
              Create keys in{' '}
              <a href="https://dashboard.smoothsend.xyz" target="_blank" rel="noopener noreferrer" className="text-[#7595FF] hover:underline">
                dashboard.smoothsend.xyz
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Install SDK</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="bash" code="npm install @smoothsend/sdk" />
            <CodeBlock
              language="typescript"
              code={`// Aptos APIs
import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';

// AVAX ERC-4337 APIs
import { SmoothSendAvaxSubmitter, useSmoothSendAvax } from '@smoothsend/sdk/avax';`}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Introduction
          </Link>
          <Link href="/architecture" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            Architecture →
          </Link>
        </div>
      </div>
    </div>
  )
}
