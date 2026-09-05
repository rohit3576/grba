import { motion, useReducedMotion } from "framer-motion"

export function ProgressPill({ progress }: { progress: string }) {
  const reduced = useReducedMotion()
  const match = /^(\d+)\s*\/\s*(\d+)$/.exec(progress)
  const current = match ? Number(match[1]) : 0
  const total = match ? Number(match[2]) : 6
  const targetPct = (current / total) * 100
  const fromPct = (Math.max(current - 1, 0) / total) * 100

  return (
    <div className="flex w-full max-w-64 flex-col items-center gap-2">
      <div className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">{progress}</div>
      <div
        data-testid="progress-track"
        className="h-1.5 w-full rounded-full bg-ink/10 shadow-[inset_1px_1px_3px_rgba(74,18,48,0.12)]"
      >
        <motion.div
          data-testid="progress-fill"
          className="h-full rounded-full bg-clay-marigold shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
          initial={{ width: `${fromPct}%` }}
          animate={{ width: `${targetPct}%` }}
          transition={
            reduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }
          }
        />
      </div>
    </div>
  )
}
