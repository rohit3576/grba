import { motion, useReducedMotion } from "framer-motion"

const STICK = "h-16 w-2.5 rounded-full shadow-[inset_0_2px_3px_rgba(255,255,255,0.6)]"

export function DandiyaPair({ mode = "clack" }: { mode?: "clack" | "waiting" }) {
  const reduced = useReducedMotion()

  if (mode === "waiting") {
    return (
      <div data-testid="dandiya-pair" className="flex h-24 items-end justify-center gap-3">
        <motion.div
          className={`${STICK} bg-clay-pista`}
          style={{ rotate: -8, transformOrigin: "bottom center" }}
          animate={reduced ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${STICK} bg-clay-mango`}
          style={{ rotate: 8, transformOrigin: "bottom center" }}
          animate={reduced ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </div>
    )
  }

  return (
    <motion.div
      data-testid="dandiya-pair"
      className="flex h-24 items-end justify-center gap-2"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
    >
      <motion.div
        className={`${STICK} bg-clay-pista`}
        style={{ transformOrigin: "bottom center" }}
        initial={{ rotate: -35 }}
        animate={{ rotate: -12 }}
        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.15 }}
      />
      <motion.div
        className={`${STICK} bg-clay-mango`}
        style={{ transformOrigin: "bottom center" }}
        initial={{ rotate: 35 }}
        animate={{ rotate: 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.15 }}
      />
    </motion.div>
  )
}
