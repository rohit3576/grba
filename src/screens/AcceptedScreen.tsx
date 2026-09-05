import { useMemo } from "react"
import { buildWhatsAppUrl } from "../flow/composeMessage"
import { SCREEN_INVENTORY } from "../flow/screens"
import type { FlowApi } from "../flow/useFlow"
import { DancerPair } from "../living/DancerPair"
import { ScreenPanel } from "./ScreenPanel"

export function AcceptedScreen({ flow }: { flow: FlowApi }) {
  const spec = SCREEN_INVENTORY.accepted
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(flow.answers), [flow.answers])

  return (
    <ScreenPanel spec={spec} top={<DancerPair size={140} />}>
      <div className="flex w-full flex-col gap-3">
        <p className="text-sm font-bold tracking-[0.14em] text-ink-soft uppercase">
          One last formality 📲
        </p>
        <a
          data-testid="whatsapp-submit"
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className="min-h-13 block w-full rounded-[18px] bg-clay-pista px-6 py-3 text-lg font-bold text-ink shadow-[0_10px_20px_rgba(60,140,80,0.35),inset_0_-4px_8px_rgba(40,100,60,0.25),inset_0_4px_8px_rgba(255,255,255,0.75)] transition-shadow duration-100 active:translate-y-0.5"
        >
          Submit via WhatsApp →
        </a>
        <p className="text-xs font-semibold text-ink-soft/80">
          Opens WhatsApp with everything filled in — you just press send.
        </p>
      </div>
    </ScreenPanel>
  )
}
