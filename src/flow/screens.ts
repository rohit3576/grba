import type { ScreenId } from "./types"

export interface ScreenSpec {
  id: ScreenId
  kicker?: string
  title: string
  lines?: readonly string[]
  primaryLabel?: string
  secondaryLabel?: string
  footer?: string
  progress?: string
}

export const SCREEN_INVENTORY: Record<ScreenId, ScreenSpec> = {
  lock: {
    id: "lock",
    kicker: "🔒 RESTRICTED",
    title: "GARBA NIGHT 2026",
    lines: [
      "Verification Required",
      "This application is exclusively available to one person.",
      "KAJAL DODIA",
    ],
    primaryLabel: "Continue →",
    footer: "Application ID: #KD-001",
  },
  verifying: {
    id: "verifying",
    title: "Establishing applicant verification...",
  },
  identity: {
    id: "identity",
    kicker: "IDENTITY VERIFICATION",
    title: "Are you Kajal Dodia?",
    primaryLabel: "Confirm Identity",
  },
  "identity-no": {
    id: "identity-no",
    title: "Hmm... that's interesting.",
    lines: ["This application was specifically designed for Kajal. 👀"],
    primaryLabel: "Try again →",
  },
  "identity-yes": {
    id: "identity-yes",
    title: "Identity confirmed ✓",
    lines: ["Welcome, Kajal."],
  },
  q1: {
    id: "q1",
    kicker: "APPLICANT PROFILE",
    title: "What movie could you watch again and again?",
    primaryLabel: "Continue →",
    progress: "01 / 06",
  },
  q2: {
    id: "q2",
    title: "When you've had a terrible day...",
    lines: ["What's your comfort movie?"],
    primaryLabel: "Continue →",
    progress: "02 / 06",
  },
  q3: {
    id: "q3",
    kicker: "YOUR SOUNDTRACK",
    title: "Which song can instantly put you in a good mood?",
    primaryLabel: "Continue →",
    progress: "03 / 06",
  },
  q4: {
    id: "q4",
    title: "Who's an artist you never get tired of listening to?",
    primaryLabel: "Continue →",
    progress: "04 / 06",
  },
  q5: {
    id: "q5",
    kicker: "QUICK QUESTION",
    title: "What is something you genuinely love doing when you have free time?",
    primaryLabel: "Continue →",
    progress: "05 / 06",
  },
  q6: {
    id: "q6",
    kicker: "THE IMPORTANT ONE 👀",
    title: "Pick the things that sound most like you:",
    primaryLabel: "Continue →",
    progress: "06 / 06",
  },
  calculating: {
    id: "calculating",
    title: "PROFILE COMPLETE ✓",
    lines: [
      "Thank you, Kajal.",
      "We've learned a few things about you.",
      "Your Garba compatibility is being calculated...",
    ],
  },
  result: {
    id: "result",
    kicker: "GARBA COMPATIBILITY",
    title: "94%",
    lines: [
      "💃",
      "Excellent Candidate",
      "✓ Good music potential",
      "✓ Movie compatibility",
      "✓ Chai compatibility",
      "✓ Strong Garba potential",
      "There is only one thing left to verify...",
    ],
    primaryLabel: "Continue →",
  },
  final: {
    id: "final",
    kicker: "FINAL VERIFICATION",
    title: "GARBA NIGHT PARTNER",
    lines: [
      "Kajal Dodia,",
      "Would you like to officially accept the position of:",
    ],
    primaryLabel: "ACCEPT 💃",
    secondaryLabel: "I'll think about it 👀",
    footer: "2026",
  },
  hesitate: {
    id: "hesitate",
    kicker: "APPLICATION PAUSED",
    title: "Take your time.",
    lines: ["The position will be held briefly.", "…but Garba won't wait forever 🕺"],
    primaryLabel: "Okay fine → Reconsider",
  },
  accepted: {
    id: "accepted",
    title: "✓ VERIFIED",
    lines: [
      "GARBA PARTNER",
      "KAJAL DODIA",
      "ACCEPTED",
      "💃 🕺",
      "Application #KD-001",
      "Status: CONFIRMED",
      "Congratulations. You have successfully secured your Garba partner.",
      "Further instructions will be communicated separately. 😌",
    ],
  },
}
