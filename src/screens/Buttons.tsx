import type { ButtonHTMLAttributes } from "react"

type CommonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className = "", ...props }: CommonProps) {
  return (
    <button
      {...props}
      className={`min-h-13 w-full rounded-[18px] bg-clay-marigold px-6 py-3 text-lg font-bold text-ink shadow-[0_10px_20px_rgba(180,100,20,0.35),inset_0_-4px_8px_rgba(140,70,10,0.25),inset_0_4px_8px_rgba(255,255,255,0.75)] transition-shadow duration-100 active:translate-y-0.5 active:shadow-[0_4px_10px_rgba(180,100,20,0.35),inset_0_-2px_4px_rgba(140,70,10,0.25),inset_0_2px_4px_rgba(255,255,255,0.75)] disabled:opacity-45 disabled:shadow-none ${className}`}
    />
  )
}

export function SecondaryButton({ className = "", ...props }: CommonProps) {
  return (
    <button
      {...props}
      className={`min-h-13 w-full rounded-[18px] bg-clay-card px-6 py-3 text-lg font-bold text-ink shadow-[0_8px_16px_rgba(74,18,48,0.14),inset_0_-3px_6px_rgba(74,18,48,0.08),inset_0_3px_6px_rgba(255,255,255,0.9)] transition-shadow duration-100 active:translate-y-0.5 disabled:opacity-45 disabled:shadow-none ${className}`}
    />
  )
}
