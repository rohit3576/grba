import { motion } from "framer-motion"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { AutoAdvance } from "./AutoAdvance"
import { ScreenPanel } from "./ScreenPanel"

function DandiyaPair() {
  return (
    <motion.div
      className="flex h-24 items-end justify-center gap-2"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
    >
      <motion.div
        className="h-16 w-2.5 rounded-full bg-clay-pista shadow-[inset_0_2px_3px_rgba(255,255,255,0.6)]"
        style={{ transformOrigin: "bottom center" }}
        initial={{ rotate: -35 }}
        animate={{ rotate: -12 }}
        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.15 }}
      />
      <motion.div
        className="h-16 w-2.5 rounded-full bg-clay-mango shadow-[inset_0_2px_3px_rgba(255,255,255,0.6)]"
        style={{ transformOrigin: "bottom center" }}
        initial={{ rotate: 35 }}
        animate={{ rotate: 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.15 }}
      />
    </motion.div>
  )
}

export function IdentityYesScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY["identity-yes"]
  return (
    <ScreenPanel spec={spec} top={<DandiyaPair />}>
      <AutoAdvance ms={1400} onDone={() => flow.select("q1")} />
    </ScreenPanel>
  )
}
