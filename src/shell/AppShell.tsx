import type { ReactNode } from "react"
import { FloatingBackdrop } from "../living/FloatingBackdrop"
import { ParallaxRoot } from "../living/ParallaxRoot"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ParallaxRoot>
      <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col px-5 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <FloatingBackdrop />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </main>
    </ParallaxRoot>
  )
}
