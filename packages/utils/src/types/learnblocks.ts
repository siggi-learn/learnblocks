import { ReactElement } from "react"

/**
 * Shared interface for Blocks, Editors and Presenters
 * FIXME: Solution without explicit import?
 */
export interface Atoms {
  button: any
  text: any
  // TBD
}

export interface AnswerState {
  isCompleted?: boolean
  isCorrect?: boolean
  performancePercent?: number
}

export interface Block {
  type: string
}

export interface BlockPresenterProps<
  T extends Block,
  A extends AnswerState = AnswerState
> {
  block: T
  defaultAnswerState?: A
  onResult?: (result: A) => void
}

export type BlockPresenter<T extends Block> = (
  props: BlockPresenterProps<T>,
) => ReactElement

export type BlockEditorProps<T extends Block> = {
  block: T
  onChange?: (block: T) => void
}

export type BlockEditor<T extends Block> = (
  props: BlockEditorProps<T>,
) => ReactElement
