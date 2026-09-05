import { motion, useReducedMotion } from "framer-motion"
import { Mascot } from "./Mascot"

export function NoteBlob({
  excited = false,
  size = 96,
}: {
  excited?: boolean
  size?: number
}) {
  const reduced = useReducedMotion()
  const bob = reduced ? 3 : excited ? 0.8 : 2.6
  const sway = reduced ? undefined : { rotate: excited ? [-6, 6, -6] : [-2, 2, -2] }

  return (
    <Mascot testId="noteblob" size={size} bobDuration={bob}>
      <motion.div
        className="h-full w-full"
        animate={sway}
        transition={{ duration: excited ? 0.6 : 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 120" role="img" aria-label="dancing music note">
          <ellipse cx="60" cy="104" rx="26" ry="4" fill="var(--color-ink)" opacity="0.1" />
          <ellipse cx="46" cy="82" rx="22" ry="16" fill="var(--color-clay-pink)" transform="rotate(-18 46 82)" />
          <ellipse cx="40" cy="76" rx="9" ry="4" fill="#FFFFFF" opacity="0.45" transform="rotate(-18 40 76)" />
          <rect x="62" y="30" width="8" height="56" rx="4" fill="var(--color-clay-pink)" />
          <path d="M70 30 C90 36 94 50 84 64 C92 48 86 38 70 44 Z" fill="var(--color-clay-sky)" />
          <circle cx="38" cy="82" r="3" fill="var(--color-ink)" />
          <circle cx="52" cy="82" r="3" fill="var(--color-ink)" />
          <path d="M39 89 Q45 93 51 89" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="92" cy="30" r="4" fill="var(--color-clay-mango)" />
          <circle cx="102" cy="44" r="2.5" fill="var(--color-clay-marigold)" />
        </svg>
      </motion.div>
    </Mascot>
  )
}
