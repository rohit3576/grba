import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

export function IdentityScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.identity
  const chosen = flow.identityChoice
  return (
    <ScreenPanel spec={spec}>
      <div className="flex w-full max-w-64 flex-col gap-3">
        {(["yes", "no"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={chosen === value}
            onClick={() => flow.setIdentityChoice(value)}
            className={`min-h-13 w-full rounded-[18px] px-6 py-3 text-lg font-bold tracking-[0.2em] transition-all duration-100 active:translate-y-0.5 ${
              chosen === value
                ? "bg-clay-marigold text-ink shadow-[0_8px_16px_rgba(180,100,20,0.35),inset_0_-3px_6px_rgba(140,70,10,0.25),inset_0_3px_6px_rgba(255,255,255,0.75)]"
                : "bg-clay-card text-ink-soft shadow-[0_6px_12px_rgba(74,18,48,0.10)]"
            }`}
          >
            {value === "yes" ? "YES" : "NO"}
          </button>
        ))}
      </div>
      <PrimaryButton
        disabled={chosen === null}
        onClick={() =>
          flow.select(chosen === "yes" ? "identity-yes" : "identity-no")
        }
      >
        {spec.primaryLabel}
      </PrimaryButton>
    </ScreenPanel>
  )
}
