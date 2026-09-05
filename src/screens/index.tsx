import type { ComponentType } from "react"
import type { QuestionId, ScreenId } from "../flow/types"
import type { FlowApi } from "../flow/useFlow"
import { AcceptedScreen } from "./AcceptedScreen"
import { CalculatingScreen } from "./CalculatingScreen"
import { FinalScreen } from "./FinalScreen"
import { HesitateScreen } from "./HesitateScreen"
import { IdentityNoScreen } from "./IdentityNoScreen"
import { IdentityScreen } from "./IdentityScreen"
import { IdentityYesScreen } from "./IdentityYesScreen"
import { LockScreen } from "./LockScreen"
import { QuestionScreen } from "./QuestionScreen"
import { ResultScreen } from "./ResultScreen"
import { VerifyingScreen } from "./VerifyingScreen"

type ScreenComponent = ComponentType<{ flow: FlowApi }>

function question(id: QuestionId): ScreenComponent {
  return function QuestionScreenForId({ flow }: { flow: FlowApi }) {
    return <QuestionScreen flow={flow} id={id} />
  }
}

export const SCREEN_COMPONENTS: Record<ScreenId, ScreenComponent> = {
  lock: LockScreen,
  verifying: VerifyingScreen,
  identity: IdentityScreen,
  "identity-no": IdentityNoScreen,
  "identity-yes": IdentityYesScreen,
  q1: question("q1"),
  q2: question("q2"),
  q3: question("q3"),
  q4: question("q4"),
  q5: question("q5"),
  q6: question("q6"),
  calculating: CalculatingScreen,
  result: ResultScreen,
  final: FinalScreen,
  hesitate: HesitateScreen,
  accepted: AcceptedScreen,
}
