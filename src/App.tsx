import { AppShell } from "./shell/AppShell"

/** Phase 1 placeholder — real lock screen lands with Todo 2 (flow engine). */
export default function App() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-xs tracking-[0.35em] text-marigold uppercase">
          🔒 Restricted
        </p>
        <h1 className="mt-4 font-display text-4xl text-cream">
          GARBA NIGHT 2026
        </h1>
        <p className="mt-3 text-sm text-cream/60">
          Verification Required — skeleton placeholder
        </p>
      </div>
    </AppShell>
  )
}
