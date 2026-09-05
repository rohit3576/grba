import { motion } from "framer-motion"
import { useRef, useState } from "react"
import type { FlowApi } from "../flow/useFlow"
import { Sparkles } from "./Sparkles"

const MAX_DIMENSION = 480

function downscale(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext("2d")
      if (!context) {
        resolve(dataUrl)
        return
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL("image/jpeg", 0.82))
    }
    image.onerror = () => resolve(dataUrl)
    image.src = dataUrl
  })
}

export function ApplicantPhoto({ flow }: { flow: FlowApi }) {
  const [burst, setBurst] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const photo = flow.applicantPhoto

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const raw = typeof reader.result === "string" ? reader.result : null
      if (!raw) return
      void downscale(raw).then((optimized) => {
        flow.setPhoto(optimized)
        setBurst((b) => b + 1)
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative">
      <label
        data-testid="applicant-photo-frame"
        className="relative block h-28 w-24 rotate-[-4deg] cursor-pointer overflow-hidden rounded-[20px] border-[3px] border-dashed border-ink/30 bg-clay-card/70 shadow-[0_8px_16px_rgba(74,18,48,0.10)]"
      >
        {photo ? (
          <img
            data-testid="applicant-photo"
            src={photo}
            alt="Applicant photo"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center text-[10px] leading-tight font-bold tracking-wide text-ink-soft/80 uppercase">
            Applicant photo
            <span className="text-[9px] font-semibold normal-case">
              tap to add your cutest pic
            </span>
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            handleFile(event.target.files?.[0])
            event.target.value = ""
          }}
        />
      </label>
      {photo && (
        <motion.span
          data-testid="photo-stamp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="absolute -right-3 -bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-clay-pista shadow-[0_4px_8px_rgba(60,140,80,0.35),inset_0_2px_3px_rgba(255,255,255,0.7)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" role="img" aria-label="verified">
            <path
              d="M5 13l4 4L19 7"
              fill="none"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "var(--color-ink)" }}
            />
          </svg>
        </motion.span>
      )}
      {burst > 0 && <Sparkles key={burst} />}
    </div>
  )
}
