import { useCallback, useMemo, useReducer } from "react"
import { EMPTY_ANSWERS, type Answers, type LikeOption, type ScreenId, type VibeOption } from "./types"

export type IdentityChoice = "yes" | "no" | null
export type TextAnswerKey = "rewatch" | "comfort" | "song" | "artist" | "loves"

interface FlowState {
  screen: ScreenId
  answers: Answers
  identityChoice: IdentityChoice
  applicantPhoto: string | null
}

type FlowAction =
  | { type: "select"; to: ScreenId }
  | { type: "set-answer"; key: TextAnswerKey; value: string }
  | { type: "set-vibe"; value: VibeOption | null }
  | { type: "toggle-like"; option: LikeOption }
  | { type: "set-identity-choice"; value: IdentityChoice }
  | { type: "set-photo"; value: string | null }

const TRANSITIONS: Record<ScreenId, readonly ScreenId[]> = {
  lock: ["verifying"],
  verifying: ["identity"],
  identity: ["identity-yes", "identity-no"],
  "identity-no": ["identity"],
  "identity-yes": ["q1"],
  q1: ["q2"],
  q2: ["q3"],
  q3: ["q4"],
  q4: ["q5"],
  q5: ["q6"],
  q6: ["calculating"],
  calculating: ["result"],
  result: ["final"],
  final: ["accepted", "hesitate"],
  hesitate: ["final"],
  accepted: [],
}

const initialState: FlowState = {
  screen: "lock",
  answers: EMPTY_ANSWERS,
  identityChoice: null,
  applicantPhoto: null,
}

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "select": {
      if (!TRANSITIONS[state.screen].includes(action.to)) return state
      return { ...state, screen: action.to }
    }
    case "set-answer":
      return { ...state, answers: { ...state.answers, [action.key]: action.value } }
    case "set-vibe":
      return { ...state, answers: { ...state.answers, vibe: action.value } }
    case "toggle-like": {
      const likes = state.answers.likes.includes(action.option)
        ? state.answers.likes.filter((o) => o !== action.option)
        : [...state.answers.likes, action.option]
      return { ...state, answers: { ...state.answers, likes } }
    }
    case "set-identity-choice":
      return { ...state, identityChoice: action.value }
    case "set-photo":
      return { ...state, applicantPhoto: action.value }
  }
}

export function useFlow() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const select = useCallback((to: ScreenId) => dispatch({ type: "select", to }), [])
  const setAnswer = useCallback((key: TextAnswerKey, value: string) => {
    dispatch({ type: "set-answer", key, value })
  }, [])
  const setVibe = useCallback((value: VibeOption | null) => dispatch({ type: "set-vibe", value }), [])
  const toggleLike = useCallback((option: LikeOption) => dispatch({ type: "toggle-like", option }), [])
  const setIdentityChoice = useCallback((value: IdentityChoice) => {
    dispatch({ type: "set-identity-choice", value })
  }, [])
  const setPhoto = useCallback((value: string | null) => {
    dispatch({ type: "set-photo", value })
  }, [])

  return useMemo(
    () => ({
      ...state,
      select,
      setAnswer,
      setVibe,
      toggleLike,
      setIdentityChoice,
      setPhoto,
    }),
    [state, select, setAnswer, setVibe, toggleLike, setIdentityChoice, setPhoto],
  )
}

export type FlowApi = ReturnType<typeof useFlow>
