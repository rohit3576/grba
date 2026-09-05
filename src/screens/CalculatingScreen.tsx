import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { AutoAdvance } from "./AutoAdvance"
import { ScreenPanel } from "./ScreenPanel"

const STATUS_LINES = [
  "Analyzing music taste...",
  "Checking chai compatibility...",
  "Consulting the Garba council 🕺",
] as const

export function CalculatingScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.calculating
  const reduced = useReducedMotion()
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, STATUS_LINES.length - 1))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <ScreenPanel spec={spec} top={<GarboPot mood="thinking" size={104} />}>
      <div className="flex h-6 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={statusIndex}
            data-testid={`status-${statusIndex}`}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-sm font-semibold text-ink-soft"
          >
            {STATUS_LINES[statusIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="h-3 w-full max-w-64 overflow-hidden rounded-full bg-ink/10 shadow-[inset_2px_2px_5px_rgba(74,18,48,0.15)]">
        <motion.div
          className="h-full rounded-full bg-clay-marigold shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>
      <AutoAdvance ms={3000} onDone={() => flow.select("result")} />
    </ScreenPanel>
  )
}
