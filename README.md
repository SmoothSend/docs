# SmoothSend Docs Site

Documentation site for the SmoothSend SDK. Built with Next.js 14 (App Router), Tailwind CSS, and highlight.js. Covers Aptos gasless transaction integration via the Wallet Adapter and Script Composer methods.

Live at: `https://docs.smoothsend.xyz`

---

## Stack


| Layer               | Choice                                |
| ------------------- | ------------------------------------- |
| Framework           | Next.js 14 — App Router               |
| Styling             | Tailwind CSS 3 + custom CSS utilities |
| Syntax highlighting | highlight.js (Dracula+ theme)         |
| Icons               | lucide-react                          |
| UI primitives       | Radix UI via shadcn/ui                |
| Theme               | Dark-only — Deep Space palette        |


---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

---

## Project Structure

```
docs-site/
├── app/
│   ├── page.tsx                    # Landing page — hero, features, gas calculator, quick start
│   ├── layout.tsx                  # Root layout — Navigation + Footer
│   ├── globals.css                 # Tailwind base, hljs Dracula+ tokens, glass utilities, animations
│   ├── aptos/
│   │   ├── installation/page.tsx   # npm install + verification
│   │   ├── quickstart/page.tsx     # Method comparison table, both integration methods with code
│   │   ├── api-reference/page.tsx  # SDK classes, methods, supported tokens table
│   │   └── examples/page.tsx       # Annotated real-world code examples
│   └── billing/page.tsx            # Credit packages, pricing table, gas calculator, FAQ
├── components/
│   ├── navigation.tsx              # Sticky nav — glassmorphism backdrop, active link highlight
│   ├── footer.tsx                  # 4-column footer
│   ├── gas-calculator.tsx          # Interactive gas/credit estimator (client component)
│   ├── latency-test.tsx            # On-demand gateway latency ping (client component)
│   ├── theme-provider.tsx
│   └── ui/
│       ├── code-block.tsx          # Syntax-highlighted code blocks — hljs, line numbers, copy button
│       ├── card.tsx
│       ├── button.tsx
│       └── ...                     # shadcn/ui primitives
└── lib/
    └── utils.ts
```

---

## Key Components

### CodeBlock (`components/ui/code-block.tsx`)

Syntax-highlighted code display using highlight.js. Supports TypeScript, JavaScript, Bash, JSON.

```tsx
<CodeBlock
  language="typescript"
  filename="App.tsx"
  showLineNumbers
  highlightLines={[1, 5, 6]}
  code={`your code here`}
/>
```

Props:

- `language` — `typescript` | `javascript` | `bash` | `shell` | `json`
- `filename` — shown in the macOS-style header bar
- `showLineNumbers` — renders line number gutter
- `highlightLines` — array of 1-indexed line numbers to highlight in purple

### GasCalculator (`components/gas-calculator.tsx`)

Client-side interactive calculator. Two input modes:

- **From Explorer** — paste `gas_used` + `gas_unit_price` from any Aptos Explorer transaction
- **VM Breakdown** — enter `instruction_gas`, `storage_gas`, `payload_bytes` directly

APT price is fetched live from the CoinGecko free API on mount and refreshed every 60 seconds. Manual override supported.

Outputs: per-transaction network fee, SmoothSend credit fee, monthly cost at a given volume, and monthly gas savings for users.

### LatencyTest (`components/latency-test.tsx`)

On-demand gateway latency measurement. Pings `proxy.smoothsend.xyz/health` five times (first ping discarded as cold-start), shows min / avg / p95 from the user's actual location. 30-second client-side cooldown between tests to prevent abuse.

---

## Brand Colors


| Token                     | Hex       | Usage                                           |
| ------------------------- | --------- | ----------------------------------------------- |
| `smoothsend-primary`      | `#7595FF` | Primary blue-purple — CTAs, highlights, accents |
| `smoothsend-primary-dark` | `#5B7ADD` | Button hover states                             |
| `smoothsend-cyan`         | `#06b6d4` | Script Composer accent, secondary highlights    |
| `--background`            | `#0B0C15` | Page background (Deep Space)                    |
| `--card`                  | `#13141F` | Card backgrounds                                |
| `--border`                | `#2D3142` | Borders and dividers                            |


See `tailwind.config.ts` for the full palette and `app/globals.css` for CSS variable definitions.

---

## CSS Utilities

Three glassmorphism classes are available globally (`globals.css`):

```css
.glass        /* subtle — bg-white/3%, blur-xl, border-white/7% */
.glass-card   /* medium  — bg-white/4%, blur-2xl, deep shadow   */
.glass-strong /* strong  — bg-white/6%, blur-3xl, inner glow     */
```

Animation utilities:

```css
.animate-pulse-glow   /* ambient orb breathing effect — 4s ease-in-out */
.animate-float        /* gentle vertical float — 7s ease-in-out         */
.animate-shimmer      /* gradient shimmer sweep                          */
```

---

## Syntax Highlighting Theme

The Dracula+ token color palette is defined in `app/globals.css` under the `/* Syntax Highlighting */` section. Tokens:


| Token            | Color                  | Examples                             |
| ---------------- | ---------------------- | ------------------------------------ |
| keyword          | `#ff79c6` (pink)       | `import`, `const`, `await`, `return` |
| built_in / type  | `#8be9fd` (cyan)       | `string`, `Promise`, `console`       |
| function         | `#50fa7b` (green)      | function names                       |
| string           | `#f1fa8c` (yellow)     | string literals                      |
| number / literal | `#bd93f9` (purple)     | numbers, `true`, `null`              |
| comment          | `#6272a4` (muted blue) | `// comments`                        |
| params           | `#ffb86c` (orange)     | function parameters                  |


---

## Adding a New Chain

To add documentation for a new chain (EVM, Stellar, Solana):

1. Create `app/<chain>/` with the same page structure:
  ```
   app/evm/
   ├── installation/page.tsx
   ├── quickstart/page.tsx
   ├── api-reference/page.tsx
   └── examples/page.tsx
  ```
2. Add nav items to `components/navigation.tsx` — the `navItems` array.
3. Update `components/footer.tsx` — Documentation links section.
4. Follow the existing Aptos pages as templates. Use `<CodeBlock>` for all code, `<GasCalculator>` if the chain has a fee model to expose.

---

## Deployment

Designed for Vercel (zero config for Next.js 14). Push to `main` → auto-deploys.

```bash
# Preview locally before pushing
npm run build && npm start
```

Target domain: `docs.smoothsend.xyz`

---

## MCP Server   
  
Install it using npm install @smoothsend/mcp

