import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privy Integration (Aptos)',
  description:
    'Use Privy embedded wallets with SmoothSend for gasless Aptos transactions. One provider, one hook.',
}

export default function AptosPrivyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Privy Integration (Aptos)</h1>
          <p className="text-xl text-muted-foreground">
            Privy handles auth + Ed25519 wallet creation. SmoothSend handles fee-payer sponsorship.
            Your users get gasless Aptos transactions without downloading any wallet.
          </p>
        </div>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              Aptos natively supports <strong>sponsored transactions</strong> (fee-payer model).
              No bundlers, no UserOps, no paymaster contracts.
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Your hook builds the transaction with <code className="text-xs bg-white/5 px-1 py-0.5 rounded">withFeePayer: true</code></li>
              <li>Privy signs the sender portion (Ed25519)</li>
              <li>SmoothSend relayer adds fee-payer signature and submits to Aptos</li>
            </ol>
            <p className="text-gray-400 mt-2">
              This is simpler than the AVAX flow — Aptos has native gas sponsorship built into the protocol.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>1) Install</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`npm install @smoothsend/sdk @privy-io/react-auth @aptos-labs/ts-sdk`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2) Root provider</CardTitle>
            <CardDescription>
              Wrap your app with both Privy and SmoothSend providers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="providers.tsx"
              showLineNumbers
              code={`import { PrivyProvider } from '@privy-io/react-auth';
import { SmoothSendAptosProvider } from '@smoothsend/sdk/aptos';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        embeddedWallets: {
          ethereum: { createOnLogin: 'users-without-wallets' },
        },
      }}
    >
      <SmoothSendAptosProvider
        apiKey={process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!}
        // network defaults to "testnet"; set "mainnet" for production
      >
        {children}
      </SmoothSendAptosProvider>
    </PrivyProvider>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3) One hook, one button</CardTitle>
            <CardDescription>
              Use <code>useSmoothSendPrivyWrite</code> from <code>@smoothsend/sdk/aptos</code>.
              Every <code>submitTransaction</code> call goes through SmoothSend — gas is free.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="GaslessButton.tsx"
              showLineNumbers
              code={`import { useSmoothSendPrivyWrite } from '@smoothsend/sdk/aptos';
import { usePrivy } from '@privy-io/react-auth';
import { toHex } from 'viem';

function GaslessButton() {
  const { user, signMessage } = usePrivy();

  // Privy creates an Aptos wallet with Ed25519 keys
  const aptosWallet = user?.linkedAccounts?.find(
    (a) => a.type === 'wallet' && a.chainType === 'aptos'
  );

  const { submitTransaction, isPending } = useSmoothSendPrivyWrite({
    publicKey: aptosWallet?.publicKey ?? '',
    address: aptosWallet?.address ?? '',
    signTransaction: async ({ message }) => {
      // Privy signs the raw transaction bytes
      const sig = await signMessage(toHex(message));
      return sig;
    },
  });

  return (
    <button
      disabled={isPending || !aptosWallet}
      onClick={() =>
        submitTransaction({
          function: '0x1::coin::transfer',
          typeArguments: ['0x1::aptos_coin::AptosCoin'],
          functionArguments: ['0xRecipientAddress', 100],
        })
      }
    >
      {isPending ? 'Sponsoring...' : 'Send Gasless'}
    </button>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">apiKey</code> is required on{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">SmoothSendAptosProvider</code>.{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">network</code> is optional and defaults to{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">&quot;testnet&quot;</code>.
            </p>
            <p>
              Privy Aptos wallets use Ed25519 keys.{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">publicKey</code> must be the 32-byte hex key from{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">wallet.public_key</code>.
            </p>
            <p>
              No relayer or gateway changes needed — the hook uses the same{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">/api/v1/relayer/gasless-transaction</code>{' '}
              endpoint as the standard Wallet Adapter integration.
            </p>
            <p>
              All transactions are <strong>developer-sponsored</strong> (gasless). The Aptos fee-payer model
              does not have a user-pays-ERC20 equivalent — the developer always pays APT gas via SmoothSend credits.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/aptos/quickstart" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Quick Start
          </Link>
          <Link href="/aptos/api-reference" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            API Reference →
          </Link>
        </div>
      </div>
    </div>
  )
}
