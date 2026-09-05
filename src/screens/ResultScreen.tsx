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
import { ClayCard } from "./ClayCard"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

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
      spec={{ ...spec, title: "", lines: [] }}
      top={<GarboPot mood="cheer" size={92} />}
    >
      <ClayCard>
        <motion.div
          data-testid="result-ring"
          className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-clay-marigold bg-bg-cream shadow-[0_10px_20px_rgba(180,100,20,0.25)]"
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
        <StaggerLines lines={spec.lines ?? []} />
      </ClayCard>
      <PrimaryButton onClick={() => flow.select("final")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
