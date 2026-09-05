import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const COLORS = [
  "bg-clay-marigold",
  "bg-clay-pink",
  "bg-clay-pista",
  "bg-clay-sky",
  "bg-clay-mango",
] as const

const COUNT = 7

export function Sparkles() {
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setAlive(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  if (!alive) return null

  return (
    <div data-testid="sparkles" className="pointer-events-none absolute inset-0">
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 + 0.4
        const distance = 42 + (i % 3) * 12
        return (
          <motion.span
            key={i}
            className={`absolute top-1/2 left-1/2 h-2.5 w-2.5 rounded-full ${COLORS[i % COLORS.length]}`}
            initial={{ x: 0, y: 0, scale: 0.6, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 1,
              opacity: 0,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          />
        )
      })}
    </div>
  )
}
