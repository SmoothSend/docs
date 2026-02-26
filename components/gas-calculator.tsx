"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, TrendingDown, Info, RefreshCw, ExternalLink, BookOpen, Zap, Coins, FileCode2, GitMerge } from "lucide-react"

// ─── Aptos gas model constants ────────────────────────────────────────────────
const PAYLOAD_BASE_GAS = 1_500_000   // base internal gas for any payload
const PAYLOAD_BYTE_GAS = 2_000       // extra internal gas per byte above cutoff
const PAYLOAD_LARGE_CUT = 600        // byte cutoff before extra kicks in
const SCALING_FACTOR = 1_000_000     // internal → external gas divisor
const OCTAS_PER_APT = 100_000_000    // 1 APT = 10^8 octas

// ─── Transaction presets (real-world approximate values) ─────────────────────
const PRESETS = [
  { id: "transfer", label: "APT Transfer",  Icon: Zap,       gasUsed: 7,     instructionGas: 3_500_000,   storageGas: 2_000_000,   payloadBytes: 100 },
  { id: "token",    label: "Token Transfer", Icon: Coins,     gasUsed: 24,    instructionGas: 12_000_000,  storageGas: 10_500_000,  payloadBytes: 200 },
  { id: "contract", label: "Contract Call",  Icon: FileCode2, gasUsed: 200,   instructionGas: 80_000_000,  storageGas: 60_000_000,  payloadBytes: 400 },
  { id: "defi",     label: "DeFi / Complex", Icon: GitMerge,  gasUsed: 1_000, instructionGas: 400_000_000, storageGas: 300_000_000, payloadBytes: 800 },
]

const VOLUME_STEPS = [100, 500, 1_000, 5_000, 10_000, 50_000, 100_000]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function aptFmt(apt: number) {
  if (apt === 0) return "0 APT"
  if (apt < 0.000001) return `${(apt * 1e8).toFixed(0)} octas`
  return `${apt.toFixed(8).replace(/\.?0+$/, "")} APT`
}
function usdFmt(n: number, decimals = 4) {
  return `$${n.toFixed(decimals)}`
}

