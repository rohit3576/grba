import { motion, useReducedMotion, useTransform } from "framer-motion"
import { useState, type ReactNode } from "react"
import { useParallax } from "./ParallaxRoot"
import { Sparkles } from "./Sparkles"

interface MascotProps {
  children: ReactNode
  size?: number
  bobDuration?: number
  testId?: string
  onTap?: () => void
}

export function Mascot({ children, size = 120, bobDuration = 3, testId, onTap }: MascotProps) {
  const reduced = useReducedMotion()
  const { x, y } = useParallax()
  const px = useTransform(x, (v) => v * 10)
  const py = useTransform(y, (v) => v * 8)
  const [burst, setBurst] = useState(0)

  return (
    <motion.div
      data-testid={testId}
      className="relative cursor-pointer select-none"
      style={{ width: size, height: size, x: px, y: py }}
      onTap={() => {
        if (!reduced) setBurst((b) => b + 1)
        onTap?.()
      }}
    >
      <motion.div
        className="h-full w-full"
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: bobDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduced ? undefined : { rotate: [-2, 2, -2] }}
          transition={{ duration: bobDuration + 1, repeat: Infinity, ease: "easeInOut" }}
          whileTap={reduced ? undefined : { scale: 0.92 }}
        >
          {children}
        </motion.div>
      </motion.div>
      {burst > 0 && <Sparkles key={burst} />}
    </motion.div>
  )
}
