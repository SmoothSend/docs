import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'

export default function ExamplesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-xl text-muted-foreground">
            Real-world code examples for common use cases
          </p>
        </div>

        {/* Example 1: Wallet Adapter Provider Setup */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Adapter — Provider Setup</CardTitle>
            <CardDescription>
              One-time setup: wrap your app with the gasless submitter. After this, every{' '}
              <code className="text-xs bg-white/5 px-1 py-0.5 rounded">signAndSubmitTransaction</code> call
              is automatically routed through SmoothSend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="providers.tsx"
              showLineNumbers
              highlightLines={[1, 5, 6, 7, 8, 14]}
              code={`import { SmoothSendTransactionSubmitter } from '@smoothsend/sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';

const submitter = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet', // or 'testnet'
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      dappConfig={{
        network: Network.MAINNET,
        transactionSubmitter: submitter,
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}`}
            />
          </CardContent>
        </Card>

        {/* Example 2: Any transaction — gasless */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Adapter — Sending Any Transaction</CardTitle>
            <CardDescription>
              After the provider is set up, your existing wallet code works unchanged.
              The user pays no gas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="TransferButton.tsx"
              showLineNumbers
              code={`import { useWallet } from '@aptos-labs/wallet-adapter-react';

function TransferAPT() {
  const { signAndSubmitTransaction, account } = useWallet();

  const handleTransfer = async () => {
    // Works for APT transfers, contract calls, NFT mints — anything
    const result = await signAndSubmitTransaction({
      data: {
        function: '0x1::coin::transfer',
        typeArguments: ['0x1::aptos_coin::AptosCoin'],
        functionArguments: [
          '0xRecipientAddress',
          100_000_000, // 1 APT (8 decimals)
        ],
      },
    });
    console.log('Tx hash:', result.hash);
  };

  return <button onClick={handleTransfer}>Send 1 APT (gasless)</button>;
}`}
            />
          </CardContent>
        </Card>

        {/* Example 3: Script Composer USDC Transfer */}
        <Card>
          <CardHeader>
            <CardTitle>Script Composer — USDC Transfer (Fee-in-Token)</CardTitle>
            <CardDescription>
              Transfer USDC on mainnet — the relayer fee (~$0.01) is deducted from the USDC
              being sent. No APT or credits needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="USDCTransfer.tsx"
              showLineNumbers
              highlightLines={[10, 11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 27, 28, 29]}
              code={`import { ScriptComposerClient } from '@smoothsend/sdk';
import { Deserializer, SimpleTransaction } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const client = new ScriptComposerClient({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY!,
  network: 'mainnet',
});

// USDC mainnet asset address on Aptos
const USDC = '0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b';

function USDCTransfer() {
  const { account, signTransaction } = useWallet();

  const transfer = async (toAddress: string, amountUsdc: number) => {
    // Step 1 — build (fee shown before signing)
    const build = await client.buildTransfer({
      sender: account!.address,
      recipient: toAddress,
      amount: String(amountUsdc * 1_000_000), // USDC has 6 decimals
      assetType: USDC,
      decimals: 6,
      symbol: 'USDC',
    });
    console.log('Fee:', build.feeBreakdown.formatted.fee); // e.g. "0.010000 USDC"

    // Step 2 — sign with the connected wallet
    const txBytes = new Uint8Array(build.transactionBytes);
    const tx = SimpleTransaction.deserialize(new Deserializer(txBytes));
    const signed = await signTransaction({ transactionOrPayload: tx });

    // Step 3 — submit
    const { txHash } = await client.submitSignedTransaction({
      transactionBytes: Array.from(txBytes),
      authenticatorBytes: Array.from(signed.authenticator.bcsToBytes()),
    });
    console.log('Tx hash:', txHash);
  };

  return (
    <button onClick={() => transfer('0xRecipientAddress', 10)}>
      Send 10 USDC (fee-in-token)
    </button>
  );
}`}
            />
          </CardContent>
        </Card>

        {/* Example 4: Fee estimate before transfer */}
        <Card>
          <CardHeader>
            <CardTitle>Script Composer — Show Fee Before Transfer</CardTitle>
            <CardDescription>
              Estimate the relayer fee and display it to users before they sign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="FeePreview.tsx"
              showLineNumbers
              highlightLines={[5, 6, 7, 8, 9, 10]}
              code={`import { ScriptComposerClient } from '@smoothsend/sdk';
import { useState } from 'react';

async function getUSDCFee(client: ScriptComposerClient, amount: string) {
  const estimate = await client.estimateFee({
    amount,
    assetType: '0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b',
    decimals: 6,
    symbol: 'USDC',
  });
  return estimate.formatted.fee; // e.g. "0.010000 USDC"
}

function TransferForm() {
  const [fee, setFee] = useState<string | null>(null);

  const handleAmountChange = async (amount: string) => {
    if (!amount) return;
    const feeDisplay = await getUSDCFee(client, String(Number(amount) * 1_000_000));
    setFee(feeDisplay);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount USDC"
        onChange={(e) => handleAmountChange(e.target.value)}
      />
      {fee && <p>Relayer fee: {fee}</p>}
    </div>
  );
}`}
            />
          </CardContent>
        </Card>

        {/* Example 5: Error Handling */}
        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>
              Handle SmoothSend-specific errors and show meaningful messages to users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="typescript"
              filename="handleTx.ts"
              showLineNumbers
              highlightLines={[3, 7, 8, 9, 10, 11]}
              code={`import { SmoothSendError } from '@smoothsend/sdk';

async function handleTransaction(tx: () => Promise<{ hash: string }>) {
  try {
    const result = await tx();
    toast.success(\`Submitted: \${result.hash}\`);
  } catch (error) {
    if (error instanceof SmoothSendError) {
      const messages: Record<number, string> = {
        401: 'Invalid API key — check your configuration.',
        402: 'Insufficient credits — top up your dashboard.',
        429: 'Rate limit exceeded — please wait a moment.',
      };
      toast.error(messages[error.statusCode] ?? \`Error: \${error.message}\`);
    } else {
      toast.error('Wallet or network error. Please try again.');
    }
  }
}`}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/aptos/sponsorship-rules" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            ← Sponsorship Rules
          </Link>
          <Link href="/billing" className="text-sm text-gray-400 hover:text-smoothsend-primary">
            Pricing →
          </Link>
        </div>
      </div>
    </div>
  )
}
