import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'Understand SmoothSend request flow across gateway, relayers, AVAX bundler, paymaster signing, SDK, and dashboard control plane.',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/architecture',
  },
}

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Architecture</h1>
          <p className="text-xl text-muted-foreground">
            SmoothSend uses one public gateway and chain-specific execution backends.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request flow</CardTitle>
            <CardDescription>High-level flow for both Aptos and AVAX paths.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`Client / SDK
  -> Cloudflare Gateway (auth, credits, rate-limit, routing)
      -> Aptos Relayer (fee-payer flow)
      -> AVAX Bundler (ERC-4337 JSON-RPC + paymaster signing)
      -> Dashboard APIs / analytics`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>AVAX (ERC-4337)</CardTitle>
            <CardDescription>
              EntryPoint v0.7 + VerifyingPaymaster with gateway-authenticated bundler endpoints.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <p>1. SDK calls gateway (`X-Chain: avalanche`, `X-Network: testnet|mainnet`).</p>
            <p>2. Gateway authenticates API key and forwards to AVAX bundler with internal secret.</p>
            <p>3. Bundler estimates UserOp gas and signs paymaster payload.</p>
            <p>4. Bundler submits `handleOps` on EntryPoint and returns `userOpHash`.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Control plane responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">Layer</th>
                    <th className="pb-3 font-medium">Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Gateway</td>
                    <td className="py-3 text-gray-300">API key auth, billing checks, chain routing, header forwarding</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Bundler / Relayer</td>
                    <td className="py-3 text-gray-300">Transaction orchestration, nonce ownership, chain submission</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-white font-medium">Dashboard</td>
                    <td className="py-3 text-gray-300">Projects, keys, sponsorship rules, usage visibility</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

