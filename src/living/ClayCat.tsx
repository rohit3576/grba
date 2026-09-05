import { motion, useReducedMotion } from "framer-motion"
import { Mascot } from "./Mascot"

export function ClayCat({ size = 120 }: { size?: number }) {
  const reduced = useReducedMotion()
  return (
    <Mascot testId="claycat" size={size} bobDuration={2.6}>
      <div className="relative h-full w-full">
        <motion.div
          className="absolute right-[2%] bottom-[18%] h-[42%] w-[28%]"
          style={{ transformOrigin: "15% 90%" }}
          animate={reduced ? undefined : { rotate: [0, 14, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 40 60" className="h-full w-full" role="presentation">
            <path
              d="M14 58 C4 44 6 26 18 12 C14 26 16 40 26 50 Z"
              fill="var(--color-clay-mango)"
              stroke="var(--color-ink)"
              strokeOpacity="0.15"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
        <svg viewBox="0 0 120 120" className="relative h-full w-full" role="img" aria-label="smiling clay cat">
          <ellipse cx="60" cy="108" rx="30" ry="5" fill="var(--color-ink)" opacity="0.1" />
          <path d="M30 36 L22 8 L50 24 Z" fill="var(--color-clay-mango)" />
          <path d="M31 32 L26 16 L42 25 Z" fill="var(--color-clay-pink)" />
          <path d="M90 36 L98 8 L70 24 Z" fill="var(--color-clay-mango)" />
          <path d="M89 32 L94 16 L78 25 Z" fill="var(--color-clay-pink)" />
          <ellipse cx="60" cy="92" rx="24" ry="18" fill="var(--color-clay-mango)" />
          <circle cx="60" cy="56" r="38" fill="var(--color-clay-mango)" />
          <ellipse cx="42" cy="34" rx="12" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-12 42 34)" />
          <g fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round">
            <path d="M38 55 Q44 49 50 55" />
            <path d="M70 55 Q76 49 82 55" />
          </g>
          <path d="M57 62 L63 62 L60 67 Z" fill="var(--color-clay-pink)" />
          <path
            d="M60 67 Q56 73 51 69 M60 67 Q64 73 69 69"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="36" cy="66" rx="6" ry="3.5" fill="var(--color-clay-pink)" opacity="0.5" />
          <ellipse cx="84" cy="66" rx="6" ry="3.5" fill="var(--color-clay-pink)" opacity="0.5" />
          <g stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
            <path d="M14 56 L28 58" />
            <path d="M12 63 L27 63" />
            <path d="M14 70 L28 67" />
            <path d="M106 56 L92 58" />
            <path d="M108 63 L93 63" />
            <path d="M106 70 L92 67" />
          </g>
        </svg>
      </div>
    </Mascot>
  )
}
