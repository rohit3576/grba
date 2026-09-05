import { motion } from "framer-motion"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { AutoAdvance } from "./AutoAdvance"
import { ScreenPanel } from "./ScreenPanel"

export function VerifyingScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.verifying
  return (
    <ScreenPanel spec={spec}>
      <motion.div
        className="h-2.5 w-20 rounded-full bg-clay-marigold shadow-[0_4px_8px_rgba(180,100,20,0.35)]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
      <AutoAdvance ms={1800} onDone={() => flow.select("identity")} />
    </ScreenPanel>
  )
}
