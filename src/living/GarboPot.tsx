import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { Mascot } from "./Mascot"

export type GarboMood = "guard" | "unimpressed" | "thinking" | "waiting" | "cheer" | "plain"

const BOB_BY_MOOD: Record<GarboMood, number> = {
  plain: 3,
  guard: 3.4,
  unimpressed: 3.8,
  thinking: 2.4,
  waiting: 1.3,
  cheer: 2.2,
}

function Eyes({ face, blink }: { face: GarboMood; blink: boolean }) {
  if (blink && face !== "cheer") {
    return (
      <g fill="var(--color-ink)">
        <rect x="42" y="60" width="12" height="3" rx="1.5" />
        <rect x="66" y="60" width="12" height="3" rx="1.5" />
      </g>
    )
  }
  if (face === "unimpressed") {
    return (
      <g fill="var(--color-ink)">
        <rect x="42" y="61" width="12" height="3" rx="1.5" />
        <rect x="66" y="61" width="12" height="3" rx="1.5" />
        <rect x="40" y="50" width="14" height="2.5" rx="1.25" />
      </g>
    )
  }
  if (face === "thinking") {
    return (
      <g fill="var(--color-ink)">
        <path d="M42 62 Q48 57 54 62 L54 64 Q48 61 42 64 Z" />
        <path d="M66 62 Q72 57 78 62 L78 64 Q72 61 66 64 Z" />
      </g>
    )
  }
  if (face === "cheer") {
    return (
      <g fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M42 63 Q48 56 54 63" />
        <path d="M66 63 Q72 56 78 63" />
      </g>
    )
  }
  const pupilShift = face === "waiting" ? 3 : 0
  return (
    <g fill="var(--color-ink)">
      <circle cx={48 + pupilShift} cy="62" r="4.5" />
      <circle cx={72 + pupilShift} cy="62" r="4.5" />
    </g>
  )
}

export function GarboPot({
  mood = "plain",
  size = 120,
}: {
  mood?: GarboMood
  size?: number
}) {
  const reduced = useReducedMotion()
  const [blink, setBlink] = useState(false)
  const [happy, setHappy] = useState(false)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setBlink(true)
      window.setTimeout(() => setBlink(false), 130)
    }, 4500)
    return () => window.clearInterval(id)
  }, [reduced])

  const face: GarboMood = happy ? "cheer" : mood

  return (
    <Mascot
      testId="garbo"
      size={size}
      bobDuration={BOB_BY_MOOD[mood]}
      onTap={() => {
        setHappy(true)
        window.setTimeout(() => setHappy(false), 600)
      }}
    >
      <div className="relative h-full w-full">
        {mood === "thinking" && (
          <motion.div
            className="absolute -inset-[14%]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute top-0 left-1/2 h-2.5 w-2.5 rounded-full bg-clay-pink" />
            <span className="absolute bottom-[8%] left-[4%] h-2 w-2 rounded-full bg-clay-sky" />
            <span className="absolute right-[4%] bottom-[8%] h-2 w-2 rounded-full bg-clay-mango" />
          </motion.div>
        )}
        <svg viewBox="0 0 120 120" className="h-full w-full" role="img" aria-label="Garbo the garba pot">
          <ellipse cx="60" cy="106" rx="30" ry="5" fill="var(--color-ink)" opacity="0.12" />
          <path
            d="M30 46 C28 78 40 100 60 100 C80 100 92 78 90 46 Z"
            fill="var(--color-clay-marigold)"
          />
          <path
            d="M30 46 C28 78 40 100 60 100 C80 100 92 78 90 46 Z"
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          <path
            d="M38 52 C37 74 45 92 58 97 C46 95 36 76 36 54 Z"
            fill="#FFFFFF"
            opacity="0.35"
          />
          <ellipse cx="60" cy="44" rx="33" ry="10" fill="var(--color-clay-card)" />
          <ellipse cx="60" cy="43" rx="33" ry="10" fill="none" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="2" />
          <ellipse cx="52" cy="41" rx="16" ry="3.5" fill="#FFFFFF" opacity="0.7" />
          <Eyes face={face} blink={blink} />
          {face === "unimpressed" ? (
            <path d="M55 76 Q60 73 65 76" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <path d="M54 73 Q60 79 66 73" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
          )}
          {face === "cheer" && (
            <g fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round">
              <path d="M32 68 Q20 56 24 42" />
              <path d="M88 68 Q100 56 96 42" />
            </g>
          )}
          {mood === "guard" && (
            <g>
              <rect x="78" y="20" width="22" height="18" rx="5" fill="var(--color-clay-sky)" />
              <circle cx="89" cy="27" r="3" fill="var(--color-ink)" />
              <rect x="87.5" y="27" width="3" height="6" rx="1.5" fill="var(--color-ink)" />
            </g>
          )}
          {mood === "waiting" && (
            <g>
              <circle cx="93" cy="74" r="11" fill="var(--color-clay-mango)" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
              <path d="M93 74 L93 68 M93 74 L97 76" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </Mascot>
  )
}
