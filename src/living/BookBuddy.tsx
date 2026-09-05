import { Mascot } from "./Mascot"

export function BookBuddy({ size = 96 }: { size?: number }) {
  return (
    <Mascot testId="bookbuddy" size={size} bobDuration={2.8}>
      <svg viewBox="0 0 120 120" role="img" aria-label="little book buddy">
        <ellipse cx="60" cy="98" rx="34" ry="5" fill="var(--color-ink)" opacity="0.1" />
        <rect x="16" y="34" width="88" height="56" rx="10" fill="var(--color-clay-marigold)" />
        <path d="M58 42 C46 34 30 34 22 40 L22 88 C30 82 46 82 58 88 Z" fill="var(--color-clay-card)" stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="2" />
        <path d="M62 42 C74 34 90 34 98 40 L98 88 C90 82 74 82 62 88 Z" fill="var(--color-clay-card)" stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="2" />
        <line x1="60" y1="42" x2="60" y2="88" stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="2.5" />
        <ellipse cx="34" cy="52" rx="8" ry="3.5" fill="#FFFFFF" opacity="0.55" transform="rotate(-8 34 52)" />
        <circle cx="72" cy="58" r="3" fill="var(--color-ink)" />
        <circle cx="84" cy="58" r="3" fill="var(--color-ink)" />
        <path d="M72 66 Q78 70 84 66" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="82" y="26" width="7" height="18" rx="2.5" fill="var(--color-clay-pink)" transform="rotate(12 86 35)" />
        <circle cx="20" cy="28" r="3" fill="var(--color-clay-mango)" />
        <circle cx="104" cy="34" r="2.5" fill="var(--color-clay-sky)" />
      </svg>
    </Mascot>
  )
}
