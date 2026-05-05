"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
// TSX/JSX snippets frequently include JSX syntax that TypeScript lexer won't parse in hljs.
// Map to JS lexer so docs code blocks still get colored instead of falling back to plain text.
hljs.registerLanguage('tsx', javascript)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)

const LANG_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  tsx: 'TypeScript (React)',
  javascript: 'JavaScript',
  jsx: 'JavaScript (React)',
  bash: 'Terminal',
  shell: 'Terminal',
  json: 'JSON',
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  highlightLines?: number[]
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  highlightLines = [],
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [code])

  const lines = React.useMemo(() => {
    try {
      if (hljs.getLanguage(language)) {
        const highlighted = hljs.highlight(code.trim(), { language }).value
        const split = highlighted.split('\n')
        // Remove trailing empty line from final newline
        if (split[split.length - 1] === '') split.pop()
        return split
      }
    } catch {}
    // Fallback: escape HTML and split
    const escaped = code.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    const split = escaped.split('\n')
    if (split[split.length - 1] === '') split.pop()
    return split
  }, [code, language])

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/50",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0e1b] border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          {/* macOS-style traffic lights */}
          <div className="flex gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff5f57]/75" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#febc2e]/75" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#28c840]/75" />
          </div>
          {filename && (
            <span className="text-xs text-gray-400 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/[0.06]">
            {LANG_LABELS[language] ?? language}
          </span>
          <button
            onClick={copyToClipboard}
            className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs font-medium"
          >
            {hasCopied ? (
              <>
                <Check className="h-3 w-3 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto bg-[#0B0C15]">
        <pre className="py-4 text-[13px] leading-[1.7] font-mono">
          {lines.map((line, i) => {
            const lineNum = i + 1
            const isHighlighted = highlightLines.includes(lineNum)
            return (
              <div
                key={i}
                className={cn(
                  'px-5 flex min-w-0',
                  isHighlighted &&
                    'bg-[#7595FF]/[0.09] border-l-2 border-[#7595FF]',
                  isHighlighted && showLineNumbers && 'pl-[calc(1.25rem-2px)]',
                  isHighlighted && !showLineNumbers && 'pl-[calc(1.25rem-2px)]'
                )}
              >
                {showLineNumbers && (
                  <span className="select-none w-8 shrink-0 text-right mr-5 text-[#3a3d55] text-xs leading-[1.7]">
                    {lineNum}
                  </span>
                )}
                <span
                  className="flex-1 hljs"
                  dangerouslySetInnerHTML={{ __html: line || '\u00A0' }}
                />
              </div>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
