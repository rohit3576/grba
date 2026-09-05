import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const COLORS = [
  "bg-clay-marigold",
  "bg-clay-pink",
  "bg-clay-pista",
  "bg-clay-sky",
  "bg-clay-mango",
  "bg-clay-card",
] as const

const COUNT = 28
const GOLDEN_ANGLE = 137.5

export function ConfettiBurst() {
  const reduced = useReducedMotion()
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setAlive(false), 1600)
    return () => window.clearTimeout(timer)
  }, [])

  if (reduced || !alive) return null

  return (
    <div
      data-testid="confetti"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = ((i * GOLDEN_ANGLE + (i % 3) * 17) % 360) * (Math.PI / 180)
        const distance = 120 + ((i * 29) % 100)
        const rotate = ((i * 53) % 360) - 180
        const size = 7 + (i % 4) * 3
        const kind = i % 3
        const shape =
          kind === 1
            ? "rounded-[60%_40%_55%_45%/50%_60%_40%_50%]"
            : kind === 2
              ? "rounded-full"
              : "rounded-[4px]"
        return (
          <motion.span
            key={i}
            className={`absolute top-[30%] left-1/2 ${COLORS[i % COLORS.length]} ${shape}`}
            style={{ width: kind === 1 ? size * 0.8 : size, height: size }}
            initial={{ x: 0, y: 0, rotate: 0, scale: 0.4, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + 40,
              rotate,
              scale: kind === 2 ? 1 : 0.7,
              opacity: [1, 1, 0],
            }}
            transition={{
              x: { type: "spring", stiffness: 200, damping: 18 },
              y: { type: "spring", stiffness: 200, damping: 18 },
              rotate: { duration: 1.2, ease: "easeOut" },
              opacity: { duration: 1.5, times: [0, 0.55, 1] },
              scale: { duration: 1.2 },
            }}
          />
        )
      })}
    </div>
  )
}
