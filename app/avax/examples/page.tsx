import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'AVAX Examples',
  description:
    'Copy-paste AVAX ERC-4337 integration examples for SmoothSend: simple backend client flow, React submitCall flow, and atomic user-pays-ERC20 batch.',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/avax/examples',
  },
}

export default function AvaxExamplesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">AVAX Examples</h1>
          <p className="text-xl text-muted-foreground">
            Copy-paste integration snippets for real AVAX ERC-4337 flows.
          </p>
        </div>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Example 1 — Backend submit (minimal)</CardTitle>
            <CardDescription>
              Server-side flow with <code className="text-xs bg-white/5 px-1 py-0.5 rounded">sk_nogas_*</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="backend-minimal.ts"
              showLineNumbers
              code={`import { createSmoothSendAvaxClient } from '@smoothsend/sdk/avax';

const avax = createSmoothSendAvaxClient({
  apiKey: process.env.SMOOTHSEND_API_KEY!, // sk_nogas_*
  network: 'testnet',
});

const result = await avax.submitCall({
  to: '0x0000000000000000000000000000000000000001',
  data: '0x',
  value: 0n,
  mode: 'developer-sponsored',
  smartAccountAddress: '0xYourSmartAccount',
  waitForReceipt: false,
});

console.log('userOpHash:', result.userOpHash);`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>Example 2 — React sponsored call (wagmi)</CardTitle>
            <CardDescription>
              Frontend wallet flow with <code className="text-xs bg-white/5 px-1 py-0.5 rounded">pk_nogas_*</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="SponsoredTransferButton.tsx"
              showLineNumbers
              code={`import { SmoothSendAvaxProvider, useSmoothSendAvax } from '@smoothsend/sdk/avax';
import { usePublicClient, useWalletClient } from 'wagmi';

function SponsoredTransferButton(props: { to: \`0x\${string}\`; data: \`0x\${string}\` }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { submitCall } = useSmoothSendAvax({
    publicClient,
    walletClient: walletClient ?? undefined,
  });

  return (
    <button
      onClick={() =>
        submitCall({
          to: props.to,
          data: props.data,
          mode: 'developer-sponsored',
        })
      }
    >
      Submit sponsored call
    </button>
  );
}

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <SmoothSendAvaxProvider
      apiKey={process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!}
      network="testnet"
      smartAccountAddress={'0xYourSmartAccount' as \`0x\${string}\`}
    >
      {children}
    </SmoothSendAvaxProvider>
  );
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example 3 — Atomic approve + transfer (user pays in USDC)</CardTitle>
            <CardDescription>
              The user pays gas in USDC. An ERC20 approval and the actual transfer are bundled into a single
              UserOperation — <strong>one signature, zero AVAX required</strong>. This is the recommended pattern for
              the <code className="text-xs bg-white/5 px-1 py-0.5 rounded">user-pays-erc20</code> mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="tsx"
              filename="AtomicUSDCTransfer.tsx"
              showLineNumbers
              code={`import { useSmoothSendAvax, fetchAvaxAaPublicDefaults } from '@smoothsend/sdk/avax';
import { encodeFunctionData, parseUnits } from 'viem';
import { usePublicClient, useWalletClient } from 'wagmi';

const ERC20_ABI = [
  {
    name: 'approve', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'transfer', type: 'function', stateMutability: 'nonpayable',
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
  },
] as const;

// Fuji testnet address for USDC — swap for mainnet when ready
const USDC = '0x5425890298aed601595a70AB815c96711a31Bc65';

export function AtomicUSDCTransfer({ recipient }: { recipient: \`0x\${string}\` }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { submitSponsoredUserOp } = useSmoothSendAvax({
    publicClient,
    walletClient: walletClient ?? undefined,
  });

  const handleSend = async () => {
    // 1. Fetch the correct paymaster address from SmoothSend dynamically
    const { paymasterFuji } = await fetchAvaxAaPublicDefaults();
    if (!paymasterFuji) throw new Error('Paymaster not found');

    const amount = parseUnits('1', 6); // 1 USDC

    // Step 1 in batch: approve the paymaster to collect USDC for gas
    const approveData = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [paymasterFuji, parseUnits('1000', 6)],
    });

    // Step 2 in batch: transfer USDC to the recipient
    const transferData = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [recipient, amount],
    });

    // Both calls go in one UserOperation — executeBatch(dest[], value[], func[])
    const result = await submitSponsoredUserOp({
      calls: [
        { to: USDC, data: approveData, value: 0n },
        { to: USDC, data: transferData, value: 0n },
      ],
      sponsorshipMode: 'user-pays-erc20',
      paymaster: { token: USDC },
    });

    console.log('UserOp hash:', result.userOpHash);
  };

  return <button onClick={handleSend}>Send 1 USDC (gasless)</button>;
}`}
            />
            <p className="text-sm text-gray-400">
              The SDK calls{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">encodeAvaxExecuteBatchCalldata</code>{' '}
              internally, producing a single{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">executeBatch</code> calldata. By using{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">fetchAvaxAaPublicDefaults()</code>, you ensure
              the correct Paymaster address is always used for the approval step.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/avax/api-reference" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← AVAX API Reference
          </Link>
          <Link href="/billing" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            Pricing →
          </Link>
        </div>
      </div>
    </div>
  )
}
