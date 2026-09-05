# Garba Night 2026 — Design System

## 1. Atmosphere & Identity

A candy shop that learned Garba. Every screen feels like a soft toy box: puffy clay cards
floating on warm cream, buttons that squish like gummy candy, marigold petals drifting past.
The signature is **clay depth** — elements inflated with a three-shadow stack (tinted drop +
white top inset + dark bottom inset), one top-left light source everywhere. Nothing is static:
every tap has spring physics with visible overshoot. It should feel like a gift she can poke.

The humor is deadpan-bureaucratic; the world it lives in is warm, silly, and celebratory.

## 2. Color

Single light theme. No dark mode.

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Surface/page | --color-bg-cream | #FFF4E6 | Page background (warm cream, never white) |
| Surface/card | --color-clay-card | #FFFDF8 | Cards, panels (near-white clay) |
| Clay/marigold | --color-clay-marigold | #FFB454 | Primary CTA clay, progress fill |
| Clay/rani-pink | --color-clay-pink | #F27EB4 | Accent clay, highlights, celebration |
| Clay/pista | --color-clay-pista | #8FD6A0 | Confirm/accept clay, WhatsApp submit |
| Clay/sky | --color-clay-sky | #8CC5F0 | Info clay, secondary chips |
| Clay/mango | --color-clay-mango | #FFD97A | Pending/attention clay, badges |
| Text/ink | --color-ink | #4A1230 | All primary text (deep festive maroon-plum) |
| Text/soft | --color-ink-soft | #8A5A6E | Secondary text, captions |
| Shadow tint base | derived per clay | hue of the surface, never gray/black | Clay shadow stacks |

### Rules
- Contrast floor: `--color-ink` on any clay/cream surface ≥ 4.5:1 (verified pairs: ink/cream 11.4:1, ink/marigold 6.8:1, ink/pista 7.2:1, ink/pink 5.9:1, ink/sky 7.0:1, ink/mango 8.1:1).
- One primary CTA clay per screen (marigold). Accept screens may promote pista for the WhatsApp submit.
- Clay surfaces are FLAT pastel fills. No gradients on surfaces; depth comes only from the shadow stack.
- Product copy keeps its emoji (💃 👀 😌 etc.) — they are spec'd voice from plan.md, not iconography. Structural icons (lock, check, send) are SVG.

## 3. Typography

### Scale (mobile-first, 480px content column)

| Level | Size | Weight | Line height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 36px | 700 | 1.12 | -0.01em | Screen titles (94%, VERIFIED) |
| H2 | 26px | 700 | 1.2 | 0 | Section titles on cards |
| Body/lg | 18px | 600 | 1.5 | 0 | Question text, emphasized copy |
| Body | 16px | 500 | 1.55 | 0 | Default copy |
| Caption | 13px | 600 | 1.4 | 0.01em | Supporting lines, hints |
| Overline | 12px | 700 | 1.3 | 0.14em, uppercase | Kickers (APPLICANT PROFILE), progress `NN / 06` |

### Font Stack
- Primary: **Baloo 2** (variable) — chunky rounded, Latin + Devanagari. @fontsource-variable/baloo-2
- Gujarati accent: **Baloo Bhai 2** (same superfamily) — only for decorative "ગરબે" watermark glyphs. @fontsource/baloo-bhai-2
- Ink minimum: body ≥ 16px inside inputs (prevents iOS zoom).

### Rules
- Max 2 families (same superfamily counts as one voice).
- Never below 13px. Headings wrap ≤ 3 lines — reduce size before allowing 4.

## 4. Spacing & Layout

Base unit 4px. Content column max 480px, centered, `min-h-[100dvh]`, safe-area padded
(`pt-[calc(env(safe-area-inset-top)+2.5rem)]`, `pb-[calc(env(safe-area-inset-bottom)+2rem)]`).

| Token | Value | Usage |
|-------|-------|-------|
| space-2 | 8px | Chip gaps, icon-to-label |
| space-3 | 12px | Button stack gaps |
| space-4 | 16px | Card inner padding (min) |
| space-6 | 24px | Card comfortable padding, screen vertical rhythm |
| space-8 | 32px | Between card groups |

### Rules
- Clay elements need breathing room: ≥ 16px clear around every clay surface.
- No magic numbers; everything maps to a token above.

## 5. Components

### ClayButton
- Variants: primary (marigold clay), secondary (card clay w/ ink text), confirm (pista), ghost (no clay, ink text only)
- Structure: `<motion.button>` whileHover scale 1.03, whileTap scale 0.96 + translateY(2px), spring stiffness 400 damping 15
- Clay stack: `0 10px 20px <tint 0.35>, inset 0 -4px 8px <tint-dark 0.25>, inset 0 4px 8px rgba(255,255,255,0.75)`; radius 18px; min-height 52px; ink text 700
- Press = transform + short 120ms shadow-tighten (transform does the work; shadow transition is a garnish, never the carrier)
- States: default, hover (desktop), pressed, focus-visible (3px ink outline offset 2px — shadows never replace it), disabled (flat, 45% opacity, no clay)
- CSS owns color/shadow transitions; motion owns transform. Never both on the same property.

### ClayCard
- Panel container: card clay fill, radius 28px, OUTER shadow only (`0 18px 36px <tint 0.28>` — no insets; insets are reserved for interactive elements)
- Entry: spring pop (scale 0.94→1, y 12→0, stiffness 260 damping 20)

### ClayChip
- Pills radius 999px, min-height 40px (tap target), padding 8/16
- Selected state: fills with its clay + ink text; unselected: card clay + ink-soft
- whileTap squish 0.94

### ClayInput (text questions)
- Pressed-in well: inset-only shadows (`inset 4px 4px 10px tint 0.2, inset -4px -3px 8px rgba(255,255,255,0.9)`), radius 16px, bg cream, ink text 16px+
- Focus: 3px ink/40 outline; the well brightens

### ProgressPill
- `NN / 06` overline + hairline clay track with marigold fill animating width per question

## 6. Motion & Interaction

| Type | Spec | Usage |
|------|------|-------|
| Spring tap | stiffness 400, damping 15 | All buttons/chips |
| Screen transition | spring: scale 0.94→1, y 12→0, opacity, stiffness 260 damping 20 | Every screen change |
| Ambient drift | 6-8 petals/diyas, transform/opacity only, 14-22s loops, staggered | Background layer, all screens |
| Count-up | 0→94 with spring settle | Result screen |
| Celebration | clay-confetti burst (marigold/pink/pista/sky), dandiya-stick cross clack, staggered spring reveals ≤ 4s total | Accepted screen |
| Dodge | NO option springs to a new offset (bounded, never over YES), scale ×0.85/dodge, 2 dodges then works; micro-copy "nope 😅" / "not an option 👀" pops per dodge | Identity screen |

### Rules
- Only `transform` and `opacity` carry animation. box-shadow transitions ≤ 120ms on press only.
- `prefers-reduced-motion`: ambient off, dodges off (plain tap), springs → 150ms opacity fades, confetti → static burst frame.
- Auto-advance beats stay as spec'd: verifying 1800ms, identity-yes 1400ms, calculating 3000ms.

## 7. Depth & Surface

Strategy: **shadows** (clay stack). One global top-left light source; outer shadows tinted toward
the surface hue; inset pair (white top / tinted-dark bottom) only on interactive clay. Non-interactive
containers get outer shadow only. Elevation levels: resting card (18/36 blur), button (10/20),
pressed (halved offsets), floating celebration elements (28/56). No borders as depth (hairline
track on ProgressPill is a fill area, not a border device).
