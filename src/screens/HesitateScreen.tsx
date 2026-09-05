import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function HesitateScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.hesitate
  return (
    <ScreenPanel spec={spec} top={<GarboPot mood="waiting" size={112} />}>
      <PrimaryButton onClick={() => flow.select("final")}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
