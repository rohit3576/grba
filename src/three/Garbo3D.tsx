import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import { useRef, useState, type RefObject } from "react"
import * as THREE from "three"
import { useParallax } from "../living/ParallaxRoot"

export type Garbo3DMood =
  | "guard"
  | "unimpressed"
  | "thinking"
  | "waiting"
  | "cheer"
  | "plain"

const MOOD_BOB: Record<Garbo3DMood, number> = {
  plain: 2,
  guard: 2.3,
  unimpressed: 2.6,
  thinking: 3.4,
  waiting: 4.6,
  cheer: 4.2,
}

const BLINK_INTERVAL = 4.5
const BLINK_DURATION = 0.13

type EyeRefs = {
  left: RefObject<THREE.Mesh | null>
  right: RefObject<THREE.Mesh | null>
}

function Eye({
  eyeRef,
  position,
  lookRight = false,
}: {
  eyeRef: RefObject<THREE.Mesh | null>
  position: [number, number, number]
  lookRight?: boolean
}) {
  const x = lookRight ? position[0] + 0.05 : position[0]
  return (
    <group position={[x, position[1], position[2]]}>
      <mesh ref={eyeRef}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#3a0c26" roughness={0.25} />
      </mesh>
      <mesh position={[0.05, 0.06, 0.12]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.04, -0.05, 0.13]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function Pot({
  mood,
  happy,
  eyeRefs,
}: {
  mood: Garbo3DMood
  happy: boolean
  eyeRefs: EyeRefs
}) {
  const face = happy ? "cheer" : mood
  const flatFace = face === "unimpressed"

  return (
    <group>
      <mesh scale={[1.06, 1, 1.06]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#ffc478" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.18, 16, 48]} />
        <meshStandardMaterial color="#fffdf8" roughness={0.55} />
      </mesh>
      <mesh position={[-0.42, 0.42, 0.76]} scale={[0.42, 0.55, 0.15]} rotation={[0, 0, -0.35]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>

      {flatFace ? (
        <>
          <mesh position={[-0.32, 0.3, 0.9]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.035, 0.16, 4, 10]} />
            <meshStandardMaterial color="#3a0c26" roughness={0.3} />
          </mesh>
          <mesh position={[0.32, 0.3, 0.9]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.035, 0.16, 4, 10]} />
            <meshStandardMaterial color="#3a0c26" roughness={0.3} />
          </mesh>
          <mesh position={[-0.3, 0.55, 0.86]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[0.28, 0.05, 0.05]} />
            <meshStandardMaterial color="#3a0c26" roughness={0.3} />
          </mesh>
        </>
      ) : (
        <>
          <Eye eyeRef={eyeRefs.left} position={[-0.33, 0.3, 0.86]} />
          <Eye eyeRef={eyeRefs.right} position={[0.33, 0.3, 0.86]} lookRight={face === "waiting"} />
        </>
      )}

      {flatFace ? (
        <mesh position={[0, 0.12, 0.95]}>
          <boxGeometry args={[0.2, 0.04, 0.05]} />
          <meshStandardMaterial color="#3a0c26" roughness={0.3} />
        </mesh>
      ) : (
        <group position={[0, 0.07, 0.93]} scale={happy ? 1.3 : 1}>
          <mesh position={[-0.075, 0, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.08, 0.035, 10, 20, Math.PI]} />
            <meshStandardMaterial color="#3a0c26" roughness={0.3} />
          </mesh>
          <mesh position={[0.075, 0, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.08, 0.035, 10, 20, Math.PI]} />
            <meshStandardMaterial color="#3a0c26" roughness={0.3} />
          </mesh>
        </group>
      )}

      {[-0.58, 0.58].map((x) => (
        <mesh key={x} position={[x, 0.06, 0.82]} scale={[1.15, 0.75, 0.45]}>
          <sphereGeometry args={[0.13, 14, 14]} />
          <meshStandardMaterial color="#f79cc0" roughness={1} transparent opacity={0.75} />
        </mesh>
      ))}

      {face === "cheer" && (
        <>
          <mesh position={[-1.02, 0.35, 0.25]} rotation={[0, 0, 0.7]}>
            <capsuleGeometry args={[0.09, 0.55, 6, 12]} />
            <meshStandardMaterial color="#ffb454" roughness={0.85} />
          </mesh>
          <mesh position={[1.02, 0.35, 0.25]} rotation={[0, 0, -0.7]}>
            <capsuleGeometry args={[0.09, 0.55, 6, 12]} />
            <meshStandardMaterial color="#ffb454" roughness={0.85} />
          </mesh>
        </>
      )}

      {mood === "guard" && (
        <group position={[0.78, 0.95, 0.15]}>
          <mesh>
            <boxGeometry args={[0.42, 0.34, 0.14]} />
            <meshStandardMaterial color="#8cc5f0" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.02, 0.08]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#4a1230" roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.06, 0.08]}>
            <boxGeometry args={[0.05, 0.1, 0.03]} />
            <meshStandardMaterial color="#4a1230" roughness={0.6} />
          </mesh>
        </group>
      )}

      {mood === "waiting" && (
        <group position={[1.05, 0, 0.2]}>
          <mesh>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color="#ffd97a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.005, 0.2]}>
            <boxGeometry args={[0.02, 0.14, 0.02]} />
            <meshStandardMaterial color="#4a1230" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.005, 0.2]} rotation={[0, 0, Math.PI / 3]}>
            <boxGeometry args={[0.02, 0.1, 0.02]} />
            <meshStandardMaterial color="#4a1230" roughness={0.6} />
          </mesh>
        </group>
      )}
    </group>
  )
}

