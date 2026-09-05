import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { AutoAdvance } from "./AutoAdvance"
import { ScreenPanel } from "./ScreenPanel"

export function IdentityYesScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY["identity-yes"]
  return (
    <ScreenPanel spec={spec}>
      <AutoAdvance ms={1400} onDone={() => flow.select("q1")} />
    </ScreenPanel>
  )
}
