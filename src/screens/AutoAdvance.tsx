import { useEffect } from "react"

export function AutoAdvance({ ms, onDone }: { ms: number; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, ms)
    return () => window.clearTimeout(timer)
  }, [ms, onDone])
  return null
}
