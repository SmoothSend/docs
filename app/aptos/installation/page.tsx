import Link from 'next/link'
import { Check, Package } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'

export default function InstallationPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Installation</h1>
          <p className="text-xl text-muted-foreground">
            Get started with SmoothSend SDK in your Aptos dApp
          </p>
        </div>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>
              Before installing, make sure you have the following:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Node.js 16+ or Bun</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>npm, yarn, or pnpm</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>An Aptos dApp project</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>A SmoothSend API key (get one at{' '}
                  <Link href="https://dashboard.smoothsend.xyz" target="_blank" className="text-primary hover:underline">
                    dashboard.smoothsend.xyz
                  </Link>)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* NPM Installation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Install via npm
            </CardTitle>
            <CardDescription>
              Recommended for most projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="bash"
              code="npm install @smoothsend/sdk"
            />

            <CodeBlock
              language="bash"
              code={`# Peer dependencies (required)
npm install @aptos-labs/ts-sdk @aptos-labs/wallet-adapter-core`}
            />
          </CardContent>
        </Card>

        {/* Yarn */}
        <Card>
          <CardHeader>
            <CardTitle>Install via yarn</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`yarn add @smoothsend/sdk
yarn add @aptos-labs/ts-sdk @aptos-labs/wallet-adapter-core`}
            />
          </CardContent>
        </Card>

        {/* pnpm */}
        <Card>
          <CardHeader>
            <CardTitle>Install via pnpm</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`pnpm add @smoothsend/sdk
pnpm add @aptos-labs/ts-sdk @aptos-labs/wallet-adapter-core`}
            />
          </CardContent>
        </Card>

        {/* Verify Installation */}
        <Card>
          <CardHeader>
            <CardTitle>Verify Installation</CardTitle>
            <CardDescription>
              Make sure everything is set up correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              code={`import { SmoothSendSDK } from '@smoothsend/sdk';

const sdk = new SmoothSendSDK({
  apiKey: 'pk_nogas_your_key_here',
  network: 'testnet'
});

console.log('SmoothSend SDK loaded successfully!');`}
            />
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Ready to start building? Check out the quick start guide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/aptos/quickstart">
                Go to Quick Start Guide →
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
