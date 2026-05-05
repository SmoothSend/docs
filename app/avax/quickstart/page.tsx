import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Avalanche Quick Start (ERC-4337)',
  description:
    'Integrate SmoothSend AVAX bundler in minutes. Use useSmoothSendWrite for the simplest React gasless experience.',
  keywords: [
    'smoothsend avalanche',
    'erc-4337 avalanche',
    'avax bundler integration',
    'SmoothSendAvaxClient',
    'useSmoothSendWrite',
    'useSmoothSendAvax',
    'developer-sponsored gas',
    'user-pays-erc20',
    'paymaster sign',
    'atomic batch',
    'executeBatch',
  ],
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/avax/quickstart',
  },
  openGraph: {
    title: 'Avalanche Quick Start (ERC-4337)',
    description:
      'Integrate SmoothSend AVAX bundler using @smoothsend/sdk/avax with backend and React examples.',
    url: 'https://docs.smoothsend.xyz/avax/quickstart',
  },
  twitter: {
    title: 'Avalanche Quick Start (ERC-4337) — SmoothSend Docs',
    description:
      'Integrate SmoothSend AVAX bundler using @smoothsend/sdk/avax with backend and React examples.',
  },
}

export default function AvaxQuickStartPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Avalanche Quick Start (ERC-4337)</h1>
          <p className="text-xl text-muted-foreground">
            Add gasless UserOperation flows on Avalanche through SmoothSend gateway.
          </p>
        </div>

        <Card className="border-[#7595FF]/50 bg-[#7595FF]/5 shadow-[0_0_20px_-5px_rgba(117,149,255,0.3)] overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#7595FF] via-[#06b6d4] to-[#7595FF]" />
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              The 1-Line Overhaul <span className="text-xl">✨</span>
            </CardTitle>
            <CardDescription className="text-base text-gray-300">
              Already using wagmi? Take your entire dApp gasless in two simple steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#7595FF] uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7595FF]/20 text-[10px]">1</span>
                Global Configuration
              </p>
              <CodeBlock
                language="tsx"
                filename="App.tsx"
                code={`import { SmoothSendAvaxProvider } from '@smoothsend/sdk/avax';

<SmoothSendAvaxProvider 
  apiKey="pk_nogas_..." 
  network="testnet" // Optional: defaults to testnet
  mode="developer-sponsored" // Optional: defaults to developer-sponsored
>
  <YourApp />
</SmoothSendAvaxProvider>`}
              />
              <p className="text-xs text-gray-400">
                Add this provider in your app root (for example{' '}
                <code className="text-xs bg-white/5 px-1 py-0.5 rounded">main.tsx</code>,{' '}
                <code className="text-xs bg-white/5 px-1 py-0.5 rounded">WalletProvider.tsx</code>, or your top-level
                layout/providers file).
              </p>
              <p className="text-xs text-gray-500">
                Default mode is <code className="text-xs bg-white/5 px-1 py-0.5 rounded">developer-sponsored</code>
                , so users pay 0 native gas unless you switch to{' '}
                <code className="text-xs bg-white/5 px-1 py-0.5 rounded">user-pays-erc20</code>.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#06b6d4] uppercase tracking-wider flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#06b6d4]/20 text-[10px]">2</span>
                The Hook Overhaul
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Standard Wagmi</p>
                  <CodeBlock
                    language="tsx"
                    code={`import { useWriteContract } from 'wagmi';`}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-widest">SmoothSend Gasless</p>
                  <CodeBlock
                    language="tsx"
                    className="border-[#06b6d4]/30"
                    code={`import { useSmoothSendWrite as useWriteContract } from '@smoothsend/sdk/avax';`}
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <p className="text-sm text-gray-400 italic">
                * Every <code className="text-xs bg-white/5 px-1 py-0.5 rounded text-[#06b6d4]">writeContract()</code> call in your file is now automatically sponsored by SmoothSend.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                In wagmi apps, this is the only component-level change needed:{' '}
                <code className="text-xs bg-white/5 px-1 py-0.5 rounded">
                  import &#123; useSmoothSendWrite as useWriteContract &#125; from &apos;@smoothsend/sdk/avax&apos;
                </code>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modes</CardTitle>
            <CardDescription>
              Both modes use the same bundler + paymaster path; only billing behavior changes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">Mode</th>
                    <th className="pb-3 pr-6 font-medium">Gas payer</th>
                    <th className="pb-3 font-medium">User pays</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3 pr-6 font-medium text-[#7595FF]">developer-sponsored</td>
                    <td className="py-3 pr-6 text-gray-300">SmoothSend paymaster</td>
                    <td className="py-3 text-gray-300">Nothing</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-medium text-[#06b6d4]">user-pays-erc20</td>
                    <td className="py-3 pr-6 text-gray-300">SmoothSend paymaster</td>
                    <td className="py-3 text-gray-300">ERC20 (for launch: USDC)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Install</CardTitle>
            <CardDescription>
              Use the AVAX-specific install guide and subpath imports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              code={`import { createSmoothSendAvaxClient } from '@smoothsend/sdk/avax';`}
            />
            <p className="text-sm text-gray-400">
              Dependency setup lives in{' '}
              <Link href="/avax/installation" className="text-[#7595FF] hover:underline">
                AVAX Installation
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Backend (server / agent) — simplest path</CardTitle>
            <CardDescription>
              High-level client that handles estimation, paymaster sign, and send.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="submit-call.ts"
              showLineNumbers
              code={`import { createSmoothSendAvaxClient } from '@smoothsend/sdk/avax';

const avax = createSmoothSendAvaxClient({
  apiKey: process.env.SMOOTHSEND_API_KEY!, // sk_nogas_* on backend
  network: 'testnet', // fuji
  publicClient, // viem public client
  walletClient, // viem wallet client
});

const result = await avax.submitCall({
  call: {
    to: '0xYourTargetContract',
    data: '0xYourEncodedCalldata',
    value: 0n,
  },
  mode: 'developer-sponsored', // or 'user-pays-erc20'
  // optional: override smart account if not provided in constructor
  // smartAccountAddress: '0xYourSmartAccount',
  // optional: override factory or provide owner for counterfactuals
  // accountFactory: '0xYourFactoryAddress',
  waitForReceipt: false,
});

console.log(result.userOpHash);`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee preflight (user-pays-erc20)</CardTitle>
            <CardDescription>
              Quote before submit to show what token fee will be charged.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="estimate-fee.ts"
              showLineNumbers
              code={`const quote = await avax.estimateUserPaysFee({
  calls: [{
    to: '0xYourTargetContract',
    data: '0xYourEncodedCalldata',
    value: 0n,
  }],
  paymaster: { token: '0xUSDC' },
  // optional: specify which smart account will pay the fee
  // smartAccountAddress: '0xYourSmartAccount',
});

console.log(quote.feePreview); // token + amount + usd + policy fields`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hash semantics</CardTitle>
            <CardDescription>
              UserOperation hash and on-chain transaction hash are different values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">userOpHash</code>: returned immediately by{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">eth_sendUserOperation</code>.
            </p>
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">transactionHash</code>: available after inclusion from{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">eth_getUserOperationReceipt</code>. Use this for explorer links.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#06b6d4]/40 bg-[#06b6d4]/[0.04]">
          <CardHeader>
            <CardTitle>React (wagmi) — The Easy Path ✨</CardTitle>
            <CardDescription>
              Drop-in replacement for wagmi&apos;s useWriteContract. Handles encoding and sponsoring in one line.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CodeBlock
              language="tsx"
              filename="GaslessButton.tsx"
              showLineNumbers
              code={`import { useSmoothSendWrite } from '@smoothsend/sdk/avax';

// Your existing ABI and Contract Address
const YOUR_ABI = [...] as const;
const YOUR_CONTRACT_ADDRESS = '0x...';

function GaslessButton() {
  // 1. Swap wagmi's useWriteContract for this!
  // data here is a UserOperation hash (not an EVM tx hash)
  const { writeContract, data: userOpHash, isPending: isWriting } = useSmoothSendWrite();
  const isConfirming = false; // optional: track via eth_getUserOperationReceipt

  return (
    <button
      disabled={isWriting || isConfirming}
      onClick={() =>
        writeContract({
          address: YOUR_CONTRACT_ADDRESS,
          abi: YOUR_ABI,
          functionName: 'mint', // Your function name
          args: [1],           // Your arguments
          mode: 'developer-sponsored',
        })
      }
    >
      {isWriting ? 'Sponsoring...' : isConfirming ? 'Confirming...' : 'Submit Gasless'}
    </button>
  );
}`}
            />
            
            <div className="space-y-4 border-t border-white/5 pt-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Best Practices: The 3 UI States</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gray-500" />
                  <p><span className="text-white font-medium">Idle:</span> Button is active. User is ready to start.</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#7595FF]" />
                  <p>
                    <span className="text-white font-medium">Writing (Sponsoring):</span> 
                    The SDK is generating the UserOperation and requesting sponsorship. 
                    <span className="text-[#7595FF]"> Disable the button here</span> to prevent duplicate submissions.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#06b6d4]" />
                  <p>
                    <span className="text-white font-medium">Confirming:</span>
                    The UserOperation is sent. Poll{' '}
                    <code className="text-xs bg-white/5 px-1 py-0.5 rounded">eth_getUserOperationReceipt</code>{' '}
                    (or SDK receipt helpers) and keep the button disabled until confirmation.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              <strong>Pro Tip:</strong> If you need to target a different network for a specific action, 
              you can pass <code className="text-xs bg-white/5 px-1 py-0.5 rounded">network</code> directly to the hook 
              or the <code className="text-xs bg-white/5 px-1 py-0.5 rounded">writeContract</code> call.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>React (wagmi) — Single call</CardTitle>
            <CardDescription>
              Provider + hook API for a sponsored contract call from a frontend wallet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              filename="App.tsx"
              showLineNumbers
              code={`import { SmoothSendAvaxProvider, useSmoothSendAvax } from '@smoothsend/sdk/avax';
import { usePublicClient, useWalletClient } from 'wagmi';

function TransferButton({ to, data }: { to: \`0x\${string}\`; data: \`0x\${string}\` }) {
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
          to,
          data,
          mode: 'developer-sponsored',
        })
      }
    >
      Submit gasless call
    </button>
  );
}

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <SmoothSendAvaxProvider
      apiKey={process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!} // pk_nogas_* in browser
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
            <CardTitle>React (wagmi) — Atomic multi-call batch</CardTitle>
            <CardDescription>
              Use{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">submitSponsoredUserOp</code>{' '}
              with a <code className="text-xs bg-white/5 px-1 py-0.5 rounded">calls</code> array to
              execute multiple operations in a single UserOperation — one signature, one on-chain
              transaction. In <code className="text-xs bg-white/5 px-1 py-0.5 rounded">user-pays-erc20</code>{' '}
              mode, batch the ERC20 approval and the transfer together so no separate approval step is required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="tsx"
              filename="BatchTransfer.tsx"
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

const USDC = '0x5425890298aed601595a70AB815c96711a31Bc65'; // Fuji testnet USDC

function USDCTransferButton({ recipient }: { recipient: \`0x\${string}\` }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { submitSponsoredUserOp } = useSmoothSendAvax({
    publicClient,
    walletClient: walletClient ?? undefined,
  });

  const handleTransfer = async () => {
    // 1. Fetch paymaster address dynamically from SmoothSend
    const { paymasterFuji } = await fetchAvaxAaPublicDefaults();
    if (!paymasterFuji) throw new Error('Paymaster not found');

    const amount = parseUnits('1', 6); // 1 USDC (6 decimals)

    // [approve paymaster, transfer to recipient] — one signature, atomic on-chain
    await submitSponsoredUserOp({
      calls: [
        {
          to: USDC,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [paymasterFuji, parseUnits('1000', 6)],
          }),
          value: 0n,
        },
        {
          to: USDC,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [recipient, amount],
          }),
          value: 0n,
        },
      ],
      sponsorshipMode: 'user-pays-erc20',
      paymaster: { token: USDC },
    });
  };

  return <button onClick={handleTransfer}>Send 1 USDC (gasless)</button>;
}`}
            />
            <p className="text-sm text-gray-400">
              The SDK automatically encodes the batch via the smart account&apos;s{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">
                executeBatch(dest[], value[], func[])
              </code>{' '}
              function. By using <code className="text-xs bg-white/5 px-1 py-0.5 rounded">fetchAvaxAaPublicDefaults()</code>, 
              you ensure your app always uses the correct Paymaster address for approvals without hardcoding it.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Continue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <Link href="/avax/api-reference" className="text-[#7595FF] hover:underline">
                AVAX API Reference
              </Link>
            </div>
            <div>
              <Link href="/avax/examples" className="text-[#7595FF] hover:underline">
                AVAX Examples
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/avax/installation" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Installation
          </Link>
          <Link href="/avax/api-reference" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            API Reference →
          </Link>
        </div>
      </div>
    </div>
  )
}
