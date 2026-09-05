import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import type { ScreenSpec } from "../flow/screens"
import { ProgressPill } from "./ProgressPill"

const LINE_CLASS = "text-base leading-relaxed font-medium text-ink-soft"

export function StaggerLines({
  lines,
  startDelay = 0.3,
  gap = 0.15,
}: {
  lines: readonly string[]
  startDelay?: number
  gap?: number
}) {
  const reduced = useReducedMotion()
  return (
    <>
      {lines.map((line, index) => (
        <motion.p
          key={line}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { delay: startDelay + index * gap, type: "spring", stiffness: 260, damping: 20 }
          }
          className={LINE_CLASS}
        >
          {line}
        </motion.p>
      ))}
    </>
  )
}

export function ScreenPanel({
  spec,
  top,
  children,
}: {
  spec: ScreenSpec
  top?: ReactNode
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      data-testid={`screen-${spec.id}`}
      className="relative flex flex-1 flex-col items-center justify-center gap-5 text-center"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
      transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 20 }}
    >
      {spec.progress !== undefined && <ProgressPill progress={spec.progress} />}
      {spec.kicker !== undefined && (
        <div className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
          {spec.kicker}
        </div>
      )}
      {top}
      {spec.title !== "" && (
        <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl">
          {spec.title}
        </h1>
      )}
      {spec.lines?.map((line) => (
        <p key={line} className={LINE_CLASS}>
          {line}
        </p>
      ))}
      {spec.footer !== undefined && (
        <p className="text-xs font-semibold text-ink-soft/80">{spec.footer}</p>
      )}
      {children}
    </motion.section>
  )
}
