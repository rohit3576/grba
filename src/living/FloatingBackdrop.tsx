import { motion, useReducedMotion, useTransform } from "framer-motion"
import { useParallax } from "./ParallaxRoot"

type PieceKind = "petal" | "diya" | "dot"

interface PieceSpec {
  kind: PieceKind
  color?: string
  depth: number
  top: string
  left: string
  size: number
  duration: number
}

const PIECES: readonly PieceSpec[] = [
  { kind: "petal", color: "bg-clay-marigold", depth: 1, top: "7%", left: "82%", size: 26, duration: 18 },
  { kind: "petal", color: "bg-clay-pink", depth: 0.6, top: "15%", left: "9%", size: 20, duration: 22 },
  { kind: "petal", color: "bg-clay-marigold", depth: 0.3, top: "70%", left: "86%", size: 16, duration: 20 },
  { kind: "diya", depth: 0.6, top: "83%", left: "12%", size: 22, duration: 24 },
  { kind: "diya", depth: 1, top: "28%", left: "5%", size: 18, duration: 19 },
  { kind: "dot", color: "bg-clay-mango", depth: 0.3, top: "56%", left: "76%", size: 12, duration: 16 },
  { kind: "dot", color: "bg-clay-sky", depth: 0.6, top: "86%", left: "58%", size: 10, duration: 21 },
  { kind: "petal", color: "bg-clay-pink", depth: 0.45, top: "45%", left: "4%", size: 14, duration: 17 },
]

const RANGE = 22

function Piece({ spec, index }: { spec: PieceSpec; index: number }) {
  const reduced = useReducedMotion()
  const { x, y } = useParallax()
  const px = useTransform(x, (v) => v * RANGE * spec.depth)
  const py = useTransform(y, (v) => v * RANGE * spec.depth * 0.7)

  return (
    <motion.div
      data-testid="backdrop-piece"
      className="absolute"
      style={{ top: spec.top, left: spec.left, x: px, y: py }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: spec.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7,
        }}
      >
        {spec.kind === "petal" && (
          <span
            className={`block rounded-[60%_40%_55%_45%/50%_60%_40%_50%] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(74,18,48,0.15)] ${spec.color}`}
            style={{ width: spec.size, height: spec.size * 0.82 }}
          />
        )}
        {spec.kind === "diya" && (
          <span className="block" style={{ width: spec.size, height: spec.size * 0.9 }}>
            <span className="block h-[55%] w-full rounded-b-full bg-clay-pista shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(74,18,48,0.18)]" />
            <span className="mx-auto -mt-[18%] block h-[38%] w-[34%] rounded-full bg-clay-mango shadow-[0_0_4px_rgba(255,217,122,0.8)]" />
          </span>
        )}
        {spec.kind === "dot" && (
          <span
            className={`block rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] ${spec.color}`}
            style={{ width: spec.size, height: spec.size }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export function FloatingBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PIECES.map((spec, index) => (
        <Piece key={index} spec={spec} index={index} />
      ))}
    </div>
  )
}