function OrbitRing({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * speed
  })
  return (
    <group ref={ref} position={[0, 0.2, 0]}>
      {[
        { angle: 0, color: "#f27eb4" },
        { angle: 2.1, color: "#8cc5f0" },
        { angle: 4.2, color: "#ffd97a" },
      ].map(({ angle, color }) => {
        const radius = 1.55
        return (
          <mesh
            key={color}
            position={[
              Math.cos(angle) * radius,
              0.55 + Math.sin(angle * 2) * 0.15,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

function GarboRig({ mood, reduced }: { mood: Garbo3DMood; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const eyeLeft = useRef<THREE.Mesh>(null)
  const eyeRight = useRef<THREE.Mesh>(null)
  const { x: px, y: py } = useParallax()
  const squish = useRef(1)
  const squishTarget = useRef(1)
  const happyTimer = useRef(0)
  const [happy, setHappy] = useState(false)

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime

    if (happyTimer.current > 0) {
      happyTimer.current -= delta
      if (happyTimer.current <= 0) setHappy(false)
    }

    squishTarget.current = Math.min(1, squishTarget.current + delta * 2.2)
    squish.current = THREE.MathUtils.damp(squish.current, squishTarget.current, 8, delta)

    const bob = reduced ? 0 : Math.sin(t * MOOD_BOB[mood]) * 0.08
    const sway = reduced ? 0 : Math.sin(t * MOOD_BOB[mood] * 0.7) * 0.06
    const headTilt = reduced ? 0 : Math.sin(t * 0.9) * 0.045
    group.current.position.y = bob
    group.current.rotation.z = sway + headTilt
    group.current.rotation.y = reduced ? 0 : px.get() * 0.4 + Math.sin(t * 0.6) * 0.07
    group.current.rotation.x = reduced ? 0 : py.get() * 0.2
    group.current.scale.set(2 - squish.current, squish.current, 2 - squish.current)

    const blinking = !reduced && t % BLINK_INTERVAL < BLINK_DURATION
    const eyeScale = blinking || happy ? 0.12 : 1
    if (eyeLeft.current) {
      eyeLeft.current.scale.y = THREE.MathUtils.damp(eyeLeft.current.scale.y, eyeScale, 22, delta)
    }
    if (eyeRight.current) {
      eyeRight.current.scale.y = THREE.MathUtils.damp(eyeRight.current.scale.y, eyeScale, 22, delta)
    }
  })

  return (
    <group
      ref={group}
      onPointerDown={(event) => {
        event.stopPropagation()
        squishTarget.current = 0.82
        happyTimer.current = 0.6
        setHappy(true)
      }}
    >
      <Pot mood={mood} happy={happy} eyeRefs={{ left: eyeLeft, right: eyeRight }} />
      {mood === "thinking" && <OrbitRing speed={1.4} />}
      <mesh position={[0, -1.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial color="#4a1230" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

export function Garbo3D({
  mood = "plain",
  size = 150,
}: {
  mood?: Garbo3DMood
  size?: number
}) {
  const reduced = useReducedMotion() ?? false
  return (
    <div data-testid="garbo3d" style={{ width: size, height: size }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.55, 4.3], fov: 38 }}
        style={{ touchAction: "none" }}
      >
        <ambientLight intensity={1.35} color="#fff2e2" />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.65} color="#ffd9c0" />
        <GarboRig mood={mood} reduced={reduced} />
      </Canvas>
    </div>
  )
}
