import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { ScreenPanel } from "./ScreenPanel"

export function AcceptedScreen(_props: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.accepted
  return (
    <ScreenPanel spec={spec}>
      <button
        type="button"
        disabled
        data-testid="whatsapp-submit"
        className="min-h-13 w-full rounded-[18px] bg-clay-pista px-6 py-3 text-lg font-bold text-ink shadow-[0_10px_20px_rgba(60,140,80,0.35),inset_0_-4px_8px_rgba(40,100,60,0.25),inset_0_4px_8px_rgba(255,255,255,0.75)] opacity-60"
      >
        Submit via WhatsApp →
      </button>
      <p className="text-xs font-semibold text-ink-soft/70">wired up in Phase 2</p>
    </ScreenPanel>
  )
}
