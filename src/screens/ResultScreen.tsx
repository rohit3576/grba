import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

const COMPATIBILITY = 94

export function ResultScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.result
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const settled = useSpring(count, { stiffness: 90, damping: 16 })
  const display = useTransform(settled, (v) => `${Math.round(v)}%`)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => count.set(COMPATIBILITY), 350)
    return () => window.clearTimeout(timer)
  }, [count, reduced])

  return (
    <ScreenPanel
      spec={{ ...spec, title: "" }}
      staggerLines
      top={<GarboPot mood="cheer" size={92} />}
    >
      <motion.div
        data-testid="result-ring"
        className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-clay-marigold bg-clay-card shadow-[0_18px_36px_rgba(180,100,20,0.30),inset_0_-8px_16px_rgba(140,70,10,0.15),inset_0_8px_16px_rgba(255,255,255,0.75)]"
        initial={reduced ? undefined : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        {reduced ? (
          <span data-testid="result-percent" className="font-display text-5xl font-bold text-ink">
            94%
          </span>
        ) : (
          <motion.span
            data-testid="result-percent"
            className="font-display text-5xl font-bold text-ink"
          >
            {display}
          </motion.span>
        )}
      </motion.div>
      <PrimaryButton onClick={() => flow.select("final")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
