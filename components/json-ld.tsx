/**
 * JSON-LD Structured Data Components
 *
 * Each component renders a <script type="application/ld+json"> tag with
 * schema.org structured data. These help search engines (Google, Bing) and
 * AI crawlers (GPTBot, PerplexityBot) understand the site's content and
 * organization, and may unlock rich results in search.
 *
 * Usage:
 *   <WebSiteJsonLd /> — in root layout (sitelinks searchbox)
 *   <OrganizationJsonLd /> — in root layout (brand entity)
 *   <SoftwareAppJsonLd /> — in root layout or relevant pages
 *   <BreadcrumbJsonLd items={[...]} /> — in individual page components
 *   <FaqJsonLd items={[...]} /> — on billing/pricing page
 */

interface BreadcrumbItem {
  name: string
  href: string
}

interface FaqItem {
  question: string
  answer: string
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SmoothSend Docs',
    url: 'https://docs.smoothsend.xyz',
    description: 'Complete documentation for SmoothSend SDK — gasless transaction infrastructure for Aptos.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://docs.smoothsend.xyz/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmoothSend',
    url: 'https://smoothsend.xyz',
    logo: 'https://docs.smoothsend.xyz/logo-light.jpg',
    description: 'SmoothSend provides gasless transaction infrastructure for the Aptos blockchain, allowing dApp developers to sponsor gas fees for their users.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@smoothsend.xyz',
      contactType: 'customer support',
    },
    sameAs: [
      'https://x.com/smoothsend',
      'https://github.com/smoothsend',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareAppJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '@smoothsend/sdk',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Node.js',
    description: 'The @smoothsend/sdk npm package enables gasless transactions on the Aptos blockchain. Drop-in replacement for the Aptos Wallet Adapter with 3 lines of code.',
    url: 'https://www.npmjs.com/package/@smoothsend/sdk',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free on testnet. Credits-based on mainnet from $0.01 per transaction.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmoothSend',
      url: 'https://smoothsend.xyz',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://docs.smoothsend.xyz${item.href}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
