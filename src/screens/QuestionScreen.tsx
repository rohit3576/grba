import { SCREEN_INVENTORY } from "../flow/screens"
import { LIKES_OPTIONS, VIBE_OPTIONS, type QuestionId, type ScreenId } from "../flow/types"
import type { FlowApi } from "../flow/useFlow"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel } from "./ScreenPanel"

const NEXT: Record<QuestionId, ScreenId> = {
  q1: "q2",
  q2: "q3",
  q3: "q4",
  q4: "q5",
  q5: "q6",
  q6: "calculating",
}

export function QuestionScreen({ flow, id }: { flow: FlowApi; id: QuestionId }) {
  const spec = SCREEN_INVENTORY[id]
  return (
    <ScreenPanel spec={spec}>
      {id === "q4" && (
        <div className="flex flex-wrap justify-center gap-2">
          {VIBE_OPTIONS.map((option) => (
            <span
              key={option}
              className="min-h-10 rounded-full bg-clay-card px-4 py-2 text-sm font-semibold text-ink-soft shadow-[0_4px_8px_rgba(74,18,48,0.10)]"
            >
              {option}
            </span>
          ))}
        </div>
      )}
      {id === "q6" && (
        <div className="flex flex-wrap justify-center gap-2">
          {LIKES_OPTIONS.map((option) => (
            <span
              key={option}
              className="min-h-10 rounded-full bg-clay-card px-4 py-2 text-sm font-semibold text-ink-soft shadow-[0_4px_8px_rgba(74,18,48,0.10)]"
            >
              {option}
            </span>
          ))}
        </div>
      )}
      <PrimaryButton onClick={() => flow.select(NEXT[id])}>{spec.primaryLabel}</PrimaryButton>
    </ScreenPanel>
  )
}
