import { motion } from "framer-motion"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { AutoAdvance } from "./AutoAdvance"
import { ScreenPanel } from "./ScreenPanel"

export function CalculatingScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.calculating
  return (
    <ScreenPanel spec={spec}>
      <div className="h-3 w-full max-w-64 overflow-hidden rounded-full bg-ink/10 shadow-[inset_2px_2px_5px_rgba(74,18,48,0.15)]">
        <motion.div
          className="h-full rounded-full bg-clay-marigold shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>
      <AutoAdvance ms={3000} onDone={() => flow.select("result")} />
    </ScreenPanel>
  )
}
