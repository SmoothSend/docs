import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function SponsorshipRulesPage() {
  return (
    <div className="max-w-4xl px-6 lg:px-10 py-10">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Sponsorship Rules</h1>
          <p className="text-xl text-muted-foreground">
            Control exactly which transactions you sponsor — per project, per wallet, per function
          </p>
        </div>

        {/* Overview */}
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Sponsorship Rules let you define fine-grained policies for gasless transactions.
            Instead of sponsoring every transaction from every user, you choose who can transact,
            which smart contract functions are allowed, and how much gas you&apos;re willing to cover.
          </p>
          <p>
            Rules are configured per-project from the{' '}
            <a href="https://dashboard.smoothsend.xyz" target="_blank" rel="noopener noreferrer" className="text-[#7595FF] hover:underline">
              Dashboard
            </a>{' '}
            — no code changes required. The gateway reads your rules and enforces them
            before any transaction reaches the relayer.
          </p>
        </div>

        {/* Available Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rules</CardTitle>
            <CardDescription>
              All rules are optional. When disabled or left empty, no restriction is applied.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">Rule</th>
                    <th className="pb-3 pr-6 font-medium">Type</th>
                    <th className="pb-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">allowedFunctions</td>
                    <td className="py-3 pr-6 text-gray-400">string[]</td>
                    <td className="py-3 text-gray-300">Whitelist of Move functions (e.g. <code className="text-xs bg-white/5 px-1 py-0.5 rounded">0x1::coin::transfer</code>). If set, only these functions are sponsored.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">allowedSenders</td>
                    <td className="py-3 pr-6 text-gray-400">string[]</td>
                    <td className="py-3 text-gray-300">Only these wallet addresses can submit sponsored transactions.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">blockedSenders</td>
                    <td className="py-3 pr-6 text-gray-400">string[]</td>
                    <td className="py-3 text-gray-300">Block specific wallets from using your sponsorship.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">maxTxsPerWalletPerHour</td>
                    <td className="py-3 pr-6 text-gray-400">number</td>
                    <td className="py-3 text-gray-300">Max sponsored transactions per wallet per hour.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">maxTxsPerWalletPerDay</td>
                    <td className="py-3 pr-6 text-gray-400">number</td>
                    <td className="py-3 text-gray-300">Max sponsored transactions per wallet per day.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">maxGasPerTx</td>
                    <td className="py-3 pr-6 text-gray-400">number</td>
                    <td className="py-3 text-gray-300">Maximum gas units per transaction. Rejects transactions requesting more.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-[#7595FF] text-xs">requireCaptcha</td>
                    <td className="py-3 pr-6 text-gray-400">boolean</td>
                    <td className="py-3 text-gray-300">Require a CAPTCHA token with each request to prevent bot abuse.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Configuration */}
        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>Dashboard Configuration</CardTitle>
            <CardDescription>
              Configure rules for each project directly from your dashboard — no code changes, no redeployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm text-gray-300">
              <p>1. Open the <a href="https://dashboard.smoothsend.xyz" target="_blank" rel="noopener noreferrer" className="text-[#7595FF] hover:underline">Dashboard</a> and select your project.</p>
              <p>2. Expand the <span className="text-white font-medium">Sponsorship Rules</span> panel.</p>
              <p>3. Toggle rules on and configure thresholds.</p>
              <p>4. Click <span className="text-white font-medium">Save Rules</span>. Changes apply immediately to all new transactions.</p>
            </div>
          </CardContent>
        </Card>

        {/* CAPTCHA Integration */}
        <Card>
          <CardHeader>
            <CardTitle>CAPTCHA Integration (SDK)</CardTitle>
            <CardDescription>
              When <code className="text-xs bg-white/5 px-1 py-0.5 rounded">requireCaptcha</code> is enabled,
              your frontend must provide a CAPTCHA token with each request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              filename="App.tsx"
              showLineNumbers
              highlightLines={[5, 6, 7]}
              code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';

const submitter = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
  getCaptchaToken: async () => {
    // Return a token from your CAPTCHA provider (e.g. Turnstile, reCAPTCHA)
    return await turnstile.getToken();
  },
});`}
            />
            <p className="text-sm text-gray-400">
              The SDK calls <code className="text-xs bg-white/5 px-1 py-0.5 rounded">getCaptchaToken()</code> before
              each request and includes the token in the <code className="text-xs bg-white/5 px-1 py-0.5 rounded">X-Captcha-Token</code> header.
              If the rule is enabled and no token is provided, the request is rejected with <code className="text-xs bg-white/5 px-1 py-0.5 rounded">403</code>.
            </p>
          </CardContent>
        </Card>

        {/* Error Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Error Codes</CardTitle>
            <CardDescription>
              When a transaction violates a sponsorship rule, the relayer returns one of these errors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">HTTP</th>
                    <th className="pb-3 pr-6 font-medium">Code</th>
                    <th className="pb-3 font-medium">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">403</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">SPONSORSHIP_SENDER_BLOCKED</td>
                    <td className="py-3 text-gray-400">Wallet is on the blocked list.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">403</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">SPONSORSHIP_SENDER_NOT_ALLOWED</td>
                    <td className="py-3 text-gray-400">Wallet is not on the allowed list.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">403</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">SPONSORSHIP_FUNCTION_NOT_ALLOWED</td>
                    <td className="py-3 text-gray-400">Contract function is not in the allowlist.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">403</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">SPONSORSHIP_GAS_LIMIT_EXCEEDED</td>
                    <td className="py-3 text-gray-400">Transaction gas exceeds maxGasPerTx.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">403</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">CAPTCHA_REQUIRED</td>
                    <td className="py-3 text-gray-400">CAPTCHA token missing or invalid.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-yellow-400">429</td>
                    <td className="py-3 pr-6 font-mono text-xs text-gray-300">WALLET_RATE_LIMITED</td>
                    <td className="py-3 text-gray-400">Wallet exceeded hourly or daily transaction cap.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#7595FF]/10 flex items-center justify-center shrink-0 text-[#7595FF] font-bold text-sm">1</div>
                <div>
                  <p className="text-white font-medium">You configure rules in the Dashboard</p>
                  <p className="text-gray-400 mt-0.5">Rules are stored per-project in the gateway database.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#7595FF]/10 flex items-center justify-center shrink-0 text-[#7595FF] font-bold text-sm">2</div>
                <div>
                  <p className="text-white font-medium">SDK sends a transaction</p>
                  <p className="text-gray-400 mt-0.5">The request hits the Cloudflare Worker gateway with your API key.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#7595FF]/10 flex items-center justify-center shrink-0 text-[#7595FF] font-bold text-sm">3</div>
                <div>
                  <p className="text-white font-medium">Gateway loads your rules</p>
                  <p className="text-gray-400 mt-0.5">Rules are read from D1 and forwarded to the relayer as a header.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#7595FF]/10 flex items-center justify-center shrink-0 text-[#7595FF] font-bold text-sm">4</div>
                <div>
                  <p className="text-white font-medium">Relayer enforces rules</p>
                  <p className="text-gray-400 mt-0.5">Sender lists, rate limits, function allowlists, and gas caps are checked before the transaction is relayed.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/aptos/api-reference" className="text-sm text-gray-400 hover:text-[#7595FF] transition-colors">
            &larr; API Reference
          </Link>
          <Link href="/aptos/examples" className="text-sm text-gray-400 hover:text-[#7595FF] transition-colors">
            Examples &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
