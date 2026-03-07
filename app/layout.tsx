import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmoothSend Documentation - Gasless Transactions for Aptos',
  description: 'Complete documentation for SmoothSend SDK. Enable gasless transactions on Aptos with just 3 lines of code.',
  keywords: ['aptos', 'gasless', 'transactions', 'sdk', 'blockchain', 'web3'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <div className="flex min-h-[calc(100vh-49px)]">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
