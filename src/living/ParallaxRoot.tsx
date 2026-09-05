import { useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import type { MotionValue } from "framer-motion"

interface ParallaxContextValue {
  x: MotionValue<number>
  y: MotionValue<number>
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null)

export function useParallax(): ParallaxContextValue {
  const ctx = useContext(ParallaxContext)
  if (!ctx) throw new Error("useParallax must be used inside ParallaxRoot")
  return ctx
}

const SPRING = { stiffness: 60, damping: 20 } as const

export function ParallaxRoot({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)
  const lastInput = useRef(0)

  useEffect(() => {
    if (reduced) return
    const onPointer = (event: PointerEvent) => {
      lastInput.current = performance.now()
      rawX.set((event.clientX / window.innerWidth) * 2 - 1)
      rawY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onPointer, { passive: true })
    return () => window.removeEventListener("pointermove", onPointer)
  }, [rawX, rawY, reduced])

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const loop = (time: number) => {
      const idleFor = performance.now() - lastInput.current
      if (idleFor > 3000) {
        rawX.set(Math.sin(time / 1600) * 0.18)
        rawY.set(Math.cos(time / 2000) * 0.12)
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [rawX, rawY, reduced])

  return <ParallaxContext.Provider value={{ x, y }}>{children}</ParallaxContext.Provider>
}
