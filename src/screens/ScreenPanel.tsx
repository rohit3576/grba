import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import type { ScreenSpec } from "../flow/screens"
import { ProgressPill } from "./ProgressPill"

export function ScreenPanel({
  spec,
  top,
  staggerLines = false,
  children,
}: {
  spec: ScreenSpec
  top?: ReactNode
  staggerLines?: boolean
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      data-testid={`screen-${spec.id}`}
      className="flex flex-1 flex-col items-center justify-center gap-5 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
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
      {spec.lines?.map((line, index) => (
        <motion.p
          key={line}
          initial={staggerLines && !reduced ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            staggerLines && !reduced
              ? { delay: 0.3 + index * 0.15, type: "spring", stiffness: 260, damping: 20 }
              : { duration: 0 }
          }
          className="text-base leading-relaxed font-medium text-ink-soft"
        >
          {line}
        </motion.p>
      ))}
      {spec.footer !== undefined && (
        <p className="text-xs font-semibold text-ink-soft/80">{spec.footer}</p>
      )}
      {children}
    </motion.section>
  )
}
