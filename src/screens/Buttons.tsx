import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"

export type ClayButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
>

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const

function isInert(props: ClayButtonProps): boolean {
  return (
    props.disabled === true ||
    props["aria-disabled"] === true ||
    props["aria-disabled"] === "true"
  )
}

export function PrimaryButton({ className = "", ...props }: ClayButtonProps) {
  const inert = isInert(props)
  return (
    <motion.button
      {...props}
      whileHover={inert ? undefined : { scale: 1.03 }}
      whileTap={inert ? undefined : { scale: 0.96, y: 2 }}
      transition={SPRING}
      className={`min-h-13 w-full rounded-[18px] bg-clay-marigold px-6 py-3 text-lg font-bold text-ink shadow-[0_10px_20px_rgba(180,100,20,0.35),inset_0_-4px_8px_rgba(140,70,10,0.25),inset_0_4px_8px_rgba(255,255,255,0.75)] transition-shadow duration-100 disabled:opacity-45 disabled:shadow-none ${className}`}
    />
  )
}

export function SecondaryButton({ className = "", ...props }: ClayButtonProps) {
  const inert = isInert(props)
  return (
    <motion.button
      {...props}
      whileHover={inert ? undefined : { scale: 1.03 }}
      whileTap={inert ? undefined : { scale: 0.96, y: 2 }}
      transition={SPRING}
      className={`min-h-13 w-full rounded-[18px] bg-clay-card px-6 py-3 text-lg font-bold text-ink shadow-[0_8px_16px_rgba(74,18,48,0.14),inset_0_-3px_6px_rgba(74,18,48,0.08),inset_0_3px_6px_rgba(255,255,255,0.9)] transition-shadow duration-100 disabled:opacity-45 disabled:shadow-none ${className}`}
    />
  )
}
