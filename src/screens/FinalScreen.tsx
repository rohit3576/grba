import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton, SecondaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function FinalScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.final
  return (
    <ScreenPanel spec={spec}>
      <PrimaryButton onClick={() => flow.select("accepted")}>{spec.primaryLabel}</PrimaryButton>
      <SecondaryButton onClick={() => flow.select("hesitate")}>
        {spec.secondaryLabel}
      </SecondaryButton>
    </ScreenPanel>
  )
}
