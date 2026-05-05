import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privy Integration (AVAX)',
  description:
    'Use Privy for authentication/signature UX and SmoothSend for AVAX sponsorship with useSmoothSendPrivyWrite.',
}

export default function AvaxPrivyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Privy Integration (AVAX)</h1>
          <p className="text-xl text-muted-foreground">
            Privy handles login/signature UX, SmoothSend handles sponsorship + UserOperation submission.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1) Root providers</CardTitle>
            <CardDescription>
              Configure both Privy and SmoothSend once at app root.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="RootProviders.tsx"
              showLineNumbers
              code={`import { PrivyProvider } from '@privy-io/react-auth';
import { avalancheFuji } from 'viem/chains';
import { SmoothSendAvaxProvider } from '@smoothsend/sdk/avax';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        embeddedWallets: { ethereum: { createOnLogin: 'users-without-wallets' } },
        defaultChain: avalancheFuji,
        supportedChains: [avalancheFuji],
      }}
    >
      <SmoothSendAvaxProvider
        apiKey={process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!} // pk_nogas_*
        // network is optional; defaults to "testnet"
        // network="mainnet" // uncomment for mainnet
      >
        {children}
      </SmoothSendAvaxProvider>
    </PrivyProvider>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2) One hook in your component</CardTitle>
            <CardDescription>
              Keep a wagmi-like write flow with Privy signatures. Do not pass <code>mode</code> to the hook.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="PrivyGaslessButton.tsx"
              showLineNumbers
              code={`import { usePublicClient } from 'wagmi';
import { usePrivy, useSignMessage } from '@privy-io/react-auth';
import { useSmoothSendPrivyWrite } from '@smoothsend/sdk/avax';

function PrivyGaslessButton() {
  const publicClient = usePublicClient();
  const { user } = usePrivy();
  const { signMessage } = useSignMessage();

  const ownerAddress = user?.wallet?.address as \`0x\${string}\` | undefined;

  // Every writeContract call below goes through SmoothSend sponsorship infra.
  // mode is set per writeContract call (not in hook params).
  const { writeContract, isPending } = useSmoothSendPrivyWrite({
    publicClient,
    ownerAddress: ownerAddress ?? '0x0000000000000000000000000000000000000000',
    // optional override if provider-level network is not set:
    // network: 'mainnet',
    signMessage: async ({ message }) => (await signMessage({ message })).signature,
  });

  return (
    <button
      disabled={isPending}
      onClick={() =>
        writeContract({
          address: '0xYourContract',
          abi: YOUR_ABI,
          functionName: 'mint',
          args: [1],
          mode: 'developer-sponsored',
        })
      }
    >
      {isPending ? 'Sponsoring...' : 'Submit Gasless'}
    </button>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3) Use user-pays-erc20 mode (Privy)</CardTitle>
            <CardDescription>
              Set mode on the write call itself. This is where Privy users switch billing behavior.
              If <code>mode</code> is omitted, default is <code>developer-sponsored</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="PrivyUserPays.tsx"
              showLineNumbers
              code={`await writeContract({
  address: '0xYourContract',
  abi: YOUR_ABI,
  functionName: 'mint',
  args: [1],
  mode: 'user-pays-erc20', // put mode here (per transaction)
  paymaster: {
    token: '0xYourErc20Token',
    receiver: '0xYourTreasuryAddress',
  },
});`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              Set <code className="text-xs bg-white/5 px-1 py-0.5 rounded">apiKey</code> on{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">SmoothSendAvaxProvider</code>.{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">network</code> is optional and defaults to{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">&quot;testnet&quot;</code>.
            </p>
            <p>
              Ensure <code className="text-xs bg-white/5 px-1 py-0.5 rounded">ownerAddress</code> matches the exact
              Privy wallet used to sign.
            </p>
            <p>
              For Privy flow, <code className="text-xs bg-white/5 px-1 py-0.5 rounded">mode</code> is set on each{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">writeContract(...)</code> call, not on{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">useSmoothSendPrivyWrite(...)</code>.
            </p>
            <p>
              If you do not provide <code className="text-xs bg-white/5 px-1 py-0.5 rounded">mode</code>, SmoothSend
              uses <code className="text-xs bg-white/5 px-1 py-0.5 rounded">developer-sponsored</code> by default.
            </p>
            <p>
              Owner/admin-gated contracts may need direct EOA writes if ownership is not set to the smart account.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/avax/quickstart" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Quick Start
          </Link>
          <Link href="/avax/api-reference" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            API Reference →
          </Link>
        </div>
      </div>
    </div>
  )
}

