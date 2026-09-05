import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function IdentityNoScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY["identity-no"]
  return (
    <ScreenPanel spec={spec}>
      <PrimaryButton
        onClick={() => {
          flow.setIdentityChoice(null)
          flow.select("identity")
        }}
      >
        {spec.primaryLabel}
      </PrimaryButton>
    </ScreenPanel>
  )
}
