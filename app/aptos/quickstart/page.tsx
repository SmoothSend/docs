import Link from 'next/link'
import { ArrowRight, Zap, CheckCircle2, Coins, SplitSquareHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'

export default function QuickStartPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
          <p className="text-xl text-muted-foreground">
            Get gasless transactions working in your Aptos dApp in minutes
          </p>
        </div>

        {/* ── Which method? ─────────────────────────────────────────────── */}
        <Card className="border-white/[0.08]">
          <CardHeader>
            <CardTitle className="text-lg">Which method should I use?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium w-1/3"></th>
                    <th className="pb-3 pr-6 font-medium text-[#7595FF]">Method 1 — Wallet Adapter</th>
                    <th className="pb-3 font-medium text-[#06b6d4]">Method 2 — Script Composer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-2.5 pr-6 text-gray-400">Transaction types</td>
                    <td className="py-2.5 pr-6 text-gray-200">Any — transfers, contracts, NFTs</td>
                    <td className="py-2.5 text-gray-200">Token transfers only</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 text-gray-400">Testnet</td>
                    <td className="py-2.5 pr-6 text-green-400 font-medium">Always free</td>
                    <td className="py-2.5 text-green-400 font-medium">Always free</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 text-gray-400">Mainnet cost</td>
                    <td className="py-2.5 pr-6 text-gray-200">Credits deducted ($0.01 min)</td>
                    <td className="py-2.5 text-gray-200">Fee from the token (~$0.01)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 text-gray-400">Code to add</td>
                    <td className="py-2.5 pr-6 text-gray-200">3 lines — drop-in replacement</td>
                    <td className="py-2.5 text-gray-200">~30 lines — build, sign, submit</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 text-gray-400">Best for</td>
                    <td className="py-2.5 pr-6 text-gray-200">Existing dApps, any transaction</td>
                    <td className="py-2.5 text-gray-200">Stablecoin transfers, no credits needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Billing callout ───────────────────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#7595FF]/[0.07] border border-[#7595FF]/20">
          <Coins className="w-4 h-4 text-[#7595FF] mt-0.5 shrink-0" />
          <div className="text-sm space-y-1">
            <p className="font-medium text-[#7595FF]">How billing works</p>
            <p className="text-gray-400">
              <span className="text-white">Testnet is always free.</span>{' '}
              Method 1 on mainnet deducts credits from your{' '}
              <Link href="https://dashboard.smoothsend.xyz/billing" target="_blank" className="text-[#7595FF] hover:underline">
                dashboard balance
              </Link>{' '}
              — from $0.01 per transaction. Method 2 has no credits — the fee comes
              from the token being sent.
            </p>
          </div>
        </div>

        {/* ── Method 1: Wallet Adapter ──────────────────────────────────── */}
        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-[#7595FF]" />
              <CardTitle>Method 1 — Wallet Adapter Integration</CardTitle>
            </div>
            <CardDescription>
              Drop-in replacement. Works with any transaction type, any wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              filename="App.tsx"
              highlightLines={[1, 8, 9, 14, 15]}
              showLineNumbers
              code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';

function App() {
  // Step 1 — create the submitter with your API key
  const smoothSend = new SmoothSendTransactionSubmitter({
    apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
    network: 'testnet', // or 'mainnet'
  });

  // Step 2 — pass it to the wallet provider (that's it!)
  return (
    <AptosWalletAdapterProvider
      dappConfig={{ network: Network.TESTNET, transactionSubmitter: smoothSend }}
    >
      <YourApp />
    </AptosWalletAdapterProvider>
  );
}

// Step 3 — use wallet functions as normal. Now gasless!
const { signAndSubmitTransaction } = useWallet();
const result = await signAndSubmitTransaction({ data: payload });`}
            />

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-green-500/[0.07] border border-green-500/20">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-400 mb-1.5">Works for</p>
                <ul className="text-gray-300 space-y-1">
                  <li>• Any transaction type — transfers, contracts, NFT mints, DeFi</li>
                  <li>• Testnet: completely free, no setup required</li>
                  <li>• Mainnet: credits deducted from your dashboard ($0.01 minimum per tx)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Method 1B: useSmoothSend Hook ────────────────────────────── */}
        <Card className="border-[#7595FF]/20 bg-[#7595FF]/[0.02]">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <SplitSquareHorizontal className="w-5 h-5 text-[#7595FF]" />
              <CardTitle>Advanced — <code className="font-mono text-[#7595FF]">useSmoothSend</code> Hook (Per-Function Routing)</CardTitle>
            </div>
            <CardDescription>
              Use this when only <em>some</em> functions should be gasless. Each component
              decides independently — sponsored functions go through SmoothSend, others use
              the user&apos;s own APT.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              filename="providers.tsx + TodoList.tsx"
              showLineNumbers
              highlightLines={[1, 5, 6, 7, 8, 14, 17, 21, 22, 23]}
              code={`// providers.tsx — plain wallet provider, no transactionSubmitter
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider dappConfig={{ network: Network.MAINNET }}>
      {children}
    </AptosWalletAdapterProvider>
  );
}

