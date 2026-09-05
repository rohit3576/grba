export type ScreenId =
  | "lock"
  | "verifying"
  | "identity"
  | "identity-no"
  | "identity-yes"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "calculating"
  | "result"
  | "final"
  | "hesitate"
  | "accepted"

export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6"

export type VibeOption = "Chill" | "Dance" | "Romantic" | "Lost in music" | "Main character"

export const VIBE_OPTIONS: readonly VibeOption[] = [
  "Chill",
  "Dance",
  "Romantic",
  "Lost in music",
  "Main character",
]

export type LikeOption =
  | "Chai dates"
  | "Long drives"
  | "Movies"
  | "Music"
  | "Travelling"
  | "Late-night conversations"
  | "Dancing"
  | "Trying new food"
  | "Staying home"
  | "Random adventures"

export const LIKES_OPTIONS: readonly LikeOption[] = [
  "Chai dates",
  "Long drives",
  "Movies",
  "Music",
  "Travelling",
  "Late-night conversations",
  "Dancing",
  "Trying new food",
  "Staying home",
  "Random adventures",
]

export interface Answers {
  rewatch: string
  comfort: string
  song: string
  artist: string
  vibe: VibeOption | null
  loves: string
  likes: LikeOption[]
}

export const EMPTY_ANSWERS: Answers = {
  rewatch: "",
  comfort: "",
  song: "",
  artist: "",
  vibe: null,
  loves: "",
  likes: [],
}
