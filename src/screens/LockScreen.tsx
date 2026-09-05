import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function LockScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.lock
  return (
    <ScreenPanel spec={spec} top={<GarboPot mood="guard" size={128} />}>
      <PrimaryButton onClick={() => flow.select("verifying")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
