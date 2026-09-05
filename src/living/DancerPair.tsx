import { motion, useReducedMotion } from "framer-motion"
import { Mascot } from "./Mascot"

function Dancer({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 70 100"
      className="h-full"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      role="presentation"
    >
      <ellipse cx="35" cy="94" rx="20" ry="4" fill="var(--color-ink)" opacity="0.1" />
      <g fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round">
        <path d="M16 48 Q8 38 12 26" />
        <path d="M54 48 Q62 38 58 26" />
      </g>
      <ellipse cx="35" cy="56" rx="23" ry="29" fill={fill} />
      <ellipse cx="26" cy="40" rx="8" ry="4" fill="#FFFFFF" opacity="0.45" />
      <circle cx="28" cy="54" r="3" fill="var(--color-ink)" />
      <circle cx="42" cy="54" r="3" fill="var(--color-ink)" />
      <path d="M29 63 Q35 68 41 63" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function DancerPair({ size = 140 }: { size?: number }) {
  const reduced = useReducedMotion()
  const bounce = {
    y: [0, -8, 0],
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const },
  }
  return (
    <Mascot testId="dancerpair" size={size} bobDuration={2}>
      <div className="flex h-full w-full items-end justify-center gap-1">
        <motion.div className="h-[76%]" animate={reduced ? undefined : bounce}>
          <Dancer fill="var(--color-clay-marigold)" />
        </motion.div>
        <motion.div
          className="h-[76%]"
          animate={reduced ? undefined : { ...bounce, transition: { ...bounce.transition, delay: 0.45 } }}
        >
          <Dancer fill="var(--color-clay-pink)" flip />
        </motion.div>
      </div>
    </Mascot>
  )
}
