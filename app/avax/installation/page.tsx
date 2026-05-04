import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'AVAX Installation',
  description:
    'Install SmoothSend AVAX ERC-4337 SDK path with @smoothsend/sdk/avax and set up minimal dependencies for backend and React integrations.',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/avax/installation',
  },
}

export default function AvaxInstallationPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">AVAX Installation</h1>
          <p className="text-xl text-muted-foreground">
            Install only what you need for Avalanche ERC-4337 integration.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Core package</CardTitle>
            <CardDescription>
              Use the AVAX subpath export for all Avalanche integrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="bash" code="npm install @smoothsend/sdk" />
            <CodeBlock
              language="typescript"
              code={`// AVAX-only import path
import { SmoothSendAvaxSubmitter } from '@smoothsend/sdk/avax';`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Backend dependencies</CardTitle>
            <CardDescription>
              For Node/server-side AVAX userOp signing and submission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code="npm install viem" />
          </CardContent>
        </Card>

        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>Frontend React dependencies</CardTitle>
            <CardDescription>
              Needed only when using <code className="text-xs bg-white/5 px-1 py-0.5 rounded">SmoothSendAvaxProvider</code> and{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">useSmoothSendAvax</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="bash" code="npm install viem wagmi @tanstack/react-query react" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key types</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`# Browser / frontend
pk_nogas_xxx

# Backend / server
sk_nogas_xxx`}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/getting-started" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Getting Started
          </Link>
          <Link href="/avax/quickstart" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            AVAX Quick Start →
          </Link>
        </div>
      </div>
    </div>
  )
}