// ─── Number input field ───────────────────────────────────────────────────────
function NumField({
  label, hint, value, onChange, placeholder, suffix,
}: {
  label: string; hint?: string; value: number
  onChange: (n: number) => void; placeholder?: string; suffix?: string
}) {
  const [raw, setRaw] = React.useState(String(value))
  React.useEffect(() => { setRaw(String(value)) }, [value])

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={raw}
          placeholder={placeholder}
          onChange={(e) => {
            const s = e.target.value.replace(/[^0-9]/g, "")
            setRaw(s)
            const n = parseInt(s || "0", 10)
            if (!isNaN(n)) onChange(n)
          }}
          onBlur={() => setRaw(String(value))}
          className={cn(
            "w-full rounded-lg px-3 py-2.5 text-sm font-mono bg-white/[0.04] border border-white/[0.08]",
            "text-white placeholder:text-gray-600 focus:outline-none focus:border-[#7595FF]/50 focus:ring-1 focus:ring-[#7595FF]/30 transition-colors duration-150",
            suffix && "pr-14"
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-gray-600 leading-tight">{hint}</p>}
    </div>
  )
}

// ─── Result tile ──────────────────────────────────────────────────────────────
function ResultTile({ label, main, sub, accent, green }: {
  label: string; main: string; sub?: string; accent?: boolean; green?: boolean
}) {
  return (
    <div className={cn(
      "rounded-xl p-4 space-y-1 border",
      accent ? "bg-[#7595FF]/[0.08] border-[#7595FF]/25"
             : green ? "bg-green-500/[0.06] border-green-500/20" : "glass-card"
    )}>
      <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">{label}</p>
      <p className={cn(
        "text-xl font-bold tabular-nums leading-tight",
        accent ? "text-[#7595FF]" : green ? "text-green-400" : "text-white"
      )}>{main}</p>
      {sub && <p className="text-[11px] text-gray-500 leading-tight">{sub}</p>}
    </div>
  )
}

// ─── Step badge ───────────────────────────────────────────────────────────────
function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-6 h-6 rounded-full bg-[#7595FF]/15 border border-[#7595FF]/30 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-[#7595FF]">{n}</span>
      </div>
      <div className="text-sm text-gray-400 leading-relaxed">{children}</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GasCalculator({ compact = false }: { compact?: boolean }) {
  const [mode, setMode]         = React.useState<"explorer" | "breakdown">("explorer")
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>("transfer")
  const [showFormula, setShowFormula]       = React.useState(false)
  const [showGuide, setShowGuide]           = React.useState(false)

  // APT price state
  const [aptPriceUSD, setAptPriceUSD]     = React.useState(10)
  const [aptPriceStatus, setAptPriceStatus] = React.useState<"loading" | "live" | "manual" | "error">("loading")
  const [aptUpdatedAt, setAptUpdatedAt]   = React.useState<string | null>(null)
  const [aptManualOverride, setAptManualOverride] = React.useState(false)

  // Explorer mode inputs
  const [gasUsed, setGasUsed]           = React.useState(7)
  const [gasUnitPrice, setGasUnitPrice] = React.useState(100)

  // Breakdown mode inputs
  const [instructionGas, setInstructionGas] = React.useState(3_500_000)
  const [storageGas, setStorageGas]         = React.useState(2_000_000)
  const [payloadBytes, setPayloadBytes]     = React.useState(100)
  const [breakdownPrice, setBreakdownPrice] = React.useState(100)

  // Volume
  const [volumeIdx, setVolumeIdx] = React.useState(2)

  // ── Live APT price (CoinGecko free API) ──────────────────────────────────────
  const fetchAptPrice = React.useCallback(async () => {
    if (aptManualOverride) return
    setAptPriceStatus("loading")
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd",
        { cache: "no-store" }
      )
      if (!res.ok) throw new Error("API error")
      const data = await res.json() as { aptos?: { usd?: number } }
      const price = data?.aptos?.usd
      if (typeof price === "number" && price > 0) {
        setAptPriceUSD(Math.round(price * 100) / 100)
        setAptPriceStatus("live")
        setAptUpdatedAt(new Date().toLocaleTimeString())
      } else {
        throw new Error("Invalid data")
      }
    } catch {
      setAptPriceStatus("error")
    }
  }, [aptManualOverride])

  React.useEffect(() => {
    fetchAptPrice()
    // Refresh price every 60 seconds
    const interval = setInterval(fetchAptPrice, 60_000)
    return () => clearInterval(interval)
  }, [fetchAptPrice])

  // ── Calculations ─────────────────────────────────────────────────────────────
  let externalGasUnits: number
  let feeOctas: number

  if (mode === "explorer") {
    externalGasUnits = gasUsed
    feeOctas = gasUsed * gasUnitPrice
  } else {
    const payloadExtra  = Math.max(0, (payloadBytes - PAYLOAD_LARGE_CUT) * PAYLOAD_BYTE_GAS)
    const totalInternal = instructionGas + storageGas + PAYLOAD_BASE_GAS + payloadExtra
    externalGasUnits    = totalInternal / SCALING_FACTOR
    feeOctas            = Math.ceil(externalGasUnits) * breakdownPrice
  }

  const feeAPT        = feeOctas / OCTAS_PER_APT
  const feeUSD        = feeAPT * aptPriceUSD
  const smoothSendFee = Math.max(feeUSD * 1.5, 0.01) // max(1.5×, $0.01 min)
  const volume        = VOLUME_STEPS[volumeIdx]
  const monthlyCredits     = smoothSendFee * volume
  const monthlyUserSavings = feeUSD * volume
  const pct               = (volumeIdx / (VOLUME_STEPS.length - 1)) * 100

  // ── Preset helpers ────────────────────────────────────────────────────────────
  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id)
    if (!p) return
    setSelectedPreset(id)
    if (mode === "explorer") setGasUsed(p.gasUsed)
    else { setInstructionGas(p.instructionGas); setStorageGas(p.storageGas); setPayloadBytes(p.payloadBytes) }
  }

  function switchMode(m: "explorer" | "breakdown") {
    setMode(m)
    if (selectedPreset) {
      const p = PRESETS.find((x) => x.id === selectedPreset)
      if (p) {
        if (m === "explorer") setGasUsed(p.gasUsed)
        else { setInstructionGas(p.instructionGas); setStorageGas(p.storageGas); setPayloadBytes(p.payloadBytes) }
      }
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className={cn("space-y-6", compact && "space-y-4")}>

      {/* ── How to use guide ─────────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-sm hover:bg-white/[0.03] transition-colors group"
        >
          <span className="flex items-center gap-2 font-semibold text-white">
            <BookOpen className="w-4 h-4 text-[#7595FF]" />
            How to use this calculator
          </span>
          <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", showGuide && "rotate-180")} />
        </button>

        {showGuide && (
          <div className="border-t border-white/[0.06] px-5 py-5 space-y-6">

            {/* From Explorer */}
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#7595FF]/15 text-[#7595FF] border border-[#7595FF]/25 font-mono">From Explorer</span>
                Quickest — paste values from any test transaction
              </p>
              <div className="space-y-3">
                <Step n={1}>
                  Run any transaction in your dApp on <span className="text-white font-medium">Aptos Testnet</span> (testnet is always free, no real funds needed).
                </Step>
                <Step n={2}>
                  Open{" "}
                  <a
                    href="https://explorer.aptoslabs.com/?network=testnet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7595FF] hover:underline inline-flex items-center gap-0.5"
                  >
                    Aptos Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                  , search for your wallet address, and click your transaction.
                </Step>
                <Step n={3}>
                  Find two numbers in the transaction details:
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Gas Used</p>
                      <p className="font-mono text-white text-sm">e.g. <span className="text-[#f1fa8c]">24</span></p>
                      <p className="text-[11px] text-gray-600 mt-1">Labeled &quot;gas_used&quot; in the raw JSON or &quot;Gas&quot; in the UI</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Gas Unit Price</p>
                      <p className="font-mono text-white text-sm">e.g. <span className="text-[#f1fa8c]">100</span></p>
                      <p className="text-[11px] text-gray-600 mt-1">Labeled &quot;gas_unit_price&quot; — usually 100 octas</p>
                    </div>
                  </div>
                </Step>
                <Step n={4}>
                  Paste both numbers into the calculator, then drag the <span className="text-white font-medium">Monthly volume</span> slider to match your expected traffic.
                </Step>
                <Step n={5}>
                  The <span className="text-[#7595FF] font-medium">Credit cost</span> tile shows exactly what you&apos;ll be charged on mainnet per month.
                </Step>
              </div>
            </div>

            {/* VM Breakdown */}
            <div className="border-t border-white/[0.06] pt-5">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] text-gray-400 border border-white/[0.08] font-mono">VM Breakdown</span>
                Advanced — model before deploying
              </p>
              <div className="space-y-3">
                <Step n={1}>
                  Switch to <span className="text-white font-medium">VM Breakdown</span> mode using the toggle at the top.
                </Step>
                <Step n={2}>
                  Use the Aptos CLI or Move debugger to simulate your transaction and get the internal gas breakdown: <span className="font-mono text-[#8be9fd]">instruction gas</span>, <span className="font-mono text-[#8be9fd]">storage gas</span>, and the <span className="font-mono text-[#8be9fd]">payload size in bytes</span>.
                </Step>
                <Step n={3}>
                  Enter those values. Payloads over <span className="text-white font-medium">600 bytes</span> incur extra gas (2,000 internal units per byte above the cutoff).
                </Step>
                <Step n={4}>
                  Or use a <span className="text-white font-medium">Quick preset</span> as a starting point and tweak from there.
                </Step>
              </div>
            </div>

            {/* Tips */}
            <div className="border-t border-white/[0.06] pt-4 rounded-lg bg-white/[0.02] p-3 text-xs text-gray-500 space-y-1">
              <p className="text-gray-400 font-medium mb-2">Tips</p>
              <p>• Run 3–5 test transactions and average the Gas Used for a better estimate — gas varies slightly per call.</p>
              <p>• Testnet gas values are identical to mainnet gas values, so testnet testing gives accurate credit estimates.</p>
              <p>• The minimum SmoothSend fee is always <span className="text-white">$0.01</span> per transaction on mainnet, regardless of how low the gas is.</p>
              <p>• APT price is fetched live from CoinGecko. You can override it manually if needed.</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Mode toggle + APT price ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.07]">
          {(["explorer", "breakdown"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap",
                mode === m
                  ? "bg-[#7595FF] text-white shadow-lg shadow-[#7595FF]/30"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {m === "explorer" ? "From Explorer" : "VM Breakdown"}
            </button>
          ))}
        </div>

        {/* APT Price — live */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1.5">
              {aptPriceStatus === "loading" && (
                <RefreshCw className="w-3 h-3 text-gray-500 animate-spin" />
              )}
              {aptPriceStatus === "live" && (
                <span className="flex items-center gap-1 text-[10px] font-medium text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              )}
              {aptPriceStatus === "error" && (
                <span className="text-[10px] text-yellow-500">manual</span>
              )}
              {aptPriceStatus === "manual" && (
                <span className="text-[10px] text-gray-500">manual</span>
              )}
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">APT price</span>
            </div>
            {aptUpdatedAt && aptPriceStatus === "live" && (
              <span className="text-[10px] text-gray-600">updated {aptUpdatedAt}</span>
            )}
          </div>

          <div className="relative w-28">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={aptPriceUSD}
              onChange={(e) => {
                const n = parseFloat(e.target.value)
                if (!isNaN(n) && n > 0) {
                  setAptPriceUSD(n)
                  setAptManualOverride(true)
                  setAptPriceStatus("manual")
                }
              }}
              className="w-full rounded-lg pl-6 pr-3 py-2 text-sm font-mono bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#7595FF]/50 focus:ring-1 focus:ring-[#7595FF]/30 transition-colors"
            />
          </div>

          {aptManualOverride && (
            <button
              onClick={() => {
                setAptManualOverride(false)
                fetchAptPrice()
              }}
              className="text-[11px] text-[#7595FF] hover:underline whitespace-nowrap"
            >
              Use live
            </button>
          )}
        </div>
      </div>

      {/* ── Context banner ────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          {mode === "explorer"
            ? "Paste the Gas Used value from Aptos Explorer after running a test transaction on testnet. This gives the most accurate credit estimate for your specific contract."
            : "Enter the internal gas breakdown from the Aptos VM debugger, or pick a preset as a baseline. Use the Explorer mode for the most accurate estimate."}
        </p>
      </div>

      {/* ── Presets ───────────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Quick presets</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESETS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => applyPreset(id)}
              className={cn(
                "flex flex-col items-center gap-2 px-2 py-3 rounded-xl border text-xs font-medium transition-all duration-200",
                selectedPreset === id
                  ? "border-[#7595FF]/60 bg-[#7595FF]/10 text-[#7595FF] shadow-lg shadow-[#7595FF]/10"
                  : "border-white/[0.07] bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Inputs: Explorer mode ─────────────────────────────────────────── */}
      {mode === "explorer" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumField
            label="Gas Used"
            suffix="units"
            value={gasUsed}
            onChange={(n) => { setGasUsed(n); setSelectedPreset(null) }}
            placeholder="7"
            hint='The "gas_used" field from Aptos Explorer — run one test tx to find this'
          />
          <NumField
            label="Gas Unit Price"
            suffix="octas"
            value={gasUnitPrice}
            onChange={setGasUnitPrice}
            placeholder="100"
            hint='"gas_unit_price" on Explorer. Default network minimum is 100 octas/unit'
          />
        </div>
      )}

      {/* ── Inputs: VM Breakdown mode ─────────────────────────────────────── */}
      {mode === "breakdown" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NumField
              label="Instruction Gas"
              value={instructionGas}
              onChange={(n) => { setInstructionGas(n); setSelectedPreset(null) }}
              placeholder="3500000"
              hint="Execution / compute cost in internal units"
            />
            <NumField
              label="Storage Gas"
              value={storageGas}
              onChange={(n) => { setStorageGas(n); setSelectedPreset(null) }}
              placeholder="2000000"
              hint="Read / write global state cost in internal units"
            />
            <NumField
              label="Payload Size"
              suffix="bytes"
              value={payloadBytes}
              onChange={(n) => { setPayloadBytes(n); setSelectedPreset(null) }}
              placeholder="100"
              hint=">600 bytes adds 2,000 internal gas per extra byte"
            />
          </div>
          <div className="max-w-xs">
            <NumField
              label="Gas Unit Price"
              suffix="octas"
              value={breakdownPrice}
              onChange={setBreakdownPrice}
              placeholder="100"
              hint="Default: 100 octas/unit"
            />
          </div>
        </div>
      )}

      {/* ── Per-transaction results ───────────────────────────────────────── */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Per transaction</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResultTile
            label="Network gas fee"
            main={aptFmt(feeAPT)}
            sub={`${feeOctas.toFixed(0)} octas · ${usdFmt(feeUSD, 6)}`}
          />
          <ResultTile
            label="SmoothSend fee"
            main={usdFmt(smoothSendFee)}
            sub={smoothSendFee === 0.01 ? "minimum fee applied" : "from credits balance"}
            accent
          />
          <ResultTile
            label="User pays gas"
            main="$0.00"
            sub="relayer covers 100%"
            green
          />
        </div>
      </div>

      {/* ── Volume slider ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Monthly transaction volume</p>
          <span className="text-sm font-bold text-white tabular-nums">{volume.toLocaleString()} tx / mo</span>
        </div>
        <input
          type="range"
          min={0}
          max={VOLUME_STEPS.length - 1}
          step={1}
          value={volumeIdx}
          onChange={(e) => setVolumeIdx(Number(e.target.value))}
          className="w-full"
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
        <div className="flex justify-between mt-1.5">
          {VOLUME_STEPS.map((v, i) => (
            <span key={v} className={cn("text-[10px] font-mono transition-colors", i === volumeIdx ? "text-[#7595FF]" : "text-gray-700")}>
              {v >= 1_000 ? `${v / 1_000}k` : v}
            </span>
          ))}
        </div>
      </div>

      {/* ── Monthly totals ────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Monthly estimate</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-card rounded-xl p-5 border-[#7595FF]/20 bg-[#7595FF]/[0.05]">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-1">Credit cost</p>
            <p className="text-3xl font-bold text-[#7595FF] tabular-nums">
              {monthlyCredits >= 1_000 ? `$${(monthlyCredits / 1_000).toFixed(1)}k` : usdFmt(monthlyCredits)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{usdFmt(smoothSendFee)} × {volume.toLocaleString()} transactions</p>
          </div>
          <div className="glass-card rounded-xl p-5 border-green-500/15 bg-green-500/[0.04]">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-green-400" />
              <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Gas your users save</p>
            </div>
            <p className="text-3xl font-bold text-green-400 tabular-nums">
              {monthlyUserSavings >= 1_000 ? `$${(monthlyUserSavings / 1_000).toFixed(2)}k` : usdFmt(monthlyUserSavings, 4)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{usdFmt(feeUSD, 6)} gas × {volume.toLocaleString()} txs — paid $0 by users</p>
          </div>
        </div>
      </div>

      {/* ── Formula collapsible ───────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <button
          onClick={() => setShowFormula((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors"
        >
          <span className="font-medium">How is this calculated?</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showFormula && "rotate-180")} />
        </button>

        {showFormula && (
          <div className="px-4 pb-4 space-y-4 text-xs text-gray-400 border-t border-white/[0.06] pt-4">
            {mode === "explorer" ? (
              <div className="space-y-2">
                <p className="font-semibold text-gray-300">Explorer mode</p>
                <div className="font-mono bg-white/[0.03] rounded-lg p-3 space-y-1 text-[11px]">
                  <p><span className="text-[#f1fa8c]">fee_octas</span>       = gas_used × gas_unit_price</p>
                  <p><span className="text-[#f1fa8c]">fee_apt</span>         = fee_octas ÷ 100,000,000</p>
                  <p><span className="text-[#f1fa8c]">fee_usd</span>         = fee_apt × apt_price_usd</p>
                  <p><span className="text-[#7595FF]">smoothsend_fee</span>  = max(fee_usd × 1.5,  $0.01)</p>
                </div>
                <p>Your values: <span className="text-white font-mono">{gasUsed} × {gasUnitPrice} = {(gasUsed * gasUnitPrice).toLocaleString()} octas = {aptFmt(feeAPT)} = {usdFmt(feeUSD, 6)}</span></p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold text-gray-300">VM Breakdown (Aptos internal gas model)</p>
                <div className="font-mono bg-white/[0.03] rounded-lg p-3 space-y-1 text-[11px]">
                  <p><span className="text-[#8be9fd]">payload_extra</span>   = max(0, (bytes − 600) × 2,000)</p>
                  <p><span className="text-[#8be9fd]">total_internal</span>  = instruction + storage + 1,500,000 + payload_extra</p>
                  <p><span className="text-[#f1fa8c]">external_units</span>  = ceil(total_internal ÷ 1,000,000)</p>
                  <p><span className="text-[#f1fa8c]">fee_octas</span>       = external_units × gas_unit_price</p>
                  <p><span className="text-[#f1fa8c]">fee_usd</span>         = (fee_octas ÷ 100,000,000) × apt_price_usd</p>
                  <p><span className="text-[#7595FF]">smoothsend_fee</span>  = max(fee_usd × 1.5,  $0.01)</p>
                </div>
                {payloadBytes > 600 && (
                  <p>Payload: <span className="text-white font-mono">{payloadBytes} bytes</span> → extra <span className="text-[#ffb86c] font-mono">{((payloadBytes - 600) * 2_000).toLocaleString()}</span> internal gas</p>
                )}
              </div>
            )}
            <p className="text-gray-600">Testnet is always free. The $0.01 minimum applies to mainnet Wallet Adapter transactions only.</p>
          </div>
        )}
      </div>

    </div>
  )
}
