import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import {
  LIKES_OPTIONS,
  VIBE_OPTIONS,
  type LikeOption,
  type QuestionId,
  type ScreenId,
  type VibeOption,
} from "../flow/types"
import type { FlowApi, TextAnswerKey } from "../flow/useFlow"
import { BookBuddy } from "../living/BookBuddy"
import { NoteBlob } from "../living/NoteBlob"
import { PrimaryButton } from "./Buttons"
import { ClayCard } from "./ClayCard"
import { ClayInput } from "./ClayInput"
import { ScreenPanel } from "./ScreenPanel"

const NEXT: Record<QuestionId, ScreenId> = {
  q1: "q2",
  q2: "q3",
  q3: "q4",
  q4: "q5",
  q5: "q6",
  q6: "calculating",
}

const TEXT_FIELD: Partial<Record<QuestionId, { key: TextAnswerKey; placeholder: string }>> = {
  q1: { key: "rewatch", placeholder: "That one movie you know by heart…" },
  q2: { key: "comfort", placeholder: "The movie that fixes a bad day…" },
  q3: { key: "song", placeholder: "The song that instantly works…" },
  q5: { key: "loves", placeholder: "e.g. long drives at night…" },
}

const ARTIST_FIELD: { key: TextAnswerKey; placeholder: string } = {
  key: "artist",
  placeholder: "The artist always on repeat…",
}

const CHIP_FILLS = [
  "bg-clay-marigold",
  "bg-clay-pink",
  "bg-clay-pista",
  "bg-clay-sky",
  "bg-clay-mango",
] as const

const TEXT_HINT = "We both know you have an answer 👀"
const LIKES_HINT = "Pick at least one 👀"

function ClayChip({
  label,
  index,
  selected,
  onToggle,
}: {
  label: string
  index: number
  selected: boolean
  onToggle: () => void
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      data-testid={`chip-${index}`}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={onToggle}
      className={`min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-100 ${
        selected
          ? `${CHIP_FILLS[index % CHIP_FILLS.length]} text-ink shadow-[inset_0_-3px_6px_rgba(74,18,48,0.18),inset_0_3px_6px_rgba(255,255,255,0.7)]`
          : "bg-clay-card text-ink-soft shadow-[0_4px_8px_rgba(74,18,48,0.10)]"
      }`}
    >
      {label}
    </motion.button>
  )
}

export function QuestionScreen({ flow, id }: { flow: FlowApi; id: QuestionId }) {
  const spec = SCREEN_INVENTORY[id]
  const textField = TEXT_FIELD[id]
  const isArtist = id === "q4"
  const isLikes = id === "q6"
  const textConfig = textField ?? (isArtist ? ARTIST_FIELD : undefined)
  const textKey = textConfig?.key
  const textValue = textKey ? flow.answers[textKey] : ""
  const textReady = !textKey || textValue.trim().length > 0
  const likesReady = !isLikes || flow.answers.likes.length >= 1
  const canContinue = textReady && likesReady

  const [hint, setHint] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    setHint(null)
  }, [id])

  useEffect(() => {
    if (!hint) return
    const timer = window.setTimeout(() => setHint(null), 2200)
    return () => window.clearTimeout(timer)
  }, [hint])

  const hasMusicBuddy = id === "q3" || id === "q4"
  const hasBookBuddy = id === "q5"
  const buddy = hasMusicBuddy ? (
    <NoteBlob excited={focused} size={96} />
  ) : hasBookBuddy ? (
    <BookBuddy size={96} />
  ) : undefined

  const advance = () => {
    if (canContinue) {
      flow.select(NEXT[id])
      return
    }
    setHint(isLikes ? LIKES_HINT : TEXT_HINT)
  }

  const handleChange = (value: string) => {
    if (textKey) flow.setAnswer(textKey, value)
    if (hint) setHint(null)
  }

  return (
    <ScreenPanel spec={spec} top={buddy}>
      <ClayCard>
        {textConfig && (
          <ClayInput
            testId={`answer-${textConfig.key}`}
            value={textValue}
            placeholder={textConfig.placeholder}
            ariaLabel={spec.title}
            onChange={handleChange}
            onEnter={advance}
            onFocusChange={setFocused}
          />
        )}
        {isArtist && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
              Pick your vibe — optional
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {VIBE_OPTIONS.map((option: VibeOption, index: number) => (
                <ClayChip
                  key={option}
                  label={option}
                  index={index}
                  selected={flow.answers.vibe === option}
                  onToggle={() => flow.setVibe(flow.answers.vibe === option ? null : option)}
                />
              ))}
            </div>
          </div>
        )}
        {isLikes && (
          <div className="flex flex-wrap justify-center gap-2">
            {LIKES_OPTIONS.map((option: LikeOption, index: number) => (
              <ClayChip
                key={option}
                label={option}
                index={index}
                selected={flow.answers.likes.includes(option)}
                onToggle={() => flow.toggleLike(option)}
              />
            ))}
          </div>
        )}
        <PrimaryButton
          aria-disabled={!canContinue}
          onClick={advance}
          className={canContinue ? "" : "opacity-45 shadow-none"}
        >
          {spec.primaryLabel}
        </PrimaryButton>
        {hint !== null && (
          <motion.p
            data-testid="input-hint"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold text-clay-pink"
          >
            {hint}
          </motion.p>
        )}
      </ClayCard>
    </ScreenPanel>
  )
}
