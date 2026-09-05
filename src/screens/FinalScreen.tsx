import { motion, useReducedMotion } from "framer-motion"
import { useRef, useState } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { ClayCat } from "../living/ClayCat"
import { PrimaryButton } from "./Buttons"
import { ClayCard } from "./ClayCard"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

const DODGES = [
  { x: -70, y: -90 },
  { x: 75, y: -70 },
  { x: -60, y: 95 },
  { x: 70, y: 100 },
] as const

const GUILT_LINES = [
  "nice try 😺",
  "wrong button 👀",
  "the garba won't wait 🕺",
  "you know you want to 💃",
] as const

const MIN_SCALE = 0.55
const SHRINK_PER_TRY = 0.12
const GROW_PER_TRY = 0.06
const MAX_ACCEPT_SCALE = 1.18

export function FinalScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.final
  const reduced = useReducedMotion()
  const [attempts, setAttempts] = useState(0)
  const skipClick = useRef(false)

  const dodging = !reduced && attempts > 0
  const dodge = dodging ? DODGES[(attempts - 1) % DODGES.length] : undefined
  const noScale = dodging ? Math.max(MIN_SCALE, 1 - attempts * SHRINK_PER_TRY) : 1
  const acceptScale = dodging ? Math.min(MAX_ACCEPT_SCALE, 1 + attempts * GROW_PER_TRY) : 1

  return (
    <ScreenPanel
      spec={{ ...spec, title: "", lines: [], footer: undefined }}
      top={<ClayCat size={130} />}
    >
      <ClayCard>
        <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl">
          {spec.title}
        </h1>
        <StaggerLines lines={spec.lines ?? []} />
        <p className="font-display text-2xl font-bold text-clay-pink">{spec.footer}</p>
        <motion.div
          animate={{ scale: acceptScale }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <PrimaryButton onClick={() => flow.select("accepted")}>
            {spec.primaryLabel}
          </PrimaryButton>
        </motion.div>
        <div className="relative flex w-full flex-col">
          <motion.button
            type="button"
            data-testid="option-hesitate"
            animate={
              dodge ? { x: dodge.x, y: dodge.y, scale: noScale } : { x: 0, y: 0, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            onPointerDown={() => {
              if (reduced) return
              skipClick.current = true
              setAttempts((a) => a + 1)
            }}
            onClick={() => {
              if (skipClick.current) {
                skipClick.current = false
                return
              }
              flow.select("hesitate")
            }}
            className="min-h-11 w-full rounded-[18px] bg-clay-card px-6 py-2.5 text-base font-bold text-ink-soft shadow-[0_6px_12px_rgba(74,18,48,0.10)] transition-shadow duration-100"
          >
            {spec.secondaryLabel}
          </motion.button>
          {attempts > 0 && (
            <motion.span
              key={attempts}
              data-testid="guilt-bubble"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full rounded-full bg-clay-card px-4 py-1.5 text-sm font-bold whitespace-nowrap text-ink shadow-[0_4px_8px_rgba(74,18,48,0.12)]"
            >
              {GUILT_LINES[(attempts - 1) % GUILT_LINES.length]}
            </motion.span>
          )}
        </div>
      </ClayCard>
    </ScreenPanel>
  )
}
