import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'AVAX API Reference',
  description:
    'API reference for SmoothSend AVAX ERC-4337 SDK: SmoothSendAvaxSubmitter, useSmoothSendAvax, paymaster signing helpers, and viem utilities.',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz/avax/api-reference',
  },
}

export default function AvaxApiReferencePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs />
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">AVAX API Reference</h1>
          <p className="text-xl text-muted-foreground">
            ERC-4337 APIs from <code className="text-base bg-white/5 px-1.5 py-0.5 rounded">@smoothsend/sdk/avax</code>.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Imports</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              code={`import {
  SmoothSendAvaxSubmitter,
  createSmoothSendAvaxSubmitter,
  SmoothSendAvaxProvider,
  useSmoothSendAvax,
  encodeAvaxExecuteCalldata,
  encodeAvaxExecuteBatchCalldata,
  hashUserOperationAvax,
  readAvaxSenderNonce,
} from '@smoothsend/sdk/avax';`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#7595FF]/25 bg-[#7595FF]/[0.03]">
          <CardHeader>
            <CardTitle>SmoothSendAvaxSubmitter</CardTitle>
            <CardDescription>
              Core client for bundler JSON-RPC and paymaster signing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Constructor</h3>
              <CodeBlock
                language="typescript"
                code={`new SmoothSendAvaxSubmitter({
  apiKey: string,
  network?: 'testnet' | 'mainnet',
  gatewayUrl?: string,
  timeout?: number,
  chain?: string,      // default: 'avalanche'
  corsOrigin?: string, // required for pk_nogas_* in non-browser scripts
})`}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Key methods</h3>
              <CodeBlock
                language="typescript"
                code={`getChainId(): Promise<string>
getSupportedEntryPoints(): Promise<string[]>
estimateUserOperationGas(userOp, entryPoint): Promise<GasEstimateAvax>
sendUserOperation(userOp, entryPoint): Promise<string>
getUserOperationReceipt(userOpHash): Promise<UserOperationReceiptAvax | null>
paymasterSign(body): Promise<PaymasterSignResponseAvax>
submitSponsoredUserOperation(opts): Promise<{ userOpHash: string; receipt: UserOperationReceiptAvax | null }>`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>submitSponsoredUserOperation options</CardTitle>
            <CardDescription>
              Low-level API — pass a pre-encoded{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">userOp</code> with your own{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">callData</code>. Use{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">useSmoothSendAvax</code> from React for the
              high-level hook that handles encoding automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              code={`{
  userOp: SponsoredUserOpDraftAvax,
  signUserOp: (userOp: UserOperationAvax) => Promise<string>,
  mode?: 'developer-sponsored' | 'user-pays-erc20',
  entryPoint?: string,
  paymaster?: {
    token?: string;
    receiver?: string;
    precheckBalance?: boolean;
    prepaymentRequired?: boolean;
    validUntil?: number;
    validAfter?: number;
    postOpGas?: number;
    allowAnyBundler?: boolean;
  },
  waitForReceipt?: boolean,
  receiptPoll?: { pollMs?: number; timeoutMs?: number },
}`}
            />
          </CardContent>
        </Card>

        <Card className="border-[#06b6d4]/20 bg-[#06b6d4]/[0.02]">
          <CardHeader>
            <CardTitle>React API — useSmoothSendAvax</CardTitle>
            <CardDescription>
              Hook-based frontend integration with wagmi public/wallet clients. Handles callData encoding,
              nonce fetching, fee estimation, and UserOp signing automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              language="typescript"
              code={`<SmoothSendAvaxProvider
  apiKey="pk_nogas_xxx"
  network="testnet"
  smartAccountAddress="0x..."
>
  <App />
</SmoothSendAvaxProvider>`}
            />
            <CodeBlock
              language="typescript"
              code={`const { submitCall, submitSponsoredUserOp } = useSmoothSendAvax({
  publicClient,
  walletClient,
});

// Single call — encodes via execute(dest, value, func)
await submitCall({ to, data, mode: 'developer-sponsored' });

// Batch — encodes via executeBatch(dest[], value[], func[])
await submitSponsoredUserOp({
  calls: [
    { to: tokenAddress, data: approveCalldata, value: 0n },
    { to: tokenAddress, data: transferCalldata, value: 0n },
  ],
  sponsorshipMode: 'user-pays-erc20',
  paymaster: { token: usdcAddress },
});`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Helpers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">encodeAvaxExecuteCalldata(to, value, data)</code>
              : encodes a single smart account{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">execute</code> calldata.
            </p>
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">encodeAvaxExecuteBatchCalldata(dest[], value[], func[])</code>
              : encodes an{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">executeBatch</code> calldata for atomic
              multi-call UserOperations. All three arrays must be the same length.
            </p>
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">fetchAvaxAaPublicDefaults(gatewayUrl?)</code>
              : fetches the latest EntryPoint, SimpleAccountFactory, and Paymaster addresses for Fuji and Mainnet from
              the gateway. Use this to avoid hardcoding contract addresses in your app.
            </p>
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">readAvaxSenderNonce(&#123; publicClient, entryPointAddress, sender &#125;)</code>
              : reads nonce from EntryPoint for a sender address.
            </p>
            <p>
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">hashUserOperationAvax(&#123; chainId, entryPointAddress, userOperation &#125;)</code>
              : builds the EIP-4337 userOp hash for wallet signing.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/avax/quickstart" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← AVAX Quick Start
          </Link>
          <Link href="/avax/examples" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            AVAX Examples →
          </Link>
        </div>
      </div>
    </div>
  )
}
