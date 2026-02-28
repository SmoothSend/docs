import Link from 'next/link'
import { Bot, Terminal, Zap, BookOpen, Package, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'

const editors = [
  {
    name: 'Cursor',
    file: '~/.cursor/mcp.json',
    description: 'Add to your global or project-level Cursor config',
  },
  {
    name: 'Claude Desktop',
    file: '~/Library/Application Support/Claude/claude_desktop_config.json',
    description: 'Add to your Claude Desktop config (macOS)',
  },
  {
    name: 'Windsurf',
    file: '~/.codeium/windsurf/mcp_config.json',
    description: 'Add to your Windsurf MCP config',
  },
]

const mcpConfig = `{
  "mcpServers": {
    "smoothsend": {
      "command": "npx",
      "args": ["@smoothsend/mcp"]
    }
  }
}`

const tools = [
  {
    name: 'get_docs',
    description: 'Fetch full documentation for any section — overview, installation, quickstart, api-reference, examples, or billing.',
  },
  {
    name: 'estimate_credits',
    description: 'Calculate monthly credit cost from gas_used, gas_unit_price, apt_price_usd, and transaction volume. Returns per-tx and monthly totals.',
  },
  {
    name: 'get_token_address',
    description: 'Get the Aptos Mainnet fungible asset address for USDC, USDT, WBTC, USDe, or USD1 with a ready-to-paste code snippet.',
  },
  {
    name: 'get_code_snippet',
    description: 'Return a complete, copy-pasteable TypeScript snippet for wallet-adapter-setup, script-composer-usdc, fee-preview, error-handling, or testnet-setup.',
  },
]

const examplePrompts = [
  'How do I add SmoothSend to my Next.js app?',
  'Show me how to send USDC without the user needing APT.',
  'My dApp does 5,000 contract calls per month at 200 gas each. How much will SmoothSend cost?',
  'What is the USDC asset address on Aptos Mainnet?',
  'How do I handle the error when SmoothSend credits run out?',
  'Give me a testnet setup that is completely free.',
]

export default function McpPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">AI Integration</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">MCP Server</h1>
          <p className="text-xl text-muted-foreground">
            Give your AI assistant (Cursor, Claude Desktop, Windsurf) full SmoothSend context — so it can generate correct integration code, estimate costs, and answer SDK questions without hallucinating.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link
              href="https://www.npmjs.com/package/@smoothsend/mcp"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Package className="w-4 h-4" />
              @smoothsend/mcp on npm
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* What is MCP */}
        <Card>
          <CardHeader>
            <CardTitle>What is MCP?</CardTitle>
            <CardDescription>
              Model Context Protocol — an open standard from Anthropic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              MCP is a protocol that lets AI assistants inside your editor connect to external servers that expose structured knowledge and callable functions. The server runs as a local subprocess on your machine, communicating with the editor&apos;s AI over stdin/stdout.
            </p>
            <p>
              Once configured, when you ask your AI &quot;how do I integrate SmoothSend?&quot; it calls the right tool on the MCP server, gets back accurate up-to-date content, and generates working code — instead of guessing from training data.
            </p>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Setup — 2 minutes
            </CardTitle>
            <CardDescription>
              No install required — just add the config to your editor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {editors.map((editor) => (
              <div key={editor.name} className="space-y-2">
                <div>
                  <p className="font-medium text-sm">{editor.name}</p>
                  <p className="text-xs text-muted-foreground">{editor.description}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{editor.file}</p>
                </div>
                <CodeBlock language="json" code={mcpConfig} />
              </div>
            ))}
            <p className="text-sm text-muted-foreground pt-2">
              Restart your editor after saving the config. The MCP server starts automatically — no separate process to run.
            </p>
          </CardContent>
        </Card>

        {/* Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Available Tools
            </CardTitle>
            <CardDescription>
              Functions the AI can call to get accurate SmoothSend information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {tools.map((tool) => (
                <div key={tool.name} className="py-3 first:pt-0 last:pb-0">
                  <code className="text-sm font-mono text-primary">{tool.name}</code>
                  <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Resources
            </CardTitle>
            <CardDescription>
              Documentation pages the AI can read directly as reference material
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="text"
              code={`smoothsend://docs/overview        — Overview, quick start, pricing
smoothsend://docs/installation    — Installation guide
smoothsend://docs/quickstart      — Step-by-step quickstart
smoothsend://docs/api-reference   — Full API reference
smoothsend://docs/examples        — Real-world code examples
smoothsend://docs/billing         — Pricing and credit details`}
            />
          </CardContent>
        </Card>

        {/* Example Prompts */}
        <Card>
          <CardHeader>
            <CardTitle>Example Prompts</CardTitle>
            <CardDescription>
              Try these in your AI assistant once the MCP server is configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {examplePrompts.map((prompt) => (
                <li key={prompt} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 select-none">›</span>
                  <span className="text-sm text-muted-foreground italic">&quot;{prompt}&quot;</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* How it works under the hood */}
        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground text-sm leading-relaxed">
            <p>
              When you run <code className="text-primary font-mono text-xs">npx @smoothsend/mcp</code>, it starts a lightweight Node.js process that speaks the MCP JSON-RPC protocol over stdin/stdout. Your editor&apos;s AI connects to it at startup and discovers the available tools and resources.
            </p>
            <p>
              All content is bundled directly in the npm package — no network calls, no API keys for the MCP itself. When the AI needs SmoothSend information, it calls a tool locally (sub-millisecond), gets back structured markdown, and uses it to generate accurate code for your project.
            </p>
            <p>
              The package is fully open source on{' '}
              <Link
                href="https://github.com/smoothsend"
                target="_blank"
                className="text-primary hover:underline"
              >
                GitHub
              </Link>
              . To keep content up to date as the SDK evolves, the package is updated alongside each SDK release.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