// TodoList.tsx — per-component hook
import { useSmoothSend } from '@smoothsend/sdk';
import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';

const submitter = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

function TodoList() {
  // signAndSubmitTransaction auto-routes:
  //   sponsored functions  → fee-payer gasless (user pays 0 APT)
  //   non-sponsored        → user pays gas normally
  const { signAndSubmitTransaction } = useSmoothSend(submitter);

  const handleDelete = async (id: number) => {
    // delete_todo is whitelisted in Sponsorship Rules → gasless
    const result = await signAndSubmitTransaction(buildDeleteTodoPayload(id));
    console.log('Tx hash:', result.hash);
  };
}`}
            />

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#7595FF]/[0.07] border border-[#7595FF]/20">
              <CheckCircle2 className="w-4 h-4 text-[#7595FF] mt-0.5 shrink-0" />
              <div className="text-sm space-y-2">
                <p className="font-medium text-[#7595FF]">When to choose <code className="font-mono text-xs">useSmoothSend</code> over <code className="font-mono text-xs">transactionSubmitter</code></p>
                <ul className="text-gray-300 space-y-1">
                  <li>• You want specific contract functions sponsored, not all transactions</li>
                  <li>• You have user-pays actions (e.g. &quot;create&quot; costs gas) alongside free actions (e.g. &quot;delete&quot; is free)</li>
                  <li>• You manage sponsorship via the{' '}
                    <Link href="/aptos/sponsorship-rules" className="text-[#7595FF] hover:underline">Sponsorship Rules</Link>{' '}
                    allowlist in your dashboard
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Method 2: Script Composer ─────────────────────────────────── */}
        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>Method 2 — Script Composer (Fee-in-Token)</CardTitle>
            <CardDescription>
              Mainnet token transfers where the fee is deducted from the token. No credits needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              filename="transfer.ts"
              highlightLines={[14, 15, 16, 17, 18, 19, 23, 24, 25, 29, 30, 31]}
              showLineNumbers
              code={`import { ScriptComposerClient } from '@smoothsend/sdk';
import { Deserializer, SimpleTransaction } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const client = new ScriptComposerClient({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

async function transferUSDC(walletAddress: string) {
  const { signTransaction } = useWallet();

  // Step 1 — build the transaction (fee shown before signing)
  const build = await client.buildTransfer({
    sender: walletAddress,
    recipient: '0xRecipientAddress',
    amount: '1000000',    // 1 USDC (6 decimals)
    assetType: '0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b',
    decimals: 6,
    symbol: 'USDC',
  });
  console.log('Fee:', build.feeBreakdown.formatted.fee); // e.g. "0.01 USDC"

  // Step 2 — deserialize and sign with the connected wallet
  const txBytes = new Uint8Array(build.transactionBytes);
  const transaction = SimpleTransaction.deserialize(new Deserializer(txBytes));
  const signedTx = await signTransaction({ transactionOrPayload: transaction });

  // Step 3 — submit
  const result = await client.submitSignedTransaction({
    transactionBytes: Array.from(txBytes),
    authenticatorBytes: Array.from(signedTx.authenticator.bcsToBytes()),
  });
  console.log('Tx hash:', result.txHash);
}`}
            />

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#06b6d4]/[0.07] border border-[#06b6d4]/20">
              <CheckCircle2 className="w-4 h-4 text-[#06b6d4] mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-[#06b6d4] mb-1.5">Works for</p>
                <ul className="text-gray-300 space-y-1">
                  <li>• Mainnet stablecoin transfers: USDT, USDC, WBTC, USDe, USD1</li>
                  <li>• No credits needed — tiny fee deducted from the token (~$0.01)</li>
                  <li>• Users sign with their wallet; relayer pays the APT gas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Get API Key ───────────────────────────────────────────────── */}
        <Card className="border-white/[0.06] bg-white/[0.02]">
          <CardHeader>
            <CardTitle>Get Your API Key</CardTitle>
            <CardDescription>
              Free to create. Testnet always free. No credit card required to start.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild className="bg-smoothsend-primary hover:bg-smoothsend-primary-dark">
              <Link href="https://dashboard.smoothsend.xyz" target="_blank">
                Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/aptos/api-reference">
                View API Reference
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/aptos/installation" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Installation
          </Link>
          <Link href="/aptos/api-reference" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            API Reference →
          </Link>
        </div>

      </div>
    </div>
  )
}
