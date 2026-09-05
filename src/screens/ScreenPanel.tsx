import { motion } from "framer-motion"
import type { ReactNode } from "react"
import type { ScreenSpec } from "../flow/screens"
import { ProgressPill } from "./ProgressPill"

export function ScreenPanel({
  spec,
  top,
  children,
}: {
  spec: ScreenSpec
  top?: ReactNode
  children?: ReactNode
}) {
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
      <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl">
        {spec.title}
      </h1>
      {spec.lines?.map((line) => (
        <p key={line} className="text-base leading-relaxed font-medium text-ink-soft">
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
