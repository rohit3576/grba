import {
  APP_ID,
  APPLICANT_NAME,
  LIKES_SHOWN_MAX,
  MESSAGE_TOTAL_MAX,
  OWNER_PHONE,
  TEXT_ANSWER_MAX,
} from "../config"
import type { Answers } from "./types"

type TextKey = "rewatch" | "comfort" | "song" | "artist" | "loves"

function trimWithEllipsis(value: string, max: number): string {
  const clean = value.trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max)}…`
}

function formatLikes(likes: readonly string[], shown: number): string {
  const visible = likes.slice(0, shown).join(", ")
  const extra = likes.length - Math.min(likes.length, shown)
  return extra > 0 ? `${visible}, +${extra} more` : visible
}

function buildMessage(
  text: Record<TextKey, string>,
  vibe: string,
  likes: readonly string[],
  likesShown: number,
): string {
  return [
    `💃 GARBA APPLICATION ${APP_ID}`,
    "Status: ACCEPTED ✓",
    "",
    `From: ${APPLICANT_NAME}`,
    "",
    `🎬 Rewatch: ${text.rewatch}`,
    `🍿 Comfort: ${text.comfort}`,
    `🎵 Song: ${text.song}`,
    `🎤 Artist: ${text.artist} | ${vibe}`,
    `❤️ Loves: ${text.loves}`,
    `✅ Likes: ${formatLikes(likes, likesShown)}`,
  ].join("\n")
}

export function composeMessage(answers: Answers): string {
  const vibe = answers.vibe ?? "No vibe picked"
  const textAt = (max: number): Record<TextKey, string> => ({
    rewatch: trimWithEllipsis(answers.rewatch, max),
    comfort: trimWithEllipsis(answers.comfort, max),
    song: trimWithEllipsis(answers.song, max),
    artist: trimWithEllipsis(answers.artist, max),
    loves: trimWithEllipsis(answers.loves, max),
  })

  let message = buildMessage(textAt(TEXT_ANSWER_MAX), vibe, answers.likes, LIKES_SHOWN_MAX)
  if (message.length <= MESSAGE_TOTAL_MAX) return message

  message = buildMessage(textAt(TEXT_ANSWER_MAX), vibe, answers.likes, 4)
  if (message.length <= MESSAGE_TOTAL_MAX) return message

  message = buildMessage(textAt(40), vibe, answers.likes, 4)
  if (message.length <= MESSAGE_TOTAL_MAX) return message

  message = buildMessage(textAt(25), vibe, answers.likes, 4)
  if (message.length <= MESSAGE_TOTAL_MAX) return message

  return message.slice(0, MESSAGE_TOTAL_MAX)
}

export function buildWhatsAppUrl(answers: Answers): string {
  return `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(composeMessage(answers))}`
}
