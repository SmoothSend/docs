"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Wifi, RefreshCw, MapPin } from "lucide-react"

type Status = "idle" | "running" | "done" | "error"

const PING_COUNT     = 5    // total pings (first discarded as cold start)
const COOLDOWN_SECS  = 30   // seconds before re-test is allowed
const GATEWAY_URL    = "https://proxy.smoothsend.xyz/health"

function avg(arr: number[]) {
  return arr.reduce((s, n) => s + n, 0) / arr.length
}

function qualityColor(ms: number) {
  if (ms < 80)  return "text-green-400"
  if (ms < 200) return "text-yellow-400"
  return "text-red-400"
}

function qualityLabel(ms: number) {
  if (ms < 80)  return "Excellent"
  if (ms < 200) return "Good"
  return "Slow"
}

export function LatencyTest() {
  const [status, setStatus]     = React.useState<Status>("idle")
  const [results, setResults]   = React.useState<number[]>([])
  const [progress, setProgress] = React.useState(0)
  const [cooldown, setCooldown] = React.useState(0)
  const cooldownRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  // Clean up interval on unmount
  React.useEffect(() => () => { if (cooldownRef.current) clearInterval(cooldownRef.current) }, [])

  function startCooldown() {
    setCooldown(COOLDOWN_SECS)
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownRef.current!)
          cooldownRef.current = null
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  async function runTest() {
    if (cooldown > 0 || status === "running") return
    setStatus("running")
    setResults([])
    setProgress(0)

    const times: number[] = []

    try {
      for (let i = 0; i < PING_COUNT; i++) {
        const t0 = performance.now()
        await fetch(GATEWAY_URL, { cache: "no-store", mode: "cors" })
        const elapsed = Math.round(performance.now() - t0)

        // Discard first ping (cold start / connection setup)
        if (i > 0) times.push(elapsed)
        setProgress(i + 1)
        // tiny gap between pings
        if (i < PING_COUNT - 1) await new Promise((r) => setTimeout(r, 150))
      }

      setResults(times.sort((a, b) => a - b))
      setStatus("done")
      startCooldown()
    } catch {
      setStatus("error")
      startCooldown()
    }
  }

  const minMs  = results[0]
  const avgMs  = results.length ? Math.round(avg(results)) : 0
  const p95Ms  = results[results.length - 1] // 4 samples, last ≈ p95

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

      {status === "idle" && (
        <button
          onClick={runTest}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-white/[0.09] text-xs font-medium text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 group"
        >
          <Wifi className="w-3.5 h-3.5 group-hover:text-[#7595FF] transition-colors" />
          Test latency from your location
        </button>
      )}

      {status === "running" && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-white/[0.09]">
          <RefreshCw className="w-3.5 h-3.5 text-[#7595FF] animate-spin" />
          <span className="text-xs text-gray-400">
            Pinging… {progress}/{PING_COUNT}
          </span>
          {/* progress dots */}
          <div className="flex gap-1">
            {Array.from({ length: PING_COUNT - 1 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                  i < progress - 1 ? "bg-[#7595FF]" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {status === "done" && results.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg glass border-white/[0.09]">
            <div className="flex items-center gap-1.5">
              <span className={cn("text-xs font-mono font-bold", qualityColor(avgMs))}>
                {avgMs}ms
              </span>
              <span className={cn("text-[10px] font-medium", qualityColor(avgMs))}>
                avg · {qualityLabel(avgMs)}
              </span>
            </div>
            <div className="h-3 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
              <span>min <span className="text-gray-400">{minMs}ms</span></span>
              <span>p95 <span className="text-gray-400">{p95Ms}ms</span></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <MapPin className="w-2.5 h-2.5" />
              <span>from your location</span>
            </div>
            <button
              onClick={runTest}
              disabled={cooldown > 0}
              className={cn(
                "text-[10px] flex items-center gap-1 transition-colors",
                cooldown > 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-[#7595FF] hover:underline"
              )}
            >
              <RefreshCw className="w-2.5 h-2.5" />
              {cooldown > 0 ? `Re-test in ${cooldown}s` : "Re-test"}
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-red-400">Could not reach gateway</span>
          <button
            onClick={runTest}
            disabled={cooldown > 0}
            className={cn(
              "text-[10px] transition-colors",
              cooldown > 0 ? "text-gray-600 cursor-not-allowed" : "text-[#7595FF] hover:underline"
            )}
          >
            {cooldown > 0 ? `Retry in ${cooldown}s` : "Retry"}
          </button>
        </div>
      )}

    </div>
  )
}
