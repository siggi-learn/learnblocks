import { ReactElement } from "react"

declare namespace Learnblocks {
  interface Atoms {
    button: any
    text: any
    // TBD
  }

  interface AnswerState {
    isCompleted: boolean
    isCorrect: boolean
    performancePercent: number
  }

  interface Block {
    type: string
  }

  type BlockMap = {
    [key: string]: Block
  }

  interface BlockPresenterProps<T extends string> {
    block: BlockMap[T]
    defaultAnswerState?: AnswerState
    onResult?: (result: AnswerState) => void
  }

  type BlockPresenter<T extends string> = (
    props: BlockPresenterProps<T>,
  ) => ReactElement

  type BlockEditorProps<T extends string> = {
    block: BlockMap[T]
    onChange?: (block: BlockMap[T]) => void
  }

  export type TBlockEditor<T extends string> = (
    props: BlockEditorProps<T>,
  ) => ReactElement
}
