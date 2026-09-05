import { motion, useReducedMotion } from "framer-motion"
import { Suspense, lazy } from "react"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { GarboPot } from "../living/GarboPot"
import { PrimaryButton } from "./Buttons"
import { ScreenPanel, StaggerLines } from "./ScreenPanel"

const Garbo3D = lazy(() =>
  import("../three/Garbo3D").then((module) => ({ default: module.Garbo3D })),
)

export function LockScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.lock
  const reduced = useReducedMotion()
  const enter = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 10 } as const),
    animate: { opacity: 1, y: 0 },
    transition: reduced
      ? { duration: 0.15 }
      : ({ delay, type: "spring" as const, stiffness: 260, damping: 20 } as const),
  })

  return (
    <ScreenPanel
      spec={{ ...spec, title: "", lines: [], footer: undefined }}
      top={
        <motion.div
          initial={reduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
        >
          <Suspense fallback={<GarboPot mood="guard" size={150} />}>
            <Garbo3D mood="guard" size={160} />
          </Suspense>
        </motion.div>
      }
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-10 -z-10 -rotate-12 text-[38vw] leading-none font-black text-ink opacity-[0.05] select-none"
        style={{ fontFamily: '"Baloo Bhai 2", serif' }}
      >
        ગરબે
      </span>
      <motion.h1
        {...enter(0.15)}
        className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl"
      >
        {spec.title}
      </motion.h1>
      <StaggerLines lines={spec.lines ?? []} startDelay={0.27} gap={0.12} />
      <motion.p {...enter(0.63)} className="text-xs font-semibold text-ink-soft/80">
        {spec.footer}
      </motion.p>
      <motion.div {...enter(0.5)} className="w-full">
        <PrimaryButton onClick={() => flow.select("verifying")}>
          {spec.primaryLabel}
        </PrimaryButton>
      </motion.div>
    </ScreenPanel>
  )
}
