import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'

const SUPPORTED_TOKENS = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: '0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    address: '0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    address: '0x68c2185f5e2023f2e4401ba56b66c8ae2cfcf8a27852e70eb78b03f59a652a3d',
  },
  {
    symbol: 'USDe',
    name: 'USDe (Ethena)',
    decimals: 6,
    address: '0xf37a4a75f89b79985c1fcb42d0a87f4bde28cc2b46c4dd01d9a8428e7726e2e9',
  },
  {
    symbol: 'USD1',
    name: 'USD1 (World Liberty)',
    decimals: 6,
    address: '0x05fa02d0fa44a90ad59fb90adb08e24c4efbc98eb9e9f2d0d9c0ad18d7fc9d2',
  },
]

export default function APIReferencePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-xl text-muted-foreground">
            Complete reference for the SmoothSend SDK classes and methods
          </p>
        </div>

        {/* SmoothSendTransactionSubmitter */}
        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>SmoothSendTransactionSubmitter</CardTitle>
            <CardDescription>
              Drop-in transaction submitter for the Aptos Wallet Adapter. Handles any transaction
              type — transfers, contract calls, NFT mints, DeFi. Credits deducted on mainnet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Constructor</h3>
              <CodeBlock
                language="typescript"
                code={`new SmoothSendTransactionSubmitter({
  apiKey: string,              // Required — your pk_nogas_* or sk_nogas_* key
  network?: string,            // 'testnet' | 'mainnet'  (default: 'testnet')
  gatewayUrl?: string,         // Override gateway URL   (default: https://proxy.smoothsend.xyz)
  timeout?: number,            // Request timeout ms     (default: 30000)
  debug?: boolean,             // Log requests/responses (default: false)
  getCaptchaToken?: () => Promise<string | null>,
                               // CAPTCHA callback — see Sponsorship Rules
})`}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Methods</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-[#7595FF]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#7595FF]">submitTransaction(args)</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Submits a signed transaction through the SmoothSend relayer. Implements the
                    standard <code className="text-xs bg-white/5 px-1 py-0.5 rounded">TransactionSubmitter</code> interface
                    from <code className="text-xs bg-white/5 px-1 py-0.5 rounded">@aptos-labs/ts-sdk</code> — no code
                    changes needed in your existing wallet calls.
                  </p>
                </div>
                <div className="border-l-2 border-[#7595FF]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#7595FF]">getSponsoredFunctions(): Promise&lt;string[]&gt;</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Fetches the list of sponsored function identifiers from your project&apos;s
                    Sponsorship Rules. Results are cached in memory — safe to call on every render.
                    Used internally by <code className="text-xs bg-white/5 px-1 py-0.5 rounded">useSmoothSend</code>.
                  </p>
                </div>
                <div className="border-l-2 border-[#7595FF]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#7595FF]">isSponsored(functionName: string): Promise&lt;boolean&gt;</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Returns <code className="text-xs bg-white/5 px-1 py-0.5 rounded">true</code> if the given function identifier (e.g.{' '}
                    <code className="text-xs bg-white/5 px-1 py-0.5 rounded">0x1::module::function</code>) is in the project&apos;s
                    sponsored allowlist. Calls <code className="text-xs bg-white/5 px-1 py-0.5 rounded">getSponsoredFunctions()</code> internally.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Usage</h3>
              <CodeBlock
                language="typescript"
                filename="App.tsx"
                showLineNumbers
                code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';

const submitter = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

// Pass to provider — all wallet transactions are now gasless
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{ network: Network.MAINNET, transactionSubmitter: submitter }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* useSmoothSend hook */}
        <Card className="border-[#7595FF]/20 bg-[#7595FF]/[0.02]">
          <CardHeader>
            <CardTitle>useSmoothSend</CardTitle>
            <CardDescription>
              React hook for automatic per-function gasless routing. Replaces{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">useWallet().signAndSubmitTransaction</code>{' '}
              and routes each call based on your Sponsorship Rules allowlist:
              sponsored → fee-payer gasless, not sponsored → user pays gas normally.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Signature</h3>
              <CodeBlock
                language="typescript"
                code={`import { useSmoothSend } from '@smoothsend/sdk';

const { signAndSubmitTransaction } = useSmoothSend(submitter);`}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Parameters</h3>
              <div className="border-l-2 border-[#7595FF]/50 pl-4 py-1">
                <code className="text-sm font-mono text-[#7595FF]">submitter: SmoothSendTransactionSubmitter</code>
                <p className="text-sm text-gray-400 mt-1">
                  A <code className="text-xs bg-white/5 px-1 py-0.5 rounded">SmoothSendTransactionSubmitter</code> instance.
                  Create it once at module scope (not inside the component) to avoid recreating on every render.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Returns</h3>
              <div className="border-l-2 border-[#7595FF]/50 pl-4 py-1">
                <code className="text-sm font-mono text-[#7595FF]">signAndSubmitTransaction(input)</code>
                <p className="text-sm text-gray-400 mt-1">
                  Same call signature as the wallet adapter&apos;s{' '}
                  <code className="text-xs bg-white/5 px-1 py-0.5 rounded">signAndSubmitTransaction</code>.
                  Automatically routes: sponsored functions use fee-payer gasless path; others fall back
                  to the user paying gas via their wallet.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Usage</h3>
              <CodeBlock
                language="typescript"
                filename="TodoList.tsx"
                showLineNumbers
                code={`import { useSmoothSend, SmoothSendTransactionSubmitter } from '@smoothsend/sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// Create once at module scope
const submitter = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

function TodoList() {
  const { account } = useWallet();

  // Drop-in for useWallet().signAndSubmitTransaction
  const { signAndSubmitTransaction } = useSmoothSend(submitter);

  const handleDelete = async (id: number) => {
    // 'delete_todo' in sponsorship rules → gasless
    // 'create_todo' not in rules → user pays gas
    const result = await signAndSubmitTransaction({
      data: {
        function: \`\${MODULE_ADDRESS}::todolist::delete_todo\`,
        functionArguments: [id],
      },
    });
    console.log('Tx hash:', result.hash);
  };
}`}
              />
            </div>

            <div className="p-3.5 rounded-lg bg-amber-500/[0.07] border border-amber-500/20 text-sm">
              <p className="font-medium text-amber-400 mb-1">Note</p>
              <p className="text-gray-300">
                The wallet must support <code className="text-xs bg-white/5 px-1 py-0.5 rounded">signTransaction</code> (sign-only) for the
                gasless path — Petra and Nightly both support this. If the wallet does not
                support it, the hook automatically falls back to user-pays-gas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ScriptComposerClient */}
        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>ScriptComposerClient</CardTitle>
            <CardDescription>
              Builds fee-in-token transfers for mainnet stablecoins. No credits required — the
              relayer fee is deducted directly from the token being sent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Constructor</h3>
              <CodeBlock
                language="typescript"
                code={`new ScriptComposerClient({
  apiKey: string,
  network?: 'testnet' | 'mainnet', // default: 'testnet'
  gatewayUrl?: string,
  timeout?: number,
  debug?: boolean,
})`}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Methods</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-[#06b6d4]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#06b6d4]">buildTransfer(params)</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Builds a Script Composer transfer. Returns <code className="text-xs bg-white/5 px-1 py-0.5 rounded">transactionBytes</code> and
                    a <code className="text-xs bg-white/5 px-1 py-0.5 rounded">feeBreakdown</code> — show the fee to users before they sign.
                  </p>
                </div>
                <div className="border-l-2 border-[#06b6d4]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#06b6d4]">submitSignedTransaction(params)</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Submits the signed transaction. Returns <code className="text-xs bg-white/5 px-1 py-0.5 rounded">{'{ txHash: string }'}</code>.
                  </p>
                </div>
                <div className="border-l-2 border-[#06b6d4]/50 pl-4 py-1">
                  <code className="text-sm font-mono text-[#06b6d4]">estimateFee(params)</code>
                  <p className="text-sm text-gray-400 mt-1">
                    Quick fee estimate without building the full transaction. Useful for showing
                    fees in the UI before the user initiates a transfer.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">buildTransfer params</h3>
              <CodeBlock
                language="typescript"
                code={`{
  sender: string,       // Wallet address of the sender
  recipient: string,    // Destination address
  amount: string,       // Amount in smallest units (e.g. '1000000' = 1 USDC)
  assetType: string,    // Token contract address (see Supported Tokens below)
  decimals: number,     // Token decimals (e.g. 6 for USDC)
  symbol: string,       // Token symbol (e.g. 'USDC')
}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Supported Tokens */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Tokens — Script Composer</CardTitle>
            <CardDescription>
              Mainnet stablecoin asset addresses for use with ScriptComposerClient.
              Testnet supports the same symbols on the Aptos testnet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-4 font-medium">Symbol</th>
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Decimals</th>
                    <th className="pb-3 font-medium">Mainnet assetType</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {SUPPORTED_TOKENS.map((token) => (
                    <tr key={token.symbol}>
                      <td className="py-3 pr-4 font-semibold text-[#06b6d4]">{token.symbol}</td>
                      <td className="py-3 pr-4 text-gray-300">{token.name}</td>
                      <td className="py-3 pr-4 text-gray-400 font-mono">{token.decimals}</td>
                      <td className="py-3 font-mono text-xs text-gray-400 break-all">{token.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Error Handling */}
        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>
              Both classes throw <code className="text-xs bg-white/5 px-1 py-0.5 rounded">SmoothSendError</code> on
              failure. Always wrap in try/catch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="transfer.ts"
              showLineNumbers
              code={`import { SmoothSendError } from '@smoothsend/sdk';

try {
  const result = await signAndSubmitTransaction(transaction);
  console.log('Success:', result.hash);
} catch (error) {
  if (error instanceof SmoothSendError) {
    switch (error.statusCode) {
      case 401: console.error('Invalid API key'); break;
      case 402: console.error('Insufficient credits — top up your dashboard'); break;
      case 429: console.error('Rate limit exceeded — slow down requests'); break;
      default:  console.error('SmoothSend error:', error.message);
    }
  } else {
    console.error('Wallet or network error:', error);
  }
}`}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/aptos/quickstart" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Quick Start
          </Link>
          <Link href="/aptos/sponsorship-rules" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            Sponsorship Rules →
          </Link>
        </div>
      </div>
    </div>
  )
}
