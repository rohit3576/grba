import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function LockScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.lock
  return (
    <ScreenPanel spec={spec}>
      <PrimaryButton onClick={() => flow.select("verifying")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
