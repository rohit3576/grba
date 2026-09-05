import { motion, useReducedMotion } from "framer-motion"
import { useRef, useState } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

const NO_DODGES = [
  { x: -55, y: -120 },
  { x: 60, y: -95 },
] as const

const DODGE_LINES = ["nope 😅", "not an option 👀"] as const

const MAX_DODGES = NO_DODGES.length

export function IdentityScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.identity
  const reduced = useReducedMotion()
  const [dodges, setDodges] = useState(0)
  const skipClick = useRef(false)
  const chosen = flow.identityChoice
  const dodge = dodges > 0 && !reduced ? NO_DODGES[dodges - 1] : undefined

  return (
    <ScreenPanel spec={spec}>
      <div className="relative flex w-full max-w-72 gap-3">
        <motion.button
          type="button"
          aria-pressed={chosen === "yes"}
          data-testid="option-yes"
          whileTap={{ scale: 0.96, y: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={() => flow.setIdentityChoice("yes")}
          className={`min-h-13 flex-1 rounded-[18px] px-6 py-3 text-lg font-bold tracking-[0.2em] transition-all duration-100 active:translate-y-0.5 ${
            chosen === "yes"
              ? "bg-clay-marigold text-ink shadow-[0_8px_16px_rgba(180,100,20,0.35),inset_0_-3px_6px_rgba(140,70,10,0.25),inset_0_3px_6px_rgba(255,255,255,0.75)]"
              : "bg-clay-card text-ink-soft shadow-[0_6px_12px_rgba(74,18,48,0.10)]"
          }`}
        >
          YES
        </motion.button>
        <motion.button
          type="button"
          aria-pressed={chosen === "no"}
          data-testid="option-no"
          animate={
            dodge
              ? { x: dodge.x, y: dodge.y, scale: 1 - dodges * 0.15 }
              : { x: 0, y: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onPointerDown={() => {
            if (dodges < MAX_DODGES && !reduced) {
              skipClick.current = true
              setDodges((d) => d + 1)
            }
          }}
          onClick={() => {
            if (skipClick.current) {
              skipClick.current = false
              return
            }
            flow.setIdentityChoice("no")
          }}
          className={`min-h-13 flex-1 rounded-[18px] px-6 py-3 text-lg font-bold tracking-[0.2em] transition-all duration-100 active:translate-y-0.5 ${
            chosen === "no"
              ? "bg-clay-marigold text-ink shadow-[0_8px_16px_rgba(180,100,20,0.35),inset_0_-3px_6px_rgba(140,70,10,0.25),inset_0_3px_6px_rgba(255,255,255,0.75)]"
              : "bg-clay-card text-ink-soft shadow-[0_6px_12px_rgba(74,18,48,0.10)]"
          }`}
        >
          NO
        </motion.button>
        {dodges > 0 && dodges <= MAX_DODGES && (
          <motion.span
            key={dodges}
            data-testid="dodge-bubble"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute top-1/2 right-0 -translate-y-[210%] rounded-full bg-clay-card px-4 py-1.5 text-sm font-bold text-ink shadow-[0_4px_8px_rgba(74,18,48,0.12)]"
          >
            {DODGE_LINES[dodges - 1]}
          </motion.span>
        )}
      </div>
      <PrimaryButton
        disabled={chosen === null}
        onClick={() => flow.select(chosen === "yes" ? "identity-yes" : "identity-no")}
      >
        {spec.primaryLabel}
      </PrimaryButton>
    </ScreenPanel>
  )
}
