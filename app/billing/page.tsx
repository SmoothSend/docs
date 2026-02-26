import Link from 'next/link'
import { Check, Zap, ArrowRight, Info, Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GasCalculator } from '@/components/gas-calculator'

const CREDIT_PACKAGES = [
  { id: 'starter', amountUSD: 5, credits: 5, label: '$5', popular: false, bonusPercent: 0, txEstimate: '~500' },
  { id: 'basic', amountUSD: 10, credits: 10, label: '$10', popular: false, bonusPercent: 0, txEstimate: '~1,000' },
  { id: 'standard', amountUSD: 25, credits: 27.50, label: '$25', popular: true, bonusPercent: 10, txEstimate: '~2,750' },
  { id: 'pro', amountUSD: 50, credits: 60, label: '$50', popular: false, bonusPercent: 20, txEstimate: '~6,000' },
  { id: 'business', amountUSD: 100, credits: 130, label: '$100', popular: false, bonusPercent: 30, txEstimate: '~13,000' },
]

export default function BillingPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Pay only for what you use. Testnet is always free.
            Mainnet transactions use prepaid credits.
          </p>
        </div>

        {/* How It Works */}
        <Card className="border-smoothsend-primary/20 bg-smoothsend-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-smoothsend-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-green-400">Testnet — Always Free</h3>
                <p className="text-sm text-gray-400">
                  All testnet transactions are completely free. No credits required.
                  Perfect for development and testing.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Wallet Adapter — Credits</h3>
                <p className="text-sm text-gray-400">
                  Mainnet transactions via the wallet adapter deduct credits from your
                  account. From $0.01 per transaction based on gas usage.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Script Composer — Free</h3>
                <p className="text-sm text-gray-400">
                  Script Composer token transfers deduct a small fee directly from the
                  token being sent. No credits needed at all.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Packages */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Credit Packages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREDIT_PACKAGES.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative ${pkg.popular ? 'border-smoothsend-primary border-2' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-smoothsend-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-3xl">{pkg.label}</CardTitle>
                  <CardDescription>
                    ${pkg.credits} credits • {pkg.txEstimate} transactions
                  </CardDescription>
                  {pkg.bonusPercent > 0 && (
                    <div className="text-sm text-smoothsend-primary font-medium">
                      +{pkg.bonusPercent}% bonus credits
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-smoothsend-primary" />
                      <span>${pkg.credits} in credits</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-smoothsend-primary" />
                      <span>No expiration</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-smoothsend-primary" />
                      <span>Testnet always free</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${pkg.popular ? 'bg-smoothsend-primary hover:bg-smoothsend-primary-dark' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <Link href="https://dashboard.smoothsend.xyz/billing" target="_blank">
                      Buy Credits
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gas Calculator */}
        <Card className="border-[#7595FF]/20 bg-[#7595FF]/[0.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#7595FF]" />
              Real-Time Gas Calculator
            </CardTitle>
            <CardDescription>
              Estimate your monthly cost and see how much gas your users save.
              Toggle between billing methods to compare.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GasCalculator />
          </CardContent>
        </Card>

        {/* Pricing Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Examples</CardTitle>
            <CardDescription>
              What you actually pay per transaction type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-gray-400">
                    <th className="pb-3 pr-6 font-medium">Transaction type</th>
                    <th className="pb-3 pr-6 font-medium">Network gas cost</th>
                    <th className="pb-3 font-medium text-smoothsend-primary">You pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="py-3 pr-6 text-gray-300">Simple transfer</td>
                    <td className="py-3 pr-6 font-mono text-gray-400">$0.001</td>
                    <td className="py-3 font-mono font-semibold text-smoothsend-primary">$0.01</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-gray-300">Token transfer</td>
                    <td className="py-3 pr-6 font-mono text-gray-400">$0.005</td>
                    <td className="py-3 font-mono font-semibold text-smoothsend-primary">$0.01</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-gray-300">Smart contract call</td>
                    <td className="py-3 pr-6 font-mono text-gray-400">$0.01</td>
                    <td className="py-3 font-mono font-semibold text-smoothsend-primary">$0.015</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-gray-300">Complex transaction</td>
                    <td className="py-3 pr-6 font-mono text-gray-400">$0.05</td>
                    <td className="py-3 font-mono font-semibold text-smoothsend-primary">$0.075</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/[0.06]">
              <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-400">
                Fees are calculated in real-time based on actual network gas costs.
                Minimum fee is <span className="text-white font-medium">$0.01</span> per
                transaction. Testnet is always free.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-border/50">
            <div className="py-4">
              <h3 className="font-semibold mb-1">Do credits expire?</h3>
              <p className="text-sm text-gray-400">
                No, credits never expire. Use them whenever you need.
              </p>
            </div>
            <div className="py-4">
              <h3 className="font-semibold mb-1">What happens if I run out of credits?</h3>
              <p className="text-sm text-gray-400">
                Mainnet wallet adapter transactions will fail until you top up.
                Testnet always works for free. Script Composer is unaffected since it
                doesn&apos;t use credits.
              </p>
            </div>
            <div className="py-4">
              <h3 className="font-semibold mb-1">Does Script Composer use credits?</h3>
              <p className="text-sm text-gray-400">
                No. Script Composer deducts a small fee directly from the token being sent —
                no credits required. Credits only apply to wallet adapter transactions on mainnet.
              </p>
            </div>
            <div className="py-4">
              <h3 className="font-semibold mb-1">Can I get a refund?</h3>
              <p className="text-sm text-gray-400">
                Unused credits can be refunded within 30 days of purchase. Contact{' '}
                <a href="mailto:contact@smoothsend.xyz" className="text-smoothsend-primary hover:underline">
                  contact@smoothsend.xyz
                </a>.
              </p>
            </div>
            <div className="py-4">
              <h3 className="font-semibold mb-1">How do I check my credit balance?</h3>
              <p className="text-sm text-gray-400">
                Visit your{' '}
                <Link href="https://dashboard.smoothsend.xyz" target="_blank" className="text-smoothsend-primary hover:underline">
                  dashboard
                </Link>
                {' '}to see your current balance and usage history.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-smoothsend-accent/20 bg-gradient-to-r from-smoothsend-primary/10 to-smoothsend-accent/10">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
              <p className="text-gray-400">
                Get your API key and start building gasless dApps today. Testnet is free.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-smoothsend-primary hover:bg-smoothsend-primary-dark">
                  <Link href="https://dashboard.smoothsend.xyz" target="_blank">
                    Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/aptos/quickstart">
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
