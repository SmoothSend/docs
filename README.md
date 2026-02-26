# SmoothSend Documentation Site

Modern, beautiful documentation site for SmoothSend SDK built with Next.js.

## Features

- 🎨 **Modern Design** - Beautiful UI matching SmoothSend branding
- 📱 **Responsive** - Works perfectly on all devices
- 🌙 **Dark Mode** - Optimized for dark theme
- 🔍 **Easy Navigation** - Clear structure and navigation
- 📚 **Complete Docs** - Installation, quick start, API reference, examples
- 💰 **Pricing Page** - Clear billing information
- 🔗 **Extensible** - Ready for EVM and Stellar chain docs

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
docs-site/
├── app/
│   ├── aptos/          # Aptos-specific documentation
│   │   ├── installation/
│   │   ├── quickstart/
│   │   ├── api-reference/
│   │   └── examples/
│   ├── billing/        # Pricing and billing page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Reusable UI components
│   ├── navigation.tsx  # Site navigation
│   ├── footer.tsx      # Site footer
│   └── theme-provider.tsx
└── lib/
    └── utils.ts        # Utility functions
```

## Adding New Chain Documentation

To add documentation for a new chain (e.g., EVM, Stellar):

1. Create a new folder under `app/` (e.g., `app/evm/` or `app/stellar/`)
2. Add pages following the same structure as `app/aptos/`
3. Update navigation in `components/navigation.tsx`
4. Add chain-specific examples and API references

## Deployment

The site is designed to be deployed to:
- **Vercel** (recommended for Next.js)
- **Cloudflare Pages**
- **Netlify**
- Any static hosting service

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically on push to main

### Custom Domain

Configure `docs.smoothsend.xyz` to point to your deployment.

## Branding

The site uses SmoothSend brand colors:
- Primary: `#10b981` (Emerald)
- Accent: `#14b8a6` (Teal)
- Cyan: `#06b6d4`

See `tailwind.config.ts` for full color palette.

## License

MIT
# docs
