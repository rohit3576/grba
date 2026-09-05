import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { PrimaryButton } from "./Buttons"
import { ClayCard } from "./ClayCard"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

export function HesitateScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.hesitate
  return (
    <ScreenPanel
      spec={{ ...spec, lines: [] }}
      top={<GarboPot mood="waiting" size={112} />}
    >
      <ClayCard>
        <StaggerLines lines={spec.lines ?? []} />
        <PrimaryButton onClick={() => flow.select("final")}>{spec.primaryLabel}</PrimaryButton>
      </ClayCard>
    </ScreenPanel>
  )
}
