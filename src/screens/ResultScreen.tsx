import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function ResultScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.result
  return (
    <ScreenPanel spec={spec}>
      <PrimaryButton onClick={() => flow.select("final")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
