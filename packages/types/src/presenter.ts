import { AtomsInterface } from "./atoms"
import { AnswerState, Block } from "./data"

export interface BlockPresenterProps<
  T extends Block,
  A extends AnswerState = AnswerState
> {
  atoms: AtomsInterface
  block: T
  defaultAnswerState?: A
  hideFeedback?: boolean
  onResult?: (result: A) => void
}

export type BlockPresenter<
  T extends Block,
  A extends AnswerState = AnswerState
> = (props: BlockPresenterProps<T, A>) => React.ReactElement
