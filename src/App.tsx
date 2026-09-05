import { AnimatePresence } from "framer-motion"
import { useFlow } from "./flow/useFlow"
import { SCREEN_COMPONENTS } from "./screens"
import { AppShell } from "./shell/AppShell"

export default function App() {
  const flow = useFlow()
  const Active = SCREEN_COMPONENTS[flow.screen]
  return (
    <AppShell>
      <AnimatePresence mode="wait" initial={false}>
        <Active key={flow.screen} flow={flow} />
      </AnimatePresence>
    </AppShell>
  )
}
