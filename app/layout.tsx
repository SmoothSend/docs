import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'
import { WebSiteJsonLd, OrganizationJsonLd, SoftwareAppJsonLd } from '@/components/json-ld'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.smoothsend.xyz'),
  title: {
    default: 'SmoothSend Docs — Gasless Transactions for Aptos & Avalanche',
    template: '%s — SmoothSend Docs',
  },
  description:
    'Complete documentation for SmoothSend SDK. Enable gasless transactions on Aptos and Avalanche (ERC-4337) with simple integrations. Free on testnet, credits-based on mainnet.',
  keywords: [
    'aptos', 'avalanche', 'avax', 'erc-4337', 'gasless', 'transactions', 'sdk', 'blockchain', 'web3',
    'gas sponsorship', 'fee payer', 'dapp', 'wallet adapter', 'script composer', 'bundler', 'paymaster',
    'smoothsend', 'aptos sdk', 'avax sdk', 'gasless dapp', 'no gas fees',
  ],
  authors: [{ name: 'SmoothSend', url: 'https://smoothsend.xyz' }],
  creator: 'SmoothSend',
  publisher: 'SmoothSend',
  alternates: {
    canonical: 'https://docs.smoothsend.xyz',
  },
  openGraph: {
    title: 'SmoothSend Docs — Gasless Transactions for Aptos & Avalanche',
    description:
      'Complete documentation for SmoothSend SDK. Enable gasless transactions on Aptos and Avalanche with simple integrations.',
    url: 'https://docs.smoothsend.xyz',
    siteName: 'SmoothSend Docs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmoothSend Docs — Gasless Transactions for Aptos & Avalanche',
    description:
      'Complete documentation for SmoothSend SDK. Enable gasless transactions on Aptos and Avalanche with simple integrations.',
    site: '@smoothsend',
    creator: '@smoothsend',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-light.jpg',
    shortcut: '/logo-light.jpg',
    apple: '/logo-light.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navigation />
        <div className="flex min-h-[calc(100vh-49px)]">
          <Sidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
        <Analytics />
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
      </body>
    </html>
  )
}
