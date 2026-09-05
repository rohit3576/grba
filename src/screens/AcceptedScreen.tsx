import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"
import { buildWhatsAppUrl } from "../flow/composeMessage"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { ConfettiBurst } from "../living/ConfettiBurst"
import { DancerPair } from "../living/DancerPair"
import { DandiyaPair } from "../living/DandiyaPair"
import { ClayCard } from "./ClayCard"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const

export function AcceptedScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.accepted
  const reduced = useReducedMotion()
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(flow.answers), [flow.answers])

  const allLines = spec.lines ?? []
  const appLines = allLines.filter(
    (line) => line.startsWith("Application") || line.startsWith("Status"),
  )
  const celebrationLines = allLines.filter((line) => !appLines.includes(line))

  return (
    <ScreenPanel spec={{ ...spec, title: "", lines: [] }} top={<DancerPair size={140} />}>
      <ConfettiBurst />
      {!reduced && (
        <div className="pointer-events-none absolute top-2 right-6 scale-75 opacity-90">
          <DandiyaPair mode="clack" />
        </div>
      )}
      <ClayCard delay={0.2}>
        <motion.div
          data-testid="stamp"
          initial={reduced ? false : { scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-pista shadow-[0_6px_12px_rgba(60,140,80,0.35),inset_0_-3px_6px_rgba(40,100,60,0.25),inset_0_3px_6px_rgba(255,255,255,0.75)]"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" role="img" aria-label="verified">
            <path
              d="M5 13l4 4L19 7"
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "var(--color-ink)" }}
            />
          </svg>
        </motion.div>
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 20 }}
          className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl"
        >
          {spec.title}
        </motion.h1>
        <StaggerLines lines={celebrationLines} startDelay={0.4} gap={0.15} />
      </ClayCard>
      <ClayCard delay={0.9} className="gap-2">
        {appLines.map((line) =>
          line.startsWith("Status") ? (
            <span
              key={line}
              className="mx-auto rounded-full bg-clay-pista px-4 py-1 text-sm font-bold text-ink shadow-[inset_0_-2px_4px_rgba(40,100,60,0.25),inset_0_2px_4px_rgba(255,255,255,0.75)]"
            >
              {line}
            </span>
          ) : (
            <p key={line} className="font-display text-lg font-bold text-ink">
              {line}
            </p>
          ),
        )}
      </ClayCard>
      <ClayCard delay={1.2} className="gap-3">
        <p className="text-sm font-bold tracking-[0.14em] text-ink-soft uppercase">
          One last formality 📲
        </p>
        <motion.div
          animate={
            reduced
              ? undefined
              : { y: [0, 0, -5, 0, -5, 0] }
          }
          transition={{ delay: 1.9, duration: 0.9, ease: "easeInOut" }}
        >
          <motion.a
            data-testid="whatsapp-submit"
            href={whatsappUrl}
            target="_blank"
            rel="noopener"
            whileTap={{ scale: 0.96, y: 2 }}
            transition={SPRING}
            className="block min-h-13 w-full rounded-[18px] bg-clay-pista px-6 py-3 text-lg font-bold text-ink shadow-[0_10px_20px_rgba(60,140,80,0.35),inset_0_-4px_8px_rgba(40,100,60,0.25),inset_0_4px_8px_rgba(255,255,255,0.75)] transition-shadow duration-100"
          >
            Submit via WhatsApp →
          </motion.a>
        </motion.div>
        <p className="text-xs font-semibold text-ink-soft/80">
          Opens WhatsApp with everything filled in — you just press send.
        </p>
      </ClayCard>
    </ScreenPanel>
  )
}
