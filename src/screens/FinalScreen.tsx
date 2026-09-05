import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { DandiyaPair } from "../living/DandiyaPair"
import { PrimaryButton, SecondaryButton } from "./Buttons"
import { ClayCard } from "./ClayCard"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

export function FinalScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.final
  return (
    <ScreenPanel
      spec={{ ...spec, title: "", lines: [], footer: undefined }}
      top={<DandiyaPair mode="waiting" />}
    >
      <ClayCard>
        <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl">
          {spec.title}
        </h1>
        <StaggerLines lines={spec.lines ?? []} />
        <p className="font-display text-2xl font-bold text-clay-pink">{spec.footer}</p>
        <PrimaryButton onClick={() => flow.select("accepted")}>{spec.primaryLabel}</PrimaryButton>
        <SecondaryButton onClick={() => flow.select("hesitate")}>
          {spec.secondaryLabel}
        </SecondaryButton>
      </ClayCard>
    </ScreenPanel>
  )
}
