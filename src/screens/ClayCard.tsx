import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export function ClayCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      data-testid="clay-card"
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 20 }}
      className={`flex w-full flex-col gap-4 rounded-[28px] bg-clay-card p-6 shadow-[0_18px_36px_rgba(74,18,48,0.10)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
