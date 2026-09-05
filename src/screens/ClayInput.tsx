interface ClayInputProps {
  value: string
  placeholder: string
  ariaLabel: string
  testId: string
  onChange: (value: string) => void
  onEnter?: () => void
  onFocusChange?: (focused: boolean) => void
}

export function ClayInput({
  value,
  placeholder,
  ariaLabel,
  testId,
  onChange,
  onEnter,
  onFocusChange,
}: ClayInputProps) {
  return (
    <input
      data-testid={testId}
      type="text"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete="off"
      enterKeyHint="done"
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onEnter?.()
      }}
      onFocus={() => onFocusChange?.(true)}
      onBlur={() => onFocusChange?.(false)}
      className="min-h-14 w-full rounded-[16px] bg-bg-cream px-5 text-base font-medium text-ink placeholder:text-ink-soft/60 shadow-[inset_4px_4px_10px_rgba(74,18,48,0.12),inset_-4px_-3px_8px_rgba(255,255,255,0.9)] focus-visible:shadow-[inset_2px_2px_6px_rgba(74,18,48,0.08),inset_-2px_-2px_6px_rgba(255,255,255,1)]"
    />
  )
}
